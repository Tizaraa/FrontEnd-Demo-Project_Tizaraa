// import React from 'react';
// import { Fragment } from "react";
// import axios from "axios";
// import ProductIntro from "@component/products/ProductIntro";
// import ProductView from "@component/products/ProductView";
// import RelatedProducts from "@component/products/RelatedProducts";
// import ApiBaseUrl from "api/ApiBaseUrl";
// //import ShippingInfo from "./shippingInfo";

// // Fetch product data including SEO and details in a single API call
// async function fetchProductData(slug: string) {

//   const sellerNameStyle: React.CSSProperties = {
//     fontSize: '18px',
//     fontWeight: 'bold',
//     marginBottom: '5px',
//   };

//   const verifiedStyle: React.CSSProperties = {
//     color: '#008000',
//     marginRight: '5px',
//   };

//   try {
//     const response = await axios.get(
//       `${ApiBaseUrl.baseUrl}product/details/${slug}`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching product data:", error.message);
//     return null;
//   }
// }

// // Generate metadata for the product details page
// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const productData = await fetchProductData(params.slug);
//   if (productData?.seo) {
//     const seo = productData.seo;
//     return {
//       title: seo.title,
//       description: seo.description,
//       keywords: seo.keywords,
//       openGraph: {
//         title: seo.title,
//         description: seo.description,
//         url: seo.url,
//         images: seo.image,
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
//   params: { slug: string };
// }

// export default async function ProductDetails({ params }: Props) {
//   const containerStyle: React.CSSProperties = {
//     fontFamily: 'Arial, sans-serif',
//     maxWidth: '400px',
//     margin: '0 auto',
//     padding: '20px',
//     boxSizing: 'border-box',
//   };

//   const sectionStyle: React.CSSProperties = {
//     marginBottom: '20px',
//   };

//   const headingStyle: React.CSSProperties = {
//     fontSize: '24px',
//     fontWeight: 'bold',
//     marginBottom: '10px',
//   };

//   const itemStyle: React.CSSProperties = {
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: '10px',
//   };

//   const iconStyle: React.CSSProperties = {
//     width: '30px',
//     height: '30px',
//     marginRight: '10px',
//     backgroundColor: '#ff8c00',
//     borderRadius: '50%',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     color: 'white',
//     fontSize: '16px',
//   };

//   const textStyle: React.CSSProperties = {
//     fontSize: '16px',
//   };

//   const linkStyle: React.CSSProperties = {
//     color: '#000',
//     textDecoration: 'underline',
//   };

//   const sellerBoxStyle: React.CSSProperties = {
//     backgroundColor: '#f0f0f0',
//     padding: '15px',
//     borderRadius: '5px',
//   };

//   const sellerNameStyle: React.CSSProperties = {
//     fontSize: '18px',
//     fontWeight: 'bold',
//     marginBottom: '5px',
//   };

//   const verifiedStyle: React.CSSProperties = {
//     color: '#008000',
//     marginRight: '5px',
//   };
//   const productData = await fetchProductData(params.slug);

//   if (!productData || !productData.productsingledetails) {
//     return (
//       <div>Product not found or there was an error loading the product.</div>
//     );
//   }

//   const product = productData.productsingledetails;
//   const sizecolorwithprice = productData.SizeColor.sizecolorwithprice;
//   const productImages = productData.productmultiimages;
//   const images = productImages.map((img: any) => img.product_img);
//   const description = product.short_description;

//   return (
//     <Fragment>
//       <div style={{display: "flex", gap:"10px"}}>
//         <ProductIntro
//           id={product.id}
//           price={product.seeling_price}
//           title={product.product_name}
//           images={images}
//           sellerShopName={product.seller_shop_name}
//           rating={product.product_rating}
//           discountPrice={product.discount_price}
//           totalDiscount={product.total_discount}
//           productStock={product.product_stock}
//           productId={product.product_id}
//           sellerId={product.seller_shop_id}
//           sizecolorwithprice={sizecolorwithprice} // Pass the sizecolorwithprice data
//           slug={params.slug}
//         />
//         {/* <ShippingInfo /> */}
//         <div style={containerStyle}>
//       <div style={sectionStyle}>
//         <h2 style={headingStyle}>Shipping</h2>
//         <div style={itemStyle}>
//           <span style={iconStyle}>🚚</span>
//           <span style={textStyle}>Instant delivery</span>
//         </div>
//       </div>

//       <div style={sectionStyle}>
//         <h2 style={headingStyle}>Payments</h2>
//         <div style={itemStyle}>
//           <span style={iconStyle}>🎧</span>
//           <span style={textStyle}>
//             Contact us 24 hours a day, 7 days a week. <a href="#" style={linkStyle}>View details</a>
//           </span>
//         </div>
//       </div>

//       <div style={sectionStyle}>
//         <h2 style={headingStyle}>Returns & Refunds</h2>
//         <div style={itemStyle}>
//           <span style={iconStyle}>💳</span>
//           <span style={textStyle}>
//             Eligible for refunds within 30 days of receiving products. <a href="#" style={linkStyle}>View more</a>
//           </span>
//         </div>
//       </div>

//       <div style={sellerBoxStyle}>
//         <h3 style={sellerNameStyle}>Sold By</h3>
//         <div style={itemStyle}>
//           <span style={iconStyle}>T</span>
//           <span style={textStyle}>
//             Tizaraa In-House
//             <br />
//             <span style={verifiedStyle}>✓</span> Verified Seller
//           </span>
//         </div>
//         <a href="#" style={{...linkStyle, display: 'block', marginTop: '10px'}}>Visit Profile</a>
//       </div>
//     </div>
//       </div>

//       <ProductView description={description} productId={product.product_id} />

//       <RelatedProducts productId={product.product_id} />
//     </Fragment>
//   );
// }

// import React from 'react';
// import { Fragment } from "react";
// import axios from "axios";
// import ProductIntro from "@component/products/ProductIntro";
// import ProductView from "@component/products/ProductView";
// import RelatedProducts from "@component/products/RelatedProducts";
// import ApiBaseUrl from "api/ApiBaseUrl";

// async function fetchProductData(slug: string) {
//   try {
//     const response = await axios.get(
//       `${ApiBaseUrl.baseUrl}product/details/${slug}`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching product data:", error.message);
//     return null;
//   }
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const productData = await fetchProductData(params.slug);
//   if (productData?.seo) {
//     const seo = productData.seo;
//     return {
//       title: seo.title,
//       description: seo.description,
//       keywords: seo.keywords,
//       openGraph: {
//         title: seo.title,
//         description: seo.description,
//         url: seo.url,
//         images: seo.image,
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
//   params: { slug: string };
// }

// const ShippingInfo: React.FC = () => {
//   const containerStyle: React.CSSProperties = {
//     fontFamily: 'Arial, sans-serif',
//     maxWidth: '400px',
//     margin: '0 auto',
//     padding: '20px',
//     boxSizing: 'border-box',
//   };

//   const sectionStyle: React.CSSProperties = {
//     marginBottom: '20px',
//   };

//   const headingStyle: React.CSSProperties = {
//     fontSize: '24px',
//     fontWeight: 'bold',
//     marginBottom: '10px',
//   };

//   const itemStyle: React.CSSProperties = {
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: '10px',
//   };

//   const iconStyle: React.CSSProperties = {
//     width: '30px',
//     height: '30px',
//     marginRight: '10px',
//     backgroundColor: '#ff8c00',
//     borderRadius: '50%',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     color: 'white',
//     fontSize: '16px',
//   };

//   const textStyle: React.CSSProperties = {
//     fontSize: '16px',
//   };

//   const linkStyle: React.CSSProperties = {
//     color: '#000',
//     textDecoration: 'underline',
//   };

//   const sellerBoxStyle: React.CSSProperties = {
//     backgroundColor: '#f0f0f0',
//     padding: '15px',
//     borderRadius: '5px',
//   };

//   const sellerNameStyle: React.CSSProperties = {
//     fontSize: '18px',
//     fontWeight: 'bold',
//     marginBottom: '5px',
//   };

//   const verifiedStyle: React.CSSProperties = {
//     color: '#008000',
//     marginRight: '5px',
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={sectionStyle}>
//         <h2 style={headingStyle}>Shipping</h2>
//         <div style={itemStyle}>
//           <span style={iconStyle}>🚚</span>
//           <span style={textStyle}>Instant delivery</span>
//         </div>
//       </div>

//       <div style={sectionStyle}>
//         <h2 style={headingStyle}>Payments</h2>
//         <div style={itemStyle}>
//           <span style={iconStyle}>🎧</span>
//           <span style={textStyle}>
//             Contact us 24 hours a day, 7 days a week. <a href="#" style={linkStyle}>View details</a>
//           </span>
//         </div>
//       </div>

//       <div style={sectionStyle}>
//         <h2 style={headingStyle}>Returns & Refunds</h2>
//         <div style={itemStyle}>
//           <span style={iconStyle}>💳</span>
//           <span style={textStyle}>
//             Eligible for refunds within 30 days of receiving products. <a href="#" style={linkStyle}>View more</a>
//           </span>
//         </div>
//       </div>

//       <div style={sellerBoxStyle}>
//         <h3 style={sellerNameStyle}>Sold By</h3>
//         <div style={itemStyle}>
//           <span style={iconStyle}>T</span>
//           <span style={textStyle}>
//             Tizaraa In-House
//             <br />
//             <span style={verifiedStyle}>✓</span> Verified Seller
//           </span>
//         </div>
//         <a href="#" style={{...linkStyle, display: 'block', marginTop: '10px'}}>Visit Profile</a>
//       </div>
//     </div>
//   );
// };

// export default async function ProductDetails({ params }: Props) {
//   const productData = await fetchProductData(params.slug);

//   if (!productData || !productData.productsingledetails) {
//     return (
//       <div>Product not found or there was an error loading the product.</div>
//     );
//   }

//   const product = productData.productsingledetails;
//   const sizecolorwithprice = productData.SizeColor.sizecolorwithprice;
//   const productImages = productData.productmultiimages;
//   const images = productImages.map((img: any) => img.product_img);
//   const description = product.short_description;

//   const containerStyle: React.CSSProperties = {
//     maxWidth: '1200px',
//     margin: '0 auto',
//     padding: '20px',
//   };

//   const flexContainerStyle: React.CSSProperties = {
//     display: 'flex',
//     flexWrap: 'wrap',
//     gap: '20px',
//   };

//   const productIntroStyle: React.CSSProperties = {
//     flex: '1 1 60%',
//     minWidth: '300px',
//   };

//   const shippingInfoStyle: React.CSSProperties = {
//     flex: '1 1 30%',
//     minWidth: '300px',
//   };

//   const productViewStyle: React.CSSProperties = {
//     marginTop: '20px',
//   };

//   const mobileShippingInfoStyle: React.CSSProperties = {
//     display: 'none',
//   };

//   return (
//     <Fragment>
//       <div style={containerStyle}>
//         <div style={flexContainerStyle}>
//           <div style={productIntroStyle}>
//             <ProductIntro
//               id={product.id}
//               price={product.seeling_price}
//               title={product.product_name}
//               images={images}
//               sellerShopName={product.seller_shop_name}
//               rating={product.product_rating}
//               discountPrice={product.discount_price}
//               totalDiscount={product.total_discount}
//               productStock={product.product_stock}
//               productId={product.product_id}
//               sellerId={product.seller_shop_id}
//               sizecolorwithprice={sizecolorwithprice}
//               slug={params.slug}
//             />
//           </div>
//           <div style={shippingInfoStyle}>
//             <ShippingInfo />
//           </div>
//         </div>
        
//         <div style={productViewStyle}>
//           <ProductView description={description} productId={product.product_id} />
//         </div>
        
//         <div style={mobileShippingInfoStyle}>
//           <ShippingInfo />
//         </div>

//         <RelatedProducts productId={product.product_id} />
//       </div>

//       <style jsx global>{`
//         @media (max-width: 768px) {
//           .shipping-info-desktop {
//             display: none;
//           }
//           .shipping-info-mobile {
//             display: block;
//             margin-top: 20px;
//           }
//         }
//       `}</style>
//     </Fragment>
//   );
// }



// import React from 'react';
// import { Fragment } from "react";
// import axios from "axios";
// import ProductIntro from "@component/products/ProductIntro";
// import ProductView from "@component/products/ProductView";
// import RelatedProducts from "@component/products/RelatedProducts";
// import ApiBaseUrl from "api/ApiBaseUrl";

// // Fetch product data including SEO and details in a single API call
// async function fetchProductData(slug: string) {
//   try {
//     const response = await axios.get(
//       `${ApiBaseUrl.baseUrl}product/details/${slug}`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching product data:", error.message);
//     return null;
//   }
// }

// // Generate metadata for the product details page
// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const productData = await fetchProductData(params.slug);
//   if (productData?.seo) {
//     const seo = productData.seo;
//     return {
//       title: seo.title,
//       description: seo.description,
//       keywords: seo.keywords,
//       openGraph: {
//         title: seo.title,
//         description: seo.description,
//         url: seo.url,
//         images: seo.image,
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
//   params: { slug: string };
// }

// const ShippingInfo: React.FC = () => {
//   const containerStyle: React.CSSProperties = {
//     fontFamily: 'Arial, sans-serif',
//     maxWidth: '400px',
//     margin: '0 auto',
//     padding: '20px',
//     boxSizing: 'border-box',
//   };

//   const sectionStyle: React.CSSProperties = {
//     marginBottom: '20px',
//   };

//   const headingStyle: React.CSSProperties = {
//     fontSize: '24px',
//     fontWeight: 'bold',
//     marginBottom: '10px',
//   };

//   const itemStyle: React.CSSProperties = {
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: '10px',
//   };

//   const iconStyle: React.CSSProperties = {
//     width: '30px',
//     height: '30px',
//     marginRight: '10px',
//     backgroundColor: '#ff8c00',
//     borderRadius: '50%',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     color: 'white',
//     fontSize: '16px',
//   };

//   const textStyle: React.CSSProperties = {
//     fontSize: '16px',
//   };

//   const linkStyle: React.CSSProperties = {
//     color: '#000',
//     textDecoration: 'underline',
//   };

//   const sellerBoxStyle: React.CSSProperties = {
//     backgroundColor: '#f0f0f0',
//     padding: '15px',
//     borderRadius: '5px',
//   };

//   const sellerNameStyle: React.CSSProperties = {
//     fontSize: '18px',
//     fontWeight: 'bold',
//     marginBottom: '5px',
//   };

//   const verifiedStyle: React.CSSProperties = {
//     color: '#008000',
//     marginRight: '5px',
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={sectionStyle}>
//         <h2 style={headingStyle}>Shipping</h2>
//         <div style={itemStyle}>
//           <span style={iconStyle}>🚚</span>
//           <span style={textStyle}>Instant delivery</span>
//         </div>
//       </div>

//       <div style={sectionStyle}>
//         <h2 style={headingStyle}>Payments</h2>
//         <div style={itemStyle}>
//           <span style={iconStyle}>🎧</span>
//           <span style={textStyle}>
//             Contact us 24 hours a day, 7 days a week. <a href="#" style={linkStyle}>View details</a>
//           </span>
//         </div>
//       </div>

//       <div style={sectionStyle}>
//         <h2 style={headingStyle}>Returns & Refunds</h2>
//         <div style={itemStyle}>
//           <span style={iconStyle}>💳</span>
//           <span style={textStyle}>
//             Eligible for refunds within 30 days of receiving products. <a href="#" style={linkStyle}>View more</a>
//           </span>
//         </div>
//       </div>

//       <div style={sellerBoxStyle}>
//         <h3 style={sellerNameStyle}>Sold By</h3>
//         <div style={itemStyle}>
//           <span style={iconStyle}>T</span>
//           <span style={textStyle}>
//             Tizaraa In-House
//             <br />
//             <span style={verifiedStyle}>✓</span> Verified Seller
//           </span>
//         </div>
//         <a href="#" style={{...linkStyle, display: 'block', marginTop: '10px'}}>Visit Profile</a>
//       </div>
//     </div>
//   );
// };

// export default async function ProductDetails({ params }: Props) {
//   const productData = await fetchProductData(params.slug);

//   if (!productData || !productData.productsingledetails) {
//     return (
//       <div>Product not found or there was an error loading the product.</div>
//     );
//   }

//   const product = productData.productsingledetails;
//   const sizecolorwithprice = productData.SizeColor.sizecolorwithprice;
//   const productImages = productData.productmultiimages;
//   const images = productImages.map((img: any) => img.product_img);
//   const description = product.short_description;

//   const containerStyle: React.CSSProperties = {
//     display: 'flex',
//     flexDirection: 'column',
//     maxWidth: '1200px',
//     margin: '0 auto',
//     padding: '20px',
//   };

//   const productContainerStyle: React.CSSProperties = {
//     display: 'flex',
//     flexDirection: 'row',
//     gap: '20px',
//     flexWrap: 'wrap',
//   };

//   const productIntroStyle: React.CSSProperties = {
//     flex: '1 1 60%',
//     minWidth: '300px',
//   };

//   const shippingInfoStyle: React.CSSProperties = {
//     flex: '1 1 30%',
//     minWidth: '300px',
//   };

//   const mobileShippingInfoStyle: React.CSSProperties = {
//     display: 'none',
//   };

//   return (
//     <Fragment>
//       <div style={containerStyle}>
//         <div style={productContainerStyle}>
//           <div style={productIntroStyle}>
//             <ProductIntro
//               id={product.id}
//               price={product.seeling_price}
//               title={product.product_name}
//               images={images}
//               sellerShopName={product.seller_shop_name}
//               rating={product.product_rating}
//               discountPrice={product.discount_price}
//               totalDiscount={product.total_discount}
//               productStock={product.product_stock}
//               productId={product.product_id}
//               sellerId={product.seller_shop_id}
//               sizecolorwithprice={sizecolorwithprice}
//               slug={params.slug}
//             />
//           </div>
//           <div style={shippingInfoStyle}>
//             <ShippingInfo />
//           </div>
//         </div>

//         <ProductView description={description} productId={product.product_id} />

//         <div style={mobileShippingInfoStyle}>
//           <ShippingInfo />
//         </div>

//         <RelatedProducts productId={product.product_id} />
//       </div>
//     </Fragment>
//   );
// }

import React from "react";
import { Metadata } from "next";
import ProductDetails from "./ProductDetails";
import axios from "axios";
import ApiBaseUrl from "api/ApiBaseUrl";
import ResponsiveCategory from "./ResponsiveCategory";

// Fetch product data for server-side metadata
async function fetchProductData(slug: string) {
  try {
    const response = await axios.get(`${ApiBaseUrl.baseUrl}product/details/${slug}`);
    // console.log(response.data.sitemap);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}

// Generate SEO metadata for the product page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
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
  )
}
