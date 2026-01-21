// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import axios from "axios";

// import Box from "@component/Box";
// import Card from "@component/Card";
// import FlexBox from "@component/FlexBox";
// import HoverBox from "@component/HoverBox";
// import { H4 } from "@component/Typography";
// import { Carousel } from "@component/carousel";
// import CategorySectionCreator from "@component/CategorySectionCreator";
// import { currency } from "@utils/utils";
// import useWindowSize from "@hook/useWindowSize";

// import styles from "../JustForYouPeoducts/JustForYouParoducts.module.css";

// import ApiBaseUrl from "../../../api/ApiBaseUrl";
// import Rating from "@component/rating";
// import { Chip } from "@component/Chip";
// import Image from "next/image";

// export default function NewArrivalsProduct() {
//   const [bigDiscountList, setBigDiscountList] = useState([]);
//   const width = useWindowSize();
//   const [visibleSlides, setVisibleSlides] = useState(5);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (width < 370) setVisibleSlides(1);
//     else if (width < 650) setVisibleSlides(2);
//     else if (width < 950) setVisibleSlides(3);
//     else setVisibleSlides(5);
//   }, [width]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(
//           `${ApiBaseUrl.baseUrl}frontend/remark/product/items`
//         );

//         if (response.data && response.data.newarrival) {
//           setBigDiscountList(response.data.newarrival);
//         } else {
//           console.error("Unexpected response format:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Handle the product click to show loading state
//   const handleProductClick = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false); // Optionally you can set a timeout if you want to stop loading after some delay
//     }, 1000); // Delay to show loading effect before redirecting
//   };

//   return (
//     <CategorySectionCreator
//       title="New Arrivals"
//       seeMoreLink={`newarrivals/new_arrivals`}
//     >
//       {/* Show loading overlay when loading */}
//       {isLoading && (
//         <div className={styles.loadingOverlay}>
//           <div className={styles.loader}></div>
//         </div>
//       )}

//       <Box my="-0.25rem">
//         <Carousel
//           totalSlides={bigDiscountList.length}
//           visibleSlides={visibleSlides}
//         >
//           {bigDiscountList.map((item) => (
//             <Box py="0.25rem" key={item.product_slug}>
//               <Card
//                 p="1rem"
//                 borderRadius={8}
//                 style={{ height: "auto", minHeight: "300px" }}
//               >
//                 {/* Discount Badge */}
//                 {!!item.discount_price &&
//                   item.discount_price < item.seeling_price && (
//                     <Chip
//                       top="1rem"
//                       left="1.2rem"
//                       p="0.25rem 0.5rem"
//                       fontSize="12px"
//                       fontWeight="600"
//                       bg="primary.main"
//                       position="absolute"
//                       color="primary.text"
//                       zIndex={1}
//                     >
//                       {Math.floor(
//                         ((item.seeling_price - item.discount_price) /
//                           item.seeling_price) *
//                           100
//                       )}
//                       % off
//                     </Chip>
//                   )}
//                 <Link href={`/product/${item.product_slug}`}>
//                   <Box
//                     position="relative"
//                     style={{
//                       padding: "0 0.5rem", // Added padding to prevent content touching the edges
//                     }}
//                     onClick={handleProductClick}
//                   >
//                     {/* image cache  */}
//                     <div
//                       style={{
//                         position: "relative",
//                         borderRadius: "8px",
//                         overflow: "hidden",
//                       }}
//                     >
//                       <Image
//                         src={`${ApiBaseUrl.ImgUrl}${item.product_thumbnail}`}
//                         alt={item.product_name}
//                         layout="responsive"
//                         width={1}
//                         height={1}
//                         objectFit="cover"
//                         style={{ borderRadius: "8px" }}
//                         className={styles.imgPart}
//                       />
//                     </div>
//                   </Box>

//                   <Box>
//                     <H4
//                       fontWeight="600"
//                       fontSize="18px"
//                       mb="0.25rem"
//                       style={{
//                         whiteSpace: "nowrap",
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                       }}
//                     >
//                       {item.product_name}
//                     </H4>

//                     {item.rating > 0 && (
//                       <Rating
//                         value={item.rating}
//                         outof={5}
//                         color="warn"
//                         readOnly
//                       />
//                     )}

//                     {item.discount_price == null && (
//                       <FlexBox>
//                         <H4
//                           fontWeight="600"
//                           fontSize="14px"
//                           color="primary.main"
//                         >
//                           {currency(item.seeling_price)}
//                         </H4>
//                       </FlexBox>
//                     )}

//                     {item.discount_price != null && (
//                       <FlexBox flexDirection="column" mt="0.25rem">
//                         <H4 fontWeight="600" fontSize="14px" color="text.muted">
//                           BDT <del>{item.seeling_price}</del>
//                         </H4>
//                         <Box>
//                           <H4
//                             fontWeight="600"
//                             fontSize="14px"
//                             color="primary.main"
//                           >
//                             {currency(item.discount_price)}
//                           </H4>
//                         </Box>
//                       </FlexBox>
//                     )}
//                   </Box>
//                 </Link>
//               </Card>
//             </Box>
//           ))}
//         </Carousel>
//       </Box>
//     </CategorySectionCreator>
//   );
// }

// Add Auto Slider
// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import axios from "axios";

// import Box from "@component/Box";
// import Card from "@component/Card";
// import FlexBox from "@component/FlexBox";
// import { H4 } from "@component/Typography";
// import { Carousel } from "@component/carousel";
// import CategorySectionCreator from "@component/CategorySectionCreator";
// import { currency } from "@utils/utils";
// import useWindowSize from "@hook/useWindowSize";

// import styles from "../JustForYouPeoducts/JustForYouParoducts.module.css";

// import ApiBaseUrl from "../../../api/ApiBaseUrl";
// import Rating from "@component/rating";
// import { Chip } from "@component/Chip";
// import Image from "next/image";

// export default function NewArrivalsProduct() {
//   const [bigDiscountList, setBigDiscountList] = useState([]);
//   const [currentSlide, setCurrentSlide] = useState(0); // For auto-slide
//   const width = useWindowSize();
//   const [visibleSlides, setVisibleSlides] = useState(5);
//   const [isLoading, setIsLoading] = useState(false);

//   // Set visible slides based on window width
//   useEffect(() => {
//     if (width < 370) setVisibleSlides(1);
//     else if (width < 650) setVisibleSlides(2);
//     else if (width < 950) setVisibleSlides(3);
//     else setVisibleSlides(5);
//   }, [width]);

//   // Fetch new arrival products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(
//           `${ApiBaseUrl.baseUrl}frontend/remark/product/items`
//         );

//         if (response.data && response.data.newarrival) {
//           setBigDiscountList(response.data.newarrival);
//         } else {
//           console.error("Unexpected response format:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Auto-slide effect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) =>
//         prev + 1 >= bigDiscountList.length ? 0 : prev + 1
//       );
//     }, 2000); // Slide every 3 seconds

//     return () => clearInterval(interval);
//   }, [bigDiscountList.length]);

//   // Handle product click loading effect
//   const handleProductClick = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);
//   };

//   return (
//     <CategorySectionCreator
//       title="New Arrivals"
//       seeMoreLink={`newarrivals/new_arrivals`}
//     >
//       {isLoading && (
//         <div className={styles.loadingOverlay}>
//           <div className={styles.loader}></div>
//         </div>
//       )}

//       <Box my="-0.25rem">
//         <Carousel
//           totalSlides={bigDiscountList.length}
//           visibleSlides={visibleSlides}
//           currentSlide={currentSlide} // Pass current slide for auto-slide
//         >
//           {bigDiscountList.map((item, index) => (
//             <Box py="0.25rem" key={item.product_slug}>
//               <Card
//                 p="1rem"
//                 borderRadius={8}
//                 style={{ height: "auto", minHeight: "300px" }}
//               >
//                 {/* Discount Badge */}
//                 {!!item.discount_price &&
//                   item.discount_price < item.seeling_price && (
//                     <Chip
//                       top="1rem"
//                       left="1.2rem"
//                       p="0.25rem 0.5rem"
//                       fontSize="12px"
//                       fontWeight="600"
//                       bg="primary.main"
//                       position="absolute"
//                       color="primary.text"
//                       zIndex={1}
//                     >
//                       {Math.floor(
//                         ((item.seeling_price - item.discount_price) /
//                           item.seeling_price) *
//                           100
//                       )}
//                       % off
//                     </Chip>
//                   )}

//                 <Link href={`/product/${item.product_slug}`}>
//                   <Box
//                     position="relative"
//                     style={{ padding: "0 0.5rem" }}
//                     onClick={handleProductClick}
//                   >
//                     <div
//                       style={{
//                         position: "relative",
//                         borderRadius: "8px",
//                         overflow: "hidden",
//                       }}
//                     >
//                       <Image
//                         src={`${ApiBaseUrl.ImgUrl}${item.product_thumbnail}`}
//                         alt={item.product_name}
//                         layout="responsive"
//                         width={1}
//                         height={1}
//                         objectFit="cover"
//                         style={{ borderRadius: "8px" }}
//                         className={styles.imgPart}
//                       />
//                     </div>
//                   </Box>

//                   <Box>
//                     <H4
//                       fontWeight="600"
//                       fontSize="18px"
//                       mb="0.25rem"
//                       style={{
//                         whiteSpace: "nowrap",
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                       }}
//                     >
//                       {item.product_name}
//                     </H4>

//                     {item.rating > 0 && (
//                       <Rating
//                         value={item.rating}
//                         outof={5}
//                         color="warn"
//                         readOnly
//                       />
//                     )}

//                     {item.discount_price == null && (
//                       <FlexBox>
//                         <H4
//                           fontWeight="600"
//                           fontSize="14px"
//                           color="primary.main"
//                         >
//                           {currency(item.seeling_price)}
//                         </H4>
//                       </FlexBox>
//                     )}

//                     {item.discount_price != null && (
//                       <FlexBox flexDirection="column" mt="0.25rem">
//                         <H4 fontWeight="600" fontSize="14px" color="text.muted">
//                           BDT <del>{item.seeling_price}</del>
//                         </H4>
//                         <Box>
//                           <H4
//                             fontWeight="600"
//                             fontSize="14px"
//                             color="primary.main"
//                           >
//                             {currency(item.discount_price)}
//                           </H4>
//                         </Box>
//                       </FlexBox>
//                     )}
//                   </Box>
//                 </Link>
//               </Card>
//             </Box>
//           ))}
//         </Carousel>
//       </Box>
//     </CategorySectionCreator>
//   );
// }

"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import axios from "@lib/axiosClient";

import Box from "@component/Box";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import { H4 } from "@component/Typography";
import { Carousel } from "@component/carousel";
import CategorySectionCreator from "@component/CategorySectionCreator";
import { currency } from "@utils/utils";
import useWindowSize from "@hook/useWindowSize";

import styles from "../JustForYouPeoducts/JustForYouParoducts.module.css";

import ApiBaseUrl from "../../../api/ApiBaseUrl";
import Rating from "@component/rating";
import { Chip } from "@component/Chip";
import Image from "next/image";

export default function NewArrivalsProduct() {
 const [bigDiscountList, setBigDiscountList] = useState([]);
 const [currentSlide, setCurrentSlide] = useState(0);
 const width = useWindowSize();
 const [visibleSlides, setVisibleSlides] = useState(5);
 const [isLoading, setIsLoading] = useState(false);
 const [isPaused, setIsPaused] = useState(false);

 const intervalRef = useRef<NodeJS.Timeout | null>(null);

 // Looping products for continuous effect
 const loopedProducts = [...bigDiscountList, ...bigDiscountList];

 // Responsive slides
 useEffect(() => {
  if (width < 370) setVisibleSlides(1);
  else if (width < 650) setVisibleSlides(2);
  else if (width < 950) setVisibleSlides(3);
  else setVisibleSlides(5);
 }, [width]);

 // Fetch new arrival products
 useEffect(() => {
  const fetchProducts = async () => {
   try {
    const response = await axios.get(`frontend/remark/product/items`);

    if (response.data && response.data.newarrival) {
     setBigDiscountList(response.data.newarrival);
    } else {
     console.error("Unexpected response format:", response.data);
    }
   } catch (error) {
    console.error("Error fetching products:", error);
   }
  };

  fetchProducts();
 }, []);

 // Auto-slide with pause/resume
 useEffect(() => {
  if (bigDiscountList.length === 0) return;

  if (!isPaused) {
   intervalRef.current = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % bigDiscountList.length);
   }, 2000);
  }

  return () => {
   if (intervalRef.current) clearInterval(intervalRef.current);
  };
 }, [bigDiscountList.length, isPaused]);

 const handleProductClick = () => {
  setIsLoading(true);
  setTimeout(() => {
   setIsLoading(false);
  }, 1000);
 };

 return (
  <CategorySectionCreator
   title="New Arrivals"
   seeMoreLink={`newarrivals/new_arrivals`}
  >
   {isLoading && (
    <div className={styles.loadingOverlay}>
     <div className={styles.loader}></div>
    </div>
   )}

   <Box
    my="-0.25rem"
    onMouseEnter={() => setIsPaused(true)}
    onMouseLeave={() => setIsPaused(false)}
   >
    <Carousel
     totalSlides={loopedProducts.length}
     visibleSlides={visibleSlides}
     currentSlide={currentSlide}
    >
     {loopedProducts.map((item, index) => (
      <Box py="0.25rem" key={`${item.product_slug}-${index}`}>
       <Card
        p="1rem"
        borderRadius={8}
        style={{ height: "auto", minHeight: "300px" }}
       >
        {/* Discount Badge */}
        {!!item.discount_price && item.discount_price < item.seeling_price && (
         <Chip
          top="1rem"
          left="1.2rem"
          p="0.25rem 0.5rem"
          fontSize="12px"
          fontWeight="600"
          bg="primary.main"
          position="absolute"
          color="primary.text"
          zIndex={1}
         >
          {Math.floor(
           ((item.seeling_price - item.discount_price) / item.seeling_price) *
            100
          )}
          % off
         </Chip>
        )}

        <Link href={`/product/${item.product_slug}`}>
         <Box
          position="relative"
          style={{ padding: "0 0.5rem" }}
          onClick={handleProductClick}
         >
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
         </Box>

         <Box>
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

          {item.discount_price == null && (
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
          )}
         </Box>
        </Link>
       </Card>
      </Box>
     ))}
    </Carousel>
   </Box>
  </CategorySectionCreator>
 );
}
