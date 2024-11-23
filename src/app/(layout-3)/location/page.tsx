"use client";
import { Fragment, useEffect, useState, useRef } from "react";
import Grid from "@component/grid/Grid";
import axios from "axios";
import FlexBox from "@component/FlexBox";
import ShopCard1 from "@sections/shop/ShopCard1";
import { H2, SemiSpan, Span } from "@component/Typography";
import { Vortex } from "react-loader-spinner";
import styled from "@emotion/styled";
import ApiBaseUrl from "api/ApiBaseUrl";
import SearchBoxStyle from "@component/search-box/styled";
import Icon from "@component/icon/Icon";
import TextField from "@component/text-field";
import Box from "@component/Box";
import { debounce } from "lodash";
import Card from "@component/Card";
import { MdLocationSearching } from "react-icons/md";
import useWindowSize from "@hook/useWindowSize";
import { ProductCard1 } from "@component/product-cards";


const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoLocationMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-size: 1.5rem;
  color: gray;
`;

export default function LocationList() {
  const [locationList, setLocationList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLocations, setTotalLocations] = useState(0);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [noLocationsFound, setNoLocationsFound] = useState(false);
  const observerRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");


  const [selectedLatLonData, setSelectedLatLonData] = useState(null);


  const width = useWindowSize();
  const isTabletOrMobile = width < 1024; // Detect small devices

  // Function to fetch shops data
  const fetchLocations = async (page: number, searchQuery = "") => {
    setIsLoading(true);
    try {
      let response;
      if (searchQuery) {
        // If there's a search query, use POST method to fetch search results
        response = await axios.post(
          `${ApiBaseUrl.baseUrl}all/seller/profile?search?page=${page}`,
          { search: searchQuery, page }
        );
      } else {
        // Else fetch all shops
        response = await axios.post(
          `${ApiBaseUrl.baseUrl}all/seller/profile?page=${page}`
        );
      }

      const data = response.data;

      if (data.data.length === 0) {
        setNoLocationsFound(true); // Set to true if no shops found
      } else {
        setNoLocationsFound(false); // Set to false if shops found
      }

      if (page === 1) {
        setLocationList(data.data); // If first page, replace the shop list
      } else {
        setLocationList((prevShops) => [...prevShops, ...data.data]); // Append for more pages
      }

      setTotalLocations(data.total);
      setLastPage(data.last_page);
    } catch (error) {
      console.error("Error fetching shop list", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search function to reduce API calls
  const searchShops = debounce((value: string) => {
    if (!value) {
      setLocationList([]); // Clear the current list before showing all shops again
      setIsSearching(false);
      fetchLocations(1); // Fetch all shops if search is cleared
    } else {
      setIsSearching(true);
      fetchLocations(1, value); // Fetch shops based on search value
    }
  }, 300);

  // Handle search input change
  const handleSearch = (e: any) => {
    const value = e.target?.value;
    setSearchValue(value);
    searchShops(value); // Trigger debounced search
  };

  // Infinite scrolling logic
  useEffect(() => {
    if (isLoading || currentPage >= lastPage || isSearching) return;

    const handleScroll = (entries: any) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    const observer = new IntersectionObserver(handleScroll, {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    });

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [isLoading, currentPage, lastPage, isSearching]);

  useEffect(() => {
    if (currentPage > 1 && !isSearching) {
      fetchLocations(currentPage); // Load more shops when currentPage changes, only if not searching
    }
  }, [currentPage, isSearching]);

  useEffect(() => {
    fetchLocations(1); // Initial fetch when component loads
  }, []);

  // Geolocation and address fetching


  async function getLocation() {
    try {
      // Fetch seller locations from the API
      const response = await axios.get(
        "https://seller.tizaraa.com/api/get/seller/lanlon"
      );
      const locations = response.data; // Assuming API response is an array of { lat, lon }
      console.log("Fetched locations:", locations);
  
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => showPosition(position, locations),
          showError
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    } catch (error) {
      console.error("Error fetching seller locations:", error);
      alert("Could not fetch seller locations. Please try again later.");
    }
  }
  
  function showPosition(position, locations) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    // Calculate distance and filter nearby locations
    function calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // Radius of the Earth in kilometers
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in kilometers
    }
  
    const nearbyLocations = locations.filter((location) => {
      const distance = calculateDistance(
        latitude,
        longitude,
        location.lat,
        location.lon
      );
      return distance <= 5; // Filter for distances within 5 kilometers
    });
  
    // alert(
    //   "Nearby locations within 5 km:\n" +
    //     nearbyLocations
    //       .map((loc) => `Latitude: ${loc.lat}, Longitude: ${loc.lon}`)
    //       .join("\n")
    // );
  
    console.log("Nearby locations within 5 km:", nearbyLocations);

    const latlon = JSON.stringify(nearbyLocations);
console.log(latlon)

    fetchSelectedLatLong(latlon);
  
    // Continue to fetch address details using the Nominatim API
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    )
      .then((response) => response.json())
      .then((data) => {
        const province = data.address.state || data.address.province || "N/A";
        const city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          "N/A";
        const area =
          data.address.suburb ||
          data.address.neighbourhood ||
          data.address.district ||
          "N/A";
        const street = data.address.road || "N/A";
        const streetNumber = data.address.house_number || "N/A";
        const postalCode = data.address.postcode || "N/A";

        setSearchValue(`${province}, ${city}, ${area}, ${street}`);
  
        // alert(
        //   "Your location details:\n" +
        //     "Province: " +
        //     province +
        //     "\n" +
        //     "City: " +
        //     city +
        //     "\n" +
        //     "Area: " +
        //     area +
        //     "\n" +
        //     "Street: " +
        //     street +
        //     "\n" +
        //     "Street Number: " +
        //     streetNumber +
        //     "\n" +
        //     "Postal Code: " +
        //     postalCode +
        //     "\n" +
        //     "Latitude: " +
        //     latitude +
        //     "\n" +
        //     "Longitude: " +
        //     longitude
        // );
      })
      .catch((error) => {
        console.error("Error getting address:", error);
        // alert(
        //   "Could not get address. Coordinates are:\n" +
        //     "Latitude: " +
        //     latitude +
        //     "\n" +
        //     "Longitude: " +
        //     longitude
        // );
      });
  }

    // Function to call selected latlong API
    // async function fetchSelectedLatLong(latlon) {
    //   try {
    //     const response = await axios.get(
    //       `https://seller.tizaraa.com/api/get/selected/latlong`,
    //       {
    //         params: { latlon }, 
    //       }
    //     );
    //     console.log("Selected LatLong API Response:", response.data);
    //   } catch (error) {
    //     console.error("Error calling selected latlong API:", error);
    //   }
    // }

    async function fetchSelectedLatLong(latlon) {
      try {
        const response = await axios.get(
          `https://seller.tizaraa.com/api/get/selected/latlong`,
          {
            params: { latlon },
          }
        );
        console.log("Selected LatLong API Response:", response.data);
        setSelectedLatLonData(response.data); // Set the fetched data to the state
      } catch (error) {
        console.error("Error calling selected latlong API:", error);
      }
    }
    
    
  
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }
  

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
         {/* {!isTabletOrMobile && ( 
          <H2
            mb="10px"
            width="50%"
            style={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: "700",
              fontSize: "26px",
              fontOpticalSizing: "auto",
            }}
          >
            Discover top products available in your area, delivered to your door.
          </H2>
        )} */}

        <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto" mb="3rem">
          <SearchBoxStyle>
            <TextField
              fullwidth
              value={searchValue}
              onChange={handleSearch}
              className="search-field"
              placeholder="Search for a product..."
            />
            <div
              style={{
                marginLeft: "-100px",
                zIndex: "999",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
              onClick={getLocation}
            >
              <MdLocationSearching style={{ marginRight: "8px" }} />
              Locate me
            </div>
          </SearchBoxStyle>
        </Box>
      </div>

      {selectedLatLonData && selectedLatLonData.data && selectedLatLonData.data.length > 0 ? (
  <Grid container spacing={2}>
    {selectedLatLonData.data.map((item, index) => (
      <Grid item lg={3} sm={6} xs={12} key={index} style={{ marginBottom: '3rem' }}>
        <ProductCard1
          id={item?.id || ""}
          slug={item?.slug || ""}
          price={item?.price || 0}
          title={item?.title || "No Title"}
          off={item?.discount || 0}
          images={item?.images || []}
          imgUrl={item?.thumbnail || ""}
          rating={item?.rating || 0}
        />
      </Grid>
    ))}
  </Grid>
) : (
  <>
  {!isTabletOrMobile && ( 
    <H2
      mb="10px"
      textAlign="center"
      style={{
        fontFamily: "Oswald, sans-serif",
        fontWeight: "700",
        fontSize: "26px",
        fontOpticalSizing: "auto",
      }}
    >
      Discover top products available in your area, delivered to your door.
    </H2>
  )}
  </>
)}





      {/* <div ref={observerRef}></div>
      {isLoading && (
        <LoaderWrapper>
          <Vortex visible={true} height="100" width="100" />
        </LoaderWrapper>
      )} */}
    </Fragment>
  );
}
