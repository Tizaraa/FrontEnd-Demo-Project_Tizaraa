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



interface ProductDescriptionProps {
  description: string;
}

export default function ProductDescription({ description }: ProductDescriptionProps) {
  return (
    <div
      className="product-description"
      dangerouslySetInnerHTML={{ __html: description }}  // Render HTML description
    />
  );
}
