// // "use client";
// // import { Fragment, useEffect } from "react";
// // import { useParams } from "next/navigation";
// // import { useState } from "react";
// // import Box from "@component/Box";
// // import Image from "@component/Image";
// // import Rating from "@component/rating";
// // import Avatar from "@component/avatar";
// // import Grid from "@component/grid/Grid";
// // import FlexBox from "@component/FlexBox";
// // import { Chip } from "@component/Chip";
// // import { H3, SemiSpan } from "@component/Typography";
// // import { useAppContext } from "@context/app-context";
// // import { currency } from "@utils/utils";
// // import { marginLeft } from "styled-system";
// // import AddToCartButton from "./AddToCartButton";

// // import styles from '../../components/products/productsStyle/OTproductsIntrostyle.module.css';

// // // ========================================

// // type ConfiguredItem = {
// //   Id: string;
// //   Price: {
// //     ConvertedPriceWithoutSign: number;
// //     CurrencySign: string;
// //   };
// //   Quantity: number;
// //   SalesCount: number;
// //   Configurators: {
// //     Vid: string;
// //   }[];
// // };

// // interface Attribute {
// //   ImageUrl: string;
// //   IsConfigurator: boolean;
// //   MiniImageUrl: string;
// //   OriginalPropertyName: string;
// //   OriginalValue: string;
// //   Pid: string;
// //   PropertyName: string;
// //   Value: string;
// //   Vid: string;
// // }

// // type OTProductsIntroProps = {
// //   images: string[];
// //   title: string;
// //   price: number;
// //   id: string | number;
// //   sellerShopName: string;
// //   rating: number;
// //   discountPrice?: number;
// //   totalDiscount?: number;
// //   slug?: string;
// //   productStock: number;
// //   productId: string | number;
// //   sellerId: string | number;
// //   configuredItems: ConfiguredItem[];
// //   Attributes?: Attribute[];

// // };

// // // ========================================

// // export default function OtProductsIntro({
// //   images,
// //   title,
// //   price,
// //   id,
// //   sellerShopName,
// //   rating,
// //   discountPrice,
// //   totalDiscount,
// //   slug,
// //   productStock,
// //   productId,
// //   sellerId,
// //   configuredItems,
// //   Attributes,
// // }: OTProductsIntroProps) {
// //   const param = useParams();
// //   const { state, dispatch } = useAppContext();
// //   // const [selectedImage, setSelectedImage] = useState(0);
// //   const [selectedImage, setSelectedImage] = useState(images[0] || "");
// //   const [selectedSpec, setSelectedSpec] = useState<string | null>(null);

// //   const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

// //   const [selectedPrice, setSelectedPrice] = useState<number | null>(price);

// //   const handleRowClick = (itemId: string) => {
// //     setSelectedRowId(itemId === selectedRowId ? null : itemId);
// //   };

// //   const routerId = param.slug as string;
// //   const cartItem = state.cart.find((item) => item.id === id || item.id === routerId);

// //   const handleVariantSelect = (item) => {
// //     setSelectedSpec(item.Vid);
// //     setSelectedImage(item.ImageUrl);
// //   };

// //   useEffect(() => {
// //     const initialItem = Attributes?.find(item =>
// //       configuredItems.some(configuredItem =>
// //         configuredItem.Configurators.some(config => config.Vid === item.Vid)
// //       )
// //     );

// //     if (initialItem) {
// //       setSelectedSpec(initialItem.Vid);
// //     }
// //   }, [Attributes, configuredItems]);
// //   useEffect(() => {
// //     // Update selectedPrice based on selected variant
// //     const selectedItem = configuredItems.find(item =>
// //       item.Configurators.some(config => config.Vid === selectedSpec)
// //     );

// //     if (selectedItem) {
// //       setSelectedPrice(selectedItem.Price.ConvertedPriceWithoutSign);
// //     } else {
// //       setSelectedPrice(price);
// //     }
// //   }, [selectedSpec, configuredItems, price]);

// //   // const handleImageClick = (ind: number) => () => setSelectedImage(ind);

// //   const handleCartAmountChange = (amount: number) => () => {
// //     dispatch({
// //       type: "CHANGE_CART_AMOUNT",
// //       payload: {
// //         price,
// //         qty: amount,
// //         name: title,
// //         imgUrl: images[0],
// //         id: id || routerId,
// //         discountPrice,
// //         slug,
// //         productId,
// //         sellerId,
// //       },
// //     });
// //   };
// //   return (
// //     <Box overflow="hidden">
// //       <Grid container justifyContent="center" spacing={16}>
// //         <Grid item md={6} xs={12} alignItems="center">
// //           <div>
// //         <FlexBox mb="50px" overflow="hidden" borderRadius={16} justifyContent="center">
// //   <Image
// //     width={200}
// //     height={200}
// //     src={selectedImage || images[0]}
// //     style={{ display: "block", width: "70%", height: "auto" }}
// //   />
// // </FlexBox>

// // <FlexBox overflow="auto" mb="1rem">
// //   {images.map((url, ind) => (
// //     <Box
// //       key={ind}
// //       size={70}
// //       bg="white"
// //       display="flex"
// //       cursor="pointer"
// //       border="1px solid"
// //       borderRadius="10px"
// //       alignItems="center"
// //       justifyContent="center"
// //       borderColor={selectedImage === url ? "primary.main" : "gray.400"}
// //       onClick={() => setSelectedImage(url)}
// //     >
// //       <Avatar src={url} borderRadius="10px" size={65} />
// //     </Box>
// //   ))}
// // </FlexBox>
// //           </div>
// //         </Grid>

// //         <Grid item md={6} xs={12} alignItems="center">
// //           <H3 mb="1rem">{title}</H3>

// //           <FlexBox alignItems="center" mb="1rem">
// //             <Box ml="8px" mr="8px">
// //               {rating > 0 && <Rating value={rating} outof={5} color="warn" readOnly />}
// //             </Box>
// //           </FlexBox>

// //           <Box mb="24px">
// //       <FlexBox alignItems="center">
// //         <H3 color="primary.main" mb="4px" lineHeight="1">
// //           {discountPrice ? (
// //             <>
// //               <span className={styles.currentPriceStyle}>{currency(discountPrice)}</span>
// //               <span className={styles.originalPriceStyle}>{currency(selectedPrice)}</span>
// //             </>
// //           ) : (
// //             <span>{currency(selectedPrice)}</span>
// //           )}
// //         </H3>

// //         {!!discountPrice && totalDiscount && (
// //           <Chip
// //             bg="primary.main"
// //             color="white"
// //             px="0.5rem"
// //             py="0.25rem"
// //             ml="1rem"
// //             fontWeight="600"
// //             fontSize="12px"
// //             textAlign="center"
// //           >
// //             {Math.floor(totalDiscount)}% off
// //           </Chip>
// //         )}
// //       </FlexBox>
// //       <SemiSpan color="inherit">
// //         {productStock > 0 ? "Stock Available" : "Stock Out"}
// //       </SemiSpan>
// //     </Box>

// //           <div className={styles.containerStyle}>
// //           {/* <h2 style={titleStyle}>Specification: </h2> */}
// //     <div className={styles.buttonContainerStyle}>
// //   {Attributes?.filter(item =>
// //     configuredItems.some(configItem =>
// //       configItem.Configurators.some(config => config.Vid === item.Vid)
// //     )
// //   )
// //     .reduce((uniqueItems, item) => {

// //       const hasImage = item.ImageUrl;
// //       const hasSize = item.Value && item.PropertyName === "Size";

// //       if (hasImage || !hasSize) {
// //         if (!uniqueItems.some(uniqueItem => uniqueItem.Vid === item.Vid)) {
// //           uniqueItems.push(item);
// //         }
// //       }
// //       return uniqueItems;
// //     }, [])

// //     .map((item) => (
// //       <button
// //         key={item.Vid}
// //         onClick={() => handleVariantSelect(item)}
// //         className={styles.getButtonStyle + (selectedSpec === item.Vid ? ` ${styles.getButtonStyleSelected}` : '')}
// //       >
// //         {item.ImageUrl ? (
// //           <img
// //             src={item.ImageUrl}
// //             alt={item.Value}
// //             style={{ width: "40px", height: "50px", marginRight: "5px" }}
// //           />
// //         ) : (
// //           item.Value
// //         )}
// //       </button>
// //     ))}
// // </div>

// // {/* table container starts */}
// // <div className={styles.tableContainerStyle}>
// //       {configuredItems.length > 0 && configuredItems.some(item =>
// //           item.Configurators.some(config => config.Vid === selectedSpec)
// //         ) ? (
// //         <table className={styles.tableStyle}>
// //           <thead>
// //             <tr className={styles.tableHeaderStyle}>
// //               <th className={styles.tableHeaderCellStyle}>Variants</th>
// //               <th className={styles.tableHeaderCellStyle}>Price</th>
// //               <th className={styles.tableHeaderCellStyle}>Quantity</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {configuredItems
// //               .filter(item =>
// //                 item.Configurators.some(config => config.Vid === selectedSpec)
// //               )
// //               .map((item) => (
// //                 <tr
// //                   key={item.Id}
// //                   className={`${styles.tableRowStyle} ${selectedRowId === item.Id ? styles.selectedRowStyle : ''}`}
// //                   onClick={() => handleRowClick(item.Id)}
// //                 >
// //                   <td className={styles.tableCellStyle}>
// //                     {item.Configurators.map((config, index) => {
// //                       const matchingAttribute = Attributes.find(attr => attr.Vid === config.Vid);
// //                       return (
// //                         <Fragment key={index}>
// //                           {matchingAttribute ? matchingAttribute.Value : config.Vid}
// //                           {index < item.Configurators.length - 1 && ", "}
// //                         </Fragment>
// //                       );
// //                     })}
// //                   </td>
// <td className={styles.tableCellStyle}>
//   {item.Price.CurrencySign}
//   {item.Price.ConvertedPriceWithoutSign}
// </td>
// //                   <td className={styles.tableCellStyle}>
// //                         <span>{item.Quantity}</span>
// //                   </td>
// //                 </tr>
// //               ))
// //             }
// //           </tbody>
// //         </table>
// //       ) : (
// //         <div>
// //            <AddToCartButton
// //         productId={productId}
// //         sellerId={sellerId}
// //         images={images}
// //         title={title}
// //         discountPrice={discountPrice}
// //         price={selectedPrice}
// //         slug={slug}
// //         selectedSize={''} // Empty as no size selection is needed
// //         selectedColor={''} // Empty as no color selection is needed
// //         selectedSpec={''} // Empty as no specification is needed
// //         dummySizes={[]}
// //       />
// //         </div>
// //       )}

// //     </div>
// //     {/* table container ends  */}

// //     {selectedRowId && (
// //         <div style={{ marginTop: '20px' }}>
// //           <AddToCartButton
// //             productId={productId}
// //             sellerId={sellerId}
// //             images={images}
// //             title={title}
// //             discountPrice={discountPrice}
// //             price={selectedPrice}
// //             slug={slug}
// //             selectedSize={selectedSpec}
// //             selectedSpec={selectedSpec}
// //             selectedColor={''}
// //             dummySizes={[]}

// //           />
// //         </div>
// //       )}

// // </div>

// //         </Grid>
// //       </Grid>
// //     </Box>
// //   );
// // }

// "use client";
// import { Fragment, useEffect } from "react";
// import { useParams } from "next/navigation";
// import { useState } from "react";
// import Box from "@component/Box";
// import Image from "@component/Image";
// import Rating from "@component/rating";
// import Avatar from "@component/avatar";
// import Grid from "@component/grid/Grid";
// import FlexBox from "@component/FlexBox";
// import { Chip } from "@component/Chip";
// import { H3, SemiSpan } from "@component/Typography";
// import { useAppContext } from "@context/app-context";
// import { currency } from "@utils/utils";
// import { marginLeft } from "styled-system";
// import AddToCartButton from "./AddToCartButton";

// import styles from '../../components/products/productsStyle/OTproductsIntrostyle.module.css';

// // ========================================

// type ConfiguredItem = {
//   Id: string;
//   Price: {
//     ConvertedPriceWithoutSign: number;
//     CurrencySign: string;
//   };
//   Quantity: number;
//   SalesCount: number;
//   Configurators: {
//     Vid: string;
//   }[];
//   QuantityRanges: {
//     MinQuantity: number;
//     MaxQuantity: number;
//     Price: {
//       OriginalPrice: number;
//       MarginPrice: number;
//       ConvertedPrice: string;
//     };
//   }[];
// };

// interface Attribute {
//   ImageUrl: string;
//   IsConfigurator: boolean;
//   MiniImageUrl: string;
//   OriginalPropertyName: string;
//   OriginalValue: string;
//   Pid: string;
//   PropertyName: string;
//   Value: string;
//   Vid: string;
// }

// type OTProductsIntroProps = {
//   images: string[];
//   title: string;
//   price: number;
//   id: string | number;
//   sellerShopName: string;
//   rating: number;
//   discountPrice?: number;
//   totalDiscount?: number;
//   slug?: string;
//   productStock: number;
//   productId: string | number;
//   sellerId: string | number;
//   configuredItems: ConfiguredItem[];
//   Attributes?: Attribute[];

// };

// // ========================================

// export default function OtProductsIntro({
//   images,
//   title,
//   price,
//   id,
//   sellerShopName,
//   rating,
//   discountPrice,
//   totalDiscount,
//   slug,
//   productStock,
//   productId,
//   sellerId,
//   configuredItems,
//   Attributes,
// }: OTProductsIntroProps) {
//   const param = useParams();
//   const { state, dispatch } = useAppContext();
//   // const [selectedImage, setSelectedImage] = useState(0);
//   const [selectedImage, setSelectedImage] = useState(images[0] || "");
//   const [selectedSpec, setSelectedSpec] = useState<string | null>(null);

//   const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

//   const [selectedPrice, setSelectedPrice] = useState<number | null>(price);

//   // const handleRowClick = (itemId: string) => {
//   //   setSelectedRowId(itemId === selectedRowId ? null : itemId);
//   // };

//   const routerId = param.slug as string;
//   const cartItem = state.cart.find((item) => item.id === id || item.id === routerId);

//   // const handleVariantSelect = (item) => {
//   //   setSelectedSpec(item.Vid);
//   //   setSelectedImage(item.ImageUrl);
//   // };
//   const handleVariantSelect = (item) => {
//     // Set the selected variant
//     setSelectedSpec(item.Vid);
//     setSelectedImage(item.ImageUrl);
//     setSelectedRowId(null);
//   };

//   const getSelectedAttributes = () => {
//     if (!selectedSpec || !Attributes) return "";
//     const selectedAttributes = Attributes.filter(attr =>
//       configuredItems.some(item =>
//         item.Configurators.some(config => config.Vid === selectedSpec && config.Vid === attr.Vid)
//       )
//     );
//     const attributeValues = selectedAttributes.map(attr => attr.Value);
//     return attributeValues.join(", ");
//   };

//   // const handleRowClick = (id) => {
//   //   // Set the selected row ID only
//   //   setSelectedRowId(id);
//   // };

//    const handleRowClick = (itemId: string) => {
//     setSelectedRowId(itemId === selectedRowId ? null : itemId);
//   };

//   const getSelectedRowQuantity = () => {
//     const selectedItem = configuredItems.find((item) => item.Id === selectedRowId);
//     return selectedItem?.Quantity || 0;
//   };

//   // const getDefaultQuantity = () => {
//   //   return configuredItems.length > 0 ? ConfiguredItems.find(item => item.Id)?.Quantity || 0 : productStock;
//   // };

//   useEffect(() => {
//     const initialItem = Attributes?.find(item =>
//       configuredItems.some(configuredItem =>
//         configuredItem.Configurators.some(config => config.Vid === item.Vid)
//       )
//     );

//     if (initialItem) {
//       setSelectedSpec(initialItem.Vid);
//     }
//   }, [Attributes, configuredItems]);
//   useEffect(() => {
//     // Update selectedPrice based on selected variant
//     const selectedItem = configuredItems.find(item =>
//       item.Configurators.some(config => config.Vid === selectedSpec)
//     );

//     if (selectedItem) {
//       setSelectedPrice(selectedItem.Price.ConvertedPriceWithoutSign);
//     } else {
//       setSelectedPrice(price);
//     }
//   }, [selectedSpec, configuredItems, price]);

//   // const handleImageClick = (ind: number) => () => setSelectedImage(ind);

//   const handleCartAmountChange = (amount: number) => () => {
//     dispatch({
//       type: "CHANGE_CART_AMOUNT",
//       payload: {
//         price,
//         productStock,
//         qty: amount,
//         name: title,
//         imgUrl: images[0],
//         id: id || routerId,
//         discountPrice,
//         slug,
//         productId,
//         sellerId,
//       },
//     });
//   };
//   return (
//     <Box overflow="hidden">
//       <Grid container justifyContent="center" spacing={16}>
//         <Grid item md={6} xs={12} alignItems="center">
//           <div>
//         <FlexBox mb="50px" overflow="hidden" borderRadius={16} justifyContent="center">
//   <Image
//     width={200}
//     height={200}
//     src={selectedImage || images[0]}
//     style={{ display: "block", width: "70%", height: "auto" }}
//   />
// </FlexBox>

// <FlexBox overflow="auto" mb="1rem">
//   {images.map((url, ind) => (
//     <Box
//       key={ind}
//       size={70}
//       bg="white"
//       display="flex"
//       cursor="pointer"
//       border="1px solid"
//       borderRadius="10px"
//       alignItems="center"
//       justifyContent="center"
//       borderColor={selectedImage === url ? "primary.main" : "gray.400"}
//       onClick={() => setSelectedImage(url)}
//     >
//       <Avatar src={url} borderRadius="10px" size={65} />
//     </Box>
//   ))}
// </FlexBox>
//           </div>
//         </Grid>

//         <Grid item md={6} xs={12} alignItems="center">
//           <H3 mb="1rem">{title}</H3>

//           <FlexBox alignItems="center" mb="1rem">
//             <Box ml="8px" mr="8px">
//               {rating > 0 && <Rating value={rating} outof={5} color="warn" readOnly />}
//             </Box>
//           </FlexBox>

//           <Box mb="24px">
//       <FlexBox alignItems="center">
//         <H3 color="primary.main" mb="4px" lineHeight="1">
//           {discountPrice ? (
//             <>
//               <span className={styles.currentPriceStyle}>{currency(discountPrice)}</span>
//               <span className={styles.originalPriceStyle}>{currency(selectedPrice)}</span>
//             </>
//           ) : (
//             <span>{currency(selectedPrice)}</span>
//           )}
//         </H3>

//         {!!discountPrice && totalDiscount && (
//           <Chip
//             bg="primary.main"
//             color="white"
//             px="0.5rem"
//             py="0.25rem"
//             ml="1rem"
//             fontWeight="600"
//             fontSize="12px"
//             textAlign="center"
//           >
//             {Math.floor(totalDiscount)}% off
//           </Chip>
//         )}
//       </FlexBox>
//       <SemiSpan color="inherit">
//       {selectedRowId
//       ? getSelectedRowQuantity() > 0
//         ? "Stock Available"
//         : "Stock Out"
//       : productStock > 0
//       ? "Stock Available"
//       : "Stock Out"}
//       </SemiSpan>
//     </Box>

//           <div className={styles.containerStyle}>
//           {/* <h2 style={titleStyle}>Specification: </h2> */}
//     <div className={styles.buttonContainerStyle}>
//   {Attributes?.filter(item =>
//     configuredItems.some(configItem =>
//       configItem.Configurators.some(config => config.Vid === item.Vid)
//     )
//   )
//     .reduce((uniqueItems, item) => {

//       const hasImage = item.ImageUrl;
//       const hasSize = item.Value && item.PropertyName === "Size";

//       if (hasImage || !hasSize) {
//         if (!uniqueItems.some(uniqueItem => uniqueItem.Vid === item.Vid)) {
//           uniqueItems.push(item);
//         }
//       }
//       return uniqueItems;
//     }, [])

//     .map((item) => (
//       <button
//         key={item.Vid}
//         onClick={() => handleVariantSelect(item)}
//         className={styles.getButtonStyle + (selectedSpec === item.Vid ? ` ${styles.getButtonStyleSelected}` : '')}
//       >
//         {item.ImageUrl ? (
//           <img
//             src={item.ImageUrl}
//             alt={item.Value}
//             style={{ width: "40px", height: "50px", marginRight: "5px" }}
//           />
//         ) : (
//           item.Value
//         )}
//       </button>
//     ))}
// </div>

// {/* table container starts */}
// <div className={styles.tableContainerStyle}>
//       {configuredItems.length > 0 && configuredItems.some(item =>
//           item.Configurators.some(config => config.Vid === selectedSpec)
//         ) ? (
//         <table className={styles.tableStyle}>
//           <thead>
//             <tr className={styles.tableHeaderStyle}>
//               <th className={styles.tableHeaderCellStyle}>Variants</th>
//               <th className={styles.tableHeaderCellStyle}>Price</th>
//               <th className={styles.tableHeaderCellStyle}>Quantity</th>
//             </tr>
//           </thead>
//           <tbody>
//             {configuredItems
//               .filter(item =>
//                 item.Configurators.some(config => config.Vid === selectedSpec)
//               )
//               .map((item) => (
//                 <tr
//                 key={item.Id}
//                 onClick={() => {
//                   // console.log('Selected row ID:', item.Id);
//                   handleRowClick(item.Id);
//                 }}
//                 style={{
//                   backgroundColor: selectedRowId === item.Id ? '#e0e0e0' : 'transparent',
//                   cursor: 'pointer',
//                   transition: 'background-color 0.3s ease',
//                 }}
//               >
//                   <td className={styles.tableCellStyle}>
//                     {item.Configurators.map((config, index) => {
//                       const matchingAttribute = Attributes.find(attr => attr.Vid === config.Vid);
//                       return (
//                         <Fragment key={index}>
//                           {matchingAttribute ? matchingAttribute.Value : config.Vid}
//                           {index < item.Configurators.length - 1 && ", "}
//                         </Fragment>
//                       );
//                     })}
//                   </td>
// <td className={styles.tableCellStyle}>
//   {item.Price.CurrencySign}
//   {item.QuantityRanges[0].Price.ConvertedPrice}
// </td>
//                   <td className={styles.tableCellStyle}>
//                         <span>{item.Quantity}</span>
//                   </td>
//                 </tr>
//               ))
//             }
//           </tbody>
//         </table>
//       ) : (
//         <div>
//            <AddToCartButton
//         productId={productId || id}
//         sellerId={sellerId}
//         images={images}
//         title={title}
//         discountPrice={discountPrice}
//         price={selectedPrice}
//         slug={slug}
//         productStock={productStock}
//         // selectedSize={''}
//         // selectedColor={''}
//         // selectedSpec={''}
//         // dummySizes={[]}
//         productType="Abroad"
//         // attributes={getSelectedAttributes()}
//       />
//         </div>
//       )}

//     </div>
//     {/* table container ends  */}

//     {selectedRowId && (
//         <div style={{ marginTop: '20px' }}>
//           <AddToCartButton
//             productId={id}
//             sellerId={sellerId}
//             images={images}
//             title={title}
//             discountPrice={discountPrice}
//             price={selectedPrice}
//             slug={slug}
//             productStock={getSelectedRowQuantity()}
//             // selectedSize={''}
//             // selectedSpec={selectedSpec}
//             // selectedColor={''}
//             // dummySizes={[]}
//             productType="Abroad"
//             // attributes={getSelectedAttributes()}

//           />
//         </div>
//       )}

// </div>

//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

"use client";
import { Fragment, useEffect } from "react";
import { useParams } from "next/navigation";
import { useState } from "react";
import Box from "@component/Box";
import Image from "@component/Image";
import Rating from "@component/rating";
import Avatar from "@component/avatar";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import { Chip } from "@component/Chip";
import { H3, SemiSpan } from "@component/Typography";
import { useAppContext } from "@context/app-context";
import { currency } from "@utils/utils";
import AddToCartButton from "./AddToCartButton";

import styles from "../../components/products/productsStyle/OTproductsIntrostyle.module.css";

// ========================================

type ConfiguredItem = {
  Id: string;
  Price: {
    ConvertedPriceWithoutSign: number;
    CurrencySign: string;
  };
  Quantity: number;
  SalesCount: number;
  Configurators: {
    Vid: string;
  }[];
  QuantityRanges: {
    MinQuantity: number;
    MaxQuantity: number;
    Price: {
      OriginalPrice: number;
      MarginPrice: number;
      ConvertedPrice: string;
      ConvertedPriceWithoutSign: string;
    };
  }[];
};

interface Attribute {
  ImageUrl: string;
  IsConfigurator: boolean;
  MiniImageUrl: string;
  OriginalPropertyName: string;
  OriginalValue: string;
  Pid: string;
  PropertyName: string;
  Value: string;
  Vid: string;
}

type PricingTier = {
  MinQuantity: number;
  Price: {
    ConvertedPriceWithoutSign: string;
    CurrencySign: string;
    ConvertedPrice: string;
  };
};

type OTProductsIntroProps = {
  images: string[];
  title: string;
  price: number;
  id: string | number;
  sellerShopName: string;
  rating: number;
  discountPrice?: number;
  totalDiscount?: number;
  slug?: string;
  productStock: number;
  productId: string | number;
  variantId: string | number | null;
  sellerId: string | number;
  configuredItems: ConfiguredItem[];
  Attributes?: Attribute[];
  pricingTiers?: PricingTier[];
  sizeColor?: {
    colorwithsize: {
      [color: string]: { size: string; price: string; qty: string }[];
    };
  };
};

// ========================================

export default function OtProductsIntro({
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
  sellerId,
  configuredItems,
  Attributes,
  pricingTiers,
  sizeColor,
}: OTProductsIntroProps) {
  const param = useParams();
  const { state, dispatch } = useAppContext();
  const [selectedImage, setSelectedImage] = useState(images[0] || "");
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(price);

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [currentQuantity, setCurrentQuantity] = useState(1);

  const routerId = param.slug as string;
  const cartItem = state.cart.find(
    (item) => item.id === id || item.id === routerId
  );

  // Add this useEffect to initialize the size when attributes load
  useEffect(() => {
    if (Attributes) {
      const sizeAttribute = Attributes.find(
        (attr) => attr.PropertyName.toLowerCase() === "size"
      );
      if (sizeAttribute) {
        setSelectedSize(sizeAttribute.Value);
      }
    }
  }, [Attributes]);

  const getSelectedColor = (item: ConfiguredItem): string | null => {
    if (!Attributes) return null;

    // Find color attribute in this item's configurators
    const colorAttribute = Attributes.find(
      (attr) =>
        item.Configurators.some((config) => config.Vid === attr.Vid) &&
        attr.PropertyName.toLowerCase() === "color"
    );

    return colorAttribute ? colorAttribute.Value : null;
  };

  const handleVariantSelect = (item) => {
    setSelectedSpec(item.Vid);
    setSelectedImage(item.ImageUrl);
    setSelectedRowId(null);

    // Update size if this is a size attribute
    if (item.PropertyName.toLowerCase() === "size") {
      setSelectedSize(item.Value);
    }
  };

  const getSelectedAttributes = () => {
    if (!selectedSpec || !Attributes) return "";
    const selectedAttributes = Attributes.filter((attr) =>
      configuredItems.some((item) =>
        item.Configurators.some(
          (config) => config.Vid === selectedSpec && config.Vid === attr.Vid
        )
      )
    );
    const attributeValues = selectedAttributes.map((attr) => attr.Value);
    return attributeValues.join(", ");
  };

  const handleRowClick = (itemId: string) => {
    setSelectedRowId(itemId === selectedRowId ? null : itemId);
  };

  const getSelectedRowQuantity = () => {
    const selectedItem = configuredItems.find(
      (item) => item.Id === selectedRowId
    );
    return selectedItem?.Quantity || 0;
  };

  const getDisplayPrice = (item: ConfiguredItem, quantity: number) => {
    // If item has quantity ranges, use tiered pricing logic
    if (item.QuantityRanges?.length) {
      const applicableTier = item.QuantityRanges.slice()
        .sort((a, b) => b.MinQuantity - a.MinQuantity)
        .find((tier) => quantity >= tier.MinQuantity);

      return applicableTier
        ? applicableTier.Price.ConvertedPriceWithoutSign
        : item.Price.ConvertedPriceWithoutSign;
    }

    // Fallback to selectedPrice if available, otherwise use item's base price
    return selectedPrice !== null
      ? selectedPrice
      : item.Price.ConvertedPriceWithoutSign;
  };

  useEffect(() => {
    const initialItem = Attributes?.find((item) =>
      configuredItems.some((configuredItem) =>
        configuredItem.Configurators.some((config) => config.Vid === item.Vid)
      )
    );

    if (initialItem) {
      setSelectedSpec(initialItem.Vid);
    }
  }, [Attributes, configuredItems]);

  useEffect(() => {
    const selectedItem = configuredItems.find((item) =>
      item.Configurators.some((config) => config.Vid === selectedSpec)
    );

    if (selectedItem) {
      setSelectedPrice(selectedItem.Price.ConvertedPriceWithoutSign);
    } else {
      setSelectedPrice(price);
    }
  }, [selectedSpec, configuredItems, price]);

  const handleCartAmountChange = (amount: number) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price,
        productStock,
        qty: amount,
        name: title,
        imgUrl: images[0],
        id: id || routerId,
        discountPrice,
        slug,
        productId,
        sellerId,
      },
    });
  };

  function getItemSize(item: ConfiguredItem, Attributes: Attribute[], selectedSize: string): string {
    // Try to find a size attribute in the item's configurators
    for (const config of item.Configurators) {
      const attribute = Attributes.find(attr => attr.Vid === config.Vid);
      if (attribute && 
          (attribute.PropertyName.toLowerCase().includes('size') || 
           attribute.OriginalPropertyName.toLowerCase().includes('size'))) {
        return attribute.Value;
      }
    }
    
    // If no size attribute found in configurators, return the selectedSize
    return selectedSize || '';
  }

  return (
    <Box overflow="hidden">
      <Grid container justifyContent="center" spacing={16}>
        <Grid item md={6} xs={12} alignItems="center">
          <div>
            <FlexBox
              mb="50px"
              overflow="hidden"
              borderRadius={16}
              justifyContent="center"
            >
              <Image
                width={200}
                height={200}
                src={selectedImage || images[0]}
                style={{ display: "block", width: "70%", height: "auto" }}
              />
            </FlexBox>

            <FlexBox overflow="auto" mb="1rem">
              {images.map((url, ind) => (
                <Box
                  key={ind}
                  size={70}
                  bg="white"
                  display="flex"
                  cursor="pointer"
                  border="1px solid"
                  borderRadius="10px"
                  alignItems="center"
                  justifyContent="center"
                  borderColor={
                    selectedImage === url ? "primary.main" : "gray.400"
                  }
                  onClick={() => setSelectedImage(url)}
                >
                  <Avatar src={url} borderRadius="10px" size={65} />
                </Box>
              ))}
            </FlexBox>
          </div>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H3 mb="1rem">{title}</H3>

          <FlexBox alignItems="center" mb="1rem">
            <Box ml="8px" mr="8px">
              {rating > 0 && (
                <Rating value={rating} outof={5} color="warn" readOnly />
              )}
            </Box>
          </FlexBox>

          <Box mb="24px">
            <FlexBox alignItems="center">
              {!configuredItems.some((item) => item.QuantityRanges?.length) && (
                <H3 color="primary.main" mb="4px" lineHeight="1">
                  {discountPrice ? (
                    <>
                      <span className={styles.currentPriceStyle}>
                        {currency(discountPrice)}
                      </span>
                      <span className={styles.originalPriceStyle}>
                        {currency(selectedPrice)}
                      </span>
                    </>
                  ) : (
                    <span>{currency(selectedPrice)}</span>
                  )}
                </H3>
              )}

              {!!discountPrice && totalDiscount && (
                <Chip
                  bg="primary.main"
                  color="white"
                  px="0.5rem"
                  py="0.25rem"
                  ml="1rem"
                  fontWeight="600"
                  fontSize="12px"
                  textAlign="center"
                >
                  {Math.floor(totalDiscount)}% off
                </Chip>
              )}
            </FlexBox>
            <SemiSpan color="inherit">
              {selectedRowId
                ? getSelectedRowQuantity() > 0
                  ? "Stock Available"
                  : "Stock Out"
                : productStock > 0
                ? "Stock Available"
                : "Stock Out"}
            </SemiSpan>
          </Box>

          <div style={{ display: "flex", gap: "10px", marginBottom: "5px" }}>
            {pricingTiers &&
              pricingTiers.length > 0 &&
              pricingTiers.map((tier, index) => {
                // Find the selected configured item
                const selectedConfiguredItem = configuredItems.find(
                  (item) =>
                    item.Id === selectedRowId ||
                    item.Configurators.some(
                      (config) => config.Vid === selectedSpec
                    )
                );

                // Determine if current quantity qualifies for this tier
                const isActiveTier =
                  currentQuantity >= tier.MinQuantity &&
                  (!pricingTiers[index + 1] ||
                    currentQuantity < pricingTiers[index + 1].MinQuantity);

                return (
                  <div
                    key={index}
                    style={{
                      background: isActiveTier ? "#e74c3ca3" : "#f5f5f5",
                      color: "black",
                      padding: "15px",
                      borderRadius: "8px",
                      textAlign: "center",
                      width: "120px",
                      border: isActiveTier ? "2px solid #e74c3c" : "none",
                    }}
                  >
                    <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                      {tier.Price.CurrencySign}
                      {tier.Price.ConvertedPriceWithoutSign}
                    </div>
                    <div style={{ fontSize: "12px", marginTop: "5px" }}>
                      {tier.MinQuantity} or More
                    </div>
                  </div>
                );
              })}
          </div>
          <div className={styles.containerStyle}>
            <div className={styles.buttonContainerStyle}>
              {Attributes?.filter((item) =>
                configuredItems.some((configItem) =>
                  configItem.Configurators.some(
                    (config) => config.Vid === item.Vid
                  )
                )
              )
                .reduce((uniqueItems, item) => {
                  const hasImage = item.ImageUrl;
                  const hasSize = item.Value && item.PropertyName === "Size";

                  if (hasImage || !hasSize) {
                    if (
                      !uniqueItems.some(
                        (uniqueItem) => uniqueItem.Vid === item.Vid
                      )
                    ) {
                      uniqueItems.push(item);
                    }
                  }
                  return uniqueItems;
                }, [])
                .map((item) => (
                  <button
                    key={item.Vid}
                    onClick={() => handleVariantSelect(item)}
                    className={
                      styles.getButtonStyle +
                      (selectedSpec === item.Vid
                        ? ` ${styles.getButtonStyleSelected}`
                        : "")
                    }
                  >
                    {item.ImageUrl ? (
                      <img
                        src={item.ImageUrl}
                        alt={item.Value}
                        style={{
                          width: "40px",
                          height: "50px",
                          marginRight: "5px",
                        }}
                      />
                    ) : (
                      item.Value
                    )}
                  </button>
                ))}
            </div>

            <div className={styles.tableContainerStyle}>
              {configuredItems.length > 0 &&
              configuredItems.some((item) =>
                item.Configurators.some((config) => config.Vid === selectedSpec)
              ) ? (
                <table className={styles.tableStyle}>
                  <thead>
                    <tr className={styles.tableHeaderStyle}>
                      <th className={styles.tableHeaderCellStyle}>Variants</th>
                      <th className={styles.tableHeaderCellStyle}>Price</th>
                      <th className={styles.tableHeaderCellStyle}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {configuredItems
                      .filter((item) =>
                        item.Configurators.some(
                          (config) => config.Vid === selectedSpec
                        )
                      )
                      .map((item) => (
                        <tr
                          key={item.Id}
                          onClick={() => {
                            handleRowClick(item.Id);
                          }}
                          style={{
                            cursor: "pointer",
                            transition: "background-color 0.3s ease",
                          }}
                        >
                          <td className={styles.tableCellStyle}>
                            {item.Configurators.map((config, index) => {
                              const matchingAttribute = Attributes.find(
                                (attr) => attr.Vid === config.Vid
                              );
                              return (
                                <Fragment key={index}>
                                  {matchingAttribute
                                    ? matchingAttribute.Value
                                    : config.Vid}
                                  {index < item.Configurators.length - 1 &&
                                    ", "}
                                </Fragment>
                              );
                            })}
                          </td>
                          {item.QuantityRanges?.length ? (
                            <td className={styles.tableCellStyle}>
                              {(() => {
                                // Find the applicable price based on current quantity and pricing tiers
                                const selectedItem = configuredItems.find(
                                  (item) =>
                                    item.Id === selectedRowId ||
                                    item.Configurators.some(
                                      (config) => config.Vid === selectedSpec
                                    )
                                );

                                // If no quantity ranges exist, use base price
                                if (!selectedItem?.QuantityRanges?.length) {
                                  return `${selectedItem?.Price.CurrencySign}${selectedItem?.Price.ConvertedPriceWithoutSign}`;
                                }

                                // Find the active pricing tier (matches the highlighted tier logic)
                                const activeTier = pricingTiers?.find(
                                  (tier) =>
                                    currentQuantity >= tier.MinQuantity &&
                                    (!pricingTiers[
                                      pricingTiers.indexOf(tier) + 1
                                    ] ||
                                      currentQuantity <
                                        pricingTiers[
                                          pricingTiers.indexOf(tier) + 1
                                        ].MinQuantity)
                                );

                                // Use the active tier price if found, otherwise fall back to first range
                                const displayPrice = activeTier
                                  ? activeTier.Price.ConvertedPriceWithoutSign
                                  : selectedItem.QuantityRanges[0].Price
                                      .ConvertedPriceWithoutSign;

                                return `${selectedItem.Price.CurrencySign}${displayPrice}`;
                              })()}
                            </td>
                          ) : (
                            <td className={styles.tableCellStyle}>
                              {(() => {
                                // If no quantity ranges, use base price
                                if (!item.QuantityRanges?.length) {
                                  return `${item.Price.CurrencySign}${item.Price.ConvertedPriceWithoutSign}`;
                                }

                                // Find the applicable tier price based on current quantity
                                const applicableTier =
                                  item.QuantityRanges.slice() // Create a copy
                                    .sort(
                                      (a, b) => b.MinQuantity - a.MinQuantity
                                    ) // Sort descending
                                    .find(
                                      (tier) =>
                                        currentQuantity >= tier.MinQuantity
                                    );

                                // Use tier price if found, otherwise use base price
                                const displayPrice = applicableTier
                                  ? applicableTier.Price
                                      .ConvertedPriceWithoutSign
                                  : item.Price.ConvertedPriceWithoutSign;

                                return `${item.Price.CurrencySign}${displayPrice}`;
                              })()}
                            </td>
                          )}
                          <td
                            className={styles.tableCellStyle}
                            style={{
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "5px",
                              }}
                            >
                              <AddToCartButton
                                // productId={item.Id}
                                productId={productId || id}
                                variantId={item.Id}
                                sellerId={sellerId}
                                images={images}
                                title={title}
                                discountPrice={discountPrice}
                                // price={item.QuantityRanges[0].Price.ConvertedPriceWithoutSign}
                                price={getDisplayPrice(item, currentQuantity)}
                                slug={slug}
                                productStock={item.Quantity}
                                productType="Abroad"
                                sizeColor={sizeColor}
                                selectedColor={getSelectedColor(item)}
                                // selectedSize={selectedSize}
                                selectedSize={getItemSize(item, Attributes, selectedSize)}
                                selectedPrice={getDisplayPrice(
                                  item,
                                  currentQuantity
                                )}
                                currentQuantity={currentQuantity}
                                setCurrentQuantity={setCurrentQuantity}
                              />
                              <span
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  marginTop: "-40px",
                                }}
                              >
                                {item.Quantity}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <div>
                  <AddToCartButton
                    productId={productId || id}
                    variantId={null}
                    sellerId={sellerId}
                    images={images}
                    title={title}
                    discountPrice={discountPrice}
                    price={selectedPrice}
                    slug={slug}
                    productStock={productStock}
                    productType="Abroad"
                    sizeColor={sizeColor}
                    selectedColor={selectedColor}
                    selectedSize={selectedSize}
                    selectedPrice={selectedPrice}
                    currentQuantity={currentQuantity}
                    setCurrentQuantity={setCurrentQuantity}
                  />
                </div>
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
