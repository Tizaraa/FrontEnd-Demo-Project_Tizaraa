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

interface ProductDescriptionProps {
 description: string;
}

export default function ProductDescription({
 description = "",
}: ProductDescriptionProps) {
 const [isExpanded, setIsExpanded] = useState(false);

 const words = description.split(" ");
 const isLongDescription = words.length > 214;
 const shortDescription = words.slice(0, 214).join(" ");

 return (
  <div>
   <div
    className="product-description-content"
    dangerouslySetInnerHTML={{
     __html: (isExpanded ? description : shortDescription)
      .replace(/<img /g, `<img style="max-width: 100%; height: auto;" `)
      .replace(
       /<table /g,
       `<table style="width: 100%; border-collapse: collapse;"`
      )
      .replace(/<td /g, `<td style="padding: 8px; border: 1px solid #ddd;"`)
      .replace(/<th /g, `<th style="padding: 8px; border: 1px solid #ddd;"`),
    }}
   />
   {isLongDescription && (
    <div
     style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
    >
     <button
      style={{
       backgroundColor: "#e94560",
       color: "white",
       padding: "10px 20px",
       borderRadius: "8px",
       border: "none",
       cursor: "pointer",
       boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
       transition: "background-color 0.3s",
      }}
      onClick={() => setIsExpanded(!isExpanded)}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e94560")}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#e94560")}
     >
      {isExpanded ? "Show Less" : "Show More"}
     </button>
    </div>
   )}
  </div>
 );
}
