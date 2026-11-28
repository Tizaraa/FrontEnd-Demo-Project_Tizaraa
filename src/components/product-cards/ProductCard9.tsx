"use client";
import ApiBaseUrl from "api/ApiBaseUrl";
import ProductTile from "./ProductTile";
import CardCartControl from "./CardCartControl";

// List-view card for the listing pages. Keeps its original props and price rules
// and renders through the shared ProductTile with CardCartControl.

type ProductCard9Props = {
 off?: number;
 slug: string;
 title: string;
 price: number;
 imgUrl: string;
 rating: number;
 images?: string[];
 productStock: number;
 discountPrice?: number; // Optional discount price
 totalDiscount?: number; // Optional total discount
 id?: string | number;
 productId?: string | number;
 sellerId?: string | number;
 minOrderQty?: number;
 maxOrderQty?: number | null;
 hasVariants?: boolean;
 sizecolorwithprice?: any;
 [key: string]: unknown;
};

export default function ProductCard9({
 id,
 off,
 slug,
 title,
 price,
 imgUrl,
 rating,
 discountPrice,
 productStock,
 sellerId,
 minOrderQty,
 maxOrderQty,
 hasVariants,
}: ProductCard9Props) {
 const offerPrice =
  discountPrice && discountPrice > 0 && discountPrice < price
   ? discountPrice
   : off && off > 0 && off < price
   ? Number((price - off).toFixed(2))
   : null;
 const isRfq = price === 0 && (!off || off === 0);

 return (
  <ProductTile
   layout="row"
   href={`/product/${slug}`}
   imageSrc={imgUrl?.startsWith("http") ? imgUrl : `${ApiBaseUrl.ImgUrl}${imgUrl}`}
   name={title}
   rating={rating}
   price={offerPrice ?? price}
   originalPrice={offerPrice ? price : undefined}
   isRfq={isRfq}
   footer={
    sellerId !== undefined && sellerId !== null && id && !isRfq ? (
     <CardCartControl
      productId={id}
      sellerId={sellerId}
      slug={slug}
      title={title}
      imgUrl={imgUrl}
      price={offerPrice ?? price}
      discountPrice={discountPrice}
      productStock={productStock}
      minOrderQty={minOrderQty}
      maxOrderQty={maxOrderQty}
      hasVariants={hasVariants}
     />
    ) : undefined
   }
  />
 );
}
