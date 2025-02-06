// GLOBAL CUSTOM COMPONENTS
"use client"
import Grid from "@component/grid/Grid";
// PAGE SECTION COMPONENTS
import PaymentForm from "@sections/payment/PaymentForm";
import PaymentSummary from "@sections/payment/PaymentSummary";
import { useState, useEffect } from "react";
import authService from "services/authService";
import { useRouter } from "next/navigation";

// import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png"
import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png"
import Image from "next/image";
import NextImage from "@component/NextImage";

export default function Checkout() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated
    const authenticated = authService.isAuthenticated();
    setIsLoggedIn(authenticated);

    // If not authenticated, redirect to the login page
    if (!authenticated) {
      router.push("/login");
    }
  }, [router]);

  // If the user is not logged in, prevent rendering the components
  if (!isLoggedIn) {
    return null; // You can also return a loader or a placeholder here
  }
  
  return (
    <>
      {/* Background image */}
      <NextImage
  alt="newArrivalBanner"
  src={tizaraa_watermark}
  priority
  style={{
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -25%)",
    width: "100%", // Set to 100% to ensure full responsiveness
    height: "auto", // Maintain aspect ratio
    maxWidth: "1200px", // Optional: Limit the maximum width
    backgroundSize: "contain", // Adjust the scaling behavior
    backgroundPosition: "center",
    opacity: 0.1,
    zIndex: 0,
  }}
/>

     <main
    style={{
      position: "relative",
      background: "none",
    }}
  >

    <Grid container flexWrap="wrap-reverse" spacing={6}>
      <Grid item lg={8} md={8} xs={12}>
        <PaymentForm />
      </Grid>

      <Grid item lg={4} md={4} xs={12}>
        <PaymentSummary />
      </Grid>
    </Grid>
    </main>
    
    </>
  );
}
