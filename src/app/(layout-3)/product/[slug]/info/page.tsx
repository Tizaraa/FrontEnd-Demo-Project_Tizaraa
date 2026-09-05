import React, { Suspense } from "react";
import { Metadata } from "next";
import ApiBaseUrl from "api/ApiBaseUrl";
import Watermark from "@component/watermark/Watermark";
import LoadingSkeleton from "../loading";
import ProductInfoView from "./ProductInfoView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function fetchProductData(slug: string) {
  try {
    const decodedSlug = decodeURIComponent(slug);

    const response = await fetch(
      `${ApiBaseUrl.localApiUrl}frontend/product/details/${decodedSlug}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (data?.productsingledetails?.product_id) {
      return data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const productData = await fetchProductData(slug);

  if (productData?.productsingledetails?.product_name) {
    return {
      title: `${productData.productsingledetails.product_name} | Tizaraa`,
      description:
        productData.productsingledetails.short_description ||
        "Product details",
    };
  }

  return {
    title: "Product Not Found | Tizaraa",
    description: "No product details found.",
  };
}

interface Props {
  params: Promise<{ slug: string }>;
}

async function ProductInfoContent({ slug }: { slug: string }) {
  const productData = await fetchProductData(slug);

  if (!productData) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p>Product not found.</p>
      </div>
    );
  }

  return <ProductInfoView productData={productData} />;
}

export default async function ProductInfoPage({ params }: Props) {
  const { slug } = await params;

  return (
    <>
      <Watermark />
      <Suspense fallback={<LoadingSkeleton />}>
        <ProductInfoContent slug={slug} />
      </Suspense>
    </>
  );
}
