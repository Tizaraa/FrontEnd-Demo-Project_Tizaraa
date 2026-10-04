// "use client";
// import { useEffect, useState } from "react";
// import { Card1 } from "@component/Card1";
// import Divider from "@component/Divider";
// import FlexBox from "@component/FlexBox";
// import { Button } from "@component/buttons";
// import TextField from "@component/text-field";
// import Typography from "@component/Typography";
// import { useAppContext } from "@context/app-context";
// import Grid from "@component/grid/Grid";
// import { ProductCard2, ProductCard7 } from "@component/product-cards";
// import { currency } from "@utils/utils";
// import ProductCard20 from "@component/product-cards/ProductCard20";
// import { it } from "node:test";

// export default function PaymentSummary() {
//   const { state } = useAppContext();
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [shippingCharge, setShippingCharge] = useState(0);
//   const [cartItems, setCartItems] = useState([]);

//   const [discount, setDiscount] = useState(0);
//   const [newTotal, setNewTotal] = useState(0);

//   // const getTotalPrice = () => {
//   //   return state.cart.reduce((accumulator, item) =>
//   //     // accumulator + (item.discountPrice ?? item.price) * item.qty, 0
//   //   accumulator + (item.discountPrice ? item.discountPrice : item.price) * item.qty, 0
//   //   ) || 0;
//   // };

//   useEffect(() => {
//     // Load values from sessionStorage
//     const savedPrice = parseFloat(sessionStorage.getItem("savedTotalPrice") || "0");
//     const savedShipping = parseFloat(sessionStorage.getItem("deliveryCharge") || "0");
//     const savedCart = JSON.parse(sessionStorage.getItem("cartItems") || "[]");

//     const savedDiscount = parseFloat(sessionStorage.getItem("discount") || "0");
//     const savedNewTotal = parseFloat(
//       sessionStorage.getItem("newTotal") || (savedPrice + savedShipping).toString()
//     );

//     setTotalPrice(savedPrice);
//     setShippingCharge(savedShipping);
//     setCartItems(savedCart);

//     setDiscount(savedDiscount);
//     setNewTotal(savedNewTotal);
//   }, [state.cart]);

//   const getTotalPrice = () => {
//     return state.cart.reduce((accumulator, item) => {
//       if (state.selectedProducts.includes(item.id)) {
//         return (
//           accumulator +
//           (item.discountPrice ? item.discountPrice : item.price) * item.qty
//         );
//       }
//       return accumulator;
//     }, 0);
//   };
//    // User shipping data

//    let shippingData = sessionStorage.getItem('address');
//    let userShippingdata = JSON.parse(shippingData);
//    let discountData = sessionStorage.getItem('discount');

//    const deliveryChargeDisplay = userShippingdata && userShippingdata.deliveryCharge
// ? userShippingdata.deliveryCharge
// : "-";

//   return (

//     <Card1>

//           {state.cart.map((item) => (
//             <ProductCard20
//             margin={0}
//               mb="1.5rem"
//               id={item.id}
//               key={item.id}
//               qty={item.qty}
//               slug={item.slug}
//               name={item.name}
//               price={item.price}
//               productStock={item.productStock}
//               imgUrl={item.imgUrl}
//               discountPrice={item.discountPrice}
//               productId={item.productId}
//               sellerId={item.sellerId}
//             />
//           ))}

//       <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
//         <Typography color="text.hint">Subtotal:</Typography>

//         <FlexBox alignItems="flex-end">
//           <Typography fontSize="18px" fontWeight="600" lineHeight="1">
//           {/* {currency(getTotalPrice())} */}
//           {currency(totalPrice)}
//           </Typography>

//           {/* <Typography fontWeight="600" fontSize="14px" lineHeight="1">
//             00
//           </Typography> */}
//         </FlexBox>
//       </FlexBox>

// <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
//   <Typography color="text.hint">Shipping:</Typography>

//   <FlexBox alignItems="flex-end">
//     <Typography fontSize="18px" fontWeight="600" lineHeight="1">
//       {/* {deliveryChargeDisplay} */}
//       {currency(shippingCharge)}
//     </Typography>
//   </FlexBox>
// </FlexBox>

// <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
//   <Typography color="text.hint">Vat:</Typography>

//   <FlexBox alignItems="flex-end">
//     <Typography fontSize="18px" fontWeight="600" lineHeight="1">
//     -
//     </Typography>

//     {/* <Typography fontWeight="600" fontSize="14px" lineHeight="1">
//       00
//     </Typography> */}
//   </FlexBox>
// </FlexBox>

// <FlexBox justifyContent="space-between" alignItems="center" mb="1rem">
//   <Typography color="text.hint">Discount:</Typography>

//   <FlexBox alignItems="flex-end">
//     <Typography fontSize="18px" fontWeight="600" lineHeight="1">
//     {currency(discount)}
//     </Typography>
//   </FlexBox>
// </FlexBox>

//       <Divider mb="1rem" />

//       <Typography fontSize="25px" fontWeight="600" lineHeight="1" textAlign="right" mb="1.5rem">
//       {/* {currency(getTotalPrice() + (parseFloat(deliveryChargeDisplay) || 0))} */}
//       {currency((totalPrice + shippingCharge)-discount)}

//       </Typography>
//     </Card1>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { Card1 } from "@component/Card1";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import Typography from "@component/Typography";
import { useAppContext } from "@context/app-context";
import Grid from "@component/grid/Grid";
import { ProductCard2, ProductCard7 } from "@component/product-cards";
import { currency } from "@utils/utils";
import ProductCard20 from "@component/product-cards/ProductCard20";
import { Tooltip } from "@mui/material";
import { Box } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
export default function PaymentSummary({
 seller_type,
}: {
 seller_type: string;
}) {
 const { state } = useAppContext();
 const [totalPrice, setTotalPrice] = useState(0);
 const [shippingCharge, setShippingCharge] = useState(0);
 const [cartItems, setCartItems] = useState([]);
 const [discount, setDiscount] = useState(0);
 const [newTotal, setNewTotal] = useState(0);
 const [isAbroadProduct, setIsAbroadProduct] = useState(false);
 const [isFreeShipping, setIsFreeShipping] = useState(false);
 const [user, setUser] = useState(null);

 useEffect(() => {
  setTimeout(() => {
   getUser();
  }, 100);
 }, []);

 const getUser = async () => {
  if (typeof window !== "undefined") {
   const userInfo =
    JSON.parse(localStorage.getItem("userInfo") || "{}") || null;
   setUser(userInfo);
  }
 };

 useEffect(() => {
  // Check if any product is from abroad
  const hasAbroadProduct = state.cart.some(
   (product: any) => product.productType === "Abroad"
  );
  setIsAbroadProduct(hasAbroadProduct);

  // Load values from sessionStorage
  const savedPrice = parseFloat(
   sessionStorage.getItem("savedTotalPrice") || "0"
  );
  const freeShipping = sessionStorage.getItem("isFreeShipping") === "1";
  setIsFreeShipping(freeShipping);
  const savedShipping = freeShipping
   ? 0
   : parseFloat(sessionStorage.getItem("savedTotalWithDelivery") || sessionStorage.getItem("deliveryCharge") || "0");
  const savedCart = JSON.parse(sessionStorage.getItem("cartItems") || "[]");
  const savedDiscount = parseFloat(sessionStorage.getItem("discount") || "0");

  // For abroad products, use otcAdvancePaymentAmount if available
  let calculatedTotal;
  if (hasAbroadProduct) {
   const otcAdvancePayment = parseFloat(
    sessionStorage.getItem("otcAdvancePaymentAmount") || "0"
   );
   calculatedTotal = otcAdvancePayment;
  } else {
   calculatedTotal = parseFloat(
    sessionStorage.getItem("newTotal") ||
     (savedPrice + savedShipping).toString()
   );
  }

  setTotalPrice(savedPrice);
  setShippingCharge(savedShipping);
  setCartItems(savedCart);
  setDiscount(savedDiscount);
  setNewTotal(calculatedTotal);
 }, [state.cart]);

 // User shipping data
 let shippingData = sessionStorage.getItem("address");
 let userShippingdata = JSON.parse(shippingData || "{}");
 let discountData = sessionStorage.getItem("discount");

 const deliveryChargeDisplay =
  userShippingdata && userShippingdata.deliveryCharge
   ? userShippingdata.deliveryCharge
   : "-";

 // Calculate display total based on product type
 const displayTotal = isAbroadProduct
  ? newTotal
  : totalPrice + shippingCharge - discount;

 // Get selectedPaymentOption from sessionStorage for Pay Now (Advance)
 const selectedPaymentOption = sessionStorage.getItem("selectedPaymentOption");

 const isCorporate = seller_type.toLocaleLowerCase() === "corporate";

 // Subtotal is shown at the original (pre-discount) price; product-level
 // discounts (price - discountPrice) are folded into the Discount line along
 // with any promo discount. Totals are unchanged.
 const selectedCartItems = state.cart.filter((item) =>
  state.selectedProducts?.includes(item.id)
 );
 const discountedItems = selectedCartItems.length
  ? selectedCartItems
  : state.cart;
 const productDiscount = discountedItems.reduce((acc, item) => {
  const effective = item.discountPrice ?? item.price ?? 0;
  return acc + Math.max((item.price ?? 0) - effective, 0) * item.qty;
 }, 0);
 const originalSubtotal = totalPrice + productDiscount;
 const totalDiscount = productDiscount + discount;
 const hasDiscount = totalDiscount > 0;
 const discountPercent =
  originalSubtotal > 0 ? (totalDiscount / originalSubtotal) * 100 : 0;

 return (
  <Card1>
   {state.cart.map((item) => (
    <ProductCard20
     margin={0}
     mb="1.5rem"
     id={item.id}
     key={item.id}
     qty={item.qty}
     slug={item.slug}
     name={item.name}
     price={item.price}
     productStock={item.productStock}
     imgUrl={item.imgUrl}
     discountPrice={item.discountPrice}
     productId={item.productId}
     sellerId={item.sellerId}
    />
   ))}

   {isCorporate ? (
    <>
     <FlexBox justifyContent="space-between" alignItems="center" mb="1rem">
      <Typography fontWeight="700" fontSize="16px">
       Order Summary
      </Typography>
      <span
       style={{
        backgroundColor: "#e8f8f0",
        color: "#2e7d32",
        border: "1px solid #4CAF50",
        borderRadius: "16px",
        padding: "3px 10px",
        fontSize: "12px",
        fontWeight: 700,
       }}
      >
       Corporate Credit Active
      </span>
     </FlexBox>

     <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
      <Typography color="text.hint">Available Corporate Credit:</Typography>
      <Typography fontWeight="700">
       {currency(user?.credit_balance || 0)}
      </Typography>
     </FlexBox>

     <FlexBox justifyContent="space-between" alignItems="center" mb="1.5rem">
      <Typography color="text.hint">Credit Balance After Purchase:</Typography>
      <Typography fontWeight="700" color="#E94560">
       {currency((user?.credit_balance || 0) - displayTotal)}
      </Typography>
     </FlexBox>

     <Divider mb="1rem" />

     <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
      <Typography color="text.hint">Subtotal (Items Total)</Typography>
      <Typography fontWeight="600">{currency(originalSubtotal)}</Typography>
     </FlexBox>

     <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
      <FlexBox alignItems="center" style={{ gap: "8px" }}>
       <Typography color="text.hint">Discount</Typography>
       <span
        style={{
         backgroundColor: hasDiscount ? "#e8f8f0" : "#f0f2f5",
         color: hasDiscount ? "#2e7d32" : "#7A8A99",
         borderRadius: "10px",
         padding: "2px 8px",
         fontSize: "11px",
         fontWeight: 700,
        }}
       >
        {hasDiscount
         ? `${Math.round(discountPercent)}% OFF`
         : "0% OFF"}
       </span>
      </FlexBox>
      <Typography fontWeight="600" color={hasDiscount ? "#2e7d32" : "inherit"}>
       {hasDiscount ? `- ${currency(totalDiscount)}` : currency(0)}
      </Typography>
     </FlexBox>

     <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
      <Typography color="text.hint">Shipping Charge</Typography>
      <Typography fontWeight="600">
       {isFreeShipping ? "FREE" : currency(shippingCharge)}
      </Typography>
     </FlexBox>

     <FlexBox justifyContent="space-between" alignItems="center" mb="1.5rem">
      <Typography color="text.hint">Estimated Tax / VAT (0%)</Typography>
      <Typography fontWeight="600">BDT 0.00</Typography>
     </FlexBox>

     <Divider mb="1rem" />

     <FlexBox justifyContent="space-between" alignItems="flex-end" mb="1rem">
      <Box>
       <Typography fontWeight="700">Total Amount</Typography>
       <Typography fontSize="12px" color="text.hint">
        Total Net Payable via Credit
       </Typography>
      </Box>
      <Typography fontSize="25px" fontWeight="600" lineHeight="1" color="#E94560">
       {currency(displayTotal)}
      </Typography>
     </FlexBox>

     <Box
      sx={{
       backgroundColor: "#fdecea",
       border: "1px solid #f5c6cb",
       borderRadius: "8px",
       padding: "0.75rem",
      }}
     >
      <FlexBox alignItems="center" style={{ gap: "6px" }} mb="0.25rem">
       <span
        style={{
         display: "inline-flex",
         alignItems: "center",
         justifyContent: "center",
         width: "16px",
         height: "16px",
         borderRadius: "4px",
         backgroundColor: "#2563eb",
         color: "#fff",
         fontSize: "11px",
         fontWeight: 700,
         fontStyle: "italic",
         lineHeight: 1,
         flexShrink: 0,
        }}
       >
        i
       </span>
       <Typography fontWeight="700" fontSize="13px" color="#c0392b">
        Corporate Credit Purchase Policy
       </Typography>
      </FlexBox>
      <Typography fontSize="12px" color="text.hint">
       Total {currency(displayTotal)} will be billed to your corporate
       account line. No manual cash or debit card is required at checkout.
      </Typography>
     </Box>
    </>
   ) : (
    <>
     <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
      <Typography color="text.hint">Subtotal:</Typography>
      <FlexBox alignItems="flex-end">
       <Typography fontSize="18px" fontWeight="600" lineHeight="1">
        {currency(originalSubtotal)}
       </Typography>
      </FlexBox>
     </FlexBox>

     {isAbroadProduct && (
      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
       <Typography color="#E94560">
        Pay Now ({selectedPaymentOption}%):
       </Typography>
       <FlexBox alignItems="flex-end">
        <Typography
         color="#E94560"
         fontSize="18px"
         fontWeight="600"
         lineHeight="1"
        >
         {currency(newTotal)}
        </Typography>
       </FlexBox>
      </FlexBox>
     )}

     {!isAbroadProduct && (
      <>
       <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Shipping:</Typography>

        <FlexBox alignItems="flex-end" style={{ gap: "0.5rem" }}>
         {isFreeShipping && (
          <Typography fontSize="14px" color="text.muted" style={{ textDecoration: "line-through" }}>
           {currency(parseFloat(sessionStorage.getItem("savedTotalWithDelivery") || "0"))}
          </Typography>
         )}
         <Typography fontSize="18px" fontWeight="600" lineHeight="1" color={isFreeShipping ? "#3BB77E" : "inherit"}>
          {isFreeShipping ? "FREE" : currency(shippingCharge)}
         </Typography>
        </FlexBox>
       </FlexBox>

       <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Vat:</Typography>

        <FlexBox alignItems="flex-end">
         <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          -
         </Typography>
        </FlexBox>
       </FlexBox>

       <FlexBox justifyContent="space-between" alignItems="center" mb="1rem">
        <FlexBox alignItems="center" style={{ gap: "8px" }}>
         <Typography color="text.hint">Discount:</Typography>
         <span
          style={{
           backgroundColor: hasDiscount ? "#e8f8f0" : "#f0f2f5",
           color: hasDiscount ? "#2e7d32" : "#7A8A99",
           borderRadius: "10px",
           padding: "2px 8px",
           fontSize: "11px",
           fontWeight: 700,
          }}
         >
          {hasDiscount
           ? `${Math.round(discountPercent)}% OFF`
           : "0% OFF"}
         </span>
        </FlexBox>

        <FlexBox alignItems="flex-end">
         <Typography
          fontSize="18px"
          fontWeight="600"
          lineHeight="1"
          color={hasDiscount ? "#2e7d32" : "inherit"}
         >
          {hasDiscount ? `- ${currency(totalDiscount)}` : currency(0)}
         </Typography>
        </FlexBox>
       </FlexBox>
      </>
     )}

     <Divider mb="1rem" />

     <Typography
      fontSize="25px"
      fontWeight="600"
      lineHeight="1"
      textAlign="right"
      mb="1.5rem"
     >
      {currency(displayTotal)}
     </Typography>

     <Divider mb="1rem" />

     {isAbroadProduct && (
      <Typography fontSize="13px" color="text.primary" textAlign="justify">
       Shipping & Courier Charge will be calculated based on actual weight &
       dimensions when the product is in-house by Tizaraa.
      </Typography>
     )}
    </>
   )}
  </Card1>
 );
}
