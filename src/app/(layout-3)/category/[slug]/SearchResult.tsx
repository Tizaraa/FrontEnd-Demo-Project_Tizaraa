// "use client";
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
// import { H5, Paragraph } from "@component/Typography";

// import ProductGridView from "@component/products/ProductCard1List";
// import ProductListView from "@component/products/ProductCard9List";
// import ProductFilterCard from "@component/products/ProductFilterCard";
// import useWindowSize from "@hook/useWindowSize";
// import { Vortex } from "react-loader-spinner";
// import styled from "@emotion/styled";
// import ApiBaseUrl from "api/ApiBaseUrl";
// import OTCProducts from "@sections/market-1/OTCProducts";
// import OTCcategoryProductView from "./OTCcategoryProductView";
// import BeatLoader from "react-spinners/BeatLoader";

// import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png"
// import Image from "next/image";
// import NextImage from "@component/NextImage";

// const LoaderWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const productsPerPage = 10;

// export default function SearchResult({ sortOptions, slug }) {
//   const router = useRouter();
//   const width = useWindowSize();
//   const [view, setView] = useState<"grid" | "list">("grid");
//   const [selectedSortOption, setSelectedSortOption] = useState(
//     sortOptions[0].value
//   );
//   const [selectedBrand, setSelectedBrand] = useState<number[] | null>(null); // Change the type to number[]
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [selectedCountry, setSelectedCountry] = useState<number[] | null>(null); // Track selected country
//   const [selectedProvinces, setSelectedProvinces] = useState<number[]>([]);
//   const [products, setProducts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);

//   const isTablet = width < 1025;

//   const handleBrandChange = (brands: number[]) => {
//     setSelectedBrand(brands);
//     setCurrentPage(1); // Reset to first page
//   };

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category);
//     setCurrentPage(1); // Reset to first page
//     router.push(`/product/search/${category}`);
//   };

//   const handleCountryChange = (countries: number[]) => {
//     setSelectedCountry(countries); // Update selected countries
//     setCurrentPage(1); // Reset to first page
//   };
//   const handleProvinceChange = (provinces: number[]) => {
//     setSelectedProvinces(provinces);
//     setCurrentPage(1);

//   }

//   const handleSortChange = (sortOption: any) => {
//     setSelectedSortOption(sortOption.value);
//   };

//   const fetchProducts = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${ApiBaseUrl.baseUrl}category/${slug}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           category: selectedCategory || "all",
//           brand: selectedBrand || null,
//           country: selectedCountry || null,
//           province: selectedProvinces || null, // Include selected provinces
//           page: currentPage,
//           orderBy: selectedSortOption,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();
//       console.log("category data", data)
//       // Reset products if on the first page
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
//     selectedProvinces, // Add dependency for selectedProvinces
//     currentPage,
//     selectedSortOption,
//   ]);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   // useEffect(() => {
//   //   fetchProducts();
//   // }, [fetchProducts]);

//   const handleLoadMore = () => {
//     setCurrentPage((prevPage) => prevPage + 1);
//   };

//   return (
//     <>
//                  {/* Background image */}
//                  <NextImage
//   alt="newArrivalBanner"
//   src={tizaraa_watermark}
//   priority
//   style={{
//     position: "fixed",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -20%)",
//     width: "100%", // Set to 100% to ensure full responsiveness
//     height: "auto", // Maintain aspect ratio
//     maxWidth: "1200px", // Optional: Limit the maximum width
//     backgroundSize: "contain", // Adjust the scaling behavior
//     backgroundPosition: "center",
//     opacity: 0.1,
//     zIndex: 0,
//   }}
// />

// <main
//     style={{
//       position: "relative",
//       background: "none",
//     }}
//   >

//       <FlexBox
//         as={Card}
//         mb="55px"
//         p="1.25rem"
//         elevation={5}
//         flexWrap="wrap"
//         borderRadius={8}
//         alignItems="center"
//         justifyContent="space-between"
//       >
//         <div>
//           {/* <H5>Searching for {slug}</H5> */}
//           <H5>Searching for {decodeURIComponent(slug)}</H5>

//           <Paragraph color="text.muted">
//             {totalProducts} results found
//           </Paragraph>
//         </div>

//         <FlexBox alignItems="center" flexWrap="wrap">
//           <Paragraph color="text.muted" mr="1rem">
//             Sort by:
//           </Paragraph>

//           <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
//   <Select
//     placeholder="Sort by"
//     options={sortOptions}
//     defaultValue={sortOptions.find(
//       (option) => option.value === selectedSortOption
//     )}
//     onChange={handleSortChange}
//     styles={{
//       menu: (provided) => ({
//         ...provided,
//         zIndex: 1000,
//       }),
//     }}
//   />
// </Box>

//           <Paragraph color="text.muted" mr="0.5rem">
//             View:
//           </Paragraph>

//           <IconButton onClick={() => setView("grid")}>
//             <Icon
//               variant="small"
//               color={view === "grid" ? "primary" : "inherit"}
//             >
//               grid
//             </Icon>
//           </IconButton>

//           <IconButton onClick={() => setView("list")}>
//             <Icon
//               variant="small"
//               color={view === "list" ? "primary" : "inherit"}
//             >
//               menu
//             </Icon>
//           </IconButton>

//           {isTablet && (
//             <Sidenav
//               position="left"
//               scroll={true}
//               handle={
//                 <IconButton>
//                   <Icon>options</Icon>
//                 </IconButton>
//               }
//             >
//               <ProductFilterCard
//                 onBrandChange={handleBrandChange}
//                 onCategoryChange={handleCategoryChange}
//                 onCountryChange={handleCountryChange}
//                 onProvinceChange={handleProvinceChange}
//                 slug={slug}
//                 pageType="default"
//               />
//             </Sidenav>
//           )}
//         </FlexBox>
//       </FlexBox>

//       {/* <OTCProducts></OTCProducts> */}
//       <OTCcategoryProductView slug={slug}></OTCcategoryProductView>

//       <Grid container spacing={6}>
//         {/* <Grid item lg={3} xs={12}>
//           <ProductFilterCard
//             onBrandChange={handleBrandChange}
//             onCategoryChange={handleCategoryChange}
//             onCountryChange={handleCountryChange} // Pass country handler
//             onProvinceChange={handleProvinceChange}
//             slug={slug}
//             pageType="default"
//           />
//         </Grid> */}

//         {!isTablet && (
//           <Grid item lg={3} xs={12}>
//             <ProductFilterCard
//             onBrandChange={handleBrandChange}
//             onCategoryChange={handleCategoryChange}
//             onCountryChange={handleCountryChange} // Pass country handler
//             onProvinceChange={handleProvinceChange}
//             slug={slug}
//             pageType="default"
//             />
//           </Grid>
//         )}

//         <Grid item lg={9} xs={12}>
//           {currentPage === 1 && loading ? ( // Show loading only on initial load
//             <LoaderWrapper>
//               <Vortex />
//             </LoaderWrapper>
//           ) : view === "grid" ? (
//             <>
//               <ProductGridView
//                 products={products}
//                 totalProducts={totalProducts}
//                 currentPage={currentPage}
//                 productsPerPage={productsPerPage}
//                 onPageChange={handleLoadMore}
//               />
//               {/* {loading && currentPage > 1 && (
//                 <LoaderWrapper>
//                 <Vortex />
//               </LoaderWrapper>
//               )}{" "} */}
//               <FlexBox justifyContent="center" alignItems="center" mt="32px">
//           <Button
//             onClick={() => {
//               if (!loading) handleLoadMore(); // No argument passed
//             }}
//             variant="contained"
//             color="primary"
//             disabled={loading}
//             style={{
//               display:
//                 currentPage * productsPerPage < totalProducts
//                   ? "block"
//                   : "none", // Show button only if there are more products to load
//             }}
//           >
//             {loading ?  <BeatLoader size={18} color="#fff" /> : "Show More"}
//           </Button>
//         </FlexBox>

//             </>
//           ) : (
//             <>
//             <ProductListView
//               products={products}
//               totalProducts={totalProducts}
//                 currentPage={currentPage}
//                 productsPerPage={productsPerPage}
//                 onPageChange={handleLoadMore}
//             />

//           <FlexBox justifyContent="center" alignItems="center" mt="32px">
//           <Button
//             onClick={() => {
//               if (!loading) handleLoadMore(); // No argument passed
//             }}
//             variant="contained"
//             color="primary"
//             disabled={loading}
//             style={{
//               display:
//                 currentPage * productsPerPage < totalProducts
//                   ? "block"
//                   : "none", // Show button only if there are more products to load
//             }}
//           >
//             {loading ?  <BeatLoader size={18} color="#fff" /> : "Show More"}
//           </Button>
//         </FlexBox>

//             </>
//           )}
//         </Grid>
//       </Grid>
//     </main>
//     </>
//   );
// }

// ==================== Code for - If no products available, thn click to show more button for repeated previous produtcs. | Use this code.

// "use client";
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
// import { H5, Paragraph } from "@component/Typography";
// import ProductGridView from "@component/products/ProductCard1List";
// import ProductListView from "@component/products/ProductCard9List";
// import ProductFilterCard from "@component/products/ProductFilterCard";
// import useWindowSize from "@hook/useWindowSize";
// import { Vortex } from "react-loader-spinner";
// import styled from "@emotion/styled";
// import ApiBaseUrl from "api/ApiBaseUrl";
// import BeatLoader from "react-spinners/BeatLoader";
// import Image from "next/image";
// import NextImage from "@component/NextImage";
// import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png";

// const LoaderWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const productsPerPage: number = 10;

// export default function SearchResult({ sortOptions, slug }: { sortOptions: any[], slug: string }) {
//   const router = useRouter();
//   const width = useWindowSize();
//   const [view, setView] = useState<"grid" | "list">("grid");
//   const [selectedSortOption, setSelectedSortOption] = useState(sortOptions[0].value);
//   const [selectedBrand, setSelectedBrand] = useState<number[] | null>(null);
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [selectedCountry, setSelectedCountry] = useState<number[] | null>(null);
//   const [selectedProvinces, setSelectedProvinces] = useState<number[]>([]);
//   const [products, setProducts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [totalProducts, setTotalProducts] = useState<number>(0); // Explicitly type as number
//   const [currentPage, setCurrentPage] = useState<number>(1); // Explicitly type as number

//   const isTablet = width < 1025;

//   const handleBrandChange = (brands: number[]) => {
//     setSelectedBrand(brands);
//     setCurrentPage(1);
//   };

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category);
//     setCurrentPage(1);
//     router.push(`/product/search/${category}`);
//   };

//   const handleCountryChange = (countries: number[]) => {
//     setSelectedCountry(countries);
//     setCurrentPage(1);
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
//     try {
//       const response = await fetch(`${ApiBaseUrl.baseUrl}category/${slug}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           category: selectedCategory || "all",
//           brand: selectedBrand || null,
//           country: selectedCountry || null,
//           province: selectedProvinces || null,
//           page: currentPage,
//           orderBy: selectedSortOption,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();
//       console.log("category data", data);

//       if (data.data.length === 0 && currentPage > 1) {
//         // Repeat previous products if no new data is available
//         setProducts((prevProducts) => [...prevProducts, ...prevProducts]);
//       } else if (data.data.length > 0) {
//         // Append or replace based on page
//         if (currentPage === 1) {
//           setProducts(data.data);
//         } else {
//           setProducts((prevProducts) => [...prevProducts, ...data.data]);
//         }
//       }

//       // Ensure totalProducts is a number
//       setTotalProducts(Number(data.total) || 0); // Fallback to 0 if data.total is not a number
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
//     slug,
//   ]);

//   const handleLoadMore = () => {
//     if (loading) return;
//     setCurrentPage((prevPage) => prevPage + 1);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

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
//         <FlexBox
//           as={Card}
//           mb="55px"
//           p="1.25rem"
//           elevation={5}
//           flexWrap="wrap"
//           borderRadius={8}
//           alignItems="center"
//           justifyContent="space-between"
//         >
//           <div>
//             <H5>Searching for {decodeURIComponent(slug)}</H5>
//             <Paragraph color="text.muted">{totalProducts} results found</Paragraph>
//           </div>
//           <FlexBox alignItems="center" flexWrap="wrap">
//             <Paragraph color="text.muted" mr="1rem">Sort by:</Paragraph>
//             <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
//               <Select
//                 placeholder="Sort by"
//                 options={sortOptions}
//                 defaultValue={sortOptions.find((option) => option.value === selectedSortOption)}
//                 onChange={handleSortChange}
//                 styles={{ menu: (provided) => ({ ...provided, zIndex: 1000 }) }}
//               />
//             </Box>
//             <Paragraph color="text.muted" mr="0.5rem">View:</Paragraph>
//             <IconButton onClick={() => setView("grid")}>
//               <Icon variant="small" color={view === "grid" ? "primary" : "inherit"}>grid</Icon>
//             </IconButton>
//             <IconButton onClick={() => setView("list")}>
//               <Icon variant="small" color={view === "list" ? "primary" : "inherit"}>menu</Icon>
//             </IconButton>
//             {isTablet && (
//               <Sidenav position="left" scroll={true} handle={<IconButton><Icon>options</Icon></IconButton>}>
//                 <ProductFilterCard
//                   onBrandChange={handleBrandChange}
//                   onCategoryChange={handleCategoryChange}
//                   onCountryChange={handleCountryChange}
//                   onProvinceChange={handleProvinceChange}
//                   slug={slug}
//                   pageType="default"
//                 />
//               </Sidenav>
//             )}
//           </FlexBox>
//         </FlexBox>

//         <Grid container spacing={6}>
//           {!isTablet && (
//             <Grid item lg={3} xs={12}>
//               <ProductFilterCard
//                 onBrandChange={handleBrandChange}
//                 onCategoryChange={handleCategoryChange}
//                 onCountryChange={handleCountryChange}
//                 onProvinceChange={handleProvinceChange}
//                 slug={slug}
//                 pageType="default"
//               />
//             </Grid>
//           )}
//           <Grid item lg={9} xs={12}>
//             {currentPage === 1 && loading ? (
//               <LoaderWrapper><Vortex /></LoaderWrapper>
//             ) : view === "grid" ? (
//               <>
//                 <ProductGridView
//                   products={products}
//                   totalProducts={totalProducts}
//                   currentPage={currentPage}
//                   productsPerPage={productsPerPage}
//                   onPageChange={handleLoadMore}
//                 />
//                 <FlexBox justifyContent="center" alignItems="center" mt="32px">
//                   <Button
//                     onClick={handleLoadMore}
//                     variant="contained"
//                     color="primary"
//                     disabled={loading}
//                     style={{
//                       display: currentPage * productsPerPage < totalProducts || products.length > 0 ? "block" : "none",
//                     }}
//                   >
//                     {loading ? <BeatLoader size={18} color="#fff" /> : "Show More"}
//                   </Button>
//                 </FlexBox>
//               </>
//             ) : (
//               <>
//                 <ProductListView
//                   products={products}
//                   totalProducts={totalProducts}
//                   currentPage={currentPage}
//                   productsPerPage={productsPerPage}
//                   onPageChange={handleLoadMore}
//                 />
//                 <FlexBox justifyContent="center" alignItems="center" mt="32px">
//                   <Button
//                     onClick={handleLoadMore}
//                     variant="contained"
//                     color="primary"
//                     disabled={loading}
//                     style={{
//                       display: currentPage * productsPerPage < totalProducts || products.length > 0 ? "block" : "none",
//                     }}
//                   >
//                     {loading ? <BeatLoader size={18} color="#fff" /> : "Show More"}
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

// ==================== Code for - If no products available, show more button hidden from UI. | Use this code.
"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Box from "@component/Box";
import Card from "@component/Card";
import Select from "@component/Select";
import Icon from "@component/icon/Icon";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import { Button, IconButton } from "@component/buttons";
import Sidenav from "@component/sidenav/Sidenav";
import Typography, { H5, Paragraph } from "@component/Typography";

import ProductGridView from "@component/products/ProductCard1List";
import ProductListView from "@component/products/ProductCard9List";
import ProductFilterCard from "@component/products/ProductFilterCard";
import useWindowSize from "@hook/useWindowSize";
import { Vortex } from "react-loader-spinner";
import styled from "@emotion/styled";
import ApiBaseUrl from "api/ApiBaseUrl";
import OTCcategoryProductView from "./OTCcategoryProductView";
import BeatLoader from "react-spinners/BeatLoader";

import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png";
import NextImage from "@component/NextImage";
import Loader from "@component/loader";

// const LoaderWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const productsPerPage = 10;

export default function SearchResult({ sortOptions, slug }) {
  const router = useRouter();
  const width = useWindowSize();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedSortOption, setSelectedSortOption] = useState(
    sortOptions[0].value
  );
  const [selectedBrand, setSelectedBrand] = useState<number[] | null>(null);
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const [selectedCountry, setSelectedCountry] = useState<number[] | null>(null);
  const [selectedProvinces, setSelectedProvinces] = useState<number[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const isTablet = width < 1025;

  const handleBrandChange = (brands: number[]) => {
    setSelectedBrand(brands);
    setCurrentPage(1);
  };

  // const handleCategoryChange = (category: string) => {
  //   setSelectedCategory(category);
  //   setCurrentPage(1);
  //   router.push(`/product/search/${category}`);
  // };

  const handleCategoryChange = (categories: number[]) => {
    const categoryId = categories[0]; // Use first category for URL
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    router.push(`/product/search/${categoryId}`);
  };
  

  const handleCountryChange = (countries: number[]) => {
    setSelectedCountry(countries);
    setCurrentPage(1);
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
    try {
      const response = await fetch(`${ApiBaseUrl.baseUrl}category/${slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: selectedCategory || "all",
          brand: selectedBrand || null,
          country: selectedCountry || null,
          province: selectedProvinces || null,
          page: currentPage,
          orderBy: selectedSortOption,
        }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      console.log("Fetched data:", data);

      if (currentPage === 1) {
        setProducts(data.data);
      } else {
        if (data.data.length === 0) return; // No more products to load
        setProducts((prevProducts) => [...prevProducts, ...data.data]);
      }

      setTotalProducts(data.total || 0);
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
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      {/* Background image */}
      <NextImage
        alt="newArrivalBanner"
        src={tizaraa_watermark}
        priority
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -20%)",
          width: "100%", // Set to 100% to ensure full responsiveness
          height: "auto", // Maintain aspect ratio
          maxWidth: "1200px", // Optional: Limit the maximum width
          backgroundSize: "contain", // Adjust the scaling behavior
          backgroundPosition: "center",
          opacity: 0.1,
          zIndex: 0,
        }}
      />

      <main style={{ position: "relative", background: "none" }}>
        <FlexBox
          as={Card}
          mb={["10px", "15px"]}
          p={["0.75rem", "1.25rem"]}
          elevation={5}
          flexWrap="wrap"
          borderRadius={8}
          alignItems="center"
          justifyContent="space-between"
        >
          <div>
            <H5 fontSize={["14px", "16px"]}>
              Searching for {decodeURIComponent(slug)}
            </H5>
            <Paragraph color="text.muted" fontSize={["12px", "14px"]}>
              {totalProducts} results found
            </Paragraph>
          </div>

          <FlexBox
            alignItems="center"
            flexWrap="wrap"
            justifyContent={["flex-start", "flex-end"]}
            // gap="0.75rem"
            mt={["0.75rem", "0"]}
            width={["100%", "auto"]}
          >
            <Paragraph
              color="text.muted"
              mr={["0.5rem", "1rem"]}
              fontSize={["12px", "14px"]}
            >
              Sort by:
            </Paragraph>

            <Box flex="1 1 0" mr={["1rem", "1.75rem"]} minWidth="120px">
              <Select
                placeholder="Sort by"
                options={sortOptions}
                defaultValue={sortOptions.find(
                  (option) => option.value === selectedSortOption
                )}
                onChange={handleSortChange}
                styles={{
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 1000,
                  }),
                }}
              />
            </Box>

            <Paragraph
              color="text.muted"
              mr={["0.25rem", "0.5rem"]}
              fontSize={["12px", "14px"]}
            >
              View:
            </Paragraph>

            <IconButton onClick={() => setView("grid")}>
              <Icon
                variant="small"
                color={view === "grid" ? "primary" : "inherit"}
              >
                grid
              </Icon>
            </IconButton>

            <IconButton onClick={() => setView("list")}>
              <Icon
                variant="small"
                color={view === "list" ? "primary" : "inherit"}
              >
                menu
              </Icon>
            </IconButton>

            {isTablet && (
              <Sidenav
                position="left"
                scroll={true}
                handle={
                  <IconButton>
                    <Icon>options</Icon>
                  </IconButton>
                }
              >
                <ProductFilterCard
                  onBrandChange={handleBrandChange}
                  onCategoryChange={handleCategoryChange}
                  onCountryChange={handleCountryChange}
                  onProvinceChange={handleProvinceChange}
                  slug={slug}
                  pageType="default"
                />
              </Sidenav>
            )}
          </FlexBox>
        </FlexBox>

        <OTCcategoryProductView slug={slug} />

        <Grid container spacing={6}>
          {!isTablet && (
            <Grid item lg={3} xs={12}>
              <ProductFilterCard
                onBrandChange={handleBrandChange}
                onCategoryChange={handleCategoryChange}
                onCountryChange={handleCountryChange}
                onProvinceChange={handleProvinceChange}
                slug={slug}
                pageType="default"
              />
            </Grid>
          )}

          <Grid item lg={9} xs={12}>
            {currentPage === 1 && loading ? (
              <Typography>
                <Loader />
              </Typography>
            ) : products.length === 0 ? (
              <Paragraph>No products found for this selection.</Paragraph>
            ) : view === "grid" ? (
              <>
                <ProductGridView
                  products={products}
                  totalProducts={totalProducts}
                  currentPage={currentPage}
                  productsPerPage={productsPerPage}
                  onPageChange={handleLoadMore}
                />

                <FlexBox justifyContent="center" alignItems="center" mt="32px">
                  <Button
                    onClick={() => {
                      if (!loading) handleLoadMore();
                    }}
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    style={{
                      display:
                        products.length > 0 &&
                        !loading &&
                        products.length < totalProducts
                          ? "block"
                          : "none",
                    }}
                  >
                    {loading ? (
                      <BeatLoader size={18} color="#fff" />
                    ) : (
                      "Show More"
                    )}
                  </Button>
                </FlexBox>
              </>
            ) : (
              <>
                <ProductListView
                  products={products}
                  totalProducts={totalProducts}
                  currentPage={currentPage}
                  productsPerPage={productsPerPage}
                  onPageChange={handleLoadMore}
                />

                <FlexBox justifyContent="center" alignItems="center" mt="32px">
                  <Button
                    onClick={() => {
                      if (!loading) handleLoadMore();
                    }}
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    style={{
                      display:
                        products.length > 0 &&
                        !loading &&
                        products.length < totalProducts
                          ? "block"
                          : "none",
                    }}
                  >
                    {loading ? (
                      <BeatLoader size={18} color="#fff" />
                    ) : (
                      "Show More"
                    )}
                  </Button>
                </FlexBox>
              </>
            )}
          </Grid>
        </Grid>
      </main>
    </>
  );
}
