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
export default function PaymentSummary() {
  const { state } = useAppContext();
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [newTotal, setNewTotal] = useState(0);
  const [isAbroadProduct, setIsAbroadProduct] = useState(false);

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
    const savedShipping = parseFloat(
      sessionStorage.getItem("deliveryCharge") || "0"
    );
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

      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Subtotal:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            {currency(totalPrice)}
          </Typography>
        </FlexBox>
      </FlexBox>

      {isAbroadProduct && (
        <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
          <Typography color="#E94560">Pay Now ({selectedPaymentOption}%):</Typography>
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
          <FlexBox
            justifyContent="space-between"
            alignItems="center"
            mb="0.5rem"
          >
            <Typography color="text.hint">Shipping:</Typography>

            <FlexBox alignItems="flex-end">
              <Typography fontSize="18px" fontWeight="600" lineHeight="1">
                {/* {deliveryChargeDisplay} */}
                {currency(shippingCharge)}
              </Typography>
            </FlexBox>
          </FlexBox>

          <FlexBox
            justifyContent="space-between"
            alignItems="center"
            mb="0.5rem"
          >
            <Typography color="text.hint">Vat:</Typography>

            <FlexBox alignItems="flex-end">
              <Typography fontSize="18px" fontWeight="600" lineHeight="1">
                -
              </Typography>

              {/* <Typography fontWeight="600" fontSize="14px" lineHeight="1">
            00
          </Typography> */}
            </FlexBox>
          </FlexBox>

          <FlexBox justifyContent="space-between" alignItems="center" mb="1rem">
            <Typography color="text.hint">Discount:</Typography>

            <FlexBox alignItems="flex-end">
              <Typography fontSize="18px" fontWeight="600" lineHeight="1">
                {currency(discount)}
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
    </Card1>
  );
}
