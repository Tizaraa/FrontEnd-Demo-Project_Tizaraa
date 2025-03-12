"use client"
import { useParams } from "next/navigation";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { useAppContext } from "@context/app-context";
import { useState } from "react";
import ProductImages from "./ProductImages";
import AddToCartButton from "./AddToCartButton";
import ProductDetails from "./ProductDetails";
import Link from "next/link";

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
  warrantyType: string,
  replacewarranty: string,
  rating: number;
  productStock: number;
  slug?: string;
  productId: string | number;
  sellerId: string | number;
  sizeColor?: {
    colorwithsize: {
      [color: string]: { size: string; price: string; qty: string }[];
    };
  };
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
}: ProductIntroProps) {
  const param = useParams();
  const { state } = useAppContext();
  const routerId = param.slug as string;

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number>(price);

  const handleSelectionChange = (color: string | null, size: string | null, updatedPrice: number) => {
    setSelectedColor(color);
    setSelectedSize(size);
    setSelectedPrice(updatedPrice);
  };

  return (
    <Box overflow="hidden">
      <Grid container justifyContent="center" spacing={16}>
        <Grid item md={6} xs={12} alignItems="center">
          <ProductImages images={images} />
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <ProductDetails
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
            onSelectionChange={handleSelectionChange}
          />
         
          {/* <AddToCartButton
            productId={productId}
            sellerId={sellerId}
            images={images}
            title={title}
            discountPrice={discountPrice}
            slug={slug}
            productStock={productStock}
            price={price} 
            productType="General"
            sizeColor={sizeColor}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            selectedPrice={selectedPrice}
          /> */}
       
            {selectedPrice === 0 ? (
             <Box mt="1rem">
               <Link href="/rfq">
                 <button
                   style={{
                     padding: "10px 20px",
                     backgroundColor: "#E94560",
                     color: "white",
                     borderRadius: "5px",
                     border: "none",
                   }}
                 >
                   Request for Quote
                 </button>
               </Link>
             </Box>
           ) : (
             <AddToCartButton
             productId={productId}
             sellerId={sellerId}
             images={images}
             title={title}
             discountPrice={discountPrice}
             slug={slug}
             productStock={productStock}
             price={price} 
             productType="General"
             sizeColor={sizeColor}
             selectedColor={selectedColor}
             selectedSize={selectedSize}
             selectedPrice={selectedPrice}
 
           />
           )}
 
        </Grid>
      </Grid>
    </Box>
  );
}