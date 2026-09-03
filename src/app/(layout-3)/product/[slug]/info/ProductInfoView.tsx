"use client";

import React, { useState } from "react";
import Rating from "@component/rating";
import ProductDescription from "@component/products/ProductDescription";
import ProductReview from "@component/products/ProductReview";
import ApiBaseUrl from "api/ApiBaseUrl";
import { productPageTheme as theme } from "@component/products/productPageTheme";

interface Props {
  productData: any;
}

const resolveImage = (img: string) =>
  img?.startsWith("http") ? img : `${ApiBaseUrl.ImgUrl}${img}`;

const cardStyle: React.CSSProperties = {
  backgroundColor: theme.surface,
  border: `1px solid ${theme.border}`,
  borderRadius: theme.radius,
  boxShadow: theme.shadow,
  padding: "18px",
};

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  margin: "0 0 10px",
  color: theme.muted,
};

const detailRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "8px 0",
  borderTop: `1px solid ${theme.border}`,
};

const detailIconStyle: React.CSSProperties = {
  width: "26px",
  height: "26px",
  flexShrink: 0,
  backgroundColor: theme.accent,
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  fontSize: "12px",
};

export default function ProductInfoView({ productData }: Props) {
  const [activeImage, setActiveImage] = useState(0);

  const product = productData.productsingledetails;
  const images: string[] = (productData.productmultiimages || []).map(
    (img: any) => img.product_img
  );
  const description = product.description || product.short_description || "";
  const warranty = productData.warranty?.name ?? productData.warranty ?? null;
  const replacementWarranty =
    productData.replacement_warranty?.name ??
    productData.replacement_warranty ??
    null;

  const mainImage = images[activeImage] || images[0];

  return (
    <div
      style={{
        maxWidth: "480px",
        margin: "0 auto",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        fontFamily: "__Open_Sans_9c011f, __Open_Sans_Fallback_9c011f",
      }}
    >
      {/* Product image + gallery */}
      <div style={cardStyle}>
        {mainImage && (
          <div
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              borderRadius: theme.radiusSmall,
              overflow: "hidden",
              backgroundColor: "#F5F6F8",
              marginBottom: images.length > 1 ? "10px" : 0,
            }}
          >
            <img
              src={resolveImage(mainImage)}
              alt={product.product_name}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        )}

        {images.length > 1 && (
          <div style={{ display: "flex", gap: "8px", overflowX: "auto" }}>
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                style={{
                  width: "52px",
                  height: "52px",
                  flexShrink: 0,
                  padding: 0,
                  borderRadius: theme.radiusSmall,
                  overflow: "hidden",
                  border:
                    idx === activeImage
                      ? `2px solid ${theme.accent}`
                      : `1px solid ${theme.border}`,
                  cursor: "pointer",
                  backgroundColor: "#F5F6F8",
                }}
              >
                <img
                  src={resolveImage(img)}
                  alt={`${product.product_name} ${idx + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Title, price, rating */}
      <div style={cardStyle}>
        <h1
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: theme.heading,
            margin: "0 0 8px",
          }}
        >
          {product.product_name}
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
          <Rating value={product.product_rating || 0} readOnly size="small" />
          <span style={{ fontSize: "12px", color: theme.muted }}>
            ({product.product_rating ?? 0})
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
          <span style={{ fontSize: "22px", fontWeight: 700, color: theme.accent }}>
            BDT {Number(product.discount_price || product.selling_price).toFixed(2)}
          </span>
          {product.discount_price && product.discount_price < product.selling_price && (
            <span
              style={{
                fontSize: "14px",
                color: theme.muted,
                textDecoration: "line-through",
              }}
            >
              BDT {Number(product.selling_price).toFixed(2)}
            </span>
          )}
        </div>

        {product.product_stock ? (
          <p style={{ fontSize: "13px", color: theme.body, margin: "8px 0 0" }}>
            {product.product_stock} Products Available
          </p>
        ) : null}
      </div>

      {/* Details */}
      <div style={cardStyle}>
        <h2 style={sectionHeadingStyle}>Details</h2>

        <div style={{ ...detailRowStyle, borderTop: "none" }}>
          <span style={detailIconStyle}>🏷️</span>
          <span style={{ fontSize: "13.5px", color: theme.body }}>
            Brand: <strong style={{ color: theme.heading }}>{product.brand_name || "N/A"}</strong>
          </span>
        </div>
        <div style={detailRowStyle}>
          <span style={detailIconStyle}>🛡️</span>
          <span style={{ fontSize: "13.5px", color: theme.body }}>
            Warranty: <strong style={{ color: theme.heading }}>{warranty || "N/A"}</strong>
          </span>
        </div>
        <div style={detailRowStyle}>
          <span style={detailIconStyle}>🔄</span>
          <span style={{ fontSize: "13.5px", color: theme.body }}>
            Replacement warranty:{" "}
            <strong style={{ color: theme.heading }}>{replacementWarranty || "N/A"}</strong>
          </span>
        </div>
        {product.seller_shop_name && (
          <div style={detailRowStyle}>
            <span style={detailIconStyle}>🏬</span>
            <span style={{ fontSize: "13.5px", color: theme.body }}>
              Sold by: <strong style={{ color: theme.heading }}>{product.seller_shop_name}</strong>
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      <ProductDescription description={description} />

      {/* Reviews */}
      <ProductReview productId={product.product_id} />
    </div>
  );
}
