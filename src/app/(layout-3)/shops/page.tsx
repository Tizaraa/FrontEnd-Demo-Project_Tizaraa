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
import { Fragment, useEffect, useState, useRef } from "react";
import Grid from "@component/grid/Grid";
import axios from "axios";
import FlexBox from "@component/FlexBox";
import ShopCard1 from "@sections/shop/ShopCard1";
import { H2 } from "@component/Typography";
import { Vortex } from "react-loader-spinner";
import styled from "@emotion/styled";
import Box from "@component/Box";
import ApiBaseUrl from "api/ApiBaseUrl";
import tizaraa_watermark from "../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png";
import Image from "next/image";
import NextImage from "@component/NextImage";
import VendorMapPage from "@sections/shop/VendorMapPage";
import { Autocomplete, TextField } from "@mui/material";

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

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
`;

const SelectField = styled.select`
  width: 100%;
  max-width: 300px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export default function ShopList() {
const [shopList, setShopList] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [noShopsFound, setNoShopsFound] = useState(false);
const [provinces, setProvinces] = useState([]);
const [cities, setCities] = useState([]);
const [areas, setAreas] = useState([]);
const [selectedProvince, setSelectedProvince] = useState("");
const [selectedCity, setSelectedCity] = useState("");
const [selectedArea, setSelectedArea] = useState("");
const [isSearching, setIsSearching] = useState(false);
const [searchQuery, setSearchQuery] = useState(""); // State for global search input

useEffect(() => {
  fetchProvinces();
  fetchAllShops();
}, []);

const fetchProvinces = async () => {
  try {
    // const response = await axios.get("https://frontend.tizaraa.com/api/all/address");
    const response = await axios.get(`${ApiBaseUrl.baseUrl}all/address`);
    setProvinces(response.data);
  } catch (error) {
    console.error("Error fetching provinces", error);
  }
};

const handleProvinceChange = async (e) => {
  const provinceId = e.target.value;
  setSelectedProvince(provinceId);
  setCities([]);
  setAreas([]);
  setSelectedCity("");
  setSelectedArea("");

  if (provinceId) {
    const province = provinces.find((p) => p.id === parseInt(provinceId));
    if (province && province.city) {
      setCities(province.city);
    }
    await fetchShopsByProvince(provinceId);
  } else {
    fetchAllShops();
  }
};

const handleCityChange = async (e) => {
  const cityId = e.target.value;
  setSelectedCity(cityId);
  setAreas([]);
  setSelectedArea("");

  if (cityId) {
    const city = cities.find((c) => c.id === parseInt(cityId));
    if (city && city.areas) {
      setAreas(city.areas);
    }
    await fetchShopsByCity(cityId);
  } else {
    fetchAllShops();
  }
};

const handleAreaChange = async (e) => {
  const areaId = e.target.value;
  setSelectedArea(areaId);

  if (areaId) {
    await fetchShopsByArea(areaId);
  } else {
    fetchAllShops();
  }
};

// Add useEffect to handle searchQuery changes
useEffect(() => {
  const timer = setTimeout(() => {
    // Trigger search when query changes
    if (selectedArea) {
      fetchShopsByArea(selectedArea);
    } else if (selectedCity) {
      fetchShopsByCity(selectedCity);
    } else if (selectedProvince) {
      fetchShopsByProvince(selectedProvince);
    } else {
      fetchAllShops();
    }
  }, 300); // Debounce for 300ms

  return () => clearTimeout(timer);
}, [searchQuery, selectedProvince, selectedCity, selectedArea]);


const handleSearchChange = (e) => {
  const value = e.target.value;
  setSearchQuery(value);
};

const fetchAllShops = async () => {
  setIsLoading(true);
  setIsSearching(false);
  try {
    // const response = await axios.post(`https://frontend.tizaraa.shop/api/all/seller/profile`, {});
    const response = await axios.post(`${ApiBaseUrl.baseUrl}all/seller/profile`, {});
    let shops = response.data.sellerDetails || [];
    
    if (searchQuery.trim()) {
      shops = shops.filter((shop) =>
        shop.shop_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setShopList(shops);
    setNoShopsFound(shops.length === 0);
  } catch (error) {
    console.error("Error fetching shops", error);
  } finally {
    setIsLoading(false);
  }
};

const fetchShopsByProvince = async (provinceId) => {
  setIsLoading(true);
  setIsSearching(true);
  try {
    // const response = await axios.post(`https://frontend.tizaraa.shop/api/all/seller/profile`, {
      const response = await axios.post(`${ApiBaseUrl.baseUrl}all/seller/profile`, {
      province_id: provinceId,
    });
    const shops = response.data.sellerDetails || [];
    setShopList(shops);
    setNoShopsFound(shops.length === 0);
  } catch (error) {
    console.error("Error fetching shops by province", error);
  } finally {
    setIsLoading(false);
  }
};


const fetchShopsByCity = async (cityId) => {
  setIsLoading(true);
  setIsSearching(true);
  try {
    // const response = await axios.post(`https://frontend.tizaraa.shop/api/all/seller/profile`, {
      const response = await axios.post(`${ApiBaseUrl.baseUrl}all/seller/profile`, {
      city_id: cityId,
    });
    const shops = response.data.sellerDetails || [];
    setShopList(shops);
    setNoShopsFound(shops.length === 0);
  } catch (error) {
    console.error("Error fetching shops by city", error);
  } finally {
    setIsLoading(false);
  }
};


const fetchShopsByArea = async (areaId) => {
  setIsLoading(true);
  setIsSearching(true);
  try {
    // const response = await axios.post(`https://frontend.tizaraa.shop/api/all/seller/profile`, {
      const response = await axios.post(`${ApiBaseUrl.baseUrl}all/seller/profile`, {
      area_id: areaId,
    });
    const shops = response.data.sellerDetails || [];
    setShopList(shops);
    setNoShopsFound(shops.length === 0);
  } catch (error) {
    console.error("Error fetching shops by area", error);
  } finally {
    setIsLoading(false);
  }
};


// const fetchShopsByProvince = async (provinceId) => {
//   setIsLoading(true);
//   setIsSearching(true);
//   try {
//     const response = await axios.post(`https://frontend.tizaraa.shop/api/all/seller/profile`, {
//       province_id: provinceId,
//       ...(searchQuery.trim() && { shop_name: searchQuery }),
//     });
//     const shops = response.data.sellerDetails || [];
//     setShopList(shops);
//     setNoShopsFound(shops.length === 0);
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
//     const response = await axios.post(`https://frontend.tizaraa.shop/api/all/seller/profile`, {
//       city_id: cityId,
//       ...(searchQuery.trim() && { shop_name: searchQuery }),
//     });
//     const shops = response.data.sellerDetails || [];
//     setShopList(shops);
//     setNoShopsFound(shops.length === 0);
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
//     const response = await axios.post(`https://frontend.tizaraa.shop/api/all/seller/profile`, {
//       area_id: areaId,
//       ...(searchQuery.trim() && { shop_name: searchQuery }),
//     });
//     const shops = response.data.sellerDetails || [];
//     setShopList(shops);
//     setNoShopsFound(shops.length === 0);
//   } catch (error) {
//     console.error("Error fetching shops by area", error);
//   } finally {
//     setIsLoading(false);
//   }
// };

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

      <main style={{ position: "relative", background: "none"}}>
        <Fragment>
          <div
            style={{
              display: "flex",
              // gap: "10px",
              // alignContent: "center",
              alignItems: "flex-end",
              // justifyContent: "center",
              marginBottom: "20px",
              padding: "0px 10px",
            }}
          >
          <div>
            <H2 mb="20px"
            style={{
              color: "#E94560",
            }}
            >All Shops</H2>
            
            <TextField
              label="Search by Shop Name"
              variant="outlined"
              value={searchQuery}
              // onChange={(e) => handleSearchChange(e.target.value)}
              onChange={handleSearchChange}
              sx={{ width: 300 }}
              // fullWidth
           />
          </div>

            {/* <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
              <SelectWrapper>
                <SelectField onChange={handleProvinceChange}>
                  <option value="">Select Province</option>
                  {provinces.map((province) => (
                    <option key={province.id} value={province.id}>
                      {province.province}
                    </option>
                  ))}
                </SelectField>
                <SelectField onChange={handleCityChange}>
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.city}
                    </option>
                  ))}
                </SelectField>
                <SelectField onChange={handleAreaChange}>
                  <option value="">Select Area</option>
                  {areas.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.area}
                    </option>
                  ))}
                </SelectField>
              </SelectWrapper>
            </Box> */}

            {/* ==================================================================== */}

              <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >

                  <Autocomplete
                    options={provinces}
                    getOptionLabel={(option) => option.province || ""}
                    value={provinces.find((p) => p.id === parseInt(selectedProvince)) || null}
                    onChange={(event, value) => handleProvinceChange({ target: { value: value ? value.id : "" } })}
                    renderInput={(params) => <TextField {...params} label="Select Province" variant="outlined" />}
                    sx={{ width: 300 }}
                  />

                  <Autocomplete
                    options={cities}
                    getOptionLabel={(option) => option.city || ""}
                    value={cities.find((c) => c.id === parseInt(selectedCity)) || null}
                    onChange={(event, value) => handleCityChange({ target: { value: value ? value.id : "" } })}
                    renderInput={(params) => <TextField {...params} label="Select City" variant="outlined" />}
                    disabled={!selectedProvince || cities.length === 0}
                    sx={{ width: 300 }}
                  />

                  <Autocomplete
                    options={areas}
                    getOptionLabel={(option) => option.area || ""}
                    value={areas.find((a) => a.id === parseInt(selectedArea)) || null}
                    onChange={(event, value) => handleAreaChange({ target: { value: value ? value.id : "" } })}
                    renderInput={(params) => <TextField {...params} label="Select Area" variant="outlined" />}
                    disabled={!selectedCity || areas.length === 0}
                    sx={{ width: 300 }}
                  />

                  {/* <TextField
                    label="Search by Shop Name"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    sx={{ width: 300 }}
                  /> */}
                </div>
            </Box>
          </div>


        <div
          style={{
            display: 'flex', // Always flex for side-by-side layout
            flexDirection: window.innerWidth > 768 ? 'row' : 'column', // Stack vertically on small screens
            height: window.innerWidth > 768 ? 'calc(100vh - 100px)' : 'auto', // Adjust height for larger screens
            marginBottom: '20px',
          }}
        >
          {/* Conditionally render Map first on mobile */}
          {window.innerWidth <= 768 ? (
            <>
              {/* Map on top for mobile */}
              <div
                style={{
                  flex: '1', // Take remaining space
                  height: window.innerWidth > 768 ? 'auto' : '400px', // Fixed height on mobile
                  minHeight: '400px', // Ensure map has minimum height
                }}
              >
                <VendorMapPage
                  selectedProvince={selectedProvince}
                  selectedCity={selectedCity}
                  selectedArea={selectedArea}
                  vendors={shopList} // Pass shopList as vendors
                />
              </div>

              {/* Shop List below on mobile */}
              <div
                style={{
                  flex: window.innerWidth > 768 ? '0 0 350px' : '1', // Fixed width on large screens, full width on mobile
                  overflowY: 'auto', // Vertical scrollbar
                  padding: '10px',
                  borderRight: window.innerWidth > 768 ? '1px solid #ddd' : 'none', // Separator line on large screens
                }}
              >
                {shopList.length > 0 ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '15px',
                    }}
                  >
                    {shopList.map((item) => (
                      <ShopCard1
                        key={item.id}
                        shop_name={item.shop_name}
                        phone={item.phone}
                        seller_address={item.seller_address || 'Address not found'}
                        province_name={item.province_name}
                        city_name={item.city_name}
                        area_name={item.area_name}
                        rating={item.rating || 5}
                        imgUrl={
                          item.profilePicture
                            ? `${ApiBaseUrl.ImgUrl}${item.profilePicture}`
                            : 'https://t4.ftcdn.net/jpg/04/15/60/27/360_F_415602715_uy5b6P84JetkpRCLxNmYgrx8pWIATsAD.jpg'
                        }
                        coverImgUrl={
                          item.coverPicture
                            ? `${ApiBaseUrl.ImgUrl}${item.coverPicture}`
                            : 'https://static.vecteezy.com/system/resources/previews/011/059/783/non_2x/best-seller-text-button-speech-bubble-best-seller-colorful-web-banner-template-illustration-vector.jpg'
                        }
                        shop_name_slug={`/shops/${item.shop_name_slug}`}
                      />
                    ))}
                  </div>
                ) : (
                  !isLoading && <NoShopMessage>No shop found</NoShopMessage>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Original layout for larger screens: Shop List on left, Map on right */}
              <div
                style={{
                  flex: window.innerWidth > 768 ? '0 0 350px' : '1', // Fixed width on large screens, full width on mobile
                  overflowY: 'auto', // Vertical scrollbar
                  padding: '10px',
                  borderRight: window.innerWidth > 768 ? '1px solid #ddd' : 'none', // Separator line on large screens
                }}
              >
                {shopList.length > 0 ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '15px',
                    }}
                  >
                    {shopList.map((item) => (
                      <ShopCard1
                        key={item.id}
                        shop_name={item.shop_name}
                        phone={item.phone}
                        seller_address={item.seller_address || 'Address not found'}
                        province_name={item.province_name}
                        city_name={item.city_name}
                        area_name={item.area_name}
                        rating={item.rating || 5}
                        // seller_logo={item.seller_logo}
                        imgUrl={
                          item.seller_logo
                            ? `${ApiBaseUrl.ImgUrl}${item.seller_logo}`
                            : 'https://t4.ftcdn.net/jpg/04/15/60/27/360_F_415602715_uy5b6P84JetkpRCLxNmYgrx8pWIATsAD.jpg'
                        }
                        coverImgUrl={
                          item.seller_banner
                            ? `${ApiBaseUrl.ImgUrl}${item.seller_banner}`
                            : 'https://static.vecteezy.com/system/resources/previews/011/059/783/non_2x/best-seller-text-button-speech-bubble-best-seller-colorful-web-banner-template-illustration-vector.jpg'
                        }
                        shop_name_slug={`/shops/${item.shop_name_slug}`}
                      />
                    ))}
                  </div>
                ) : (
                  !isLoading && <NoShopMessage>No shop found</NoShopMessage>
                )}
              </div>

              <div
                style={{
                  flex: '1', // Take remaining space
                  height: window.innerWidth > 768 ? 'auto' : '400px', // Fixed height on mobile
                  minHeight: '400px', // Ensure map has minimum height
                }}
              >
                <VendorMapPage
                  selectedProvince={selectedProvince}
                  selectedCity={selectedCity}
                  selectedArea={selectedArea}
                  vendors={shopList} // Pass shopList as vendors
                />
              </div>
            </>
          )}
        </div>


          {/* {isLoading && (
            <LoaderWrapper>
              <Vortex />
            </LoaderWrapper>
          )} */}

          {/* <div ref={observerRef}></div> */}
        </Fragment>
      </main>
    </>
  );
}
