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
// import { IconButton } from "@component/buttons";
// import Sidenav from "@component/sidenav/Sidenav";
// import { H5, Paragraph } from "@component/Typography";

// import ProductGridView from "@component/products/ProductCard1List";
// import ProductListView from "@component/products/ProductCard9List";
// import ProductFilterCard from "@component/products/ProductFilterCard";
// import useWindowSize from "@hook/useWindowSize";
// import { Vortex } from "react-loader-spinner";
// import styled from "@emotion/styled";
// import ApiBaseUrl from "api/ApiBaseUrl";

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
//   const [selectedBrand, setSelectedBrand] = useState<any[] | null>(null);
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [selectedCountry, setSelectedCountry] = useState<number[] | null>(null); // Track selected country
//   const [products, setProducts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   let pageType = "search";

//   const isTablet = width < 1025;

//   const handleBrandChange = (brand: any[]) => {
//     setSelectedBrand(brand);
//     setCurrentPage(1); // Reset to first page
//   };

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category);
//     setCurrentPage(1); // Reset to first page
//     router.push(`/OtProductSearch/search/${category}`);
//   };

//   const handleCountryChange = (countries: number[]) => {
//     setSelectedCountry(countries); // Update selected countries
//     setCurrentPage(1); // Reset to first page
//   };

//   const handleSortChange = (sortOption: any) => {
//     setSelectedSortOption(sortOption.value);
//   };

//   const fetchProducts = async (query: string, page: number) => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `${ApiBaseUrl.baseUrl}otpi/items`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             xmlParameters: `<SearchItemsParameters><ItemTitle>${query}</ItemTitle></SearchItemsParameters>`,
//             framePosition: (page - 1) * productsPerPage,
//             frameSize: productsPerPage,
//           }),
//         }
//       );
//       const data = await response.json();
//       const results = data?.Result?.Items?.Content || [];
//       setProducts((prev) => (page === 1 ? results : [...prev, ...results]));
//       setTotalProducts(data?.Result?.Items?.Total || 0);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLoadMore = () => {
//     setCurrentPage((prevPage) => prevPage + 1);
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

//           {/* <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
//             <Select
//               placeholder="Sort by"
//               options={sortOptions}
//               defaultValue={sortOptions.find(
//                 (option) => option.value === selectedSortOption
//               )}
//               onChange={handleSortChange}
//             />
//           </Box> */}
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
//                 onCountryChange={handleCountryChange} // Pass country handler
//                 slug={slug}
//                 pageType={pageType}
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
//             onCountryChange={handleCountryChange} // Pass country handler
//             slug={slug}
//             pageType={pageType}
//           />
//         </Grid>

//         <Grid item lg={9} xs={12}>
//           {currentPage === 1 && loading ? ( // Show loading only on initial load
//             <Paragraph>
//               <LoaderWrapper>
//                 <Vortex />
//               </LoaderWrapper>
//             </Paragraph>
//           ) : view === "grid" ? (
//             <>
//               <ProductGridView
//                 products={products}
//                 totalProducts={totalProducts}
//                 currentPage={currentPage}
//                 productsPerPage={productsPerPage}
//                 onPageChange={handleLoadMore}
//               />
//               {loading && currentPage > 1 && (
//                 <Paragraph>
//                   <LoaderWrapper>
//                     <Vortex />
//                   </LoaderWrapper>
//                 </Paragraph>
//               )}{" "}
//               {/* Optional: loading indicator for more products */}
//             </>
//           ) : (
//             <ProductListView
//               products={products}
//               totalProducts={0}
//               currentPage={0}
//               productsPerPage={0}
//               onPageChange={() => {}}
//             />
//           )}
//         </Grid>
//       </Grid>
//     </>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import { H4, H5, Paragraph } from "@component/Typography";
import ApiBaseUrl from "api/ApiBaseUrl";
import Card from "@component/Card";
import { ProductCard1 } from "@component/product-cards";
import { currency } from "@utils/utils";
import Link from "next/link";

const productsPerPage = 10000;

export default function SearchResult({ slug }: { slug: string }) {
  const [products, setProducts] = useState<any[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async (query: string, page: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${ApiBaseUrl.baseUrl}otpi/items`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            xmlParameters: `<SearchItemsParameters><ItemTitle>${query}</ItemTitle></SearchItemsParameters>`,
            framePosition: (page - 1) * productsPerPage,
            frameSize: productsPerPage,
          }),
        }
      );
      const data = await response.json();
      const results = data?.Result?.Items?.Content || [];
      setProducts((prev) => (page === 1 ? results : [...prev, ...results]));
  
      // Dynamically calculate the total products based on results
      const currentTotal = page === 1 ? results.length : products.length + results.length;
      setTotalProducts(currentTotal);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (slug) fetchProducts(decodeURIComponent(slug), currentPage);
  }, [slug, currentPage]);

  const handleLoadMore = () => setCurrentPage((prev) => prev + 1);

  return (
    <Box>
      <FlexBox justifyContent="space-between" alignItems="center" mb="20px">
        <div>
          <H5>Searching for {decodeURIComponent(slug)}</H5>
          <Paragraph>{totalProducts} results found</Paragraph>
        </div>
      </FlexBox>

      {/* <Grid container spacing={6}>
        {products.map((product: any, index: number) => (
          <Grid item key={index} lg={3} md={4} sm={6} xs={12}>
            <Card>
              <h5>{product.Title || `Product ${index + 1}`}</h5>
            </Card>
              
          </Grid>
        ))}
      </Grid> */}
      <Grid container spacing={6}>
  {products.map((product: any, index: number) => (
    <Grid item key={index} lg={3} md={4} sm={6} xs={12}>
      <Box py="0.25rem" key={product.Id}>
                                <Card p="1rem" borderRadius={8} style={{ height: "300px" }}>
                                    <Link href={`/otproducts/${product.Id}`}>
                                    <Box position="relative">
    <img
        src={product.MainPictureUrl}
        alt={product.Title}
        style={{
            width: "100%",
            height: "190px", 
            borderRadius: "8px",
            objectFit: "cover",
        }}
        // className={styles.imgPart}
    />
</Box>

                                        <H4
                                            fontWeight="600"
                                            fontSize="18px"
                                            mb="0.25rem"
                                            style={{
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {product.Title}
                                        </H4>

                                        <FlexBox flexDirection="column">
                        {product.Price.DiscountPrice > 0 ? (
                          <>
                            <H4
                              fontWeight="600"
                              fontSize="14px"
                              color="text.muted"
                            >
                              BDT <del>{product.Price.OriginalPrice}</del>
                            </H4>
                            <Box marginTop="4px">
                              <H4
                                fontWeight="600"
                                fontSize="14px"
                                color="primary.main"
                              >
                                {currency(product.Price.DiscountPrice)}
                              </H4>
                            </Box>
                          </>
                        ) : (
                          <H4
                            fontWeight="600"
                            fontSize="14px"
                            color="primary.main"
                          >
                            {currency(product.Price.ConvertedPriceWithoutSign)}
                          </H4>
                        )}
                      </FlexBox>
                                    </Link>
                                </Card>
                            </Box>
    </Grid>
  ))}
</Grid>


      {loading && <Paragraph>Loading...</Paragraph>}

      {currentPage * productsPerPage < totalProducts && (
        <FlexBox justifyContent="center" mt="20px">
          <button onClick={handleLoadMore}>Load More</button>
        </FlexBox>
      )}
    </Box>
  );
}
