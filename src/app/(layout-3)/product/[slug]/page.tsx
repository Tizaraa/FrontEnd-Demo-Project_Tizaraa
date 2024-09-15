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


import { Fragment } from "react";
import axios from "axios";
import ProductIntro from "@component/products/ProductIntro";
import ProductView from "@component/products/ProductView";

interface Props {
  params: { slug: string };
}

export default async function ProductDetails({ params }: Props) {
  try {
    const response = await axios.get(`https://tizaraa.com/api/product/details/${params.slug}`);

    const product = response.data.productsingledetails;
    const productImages = response.data.productmultiimages;

    // Check if the product exists
    if (!product) {
      throw new Error("Product not found");
    }

    // Extract image URLs from the productmultiimages array
    const images = productImages.map((img: any) => img.product_img);

    // Populate additional fields if needed
    const shops = []; // Add shop details if necessary
    const relatedProducts = response.data.relatedproduct; // Access related products
    const frequentlyBought = []; // Populate frequently bought products if applicable

    return (
      <Fragment>
        <ProductIntro
          id={product.product_slug}
          price={product.seeling_price}
          title={product.product_name}
          images={images} 
          sellerShopName={product.seller_shop_name}
           rating={product.product_rating} // Pass the rating
        />

        <ProductView
          // shops={shops}
          relatedProducts={relatedProducts}
          // frequentlyBought={frequentlyBought}
        />
      </Fragment>
    );
  } catch (error) {
    console.error("Error loading product details:", error.message);
    return <div>Product not found or there was an error loading the product.</div>;
  }
}
