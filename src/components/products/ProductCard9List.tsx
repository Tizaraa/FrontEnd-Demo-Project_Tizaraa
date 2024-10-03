
"use client";
import { Fragment } from "react";
import FlexBox from "@component/FlexBox";
import Pagination from "@component/pagination";
import { SemiSpan } from "@component/Typography";
import { ProductCard9 } from "@component/product-cards";
import Product from "@models/product.model";

// ==========================================================
type Props = {
  products: Product[];
  totalProducts: number; // Total number of products from API
  currentPage: number; // Current page number
  productsPerPage: number; // Number of products per page
  onPageChange: (page: number) => void; // Handler for page change
};
// ==========================================================

export default function ProductListView({ products, totalProducts, currentPage, productsPerPage, onPageChange }: Props) {
  return (
    <Fragment>
      {products.map((item) => (
        <ProductCard9
          mb="1.25rem"
          id={item.id}
          key={item.id}
          slug={item.slug}
          price={item.price}
          title={item.title}
          off={item.discount}
          rating={item.rating}
          images={item.images}
          imgUrl={item.thumbnail}
          categories={item.categories}
          productId={item.id}
          sellerId={item.id}

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
    </Fragment>
  );
}
