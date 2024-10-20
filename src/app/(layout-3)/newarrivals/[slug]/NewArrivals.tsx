"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Box from "@component/Box";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import Select from "@component/Select";
import Icon from "@component/icon/Icon";
import { IconButton } from "@component/buttons";
import Sidenav from "@component/sidenav/Sidenav";
import ProductGridView from "@component/products/ProductCard1List";
import ProductListView from "@component/products/ProductCard9List";
import ProductFilterCard from "@component/products/ProductFilterCard";
import useWindowSize from "@hook/useWindowSize";
import { H5, Paragraph } from "@component/Typography";
import ApiBaseUrl from "api/ApiBaseUrl";
import styled from "@emotion/styled";
import { Vortex } from "react-loader-spinner";

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const productsPerPage = 10;

interface NewArrivalsProps {
  sortOptions: { label: string; value: string }[];
  slug: string;
}

export default function NewArrivals({ sortOptions, slug }: NewArrivalsProps) {
  const router = useRouter();
  const width = useWindowSize();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedSortOption, setSelectedSortOption] = useState(sortOptions[0].value);
  const [selectedBrand, setSelectedBrand] = useState<number[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<number[] | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const isTablet = width < 1025;

  const handleBrandChange = (brands: number[]) => {
    setSelectedBrand(brands);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    router.push(`/product/search/${category}`);
  };

  const handleCountryChange = (countries: number[]) => {
    setSelectedCountry(countries);
    setCurrentPage(1);
  };

  const handleSortChange = (sortOption: any) => {
    setSelectedSortOption(sortOption.value);
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${ApiBaseUrl.baseUrl}remark/product/new_arrivals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: selectedCategory || "all",
          brand: selectedBrand || null,
          country: selectedCountry || null,
          page: currentPage,
          orderBy: selectedSortOption,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
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
  }, [selectedBrand, selectedCategory, selectedCountry, currentPage, selectedSortOption]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
          <H5>Searching for {decodeURIComponent(slug)}</H5>
          <Paragraph color="text.muted">{totalProducts} results found</Paragraph>
        </div>

        <FlexBox alignItems="center" flexWrap="wrap">
          <Paragraph color="text.muted" mr="1rem">Sort by:</Paragraph>
          <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
            <Select
              placeholder="Sort by"
              options={sortOptions}
              defaultValue={sortOptions.find(
                (option) => option.value === selectedSortOption
              )}
              onChange={handleSortChange}
            />
          </Box>

          <Paragraph color="text.muted" mr="0.5rem">View:</Paragraph>
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
              scroll={true}
              handle={<IconButton><Icon>options</Icon></IconButton>}
            >
              <ProductFilterCard
                onBrandChange={handleBrandChange}
                onCategoryChange={handleCategoryChange}
                onCountryChange={handleCountryChange}
                slug={slug}
                pageType="default"
              />
            </Sidenav>
          )}
        </FlexBox>
      </FlexBox>

      <Grid container spacing={6}>
        <Grid item lg={3} xs={12}>
          <ProductFilterCard
            onBrandChange={handleBrandChange}
            onCategoryChange={handleCategoryChange}
            onCountryChange={handleCountryChange}
            slug={slug}
            pageType="default"
          />
        </Grid>

        <Grid item lg={9} xs={12}>
          {currentPage === 1 && loading ? (
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
              {loading && currentPage > 1 && (
                <Paragraph>Loading more products...</Paragraph>
              )}
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
