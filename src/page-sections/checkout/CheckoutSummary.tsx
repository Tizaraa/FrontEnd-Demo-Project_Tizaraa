"use client";

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

export default function CheckoutSummary() {
  const { state } = useAppContext();

  const getTotalPrice = () => {
    return state.cart.reduce((accumulator, item) => 
      accumulator + (item.discountPrice ?? item.price) * item.qty, 0
    ) || 0;
  };

      // User shipping data
      
      let shippingData = sessionStorage.getItem('address');
      let userShippingdata = JSON.parse(shippingData);

      const deliveryChargeDisplay = userShippingdata && userShippingdata.delivery_charge 
  ? userShippingdata.delivery_charge 
  : "-";

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
          {currency(getTotalPrice())}
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
         {/* { userShippingdata.delivery_charge} */}
         {deliveryChargeDisplay}
          </Typography>
        </FlexBox>
      </FlexBox>

      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Tax:</Typography>

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
      {currency(getTotalPrice())}
      </Typography>

      <TextField placeholder="Voucher" fullwidth />

      <Button variant="outlined" color="primary" mt="1rem" mb="30px" fullwidth>
        Apply Voucher
      </Button>
    </Card1>
  );
}
