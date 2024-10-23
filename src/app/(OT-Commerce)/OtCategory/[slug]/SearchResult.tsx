

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

import ProductGridView from "@component/products/ProductCard1List";
import ProductListView from "@component/products/ProductCard9List";
import ProductFilterCard from "@component/products/ProductFilterCard";
import useWindowSize from "@hook/useWindowSize";
import { Vortex } from "react-loader-spinner";
import styled from "@emotion/styled";
import ApiBaseUrl from "api/ApiBaseUrl";
import Link from "next/link";
import OTProductsFilterCard from "@component/products/OTProductsFilterCard";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://tizaraa.com/api';
const pageSize = 20; // Page size for product fetching

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const productsPerPage = 10;

export default function SearchResult({ sortOptions, slug }) {
  const router = useRouter();

  const [menuItems, setMenuItems] = useState<{ id: string; name: string; link: string }[]>([]);
  const [products, setProducts] = useState([]); // State for storing products
  const [loading, setLoading] = useState(true); // Initial loading state
  const [loadingMore, setLoadingMore] = useState(false); // State for loading more products
  const [error, setError] = useState<string | null>(null);
  const [framePosition, setFramePosition] = useState(0); // Frame position for product fetching
  const [hasMore, setHasMore] = useState(true); // State to track if more products are available
  
  const width = useWindowSize();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedSortOption, setSelectedSortOption] = useState(
    sortOptions[0].value
  );
  const [selectedBrand, setSelectedBrand] = useState<number[] | null>(null); // Change the type to number[]
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<number[] | null>(null); // Track selected country

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

  const handleSortChange = (sortOption: any) => {
    setSelectedSortOption(sortOption.value);
  };
// Fetch categories
useEffect(() => {
  const fetchMenuItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/otpi/get-category`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Category data:", data);

      const firstItem = data.CategoryInfoList.Content[21];
      const formattedItem = firstItem
        ? [{
            id: firstItem.Id,
            name: firstItem.Name,
            link: `/OtCategory/${firstItem.Id}`,
          }]
        : [];

      setMenuItems(formattedItem);
      if (formattedItem.length > 0) {
        // Start fetching products for the first category
        fetchCategoryData(0, formattedItem[0].id);
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
      setError("Failed to load menu items");
    } finally {
      setLoading(false);
    }
  };

  fetchMenuItems();
}, []);
  
  // Fetch products by category
  const fetchCategoryData = useCallback(async (position: number, categoryId: string) => {
    setLoading(position === 0);
    setLoadingMore(position > 0);
    try {
      console.log(`Fetching products for position: ${position} and category: ${categoryId}`);
      const response = await fetch(`${API_BASE_URL}/otpi/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          xmlParameters: `<SearchItemsParameters><CategoryId>${categoryId}</CategoryId></SearchItemsParameters>`,
          framePosition: position,
          frameSize: pageSize,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      
      console.log("products:", data)
      const newProducts = data.Result.Items.Content;

      // Update total products count here
      setTotalProducts(data.Result.Items.TotalCount); 

      setProducts((prevProducts) => {
        const existingIds = new Set(prevProducts.map((product) => product.Id));
        const filteredNewProducts = newProducts.filter((product) => !existingIds.has(product.Id));
        return [...prevProducts, ...filteredNewProducts];
      });

      if (newProducts.length < pageSize) {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // Load more products
  const loadMoreProducts = () => {
    if (hasMore) {
      setFramePosition((prevPosition) => prevPosition + pageSize);
      if (menuItems.length > 0) {
        fetchCategoryData(framePosition + pageSize, menuItems[0].id);
      }
    }
  };

  if (loading && framePosition === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
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
  {/* <H5>Searching for {slug}</H5> */}
  <H5>Searching for {menuItems.length > 0 ? menuItems[0].name : 'No Category Available'}</H5>

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
      <OTProductsFilterCard
        onBrandChange={handleBrandChange}
        onCategoryChange={handleCategoryChange}
        onCountryChange={handleCountryChange} // Pass country handler
        slug={slug}
        pageType="default"
      />
    </Sidenav>
  )}
</FlexBox>
</FlexBox>

<Grid container spacing={6}>
<Grid item lg={3} xs={12}>
  <OTProductsFilterCard
    onBrandChange={handleBrandChange}
    onCategoryChange={handleCategoryChange}
    onCountryChange={handleCountryChange} // Pass country handler
    slug={slug}
    pageType="default"
  />
</Grid>

<Grid item lg={9} xs={12}>
  {currentPage === 1 && loading ? (
    // Show loading only on initial load
    <LoaderWrapper>
      <Vortex />
    </LoaderWrapper>
  ) : view === "grid" ? (
    <>
      {/* Use Grid container to display products */}
      <Grid container spacing={6}>
        {products.map((product) => (
           
          <Grid item lg={4} md={6} sm={6} xs={12} key={product.Id}>
            <Link href={`/otproducts/${product.Id}`}>
            <Card style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
  <Box p="1rem" style={{ flex: '1' }}>
    <img
      src={product.MainPictureUrl} // Display product image
      alt={product.Title}
      style={{
        width: "100%",
        height: "150px", // Fixed height for the image
        objectFit: "cover", // Cover the area without distortion
      }}
    />
    <H5 style={{ margin: '0.5rem 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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

      {/* Loading more products text */}
      {loadingMore && currentPage > 1 && (
        <Paragraph>Loading more products...</Paragraph>
      )}

      {/* Load More button */}
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



