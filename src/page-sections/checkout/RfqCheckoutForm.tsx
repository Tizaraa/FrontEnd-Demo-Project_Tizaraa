"use client";

import { FC, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter,useSearchParams } from "next/navigation";
import axios from "axios";
import FlexBox from "@component/FlexBox";
import RfqCheckoutAddress from "./RfqCheckoutAddress";
import { Button } from "@component/buttons";
import Typography from "@component/Typography";
import Grid from "@component/grid/Grid";
import authService from "services/authService";
import BeatLoader from "react-spinners/BeatLoader";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiBaseUrl from "api/ApiBaseUrl";

interface RfqCheckoutFormProps {
  
  responseId: number; // Ensure responseId is a number
}

const RfqCheckoutForm: FC<RfqCheckoutFormProps> = ({  responseId }) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isAddressSelected, setIsAddressSelected] = useState(false);
  const [address, setAddress] = useState<any>(null);
  const searchParams = useSearchParams();
  const authtoken = authService.getToken();
  const [isLoading, setIsLoading] = useState(false);

  // const userFromURL = searchParams.get("user");
  // console.log("naz",userFromURL);

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

  

  // Handle payment button click
  const handlePayment = async () => {
    //const [user, setUser] = useState(null);
    const addressData = sessionStorage.getItem("address");
    console.log("Address", addressData);
    
    if (addressData) {
      console.log("Payment:", JSON.parse(addressData));
      //toast.success("Proceeding to Payment...");
      //router.push("/orders");
    } else {
      toast.error("No address data found. Please add an address.");
    }

    if (!responseId) {
      toast.error("Response ID is missing.");
      return;
    }
    // if(authService){
    //   const user = authService.getUser()
    //   console.log("naz",user);
      
    // }
    // if (!authService.isAuthenticated()) {
    //   router.push("/login");
    // } else {
    //   authService.getUser().then((userData) => {
    //     setUser(userData); // Set user details
    //     //setLoading(false);
    //   });
    // }
    const parsedAddress = JSON.parse(addressData);
    const user = await authService.getUser();
    //const email = user?.email || "";

    console.log("p",parsedAddress);
    //console.log("p",email);

    const data = {
      vendor_response_id: responseId,
    name: parsedAddress.name,
    phone: parsedAddress.phone,
    email: user?.email || "",
    province_id: parsedAddress.province_id,
    city_id: parsedAddress.city_id,
    area_id: parsedAddress.area_id,
    house_level: parsedAddress.landmark || "",
    address: parsedAddress.address,
    }

    console.log("data",data);
    
    

try {
  const response = await axios.post(`${ApiBaseUrl.baseUrl}rfq-order`, {
    vendor_response_id: responseId,
    name: parsedAddress.name,
    phone: parsedAddress.phone,
    email: user?.email || "",
    province_id: parsedAddress.province_id,
    city_id: parsedAddress.city_id,
    area_id: parsedAddress.area_id,
    house_level: parsedAddress.landmark || "",
    address: parsedAddress.address,
  },
  {
    headers: {
      Authorization: `Bearer ${authtoken}`,
    },
  }
);

  console.log("nazim", response);

  if (response.status === 200) {
    toast.success("Order placed successfully.");
    router.push("/orders");
  } else {
    toast.error("Error placing the order.");
  }
} catch (error) {
  console.error("Error:", error);
  toast.error("Your order could not be placed because an order with this vendor response ID already exists. Please check your order details and try again.");
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