// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// import Box from "@component/Box";
// import Card from "@component/Card";
// import FlexBox from "@component/FlexBox";
// import { H4 } from "@component/Typography";
// import Rating from "@component/rating";
// import { currency } from "@utils/utils";

// interface RelatedProductsProps {
//   productId: string;
// }

// const RelatedProducts = ({ productId }: RelatedProductsProps) => {
//   const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
//   const [visibleProducts, setVisibleProducts] = useState<number>(10); // State to track visible products
//   const [allProducts, setAllProducts] = useState<any[]>([]); // State to store all fetched products

//   useEffect(() => {
//     const fetchRelatedProducts = async () => {
//       try {
//         const response = await axios.get(`https://frontend.tizaraa.com/api/product/details/related/product/${productId}`);
//         if (response.data) {
//           setAllProducts(response.data); // Store all fetched products
//           setRelatedProducts(response.data.slice(0, visibleProducts)); // Initially display 10 products
//         } else {
//           setRelatedProducts([]);  
//         }
//       } catch (error) {
//         console.error("Error fetching related products:", error);
//         setRelatedProducts([]); 
//       }
//     };

//     fetchRelatedProducts();
//   }, [productId, visibleProducts]);

//   const handleShowMore = () => {
//     setVisibleProducts((prev) => prev + 10); // Load 10 more products
//     setRelatedProducts(allProducts.slice(0, visibleProducts + 10)); // Update displayed products
//   };

//   return (
//     <Box my="2rem">
//       <h2>Related Products</h2>
//       <FlexBox 
//         flexWrap="wrap" 
//         justifyContent="space-between" 
//       >
//         {relatedProducts.length > 0 ? (
//           relatedProducts.map((item: any) => (
//             <Box key={item.product_slug} width="calc(20% - 16px)" minWidth="190px" maxWidth="250px" mb="16px" height="350px"  
//             >
//               <Card p="1rem" borderRadius={8} display="flex" flexDirection="column" height="100%">
//                 <Link href={`/product/${item.product_slug}`}>
//                   <Box position="relative">
//                     <img 
//                       src={item.product_thumbnail} 
//                       alt={item.product_name} 
//                       style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} 
//                     />

//                     {/* Discount Badge */}
//                     {item.discount_price != null && item.discount_price < item.seeling_price && (
//                       <Box
//                         position="absolute"
//                         top="1rem"
//                         left="1rem"
//                         bg="red"
//                         color="white"
//                         px="0.5rem"
//                         py="0.25rem"
//                         borderRadius="50%"
//                         fontWeight="600"
//                         fontSize="12px"
//                         textAlign="center"
//                       >
//                         {Math.round(((item.seeling_price - item.discount_price) / item.seeling_price) * 100)}%
//                       </Box>
//                     )}
//                   </Box>
//                   <H4
//                     fontWeight="600"
//                     fontSize="18px"
//                     mb="0.25rem"
//                     style={{
//                       whiteSpace: 'nowrap',
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis', // Handle long text with ellipsis
//                     }}
//                   >
//                     {item.product_name}
//                   </H4>
//                 </Link>
                
//                 {item.rating > 0 && (
//                   <Rating value={item.rating} outof={5} color="warn" readOnly />
//                 )}

//                 {item.discount_price == null ? (
//                   <FlexBox>
//                     <H4 fontWeight="600" fontSize="14px" color="primary.main">
//                       {currency(item.seeling_price)}
//                     </H4>
//                   </FlexBox>
//                 ) : (
//                   <FlexBox flexDirection="column">
//                     <H4 fontWeight="600" fontSize="14px" color="text.muted">
//                       BDT <del>{(item.seeling_price)}</del>
//                     </H4>
//                     <Box marginTop="4px"> {/* Adjust margin as needed */}
//                       <H4 fontWeight="600" fontSize="14px" color="primary.main">
//                         {currency(item.discount_price)}
//                       </H4>
//                     </Box>
//                   </FlexBox>
//                 )}
//               </Card>
//             </Box>
//           ))
//         ) : (
//           <p>No related products available.</p>
//         )}
//       </FlexBox>

//       {/* Show More Button */}
//       {relatedProducts.length < allProducts.length && (
//         <Box mt="1rem" textAlign="center">
//           <button 
//             onClick={handleShowMore} 
//             style={{ 
//               padding: '10px 20px', 
//               fontSize: '16px', 
//               cursor: 'pointer',
//               backgroundColor: 'orange',
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

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Box from "@component/Box";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import { H4 } from "@component/Typography";
import Rating from "@component/rating";
import { currency } from "@utils/utils";
import ApiBaseUrl from "api/ApiBaseUrl";

// Import the CSS module styles
import styles from "./RelatedProductsStyle.module.css";
import { Chip } from "@component/Chip";

interface RelatedProductsProps {
  productId: string;
}

const RelatedProducts = ({ productId }: RelatedProductsProps) => {
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<number>(10); // State to track visible products
  const [allProducts, setAllProducts] = useState<any[]>([]); // State to store all fetched products

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(`${ApiBaseUrl.baseUrl}product/details/related/product/${productId}`);
        if (response.data) {
          setAllProducts(response.data); // Store all fetched products
          setRelatedProducts(response.data.slice(0, visibleProducts)); // Initially display 10 products
        } else {
          setRelatedProducts([]);  
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
        setRelatedProducts([]); 
      }
    };

    fetchRelatedProducts();
  }, [productId, visibleProducts]);

  const handleShowMore = () => {
    setVisibleProducts((prev) => prev + 10); // Load 10 more products
    setRelatedProducts(allProducts.slice(0, visibleProducts + 10)); // Update displayed products
  };

  return (
    <Box my="2rem">
      <h2>Related Products</h2>
      <FlexBox 
  className={styles.productList} // Apply the flex container styling
>
  {relatedProducts.length > 0 ? (
    relatedProducts.map((item: any) => (
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
                textOverflow: 'ellipsis', // Handle long text with ellipsis
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
                BDT <del>{(item.seeling_price)}</del>
              </H4>
              <Box marginTop="4px"> {/* Adjust margin as needed */}
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
      {relatedProducts.length < allProducts.length && (
        <Box mt="1rem" textAlign="center">
          <button 
            onClick={handleShowMore} 
            style={{ 
              padding: '10px 20px', 
              fontSize: '16px', 
              cursor: 'pointer',
              backgroundColor: 'orange',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: 'bold',
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
