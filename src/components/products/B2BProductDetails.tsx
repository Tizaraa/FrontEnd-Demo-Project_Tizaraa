// "use client";
// import Box from "@component/Box";
// import FlexBox from "@component/FlexBox";
// import Typography, { H1, H2, H5, H6, SemiSpan } from "@component/Typography";
// import Rating from "@component/rating";
// import { currency } from "@utils/utils";
// import { Chip } from "@component/Chip";
// import Link from "next/link";
// import { useState, useEffect } from "react";

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
//   onSelectionChange?: (selectedColor: string | null, selectedSize: string | null, updatedPrice: number) => void;
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
//   onSelectionChange,
// }: ProductDetailsProps) => {
//   const displayPrice = isDirectAdd ? discountPrice || price : price;
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);
//   const [selectedSize, setSelectedSize] = useState<string | null>(null);

//   const [availableSizes, setAvailableSizes] = useState<{ size: string; price: string; qty: string }[]>([]);
//   const [availableColors, setAvailableColors] = useState<{ color: string; price: string; qty: string }[]>([]);

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
//       ? sizeColor?.colorwithsize?.[selectedColor]?.find((item) => item.size === selectedSize)
//       : selectedColor
//       ? sizeColor?.color?.find((item) => item.color === selectedColor)
//       : selectedSize
//       ? sizeColor?.size?.find((item) => item.size === selectedSize)
//       : null;

//   const updatedPrice = selectedProduct ? parseFloat(selectedProduct.price) : displayPrice;
//   const updatedQuantity = selectedProduct ? parseInt(selectedProduct.qty) : productStock;

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
//           <div>
//             <h3>Available Colors</h3>
//             <FlexBox>
//               {Object.keys(sizeColor.colorwithsize).map((color) => (
//                 <button
//                   key={color}
//                   style={{
//                     padding: "8px 16px",
//                     margin: "5px",
//                     border: selectedColor === color ? "2px solid orange" : "1px solid gray",
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
//                 <h3>Available Sizes</h3>
//                 <FlexBox>
//                   {sizeColor.colorwithsize[selectedColor].map((item, index) => (
//                     <button
//                       key={index}
//                       style={{
//                         padding: "8px 16px",
//                         margin: "5px",
//                         border: selectedSize === item.size ? "2px solid orange" : "1px solid gray",
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
//                   onClick={() => handleSizeSelection(item.size)}
//                 >
//                   {item.size}
//                 </button>
//               ))}
//             </FlexBox>
//           </div>
//         )}

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
import Typography, { H1, H5, SemiSpan } from "@component/Typography";
import Rating from "@component/rating";
import { currency } from "@utils/utils";
import { Chip } from "@component/Chip";
import { useState, useEffect } from "react";

type B2BProductSize = {
  id: number;
  stock_quantity: number;
  base_price: number;
  options: {
    color: string | null;
    size: string;
  };
  bulk_pricing: {
    min_quantity: string;
    unit_price: number;
  }[];
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
  delivereyType: string;
  sizeColor?: {
    colorwithsize?: {
      [color: string]: { size: string; price: string; qty: string }[];
    };
    size?: { size: string; price: string; qty: string }[];
    color?: { color: string; price: string; qty: string }[];
  };
  b2bProductSize?: B2BProductSize[];
  onSelectionChange?: (
    selectedColor: string | null,
    selectedSize: string | null,
    updatedPrice: number,
    selectedQuantity?: number
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
  delivereyType,
  b2bProductSize,
  onSelectionChange,
}: ProductDetailsProps) => {
  const displayPrice = isDirectAdd ? discountPrice || price : price;
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedB2BSize, setSelectedB2BSize] = useState<string | null>(null);
  const [selectedB2BQuantity, setSelectedB2BQuantity] = useState<number>(1);
  const [availableSizes, setAvailableSizes] = useState<
    { size: string; price: string; qty: string }[]
  >([]);
  const [availableColors, setAvailableColors] = useState<
    { color: string; price: string; qty: string }[]
  >([]);

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

    if (b2bProductSize && b2bProductSize.length > 0) {
      setSelectedB2BSize(b2bProductSize[0].options.size);
      setSelectedB2BQuantity(
        parseInt(b2bProductSize[0].bulk_pricing[0].min_quantity)
      );
    }
  }, [sizeColor, b2bProductSize]);

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

  const selectedB2BProduct = b2bProductSize?.find(
    (item) => item.options.size === selectedB2BSize
  );
  const selectedBulkPrice =
    selectedB2BProduct?.bulk_pricing.find(
      (bp) => parseInt(bp.min_quantity) <= selectedB2BQuantity
    )?.unit_price || displayPrice;

  const updatedPrice = selectedProduct
    ? parseFloat(selectedProduct.price)
    : selectedBulkPrice;
  const updatedQuantity = selectedProduct
    ? parseInt(selectedProduct.qty)
    : selectedB2BProduct
    ? selectedB2BProduct.stock_quantity
    : productStock;

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(
        selectedColor,
        selectedSize || selectedB2BSize,
        updatedPrice,
        selectedB2BQuantity
      );
    }
  }, [
    selectedColor,
    selectedSize,
    selectedB2BSize,
    updatedPrice,
    selectedB2BQuantity,
    onSelectionChange,
  ]);

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
    setSelectedB2BSize(null);
  };

  const handleB2BSizeSelection = (size: string) => {
    setSelectedB2BSize(size);
    setSelectedSize(null);
    const b2bProduct = b2bProductSize?.find(
      (item) => item.options.size === size
    );
    if (b2bProduct) {
      setSelectedB2BQuantity(parseInt(b2bProduct.bulk_pricing[0].min_quantity));
    }
  };

  const handleB2BQuantityChange = (quantity: number) => {
    setSelectedB2BQuantity(quantity);
  };

  const styles = {
    container: {
      // maxWidth: "672px",
      // margin: "0 auto",
      // padding: "24px",
      // backgroundColor: "#ffffff",
      // borderRadius: "8px",
      // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    title: {
      fontSize: "30px",
      fontWeight: "700",
      color: "#1F2937",
      marginBottom: "16px",
    },
    ratingContainer: {
      marginBottom: "16px",
    },
    priceContainer: {
      marginBottom: "8px",
    },
    price: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#E94560",
    },
    originalPrice: {
      textDecoration: "line-through",
      color: "#000",
      fontSize: "18px",
      marginLeft: "8px",
    },
    chip: {
      marginLeft: "8px",
      backgroundColor: "#2563EB",
      color: "#ffffff",
      fontSize: "12px",
      fontWeight: "600",
      padding: "4px 8px",
      borderRadius: "4px",
    },
    brand: {
      fontSize: "16px",
      color: "#374151",
      marginBottom: "8px",
    },
    brandLink: {
      color: "#000",
      textDecoration: "none",
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "500",
      color: "#1F2937",
      marginBottom: "8px",
    },
    buttonContainer: {
      display: "flex",
      flexWrap: "wrap" as const,
      gap: "8px",
    },
    button: {
      padding: "18px 20px",
      borderRadius: "8px",
      border: "2px solid #D1D5DB",
      backgroundColor: "#ffffff",
      cursor: "pointer",
      transition: "all 0.2s ease",
      fontSize: "16px",
    },
    selectedButton: {
      border: "2px solid #E94560",
      backgroundColor: "#E94560",
      color: "#fff",
    },
    bulkPricingContainer: {
      marginTop: "16px",
      backgroundColor: "#F9FAFB",
      padding: "16px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    bulkPricingItem: {
      display: "flex",
      alignItems: "center",
      marginBottom: "8px",
    },
    bulkPricingText: {
      color: "#374151",
      fontSize: "14px",
    },
    warranty: {
      fontSize: "16px",
      color: "#374151",
      marginBottom: "8px",
      marginTop: "16px",
    },
    warrantyChip: {
      backgroundColor: "#FEE2E2",
      color: "#991B1B",
      padding: "4px 8px",
      borderRadius: "4px",
      // marginLeft: "8px",
    },
    stock: {
      fontSize: "16px",
      color: "#374151",
    },
    // tableContainer: {
    //   marginTop: "16px",
    // },
    // infoGrid: {
    //   backgroundColor: "#F9FAFB",
    //   borderRadius: "8px",
    //   padding: "16px",
    //   // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    //   display: "flex",
    //   gap: "24px",
    //   flexWrap: "wrap" as const,
    // },
    // infoColumn: {
    //   flex: "1",
    //   minWidth: "200px",
    //   display: "flex",
    //   flexDirection: "column" as const,
    //   gap: "16px",
    // },
    // infoItem: {
    //   display: "flex",
    //   flexDirection: "column" as const,
    //   gap: "4px",
    // },
    // infoLabel: {
    //   fontSize: "16px",
    //   fontWeight: "600",
    //   color: "#1F2937",
    // },
    // infoValue: {
    //   fontSize: "14px",
    // },
    // stockChip: {
    //   backgroundColor: updatedQuantity > 0 ? "#D1FAE5" : "#FEE2E2",
    //   color: updatedQuantity > 0 ? "#065F46" : "#991B1B",
    //   padding: "4px 8px",
    //   borderRadius: "4px",
    //   fontWeight: "500",
    // },

    tableContainer: {
      marginTop: "16px",
    },
    infoGrid: {
      backgroundColor: "#F9FAFB",
      borderRadius: "8px",
      padding: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      display: "flex",
      gap: "8px",
      flexWrap: "wrap" as const,
    },
    infoColumn: {
      flex: "1",
      minWidth: "120px",
      display: "flex",
      flexDirection: "column" as const,
      gap: "4px",
    },
    infoItem: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "2px",
      padding: "4px",
      backgroundColor: "#ffffff",
      borderRadius: "4px",
      border: "1px solid #E5E7EB",
    },
    infoLabel: {
      fontSize: "12px",
      fontWeight: "700" as const, // Explicitly typed as a valid fontWeight value
      color: "#2563EB",
      textTransform: "uppercase" as const, // Explicitly typed as "uppercase"
    },
    infoValue: {
      fontSize: "12px",
    },
    stockChip: {
      backgroundColor: updatedQuantity > 0 ? "#D1FAE5" : "#FEE2E2",
      color: updatedQuantity > 0 ? "#065F46" : "#DC2626",
      padding: "2px 6px",
      borderRadius: "4px",
      fontWeight: "500",
    },
  };

  return (
    <Box style={styles.container}>
      <H1 style={styles.title}>
        {title}{" "}
        <span
          style={{
            fontSize: "14px",
            backgroundColor: "#E94560",
            color: "#fff",
            padding: "2px 8px",
            borderRadius: "10px",
          }}
        >
          B2B
        </span>
      </H1>
      <FlexBox alignItems="center" style={styles.ratingContainer}>
        <Box style={{ margin: "0 8px" }}>
          {rating > 0 && (
            <Rating value={rating} outof={5} color="warn" readOnly />
          )}
        </Box>
      </FlexBox>

      <Box style={{ marginBottom: "24px" }}>
        {price !== 0 && (
          <FlexBox alignItems="center" style={styles.priceContainer}>
            <H5 style={styles.price}>
              {currency(updatedPrice)}
              {discountPrice && updatedPrice !== price && (
                <span style={styles.originalPrice}>{currency(price)}</span>
              )}
            </H5>
            {!!discountPrice && price !== discountPrice && (
              <Chip style={styles.chip}>
                {Math.floor(((price - discountPrice) / price) * 100)}% off
              </Chip>
            )}
          </FlexBox>
        )}



        {sizeColor?.colorwithsize && (
          <div style={{ marginBottom: "16px" }}>
            <h3 style={styles.sectionTitle}>Available Colors</h3>
            <FlexBox style={styles.buttonContainer}>
              {Object.keys(sizeColor.colorwithsize).map((color) => (
                <button
                  key={color}
                  style={{
                    ...styles.button,
                    ...(selectedColor === color ? styles.selectedButton : {}),
                  }}
                  onClick={() => handleColorSelection(color)}
                >
                  {color}
                </button>
              ))}
            </FlexBox>

            {selectedColor && (
              <>
                <h3 style={{ ...styles.sectionTitle, marginTop: "16px" }}>
                  Available Sizes
                </h3>
                <FlexBox style={styles.buttonContainer}>
                  {sizeColor.colorwithsize[selectedColor].map((item, index) => (
                    <button
                      key={index}
                      style={{
                        ...styles.button,
                        ...(selectedSize === item.size
                          ? styles.selectedButton
                          : {}),
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
          <div style={{ marginBottom: "16px" }}>
            <h3 style={styles.sectionTitle}>Available Colors</h3>
            <FlexBox style={styles.buttonContainer}>
              {sizeColor.color.map((item, index) => (
                <button
                  key={index}
                  style={{
                    ...styles.button,
                    ...(selectedColor === item.color
                      ? styles.selectedButton
                      : {}),
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
          <div style={{ marginBottom: "16px" }}>
            <h3 style={styles.sectionTitle}>Available Sizes</h3>
            <FlexBox style={styles.buttonContainer}>
              {sizeColor.size.map((item, index) => (
                <button
                  key={index}
                  style={{
                    ...styles.button,
                    ...(selectedSize === item.size
                      ? styles.selectedButton
                      : {}),
                  }}
                  onClick={() => handleSizeSelection(item.size)}
                >
                  {item.size}
                </button>
              ))}
            </FlexBox>
          </div>
        )}

        {b2bProductSize && b2bProductSize.length > 0 && (
          <div style={{ marginBottom: "16px" }}>
            <h3 style={styles.sectionTitle}>Weight Variations</h3>
            <FlexBox style={styles.buttonContainer}>
              {b2bProductSize.map((item, index) => (
                <button
                  key={index}
                  style={{
                    ...styles.button,
                    ...(selectedB2BSize === item.options.size
                      ? styles.selectedButton
                      : {}),
                  }}
                  onClick={() => handleB2BSizeSelection(item.options.size)}
                >
                  {item.options.size}
                </button>
              ))}
            </FlexBox>

            {selectedB2BSize && (
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "12px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  marginTop: "8px",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "#1F2937",
                    marginBottom: "8px",
                  }}
                >
                  Bulk Pricing:
                </div>
                {selectedB2BProduct?.bulk_pricing.map((bp, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "#1F2937",
                        marginRight: "8px",
                      }}
                    >
                      {bp.min_quantity}+ units:
                    </span>
                    <span style={{ color: "#DC2626", fontWeight: "600" }}>
                      {currency(bp.unit_price)} each
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div style={styles.tableContainer}>
          <div style={styles.infoGrid}>
            <div style={styles.infoColumn}>
              {price !== 0 && (
                <div style={styles.infoItem}>
                  <div style={styles.infoLabel}>Stock Availability</div>
                  <div style={styles.infoValue}>
                    <span style={styles.stockChip}>
                      {updatedQuantity > 0
                        ? `${updatedQuantity} Products Available`
                        : "Stock Out"}
                    </span>
                  </div>
                </div>
              )}
              <div style={styles.infoItem}>
                <div style={styles.infoLabel}>Replacement Warranty</div>
                <div style={styles.infoValue}>
                  <span style={styles.warrantyChip}>
                    {replacewarranty || "N/A"}
                  </span>
                </div>
              </div>
            </div>
            <div style={styles.infoColumn}>
              <div style={styles.infoItem}>
                <div style={styles.infoLabel}>Warranty</div>
                <div style={styles.infoValue}>
                  <span style={styles.warrantyChip}>{warranty || "N/A"}</span>
                </div>
              </div>
              <div style={styles.infoItem}>
                <div style={styles.infoLabel}>Delivered by</div>
                <div style={styles.infoValue}>
                  <span style={styles.warrantyChip}>
                    {delivereyType || "Deliver by 03-04 Jun"}
                  </span>
                </div>
              </div>
            </div>
            <div style={styles.infoColumn}>
              <div style={styles.infoItem}>
                <div style={styles.infoLabel}>Brand</div>
                <div style={styles.infoValue}>
                <span style={styles.warrantyChip}>
                    {brandName || "No"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default ProductDetails;
