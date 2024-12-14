
// components/ProductDetails.tsx
"use client";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Typography, { H1, H2, H5, H6, SemiSpan } from "@component/Typography";
import Rating from "@component/rating";
import { currency } from "@utils/utils";
import { Chip } from "@component/Chip";
import Link from "next/link";

type ProductDetailsProps = {
  title: string;
  rating: number;
  price: number;
  discountPrice?: number;
  totalDiscount?: number;
  productStock: number;
  isDirectAdd?: boolean;
  sellerShopName,
  sellerShopLogo,
  brandName,
  warranty,
};

const ProductDetails = ({
  title,
  rating,
  price,
  discountPrice,
  totalDiscount,
  productStock,
  isDirectAdd = false, 
  sellerShopName,
  sellerShopLogo,
  brandName,
  warranty,
}: ProductDetailsProps) => {
  const displayPrice = isDirectAdd ? (discountPrice || price) : price; // Choose price based on direct add

  return (
    <Box>
      <H1 mb="1rem">{title}</H1>
      <FlexBox alignItems="center" mb="1rem">
        <Box ml="8px" mr="8px">
          {rating > 0 && <Rating value={rating} outof={5} color="warn" readOnly />}
        </Box>
      </FlexBox>
      
      <Box mb="24px">

  {/* Show price and discount only if the price is not 0 */}
  {price !== 0 && (
    <FlexBox alignItems="center">
      <H5 color="primary.main" mb="4px" lineHeight="1" fontSize="18px">
        {discountPrice ? (
          <>
            {currency(discountPrice)}
            <span
              style={{
                textDecoration: "line-through",
                color: "gray",
                marginRight: "10px",
                marginLeft: "10px",
              }}
            >
              {currency(price)}
            </span>
          </>
        ) : (
          currency(price)
        )}
      </H5>

      {!!discountPrice && totalDiscount && (
        <Chip
          bg="primary.main"
          color="white"
          px="6px"
          py="0.28rem"
          fontWeight="600"
          fontSize="12px"
          textAlign="center"
        >
          {Math.floor(totalDiscount)}% off
        </Chip>
      )}
    </FlexBox>
  )}

  {/* brand name  */}
  <Typography style={{fontSize: "16px"}}>
  Brand:{" "}
  <a 
    href={"#"} 
    style={{ textDecoration: "none", color: "blue", cursor: "text" }}
  >
    {brandName || "N/A"}
  </a>
</Typography>

{/* warranty */}
{/* <Typography>
      Warranty: {warranty || "No warranty"}
    </Typography> */}

  {/* Show stock availability only if price is not 0 */}
  {price !== 0 && (
    <SemiSpan color="inherit" style={{fontSize: "16px"}}>
      {/* {productStock > 0 ? "Stock Available" : "Stock Out"} */}
      {price !== 0 && (
  <SemiSpan color="inherit">
    {productStock > 0
      ? `${productStock} Products Available`
      : "Stock Out"}
  </SemiSpan>
)}

    </SemiSpan>
  )}
</Box>

    </Box>
  );
};

export default ProductDetails;
