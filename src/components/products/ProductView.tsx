// "use client";

// import { useState } from "react";

// import Box from "@component/Box";
// import Shop from "@models/shop.model";
// import FlexBox from "@component/FlexBox";
// import { H5 } from "@component/Typography";
// import Product from "@models/product.model";
// import ProductReview from "@component/products/ProductReview";
// import AvailableShops from "@component/products/AvailableShops";
// import RelatedProducts from "@component/products/RelatedProducts";
// import FrequentlyBought from "@component/products/FrequentlyBought";
// import ProductDescription from "@component/products/ProductDescription";

// // ==============================================================
// type Props = {
//   // shops: Shop[];
//   // relatedProducts: Product[];
//   // frequentlyBought: Product[];
// };
// // ==============================================================

// export default function ProductView({ }: Props) {
//   const [selectedOption, setSelectedOption] = useState("description");
//   const handleOptionClick = (opt: any) => () => setSelectedOption(opt);

//   return (
//     <>
//       <FlexBox borderBottom="1px solid" borderColor="gray.400" mt="80px" mb="26px">
//         <H5
//           mr="25px"
//           p="4px 10px"
//           className="cursor-pointer"
//           borderColor="primary.main"
//           onClick={handleOptionClick("description")}
//           borderBottom={selectedOption === "description" ? "2px solid" : ""}
//           color={selectedOption === "description" ? "primary.main" : "text.muted"}>
//           Description
//         </H5>

//         <H5
//           p="4px 10px"
//           className="cursor-pointer"
//           borderColor="primary.main"
//           onClick={handleOptionClick("review")}
//           borderBottom={selectedOption === "review" ? "2px solid" : ""}
//           color={selectedOption === "review" ? "primary.main" : "text.muted"}>
//           Review (3)
//         </H5>
//       </FlexBox>

//       {/* DESCRIPTION AND REVIEW TAB DETAILS */}
//       <Box mb="50px">
//         {selectedOption === "description" && <ProductDescription />}
//         {selectedOption === "review" && <ProductReview />}
//       </Box>

      
//     </>
//   );
// }



// "use client"
// import { useState } from "react";

// import Box from "@component/Box";
// import FlexBox from "@component/FlexBox";
// import { H5 } from "@component/Typography";
// import ProductReview from "@component/products/ProductReview";
// import ProductDescription from "@component/products/ProductDescription";
// import Product from "@models/product.model";
// import RelatedProducts from "./RelatedProducts";

// // ==============================================================
// // Add description prop to the type definition
// type Props = {
//   // relatedProducts: Product[];
//   description: string;
// };
// // ==============================================================

// export default function ProductView({  description }: Props) {
//   const [selectedOption, setSelectedOption] = useState("description");
//   const handleOptionClick = (opt: any) => () => setSelectedOption(opt);

//   return (
//     <>
//       <FlexBox borderBottom="1px solid" borderColor="gray.400" mt="80px" mb="26px">
//         <H5
//           mr="25px"
//           p="4px 10px"
//           className="cursor-pointer"
//           borderColor="primary.main"
//           onClick={handleOptionClick("description")}
//           borderBottom={selectedOption === "description" ? "2px solid" : ""}
//           color={selectedOption === "description" ? "primary.main" : "text.muted"}>
//           Description
//         </H5>

//         <H5
//           p="4px 10px"
//           className="cursor-pointer"
//           borderColor="primary.main"
//           onClick={handleOptionClick("review")}
//           borderBottom={selectedOption === "review" ? "2px solid" : ""}
//           color={selectedOption === "review" ? "primary.main" : "text.muted"}>
//           Review (3)
//         </H5>
//       </FlexBox>

//       {/* DESCRIPTION AND REVIEW TAB DETAILS */}
//       <Box mb="50px">
//         {selectedOption === "description" && <ProductDescription description={description} />} {/* Pass short description here */}
//         {selectedOption === "review" && <ProductReview />}
//       </Box>

//       {/* RELATED PRODUCTS */}
//       {/* {relatedProducts && <RelatedProducts products={relatedProducts} />} */}
//     </>
//   );
// }



"use client";
import { useState } from "react";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import { H5 } from "@component/Typography";
import ProductReview from "@component/products/ProductReview";
import ProductDescription from "@component/products/ProductDescription";

type Props = {
  description: string;
  productId: string;  
};

export default function ProductView({ description, productId }: Props) {
  const [selectedOption, setSelectedOption] = useState("description");
  const handleOptionClick = (opt: any) => () => setSelectedOption(opt);

  return (
    <>
      <FlexBox borderBottom="1px solid" borderColor="gray.400" mt="80px" mb="26px">
        <H5
          mr="25px"
          p="4px 10px"
          className="cursor-pointer"
          borderColor="primary.main"
          onClick={handleOptionClick("description")}
          borderBottom={selectedOption === "description" ? "2px solid" : ""}
          color={selectedOption === "description" ? "primary.main" : "text.muted"}
        >
          Description
        </H5>

        <H5
          p="4px 10px"
          className="cursor-pointer"
          borderColor="primary.main"
          onClick={handleOptionClick("review")}
          borderBottom={selectedOption === "review" ? "2px solid" : ""}
          color={selectedOption === "review" ? "primary.main" : "text.muted"}
        >
          Review
        </H5>
      </FlexBox>

   
      <Box mb="50px">
        {selectedOption === "description" && (
          <ProductDescription description={description} />
        )}
        {selectedOption === "review" && (
          <ProductReview productId={productId} /> 
        )}
      </Box>
    </>
  );
}
