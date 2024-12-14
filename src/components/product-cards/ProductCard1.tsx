"use client";

import Link from "next/link";
import { Fragment, useCallback, useState } from "react";
import styled from "styled-components";

import { useAppContext } from "@context/app-context";

import Box from "@component/Box";
import Rating from "@component/rating";
import { Chip } from "@component/Chip";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import NextImage from "@component/NextImage";
import Card, { CardProps } from "@component/Card";
import { H3, H4, SemiSpan } from "@component/Typography";
import ProductQuickView from "@component/products/ProductQuickView";
import { toast } from "react-hot-toast";

import { calculateDiscount, currency, getTheme, DiscountPercentage } from "@utils/utils";
import { deviceSize } from "@utils/constants";

// STYLED COMPONENT
const Wrapper = styled(Card)`
  margin: auto;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  transition: all 250ms ease-in-out;

  &:hover {
    .details {
      .add-cart {
        display: flex;
      }
    }
    .image-holder {
      .extra-icons {
        display: block;
      }
    }
  }

  .image-holder {
    text-align: center;
    position: relative;
    display: inline-block;
    height: 100%;

    .extra-icons {
      z-index: 2;
      top: 0.75rem;
      display: none;
      right: 0.75rem;
      cursor: pointer;
      position: absolute;
    }

    @media only screen and (max-width: ${deviceSize.sm}px) {
      display: block;
    }
  }

  .details {
    padding: 1rem;

    .title,
    .categories {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .icon-holder {
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      justify-content: space-between;
    }

    .favorite-icon {
      cursor: pointer;
    }
    .outlined-icon {
      svg path {
        fill: ${getTheme("colors.text.hint")};
      }
    }
    .add-cart {
      display: none;
      margin-top: auto;
      align-items: center;
      flex-direction: column;
    }
  }

  @media only screen and (max-width: 768px) {
    .details {
      .add-cart {
        display: flex;
      }
    }
  }
`;

// =======================================================================
interface ProductCard1Props extends CardProps {
  off?: number;
  slug: string;
  title: string;
  price: number;
  imgUrl: string;
  rating: number;
  images: string[];
  productStock: number;
  discountPrice?: number; // Optional discount price
  totalDiscount?: number; // Optional total discount
  id?: string | number;
  productId?: string | number;
  sellerId?: string | number;
  sizecolorwithprice?: any; 
}
// =======================================================================

export default function ProductCard1({
  id,
  off,
  slug,
  title,
  price,
  imgUrl,
  productStock,
  images,
  rating,
  discountPrice,
  productId,
  sellerId,
  sizecolorwithprice,
  ...props
}: ProductCard1Props) {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useAppContext();
  
  const cartItem = state.cart.find((item) => item.id === id);

  const toggleDialog = useCallback(() => setOpen((open) => !open), []);

  const handleCartAmountChange = (amount: number) => () => {
    if (amount > productStock) {
      toast.error("Out of Stock");
      return;
    }
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        id: id as number | string,
        slug,
        price,
        imgUrl,
        productStock,
        name: title,
        qty: amount,

          // newly added 
          discountPrice,   
          productId,
          sellerId,
          sizecolorwithprice 
      }
    });
  };

  return (
    <>
      <Wrapper borderRadius={8} {...props}>
        <div className="image-holder">

          {!!off && (
            <Chip
              top="10px"
              left="10px"
              p="5px 10px"
              fontSize="10px"
              fontWeight="600"
              bg="primary.main"
              position="absolute"
              color="primary.text"
              zIndex={1}>
              {/* {off}%  */}
              {DiscountPercentage(price, off as number)}% off
            </Chip>
          )}

          {/* <FlexBox className="extra-icons">
            <Icon color="secondary" variant="small" mb="0.5rem" onClick={toggleDialog}>
              eye-alt
            </Icon>

            <Icon className="favorite-icon outlined-icon" variant="small">
              heart
            </Icon>
          </FlexBox> */}

          <Link href={`/product/${slug}`}>
            <NextImage alt={title} width={277} src={imgUrl} height={270} />
          </Link>
        </div>

        <div className="details">
          <FlexBox>
            <Box flex="1 1 0" minWidth="0px" mr="0.5rem">
              <Link href={`/product/${slug}`}>
                <H3
                  mb="10px"
                  title={title}
                  fontSize="14px"
                  textAlign="left"
                  fontWeight="600"
                  className="title"
                  color="text.secondary">
                  {title}
                </H3>
              </Link>

                         
            {rating > 0 && (
  <Rating value={rating} outof={5} color="warn" readOnly />
)}

              {/* <Rating value={rating || 0} outof={5} color="warn" readOnly /> */}


    {/* <Box marginTop="4px"> 
      <H4 fontWeight="600" fontSize="14px" color="primary.main">
      <del>{currency(price)}</del>
      </H4>
    </Box>

    <FlexBox>
    <H4 fontWeight="600" fontSize="14px" color="primary.main">
    {calculateDiscount(price, off as number)}
    </H4>
  </FlexBox> */}

{(price === 0 && off === 0) ? (
    <H4 fontWeight="600" fontSize="14px" color="primary.main">
        RFQ
    </H4>
) : (
    <>
        {discountPrice && discountPrice > 0 ? (
            <>
                <Box marginTop="4px">
                    <H4 fontWeight="600" fontSize="14px" color="primary.main">
                        <del>{currency(price)}</del>
                    </H4>
                </Box>

                <FlexBox>
                    <H4 fontWeight="600" fontSize="14px" color="primary.main">
                        {currency(discountPrice)}
                    </H4>
                </FlexBox>
            </>
        ) : (
            <H4 fontWeight="600" fontSize="14px" color="primary.main">
                {currency(price)}
            </H4>
        )}
    </>
)}


    
            </Box>

          
            

            {/* <FlexBox
              width="30px"
              alignItems="center"
              flexDirection="column-reverse"
              justifyContent={!!cartItem?.qty ? "space-between" : "flex-start"}>
              <Button
                size="none"
                padding="3px"
                color="primary"
                variant="outlined"
                borderColor="primary.light"
                onClick={handleCartAmountChange((cartItem?.qty || 0) + 1)}>
                <Icon variant="small">plus</Icon>
              </Button>

              {!!cartItem?.qty && (
                <Fragment>
                  <SemiSpan color="text.primary" fontWeight="600">
                    {cartItem.qty}
                  </SemiSpan>

                  <Button
                    size="none"
                    padding="3px"
                    color="primary"
                    variant="outlined"
                    borderColor="primary.light"
                    onClick={handleCartAmountChange(cartItem.qty - 1)}>
                    <Icon variant="small">minus</Icon>
                  </Button>
                </Fragment>
              )}
            </FlexBox> */}
          </FlexBox>
        </div>
      </Wrapper>

      <ProductQuickView
        open={open}
        onClose={toggleDialog}
        product={{ imgUrl, title, price, id: id as number | string, slug }}
      />
    </>
  );
}