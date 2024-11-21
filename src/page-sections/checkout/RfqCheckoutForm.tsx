"use client";

import { FC, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import FlexBox from "@component/FlexBox";
import RfqCheckoutAddress from "./RfqCheckoutAddress";
import { Button } from "@component/buttons";
import Typography from "@component/Typography";
import Grid from "@component/grid/Grid";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface RfqCheckoutFormProps {
  
  responseId: number; // Ensure responseId is a number
}

const RfqCheckoutForm: FC<RfqCheckoutFormProps> = ({  responseId }) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isAddressSelected, setIsAddressSelected] = useState(false);
  const [address, setAddress] = useState<any>(null);
  

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

  

  // Handle payment button click
  const handlePayment = async () => {
    const addressData = sessionStorage.getItem("address");
    console.log("Address", addressData);
    
    if (addressData) {
      console.log("Payment:", JSON.parse(addressData));
      toast.success("Proceeding to Payment...");
      //router.push("/orders");
    } else {
      toast.error("No address data found. Please add an address.");
    }

    if (!responseId) {
      toast.error("Response ID is missing.");
      return;
    }
    const parsedAddress = JSON.parse(addressData);

    const data = {
      vendor_response_id: responseId,
      name: parsedAddress.name,
      phone: parsedAddress.phone,
      email: parsedAddress.email || "",
      province_id: parsedAddress.province_id,
      city_id: parsedAddress.city_id,
      area_id: parsedAddress.area_id,
      house_level: parsedAddress.landmark || "",
      address: parsedAddress.address,
    };
    console.log("data",data);
    
    try {
      const response = await axios.post(
        "https://frontend.tizaraa.com/api/rfq-order",
        data
      );

      console.log("nazim",response);
      

      if (response.status === 200) {
        toast.success("Order placed successfully.");
        router.push("/orders");
      } else {
        toast.error("Error placing the order.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while placing the order.");
    }
    
  };

  // Handle back to cart button click
  const handleBackToCart = () => {
    toast.info("Returning to Cart...");
    router.push("/cart");
  };

  const handleAddressSelection = (selectedAddress: any) => {
    setAddress(selectedAddress); // Set selected address
    setIsAddressSelected(true);
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
          onClick={() => router.push("/address/checkoutAddress")}
        >
          Add New Address
        </Button>
      </FlexBox>

      {/* <CheckoutAddress /> */}
      {/* <CheckoutAddress setDeliveryCharge={setDeliveryCharge} /> */}
      <RfqCheckoutAddress onAddressSelect={handleAddressSelection} />

      <Grid container spacing={7}>
        <Grid item sm={6} xs={12}>
          <Button
            variant="outlined"
            color="primary"
            type="button"
            fullwidth
            onClick={handleBackToCart}
          >
            Back to Cart
          </Button>
        </Grid>

        <Grid item sm={6} xs={12}>
        <Button
            variant="outlined"
            color="primary"
            type="button"
            fullwidth
            onClick={handlePayment}
            disabled={!isAddressSelected} 
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default RfqCheckoutForm;