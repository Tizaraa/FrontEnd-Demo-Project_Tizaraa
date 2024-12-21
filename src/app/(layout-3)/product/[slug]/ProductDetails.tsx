"use client";

import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import ResponsiveCategory from "./ResponsiveCategory";
import ProductIntro from "@component/products/ProductIntro";
import ProductView from "@component/products/ProductView";
import RelatedProducts from "@component/products/RelatedProducts";
import ApiBaseUrl from "api/ApiBaseUrl";
import { SemiSpan } from "@component/Typography";
import FlexBox from "@component/FlexBox";

import { Vortex } from "react-loader-spinner";
import styled from "@emotion/styled";
import { ProductCard1 } from "@component/product-cards";
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

async function fetchProductData(slug: string) {
  try {
    const response = await axios.get(
      `${ApiBaseUrl.baseUrl}product/details/${slug}`
    );
    console.log("product details:", response.data)
    return response.data;

  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}

async function fetchQRCode(slug: string) {
  try {
    const response = await axios.get(
      `https://frontend.tizaraa.com/api/product/qr-code/${slug}`,
      { headers: { Accept: "application/xml" }, responseType: "text" } // Ensure SVG is returned as text
    );
    // console.log("nazim qr", response.data);
    
    return response.data; // Return the raw SVG XML string
  } catch (error) {
    console.error("Error fetching QR code:", error);
    return null;
  }
}


interface Props {
  params: { slug: string };
}

const ShippingInfo: React.FC<{
  isDesktop: boolean;
  sellerShopLogo: string;
  sellerShopName: string;
  shopUrl: string;
  delivery_type: string;
  qrCodeUrl: string | null;
}> = ({
  isDesktop,
  sellerShopName,
  sellerShopLogo,
  shopUrl,
  delivery_type,
  qrCodeUrl,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        boxSizing: "border-box",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {!isDesktop && (
        <button
          style={{
            display: isDesktop ? "none" : "block",
            marginBottom: "10px",
            padding: "10px",
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Hide Shipping Info" : "Show Shipping Info"}
        </button>
      )}
      {(isDesktop || isExpanded) && (
        <>
          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{
                fontSize: "20px",
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
                  fontSize: "16px",
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
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{
                fontSize: "20px",
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
                  fontSize: "16px",
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
                {/* <a href="#" style={{
                color: '#007bff',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}>View details</a> */}
              </span>
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{
                fontSize: "20px",
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
                  fontSize: "16px",
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
                {/* <a href="#" style={{
                color: '#007bff',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}>View more</a> */}
              </span>
            </div>
          </div>

          
          {qrCodeUrl && (
  <div style={{ marginBottom: "20px", textAlign: "center" }}>
    <h2
      style={{
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "10px",
        color: "#333",
      }}
    >
      QR Code
    </h2>
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(qrCodeUrl), // Sanitize and render SVG
      }}
      style={{
        maxWidth: "100%",
        height: "auto",
        marginBottom: "10px",
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
              padding: "15px",
              borderRadius: "5px",
              marginTop: "20px",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "5px",
                color: "#333",
              }}
            >
              Sold By
            </h3>
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
                    fontSize: "16px",
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
              }}
            >
              Visit Profile
            </a>
          </div>
        </>
      )}
    </div>
  );
};

const ProductDetails: React.FC<Props> = ({ params }) => {
  const [isDesktop, setIsDesktop] = useState(true);
  const [productData, setProductData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);


  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const loadProductData = async () => {
      setIsLoading(true);
      const data = await fetchProductData(params.slug);
      setProductData(data);
      setIsLoading(false);
    };

    const loadQRCode = async () => {
      setIsLoading(true);
      const qrCodeData = await fetchQRCode(params.slug);
      if (qrCodeData) {
        setQrCodeUrl(qrCodeData);
      }else {
        console.log("No QR Code data received."); // Log warning
      }
      setIsLoading(false);
    };

    loadProductData();
    loadQRCode();
  }, [params.slug]);

  if (isLoading) {
    return (
      <LoaderWrapper>
        <Vortex />
      </LoaderWrapper>
    );
  }

  // if (!qrCodeUrl) {
  //   return (
  //     <div
  //       style={{
  //         textAlign: "center",
  //         padding: "20px",
  //         color: "#555",
  //       }}
  //     >
  //       <p>QR Code is not available.</p>
  //     </div>
  //   );
  // }

  if (!productData || !productData.productsingledetails) {
    return (
      // <div style={{ padding: '20px', textAlign: 'center' }}>
      //   Product not found or there was an error loading the product.
      // </div>
      <FlexBox justifyContent="center" alignItems="center" width="100%">
            <SemiSpan>No products found.</SemiSpan>
          </FlexBox>
    );
  }

  const product = productData.productsingledetails;
  const sizecolorwithprice = productData.SizeColor.sizecolorwithprice;
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
              sizecolorwithprice={sizecolorwithprice}
              slug={params.slug}
              brandName={product.brand_name}
              warranty={warranty}
              warrantyType= {warrantyType}
              replacewarranty={replacewarranty}
            />
          </div>
          {isDesktop && (
            <div
              style={{
                flex: isDesktop ? "1 1 30%" : "1 1 100%",
              }}
            >
              <ShippingInfo
                isDesktop={isDesktop}
                sellerShopName={sellerShopName}
                sellerShopLogo={sellerShopLogo}
                shopUrl={shopUrl}
                delivery_type={delivery_type}
                qrCodeUrl={qrCodeUrl}
              />
            </div>
          )}
        </div>

        {/* <ProductView description={description} productId={product.product_id} /> */}
        <ProductView description={description} productId={product.product_id} />
        {!isDesktop && (
          <ShippingInfo
            isDesktop={isDesktop}
            sellerShopName={sellerShopName}
            sellerShopLogo={sellerShopLogo}
            shopUrl={shopUrl}
            delivery_type={delivery_type}
            qrCodeUrl={qrCodeUrl}
          />
        )}

        <RelatedProducts relatedProducts={productData.relatedproduct} />
      </Fragment>
    </>
  );
};

export default ProductDetails;
