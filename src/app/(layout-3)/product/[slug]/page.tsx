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




import { Fragment } from "react";
import axios from "axios";
import ProductIntro from "@component/products/ProductIntro";
import ProductView from "@component/products/ProductView";
import RelatedProducts from "@component/products/RelatedProducts";
import ApiBaseUrl from "api/ApiBaseUrl";

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
          // id={product.product_slug}
          id={product.id}
          price={product.seeling_price}
          title={product.product_name}
          images={images}
          sellerShopName={product.seller_shop_name}
          rating={product.product_rating}
          discountPrice={product.discount_price}
          totalDiscount={product.total_discount}
          productStock={product.product_stock}

          productId = {product.product_id}
          sellerId = {product.seller_shop_id}

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
