"use client";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Typography, { H1, H2, H5, H6, SemiSpan } from "@component/Typography";
import Rating from "@component/rating";
import { currency } from "@utils/utils";
import { Chip } from "@component/Chip";
import Link from "next/link";
import { useState, useEffect } from "react";
import ApiBaseUrl from "api/ApiBaseUrl";
import { useRouter } from "next/navigation";

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
  sizeColor?: {
    colorwithsize?: {
      [color: string]: { size: string; price: string; qty: string }[];
    };
    size?: { size: string; price: string; qty: string }[];
    color?: { color: string; price: string; qty: string }[];
  };
  campaignBannerImage?: string;
  campaignSlug?: string;
  onSelectionChange?: (
    selectedColor: string | null,
    selectedSize: string | null,
    updatedPrice: number
  ) => void;
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
  sizeColor,
  campaignBannerImage,
  campaignSlug,
  onSelectionChange,
}: ProductDetailsProps) => {
  const displayPrice = isDirectAdd ? discountPrice || price : price;
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const [availableSizes, setAvailableSizes] = useState<
    { size: string; price: string; qty: string }[]
  >([]);
  const [availableColors, setAvailableColors] = useState<
    { color: string; price: string; qty: string }[]
  >([]);

  const router = useRouter();

  useEffect(() => {
    if (sizeColor?.colorwithsize) {
      const colors = Object.keys(sizeColor.colorwithsize);
      if (colors.length > 0) {
        const firstColor = colors[0];
        setSelectedColor(firstColor);

        const sizes = sizeColor.colorwithsize[firstColor];
        if (sizes.length > 0) {
          setSelectedSize(sizes[0].size);
        }
      }
    } else if (sizeColor?.color) {
      setSelectedColor(sizeColor.color[0].color);
      setAvailableColors(sizeColor.color);
    } else if (sizeColor?.size) {
      setSelectedSize(sizeColor.size[0].size);
      setAvailableSizes(sizeColor.size);
    }
  }, [sizeColor]);

  const selectedProduct =
    selectedColor && selectedSize
      ? sizeColor?.colorwithsize?.[selectedColor]?.find(
          (item) => item.size === selectedSize
        )
      : selectedColor
      ? sizeColor?.color?.find((item) => item.color === selectedColor)
      : selectedSize
      ? sizeColor?.size?.find((item) => item.size === selectedSize)
      : null;

  const updatedPrice = selectedProduct
    ? parseFloat(selectedProduct.price)
    : displayPrice;
  const updatedQuantity = selectedProduct
    ? parseInt(selectedProduct.qty)
    : productStock;

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedColor, selectedSize, updatedPrice);
    }
  }, [selectedColor, selectedSize, updatedPrice, onSelectionChange]);

  const handleColorSelection = (color: string) => {
    if (sizeColor?.colorwithsize && sizeColor.colorwithsize[color]) {
      const sizesForColor = sizeColor.colorwithsize[color];
      setSelectedColor(color);
      setAvailableSizes(sizesForColor);
      setSelectedSize(sizesForColor[0]?.size || null); // Auto-select the first size for the new color
    } else if (sizeColor?.color) {
      setSelectedColor(color);
      setAvailableSizes([]);
    }
  };

  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
  };

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  return (
    <Box>
      <H1 mb="2px" fontSize={isDesktop ? "32px" : "16px"}>
        {title}
      </H1>

      <FlexBox alignItems="center" mb="1rem">
        <Box ml="8px" mr="8px">
          {rating > 0 && (
            <Rating value={rating} outof={5} color="warn" readOnly />
          )}
        </Box>
      </FlexBox>

      <Box mb="24px">
        {price !== 0 && (
          <FlexBox alignItems="center">
            <H5
              color="primary.main"
              mb="4px"
              lineHeight="1"
              fontSize={isDesktop ? "18px" : "14px"}
            >
              {selectedColor || selectedSize ? (
                discountPrice && updatedPrice !== price ? (
                  <>
                    {currency(updatedPrice)}
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "gray",
                        marginRight: "10px",
                        marginLeft: "10px",
                        fontSize: isDesktop ? "14px" : "12px",
                      }}
                    >
                      {currency(price)}
                    </span>
                  </>
                ) : (
                  currency(updatedPrice)
                )
              ) : (
                <>
                  {currency(discountPrice || price)}
                  {discountPrice && (
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "gray",
                        marginRight: "10px",
                        marginLeft: "10px",
                        fontSize: isDesktop ? "14px" : "12px",
                      }}
                    >
                      {currency(price)}
                    </span>
                  )}
                </>
              )}
            </H5>

            {!!discountPrice && price !== discountPrice && (
              <Chip
                bg="primary.main"
                color="white"
                px="6px"
                py="0.28rem"
                fontWeight="600"
                fontSize={isDesktop ? "12px" : "10px"}
                textAlign="center"
              >
                {Math.floor(((price - discountPrice) / price) * 100)}% off
              </Chip>
            )}
          </FlexBox>
        )}

        {campaignBannerImage && (
          <Box
            mb="5px"
            mt="5px"
            cursor="pointer"
            // onClick={() => {
            //   window.location.href = `/campaign/campaign?type=${campaignSlug}`;
            // }}
            onClick={() => {
              router.push(`/campaign/campaign?type=${campaignSlug}`);
            }}
          >
            <img
              src={`${ApiBaseUrl.ImgUrl}/${campaignBannerImage}`}
              alt="Campaign Banner"
              style={{
                width: "100%",
                maxHeight: "250px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </Box>
        )}

        <Typography style={{ fontSize: isDesktop ? "16px" : "14px" }}>
          Brand:{" "}
          <a
            href="#"
            style={{ textDecoration: "none", color: "blue", cursor: "text" }}
          >
            {brandName || "N/A"}
          </a>
        </Typography>

        {sizeColor?.colorwithsize && (
          <div>
            <h3 style={{ fontSize: isDesktop ? "16px" : "14px" }}>
              Available Colors
            </h3>
            <FlexBox>
              {Object.keys(sizeColor.colorwithsize).map((color) => (
                <button
                  key={color}
                  style={{
                    padding: isDesktop ? "8px 16px" : "6px 12px",
                    margin: "5px",
                    fontSize: isDesktop ? "14px" : "12px",
                    border:
                      selectedColor === color
                        ? "2px solid orange"
                        : "1px solid gray",
                    background: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => handleColorSelection(color)}
                >
                  {color}
                </button>
              ))}
            </FlexBox>

            {selectedColor && (
              <>
                <h3 style={{ fontSize: isDesktop ? "16px" : "14px" }}>
                  Available Sizes
                </h3>
                <FlexBox>
                  {sizeColor.colorwithsize[selectedColor].map((item, index) => (
                    <button
                      key={index}
                      style={{
                        padding: isDesktop ? "8px 16px" : "6px 12px",
                        margin: "5px",
                        fontSize: isDesktop ? "14px" : "12px",
                        border:
                          selectedSize === item.size
                            ? "2px solid orange"
                            : "1px solid gray",
                        background: "white",
                        cursor: "pointer",
                      }}
                      onClick={() => handleSizeSelection(item.size)}
                    >
                      {item.size}
                    </button>
                  ))}
                </FlexBox>
              </>
            )}
          </div>
        )}

        {sizeColor?.color && (
          <div>
            <h3 style={{ fontSize: isDesktop ? "16px" : "14px" }}>
              Available Colors
            </h3>
            <FlexBox>
              {sizeColor.color.map((item, index) => (
                <button
                  key={index}
                  style={{
                    padding: isDesktop ? "8px 16px" : "6px 12px",
                    margin: "5px",
                    fontSize: isDesktop ? "14px" : "12px",
                    border:
                      selectedColor === item.color
                        ? "2px solid orange"
                        : "1px solid gray",
                    background: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => handleColorSelection(item.color)}
                >
                  {item.color}
                </button>
              ))}
            </FlexBox>
          </div>
        )}

        {sizeColor?.size && (
          <div>
            <h3 style={{ fontSize: isDesktop ? "16px" : "14px" }}>
              Available Sizes
            </h3>
            <FlexBox>
              {sizeColor.size.map((item, index) => (
                <button
                  key={index}
                  style={{
                    padding: isDesktop ? "8px 16px" : "6px 12px",
                    margin: "5px",
                    fontSize: isDesktop ? "14px" : "12px",
                    border:
                      selectedSize === item.size
                        ? "2px solid orange"
                        : "1px solid gray",
                    background: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSizeSelection(item.size)}
                >
                  {item.size}
                </button>
              ))}
            </FlexBox>
          </div>
        )}

        <Typography style={{ fontSize: isDesktop ? "15px" : "13px" }}>
          <div style={{ marginBottom: "10px", marginTop: "5px" }}>
            Warranty:
            <span
              style={{
                backgroundColor: "rgba(249,55,92,0.69)",
                color: "white",
                padding: "4px 10px",
                borderRadius: "4px",
                marginLeft: "6px",
                fontSize: isDesktop ? "14px" : "12px",
              }}
            >
              {warranty || "N/A"}
            </span>
          </div>

          <div style={{ marginBottom: "5px" }}>
            Replacement warranty:
            <span
              style={{
                backgroundColor: "rgba(249,55,92,0.69)",
                color: "white",
                padding: "4px 10px",
                borderRadius: "4px",
                marginLeft: "6px",
                fontSize: isDesktop ? "14px" : "12px",
              }}
            >
              {replacewarranty || "N/A"}
            </span>
          </div>
        </Typography>

        {price !== 0 && (
          // <SemiSpan
          //   color="inherit"
          //   style={{ fontSize: isDesktop ? "16px" : "13px" }}
          // >
          //   {updatedQuantity > 0
          //     ? `${updatedQuantity} Products Available`
          //     : "Stock Out"}
          // </SemiSpan>

          <SemiSpan
            color="inherit"
            style={{ fontSize: isDesktop ? "16px" : "13px" }}
          >
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
