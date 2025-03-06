"use client";
import { Fragment, useEffect, useState, useRef } from "react";
import { useLoadScript } from "@react-google-maps/api";
import Grid from "@component/grid/Grid";
import axios from "axios";
import FlexBox from "@component/FlexBox";
import { H2 } from "@component/Typography";
import styled from "@emotion/styled";
import ApiBaseUrl from "api/ApiBaseUrl";
import SearchBoxStyle from "@component/search-box/styled";
import TextField from "@component/text-field";
import Box from "@component/Box";
import { MdLocationSearching } from "react-icons/md";
import useWindowSize from "@hook/useWindowSize";
import { ProductCard1 } from "@component/product-cards";
import tizaraa_watermark from "../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png";
import NextImage from "@component/NextImage";

const mapContainerStyle = {
  width: "100%",
  height: "400px", // Adjust height as needed
  borderRadius: "10px", // Rounded corners
  border: "1px solid #ccc", // Add a border
};

const center = {
  lat: 23.8103, // Default center: Dhaka
  lng: 90.4125,
};

export default function LocationList() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places", "marker"],
  });

  const [locationList, setLocationList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLocations, setTotalLocations] = useState(0);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [noLocationsFound, setNoLocationsFound] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedLatLonData, setSelectedLatLonData] = useState<any>(null);
  const [nearbyLocations, setNearbyLocations] = useState<any>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Ref for the map container (HTMLDivElement)
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  // Ref for the Google Map instance
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  // Ref for the InfoWindow
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const markersRef = useRef<google.maps.Marker[]>([]);

  const width = useWindowSize();
  const isTabletOrMobile = width < 1024;
  const itemsPerPage = 1000;

  useEffect(() => {
    const storedSearchValue = localStorage.getItem("searchValue");
    if (storedSearchValue) {
      setSearchValue(storedSearchValue);
    }

    const storedLatLon = localStorage.getItem("selectedLatLonData");
    if (storedLatLon) {
      setSelectedLatLonData(JSON.parse(storedLatLon));
    }
  }, []);

  // Fetch locations and handle geolocation
  async function getLocation() {
    try {
      const response = await axios.get("https://seller.tizaraa.com/api/get/seller/lanlon");
      const locations = response.data;
      setNearbyLocations(locations);

      console.log("location:", response.data);

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

    // Set user location
    setUserLocation({ lat: latitude, lng: longitude });

    // Reverse geocoding to get the address details
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

        const fullAddress = `${province}, ${city}, ${area}, ${street}`;
        setSearchValue(fullAddress);
        localStorage.setItem("searchValue", fullAddress);
      })
      .catch((error) => {
        console.error("Error getting address:", error);
      });

    // Filter nearby locations
    const nearbyLocations = locations.filter((location) => {
      const distance = calculateDistance(latitude, longitude, location.lat, location.lon);
      return distance <= 5; // Filter for distances within 5 kilometers
    });

    fetchSelectedLatLong(nearbyLocations, currentPage);
  }

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

  async function fetchSelectedLatLong(latlon, page: number) {
    try {
      const response = await axios.get(
        `https://seller.tizaraa.com/api/get/selected/latlong?page=${page}`,
        {
          params: { latlon, page },
        }
      );

      setSelectedLatLonData((prevData) => {
        const updatedData = {
          ...response.data,
          data: [...(prevData?.data || []), ...response.data.data],
        };
        localStorage.setItem("selectedLatLonData", JSON.stringify(updatedData));
        return updatedData;
      });
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

  const handleShowMore = () => {
    setCurrentPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchSelectedLatLong(nearbyLocations, nextPage);
      return nextPage;
    });
  };

  // Initialize the map and markers
  useEffect(() => {
    if (!isLoaded || !mapContainerRef.current || !window.google) return;

    // Initialize the map
    mapInstanceRef.current = new google.maps.Map(mapContainerRef.current, {
      center: userLocation || center,
      zoom: 12,
    });

    // Initialize the InfoWindow
    infoWindowRef.current = new google.maps.InfoWindow();

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // Add marker for user's location
    if (userLocation) {
      const userMarker = new google.maps.Marker({
        position: userLocation,
        map: mapInstanceRef.current,
        title: "Your Location",
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Blue dot for user's location
        },
      });

      // Add click listener to show InfoWindow
      userMarker.addListener("click", () => {
        if (infoWindowRef.current) {
          const content = `
            <div style="padding: 10px;">
              <h3 style="margin: 0; font-size: 16px;">Your Location</h3>
              <p style="margin: 5px 0; font-size: 14px;">Lat: ${userLocation.lat.toFixed(4)}, Lng: ${userLocation.lng.toFixed(4)}</p>
              <img 
                src="https://via.placeholder.com/100" 
                alt="Your Location" 
                style="width: 100px; height: 100px; object-fit: cover; border-radius: 5px;"
              />
            </div>
          `;
          infoWindowRef.current.setContent(content);
          infoWindowRef.current.open(mapInstanceRef.current, userMarker);
        }
      });

      markersRef.current.push(userMarker);
    }

    // Add markers for nearby locations
    if (nearbyLocations && nearbyLocations.length > 0) {
      nearbyLocations.forEach((location) => {
        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lon },
          map: mapInstanceRef.current,
          title: "Nearby Location",
        });

        // Add click listener to show InfoWindow for nearby locations
        marker.addListener("click", () => {
          if (infoWindowRef.current) {
            const content = `
              <div style="padding: 10px;">
                <h3 style="margin: 0; font-size: 16px;">Nearby Location</h3>
                <p style="margin: 5px 0; font-size: 14px;">Lat: ${location.lat.toFixed(4)}, Lng: ${location.lon.toFixed(4)}</p>
                <img 
                  src="https://via.placeholder.com/100" 
                  alt="Nearby Location" 
                  style="width: 100px; height: 100px; object-fit: cover; border-radius: 5px;"
                />
              </div>
            `;
            infoWindowRef.current.setContent(content);
            infoWindowRef.current.open(mapInstanceRef.current, marker);
          }
        });

        markersRef.current.push(marker);
      });
    }
  }, [isLoaded, userLocation, nearbyLocations]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <NextImage
        alt="newArrivalBanner"
        src={tizaraa_watermark}
        priority
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -20%)",
          width: "100%",
          height: "auto",
          maxWidth: "1200px",
          backgroundSize: "contain",
          backgroundPosition: "center",
          opacity: 0.1,
          zIndex: 0,
        }}
      />

      <main style={{ position: "relative", background: "none" }}>
        <Fragment>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
            <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto" mb="3rem">
              <SearchBoxStyle>
                <TextField
                  fullwidth
                  value={searchValue}
                  className="search-field"
                  placeholder="Street, Postal Code"
                  disabled
                />
                <div
                  style={{
                    marginLeft: "-110px",
                    zIndex: "999",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    backgroundColor: "#E94560",
                    padding: "5px",
                    borderRadius: "300px",
                    color: "white",
                  }}
                  onClick={getLocation}
                >
                  <MdLocationSearching style={{ marginRight: "8px" }} />
                  Locate me
                </div>
              </SearchBoxStyle>
            </Box>
          </div>

          {/* Flex container for map and products */}
          <div
            style={{
              display: window.innerWidth > 1024 ? "flex" : "block", // Flex on large screens, block on small
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            {/* Map container */}
            <div style={{ flex: 1 }}>
              <div ref={mapContainerRef} style={mapContainerStyle} />
            </div>

            {/* Products container */}
            <div style={{ flex: 2 }}>
              {selectedLatLonData && selectedLatLonData.data && selectedLatLonData.data.length > 0 ? (
                <Grid container spacing={2}>
                  {selectedLatLonData.data.slice(0, currentPage * itemsPerPage).map((item, index) => (
                    <Grid item lg={4} sm={6} xs={12} key={index} style={{ marginBottom: '1rem' }}>
                      <ProductCard1
                        id={item?.id || ""}
                        slug={item?.slug || ""}
                        price={item?.price || 0}
                        title={item?.title || "No Title"}
                        off={item?.discount || 0}
                        productStock={item?.product_stock || 0}
                        images={item?.images || []}
                        imgUrl={item?.thumbnail || ""}
                        rating={item?.rating || 0}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <H2
                  mb="10px"
                  textAlign="center"
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: "700",
                    fontSize: "26px",
                  }}
                >
                  Discover top products available in your area, delivered to your door.
                </H2>
              )}
            </div>
          </div>

          {/* Show More button */}
          <FlexBox mt={4} justifyContent="center" alignItems="center">
            {selectedLatLonData && selectedLatLonData.data.length > currentPage * itemsPerPage && (
              <button
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  backgroundColor: '#E94560',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  cursor: 'pointer',
                }}
                onClick={handleShowMore}
              >
                Show More
              </button>
            )}
          </FlexBox>
        </Fragment>
      </main>
    </>
  );
}