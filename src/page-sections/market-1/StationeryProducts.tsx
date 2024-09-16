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


import ApiBaseUrl from "../../api/ApiBaseUrl";
import Rating from "@component/rating";

export default function StationeryProducts() {
  const [flashSale, setFlashSale] = useState([]);
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
          `${ApiBaseUrl.baseUrl}frontend/category/product/view`
        );

        // Simply set the array of products from the response
        if (response.data && response.data.stationeryproduct) {
            setFlashSale(response.data.stationeryproduct); // Directly use response data
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
    <CategorySectionCreator  title="Stationery & Craft" seeMoreLink="#">
      <Box my="-0.25rem">
        <Carousel totalSlides={flashSale.length} visibleSlides={visibleSlides}>
          {flashSale.map((item) => (
            <Box py="0.25rem" key={item.product_slug}>
              <Card p="1rem" borderRadius={8} style={{ height: '300px' }}> {/* Fixed height */}
                <Link href={`/product/${item.product_slug}`}>
                  <HoverBox
                    borderRadius={8}
                    mb="0.5rem"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    style={{ height: '150px', overflow: 'hidden' }} // Fix image height
                  >
                    <img 
                      src={item.product_thumbnail} 
                      alt={item.product_name} 
                      style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} 
                    />
                  </HoverBox>

                  <H4
                    fontWeight="600"
                    fontSize="18px"
                    mb="0.25rem"
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis', // Handle long text with ellipsis
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
  <FlexBox flexDirection="column">
    <H4 fontWeight="600" fontSize="14px" color="text.muted">
     BDT <del>{(item.seeling_price)}</del>
    </H4>
    <Box marginTop="4px"> {/* Adjust margin as needed */}
      <H4 fontWeight="600" fontSize="14px" color="primary.main">
        {currency(item.discount_price)}
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
