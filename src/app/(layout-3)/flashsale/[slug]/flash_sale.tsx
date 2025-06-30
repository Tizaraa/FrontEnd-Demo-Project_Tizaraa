"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
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
import ProductFilterCard from "@component/products/ProductFilterCard";
import useWindowSize from "@hook/useWindowSize";
import Typography, { H5, Paragraph } from "@component/Typography";
import ApiBaseUrl from "api/ApiBaseUrl";
import styled from "@emotion/styled";
import { Vortex } from "react-loader-spinner";
import FlashSaleProductFilter from "@component/products/FlashSaleProductFilter";
import BeatLoader from "react-spinners/BeatLoader";

// import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png"
import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png";
import Image from "next/image";
import NextImage from "@component/NextImage";
import Loader from "@component/loader";

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
          width: "100%",
          height: "auto",
          maxWidth: "1200px",
          backgroundSize: "contain",
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
                <FlashSaleProductFilter
                  onBrandChange={handleBrandChange}
                  onCategoryChange={handleCategoryChange}
                  onCountryChange={handleCountryChange}
                  onProvinceChange={handleProvinceChange}
                  slug={slug}
                  pageType="flashSale"
                />
              </Sidenav>
            )}
          </FlexBox>
        </FlexBox>

        <Grid container spacing={6}>
          {!isTablet && (
            <Grid item lg={3} xs={12}>
              <FlashSaleProductFilter
                onBrandChange={handleBrandChange}
                onCategoryChange={handleCategoryChange}
                onCountryChange={handleCountryChange}
                onProvinceChange={handleProvinceChange}
                slug={slug}
                pageType="flashSale"
              />
            </Grid>
          )}

          <Grid item lg={9} xs={12}>
            {currentPage === 1 && loading ? (
              <Typography>
                {/* <Loader /> */}
              </Typography>
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
              )} */}
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
