"use client";
import FlexBox from "@component/FlexBox";
import Pagination from "@component/pagination";
import { SemiSpan } from "@component/Typography";
import { ProductCard9 } from "@component/product-cards";
import Product from "@models/product.model";
import { ListingRows } from "@component/listing/Listing";
import ApiBaseUrl from "api/ApiBaseUrl";

// ==========================================================
type Props = {
 products: Product[];
 totalProducts: number; // Total number of products from API
 currentPage: number; // Current page number
 productsPerPage: number; // Number of products per page
 onPageChange: (page: number) => void; // Handler for page change
};
// ==========================================================

export default function ProductListView({
 products,
 totalProducts,
 currentPage,
 productsPerPage,
 onPageChange,
}: Props) {
 return (
  <ListingRows>
   {products.map((item) => (
    <ProductCard9
     key={item.id}
     id={item?.id || ""}
     productId={item?.id || ""}
     slug={item?.slug || ""}
     price={item?.original_price || item?.price || 0}
     discountPrice={
      item?.original_price && item.original_price !== item.price
       ? (item?.price || 0)
       : (item?.discount_price || 0)
     }
     productStock={item?.product_stock || 0}
     title={item?.title || "No Title"}
     off={item?.discount || 0}
     images={
      item?.images?.map((image) => `${ApiBaseUrl.ImgUrl}${image}`) || []
     }
     imgUrl={
      item?.thumbnail
       ? item.thumbnail.startsWith("http")
         ? item.thumbnail
         : `${ApiBaseUrl.ImgUrl}${item.thumbnail}`
       : ""
     }
     rating={item?.rating || 0}
     sellerId={item?.seller_id}
     minOrderQty={item?.min_order_qty}
     maxOrderQty={item?.max_order_qty}
     hasVariants={item?.has_variants}
    />
   ))}

   {/* <FlexBox flexWrap="wrap" justifyContent="space-between" alignItems="center" mt="32px">
        <SemiSpan>
          Showing {(currentPage - 1) * productsPerPage + 1}-{Math.min(currentPage * productsPerPage, totalProducts)} of {totalProducts} Products
        </SemiSpan>
        <Pagination 
          pageCount={Math.ceil(totalProducts / productsPerPage)} 
          onChange={onPageChange} 
        />
      </FlexBox> */}
  </ListingRows>
 );
}
