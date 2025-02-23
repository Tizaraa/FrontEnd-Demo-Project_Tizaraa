
// components/ProductDetails.tsx
"use client";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Typography, { H1, H2, H5, H6, SemiSpan } from "@component/Typography";
import Rating from "@component/rating";
import { currency } from "@utils/utils";
import { Chip } from "@component/Chip";
import Link from "next/link";

type SizeColorOption = {
  size: string;
  price: string;
  qty: string;
};

type ProductDetailsProps = {
  title: string;
  rating: number;
  price: number;
  discountPrice?: number;
  totalDiscount?: number;
  productStock: number;
  isDirectAdd?: boolean;
  sellerShopName: string;
  sellerShopLogo: string;
  brandName: string;
  warranty: string;
  warrantyType: string;
  replacewarranty: string;
  sizeColor?: SizeColorOption[]; // Add SizeColor data
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
  warrantyType,
  replacewarranty,
  sizeColor, // Destructure sizeColor
}: ProductDetailsProps) => {
  const displayPrice = isDirectAdd ? discountPrice || price : price;

  return (
    <Box>
      <H1 mb="1rem">{title}</H1>
      <FlexBox alignItems="center" mb="1rem">
        <Box ml="8px" mr="8px">
          {rating > 0 && <Rating value={rating} outof={5} color="warn" readOnly />}
        </Box>
      </FlexBox>

      <Box mb="24px">
        {price !== 0 && (
          <FlexBox alignItems="center">
            <H5 color="primary.main" mb="4px" lineHeight="1" fontSize="18px">
              {discountPrice && price !== discountPrice ? (
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

            {!!discountPrice && price !== discountPrice && totalDiscount && (
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

        {/* Brand Name */}
        <Typography style={{ fontSize: "16px" }}>
          Brand:{" "}
          <a
            href={"#"}
            style={{ textDecoration: "none", color: "blue", cursor: "text" }}
          >
            {brandName || "N/A"}
          </a>
        </Typography>

        {/* Warranty */}
        <Typography>
          <div style={{ marginBottom: "10px", marginTop: "5px" }}>
            Warranty:
            <span
              style={{
                backgroundColor: "rgba(249,55,92,0.69)",
                color: "white",
                padding: "4px 10px",
                borderRadius: "4px",
              }}
            >
              {warranty || "N/A"}
            </span>
          </div>

          {/* Replacement Warranty */}
          <div style={{ marginBottom: "5px" }}>
            Replacement warranty:
            <span
              style={{
                backgroundColor: "rgba(249,55,92,0.69)",
                color: "white",
                padding: "4px 10px",
                borderRadius: "4px",
              }}
            >
              {replacewarranty || "N/A"}
            </span>
          </div>
        </Typography>

        {/* Stock Availability */}
        {price !== 0 && (
          <SemiSpan color="inherit" style={{ fontSize: "16px" }}>
            {productStock > 0
              ? `${productStock} Products Available`
              : "Stock Out"}
          </SemiSpan>
        )}
      </Box>
    </Box>
  );
};

export default ProductDetails;