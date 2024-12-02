"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Box from "@component/Box";
import Card from "@component/Card";
import Select from "@component/Select";
import Icon from "@component/icon/Icon";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import { IconButton } from "@component/buttons";
import Sidenav from "@component/sidenav/Sidenav";
import { H5, Paragraph } from "@component/Typography";
import ProductListView from "@component/products/ProductCard9List";
import OTProductsFilterCard from "@component/products/OTProductsFilterCard";
import useWindowSize from "@hook/useWindowSize";
import { Vortex } from "react-loader-spinner";
import styled from "@emotion/styled";
import ApiBaseUrl from "api/ApiBaseUrl";
import Link from "next/link";
import { SearchInputWithCategory } from "@component/search-box";
import OTProductsSearchInputWithCategory from "@component/search-box/OTProductsSearchInputWithCategory";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://frontend.tizaraa.com/api";
const pageSize = 20;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function OTSearchResult({ sortOptions, slug }) {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [framePosition, setFramePosition] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState("grid");
  const [selectedSortOption, setSelectedSortOption] = useState(
    sortOptions[0]?.value || ""
  );
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const width = useWindowSize();
  const isTablet = width < 1025;
  const isDesktop = width >= 1024;
  const isTabletOrMobile = width < 1024;

  const fetchCategoryData = useCallback(async () => {
    setLoading(framePosition === 0);
    setLoadingMore(framePosition > 0);

    try {
      const response = await fetch(`${API_BASE_URL}/otpi/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          xmlParameters: `<SearchItemsParameters><CategoryId>${slug}</CategoryId></SearchItemsParameters>`,
          framePosition,
          frameSize: pageSize,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      const newProducts = data.Result.Items.Content;
      console.log(data);

      setTotalProducts(data.Result.Items.TotalCount);
      setProducts((prevProducts) => {
        const existingIds = new Set(prevProducts.map((product) => product.Id));
        return [
          ...prevProducts,
          ...newProducts.filter((product) => !existingIds.has(product.Id)),
        ];
      });

      setHasMore(newProducts.length >= pageSize);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [framePosition, slug]);

  useEffect(() => {
    fetchCategoryData();
  }, [fetchCategoryData]);

  const loadMoreProducts = () => {
    if (hasMore) {
      setFramePosition((prevPosition) => prevPosition + pageSize);
    }
  };

  if (loading && framePosition === 0) {
    return (
      <LoaderWrapper>
        <Vortex />
      </LoaderWrapper>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
          <H5>Searching for {slug}</H5>
          <Paragraph color="text.muted">
            {totalProducts} results found
          </Paragraph>
        </div>

          {/* otc product search desktop view */}
          {isDesktop && <OTProductsSearchInputWithCategory slug={slug} />}

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
              onChange={(option) => setSelectedSortOption(option)}
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
          {/* <IconButton onClick={() => setView("list")}>
            <Icon
              variant="small"
              color={view === "list" ? "primary" : "inherit"}
            >
              menu
            </Icon>
          </IconButton> */}
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
              <OTProductsFilterCard
                onBrandChange={setSelectedBrand}
                onCategoryChange={setSelectedCategory}
                onCountryChange={setSelectedCountry}
                slug={slug}
                pageType="default"
              />
            </Sidenav>
          )}
        </FlexBox>
      </FlexBox>

       {/* otc product search mobile and tablet */}
       {isTabletOrMobile && (
        <Box mb="1rem">
          <OTProductsSearchInputWithCategory slug={slug} />
        </Box>
      )}
      <Grid container spacing={6}>
        <Grid item lg={3} xs={12}>
          <OTProductsFilterCard
            onBrandChange={setSelectedBrand}
            onCategoryChange={setSelectedCategory}
            onCountryChange={setSelectedCountry}
            slug={slug}
            pageType="default"
          />
        </Grid>

        <Grid item lg={9} xs={12}>
          {view === "grid" ? (
            <>
              <Grid container spacing={6}>
                {products.map((product) => (
                  <Grid item lg={4} md={6} sm={6} xs={12} key={product.Id}>
                    <Link href={`/otproducts/${product.Id}`}>
                      <Card
                        style={{
                          height: "300px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box p="1rem" style={{ flex: "1" }}>
                          <img
                            src={product.MainPictureUrl}
                            alt={product.Title}
                            style={{
                              width: "100%",
                              height: "150px",
                              objectFit: "cover",
                            }}
                          />
                          <H5
                            style={{
                              margin: "0.5rem 0",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {product.Title}
                          </H5>
                          <Paragraph style={{ margin: 0 }}>
                            {product.Price.ConvertedPrice}
                          </Paragraph>
                        </Box>
                      </Card>
                    </Link>
                  </Grid>
                ))}
              </Grid>

              {loadingMore && (
                <LoaderWrapper>
                  <Vortex />
                </LoaderWrapper>
              )}

              {hasMore && !loadingMore && (
                <Box textAlign="center" mt="1.5rem">
                  <IconButton
                    variant="contained"
                    color="primary"
                    onClick={loadMoreProducts}
                    style={{ borderRadius: 0 }}
                  >
                    Load More
                  </IconButton>
                </Box>
              )}
            </>
          ) : (
            <ProductListView
              products={products}
              totalProducts={totalProducts}
              currentPage={currentPage}
              productsPerPage={pageSize}
              onPageChange={() => {}}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}
