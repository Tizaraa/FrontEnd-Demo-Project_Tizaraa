// "use client";

// import React, { Fragment, useState, useEffect } from "react";
// import DOMPurify from "dompurify";
// import ResponsiveCategory from "./ResponsiveCategory";
// import ProductIntro from "@component/products/ProductIntro";
// import RelatedProducts from "@component/products/RelatedProducts";
// import ApiBaseUrl from "api/ApiBaseUrl";
// import { SemiSpan } from "@component/Typography";
// import FlexBox from "@component/FlexBox";

// import { Vortex } from "react-loader-spinner";
// import styled from "@emotion/styled";
// import { ProductCard1 } from "@component/product-cards";
// import Loading from "./loading";

// // Updated ProductView component
// import Box from "@component/Box";
// import { H5 } from "@component/Typography";
// import ProductReview from "@component/products/ProductReview";
// import ProductDescription from "@component/products/ProductDescription";
// import axios from "@lib/axiosClient";
// import useFetcher from "@hook/useFetcher";

// async function fetchQRCode(slug: string) {
//  try {
//   const response = await axios.get(
//    `${ApiBaseUrl.baseUrl}product/qr-code/${slug}`,
//    { headers: { Accept: "application/xml" }, responseType: "text" }
//   );

//   return response.data;
//  } catch (error) {
//   console.error("Error fetching QR code:", error);
//   return null;
//  }
// }

// interface Props {
//  params: { slug: string };
//  fallbackData: any;
// }

// const ShippingInfo: React.FC<{
//  isDesktop: boolean;
//  sellerShopLogo: string;
//  sellerShopName: string;
//  shopUrl: string;
//  delivery_type: string;
//  qrCodeUrl: string | null;
//  express_deliverey: number;
//  showInTab?: boolean;
// }> = ({
//  isDesktop,
//  sellerShopName,
//  sellerShopLogo,
//  shopUrl,
//  delivery_type,
//  qrCodeUrl,
//  express_deliverey,
//  showInTab = false,
// }) => {
//  const [showDeliveryChart, setShowDeliveryChart] = useState(false);

//  return (
//   <div
//    style={{
//     fontFamily: "__Open_Sans_9c011f, __Open_Sans_Fallback_9c011f",
//     maxWidth: "400px",
//     margin: "0 auto",
//     padding: "20px",
//     boxSizing: "border-box",
//     backgroundColor: "#f9f9f9",
//     borderRadius: "8px",
//     boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//    }}
//   >
//    <div style={{ marginBottom: "20px" }}>
//     <h2
//      style={{
//       fontSize: "14px",
//       fontWeight: "bold",
//       marginBottom: "10px",
//       color: "#333",
//      }}
//     >
//      Shipping
//     </h2>
//     <div
//      style={{
//       display: "flex",
//       alignItems: "center",
//       marginBottom: "10px",
//      }}
//     >
//      <span
//       style={{
//        width: "30px",
//        height: "30px",
//        marginRight: "10px",
//        backgroundColor: theme.accent,
//        borderRadius: "50%",
//        display: "flex",
//        justifyContent: "center",
//        alignItems: "center",
//        color: "white",
//        fontSize: "14px",
//       }}
//      >
//       🚚
//      </span>
//      <span
//       style={{
//        fontSize: "14px",
//        color: "#555",
//       }}
//      >
//       {delivery_type}
//      </span>
//      <button
//       onClick={() => setShowDeliveryChart(true)}
//       style={{
//        marginLeft: "10px",
//        fontSize: "10px",
//        color: theme.accent,
//        background: "none",
//        border: "none",
//        textDecoration: "underline",
//        cursor: "pointer",
//       }}
//      >
//       Price Chart for Delivery
//      </button>
//     </div>

//     {/* Delivery Price Chart Modal */}
//     {showDeliveryChart && (
//      <div
//       style={{
//        position: "fixed",
//        top: 0,
//        left: 0,
//        right: 0,
//        bottom: 0,
//        backgroundColor: "rgba(0,0,0,0.5)",
//        display: "flex",
//        justifyContent: "center",
//        alignItems: "center",
//        zIndex: 1000,
//       }}
//      >
//       <div
//        style={{
//         backgroundColor: "white",
//         padding: "20px",
//         borderRadius: "8px",
//         width: "300px",
//        }}
//       >
//        <h3
//         style={{
//          fontSize: "15px",
//          fontWeight: "bold",
//          marginBottom: "15px",
//          color: "#333",
//          display: "flex",
//          justifyContent: "space-between",
//         }}
//        >
//         Delivery Cost Breakdown
//         <button
//          onClick={() => setShowDeliveryChart(false)}
//          style={{
//           background: theme.accent,
//           border: "none",
//           fontSize: "18px",
//           cursor: "pointer",
//           color: "#fff",
//          }}
//         >
//          ×
//         </button>
//        </h3>
//        <ul
//         style={{
//          listStyle: "none",
//          padding: 0,
//          margin: 0,
//          fontSize: "12px",
//         }}
//        >
//         <li
//          style={{
//           padding: "8px 0",
//           borderBottom: "1px solid #eee",
//           fontSize: "14px",
//          }}
//         >
//          Base Rate (First 1 kg): <strong>60 BDT</strong>
//         </li>
//         <li
//          style={{
//           padding: "8px 0",
//           borderBottom: "1px solid #eee",
//           fontSize: "14px",
//          }}
//         >
//          Additional Weight (Per kg): <strong>25 BDT/kg</strong>
//         </li>
//        </ul>
//        <div
//         style={{
//          marginTop: "15px",
//          fontSize: "12px",
//          color: theme.accent,
//         }}
//        >
//         * Delivery charges are calculated based on the total weight of your
//         order.
//        </div>
//       </div>
//      </div>
//     )}
//    </div>

//    {/* express delivery  */}
//    <div style={{ marginBottom: "20px" }}>
//     <h2
//      style={{
//       fontSize: "14px",
//       fontWeight: "bold",
//       marginBottom: "10px",
//       color: "#333",
//      }}
//     >
//      Express Delivery
//     </h2>
//     <div
//      style={{
//       display: "flex",
//       alignItems: "center",
//       marginBottom: "10px",
//      }}
//     >
//      <span
//       style={{
//        width: "30px",
//        height: "30px",
//        marginRight: "10px",
//        backgroundColor: express_deliverey === 1 ? "#E94560" : "#ccc",
//        borderRadius: "50%",
//        display: "flex",
//        justifyContent: "center",
//        alignItems: "center",
//        color: "white",
//        fontSize: "14px",
//       }}
//      >
//       🚚
//      </span>
//      <span
//       style={{
//        fontSize: "14px",
//        color: "#555",
//       }}
//      >
//       {express_deliverey === 1
//        ? "Express Delivery is possible!"
//        : "Express Delivery is not available."}
//      </span>
//     </div>
//    </div>

//    <div style={{ marginBottom: "20px" }}>
//     <h2
//      style={{
//       fontSize: "14px",
//       fontWeight: "bold",
//       marginBottom: "10px",
//       color: "#333",
//      }}
//     >
//      Payments
//     </h2>
//     <div
//      style={{
//       display: "flex",
//       alignItems: "center",
//       marginBottom: "10px",
//      }}
//     >
//      <span
//       style={{
//        width: "30px",
//        height: "30px",
//        marginRight: "10px",
//        backgroundColor: theme.accent,
//        borderRadius: "50%",
//        display: "flex",
//        justifyContent: "center",
//        alignItems: "center",
//        color: "white",
//        fontSize: "14px",
//       }}
//      >
//       🎧
//      </span>
//      <span
//       style={{
//        fontSize: "14px",
//        color: "#555",
//       }}
//      >
//       Contact us 24 hours a day, 7 days a week.
//      </span>
//     </div>
//    </div>

//    <div style={{ marginBottom: "10px" }}>
//     <h2
//      style={{
//       fontSize: "14px",
//       fontWeight: "bold",
//       marginBottom: "10px",
//       color: "#333",
//      }}
//     >
//      Returns & Refunds
//     </h2>
//     <div
//      style={{
//       display: "flex",
//       alignItems: "center",
//      }}
//     >
//      <span
//       style={{
//        width: "30px",
//        height: "30px",
//        marginRight: "10px",
//        backgroundColor: theme.accent,
//        borderRadius: "50%",
//        display: "flex",
//        justifyContent: "center",
//        alignItems: "center",
//        color: "white",
//        fontSize: "14px",
//        padding: "5px 10px",
//       }}
//      >
//       💳
//      </span>
//      <span
//       style={{
//        fontSize: "14px",
//        color: "#555",
//       }}
//      >
//       Eligible for refunds within 30 days of receiving products.
//      </span>
//     </div>
//    </div>

//    {qrCodeUrl && (
//     <div style={{ textAlign: "center" }}>
//      <div
//       dangerouslySetInnerHTML={{
//        __html: DOMPurify.sanitize(qrCodeUrl),
//       }}
//       style={{
//        maxWidth: "100%",
//        height: "70px",
//        marginBottom: "10px",
//        transform: "scale(2)",
//        transformOrigin: "top left",
//        display: "inline-block",
//       }}
//      ></div>
//      <p
//       style={{
//        fontSize: "14px",
//        color: "#555",
//       }}
//      >
//       Scan this QR code for product information
//      </p>
//     </div>
//    )}

//    <div
//     style={{
//      backgroundColor: "#fff",
//      borderRadius: "5px",
//     }}
//    >
//     <h3
//      style={{
//       fontSize: "14px",
//       fontWeight: "bold",
//       marginBottom: "5px",
//       color: "#333",
//      }}
//     >
//      Sold By
//     </h3>
//     <div style={{ display: "flex", justifyContent: "space-between" }}>
//      <div
//       style={{
//        display: "flex",
//        alignItems: "center",
//       }}
//      >
//       {sellerShopLogo ? (
//        <img
//         src={sellerShopLogo}
//         alt="Seller Shop Logo"
//         style={{
//          width: "60px",
//          height: "60px",
//          marginRight: "10px",
//          borderRadius: "50%",
//          objectFit: "cover",
//         }}
//        />
//       ) : (
//        <span
//         style={{
//          width: "30px",
//          height: "30px",
//          marginRight: "10px",
//          backgroundColor: theme.accent,
//          borderRadius: "50%",
//          display: "flex",
//          justifyContent: "center",
//          alignItems: "center",
//          color: "white",
//          fontSize: "14px",
//          fontWeight: "bold",
//          textAlign: "center",
//         }}
//        >
//         T
//        </span>
//       )}

//       <span
//        style={{
//         fontSize: "14px",
//         color: "#555",
//         fontWeight: "bold",
//        }}
//       >
//        {sellerShopName}
//        <br />
//        <span
//         style={{
//          color: "#28a745",
//          marginRight: "5px",
//         }}
//        >
//         ✓
//        </span>{" "}
//        Verified Seller
//       </span>
//      </div>
//      <div>
//       <a
//        href={`/shops/${shopUrl}`}
//        style={{
//         color: "#fff",
//         backgroundColor: theme.accent,
//         textDecoration: "none",
//         cursor: "pointer",
//         display: "inline-block",
//         marginTop: "10px",
//         padding: "5px 10px",
//         borderRadius: "10px",
//         fontSize: "14px",
//        }}
//       >
//        Visit Profile
//       </a>
//      </div>
//     </div>
//    </div>
//   </div>
//  );
// };

// // Updated ProductView component with shipping info tab
// const ProductView: React.FC<{
//  description: string;
//  productId: string;
//  shippingProps?: {
//   sellerShopName: string;
//   sellerShopLogo: string;
//   shopUrl: string;
//   delivery_type: string;
//   qrCodeUrl: string | null;
//   express_deliverey: number;
//  };
//  isDesktop: boolean;
// }> = ({ description, productId, shippingProps, isDesktop }) => {
//  const [selectedOption, setSelectedOption] = useState("description");
//  const handleOptionClick = (opt: any) => () => setSelectedOption(opt);

//  return (
//   <>
//    <FlexBox borderBottom="1px solid" borderColor="gray.400" mt="5px" mb="26px">
//     <H5
//      mr="25px"
//      p="4px 10px"
//      className="cursor-pointer"
//      borderColor="primary.main"
//      onClick={handleOptionClick("description")}
//      borderBottom={selectedOption === "description" ? "2px solid" : ""}
//      color={selectedOption === "description" ? "primary.main" : "text.muted"}
//      fontSize="14px"
//     >
//      Description
//     </H5>

//     {/* Add shipping tab only when shippingProps is provided (mobile only) */}
//     {shippingProps && (
//      <H5
//       mr="25px"
//       p="4px 10px"
//       className="cursor-pointer"
//       borderColor="primary.main"
//       onClick={handleOptionClick("shipping")}
//       borderBottom={selectedOption === "shipping" ? "2px solid" : ""}
//       color={selectedOption === "shipping" ? "primary.main" : "text.muted"}
//       fontSize="14px"
//      >
//       Shipping & Returns
//      </H5>
//     )}

//     <H5
//      p="4px 10px"
//      className="cursor-pointer"
//      borderColor="primary.main"
//      onClick={handleOptionClick("review")}
//      borderBottom={selectedOption === "review" ? "2px solid" : ""}
//      color={selectedOption === "review" ? "primary.main" : "text.muted"}
//      fontSize="14px"
//     >
//      Review
//     </H5>
//    </FlexBox>

//    <Box mb="50px">
//     {selectedOption === "description" && (
//      <ProductDescription description={description} />
//     )}
//     {selectedOption === "shipping" && shippingProps && (
//      <div>
//       <ShippingInfo
//        isDesktop={isDesktop}
//        sellerShopName={shippingProps.sellerShopName}
//        sellerShopLogo={shippingProps.sellerShopLogo}
//        shopUrl={shippingProps.shopUrl}
//        delivery_type={shippingProps.delivery_type}
//        qrCodeUrl={shippingProps.qrCodeUrl}
//        express_deliverey={shippingProps.express_deliverey}
//        showInTab={true}
//       />
//      </div>
//     )}
//     {selectedOption === "review" && <ProductReview productId={productId} />}
//    </Box>
//   </>
//  );
// };

// const ProductDetails: React.FC<Props> = ({ params, fallbackData }) => {
//  const { slug } = params;
//  const { data: productData, isLoading } = useFetcher(
//   `product/details/${slug}`,
//   { fallbackData }
//  );

//  const [isDesktop, setIsDesktop] = useState(true);
//  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
//  const [qrCode, setQrCode] = useState<string | null>(null);

//  useEffect(() => {
//   const handleResize = () => {
//    setIsDesktop(window.innerWidth >= 1024);
//   };

//   handleResize();
//   window.addEventListener("resize", handleResize);

//   return () => window.removeEventListener("resize", handleResize);
//  }, []);

//  useEffect(() => {
//   const fetchData = async () => {
//    const qrCodeData = await fetchQRCode(slug);
//    if (qrCodeData) {
//     setQrCodeUrl(qrCodeData);
//    } else {
//     console.log("No QR Code data received.");
//    }
//    setQrCode(qrCodeData);
//   };

//   fetchData();
//  }, [slug]);

//  if (isLoading) return <Loading />;

//  if (!productData || !productData.productsingledetails) {
//   return (
//    <FlexBox justifyContent="center" alignItems="center" width="100%">
//     <SemiSpan>No products found.</SemiSpan>
//    </FlexBox>
//   );
//  }

//  const product = productData.productsingledetails;
//  const productImages = productData.productmultiimages;
//  const images = productImages.map((img: any) => img.product_img);
//  const description = product.short_description;
//  const sellerShopName = product.seller_shop_name;
//  const sellerShopLogo = product.seller_shop_logo;
//  const shopUrl = product.seller_shop_slug;
//  const delivery_type = product.delivereyType;
//  const warranty = productData.warranty;
//  const warrantyType = productData.warrantytype;
//  const replacewarranty = productData.replacement_warranty;
//  const express_deliverey = product.express_deliverey;
//  const sizeColor = productData.productsingledetails.SizeColor;
//  const campaignBannerImage =
//   productData.productsingledetails?.campaign?.banner_image;
//  const campaignSlug = productData.productsingledetails?.campaign?.slug;

//  // Get shipping info props for tab usage
//  const shippingProps = {
//   sellerShopName,
//   sellerShopLogo,
//   shopUrl,
//   delivery_type,
//   qrCodeUrl,
//   express_deliverey,
//  };

//  // Create shipping info component for sidebar
//  const shippingInfoComponent = (
//   <ShippingInfo
//    isDesktop={isDesktop}
//    sellerShopName={sellerShopName}
//    sellerShopLogo={sellerShopLogo}
//    shopUrl={shopUrl}
//    delivery_type={delivery_type}
//    qrCodeUrl={qrCodeUrl}
//    express_deliverey={express_deliverey}
//   />
//  );

//  return (
//   <>
//    <Fragment>
//     <div
//      style={{
//       display: "flex",
//       flexDirection: isDesktop ? "row" : "column",
//       gap: "20px",
//       padding: "20px",
//       maxWidth: "1200px",
//       margin: "0 auto",
//      }}
//     >
//      <div
//       style={{
//        flex: isDesktop ? "1 1 70%" : "1 1 100%",
//       }}
//      >
//       <ProductIntro
//        id={product.id}
//        price={product.selling_price}
//        title={product.product_name}
//        images={images}
//        sellerShopName={product.seller_shop_name}
//        sellerShopLogo={product.seller_shop_logo}
//        rating={product.product_rating}
//        discountPrice={product.discount_price}
//        totalDiscount={product.total_discount}
//        productStock={product.product_stock}
//        productId={product.product_id}
//        sellerId={product.seller_shop_id}
//        slug={params.slug}
//        brandName={product.brand_name}
//        warranty={warranty}
//        warrantyType={warrantyType}
//        replacewarranty={replacewarranty}
//        sizeColor={sizeColor}
//        campaignBannerImage={campaignBannerImage}
//        campaignSlug={campaignSlug}
//       />
//      </div>
//      {isDesktop && (
//       <div
//        style={{
//         flex: isDesktop ? "1 1 30%" : "1 1 100%",
//        }}
//       >
//        {shippingInfoComponent}
//       </div>
//      )}
//     </div>

//     {/* ProductView with shipping props passed on mobile */}
//     <ProductView
//      description={description}
//      productId={product.product_id}
//      shippingProps={!isDesktop ? shippingProps : undefined}
//      isDesktop={isDesktop}
//     />

//     <RelatedProducts productId={product.product_id} />
//    </Fragment>
//   </>
//  );
// };

// export default ProductDetails;




"use client";

import React, { Fragment, useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import ResponsiveCategory from "./ResponsiveCategory";
import ProductIntro from "@component/products/ProductIntro";
import { productPageTheme as theme } from "@component/products/productPageTheme";
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

interface Props {
  params: { slug: string };
  fallbackData: any;
}

const ShippingInfo: React.FC<{
  isDesktop: boolean;
  sellerShopLogo: string;
  sellerShopName: string;
  shopUrl: string;
  slug: string;
  showInTab?: boolean;
}> = ({
  isDesktop,
  sellerShopName,
  sellerShopLogo,
  shopUrl,
  slug,
  showInTab = false,
}) => {
    const [infoPageUrl, setInfoPageUrl] = useState("");

    useEffect(() => {
      if (typeof window !== "undefined") {
        setInfoPageUrl(`${window.location.origin}/product/${slug}/info`);
      }
    }, [slug]);

    // One set of styles for the four info blocks, so the card reads as one list
    // instead of four hand-tuned ones.
    const sectionStyle: React.CSSProperties = {
      padding: "14px 0",
      borderTop: `1px solid ${theme.border}`,
    };
    const headingStyle: React.CSSProperties = {
      fontSize: "11px",
      fontWeight: 700,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      margin: "0 0 8px",
      color: theme.muted,
    };
    const rowStyle: React.CSSProperties = {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    };
    const iconStyle = (active = true): React.CSSProperties => ({
      width: "28px",
      height: "28px",
      flexShrink: 0,
      backgroundColor: active ? theme.accent : "#C7CCD4",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontSize: "13px",
    });
    const textStyle: React.CSSProperties = {
      fontSize: "13.5px",
      color: theme.body,
      lineHeight: 1.5,
    };

    return (
      <div
        style={{
          fontFamily: "__Open_Sans_9c011f, __Open_Sans_Fallback_9c011f",
          maxWidth: "400px",
          margin: "0 auto",
          padding: "4px 18px 18px",
          boxSizing: "border-box",
          backgroundColor: "#FAFBFC",
          borderRadius: "10px",
          border: `1px solid ${theme.border}`,
        }}
      >
        <div style={{ ...sectionStyle, borderTop: "none" }}>
          <h2 style={headingStyle}>Shipping</h2>
          <div style={rowStyle}>
            <span style={iconStyle()}>🚚</span>
            <span style={textStyle}>
              Delivered directly by Tizaraa&apos;s in-house seller.
            </span>
          </div>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>Payments</h2>
          <div style={rowStyle}>
            <span style={iconStyle()}>🎧</span>
            <span style={textStyle}>Payment is made through Corporate credit.</span>
          </div>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>Returns & Refunds</h2>
          <div style={rowStyle}>
            <span style={iconStyle()}>💳</span>
            <span style={textStyle}>
              To return a product, employees must visit the seller directly
              
              returns are processed according to the seller&apos;s own policy.
            </span>
          </div>
        </div>

        {infoPageUrl && (
          <div style={{ ...sectionStyle, textAlign: "center" }}>
            <a
              href={infoPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block" }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "8px",
                  backgroundColor: "#fff",
                  border: `1px solid ${theme.border}`,
                  borderRadius: theme.radiusSmall,
                  marginBottom: "10px",
                }}
              >
                <QRCodeSVG
                  value={infoPageUrl}
                  size={110}
                  bgColor="#ffffff"
                  fgColor={theme.heading}
                  level="M"
                />
              </div>
            </a>
            <p style={{ ...textStyle, fontSize: "12.5px", margin: 0 }}>
              Scan this QR code on your phone to view full product details
            </p>
          </div>
        )}

        <div
          style={{
            backgroundColor: theme.surface,
            border: `1px solid ${theme.border}`,
            borderRadius: theme.radiusSmall,
            padding: "12px",
            marginTop: "14px",
          }}
        >
          <h3 style={headingStyle}>Sold By</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
            }}
          >
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
                    width: "40px",
                    height: "40px",
                    marginRight: "10px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
              ) : (
                <span
                  style={{
                    width: "30px",
                    height: "30px",
                    marginRight: "10px",
                    backgroundColor: theme.accent,
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
                  fontSize: "13.5px",
                  color: theme.heading,
                  fontWeight: 600,
                  lineHeight: 1.5,
                }}
              >
                {sellerShopName}
                <br />
                <span style={{ color: "#6B7280", fontWeight: 400 }}>
                  <span style={{ color: "#28a745", marginRight: "5px" }}>✓</span>{" "}
                  Verified Seller
                </span>
              </span>
            </div>
            <div>
              <a
                href={`/shops/${shopUrl}`}
                style={{
                  color: "#fff",
                  backgroundColor: theme.accent,
                  textDecoration: "none",
                  cursor: "pointer",
                  display: "inline-block",
                  padding: "7px 14px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
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

type WarrantyPolicy = {
  warrantyName?: string | null;
  warrantyDurationDays?: number | null;
  warrantyDescription?: string | null;
  replacementName?: string | null;
  replacementWindowDays?: number | null;
  replacementConditions?: string | null;
};

const hasWarrantyPolicy = (policy?: WarrantyPolicy | null) =>
  !!policy &&
  Object.values(policy).some(
    (value) => value !== null && value !== undefined && value !== ""
  );

const WarrantyPolicyView: React.FC<{ policy: WarrantyPolicy }> = ({ policy }) => {
  const sections = [
    {
      title: "Warranty",
      name: policy.warrantyName,
      duration:
        policy.warrantyDurationDays != null
          ? `${policy.warrantyDurationDays} days`
          : null,
      durationLabel: "Duration",
      details: policy.warrantyDescription,
    },
    {
      title: "Replacement Warranty",
      name: policy.replacementName,
      duration:
        policy.replacementWindowDays != null
          ? `${policy.replacementWindowDays} days`
          : null,
      durationLabel: "Return window",
      details: policy.replacementConditions,
    },
  ].filter((section) => section.name || section.duration || section.details);

  return (
    <Box
      style={{
        padding: "20px",
        backgroundColor: theme.surface,
        border: `1px solid ${theme.border}`,
        borderRadius: "10px",
      }}
    >
      {sections.map((section) => (
        <Box key={section.title} mb="24px">
          <H5 mb="8px" fontSize="15px">
            {section.title}
          </H5>

          {section.name && (
            <SemiSpan display="block" mb="4px" color="text.hint">
              {section.name}
            </SemiSpan>
          )}

          {section.duration && (
            <SemiSpan display="block" mb="4px" color="text.hint">
              {section.durationLabel}: {section.duration}
            </SemiSpan>
          )}

          {section.details && (
            <div
              style={{
                fontSize: "14px",
                color: "#444",
                lineHeight: 1.7,
                whiteSpace: "pre-line",
              }}
            >
              {section.details}
            </div>
          )}
        </Box>
      ))}
    </Box>
  );
};

// Updated ProductView component with shipping info tab
const ProductView: React.FC<{
  description: string;
  productId: string;
  warrantyPolicy?: WarrantyPolicy;
  shippingProps?: {
    sellerShopName: string;
    sellerShopLogo: string;
    shopUrl: string;
    slug: string;
  };
  isDesktop: boolean;
}> = ({ description, productId, warrantyPolicy, shippingProps, isDesktop }) => {
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
          mr="25px"
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

        {hasWarrantyPolicy(warrantyPolicy) && (
          <H5
            p="4px 10px"
            className="cursor-pointer"
            borderColor="primary.main"
            onClick={handleOptionClick("warranty")}
            borderBottom={selectedOption === "warranty" ? "2px solid" : ""}
            color={selectedOption === "warranty" ? "primary.main" : "text.muted"}
            fontSize="14px"
          >
            Warranty Policy
          </H5>
        )}
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
              slug={shippingProps.slug}
              showInTab={true}
            />
          </div>
        )}
        {selectedOption === "review" && <ProductReview productId={productId} />}
        {selectedOption === "warranty" && hasWarrantyPolicy(warrantyPolicy) && (
          <WarrantyPolicyView policy={warrantyPolicy!} />
        )}
      </Box>
    </>
  );
};

const ProductDetails: React.FC<Props> = ({ params, fallbackData }) => {
  const { slug } = params;

  // Replace useFetcher with direct state management to avoid caching
  const [productData, setProductData] = useState(fallbackData);
  const [isLoading, setIsLoading] = useState(!fallbackData);


  const [isDesktop, setIsDesktop] = useState(true);

  // Fetch product data on slug change (no caching)
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${ApiBaseUrl.localApiUrl}frontend/product/details/${slug}`);
        setProductData(response.data);
        console.log("Product data fetched for slug:", slug);
      } catch (err) {
        console.error("Error fetching product data:", err);
        setProductData(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if we don't have fallback data or slug changed
    if (!fallbackData || productData?.productsingledetails?.slug !== slug) {
      fetchProductData();
    }
  }, [slug]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update document title when product data changes (for client-side navigation)
  useEffect(() => {
    if (productData?.seo?.title) {
      document.title = productData.seo.title;
      console.log("Client-side title updated to:", productData.seo.title);
    } else if (productData?.productsingledetails?.product_name) {
      document.title = productData.productsingledetails.product_name;
      console.log("Client-side title updated to:", productData.productsingledetails.product_name);
    }
  }, [productData]);

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
  const description = product.description || product.short_description || '';
  const shortDescription = product.short_description || '';
  const sellerShopName = product.seller_shop_name;
  const sellerShopLogo = product.seller_shop_logo;
  const shopUrl = product.seller_shop_slug;
  const warrantyObj = productData.warranty;
  const warranty = warrantyObj?.name ?? warrantyObj ?? null;
  const warrantyType = productData.warrantytype;
  const replaceWarrantyObj = productData.replacement_warranty;
  const replacewarranty = replaceWarrantyObj?.name ?? replaceWarrantyObj ?? null;
  const warrantyPolicy: WarrantyPolicy = {
    warrantyName: warrantyObj?.name ?? null,
    warrantyDurationDays: warrantyObj?.duration_days ?? null,
    warrantyDescription: warrantyObj?.description ?? null,
    replacementName: replaceWarrantyObj?.name ?? null,
    replacementWindowDays: replaceWarrantyObj?.return_window_days ?? null,
    replacementConditions: replaceWarrantyObj?.conditions ?? null,
  };
  const sizeColor = productData.productsingledetails.SizeColor;
  const unitOfMeasure = product.unit_of_measure ?? null;
  const campaignBannerImage =
    productData.productsingledetails?.campaign?.banner_image;
  const campaignSlug = productData.productsingledetails?.campaign?.slug;

  // Get shipping info props for tab usage
  const shippingProps = {
    sellerShopName,
    sellerShopLogo,
    shopUrl,
    slug: params.slug,
  };

  // Create shipping info component for sidebar
  const shippingInfoComponent = (
    <ShippingInfo
      isDesktop={isDesktop}
      sellerShopName={sellerShopName}
      sellerShopLogo={sellerShopLogo}
      shopUrl={shopUrl}
      slug={params.slug}
    />
  );

  return (
    <>
      <Fragment>
        <div
          style={{
            padding: isDesktop ? "28px" : "16px",
            maxWidth: theme.maxWidth,
            margin: "0 auto",
            backgroundColor: theme.surface,
            borderRadius: theme.radius,
            boxShadow: theme.shadow,
            border: `1px solid ${theme.border}`,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: isDesktop ? "row" : "column",
              gap: "20px",
            }}
          >
          <div
            style={{
              flex: isDesktop ? "1 1 70%" : "1 1 100%",
            }}
          >
            <ProductIntro
              id={product.id}
              price={product.selling_price}
              title={product.product_name}
              images={images}
              sellerShopName={product.seller_shop_name}
              sellerShopLogo={product.seller_shop_logo}
              rating={product.product_rating}
              discountPrice={product.discount_price}
              totalDiscount={product.total_discount}
              productStock={product.product_stock}
              minOrderQty={product.min_order_qty}
              maxOrderQty={product.max_order_qty}
              productId={product.product_id}
              sellerId={product.seller_shop_id}
              slug={params.slug}
              brandName={product.brand_name}
              unitOfMeasure={unitOfMeasure}
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

          {/* Short description summary */}
          {shortDescription ? (
            <div
              style={{
                marginTop: "20px",
                padding: "14px 18px",
                borderLeft: `4px solid ${theme.accent}`,
                backgroundColor: theme.accentTint,
                borderRadius: theme.radiusSmall,
                fontSize: "14px",
                color: theme.body,
                lineHeight: 1.6,
              }}
              dangerouslySetInnerHTML={{ __html: shortDescription }}
            />
          ) : null}
        </div>

        {/* ProductView with shipping props passed on mobile */}
        <div
          style={{
            maxWidth: theme.maxWidth,
            margin: "24px auto 0",
            padding: isDesktop ? "0 4px" : "0 16px",
          }}
        >
          <ProductView
            description={description}
            productId={product.product_id}
            warrantyPolicy={warrantyPolicy}
            shippingProps={!isDesktop ? shippingProps : undefined}
            isDesktop={isDesktop}
          />

          <RelatedProducts productId={product.product_id} />
        </div>
      </Fragment>
    </>
  );
};

export default ProductDetails;
