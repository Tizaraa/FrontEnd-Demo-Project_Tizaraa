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

export default async function ShopDetails({ params }: SlugParams) {
  // const shop = await api.getShopBySlug(params.slug);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Server log:", params.slug);
    const categoryProductLoad = async () => {
      try {
        const response = await axios.get(`https://tizaraa.com/api/seller/profile/${params.slug}`);
        
        // Console log the result before setting state
        console.log("Category Products Data:", response.data.data);
        
        setProducts(response.data.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching category products");
        console.error("Error fetching category products:", error);
        // setLoading(false);
      }
    };
  
    categoryProductLoad();
  }, [params]);

  return (
    <Fragment>
      <ShopIntroCard />

      <Grid container spacing={6}>
        {/* SHOW IN LARGE DEVICE */}
        {/* <Hidden as={Grid} item md={3} xs={12} down={1024}>
          <ProductFilterCard />
        </Hidden> */}

        {/* <Grid item md={3} xs={12}>
          <ProductFilterCard />
        </Grid> */}

        {/* <Grid item md={9} xs={12}>
          <ProductDetails shop={shop} />
        </Grid> */}
         <Grid item lg={9} xs={12}>
        <CategoryRelatedProducts products={products} />
      </Grid>
      </Grid>
    </Fragment>
  );
}
