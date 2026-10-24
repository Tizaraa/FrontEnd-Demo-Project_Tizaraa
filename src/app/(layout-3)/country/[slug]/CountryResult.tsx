"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Grid from "@component/grid/Grid";
import axios from "@lib/axiosClient";

import ProductGridView from "@component/products/ProductCard1List";
import ProductListView from "@component/products/ProductCard9List";
import useWindowSize from "@hook/useWindowSize";
import CountryProductFilterCard from "@component/products/CountryProductFilterCard";
import {
 ListingLoadMore,
 ListingSkeleton,
 ListingToolbar,
 slugToTitle,
} from "@component/listing/Listing";

// import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png"
import Watermark from "@component/watermark/Watermark";

// const LoaderWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const productsPerPage = 10;

export default function CountryResult({ sortOptions, slug }) {
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
 const [loading, setLoading] = useState(true);
 const [totalProducts, setTotalProducts] = useState(0);
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
    `country/product/view/${slug}`,
    {
     ...filters,
     page: currentPage,
     orderBy: selectedSortOption,
    }
   );

   if (!response.data) {
    throw new Error("Network response was not ok");
   }

   const data = response.data;
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

 useEffect(() => {
  fetchProducts();
 }, [fetchProducts]);

 const handleLoadMore = () => {
  setCurrentPage((prevPage) => prevPage + 1);
 };


 const filterCard = (
  <CountryProductFilterCard
   onBrandChange={handleBrandChange}
   onCategoryChange={handleCategoryChange}
   onCountryChange={handleCountryChange}
   onProvinceChange={handleProvinceChange}
   slug={slug}
   pageType="country"
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
     title={slugToTitle(slug)}
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
      {currentPage === 1 && loading ? ( // Show loading only on initial load
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
          totalProducts={0}
          currentPage={0}
          productsPerPage={0}
          onPageChange={() => {}}
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
