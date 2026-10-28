// import React from 'react';

// interface ProductDescriptionProps {
//   description: string;
// }

// export default function ProductDescription({ description = '' }: ProductDescriptionProps) {
//   return (
//     <div>
//       <div
//         className="product-description-content"
//         dangerouslySetInnerHTML={{
//           __html: description
//             .replace(/<img /g, `<img style="max-width: 100%; height: auto;" `)
//             .replace(/<table /g, `<table style="width: 100%; border-collapse: collapse;"`)
//             .replace(/<td /g, `<td style="padding: 8px; border: 1px solid #ddd;"`)
//             .replace(/<th /g, `<th style="padding: 8px; border: 1px solid #ddd;"`),
//         }}
//       />
//     </div>
//   );
// }

import React, { useState } from "react";
import { productPageTheme } from "./productPageTheme";

interface ProductDescriptionProps {
 description: string;
}

export default function ProductDescription({
 description = "",
}: ProductDescriptionProps) {
 const [isExpanded, setIsExpanded] = useState(false);

 const words = (description ?? "").split(" ");
 const isLongDescription = words.length > 214;
 const shortDescription = words.slice(0, 214).join(" ");

 return (
  // Same panel the Review tab uses, so switching tabs does not change the frame.
  <div
   style={{
    width: "100%",
    maxWidth: productPageTheme.maxWidth,
    boxSizing: "border-box",
    padding: "24px",
    backgroundColor: productPageTheme.surface,
    border: `1px solid ${productPageTheme.border}`,
    borderRadius: productPageTheme.radius,
   }}
  >
   <h3
    style={{
     margin: "0 0 16px",
     fontSize: "18px",
     fontWeight: 600,
     color: productPageTheme.heading,
    }}
   >
    Product Description
   </h3>

   <div
    className="product-description-content"
    style={{
     fontSize: "15px",
     lineHeight: 1.7,
     color: productPageTheme.body,
    }}
    dangerouslySetInnerHTML={{
     __html: (isExpanded ? description : shortDescription)
      .replace(/<img /g, `<img style="max-width: 100%; height: auto;" `)
      .replace(
       /<table /g,
       `<table style="width: 100%; border-collapse: collapse;"`
      )
      .replace(
       /<td /g,
       `<td style="padding: 8px; border: 1px solid ${productPageTheme.border};"`
      )
      .replace(
       /<th /g,
       `<th style="padding: 8px; border: 1px solid ${productPageTheme.border};"`
      ),
    }}
   />
   {isLongDescription && (
    <div
     style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
    >
     <button
      type="button"
      aria-expanded={isExpanded}
      style={{
       backgroundColor: productPageTheme.surface,
       color: productPageTheme.accent,
       padding: "10px 24px",
       borderRadius: productPageTheme.radius,
       border: `1px solid ${productPageTheme.border}`,
       fontFamily: "inherit",
       fontSize: "14px",
       fontWeight: 600,
       cursor: "pointer",
      }}
      onClick={() => setIsExpanded(!isExpanded)}
     >
      {isExpanded ? "Show Less" : "Show More"}
     </button>
    </div>
   )}
  </div>
 );
}
