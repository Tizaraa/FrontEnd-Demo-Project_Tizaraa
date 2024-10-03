"use client";
import { Fragment } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

import Box from "@component/Box";
import Image from "@component/Image";
import Rating from "@component/rating";
import Avatar from "@component/avatar";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import { H1, H2, H3, H6, SemiSpan } from "@component/Typography";
import { useAppContext } from "@context/app-context";
import { currency } from "@utils/utils";

// ========================================
type ProductIntroProps = {
  price: number;
  discountPrice?: number; // Optional discount price
  totalDiscount?: number; // Optional total discount
  title: string;
  images: string[];
  id: string | number;
  sellerShopName: string; 
  rating: number; // Add rating prop
  productStock: number;
  slug?: string;
  productId: string | number;
  sellerId: string | number;
};
// ========================================

export default function ProductIntro({
  images,
  title,
  price,
  id,
  sellerShopName,
  rating,
  discountPrice,
  totalDiscount,
  slug,
  productStock,
  productId,
  sellerId
}: ProductIntroProps) {
  const param = useParams();
  const { state, dispatch } = useAppContext();
  const [selectedImage, setSelectedImage] = useState(0);

  const routerId = param.slug as string;
  const cartItem = state.cart.find((item) => item.id === id || item.id === routerId );

  const handleImageClick = (ind: number) => () => setSelectedImage(ind);

  // const handleCartAmountChange = (amount: number) => () => {
  //   dispatch({
  //     type: "CHANGE_CART_AMOUNT",
  //     payload: {
  //       price,
  //       qty: amount,
  //       name: title,
  //       imgUrl: images[0],
  //       id: id || routerId,
        
  //       // newly added 
  //       discountPrice   

  //     }
  //   });
  // };
  const handleCartAmountChange = (amount: number) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price,
        qty: amount,
        name: title,
        imgUrl: images[0],
        id: id || routerId,
        discountPrice,
        slug,
        productId ,
        sellerId
      }
    });
  };
  
  

  return (
    <Box overflow="hidden">
      <Grid container justifyContent="center" spacing={16}>
        <Grid item md={6} xs={12} alignItems="center">
          <div>
            <FlexBox mb="50px" overflow="hidden" borderRadius={16} justifyContent="center">
              <Image
                width={200}
                height={200}
                src={images[selectedImage]}
                style={{ display: "block", width: "70%", height: "auto" }}
              />
            </FlexBox>

            <FlexBox overflow="auto">
              {images.map((url, ind) => (
                <Box
                  key={ind}
                  size={70}
                  bg="white"
                  minWidth={70}
                  display="flex"
                  cursor="pointer"
                  border="1px solid"
                  borderRadius="10px"
                  alignItems="center"
                  justifyContent="center"
                  ml={ind === 0 ? "auto" : ""}
                  mr={ind === images.length - 1 ? "auto" : "10px"}
                  borderColor={selectedImage === ind ? "primary.main" : "gray.400"}
                  onClick={handleImageClick(ind)}
                >
                  <Avatar src={url} borderRadius="10px" size={65} />
                </Box>
              ))}
            </FlexBox>
          </div>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb="1rem">{title}</H1>

          <FlexBox alignItems="center" mb="1rem">
            <Box ml="8px" mr="8px">
              {rating > 0 && (
                <Rating value={rating} outof={5} color="warn" readOnly />
              )}
            </Box>
          </FlexBox>

          <Box mb="24px">
            <FlexBox alignItems="center">
            <H2 color="primary.main" mb="4px" lineHeight="1">
              
  {discountPrice ? (
    <>
     {currency(discountPrice)} {/* Discounted price */}
      <span style={{ textDecoration: 'line-through', color: 'gray', marginRight: '10px' }}>
        {currency(price)} {/* Original selling price */}
      </span>
     
    </>
  ) : (
    currency(price) 
  )}
</H2>

{discountPrice && totalDiscount && (
  <Box
    bg="red"
    color="white"
    px="0.5rem"
    py="0.25rem"
    borderRadius="50%"
    ml="1rem"
    fontWeight="600"
    fontSize="12px"
    textAlign="center"
  >
    {Math.floor(totalDiscount)}%
  </Box>
)}

</FlexBox>
<SemiSpan color="inherit">
    {productStock > 0 ? "Stock Available" : "Stock Out"}
  </SemiSpan>

          </Box>

          {!cartItem?.qty ? (
            <Button
              mb="36px"
              size="small"
              color="primary"
              variant="contained"
              onClick={handleCartAmountChange(1)}
            >
              Add to Cart
            </Button>
          ) : (
            <FlexBox alignItems="center" mb="36px">
              <Button
                p="9px"
                size="small"
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.qty - 1)}
              >
                <Icon variant="small">minus</Icon>
              </Button>

              <H3 fontWeight="600" mx="20px">
                {cartItem?.qty.toString().padStart(2, "0")}
              </H3>

              <Button
                p="9px"
                size="small"
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.qty + 1)}
              >
                <Icon variant="small">plus</Icon>
              </Button>
            </FlexBox>
          )}

          <FlexBox alignItems="center" mb="1rem">
            <SemiSpan>Sold By:</SemiSpan>
            <Link href="#">
              <H6 lineHeight="1" ml="8px">
                {sellerShopName} 
              </H6>
            </Link>
          </FlexBox>
        </Grid>
      </Grid>
    </Box>
  );
}
