"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Box from "@component/Box";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import { H4 } from "@component/Typography";
import { Carousel } from "@component/carousel";
import CategorySectionCreator from "@component/CategorySectionCreator";
import { currency } from "@utils/utils";
import useWindowSize from "@hook/useWindowSize";

import styles from "../market-1/JustForYouPeoducts/JustForYouParoducts.module.css";

import ApiBaseUrl from "../../api/ApiBaseUrl";
import Rating from "@component/rating";
import { Chip } from "@component/Chip";
import Image from "next/image";

export default function CampaignProducts() {
  const [campaignProducts, setCampaignProducts] = useState([]);
  const [campaignInfo, setCampaignInfo] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const loopedProducts = [...campaignProducts, ...campaignProducts];

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Adjust visible slides by screen width
  useEffect(() => {
    if (width < 370) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(5);
  }, [width]);

  // Fetch campaign products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://frontend.tizaraa.shop/api/campaigns/active"
        );

        if (response.data && response.data.data) {
          setCampaignProducts(response.data.data);
          setCampaignInfo(response.data.campaign);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching campaign products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Auto-slide effect with pause/resume
  useEffect(() => {
    if (campaignProducts.length === 0) return;

    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % campaignProducts.length);
      }, 2000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [campaignProducts.length, isPaused]);

  const handleProductClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <CategorySectionCreator
      title={campaignInfo?.name}
      seeMoreLink={`campaign/campaign`}
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
                {parseFloat(item.campaign_price) <
                  parseFloat(item.seeling_price) && (
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
                      ((item.seeling_price - item.campaign_price) /
                        item.seeling_price) *
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
                    <Rating
                      value={item.rating}
                      outof={5}
                      color="warn"
                      readOnly
                    />
                  )}

                  {/* Price display */}
                  {parseFloat(item.campaign_price) ===
                  parseFloat(item.seeling_price) ? (
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
                        <H4
                          fontWeight="600"
                          fontSize="14px"
                          color="primary.main"
                        >
                          {currency(item.campaign_price)}
                        </H4>
                      </Box>
                    </FlexBox>
                  )}
                </Link>
              </Card>
            </Box>
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );
}
