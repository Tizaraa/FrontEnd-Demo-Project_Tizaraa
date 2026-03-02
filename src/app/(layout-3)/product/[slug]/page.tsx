// import React, { Suspense } from "react";
// import { Metadata } from "next";
// import ProductDetails from "./ProductDetails";
// import ApiBaseUrl from "api/ApiBaseUrl";
// import ResponsiveCategory from "./ResponsiveCategory";
// import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png";
// import NextImage from "@component/NextImage";
// import LoadingSkeleton from "./loading"; // Import your loading component directly

// // Fetch product data (Keep this as is)
// async function fetchProductData(slug: string) {
//  try {
//   const response = await fetch(`${ApiBaseUrl.baseUrl}product/details/${slug}`, {
//    next: {
//     revalidate: 3600,
//    },
//   });

//   if (!response.ok) {
//    return null;
//   }

//   const data = await response.json();
//   if (data?.productsingledetails?.product_id) {
//    return data;
//   } else {
//    return null;
//   }
//  } catch (error) {
//   console.error("Error fetching product data:", error);
//   return null;
//  }
// }

// export async function generateStaticParams() {
//  return ["badminton-over-grips-taan-tw500s"].map((slug) => ({
//   slug,
//  }));
// }

// // Metadata (Keep this - note that this still causes a slight initial navigation delay)
// // export async function generateMetadata({
// //  params,
// // }: {
// //  params: { slug: string };
// // }): Promise<Metadata> {
// //  const productData = await fetchProductData(params.slug);
// //  if (productData && productData.seo) {
// //   const seo = productData.seo;
// //   return {
// //    title: seo.title || "Product Not Found",
// //    description: seo.description || "No description available.",
// //    keywords: seo.keywords || "products, ecommerce",
// //    openGraph: {
// //     title: seo.title || "Product Not Found",
// //     description: seo.description || "No description available.",
// //     url: seo.url || "",
// //     images: Array.isArray(seo.image) ? seo.image : [seo.image],
// //    },
// //   };
// //  } else {
// //   return {
// //    title: "Product Not Found",
// //    description: "No SEO metadata found for this product.",
// //   };
// //  }
// // }


// // Generate SEO metadata for the product page
// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }): Promise<Metadata> {
//   const productData = await fetchProductData(params.slug);
  
//   if (productData && productData.seo) {
//     const seo = productData.seo;
    
//     // Convert relative image path to absolute URL
//     const imageUrl = seo.image 
//       ? `${ApiBaseUrl.baseUrl}/${seo.image}` // Assuming seo.image is a relative path
//       : `${ApiBaseUrl.baseUrl}/default-image.jpg`; // Fallback image
    
//     return {
//       title: seo.title || "Product Not Found",
//       description: seo.description || "No description available.",
//       keywords: seo.keywords || "products, ecommerce",
//       openGraph: {
//         title: seo.title || "Product Not Found",
//         description: seo.description || "No description available.",
//         url: seo.url || `${ApiBaseUrl.baseUrl}/product/${params.slug}`,
//         images: [
//           {
//             url: imageUrl,
//             width: 1200,
//             height: 630,
//             alt: seo.title || "Product Image",
//           },
//         ],
//         type: "website",
//         siteName: seo.site_name || "Tizaraa",
//       },
//       twitter: {
//         card: "summary_large_image",
//         title: seo.title || "Product Not Found",
//         description: seo.description || "No description available.",
//         images: [imageUrl],
//       },
//     };
//   } else {
//     return {
//       title: "Product Not Found",
//       description: "No SEO metadata found for this product.",
//     };
//   }
// }

// interface Props {
//  params: { slug: string };
// }

// // 1. Create an async wrapper component for the data-dependent parts
// async function ProductContent({ slug }: { slug: string }) {
//  // This await happens inside the Suspense boundary
//  const productData = await fetchProductData(slug);

//  return (
//   <main
//    style={{
//     position: "relative",
//     background: "none",
//    }}
//   >
//    <ResponsiveCategory slug={slug} fallbackData={productData} />
//    <ProductDetails params={{ slug }} fallbackData={productData} />
//   </main>
//  );
// }

// // 2. The Main Page Component is now non-blocking (UI Shell)
// export default function ProductDetailsPage({ params }: Props) {
//  return (
//   <>
//    {/* Background image loads immediately */}
//    <NextImage
//     alt="newArrivalBanner"
//     src={tizaraa_watermark}
//     priority
//     style={{
//      position: "fixed",
//      top: "50%",
//      left: "50%",
//      transform: "translate(-50%, -20%)",
//      width: "100%",
//      height: "auto",
//      maxWidth: "1200px",
//      backgroundSize: "contain",
//      backgroundPosition: "center",
//      opacity: 0.1,
//      zIndex: 0,
//     }}
//    />

//    <Suspense fallback={<LoadingSkeleton />}>
//     <ProductContent slug={params.slug} />
//    </Suspense>
//   </>
//  );
// }



import React, { Suspense } from "react";
import { Metadata } from "next";
import ProductDetails from "./ProductDetails";
import ApiBaseUrl from "api/ApiBaseUrl";
import ResponsiveCategory from "./ResponsiveCategory";
import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png";
import NextImage from "@component/NextImage";
import LoadingSkeleton from "./loading"; // Import your loading component directly

// Force page to be fully dynamic (no static generation or caching)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Fetch product data
async function fetchProductData(slug: string) {
  try {
    // Decode the slug to handle URL-encoded characters
    const decodedSlug = decodeURIComponent(slug);

    const response = await fetch(`${ApiBaseUrl.baseUrl}product/details/${decodedSlug}`, {
      cache: 'no-store', // Use no-store to align with page-level revalidate: 0
    });

    if (!response.ok) {
      console.error(`Failed to fetch product: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    if (data?.productsingledetails?.product_id) {
      return data;
    } else {
      console.error("Product data structure invalid:", data);
      return null;
    }
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}


// Generate SEO metadata for the product page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  console.log("Generating metadata for slug:", slug);
  const productData = await fetchProductData(slug);
  console.log("Product data received:", productData ? "Found" : "Not found");


  if (productData && productData.seo) {
    const seo = productData.seo;
    console.log("SEO title found:", seo.title);


    // Convert relative image path to absolute URL
    const imageUrl = seo.image
      ? `${ApiBaseUrl.baseUrl}/${seo.image}` // Assuming seo.image is a relative path
      : `${ApiBaseUrl.baseUrl}/default-image.jpg`; // Fallback image

    return {
      title: seo.title || "Product Not Found",
      description: seo.description || "No description available.",
      keywords: seo.keywords || "products, ecommerce",
      openGraph: {
        title: seo.title || "Product Not Found",
        description: seo.description || "No description available.",
        url: seo.url || `${ApiBaseUrl.baseUrl}/product/${slug}`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: seo.title || "Product Image",
          },
        ],
        type: "website",
        siteName: seo.site_name || "Tizaraa",
      },
      twitter: {
        card: "summary_large_image",
        title: seo.title || "Product Not Found",
        description: seo.description || "No description available.",
        images: [imageUrl],
      },
    };
  } else {
    console.error("No product data or SEO found for slug:", slug);
    return {
      title: "Online Shopping in Bangladesh: Order Now from Tizaraa.com",
      description: "No SEO metadata found for this product.",
    };
  }
}

interface Props {
  params: Promise<{ slug: string }>;
}

// 1. Create an async wrapper component for the data-dependent parts
async function ProductContent({ slug }: { slug: string }) {
  // This await happens inside the Suspense boundary
  const productData = await fetchProductData(slug);

  return (
    <main
      style={{
        position: "relative",
        background: "none",
      }}
    >
      <ResponsiveCategory slug={slug} fallbackData={productData} />
      <ProductDetails params={{ slug }} fallbackData={productData} />
    </main>
  );
}

// 2. The Main Page Component is now non-blocking (UI Shell)
export default async function ProductDetailsPage({ params }: Props) {
  const { slug } = await params;

  return (
    <>
      {/* Background image loads immediately */}
      <NextImage
        alt="newArrivalBanner"
        src={tizaraa_watermark}
        priority
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -20%)",
          width: "100%",
          height: "auto",
          maxWidth: "1200px",
          backgroundSize: "contain",
          backgroundPosition: "center",
          opacity: 0.1,
          zIndex: 0,
        }}
      />

      <Suspense fallback={<LoadingSkeleton />}>
        <ProductContent slug={slug} />
      </Suspense>
    </>
  );
}
