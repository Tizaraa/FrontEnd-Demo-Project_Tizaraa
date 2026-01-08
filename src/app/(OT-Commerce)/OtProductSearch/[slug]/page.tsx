import React from "react";
import { Metadata } from "next";
import ProductDetails from "./ProductDetails";
import axios from "axios";
import ApiBaseUrl from "api/ApiBaseUrl";
import ResponsiveCategory from "./ResponsiveCategory";

// Fetch product data for server-side metadata
async function fetchProductData(slug: string) {
 try {
  const response = await axios.get(
   `${ApiBaseUrl.baseUrl}product/details/${slug}`
  );
  // console.log(response.data.sitemap);

  return response.data;
 } catch (error) {
  console.error("Error fetching product data:", error);
  return null;
 }
}

// Generate SEO metadata for the product page
export async function generateMetadata({
 params,
}: {
 params: { slug: string };
}): Promise<Metadata> {
 const productData = await fetchProductData(params.slug);
 if (productData && productData.seo) {
  const seo = productData.seo;
  return {
   title: seo.title || "Product Not Found",
   description: seo.description || "No description available.",
   keywords: seo.keywords || "products, ecommerce",
   openGraph: {
    title: seo.title || "Product Not Found",
    description: seo.description || "No description available.",
    url: seo.url || "",
    images: Array.isArray(seo.image) ? seo.image : [seo.image], // Ensure images are in an array
   },
  };
 } else {
  return {
   title: "Product Not Found",
   description: "No SEO metadata found for this product.",
  };
 }
}

interface Props {
 params: { slug: string };
}

// Server Component for rendering product details page
export default async function ProductDetailsPage({ params }: Props) {
 const productData = await fetchProductData(params.slug);

 return (
  <>
   <ResponsiveCategory slug={params.slug} />
   <ProductDetails params={params} />
  </>
 );
}
