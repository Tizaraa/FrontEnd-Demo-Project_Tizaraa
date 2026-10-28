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
import Icon from "@component/icon/Icon";
import Grid from "@component/grid/Grid";

import ProductGridView from "@component/products/ProductCard1List";
import ProductListView from "@component/products/ProductCard9List";
import useWindowSize from "@hook/useWindowSize";
import styled from "styled-components";
import ShopProductFilterCard from "@component/products/ShopProductFilterCard";
import {
 ListingEmpty,
 ListingLoadMore,
 ListingSkeleton,
 ListingToolbar,
} from "@component/listing/Listing";

// import tizaraa_watermark from "../../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png"
import Watermark from "@component/watermark/Watermark";
import axios from "@lib/axiosClient";

// Styled components for the search box
const SearchContainer = styled.div`
 position: relative;
 max-width: 360px;
 margin-bottom: 16px;
`;

const SearchInput = styled.input`
 width: 100%;
 height: 44px;
 padding: 0 16px 0 44px;
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: ${({ theme }) => theme.tz.radius.sm}px;
 font-size: 14px;
 font-family: inherit;
 color: ${({ theme }) => theme.tz.color.ink};
 background-color: ${({ theme }) => theme.tz.color.paper};
 transition: border-color ${({ theme }) => theme.tz.motion.fast},
  box-shadow ${({ theme }) => theme.tz.motion.fast};
 outline: none;

 &::placeholder {
  color: ${({ theme }) => theme.tz.color.slate};
  font-weight: 400;
 }

 &:hover {
  border-color: ${({ theme }) => theme.tz.color.slate};
 }

 &:focus-visible {
  border-color: ${({ theme }) => theme.tz.color.ember};
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
`;

const SearchIcon = styled(Icon)`
 position: absolute;
 left: 14px;
 top: 50%;
 transform: translateY(-50%);
 color: ${({ theme }) => theme.tz.color.slate};
 z-index: 2;
 pointer-events: none;
`;

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
   console.log("Shop Details:", data);

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
    <ListingEmpty message="No products found in this shop matching your search." />
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

   <main
    style={{
     position: "relative",
     background: "none",
    }}
   >
    <ListingToolbar
     title="All products"
     count={totalProducts}
     sortOptions={sortOptions}
     sortValue={selectedSortOption}
     onSortChange={handleSortChange}
     view={view}
     onViewChange={setView}
     mobileFilter={isTablet ? filterCard : undefined}
    />

    <Grid container spacing={6}>
     {!isTablet && (
      <Grid item lg={3} xs={12}>
       {filterCard}
      </Grid>
     )}

     <Grid item lg={9} xs={12}>
      <SearchContainer>
       <SearchIcon variant="small">search</SearchIcon>
       <SearchInput
        type="text"
        placeholder="Search products..."
        aria-label="Search products in this shop"
        value={searchTerm}
        onChange={(e) => {
         setSearchTerm(e.target.value);
         setCurrentPage(1); // Reset page
        }}
       />
      </SearchContainer>

      {renderProductView()}

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
   </main>
  </>
 );
}
