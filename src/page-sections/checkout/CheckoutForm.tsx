"use client";

import { FC, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import FlexBox from "@component/FlexBox";
import CheckoutAddress from "./CheckoutAddress";
import { Button } from "@component/buttons";
import Typography from "@component/Typography";
import Grid from "@component/grid/Grid";

export default function CheckoutForm({ setDeliveryCharge }) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768); // Mobile
      setIsTablet(width > 768 && width <= 1200); // Tablet
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check on component mount

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const flexBoxStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row', // Stack on mobile
    gap: isMobile ? '1rem' : isTablet ? '10rem' : '30rem', // Adjust gap
    alignItems: 'center',
    justifyContent: isMobile ? 'center' : 'space-between',
  };

  // Handle payment button click
  const handlePayment = () => {
    const addressData = sessionStorage.getItem("address");
    if (addressData) {
      console.log("Payment:", JSON.parse(addressData));
    } else {
      console.log("No address data found in sessionStorage.");
    }
    router.push("/payment");
  };

  return (
    <>
      <FlexBox style={flexBoxStyle}>
        <Typography>Billing and Shipping</Typography>
        <Button
          px="2rem"
          color="primary"
          bg="primary.light"
          my="2rem"
          onClick={() => router.push("/address/checkoutAddress")}
          
        >
          Add New Address
        </Button>
      </FlexBox>

      <CheckoutAddress />

      <Grid container spacing={7}>
        <Grid item sm={6} xs={12}>
          <Link href="/cart">
            <Button variant="outlined" color="primary" type="button" fullwidth>
              Back to Cart
            </Button>
          </Link>
        </Grid>

        <Grid item sm={6} xs={12}>
          <Button
            variant="outlined"
            color="primary"
            type="button"
            fullwidth
            onClick={handlePayment} 
          >
            Payment
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
