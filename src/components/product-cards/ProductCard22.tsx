
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
// import axios from "axios";
// import authService from "services/authService";
// import Card from "@component/Card";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faShop } from '@fortawesome/free-solid-svg-icons';

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

// interface ProductCard22Props extends SpaceProps {
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

// export default function ProductCard22(props: ProductCard22Props) {
//   const { id, name, qty, price, imgUrl, productStock, slug, discountPrice, productId, sellerId, b2bPricing, total_amount, ...others } = props;
//   const { state, dispatch } = useAppContext();
//   const [quantity, setQuantity] = useState(qty);
//   const [productInfo, setProductInfo] = useState<{
//     shopname: string;
//     shopimage: string;
//     brand: string;
//     delivereyType: string;
//   } | null>(null);

//   const authtoken = authService.getToken();

//   // Fetch product info from API
//   useEffect(() => {
//     const fetchProductInfo = async () => {
//       try {
//         const response = await axios.get(`${ApiBaseUrl.baseUrl}cart/product/info/${productId}`, {
//           headers: {
//             Authorization: `Bearer ${authtoken}`, // Attach auth token to headers
//           },
//         });
        
//         console.log(response.data);
//         setProductInfo(response.data);
//       } catch (error) {
//         console.error("Failed to fetch product info:", error);
//       }
//     };
  
//     fetchProductInfo();
//   }, [productId]);
  

//   useEffect(() => {
//     const itemInCart = state.cart.find(item => item.id === id);
//     if (itemInCart) {
//       setQuantity(itemInCart.qty);
//     }
//   }, [state.cart, id]);


//   useEffect(() => {
//     if (qty === 0) {
//       dispatch({ type: "DESELECT_PRODUCT", payload: id });
//     }
//   }, [qty, id, dispatch]);
//   return (
//     <>
//     <Card>

//       <div style={{padding: "3px"}}>
//       <Typography fontSize="14px" color="gray.600">
//   <FontAwesomeIcon icon={faShop} style={{marginRight: "5px"}} /> 
//   {productInfo ? productInfo.shopname : "Loading..."}
// </Typography>

//       <hr />
//       </div>
//       <Wrapper {...others}>
//   <div style={{ display: "flex", flexDirection: "row", marginLeft: "16px", alignItems: "center" }}>
    // <LazyImage
    //   alt={name}
    //   width={140}
    //   height={140}
    //   src={imgUrl || "/assets/images/products/iphone-xi.png"}
    // />
//   </div>
//   <FlexBox
//     width="100%"
//     minWidth="0px"
//     flexDirection="column"
//     className="product-details"
//     justifyContent="space-between"
//   >
//     <Link href={`/product/${slug}`}>
//       <Typography className="title" fontWeight="600" fontSize="18px" mb="0.5rem">
//         {name}
//       </Typography>
//     </Link>

//     {/* Display fetched product info */}
//     {productInfo && (
//       <Box mb="0.5rem">
//         <Typography fontSize="14px" color="gray.600">
//           Brand: {productInfo.brand}
//         </Typography>
//         <Typography fontSize="14px" color="gray.600">
//           Delivery: {productInfo.delivereyType}
//         </Typography>
//       </Box>
//     )}
//     <FlexBox justifyContent="space-between" alignItems="flex-end">
//       <FlexBox flexWrap="wrap" alignItems="center">
//         {discountPrice ? (
//           <Typography color="primary.main" mr="0.5rem">
//             {currency(discountPrice, 0)} x {quantity}
//           </Typography>
//         ) : (
//           <Typography fontWeight={600} color="primary.main" mr="1rem">
//             {currency(price, 0)} x {quantity}
//           </Typography>
//         )}
//       </FlexBox>
//     </FlexBox>
//   </FlexBox>
// </Wrapper>




//       <style jsx>{`
//         input.no-spin-button::-webkit-inner-spin-button,
//         input.no-spin-button::-webkit-outer-spin-button {
//           -webkit-appearance: none;
//           margin: 0;
//         }
//       `}</style>
//     </Card>
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

const Wrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => isValidProp(prop),
})`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
  gap: 16px;

  .product-details {
    flex: 1;
  }

  .product-image {
    width: 48px;
    height: 48px;
    background-color: #f1f1f1;
    border-radius: 4px;
    overflow: hidden;
  }

  .product-title {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
  }

  .product-quantity {
    margin: 4px 0 0 0;
    font-size: 14px;
    color: #666;
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

interface ProductCard22Props extends SpaceProps {
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
}

export default function ProductCard22(props: ProductCard22Props) {
  const { id, name, qty, price, imgUrl, productStock, slug, discountPrice, productId, sellerId, b2bPricing, total_amount, ...others } = props;
  const { state, dispatch } = useAppContext();
  const [quantity, setQuantity] = useState(qty);
  const [productInfo, setProductInfo] = useState<{
    shopname: string;
    shopimage: string;
    brand: string;
    delivereyType: string;
  } | null>(null);

  const authtoken = authService.getToken();

  // Fetch product info from API
  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        const response = await axios.get(`${ApiBaseUrl.baseUrl}cart/product/info/${productId}`, {
          headers: {
            Authorization: `Bearer ${authtoken}`, // Attach auth token to headers
          },
        });

        console.log(response.data);
        setProductInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch product info:", error);
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

  useEffect(() => {
    if (qty === 0) {
      dispatch({ type: "DESELECT_PRODUCT", payload: id });
    }
  }, [qty, id, dispatch]);

  return (
    <>
      <Card>
        <Wrapper {...others}>
          <div>
            <LazyImage
              alt={name}
              width={140}
              height={140}
              src={imgUrl}
              style={{ objectFit: "cover" }}
            />
          </div>
          <FlexBox flexDirection="column" className="product-details">
            <Link href={`/product/${slug}`}>
              <Typography className="product-title">{name}</Typography>
            </Link>
            <Typography className="product-quantity">Quantity: {quantity}</Typography>

            {/* Display fetched product info */}
            {productInfo && (
              <Box>
                <Typography fontSize="14px" color="gray.600">
                  Brand: {productInfo.brand}
                </Typography>
                <Typography fontSize="14px" color="gray.600">
                  Delivery: {productInfo.delivereyType}
                </Typography>
              </Box>
            )}

            <FlexBox justifyContent="space-between" alignItems="flex-end">
              <FlexBox flexWrap="wrap" alignItems="center">
                {discountPrice ? (
                  <Typography color="primary.main">
                    {currency(discountPrice, 0)} x {quantity}
                  </Typography>
                ) : (
                  <Typography fontWeight={600} color="primary.main">
                    {currency(price, 0)} x {quantity}
                  </Typography>
                )}
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </Wrapper>
      </Card>
    </>
  );
}
