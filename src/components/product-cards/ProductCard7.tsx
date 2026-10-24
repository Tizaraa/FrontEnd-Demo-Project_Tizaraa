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
import Icon from "@component/icon/Icon";
import LazyImage from "@component/LazyImage";
import { currency, isValidProp } from "@utils/utils";
import { useAppContext } from "@context/app-context";
import { useState, useEffect } from "react";
import CheckBox from "@component/CheckBox";
import toast from "react-hot-toast";
import axios from "@lib/axiosClient";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "@mui/material";

// One cart line: shop strip on top, then checkbox, image, details, price and quantity
const Line = styled.article.withConfig({
 shouldForwardProp: (prop) => isValidProp(prop),
})`
 margin-bottom: 16px;
 overflow: hidden;
 background: ${({ theme }) => theme.tz.color.paper};
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: ${({ theme }) => theme.tz.radius.md}px;

 .cl-shop {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.tz.color.slate};
  background: ${({ theme }) => theme.tz.color.mist};
  border-bottom: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
 }

 .cl-body {
  display: grid;
  grid-template-columns: auto 104px minmax(0, 1fr) auto;
  align-items: center;
  gap: 16px;
  padding: 16px;
 }

 .cl-image {
  width: 104px;
  height: 104px;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.tz.radius.sm}px;
  background: ${({ theme }) => theme.tz.color.mist};

  img {
   width: 100%;
   height: 100%;
   object-fit: cover;
  }
 }

 .cl-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0 0 6px;
  font-family: ${({ theme }) => theme.tz.font.body};
  font-size: 15px;
  font-weight: 600;
  line-height: 1.4;
  color: ${({ theme }) => theme.tz.color.ink};

  &:hover {
   color: ${({ theme }) => theme.tz.color.emberDeep};
  }
 }

 .cl-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 2px 12px;
  font-size: 13px;
  color: ${({ theme }) => theme.tz.color.slate};
 }

 .cl-side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
 }

 .cl-price {
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
 }

 .cl-qty {
  display: inline-flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: ${({ theme }) => theme.tz.radius.sm}px;
  overflow: hidden;

  button {
   display: inline-flex;
   align-items: center;
   justify-content: center;
   width: 36px;
   height: 36px;
   border: 0;
   background: ${({ theme }) => theme.tz.color.paper};
   color: ${({ theme }) => theme.tz.color.ink};
   cursor: pointer;
   transition: background-color ${({ theme }) => theme.tz.motion.fast};

   &:hover:enabled {
    background: ${({ theme }) => theme.tz.color.mist};
   }

   &:disabled {
    color: ${({ theme }) => theme.tz.color.line};
    cursor: not-allowed;
   }
  }

  input {
   width: 48px;
   height: 36px;
   padding: 0;
   border: 0;
   border-left: 1px solid ${({ theme }) => theme.tz.color.line};
   border-right: 1px solid ${({ theme }) => theme.tz.color.line};
   text-align: center;
   font-family: inherit;
   font-size: 15px;
   font-weight: 600;
   font-variant-numeric: tabular-nums;
   color: ${({ theme }) => theme.tz.color.ink};
   -moz-appearance: textfield;

   &::-webkit-inner-spin-button,
   &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
   }

   &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.tz.color.ember};
   }
  }
 }

 @media (max-width: 600px) {
  .cl-body {
   grid-template-columns: auto 72px minmax(0, 1fr);
   gap: 12px;
   padding: 12px;
  }

  .cl-image {
   width: 72px;
   height: 72px;
  }

  .cl-title {
   font-size: 14px;
  }

  .cl-side {
   grid-column: 2 / -1;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
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
    const response = await axios.get(`cart/product/info/${productId}`);
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

 // Seller's per-order limits carried on the cart item; max null means unlimited
 const limitsFor = (product: any) => {
  const min = Math.max(1, Number(product?.minOrderQty ?? 1) || 1);
  const rawMax = product?.maxOrderQty;
  const max =
   rawMax === null || rawMax === undefined || !Number.isFinite(Number(rawMax))
    ? null
    : Math.max(min, Number(rawMax));
  const ceiling =
   max === null ? product.productStock : Math.min(max, product.productStock);
  return { min, max, ceiling };
 };

 const handleCartAmountChange = (amount: number, product: any) => () => {
  if (amount > product.productStock) {
   toast.error("Out of Stock");
   return;
  }

  const { min, max } = limitsFor(product);
  if (amount > 0 && amount < min) {
   toast.error(`Minimum order quantity is ${min}.`);
   return;
  }
  if (max !== null && amount > max) {
   toast.error(`Maximum order quantity is ${max}.`);
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
  const typed = parseInt(e.target.value);
  if (Number.isNaN(typed)) return;

  const { min, max, ceiling } = limitsFor(product);
  const newQty = Math.min(ceiling, Math.max(min, typed));

  if (typed > ceiling) {
   toast.error(
    max !== null && max <= product.productStock
     ? `Maximum order quantity is ${max}.`
     : "Out of Stock"
   );
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

 const unitPrice =
  sizeColor?.nosize?.length === 0 && discountPrice ? discountPrice : price;

 return (
  <Line {...others}>
   <div className="cl-shop">
    {!isMobile && (
     <FontAwesomeIcon icon={faShop} style={{ width: "13px", height: "13px" }} />
    )}
    {loading
     ? "Loading shop info..."
     : error
       ? "Shop info unavailable"
       : productInfo?.shopname || "Shop name not found"}
   </div>

   <div className="cl-body">
    <CheckBox
     checked={state.selectedProducts.includes(id)}
     onChange={handleProductSelect}
    />

    <div className="cl-image">
     <LazyImage
      alt={name}
      width={140}
      height={140}
      src={imgUrl || "/assets/images/products/iphone-xi.png"}
     />
    </div>

    <div style={{ minWidth: 0 }}>
     <Link href={`/product/${slug}`}>
      <h3 className="cl-title" title={name}>
       {name}
      </h3>
     </Link>

     <div className="cl-meta">
      {/* Display fetched product info */}
      {productInfo && <span>Brand: {productInfo.brand}</span>}
      {productInfo && <span>Delivery: {productInfo.delivereyType}</span>}

      {/* display size and color  */}
      {sizeColor && selectedColor && selectedColor !== "Default" && (
       <span>
        {sizeColor?.colorGroupName || "Color"}: {selectedColor}
       </span>
      )}
      {sizeColor && selectedSize && selectedSize !== "Default" && (
       <span>
        {sizeColor?.sizeGroupName || "Size"}: {selectedSize}
       </span>
      )}
     </div>
    </div>

    <div className="cl-side">
     <span className="cl-price">
      {currency(unitPrice, 0)} &times; {quantity}
     </span>

     {currentCartItem && (
      <div className="cl-qty">
       <button
        type="button"
        aria-label="Decrease quantity"
        onClick={handleCartAmountChange(
         currentCartItem.qty - 1,
         currentCartItem
        )}
        disabled={currentCartItem.qty <= limitsFor(currentCartItem).min}
       >
        <Icon size="14px" defaultcolor="currentColor">
         minus
        </Icon>
       </button>
       <input
        type="number"
        aria-label="Quantity"
        value={currentCartItem.qty}
        min={limitsFor(currentCartItem).min}
        max={limitsFor(currentCartItem).ceiling}
        onChange={(e) => handleInputChange(e, currentCartItem)}
       />
       <button
        type="button"
        aria-label="Increase quantity"
        onClick={handleCartAmountChange(
         currentCartItem.qty + 1,
         currentCartItem
        )}
        disabled={currentCartItem.qty >= limitsFor(currentCartItem).ceiling}
       >
        <Icon size="14px" defaultcolor="currentColor">
         plus
        </Icon>
       </button>
      </div>
     )}
    </div>
   </div>
  </Line>
 );
}
