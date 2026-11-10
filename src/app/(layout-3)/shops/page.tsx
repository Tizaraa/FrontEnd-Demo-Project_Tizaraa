// "use client";
// import { Fragment, useEffect, useState, useRef } from "react";
// import Grid from "@component/grid/Grid";
// import axios from "axios";
// import FlexBox from "@component/FlexBox";
// import ShopCard1 from "@sections/shop/ShopCard1";
// import { H2 } from "@component/Typography";
// import { Vortex } from "react-loader-spinner";
// import styled from "@emotion/styled";
// import Box from "@component/Box";
// import ApiBaseUrl from "api/ApiBaseUrl";
// import tizaraa_watermark from "../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png";
// import Image from "next/image";
// import NextImage from "@component/NextImage";
// import VendorMapPage from "@sections/shop/VendorMapPage";

// const LoaderWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const NoShopMessage = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 20px;
//   font-size: 1.5rem;
//   color: gray;
// `;

// const SelectWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 10px;
//   margin-bottom: 20px;
//   align-items: center;
// `;

// const SelectField = styled.select`
//   width: 100%;
//   max-width: 300px;
//   padding: 10px;
//   font-size: 16px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

// export default function ShopList() {
//   const [shopList, setShopList] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [noShopsFound, setNoShopsFound] = useState(false);
//   const [provinces, setProvinces] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [selectedProvince, setSelectedProvince] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");
//   const [selectedArea, setSelectedArea] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [lastPage, setLastPage] = useState(1);
//   const [isSearching, setIsSearching] = useState(false);

//   const observerRef = useRef(null);

//   useEffect(() => {
//     fetchProvinces();
//     fetchAllShops();
//   }, []);

//   useEffect(() => {
//     if (isLoading || currentPage >= lastPage) return;

//     const handleScroll = (entries) => {
//       const target = entries[0];
//       if (target.isIntersecting) {
//         setCurrentPage((prevPage) => prevPage + 1);
//       }
//     };

//     const observer = new IntersectionObserver(handleScroll, {
//       root: null,
//       rootMargin: "100px",
//       threshold: 0,
//     });

//     if (observerRef.current) observer.observe(observerRef.current);

//     return () => {
//       if (observerRef.current) observer.unobserve(observerRef.current);
//     };
//   }, [isLoading, currentPage, lastPage]);

//   useEffect(() => {
//     if (currentPage > 1) {
//       loadMoreShops();
//     }
//   }, [currentPage]);

//   const fetchProvinces = async () => {
//     try {
//       const response = await axios.get("https://frontend.tizaraa.com/api/all/address");
//       setProvinces(response.data);
//     } catch (error) {
//       console.error("Error fetching provinces", error);
//     }
//   };

//   const handleProvinceChange = async (e) => {
//     const provinceId = e.target.value;
//     setSelectedProvince(provinceId);
//     setCities([]);
//     setAreas([]);
//     setSelectedCity("");
//     setSelectedArea("");
//     setCurrentPage(1);
//     setLastPage(1);

//     if (provinceId) {
//       const province = provinces.find((p) => p.id === parseInt(provinceId));
//       if (province && province.city) {
//         setCities(province.city);
//       }
//       await fetchShopsByProvince(provinceId);
//     } else {
//       fetchAllShops();
//     }
//   };

//   const handleCityChange = async (e) => {
//     const cityId = e.target.value;
//     setSelectedCity(cityId);
//     setAreas([]);
//     setSelectedArea("");
//     setCurrentPage(1);
//     setLastPage(1);

//     if (cityId) {
//       const city = cities.find((c) => c.id === parseInt(cityId));
//       if (city && city.areas) {
//         setAreas(city.areas);
//       }
//       await fetchShopsByCity(cityId);
//     } else {
//       fetchAllShops();
//     }
//   };

//   const handleAreaChange = async (e) => {
//     const areaId = e.target.value;
//     setSelectedArea(areaId);
//     setCurrentPage(1);
//     setLastPage(1);

//     if (areaId) {
//       await fetchShopsByArea(areaId);
//     } else {
//       fetchAllShops();
//     }
//   };

//   const fetchAllShops = async () => {
//     setIsLoading(true);
//     setIsSearching(false);
//     try {
//       const response = await axios.post(`${ApiBaseUrl.baseUrl}all/seller/profile?page=${currentPage}`, {
//         page: currentPage,
//       });
//       setShopList((prevShopList) => [...prevShopList, ...response.data.data]);
//       setNoShopsFound(response.data.data.length === 0);
//       setLastPage(response.data.last_page);
//     } catch (error) {
//       console.error("Error fetching shops", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchShopsByProvince = async (provinceId) => {
//     setIsLoading(true);
//     setIsSearching(true);
//     try {
//       const response = await axios.post(`${ApiBaseUrl.baseUrl}all/seller/profile?page=${currentPage}`, {
//         province_id: provinceId,
//         page: currentPage,
//       });
//       setShopList(response.data.data);
//       setNoShopsFound(response.data.data.length === 0);
//       setLastPage(response.data.last_page);
//     } catch (error) {
//       console.error("Error fetching shops by province", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchShopsByCity = async (cityId) => {
//     setIsLoading(true);
//     setIsSearching(true);
//     try {
//       const response = await axios.post(`${ApiBaseUrl.baseUrl}all/seller/profile?page=${currentPage}`, {
//         city_id: cityId,
//         page: currentPage,
//       });
//       setShopList(response.data.data);
//       setNoShopsFound(response.data.data.length === 0);
//       setLastPage(response.data.last_page);
//     } catch (error) {
//       console.error("Error fetching shops by city", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchShopsByArea = async (areaId) => {
//     setIsLoading(true);
//     setIsSearching(true);
//     try {
//       const response = await axios.post(`${ApiBaseUrl.baseUrl}all/seller/profile?page=${currentPage}`, {
//         area_id: areaId,
//         page: currentPage,
//       });
//       setShopList(response.data.data);
//       setNoShopsFound(response.data.data.length === 0);
//       setLastPage(response.data.last_page);
//     } catch (error) {
//       console.error("Error fetching shops by area", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const loadMoreShops = async () => {
//     if (isLoading || currentPage >= lastPage) return;

//     setIsLoading(true);
//     try {
//       const response = await axios.post(`${ApiBaseUrl.baseUrl}all/seller/profile?page=${currentPage}`, {
//         page: currentPage,
//       });
//       setShopList((prevShopList) => [...prevShopList, ...response.data.data]);
//       setNoShopsFound(response.data.data.length === 0);
//       setLastPage(response.data.last_page);
//     } catch (error) {
//       console.error("Error fetching more shops", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <NextImage
//         alt="newArrivalBanner"
//         src={tizaraa_watermark}
//         priority
//         style={{
//           position: "fixed",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -20%)",
//           width: "100%",
//           height: "auto",
//           maxWidth: "1200px",
//           backgroundSize: "contain",
//           backgroundPosition: "center",
//           opacity: 0.1,
//           zIndex: 0,
//         }}
//       />

//       <main style={{ position: "relative", background: "none" }}>
//         <Fragment>
//           <VendorMapPage
//             selectedProvince={selectedProvince}
//             selectedCity={selectedCity}
//             selectedArea={selectedArea}
//             vendors={shopList} // Pass shopList as vendors
//           />
//           <div
//             style={{
//               display: "flex",
//               gap: "10px",
//               alignContent: "center",
//               alignItems: "center",
//               justifyContent: "center",
//               marginBottom: "20px",
//             }}
//           >
//             <H2 mb="20px">All Shops</H2>
//             <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
//               <SelectWrapper>
//                 <SelectField onChange={handleProvinceChange}>
//                   <option value="">Select Province</option>
//                   {provinces.map((province) => (
//                     <option key={province.id} value={province.id}>
//                       {province.province}
//                     </option>
//                   ))}
//                 </SelectField>
//                 <SelectField onChange={handleCityChange}>
//                   <option value="">Select City</option>
//                   {cities.map((city) => (
//                     <option key={city.id} value={city.id}>
//                       {city.city}
//                     </option>
//                   ))}
//                 </SelectField>
//                 <SelectField onChange={handleAreaChange}>
//                   <option value="">Select Area</option>
//                   {areas.map((area) => (
//                     <option key={area.id} value={area.id}>
//                       {area.area}
//                     </option>
//                   ))}
//                 </SelectField>
//               </SelectWrapper>
//             </Box>
//           </div>

//           {shopList.length > 0 ? (
//             <Grid container spacing={3}>
//               {shopList.map((item) => (
//                 <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
//                   <ShopCard1
//                     name={item.name}
//                     phone={item.phone}
//                     address={item.address || "Address not found"}
//                     rating={item.rating || 5}
//                     imgUrl={item.profilePicture ? `${ApiBaseUrl.ImgUrl}${item.profilePicture}` : 'https://t4.ftcdn.net/jpg/04/15/60/27/360_F_415602715_uy5b6P84JetkpRCLxNmYgrx8pWIATsAD.jpg'}
//                     coverImgUrl={item.coverPicture ? `${ApiBaseUrl.ImgUrl}${item.coverPicture}` : 'https://static.vecteezy.com/system/resources/previews/011/059/783/non_2x/best-seller-text-button-speech-bubble-best-seller-colorful-web-banner-template-illustration-vector.jpg'}
//                     shopUrl={`/shops/${item.slug}`}
//                   />
//                 </Grid>
//               ))}
//             </Grid>
//           ) : (
//             !isLoading && <NoShopMessage>No shop found</NoShopMessage>
//           )}

//           {isLoading && (
//             <LoaderWrapper>
//               <Vortex />
//             </LoaderWrapper>
//           )}

//           <div ref={observerRef}></div>
//         </Fragment>
//       </main>
//     </>
//   );
// }

// "use client";
// import { Fragment, useEffect, useState, useRef } from "react";
// import Grid from "@component/grid/Grid";
// import axios from "axios";
// import FlexBox from "@component/FlexBox";
// import ShopCard1 from "@sections/shop/ShopCard1";
// import { H2 } from "@component/Typography";
// import { Vortex } from "react-loader-spinner";
// import styled from "@emotion/styled";
// import Box from "@component/Box";
// import ApiBaseUrl from "api/ApiBaseUrl";
// import tizaraa_watermark from "../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png";
// import Image from "next/image";
// import NextImage from "@component/NextImage";
// import VendorMapPage from "@sections/shop/VendorMapPage";

// const LoaderWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const NoShopMessage = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 20px;
//   font-size: 1.5rem;
//   color: gray;
// `;

// const SelectWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 10px;
//   margin-bottom: 20px;
//   align-items: center;
// `;

// const SelectField = styled.select`
//   width: 100%;
//   max-width: 300px;
//   padding: 10px;
//   font-size: 16px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

// export default function ShopList() {
//   const [shopList, setShopList] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [noShopsFound, setNoShopsFound] = useState(false);
//   const [provinces, setProvinces] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [selectedProvince, setSelectedProvince] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");
//   const [selectedArea, setSelectedArea] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [lastPage, setLastPage] = useState(1);
//   const [isSearching, setIsSearching] = useState(false);

//   // const [showMap, setShowMap] = useState(window.innerWidth > 768);

//   const observerRef = useRef(null);

//   useEffect(() => {
//     fetchProvinces();
//     fetchAllShops();
//   }, []);

//   useEffect(() => {
//     if (isLoading || currentPage >= lastPage) return;

//     const handleScroll = (entries) => {
//       const target = entries[0];
//       if (target.isIntersecting) {
//         setCurrentPage((prevPage) => prevPage + 1);
//       }
//     };

//     const observer = new IntersectionObserver(handleScroll, {
//       root: null,
//       rootMargin: "100px",
//       threshold: 0,
//     });

//     if (observerRef.current) observer.observe(observerRef.current);

//     return () => {
//       if (observerRef.current) observer.unobserve(observerRef.current);
//     };
//   }, [isLoading, currentPage, lastPage]);

//   useEffect(() => {
//     if (currentPage > 1) {
//       loadMoreShops();
//     }
//   }, [currentPage]);

//   const fetchProvinces = async () => {
//     try {
//       const response = await axios.get("https://frontend.tizaraa.com/api/all/address");
//       setProvinces(response.data);
//     } catch (error) {
//       console.error("Error fetching provinces", error);
//     }
//   };

//   const handleProvinceChange = async (e) => {
//     const provinceId = e.target.value;
//     setSelectedProvince(provinceId);
//     setCities([]);
//     setAreas([]);
//     setSelectedCity("");
//     setSelectedArea("");
//     setCurrentPage(1);
//     setLastPage(1);

//     if (provinceId) {
//       const province = provinces.find((p) => p.id === parseInt(provinceId));
//       if (province && province.city) {
//         setCities(province.city);
//       }
//       await fetchShopsByProvince(provinceId);
//     } else {
//       fetchAllShops();
//     }
//   };

//   const handleCityChange = async (e) => {
//     const cityId = e.target.value;
//     setSelectedCity(cityId);
//     setAreas([]);
//     setSelectedArea("");
//     setCurrentPage(1);
//     setLastPage(1);

//     if (cityId) {
//       const city = cities.find((c) => c.id === parseInt(cityId));
//       if (city && city.areas) {
//         setAreas(city.areas);
//       }
//       await fetchShopsByCity(cityId);
//     } else {
//       fetchAllShops();
//     }
//   };

//   const handleAreaChange = async (e) => {
//     const areaId = e.target.value;
//     setSelectedArea(areaId);
//     setCurrentPage(1);
//     setLastPage(1);

//     if (areaId) {
//       await fetchShopsByArea(areaId);
//     } else {
//       fetchAllShops();
//     }
//   };

// const fetchAllShops = async () => {
//   setIsLoading(true);
//   setIsSearching(false);
//   try {
//       const response = await axios.post(`${ApiBaseUrl.baseUrl}all/seller/profile?page=${currentPage}`, {
//       page: currentPage,
//     });
//     setShopList((prevShopList) => [...prevShopList, ...response.data.data]);
//     setNoShopsFound(response.data.data.length === 0);
//     setLastPage(response.data.last_page);
//   } catch (error) {
//     console.error("Error fetching shops", error);
//   } finally {
//     setIsLoading(false);
//   }
// };

// const fetchShopsByProvince = async (provinceId) => {
//   setIsLoading(true);
//   setIsSearching(true);
//   try {
//     const response = await axios.post(`${ApiBaseUrl.baseUrl}all/seller/profile?page=${currentPage}`, {
//       province_id: provinceId,
//       page: currentPage,
//     });
//     setShopList(response.data.data);
//     setNoShopsFound(response.data.data.length === 0);
//     setLastPage(response.data.last_page);
//   } catch (error) {
//     console.error("Error fetching shops by province", error);
//   } finally {
//     setIsLoading(false);
//   }
// };

// const fetchShopsByCity = async (cityId) => {
//   setIsLoading(true);
//   setIsSearching(true);
//   try {
//     const response = await axios.post(`${ApiBaseUrl.baseUrl}all/seller/profile?page=${currentPage}`, {
//       city_id: cityId,
//       page: currentPage,
//     });
//     setShopList(response.data.data);
//     setNoShopsFound(response.data.data.length === 0);
//     setLastPage(response.data.last_page);
//   } catch (error) {
//     console.error("Error fetching shops by city", error);
//   } finally {
//     setIsLoading(false);
//   }
// };

// const fetchShopsByArea = async (areaId) => {
//   setIsLoading(true);
//   setIsSearching(true);
//   try {
//     const response = await axios.post(`${ApiBaseUrl.baseUrl}all/seller/profile?page=${currentPage}`, {
//       area_id: areaId,
//       page: currentPage,
//     });
//     setShopList(response.data.data);
//     setNoShopsFound(response.data.data.length === 0);
//     setLastPage(response.data.last_page);
//   } catch (error) {
//     console.error("Error fetching shops by area", error);
//   } finally {
//     setIsLoading(false);
//   }
// };

// const loadMoreShops = async () => {
//   if (isLoading || currentPage >= lastPage) return;

//   setIsLoading(true);
//   try {
//     const response = await axios.post(`${ApiBaseUrl.baseUrl}all/seller/profile?page=${currentPage}`, {
//       page: currentPage,
//     });
//     setShopList((prevShopList) => [...prevShopList, ...response.data.data]);
//     setNoShopsFound(response.data.data.length === 0);
//     setLastPage(response.data.last_page);
//   } catch (error) {
//     console.error("Error fetching more shops", error);
//   } finally {
//     setIsLoading(false);
//   }
// };

//   return (
//     <>
//       <NextImage
//         alt="newArrivalBanner"
//         src={tizaraa_watermark}
//         priority
//         style={{
//           position: "fixed",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -20%)",
//           width: "100%",
//           height: "auto",
//           maxWidth: "1200px",
//           backgroundSize: "contain",
//           backgroundPosition: "center",
//           opacity: 0.1,
//           zIndex: 0,
//         }}
//       />

//       <main style={{ position: "relative", background: "none"}}>
//         <Fragment>
//           <div
//             style={{
//               display: "flex",
//               gap: "10px",
//               alignContent: "center",
//               alignItems: "center",
//               justifyContent: "center",
//               marginBottom: "20px",
//             }}
//           >
//             <H2 mb="20px">All Shops</H2>
//             <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
//               <SelectWrapper>
//                 <SelectField onChange={handleProvinceChange}>
//                   <option value="">Select Province</option>
//                   {provinces.map((province) => (
//                     <option key={province.id} value={province.id}>
//                       {province.province}
//                     </option>
//                   ))}
//                 </SelectField>
//                 <SelectField onChange={handleCityChange}>
//                   <option value="">Select City</option>
//                   {cities.map((city) => (
//                     <option key={city.id} value={city.id}>
//                       {city.city}
//                     </option>
//                   ))}
//                 </SelectField>
//                 <SelectField onChange={handleAreaChange}>
//                   <option value="">Select Area</option>
//                   {areas.map((area) => (
//                     <option key={area.id} value={area.id}>
//                       {area.area}
//                     </option>
//                   ))}
//                 </SelectField>
//               </SelectWrapper>
//             </Box>
//           </div>

//         <div
//           style={{
//             display: 'flex', // Always flex for side-by-side layout
//             flexDirection: window.innerWidth > 768 ? 'row' : 'column', // Stack vertically on small screens
//             height: window.innerWidth > 768 ? 'calc(100vh - 100px)' : 'auto', // Adjust height for larger screens
//             marginBottom: '20px',
//           }}
//         >
//           {/* Conditionally render Map first on mobile */}
//           {window.innerWidth <= 768 ? (
//             <>
//               {/* Map on top for mobile */}
//               <div
//                 style={{
//                   flex: '1', // Take remaining space
//                   height: window.innerWidth > 768 ? 'auto' : '400px', // Fixed height on mobile
//                   minHeight: '400px', // Ensure map has minimum height
//                 }}
//               >
//                 <VendorMapPage
//                   selectedProvince={selectedProvince}
//                   selectedCity={selectedCity}
//                   selectedArea={selectedArea}
//                   vendors={shopList} // Pass shopList as vendors
//                 />
//               </div>

//               {/* Shop List below on mobile */}
//               <div
//                 style={{
//                   flex: window.innerWidth > 768 ? '0 0 350px' : '1', // Fixed width on large screens, full width on mobile
//                   overflowY: 'auto', // Vertical scrollbar
//                   padding: '10px',
//                   borderRight: window.innerWidth > 768 ? '1px solid #ddd' : 'none', // Separator line on large screens
//                 }}
//               >
//                 {shopList.length > 0 ? (
//                   <div
//                     style={{
//                       display: 'flex',
//                       flexDirection: 'column',
//                       gap: '15px',
//                     }}
//                   >
//                     {shopList.map((item) => (
//                       <ShopCard1
//                         key={item.id}
//                         name={item.name}
//                         phone={item.phone}
//                         address={item.address || 'Address not found'}
//                         rating={item.rating || 5}
//                         imgUrl={
//                           item.profilePicture
//                             ? `${ApiBaseUrl.ImgUrl}${item.profilePicture}`
//                             : 'https://t4.ftcdn.net/jpg/04/15/60/27/360_F_415602715_uy5b6P84JetkpRCLxNmYgrx8pWIATsAD.jpg'
//                         }
//                         coverImgUrl={
//                           item.coverPicture
//                             ? `${ApiBaseUrl.ImgUrl}${item.coverPicture}`
//                             : 'https://static.vecteezy.com/system/resources/previews/011/059/783/non_2x/best-seller-text-button-speech-bubble-best-seller-colorful-web-banner-template-illustration-vector.jpg'
//                         }
//                         shopUrl={`/shops/${item.slug}`}
//                       />
//                     ))}
//                   </div>
//                 ) : (
//                   !isLoading && <NoShopMessage>No shop found</NoShopMessage>
//                 )}
//               </div>
//             </>
//           ) : (
//             <>
//               {/* Original layout for larger screens: Shop List on left, Map on right */}
//               <div
//                 style={{
//                   flex: window.innerWidth > 768 ? '0 0 350px' : '1', // Fixed width on large screens, full width on mobile
//                   overflowY: 'auto', // Vertical scrollbar
//                   padding: '10px',
//                   borderRight: window.innerWidth > 768 ? '1px solid #ddd' : 'none', // Separator line on large screens
//                 }}
//               >
//                 {shopList.length > 0 ? (
//                   <div
//                     style={{
//                       display: 'flex',
//                       flexDirection: 'column',
//                       gap: '15px',
//                     }}
//                   >
//                     {shopList.map((item) => (
//                       <ShopCard1
//                         key={item.id}
//                         name={item.name}
//                         phone={item.phone}
//                         address={item.address || 'Address not found'}
//                         rating={item.rating || 5}
//                         imgUrl={
//                           item.profilePicture
//                             ? `${ApiBaseUrl.ImgUrl}${item.profilePicture}`
//                             : 'https://t4.ftcdn.net/jpg/04/15/60/27/360_F_415602715_uy5b6P84JetkpRCLxNmYgrx8pWIATsAD.jpg'
//                         }
//                         coverImgUrl={
//                           item.coverPicture
//                             ? `${ApiBaseUrl.ImgUrl}${item.coverPicture}`
//                             : 'https://static.vecteezy.com/system/resources/previews/011/059/783/non_2x/best-seller-text-button-speech-bubble-best-seller-colorful-web-banner-template-illustration-vector.jpg'
//                         }
//                         shopUrl={`/shops/${item.slug}`}
//                       />
//                     ))}
//                   </div>
//                 ) : (
//                   !isLoading && <NoShopMessage>No shop found</NoShopMessage>
//                 )}
//               </div>

//               <div
//                 style={{
//                   flex: '1', // Take remaining space
//                   height: window.innerWidth > 768 ? 'auto' : '400px', // Fixed height on mobile
//                   minHeight: '400px', // Ensure map has minimum height
//                 }}
//               >
//                 <VendorMapPage
//                   selectedProvince={selectedProvince}
//                   selectedCity={selectedCity}
//                   selectedArea={selectedArea}
//                   vendors={shopList} // Pass shopList as vendors
//                 />
//               </div>
//             </>
//           )}
//         </div>

//           {/* {isLoading && (
//             <LoaderWrapper>
//               <Vortex />
//             </LoaderWrapper>
//           )} */}

//           <div ref={observerRef}></div>
//         </Fragment>
//       </main>
//     </>
//   );
// }

// ===============================

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import ApiBaseUrl from "api/ApiBaseUrl";
import VendorMapPage from "@sections/shop/VendorMapPage";
import Select from "@component/Select";

// Render select menus on <body> so the map pane cannot cover them
const menuOnTop = {
 menuPortalTarget: typeof document !== "undefined" ? document.body : undefined,
 menuPosition: "fixed" as const,
 styles: { menuPortal: (b: any) => ({ ...b, zIndex: 9999 }) },
};
import axios from "@lib/axiosClient";

// Store finder: header + filter bar, shop list beside a map (desktop) or a
// List / Map toggle (phones).

type Shop = {
 id: number;
 shop_name: string;
 shop_name_slug: string;
 seller_address?: string | null;
 province_name?: string | null;
 city_name?: string | null;
 area_name?: string | null;
 phone?: string | null;
 rating?: number | null;
 seller_logo?: string | null;
 seller_banner?: string | null;
 profilePicture?: string | null;
 coverPicture?: string | null;
 is_verified?: boolean;
 account_type?: "retail" | "corporate";
 lat?: string | null;
 lon?: string | null;
};

const rise = keyframes`
 from { opacity: 0; transform: translateY(10px); }
 to { opacity: 1; transform: none; }
`;
const shimmer = keyframes`
 from { background-position: -500px 0; }
 to { background-position: 500px 0; }
`;

const Page = styled.main`
 display: flex;
 flex-direction: column;
 gap: 18px;
 margin-bottom: 32px;

 .sh-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
  animation: ${rise} 400ms ease both;
 }
 .sh-head h1 {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 26px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .sh-count {
  padding: 3px 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
  font-size: 13px;
  font-weight: 700;
 }
 .sh-types {
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.paper};
 }
 .sh-types button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 34px;
  padding: 0 14px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.slate};
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease;
 }
 .sh-types button:hover {
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .sh-types button[aria-selected="true"] {
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
 }
 .sh-types button span {
  padding: 1px 7px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.mist};
  color: ${({ theme }) => theme.tz.color.inkSoft};
  font-size: 11px;
  font-weight: 700;
 }
 .sh-types button[aria-selected="true"] span {
  background: rgba(255, 255, 255, 0.22);
  color: #fff;
 }
 .sh-types button:focus-visible {
  outline: 2px solid ${({ theme }) => theme.tz.color.emberDeep};
  outline-offset: 2px;
 }
 .sh-head p {
  margin: 4px 0 0;
  font-size: 14px;
  color: ${({ theme }) => theme.tz.color.slate};
 }

 /* filters */
 .sh-filters {
  display: grid;
  grid-template-columns: minmax(220px, 1.3fr) repeat(3, minmax(150px, 1fr));
  gap: 12px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 18px;
  background: ${({ theme }) => theme.tz.color.paper};
  animation: ${rise} 400ms ease 60ms both;
 }
 .sh-search {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 12px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 12px;
  transition: border-color 160ms ease, box-shadow 160ms ease;
 }
 .sh-search:focus-within {
  border-color: ${({ theme }) => theme.tz.color.ember};
  box-shadow: 0 0 0 4px rgba(240, 80, 35, 0.12);
 }
 .sh-search svg {
  flex-shrink: 0;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .sh-search input {
  flex: 1;
  min-width: 0;
  height: 40px;
  border: 0 !important;
  outline: none !important;
  box-shadow: none !important;
  background: transparent;
  font-family: inherit;
  font-size: 14.5px;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .sh-chips {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  grid-column: 1 / -1;
 }
 .sh-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 32px;
  padding: 4px 4px 4px 14px;
  border: 1px solid rgba(194, 64, 15, 0.22);
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  transition: background 160ms ease, border-color 160ms ease;
 }
 .sh-chip:hover {
  border-color: rgba(194, 64, 15, 0.4);
  background: rgba(194, 64, 15, 0.14);
 }
 .sh-chip button {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgba(194, 64, 15, 0.12);
  color: inherit;
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease, transform 160ms ease;
 }
 .sh-chip button:hover {
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
  transform: scale(1.06);
 }
 .sh-chip button:focus-visible,
 .sh-clear:focus-visible {
  outline: 2px solid ${({ theme }) => theme.tz.color.emberDeep};
  outline-offset: 2px;
 }
 .sh-clear {
  min-height: 32px;
  padding: 0 14px;
  border: 1px solid transparent;
  border-radius: 999px;
  background: none;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.slate};
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease;
 }
 .sh-clear:hover {
  background: ${({ theme }) => theme.tz.color.mist};
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }

 /* phone toggle */
 .sh-toggle {
  display: none;
  padding: 4px;
  border-radius: 12px;
  background: ${({ theme }) => theme.tz.color.lineSoft};
 }
 .sh-toggle button {
  flex: 1;
  min-height: 38px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.slate};
  cursor: pointer;
 }
 .sh-toggle button[aria-pressed="true"] {
  background: #fff;
  color: ${({ theme }) => theme.tz.color.emberDeep};
  box-shadow: 0 2px 8px rgba(20, 21, 32, 0.08);
 }

 /* list + map */
 .sh-body {
  display: grid;
  grid-template-columns: 380px minmax(0, 1fr);
  gap: 18px;
  align-items: start;
 }
 .sh-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-height: calc(100vh - 140px);
  padding: 2px 6px 2px 2px;
  overflow-y: auto;
  scrollbar-width: thin;
 }
 .sh-map {
  position: sticky;
  top: 20px;
  height: calc(100vh - 140px);
  min-height: 420px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 20px;
  background: ${({ theme }) => theme.tz.color.mist};
  animation: ${rise} 440ms ease 120ms both;
 }

 /* shop card */
 .sc {
  position: relative;
  /* the list scrolls; cards must keep their full height, not shrink to fit */
  flex-shrink: 0;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 18px;
  background: ${({ theme }) => theme.tz.color.paper};
  animation: ${rise} 380ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(min(var(--i, 0), 8) * 60ms);
  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 220ms ease, border-color 180ms ease;
 }
 .sc:hover {
  transform: translateY(-3px);
  border-color: #f6b9a3;
  box-shadow: 0 14px 30px rgba(14, 52, 96, 0.1);
 }
 .sc-banner {
  height: 84px;
  overflow: hidden;
  background: linear-gradient(120deg, ${({ theme }) => theme.tz.color.navy} 0%, #1d4f8a 55%, ${({ theme }) => theme.tz.color.ember} 140%);
 }
 .sc-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 400ms ease;
 }
 .sc:hover .sc-banner img {
  transform: scale(1.06);
 }
 .sc-body {
  padding: 0 16px 16px;
 }
 .sc-top {
  /* keep logo + name above the banner when its image zooms on hover */
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: -28px;
 }
 .sc-logo {
  display: grid;
  place-items: center;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  overflow: hidden;
  border: 3px solid #fff;
  border-radius: 18px;
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 22px;
  font-weight: 800;
  box-shadow: 0 6px 16px rgba(14, 52, 96, 0.15);
 }
 .sc-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #fff;
 }
 .sc-name {
  min-width: 0;
  /* start below the banner edge so the name sits on white, not on the image */
  margin-top: 34px;
 }
 .sc-name h3 {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  overflow: hidden;
  font-size: 16px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.ink};
  text-overflow: ellipsis;
  white-space: nowrap;
 }
 .sc-verified {
  display: inline-flex;
  flex-shrink: 0;
  color: ${({ theme }) => theme.tz.color.navy};
 }
 .sc-rating {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12.5px;
  font-weight: 700;
  color: #b77d00;
 }
 .sc-rating.is-new {
  color: ${({ theme }) => theme.tz.color.slate};
  font-weight: 600;
 }
 .sc-rows {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 12px 0 14px;
 }
 .sc-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 0;
  font-size: 13px;
  line-height: 1.45;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }
 .sc-row svg {
  flex-shrink: 0;
  margin-top: 2px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .sc-row a {
  color: inherit;
  text-decoration: none;
 }
 .sc-row a:hover {
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .sc-muted {
  color: ${({ theme }) => theme.tz.color.slate};
  font-style: italic;
 }
 .sc-visit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 42px;
  border-radius: 12px;
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
  font-size: 14px;
  font-weight: 800;
  text-decoration: none;
  transition: background-color 180ms ease, color 180ms ease;
 }
 .sc-visit svg {
  transition: transform 220ms ease;
 }
 .sc:hover .sc-visit,
 .sc-visit:focus-visible {
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
 }
 .sc:hover .sc-visit svg {
  transform: translateX(3px);
 }
 .sc-visit:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 .sh-skel {
  flex-shrink: 0;
  height: 230px;
  border-radius: 18px;
  background: linear-gradient(90deg, ${({ theme }) => theme.tz.color.mist} 0%, ${({ theme }) => theme.tz.color.lineSoft} 50%, ${({ theme }) => theme.tz.color.mist} 100%);
  background-size: 1000px 100%;
  animation: ${shimmer} 1.3s linear infinite;
 }
 .sh-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 40px 16px;
  border: 2px dashed ${({ theme }) => theme.tz.color.line};
  border-radius: 18px;
  text-align: center;
 }
 .sh-empty strong {
  font-size: 16px;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .sh-empty span {
  font-size: 13.5px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .sh-empty button {
  margin-top: 6px;
  padding: 9px 18px;
  border: 0;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
  font-family: inherit;
  font-weight: 700;
  cursor: pointer;
 }

 @media (max-width: 1100px) {
  .sh-filters {
   grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .sh-search {
   grid-column: 1 / -1;
  }
 }
 @media (max-width: 900px) {
  .sh-toggle {
   display: flex;
  }
  .sh-body {
   grid-template-columns: minmax(0, 1fr);
  }
  .sh-list {
   max-height: none;
   overflow: visible;
  }
  .sh-map {
   position: static;
   height: 480px;
  }
  .sh-body[data-view="list"] .sh-map,
  .sh-body[data-view="map"] .sh-list {
   display: none;
  }
 }
 @media (max-width: 600px) {
  .sh-filters {
   grid-template-columns: minmax(0, 1fr);
  }
 }
 @media (prefers-reduced-motion: reduce) {
  .sh-head,
  .sh-filters,
  .sh-map,
  .sc,
  .sh-skel {
   animation: none;
  }
  .sc,
  .sc-banner img,
  .sc-visit,
  .sc-visit svg {
   transition: none;
  }
  .sc:hover {
   transform: none;
  }
 }
`;

const Ico = ({ d, size = 15 }: { d: string; size?: number }) => (
 <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  <path d={d} />
 </svg>
);
const I = {
 search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-3.5-3.5",
 pin: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
 phone:
  "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z",
 arrow: "M5 12h14M13 6l6 6-6 6",
 x: "M18 6 6 18M6 6l12 12",
};
const img = (p?: string | null) => (p ? (p.startsWith("http") ? p : `${ApiBaseUrl.ImgUrl}${p}`) : null);

function ShopCard({ shop, index }: { shop: Shop; index: number }) {
 const logo = img(shop.seller_logo || shop.profilePicture);
 const banner = img(shop.seller_banner || shop.coverPicture);
 // only the location parts that exist, no repeats
 const parts = [shop.area_name, shop.city_name, shop.province_name]
  .map((v) => String(v ?? "").trim())
  .filter(Boolean)
  .filter((v, i, a) => a.findIndex((x) => x.toLowerCase() === v.toLowerCase()) === i);
 const rating = Number(shop.rating) || 0;
 return (
  <article className="sc" style={{ ["--i" as any]: index }}>
   <div className="sc-banner">{banner && <img src={banner} alt="" loading="lazy" />}</div>
   <div className="sc-body">
    <div className="sc-top">
     <span className="sc-logo">{logo ? <img src={logo} alt="" loading="lazy" /> : (shop.shop_name || "?").trim().charAt(0).toUpperCase()}</span>
     <div className="sc-name">
      <h3 title={shop.shop_name}>
       {shop.shop_name}
       {shop.is_verified && (
        <span className="sc-verified" title="Verified seller" aria-label="Verified seller">
         <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="m12 1 2.6 2.1 3.3-.3.9 3.2 2.9 1.6-1.1 3.1 1.1 3.1-2.9 1.6-.9 3.2-3.3-.3L12 23l-2.6-2.1-3.3.3-.9-3.2-2.9-1.6L3.4 13 2.3 9.9l2.9-1.6.9-3.2 3.3.3z" />
          <path d="m8 12 3 3 5-6" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
         </svg>
        </span>
       )}
      </h3>
      {rating > 0 ? (
       <span className="sc-rating">★ {rating.toFixed(1)}</span>
      ) : (
       <span className="sc-rating is-new">New shop · no ratings yet</span>
      )}
     </div>
    </div>
    <div className="sc-rows">
     <p className="sc-row">
      <Ico d={I.pin} />
      {parts.length ? <span>{parts.join(", ")}</span> : <span className="sc-muted">Location not added</span>}
     </p>
     {shop.phone && (
      <p className="sc-row">
       <Ico d={I.phone} />
       <a href={`tel:${shop.phone}`}>{shop.phone}</a>
      </p>
     )}
    </div>
    <Link className="sc-visit" href={`/shops/${shop.shop_name_slug}`}>
     Visit shop
     <Ico d={I.arrow} size={16} />
    </Link>
   </div>
  </article>
 );
}

export default function ShopList() {
 const [shopList, setShopList] = useState<Shop[]>([]);
 const [isLoading, setIsLoading] = useState(true);
 const [provinces, setProvinces] = useState<any[]>([]);
 const [selectedProvince, setSelectedProvince] = useState("");
 const [selectedCity, setSelectedCity] = useState("");
 const [selectedArea, setSelectedArea] = useState("");
 const [searchQuery, setSearchQuery] = useState("");
 const [view, setView] = useState<"list" | "map">("list");
 const [shopType, setShopType] = useState<"all" | "retail" | "corporate">("all");

 const cities = useMemo(
  () => provinces.find((p) => String(p.id) === String(selectedProvince))?.city ?? [],
  [provinces, selectedProvince]
 );
 const areas = useMemo(() => cities.find((c: any) => String(c.id) === String(selectedCity))?.areas ?? [], [cities, selectedCity]);

 useEffect(() => {
  axios
   .get(`${ApiBaseUrl.localApiUrl}address/hierarchy`)
   .then((r) => setProvinces(Array.isArray(r.data) ? r.data : []))
   .catch((e) => console.error("Error fetching provinces", e));
 }, []);

 // Fetch for the narrowest filter picked; debounce so typing doesn't spam
 useEffect(() => {
  let alive = true;
  const timer = setTimeout(async () => {
   setIsLoading(true);
   const body = selectedArea
    ? { area_id: selectedArea }
    : selectedCity
    ? { city_id: selectedCity }
    : selectedProvince
    ? { province_id: selectedProvince }
    : {};
   try {
    const response = await axios.post(`${ApiBaseUrl.localApiUrl}all/seller/profile`, body);
    if (alive) setShopList(response.data?.sellerDetails || []);
   } catch (error) {
    console.error("Error fetching shops", error);
    if (alive) setShopList([]);
   } finally {
    if (alive) setIsLoading(false);
   }
  }, 250);
  return () => {
   alive = false;
   clearTimeout(timer);
  };
 }, [selectedProvince, selectedCity, selectedArea]);

 // name search + Retail/Corporate tab work together with the area filters
 const typeOf = (s: Shop) => (s.account_type === "corporate" ? "corporate" : "retail");
 const visible = useMemo(() => {
  const q = searchQuery.trim().toLowerCase();
  return shopList.filter(
   (s) => (shopType === "all" || typeOf(s) === shopType) && (!q || (s.shop_name || "").toLowerCase().includes(q))
  );
 }, [shopList, searchQuery, shopType]);
 const typeCount = useMemo(
  () => ({
   all: shopList.length,
   retail: shopList.filter((s) => typeOf(s) === "retail").length,
   corporate: shopList.filter((s) => typeOf(s) === "corporate").length,
  }),
  [shopList]
 );

 const provName = provinces.find((p) => String(p.id) === String(selectedProvince))?.province;
 const cityName = cities.find((c: any) => String(c.id) === String(selectedCity))?.city;
 const areaName = areas.find((a: any) => String(a.id) === String(selectedArea))?.area;

 const setProvince = (id: string) => {
  setSelectedProvince(id);
  setSelectedCity("");
  setSelectedArea("");
 };
 const setCity = (id: string) => {
  setSelectedCity(id);
  setSelectedArea("");
 };
 const clearAll = () => {
  setSearchQuery("");
  setProvince("");
  setShopType("all");
 };
 const hasFilters = Boolean(searchQuery.trim() || selectedProvince);

 return (
  <Page>
   <header className="sh-head">
    <div>
     <h1>
      All Shops
      {!isLoading && <span className="sh-count">{visible.length}</span>}
     </h1>
     <p>Find trusted sellers near you</p>
    </div>
    {/* corporate shops only come back for corporate employees, so retail users never see these tabs */}
    {typeCount.corporate > 0 && (
    <div className="sh-types" role="tablist" aria-label="Shop type">
     {(["all", "retail", "corporate"] as const).map((t) => (
      <button key={t} type="button" role="tab" aria-selected={shopType === t} onClick={() => setShopType(t)}>
       {t === "all" ? "All" : t === "retail" ? "Retail" : "Corporate"}
       {!isLoading && <span>{typeCount[t]}</span>}
      </button>
     ))}
    </div>
    )}
   </header>

   <section className="sh-filters" aria-label="Filter shops">
    <label className="sh-search">
     <Ico d={I.search} size={17} />
     <input type="search" placeholder="Search by shop name" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} aria-label="Search by shop name" />
    </label>
    <Select
     placeholder="Division"
     options={provinces.map((p) => ({ value: String(p.id), label: p.province }))}
     value={selectedProvince ? { value: selectedProvince, label: provName } : null}
     onChange={(o: any) => setProvince(o ? String(o.value) : "")}
     isClearable
     {...menuOnTop}
    />
    <Select
     placeholder={selectedProvince ? "City" : "Pick a division first"}
     isDisabled={!selectedProvince || cities.length === 0}
     options={cities.map((c: any) => ({ value: String(c.id), label: c.city }))}
     value={selectedCity ? { value: selectedCity, label: cityName } : null}
     onChange={(o: any) => setCity(o ? String(o.value) : "")}
     isClearable
     {...menuOnTop}
    />
    <Select
     placeholder={selectedCity ? "Area" : "Pick a city first"}
     isDisabled={!selectedCity || areas.length === 0}
     options={areas.map((a: any) => ({ value: String(a.id), label: a.area }))}
     value={selectedArea ? { value: selectedArea, label: areaName } : null}
     onChange={(o: any) => setSelectedArea(o ? String(o.value) : "")}
     isClearable
     {...menuOnTop}
    />
    {hasFilters && (
     <div className="sh-chips">
      {searchQuery.trim() && (
       <span className="sh-chip">
        “{searchQuery.trim()}”
        <button type="button" aria-label="Clear search" onClick={() => setSearchQuery("")}>
         <Ico d={I.x} size={11} />
        </button>
       </span>
      )}
      {provName && (
       <span className="sh-chip">
        {provName}
        <button type="button" aria-label="Clear division" onClick={() => setProvince("")}>
         <Ico d={I.x} size={11} />
        </button>
       </span>
      )}
      {cityName && (
       <span className="sh-chip">
        {cityName}
        <button type="button" aria-label="Clear city" onClick={() => setCity("")}>
         <Ico d={I.x} size={11} />
        </button>
       </span>
      )}
      {areaName && (
       <span className="sh-chip">
        {areaName}
        <button type="button" aria-label="Clear area" onClick={() => setSelectedArea("")}>
         <Ico d={I.x} size={11} />
        </button>
       </span>
      )}
      <button type="button" className="sh-clear" onClick={clearAll}>
       Clear all
      </button>
     </div>
    )}
   </section>

   <div className="sh-toggle" role="group" aria-label="View">
    <button type="button" aria-pressed={view === "list"} onClick={() => setView("list")}>
     ☰ List
    </button>
    <button type="button" aria-pressed={view === "map"} onClick={() => setView("map")}>
     🗺 Map
    </button>
   </div>

   <div className="sh-body" data-view={view}>
    <div className="sh-list" aria-busy={isLoading}>
     {isLoading ? (
      <>
       <div className="sh-skel" />
       <div className="sh-skel" />
       <div className="sh-skel" />
      </>
     ) : visible.length > 0 ? (
      visible.map((shop, i) => <ShopCard key={shop.id} shop={shop} index={i} />)
     ) : (
      <div className="sh-empty">
       <strong>No shops found</strong>
       <span>Try another name or a wider area.</span>
       {hasFilters && (
        <button type="button" onClick={clearAll}>
         Clear filters
        </button>
       )}
      </div>
     )}
    </div>
    <div className="sh-map">
     <VendorMapPage selectedProvince={selectedProvince} selectedCity={selectedCity} selectedArea={selectedArea} vendors={visible as any} />
    </div>
   </div>
  </Page>
 );
}
