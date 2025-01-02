
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
import OTCProducts from "@sections/market-1/OTCProducts";
import OTCcategoryProductView from "./OTCcategoryProductView";
import BeatLoader from "react-spinners/BeatLoader";


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
  const [selectedBrand, setSelectedBrand] = useState<number[] | null>(null); // Change the type to number[]
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<number[] | null>(null); // Track selected country
  const [selectedProvinces, setSelectedProvinces] = useState<number[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const isTablet = width < 1025;

  const handleBrandChange = (brands: number[]) => {
    setSelectedBrand(brands);
    setCurrentPage(1); // Reset to first page
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page
    router.push(`/product/search/${category}`);
  };

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
      const response = await fetch(`${ApiBaseUrl.baseUrl}category/${slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: selectedCategory || "all",
          brand: selectedBrand || null,
          country: selectedCountry || null,
          province: selectedProvinces || null, // Include selected provinces
          page: currentPage,
          orderBy: selectedSortOption,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      console.log("category data", data)
      // Reset products if on the first page
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
    selectedProvinces, // Add dependency for selectedProvinces
    currentPage,
    selectedSortOption,
  ]);
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // useEffect(() => {
  //   fetchProducts();
  // }, [fetchProducts]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
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
                onCountryChange={handleCountryChange} 
                onProvinceChange={handleProvinceChange}
                slug={slug}
                pageType="default"
              />
            </Sidenav>
          )}
        </FlexBox>
      </FlexBox>

      {/* <OTCProducts></OTCProducts> */}
      <OTCcategoryProductView slug={slug}></OTCcategoryProductView>

      <Grid container spacing={6}>
        <Grid item lg={3} xs={12}>
          <ProductFilterCard
            onBrandChange={handleBrandChange}
            onCategoryChange={handleCategoryChange}
            onCountryChange={handleCountryChange} // Pass country handler
            onProvinceChange={handleProvinceChange}
            slug={slug}
            pageType="default"
          />
        </Grid>

        <Grid item lg={9} xs={12}>
          {currentPage === 1 && loading ? ( // Show loading only on initial load
            <LoaderWrapper>
              <Vortex />
            </LoaderWrapper>
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
                <LoaderWrapper>
                <Vortex />
              </LoaderWrapper>        
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
            <ProductListView
              products={products}
              totalProducts={totalProducts}
                currentPage={currentPage}
                productsPerPage={productsPerPage}
                onPageChange={handleLoadMore}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}
