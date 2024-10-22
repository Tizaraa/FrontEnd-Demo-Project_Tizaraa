
import { Fragment } from "react";
import axios from "axios";
import ProductIntro from "@component/products/ProductIntro";
import ProductView from "@component/products/ProductView";
import RelatedProducts from "@component/products/RelatedProducts";
import ApiBaseUrl from "api/ApiBaseUrl";

// Fetch product data including SEO and details in a single API call
async function fetchProductData(slug: string) {
  try {
    const response = await axios.get(`${ApiBaseUrl.baseUrl}product/details/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error.message);
    return null;
  }
}

// Generate metadata for the product details page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const productData = await fetchProductData(params.slug);
  if (productData?.seo) {
    const seo = productData.seo;
    return {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      openGraph: {
        title: seo.title,
        description: seo.description,
        url: seo.url,
        images: seo.image,
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

export default async function ProductDetails({ params }: Props) {
  const productData = await fetchProductData(params.slug);

  if (!productData || !productData.productsingledetails) {
    return <div>Product not found or there was an error loading the product.</div>;
  }

  const product = productData.productsingledetails;
  const sizecolorwithprice = productData.SizeColor.sizecolorwithprice; 
  const productImages = productData.productmultiimages;
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
        sizecolorwithprice={sizecolorwithprice} // Pass the sizecolorwithprice data
        slug={params.slug}
      />

      <ProductView description={description} productId={product.product_id} />

      <RelatedProducts productId={product.product_id} />
    </Fragment>
  );
}

