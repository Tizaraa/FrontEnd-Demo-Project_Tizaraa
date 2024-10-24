


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

type ProductIntroProps = {
  price: number;
  discountPrice?: number; 
  totalDiscount?: number; 
  title: string;
  images: string[];
  id: string | number;
  sellerShopName: string;
  rating: number;
  productStock: number;
  slug?: string;
  productId: string | number;
  sellerId: string | number;
  sizecolorwithprice: Array<{
    size: string;
    color: string;
    price: number;
    b2bPricing: { min_qty: number; price: number }[];
    stock: number;
  }>;
};

export default function ProductIntro({
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
  sizecolorwithprice, // Accept sizecolorwithprice
}: ProductIntroProps) {
  const param = useParams();
  const { state } = useAppContext();
  const routerId = param.slug as string;

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Find the price based on selected size and color
  const selectedPrice = selectedSize && selectedColor 
    ? sizecolorwithprice.find(item => item.size === selectedSize && item.color === selectedColor)?.price 
    : price; 

 
  const formattedSizeColorOptions = sizecolorwithprice.map(item => ({
    ...item,
    stock_quantity: item.stock, 
  }));

  return (
    <Box overflow="hidden">
      <Grid container justifyContent="center" spacing={16}>
        <Grid item md={6} xs={12} alignItems="center">
          <ProductImages images={images} />
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <ProductDetails
            title={title}
            price={selectedPrice} // Show the dynamically selected price
            discountPrice={discountPrice}
            totalDiscount={totalDiscount}
            rating={rating}
            productStock={productStock}
          />
          <SizeColorSelector
            productId={productId} 
            sellerId={sellerId} 
            stockQuantity={productStock}
            setSelectedSize={setSelectedSize} 
            setSelectedColor={setSelectedColor} 
            dummySizes={sizecolorwithprice} // Use API data instead of dummy
          />
          <AddToCartButton
            productId={productId}
            sellerId={sellerId}
            images={images}
            title={title}
            discountPrice={discountPrice}
            slug={slug}
            selectedSize={selectedSize} 
            selectedColor={selectedColor} 
            price={selectedPrice} 
            dummySizes={formattedSizeColorOptions} 
          />
        </Grid>
      </Grid>
    </Box>
  );
}
