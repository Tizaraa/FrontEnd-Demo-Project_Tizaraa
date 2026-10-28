"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Grid from "@component/grid/Grid";

import ProductGridView from "@component/products/ProductCard1List";
import ProductListView from "@component/products/ProductCard9List";
import ProductFilterCard from "@component/products/ProductFilterCard";
import useWindowSize from "@hook/useWindowSize";
import ApiBaseUrl from "api/ApiBaseUrl";
import {
 ListingSkeleton,
 ListingToolbar,
 slugToTitle,
} from "@component/listing/Listing";

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
 const [priceMin, setPriceMin] = useState<number | null>(null);
 const [priceMax, setPriceMax] = useState<number | null>(null);

 let pageType = "shop";

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
   const response = await fetch(
    `${ApiBaseUrl.baseUrl}seller/products/${slug}`,
    {
     method: "POST",
     headers: {
      "Content-Type": "application/json",
     },
     body: JSON.stringify({
      category: selectedCategory || "all",
      brand: selectedBrand || null,
      country: selectedCountry || null, // Add country filter here
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


 const filterCard = (
  <ProductFilterCard
   onBrandChange={handleBrandChange}
   onCategoryChange={handleCategoryChange}
   onCountryChange={handleCountryChange} // Pass country handler
   onProvinceChange={handleProvinceChange}
   onPriceChange={handlePriceChange}
   slug={slug}
   pageType={pageType}
  />
 );

 return (
  <>
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
     ) : view === "grid" ? (
      <>
       <ProductGridView
        products={products}
        totalProducts={totalProducts}
        currentPage={currentPage}
        productsPerPage={productsPerPage}
        onPageChange={handleLoadMore}
       />
       {/* Loading indicator for more products */}
       {loading && currentPage > 1 && (
        <div style={{ marginTop: 16 }}>
         <ListingSkeleton count={4} />
        </div>
       )}
      </>
     ) : (
      <ProductListView
       products={products}
       totalProducts={0}
       currentPage={0}
       productsPerPage={0}
       onPageChange={() => {}}
      />
     )}
    </Grid>
   </Grid>
  </>
 );
}
