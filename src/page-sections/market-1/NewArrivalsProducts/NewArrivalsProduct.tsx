"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

import Box from "@component/Box";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import HoverBox from "@component/HoverBox";
import { H4 } from "@component/Typography";
import { Carousel } from "@component/carousel";
import CategorySectionCreator from "@component/CategorySectionCreator";
import { currency } from "@utils/utils";
import useWindowSize from "@hook/useWindowSize";

import styles from "../JustForYouPeoducts/JustForYouParoducts.module.css";

import ApiBaseUrl from "../../../api/ApiBaseUrl";
import Rating from "@component/rating";
import { Chip } from "@component/Chip";

export default function NewArrivalsProduct() {
  const [bigDiscountList, setBigDiscountList] = useState([]);
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(5);

  useEffect(() => {
    if (width < 370) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(5);
  }, [width]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${ApiBaseUrl.baseUrl}frontend/remark/product/items`
        );

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

  return (
    <CategorySectionCreator title="New Arrivals" seeMoreLink={`newarrivals/new_arrivals`}>
      <Box my="-0.25rem">
        <Carousel
          totalSlides={bigDiscountList.length}
          visibleSlides={visibleSlides}
        >
          {bigDiscountList.map((item) => (
            <Box py="0.25rem" key={item.product_slug}>
             <Card p="1rem" borderRadius={8} style={{ height:"auto", minHeight:"300px" }}>
  {/* Discount Badge */}
  {!!item.discount_price &&
    item.discount_price < item.seeling_price && (
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
      style={{
        padding: "0 0.5rem", // Added padding to prevent content touching the edges
      }}
    >
      <img
        src={item.product_thumbnail}
        alt={item.product_name}
        style={{
          width: "100%",
          borderRadius: "8px",
          objectFit: "cover",
        }}
        className={styles.imgPart}
      />
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
