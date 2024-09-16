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



import ApiBaseUrl from "../../../api/ApiBaseUrl";
import Rating from "@component/rating";

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
    <CategorySectionCreator title="New Arrivals" seeMoreLink="#">
      <Box my="-0.25rem">
        <Carousel totalSlides={bigDiscountList.length} visibleSlides={visibleSlides}>
          {bigDiscountList.map((item) => (
            <Box py="0.25rem" key={item.product_slug}>
              <Card p="1rem" borderRadius={8} style={{ height: '300px' }}>
                <Link href={`/product/${item.product_slug}`}>
                  <HoverBox
                    borderRadius={8}
                    mb="0.5rem"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    style={{ height: '150px', overflow: 'hidden' }}
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
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.product_name}
                  </H4>

                  {item.rating > 0 && (
  <Rating value={item.rating} outof={5} color="warn" readOnly />
)}


                  <FlexBox>
                    <H4 fontWeight="600" fontSize="14px" color="text.muted">
                      BDT <del>{(item.seeling_price)}</del>
                    </H4>
                  </FlexBox>

                  <H4 fontWeight="600" fontSize="14px" color="primary.main" mr="0.5rem">
                    {currency(item.discount_price)}
                  </H4>
                </Link>
              </Card>
            </Box>
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );
}
