// import Typography, { H3 } from "@component/Typography";

// export default function ProductDescription() {
//   return (
//     <div>
//       <H3 mb="1rem">Specification:</H3>
//       <Typography>
//         Brand: Beats <br />
//         Model: S450 <br />
//         Wireless Bluetooth Headset <br />
//         FM Frequency Response: 87.5 – 108 MHz <br />
//         Feature: FM Radio, Card Supported (Micro SD / TF) <br />
//         Made in China <br />
//       </Typography>
//     </div>
//   );
// }



// interface ProductDescriptionProps {
//   description: string;
// }

// export default function ProductDescription({ description }: ProductDescriptionProps) {
//   return (
//     <div
//       className="product-description"
//       dangerouslySetInnerHTML={{ __html: description }}  // Render HTML description
//     />
//   );
// }

// import Image from 'next/image'
// import { useState } from 'react'

// interface ProductDescriptionProps {
//   description: string;
//   imageSrc: string;
//   imageAlt: string;
// }

// export default function ProductDescription({ description, imageSrc, imageAlt }: ProductDescriptionProps = {
//   description: 'This is a sample product description. It showcases the features and benefits of our amazing product.',
//   imageSrc: '/placeholder.svg?height=300&width=400',
//   imageAlt: 'Product image'
// }) {
//   const [isExpanded, setIsExpanded] = useState(false)

//   const containerStyle: React.CSSProperties = {
//     maxWidth: '100%',
//     padding: '20px',
//     fontFamily: 'Arial, sans-serif',
//     lineHeight: '1.6',
//     color: '#333',
//   }

//   const imageStyle: React.CSSProperties = {
//     maxWidth: '100%',
//     height: 'auto',
//     marginBottom: '20px',
//   }

//   const textStyle: React.CSSProperties = {
//     fontSize: '16px',
//     marginBottom: '20px',
//   }

//   const buttonStyle: React.CSSProperties = {
//     backgroundColor: '#007bff',
//     color: 'white',
//     border: 'none',
//     padding: '10px 20px',
//     cursor: 'pointer',
//     borderRadius: '5px',
//     fontSize: '16px',
//   }

//   return (
//     <div style={containerStyle}>
//       <Image
//         src={imageSrc}
//         alt={imageAlt}
//         width={400}
//         height={300}
//         style={imageStyle}
//       />
//       <div 
//         style={{
//           ...textStyle,
//           maxHeight: isExpanded ? 'none' : '100px',
//           overflow: 'hidden',
//           position: 'relative',
//         }}
//       >
//         <div dangerouslySetInnerHTML={{ __html: description }} />
//         {!isExpanded && (
//           <div style={{
//             position: 'absolute',
//             bottom: 0,
//             left: 0,
//             right: 0,
//             height: '50px',
//             background: 'linear-gradient(rgba(255,255,255,0), rgba(255,255,255,1))',
//           }} />
//         )}
//       </div>
//       <button 
//         onClick={() => setIsExpanded(!isExpanded)}
//         style={buttonStyle}
//       >
//         {isExpanded ? 'Read Less' : 'Read More'}
//       </button>
//     </div>
//   )
// }

// import React from 'react'
// import './ProductDescription.css'

// interface ProductDescriptionProps {
//   description: string
// }

// export default function ProductDescription({ description }: ProductDescriptionProps = { description: '' }) {
//   return (
//     <div className="product-description-container">
//       <h2 className="product-description-title">Product Description</h2>
//       <div
//         className="product-description-content"
//         dangerouslySetInnerHTML={{ __html: description }}
//       />
//     </div>
//   )
// }

// import React from 'react'
// //import './ProductDescription.css'

// interface ProductDescriptionProps {
//   description: string
// }

// export default function ProductDescription({ description }: ProductDescriptionProps = { description: '' }) {
//   return (
//     <div className="product-description-container">
//       <h2 className="product-description-title">Product Description</h2>
//       <div
//         className="product-description-content"
//         dangerouslySetInnerHTML={{ __html: description }}
//       />
//     </div>
//   )
// }

import React from 'react';

interface ProductDescriptionProps {
  description: string;
}

export default function ProductDescription({ description = '' }: ProductDescriptionProps) {
  return (
    <div>
      <div
        className="product-description-content"
        dangerouslySetInnerHTML={{
          __html: description
            .replace(/<img /g, `<img style="max-width: 100%; height: auto;" `)
            .replace(/<table /g, `<table style="width: 100%; border-collapse: collapse;"`)
            .replace(/<td /g, `<td style="padding: 8px; border: 1px solid #ddd;"`)
            .replace(/<th /g, `<th style="padding: 8px; border: 1px solid #ddd;"`),
        }}
      />
    </div>
  );
}
