// // "use client";
// // import Box from "@component/Box";
// // import FlexBox from "@component/FlexBox";
// // import Typography, { H1, H2, H5, H6, SemiSpan } from "@component/Typography";
// // import Rating from "@component/rating";
// // import { currency } from "@utils/utils";
// // import { Chip } from "@component/Chip";
// // import Link from "next/link";
// // import { useState, useEffect } from "react"; // Import useEffect

// // type ProductDetailsProps = {
// //   title: string;
// //   rating: number;
// //   price: number;
// //   discountPrice?: number;
// //   totalDiscount?: number;
// //   productStock: number;
// //   isDirectAdd?: boolean;
// //   sellerShopName: string;
// //   sellerShopLogo: string;
// //   brandName: string;
// //   warranty: string;
// //   warrantyType: string;
// //   replacewarranty: string;
// //   // sizeColor?: {
// //   //   colorwithsize: {
// //   //     [color: string]: { size: string; price: string; qty: string }[];
// //   //   };
// //   // };

// //   sizeColor?: {
// //     colorwithsize?: {
// //       [color: string]: { size: string; price: string; qty: string }[];
// //     };
// //     size?: { size: string; price: string; qty: string }[];
// //     color?: { color: string; price: string; qty: string }[];
// //   };
  
// // };

// // const ProductDetails = ({
// //   title,
// //   rating,
// //   price,
// //   discountPrice,
// //   totalDiscount,
// //   productStock,
// //   isDirectAdd = false,
// //   sellerShopName,
// //   sellerShopLogo,
// //   brandName,
// //   warranty,
// //   warrantyType,
// //   replacewarranty,
// //   sizeColor,
// // }: ProductDetailsProps) => {
// //   const displayPrice = isDirectAdd ? discountPrice || price : price;
// //   const [selectedColor, setSelectedColor] = useState<string | null>(null);
// //   const [selectedSize, setSelectedSize] = useState<string | null>(null);

// //   const [availableSizes, setAvailableSizes] = useState<{ size: string; price: string; qty: string }[]>([]);


// //   // Auto-select the first color and size when the component mounts
// //   useEffect(() => {
// //     if (sizeColor?.colorwithsize) {
// //       const colors = Object.keys(sizeColor.colorwithsize);
// //       if (colors.length > 0) {
// //         const firstColor = colors[0];
// //         setSelectedColor(firstColor);

// //         const sizes = sizeColor.colorwithsize[firstColor];
// //         if (sizes.length > 0) {
// //           setSelectedSize(sizes[0].size);
// //         }
// //       }
// //     }
// //   }, [sizeColor]); 

// //   const selectedProduct = selectedColor && selectedSize
// //     ? sizeColor?.colorwithsize[selectedColor]?.find(item => item.size === selectedSize)
// //     : null;

// //   const updatedPrice = selectedProduct ? parseFloat(selectedProduct.price) : displayPrice;
// //   const updatedQuantity = selectedProduct ? parseInt(selectedProduct.qty) : productStock;

// //   // Handle color selection
// //   const handleColorSelection = (color: string) => {
// //     if (sizeColor?.colorwithsize && sizeColor.colorwithsize[color]) {
// //       const sizesForColor = sizeColor.colorwithsize[color];
// //       setSelectedColor(color);
// //       setAvailableSizes(sizesForColor); // Update sizes based on selected color
// //     } else {
// //       setSelectedColor(color);
// //       setAvailableSizes([]); // No sizes available in case of color-only variant
// //     }
// //   };
  

// //   return (
// //     <Box>
// //       <H1 mb="1rem">{title}</H1>
// //       <FlexBox alignItems="center" mb="1rem">
// //         <Box ml="8px" mr="8px">
// //           {rating > 0 && <Rating value={rating} outof={5} color="warn" readOnly />}
// //         </Box>
// //       </FlexBox>

// //       <Box mb="24px">
// //         {price !== 0 && (
// //           <FlexBox alignItems="center">
// //             <H5 color="primary.main" mb="4px" lineHeight="1" fontSize="18px">
// //   {selectedColor && selectedSize ? (
// //     discountPrice && updatedPrice !== price ? (
// //       <>
// //         {currency(updatedPrice)}
// //         <span
// //           style={{
// //             textDecoration: "line-through",
// //             color: "gray",
// //             marginRight: "10px",
// //             marginLeft: "10px",
// //           }}
// //         >
// //           {currency(price)}
// //         </span>
// //       </>
// //     ) : (
// //       currency(updatedPrice)
// //     )
// //   ) : (
// //     <>
// //       {currency(discountPrice || price)} {/* Show discountPrice if available, otherwise show price */}
// //       {discountPrice && (
// //         <span
// //           style={{
// //             textDecoration: "line-through",
// //             color: "gray",
// //             marginRight: "10px",
// //             marginLeft: "10px",
// //           }}
// //         >
// //           {currency(price)}
// //         </span>
// //       )}
// //     </>
// //   )}
// // </H5>

// //             {!!discountPrice && price !== discountPrice && (
// //               <Chip
// //                 bg="primary.main"
// //                 color="white"
// //                 px="6px"
// //                 py="0.28rem"
// //                 fontWeight="600"
// //                 fontSize="12px"
// //                 textAlign="center"
// //               >
// //                 {Math.floor(((price - discountPrice) / price) * 100)}% off
// //               </Chip>
// //             )}
// //           </FlexBox>
// //         )}

// //         {/* Brand Name */}
// //         <Typography style={{ fontSize: "16px" }}>
// //           Brand:{" "}
// //           <a
// //             href={"#"}
// //             style={{ textDecoration: "none", color: "blue", cursor: "text" }}
// //           >
// //             {brandName || "N/A"}
// //           </a>
// //         </Typography>
// //         {sizeColor?.colorwithsize && (
// //   <div>
// //     <h3>Available Colors</h3>
// //     <FlexBox>
// //       {Object.keys(sizeColor.colorwithsize).map((color) => (
// //         <button
// //           key={color}
// //           style={{
// //             padding: "8px 16px",
// //             margin: "5px",
// //             border: selectedColor === color ? "2px solid orange" : "1px solid gray",
// //             background: "white",
// //             cursor: "pointer",
// //           }}
// //           onClick={() => handleColorSelection(color)}
// //         >
// //           {color}
// //         </button>
// //       ))}
// //     </FlexBox>

// //     {selectedColor && (
// //       <>
// //         <h3>Available Sizes</h3>
// //         <FlexBox>
// //           {sizeColor.colorwithsize[selectedColor].map((item, index) => (
// //             <button
// //               key={index}
// //               style={{
// //                 padding: "8px 16px",
// //                 margin: "5px",
// //                 border: selectedSize === item.size ? "2px solid orange" : "1px solid gray",
// //                 background: "white",
// //                 cursor: "pointer",
// //               }}
// //               onClick={() => setSelectedSize(item.size)}
// //             >
// //               {item.size}
// //             </button>
// //           ))}
// //         </FlexBox>
// //       </>
// //     )}
// //   </div>
// // )}

// // {/* Handling case when SizeColor contains only colors */}
// // {sizeColor?.color && (
// //   <div>
// //     <h3>Available Colors</h3>
// //     <FlexBox>
// //       {sizeColor.color.map((item, index) => (
// //         <button
// //           key={index}
// //           style={{
// //             padding: "8px 16px",
// //             margin: "5px",
// //             border: selectedColor === item.color ? "2px solid orange" : "1px solid gray",
// //             background: "white",
// //             cursor: "pointer",
// //           }}
// //           onClick={() => handleColorSelection(item.color)}
// //         >
// //           {item.color}
// //         </button>
// //       ))}
// //     </FlexBox>
// //   </div>
// // )}

// // {/* Handling case when SizeColor contains only sizes */}
// // {sizeColor?.size && (
// //   <div>
// //     <h3>Available Sizes</h3>
// //     <FlexBox>
// //       {sizeColor.size.map((item, index) => (
// //         <button
// //           key={index}
// //           style={{
// //             padding: "8px 16px",
// //             margin: "5px",
// //             border: selectedSize === item.size ? "2px solid orange" : "1px solid gray",
// //             background: "white",
// //             cursor: "pointer",
// //           }}
// //           onClick={() => setSelectedSize(item.size)}
// //         >
// //           {item.size}
// //         </button>
// //       ))}
// //     </FlexBox>
// //   </div>
// // )}


// //         {/* Warranty */}
// //         <Typography>
// //           <div style={{ marginBottom: "10px", marginTop: "5px" }}>
// //             Warranty:
// //             <span
// //               style={{
// //                 backgroundColor: "rgba(249,55,92,0.69)",
// //                 color: "white",
// //                 padding: "4px 10px",
// //                 borderRadius: "4px",
// //               }}
// //             >
// //               {warranty || "N/A"}
// //             </span>
// //           </div>

// //           {/* Replacement Warranty */}
// //           <div style={{ marginBottom: "5px" }}>
// //             Replacement warranty:
// //             <span
// //               style={{
// //                 backgroundColor: "rgba(249,55,92,0.69)",
// //                 color: "white",
// //                 padding: "4px 10px",
// //                 borderRadius: "4px",
// //               }}
// //             >
// //               {replacewarranty || "N/A"}
// //             </span>
// //           </div>
// //         </Typography>

// //         {/* Stock Availability */}
// //         {price !== 0 && (
// //           <SemiSpan color="inherit" style={{ fontSize: "16px" }}>
// //             {updatedQuantity > 0
// //               ? `${updatedQuantity} Products Available`
// //               : "Stock Out"}
// //           </SemiSpan>
// //         )}
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default ProductDetails;

// "use client";
// import Box from "@component/Box";
// import FlexBox from "@component/FlexBox";
// import Typography, { H1, H2, H5, H6, SemiSpan } from "@component/Typography";
// import Rating from "@component/rating";
// import { currency } from "@utils/utils";
// import { Chip } from "@component/Chip";
// import Link from "next/link";
// import { useState, useEffect } from "react"; // Import useEffect

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
// }: ProductDetailsProps) => {
//   const displayPrice = isDirectAdd ? discountPrice || price : price;
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);
//   const [selectedSize, setSelectedSize] = useState<string | null>(null);

//   // Track available sizes and colors
//   const [availableSizes, setAvailableSizes] = useState<{ size: string; price: string; qty: string }[]>([]);
//   const [availableColors, setAvailableColors] = useState<{ color: string; price: string; qty: string }[]>([]);

//   // Auto-select the first color or size when the component mounts
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
//       // Auto-select the first color if only colors are available
//       setSelectedColor(sizeColor.color[0].color);
//       setAvailableColors(sizeColor.color);
//     } else if (sizeColor?.size) {
//       // Auto-select the first size if only sizes are available
//       setSelectedSize(sizeColor.size[0].size);
//       setAvailableSizes(sizeColor.size);
//     }
//   }, [sizeColor]); // Run this effect only when sizeColor changes

//   // Determine the selected product based on color and size
//   const selectedProduct =
//     selectedColor && selectedSize
//       ? sizeColor?.colorwithsize?.[selectedColor]?.find((item) => item.size === selectedSize)
//       : selectedColor
//       ? sizeColor?.color?.find((item) => item.color === selectedColor)
//       : selectedSize
//       ? sizeColor?.size?.find((item) => item.size === selectedSize)
//       : null;

//   const updatedPrice = selectedProduct ? parseFloat(selectedProduct.price) : displayPrice;
//   const updatedQuantity = selectedProduct ? parseInt(selectedProduct.qty) : productStock;

//   // Handle color selection
//   const handleColorSelection = (color: string) => {
//     if (sizeColor?.colorwithsize && sizeColor.colorwithsize[color]) {
//       const sizesForColor = sizeColor.colorwithsize[color];
//       setSelectedColor(color);
//       setAvailableSizes(sizesForColor); 
//     } else if (sizeColor?.color) {
//       setSelectedColor(color);
//       setAvailableSizes([]); 
//     }
//   };

//   return (
//     <Box>
//       <H1 mb="1rem">{title}</H1>
//       <FlexBox alignItems="center" mb="1rem">
//         <Box ml="8px" mr="8px">
//           {rating > 0 && <Rating value={rating} outof={5} color="warn" readOnly />}
//         </Box>
//       </FlexBox>

//       <Box mb="24px">
//         {price !== 0 && (
//           <FlexBox alignItems="center">
//             <H5 color="primary.main" mb="4px" lineHeight="1" fontSize="18px">
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
//                 fontSize="12px"
//                 textAlign="center"
//               >
//                 {Math.floor(((price - discountPrice) / price) * 100)}% off
//               </Chip>
//             )}
//           </FlexBox>
//         )}

//         {/* Brand Name */}
//         <Typography style={{ fontSize: "16px" }}>
//           Brand:{" "}
//           <a
//             href={"#"}
//             style={{ textDecoration: "none", color: "blue", cursor: "text" }}
//           >
//             {brandName || "N/A"}
//           </a>
//         </Typography>
//         {sizeColor?.colorwithsize && (
//   <div>
//     <h3>Available Colors</h3>
//     <FlexBox>
//       {Object.keys(sizeColor.colorwithsize).map((color) => (
//         <button
//           key={color}
//           style={{
//             padding: "8px 16px",
//             margin: "5px",
//             border: selectedColor === color ? "2px solid orange" : "1px solid gray",
//             background: "white",
//             cursor: "pointer",
//           }}
//           onClick={() => handleColorSelection(color)}
//         >
//           {color}
//         </button>
//       ))}
//     </FlexBox>

//     {selectedColor && (
//       <>
//         <h3>Available Sizes</h3>
//         <FlexBox>
//           {sizeColor.colorwithsize[selectedColor].map((item, index) => (
//             <button
//               key={index}
//               style={{
//                 padding: "8px 16px",
//                 margin: "5px",
//                 border: selectedSize === item.size ? "2px solid orange" : "1px solid gray",
//                 background: "white",
//                 cursor: "pointer",
//               }}
//               onClick={() => setSelectedSize(item.size)}
//             >
//               {item.size}
//             </button>
//           ))}
//         </FlexBox>
//       </>
//     )}
//   </div>
// )}

//         {/* Handling case when SizeColor contains only colors */}
//         {sizeColor?.color && (
//           <div>
//             <h3>Available Colors</h3>
//             <FlexBox>
//               {sizeColor.color.map((item, index) => (
//                 <button
//                   key={index}
//                   style={{
//                     padding: "8px 16px",
//                     margin: "5px",
//                     border: selectedColor === item.color ? "2px solid orange" : "1px solid gray",
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

//         {/* Handling case when SizeColor contains only sizes */}
//         {sizeColor?.size && (
//           <div>
//             <h3>Available Sizes</h3>
//             <FlexBox>
//               {sizeColor.size.map((item, index) => (
//                 <button
//                   key={index}
//                   style={{
//                     padding: "8px 16px",
//                     margin: "5px",
//                     border: selectedSize === item.size ? "2px solid orange" : "1px solid gray",
//                     background: "white",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => setSelectedSize(item.size)}
//                 >
//                   {item.size}
//                 </button>
//               ))}
//             </FlexBox>
//           </div>
//         )}

//         {/* Warranty */}
//         <Typography>
//           <div style={{ marginBottom: "10px", marginTop: "5px" }}>
//             Warranty:
//             <span
//               style={{
//                 backgroundColor: "rgba(249,55,92,0.69)",
//                 color: "white",
//                 padding: "4px 10px",
//                 borderRadius: "4px",
//               }}
//             >
//               {warranty || "N/A"}
//             </span>
//           </div>

//           {/* Replacement Warranty */}
//           <div style={{ marginBottom: "5px" }}>
//             Replacement warranty:
//             <span
//               style={{
//                 backgroundColor: "rgba(249,55,92,0.69)",
//                 color: "white",
//                 padding: "4px 10px",
//                 borderRadius: "4px",
//               }}
//             >
//               {replacewarranty || "N/A"}
//             </span>
//           </div>
//         </Typography>

//         {/* Stock Availability */}
//         {price !== 0 && (
//           <SemiSpan color="inherit" style={{ fontSize: "16px" }}>
//             {updatedQuantity > 0
//               ? `${updatedQuantity} Products Available`
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
  onSelectionChange?: (selectedColor: string | null, selectedSize: string | null, updatedPrice: number) => void;
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
  onSelectionChange,
}: ProductDetailsProps) => {
  const displayPrice = isDirectAdd ? discountPrice || price : price;
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const [availableSizes, setAvailableSizes] = useState<{ size: string; price: string; qty: string }[]>([]);
  const [availableColors, setAvailableColors] = useState<{ color: string; price: string; qty: string }[]>([]);

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
      ? sizeColor?.colorwithsize?.[selectedColor]?.find((item) => item.size === selectedSize)
      : selectedColor
      ? sizeColor?.color?.find((item) => item.color === selectedColor)
      : selectedSize
      ? sizeColor?.size?.find((item) => item.size === selectedSize)
      : null;

  const updatedPrice = selectedProduct ? parseFloat(selectedProduct.price) : displayPrice;
  const updatedQuantity = selectedProduct ? parseInt(selectedProduct.qty) : productStock;

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
    } else if (sizeColor?.color) {
      setSelectedColor(color);
      setAvailableSizes([]); 
    }
  };

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
                fontSize="12px"
                textAlign="center"
              >
                {Math.floor(((price - discountPrice) / price) * 100)}% off
              </Chip>
            )}
          </FlexBox>
        )}

        <Typography style={{ fontSize: "16px" }}>
          Brand:{" "}
          <a
            href={"#"}
            style={{ textDecoration: "none", color: "blue", cursor: "text" }}
          >
            {brandName || "N/A"}
          </a>
        </Typography>
        {sizeColor?.colorwithsize && (
          <div>
            <h3>Available Colors</h3>
            <FlexBox>
              {Object.keys(sizeColor.colorwithsize).map((color) => (
                <button
                  key={color}
                  style={{
                    padding: "8px 16px",
                    margin: "5px",
                    border: selectedColor === color ? "2px solid orange" : "1px solid gray",
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
                <h3>Available Sizes</h3>
                <FlexBox>
                  {sizeColor.colorwithsize[selectedColor].map((item, index) => (
                    <button
                      key={index}
                      style={{
                        padding: "8px 16px",
                        margin: "5px",
                        border: selectedSize === item.size ? "2px solid orange" : "1px solid gray",
                        background: "white",
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedSize(item.size)}
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
            <h3>Available Colors</h3>
            <FlexBox>
              {sizeColor.color.map((item, index) => (
                <button
                  key={index}
                  style={{
                    padding: "8px 16px",
                    margin: "5px",
                    border: selectedColor === item.color ? "2px solid orange" : "1px solid gray",
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
            <h3>Available Sizes</h3>
            <FlexBox>
              {sizeColor.size.map((item, index) => (
                <button
                  key={index}
                  style={{
                    padding: "8px 16px",
                    margin: "5px",
                    border: selectedSize === item.size ? "2px solid orange" : "1px solid gray",
                    background: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedSize(item.size)}
                >
                  {item.size}
                </button>
              ))}
            </FlexBox>
          </div>
        )}

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

        {price !== 0 && (
          <SemiSpan color="inherit" style={{ fontSize: "16px" }}>
            {updatedQuantity > 0
              ? `${updatedQuantity} Products Available`
              : "Stock Out"}
          </SemiSpan>
        )}
      </Box>
    </Box>
  );
};

export default ProductDetails;