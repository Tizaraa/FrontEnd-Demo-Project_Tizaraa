import React from "react";
import { Metadata } from "next";
import ProductDetails from "./ProductDetails";
import ApiBaseUrl from "api/ApiBaseUrl";
import ResponsiveCategory from "./ResponsiveCategory";

// import tizaraa_watermark from "../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png"
import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png";
import Image from "next/image";
import NextImage from "@component/NextImage";

// Fetch product data for server-side metadata
async function fetchProductData(slug: string) {
 try {
  const response = await fetch(
   `${ApiBaseUrl.baseUrl}product/details/${slug}`, // Use env var for base URL
   {
    next: {
     revalidate: 3600, // ISR: revalidate every 1
    },
   }
  );

  if (!response.ok) {
   return null;
  }

  const data = await response.json();
  if (data?.productsingledetails?.product_id) {
   return data;
  } else {
   return null;
  }
 } catch (error) {
  console.error("Error fetching product data:", error);
  return null;
 }
}

export async function generateStaticParams() {
 return ["badminton-over-grips-taan-tw500s"].map((slug) => ({
  slug,
 }));
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
   {/* Background image */}
   <NextImage
    alt="newArrivalBanner"
    src={tizaraa_watermark}
    priority
    style={{
     position: "fixed",
     top: "50%",
     left: "50%",
     transform: "translate(-50%, -20%)",
     width: "100%", // Set to 100% to ensure full responsiveness
     height: "auto", // Maintain aspect ratio
     maxWidth: "1200px", // Optional: Limit the maximum width
     backgroundSize: "contain", // Adjust the scaling behavior
     backgroundPosition: "center",
     opacity: 0.1,
     zIndex: 0,
    }}
   />

   <main
    style={{
     position: "relative",
     background: "none",
    }}
   >
    <ResponsiveCategory slug={params.slug} fallbackData={productData} />
    <ProductDetails params={params} fallbackData={productData} />
   </main>
  </>
 );
}
