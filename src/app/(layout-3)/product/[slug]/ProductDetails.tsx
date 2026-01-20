"use client";

import React, { Fragment, useState, useEffect } from "react";
import DOMPurify from "dompurify";
import ResponsiveCategory from "./ResponsiveCategory";
import ProductIntro from "@component/products/ProductIntro";
import RelatedProducts from "@component/products/RelatedProducts";
import ApiBaseUrl from "api/ApiBaseUrl";
import { SemiSpan } from "@component/Typography";
import FlexBox from "@component/FlexBox";

import { Vortex } from "react-loader-spinner";
import styled from "@emotion/styled";
import { ProductCard1 } from "@component/product-cards";
import Loading from "./loading";

// Updated ProductView component
import Box from "@component/Box";
import { H5 } from "@component/Typography";
import ProductReview from "@component/products/ProductReview";
import ProductDescription from "@component/products/ProductDescription";
import axios from "@lib/axiosClient";
import useFetcher from "@hook/useFetcher";

async function fetchQRCode(slug: string) {
 try {
  const response = await axios.get(
   `${ApiBaseUrl.baseUrl}product/qr-code/${slug}`,
   { headers: { Accept: "application/xml" }, responseType: "text" }
  );

  return response.data;
 } catch (error) {
  console.error("Error fetching QR code:", error);
  return null;
 }
}

interface Props {
 params: { slug: string };
 fallbackData: any;
}

const ShippingInfo: React.FC<{
 isDesktop: boolean;
 sellerShopLogo: string;
 sellerShopName: string;
 shopUrl: string;
 delivery_type: string;
 qrCodeUrl: string | null;
 express_deliverey: number;
 showInTab?: boolean;
}> = ({
 isDesktop,
 sellerShopName,
 sellerShopLogo,
 shopUrl,
 delivery_type,
 qrCodeUrl,
 express_deliverey,
 showInTab = false,
}) => {
 const [showDeliveryChart, setShowDeliveryChart] = useState(false);

 return (
  <div
   style={{
    fontFamily: "__Open_Sans_9c011f, __Open_Sans_Fallback_9c011f",
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    boxSizing: "border-box",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
   }}
  >
   <div style={{ marginBottom: "20px" }}>
    <h2
     style={{
      fontSize: "14px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#333",
     }}
    >
     Shipping
    </h2>
    <div
     style={{
      display: "flex",
      alignItems: "center",
      marginBottom: "10px",
     }}
    >
     <span
      style={{
       width: "30px",
       height: "30px",
       marginRight: "10px",
       backgroundColor: "#E94560",
       borderRadius: "50%",
       display: "flex",
       justifyContent: "center",
       alignItems: "center",
       color: "white",
       fontSize: "14px",
      }}
     >
      🚚
     </span>
     <span
      style={{
       fontSize: "14px",
       color: "#555",
      }}
     >
      {delivery_type}
     </span>
     <button
      onClick={() => setShowDeliveryChart(true)}
      style={{
       marginLeft: "10px",
       fontSize: "10px",
       color: "#E94560",
       background: "none",
       border: "none",
       textDecoration: "underline",
       cursor: "pointer",
      }}
     >
      Price Chart for Delivery
     </button>
    </div>

    {/* Delivery Price Chart Modal */}
    {showDeliveryChart && (
     <div
      style={{
       position: "fixed",
       top: 0,
       left: 0,
       right: 0,
       bottom: 0,
       backgroundColor: "rgba(0,0,0,0.5)",
       display: "flex",
       justifyContent: "center",
       alignItems: "center",
       zIndex: 1000,
      }}
     >
      <div
       style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        width: "300px",
       }}
      >
       <h3
        style={{
         fontSize: "15px",
         fontWeight: "bold",
         marginBottom: "15px",
         color: "#333",
         display: "flex",
         justifyContent: "space-between",
        }}
       >
        Delivery Cost Breakdown
        <button
         onClick={() => setShowDeliveryChart(false)}
         style={{
          background: "#E94560",
          border: "none",
          fontSize: "18px",
          cursor: "pointer",
          color: "#fff",
         }}
        >
         ×
        </button>
       </h3>
       <ul
        style={{
         listStyle: "none",
         padding: 0,
         margin: 0,
         fontSize: "12px",
        }}
       >
        <li
         style={{
          padding: "8px 0",
          borderBottom: "1px solid #eee",
          fontSize: "14px",
         }}
        >
         Base Rate (First 1 kg): <strong>60 BDT</strong>
        </li>
        <li
         style={{
          padding: "8px 0",
          borderBottom: "1px solid #eee",
          fontSize: "14px",
         }}
        >
         Additional Weight (Per kg): <strong>25 BDT/kg</strong>
        </li>
       </ul>
       <div
        style={{
         marginTop: "15px",
         fontSize: "12px",
         color: "#E94560",
        }}
       >
        * Delivery charges are calculated based on the total weight of your
        order.
       </div>
      </div>
     </div>
    )}
   </div>

   {/* express delivery  */}
   <div style={{ marginBottom: "20px" }}>
    <h2
     style={{
      fontSize: "14px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#333",
     }}
    >
     Express Delivery
    </h2>
    <div
     style={{
      display: "flex",
      alignItems: "center",
      marginBottom: "10px",
     }}
    >
     <span
      style={{
       width: "30px",
       height: "30px",
       marginRight: "10px",
       backgroundColor: express_deliverey === 1 ? "#E94560" : "#ccc",
       borderRadius: "50%",
       display: "flex",
       justifyContent: "center",
       alignItems: "center",
       color: "white",
       fontSize: "14px",
      }}
     >
      🚚
     </span>
     <span
      style={{
       fontSize: "14px",
       color: "#555",
      }}
     >
      {express_deliverey === 1
       ? "Express Delivery is possible!"
       : "Express Delivery is not available."}
     </span>
    </div>
   </div>

   <div style={{ marginBottom: "20px" }}>
    <h2
     style={{
      fontSize: "14px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#333",
     }}
    >
     Payments
    </h2>
    <div
     style={{
      display: "flex",
      alignItems: "center",
      marginBottom: "10px",
     }}
    >
     <span
      style={{
       width: "30px",
       height: "30px",
       marginRight: "10px",
       backgroundColor: "#E94560",
       borderRadius: "50%",
       display: "flex",
       justifyContent: "center",
       alignItems: "center",
       color: "white",
       fontSize: "14px",
      }}
     >
      🎧
     </span>
     <span
      style={{
       fontSize: "14px",
       color: "#555",
      }}
     >
      Contact us 24 hours a day, 7 days a week.
     </span>
    </div>
   </div>

   <div style={{ marginBottom: "10px" }}>
    <h2
     style={{
      fontSize: "14px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#333",
     }}
    >
     Returns & Refunds
    </h2>
    <div
     style={{
      display: "flex",
      alignItems: "center",
     }}
    >
     <span
      style={{
       width: "30px",
       height: "30px",
       marginRight: "10px",
       backgroundColor: "#E94560",
       borderRadius: "50%",
       display: "flex",
       justifyContent: "center",
       alignItems: "center",
       color: "white",
       fontSize: "14px",
       padding: "5px 10px",
      }}
     >
      💳
     </span>
     <span
      style={{
       fontSize: "14px",
       color: "#555",
      }}
     >
      Eligible for refunds within 30 days of receiving products.
     </span>
    </div>
   </div>

   {qrCodeUrl && (
    <div style={{ textAlign: "center" }}>
     <div
      dangerouslySetInnerHTML={{
       __html: DOMPurify.sanitize(qrCodeUrl),
      }}
      style={{
       maxWidth: "100%",
       height: "70px",
       marginBottom: "10px",
       transform: "scale(2)",
       transformOrigin: "top left",
       display: "inline-block",
      }}
     ></div>
     <p
      style={{
       fontSize: "14px",
       color: "#555",
      }}
     >
      Scan this QR code for product information
     </p>
    </div>
   )}

   <div
    style={{
     backgroundColor: "#fff",
     borderRadius: "5px",
    }}
   >
    <h3
     style={{
      fontSize: "14px",
      fontWeight: "bold",
      marginBottom: "5px",
      color: "#333",
     }}
    >
     Sold By
    </h3>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
     <div
      style={{
       display: "flex",
       alignItems: "center",
      }}
     >
      {sellerShopLogo ? (
       <img
        src={sellerShopLogo}
        alt="Seller Shop Logo"
        style={{
         width: "60px",
         height: "60px",
         marginRight: "10px",
         borderRadius: "50%",
         objectFit: "cover",
        }}
       />
      ) : (
       <span
        style={{
         width: "30px",
         height: "30px",
         marginRight: "10px",
         backgroundColor: "#E94560",
         borderRadius: "50%",
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         color: "white",
         fontSize: "14px",
         fontWeight: "bold",
         textAlign: "center",
        }}
       >
        T
       </span>
      )}

      <span
       style={{
        fontSize: "14px",
        color: "#555",
        fontWeight: "bold",
       }}
      >
       {sellerShopName}
       <br />
       <span
        style={{
         color: "#28a745",
         marginRight: "5px",
        }}
       >
        ✓
       </span>{" "}
       Verified Seller
      </span>
     </div>
     <div>
      <a
       href={`/shops/${shopUrl}`}
       style={{
        color: "#fff",
        backgroundColor: "#E94560",
        textDecoration: "none",
        cursor: "pointer",
        display: "inline-block",
        marginTop: "10px",
        padding: "5px 10px",
        borderRadius: "10px",
        fontSize: "14px",
       }}
      >
       Visit Profile
      </a>
     </div>
    </div>
   </div>
  </div>
 );
};

// Updated ProductView component with shipping info tab
const ProductView: React.FC<{
 description: string;
 productId: string;
 shippingProps?: {
  sellerShopName: string;
  sellerShopLogo: string;
  shopUrl: string;
  delivery_type: string;
  qrCodeUrl: string | null;
  express_deliverey: number;
 };
 isDesktop: boolean;
}> = ({ description, productId, shippingProps, isDesktop }) => {
 const [selectedOption, setSelectedOption] = useState("description");
 const handleOptionClick = (opt: any) => () => setSelectedOption(opt);

 return (
  <>
   <FlexBox borderBottom="1px solid" borderColor="gray.400" mt="5px" mb="26px">
    <H5
     mr="25px"
     p="4px 10px"
     className="cursor-pointer"
     borderColor="primary.main"
     onClick={handleOptionClick("description")}
     borderBottom={selectedOption === "description" ? "2px solid" : ""}
     color={selectedOption === "description" ? "primary.main" : "text.muted"}
     fontSize="14px"
    >
     Description
    </H5>

    {/* Add shipping tab only when shippingProps is provided (mobile only) */}
    {shippingProps && (
     <H5
      mr="25px"
      p="4px 10px"
      className="cursor-pointer"
      borderColor="primary.main"
      onClick={handleOptionClick("shipping")}
      borderBottom={selectedOption === "shipping" ? "2px solid" : ""}
      color={selectedOption === "shipping" ? "primary.main" : "text.muted"}
      fontSize="14px"
     >
      Shipping & Returns
     </H5>
    )}

    <H5
     p="4px 10px"
     className="cursor-pointer"
     borderColor="primary.main"
     onClick={handleOptionClick("review")}
     borderBottom={selectedOption === "review" ? "2px solid" : ""}
     color={selectedOption === "review" ? "primary.main" : "text.muted"}
     fontSize="14px"
    >
     Review
    </H5>
   </FlexBox>

   <Box mb="50px">
    {selectedOption === "description" && (
     <ProductDescription description={description} />
    )}
    {selectedOption === "shipping" && shippingProps && (
     <div>
      <ShippingInfo
       isDesktop={isDesktop}
       sellerShopName={shippingProps.sellerShopName}
       sellerShopLogo={shippingProps.sellerShopLogo}
       shopUrl={shippingProps.shopUrl}
       delivery_type={shippingProps.delivery_type}
       qrCodeUrl={shippingProps.qrCodeUrl}
       express_deliverey={shippingProps.express_deliverey}
       showInTab={true}
      />
     </div>
    )}
    {selectedOption === "review" && <ProductReview productId={productId} />}
   </Box>
  </>
 );
};

const ProductDetails: React.FC<Props> = ({ params, fallbackData }) => {
 const { slug } = params;
 const { data: productData, isLoading } = useFetcher(
  `product/details/${slug}`,
  { fallbackData }
 );

 const [isDesktop, setIsDesktop] = useState(true);
 const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
 const [qrCode, setQrCode] = useState<string | null>(null);

 useEffect(() => {
  const handleResize = () => {
   setIsDesktop(window.innerWidth >= 1024);
  };

  handleResize();
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
 }, []);

 useEffect(() => {
  const fetchData = async () => {
   const qrCodeData = await fetchQRCode(slug);
   if (qrCodeData) {
    setQrCodeUrl(qrCodeData);
   } else {
    console.log("No QR Code data received.");
   }
   setQrCode(qrCodeData);
  };

  fetchData();
 }, [slug]);

 if (isLoading) return <Loading />;

 if (!productData || !productData.productsingledetails) {
  return (
   <FlexBox justifyContent="center" alignItems="center" width="100%">
    <SemiSpan>No products found.</SemiSpan>
   </FlexBox>
  );
 }

 const product = productData.productsingledetails;
 const productImages = productData.productmultiimages;
 const images = productImages.map((img: any) => img.product_img);
 const description = product.short_description;
 const sellerShopName = product.seller_shop_name;
 const sellerShopLogo = product.seller_shop_logo;
 const shopUrl = product.seller_shop_slug;
 const delivery_type = product.delivereyType;
 const warranty = productData.warranty;
 const warrantyType = productData.warrantytype;
 const replacewarranty = productData.replacement_warranty;
 const express_deliverey = product.express_deliverey;
 const sizeColor = productData.productsingledetails.SizeColor;
 const campaignBannerImage =
  productData.productsingledetails?.campaign?.banner_image;
 const campaignSlug = productData.productsingledetails?.campaign?.slug;

 // Get shipping info props for tab usage
 const shippingProps = {
  sellerShopName,
  sellerShopLogo,
  shopUrl,
  delivery_type,
  qrCodeUrl,
  express_deliverey,
 };

 // Create shipping info component for sidebar
 const shippingInfoComponent = (
  <ShippingInfo
   isDesktop={isDesktop}
   sellerShopName={sellerShopName}
   sellerShopLogo={sellerShopLogo}
   shopUrl={shopUrl}
   delivery_type={delivery_type}
   qrCodeUrl={qrCodeUrl}
   express_deliverey={express_deliverey}
  />
 );

 return (
  <>
   <Fragment>
    <div
     style={{
      display: "flex",
      flexDirection: isDesktop ? "row" : "column",
      gap: "20px",
      padding: "20px",
      maxWidth: "1200px",
      margin: "0 auto",
     }}
    >
     <div
      style={{
       flex: isDesktop ? "1 1 70%" : "1 1 100%",
      }}
     >
      <ProductIntro
       id={product.id}
       price={product.seeling_price}
       title={product.product_name}
       images={images}
       sellerShopName={product.seller_shop_name}
       sellerShopLogo={product.seller_shop_logo}
       rating={product.product_rating}
       discountPrice={product.discount_price}
       totalDiscount={product.total_discount}
       productStock={product.product_stock}
       productId={product.product_id}
       sellerId={product.seller_shop_id}
       slug={params.slug}
       brandName={product.brand_name}
       warranty={warranty}
       warrantyType={warrantyType}
       replacewarranty={replacewarranty}
       sizeColor={sizeColor}
       campaignBannerImage={campaignBannerImage}
       campaignSlug={campaignSlug}
      />
     </div>
     {isDesktop && (
      <div
       style={{
        flex: isDesktop ? "1 1 30%" : "1 1 100%",
       }}
      >
       {shippingInfoComponent}
      </div>
     )}
    </div>

    {/* ProductView with shipping props passed on mobile */}
    <ProductView
     description={description}
     productId={product.product_id}
     shippingProps={!isDesktop ? shippingProps : undefined}
     isDesktop={isDesktop}
    />

    <RelatedProducts productId={product.product_id} />
   </Fragment>
  </>
 );
};

export default ProductDetails;
