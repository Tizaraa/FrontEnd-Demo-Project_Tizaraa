// // // "use client";
// // // import { Fragment, useEffect, useState, useRef } from "react";
// // // import Grid from "@component/grid/Grid";
// // // import axios from "axios";
// // // import FlexBox from "@component/FlexBox";
// // // import ShopCard1 from "@sections/shop/ShopCard1";
// // // import { H2, SemiSpan, Span } from "@component/Typography";
// // // import { Vortex } from "react-loader-spinner";
// // // import styled from "@emotion/styled";
// // // import ApiBaseUrl from "api/ApiBaseUrl";
// // // import SearchBoxStyle from "@component/search-box/styled";
// // // import Icon from "@component/icon/Icon";
// // // import TextField from "@component/text-field";
// // // import Box from "@component/Box";
// // // import { debounce } from "lodash";
// // // import Card from "@component/Card";
// // // import { MdLocationSearching } from "react-icons/md";
// // // import useWindowSize from "@hook/useWindowSize";
// // // import { ProductCard1 } from "@component/product-cards";
// // // import Script from "next/script";



// // // export default function LocationList() {
// // //   const [locationList, setLocationList] = useState([]);
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [totalLocations, setTotalLocations] = useState(0);
// // //   const [lastPage, setLastPage] = useState(1);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [isSearching, setIsSearching] = useState(false);
// // //   const [noLocationsFound, setNoLocationsFound] = useState(false);
// // //   const observerRef = useRef(null);
// // //   const [searchValue, setSearchValue] = useState("");
  


// // //   const [selectedLatLonData, setSelectedLatLonData] = useState(null);

// // //   const [currentItemsCount, setCurrentItemsCount] = useState(12);

// // //   const loadMoreProducts = () => {
// // //     setCurrentItemsCount((prevCount) => prevCount + 12); // Load 12 more items
// // //   };


// // //   const width = useWindowSize();
// // //   const isTabletOrMobile = width < 1024; // Detect small devices

  
// // //   // Geolocation and address fetching

  


// // //   async function getLocation() {
// // //     try {
// // //       // Fetch seller locations from the API
// // //       const response = await axios.get(
// // //         "https://seller.tizaraa.com/api/get/seller/lanlon"
// // //       );
// // //       const locations = response.data; // Assuming API response is an array of { lat, lon }
// // //       console.log("Fetched locations:", locations);
  
// // //       if (navigator.geolocation) {
// // //         navigator.geolocation.getCurrentPosition(
// // //           (position) => showPosition(position, locations),
// // //           showError
// // //         );
// // //       } else {
// // //         alert("Geolocation is not supported by this browser.");
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching seller locations:", error);
// // //       alert("Could not fetch seller locations. Please try again later.");
// // //     }
// // //   }
  
// // //   function showPosition(position, locations) {
// // //     const latitude = position.coords.latitude;
// // //     const longitude = position.coords.longitude;
  
// // //     // Calculate distance and filter nearby locations
// // //     function calculateDistance(lat1, lon1, lat2, lon2) {
// // //       const R = 6371; // Radius of the Earth in kilometers
// // //       const dLat = (lat2 - lat1) * (Math.PI / 180);
// // //       const dLon = (lon2 - lon1) * (Math.PI / 180);
// // //       const a =
// // //         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
// // //         Math.cos(lat1 * (Math.PI / 180)) *
// // //           Math.cos(lat2 * (Math.PI / 180)) *
// // //           Math.sin(dLon / 2) *
// // //           Math.sin(dLon / 2);
// // //       const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// // //       return R * c; // Distance in kilometers
// // //     }
  
// // //     const nearbyLocations = locations.filter((location) => {
// // //       const distance = calculateDistance(
// // //         latitude,
// // //         longitude,
// // //         location.lat,
// // //         location.lon
// // //       );
// // //       return distance <= 5; // Filter for distances within 5 kilometers
// // //     });
  
// // //     console.log("Nearby locations within 5 km:", nearbyLocations);

// // //     const latlon = nearbyLocations;
// // // // console.log(latlon)

// // //     fetchSelectedLatLong(nearbyLocations);
  
// // //     // Continue to fetch address details using the Nominatim API
// // //     fetch(
// // //       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
// // //     )
// // //       .then((response) => response.json())
// // //       .then((data) => {
// // //         const province = data.address.state || data.address.province || "N/A";
// // //         const city =
// // //           data.address.city ||
// // //           data.address.town ||
// // //           data.address.village ||
// // //           "N/A";
// // //         const area =
// // //           data.address.suburb ||
// // //           data.address.neighbourhood ||
// // //           data.address.district ||
// // //           "N/A";
// // //         const street = data.address.road || "N/A";
// // //         const streetNumber = data.address.house_number || "N/A";
// // //         const postalCode = data.address.postcode || "N/A";

// // //         setSearchValue(`${province}, ${city}, ${area}, ${street}`)
// // //       })
// // //       .catch((error) => {
// // //         console.error("Error getting address:", error);
     
// // //       });
// // //   }

// // //     async function fetchSelectedLatLong(latlon) {
// // //       try {
// // //         const response = await axios.get(
// // //           `https://seller.tizaraa.com/api/get/selected/latlong`,
// // //           {
// // //             params: { latlon },
// // //           }
// // //         );
// // //         console.log("Selected LatLong API Response:", response.data);
// // //         setSelectedLatLonData(response.data); // Set the fetched data to the state
// // //       } catch (error) {
// // //         console.error("Error calling selected latlong API:", error);
// // //       }
// // //     }
    
    
  
// // //   function showError(error) {
// // //     switch (error.code) {
// // //       case error.PERMISSION_DENIED:
// // //         alert("User denied the request for Geolocation.");
// // //         break;
// // //       case error.POSITION_UNAVAILABLE:
// // //         alert("Location information is unavailable.");
// // //         break;
// // //       case error.TIMEOUT:
// // //         alert("The request to get user location timed out.");
// // //         break;
// // //       case error.UNKNOWN_ERROR:
// // //         alert("An unknown error occurred.");
// // //         break;
// // //     }
// // //   }
  

// // //   return (
// // //     <Fragment>
// // //       <div
// // //         style={{
// // //           display: "flex",
// // //           gap: "10px",
// // //           alignContent: "center",
// // //           alignItems: "center",
// // //           justifyContent: "center",
// // //           marginBottom: "20px",
// // //         }}
// // //       >
    
// // //         <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto" mb="3rem">
// // //           <SearchBoxStyle>
// // //             <TextField
// // //               fullwidth
// // //               value={searchValue}
// // //               className="search-field"
// // //               placeholder="Search for a product..."
// // //               disabled
// // //             />
// // //             <div
// // //               style={{
// // //                 marginLeft: "-100px",
// // //                 zIndex: "999",
// // //                 display: "flex",
// // //                 alignItems: "center",
// // //                 justifyContent: "space-between",
// // //                 cursor: "pointer",
// // //               }}
// // //               onClick={getLocation}
// // //             >
// // //               <MdLocationSearching style={{ marginRight: "8px" }} />
// // //               Locate me
// // //             </div>
// // //           </SearchBoxStyle>
// // //         </Box>
// // //       </div>

// // //       {selectedLatLonData && selectedLatLonData.data && selectedLatLonData.data.length > 0 ? (
// // //         <>
// // //           <Grid container spacing={2}>
// // //             {selectedLatLonData.data.slice(0, currentItemsCount).map((item, index) => (
// // //               <Grid item lg={3} sm={6} xs={12} key={index} style={{ marginBottom: '3rem' }}>
// // //                 <ProductCard1
// // //                   id={item?.id || ""}
// // //                   slug={item?.slug || ""}
// // //                   price={item?.price || 0}
// // //                   title={item?.title || "No Title"}
// // //                   off={item?.discount || 0}
// // //                   images={item?.images || []}
// // //                   imgUrl={item?.thumbnail || ""}
// // //                   rating={item?.rating || 0}
// // //                 />
// // //               </Grid>
// // //             ))}
// // //           </Grid>

// // //           {/* Show 'Show More' button if there are more products to load */}
// // //           {currentItemsCount < selectedLatLonData.data.length && (
// // //             <FlexBox
// // //               mt={4}
// // //               justifyContent="center"
// // //               alignItems="center"
// // //             >
// // //               <button
// // //                 onClick={loadMoreProducts}
// // //                 style={{
// // //                   padding: '10px 20px',
// // //                   fontSize: '16px',
// // //                   backgroundColor: '#E94560',
// // //                   color: 'white',
// // //                   border: 'none',
// // //                   borderRadius: '5px',
// // //                   cursor: 'pointer',
// // //                 }}
// // //               >
// // //                 Show More
// // //               </button>
// // //             </FlexBox>
// // //           )}
// // //         </>
// // //       ) : (
// // //         <>
// // //           {!isTabletOrMobile && (
// // //             <H2
// // //               mb="10px"
// // //               textAlign="center"
// // //               style={{
// // //                 fontFamily: "Oswald, sans-serif",
// // //                 fontWeight: "700",
// // //                 fontSize: "26px",
// // //                 fontOpticalSizing: "auto",
// // //               }}
// // //             >
// // //               Discover top products available in your area, delivered to your door.
// // //             </H2>
// // //           )}
// // //         </>
// // //       )}


// // //     </Fragment>
// // //   );
// // // }


// // "use client";
// // import { Fragment, useEffect, useState, useRef } from "react";
// // import Grid from "@component/grid/Grid";
// // import axios from "axios";
// // import FlexBox from "@component/FlexBox";
// // import ShopCard1 from "@sections/shop/ShopCard1";
// // import { H2, SemiSpan, Span } from "@component/Typography";
// // import { Vortex } from "react-loader-spinner";
// // import styled from "@emotion/styled";
// // import ApiBaseUrl from "api/ApiBaseUrl";
// // import SearchBoxStyle from "@component/search-box/styled";
// // import Icon from "@component/icon/Icon";
// // import TextField from "@component/text-field";
// // import Box from "@component/Box";
// // import { debounce } from "lodash";
// // import Card from "@component/Card";
// // import { MdLocationSearching } from "react-icons/md";
// // import useWindowSize from "@hook/useWindowSize";
// // import { ProductCard1 } from "@component/product-cards";
// // import Script from "next/script";

// // export default function LocationList() {
// //   const [locationList, setLocationList] = useState([]);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [totalLocations, setTotalLocations] = useState(0);
// //   const [lastPage, setLastPage] = useState(1);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [isSearching, setIsSearching] = useState(false);
// //   const [noLocationsFound, setNoLocationsFound] = useState(false);
// //   const observerRef = useRef(null);
// //   const [searchValue, setSearchValue] = useState("");
// //   const [selectedLatLonData, setSelectedLatLonData] = useState<any>(null);
// //   const [nearbyLocations, setNearbyLocations] = useState<any>([]);

// //   const width = useWindowSize();
// //   const isTabletOrMobile = width < 1024; // Detect small devices
// //   const itemsPerPage = 1000; // Number of items per page

// //   // Fetch locations and handle geolocation
// //   async function getLocation() {
// //     try {
// //       const response = await axios.get("https://seller.tizaraa.com/api/get/seller/lanlon");
// //       const locations = response.data;
// //       setNearbyLocations(locations);

// //       if (navigator.geolocation) {
// //         navigator.geolocation.getCurrentPosition(
// //           (position) => showPosition(position, locations),
// //           showError
// //         );
// //       } else {
// //         alert("Geolocation is not supported by this browser.");
// //       }
// //     } catch (error) {
// //       console.error("Error fetching seller locations:", error);
// //       alert("Could not fetch seller locations. Please try again later.");
// //     }
// //   }

// //   function showPosition(position, locations) {
// //     const latitude = position.coords.latitude;
// //     const longitude = position.coords.longitude;

// //     // Reverse geocoding to get the address details
// //     fetch(
// //       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
// //     )
// //       .then((response) => response.json())
// //       .then((data) => {
// //         const province = data.address.state || data.address.province || "N/A";
// //         const city =
// //           data.address.city ||
// //           data.address.town ||
// //           data.address.village ||
// //           "N/A";
// //         const area =
// //           data.address.suburb ||
// //           data.address.neighbourhood ||
// //           data.address.district ||
// //           "N/A";
// //         const street = data.address.road || "N/A";
// //         const streetNumber = data.address.house_number || "N/A";
// //         const postalCode = data.address.postcode || "N/A";

// //         // Set search value with the full address
// //         setSearchValue(`${province}, ${city}, ${area}, ${street}`);
// //       })
// //       .catch((error) => {
// //         console.error("Error getting address:", error);
// //       });

// //     // Filter nearby locations based on user's coordinates
// //     const nearbyLocations = locations.filter((location) => {
// //       const distance = calculateDistance(latitude, longitude, location.lat, location.lon);
// //       return distance <= 5; // Filter for distances within 5 kilometers
// //     });

// //     fetchSelectedLatLong(nearbyLocations, currentPage); // Fetch products for the first page
// //   }

// //   function calculateDistance(lat1, lon1, lat2, lon2) {
// //     const R = 6371; // Radius of the Earth in kilometers
// //     const dLat = (lat2 - lat1) * (Math.PI / 180);
// //     const dLon = (lon2 - lon1) * (Math.PI / 180);
// //     const a =
// //       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
// //       Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
// //       Math.sin(dLon / 2) * Math.sin(dLon / 2);
// //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// //     return R * c; // Distance in kilometers
// //   }

// //   async function fetchSelectedLatLong(latlon, page: number) {
// //     try {
// //       const response = await axios.get(
// //         `https://seller.tizaraa.com/api/get/selected/latlong?page=${page}`,
// //         {
// //           params: { latlon, page },
// //         }
// //       );

// //       // Append new data to the existing selectedLatLonData
// //       setSelectedLatLonData((prevData) => ({
// //         ...response.data,
// //         data: [...(prevData?.data || []), ...response.data.data],
// //       }));
// //     } catch (error) {
// //       console.error("Error calling selected latlong API:", error);
// //     }
// //   }

// //   function showError(error) {
// //     switch (error.code) {
// //       case error.PERMISSION_DENIED:
// //         alert("User denied the request for Geolocation.");
// //         break;
// //       case error.POSITION_UNAVAILABLE:
// //         alert("Location information is unavailable.");
// //         break;
// //       case error.TIMEOUT:
// //         alert("The request to get user location timed out.");
// //         break;
// //       case error.UNKNOWN_ERROR:
// //         alert("An unknown error occurred.");
// //         break;
// //     }
// //   }

// //   // Function to handle the "Show More" button click
// //   const handleShowMore = () => {
// //     setCurrentPage((prevPage) => {
// //       const nextPage = prevPage + 1;
// //       fetchSelectedLatLong(nearbyLocations, nextPage); // Fetch the next page of products
// //       return nextPage;
// //     });
// //   };

// //   // const handleClick = () => {
// //   //   alert('Please select "Locate Me"');
// //   // };
  

// //   return (
// //     <Fragment>
// //       <div style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
// //         <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto" mb="3rem">
// //           <SearchBoxStyle>
// //             <TextField
// //               fullwidth
// //               value={searchValue}
// //               className="search-field"
// //               placeholder="Street, Postal Code"
// //               // onClick={handleClick}
// //               disabled
              
// //             />
// //             <div
// //               style={{
// //                 marginLeft: "-110px",
// //                 zIndex: "999",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "space-between",
// //                 cursor: "pointer",
// //                 backgroundColor: "#E94560",
// //     // width: "100px",
// //     // height: "30px",
// //     padding: "5px",
// //     borderRadius: "300px",
// //     color: "white",
// //               }}
// //               onClick={getLocation}
// //             >
// //               <MdLocationSearching style={{ marginRight: "8px" }} />
// //               Locate me
// //             </div>
// //           </SearchBoxStyle>
// //         </Box>
// //       </div>

// //       {selectedLatLonData && selectedLatLonData.data && selectedLatLonData.data.length > 0 ? (
// //         <>
// //           <Grid container spacing={2}>
// //             {selectedLatLonData.data.slice(0, currentPage * itemsPerPage).map((item, index) => (
// //               <Grid item lg={3} sm={6} xs={12} key={index} style={{ marginBottom: '3rem' }}>
// //                 <ProductCard1
// //                   id={item?.id || ""}
// //                   slug={item?.slug || ""}
// //                   price={item?.price || 0}
// //                   title={item?.title || "No Title"}
// //                   off={item?.discount || 0}
// //                   images={item?.images || []}
// //                   imgUrl={item?.thumbnail || ""}
// //                   rating={item?.rating || 0}
// //                 />
// //               </Grid>
// //             ))}
// //           </Grid>

// //           {/* Show 'Show More' button if there are more products to load */}
// //           <FlexBox mt={4} justifyContent="center" alignItems="center">
// //             {selectedLatLonData.data.length > currentPage &&  (
// //               <button
// //                 style={{
// //                   padding: '10px 20px',
// //                   fontSize: '16px',
// //                   backgroundColor: '#E94560',
// //                   color: 'white',
// //                   border: 'none',
// //                   borderRadius: '5px',
// //                   cursor: 'pointer',
// //                 }}
// //                 onClick={handleShowMore}
// //               >
// //                 Show More
// //               </button>
// //             )}
// //           </FlexBox>
// //         </>
// //       ) : (
// //         <H2
// //           mb="10px"
// //           textAlign="center"
// //           style={{
// //             fontFamily: "Oswald, sans-serif",
// //             fontWeight: "700",
// //             fontSize: "26px",
// //           }}
// //         >
// //          Discover top products available in your area, delivered to your door.
// //         </H2>
// //       )}
// //     </Fragment>
// //   );
// // }






// "use client";
// import { Fragment, useEffect, useState, useRef } from "react";
// import Grid from "@component/grid/Grid";
// import axios from "axios";
// import FlexBox from "@component/FlexBox";
// import ShopCard1 from "@sections/shop/ShopCard1";
// import { H2, SemiSpan, Span } from "@component/Typography";
// import { Vortex } from "react-loader-spinner";
// import styled from "@emotion/styled";
// import ApiBaseUrl from "api/ApiBaseUrl";
// import SearchBoxStyle from "@component/search-box/styled";
// import Icon from "@component/icon/Icon";
// import TextField from "@component/text-field";
// import Box from "@component/Box";
// import { debounce } from "lodash";
// import Card from "@component/Card";
// import { MdLocationSearching } from "react-icons/md";
// import useWindowSize from "@hook/useWindowSize";
// import { ProductCard1 } from "@component/product-cards";
// import Script from "next/script";

// export default function LocationList() {
//   const [locationList, setLocationList] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalLocations, setTotalLocations] = useState(0);
//   const [lastPage, setLastPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSearching, setIsSearching] = useState(false);
//   const [noLocationsFound, setNoLocationsFound] = useState(false);
//   const observerRef = useRef(null);
//   const [searchValue, setSearchValue] = useState("");
//   const [selectedLatLonData, setSelectedLatLonData] = useState<any>(null);
//   const [nearbyLocations, setNearbyLocations] = useState<any>([]);

//   const width = useWindowSize();
//   const isTabletOrMobile = width < 1024; // Detect small devices
//   const itemsPerPage = 1000; // Number of items per page

//   useEffect(() => {
//     const storedSearchValue = localStorage.getItem("searchValue");
//     if (storedSearchValue) {
//       setSearchValue(storedSearchValue); // Set the search value from localStorage
//     }

//     const storedLatLon = localStorage.getItem("selectedLatLonData");
//     if (storedLatLon) {
//       setSelectedLatLonData(JSON.parse(storedLatLon));
//     }
//   }, []); // Only run on initial render

//   // Fetch locations and handle geolocation
//   async function getLocation() {
//     try {
//       const response = await axios.get("https://seller.tizaraa.com/api/get/seller/lanlon");
//       const locations = response.data;
//       setNearbyLocations(locations);

//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => showPosition(position, locations),
//           showError
//         );
//       } else {
//         alert("Geolocation is not supported by this browser.");
//       }
//     } catch (error) {
//       console.error("Error fetching seller locations:", error);
//       alert("Could not fetch seller locations. Please try again later.");
//     }
//   }

//   function showPosition(position, locations) {
//     const latitude = position.coords.latitude;
//     const longitude = position.coords.longitude;

//     // Reverse geocoding to get the address details
//     fetch(
//       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         const province = data.address.state || data.address.province || "N/A";
//         const city =
//           data.address.city ||
//           data.address.town ||
//           data.address.village ||
//           "N/A";
//         const area =
//           data.address.suburb ||
//           data.address.neighbourhood ||
//           data.address.district ||
//           "N/A";
//         const street = data.address.road || "N/A";
//         const streetNumber = data.address.house_number || "N/A";
//         const postalCode = data.address.postcode || "N/A";

//         // Set search value with the full address
//         const fullAddress = `${province}, ${city}, ${area}, ${street}`;
//         setSearchValue(fullAddress);

//         // Save the full address to localStorage
//         localStorage.setItem("searchValue", fullAddress);
//       })
//       .catch((error) => {
//         console.error("Error getting address:", error);
//       });

//     // Filter nearby locations based on user's coordinates
//     const nearbyLocations = locations.filter((location) => {
//       const distance = calculateDistance(latitude, longitude, location.lat, location.lon);
//       return distance <= 5; // Filter for distances within 5 kilometers
//     });

//     fetchSelectedLatLong(nearbyLocations, currentPage); // Fetch products for the first page
//   }

//   function calculateDistance(lat1, lon1, lat2, lon2) {
//     const R = 6371; // Radius of the Earth in kilometers
//     const dLat = (lat2 - lat1) * (Math.PI / 180);
//     const dLon = (lon2 - lon1) * (Math.PI / 180);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c; // Distance in kilometers
//   }

//   async function fetchSelectedLatLong(latlon, page: number) {
//     try {
//       const response = await axios.get(
//         `https://seller.tizaraa.com/api/get/selected/latlong?page=${page}`,
//         {
//           params: { latlon, page },
//         }
//       );

//       // Append new data to the existing selectedLatLonData
//       setSelectedLatLonData((prevData) => {
//         const updatedData = {
//           ...response.data,
//           data: [...(prevData?.data || []), ...response.data.data],
//         };

//         // Save data to localStorage
//         localStorage.setItem("selectedLatLonData", JSON.stringify(updatedData));
//         return updatedData;
//       });
//     } catch (error) {
//       console.error("Error calling selected latlong API:", error);
//     }
//   }

//   function showError(error) {
//     switch (error.code) {
//       case error.PERMISSION_DENIED:
//         alert("User denied the request for Geolocation.");
//         break;
//       case error.POSITION_UNAVAILABLE:
//         alert("Location information is unavailable.");
//         break;
//       case error.TIMEOUT:
//         alert("The request to get user location timed out.");
//         break;
//       case error.UNKNOWN_ERROR:
//         alert("An unknown error occurred.");
//         break;
//     }
//   }

//   // Function to handle the "Show More" button click
//   const handleShowMore = () => {
//     setCurrentPage((prevPage) => {
//       const nextPage = prevPage + 1;
//       fetchSelectedLatLong(nearbyLocations, nextPage); // Fetch the next page of products
//       return nextPage;
//     });
//   };

//   return (
//     <Fragment>
//       <div style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
//         <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto" mb="3rem">
//           <SearchBoxStyle>
//             <TextField
//               fullwidth
//               value={searchValue}
//               className="search-field"
//               placeholder="Street, Postal Code"
//               disabled
//             />
//             <div
//               style={{
//                 marginLeft: "-110px",
//                 zIndex: "999",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 cursor: "pointer",
//                 backgroundColor: "#E94560",
//                 padding: "5px",
//                 borderRadius: "300px",
//                 color: "white",
//               }}
//               onClick={getLocation}
//             >
//               <MdLocationSearching style={{ marginRight: "8px" }} />
//               Locate me
//             </div>
//           </SearchBoxStyle>
//         </Box>
//       </div>

//       {selectedLatLonData && selectedLatLonData.data && selectedLatLonData.data.length > 0 ? (
//         <>
//           <Grid container spacing={2}>
//             {selectedLatLonData.data.slice(0, currentPage * itemsPerPage).map((item, index) => (
//               <Grid item lg={3} sm={6} xs={12} key={index} style={{ marginBottom: '3rem' }}>
//                 <ProductCard1
//                   id={item?.id || ""}
//                   slug={item?.slug || ""}
//                   price={item?.price || 0}
//                   title={item?.title || "No Title"}
//                   off={item?.discount || 0}
//                   images={item?.images || []}
//                   imgUrl={item?.thumbnail || ""}
//                   rating={item?.rating || 0}
//                 />
//               </Grid>
//             ))}
//           </Grid>

//           {/* Show 'Show More' button if there are more products to load */}
//           <FlexBox mt={4} justifyContent="center" alignItems="center">
//             {selectedLatLonData.data.length > currentPage && (
//               <button
//                 style={{
//                   padding: '10px 20px',
//                   fontSize: '14px',
//                   backgroundColor: '#E94560',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '25px',
//                   cursor: 'pointer',
//                 }}
//                 onClick={handleShowMore}
//               >
//                 Show More
//               </button>
//             )}
//           </FlexBox>
//         </>
//       ) : (
//         <H2
//           mb="10px"
//           textAlign="center"
//           style={{
//             fontFamily: "Oswald, sans-serif",
//             fontWeight: "700",
//             fontSize: "26px",
//           }}
//         >
//          Discover top products available in your area, delivered to your door.
//         </H2>
//       )}
//     </Fragment>
//   );
// }








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
import Script from "next/script";
import GoogleMap from "@component/GoogleMap";

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
  const [selectedLatLonData, setSelectedLatLonData] = useState<any>(null);
  const [nearbyLocations, setNearbyLocations] = useState<any>([]);

  const width = useWindowSize();
  const isTabletOrMobile = width < 1024; // Detect small devices
  const itemsPerPage = 1000; // Number of items per page


  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);



  useEffect(() => {
    const storedSearchValue = localStorage.getItem("searchValue");
    if (storedSearchValue) {
      setSearchValue(storedSearchValue); // Set the search value from localStorage
    }

    const storedLatLon = localStorage.getItem("selectedLatLonData");
    if (storedLatLon) {
      setSelectedLatLonData(JSON.parse(storedLatLon));
    }
    
  }, []); // Only run on initial render

  // Fetch locations and handle geolocation
// Modify the getLocation function to prevent duplicate fetching
async function getLocation() {
  try {
    const response = await axios.get("https://seller.tizaraa.com/api/get/seller/lanlon");
    const locations = response.data;
    console.log(locations)
    setNearbyLocations(locations);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLat = position.coords.latitude;
          const currentLon = position.coords.longitude;

          // Check if the current latitude and longitude match the previous ones
          if (
            selectedLatLonData?.latitude === currentLat &&
            selectedLatLonData?.longitude === currentLon
          ) {
            // If the coordinates are the same, don't fetch the data again
            return;
          }

          showPosition(position, locations);
        },
        showError
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  } catch (error) {
    console.error("Error fetching seller locations:", error);
    alert("Could not fetch seller locations. Please try again later.");
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      showError
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Modify the showPosition function to store the latitude and longitude
function showPosition(position, locations) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Reverse geocoding logic to get the address
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

      // Set search value with the full address
      const fullAddress = `${province}, ${city}, ${area}, ${street}`;
      setSearchValue(fullAddress);

      // Save the full address to localStorage
      localStorage.setItem("searchValue", fullAddress);

      // Store the latitude and longitude to prevent duplicate fetching
      setSelectedLatLonData({ latitude, longitude });
    })
    .catch((error) => {
      console.error("Error getting address:", error);
    });

  // Filter nearby locations based on the user's coordinates
  const nearbyLocations = locations.filter((location) => {
    const distance = calculateDistance(latitude, longitude, location.lat, location.lon);
    return distance <= 5; // Filter for distances within 5 kilometers
  });

  fetchSelectedLatLong(nearbyLocations, currentPage); // Fetch products for the first page
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

      // Append new data to the existing selectedLatLonData
      setSelectedLatLonData((prevData) => {
        const updatedData = {
          ...response.data,
          data: [...(prevData?.data || []), ...response.data.data],
        };

        // Save data to localStorage
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

  // Function to handle the "Show More" button click
  const handleShowMore = () => {
    setCurrentPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchSelectedLatLong(nearbyLocations, nextPage); // Fetch the next page of products
      return nextPage;
    });
  };

  return (
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

            {/* google map api = "AIzaSyDTxD7JNSSuJe5z5SDp4MZO55juRxNSAXE" */}
            {/* {latitude && longitude && <GoogleMap latitude={latitude} longitude={longitude} />} */}
            {latitude && longitude && nearbyLocations.length > 0 && (
  <GoogleMap 
    latitude={latitude} 
    longitude={longitude} 
    locations={nearbyLocations} 
  />
)}


      
      {selectedLatLonData && selectedLatLonData.data && selectedLatLonData.data.length > 0 ? (
        <>
          <Grid container spacing={2}>
            {selectedLatLonData.data.slice(0, currentPage * itemsPerPage).map((item, index) => (
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

          {/* Show 'Show More' button if there are more products to load */}
          <FlexBox mt={4} justifyContent="center" alignItems="center">
            {selectedLatLonData.data.length > currentPage && (
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
        </>
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
    </Fragment>
  );
}
