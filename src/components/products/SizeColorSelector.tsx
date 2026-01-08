"use client";

import React, { useState, useMemo } from "react";
import Typography from "@component/Typography";

// ----- Types -----
type B2BPrice = {
 min_qty: number;
 price: number;
};

type SizeColorOption = {
 size: string;
 color: string;
 price: number;
 b2bPricing: B2BPrice[];
 stock: number;
};

type SizeColorSelectorProps = {
 productId: string | number;
 sellerId: string | number;
 stockQuantity: number;
 setSelectedSize: (size: string | null) => void;
 setSelectedColor: (color: string | null) => void;
 dummySizes: SizeColorOption[];
};

export default function SizeColorSelector({
 productId,
 sellerId,
 stockQuantity,
 setSelectedSize,
 setSelectedColor,
 dummySizes,
}: SizeColorSelectorProps) {
 const [selectedColor, setLocalSelectedColor] = useState<string | null>(null);
 const [selectedModel, setLocalSelectedModel] = useState<string | null>(null);

 const uniqueColors = useMemo(() => {
  const colorSet = new Set<string>();
  dummySizes.forEach((item) => {
   colorSet.add(item.color);
  });
  return Array.from(colorSet);
 }, [dummySizes]);

 const uniqueSizes = useMemo(() => {
  const sizeSet = new Set<string>();
  dummySizes.forEach((item) => {
   sizeSet.add(item.size);
  });
  return Array.from(sizeSet);
 }, [dummySizes]);

 const handleColorClick = (color: string) => {
  setLocalSelectedColor((prev) => (prev === color ? null : color));
  setSelectedColor(color);
 };

 const handleModelClick = (model: string) => {
  setLocalSelectedModel((prev) => (prev === model ? null : model));
  setSelectedSize(model);
 };

 return (
  <div
   style={{
    fontFamily: "system-ui, -apple-system, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    marginBottom: "20px",
   }}
  >
   {/* ========== Color Family Section ========== */}
   {uniqueColors.length > 0 && (
    <div style={{ marginBottom: "24px" }}>
     <div
      style={{
       display: "flex",
       gap: "8px",
       fontSize: "14px",
       color: "#666",
       marginBottom: "12px",
      }}
     >
      <span>Color Family</span>
      {selectedColor && (
       <span style={{ color: "#333", fontWeight: 500 }}>{selectedColor}</span>
      )}
     </div>
     <div style={{ display: "flex", gap: "8px" }}>
      {uniqueColors.map((color) => {
       const isSelected = selectedColor === color;
       return (
        <div
         key={color}
         onClick={() => handleColorClick(color)}
         style={{
          padding: "4px",
          border: `1px solid ${isSelected ? "#ff6b00" : "#e0e0e0"}`,
          borderRadius: "8px",
          cursor: "pointer",
          position: "relative",
          transition: "border-color 0.2s ease",
         }}
        >
         <div
          style={{
           width: "60px",
           height: "60px",
           backgroundColor: "#f0f0f0",
           display: "flex",
           alignItems: "center",
           justifyContent: "center",
           borderRadius: "4px",
          }}
         >
          <Typography variant="body2">{color}</Typography>
         </div>
         {isSelected && (
          <div
           style={{
            position: "absolute",
            bottom: "-4px",
            right: "-4px",
            width: "16px",
            height: "16px",
            backgroundColor: "#ff6b00",
            borderRadius: "50%",
           }}
          />
         )}
        </div>
       );
      })}
     </div>
    </div>
   )}

   {/* ========== Model Section ========== */}
   {uniqueSizes.length > 0 && (
    <div>
     <div
      style={{
       display: "flex",
       gap: "2px",
       alignItems: "baseline",
       fontSize: "14px",
       color: "#666",
       marginBottom: "12px",
      }}
     >
      <span>Model: </span>
      {selectedModel && (
       <span style={{ color: "#333", fontWeight: 500 }}>{selectedModel}</span>
      )}
     </div>
     <div
      style={{
       display: "grid",
       gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
       gap: "8px",
      }}
     >
      {uniqueSizes.map((model) => {
       const isSelected = selectedModel === model;
       return (
        <button
         key={model}
         onClick={() => handleModelClick(model)}
         style={{
          padding: "8px 16px",
          border: `1px solid ${isSelected ? "#ff6b00" : "#e0e0e0"}`,
          borderRadius: "8px",
          backgroundColor: "white",
          color: isSelected ? "#ff6b00" : "#333",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: isSelected ? 500 : 400,
          position: "relative",
          textAlign: "center",
          transition: "all 0.2s ease",
          outline: "none",
         }}
        >
         {model}
         {isSelected && (
          <div
           style={{
            position: "absolute",
            bottom: "-4px",
            right: "-4px",
            width: "16px",
            height: "16px",
            backgroundColor: "#ff6b00",
            borderRadius: "50%",
           }}
          />
         )}
        </button>
       );
      })}
     </div>
    </div>
   )}
  </div>
 );
}
