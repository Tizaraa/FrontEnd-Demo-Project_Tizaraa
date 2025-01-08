"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import axios from "axios";

import Box from "@component/Box";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import HoverBox from "@component/HoverBox";
import { H4, SemiSpan } from "@component/Typography";
import { Carousel } from "@component/carousel";
import CategorySectionCreator from "@component/CategorySectionCreator";
import { currency } from "@utils/utils";
import useWindowSize from "@hook/useWindowSize";

import Rating from "@component/rating";
import { Chip } from "@component/Chip";
import OTsectioncreator from "@component/OTsectioncreator";
import Icon from "@component/icon/Icon";

import styles from "../market-1/JustForYouPeoducts/JustForYouParoducts.module.css";
import Image from "next/image";

// Example: Replace this with your actual base URL or env variable
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://frontend.tizaraa.com/api";
const pageSize = 20; // Page size for product fetching

const OTCProducts = () => {
  const [menuItems, setMenuItems] = useState<
    { id: string; name: string; link: string }[]
  >([]);
  const [products, setProducts] = useState([]); // State for storing products
  const [loading, setLoading] = useState(true); // Initial loading state
  const [loadingMore, setLoadingMore] = useState(false); // State for loading more products
  const [error, setError] = useState<string | null>(null);
  const [framePosition, setFramePosition] = useState(0); // Frame position for product fetching
  const [hasMore, setHasMore] = useState(true); // State to track if more products are available

  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(5);

  useEffect(() => {
    if (width < 370) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(5);
  }, [width]);

  // Fetch categories
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/otpi/get-category`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // console.log("Category data:", data);

        const firstItem = data.CategoryInfoList.Content[35];
        const formattedItem = firstItem
          ? [
              {
                id: firstItem.Id,
                name: firstItem.Name,
                link: `/OtCategory/${firstItem.Id}`,
              },
            ]
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
  const fetchCategoryData = useCallback(
    async (position: number, categoryId: string) => {
      setLoading(position === 0);
      setLoadingMore(position > 0);
      try {
        // console.log(
        //   `Fetching products for position: ${position} and category: ${categoryId}`
        // );
        const response = await fetch(`${API_BASE_URL}/otpi/items`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            xmlParameters: `<SearchItemsParameters><CategoryId>${categoryId}</CategoryId></SearchItemsParameters>`,
            framePosition: position,
            frameSize: pageSize,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        // console.log("products:", data);
        const newProducts = data.Result.Items.Content;

        setProducts((prevProducts) => {
          const existingIds = new Set(
            prevProducts.map((product) => product.Id)
          );
          const filteredNewProducts = newProducts.filter(
            (product) => !existingIds.has(product.Id)
          );
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
    },
    []
  );

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
        <div className="loader"></div> {/* Simple loader */}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <OTsectioncreator 
        title={
          menuItems.length > 0 ? menuItems[0].name : "No Category Available"
        }
        
        seeMoreLink={
          menuItems.length > 0 ? (
            <ul>
              {menuItems.map((item) => (
                <div key={item.id}>
                  <a href={item.link}>
                    <FlexBox alignItems="center" ml="0.5rem" color="text.muted">
                      <SemiSpan mr="0.5rem">View all</SemiSpan>
                      <Icon size="12px" defaultcolor="currentColor">
                        right-arrow
                      </Icon>
                    </FlexBox>
                  </a>
                </div>
              ))}
            </ul>
          ) : (
            <ul>
              <li>No categories available</li>
            </ul>
          )
        }
      >
        <Box my="-0.25rem">
          <Carousel totalSlides={products.length} visibleSlides={visibleSlides}>
            {products.length > 0 ? (
              products.map((product) => (
                <Box py="0.25rem" key={product.Id}>
                  <Card p="1rem" borderRadius={8} style={{ height: "300px" }}>
                    <Link href={`/otproducts/${product.Id}`}>
                      <Box position="relative">
                        {/* <img
                          src={product.MainPictureUrl}
                          alt={product.Title}
                          style={{
                            width: "100%",
                            borderRadius: "8px",
                            objectFit: "cover",
                          }}
                          className={styles.imgPart}
                        /> */}
                         {/* image cache  */}
                        <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden" }}>
                            <Image
                              src={product.MainPictureUrl}
                              alt={product.Title}
                              layout="responsive" 
                              width={1} 
                              height={1} 
                              objectFit="cover" 
                              style={{ borderRadius: "8px" }}
                              className={styles.imgPart}
                              />
                                          
                        </div>
                      </Box>
                      <H4
                        fontWeight="600"
                        fontSize="18px"
                        mb="0.25rem"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {product.Title}
                      </H4>
                      <FlexBox flexDirection="column">
                        {product.Price.DiscountPrice > 0 ? (
                          <>
                            <H4
                              fontWeight="600"
                              fontSize="14px"
                              color="text.muted"
                            >
                              BDT <del>{product.Price.OriginalPrice}</del>
                            </H4>
                            <Box marginTop="4px">
                              <H4
                                fontWeight="600"
                                fontSize="14px"
                                color="primary.main"
                              >
                                {currency(product.Price.DiscountPrice)}
                              </H4>
                            </Box>
                          </>
                        ) : (
                          <H4
                            fontWeight="600"
                            fontSize="14px"
                            color="primary.main"
                          >
                            {currency(product.Price.ConvertedPriceWithoutSign)}
                          </H4>
                        )}
                      </FlexBox>
                    </Link>
                  </Card>
                </Box>
              ))
            ) : (
              <div>No products available</div>
            )}
          </Carousel>
        </Box>
      </OTsectioncreator>

      {/* <h2>Category: {menuItems.length > 0 ? menuItems[0].name : 'No Category Available'}</h2>

  
      <ul>
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <li key={item.id}>
              <a href={item.link}>Load More</a>
            </li>
          ))
        ) : (
          <li>No categories available</li>
        )}
      </ul> */}

      {/* products show  */}
      {/* <h3>Products</h3> */}
      {/* <div>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.Id}>
              <h4>{product.Title}</h4>
              <p>Price: {product.Price.ConvertedPriceWithoutSign} {product.Price.CurrencySign}</p>
              <img src={product.MainPictureUrl} alt={product.Title} style={{ width: '150px' }} />
            </div>
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>

    </div> */}
    </div>

    // {hasMore && (
    //   <button onClick={loadMoreProducts} disabled={loadingMore}>
    //     {loadingMore ? 'Loading more...' : 'Load More Products'}
    //   </button>
    // )}
  );
};

export default OTCProducts;
