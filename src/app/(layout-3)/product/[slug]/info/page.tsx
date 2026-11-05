import React, { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchProductDetail } from "@lib/customerApiServer";
import Watermark from "@component/watermark/Watermark";
import LoadingSkeleton from "../loading";
import ProductInfoView from "./ProductInfoView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Shared with generateMetadata (one API call per request). A rate limit or an
// outage is not the same as a missing product, so the result says which it was.
const fetchProductData = fetchProductDetail;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await fetchProductData(slug);

  if (result.status === "not_found") notFound();

  const productData = result.status === "ok" ? result.data : null;

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
  const result = await fetchProductData(slug);

  if (result.status === "not_found") notFound();

  if (result.status !== "ok") {
    const message =
      result.status === "rate_limited"
        ? `Too many requests right now. Please refresh in ${result.retryAfter} seconds.`
        : "We couldn't load this product right now. Please refresh the page.";

    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p>{message}</p>
      </div>
    );
  }

  return <ProductInfoView productData={result.data} />;
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
