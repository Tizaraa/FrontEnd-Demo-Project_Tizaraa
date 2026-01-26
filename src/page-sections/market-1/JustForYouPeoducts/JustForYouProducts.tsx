"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Box from "@component/Box";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import { H4 } from "@component/Typography";
import CategorySectionCreator from "@component/CategorySectionCreator";
import { currency } from "@utils/utils";
import Rating from "@component/rating";
import styles from "./JustForYouParoducts.module.css";
import { Chip } from "@component/Chip";
import BeatLoader from "react-spinners/BeatLoader";
import ApiBaseUrl from "api/ApiBaseUrl";
import Image from "next/image";
import useFetcher from "@hook/useFetcher";

const JustForYouProducts = () => {
 const [currentPage, setCurrentPage] = useState(1);
 const [products, setProducts] = useState([]);
 const { data, isLoading } = useFetcher(
  `frontend/latest/justoforyou/product/view?page=${currentPage}`
 );

 useEffect(() => {
  if (data?.data) {
   if (currentPage > 1) {
    setProducts((prevProducts) => [...prevProducts, ...data?.data]);
   } else {
    setProducts(data?.data || []);
   }
  }
 }, [data]);

 const handleLoadMore = () => {
  setCurrentPage(currentPage + 1);
 };

 return (
  <CategorySectionCreator title="Just For You">
   <Box my="-0.25rem">
    <FlexBox
     flexWrap="wrap"
     justifyContent="space-between"
     className={styles.flexContainer} // Use a custom class for better control
    >
     {products.length > 0 ? (
      products.map((item, i) => (
       <Box
        py="0.25rem"
        key={i}
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

   <div className={styles.buttonStyle}>
    <button
     className={styles.loadMore}
     onClick={handleLoadMore}
     disabled={isLoading}
    >
     {isLoading ? <BeatLoader size={18} color="#fff" /> : "Load More"}
    </button>
   </div>
  </CategorySectionCreator>
 );
};

export default JustForYouProducts;
