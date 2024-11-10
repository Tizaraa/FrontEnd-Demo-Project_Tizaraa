// "use client";

// import Link from "next/link";
// import styled from "styled-components";
// import { space, SpaceProps } from "styled-system";

// import Box from "@component/Box";
// import Icon from "@component/icon/Icon";
// import FlexBox from "@component/FlexBox";
// import { Button } from "@component/buttons";
// import LazyImage from "@component/LazyImage";
// import Typography from "@component/Typography";
// import { IconButton } from "@component/buttons";

// import { currency, getTheme, isValidProp } from "@utils/utils";
// import { useAppContext } from "@context/app-context";

// // STYLED COMPONENTS
// const Wrapper = styled.div.withConfig({
//   shouldForwardProp: (prop) => isValidProp(prop)
// })`
//   display: flex;
//   overflow: hidden;
//   position: relative;
//   border-radius: 10px;
//   box-shadow: ${getTheme("shadows.4")};
//   background-color: ${getTheme("colors.body.paper")};

//   .product-details {
//     padding: 20px;
//   }
//   .title {
//     overflow: hidden;
//     white-space: nowrap;
//     text-overflow: ellipsis;
//   }

//   @media only screen and (max-width: 425px) {
//     flex-wrap: wrap;
//     img {
//       height: auto;
//       min-width: 100%;
//     }
//   }
//   ${space}
// `;

// // =====================================================================
// interface ProductCard7Props extends SpaceProps {
//   qty: number;
//   name: string;
//   slug: string;
//   price: number;
//   imgUrl?: string;
//   id: string | number;
//   discountPrice: number;
//   productId: string | number;
//   sellerId: string | number;
// }
// // =====================================================================

// export default function ProductCard7(props: ProductCard7Props) {
//   const { id, name, qty, price, imgUrl, slug,discountPrice,productId, sellerId, ...others } = props;

//   const { dispatch } = useAppContext();
//   const handleCartAmountChange = (amount: number) => () => {
//     dispatch({
//       type: "CHANGE_CART_AMOUNT",
//       payload: { qty: amount, name, price, imgUrl, id, discountPrice, productId, sellerId }
//     });
//   };

//   return (
//     <Wrapper {...others}>
//       <LazyImage
//         alt={name}
//         width={140}
//         height={140}
//         src={imgUrl || "/assets/images/products/iphone-xi.png"}
//       />

//       <FlexBox
//         width="100%"
//         minWidth="0px"
//         flexDirection="column"
//         className="product-details"
//         justifyContent="space-between">
//         <Link href={`/product/${id}`}>
//           <Typography className="title" fontWeight="600" fontSize="18px" mb="0.5rem">
//             {name}
//           </Typography>
//         </Link>

//         <Box position="absolute" right="1rem" top="1rem">
//           <IconButton padding="4px" ml="12px" onClick={handleCartAmountChange(0)}>
//             <Icon size="1.25rem">close</Icon>
//           </IconButton>
//         </Box>

//         <FlexBox justifyContent="space-between" alignItems="flex-end">
//           <FlexBox flexWrap="wrap" alignItems="center">
//             {/* <Typography color="gray.600" mr="0.5rem">
//               {currency(price)} x {qty}
//             </Typography>

//             <Typography fontWeight={600} color="primary.main" mr="1rem">
//               {currency(price * qty)}
//             </Typography> */}
//              {discountPrice ? (
//           <>
//            <Typography color="gray.600" mr="0.5rem">
//                   {currency(discountPrice, 0)} x {qty}
//                 </Typography>
              
//           </>
//         ) : (
//           <Typography fontWeight={600} color="primary.main" mr="1rem">
//           {currency(price, 0)} x {qty}
//         </Typography>
//         )}

//         <Typography fontWeight={600} fontSize="14px" color="primary.main" mt="4px">
//           {currency(qty * (discountPrice ?? price))}
//         </Typography>
//           </FlexBox>

//           <FlexBox alignItems="center">
//             <Button
//               size="none"
//               padding="5px"
//               color="primary"
//               variant="outlined"
//               disabled={qty === 1}
//               borderColor="primary.light"
//               onClick={handleCartAmountChange(qty - 1)}>
//               <Icon variant="small">minus</Icon>
//             </Button>

//             <Typography mx="0.5rem" fontWeight="600" fontSize="15px">
//               {qty}
//             </Typography>

//             <Button
//               size="none"
//               padding="5px"
//               color="primary"
//               variant="outlined"
//               borderColor="primary.light"
//               onClick={handleCartAmountChange(qty + 1)}>
//               <Icon variant="small">plus</Icon>
//             </Button>
//           </FlexBox>
//         </FlexBox>
//       </FlexBox>
//     </Wrapper>
//   );
// }


// "use client";

// import Link from "next/link";
// import styled from "styled-components";
// import { space, SpaceProps } from "styled-system";

// import Box from "@component/Box";
// import Icon from "@component/icon/Icon";
// import FlexBox from "@component/FlexBox";
// import { Button } from "@component/buttons";
// import LazyImage from "@component/LazyImage";
// import Typography from "@component/Typography";
// import { IconButton } from "@component/buttons";

// import { currency, getTheme, isValidProp } from "@utils/utils";
// import { useAppContext } from "@context/app-context";

// // STYLED COMPONENTS
// const Wrapper = styled.div.withConfig({
//   shouldForwardProp: (prop) => isValidProp(prop)
// })`
//   display: flex;
//   overflow: hidden;
//   position: relative;
//   border-radius: 10px;
//   box-shadow: ${getTheme("shadows.4")};
//   background-color: ${getTheme("colors.body.paper")};

//   .product-details {
//     padding: 20px;
//   }
//   .title {
//     overflow: hidden;
//     white-space: nowrap;
//     text-overflow: ellipsis;
//   }

//   @media only screen and (max-width: 425px) {
//     flex-wrap: wrap;
//     img {
//       height: auto;
//       min-width: 100%;
//     }
//   }
//   ${space}
// `;

// // =====================================================================
// interface ProductCard7Props extends SpaceProps {
//   qty: number;
//   name: string;
//   slug: string;
//   price: number;
//   imgUrl?: string;
//   id: string | number;
//   discountPrice: number;
//   productId: string | number;
//   sellerId: string | number;
//   b2bPricing: any;
// }
// // =====================================================================

// export default function ProductCard7(props: ProductCard7Props) {
//   const { id, name, qty, price, imgUrl, slug,discountPrice,productId, sellerId,b2bPricing, ...others } = props;

//   const { dispatch } = useAppContext();
//   const handleCartAmountChange = (amount: number) => () => {
//     dispatch({
//       type: "CHANGE_CART_AMOUNT",
//       payload: { qty: amount, name, price, imgUrl, id, discountPrice, productId, sellerId, b2bPricing }
//     });
//   };

//   return (
//     <Wrapper {...others}>
//       <LazyImage
//         alt={name}
//         width={140}
//         height={140}
//         src={imgUrl || "/assets/images/products/iphone-xi.png"}
//       />

//       <FlexBox
//         width="100%"
//         minWidth="0px"
//         flexDirection="column"
//         className="product-details"
//         justifyContent="space-between">
//         <Link href={`/product/${slug}`}>
//           <Typography className="title" fontWeight="600" fontSize="18px" mb="0.5rem">
//             {name}
//           </Typography>
//         </Link>

//         <Box position="absolute" right="1rem" top="1rem">
//           <IconButton padding="4px" ml="12px" onClick={handleCartAmountChange(0)}>
//             <Icon size="1.25rem">close</Icon>
//           </IconButton>
//         </Box>

//         <FlexBox justifyContent="space-between" alignItems="flex-end">
//           <FlexBox flexWrap="wrap" alignItems="center">
//             {/* <Typography color="gray.600" mr="0.5rem">
//               {currency(price)} x {qty}
//             </Typography>

//             <Typography fontWeight={600} color="primary.main" mr="1rem">
//               {currency(price * qty)}
//             </Typography> */}
//              {discountPrice ? (
//           <>
//            <Typography color="gray.600" mr="0.5rem">
//                   {currency(discountPrice, 0)} x {qty}
//                 </Typography>
              
//           </>
//         ) : (
//           <Typography fontWeight={600} color="primary.main" mr="1rem">
//           {currency(price, 0)} x {qty}
//         </Typography>
//         )}

//         {/* <Typography fontWeight={600} fontSize="14px" color="primary.main" mt="4px">
//           {currency(qty * (discountPrice ?? price))}
//         </Typography> */}
        
//           </FlexBox>

//           <FlexBox alignItems="center">
//             <Button
//               size="none"
//               padding="5px"
//               color="primary"
//               variant="outlined"
//               disabled={qty === 1}
//               borderColor="primary.light"
//               onClick={handleCartAmountChange(qty - 1)}>
//               <Icon variant="small">minus</Icon>
//             </Button>

//             <Typography mx="0.5rem" fontWeight="600" fontSize="15px">
//               {qty}
//             </Typography>

//             <Button
//               size="none"
//               padding="5px"
//               color="primary"
//               variant="outlined"
//               borderColor="primary.light"
//               onClick={handleCartAmountChange(qty + 1)}>
//               <Icon variant="small">plus</Icon>
//             </Button>
//           </FlexBox>
//         </FlexBox>
//       </FlexBox>
//     </Wrapper>
//   );
// }

// "use client";

// import Link from "next/link";
// import styled from "styled-components";
// import { space, SpaceProps } from "styled-system";
// import Box from "@component/Box";
// import Icon from "@component/icon/Icon";
// import FlexBox from "@component/FlexBox";
// import { Button } from "@component/buttons";
// import LazyImage from "@component/LazyImage";
// import Typography from "@component/Typography";
// import { IconButton } from "@component/buttons";
// import { currency, getTheme, isValidProp } from "@utils/utils";
// import { useAppContext } from "@context/app-context";
// import { useState } from "react";

// // STYLED COMPONENTS
// const Wrapper = styled.div.withConfig({
//   shouldForwardProp: (prop) => isValidProp(prop)
// })`
//   display: flex;
//   overflow: hidden;
//   position: relative;
//   border-radius: 10px;
//   box-shadow: ${getTheme("shadows.4")};
//   background-color: ${getTheme("colors.body.paper")};
//   .product-details { padding: 20px; }
//   .title { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
//   @media only screen and (max-width: 425px) {
//     flex-wrap: wrap;
//     img { height: auto; min-width: 100%; }
//   }
//   ${space}
// `;

// interface ProductCard7Props extends SpaceProps {
//   qty: number;
//   name: string;
//   slug: string;
//   price: number;
//   imgUrl?: string;
//   id: string | number;
//   discountPrice: number;
//   productId: string | number;
//   sellerId: string | number;
//   b2bPricing: any;
// }

// export default function ProductCard7(props: ProductCard7Props) {
//   const { id, name, qty, price, imgUrl, slug, discountPrice, productId, sellerId, b2bPricing, ...others } = props;
//   const { dispatch } = useAppContext();
//   const [quantity, setQuantity] = useState(qty);

//   const handleCartAmountChange = (amount: number) => () => {
//         dispatch({
//           type: "CHANGE_CART_AMOUNT",
//           payload: { qty: amount, name, price, imgUrl, id, discountPrice, productId, sellerId, b2bPricing }
//         });
//       };

//   // const handleCloseButtonClick = () => {
//   //   setQuantity(0);
//   //   dispatch({
//   //     type: "REMOVE_FROM_CART",
//   //     payload: { id }
//   //   });
//   // };

//   const handleCloseButtonClick = (amount: number, product: any) => () => {
//     //setQuantity(0);
//     dispatch({
//       type: "CHANGE_CART_AMOUNT",
//       payload: { ...product, qty: amount }
//     });
//   };

//   return (
//     <Wrapper {...others}>
//       <LazyImage
//         alt={name}
//         width={140}
//         height={140}
//         src={imgUrl || "/assets/images/products/iphone-xi.png"}
//       />
//       <FlexBox
//         width="100%"
//         minWidth="0px"
//         flexDirection="column"
//         className="product-details"
//         justifyContent="space-between">
//         <Link href={`/product/${slug}`}>
//           <Typography className="title" fontWeight="600" fontSize="18px" mb="0.5rem">
//             {name}
//           </Typography>
//         </Link>
//         <Box position="absolute" right="1rem" top="1rem">
//           <IconButton padding="4px" ml="12px" onClick={handleCartAmountChange(0)}>
//             <Icon size="1.25rem">close</Icon>
//           </IconButton>
//         </Box>
//         <FlexBox justifyContent="space-between" alignItems="flex-end">
//           <FlexBox flexWrap="wrap" alignItems="center">
//             {discountPrice ? (
//               <>
//                 <Typography color="gray.600" mr="0.5rem">
//                   {currency(discountPrice, 0)} x {quantity}
//                 </Typography>
//               </>
//             ) : (
//               <Typography fontWeight={600} color="primary.main" mr="1rem">
//                 {currency(price, 0)} x {quantity}
//               </Typography>
//             )}
//           </FlexBox>
//           <FlexBox alignItems="center">
//             <Button
//               size="none"
//               padding="5px"
//               color="primary"
//               variant="outlined"
//               disabled={quantity <= 1}
//               borderColor="primary.light"
//               onClick={() => handleCartAmountChange(quantity - 1)}>
//               <Icon variant="small">minus</Icon>
//             </Button>
//             <input
//               type="number"
//               value={quantity}
//               onChange={(e) => handleCartAmountChange(parseInt(e.target.value) || 1)}
//               style={{ width: "50px", textAlign: "center", margin: "0 10px", border: "1px solid #ccc", borderRadius: "4px", padding: "5px" }}
//               min="1"
//             />
//             <Button
//               size="none"
//               padding="5px"
//               color="primary"
//               variant="outlined"
//               borderColor="primary.light"
//               onClick={() => handleCartAmountChange(quantity + 1)}>
//               <Icon variant="small">plus</Icon>
//             </Button>
//           </FlexBox>
//         </FlexBox>
//       </FlexBox>
//     </Wrapper>
//   );
// }

"use client";

import Link from "next/link";
import styled from "styled-components";
import { space, SpaceProps } from "styled-system";
import Box from "@component/Box";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import LazyImage from "@component/LazyImage";
import Typography from "@component/Typography";
import { IconButton } from "@component/buttons";
import { currency, getTheme, isValidProp } from "@utils/utils";
import { useAppContext } from "@context/app-context";
import { useState,useEffect } from "react";

// STYLED COMPONENTS
const Wrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => isValidProp(prop)
})`
  display: flex;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  box-shadow: ${getTheme("shadows.4")};
  background-color: ${getTheme("colors.body.paper")};
  .product-details { padding: 20px; }
  .title { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
  @media only screen and (max-width: 425px) {
    flex-wrap: wrap;
    img { height: auto; min-width: 100%; }
  }
  ${space}
`;

interface ProductCard7Props extends SpaceProps {
  qty: number;
  name: string;
  slug: string;
  price: number;
  imgUrl?: string;
  id: string | number;
  discountPrice: number;
  productId: string | number;
  sellerId: string | number;
  b2bPricing: any;
}

export default function ProductCard7(props: ProductCard7Props) {
  const { id, name, qty, price, imgUrl, slug, discountPrice, productId, sellerId, b2bPricing, ...others } = props;
  const { state, dispatch } = useAppContext();
  const [quantity, setQuantity] = useState(qty);

  useEffect(() => {
    const itemInCart = state.cart.find(item => item.id === id);
    if (itemInCart) {
      setQuantity(itemInCart.qty);
    }
  }, [state.cart, id]);

  const handleCartAmountChange = (amount: number) => {
    setQuantity(amount);
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { qty: amount, name, price, imgUrl, id, discountPrice, productId, sellerId, b2bPricing }
    });
  };

  return (
    <Wrapper {...others}>
      <LazyImage
        alt={name}
        width={140}
        height={140}
        src={imgUrl || "/assets/images/products/iphone-xi.png"}
      />
      <FlexBox
        width="100%"
        minWidth="0px"
        flexDirection="column"
        className="product-details"
        justifyContent="space-between">
        <Link href={`/product/${slug}`}>
          <Typography className="title" fontWeight="600" fontSize="18px" mb="0.5rem">
            {name}
          </Typography>
        </Link>
        <Box position="absolute" right="1rem" top="1rem">
          <IconButton padding="4px" ml="12px" onClick={() => handleCartAmountChange(0)}>
            <Icon size="1.25rem">close</Icon>
          </IconButton>
        </Box>
        <FlexBox justifyContent="space-between" alignItems="flex-end">
          <FlexBox flexWrap="wrap" alignItems="center">
            {discountPrice ? (
              <>
                <Typography color="gray.600" mr="0.5rem">
                  {currency(discountPrice, 0)} x {quantity}
                </Typography>
              </>
            ) : (
              <Typography fontWeight={600} color="primary.main" mr="1rem">
                {currency(price, 0)} x {quantity}
              </Typography>
            )}
          </FlexBox>
          <FlexBox alignItems="center">
            <Button
              size="none"
              padding="5px"
              color="primary"
              variant="outlined"
              disabled={quantity <= 1}
              borderColor="primary.light"
              onClick={() => handleCartAmountChange(quantity - 1)}>
              <Icon variant="small">minus</Icon>
            </Button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleCartAmountChange(parseInt(e.target.value) || 1)}
              style={{ width: "50px", textAlign: "center", margin: "0 10px", border: "1px solid #ccc", borderRadius: "4px", padding: "5px" }}
              min="1"
            />
            <Button
              size="none"
              padding="5px"
              color="primary"
              variant="outlined"
              borderColor="primary.light"
              onClick={() => handleCartAmountChange(quantity + 1)}>
              <Icon variant="small">plus</Icon>
            </Button>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Wrapper>
  );
}
