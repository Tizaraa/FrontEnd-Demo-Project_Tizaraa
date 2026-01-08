// "use client";
// import { useEffect, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import Box from "@component/Box";
// import Card from "@component/Card";
// import Grid from "@component/grid/Grid";
// import FlexBox from "@component/FlexBox";
// import Select from "@component/Select";
// import Icon from "@component/icon/Icon";
// import { Button, IconButton } from "@component/buttons";
// import Sidenav from "@component/sidenav/Sidenav";
// import ProductGridView from "@component/products/ProductCard1List";
// import ProductListView from "@component/products/ProductCard9List";
// import CampaignProductFilter from "@component/products/CampaignProductFilter";
// import useWindowSize from "@hook/useWindowSize";
// import Typography, { H5, Paragraph } from "@component/Typography";
// import BeatLoader from "react-spinners/BeatLoader";
// import NextImage from "@component/NextImage";
// import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png";

// const productsPerPage = 10;

// interface CampaignProps {
//   sortOptions: { label: string; value: string }[];
//   slug: string;
// }

// export default function Campaign({ sortOptions, slug }: CampaignProps) {
//   const router = useRouter();
//   const width = useWindowSize();
//   const isTablet = width < 1025;

//   const [view, setView] = useState<"grid" | "list">("grid");
//   const [selectedSortOption, setSelectedSortOption] = useState(
//     sortOptions[0].value
//   );
//   const [selectedBrand, setSelectedBrand] = useState<number[] | null>(null);
//   const [selectedCategory, setSelectedCategory] = useState<number[] | null>(
//     null
//   );
//   const [selectedCountry, setSelectedCountry] = useState<number[] | null>(null);
//   const [selectedProvinces, setSelectedProvinces] = useState<number[]>([]);

//   const [activeCampaign, setActiveCampaign] = useState<number | null>(null);
//   const [products, setProducts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);

//   // ===== Fetch Active Campaign ID =====
//   useEffect(() => {
//     const fetchActiveCampaign = async () => {
//       try {
//         const res = await fetch(
//           "https://frontend.tizaraa.shop/api/campaigns/active"
//         );
//         const data = await res.json();
//         setActiveCampaign(data?.campaign?.id || null);
//         console.log("Active campaign ID from API:", data?.campaign?.id);
//         console.log(activeCampaign);
//       } catch (err) {
//         console.error("Error fetching active campaign:", err);
//       }
//     };
//     fetchActiveCampaign();
//   }, []);

//   // ===== Fetch Products =====
//   const fetchProducts = useCallback(async () => {
//     if (!activeCampaign) return;

//     setLoading(true);

//     const filters: any = {};
//     if (selectedCategory) filters.category = selectedCategory;
//     if (selectedBrand && selectedBrand.length) filters.brand = selectedBrand;
//     if (selectedCountry && selectedCountry.length)
//       filters.country = selectedCountry;
//     if (selectedProvinces && selectedProvinces.length)
//       filters.province = selectedProvinces;

//     try {
//       const response = await fetch(
//         `https://frontend.tizaraa.shop/api/campaigns/product/${activeCampaign}`,
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

//       if (!response.ok) throw new Error("Network response was not ok");

//       const data = await response.json();

//       if (currentPage === 1) setProducts(data.data);
//       else setProducts((prev) => [...prev, ...data.data]);

//       setTotalProducts(data.total);
//     } catch (err) {
//       console.error("Error fetching campaign products:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [
//     activeCampaign,
//     selectedBrand,
//     selectedCategory,
//     selectedCountry,
//     selectedProvinces,
//     currentPage,
//     selectedSortOption,
//   ]);

//   // Fetch products whenever activeCampaign or filters/page/sort change
//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   // ===== Handlers =====
//   const handleLoadMore = () => setCurrentPage((prev) => prev + 1);
//   const handleBrandChange = (brands: number[]) => {
//     setSelectedBrand(brands);
//     setCurrentPage(1);
//   };
//   const handleCategoryChange = (categories: number[]) => {
//     setSelectedCategory(categories);
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
//   const handleSortChange = (option: any) => setSelectedSortOption(option.value);

//   // ===== Render =====
//   return (
//     <>
//       <NextImage
//         alt="watermark"
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
//           opacity: 0.1,
//           zIndex: 0,
//         }}
//       />

//       <main style={{ position: "relative", background: "none" }}>
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
//             <Paragraph color="text.muted" fontSize={["12px", "14px"]}>
//               {totalProducts} results found
//             </Paragraph>
//           </div>

//           <FlexBox
//             alignItems="center"
//             flexWrap="wrap"
//             justifyContent={["flex-start", "flex-end"]}
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
//             <Box flex="1 1 0" mr={["1rem", "1.75rem"]} minWidth="120px">
//               <Select
//                 placeholder="Sort by"
//                 options={sortOptions}
//                 defaultValue={sortOptions.find(
//                   (opt) => opt.value === selectedSortOption
//                 )}
//                 onChange={handleSortChange}
//                 styles={{ menu: (provided) => ({ ...provided, zIndex: 1000 }) }}
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
//                 scroll
//                 handle={
//                   <IconButton>
//                     <Icon>options</Icon>
//                   </IconButton>
//                 }
//               >
//                 <CampaignProductFilter
//                   onBrandChange={handleBrandChange}
//                   onCategoryChange={handleCategoryChange}
//                   onCountryChange={handleCountryChange}
//                   onProvinceChange={handleProvinceChange}
//                   slug={slug}
//                   pageType="campaign"
//                 />
//               </Sidenav>
//             )}
//           </FlexBox>
//         </FlexBox>

//         <Grid container spacing={6}>
//           {!isTablet && (
//             <Grid item lg={3} xs={12}>
//               <CampaignProductFilter
//                 onBrandChange={handleBrandChange}
//                 onCategoryChange={handleCategoryChange}
//                 onCountryChange={handleCountryChange}
//                 onProvinceChange={handleProvinceChange}
//                 slug={slug}
//                 pageType="campaign"
//               />
//             </Grid>
//           )}

//           <Grid item lg={9} xs={12}>
//             {currentPage === 1 && loading ? (
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
//                 <FlexBox justifyContent="center" alignItems="center" mt="32px">
//                   <Button
//                     onClick={handleLoadMore}
//                     variant="contained"
//                     color="primary"
//                     disabled={loading}
//                     style={{
//                       display:
//                         currentPage * productsPerPage < totalProducts
//                           ? "block"
//                           : "none",
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
//                       display:
//                         currentPage * productsPerPage < totalProducts
//                           ? "block"
//                           : "none",
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
import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@component/Box";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import Select from "@component/Select";
import Icon from "@component/icon/Icon";
import { Button, IconButton } from "@component/buttons";
import Sidenav from "@component/sidenav/Sidenav";
import ProductGridView from "@component/products/ProductCard1List";
import ProductListView from "@component/products/ProductCard9List";
import CampaignProductFilter from "@component/products/CampaignProductFilter";
import useWindowSize from "@hook/useWindowSize";
import Typography, { H5, Paragraph } from "@component/Typography";
import BeatLoader from "react-spinners/BeatLoader";
import NextImage from "@component/NextImage";
import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png";
import ApiBaseUrl from "api/ApiBaseUrl";

const productsPerPage = 10;

const PrimaryLoader = `${ApiBaseUrl.ImgUrl}frontend/loader/loader.gif`;

interface CampaignProps {
 sortOptions: { label: string; value: string }[];
 slug: string;
}

interface CampaignData {
 id: number;
 name: string;
 type: string;
 description: string;
 banner_image: string | null;
 start_date: string;
 end_date: string;
 status: string;
 min_purchase_amount: string;
 max_discount_amount: string;
}

export default function Campaign({ sortOptions, slug }: CampaignProps) {
 const router = useRouter();
 const searchParams = useSearchParams();
 const width = useWindowSize();
 const isTablet = width < 1025;

 // Get campaign type from URL query parameter
 const campaignTypeFromUrl = searchParams.get("type") || "flash_sale";

 const [view, setView] = useState<"grid" | "list">("grid");
 const [selectedSortOption, setSelectedSortOption] = useState(
  sortOptions[0].value
 );
 const [selectedBrand, setSelectedBrand] = useState<number[] | null>(null);
 const [selectedCategory, setSelectedCategory] = useState<number[] | null>(
  null
 );
 const [selectedCountry, setSelectedCountry] = useState<number[] | null>(null);
 const [selectedProvinces, setSelectedProvinces] = useState<number[]>([]);

 const [activeCampaign, setActiveCampaign] = useState<CampaignData | null>(
  null
 );
 const [products, setProducts] = useState<any[]>([]);
 const [loading, setLoading] = useState(false);
 const [campaignLoading, setCampaignLoading] = useState(true);
 const [totalProducts, setTotalProducts] = useState(0);
 const [currentPage, setCurrentPage] = useState(1);

 // ===== Fetch Active Campaign =====
 useEffect(() => {
  const fetchActiveCampaign = async () => {
   try {
    setCampaignLoading(true);
    const res = await fetch(`${ApiBaseUrl.baseUrl}campaigns/active`);
    const data = await res.json();

    if (data?.campaign) {
     // Check if the campaign type matches the URL parameter
     if (data.campaign.type === campaignTypeFromUrl) {
      setActiveCampaign(data.campaign);
      console.log("Active campaign loaded:", data.campaign);
     } else {
      console.warn(
       `Campaign type mismatch. URL expects: ${campaignTypeFromUrl}, but got: ${data.campaign.type}`
      );
      setActiveCampaign(data.campaign); // Still load the campaign but show warning
     }
    } else {
     setActiveCampaign(null);
    }
   } catch (err) {
    console.error("Error fetching active campaign:", err);
    setActiveCampaign(null);
   } finally {
    setCampaignLoading(false);
   }
  };

  fetchActiveCampaign();
 }, [campaignTypeFromUrl]);

 // ===== Fetch Products =====
 const fetchProducts = useCallback(async () => {
  if (!activeCampaign?.id) return;

  setLoading(true);

  const filters: any = {};
  if (selectedCategory) filters.category = selectedCategory;
  if (selectedBrand && selectedBrand.length) filters.brand = selectedBrand;
  if (selectedCountry && selectedCountry.length)
   filters.country = selectedCountry;
  if (selectedProvinces && selectedProvinces.length)
   filters.province = selectedProvinces;

  try {
   const response = await fetch(
    `${ApiBaseUrl.baseUrl}campaigns/product/${activeCampaign.id}`,
    {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
      ...filters,
      page: currentPage,
      orderBy: selectedSortOption,
     }),
    }
   );

   if (!response.ok) throw new Error("Network response was not ok");

   const data = await response.json();

   if (currentPage === 1) setProducts(data.data);
   else setProducts((prev) => [...prev, ...data.data]);

   setTotalProducts(data.total);
  } catch (err) {
   console.error("Error fetching campaign products:", err);
  } finally {
   setLoading(false);
  }
 }, [
  activeCampaign?.id,
  selectedBrand,
  selectedCategory,
  selectedCountry,
  selectedProvinces,
  currentPage,
  selectedSortOption,
 ]);

 // Fetch products whenever activeCampaign or filters/page/sort change
 useEffect(() => {
  if (activeCampaign) {
   fetchProducts();
  }
 }, [fetchProducts, activeCampaign]);

 // Reset page when filters change
 const resetPageAndFetch = useCallback(() => {
  setCurrentPage(1);
  setProducts([]);
 }, []);

 // ===== Handlers =====
 const handleLoadMore = () => setCurrentPage((prev) => prev + 1);

 const handleBrandChange = (brands: number[]) => {
  setSelectedBrand(brands);
  resetPageAndFetch();
 };

 const handleCategoryChange = (categories: number[]) => {
  setSelectedCategory(categories);
  resetPageAndFetch();
 };

 const handleCountryChange = (countries: number[]) => {
  setSelectedCountry(countries);
  resetPageAndFetch();
 };

 const handleProvinceChange = (provinces: number[]) => {
  setSelectedProvinces(provinces);
  resetPageAndFetch();
 };

 const handleSortChange = (option: any) => {
  setSelectedSortOption(option.value);
  resetPageAndFetch();
 };

 // Display campaign name based on type
 const getCampaignDisplayName = () => {
  if (activeCampaign) {
   return activeCampaign.name;
  }
  return campaignTypeFromUrl
   .replace(/_/g, " ")
   .replace(/\b\w/g, (l) => l.toUpperCase());
 };

 // Show loading state while fetching campaign
 if (campaignLoading) {
  return (
   <main style={{ position: "relative", background: "none" }}>
    <FlexBox justifyContent="center" alignItems="center" minHeight="400px">
     <BeatLoader size={18} color="#e94560" />
     <Paragraph ml="1rem">Loading campaign...</Paragraph>
    </FlexBox>
   </main>
  );
 }

 // Show message if no active campaign found
 if (!activeCampaign) {
  return (
   <main style={{ position: "relative", background: "none" }}>
    <Card p="2rem" textAlign="center">
     <H5 mb="1rem">No Active Campaign</H5>
     <Paragraph color="text.muted">
      No active campaign found for type: {campaignTypeFromUrl}
     </Paragraph>
    </Card>
   </main>
  );
 }

 // ===== Render =====
 return (
  <>
   <NextImage
    alt="watermark"
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
     opacity: 0.1,
     zIndex: 0,
    }}
   />

   <main style={{ position: "relative", background: "none" }}>
    {/* Campaign Banner/Info */}

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
      <H5 fontSize={["14px", "16px"]}>{getCampaignDisplayName()} Products</H5>
      <Paragraph color="text.muted" fontSize={["12px", "14px"]}>
       {totalProducts} results found
      </Paragraph>
     </div>

     <FlexBox
      alignItems="center"
      flexWrap="wrap"
      justifyContent={["flex-start", "flex-end"]}
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
         (opt) => opt.value === selectedSortOption
        )}
        onChange={handleSortChange}
        styles={{ menu: (provided) => ({ ...provided, zIndex: 1000 }) }}
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
       <Icon variant="small" color={view === "grid" ? "primary" : "inherit"}>
        grid
       </Icon>
      </IconButton>
      <IconButton onClick={() => setView("list")}>
       <Icon variant="small" color={view === "list" ? "primary" : "inherit"}>
        menu
       </Icon>
      </IconButton>

      {isTablet && (
       <Sidenav
        position="left"
        scroll
        handle={
         <IconButton>
          <Icon>options</Icon>
         </IconButton>
        }
       >
        <CampaignProductFilter
         onBrandChange={handleBrandChange}
         onCategoryChange={handleCategoryChange}
         onCountryChange={handleCountryChange}
         onProvinceChange={handleProvinceChange}
         slug={activeCampaign.type}
         pageType="campaign"
        />
       </Sidenav>
      )}
     </FlexBox>
    </FlexBox>

    <Grid container spacing={6}>
     {!isTablet && (
      <Grid item lg={3} xs={12}>
       <CampaignProductFilter
        onBrandChange={handleBrandChange}
        onCategoryChange={handleCategoryChange}
        onCountryChange={handleCountryChange}
        onProvinceChange={handleProvinceChange}
        slug={activeCampaign.type}
        pageType="campaign"
       />
      </Grid>
     )}

     <Grid item lg={9} xs={12}>
      {currentPage === 1 && loading ? (
       <FlexBox justifyContent="center" alignItems="center" minHeight="400px">
        {/* <BeatLoader size={18} color="#e94560" /> */}
        <img
         src={PrimaryLoader}
         alt="Loading"
         style={{ width: 60, height: 60 }}
        />
       </FlexBox>
      ) : products.length === 0 ? (
       <Card p="2rem" textAlign="center">
        <Paragraph color="text.muted">
         No products found for this campaign.
        </Paragraph>
       </Card>
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
          onClick={handleLoadMore}
          variant="contained"
          color="primary"
          disabled={loading}
          style={{
           display:
            currentPage * productsPerPage < totalProducts ? "block" : "none",
          }}
         >
          {loading ? <BeatLoader size={18} color="#fff" /> : "Show More"}
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
          onClick={handleLoadMore}
          variant="contained"
          color="primary"
          disabled={loading}
          style={{
           display:
            currentPage * productsPerPage < totalProducts ? "block" : "none",
          }}
         >
          {loading ? <BeatLoader size={18} color="#e94560" /> : "Show More"}
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
