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
import DOMPurify from "dompurify";
import ResponsiveCategory from "./ResponsiveCategory";
import ProductIntro from "@component/products/ProductIntro";
import { productPageTheme as theme } from "@component/products/productPageTheme";
import tz from "../../../../theme/tizaraa";
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
import { isAxiosError } from "axios";
import { Button } from "@component/buttons";
import sc, { keyframes as scKeyframes } from "styled-components";
import { currency } from "@utils/utils";

const sRise = scKeyframes`
 from { opacity: 0; transform: translateY(10px); }
 to { opacity: 1; transform: none; }
`;
const sFade = scKeyframes`
 from { opacity: 0; transform: translateY(6px); }
 to { opacity: 1; transform: none; }
`;
const sUp = scKeyframes`
 from { transform: translateY(110%); }
 to { transform: none; }
`;

// Right-hand panel: seller first, then shipping / payments / returns rows,
// QR folded behind a button.
const SidePanel = sc.aside`
 display: flex;
 flex-direction: column;
 gap: 14px;
 animation: ${sRise} 460ms cubic-bezier(0.22, 1, 0.36, 1) 120ms both;

 .sp-seller {
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 18px;
  background: radial-gradient(90% 140% at 0% 0%, ${({ theme }) => theme.tz.color.emberTint} 0%, transparent 60%), ${({ theme }) => theme.tz.color.paper};
 }
 .sp-cap {
  margin: 0 0 10px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .sp-seller-row {
  display: flex;
  align-items: center;
  gap: 12px;
 }
 .sp-logo {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  flex-shrink: 0;
  overflow: hidden;
  border: 2px solid #fff;
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
  font-weight: 800;
  box-shadow: 0 4px 12px rgba(14, 52, 96, 0.12);
 }
 .sp-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
 }
 .sp-name {
  min-width: 0;
  margin-right: auto;
 }
 .sp-name strong {
  display: block;
  overflow: hidden;
  font-size: 14.5px;
  color: ${({ theme }) => theme.tz.color.ink};
  text-overflow: ellipsis;
  white-space: nowrap;
 }
 .sp-name span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.tone.success.fg};
 }
 .sp-visit {
  display: block;
  margin-top: 12px;
  padding: 10px;
  border-radius: 12px;
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
  font-size: 13.5px;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  transition: background-color 160ms ease, transform 160ms ease;
 }
 .sp-visit:hover {
  background: ${({ theme }) => theme.tz.color.emberDark};
  transform: translateY(-1px);
 }

 .sp-list {
  padding: 6px 16px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 18px;
  background: ${({ theme }) => theme.tz.color.paper};
 }
 .sp-row {
  display: flex;
  gap: 12px;
  padding: 12px 0;
 }
 .sp-row + .sp-row {
  border-top: 1px dashed ${({ theme }) => theme.tz.color.line};
 }
 .sp-ico {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 11px;
 }
 .sp-ico svg {
  width: 18px;
  height: 18px;
 }
 .sp-row strong {
  display: block;
  font-size: 13.5px;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .sp-row p {
  margin: 2px 0 0;
  font-size: 13px;
  line-height: 1.5;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }

 .sp-qr-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 14px;
  background: ${({ theme }) => theme.tz.color.paper};
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.inkSoft};
  text-align: left;
  cursor: pointer;
 }
 .sp-qr-btn svg:last-child {
  margin-left: auto;
  transition: transform 240ms ease;
 }
 .sp-qr-btn[aria-expanded="true"] svg:last-child {
  transform: rotate(180deg);
 }
 .sp-qr-btn:hover {
  border-color: ${({ theme }) => theme.tz.color.slate};
 }
 .sp-qr {
  padding: 14px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 14px;
  background: ${({ theme }) => theme.tz.color.paper};
  text-align: center;
  animation: ${sFade} 240ms ease both;
 }
 .sp-qr p {
  margin: 8px 0 0;
  font-size: 12.5px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .sp-visit:focus-visible,
 .sp-qr-btn:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 @media (prefers-reduced-motion: reduce) {
  animation: none;
  .sp-qr {
   animation: none;
  }
  .sp-visit,
  .sp-qr-btn svg:last-child {
   transition: none;
  }
 }
`;

// Description / Shipping / Reviews / Warranty tabs with a sliding underline
const TabsBox = sc.section`
 scroll-margin-top: 90px;
 margin-bottom: 40px;
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: 20px;
 background: ${({ theme }) => theme.tz.color.paper};
 overflow: hidden;

 .tb-bar {
  position: relative;
  display: flex;
  gap: 4px;
  padding: 0 12px;
  overflow-x: auto;
  border-bottom: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
  scrollbar-width: none;
 }
 .tb-tab {
  position: relative;
  flex-shrink: 0;
  padding: 16px 14px;
  border: 0;
  background: transparent;
  font-family: inherit;
  font-size: 14.5px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.slate};
  cursor: pointer;
  transition: color 160ms ease;
 }
 .tb-tab:hover {
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .tb-tab[aria-selected="true"] {
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .tb-tab:focus-visible {
  outline: none;
  box-shadow: inset 0 0 0 2px ${({ theme }) => theme.tz.color.ember};
 }
 .tb-ink {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  border-radius: 3px 3px 0 0;
  background: ${({ theme }) => theme.tz.color.ember};
  transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1), width 300ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 .tb-panel {
  padding: 22px 24px 26px;
  animation: ${sFade} 280ms ease both;
 }

 @media (max-width: 767px) {
  border-radius: 16px;
  .tb-panel {
   padding: 18px 16px 20px;
  }
 }
 @media (prefers-reduced-motion: reduce) {
  .tb-ink {
   transition: none;
  }
  .tb-panel {
   animation: none;
  }
 }
`;

// Phone-only bar that appears once the main Add to Cart scrolls away
const BuyBar = sc.div`
 position: fixed;
 right: 0;
 bottom: 0;
 left: 0;
 z-index: 900;
 display: flex;
 align-items: center;
 gap: 12px;
 padding: 10px 16px calc(10px + env(safe-area-inset-bottom));
 border-top: 1px solid ${({ theme }) => theme.tz.color.line};
 background: rgba(255, 255, 255, 0.96);
 backdrop-filter: blur(10px);
 -webkit-backdrop-filter: blur(10px);
 box-shadow: 0 -8px 24px rgba(14, 52, 96, 0.1);
 animation: ${sUp} 260ms cubic-bezier(0.22, 1, 0.36, 1) both;

 .bb-price {
  min-width: 0;
  margin-right: auto;
 }
 .bb-price small {
  display: block;
  overflow: hidden;
  font-size: 12px;
  color: ${({ theme }) => theme.tz.color.slate};
  text-overflow: ellipsis;
  white-space: nowrap;
 }
 .bb-price strong {
  font-size: 19px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .bb-btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  min-height: 46px;
  padding: 0 22px;
  border: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, ${({ theme }) => theme.tz.color.ember}, ${({ theme }) => theme.tz.color.emberDeep});
  color: #fff;
  font-family: inherit;
  font-size: 15px;
  font-weight: 800;
  text-decoration: none;
  cursor: pointer;
 }
 .bb-btn:disabled {
  background: ${({ theme }) => theme.tz.color.lineSoft};
  color: ${({ theme }) => theme.tz.color.slate};
 }
 @media (prefers-reduced-motion: reduce) {
  animation: none;
 }
`;

function MobileBuyBar({ title, price, stock }: { title: string; price: number; stock: number }) {
 const [show, setShow] = useState(false);
 useEffect(() => {
  const target = document.getElementById("pdp-buy");
  if (!target || typeof IntersectionObserver === "undefined") return;
  const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 });
  io.observe(target);
  return () => io.disconnect();
 }, []);
 if (!show) return null;
 const toBuy = () => {
  const box = document.getElementById("pdp-buy");
  box?.scrollIntoView({ behavior: "smooth", block: "center" });
  // reuse the real button so all cart rules stay in one place
  const btn = box?.querySelector<HTMLButtonElement>(".add-to-cart-btn");
  if (btn && !btn.disabled) setTimeout(() => btn.click(), 350);
 };
 return (
  <BuyBar role="region" aria-label="Quick buy">
   <div className="bb-price">
    <small>{title}</small>
    {price > 0 && <strong>{currency(price)}</strong>}
   </div>
   {price === 0 ? (
    <a className="bb-btn" href="/rfq">
     Request for Quote
    </a>
   ) : (
    <button type="button" className="bb-btn" onClick={toBuy} disabled={stock <= 0}>
     {stock <= 0 ? "Stock Out" : "Add to Cart"}
    </button>
   )}
  </BuyBar>
 );
}


interface Props {
  params: { slug: string };
  fallbackData: any;
}

type LoadState = "loading" | "ready" | "not_found" | "rate_limited" | "error";

const MAX_FETCH_RETRIES = 2;
const MAX_RETRY_DELAY_SECONDS = 10;

/** The route param is URL-encoded and can be malformed; never let decoding throw. */
const safeDecodeSlug = (slug: string): string => {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
};

const ShippingInfo: React.FC<{
  isDesktop: boolean;
  sellerShopLogo: string;
  sellerShopName: string;
  shopUrl: string;
  slug: string;
  showInTab?: boolean;
  isCorporateShop?: boolean;
}> = ({
  isDesktop,
  sellerShopName,
  sellerShopLogo,
  shopUrl,
  slug,
  showInTab = false,
  isCorporateShop = false,
}) => {
    const [infoPageUrl, setInfoPageUrl] = useState("");

    useEffect(() => {
      if (typeof window !== "undefined") {
        setInfoPageUrl(`${window.location.origin}/product/${slug}/info`);
      }
    }, [slug]);

    const [showQr, setShowQr] = useState(false);
    const rows = [
      {
        key: "ship",
        title: "Shipping",
        text: isCorporateShop
          ? "Delivered directly by Tizaraa's Corporate seller."
          : "Delivered directly by the seller.",
        icon: "M1 3h15v13H1zM16 8h4l3 3v5h-7zM5.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM18.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
        tone: [tz.tone.info.bg, tz.tone.info.fg],
      },
      {
        key: "pay",
        title: "Payments",
        text: isCorporateShop
          ? "Payment is made through Corporate credit."
          : "Payment is made through Tizaraa's secure checkout.",
        icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
        tone: [tz.tone.success.bg, tz.tone.success.fg],
      },
      {
        key: "ret",
        title: "Returns & Refunds",
        text: "To return a product, employees must visit the seller directly returns are processed according to the seller's own policy.",
        icon: "M9 14 4 9l5-5M4 9h11a5 5 0 0 1 0 10h-3",
        tone: [tz.tone.warning.bg, tz.tone.warning.fg],
      },
    ];
    const initial = (sellerShopName || "T").trim().charAt(0).toUpperCase();

    return (
      <SidePanel aria-label="Seller and delivery">
        <div className="sp-seller">
          <p className="sp-cap">Sold by</p>
          <div className="sp-seller-row">
            <span className="sp-logo">
              {sellerShopLogo ? <img src={sellerShopLogo} alt="" /> : initial}
            </span>
            <div className="sp-name">
              <strong title={sellerShopName}>{sellerShopName}</strong>
              <span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Verified Seller
              </span>
            </div>
          </div>
          <a className="sp-visit" href={`/shops/${shopUrl}`}>
            Visit shop
          </a>
        </div>

        <div className="sp-list">
          {rows.map((r) => (
            <div key={r.key} className="sp-row">
              <span className="sp-ico" style={{ background: r.tone[0], color: r.tone[1] }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={r.icon} />
                </svg>
              </span>
              <div>
                <strong>{r.title}</strong>
                <p>{r.text}</p>
              </div>
            </div>
          ))}
        </div>

        {infoPageUrl && !showInTab && (
          <>
            <button type="button" className="sp-qr-btn" aria-expanded={showQr} onClick={() => setShowQr((v) => !v)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <path d="M12 18h.01" />
              </svg>
              Open on your phone
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {showQr && (
              <div className="sp-qr">
                <a href={infoPageUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block" }}>
                  <QRCodeSVG value={infoPageUrl} size={130} bgColor={theme.surface} fgColor={theme.heading} level="M" />
                </a>
                <p>Scan this QR code on your phone to view full product details</p>
              </div>
            )}
          </>
        )}
      </SidePanel>
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

/**
 * Days back into the words a buyer uses — 365 reads as "1 year", 45 stays
 * "45 days". Whole units only, so 400 does not become "1.1 years".
 */
const formatDurationDays = (days?: number | null): string | null => {
  if (!days || days <= 0) return null;
  if (days % 365 === 0) {
    const years = days / 365;
    return `${years} year${years === 1 ? "" : "s"}`;
  }
  if (days % 30 === 0) {
    const months = days / 30;
    return `${months} month${months === 1 ? "" : "s"}`;
  }
  return `${days} day${days === 1 ? "" : "s"}`;
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
      duration: formatDurationDays(policy.warrantyDurationDays),
      durationLabel: "Duration",
      details: policy.warrantyDescription,
    },
    {
      title: "Replacement Warranty",
      name: policy.replacementName,
      duration: formatDurationDays(policy.replacementWindowDays),
      durationLabel: "Return window",
      details: policy.replacementConditions,
    },
  ]
    .filter((section) => section.name || section.duration || section.details)
    // Older rows stored the same string as both the label and the terms, which
    // printed the whole policy twice. Show it once.
    .map((section) =>
      section.name && section.name === section.details
        ? { ...section, name: null }
        : section
    );

  return (
    <Box
      style={{
        padding: "20px",
        backgroundColor: theme.surface,
        border: `1px solid ${theme.border}`,
        borderRadius: theme.radius,
      }}
    >
      {sections.map((section) => (
        <Box key={section.title} mb="24px">
          <H5 mb="8px" fontSize="15px">
            {section.title}
          </H5>

          {(section.name || section.duration) && (
            <FlexBox alignItems="center" flexWrap="wrap" mb="10px" style={{ gap: "8px" }}>
              {section.name && (
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: tz.tone.info.fg,
                    background: tz.tone.info.bg,
                    border: "none",
                    borderRadius: "999px",
                    padding: "3px 10px",
                  }}
                >
                  {section.name}
                </span>
              )}
              {section.duration && (
                <SemiSpan color="text.hint">
                  {section.durationLabel}: <b>{section.duration}</b>
                </SemiSpan>
              )}
            </FlexBox>
          )}

          {/* Sellers write one term per line; rendering them as a list is what
              they mean by "1. … 2. …" and keeps a long policy scannable. */}
          {section.details && (
            <ul
              style={{
                margin: 0,
                paddingLeft: "18px",
                fontSize: "14px",
                color: theme.body,
                lineHeight: 1.8,
              }}
            >
              {section.details
                .split("\n")
                .map((line) => line.replace(/^\s*\d+[.)]\s*/, "").trim())
                .filter(Boolean)
                .map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
            </ul>
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
    isCorporateShop?: boolean;
  };
  isDesktop: boolean;
}> = ({ description, productId, warrantyPolicy, shippingProps, isDesktop }) => {
  const [selectedOption, setSelectedOption] = useState("description");
  const barRef = React.useRef<HTMLDivElement>(null);
  const [ink, setInk] = useState({ x: 0, w: 0 });

  const tabs = [
    { key: "description", label: "Description" },
    // shipping tab only when shippingProps is provided (mobile only)
    ...(shippingProps ? [{ key: "shipping", label: "Shipping & Returns" }] : []),
    { key: "review", label: "Reviews" },
    ...(hasWarrantyPolicy(warrantyPolicy) ? [{ key: "warranty", label: "Warranty Policy" }] : []),
  ];

  // slide the underline under the active tab
  React.useLayoutEffect(() => {
    const el = barRef.current?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (el) setInk({ x: el.offsetLeft, w: el.offsetWidth });
  }, [selectedOption, tabs.length, isDesktop]);

  // "N reviews" link in the product info opens the Reviews tab
  useEffect(() => {
    const open = (e: Event) => {
      const key = (e as CustomEvent).detail;
      if (typeof key === "string") setSelectedOption(key);
    };
    window.addEventListener("tz:product-tab", open);
    return () => window.removeEventListener("tz:product-tab", open);
  }, []);

  return (
    <TabsBox id="pdp-tabs" aria-label="Product information">
      <div className="tb-bar" role="tablist" ref={barRef}>
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            id={`tab-${t.key}`}
            aria-selected={selectedOption === t.key}
            aria-controls={`panel-${t.key}`}
            className="tb-tab"
            onClick={() => setSelectedOption(t.key)}
          >
            {t.label}
          </button>
        ))}
        <span className="tb-ink" aria-hidden="true" style={{ width: ink.w, transform: `translateX(${ink.x}px)` }} />
      </div>

      <div key={selectedOption} className="tb-panel" role="tabpanel" id={`panel-${selectedOption}`} aria-labelledby={`tab-${selectedOption}`}>
        {selectedOption === "description" && <ProductDescription description={description} />}
        {selectedOption === "shipping" && shippingProps && (
          <ShippingInfo
            isDesktop={isDesktop}
            sellerShopName={shippingProps.sellerShopName}
            sellerShopLogo={shippingProps.sellerShopLogo}
            shopUrl={shippingProps.shopUrl}
            slug={shippingProps.slug}
            isCorporateShop={shippingProps.isCorporateShop}
            showInTab={true}
          />
        )}
        {selectedOption === "review" && <ProductReview productId={productId} />}
        {selectedOption === "warranty" && hasWarrantyPolicy(warrantyPolicy) && (
          <WarrantyPolicyView policy={warrantyPolicy!} />
        )}
      </div>
    </TabsBox>
  );
};

const ProductDetails: React.FC<Props> = ({ params, fallbackData }) => {
  const { slug } = params;

  // Replace useFetcher with direct state management to avoid caching
  const [productData, setProductData] = useState(fallbackData);
  const [loadState, setLoadState] = useState<LoadState>(fallbackData ? "ready" : "loading");
  const [reloadKey, setReloadKey] = useState(0);


  const [isDesktop, setIsDesktop] = useState(true);

  // Fetch product data on slug change (no caching). It also runs when the
  // server render could not load the product (rate limit, outage).
  useEffect(() => {
    const decodedSlug = safeDecodeSlug(slug);

    // Only fetch if we don't have fallback data or slug changed (or Retry was pressed)
    if (reloadKey === 0 && fallbackData && productData?.productsingledetails?.slug === decodedSlug) {
      return;
    }

    const controller = new AbortController();
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    const fetchProductData = async (attempt: number) => {
      setLoadState("loading");
      try {
        const response = await axios.get(
          `${ApiBaseUrl.localApiUrl}frontend/product/details/${encodeURIComponent(decodedSlug)}`,
          { signal: controller.signal }
        );
        if (response.data?.productsingledetails) {
          setProductData(response.data);
          setLoadState("ready");
        } else {
          setProductData(null);
          setLoadState("not_found");
        }
      } catch (err) {
        // Slug changed or component unmounted: a newer request owns the state.
        if (controller.signal.aborted) return;

        const status = isAxiosError(err) ? err.response?.status : undefined;

        if (status === 404) {
          setProductData(null);
          setLoadState("not_found");
          return;
        }

        // 429, 5xx and network errors are temporary: retry a few times, honouring
        // the API's retry_after (in the body; CORS hides the Retry-After header).
        const retryable = status === undefined || status === 429 || status >= 500;
        if (retryable && attempt < MAX_FETCH_RETRIES) {
          const hinted = isAxiosError(err) ? Number(err.response?.data?.retry_after) : NaN;
          const delaySeconds =
            status === 429 && hinted > 0 ? Math.min(hinted, MAX_RETRY_DELAY_SECONDS) : 2 ** attempt;
          retryTimer = setTimeout(() => fetchProductData(attempt + 1), delaySeconds * 1000);
          return;
        }

        setLoadState(status === 429 ? "rate_limited" : "error");
      }
    };

    fetchProductData(0);

    return () => {
      controller.abort();
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, [slug, reloadKey]);

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

  if (loadState === "loading") return <Loading />;

  // A temporary failure is not "no product": say so and let the user retry.
  if (loadState === "rate_limited" || loadState === "error") {
    return (
      <FlexBox flexDirection="column" justifyContent="center" alignItems="center" width="100%" py="2rem" style={{ gap: "1rem" }}>
        <SemiSpan>
          {loadState === "rate_limited"
            ? "Too many requests right now. Please try again in a few seconds."
            : "We couldn't load this product right now."}
        </SemiSpan>
        <Button variant="outlined" color="primary" onClick={() => setReloadKey((k) => k + 1)}>
          Try again
        </Button>
      </FlexBox>
    );
  }

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
  const warrantyType = productData.warrantytype;
  const replaceWarrantyObj = productData.replacement_warranty;

  // Header badges stay short — the type and the period, e.g. "Brand Warranty · 1
  // year". The full terms live in the Warranty Policy tab.
  const warranty = warrantyObj
    ? [warrantyObj.name, formatDurationDays(warrantyObj.duration_days)]
        .filter(Boolean)
        .join(" · ")
    : null;
  const replacewarranty = replaceWarrantyObj
    ? replaceWarrantyObj.name ??
      (replaceWarrantyObj.return_window_days
        ? `${replaceWarrantyObj.return_window_days}-day replacement`
        : null)
    : null;
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

  const isCorporateShop = Boolean(product.is_corporate_shop);

  // Get shipping info props for tab usage
  const shippingProps = {
    sellerShopName,
    sellerShopLogo,
    shopUrl,
    slug: params.slug,
    isCorporateShop,
  };

  // Create shipping info component for sidebar
  const shippingInfoComponent = (
    <ShippingInfo
      isDesktop={isDesktop}
      sellerShopName={sellerShopName}
      sellerShopLogo={sellerShopLogo}
      shopUrl={shopUrl}
      slug={params.slug}
      isCorporateShop={isCorporateShop}
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
              productCode={product.product_code ?? null}
              unitOfMeasure={unitOfMeasure}
              warranty={warranty}
              warrantyType={warrantyType}
              replacewarranty={replacewarranty}
              sizeColor={sizeColor}
              campaignBannerImage={campaignBannerImage}
              campaignSlug={campaignSlug}
              isCorporateShop={isCorporateShop}
            />

            {/* Short description summary — sits under the intro so the left
                column fills the space beside the taller sidebar */}
            {shortDescription ? (
              <div
                style={{
                  marginTop: "20px",
                  padding: "14px 16px",
                  fontSize: "14px",
                  color: theme.body,
                  lineHeight: 1.65,
                  background: tz.color.mist,
                  borderLeft: `3px solid ${tz.color.ember}`,
                  borderRadius: "0 14px 14px 0",
                }}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(shortDescription) }}
              />
            ) : null}
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

        {!isDesktop && (
          <MobileBuyBar
            title={product.product_name}
            price={Number(product.discount_price || product.selling_price || 0)}
            stock={Number(product.product_stock ?? 0)}
          />
        )}
      </Fragment>
    </>
  );
};

export default ProductDetails;
