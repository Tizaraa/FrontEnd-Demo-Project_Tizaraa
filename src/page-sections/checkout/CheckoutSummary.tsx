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

export default function CheckoutSummary({ deliveryCharge }) {
  const { state } = useAppContext();
  const [savedTotalPrice, setSavedTotalPrice] = useState(() => {
    return parseFloat(sessionStorage.getItem("savedTotalPrice") || "0");
  });
  const [savedTotalWithDelivery, setSavedTotalWithDelivery] = useState(() => {
    return parseFloat(sessionStorage.getItem("savedTotalWithDelivery") || "0");
  });

  useEffect(() => {
    const getTotalPrice = () => {
      return state.cart.reduce((accumulator, item) => {
        if (state.selectedProducts.includes(item.id)) {
          return (
            accumulator +
            (item.discountPrice ? item.discountPrice : item.price) * item.qty
          );
        }
        return accumulator;
      }, 0);
    };

    const storedAddress = sessionStorage.getItem("address");
    const selectedAddress = storedAddress ? JSON.parse(storedAddress) : null;
    const deliveryChargeDisplay =
      selectedAddress?.deliveryCharge || deliveryCharge || 0;

    const totalPrice = getTotalPrice();
    const totalWithDelivery = parseFloat(deliveryChargeDisplay);

    if (totalPrice > 0) {
      setSavedTotalPrice(totalPrice);
      sessionStorage.setItem("savedTotalPrice", totalPrice.toString());
    }

    if (totalWithDelivery > 0) {
      setSavedTotalWithDelivery(totalWithDelivery);
      sessionStorage.setItem("savedTotalWithDelivery", totalWithDelivery.toString());
    }
  }, [state, deliveryCharge]);
  // useEffect(() => {
  //   const savedPrice = parseFloat(sessionStorage.getItem("savedTotalPrice") || "0");
  //   const savedWithDelivery = parseFloat(
  //     sessionStorage.getItem("savedTotalWithDelivery") || "0"
  //   );

  //   if (savedPrice > 0) setSavedTotalPrice(savedPrice);
  //   if (savedWithDelivery > 0) setSavedTotalWithDelivery(savedWithDelivery);
  // }, []);

  // User shipping data
      
  // let shippingData = sessionStorage.getItem('address');
  // let userShippingdata = JSON.parse(shippingData);

  // const deliveryChargeDisplay = userShippingdata && userShippingdata.deliveryCharge
  // ? userShippingdata.deliveryCharge
  // : deliveryCharge || "-";
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
              productStock={item.productStock}
              name={item.name}
              price={item.price}
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
          {/* {currency(getTotalPrice())} */}
          {/* {savedTotalPrice !== 0 ? currency(savedTotalPrice) : "0"} */}
          {currency(savedTotalPrice)}
          </Typography>

          {/* <Typography fontWeight="600" fontSize="14px" lineHeight="1">
            00
          </Typography> */}
        </FlexBox>
      </FlexBox>

      
      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Shipping:</Typography>

        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          {/* {deliveryChargeDisplay !== "-" ? currency(deliveryChargeDisplay) : "-"} */}
          {currency(savedTotalWithDelivery)}
          </Typography>
        </FlexBox>
      </FlexBox>

   

      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">VAT:</Typography>

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
            -
          </Typography>
        </FlexBox>
      </FlexBox>

      <Divider mb="1rem" />

      <Typography fontSize="25px" fontWeight="600" lineHeight="1" textAlign="right" mb="1.5rem">
      {/* {currency(getTotalPrice())} */}
      {/* {currency(getTotalPrice() + (parseFloat(deliveryChargeDisplay) || 0))} */}
      {/* {currency(savedTotalWithDelivery)} */}
      {currency(savedTotalWithDelivery + savedTotalPrice)}
      </Typography>

      {/* <TextField placeholder="Voucher" fullwidth />

      <Button variant="outlined" color="primary" mt="1rem" mb="30px" fullwidth>
        Apply Voucher
      </Button> */}
    </Card1>
  );
}


// import  Typography  from "@component/Typography";

// export default function CheckoutSummary({ deliveryCharge }) {
//   return (
//     <div>
//       <Typography variant="h6">Delivery Charge: {deliveryCharge ? `$${deliveryCharge}` : "Not selected"}</Typography>
//       {/* Other summary details */}
//     </div>
//   );
// }
