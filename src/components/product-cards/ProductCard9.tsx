"use client";
import ApiBaseUrl from "api/ApiBaseUrl";
import ProductTile from "./ProductTile";

// List-view card for the listing pages. Keeps its original props and price rules
// (off is an amount taken from price), and renders through the shared ProductTile.

type ProductCard9Props = {
 off?: number;
 slug: string;
 title: string;
 price: number;
 imgUrl: string;
 rating: number;
 images: string[];
 productStock: number;
 discountPrice?: number; // Optional discount price
 totalDiscount?: number; // Optional total discount
 id?: string | number;
 productId?: string | number;
 sellerId?: string | number;
 sizecolorwithprice?: any;
 [key: string]: unknown;
};

export default function ProductCard9({
 off,
 slug,
 title,
 price,
 imgUrl,
 rating,
}: ProductCard9Props) {
 const offerPrice = off > 0 ? Number((price - off).toFixed(2)) : null;

 return (
  <ProductTile
   layout="row"
   href={`/product/${slug}`}
   imageSrc={imgUrl?.startsWith("http") ? imgUrl : `${ApiBaseUrl.ImgUrl}${imgUrl}`}
   name={title}
   rating={rating}
   price={offerPrice ?? price}
   originalPrice={offerPrice ? price : undefined}
  />
 );
}
