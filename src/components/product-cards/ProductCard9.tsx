"use client";
import Link from "next/link";
import { Fragment, useCallback, useState } from "react";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import Box from "../Box";
import Card from "../Card";
import Image from "../Image";
import { Chip } from "../Chip";
import Hidden from "../hidden";
import Rating from "../rating";
import Grid from "../grid/Grid";
import Icon from "../icon/Icon";
import FlexBox from "../FlexBox";
import NavLink from "../nav-link";
import { Button } from "../buttons";
import { H4, H5, SemiSpan } from "../Typography";
import ProductQuickView from "@component/products/ProductQuickView";
import { useAppContext } from "@context/app-context";
import { calculateDiscount, currency, getTheme, DiscountPercentage } from "@utils/utils";
import ApiBaseUrl from "api/ApiBaseUrl";

// STYLED COMPONENT
const Wrapper = styled(Card)`
  .quick-view {
    top: 0.75rem;
    display: none;
    right: 0.75rem;
    cursor: pointer;
    position: absolute;
  }
  .categories {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .categories {
    display: flex;
    .link {
      font-size: 14px;
      margin-right: 0.5rem;
      text-decoration: underline;
      color: ${getTheme("colors.text.hint")};
    }
  }

  h4 {
    text-align: left;
    margin: 0.5rem 0px;
    color: ${getTheme("colors.text.secondary")};
  }

  .price {
    display: flex;
    font-weight: 600;
    margin-top: 0.5rem;

    h4 {
      margin: 0px;
      padding-right: 0.5rem;
      color: ${getTheme("colors.primary.main")};
    }
    del {
      color: ${getTheme("colors.text.hint")};
    }
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
  }

  &:hover {
    .add-cart {
      display: flex;
    }
    .quick-view {
      display: block;
    }
  }
`;

// ============================================================================
type ProductCard9Props = {
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
                                                                                                                                          
  [key: string]: unknown;
};
// ============================================================================

export default function ProductCard9({
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
}: ProductCard9Props) {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useAppContext();
  const cartItem = state.cart.find((item) => item.id === id);

  const toggleDialog = useCallback(() => setOpen((open) => !open), []);

  const handleCartAmountChange = (qty: number) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { price, imgUrl, productStock, id, qty, slug, name: title, productId, sellerId }
    });
  };

  return (
    <Wrapper overflow="hidden" width="100%" {...props}>
      <Grid container spacing={1}>
        <Grid item md={3} sm={4} xs={12}>
          <Box position="relative">
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

            {/* <Icon color="secondary" variant="small" className="quick-view" onClick={toggleDialog}>
              eye-alt
            </Icon> */}
            <Link href={`/product/${slug}`}>
            <Image src={`${ApiBaseUrl.ImgUrl}${imgUrl}`} alt={title} width="100%" borderRadius="0.5rem" />
            </Link>
          </Box>
        </Grid>

        <Grid item md={8} sm={8} xs={12}>
          <FlexBox flexDirection="column" justifyContent="center" height="100%" p="1rem">
            

            <Link href={`/product/${slug}`}>
              <H5 fontWeight="600" my="0.5rem">
                {title}
              </H5>
            </Link>

           {rating > 0 && (
             <Rating value={rating} outof={5} color="warn" readOnly />
           )}

            <FlexBox mt="0.5rem" mb="1rem" alignItems="center">
              <H5 fontWeight={600} color="primary.main" mr="0.5rem">
                {calculateDiscount(price, off as number)}
              </H5>

              {off > 0 && (
  <SemiSpan fontWeight="600">
    <del>{currency(price)}</del>
  </SemiSpan>
)}

            </FlexBox>

          </FlexBox>
        </Grid>

      </Grid>

      <ProductQuickView
        open={open}
        onClose={toggleDialog}
        product={{ id, imgUrl, price, title, slug }}
      />
    </Wrapper>
  );
}
