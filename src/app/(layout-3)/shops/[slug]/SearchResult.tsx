// "use client";
// import React from "react";
// import { useRouter } from "next/navigation";
// import { useCallback, useEffect, useState } from "react";
// import Box from "@component/Box";
// import Card from "@component/Card";
// import Select from "@component/Select";
// import Icon from "@component/icon/Icon";
// import Grid from "@component/grid/Grid";
// import FlexBox from "@component/FlexBox";
// import { Button, IconButton } from "@component/buttons";
// import Sidenav from "@component/sidenav/Sidenav";
// import Typography, { H5, Paragraph } from "@component/Typography";

// import ProductGridView from "@component/products/ProductCard1List";
// import ProductListView from "@component/products/ProductCard9List";
// import ProductFilterCard from "@component/products/ProductFilterCard";
// import useWindowSize from "@hook/useWindowSize";
// import { Vortex } from "react-loader-spinner";
// import styled from "@emotion/styled";
// import ApiBaseUrl from "api/ApiBaseUrl";
// import ShopProductFilterCard from "@component/products/ShopProductFilterCard";
// import BeatLoader from "react-spinners/BeatLoader";

// // import tizaraa_watermark from "../../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png"
// import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png";
// import Image from "next/image";
// import NextImage from "@component/NextImage";
// import Loader from "@component/loader";

// // const LoaderWrapper = styled.div`
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// // `;

// const productsPerPage = 10;

// export default function SearchResult({ sortOptions, slug }) {
//   const router = useRouter();
//   const width = useWindowSize();
//   const [view, setView] = useState<"grid" | "list">("grid");
//   const [selectedSortOption, setSelectedSortOption] = useState(
//     sortOptions[0].value
//   );
//   const [selectedBrand, setSelectedBrand] = useState<any[] | null>(null);
//   const [selectedCategory, setSelectedCategory] = useState<number[] | null>(
//     null
//   );
//   const [selectedCountry, setSelectedCountry] = useState<number[] | null>(null); // Track selected country
//   const [selectedProvinces, setSelectedProvinces] = useState<number[]>([]);
//   const [products, setProducts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   let pageType = "shop";

//   const isTablet = width < 1025;

//   const handleBrandChange = (brand: any[]) => {
//     setSelectedBrand(brand);
//     setCurrentPage(1); // Reset to first page
//   };

//   const handleCategoryChange = (categories: number[]) => {
//     setSelectedCategory(categories);
//     setCurrentPage(1);
//     // router.push(`/product/search/${categories}`);
//   };

//   const handleCountryChange = (countries: number[]) => {
//     setSelectedCountry(countries); // Update selected countries
//     setCurrentPage(1); // Reset to first page
//   };

//   const handleProvinceChange = (provinces: number[]) => {
//     setSelectedProvinces(provinces);
//     setCurrentPage(1);
//   };

//   const handleSortChange = (sortOption: any) => {
//     setSelectedSortOption(sortOption.value);
//   };

//   const fetchProducts = useCallback(async () => {
//     setLoading(true);

//     // Prepare the filter object
//     const filters: any = {};
//     if (selectedCategory) filters.category = selectedCategory;
//     if (selectedBrand && selectedBrand.length) filters.brand = selectedBrand;
//     if (selectedCountry && selectedCountry.length)
//       filters.country = selectedCountry;
//     if (selectedProvinces && selectedProvinces.length)
//       filters.province = selectedProvinces;

//     try {
//       // const response = await fetch(
//       //   `${ApiBaseUrl.baseUrl}seller/products/${slug}`,
//       //   {
//       //     method: "POST",
//       //     headers: {
//       //       "Content-Type": "application/json",
//       //     },
//       //     body: JSON.stringify({
//       //       ...filters, // Include only valid filters
//       //       page: currentPage,
//       //       orderBy: selectedSortOption,
//       //     }),
//       //   }
//       // );

//       const response = await fetch(
//         `${
//           ApiBaseUrl.baseUrl
//         }seller/products/${slug}?productsearch=${encodeURIComponent(
//           searchTerm
//         )}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             ...filters,
//             page: currentPage,
//             orderBy: selectedSortOption,
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();
//       console.log("Shop Details:", data);

//       // Reset products when fetching the first page
//       if (currentPage === 1) {
//         setProducts(data.data);
//       } else {
//         setProducts((prevProducts) => [...prevProducts, ...data.data]);
//       }
//       setTotalProducts(data.total);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [
//     selectedBrand,
//     selectedCategory,
//     selectedCountry,
//     selectedProvinces,
//     currentPage,
//     selectedSortOption,
//     searchTerm,
//   ]);

//   // useEffect(() => {
//   //   fetchProducts();
//   // }, [fetchProducts]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       fetchProducts();
//     }, 500); // wait 500ms after typing
//     return () => clearTimeout(timer);
//   }, [searchTerm, fetchProducts]);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   const handleLoadMore = () => {
//     setCurrentPage((prevPage) => prevPage + 1);
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
//           width: "100%", // Set to 100% to ensure full responsiveness
//           height: "auto", // Maintain aspect ratio
//           maxWidth: "1200px", // Optional: Limit the maximum width
//           backgroundSize: "contain", // Adjust the scaling behavior
//           backgroundPosition: "center",
//           opacity: 0.1,
//           zIndex: 0,
//         }}
//       />

//       <main
//         style={{
//           position: "relative",
//           background: "none",
//         }}
//       >
//         <FlexBox
//           as={Card}
//           mb={["10px", "15px"]}
//           p={["0.75rem", "1.25rem"]}
//           elevation={5}
//           flexWrap="wrap"
//           borderRadius={8}
//           alignItems="center"
//           justifyContent="space-between"
//         >
//           <div>
//             <H5 fontSize={["14px", "16px"]}>
//               Searching for {decodeURIComponent(slug)}
//             </H5>
//             <Paragraph
//               color="text.muted"
//               mr={["0.5rem", "1rem"]}
//               fontSize={["12px", "14px"]}
//             >
//               {totalProducts} results found
//             </Paragraph>
//           </div>

//           <Box
//             flex="1 1 0"
//             mr={["1rem", "1.75rem"]}
//             minWidth="150px"
//             textAlign="center"
//           >
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1); // Reset page
//               }}
//               style={{
//                 width: "100%",
//                 padding: "6px 12px",
//                 borderRadius: "6px",
//                 border: "1px solid #ccc",
//                 fontSize: "14px",
//               }}
//             />
//           </Box>

//           <FlexBox
//             alignItems="center"
//             flexWrap="wrap"
//             justifyContent={["flex-start", "flex-end"]}
//             // gap="0.75rem"
//             mt={["0.75rem", "0"]}
//             width={["100%", "auto"]}
//           >
//             <Paragraph
//               color="text.muted"
//               mr={["0.5rem", "1rem"]}
//               fontSize={["12px", "14px"]}
//             >
//               Sort by:
//             </Paragraph>

//             {/* <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
//             <Select
//               placeholder="Sort by"
//               options={sortOptions}
//               defaultValue={sortOptions.find(
//                 (option) => option.value === selectedSortOption
//               )}
//               onChange={handleSortChange}
//             />
//           </Box> */}
//             <Box flex="1 1 0" mr={["1rem", "1.75rem"]} minWidth="120px">
//               <Select
//                 placeholder="Sort by"
//                 options={sortOptions}
//                 defaultValue={sortOptions.find(
//                   (option) => option.value === selectedSortOption
//                 )}
//                 onChange={handleSortChange}
//                 styles={{
//                   menu: (provided) => ({
//                     ...provided,
//                     zIndex: 1000,
//                   }),
//                 }}
//               />
//             </Box>

//             <Paragraph
//               color="text.muted"
//               mr={["0.25rem", "0.5rem"]}
//               fontSize={["12px", "14px"]}
//             >
//               View:
//             </Paragraph>

//             <IconButton onClick={() => setView("grid")}>
//               <Icon
//                 variant="small"
//                 color={view === "grid" ? "primary" : "inherit"}
//               >
//                 grid
//               </Icon>
//             </IconButton>

//             <IconButton onClick={() => setView("list")}>
//               <Icon
//                 variant="small"
//                 color={view === "list" ? "primary" : "inherit"}
//               >
//                 menu
//               </Icon>
//             </IconButton>

//             {isTablet && (
//               <Sidenav
//                 position="left"
//                 scroll={true}
//                 handle={
//                   <IconButton>
//                     <Icon>options</Icon>
//                   </IconButton>
//                 }
//               >
//                 <ShopProductFilterCard
//                   onBrandChange={handleBrandChange}
//                   onCategoryChange={handleCategoryChange}
//                   onCountryChange={handleCountryChange} // Pass country handler
//                   onProvinceChange={handleProvinceChange}
//                   slug={slug}
//                   pageType="shop"
//                 />
//               </Sidenav>
//             )}
//           </FlexBox>
//         </FlexBox>

//         <Grid container spacing={6}>
//           {!isTablet && (
//             <Grid item lg={3} xs={12}>
//               <ShopProductFilterCard
//                 onBrandChange={handleBrandChange}
//                 onCategoryChange={handleCategoryChange}
//                 onCountryChange={handleCountryChange} // Pass country handler
//                 onProvinceChange={handleProvinceChange}
//                 slug={slug}
//                 pageType="shop"
//               />
//             </Grid>
//           )}

//           <Grid item lg={9} xs={12}>
//             {currentPage === 1 && loading ? ( // Show loading only on initial load
//               <Typography>{/* <Loader /> */}</Typography>
//             ) : view === "grid" ? (
//               <>
//                 <ProductGridView
//                   products={products}
//                   totalProducts={totalProducts}
//                   currentPage={currentPage}
//                   productsPerPage={productsPerPage}
//                   onPageChange={handleLoadMore}
//                 />
//                 {/* {loading && currentPage > 1 && (
//                 <LoaderWrapper>
//                 <Vortex />
//               </LoaderWrapper>
//               )}{" "} */}
//                 <FlexBox justifyContent="center" alignItems="center" mt="32px">
//                   <Button
//                     onClick={() => {
//                       if (!loading) handleLoadMore(); // No argument passed
//                     }}
//                     variant="contained"
//                     color="primary"
//                     disabled={loading}
//                     style={{
//                       display:
//                         currentPage * productsPerPage < totalProducts
//                           ? "block"
//                           : "none", // Show button only if there are more products to load
//                     }}
//                   >
//                     {loading ? (
//                       <BeatLoader size={18} color="#fff" />
//                     ) : (
//                       "Show More"
//                     )}
//                   </Button>
//                 </FlexBox>
//               </>
//             ) : (
//               <>
//                 <ProductListView
//                   products={products}
//                   totalProducts={0}
//                   currentPage={0}
//                   productsPerPage={0}
//                   onPageChange={() => {}}
//                 />

//                 <FlexBox justifyContent="center" alignItems="center" mt="32px">
//                   <Button
//                     onClick={() => {
//                       if (!loading) handleLoadMore(); // No argument passed
//                     }}
//                     variant="contained"
//                     color="primary"
//                     disabled={loading}
//                     style={{
//                       display:
//                         currentPage * productsPerPage < totalProducts
//                           ? "block"
//                           : "none", // Show button only if there are more products to load
//                     }}
//                   >
//                     {loading ? (
//                       <BeatLoader size={18} color="#fff" />
//                     ) : (
//                       "Show More"
//                     )}
//                   </Button>
//                 </FlexBox>
//               </>
//             )}
//           </Grid>
//         </Grid>
//       </main>
//     </>
//   );
// }

"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Grid from "@component/grid/Grid";

import ProductGridView from "@component/products/ProductCard1List";
import ProductListView from "@component/products/ProductCard9List";
import useWindowSize from "@hook/useWindowSize";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import Select from "@component/Select";
import ShopProductFilterCard from "@component/products/ShopProductFilterCard";
import {
 ListingLoadMore,
 ListingSkeleton,
} from "@component/listing/Listing";

// import tizaraa_watermark from "../../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png"
import Watermark from "@component/watermark/Watermark";
import axios from "@lib/axiosClient";

// Page-local styling for the shop listing (toolbar, search box, empty state).
// The toolbar is local to this page (same controls as the shared ListingToolbar)
// so the shop name can stay the page's only <h1>.
const rise = keyframes`
 from { opacity: 0; transform: translateY(10px); }
 to { opacity: 1; transform: none; }
`;
const fadeUp = keyframes`
 from { opacity: 0; transform: translateY(14px); }
 to { opacity: 1; transform: none; }
`;

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const ShopListing = styled.main`
 position: relative;
 background: none;

 /* ---------- toolbar ---------- */
 .lt-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 14px 24px;
  margin-bottom: 20px;
  padding: 16px 20px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 18px;
  background: ${({ theme }) => theme.tz.color.paper};
  box-shadow: ${({ theme }) => theme.tz.elevation.rest};
  animation: ${rise} 420ms ${EASE} backwards;
 }
 .lt-title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin: 0;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 22px;
  font-weight: 700;
  line-height: 1.25;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .lt-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
 }
 .lt-sort {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.tz.color.slate};
  white-space: nowrap;
 }
 .lt-sort-select {
  min-width: 190px;
 }
 .lt-view {
  display: inline-flex;
 }
 .lt-view-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.tz.color.slate};
  cursor: pointer;
 }
 .lt-view-btn:hover {
  color: ${({ theme }) => theme.tz.color.ink};
 }
 @media (max-width: 650px) {
  .lt-bar {
   padding: 14px 16px;
  }
  .lt-title {
   font-size: 19px;
  }
  .lt-controls {
   width: 100%;
  }
  .lt-sort {
   flex: 1 1 auto;
  }
  .lt-sort-label {
   display: none;
  }
  .lt-sort-select {
   flex: 1 1 auto;
   min-width: 0;
  }
 }
 .sp-count {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
  font-family: ${({ theme }) => theme.tz.font.body};
  font-size: 12.5px;
  font-weight: 700;
  line-height: 1.3;
  font-variant-numeric: tabular-nums;
 }

 /* sort select: pill + orange focus, no second ring on the inner input */
 .lt-sort-select [class*="-control"] {
  min-height: 42px;
  border-radius: 999px;
  border-width: 1.5px;
  padding: 0 6px;
  transition: border-color 150ms ease, box-shadow 150ms ease;
 }
 .lt-sort-select [class*="-control"]:hover {
  border-color: ${({ theme }) => theme.tz.color.slate};
 }
 .lt-sort-select [class*="-control"]:focus-within {
  border-color: ${({ theme }) => theme.tz.color.ember};
  box-shadow: 0 0 0 4px rgba(240, 80, 35, 0.14);
 }
 .lt-sort-select input {
  outline: none !important;
  box-shadow: none !important;
 }
 .lt-sort-select [class*="-indicatorSeparator"] {
  display: none;
 }
 .lt-sort-select [class*="-indicatorContainer"] {
  color: ${({ theme }) => theme.tz.color.slate};
  transition: transform 200ms ${EASE}, color 150ms ease;
 }
 .lt-sort-select [class*="-control"]:focus-within [class*="-indicatorContainer"] {
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }

 /* grid/list toggle with a sliding ember indicator */
 .lt-view {
  position: relative;
  padding: 4px;
  gap: 4px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.lineSoft};
 }
 .lt-view-btn {
  position: relative;
  z-index: 1;
  border-radius: 999px;
  transition: color 200ms ease, transform 160ms ease;
 }
 .lt-view-btn:active {
  transform: scale(0.9);
 }
 .lt-view-btn[aria-pressed="true"] {
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
  box-shadow: none;
 }
 @supports selector(:has(a)) {
  .lt-view::before {
   content: "";
   position: absolute;
   top: 4px;
   left: 4px;
   width: 38px;
   height: 38px;
   border-radius: 999px;
   background: ${({ theme }) => theme.tz.color.emberDeep};
   box-shadow: 0 4px 10px rgba(194, 64, 15, 0.28);
   transition: transform 260ms ${EASE};
  }
  .lt-view:has(.lt-view-btn:last-child[aria-pressed="true"])::before {
   transform: translateX(42px);
  }
  .lt-view-btn[aria-pressed="true"] {
   background: transparent;
  }
  .lt-view-btn[aria-pressed="true"]:hover {
   color: #fff;
  }
 }
 .lt-view-btn:focus-visible {
  outline: none;
  border-radius: 999px;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 /* ---------- mobile filter toggle ---------- */
 .sp-mfilter {
  margin-bottom: 16px;
 }
 .sp-mfilter-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 42px;
  padding: 0 18px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.paper};
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
  cursor: pointer;
  transition: border-color 150ms ease, color 150ms ease, transform 160ms ease;
 }
 .sp-mfilter-btn:hover {
  border-color: ${({ theme }) => theme.tz.color.ember};
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .sp-mfilter-btn:active {
  transform: scale(0.97);
 }
 .sp-mfilter-btn:focus-visible {
  outline: none;
  border-radius: 999px;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
 .sp-mfilter-btn[aria-expanded="true"] {
  border-color: ${({ theme }) => theme.tz.color.ember};
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .sp-chev {
  transition: transform 220ms ${EASE};
 }
 .sp-mfilter-btn[aria-expanded="true"] .sp-chev {
  transform: rotate(180deg);
 }
 .sp-mfilter-panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 260ms ${EASE};
 }
 .sp-mfilter-panel.is-open {
  grid-template-rows: 1fr;
 }
 .sp-mfilter-inner {
  min-height: 0;
  overflow: hidden;
 }
 .sp-mfilter-panel:not(.is-open) .sp-mfilter-inner {
  visibility: hidden;
  transition: visibility 0s linear 260ms;
 }
 .sp-mfilter-panel.is-open .sp-mfilter-inner {
  padding-top: 12px;
 }

 /* ---------- product grid: staggered fade-up ---------- */
 .sp-products > div > * {
  animation: ${fadeUp} 460ms ${EASE} backwards;
 }
 ${Array.from(
  { length: 10 },
  (_, i) => `.sp-products > div > *:nth-child(10n + ${i + 1}) { animation-delay: ${i * 45}ms; }`
 ).join("\n ")}

 @media (prefers-reduced-motion: reduce) {
  .lt-bar,
  .sp-products > div > * {
   animation: none;
  }
  .lt-view::before,
  .lt-view-btn,
  .lt-sort-select [class*="-control"],
  .lt-sort-select [class*="-indicatorContainer"],
  .sp-mfilter-btn,
  .sp-chev,
  .sp-mfilter-panel {
   transition: none;
  }
  .sp-mfilter-panel:not(.is-open) .sp-mfilter-inner {
   transition: none;
  }
  .lt-view-btn:active,
  .sp-mfilter-btn:active {
   transform: none;
  }
 }
`;

// Search pill: the wrapper draws the border and focus ring, the input stays bare
const SearchContainer = styled.div`
 display: flex;
 align-items: center;
 gap: 10px;
 max-width: 440px;
 height: 46px;
 margin-bottom: 18px;
 padding: 0 6px 0 18px;
 border: 1.5px solid ${({ theme }) => theme.tz.color.line};
 border-radius: 999px;
 background: ${({ theme }) => theme.tz.color.paper};
 color: ${({ theme }) => theme.tz.color.slate};
 transition: border-color 160ms ease, box-shadow 160ms ease, color 160ms ease;
 animation: ${rise} 420ms ${EASE} 60ms backwards;

 &:hover {
  border-color: ${({ theme }) => theme.tz.color.slate};
 }

 &:focus-within {
  border-color: ${({ theme }) => theme.tz.color.ember};
  box-shadow: 0 0 0 4px rgba(240, 80, 35, 0.14);
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }

 > svg {
  flex-shrink: 0;
 }

 .sp-clear {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.lineSoft};
  color: ${({ theme }) => theme.tz.color.slate};
  cursor: pointer;
  animation: ${rise} 200ms ${EASE} backwards;
  transition: background-color 150ms ease, color 150ms ease, transform 150ms ease;
 }
 .sp-clear:hover {
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .sp-clear:active {
  transform: scale(0.9);
 }
 .sp-clear:focus-visible {
  outline: none;
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 @media (max-width: 650px) {
  max-width: none;
 }

 @media (prefers-reduced-motion: reduce) {
  animation: none;
  transition: none;
  .sp-clear {
   animation: none;
   transition: none;
  }
  .sp-clear:active {
   transform: none;
  }
 }
`;

const SearchInput = styled.input`
 flex: 1;
 min-width: 0;
 height: 100%;
 padding: 0;
 border: 0 !important;
 outline: none !important;
 box-shadow: none !important;
 border-radius: 0 !important;
 background: transparent;
 font-family: inherit;
 font-size: 14.5px;
 color: ${({ theme }) => theme.tz.color.ink};

 &::placeholder {
  color: ${({ theme }) => theme.tz.color.slate};
  font-weight: 400;
 }
`;


const EmptyState = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 gap: 8px;
 padding: 56px 24px;
 border: 2px dashed ${({ theme }) => theme.tz.color.line};
 border-radius: 18px;
 background: ${({ theme }) => theme.tz.color.paper};
 text-align: center;
 animation: ${rise} 420ms cubic-bezier(0.22, 1, 0.36, 1) backwards;

 .es-icon {
  display: grid;
  place-items: center;
  width: 96px;
  height: 96px;
  margin-bottom: 8px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #fff 0, ${({ theme }) => theme.tz.color.emberTint} 70%);
  color: ${({ theme }) => theme.tz.color.ember};
  box-shadow: inset 0 0 0 8px rgba(240, 80, 35, 0.06);
 }
 h2 {
  margin: 0;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 p {
  max-width: 380px;
  margin: 0;
  font-size: 14px;
  line-height: 1.55;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding: 11px 22px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: transform 180ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 180ms ease,
   background-color 150ms ease;
 }
 a:hover {
  background: ${({ theme }) => theme.tz.color.emberDark};
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(194, 64, 15, 0.25);
 }
 a:active {
  transform: scale(0.97);
  box-shadow: none;
 }
 a:focus-visible {
  outline: none;
  border-radius: 999px;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 @media (prefers-reduced-motion: reduce) {
  animation: none;
  a {
   transition: none;
  }
  a:hover,
  a:active {
   transform: none;
  }
 }
`;

type SortOption = { label: string; value: any };

function ShopToolbar({
 count,
 sortOptions,
 sortValue,
 onSortChange,
 view,
 onViewChange,
}: {
 count: number;
 sortOptions: SortOption[];
 sortValue: any;
 onSortChange: (option: SortOption) => void;
 view: "grid" | "list";
 onViewChange: (view: "grid" | "list") => void;
}) {
 return (
  <div className="lt-bar">
   <h2 className="lt-title">
    All products
    <span className="sp-count">
     {Number(count || 0).toLocaleString("en-US")} {count === 1 ? "product" : "products"}
    </span>
   </h2>

   <div className="lt-controls">
    <div className="lt-sort">
     <span className="lt-sort-label">Sort by</span>
     <div className="lt-sort-select">
      <Select
       aria-label="Sort products"
       isSearchable={false}
       options={sortOptions}
       defaultValue={sortOptions.find((option) => option.value === sortValue)}
       onChange={onSortChange}
       styles={{ menu: (provided) => ({ ...provided, zIndex: 1000 }) }}
      />
     </div>
    </div>

    <div className="lt-view" role="group" aria-label="View">
     <button
      type="button"
      className="lt-view-btn"
      aria-label="Grid view"
      aria-pressed={view === "grid"}
      onClick={() => onViewChange("grid")}
     >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
       <rect x="3" y="3" width="7" height="7" rx="1.5" />
       <rect x="14" y="3" width="7" height="7" rx="1.5" />
       <rect x="3" y="14" width="7" height="7" rx="1.5" />
       <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
     </button>
     <button
      type="button"
      className="lt-view-btn"
      aria-label="List view"
      aria-pressed={view === "list"}
      onClick={() => onViewChange("list")}
     >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
       <path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" />
      </svg>
     </button>
    </div>
   </div>
  </div>
 );
}

function ShopEmpty({ searching }: { searching: boolean }) {
 return (
  <EmptyState role="status">
   <span className="es-icon" aria-hidden="true">
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
     <path d="M3 9l1.5-5h15L21 9" />
     <path d="M3 9h18v1.5a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z" />
     <path d="M5 13.5V20h14v-6.5" />
     <path d="M10 20v-4h4v4" />
    </svg>
   </span>
   <h2>{searching ? "No matching products" : "No products in this shop yet"}</h2>
   <p>
    {searching
     ? "Nothing in this shop matches your search or filters. Try a different word or clear a filter."
     : "This seller hasn't listed anything yet. Check back soon, or explore the rest of Tizaraa."}
   </p>
   <Link href="/">
    Browse all products
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
     <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
   </Link>
  </EmptyState>
 );
}

const productsPerPage = 10;

export default function SearchResult({ sortOptions, slug }) {
 const router = useRouter();
 const width = useWindowSize();
 const [view, setView] = useState<"grid" | "list">("grid");
 const [selectedSortOption, setSelectedSortOption] = useState(
  sortOptions[0].value
 );
 const [selectedBrand, setSelectedBrand] = useState<any[] | null>(null);
 const [selectedCategory, setSelectedCategory] = useState<number[] | null>(
  null
 );
 const [selectedCountry, setSelectedCountry] = useState<number[] | null>(null); // Track selected country
 const [selectedProvinces, setSelectedProvinces] = useState<number[]>([]);
 const [products, setProducts] = useState<any[]>([]);
 const [loading, setLoading] = useState(false);
 const [totalProducts, setTotalProducts] = useState(0);
 const [searchTerm, setSearchTerm] = useState("");
 const [currentPage, setCurrentPage] = useState(1);
 const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
 let pageType = "shop";

 const isTablet = width < 1025;

 const handleBrandChange = (brand: any[]) => {
  setSelectedBrand(brand);
  setCurrentPage(1); // Reset to first page
 };

 const handleCategoryChange = (categories: number[]) => {
  setSelectedCategory(categories);
  setCurrentPage(1);
  // router.push(`/product/search/${categories}`);
 };

 const handleCountryChange = (countries: number[]) => {
  setSelectedCountry(countries); // Update selected countries
  setCurrentPage(1); // Reset to first page
 };

 const handleProvinceChange = (provinces: number[]) => {
  setSelectedProvinces(provinces);
  setCurrentPage(1);
 };

 const handleSortChange = (sortOption: any) => {
  setSelectedSortOption(sortOption.value);
 };

 const fetchProducts = useCallback(async () => {
  setLoading(true);

  // Prepare the filter object
  const filters: any = {};
  if (selectedCategory) filters.category = selectedCategory;
  if (selectedBrand && selectedBrand.length) filters.brand = selectedBrand;
  if (selectedCountry && selectedCountry.length)
   filters.country = selectedCountry;
  if (selectedProvinces && selectedProvinces.length)
   filters.province = selectedProvinces;

  try {
   const response = await axios.post(
    `seller/products/${slug}?productsearch=${encodeURIComponent(searchTerm)}`,
    {
     ...filters,
     page: currentPage,
     orderBy: selectedSortOption,
    }
   );

   if (response.status !== 200) {
    throw new Error("Network response was not ok");
   }

   const data = await response.data;

   // Reset products when fetching the first page
   if (currentPage === 1) {
    setProducts(data.data);
   } else {
    setProducts((prevProducts) => [...prevProducts, ...data.data]);
   }
   setTotalProducts(data.total);
  } catch (error) {
   console.error("Error fetching products:", error);
  } finally {
   setLoading(false);
  }
 }, [
  selectedBrand,
  selectedCategory,
  selectedCountry,
  selectedProvinces,
  currentPage,
  selectedSortOption,
  searchTerm,
 ]);

 //  useEffect(() => {
 //   fetchProducts();
 //  }, [fetchProducts]);

 useEffect(() => {
  fetchProducts();
 }, [fetchProducts]);

 const handleLoadMore = () => {
  setCurrentPage((prevPage) => prevPage + 1);
 };

 const renderProductView = () => {
  if (currentPage === 1 && loading) {
   return <ListingSkeleton />;
  }

  if (products.length === 0 && !loading) {
   return (
    <ShopEmpty
     searching={
      Boolean(searchTerm.trim()) ||
      Boolean(selectedCategory?.length) ||
      Boolean(selectedBrand?.length) ||
      Boolean(selectedCountry?.length) ||
      selectedProvinces.length > 0
     }
    />
   );
  }

  if (view === "grid") {
   return (
    <>
     <ProductGridView
      products={products}
      totalProducts={totalProducts}
      currentPage={currentPage}
      productsPerPage={productsPerPage}
      onPageChange={handleLoadMore}
     />
     {loading && currentPage > 1 && (
      <div style={{ marginTop: 16 }}>
       <ListingSkeleton count={4} />
      </div>
     )}
    </>
   );
  }

  return (
   <>
    <ProductListView
     products={products}
     totalProducts={0}
     currentPage={0}
     productsPerPage={0}
     onPageChange={() => {}}
    />
    {loading && currentPage > 1 && (
     <div style={{ marginTop: 16 }}>
      <ListingSkeleton count={4} />
     </div>
    )}
   </>
  );
 };

 const filterCard = (
  <ShopProductFilterCard
   onBrandChange={handleBrandChange}
   onCategoryChange={handleCategoryChange}
   onCountryChange={handleCountryChange} // Pass country handler
   onProvinceChange={handleProvinceChange}
   slug={slug}
   pageType="shop"
  />
 );

 return (
  <>
   <Watermark />

   <ShopListing>
    <ShopToolbar
     count={totalProducts}
     sortOptions={sortOptions}
     sortValue={selectedSortOption}
     onSortChange={handleSortChange}
     view={view}
     onViewChange={setView}
    />

    {isTablet && (
     <div className="sp-mfilter">
      <button
       type="button"
       className="sp-mfilter-btn"
       aria-expanded={mobileFiltersOpen}
       aria-controls="shop-mobile-filters"
       onClick={() => setMobileFiltersOpen((open) => !open)}
      >
       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 5h18M6 12h12M10 19h4" />
       </svg>
       Filters
       <svg className="sp-chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m6 9 6 6 6-6" />
       </svg>
      </button>
      <div
       id="shop-mobile-filters"
       className={`sp-mfilter-panel${mobileFiltersOpen ? " is-open" : ""}`}
      >
       <div className="sp-mfilter-inner">{filterCard}</div>
      </div>
     </div>
    )}

    <Grid container spacing={6}>
     {!isTablet && (
      <Grid item lg={3} xs={12}>
       {filterCard}
      </Grid>
     )}

     <Grid item lg={9} xs={12}>
      <SearchContainer>
       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-3.5-3.5" />
       </svg>
       <SearchInput
        type="text"
        placeholder="Search products in this shop..."
        aria-label="Search products in this shop"
        value={searchTerm}
        onChange={(e) => {
         setSearchTerm(e.target.value);
         setCurrentPage(1); // Reset page
        }}
       />
       {searchTerm && (
        <button
         type="button"
         className="sp-clear"
         aria-label="Clear search"
         onClick={() => {
          setSearchTerm("");
          setCurrentPage(1);
         }}
        >
         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
          <path d="M18 6 6 18M6 6l12 12" />
         </svg>
        </button>
       )}
      </SearchContainer>

      {/* key re-mounts the grid when the result set changes, so cards fade up again */}
      <div
       className="sp-products"
       key={`${view}|${searchTerm}|${selectedSortOption}|${JSON.stringify([
        selectedCategory,
        selectedBrand,
        selectedCountry,
        selectedProvinces,
       ])}`}
      >
       {renderProductView()}
      </div>

      <ListingLoadMore
       onClick={() => {
        if (!loading) handleLoadMore();
       }}
       loading={loading}
       visible={
        !loading &&
        products.length > 0 &&
        currentPage * productsPerPage < totalProducts
       }
      />
     </Grid>
    </Grid>
   </ShopListing>
  </>
 );
}
