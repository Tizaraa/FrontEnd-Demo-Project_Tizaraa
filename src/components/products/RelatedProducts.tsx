
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Box from "@component/Box";
// import Card from "@component/Card";
// import FlexBox from "@component/FlexBox";
// import { H4 } from "@component/Typography";
// import Rating from "@component/rating";
// import { currency } from "@utils/utils";
// import { Chip } from "@component/Chip";

// import styles from "./RelatedProductsStyle.module.css";

// // Define the props for the RelatedProducts component
// interface RelatedProductsProps {
//   relatedProducts: any[]; // Accept related products as a prop
// }

// const RelatedProducts = ({ relatedProducts }: RelatedProductsProps) => {
//   const [visibleProducts, setVisibleProducts] = useState<number>(10); // State to track visible products

//   const handleShowMore = () => {
//     setVisibleProducts((prev) => prev + 10); // Load 10 more products
//   };

//   return (
//         <Box my="2rem">
//       <h2>Related Products</h2>
//       <FlexBox 
//   className={styles.productList} // Apply the flex container styling
// >
//   {relatedProducts.length > 0 ? (
//     relatedProducts.map((item: any) => (
//       <Box 
//         key={item.product_slug} 
//         className={styles.productCard} // Use the flexbox-based card layout
//         height="350px"  
//       >
//         <Card p="1rem" borderRadius={8} display="flex" flexDirection="column" height="100%">
//           <Link href={`/product/${item.product_slug}`}>
//             <Box position="relative">
//               <img 
//                 src={item.product_thumbnail} 
//                 alt={item.product_name} 
//                 style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} 
//                 className={styles.imgPart}
//               />

//               {/* Discount Badge */}
//               {!!item.discount_price && item.discount_price < item.seeling_price && (
//   <Chip
//     top="1rem"
//     left="0.1rem"
//     p="0.25rem 0.5rem"
//     fontSize="12px"
//     fontWeight="600"
//     bg="primary.main"
//     position="absolute"
//     color="primary.text"
//     zIndex={1}
   
    
//   >
//     {Math.floor(((item.seeling_price - item.discount_price) / item.seeling_price) * 100)}% off
//   </Chip>
// )}
//             </Box>
//             <H4
//               fontWeight="600"
//               fontSize="18px"
//               mb="0.25rem"
//               style={{
//                 whiteSpace: 'nowrap',
//                 overflow: 'hidden',
//                 textOverflow: 'ellipsis', // Handle long text with ellipsis
//               }}
//             >
//               {item.product_name}
//             </H4>
//           </Link>

//           {item.rating > 0 && (
//             <Rating value={item.rating} outof={5} color="warn" readOnly />
//           )}

//           {item.discount_price == null ? (
//             <FlexBox>
//               <H4 fontWeight="600" fontSize="14px" color="primary.main">
//                 {currency(item.seeling_price)}
//               </H4>
//             </FlexBox>
//           ) : (
//             <FlexBox flexDirection="column">
//               <H4 fontWeight="600" fontSize="14px" color="text.muted">
//                 BDT <del>{(item.seeling_price)}</del>
//               </H4>
//               <Box marginTop="4px"> {/* Adjust margin as needed */}
//                 <H4 fontWeight="600" fontSize="14px" color="primary.main">
//                   {currency(item.discount_price)}
//                 </H4>
//               </Box>
//             </FlexBox>
//           )}
//         </Card>
//       </Box>
//     ))
//   ) : (
//     <p>No related products available.</p>
//   )}
// </FlexBox>


//       {/* Show More Button */}
//       {relatedProducts.length && (
//         <Box mt="1rem" textAlign="center">
//           <button 
//             onClick={handleShowMore} 
//             style={{ 
//               padding: '10px 20px', 
//               fontSize: '16px', 
//               cursor: 'pointer',
//               backgroundColor: '#e94560',
//               border: 'none',
//               borderRadius: '8px',
//               color: 'white',
//               fontWeight: 'bold',
//               outline: 'none'
//             }}
//           >
//             Show More
//           </button>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default RelatedProducts;




"use client";

import { useState } from "react";
import Link from "next/link";
import Box from "@component/Box";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import { H4 } from "@component/Typography";
import Rating from "@component/rating";
import { currency } from "@utils/utils";
import { Chip } from "@component/Chip";

import styles from "./RelatedProductsStyle.module.css";

// Define the props for the RelatedProducts component
interface RelatedProductsProps {
  relatedProducts: any[]; // Accept related products as a prop
}

const RelatedProducts = ({ relatedProducts }: RelatedProductsProps) => {
  const [visibleProducts, setVisibleProducts] = useState<number>(10); // State to track visible products

  const handleShowMore = () => {
    setVisibleProducts((prev) => prev + 10); // Load 10 more products
  };

  return (
    <Box my="2rem">
      <h2>Related Products</h2>
      <FlexBox 
        className={styles.productList} // Apply the flex container styling
      >
        {relatedProducts.length > 0 ? (
          relatedProducts.slice(0, visibleProducts).map((item: any) => (
            <Box 
              key={item.product_slug} 
              className={styles.productCard} // Use the flexbox-based card layout
              height="350px"  
            >
              <Card p="1rem" borderRadius={8} display="flex" flexDirection="column" height="100%">
                <Link href={`/product/${item.product_slug}`}>
                  <Box position="relative">
                    <img 
                      src={item.product_thumbnail} 
                      alt={item.product_name} 
                      style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} 
                      className={styles.imgPart}
                    />

                    {/* Discount Badge */}
                    {!!item.discount_price && item.discount_price < item.seeling_price && (
                      <Chip
                        top="1rem"
                        left="0.1rem"
                        p="0.25rem 0.5rem"
                        fontSize="12px"
                        fontWeight="600"
                        bg="primary.main"
                        position="absolute"
                        color="primary.text"
                        zIndex={1}
                      >
                        {Math.floor(((item.seeling_price - item.discount_price) / item.seeling_price) * 100)}% off
                      </Chip>
                    )}
                  </Box>
                  <H4
                    fontWeight="600"
                    fontSize="18px"
                    mb="0.25rem"
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.product_name}
                  </H4>
                </Link>

                {item.rating > 0 && (
                  <Rating value={item.rating} outof={5} color="warn" readOnly />
                )}

                {item.discount_price == null ? (
                  <FlexBox>
                    <H4 fontWeight="600" fontSize="14px" color="primary.main">
                      {currency(item.seeling_price)}
                    </H4>
                  </FlexBox>
                ) : (
                  <FlexBox flexDirection="column">
                    <H4 fontWeight="600" fontSize="14px" color="text.muted">
                      BDT <del>{item.seeling_price}</del>
                    </H4>
                    <Box marginTop="4px">
                      <H4 fontWeight="600" fontSize="14px" color="primary.main">
                        {currency(item.discount_price)}
                      </H4>
                    </Box>
                  </FlexBox>
                )}
              </Card>
            </Box>
          ))
        ) : (
          <p>No related products available.</p>
        )}
      </FlexBox>

      {/* Show More Button */}
      {relatedProducts.length > visibleProducts && (
        <Box mt="1rem" textAlign="center">
          <button 
            onClick={handleShowMore} 
            style={{ 
              padding: '10px 20px', 
              fontSize: '16px', 
              cursor: 'pointer',
              backgroundColor: '#e94560',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: '500',
              outline: 'none'
            }}
          >
            Show More
          </button>
        </Box>
      )}
    </Box>
  );
};

export default RelatedProducts;
