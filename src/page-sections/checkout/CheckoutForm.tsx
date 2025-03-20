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
import OrderedItem from "./OrderedItem";
import Cart from "app/(layout-3)/(checkout)/cart/page";
import ExpressedDelivery from "./ExpressedDelivery";

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

  // const [isExpressedDelivery, setIsExpressedDelivery] = useState(false);

  // // Handle checkbox change for Expressed Delivery
  // const handleExpressedDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setIsExpressedDelivery(e.target.checked);
  //   // If Expressed Delivery is checked, set delivery charge to 10
  //   if (e.target.checked) {
  //     setDeliveryCharge(10); // Set the delivery charge for Expressed Delivery
  //   } else {
  //     setDeliveryCharge(0); // Reset to default delivery charge
  //   }
  // };
  

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
      <OrderedItem></OrderedItem>

      <Grid container spacing={7} style={{ marginTop: "2px" }}>
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
        {/* <ExpressedDelivery onChange={handleExpressedDeliveryChange} /> */}

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