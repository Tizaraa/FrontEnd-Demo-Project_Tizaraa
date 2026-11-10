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
import tz from "../../theme/tizaraa";
import styled, { keyframes } from "styled-components";

// "Only N left" below this many units
const LOW_STOCK = 10;

const piRise = keyframes`
 from { opacity: 0; transform: translateY(8px); }
 to { opacity: 1; transform: none; }
`;
const piPrice = keyframes`
 from { opacity: 0; transform: translateY(6px) scale(0.98); }
 to { opacity: 1; transform: none; }
`;
const piPing = keyframes`
 0% { opacity: 0.6; transform: scale(1); }
 80%, 100% { opacity: 0; transform: scale(2.4); }
`;

// Product info column: brand, title, rating/share, price box, spec tiles,
// variant pills, warranty chips, stock pill. Children rise in one by one.
const Info = styled.div`
 margin-bottom: 8px;

 & > * {
  animation: ${piRise} 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
 }
 & > *:nth-child(2) { animation-delay: 40ms; }
 & > *:nth-child(3) { animation-delay: 80ms; }
 & > *:nth-child(4) { animation-delay: 120ms; }
 & > *:nth-child(5) { animation-delay: 160ms; }
 & > *:nth-child(n + 6) { animation-delay: 200ms; }

 .pi-brand {
  display: inline-block;
  margin-bottom: 8px;
  padding: 3px 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.navyTint};
  color: ${({ theme }) => theme.tz.color.navy};
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
 }
 .pi-title {
  margin: 0 0 10px;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 28px;
  font-weight: 800;
  line-height: 1.25;
  color: ${({ theme }) => theme.tz.color.ink};
 }

 .pi-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-bottom: 16px;
  border-bottom: 1px dashed ${({ theme }) => theme.tz.color.line};
 }
 .pi-rating,
 .pi-share {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  margin-left: -8px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  font-family: inherit;
  font-size: 13.5px;
  color: ${({ theme }) => theme.tz.color.slate};
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease;
 }
 /* rating chip: gold stars (partial fill), score, divider, count, arrow */
 .pi-rating {
  margin-left: 0;
  padding: 6px 12px 6px 10px;
  border: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
  border-radius: 999px;
  background: #fffaf0;
 }
 .pi-stars {
  display: inline-flex;
  gap: 2px;
 }
 .pi-star {
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
 }
 .pi-star svg {
  position: absolute;
  inset: 0;
  width: 16px;
  height: 16px;
  fill: #e8dcc4;
 }
 .pi-star .pi-star-fill {
  fill: #ffb400;
  clip-path: inset(0 calc(100% - var(--f)) 0 0);
 }
 .pi-score {
  font-size: 14px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .pi-sep {
  width: 1px;
  height: 14px;
  background: ${({ theme }) => theme.tz.color.line};
 }
 .pi-count {
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }
 .pi-go {
  color: ${({ theme }) => theme.tz.color.slate};
  transition: transform 200ms ease;
 }
 .pi-rating:hover .pi-go {
  transform: translateX(2px);
 }
 .pi-rating:hover {
  border-color: #f3d48f;
  background: #fff4dc;
 }
 .pi-share:hover {
  border-color: ${({ theme }) => theme.tz.color.ember};
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .pi-share {
  margin-left: 0;
  padding: 7px 14px;
  background: ${({ theme }) => theme.tz.color.paper};
  color: ${({ theme }) => theme.tz.color.inkSoft};
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 999px;
  font-weight: 700;
 }
 .pi-share svg {
  width: 16px;
  height: 16px;
 }
 .pi-rating:focus-visible,
 .pi-share:focus-visible,
 .pi-opt:focus-visible,
 .pi-copy:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 .pi-price {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px 12px;
  margin-top: 16px;
  padding: 14px 16px;
  border-radius: 16px;
  background: linear-gradient(135deg, ${({ theme }) => theme.tz.color.emberTint} 0%, #fff7f3 100%);
 }
 .pi-now {
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 32px;
  font-weight: 800;
  line-height: 1.1;
  color: ${({ theme }) => theme.tz.color.emberDeep};
  animation: ${piPrice} 320ms cubic-bezier(0.22, 1, 0.36, 1) both;
 }
 .pi-was {
  font-size: 16px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .pi-off {
  padding: 3px 9px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
  font-size: 13px;
  font-weight: 800;
 }
 .pi-save {
  flex-basis: 100%;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.tone.success.fg};
 }

 .pi-campaign {
  display: block;
  width: 100%;
  margin-top: 12px;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: 14px;
  background: none;
  cursor: pointer;
 }
 .pi-campaign img {
  display: block;
  width: 100%;
  max-height: 250px;
  object-fit: cover;
  transition: transform 300ms ease;
 }
 .pi-campaign:hover img {
  transform: scale(1.02);
 }

 .pi-specs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 8px;
  margin: 16px 0 0;
 }
 .pi-specs > div {
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
  border-radius: 12px;
  background: ${({ theme }) => theme.tz.color.paper};
 }
 .pi-specs dt {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .pi-specs dd {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 3px 0 0;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
  overflow-wrap: anywhere;
 }
 .pi-copy {
  display: inline-grid;
  place-items: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border: 0;
  border-radius: 6px;
  background: ${({ theme }) => theme.tz.color.mist};
  color: ${({ theme }) => theme.tz.color.slate};
  font-size: 12px;
  cursor: pointer;
 }
 .pi-copy:hover {
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }

 .pi-group {
  margin-top: 18px;
 }
 .pi-label {
  margin: 0 0 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .pi-label b {
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .pi-opts {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
 }
 .pi-opt {
  position: relative;
  min-height: 40px;
  padding: 8px 16px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 12px;
  background: ${({ theme }) => theme.tz.color.paper};
  color: ${({ theme }) => theme.tz.color.ink};
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 150ms ease, background-color 150ms ease, color 150ms ease, transform 150ms ease;
 }
 .pi-opt:hover {
  border-color: #f6b9a3;
  transform: translateY(-1px);
 }
 .pi-opt.is-on {
  border-color: ${({ theme }) => theme.tz.color.ember};
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
  padding-right: 30px;
 }
 .pi-opt.is-on::after {
  content: "✓";
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  font-weight: 800;
 }

 .pi-warranty {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
 }
 .pi-wchip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.tone.info.bg};
  color: ${({ theme }) => theme.tz.tone.info.fg};
  font-size: 13px;
 }

 .pi-stock {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  padding: 7px 14px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
 }
 .pi-stock i {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
 }
 .pi-stock.is-in {
  background: ${({ theme }) => theme.tz.tone.success.bg};
  color: ${({ theme }) => theme.tz.tone.success.fg};
 }
 .pi-stock.is-low {
  background: ${({ theme }) => theme.tz.tone.warning.bg};
  color: ${({ theme }) => theme.tz.tone.warning.fg};
 }
 .pi-stock.is-low i::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: currentColor;
  animation: ${piPing} 1.8s ease-out infinite;
 }
 .pi-stock.is-out {
  background: ${({ theme }) => theme.tz.tone.danger.bg};
  color: ${({ theme }) => theme.tz.tone.danger.fg};
 }

 @media (max-width: 767px) {
  .pi-title {
   font-size: 21px;
  }
  .pi-now {
   font-size: 26px;
  }
 }

 @media (prefers-reduced-motion: reduce) {
  & > *,
  .pi-now,
  .pi-stock.is-low i::after {
   animation: none !important;
  }
  .pi-opt,
  .pi-campaign img {
   transition: none;
  }
 }
`;

type ProductDetailsProps = {
 title: string;
 rating: number;
 price: number;
 discountPrice?: number;
 totalDiscount?: number;
 reviewCount?: number;
 productStock: number;
 isDirectAdd?: boolean;
 sellerShopName: string;
 sellerShopLogo: string;
 brandName: string;
 productCode?: string | null;
 unitOfMeasure?: { id: number; name: string; symbol: string } | null;
 warranty: string;
 warrantyType: string;
 replacewarranty: string;
 sizeColor?: {
  colorwithsize?: {
   [color: string]: { size: string; price: string; qty: string }[];
  };
  size?: { size: string; price: string; qty: string }[];
  color?: { color: string; price: string; qty: string }[];
  colorGroupName?: string;
  sizeGroupName?: string;
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
 reviewCount,
 price,
 discountPrice,
 totalDiscount,
 productStock,
 isDirectAdd = false,
 sellerShopName,
 sellerShopLogo,
 brandName,
 productCode,
 unitOfMeasure,
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
 const [codeCopied, setCodeCopied] = useState(false);

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

 // Option chips for colour and size choices
 const optionStyle = (selected: boolean): React.CSSProperties => ({
  minHeight: "40px",
  padding: isDesktop ? "8px 16px" : "6px 12px",
  margin: "0 8px 8px 0",
  fontSize: isDesktop ? "14px" : "13px",
  fontFamily: "inherit",
  fontWeight: selected ? 600 : 500,
  color: selected ? tz.color.emberDeep : tz.color.ink,
  border: `1px solid ${selected ? tz.color.ember : tz.color.line}`,
  borderRadius: `${tz.radius.sm}px`,
  background: selected ? tz.color.emberTint : tz.color.paper,
  cursor: "pointer",
  transition: `border-color ${tz.motion.fast}, background-color ${tz.motion.fast}`,
 });

 const optionLabelStyle: React.CSSProperties = {
  margin: "20px 0 8px",
  fontSize: "14px",
  fontWeight: 600,
  color: tz.color.slate,
 };

 const specRowStyle: React.CSSProperties = {
  fontSize: isDesktop ? "15px" : "14px",
  marginTop: "8px",
  color: tz.color.slate,
 };

 const specValueStyle: React.CSSProperties = {
  color: tz.color.ink,
  fontWeight: 500,
 };

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
   <Info>
    {brandName && <span className="pi-brand">{brandName}</span>}
    <h1 className="pi-title">{title}</h1>

    <div className="pi-meta">
     <button
      type="button"
      className="pi-rating"
      onClick={() => {
       // open the Review tab below and scroll to it
       window.dispatchEvent(new CustomEvent("tz:product-tab", { detail: "review" }));
       document.getElementById("pdp-tabs")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
     >
      <span className="pi-stars" aria-label={`Rated ${Number(rating || 0).toFixed(1)} out of 5`}>
       {[1, 2, 3, 4, 5].map((n) => {
        // fraction of this star that is filled (0..1)
        const f = Math.max(0, Math.min(1, (rating || 0) - (n - 1)));
        return (
         <span key={n} className="pi-star" style={{ ["--f" as any]: `${f * 100}%` }} aria-hidden="true">
          <svg viewBox="0 0 24 24">
           <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
          </svg>
          <svg viewBox="0 0 24 24" className="pi-star-fill">
           <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
          </svg>
         </span>
        );
       })}
      </span>
      {rating > 0 && <b className="pi-score">{Number(rating).toFixed(1)}</b>}
      <span className="pi-sep" aria-hidden="true" />
      <span className="pi-count">
       {reviewCount ? `${reviewCount} review${reviewCount === 1 ? "" : "s"}` : "No reviews yet"}
      </span>
      <svg className="pi-go" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
       <path d="m9 18 6-6-6-6" />
      </svg>
     </button>
     <button type="button" className="pi-share" onClick={() => setIsShareModalOpen(true)} aria-label="Share this product">
      <ShareIcon />
      <span>Share</span>
     </button>
    </div>

    {price !== 0 && (() => {
     // Same price rules as before: variant price when one is picked,
     // otherwise discount price with the regular price struck through
     const variantPicked = Boolean(selectedColor || selectedSize);
     const mainPrice = variantPicked ? updatedPrice : discountPrice || price;
     const oldPrice = variantPicked
      ? discountPrice && updatedPrice !== price
        ? price
        : null
      : discountPrice
      ? price
      : null;
     const pct = !!discountPrice && discountPrice < price ? Math.round(((price - discountPrice) / price) * 100) : 0;
     return (
      <div className="pi-price">
       <span key={mainPrice} className="pi-now price">
        {currency(mainPrice)}
       </span>
       {oldPrice ? <s className="pi-was">{currency(oldPrice)}</s> : null}
       {pct > 0 && <span className="pi-off">−{pct}%</span>}
       {pct > 0 && oldPrice ? <span className="pi-save">You save {currency(Number(oldPrice) - Number(mainPrice))}</span> : null}
      </div>
     );
    })()}

    {campaignBannerImage && (
     <button
      type="button"
      className="pi-campaign"
      onClick={() => {
       router.push(`/campaign/campaign?type=${campaignSlug}`);
      }}
     >
      <img src={`${ApiBaseUrl.ImgUrl}/${campaignBannerImage}`} alt="Campaign Banner" />
     </button>
    )}

    <dl className="pi-specs">
     <div>
      <dt>Brand</dt>
      <dd>{brandName || "N/A"}</dd>
     </div>
     {productCode && (
      <div>
       <dt>Product code</dt>
       <dd>
        {productCode}
        <button
         type="button"
         className="pi-copy"
         aria-label="Copy product code"
         onClick={async () => {
          try {
           await navigator.clipboard.writeText(productCode);
           setCodeCopied(true);
           setTimeout(() => setCodeCopied(false), 1500);
          } catch {
           /* clipboard blocked: nothing to do */
          }
         }}
        >
         {codeCopied ? "✓" : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
           <rect x="9" y="9" width="13" height="13" rx="2" />
           <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
         )}
        </button>
       </dd>
      </div>
     )}
     {unitOfMeasure && (
      <div>
       <dt>Unit</dt>
       <dd>
        {unitOfMeasure.name}
        {unitOfMeasure.symbol ? ` (${unitOfMeasure.symbol})` : ""}
       </dd>
      </div>
     )}
    </dl>

    {sizeColor?.colorwithsize && (() => {
     const colors = Object.keys(sizeColor.colorwithsize);
     const onlyDefaultColor = colors.length === 1 && colors[0] === "Default";
     const colorLabel = sizeColor.colorGroupName || "Color";
     const sizeLabel = sizeColor.sizeGroupName || "Size";
     return (
      <div>
       {!onlyDefaultColor && (
        <div className="pi-group">
         <p className="pi-label">
          {colorLabel}: <b>{selectedColor}</b>
         </p>
         <div className="pi-opts" role="radiogroup" aria-label={colorLabel}>
          {colors.map((color) => (
           <button
            key={color}
            type="button"
            role="radio"
            aria-checked={selectedColor === color}
            className={`pi-opt${selectedColor === color ? " is-on" : ""}`}
            onClick={() => handleColorSelection(color)}
           >
            {color}
           </button>
          ))}
         </div>
        </div>
       )}
       {selectedColor && (
        <div className="pi-group">
         <p className="pi-label">
          {sizeLabel}: <b>{selectedSize}</b>
         </p>
         <div className="pi-opts" role="radiogroup" aria-label={sizeLabel}>
          {sizeColor.colorwithsize[selectedColor].map((item, index) => (
           <button
            key={index}
            type="button"
            role="radio"
            aria-checked={selectedSize === item.size}
            className={`pi-opt${selectedSize === item.size ? " is-on" : ""}`}
            onClick={() => handleSizeSelection(item.size)}
           >
            {item.size}
           </button>
          ))}
         </div>
        </div>
       )}
      </div>
     );
    })()}

    {sizeColor?.color && (
     <div className="pi-group">
      <p className="pi-label">
       Color: <b>{selectedColor}</b>
      </p>
      <div className="pi-opts" role="radiogroup" aria-label="Color">
       {sizeColor.color.map((item, index) => (
        <button
         key={index}
         type="button"
         role="radio"
         aria-checked={selectedColor === item.color}
         className={`pi-opt${selectedColor === item.color ? " is-on" : ""}`}
         onClick={() => handleColorSelection(item.color)}
        >
         {item.color}
        </button>
       ))}
      </div>
     </div>
    )}

    {sizeColor?.size && (
     <div className="pi-group">
      <p className="pi-label">
       Size: <b>{selectedSize}</b>
      </p>
      <div className="pi-opts" role="radiogroup" aria-label="Size">
       {sizeColor.size.map((item, index) => (
        <button
         key={index}
         type="button"
         role="radio"
         aria-checked={selectedSize === item.size}
         className={`pi-opt${selectedSize === item.size ? " is-on" : ""}`}
         onClick={() => handleSizeSelection(item.size)}
        >
         {item.size}
        </button>
       ))}
      </div>
     </div>
    )}

    {/* A missing warranty is not a fact worth a row — an "N/A" chip read as if
        the seller had answered the question. */}
    {(warranty || replacewarranty) && (
     <div className="pi-warranty">
      {[
       { label: "Warranty", value: warranty },
       { label: "Replacement warranty", value: replacewarranty },
      ]
       .filter(({ value }) => Boolean(value))
       .map(({ label, value }) => (
        <span key={label} className="pi-wchip">
         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
         </svg>
         {label}: <b>{value}</b>
        </span>
       ))}
     </div>
    )}

    {price !== 0 && (
     <span
      className={`pi-stock ${productStock <= 0 ? "is-out" : productStock <= LOW_STOCK ? "is-low" : "is-in"}`}
      aria-live="polite"
     >
      <i aria-hidden="true" />
      {productStock <= 0
       ? "Stock Out"
       : productStock <= LOW_STOCK
       ? `Only ${productStock} left — order soon`
       : `In stock · ${productStock} available`}
     </span>
    )}
   </Info>

   {/* Share Modal */}
   {isShareModalOpen && (
    <div
     style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(20, 21, 32, 0.5)",
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
       backgroundColor: tz.color.paper,
       borderRadius: `${tz.radius.lg}px`,
       boxShadow: tz.elevation.overlay,
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
        color: tz.color.slate,
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
        color: tz.color.ink,
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
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
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
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
       >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
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
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
       >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
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
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
       >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
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
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
       >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
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
         color: tz.color.slate,
        }}
       >
        Or copy link
       </p>
       <div
        style={{
         display: "flex",
         backgroundColor: tz.color.mist,
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
          color: tz.color.ink,
          outline: "none",
         }}
        />
        <button
         onClick={handleCopyLink}
         style={{
          padding: "8px 16px",
          backgroundColor: copySuccess ? tz.tone.success.fill : tz.color.emberDeep,
          color: tz.color.paper,
          fontFamily: "inherit",
          fontWeight: 600,
          border: "none",
          borderRadius: `${tz.radius.sm}px`,
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
