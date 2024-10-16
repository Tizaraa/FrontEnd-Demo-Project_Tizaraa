// import { Fragment } from "react";

// import api from "@utils/__api__/products";
// import ProductIntro from "@component/products/ProductIntro";
// import ProductView from "@component/products/ProductView";

// // ==============================================================
// interface Props {
//   params: { slug: string };
// }
// // ==============================================================

// export default async function ProductDetails({ params }: Props) {
//   const shops = await api.getAvailableShop();
//   const relatedProducts = await api.getRelatedProducts();
//   const frequentlyBought = await api.getFrequentlyBought();
//   const product = await api.getProduct(params.slug as string);

//   return (
//     <Fragment>
//       <ProductIntro
//         id={product.id}
//         price={product.price}
//         title={product.title}
//         images={product.images}
//       />

//       <ProductView
//         shops={shops}
//         relatedProducts={relatedProducts}
//         frequentlyBought={frequentlyBought}
//       />
//     </Fragment>
//   );
// }


// import { Fragment } from "react";
// import axios from "axios";
// import ProductIntro from "@component/products/ProductIntro";
// import ProductView from "@component/products/ProductView";

// interface Props {
//   params: { slug: string };
// }

// export default async function ProductDetails({ params }: Props) {
//   try {
//     const response = await axios.get(`https://tizaraa.com/api/product/details/${params.slug}`);

//     const product = response.data.productsingledetails;
//     const productImages = response.data.productmultiimages;

//     // Check if the product exists
//     if (!product) {
//       throw new Error("Product not found");
//     }

//     // Extract image URLs from the productmultiimages array
//     const images = productImages.map((img: any) => img.product_img);

    

//     return (
//       <Fragment>
//         <ProductIntro
//           id={product.product_slug}
//           price={product.seeling_price}
//           title={product.product_name}
//           images={images} 
//           sellerShopName={product.seller_shop_name}
//            rating={product.product_rating} // Pass the rating
//         />

//         <ProductView
         
//         />
//       </Fragment>
//     );
//   } catch (error) {
//     console.error("Error loading product details:", error.message);
//     return <div>Product not found or there was an error loading the product.</div>;
//   }
// }



// import { Fragment } from "react";
// import axios from "axios";
// import ProductIntro from "@component/products/ProductIntro";
// import ProductView from "@component/products/ProductView";

// interface Props {
//   params: { slug: string };
// }

// export default async function ProductDetails({ params }: Props) {
//   try {
//     const response = await axios.get(`https://tizaraa.com/api/product/details/${params.slug}`);

//     const product = response.data.productsingledetails;
//     const productImages = response.data.productmultiimages;
    

//     if (!product) {
//       throw new Error("Product not found");
//     }

//     const images = productImages.map((img: any) => img.product_img);
//     const description = product.short_description;  // Extract the HTML description
  
    

//     return (
//       <Fragment>
//         <ProductIntro
//           id={product.product_slug}
//           price={product.seeling_price}
//           discountPrice={product.discount_price}
//           totalDiscount={product.total_discount}
//           productStock={product.product_stock}
//           title={product.product_name}
//           images={images}
//           sellerShopName={product.seller_shop_name}
//           rating={product.product_rating}  // Pass the rating
//         />

//         <ProductView
//           description={description}  // Pass the description
//         />
//       </Fragment>
//     );
//   } catch (error) {
//     console.error("Error loading product details:", error.message);
//     return <div>Product not found or there was an error loading the product.</div>;
//   }
// }







// import { Fragment } from "react";
// import axios from "axios";
// import ProductIntro from "@component/products/ProductIntro";
// import ProductView from "@component/products/ProductView";
// import RelatedProducts from "@component/products/RelatedProducts"; 

// interface Props {
//   params: { slug: string };
// }

// export default async function ProductDetails({ params }: Props) {
//   try {
//     const response = await axios.get(`https://tizaraa.com/api/product/details/${params.slug}`);

//     const product = response.data.productsingledetails;
//     const productImages = response.data.productmultiimages;

//     if (!product) {
//       throw new Error("Product not found");
//     }

//     const images = productImages.map((img: any) => img.product_img);
//     const description = product.short_description;

//     return (
//       <Fragment>
//         <ProductIntro
//           id={product.product_slug}
//           price={product.seeling_price}
//           title={product.product_name}
//           images={images}
//           sellerShopName={product.seller_shop_name}
//           rating={product.product_rating}
//           discountPrice={product.discount_price}
//           totalDiscount={product.total_discount}
//           productStock={product.product_stock}

//         />

//         <ProductView
//           description={description}
//         />

//         {/* Include the RelatedProducts component and pass the product_id */}
//         <RelatedProducts productId={product.product_id} />

//         {/* <NewRelatedProducts  productId={product.product_id}></NewRelatedProducts> */}

//       </Fragment>
//     );
//   } catch (error) {
//     console.error("Error loading product details:", error.message);
//     return <div>Product not found or there was an error loading the product.</div>;
//   }
// }




// import { Fragment } from "react";
// import axios from "axios";
// import ProductIntro from "@component/products/ProductIntro";
// import ProductView from "@component/products/ProductView";
// import RelatedProducts from "@component/products/RelatedProducts";
// import ApiBaseUrl from "api/ApiBaseUrl";

// interface Props {
//   params: { slug: string };
// }

// export default async function ProductDetails({ params }: Props) {
//   try {
//     const response = await axios.get(`${ApiBaseUrl.baseUrl}product/details/${params.slug}`);
    
//     const product = response.data.productsingledetails;
//     const productImages = response.data.productmultiimages;

//     if (!product) {
//       throw new Error("Product not found");
//     }

//     const images = productImages.map((img: any) => img.product_img);
//     const description = product.short_description;

//     return (
//       <Fragment>
//          <ProductIntro
//           id={product.id}
//           price={product.seeling_price}
//           title={product.product_name}
//           images={images}
//           sellerShopName={product.seller_shop_name}
//           rating={product.product_rating}
//           discountPrice={product.discount_price}
//           totalDiscount={product.total_discount}
//           productStock={product.product_stock}
//           productId = {product.product_id}
//           sellerId = {product.seller_shop_id}

//         />

//         <ProductView
//           description={description}
//           productId={product.product_id}  
//         />

//         <RelatedProducts productId={product.product_id} />
//       </Fragment>
//     );
//   } catch (error) {
//     console.error("Error loading product details:", error.message);
//     return <div>Product not found or there was an error loading the product.</div>;
//   }
// }

// import { Fragment } from "react";
// import axios from "axios";
// import ProductIntro from "@component/products/ProductIntro";
// import ProductView from "@component/products/ProductView";
// import RelatedProducts from "@component/products/RelatedProducts";
// import ApiBaseUrl from "api/ApiBaseUrl";
// import { Metadata } from "next";

// // Fetch SEO data dynamically for the product page
// async function fetchSEOData(slug: string) {
//   try {
//     const response = await axios.get(`${ApiBaseUrl.baseUrl}product/details/${slug}`);
//     return response.data?.seo || null;
//   } catch (error) {
//     console.error("Error fetching SEO data:", error.message);
//     return null;
//   }
// }

// // Define the generateMetadata function for dynamic SEO metadata
// export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
//   const seo = await fetchSEOData(params.slug);

//   const defaultMetadata = {
//     title: "Tizaraa - The Best React eCommerce Template",
//     description: "Tizaraa is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app, and Multi-vendor store",
//     url: "https://www.tizaraa.com",
//     image: "/default-image.jpg",
//     keywords: ["e-commerce", "e-commerce template", "next.js", "react", "tizaraa"]
//   };

//   return {
//     title: seo?.title || defaultMetadata.title,
//     description: seo?.description || defaultMetadata.description,
//     keywords: seo?.keywords || defaultMetadata.keywords,
//     openGraph: {
//       title: seo?.title || defaultMetadata.title,
//       description: seo?.description || defaultMetadata.description,
//       url: seo?.url || defaultMetadata.url,
//       images: seo?.image || defaultMetadata.image,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: seo?.title || defaultMetadata.title,
//       description: seo?.description || defaultMetadata.description,
//       images: seo?.image || defaultMetadata.image,
//     },
//   };
// }

// interface Props {
//   params: { slug: string };
// }

// export default async function ProductDetails({ params }: Props) {
//   try {
//     const response = await axios.get(`${ApiBaseUrl.baseUrl}product/details/${params.slug}`);
    
//     const product = response.data.productsingledetails;
//     const productImages = response.data.productmultiimages;

//     if (!product) {
//       throw new Error("Product not found");
//     }

//     const images = productImages.map((img: any) => img.product_img);
//     const description = product.short_description;

//     return (
//       <Fragment>
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
//         />

//         <ProductView description={description} productId={product.product_id} />
        
//         <RelatedProducts productId={product.product_id} />
//       </Fragment>
//     );
//   } catch (error) {
//     console.error("Error loading product details:", error.message);
//     return <div>Product not found or there was an error loading the product.</div>;
//   }
// }

// import { Fragment } from "react";
// import axios from "axios";
// import ProductIntro from "@component/products/ProductIntro";
// import ProductView from "@component/products/ProductView";
// import RelatedProducts from "@component/products/RelatedProducts";
// import ApiBaseUrl from "api/ApiBaseUrl";

// // Define metadata for each product
// export async function generateMetadata({ params }: { params: { slug: string } }) {
//   try {
//     const response = await axios.get(`${ApiBaseUrl.baseUrl}product/details/${params.slug}`);
//     const product = response.data.productsingledetails;
//     const seo = response.data.seo;

//     //console.log("seo",seo);
//     //console.log(response.data.seo);
    

//     if (!seo) {
//       return {
//         title: "Tizaraa - Product Details",
//         description: "Product details page",
//       };
//     }

//     return {
//       title: seo?.title || "Tizaraa - Product Details",
//       description: seo?.description || "Product details page",
//       openGraph: {
//         title: seo?.title,
//         description: seo?.description,
//         url: seo?.url || "https://www.tizaraa.com",
//         images: seo?.image || "/default-image.jpg",
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching product SEO data:", error.message);
//     return {
//       title: "Product Not Found",
//       description: "The product you are looking for does not exist.",
//     };
//   }
// }

// interface Props {
//   params: { slug: string };
// }

// export default async function ProductDetails({ params }: Props) {
//   try {
//     const response = await axios.get(`${ApiBaseUrl.baseUrl}product/details/${params.slug}`);

//     const product = response.data.productsingledetails;
//     const productImages = response.data.productmultiimages;

//     if (!product) {
//       throw new Error("Product not found");
//     }

//     const images = productImages.map((img: any) => img.product_img);
//     const description = product.short_description;

//     return (
//       <Fragment>
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
//         />

//         <ProductView description={description} productId={product.product_id} />

//         <RelatedProducts productId={product.product_id} />
//       </Fragment>
//     );
//   } catch (error) {
//     console.error("Error loading product details:", error.message);
//     return <div>Product not found or there was an error loading the product.</div>;
//   }
// }


// import { Fragment } from "react";
// import axios from "axios";
// import ProductIntro from "@component/products/ProductIntro";
// import ProductView from "@component/products/ProductView";
// import RelatedProducts from "@component/products/RelatedProducts";
// import ApiBaseUrl from "api/ApiBaseUrl";

// interface Props {
//   params: { slug: string };
// }

// export default async function ProductDetails({ params }: Props) {
//   try {
//     const response = await axios.get(`${ApiBaseUrl.baseUrl}product/details/${params.slug}`);
    
//     const product = response.data.productsingledetails;
//     const productImages = response.data.productmultiimages;

//     if (!product) {
//       throw new Error("Product not found");
//     }

//     const images = productImages.map((img: any) => img.product_img);
//     const description = product.short_description;

//     return (
//       <Fragment>
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
//         />

//         <ProductView
//           description={description}
//           productId={product.product_id}
//         />

//         <RelatedProducts productId={product.product_id} />
//       </Fragment>
//     );
//   } catch (error) {
//     console.error("Error loading product details:", error.message);
//     return <div>Product not found or there was an error loading the product.</div>;
//   }
// }

import { Fragment } from "react";
import axios from "axios";
import ProductIntro from "@component/products/ProductIntro";
import ProductView from "@component/products/ProductView";
import RelatedProducts from "@component/products/RelatedProducts";
import ApiBaseUrl from "api/ApiBaseUrl";

// Fetch product-specific SEO data
async function fetchProductSEO(slug: string) {
  try {
    const response = await axios.get(`${ApiBaseUrl.baseUrl}product/details/${slug}`);
    const product = response.data;
    //console.log(product);
    
    return product?.seo || null; // Return the product SEO data if it exists
  } catch (error) {
    console.error("Error fetching product SEO data:", error.message);
    return null;
  }
}

// Generate metadata for the product details page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const seo = await fetchProductSEO(params.slug);

  if (seo) {
    return {
      title: seo?.title,
      description: seo?.description,
      keywords: seo?.keywords,
      openGraph: {
        title: seo?.title,
        description: seo?.description,
        url: seo?.url,
        images: seo?.image,
      },
    };
  } else {
    // If no product SEO data, return default metadata
    return {
      title: "Product Not Found",
      description: "No SEO metadata found for this product.",
    };
  }
}

interface Props {
  params: { slug: string };
}

export default async function ProductDetails({ params }: Props) {
  try {
    const response = await axios.get(`${ApiBaseUrl.baseUrl}product/details/${params.slug}`);
    
    const product = response.data.productsingledetails;
    const productImages = response.data.productmultiimages;

    if (!product) {
      throw new Error("Product not found");
    }

    const images = productImages.map((img: any) => img.product_img);
    const description = product.short_description;

    return (
      <Fragment>
        <ProductIntro
          id={product.id}
          price={product.seeling_price}
          title={product.product_name}
          images={images}
          sellerShopName={product.seller_shop_name}
          rating={product.product_rating}
          discountPrice={product.discount_price}
          totalDiscount={product.total_discount}
          productStock={product.product_stock}
          productId={product.product_id}
          sellerId={product.seller_shop_id}
        />

        <ProductView
          description={description}
          productId={product.product_id}
        />

        <RelatedProducts productId={product.product_id} />
      </Fragment>
    );
  } catch (error) {
    console.error("Error loading product details:", error.message);
    return <div>Product not found or there was an error loading the product.</div>;
  }
}





