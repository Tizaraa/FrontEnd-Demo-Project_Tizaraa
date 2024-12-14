// // GLOBAL CUSTOM COMPONENTS
// import Grid from "@component/grid/Grid";
// // PAGE SECTION COMPONENTS
// import CheckoutForm from "@sections/checkout/CheckoutForm";
// import CheckoutSummary from "@sections/checkout/CheckoutSummary";

// export default function Checkout() {
//   return (
//     <Grid container flexWrap="wrap-reverse" spacing={6}>
//       <Grid item lg={8} md={8} xs={12}>
//         <CheckoutForm />
//       </Grid>

//       <Grid item lg={4} md={4} xs={12}>
//         <CheckoutSummary />
//       </Grid>
//     </Grid>
//   );
// }

// "use client"
// // GLOBAL CUSTOM COMPONENTS
// import Grid from "@component/grid/Grid";
// // PAGE SECTION COMPONENTS
// import CheckoutForm from "@sections/checkout/CheckoutForm";
// import CheckoutSummary from "@sections/checkout/CheckoutSummary";
// import { useState } from "react";

// export default function Checkout() {
//   const [deliveryCharge, setDeliveryCharge] = useState(""); // State to hold delivery charge

//   return (
//     <Grid container flexWrap="wrap-reverse" spacing={6}>
//       <Grid item lg={8} md={8} xs={12}>
//         {/* Pass setDeliveryCharge to CheckoutForm to update delivery charge */}
//         <CheckoutForm setDeliveryCharge={setDeliveryCharge} />
//       </Grid>

//       <Grid item lg={4} md={4} xs={12}>
//         {/* Pass the deliveryCharge as a prop to CheckoutSummary */}
//         <CheckoutSummary deliveryCharge={deliveryCharge} />
//       </Grid>
//     </Grid>
//   );
// }






"use client"
// GLOBAL CUSTOM COMPONENTS
import Grid from "@component/grid/Grid";
import { useAppContext } from "@context/app-context";
import { useSearchParams } from "next/navigation";
// PAGE SECTION COMPONENTS
import CheckoutForm from "@sections/checkout/CheckoutForm";
import CheckoutSummary from "@sections/checkout/CheckoutSummary";
import RfqCheckoutForm from "@sections/checkout/RfqCheckoutForm";

import RfqCheckoutSummary from "@sections/checkout/RfqCheckoutSummary";
import Typography from "@component/Typography";
import { useState } from "react";
import axios from "axios";
import {  toast } from 'react-hot-toast';
import authService from "services/authService";

export default function Checkout() {
  const { state } = useAppContext();
  const searchParams = useSearchParams();
  const responseId = searchParams.get("response_id");
  const [deliveryCharge, setDeliveryCharge] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //const authtoken = authService.getToken();

  const getTotalPrice = () => {
    return state.cart.reduce(
      (accumulator, item) =>
        accumulator + (item.discountPrice ? item.discountPrice : item.price) * item.qty,
      0
    ) || 0;
  };
 
  // if (!responseId) {
  //   return <Typography>Missing response ID</Typography>;
  // }


  return (
    <Grid container flexWrap="wrap-reverse" spacing={6}>
      <Grid item lg={8} md={8} xs={12}>
        {/* Pass getTotalPrice to CheckoutForm */}
        {responseId ? (<RfqCheckoutForm responseId={Number(responseId)} />) : (<CheckoutForm setDeliveryCharge={setDeliveryCharge} totalPrice={getTotalPrice()} />)}
      </Grid>

      <Grid item lg={4} md={4} xs={12}>
        {/* Pass the deliveryCharge as a prop to CheckoutSummary */}
        {responseId ? <RfqCheckoutSummary responseId={Number(responseId)} /> : <CheckoutSummary deliveryCharge={deliveryCharge} />}
      </Grid>
    </Grid>
  );
}

