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
// import { useState, useEffect } from "react";
// import { Styledbutton } from "./style";
// import CheckBox from "@component/CheckBox";
// import toast from "react-hot-toast";
// import ApiBaseUrl from "api/ApiBaseUrl";

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
//   slug?: string;
//   price: number;
//   imgUrl?: string;
//   productStock: number;
//   id: string | number;
//   discountPrice: number;
//   productId: string | number;
//   sellerId: string | number;
//   b2bPricing: any;
//   total_amount: any;
// }

// export default function ProductCard7(props: ProductCard7Props) {
//   const { id, name, qty, price, imgUrl, productStock, slug, discountPrice, productId, sellerId, b2bPricing,total_amount, ...others } = props;
//   const { state, dispatch } = useAppContext();
//   const [quantity, setQuantity] = useState(qty);

//   useEffect(() => {
//     const itemInCart = state.cart.find(item => item.id === id);
//     if (itemInCart) {
//       setQuantity(itemInCart.qty);
//     }
//   }, [state.cart, id]);

//   const handleCartAmountChange = (amount: number) => {
//     if (amount > productStock) {
//       toast.error("Out of Stock");
//       return;
//     }
//     setQuantity(amount);
//     dispatch({
//       type: "CHANGE_CART_AMOUNT",
//       payload: { qty: amount, name, price, imgUrl, productStock, id, discountPrice, productId, sellerId, b2bPricing,total_amount }
//     });
//   };

//   useEffect(() => {
//     if (qty === 0) {
//       dispatch({ type: "DESELECT_PRODUCT", payload: id });
//     }
//   }, [qty, id, dispatch]);

//   const handleProductSelect = () => {
//     if (state.selectedProducts.includes(id)) {
//       dispatch({ type: "DESELECT_PRODUCT", payload: id });
//     } else {
//       dispatch({ type: "SELECT_PRODUCT", payload: id });
//     }
//   };

//   return (
//     <>
//       <Wrapper {...others}>
//         <div style={{ display: "flex", flexDirection: "row", gap: "5px", marginLeft: "16px", alignItems: "center" }}>
//           <CheckBox
//             checked={state.selectedProducts.includes(id)}
//             onChange={handleProductSelect}
//           />
//           <LazyImage
//             alt={name}
//             width={140}
//             height={140}
//             src={imgUrl || "/assets/images/products/iphone-xi.png"}
//             // src={imgUrl ? `${ApiBaseUrl.ImgUrl}${imgUrl}` : "/assets/images/products/iphone-xi.png"}
//           />
//         </div>
//         <FlexBox
//           width="100%"
//           minWidth="0px"
//           flexDirection="column"
//           className="product-details"
//           justifyContent="space-between">
//           <Link href={`/product/${slug}`}>
//             <Typography className="title" fontWeight="600" fontSize="18px" mb="0.5rem">
//               {name}
//             </Typography>
//           </Link>
//           <Box position="absolute" right="1rem" top="1rem">
//             <IconButton padding="4px" ml="12px" onClick={() => handleCartAmountChange(0)}>
//               <Icon size="1.25rem">close</Icon>
//             </IconButton>
//           </Box>
//           <FlexBox justifyContent="space-between" alignItems="flex-end">
//             <FlexBox flexWrap="wrap" alignItems="center">
//               {discountPrice ? (
//                 <>
//                   <Typography color="gray.600" mr="0.5rem">
//                     {currency(discountPrice, 0)} x {quantity}
//                   </Typography>
//                 </>
//               ) : (
//                 <Typography fontWeight={600} color="primary.main" mr="1rem">
//                   {currency(price, 0)} x {quantity}
//                 </Typography>
//               )}
//             </FlexBox>
//             <FlexBox alignItems="center">
//               <Button
//                 size="none"
//                 padding="5px"
//                 color="primary"
//                 variant="outlined"
//                 disabled={quantity <= 1}
//                 borderColor="primary.light"
//                 onClick={() => handleCartAmountChange(quantity - 1)}>
//                 <Icon variant="small">minus</Icon>
//               </Button>
//               <Styledbutton>
//                 <input
//                   type="number"
//                   value={quantity}
//                   className="no-spin-button"
//                   onChange={(e) => handleCartAmountChange(Math.min(productStock, Math.max(1, parseInt(e.target.value))))}
//                   style={{ width: "50px", textAlign: "center", margin: "0 10px", borderRadius: "4px", padding: "5px", border: "1px solid #E94560" }}
//                   min="1"
//                 />
//               </Styledbutton>
//               <Button
//                 size="none"
//                 padding="5px"
//                 color="primary"
//                 variant="outlined"
//                 borderColor="primary.light"
//                 onClick={() => handleCartAmountChange(quantity + 1)}>
//                 <Icon variant="small">plus</Icon>
//               </Button>
//             </FlexBox>
//           </FlexBox>
//         </FlexBox>
//       </Wrapper>
//       <style jsx>{`
//         input.no-spin-button::-webkit-inner-spin-button,
//         input.no-spin-button::-webkit-outer-spin-button {
//           -webkit-appearance: none;
//           margin: 0;
//         }
//       `}</style>
//     </>
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
import { useState, useEffect } from "react";
import { Styledbutton } from "./style";
import CheckBox from "@component/CheckBox";
import toast from "react-hot-toast";
import ApiBaseUrl from "api/ApiBaseUrl";
import axios from "axios";
import authService from "services/authService";
import Card from "@component/Card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "@mui/material";

const Wrapper = styled.div.withConfig({
 shouldForwardProp: (prop) => isValidProp(prop),
})`
 display: flex;
 overflow: hidden;
 position: relative;
 border-radius: 10px;
 box-shadow: ${getTheme("shadows.4")};
 background-color: ${getTheme("colors.body.paper")};
 .product-details {
  padding: 20px;
 }
 .title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
 }
 @media only screen and (max-width: 425px) {
  flex-wrap: wrap;
  img {
   height: auto;
   min-width: 100%;
  }
 }
 ${space}
`;

interface ProductCard7Props extends SpaceProps {
 qty: number;
 name: string;
 slug?: string;
 price: number;
 imgUrl?: string;
 productStock: number;
 id: string | number;
 discountPrice: number;
 productId: string | number;
 sellerId: string | number;
 b2bPricing: any;
 total_amount: any;
 sizeColor: any;
 selectedColor: string;
 selectedSize: string;
}

export default function ProductCard7(props: ProductCard7Props) {
 const {
  id,
  name,
  qty,
  price,
  imgUrl,
  productStock,
  slug,
  discountPrice,
  productId,
  sellerId,
  b2bPricing,
  total_amount,
  sizeColor,
  selectedColor,
  selectedSize,
  ...others
 } = props;
 const { state, dispatch } = useAppContext();
 const [quantity, setQuantity] = useState(qty);
 const [productInfo, setProductInfo] = useState<{
  shopname: string;
  shopimage: string;
  brand: string;
  delivereyType: string;
 } | null>(null);

 const authtoken = authService.getToken();

 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(false);

 // Fetch product info from API
 // useEffect(() => {
 //   const fetchProductInfo = async () => {
 //     try {
 //       const response = await axios.get(
 //         `${ApiBaseUrl.baseUrl}cart/product/info/${productId}`,
 //         {
 //           headers: {
 //             Authorization: `Bearer ${authtoken}`, // Attach auth token to headers
 //           },
 //         }
 //       );

 //       setProductInfo(response.data);
 //     } catch (error) {
 //       console.error("Failed to fetch product info:", error);
 //     }
 //   };

 //   fetchProductInfo();
 // }, [productId]);

 useEffect(() => {
  const fetchProductInfo = async () => {
   setLoading(true);
   setError(false);
   try {
    const response = await axios.get(
     `${ApiBaseUrl.baseUrl}cart/product/info/${productId}`,
     {
      headers: {
       Authorization: `Bearer ${authtoken}`,
      },
     }
    );
    setProductInfo(response.data);
   } catch (error) {
    console.error("Failed to fetch product info:", error);
    setError(true);
   } finally {
    setLoading(false);
   }
  };

  fetchProductInfo();
 }, [productId]);

 useEffect(() => {
  const itemInCart = state.cart.find((item) => item.id === id);
  if (itemInCart) {
   setQuantity(itemInCart.qty);
  }
 }, [state.cart, id]);

 const handleCartAmountChange = (amount: number, product: any) => () => {
  if (amount > product.productStock) {
   toast.error("Out of Stock");
   return;
  }
  dispatch({
   type: "CHANGE_CART_AMOUNT",
   payload: { ...product, qty: amount },
  });
 };

 const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  product: any
 ) => {
  const newQty = Math.min(
   product.productStock,
   Math.max(1, parseInt(e.target.value))
  );
  if (newQty > product.productStock) {
   toast.error("Out of Stock");
   return;
  }
  dispatch({
   type: "CHANGE_CART_AMOUNT",
   payload: { ...product, qty: newQty },
  });
 };

 const handleProductSelect = () => {
  if (state.selectedProducts.includes(id)) {
   dispatch({ type: "DESELECT_PRODUCT", payload: id });
  } else {
   dispatch({ type: "SELECT_PRODUCT", payload: id });
  }
 };

 const currentCartItem = state.cart.find((item) => item.id === id);
 const isMobile = useMediaQuery("(max-width:700px)");

 return (
  <Card>
   <div style={{ padding: "3px" }}>
    {/* <Typography fontSize="14px" color="gray.600">
          <FontAwesomeIcon icon={faShop} style={{ marginRight: "5px" }} />
          {!isMobile && (
            <FontAwesomeIcon 
              icon={faShop} 
              style={{ 
                marginRight: "5px",
                width: "14px",
                height: "14px"
              }} 
            />
          )}
          {productInfo ? productInfo.shopname : "Loading..."}
        </Typography> */}

    <Typography fontSize="14px" color="gray.600">
     {!isMobile && (
      <FontAwesomeIcon
       icon={faShop}
       style={{ marginRight: "5px", width: "14px", height: "14px" }}
      />
     )}
     {loading
      ? "Loading shop info..."
      : error
        ? "Shop info unavailable"
        : productInfo?.shopname || "Shop name not found"}
    </Typography>

    <hr />
   </div>

   <Wrapper {...others}>
    <div
     style={{
      display: "flex",
      flexDirection: "row",
      gap: "5px",
      marginLeft: "16px",
      alignItems: "center",
     }}
    >
     <CheckBox
      checked={state.selectedProducts.includes(id)}
      onChange={handleProductSelect}
     />
     <LazyImage
      alt={name}
      width={140}
      height={140}
      src={imgUrl || "/assets/images/products/iphone-xi.png"}
     />
    </div>
    <FlexBox
     width="100%"
     minWidth="0px"
     flexDirection="column"
     className="product-details"
     justifyContent="space-between"
    >
     <Link href={`/product/${slug}`}>
      <Typography
       className="title"
       fontWeight="600"
       fontSize="18px"
       mb="0.5rem"
      >
       {name}
      </Typography>
     </Link>

     {/* Display fetched product info */}
     {productInfo && (
      <Box mb="0.5rem">
       <Typography fontSize="14px" color="gray.600">
        Brand: {productInfo.brand}
       </Typography>
       <Typography fontSize="14px" color="gray.600">
        Delivery: {productInfo.delivereyType}
       </Typography>
      </Box>
     )}

     {/* display size and color  */}
     {sizeColor && (
      <Box display="flex">
       {selectedColor && (
        <Typography fontSize="14px" color="gray.600" mr="8px">
         Color: {selectedColor}
        </Typography>
       )}
       {selectedSize && (
        <Typography fontSize="14px" color="gray.600">
         Size: {selectedSize}
        </Typography>
       )}
      </Box>
     )}

     <FlexBox justifyContent="space-between" alignItems="flex-end">
      <FlexBox flexWrap="wrap" alignItems="center">
       {/* {discountPrice ? (
                <>
                  <Typography color="primary.main" mr="0.5rem">
                    {currency(discountPrice, 0)} x {quantity}
                  </Typography>
                </>
              ) : (
                <Typography fontWeight={600} color="primary.main" mr="1rem">
                  {currency(price, 0)} x {quantity}
                </Typography>
              )} */}
       {sizeColor?.nosize?.length === 0 && discountPrice ? (
        <Typography color="primary.main" mr="0.5rem">
         {currency(discountPrice, 0)} x {quantity}
        </Typography>
       ) : (
        <Typography fontWeight={600} color="primary.main" mr="1rem">
         {currency(price, 0)} x {quantity}
        </Typography>
       )}
      </FlexBox>

      {currentCartItem && (
       <FlexBox alignItems="center">
        <Button
         size="none"
         padding="5px"
         color="primary"
         variant="outlined"
         borderColor="primary.light"
         onClick={handleCartAmountChange(
          currentCartItem.qty - 1,
          currentCartItem
         )}
         disabled={currentCartItem.qty === 1}
        >
         <Icon variant="small">minus</Icon>
        </Button>
        <Styledbutton>
         <input
          className="no-spin-button"
          type="number"
          value={currentCartItem.qty}
          min={1}
          onChange={(e) => handleInputChange(e, currentCartItem)}
          style={{
           textDecoration: "none",
           borderRadius: "30px",
           scrollBehavior: "unset",
           border: "1px solid #E94560",
           padding: "8px",
           width: "50px",
           textAlign: "center",
          }}
         ></input>
        </Styledbutton>
        <Button
         size="none"
         padding="5px"
         color="primary"
         variant="outlined"
         borderColor="primary.light"
         onClick={handleCartAmountChange(
          currentCartItem.qty + 1,
          currentCartItem
         )}
        >
         <Icon variant="small">plus</Icon>
        </Button>
       </FlexBox>
      )}
     </FlexBox>
    </FlexBox>
   </Wrapper>

   <style jsx>{`
    input.no-spin-button::-webkit-inner-spin-button,
    input.no-spin-button::-webkit-outer-spin-button {
     -webkit-appearance: none;
     margin: 0;
    }
   `}</style>
  </Card>
 );
}
