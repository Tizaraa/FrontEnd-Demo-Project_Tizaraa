// "use client";
// import { useParams } from "next/navigation";
// import Box from "@component/Box";
// import Grid from "@component/grid/Grid";
// import { useAppContext } from "@context/app-context";
// import { useState } from "react";
// import ProductImages from "./ProductImages";
// import AddToCartButton from "./AddToCartButton";
// import B2BProductDetails from "./B2BProductDetails";
// import Link from "next/link";

// type B2BProductSize = {
//   id: number;
//   stock_quantity: number;
//   base_price: number;
//   options: {
//     color: string | null;
//     size: string;
//   };
//   bulk_pricing: {
//     min_quantity: string;
//     unit_price: number;
//   }[];
// };

// type ProductIntroProps = {
//   price: number;
//   discountPrice?: number;
//   totalDiscount?: number;
//   title: string;
//   images: string[];
//   id: string | number;
//   sellerShopName: string;
//   sellerShopLogo: string;
//   brandName: string;
//   warranty: string;
//   warrantyType: string;
//   replacewarranty: string;
//   rating: number;
//   productStock: number;
//   slug?: string;
//   productId: string | number;
//   sellerId: string | number;
//   sizeColor?: {
//     colorwithsize?: {
//       [color: string]: { size: string; price: string; qty: string }[];
//     };
//     size?: { size: string; price: string; qty: string }[];
//     color?: { color: string; price: string; qty: string }[];
//   };
//   b2bProductSize?: B2BProductSize[];
//   delivereyType?: string;
// };

// export default function ProductIntro({
//   images,
//   title,
//   price,
//   id,
//   sellerShopName,
//   sellerShopLogo,
//   brandName,
//   warranty,
//   warrantyType,
//   replacewarranty,
//   rating,
//   discountPrice,
//   totalDiscount,
//   slug,
//   productStock,
//   productId,
//   sellerId,
//   sizeColor,
//   b2bProductSize,
//   delivereyType,
// }: ProductIntroProps) {
//   const param = useParams();
//   const { state } = useAppContext();
//   const routerId = param.slug as string;

//   const [selectedColor, setSelectedColor] = useState<string | null>(null);
//   const [selectedSize, setSelectedSize] = useState<string | null>(null);
//   const [selectedPrice, setSelectedPrice] = useState<number>(price);
//   const [selectedB2BQuantity, setSelectedB2BQuantity] = useState<number>(1);

//   const handleSelectionChange = (
//     color: string | null,
//     size: string | null,
//     updatedPrice: number,
//     selectedQuantity?: number
//   ) => {
//     setSelectedColor(color);
//     setSelectedSize(size);
//     setSelectedPrice(updatedPrice);
//     if (selectedQuantity !== undefined) {
//       setSelectedB2BQuantity(selectedQuantity);
//     }
//   };

//   const styles = {
//     rfqButton: {
//       padding: "10px 20px",
//       backgroundColor: "#E94560",
//       color: "#ffffff",
//       borderRadius: "5px",
//       border: "none",
//       cursor: "pointer",
//       fontSize: "16px",
//       fontWeight: "500",
//     },
//     rfqContainer: {
//       marginTop: "16px",
//     },
//   };

//   return (
//     <Box style={{ overflow: "hidden" }}>
//       <Grid container justifyContent="center" spacing={16}>
//         <Grid item md={6} xs={12} alignItems="center">
//           <ProductImages images={images} />
//         </Grid>

//         <Grid item md={6} xs={12} alignItems="center">
//           <B2BProductDetails
//             title={title}
//             price={price}
//             discountPrice={discountPrice}
//             totalDiscount={totalDiscount}
//             rating={rating}
//             productStock={productStock}
//             sellerShopName={sellerShopName}
//             sellerShopLogo={sellerShopLogo}
//             brandName={brandName}
//             warranty={warranty}
//             warrantyType={warrantyType}
//             replacewarranty={replacewarranty}
//             sizeColor={sizeColor}
//             b2bProductSize={b2bProductSize}
//             onSelectionChange={handleSelectionChange}
//             delivereyType={delivereyType}
//           />

//           {selectedPrice === 0 ? (
//             <Box style={styles.rfqContainer}>
//               <Link href="/rfq">
//                 <button style={styles.rfqButton}>Request for Quote</button>
//               </Link>
//             </Box>
//           ) : (
//             <AddToCartButton
//               productId={productId}
//               variantId={""}
//               sellerId={sellerId}
//               images={images}
//               title={title}
//               discountPrice={discountPrice}
//               slug={slug}
//               productStock={productStock}
//               price={selectedPrice}
//               productType="General"
//               sizeColor={sizeColor}
//               selectedColor={selectedColor}
//               selectedSize={selectedSize}
//               selectedPrice={selectedPrice}
//               // selectedB2BQuantity={selectedB2BQuantity}
//             />
//           )}
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// "use client";
// import { useParams } from "next/navigation";
// import Box from "@component/Box";
// import Grid from "@component/grid/Grid";
// import { useAppContext } from "@context/app-context";
// import { useState } from "react";
// import ProductImages from "./ProductImages";
// import AddToCartButton from "./AddToCartButton";
// import B2BProductDetails from "./B2BProductDetails";
// import Link from "next/link";

// type B2BProductSize = {
//   id: number;
//   stock_quantity: number;
//   base_price: number;
//   options: {
//     color: string | null;
//     size: string;
//   };
//   bulk_pricing: {
//     min_quantity: string;
//     unit_price: number;
//   }[];
// };

// type ProductIntroProps = {
//   price: number;
//   discountPrice?: number;
//   totalDiscount?: number;
//   title: string;
//   images: string[];
//   id: string | number;
//   sellerShopName: string;
//   sellerShopLogo: string;
//   brandName: string;
//   warranty: string;
//   warrantyType: string;
//   replacewarranty: string;
//   rating: number;
//   productStock: number;
//   slug?: string;
//   productId: string | number;
//   sellerId: string | number;
//   sizeColor?: {
//     colorwithsize?: {
//       [color: string]: { size: string; price: string; qty: string }[];
//     };
//     size?: { size: string; price: string; qty: string }[];
//     color?: { color: string; price: string; qty: string }[];
//   };
//   b2bProductSize?: B2BProductSize[];
//   delivereyType?: string;
// };

// export default function ProductIntro({
//   images,
//   title,
//   price,
//   id,
//   sellerShopName,
//   sellerShopLogo,
//   brandName,
//   warranty,
//   warrantyType,
//   replacewarranty,
//   rating,
//   discountPrice,
//   totalDiscount,
//   slug,
//   productStock,
//   productId,
//   sellerId,
//   sizeColor,
//   b2bProductSize,
//   delivereyType,
// }: ProductIntroProps) {
//   const param = useParams();
//   const { state } = useAppContext();
//   const routerId = param.slug as string;

//   const [selectedColor, setSelectedColor] = useState<string | null>(null);
//   const [selectedSize, setSelectedSize] = useState<string | null>(null);
//   const [selectedPrice, setSelectedPrice] = useState<number>(price);
//   const [selectedB2BQuantity, setSelectedB2BQuantity] = useState<number>(1);

//   const handleSelectionChange = (
//     color: string | null,
//     size: string | null,
//     updatedPrice: number,
//     selectedQuantity?: number
//   ) => {
//     setSelectedColor(color);
//     setSelectedSize(size);
//     setSelectedPrice(updatedPrice);
//     if (selectedQuantity !== undefined) {
//       setSelectedB2BQuantity(selectedQuantity);
//     }
//   };

//   const styles = {
//     rfqButton: {
//       padding: "10px 20px",
//       backgroundColor: "#E94560",
//       color: "#ffffff",
//       borderRadius: "5px",
//       border: "none",
//       cursor: "pointer",
//       fontSize: "16px",
//       fontWeight: "500",
//     },
//     rfqContainer: {
//       marginTop: "16px",
//     },
//   };

//   return (
//     <Box style={{ overflow: "hidden" }}>
//       <Grid container justifyContent="center" spacing={16}>
//         <Grid item md={6} xs={12} alignItems="center">
//           <ProductImages images={images} />
//         </Grid>

//         <Grid item md={6} xs={12} alignItems="center">
//           <B2BProductDetails
//             title={title}
//             price={price}
//             discountPrice={discountPrice}
//             totalDiscount={totalDiscount}
//             rating={rating}
//             productStock={productStock}
//             sellerShopName={sellerShopName}
//             sellerShopLogo={sellerShopLogo}
//             brandName={brandName}
//             warranty={warranty}
//             warrantyType={warrantyType}
//             replacewarranty={replacewarranty}
//             sizeColor={sizeColor}
//             b2bProductSize={b2bProductSize}
//             onSelectionChange={handleSelectionChange}
//             delivereyType={delivereyType}
//           />

//           {selectedPrice === 0 ? (
//             <Box style={styles.rfqContainer}>
//               <Link href="/rfq">
//                 <button style={styles.rfqButton}>Request for Quote</button>
//               </Link>
//             </Box>
//           ) : (
//             <AddToCartButton
//               productId={productId}
//               variantId={""}
//               sellerId={sellerId}
//               images={images}
//               title={title}
//               discountPrice={discountPrice}
//               slug={slug}
//               productStock={productStock}
//               price={selectedPrice}
//               productType="General"
//               sizeColor={sizeColor}
//               selectedColor={selectedColor}
//               selectedSize={selectedSize}
//               selectedPrice={selectedPrice}
//               selectedB2BQuantity={selectedB2BQuantity}
//             />
//           )}
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

"use client";
import { useParams } from "next/navigation";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { useAppContext } from "@context/app-context";
import { useState } from "react";
import ProductImages from "./ProductImages";
import AddToCartButton from "./AddToCartButton";
import B2BProductDetails from "./B2BProductDetails";
import Link from "next/link";

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

type ProductIntroProps = {
 price: number;
 discountPrice?: number;
 totalDiscount?: number;
 title: string;
 images: string[];
 id: string | number;
 sellerShopName: string;
 sellerShopLogo: string;
 brandName: string;
 warranty: string;
 warrantyType: string;
 replacewarranty: string;
 rating: number;
 productStock: number;
 slug?: string;
 productId: string | number;
 sellerId: string | number;
 sizeColor?: {
  colorwithsize?: {
   [color: string]: { size: string; price: string; qty: string }[];
  };
  size?: { size: string; price: string; qty: string }[];
  color?: { color: string; price: string; qty: string }[];
 };
 b2bProductSize?: B2BProductSize[];
 delivereyType?: string;
};

export default function ProductIntro({
 images,
 title,
 price,
 id,
 sellerShopName,
 sellerShopLogo,
 brandName,
 warranty,
 warrantyType,
 replacewarranty,
 rating,
 discountPrice,
 totalDiscount,
 slug,
 productStock,
 productId,
 sellerId,
 sizeColor,
 b2bProductSize,
 delivereyType,
}: ProductIntroProps) {
 const param = useParams();
 const { state } = useAppContext();
 const routerId = param.slug as string;

 const [selectedColor, setSelectedColor] = useState<string | null>(null);
 const [selectedSize, setSelectedSize] = useState<string | null>(null);
 const [selectedPrice, setSelectedPrice] = useState<number>(price);
 const [selectedB2BQuantity, setSelectedB2BQuantity] = useState<number>(1);
 const [currentQuantity, setCurrentQuantity] = useState<number>(1);

 const handleSelectionChange = (
  color: string | null,
  size: string | null,
  updatedPrice: number,
  selectedQuantity?: number
 ) => {
  setSelectedColor(color);
  setSelectedSize(size);
  setSelectedPrice(updatedPrice);
  if (selectedQuantity !== undefined) {
   setSelectedB2BQuantity(selectedQuantity);
  }
 };

 const styles = {
  rfqButton: {
   padding: "10px 20px",
   backgroundColor: "#E94560",
   color: "#ffffff",
   borderRadius: "5px",
   border: "none",
   cursor: "pointer",
   fontSize: "16px",
   fontWeight: "500",
  },
  rfqContainer: {
   marginTop: "16px",
  },
 };

 return (
  <Box style={{ overflow: "hidden" }}>
   <Grid container justifyContent="center" spacing={16}>
    <Grid item md={6} xs={12} alignItems="center">
     <ProductImages images={images} />
    </Grid>

    <Grid item md={6} xs={12} alignItems="center">
     <B2BProductDetails
      title={title}
      price={price}
      discountPrice={discountPrice}
      totalDiscount={totalDiscount}
      rating={rating}
      productStock={productStock}
      sellerShopName={sellerShopName}
      sellerShopLogo={sellerShopLogo}
      brandName={brandName}
      warranty={warranty}
      warrantyType={warrantyType}
      replacewarranty={replacewarranty}
      sizeColor={sizeColor}
      b2bProductSize={b2bProductSize}
      onSelectionChange={handleSelectionChange}
      delivereyType={delivereyType}
      currentQuantity={currentQuantity}
     />

     {selectedPrice === 0 ? (
      <Box style={styles.rfqContainer}>
       <Link href="/rfq">
        <button style={styles.rfqButton}>Request for Quote</button>
       </Link>
      </Box>
     ) : (
      <AddToCartButton
       productId={productId}
       variantId={""}
       sellerId={sellerId}
       images={images}
       title={title}
       discountPrice={discountPrice}
       slug={slug}
       productStock={productStock}
       price={selectedPrice}
       productType="General"
       sizeColor={sizeColor}
       selectedColor={selectedColor}
       selectedSize={selectedSize}
       selectedPrice={selectedPrice}
       currentQuantity={currentQuantity}
       setCurrentQuantity={setCurrentQuantity}
      />
     )}
    </Grid>
   </Grid>
  </Box>
 );
}
