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

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoShopMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-size: 1.5rem;
  color: gray;
`;

export default function ShopList() {
  const [shopList, setShopList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalShops, setTotalShops] = useState(0);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [noShopsFound, setNoShopsFound] = useState(false);
  const observerRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");

  // Function to fetch shops data
  const fetchShops = async (page: number, searchQuery = "") => {
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
        setNoShopsFound(true); // Set to true if no shops found
      } else {
        setNoShopsFound(false); // Set to false if shops found
      }

      if (page === 1) {
        setShopList(data.data); // If first page, replace the shop list
      } else {
        setShopList((prevShops) => [...prevShops, ...data.data]); // Append for more pages
      }

      setTotalShops(data.total);
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
      setShopList([]); // Clear the current list before showing all shops again
      setIsSearching(false);
      fetchShops(1); // Fetch all shops if search is cleared
    } else {
      setIsSearching(true);
      fetchShops(1, value); // Fetch shops based on search value
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
      fetchShops(currentPage); // Load more shops when currentPage changes, only if not searching
    }
  }, [currentPage, isSearching]);

  useEffect(() => {
    fetchShops(1); // Initial fetch when component loads
  }, []);

  // Geolocation and address fetching
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Use Nominatim API to get address from coordinates
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
      .then(response => response.json())
      .then(data => {
        const province = data.address.state || data.address.province || 'N/A';
        const city = data.address.city || data.address.town || data.address.village || 'N/A';
        const area = data.address.suburb || data.address.neighbourhood || data.address.district || 'N/A';
        const street = data.address.road || 'N/A';
        const streetNumber = data.address.house_number || 'N/A';
        const postalCode = data.address.postcode || 'N/A';

        const locations = [
          { lat: 23.790174619055488, lon: 90.41311829795991 },
          { lat: 23.760454158513884, lon: 90.34290427166988 },
          { lat: 23.790370922293945, lon: 90.41556447135002 },
      ];

      function calculateDistance(lat1, lon1, lat2, lon2) {
          const R = 6371; // Radius of the Earth in kilometers
          const dLat = (lat2 - lat1) * (Math.PI / 180);
          const dLon = (lon2 - lon1) * (Math.PI / 180);
          const a = 
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          return R * c; // Distance in kilometers
      }

      const nearbyLocations = locations.filter(location => {
          const distance = calculateDistance(latitude, longitude, location.lat, location.lon);
          return distance <= 5; // Filter for distances within 5 kilometers
      });

      alert("Nearby locations within 5 km:\n" + 
            nearbyLocations.map(loc => `Latitude: ${loc.lat}, Longitude: ${loc.lon}`).join("\n"));

        setSearchValue(`${province},${city}, ${area}, ${street}`);

        alert("Your location details:\n" + 
             "Province: " + province + "\n" +
             "City: " + city + "\n" +
             "Area: " + area + "\n" +
             "Street: " + street + "\n" +
             "Street Number: " + streetNumber + "\n" +
             "Postal Code: " + postalCode + "\n" +
             "Latitude: " + latitude + "\n" +
             "Longitude: " + longitude);
      })
      .catch(error => {
        console.error("Error getting address:", error);
        alert("Could not get address. Coordinates are:\n" +
             "Latitude: " + latitude + "\n" +
             "Longitude: " + longitude);
      });
  }

  function showError(error) {
    switch(error.code) {
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
        <H2
          mb="10px"
          width="50%"
          style={{
            fontFamily: 'Oswald, sans-serif',
            fontWeight: '700',
            fontSize: '26px',
            fontOpticalSizing: 'auto',
          }}
        >
          Discover top products available in your area, delivered to your door.
        </H2>

        <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
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

      {noShopsFound && searchValue ? (
        <NoShopMessage>No products found with this name</NoShopMessage>
      ) : (
        <Grid container spacing={6}>
          {shopList.map((item) => (
            // <Grid item lg={4} sm={6} xs={12} key={item.id}>
            //   <ShopCard1
            //     name={item.name}
            //     phone={item.phone}
            //     address={item.address}
            //     image={item.image_url}
            //   />
            // </Grid>
            <>
            </>
          ))}
        </Grid>
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
