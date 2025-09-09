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

// "use client"
// // GLOBAL CUSTOM COMPONENTS
// import Grid from "@component/grid/Grid";
// import { useAppContext } from "@context/app-context";
// import { useSearchParams,useRouter } from "next/navigation";
// // PAGE SECTION COMPONENTS
// import CheckoutForm from "@sections/checkout/CheckoutForm";
// import CheckoutSummary from "@sections/checkout/CheckoutSummary";
// import RfqCheckoutForm from "@sections/checkout/RfqCheckoutForm";

// import RfqCheckoutSummary from "@sections/checkout/RfqCheckoutSummary";
// import Typography from "@component/Typography";
// //import { useState } from "react";
// import axios from "axios";
// import {  toast } from 'react-hot-toast';
// import authService from "services/authService";
// import { useState, useEffect } from "react";

// // import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png"
// import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png"
// import Image from "next/image";
// import NextImage from "@component/NextImage";

// export default function Checkout() {
//   const { state } = useAppContext();
//   const searchParams = useSearchParams();
//   const responseId = searchParams.get("response_id");
//   const [deliveryCharge, setDeliveryCharge] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   //const authtoken = authService.getToken();
//   const router = useRouter();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const checkAuth = () => {
//       if (!authService.isAuthenticated()) {
//         router.push("/login");
//       } else {
//         setIsLoggedIn(true);
//       }
//     };
//     checkAuth();
//   }, [router]);

//   if (!isLoggedIn) {
//     return null; // You can also return a loader or a placeholder here
//   }

//   const getTotalPrice = () => {
//     return state.cart.reduce(
//       (accumulator, item) =>
//         accumulator + (item.discountPrice ? item.discountPrice : item.price) * item.qty,
//       0
//     ) || 0;
//   };

//   // if (!responseId) {
//   //   return <Typography>Missing response ID</Typography>;
//   // }

//   return (
//     <>
//      {/* Background image */}
//      <NextImage
//   alt="newArrivalBanner"
//   src={tizaraa_watermark}
//   priority
//   style={{
//     position: "fixed",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -25%)",
//     width: "100%", // Set to 100% to ensure full responsiveness
//     height: "auto", // Maintain aspect ratio
//     maxWidth: "1200px", // Optional: Limit the maximum width
//     backgroundSize: "contain", // Adjust the scaling behavior
//     backgroundPosition: "center",
//     opacity: 0.1,
//     zIndex: 0,
//   }}
// />

//      <main
//     style={{
//       position: "relative",
//       background: "none",
//     }}
//   >

//     <Grid container flexWrap="wrap-reverse" spacing={6}>
//       <Grid item lg={8} md={8} xs={12}>
//         {/* Pass getTotalPrice to CheckoutForm */}
//         {responseId ? (<RfqCheckoutForm responseId={Number(responseId)} />) : (<CheckoutForm setDeliveryCharge={setDeliveryCharge} totalPrice={getTotalPrice()} />)}
//       </Grid>

//       <Grid item lg={4} md={4} xs={12}>
//         {/* Pass the deliveryCharge as a prop to CheckoutSummary */}
//         {responseId ? <RfqCheckoutSummary responseId={Number(responseId)} /> : <CheckoutSummary deliveryCharge={deliveryCharge} />}
//       </Grid>
//     </Grid>
//   </main>

//     </>
//   );
// }

"use client";
import Grid from "@component/grid/Grid";
import { useAppContext } from "@context/app-context";
import { useSearchParams, useRouter } from "next/navigation";
import CheckoutForm from "@sections/checkout/CheckoutForm";
import CheckoutSummary from "@sections/checkout/CheckoutSummary";
import RfqCheckoutForm from "@sections/checkout/RfqCheckoutForm";
import RfqCheckoutSummary from "@sections/checkout/RfqCheckoutSummary";
import Typography from "@component/Typography";
import { useState, useEffect } from "react";
import authService from "services/authService";
import NextImage from "@component/NextImage";
import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png";
import ApiBaseUrl from "api/ApiBaseUrl";

export default function Checkout() {
  const { state, dispatch } = useAppContext();
  const searchParams = useSearchParams();
  const responseId = searchParams.get("response_id");
  const [deliveryCharge, setDeliveryCharge] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push("/login");
    } else setIsLoggedIn(true);
  }, [router]);

  // ====== SYNC CART WITH BACKEND ======
  useEffect(() => {
    const syncCart = async () => {
      try {
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (!localCart.length) return;

        const response = await fetch(
          `${ApiBaseUrl.baseUrl}checkout/check/pricing`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orders: localCart }),
          }
        );

        if (!response.ok) {
          const text = await response.text();
          console.error("Price check failed:", text);
          return;
        }

        const data = await response.json();

        const updatedCart = localCart.map((item: any) => {
          const updatedItem = data.find(
            (d: any) => d.product_id === item.productId
          );
          if (updatedItem) {
            const newPrice = parseFloat(updatedItem.price);
            return {
              ...item,
              price: newPrice,
              discountPrice: item.discountPrice ? newPrice : null,
            };
          }
          return item;
        });

        // Save updated cart
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        sessionStorage.setItem("cartItems", JSON.stringify(updatedCart));
        dispatch({ type: "SET_CART", payload: updatedCart });
      } catch (error) {
        console.error("Cart sync failed:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) syncCart();
  }, [isLoggedIn, dispatch]);

  if (!isLoggedIn || loading) return null;

  const getTotalPrice = () =>
    state.cart.reduce(
      (acc, item) => acc + (item.discountPrice ?? item.price) * item.qty,
      0
    );

  return (
    <>
      <NextImage
        alt="watermark"
        src={tizaraa_watermark}
        priority
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -25%)",
          width: "100%",
          height: "auto",
          maxWidth: "1200px",
          opacity: 0.1,
          zIndex: 0,
        }}
      />
      <main style={{ position: "relative", background: "none" }}>
        <Grid container flexWrap="wrap-reverse" spacing={6}>
          <Grid item lg={8} md={8} xs={12}>
            {responseId ? (
              <RfqCheckoutForm responseId={Number(responseId)} />
            ) : (
              <CheckoutForm
                setDeliveryCharge={setDeliveryCharge}
                totalPrice={getTotalPrice()}
              />
            )}
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            {responseId ? (
              <RfqCheckoutSummary responseId={Number(responseId)} />
            ) : (
              <CheckoutSummary deliveryCharge={deliveryCharge} />
            )}
          </Grid>
        </Grid>
      </main>
    </>
  );
}
