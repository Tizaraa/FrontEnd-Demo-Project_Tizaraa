// // components/ProductDetails.tsx
// "use client";
// import Box from "@component/Box";
// import FlexBox from "@component/FlexBox";
// import Typography, { H1, H2, SemiSpan } from "@component/Typography";
// import Rating from "@component/rating";
// import { currency } from "@utils/utils";
// import { Chip } from "@component/Chip";

// type ProductDetailsProps = {
//   title: string;
//   rating: number;
//   price: number;
//   discountPrice?: number;
//   totalDiscount?: number;
//   productStock: number;
// };

// const ProductDetails = ({
//   title,
//   rating,
//   price,
//   discountPrice,
//   totalDiscount,
//   productStock,
// }: ProductDetailsProps) => {
//   return (
//     <Box>
//       <H1 mb="1rem">{title}</H1>
//       <FlexBox alignItems="center" mb="1rem">
//         <Box ml="8px" mr="8px">
//           {rating > 0 && <Rating value={rating} outof={5} color="warn" readOnly />}
//         </Box>
//       </FlexBox>
//       <Box mb="24px">
//         <FlexBox alignItems="center">
//           <H2 color="primary.main" mb="4px" lineHeight="1">
//             {discountPrice ? (
//               <>
//                 {currency(discountPrice)}
//                 <span style={{ textDecoration: "line-through", color: "gray", marginRight: "10px" }}>
//                   {currency(price)}
//                 </span>
//               </>
//             ) : (
//               currency(price)
//             )}
//           </H2>

//           {!!discountPrice && totalDiscount && (
//             <Chip
//               bg="primary.main"
//               color="white"
//               px="0.5rem"
//               py="0.25rem"
//               ml="1rem"
//               fontWeight="600"
//               fontSize="12px"
//               textAlign="center"
//             >
//               {Math.floor(totalDiscount)}% off
//             </Chip>
//           )}
//         </FlexBox>
//         <SemiSpan color="inherit">{productStock > 0 ? "Stock Available" : "Stock Out"}</SemiSpan>
//       </Box>
//     </Box>
//   );
// };

// export default ProductDetails;


// components/ProductDetails.tsx
"use client";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Typography, { H1, H2, SemiSpan } from "@component/Typography";
import Rating from "@component/rating";
import { currency } from "@utils/utils";
import { Chip } from "@component/Chip";

type ProductDetailsProps = {
  title: string;
  rating: number;
  price: number;
  discountPrice?: number;
  totalDiscount?: number;
  productStock: number;
  isDirectAdd?: boolean; // New prop to indicate direct addition to cart
};

const ProductDetails = ({
  title,
  rating,
  price,
  discountPrice,
  totalDiscount,
  productStock,
  isDirectAdd = false, // Default to false if not provided
}: ProductDetailsProps) => {
  const displayPrice = isDirectAdd ? (discountPrice || price) : price; // Choose price based on direct add

  return (
    <Box>
      <H1 mb="1rem">{title}</H1>
      <FlexBox alignItems="center" mb="1rem">
        <Box ml="8px" mr="8px">
          {rating > 0 && <Rating value={rating} outof={5} color="warn" readOnly />}
        </Box>
      </FlexBox>
      <Box mb="24px">
        <FlexBox alignItems="center">
          <H2 color="primary.main" mb="4px" lineHeight="1">
            {discountPrice ? (
              <>
                {currency(discountPrice)}
                <span style={{ textDecoration: "line-through", color: "gray", marginRight: "10px" }}>
                  {currency(price)}
                </span>
              </>
            ) : (
              currency(price)
            )}
          </H2>

          {!!discountPrice && totalDiscount && (
            <Chip
              bg="primary.main"
              color="white"
              px="0.5rem"
              py="0.25rem"
              ml="1rem"
              fontWeight="600"
              fontSize="12px"
              textAlign="center"
            >
              {Math.floor(totalDiscount)}% off
            </Chip>
          )}
        </FlexBox>
        <SemiSpan color="inherit">{productStock > 0 ? "Stock Available" : "Stock Out"}</SemiSpan>
      </Box>
    </Box>
  );
};

export default ProductDetails;
