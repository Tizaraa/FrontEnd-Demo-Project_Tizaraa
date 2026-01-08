// "use client";
// import Box from "@component/Box";
// import FlexBox from "@component/FlexBox";
// import Typography, { H1, H2, H5, H6, SemiSpan } from "@component/Typography";
// import Rating from "@component/rating";
// import { currency } from "@utils/utils";
// import { Chip } from "@component/Chip";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import ApiBaseUrl from "api/ApiBaseUrl";
// import { useRouter } from "next/navigation";

// type ProductDetailsProps = {
//   title: string;
//   rating: number;
//   price: number;
//   discountPrice?: number;
//   totalDiscount?: number;
//   productStock: number;
//   isDirectAdd?: boolean;
//   sellerShopName: string;
//   sellerShopLogo: string;
//   brandName: string;
//   warranty: string;
//   warrantyType: string;
//   replacewarranty: string;
//   sizeColor?: {
//     colorwithsize?: {
//       [color: string]: { size: string; price: string; qty: string }[];
//     };
//     size?: { size: string; price: string; qty: string }[];
//     color?: { color: string; price: string; qty: string }[];
//   };
//   campaignBannerImage?: string;
//   campaignSlug?: string;
//   onSelectionChange?: (
//     selectedColor: string | null,
//     selectedSize: string | null,
//     updatedPrice: number
//   ) => void;
// };

// const ProductDetails = ({
//   title,
//   rating,
//   price,
//   discountPrice,
//   totalDiscount,
//   productStock,
//   isDirectAdd = false,
//   sellerShopName,
//   sellerShopLogo,
//   brandName,
//   warranty,
//   warrantyType,
//   replacewarranty,
//   sizeColor,
//   campaignBannerImage,
//   campaignSlug,
//   onSelectionChange,
// }: ProductDetailsProps) => {
//   const displayPrice = isDirectAdd ? discountPrice || price : price;
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);
//   const [selectedSize, setSelectedSize] = useState<string | null>(null);

//   const [availableSizes, setAvailableSizes] = useState<
//     { size: string; price: string; qty: string }[]
//   >([]);
//   const [availableColors, setAvailableColors] = useState<
//     { color: string; price: string; qty: string }[]
//   >([]);

//   const router = useRouter();

//   useEffect(() => {
//     if (sizeColor?.colorwithsize) {
//       const colors = Object.keys(sizeColor.colorwithsize);
//       if (colors.length > 0) {
//         const firstColor = colors[0];
//         setSelectedColor(firstColor);

//         const sizes = sizeColor.colorwithsize[firstColor];
//         if (sizes.length > 0) {
//           setSelectedSize(sizes[0].size);
//         }
//       }
//     } else if (sizeColor?.color) {
//       setSelectedColor(sizeColor.color[0].color);
//       setAvailableColors(sizeColor.color);
//     } else if (sizeColor?.size) {
//       setSelectedSize(sizeColor.size[0].size);
//       setAvailableSizes(sizeColor.size);
//     }
//   }, [sizeColor]);

//   const selectedProduct =
//     selectedColor && selectedSize
//       ? sizeColor?.colorwithsize?.[selectedColor]?.find(
//           (item) => item.size === selectedSize
//         )
//       : selectedColor
//       ? sizeColor?.color?.find((item) => item.color === selectedColor)
//       : selectedSize
//       ? sizeColor?.size?.find((item) => item.size === selectedSize)
//       : null;

//   const updatedPrice = selectedProduct
//     ? parseFloat(selectedProduct.price)
//     : displayPrice;
//   const updatedQuantity = selectedProduct
//     ? parseInt(selectedProduct.qty)
//     : productStock;

//   useEffect(() => {
//     if (onSelectionChange) {
//       onSelectionChange(selectedColor, selectedSize, updatedPrice);
//     }
//   }, [selectedColor, selectedSize, updatedPrice, onSelectionChange]);

//   const handleColorSelection = (color: string) => {
//     if (sizeColor?.colorwithsize && sizeColor.colorwithsize[color]) {
//       const sizesForColor = sizeColor.colorwithsize[color];
//       setSelectedColor(color);
//       setAvailableSizes(sizesForColor);
//       setSelectedSize(sizesForColor[0]?.size || null); // Auto-select the first size for the new color
//     } else if (sizeColor?.color) {
//       setSelectedColor(color);
//       setAvailableSizes([]);
//     }
//   };

//   const handleSizeSelection = (size: string) => {
//     setSelectedSize(size);
//   };

//   const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

//   return (
//     <Box>
//       <H1 mb="2px" fontSize={isDesktop ? "32px" : "16px"}>
//         {title}
//       </H1>

//       <FlexBox alignItems="center" mb="1rem">
//         <Box ml="8px" mr="8px">
//           {rating > 0 && (
//             <Rating value={rating} outof={5} color="warn" readOnly />
//           )}
//         </Box>
//       </FlexBox>

//       <Box mb="24px">
//         {price !== 0 && (
//           <FlexBox alignItems="center">
//             <H5
//               color="primary.main"
//               mb="4px"
//               lineHeight="1"
//               fontSize={isDesktop ? "18px" : "14px"}
//             >
//               {selectedColor || selectedSize ? (
//                 discountPrice && updatedPrice !== price ? (
//                   <>
//                     {currency(updatedPrice)}
//                     <span
//                       style={{
//                         textDecoration: "line-through",
//                         color: "gray",
//                         marginRight: "10px",
//                         marginLeft: "10px",
//                         fontSize: isDesktop ? "14px" : "12px",
//                       }}
//                     >
//                       {currency(price)}
//                     </span>
//                   </>
//                 ) : (
//                   currency(updatedPrice)
//                 )
//               ) : (
//                 <>
//                   {currency(discountPrice || price)}
//                   {discountPrice && (
//                     <span
//                       style={{
//                         textDecoration: "line-through",
//                         color: "gray",
//                         marginRight: "10px",
//                         marginLeft: "10px",
//                         fontSize: isDesktop ? "14px" : "12px",
//                       }}
//                     >
//                       {currency(price)}
//                     </span>
//                   )}
//                 </>
//               )}
//             </H5>

//             {!!discountPrice && price !== discountPrice && (
//               <Chip
//                 bg="primary.main"
//                 color="white"
//                 px="6px"
//                 py="0.28rem"
//                 fontWeight="600"
//                 fontSize={isDesktop ? "12px" : "10px"}
//                 textAlign="center"
//               >
//                 {Math.floor(((price - discountPrice) / price) * 100)}% off
//               </Chip>
//             )}
//           </FlexBox>
//         )}

//         {campaignBannerImage && (
//           <Box
//             mb="5px"
//             mt="5px"
//             cursor="pointer"
//             // onClick={() => {
//             //   window.location.href = `/campaign/campaign?type=${campaignSlug}`;
//             // }}
//             onClick={() => {
//               router.push(`/campaign/campaign?type=${campaignSlug}`);
//             }}
//           >
//             <img
//               src={`${ApiBaseUrl.ImgUrl}/${campaignBannerImage}`}
//               alt="Campaign Banner"
//               style={{
//                 width: "100%",
//                 maxHeight: "250px",
//                 objectFit: "cover",
//                 borderRadius: "10px",
//               }}
//             />
//           </Box>
//         )}

//         <Typography style={{ fontSize: isDesktop ? "16px" : "14px" }}>
//           Brand:{" "}
//           <a
//             href="#"
//             style={{ textDecoration: "none", color: "blue", cursor: "text" }}
//           >
//             {brandName || "N/A"}
//           </a>
//         </Typography>

//         {sizeColor?.colorwithsize && (
//           <div>
//             <h3 style={{ fontSize: isDesktop ? "16px" : "14px" }}>
//               Available Colors
//             </h3>
//             <FlexBox>
//               {Object.keys(sizeColor.colorwithsize).map((color) => (
//                 <button
//                   key={color}
//                   style={{
//                     padding: isDesktop ? "8px 16px" : "6px 12px",
//                     margin: "5px",
//                     fontSize: isDesktop ? "14px" : "12px",
//                     border:
//                       selectedColor === color
//                         ? "2px solid orange"
//                         : "1px solid gray",
//                     background: "white",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => handleColorSelection(color)}
//                 >
//                   {color}
//                 </button>
//               ))}
//             </FlexBox>

//             {selectedColor && (
//               <>
//                 <h3 style={{ fontSize: isDesktop ? "16px" : "14px" }}>
//                   Available Sizes
//                 </h3>
//                 <FlexBox>
//                   {sizeColor.colorwithsize[selectedColor].map((item, index) => (
//                     <button
//                       key={index}
//                       style={{
//                         padding: isDesktop ? "8px 16px" : "6px 12px",
//                         margin: "5px",
//                         fontSize: isDesktop ? "14px" : "12px",
//                         border:
//                           selectedSize === item.size
//                             ? "2px solid orange"
//                             : "1px solid gray",
//                         background: "white",
//                         cursor: "pointer",
//                       }}
//                       onClick={() => handleSizeSelection(item.size)}
//                     >
//                       {item.size}
//                     </button>
//                   ))}
//                 </FlexBox>
//               </>
//             )}
//           </div>
//         )}

//         {sizeColor?.color && (
//           <div>
//             <h3 style={{ fontSize: isDesktop ? "16px" : "14px" }}>
//               Available Colors
//             </h3>
//             <FlexBox>
//               {sizeColor.color.map((item, index) => (
//                 <button
//                   key={index}
//                   style={{
//                     padding: isDesktop ? "8px 16px" : "6px 12px",
//                     margin: "5px",
//                     fontSize: isDesktop ? "14px" : "12px",
//                     border:
//                       selectedColor === item.color
//                         ? "2px solid orange"
//                         : "1px solid gray",
//                     background: "white",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => handleColorSelection(item.color)}
//                 >
//                   {item.color}
//                 </button>
//               ))}
//             </FlexBox>
//           </div>
//         )}

//         {sizeColor?.size && (
//           <div>
//             <h3 style={{ fontSize: isDesktop ? "16px" : "14px" }}>
//               Available Sizes
//             </h3>
//             <FlexBox>
//               {sizeColor.size.map((item, index) => (
//                 <button
//                   key={index}
//                   style={{
//                     padding: isDesktop ? "8px 16px" : "6px 12px",
//                     margin: "5px",
//                     fontSize: isDesktop ? "14px" : "12px",
//                     border:
//                       selectedSize === item.size
//                         ? "2px solid orange"
//                         : "1px solid gray",
//                     background: "white",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => handleSizeSelection(item.size)}
//                 >
//                   {item.size}
//                 </button>
//               ))}
//             </FlexBox>
//           </div>
//         )}

//         <Typography style={{ fontSize: isDesktop ? "15px" : "13px" }}>
//           <div style={{ marginBottom: "10px", marginTop: "5px" }}>
//             Warranty:
//             <span
//               style={{
//                 backgroundColor: "rgba(249,55,92,0.69)",
//                 color: "white",
//                 padding: "4px 10px",
//                 borderRadius: "4px",
//                 marginLeft: "6px",
//                 fontSize: isDesktop ? "14px" : "12px",
//               }}
//             >
//               {warranty || "N/A"}
//             </span>
//           </div>

//           <div style={{ marginBottom: "5px" }}>
//             Replacement warranty:
//             <span
//               style={{
//                 backgroundColor: "rgba(249,55,92,0.69)",
//                 color: "white",
//                 padding: "4px 10px",
//                 borderRadius: "4px",
//                 marginLeft: "6px",
//                 fontSize: isDesktop ? "14px" : "12px",
//               }}
//             >
//               {replacewarranty || "N/A"}
//             </span>
//           </div>
//         </Typography>

//         {price !== 0 && (
//           // <SemiSpan
//           //   color="inherit"
//           //   style={{ fontSize: isDesktop ? "16px" : "13px" }}
//           // >
//           //   {updatedQuantity > 0
//           //     ? `${updatedQuantity} Products Available`
//           //     : "Stock Out"}
//           // </SemiSpan>

//           <SemiSpan
//             color="inherit"
//             style={{ fontSize: isDesktop ? "16px" : "13px" }}
//           >
//             {productStock > 0
//               ? `${productStock} Products Available`
//               : "Stock Out"}
//           </SemiSpan>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default ProductDetails;

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
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const [availableSizes, setAvailableSizes] = useState<
    { size: string; price: string; qty: string }[]
  >([]);
  const [availableColors, setAvailableColors] = useState<
    { color: string; price: string; qty: string }[]
  >([]);

  const router = useRouter();

  // Get current product URL
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

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
      setSelectedSize(sizesForColor[0]?.size || null);
    } else if (sizeColor?.color) {
      setSelectedColor(color);
      setAvailableSizes([]);
    }
  };

  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
  };

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  // Share functions
  const handleShare = (platform: string) => {
    const shareUrl = encodeURIComponent(currentUrl);
    const shareText = encodeURIComponent(`Check out this product: ${title}`);

    let url = "";

    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
        break;
      case "whatsapp":
        url = `https://wa.me/?text=${shareText}%20${shareUrl}`;
        break;
      case "pinterest":
        url = `https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${shareText}`;
        break;
    }

    if (url) {
      window.open(url, "_blank", "width=600,height=400");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const ShareIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92Z"
        fill="currentColor"
      />
    </svg>
  );

  const CloseIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <Box>
      <H1 fontSize={isDesktop ? "32px" : "16px"}>{title}</H1>

      <FlexBox alignItems="center" justifyContent="space-between">
        <Box>
          <Rating
            value={rating > 0 ? rating : 0}
            outof={5}
            color="warn"
            readOnly
          />
        </Box>
        <Box
          onClick={() => setIsShareModalOpen(true)}
          style={{
            cursor: "pointer",
            padding: "8px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f5f5f5",
            color: "#666",
          }}
        >
          <ShareIcon /> &emsp;{" "}
          <span style={{ textDecoration: "underline" }}>Share</span>
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

            {/* {!!discountPrice && price !== discountPrice && (
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
            )} */}

            {!!discountPrice && discountPrice < price && (
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
                        ? "2px solid #e94560"
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
                            ? "2px solid #e94560"
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
                        ? "2px solid #e94560"
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
                        ? "2px solid #e94560"
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

      {/* Share Modal */}
      {isShareModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            animation: "fadeIn 0.3s ease-in-out",
          }}
          onClick={() => setIsShareModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "24px",
              width: "90%",
              maxWidth: "400px",
              position: "relative",
              animation: "slideUp 0.3s ease-in-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsShareModalOpen(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                borderRadius: "4px",
                color: "#666",
              }}
            >
              <CloseIcon />
            </button>

            {/* Modal Header */}
            <h3
              style={{
                margin: "0 0 24px 0",
                fontSize: "18px",
                fontWeight: "600",
                color: "#333",
              }}
            >
              Share this link via
            </h3>

            {/* Social Media Icons */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginBottom: "24px",
                justifyContent: "flex-start",
              }}
            >
              {/* Facebook */}
              <button
                onClick={() => handleShare("facebook")}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: "#1877F2",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <span style={{ fontSize: "20px", fontWeight: "bold" }}>f</span>
              </button>

              {/* Twitter */}
              <button
                onClick={() => handleShare("twitter")}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: "#1DA1F2",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>

              {/* LinkedIn */}
              <button
                onClick={() => handleShare("linkedin")}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: "#0077B5",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </button>

              {/* WhatsApp */}
              <button
                onClick={() => handleShare("whatsapp")}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: "#25D366",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488" />
                </svg>
              </button>

              {/* Pinterest */}
              <button
                onClick={() => handleShare("pinterest")}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: "#BD081C",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
              </button>
            </div>

            {/* Copy Link Section */}
            <div style={{ marginBottom: "16px" }}>
              <p
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "14px",
                  color: "#666",
                }}
              >
                Or copy link
              </p>
              <div
                style={{
                  display: "flex",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  padding: "12px",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <input
                  type="text"
                  value={currentUrl}
                  readOnly
                  style={{
                    flex: 1,
                    border: "none",
                    backgroundColor: "transparent",
                    fontSize: "14px",
                    color: "#333",
                    outline: "none",
                  }}
                />
                <button
                  onClick={handleCopyLink}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: copySuccess ? "#28a745" : "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "14px",
                    transition: "all 0.2s ease",
                    minWidth: "60px",
                  }}
                >
                  {copySuccess ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
};

export default ProductDetails;
