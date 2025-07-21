// "use client";
// import { useRouter } from "next/navigation";
// import { useCallback, useEffect, useState } from "react";
// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import IconButton from "@mui/material/IconButton";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
// import SearchOffIcon from "@mui/icons-material/SearchOff";
// import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
// import GridViewIcon from "@mui/icons-material/GridView";
// import ViewListIcon from "@mui/icons-material/ViewList";
// import TuneIcon from "@mui/icons-material/Tune";
// import Sidenav from "@component/sidenav/Sidenav";
// import ProductGridView from "@component/products/ProductCard1List";
// import ProductListView from "@component/products/ProductCard9List";
// import ProductFilterCard from "@component/products/ProductFilterCard";
// import useWindowSize from "@hook/useWindowSize";
// import { Vortex } from "react-loader-spinner";
// import styled from "@emotion/styled";
// import ApiBaseUrl from "api/ApiBaseUrl";
// import BeatLoader from "react-spinners/BeatLoader";
// import NextImage from "next/image";
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
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(slug);
//   const [selectedCountry, setSelectedCountry] = useState<number[] | null>(null);
//   const [selectedProvinces, setSelectedProvinces] = useState<number[]>([]);
//   const [products, setProducts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [totalProducts, setTotalProducts] = useState<number>(0);
//   const [currentPage, setCurrentPage] = useState<number>(1);

//   const isTablet = width < 1025;

//   const handleBrandChange = (brands: number[]) => {
//     setSelectedBrand(brands);
//     setCurrentPage(1);
//   };

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category);
//     setCurrentPage(1);
//   };

//   const handleCountryChange = (countries: number[]) => {
//     setSelectedCountry(countries);
//     setCurrentPage(1);
//   };

//   const handleProvinceChange = (provinces: number[]) => {
//     setSelectedProvinces(provinces);
//     setCurrentPage(1);
//   };

//   const handleSortChange = (e) => {
//     setSelectedSortOption(e.target.value);
//   };

//   const resetFilters = () => {
//     setSelectedBrand(null);
//     setSelectedCountry(null);
//     setSelectedProvinces([]);
//     setCurrentPage(1);
//   };

//   const fetchProducts = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${ApiBaseUrl.baseUrl}category/${selectedCategory || slug}`, {
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

//       if (data.data.length === 0) {
//         if (currentPage === 1) {
//           setProducts([]);
//         }
//       } else {
//         if (currentPage === 1) {
//           setProducts(data.data);
//         } else {
//           setProducts((prevProducts) => [...prevProducts, ...data.data]);
//         }
//       }

//       setTotalProducts(Number(data.total) || 0);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setProducts([]);
//       setTotalProducts(0);
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
//         <Box
//           component={Card}
//           mb="55px"
//           p="1.25rem"
//           elevation={5}
//           sx={{
//             display: "flex",
//             flexWrap: "wrap",
//             borderRadius: 8,
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <div>
//             <Typography variant="h5">Searching for {decodeURIComponent(selectedCategory || slug)}</Typography>
//             <Typography color="text.secondary">{totalProducts} results found</Typography>
//           </div>
//           <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
//             <Typography color="text.secondary" mr="1rem">Sort by:</Typography>
//             <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
//               <Select
//                 value={selectedSortOption}
//                 onChange={handleSortChange}
//                 sx={{ minWidth: 150 }}
//               >
//                 {sortOptions.map((option) => (
//                   <MenuItem key={option.value} value={option.value}>
//                     {option.label}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </Box>
//             <Typography color="text.secondary" mr="0.5rem">View:</Typography>
//             <IconButton onClick={() => setView("grid")} color={view === "grid" ? "primary" : "default"}>
//               <GridViewIcon />
//             </IconButton>
//             <IconButton onClick={() => setView("list")} color={view === "list" ? "primary" : "default"}>
//               <ViewListIcon />
//             </IconButton>
//             {isTablet && (
//               <Sidenav position="left" scroll={true} handle={
//                 <IconButton>
//                   <TuneIcon />
//                 </IconButton>
//               }>
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
//           </Box>
//         </Box>

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
//             ) : products.length === 0 ? (
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   height: "400px",
//                   textAlign: "center",
//                   p: 3,
//                   border: "1px dashed",
//                   borderColor: "divider",
//                   borderRadius: 2,
//                   backgroundColor: "background.paper"
//                 }}
//               >
//                 <SearchOffIcon 
//                   sx={{ 
//                     fontSize: 80, 
//                     color: "text.disabled",
//                     mb: 2
//                   }} 
//                 />
//                 <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
//                   No Products Found
//                 </Typography>
//                 <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
//                   {selectedBrand || selectedCountry || selectedProvinces.length > 0
//                     ? "Try adjusting your filters"
//                     : "No products available in this category"}
//                 </Typography>
//                 {(selectedBrand || selectedCountry || selectedProvinces.length > 0) && (
//                   <Button 
//                     variant="contained" 
//                     color="primary"
//                     onClick={resetFilters}
//                   >
//                     Reset Filters
//                   </Button>
//                 )}
//               </Box>
//             ) : view === "grid" ? (
//               <>
//                 <ProductGridView
//                   products={products}
//                   totalProducts={totalProducts}
//                   currentPage={currentPage}
//                   productsPerPage={productsPerPage}
//                   onPageChange={handleLoadMore}
//                 />
//                 <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 4 }}>
//                   <Button
//                     onClick={handleLoadMore}
//                     variant="contained"
//                     color="primary"
//                     disabled={loading || currentPage >= totalProducts / productsPerPage}
//                     sx={{
//                       display: currentPage * productsPerPage < totalProducts ? "block" : "none",
//                     }}
//                   >
//                     {loading ? <BeatLoader size={18} color="#fff" /> : "Show More"}
//                   </Button>
//                 </Box>
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
//                 <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 4 }}>
//                   <Button
//                     onClick={handleLoadMore}
//                     variant="contained"
//                     color="primary"
//                     disabled={loading || currentPage >= totalProducts / productsPerPage}
//                     sx={{
//                       display: currentPage * productsPerPage < totalProducts ? "block" : "none",
//                     }}
//                   >
//                     {loading ? <BeatLoader size={18} color="#fff" /> : "Show More"}
//                   </Button>
//                 </Box>
//               </>
//             )}
//           </Grid>
//         </Grid>
//       </main>
//     </>
//   );
// }


// =====================================================


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
// import NextImage from "@component/NextImage";
// import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png";
// import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

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
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(slug);
//   const [selectedCountry, setSelectedCountry] = useState<number[] | null>(null);
//   const [selectedProvinces, setSelectedProvinces] = useState<number[]>([]);
//   const [products, setProducts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [totalProducts, setTotalProducts] = useState<number>(0);
//   const [currentPage, setCurrentPage] = useState<number>(1);

//   const isTablet = width < 1025;

//   const handleBrandChange = (brands: number[]) => {
//     setSelectedBrand(brands);
//     setCurrentPage(1);
//   };

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category);
//     setCurrentPage(1);
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
//       const response = await fetch(`${ApiBaseUrl.baseUrl}category/${selectedCategory || slug}`, {
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

//       if (data.data.length === 0) {
//         if (currentPage === 1) {
//           setProducts([]);
//         }
//       } else {
//         if (currentPage === 1) {
//           setProducts(data.data);
//         } else {
//           setProducts((prevProducts) => [...prevProducts, ...data.data]);
//         }
//       }

//       setTotalProducts(Number(data.total) || 0);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setProducts([]);
//       setTotalProducts(0);
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
//             <H5>Searching for {decodeURIComponent(selectedCategory || slug)}</H5>
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
//             ) : products.length === 0 ? (
//               <Box
//                 display="flex"
//                 flexDirection="column"
//                 alignItems="center"
//                 justifyContent="center"
//                 height="300px"
//                 textAlign="center"
//                 p="2rem"
//                 backgroundColor="background.paper"
//                 borderRadius={8}
//               >
//                 <ShoppingBasketIcon 
//                   style={{ 
//                     fontSize: 100, 
//                     color: "#999",
//                     marginBottom: "1rem" 
//                   }} 
//                 />
//                 <H5 color="text.secondary" fontSize="28px">Search No Result</H5>
//                 <Paragraph color="text.muted" mt="0.5rem" fontSize="16px">
//                 We're sorry. We cannot find any matches for your search term.
//                 </Paragraph>
//               </Box>
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
//                     disabled={loading || currentPage >= totalProducts / productsPerPage}
//                     style={{
//                       display: currentPage * productsPerPage < totalProducts ? "block" : "none",
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
//                     disabled={loading || currentPage >= totalProducts / productsPerPage}
//                     style={{
//                       display: currentPage * productsPerPage < totalProducts ? "block" : "none",
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



// =========== Last Update: 21.07.25 ===============

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
import { H5, Paragraph } from "@component/Typography";
import ProductGridView from "@component/products/ProductCard1List";
import ProductListView from "@component/products/ProductCard9List";
import ProductFilterCard from "@component/products/ProductFilterCard";
import useWindowSize from "@hook/useWindowSize";
import { Vortex } from "react-loader-spinner";
import styled from "@emotion/styled";
import ApiBaseUrl from "api/ApiBaseUrl";
import BeatLoader from "react-spinners/BeatLoader";
import NextImage from "@component/NextImage";
import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const productsPerPage: number = 10;

export default function SearchResult({ sortOptions, slug }: { sortOptions: any[], slug: string }) {
  const router = useRouter();
  const width = useWindowSize();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedSortOption, setSelectedSortOption] = useState(sortOptions[0].value);
  const [selectedBrand, setSelectedBrand] = useState<number[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(slug);
  const [selectedCountry, setSelectedCountry] = useState<number[] | null>(null);
  const [selectedProvinces, setSelectedProvinces] = useState<number[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);

  const isTablet = width < 1025;

  const handleBrandChange = (brands: number[]) => {
    setSelectedBrand(brands);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleCountryChange = (countries: number[]) => {
    setSelectedCountry(countries);
    setCurrentPage(1);
  };

  const handleProvinceChange = (provinces: number[]) => {
    setSelectedProvinces(provinces);
    setCurrentPage(1);
  };

  const handlePriceChange = (min: number | null, max: number | null) => {
    setPriceMin(min);
    setPriceMax(max);
    setCurrentPage(1);
  };

  const handleSortChange = (sortOption: any) => {
    setSelectedSortOption(sortOption.value);
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const requestBody: any = {
        category: selectedCategory || "all",
        brand: selectedBrand || null,
        country: selectedCountry || null,
        province: selectedProvinces || null,
        page: currentPage,
        orderBy: selectedSortOption,
      };
  
      // ✅ Only add price filters if they are set
      if (priceMin !== null && priceMax !== null) {
        requestBody.price_min = priceMin;
        requestBody.price_max = priceMax;
      }
  
      const response = await fetch(`${ApiBaseUrl.baseUrl}category/${selectedCategory || slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      console.log("category data", data);
  
      if (data.data.length === 0) {
        if (currentPage === 1) {
          setProducts([]);
        }
      } else {
        if (currentPage === 1) {
          setProducts(data.data);
        } else {
          setProducts((prevProducts) => [...prevProducts, ...data.data]);
        }
      }
  
      setTotalProducts(Number(data.total) || 0);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      setTotalProducts(0);
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
    slug,
    priceMin,
    priceMax,
  ]);
  

  const handleLoadMore = () => {
    if (loading) return;
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
            <H5>Searching for {decodeURIComponent(selectedCategory || slug)}</H5>
            <Paragraph color="text.muted">{totalProducts} results found</Paragraph>
          </div>
          <FlexBox alignItems="center" flexWrap="wrap">
            <Paragraph color="text.muted" mr="1rem">Sort by:</Paragraph>
            <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
              <Select
                placeholder="Sort by"
                options={sortOptions}
                defaultValue={sortOptions.find((option) => option.value === selectedSortOption)}
                onChange={handleSortChange}
                styles={{ menu: (provided) => ({ ...provided, zIndex: 1000 }) }}
              />
            </Box>
            <Paragraph color="text.muted" mr="0.5rem">View:</Paragraph>
            <IconButton onClick={() => setView("grid")}> <Icon variant="small" color={view === "grid" ? "primary" : "inherit"}>grid</Icon> </IconButton>
            <IconButton onClick={() => setView("list")}> <Icon variant="small" color={view === "list" ? "primary" : "inherit"}>menu</Icon> </IconButton>
            {isTablet && (
              <Sidenav position="left" scroll={true} handle={<IconButton><Icon>options</Icon></IconButton>}>
                <ProductFilterCard
                  onBrandChange={handleBrandChange}
                  onCategoryChange={handleCategoryChange}
                  onCountryChange={handleCountryChange}
                  onProvinceChange={handleProvinceChange}
                  onPriceChange={handlePriceChange}
                  slug={slug}
                  pageType="default"
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
                onCountryChange={handleCountryChange}
                onProvinceChange={handleProvinceChange}
                onPriceChange={handlePriceChange}
                slug={slug}
                pageType="default"
              />
            </Grid>
          )}
          <Grid item lg={9} xs={12}>
            {currentPage === 1 && loading ? (
              <LoaderWrapper><Vortex /></LoaderWrapper>
            ) : products.length === 0 ? (
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="300px" textAlign="center" p="2rem" backgroundColor="background.paper" borderRadius={8}>
                <ShoppingBasketIcon style={{ fontSize: 100, color: "#999", marginBottom: "1rem" }} />
                <H5 color="text.secondary" fontSize="28px">Search No Result</H5>
                <Paragraph color="text.muted" mt="0.5rem" fontSize="16px">
                  We're sorry. We cannot find any matches for your search term.
                </Paragraph>
              </Box>
            ) : view === "grid" ? (
              <>
                <ProductGridView products={products} totalProducts={totalProducts} currentPage={currentPage} productsPerPage={productsPerPage} onPageChange={handleLoadMore} />
                <FlexBox justifyContent="center" alignItems="center" mt="32px">
                  <Button onClick={handleLoadMore} variant="contained" color="primary" disabled={loading || currentPage >= totalProducts / productsPerPage} style={{ display: currentPage * productsPerPage < totalProducts ? "block" : "none" }}>
                    {loading ? <BeatLoader size={18} color="#fff" /> : "Show More"}
                  </Button>
                </FlexBox>
              </>
            ) : (
              <>
                <ProductListView products={products} totalProducts={totalProducts} currentPage={currentPage} productsPerPage={productsPerPage} onPageChange={handleLoadMore} />
                <FlexBox justifyContent="center" alignItems="center" mt="32px">
                  <Button onClick={handleLoadMore} variant="contained" color="primary" disabled={loading || currentPage >= totalProducts / productsPerPage} style={{ display: currentPage * productsPerPage < totalProducts ? "block" : "none" }}>
                    {loading ? <BeatLoader size={18} color="#fff" /> : "Show More"}
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
