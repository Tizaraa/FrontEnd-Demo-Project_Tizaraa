// "use client";

// import { useCallback, useState } from "react";

// import Box from "@component/Box";
// import Card from "@component/Card";
// import Select from "@component/Select";
// import Hidden from "@component/hidden";
// import Icon from "@component/icon/Icon";
// import Grid from "@component/grid/Grid";
// import FlexBox from "@component/FlexBox";
// import { IconButton } from "@component/buttons";
// import Sidenav from "@component/sidenav/Sidenav";
// import { H5, Paragraph } from "@component/Typography";

// import ProductGridView from "@component/products/ProductCard1List";
// import ProductListView from "@component/products/ProductCard9List";
// import ProductFilterCard from "@component/products/ProductFilterCard";
// import useWindowSize from "@hook/useWindowSize";
// import db from "@data/db";

// // ==============================================================
// type Props = {
//   sortOptions: { label: string; value: string }[];
// };
// // ==============================================================

// export default function SearchResult({ sortOptions }: Props) {
//   const width = useWindowSize();
//   const [view, setView] = useState<"grid" | "list">("grid");

//   const isTablet = width < 1025;
//   const toggleView = useCallback((v: any) => () => setView(v), []);

//   return (
//     <>
//       <FlexBox
//         as={Card}
//         mb="55px"
//         p="1.25rem"
//         elevation={5}
//         flexWrap="wrap"
//         borderRadius={8}
//         alignItems="center"
//         justifyContent="space-between">
//         <div>
//           <H5>Searching for “ mobile phone ”</H5>
//           <Paragraph color="text.muted">48 results found</Paragraph>
//         </div>

//         <FlexBox alignItems="center" flexWrap="wrap">
//           <Paragraph color="text.muted" mr="1rem">
//             Short by:
//           </Paragraph>

//           <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
//             <Select placeholder="Short by" defaultValue={sortOptions[0]} options={sortOptions} />
//           </Box>

//           <Paragraph color="text.muted" mr="0.5rem">
//             View:
//           </Paragraph>

//           <IconButton onClick={toggleView("grid")}>
//             <Icon
//               variant="small"
//               defaultcolor="auto"
//               color={view === "grid" ? "primary" : "inherit"}>
//               grid
//             </Icon>
//           </IconButton>

//           <IconButton onClick={toggleView("list")}>
//             <Icon
//               variant="small"
//               defaultcolor="auto"
//               color={view === "list" ? "primary" : "inherit"}>
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
//               }>
//               <ProductFilterCard />
//             </Sidenav>
//           )}
//         </FlexBox>
//       </FlexBox>

//       <Grid container spacing={6}>
//         {/* <Hidden as={Grid} item lg={3} xs={12} down={1024}>
//           <ProductFilterCard />
//         </Hidden> */}
//         <Grid item lg={3} xs={12}>
//           <ProductFilterCard />
//         </Grid>

//         <Grid item lg={9} xs={12}>
//           {view === "grid" ? (
//             <ProductGridView products={db.slice(95, 104)} />
//           ) : (
//             <ProductListView products={db.slice(95, 104)} />
//           )}
//         </Grid>
//       </Grid>
//     </>
//   );
// }

// "use client";
// import { useRouter } from "next/navigation"; // Import useRouter
// import { useCallback, useEffect, useState } from "react";
// import Box from "@component/Box";
// import Card from "@component/Card";
// import Select from "@component/Select";
// import Icon from "@component/icon/Icon";
// import Grid from "@component/grid/Grid";
// import FlexBox from "@component/FlexBox";
// import { IconButton } from "@component/buttons";
// import Sidenav from "@component/sidenav/Sidenav";
// import { H5, Paragraph } from "@component/Typography";

// import ProductGridView from "@component/products/ProductCard1List";
// import ProductListView from "@component/products/ProductCard9List";
// import ProductFilterCard from "@component/products/ProductFilterCard";
// import useWindowSize from "@hook/useWindowSize";

// const productsPerPage = 10; // Adjust as needed

// export default function SearchResult({ sortOptions,slug }) {
//   const router = useRouter(); // Initialize useRouter
//   const width = useWindowSize();
//   const [view, setView] = useState<"grid" | "list">("grid");
//   const [selectedSortOption, setSelectedSortOption] = useState(sortOptions[0].value); // Track selected sort option
//   const [selectedBrand, setSelectedBrand] = useState<any[] | null>(null);
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [products, setProducts] = useState<any[]>([]); // Store fetched products
//   const [loading, setLoading] = useState(false); // Loading state
//   const [totalProducts, setTotalProducts] = useState(0); // Total products from API
//   const [currentPage, setCurrentPage] = useState(1); // Current page

//   const isTablet = width < 1025;

//   const handleBrandChange = (brand: any[]) => {
//     // console.log("Selected brand:", brand);
//     setSelectedBrand(brand);
//   };

//   const handleCategoryChange = (category: string) => {
//     // console.log("Selected category:", category);
//     // console.log(category);
//     setSelectedCategory(category);
//       // Navigate to the new URL with the selected category
//       router.push(`/product/search/${category}`); // Use router.push to navigate
//   };

//   const handleSortChange = (sortOption: any) => {
//     console.log(sortOption.value);
//     setSelectedSortOption(sortOption.value); // Update selected sort option
//   };

//   // Fetch products based on selected brand and category
//   const fetchProducts = useCallback(async () => {

//     setLoading(true);
//     try {
//       const response = await fetch(`https://frontend.tizaraa.com/api/category/${slug}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           category: selectedCategory || "all",
//           brand: selectedBrand || null,
//           page: currentPage, // Include current page in the request
//           orderBy:selectedSortOption
//         }),
//       });

//       // console.log(currentPage);

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();
//       console.log(data)
//       setProducts(data.data);
//       setTotalProducts(data.total); // Set total products from response
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [selectedBrand, selectedCategory, currentPage,selectedSortOption]);

//   // Fetch products whenever selectedBrand or selectedCategory or currentPage changes
//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   // Handle page change
//   const handlePageChange = (page) => {
//     setCurrentPage(page + 1); // Add 1 to adjust for zero-based index
//   };
//   return (
//     <>
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
//           <H5>Searching for {slug}</H5>
//           <Paragraph color="text.muted">{totalProducts} results found</Paragraph>
//         </div>

//         <FlexBox alignItems="center" flexWrap="wrap">
//           <Paragraph color="text.muted" mr="1rem">
//             Sort by:
//           </Paragraph>

//           <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
//             {/* <Select placeholder="Sort by" defaultValue={sortOptions[0]} options={sortOptions} /> */}
//             <Select
//               placeholder="Sort by"
//               options={sortOptions}
//               defaultValue={sortOptions.find(option => option.value === selectedSortOption)} // Set default value
//               onChange={handleSortChange} // Handle sort change
//             />
//           </Box>

//           <Paragraph color="text.muted" mr="0.5rem">
//             View:
//           </Paragraph>

//           <IconButton onClick={() => setView("grid")}>
//             <Icon variant="small" color={view === "grid" ? "primary" : "inherit"}>
//               grid
//             </Icon>
//           </IconButton>

//           <IconButton onClick={() => setView("list")}>
//             <Icon variant="small" color={view === "list" ? "primary" : "inherit"}>
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
//                 slug={slug}
//               />
//             </Sidenav>
//           )}
//         </FlexBox>
//       </FlexBox>

//       <Grid container spacing={6}>
//         <Grid item lg={3} xs={12}>
//           <ProductFilterCard
//             onBrandChange={handleBrandChange}
//             onCategoryChange={handleCategoryChange}
//             slug={slug}
//           />
//         </Grid>

//         <Grid item lg={9} xs={12}>
//           {loading ? (
//             <Paragraph>Loading products...</Paragraph>
//           ) : view === "grid" ? (
//             <ProductGridView
//               products={products}
//               totalProducts={totalProducts}
//               currentPage={currentPage}
//               productsPerPage={productsPerPage}
//               onPageChange={handlePageChange}
//             />
//           ) : (
//             <ProductListView products={products} totalProducts={0} currentPage={0} productsPerPage={0} onPageChange={function (page: number): void {
//                   throw new Error("Function not implemented.");
//                 } } />
//           )}
//         </Grid>

//       </Grid>
//     </>
//   );
// }

"use client";
import React from "react";
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
import { H5, Paragraph } from "@component/Typography";

import ProductGridView from "@component/products/ProductCard1List";
import ProductListView from "@component/products/ProductCard9List";
import ProductFilterCard from "@component/products/ProductFilterCard";
import useWindowSize from "@hook/useWindowSize";
import { Vortex } from "react-loader-spinner";
import styled from "@emotion/styled";
import ApiBaseUrl from "api/ApiBaseUrl";
import BeatLoader from "react-spinners/BeatLoader";

// import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png"
import tizaraa_watermark from "../../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png"
import Image from "next/image";
import NextImage from "@component/NextImage";

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [selectedCountry, setSelectedCountry] = useState<number[] | null>(null); // Track selected country
  const [selectedProvinces, setSelectedProvinces] = useState<number[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  let pageType = "search";

  const isTablet = width < 1025;

  const handleBrandChange = (brand: any[]) => {
    setSelectedBrand(brand);
    setCurrentPage(1); // Reset to first page
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page
    // router.push(`/product/search/${category}`);
  };

  // const handleCategoryChange = (categories: number[]) => {
  //   const categoryId = categories[0];
  //   setSelectedCategory(categoryId);
  //   setCurrentPage(1);
  //   router.push(`/product/search/${categoryId}`);
  // };
  

  const handleCountryChange = (countries: number[]) => {
    setSelectedCountry(countries); // Update selected countries
    setCurrentPage(1); // Reset to first page
  };

  const handleProvinceChange = (provinces: number[]) => {
    setSelectedProvinces(provinces);
    setCurrentPage(1);

  }

  const handleSortChange = (sortOption: any) => {
    setSelectedSortOption(sortOption.value);
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${ApiBaseUrl.baseUrl}search/product/${slug}`,
        {
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
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
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
    currentPage,
    selectedSortOption,
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

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
    width: "100%", // Set to 100% to ensure full responsiveness
    height: "auto", // Maintain aspect ratio
    maxWidth: "1200px", // Optional: Limit the maximum width
    backgroundSize: "contain", // Adjust the scaling behavior
    backgroundPosition: "center",
    opacity: 0.1,
    zIndex: 0,
  }}
/>

     <main
    style={{
      position: "relative",
      background: "none",
    }}
  >


      <FlexBox
        as={Card}
        mb="55px"
        p="1.25rem"
        elevation={5}
        flexWrap="wrap"
        borderRadius={8}
        alignItems="center"
        justifyContent="space-between"
      >
        <div>
          {/* <H5>Searching for {slug}</H5> */}
          <H5>Searching for {decodeURIComponent(slug)}</H5>

          <Paragraph color="text.muted">
            {totalProducts} results found
          </Paragraph>
        </div>

        <FlexBox alignItems="center" flexWrap="wrap">
          <Paragraph color="text.muted" mr="1rem">
            Sort by:
          </Paragraph>

          {/* <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
            <Select
              placeholder="Sort by"
              options={sortOptions}
              defaultValue={sortOptions.find(
                (option) => option.value === selectedSortOption
              )}
              onChange={handleSortChange}
            />
          </Box> */}
          <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
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


          <Paragraph color="text.muted" mr="0.5rem">
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
                onCountryChange={handleCountryChange} // Pass country handler
                onProvinceChange={handleProvinceChange}
                slug={slug}
                pageType={pageType}
              />
            </Sidenav>
          )}
        </FlexBox>
      </FlexBox>

      <Grid container spacing={6}>
      {!isTablet && (
        <Grid item lg={3} xs={12}>
          <ProductFilterCard
            onBrandChange={handleBrandChange}
            onCategoryChange={handleCategoryChange}
            onCountryChange={handleCountryChange} // Pass country handler
            onProvinceChange={handleProvinceChange}
            slug={slug}
            pageType={pageType}
          />
        </Grid>
      )}

        <Grid item lg={9} xs={12}>
          {currentPage === 1 && loading ? ( // Show loading only on initial load
            <Paragraph>
              <LoaderWrapper>
                <Vortex />
              </LoaderWrapper>
            </Paragraph>
          ) : view === "grid" ? (
            <>
              <ProductGridView
                products={products}
                totalProducts={totalProducts}
                currentPage={currentPage}
                productsPerPage={productsPerPage}
                onPageChange={handleLoadMore}
              />
              {/* {loading && currentPage > 1 && (
                <Paragraph>
                  <LoaderWrapper>
                    <Vortex />
                  </LoaderWrapper>
                </Paragraph>
              )}{" "} */}
              <FlexBox justifyContent="center" alignItems="center" mt="32px">
              <Button
                onClick={() => {
                  if (!loading) handleLoadMore(); // No argument passed
                }}
                variant="contained"
                color="primary"
                disabled={loading}
                style={{
                  display:
                    currentPage * productsPerPage < totalProducts
                      ? "block"
                      : "none", // Show button only if there are more products to load
                }}
              >
                {loading ?  <BeatLoader size={18} color="#fff" /> : "Show More"}
              </Button>
            </FlexBox>
            </>
          ) : (
            <>
            <ProductListView
              products={products}
              totalProducts={0}
              currentPage={0}
              productsPerPage={0}
              onPageChange={() => {}}
            />

            <FlexBox justifyContent="center" alignItems="center" mt="32px">
              <Button
                onClick={() => {
                  if (!loading) handleLoadMore(); // No argument passed
                }}
                variant="contained"
                color="primary"
                disabled={loading}
                style={{
                  display:
                    currentPage * productsPerPage < totalProducts
                      ? "block"
                      : "none", // Show button only if there are more products to load
                }}
              >
                {loading ?  <BeatLoader size={18} color="#fff" /> : "Show More"}
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
