"use client";
import { useEffect, useState, useRef } from "react";
import Box from "@component/Box";
import { Carousel } from "@component/carousel";
import CategorySectionCreator from "@component/CategorySectionCreator";
import useWindowSize from "@hook/useWindowSize";
import ProductTile, { ProductTileSkeleton } from "@component/product-cards/ProductTile";
import ApiBaseUrl from "../../../api/ApiBaseUrl";

// ──────────────────────────────────────────────
// Skeleton Card (one product placeholder)
// ──────────────────────────────────────────────
export function ProductSkeleton() {
  return (
    <Box py="0.25rem" height="100%">
      <ProductTileSkeleton />
    </Box>
  );
}

// ──────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────
export default function ProductCarousel({
  title,
  data,
  isLoading,
  seeMoreLink,
}: any) {
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

  if (!isLoading && newArrivals.length === 0) return null;

  return (
    <CategorySectionCreator title={title} seeMoreLink={seeMoreLink}>
      <Box
        my="-0.25rem"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <Carousel
          totalSlides={productsToShow.length}
          visibleSlides={visibleSlides}
          currentSlide={currentSlide}
          hideArrowOnMobile
        >
          {productsToShow.map((item, index) => {
            // Loading state → show skeleton
            if (isLoading || !item) {
              return <ProductSkeleton key={`skeleton-${index}`} />;
            }

            // Real product
            const hasDiscount =
              item.discount_price && item.discount_price < item.selling_price;

            return (
              <Box py="0.25rem" height="100%" key={`${item.product_slug}-${index}`}>
                <ProductTile
                  href={`/product/${item.product_slug}`}
                  imageSrc={item.product_thumbnail?.startsWith("http") ? item.product_thumbnail : `${ApiBaseUrl.ImgUrl}${item.product_thumbnail}`}
                  name={item.product_name}
                  rating={item.rating}
                  price={hasDiscount ? item.discount_price : item.selling_price}
                  originalPrice={item.selling_price}
                />
              </Box>
            );
          })}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );
}
