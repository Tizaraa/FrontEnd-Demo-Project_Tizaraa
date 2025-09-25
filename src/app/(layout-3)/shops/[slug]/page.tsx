"use client";
import { Fragment, useEffect, useState } from "react";
// API FUNCTIONS
import api from "@utils/__api__/shops";
// GLOBAL CUSTOM COMPONENTS
import Grid from "@component/grid/Grid";
import ProductFilterCard from "@component/products/ProductFilterCard";
// PAGE SECTION COMPONENTS
import ShopIntroCard from "@sections/shop/ShopIntroCard";
import ProductDetails from "@sections/shop/ProductDetails";
// CUSTOM DATA MODEL
import { SlugParams } from "interfaces";
import axios from "axios";
import CategoryRelatedProducts from "@sections/market-1/CategoryRelatedProducts";
import SearchResult from "./SearchResult";
import Box from "@component/Box";

export default async function ShopDetails({ params }: SlugParams) {
  // const shop = await api.getShopBySlug(params.slug);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   console.log("Server log:", params.slug);
  //   const categoryProductLoad = async () => {
  //     try {
  //       const response = await axios.get(`https://frontend.tizaraa.com/api/seller/profile/${params.slug}`);

  //       // Console log the result before setting state
  //       console.log("Category Products Data:", response.data.data);

  //       setProducts(response.data.data);
  //       setLoading(false);
  //     } catch (error) {
  //       setError("Error fetching category products");
  //       console.error("Error fetching category products:", error);
  //       // setLoading(false);
  //     }
  //   };

  //   categoryProductLoad();
  // }, [params]);

  return (
    <Fragment>
      <ShopIntroCard slug={params.slug} />

      <Box pt="20px">
        <SearchResult sortOptions={sortOptions} slug={params.slug} />
      </Box>
    </Fragment>
  );
}

const sortOptions = [
  { label: "Latest", value: "Latest" },
  { label: "Price Low to High", value: "1" },
  { label: "Price High to Low", value: "2" },
];
