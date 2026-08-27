"use client";
import { useParams } from "next/navigation";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { useAppContext } from "@context/app-context";
import { useEffect, useState } from "react";
import axios from "@lib/axiosClient";
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
 unitOfMeasure?: { id: number; name: string; symbol: string } | null;
 warranty: string;
 warrantyType: string;
 replacewarranty: string;
 rating: number;
 productStock: number;
 minOrderQty?: number;
 maxOrderQty?: number | null;
 slug?: string;
 productId: string | number;
 sellerId: string | number;
 sizeColor?: {
  colorwithsize: {
   [color: string]: { size: string; price: string; qty: string }[];
  };
 };
 campaignBannerImage?: string;
 campaignSlug?: string;
};

export default function ProductIntro({
 images,
 title,
 price,
 id,
 sellerShopName,
 sellerShopLogo,
 brandName,
 unitOfMeasure,
 warranty,
 warrantyType,
 replacewarranty,
 rating,
 discountPrice,
 totalDiscount,
 slug,
 productStock,
 minOrderQty,
 maxOrderQty,
 productId,
 sellerId,
 sizeColor,
 campaignBannerImage,
 campaignSlug,
}: ProductIntroProps) {
 const param = useParams();
 const { state } = useAppContext();
 const routerId = param.slug as string;

 const [selectedColor, setSelectedColor] = useState<string | null>(null);
 const [selectedSize, setSelectedSize] = useState<string | null>(null);
 const [selectedPrice, setSelectedPrice] = useState<number>(price);

 // The stars under the title come from the same stats the Review tab shows, so
 // the two never disagree.
 const [reviewStats, setReviewStats] = useState<{
  average: number;
  total: number;
 } | null>(null);

 useEffect(() => {
  let active = true;

  axios
   .get(`products/${productId}/reviews`)
   .then((response) => {
    if (!active) return;
    const stats = response.data?.stats;
    setReviewStats({
     average: Number(stats?.average) || 0,
     total: Number(stats?.total) || 0,
    });
   })
   .catch(() => {
    if (active) setReviewStats(null);
   });

  return () => {
   active = false;
  };
 }, [productId]);

 const handleSelectionChange = (
  color: string | null,
  size: string | null,
  updatedPrice: number
 ) => {
  setSelectedColor(color);
  setSelectedSize(size);
  setSelectedPrice(updatedPrice);
 };

 return (
  <Box overflow="hidden">
   <Grid container justifyContent="center" spacing={8}>
    <Grid item md={6} xs={12} alignItems="center">
     <ProductImages images={images} />
    </Grid>

    <Grid item md={6} xs={12} alignItems="center">
     <ProductDetails
      title={title}
      price={price}
      discountPrice={discountPrice}
      totalDiscount={totalDiscount}
      rating={reviewStats ? reviewStats.average : rating}
      reviewCount={reviewStats?.total}
      productStock={productStock}
      sellerShopName={sellerShopName}
      sellerShopLogo={sellerShopLogo}
      brandName={brandName}
      unitOfMeasure={unitOfMeasure}
      warranty={warranty}
      warrantyType={warrantyType}
      replacewarranty={replacewarranty}
      sizeColor={sizeColor}
      onSelectionChange={handleSelectionChange}
      campaignBannerImage={campaignBannerImage}
      campaignSlug={campaignSlug}
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
          cursor: "pointer",
         }}
        >
         Request for Quote
        </button>
       </Link>
      </Box>
     ) : (
      <Box mt="1.5rem">
       <AddToCartButton
       productId={productId}
       variantId={""}
       sellerId={sellerId}
       images={images}
       title={title}
       discountPrice={discountPrice}
       slug={slug}
       productStock={productStock}
       minOrderQty={minOrderQty}
       maxOrderQty={maxOrderQty}
       price={price}
       productType="General"
       sizeColor={sizeColor}
       selectedColor={selectedColor}
       selectedSize={selectedSize}
       selectedPrice={selectedPrice}
       />
      </Box>
     )}
    </Grid>
   </Grid>
  </Box>
 );
}
