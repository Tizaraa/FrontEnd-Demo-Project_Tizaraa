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

"use client"
// GLOBAL CUSTOM COMPONENTS
import Grid from "@component/grid/Grid";
// PAGE SECTION COMPONENTS
import CheckoutForm from "@sections/checkout/CheckoutForm";
import CheckoutSummary from "@sections/checkout/CheckoutSummary";
import { useState } from "react";

export default function Checkout() {
  const [deliveryCharge, setDeliveryCharge] = useState(""); // State to hold delivery charge

  return (
    <Grid container flexWrap="wrap-reverse" spacing={6}>
      <Grid item lg={8} md={8} xs={12}>
        {/* Pass setDeliveryCharge to CheckoutForm to update delivery charge */}
        <CheckoutForm setDeliveryCharge={setDeliveryCharge} />
      </Grid>

      <Grid item lg={4} md={4} xs={12}>
        {/* Pass the deliveryCharge as a prop to CheckoutSummary */}
        <CheckoutSummary deliveryCharge={deliveryCharge} />
      </Grid>
    </Grid>
  );
}
