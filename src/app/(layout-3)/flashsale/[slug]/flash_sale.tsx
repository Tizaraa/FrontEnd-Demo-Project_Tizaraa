"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Grid from "@component/grid/Grid";
import ProductGridView from "@component/products/ProductCard1List";
import ProductListView from "@component/products/ProductCard9List";
import useWindowSize from "@hook/useWindowSize";
import ApiBaseUrl from "api/ApiBaseUrl";
import FlashSaleProductFilter from "@component/products/FlashSaleProductFilter";
import {
 ListingLoadMore,
 ListingSkeleton,
 ListingToolbar,
} from "@component/listing/Listing";

// import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png"
import Watermark from "@component/watermark/Watermark";

// const LoaderWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const productsPerPage = 10;

interface FlashSaleProps {
 sortOptions: { label: string; value: string }[];
 slug: string;
}

export default function FlashSale({ sortOptions, slug }: FlashSaleProps) {
 const router = useRouter();
 const width = useWindowSize();
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
 const [products, setProducts] = useState<any[]>([]);
 const [loading, setLoading] = useState(false);
 const [totalProducts, setTotalProducts] = useState(0);
 const [currentPage, setCurrentPage] = useState(1);
 const isTablet = width < 1025;

 const handleBrandChange = (brands: number[]) => {
  setSelectedBrand(brands);
  setCurrentPage(1);
 };

 const handleCategoryChange = (categories: number[]) => {
  setSelectedCategory(categories);
  setCurrentPage(1);
  // router.push(`/product/search/${categories}`);
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

  // Prepare the filter object
  const filters: any = {};
  if (selectedCategory) filters.category = selectedCategory;
  if (selectedBrand && selectedBrand.length) filters.brand = selectedBrand;
  if (selectedCountry && selectedCountry.length)
   filters.country = selectedCountry;
  if (selectedProvinces && selectedProvinces.length)
   filters.province = selectedProvinces;

  try {
   const response = await fetch(
    `${ApiBaseUrl.baseUrl}remark/product/flash_sale`,
    {
     method: "POST",
     headers: {
      "Content-Type": "application/json",
     },
     body: JSON.stringify({
      ...filters, // Include only valid filters
      page: currentPage,
      orderBy: selectedSortOption,
     }),
    }
   );

   if (!response.ok) {
    throw new Error("Network response was not ok");
   }

   const data = await response.json();
   // console.log("Shop Details:", data);

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
 ]);

 useEffect(() => {
  fetchProducts();
 }, [fetchProducts]);

 const handleLoadMore = () => {
  setCurrentPage((prevPage) => prevPage + 1);
 };
 const filterCard = (
  <FlashSaleProductFilter
   onBrandChange={handleBrandChange}
   onCategoryChange={handleCategoryChange}
   onCountryChange={handleCountryChange}
   onProvinceChange={handleProvinceChange}
   slug={slug}
   pageType="flashSale"
  />
 );

 return (
  <>
   {/* Background image */}
   <Watermark />

   <main
    style={{
     position: "relative",
     background: "none",
    }}
   >
    <ListingToolbar
     title="Flash sale"
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
      {currentPage === 1 && loading ? (
       <ListingSkeleton />
      ) : (
       <>
        {view === "grid" ? (
         <ProductGridView
          products={products}
          totalProducts={totalProducts}
          currentPage={currentPage}
          productsPerPage={productsPerPage}
          onPageChange={handleLoadMore}
         />
        ) : (
         <ProductListView
          products={products}
          totalProducts={totalProducts}
          currentPage={currentPage}
          productsPerPage={productsPerPage}
          onPageChange={handleLoadMore}
         />
        )}
        <ListingLoadMore
         onClick={() => {
          if (!loading) handleLoadMore();
         }}
         loading={loading}
         visible={currentPage * productsPerPage < totalProducts}
        />
       </>
      )}
     </Grid>
    </Grid>
   </main>
  </>
 );
}
