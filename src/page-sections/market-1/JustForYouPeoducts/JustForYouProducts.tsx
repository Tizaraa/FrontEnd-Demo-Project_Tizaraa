"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

import Box from "@component/Box";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import { H4 } from "@component/Typography";
import CategorySectionCreator from "@component/CategorySectionCreator";
import { currency } from "@utils/utils";
import Rating from "@component/rating";
import styles from "./JustForYouParoducts.module.css";
import { Vortex } from "react-loader-spinner";
import styled from "@emotion/styled";
import { Chip } from "@component/Chip";
import BeatLoader from "react-spinners/BeatLoader";
import ApiBaseUrl from "api/ApiBaseUrl";
import Image from "next/image";

const LoaderWrapper = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
`;

const JustForYouProducts = () => {
 const [products, setProducts] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const [lastPage, setLastPage] = useState(1);
 const [loading, setLoading] = useState(false);
 const [loadingMore, setLoadingMore] = useState(false);
 const [isLoading, setIsLoading] = useState(false);

 const fetchProducts = async (page = 1) => {
  if (loadingMore || loading) return;

  setLoading(page === 1);
  setLoadingMore(page > 1);
  try {
   const response = await axios.get(
    `https://seller.tizaraa.shop/api/frontend/latest/justoforyou/product/view/'?page=${page}`,
    {
     adapter: "fetch",
     fetchOptions: { cache: "force-cache" },
    }
   );
   const data = response.data;

   if (page === 1) {
    setProducts(data.data);
   } else {
    setProducts((prevProducts) => [...prevProducts, ...data.data]);
   }

   setCurrentPage(data.current_page);
   setLastPage(data.last_page);
  } catch (error) {
   console.error("Error fetching products:", error);
  } finally {
   setLoading(false);
   setLoadingMore(false);
  }
 };

 useEffect(() => {
  fetchProducts();
 }, []);

 const handleLoadMore = () => {
  fetchProducts(currentPage + 1);
 };

 // Handle the product click to show loading state
 const handleProductClick = () => {
  setIsLoading(true);
  setTimeout(() => {
   setIsLoading(false); // Optionally you can set a timeout if you want to stop loading after some delay
  }, 1000); // Delay to show loading effect before redirecting
 };

 return (
  <CategorySectionCreator title="Just For You">
   {/* Show loading overlay when loading */}
   {isLoading && (
    <div className={styles.loadingOverlay}>
     <div className={styles.loader}></div>
    </div>
   )}

   <Box my="-0.25rem">
    <FlexBox
     flexWrap="wrap"
     justifyContent="space-between"
     className={styles.flexContainer} // Use a custom class for better control
    >
     {products.length > 0 ? (
      products.map((item) => (
       <Box
        py="0.25rem"
        key={item.product_slug}
        className={styles.productCard} // Use a custom class for responsive sizing
       >
        <Card
         p="1rem"
         borderRadius={8}
         style={{ height: "auto", minHeight: "300px" }}
        >
         <Link href={`/product/${item.product_slug}`}>
          <Box
           position="relative"
           style={{
            padding: "0 0.5rem", // Added padding to prevent content touching the edges
           }}
           onClick={handleProductClick}
          >
           {/* image cache  */}
           <div
            style={{
             position: "relative",
             borderRadius: "8px",
             overflow: "hidden",
            }}
           >
            <Image
             src={`${ApiBaseUrl.ImgUrl}${item.product_thumbnail}`}
             alt={item.product_name}
             layout="responsive"
             width={1}
             height={1}
             objectFit="cover"
             style={{ borderRadius: "8px" }}
             className={styles.imgPart}
            />
           </div>
           {/* Discount Badge */}
           {!!item.discount_price &&
            item.discount_price < item.seeling_price && (
             <Chip
              top="-0.5rem"
              left="-10px"
              p="0.25rem 0.5rem"
              fontSize="12px"
              fontWeight="600"
              bg="primary.main"
              position="absolute"
              color="primary.text"
              zIndex={1}
             >
              {Math.floor(
               ((item.seeling_price - item.discount_price) /
                item.seeling_price) *
                100
              )}
              % off
             </Chip>
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

          {item.rating > 0 && (
           <Rating value={item.rating} outof={5} color="warn" readOnly />
          )}

          {/* {item.discount_price == null && (
                      <FlexBox>
                        <H4
                          fontWeight="600"
                          fontSize="14px"
                          color="primary.main"
                        >
                          {currency(item.seeling_price)}
                        </H4>
                      </FlexBox>
                    )}

                    {item.discount_price != null && (
                      <FlexBox flexDirection="column">
                        <H4 fontWeight="600" fontSize="14px" color="text.muted">
                          BDT <del>{item.seeling_price}</del>
                        </H4>
                        <Box marginTop="4px">
                          {" "}
                        
                          <H4
                            fontWeight="600"
                            fontSize="14px"
                            color="primary.main"
                          >
                            {currency(item.discount_price)}
                          </H4>
                        </Box>
                      </FlexBox>
                    )} */}

          {/* {item.discount_price == null && (
        <FlexBox>
          <H4 fontWeight="600" fontSize="14px" color="primary.main">
            {currency(item.seeling_price)}
          </H4>
        </FlexBox>
      )}

      {item.discount_price != null && (
        <FlexBox flexDirection="column" mt="0.25rem">
          <H4 fontWeight="600" fontSize="14px" color="text.muted">
            BDT <del>{item.seeling_price}</del>
          </H4>
          <Box>
            <H4 fontWeight="600" fontSize="14px" color="primary.main">
              {currency(item.discount_price)}
            </H4>
          </Box>
        </FlexBox>
      )} */}

          {item.seeling_price == 0 ? (
           <FlexBox>
            <H4 fontWeight="600" fontSize="14px" color="primary.main">
             RFQ
            </H4>
           </FlexBox>
          ) : item.discount_price == null ? (
           <FlexBox>
            <H4 fontWeight="600" fontSize="14px" color="primary.main">
             {currency(item.seeling_price)}
            </H4>
           </FlexBox>
          ) : (
           <FlexBox flexDirection="column" mt="0.25rem">
            <H4 fontWeight="600" fontSize="14px" color="text.muted">
             BDT <del>{item.seeling_price}</del>
            </H4>
            <Box>
             <H4 fontWeight="600" fontSize="14px" color="primary.main">
              {currency(item.discount_price)}
             </H4>
            </Box>
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
   </Box>

   {currentPage < lastPage && (
    <div className={styles.buttonStyle}>
     <button
      className={styles.loadMore}
      onClick={handleLoadMore}
      disabled={loadingMore}
     >
      {loadingMore ? <BeatLoader size={18} color="#fff" /> : "Load More"}
     </button>
    </div>
   )}

   {loading && (
    <LoaderWrapper>
     <Vortex />
    </LoaderWrapper>
   )}
  </CategorySectionCreator>
 );
};

export default JustForYouProducts;
