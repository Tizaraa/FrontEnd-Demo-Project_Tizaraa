"use client";

import { useState } from "react";
import Link from "next/link";
import Box from "@component/Box";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import { H4 } from "@component/Typography";
import Rating from "@component/rating";
import styles from "../../page-sections/market-1/CategoryRelatedProducts.module.css";
import { currency } from "@utils/utils";

const CategoryRelatedProducts = ({ products }) => {
  const [visibleProducts, setVisibleProducts] = useState(20); // Initially show 20 products

  // Handle loading more products
  const loadMoreProducts = () => {
    setVisibleProducts((prevCount) => prevCount + 20); // Load 20 more products
  };

  return (
    <Box my="-0.25rem">
      <FlexBox
        flexWrap="wrap"
        justifyContent="space-between"
        className={styles.flexContainer}
      >
        {products.length > 0 ? (
          products.slice(0, visibleProducts).map((item) => (
            <Box
              py="0.25rem"
              key={item.product_slug}
              className={styles.productCard}
              style={{ flex: "0 1 23%", marginBottom: "1rem" }} // Ensures consistent box size
            >
              <Card p="1rem" borderRadius={8} style={{ height: "100%" }}>
                <Link href={`/product/${item.product_slug}`}>
                  <Box position="relative">
                    <img
                      src={item.product_thumbnail}
                      alt={item.product_name}
                      style={{
                        width: "100%",
                        height: "200px", // Consistent image height
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                    {item.discount_price && item.discount_price < item.seeling_price && (
                      <Box
                        position="absolute"
                        top="1rem"
                        left="1rem"
                        bg="red"
                        color="white"
                        px="0.5rem"
                        py="0.25rem"
                        borderRadius="50%"
                        fontWeight="600"
                        fontSize="12px"
                        textAlign="center"
                      >
                        {Math.floor(
                          ((item.seeling_price - item.discount_price) /
                            item.seeling_price) *
                          100
                        )}
                        %
                      </Box>
                    )}
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
                    {item.product_name}
                  </H4>
                  {item.rating > 0 && <Rating value={item.rating} outof={5} readOnly />}
                  {item.discount_price == null ? (
                    <H4 fontWeight="600" fontSize="14px" color="primary.main">
                      {currency(item.seeling_price)}
                    </H4>
                  ) : (
                    <FlexBox flexDirection="column">
                      <H4 fontWeight="600" fontSize="14px" color="text.muted">
                        BDT <del>{currency(item.seeling_price)}</del>
                      </H4>
                      <H4 fontWeight="600" fontSize="14px" color="primary.main">
                        {currency(item.discount_price)}
                      </H4>
                    </FlexBox>
                  )}
                </Link>
              </Card>
            </Box>
          ))
        ) : (
          <p>No products available</p>
        )}
      </FlexBox>

      {visibleProducts < products.length && (
        <FlexBox justifyContent="center" mt="2rem">
          <button onClick={loadMoreProducts} className={styles.loadMore}>
            Load More
          </button>
        </FlexBox>
      )}
    </Box>
  );
};

export default CategoryRelatedProducts;
