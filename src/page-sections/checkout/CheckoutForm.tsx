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
import authService from "services/authService";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BeatLoader from "react-spinners/BeatLoader";

export default function CheckoutForm({ setDeliveryCharge, totalPrice }) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [hasAddress, setHasAddress] = useState(false);
  const [isAddressChecked, setIsAddressChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHasLoading, setIsHasLoading] = useState(false);
  const [isHasPayLoading, setIsHasPayLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(authService.isAuthenticated());
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768); // Mobile
      setIsTablet(width > 768 && width <= 1200); // Tablet
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check on component mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const flexBoxStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? "1rem" : isTablet ? "10rem" : "30rem",
    alignItems: "center",
    justifyContent: isMobile ? "center" : "space-between",
  };

  useEffect(() => {
    const cart = JSON.parse(sessionStorage.getItem("selectedProducts") || "[]");
    const totalPrice = parseFloat(sessionStorage.getItem("savedTotalPrice") || "0");
    const shippingCharge = parseFloat(sessionStorage.getItem("savedTotalWithDelivery") || "0");

    if (cart.length > 0) {
      sessionStorage.setItem("cartItems", JSON.stringify(cart));
    }
    sessionStorage.setItem("savedTotalPrice", totalPrice.toString());
    sessionStorage.setItem("savedTotalWithDelivery", shippingCharge.toString());
  }, []);

  // Handle payment button click
  const handlePayment = () => {
    setIsHasPayLoading(true)
    const addressData = sessionStorage.getItem("address");
    if (addressData) {
      // console.log("Payment:", JSON.parse(addressData));
      toast.success("Proceed to Payment.");
      if(isLoggedIn){
        router.push("/payment");
      }else{
        router.push("/login");
      }
    } else {
      toast.error("No address data found. Please add an address.");
      setIsHasPayLoading(false)
    }
  };

  // Handle back to cart button click
  const handleBackToCart = () => {
    setIsHasLoading(true);
    toast.info("Returning to Cart...");
    router.push("/cart");
  };

  const handleAddressChange = (hasAddressData: boolean, isSelected: boolean) => {
    setHasAddress(hasAddressData);
    setIsAddressChecked(isSelected);
  };

  const handleAddNewAddress = () => {
    setIsLoading(true);
    if(isLoggedIn){
      router.push("/address/checkoutAddress");
    }else{
      router.push("/login");
    }
  };

  return (
    <>
      <ToastContainer autoClose={4000} />
      
      <FlexBox style={flexBoxStyle}>
        <Typography>Billing and Shipping</Typography>
        <Button
          px="2rem"
          color="primary"
          bg="primary.light"
          my="2rem"
          onClick={handleAddNewAddress}
        >
          {isLoading ? <BeatLoader size={18} color="#E94560" /> : "Add New Address"}
        </Button>
      </FlexBox>

      {/* <CheckoutAddress /> */}
      <CheckoutAddress setDeliveryCharge={setDeliveryCharge} onAddressChange={handleAddressChange} />

      <Grid container spacing={7}>
        <Grid item sm={6} xs={12}>
          <Button
            //variant="outlined"
            color="primary"
            bg="primary.light"
            type="button"
            fullwidth
            onClick={handleBackToCart}
          >
            {isHasLoading ? <BeatLoader size={18} color="#E94560" /> : "Back to Cart"}
            {/* Back to Cart */}
          </Button>
        </Grid>

        <Grid item sm={6} xs={12}>
        <Button
            //variant="outlined"
            // color="primary"
            // bg="primary.light"
            style={{
              color: "#ffe1e6",
              backgroundColor: "#e94560",
            }}
            type="button"
            fullwidth
            onClick={handlePayment}
            disabled={!hasAddress || !isAddressChecked || totalPrice === 0}
          >
            {/* Proceed to Pay
            const [isHasPayLoading, setIsHasPayLoading] = useState(false); */}
            {isHasPayLoading ? <BeatLoader size={18} color="white" /> : "Proceed to Pay"}
          </Button>
        </Grid>
      </Grid>
    </>
  );
}