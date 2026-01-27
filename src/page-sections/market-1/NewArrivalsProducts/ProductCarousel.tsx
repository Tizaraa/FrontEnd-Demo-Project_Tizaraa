"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Box from "@component/Box";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import { H4, Small } from "@component/Typography";
import { Carousel } from "@component/carousel";
import CategorySectionCreator from "@component/CategorySectionCreator";
import { currency } from "@utils/utils";
import useWindowSize from "@hook/useWindowSize";
import Rating from "@component/rating";
import { Chip } from "@component/Chip";
import Image from "next/image";
import ApiBaseUrl from "../../../api/ApiBaseUrl";
import styles from "../JustForYouPeoducts/JustForYouParoducts.module.css";

// ──────────────────────────────────────────────
// Skeleton Card (one product placeholder)
// ──────────────────────────────────────────────
export function ProductSkeleton() {
 return (
  <Box py="0.25rem">
   <Card
    p="1rem"
    borderRadius={8}
    style={{ height: "auto", minHeight: "300px" }}
   >
    {/* Image placeholder */}
    <Box
     position="relative"
     style={{
      padding: "0 0.5rem",
      aspectRatio: "1 / 1",
      background: "#f0f0f0",
      borderRadius: "8px",
      overflow: "hidden",
     }}
    />

    <Box mt="1rem">
     {/* Title skeleton */}
     <Box
      height="22px"
      width="85%"
      borderRadius="4px"
      backgroundColor="#e0e0e0"
      mb="0.5rem"
     />

     {/* Rating skeleton */}
     <FlexBox mb="0.5rem">
      {Array(5)
       .fill(0)
       .map((_, i) => (
        <Box
         key={i}
         width="16px"
         height="16px"
         borderRadius="2px"
         backgroundColor="#e0e0e0"
        />
       ))}
     </FlexBox>

     {/* Price skeleton */}
     <FlexBox alignItems="center">
      <Box
       height="20px"
       width="60px"
       borderRadius="4px"
       backgroundColor="#e0e0e0"
      />
      <Box
       height="16px"
       width="40px"
       borderRadius="4px"
       backgroundColor="#e0e0e0"
      />
     </FlexBox>
    </Box>
   </Card>
  </Box>
 );
}

// ──────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────
export default function ProductCarousel({ title, data, isLoading }: any) {
 const newArrivals = data || [];
 const productsToShow = isLoading
  ? Array(8).fill(null)
  : [...newArrivals, ...newArrivals]; // loop for carousel

 const [currentSlide, setCurrentSlide] = useState(0);
 const width = useWindowSize();
 const [visibleSlides, setVisibleSlides] = useState(5);
 const [isPaused, setIsPaused] = useState(false);

 const intervalRef = useRef<NodeJS.Timeout | null>(null);

 // Responsive visible slides
 useEffect(() => {
  if (width < 370) setVisibleSlides(1);
  else if (width < 650) setVisibleSlides(2);
  else if (width < 950) setVisibleSlides(3);
  else setVisibleSlides(5);
 }, [width]);

 // Auto-slide
 useEffect(() => {
  if (newArrivals.length === 0 || isLoading) return;

  if (!isPaused) {
   intervalRef.current = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % newArrivals.length);
   }, 2500);
  }

  return () => {
   if (intervalRef.current) clearInterval(intervalRef.current);
  };
 }, [newArrivals.length, isPaused, isLoading]);

 return (
  <CategorySectionCreator title={title} seeMoreLink="/newarrivals/new_arrivals">
   <Box
    my="-0.25rem"
    onMouseEnter={() => setIsPaused(true)}
    onMouseLeave={() => setIsPaused(false)}
   >
    <Carousel
     totalSlides={productsToShow.length}
     visibleSlides={visibleSlides}
     currentSlide={currentSlide}
    >
     {productsToShow.map((item, index) => {
      // Loading state → show skeleton
      if (isLoading || !item) {
       return <ProductSkeleton key={`skeleton-${index}`} />;
      }

      // Real product
      const hasDiscount =
       item.discount_price && item.discount_price < item.seeling_price;

      const discountPercent = hasDiscount
       ? Math.floor(
          ((item.seeling_price - item.discount_price) / item.seeling_price) *
           100
         )
       : 0;

      return (
       <Box py="0.25rem" key={`${item.product_slug}-${index}`}>
        <Card
         p="1rem"
         borderRadius={8}
         style={{ height: "auto", minHeight: "300px" }}
         position="relative"
        >
         {hasDiscount && (
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
           {discountPercent}% off
          </Chip>
         )}

         <Link href={`/product/${item.product_slug}`}>
          <Box position="relative" style={{ padding: "0 0.5rem" }}>
           <div
            style={{
             position: "relative",
             borderRadius: "8px",
             overflow: "hidden",
             aspectRatio: "1 / 1",
            }}
           >
            <Image
             src={`${ApiBaseUrl.ImgUrl}${item.product_thumbnail}`}
             alt={item.product_name}
             fill
             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
             style={{ objectFit: "cover" }}
             className={styles.imgPart}
            />
           </div>
          </Box>

          <Box mt="0.75rem">
           <H4
            fontWeight="600"
            fontSize="15px"
            lineHeight="1.3"
            mb="0.4rem"
            style={{
             display: "-webkit-box",
             WebkitLineClamp: 2,
             WebkitBoxOrient: "vertical",
             overflow: "hidden",
            }}
           >
            {item.product_name}
           </H4>

           {item.rating > 0 && (
            <Rating
             value={item.rating}
             outof={5}
             color="warn"
             readOnly
             size="small"
            />
           )}

           <FlexBox mt="0.5rem" alignItems="center">
            {hasDiscount ? (
             <>
              <H4 fontWeight="700" fontSize="15px" color="primary.main">
               {currency(item.discount_price)}
              </H4>
              <Small color="text.muted">
               <del>{currency(item.seeling_price)}</del>
              </Small>
             </>
            ) : (
             <H4 fontWeight="700" fontSize="15px" color="primary.main">
              {currency(item.seeling_price)}
             </H4>
            )}
           </FlexBox>
          </Box>
         </Link>
        </Card>
       </Box>
      );
     })}
    </Carousel>
   </Box>
  </CategorySectionCreator>
 );
}
