"use client";
import { useEffect, useState, useRef } from "react";
import Box from "@component/Box";
import styled from "styled-components";
import { Carousel } from "@component/carousel";
import CategorySectionCreator from "@component/CategorySectionCreator";
import useWindowSize from "@hook/useWindowSize";
import ProductTile, { ProductTileSkeleton } from "@component/product-cards/ProductTile";
import ApiBaseUrl from "../../../api/ApiBaseUrl";

// ──────────────────────────────────────────────
// Skeleton Card (one product placeholder)
// ──────────────────────────────────────────────
// Round white prev/next buttons for the home product rails
const RailWrap = styled(Box)`
  .tz-rail-arrow.arrow-button {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    padding: 0;
    border: 1px solid ${({ theme }) => theme.tz.color.line};
    border-radius: 50%;
    color: ${({ theme }) => theme.tz.color.navy};
    background: ${({ theme }) => theme.tz.color.paper};
    box-shadow: ${({ theme }) => theme.tz.elevation.raised};
    transition: color ${({ theme }) => theme.tz.motion.fast},
      border-color ${({ theme }) => theme.tz.motion.fast},
      box-shadow ${({ theme }) => theme.tz.motion.base},
      transform ${({ theme }) => theme.tz.motion.base};
  }
  .tz-rail-arrow.arrow-button:hover:not(:disabled) {
    color: ${({ theme }) => theme.tz.color.emberDeep};
    border-color: #f6b9a3;
    background: ${({ theme }) => theme.tz.color.paper};
    box-shadow: ${({ theme }) => theme.tz.elevation.overlay};
  }
  .tz-rail-arrow.arrow-button:active:not(:disabled) {
    transform: translateY(-50%) scale(0.92);
  }
  .tz-rail-arrow.arrow-button:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.tz.focusRing};
  }
  .tz-rail-arrow.arrow-button:disabled {
    opacity: 0;
    pointer-events: none;
  }

  ${({ theme }) => theme.tz.media.reducedMotion} {
    .tz-rail-arrow.arrow-button {
      transition: none;
    }
    .tz-rail-arrow.arrow-button:active:not(:disabled) {
      transform: translateY(-50%);
    }
  }
`;

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
      <RailWrap
        my="-0.25rem"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <Carousel
          totalSlides={productsToShow.length}
          visibleSlides={visibleSlides}
          currentSlide={currentSlide}
          hideArrowOnMobile
          arrowButtonClass="tz-rail-arrow"
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
      </RailWrap>
    </CategorySectionCreator>
  );
}
