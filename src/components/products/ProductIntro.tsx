


// "use client"
// import { useParams } from "next/navigation";
// import Box from "@component/Box";
// import Grid from "@component/grid/Grid";
// import { useAppContext } from "@context/app-context";

// import { useState } from "react";
// import ProductImages from "./ProductImages";
// import SizeColorSelector from "./SizeColorSelector";
// import AddToCartButton from "./AddToCartButton";
// import ProductDetails from "./ProductDetails";
// import FlexBox from "@component/FlexBox";
// import { H6, SemiSpan } from "@component/Typography";
// import Link from "next/link";
// import BuyItNow from "./BuyItNow";
// // import BuyItNow from "./BuyItNow";


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
//   brand_slug?: string;
//   warranty: string;
//   warrantyType: string,
//   replacewarranty: string,
//   rating: number;
//   productStock: number;
//   slug?: string;
//   productId: string | number;
//   sellerId: string | number;
//   sizecolorwithprice: Array<{
//     size: string;
//     color: string;
//     price: number;
//     b2bPricing: { min_qty: number; price: number }[];
//     stock: number;
//   }>;
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
//   sizecolorwithprice, 
// }: ProductIntroProps) {
//   const param = useParams();
//   const { state } = useAppContext();
//   const routerId = param.slug as string;

//   const [selectedSize, setSelectedSize] = useState<string | null>(null);
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);


//   // Find the price based on selected size and color
//   const selectedPrice = selectedSize && selectedColor 
//     ? sizecolorwithprice.find(item => item.size === selectedSize && item.color === selectedColor)?.price 
//     : price; 

 
//   const formattedSizeColorOptions = sizecolorwithprice.map(item => ({
//     ...item,
//     stock_quantity: item.stock, 
//   }));


//   return (
//     <Box overflow="hidden">
//       <Grid container justifyContent="center" spacing={16}>
//         <Grid item md={6} xs={12} alignItems="center">
//           <ProductImages images={images} />
//         </Grid>

//         <Grid item md={6} xs={12} alignItems="center">
//           <ProductDetails
//             title={title}
//             price={selectedPrice} // Show the dynamically selected price
//             discountPrice={discountPrice}
//             totalDiscount={totalDiscount}
//             rating={rating}
//             productStock={productStock}
//             sellerShopName={sellerShopName}
//             sellerShopLogo={sellerShopLogo}
//             brandName={brandName}
//             warranty={warranty}
//             warrantyType= {warrantyType}
//               replacewarranty= {replacewarranty}
//           />
//           <SizeColorSelector
//             productId={productId} 
//             sellerId={sellerId} 
//             stockQuantity={productStock}
//             setSelectedSize={setSelectedSize} 
//             setSelectedColor={setSelectedColor} 
//             dummySizes={sizecolorwithprice} // Use API data instead of dummy
//           />
//           {/* <AddToCartButton
//             productId={productId}
//             sellerId={sellerId}
//             images={images}
//             title={title}
//             discountPrice={discountPrice}
//             slug={slug}
//             selectedSize={selectedSize} 
//             selectedColor={selectedColor} 
//             price={selectedPrice} 
//             dummySizes={formattedSizeColorOptions} 
//             selectedSpec={''} 
//             productType = "General"

//           /> */}

//             {/* Conditionally render "Add to Cart" or "Request for Quote" based on price */}
//             {selectedPrice === 0 ? (
//             <Box mt="1rem">
//               <Link href="/rfq">
//                 <button
//                   style={{
//                     padding: "10px 20px",
//                     backgroundColor: "#E94560",
//                     color: "white",
//                     borderRadius: "5px",
//                     border: "none",
//                   }}
//                 >
//                   Request for Quote
//                 </button>
//               </Link>
//             </Box>
//           ) : (
//             <AddToCartButton
//             productId={productId}
//             sellerId={sellerId}
//             images={images}
//             title={title}
//             discountPrice={discountPrice}
//             slug={slug}
//             productStock={productStock}
//             selectedSize={selectedSize} 
//             selectedColor={selectedColor} 
//             price={selectedPrice} 
//             dummySizes={formattedSizeColorOptions} 
//             selectedSpec={''} 
//             productType = "General"

//           />


//           //   <div style={{display: "flex", gap:"10px"}}>
//           //      <BuyItNow
//           //   productId={productId}
//           //   sellerId={sellerId}
//           //   images={images}
//           //   title={title}
//           //   discountPrice={discountPrice}
//           //   slug={slug}
//           //   productStock={productStock}
//           //   selectedSize={selectedSize} 
//           //   selectedColor={selectedColor} 
//           //   price={selectedPrice} 
//           //   dummySizes={formattedSizeColorOptions} 
//           //   selectedSpec={''} 
//           //   productType = "General"

//           // />
          
//           //    <AddToCartButton
//           //   productId={productId}
//           //   sellerId={sellerId}
//           //   images={images}
//           //   title={title}
//           //   discountPrice={discountPrice}
//           //   slug={slug}
//           //   productStock={productStock}
//           //   selectedSize={selectedSize} 
//           //   selectedColor={selectedColor} 
//           //   price={selectedPrice} 
//           //   dummySizes={formattedSizeColorOptions} 
//           //   selectedSpec={''} 
//           //   productType = "General"

//           // />
//           //   </div>
           
//           )}

//            <FlexBox alignItems="center" mb="1rem" mt="1rem">
//             {/* <SemiSpan>Sold By:</SemiSpan>
//             <Link href="#">
//               <H6 lineHeight="1" ml="8px">
//                 {sellerShopName} 
//               </H6>
//             </Link> */}
//           </FlexBox>
//         </Grid>
      
//       </Grid>
     
//     </Box>
//   );
// }


"use client"
import { useParams } from "next/navigation";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { useAppContext } from "@context/app-context";

import { useState } from "react";
import ProductImages from "./ProductImages";
import SizeColorSelector from "./SizeColorSelector";
import AddToCartButton from "./AddToCartButton";
import ProductDetails from "./ProductDetails";
import FlexBox from "@component/FlexBox";
import { H6, SemiSpan } from "@component/Typography";
import Link from "next/link";
import BuyItNow from "./BuyItNow";
// import BuyItNow from "./BuyItNow";


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
  brand_slug?: string;
  warranty: string;
  warrantyType: string,
  replacewarranty: string,
  rating: number;
  productStock: number;
  slug?: string;
  productId: string | number;
  sellerId: string | number;
  // sizecolorwithprice: any;
  // SizeColor: any;
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
  // sizecolorwithprice,
  // SizeColor
}: ProductIntroProps) {
  const param = useParams();
  const { state } = useAppContext();
  const routerId = param.slug as string;


  return (
    <Box overflow="hidden">
      <Grid container justifyContent="center" spacing={16}>
        <Grid item md={6} xs={12} alignItems="center">
          <ProductImages images={images} />
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <ProductDetails
            title={title}
            price={price} // Show the dynamically selected price
            discountPrice={discountPrice}
            totalDiscount={totalDiscount}
            rating={rating}
            productStock={productStock}
            sellerShopName={sellerShopName}
            sellerShopLogo={sellerShopLogo}
            brandName={brandName}
            warranty={warranty}
            warrantyType= {warrantyType}
            replacewarranty= {replacewarranty}
            // SizeColor={SizeColor}
            // sizeColor={SizeColor}
          />
         
            <AddToCartButton
            productId={productId}
            sellerId={sellerId}
            images={images}
            title={title}
            discountPrice={discountPrice}
            slug={slug}
            productStock={productStock}
            price={price} 
            productType = "General"

          />
        </Grid>
      
      </Grid>
     
    </Box>
  );
}
