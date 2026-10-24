"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import CategorySectionCreator from "@component/CategorySectionCreator";
import ProductTile from "@component/product-cards/ProductTile";
import styles from "./JustForYouParoducts.module.css";
import BeatLoader from "react-spinners/BeatLoader";
import ApiBaseUrl from "api/ApiBaseUrl";
import useFetcher from "@hook/useFetcher";

const ProductGrid = styled.div`
 display: grid;
 grid-template-columns: repeat(5, minmax(0, 1fr));
 gap: 16px;

 @media (max-width: 1023px) {
  grid-template-columns: repeat(3, minmax(0, 1fr));
 }

 @media (max-width: 767px) {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
 }
`;

const JustForYouProducts = () => {
 const [currentPage, setCurrentPage] = useState(1);
 const [products, setProducts] = useState([]);
 const { data, isLoading } = useFetcher(
  `frontend/latest/justoforyou/product/view?page=${currentPage}`
 );

 useEffect(() => {
  if (data?.data) {
   if (currentPage > 1) {
    setProducts((prevProducts) => [...prevProducts, ...data?.data]);
   } else {
    setProducts(data?.data || []);
   }
  }
 }, [data]);

 const handleLoadMore = () => {
  setCurrentPage(currentPage + 1);
 };

 return (
  <CategorySectionCreator title="Just For You">
   {products.length > 0 ? (
    <ProductGrid>
     {products.map((item, i) => (
      <ProductTile
       key={i}
       href={`/product/${item.product_slug}`}
       imageSrc={item.product_thumbnail?.startsWith("http") ? item.product_thumbnail : `${ApiBaseUrl.ImgUrl}${item.product_thumbnail}`}
       name={item.product_name}
       rating={item.rating}
       isRfq={item.selling_price == 0}
       price={item.discount_price ?? item.selling_price}
       originalPrice={item.selling_price}
      />
     ))}
    </ProductGrid>
   ) : (
    <p>No products available</p>
   )}

   <div className={styles.buttonStyle}>
    <button
     className={styles.loadMore}
     onClick={handleLoadMore}
     disabled={isLoading}
    >
     {isLoading ? <BeatLoader size={10} color="currentColor" /> : "Load more"}
    </button>
   </div>
  </CategorySectionCreator>
 );
};

export default JustForYouProducts;
