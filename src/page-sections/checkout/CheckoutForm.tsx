"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FlexBox from "@component/FlexBox";
import CheckoutAddress from "./CheckoutAddress";
import { Button } from "@component/buttons";
import Typography from "@component/Typography";
import Grid from "@component/grid/Grid";
import authService from "services/authService";
import Address from "@models/address.model";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BeatLoader from "react-spinners/BeatLoader";
import OrderedItem from "./OrderedItem";
import { useAppContext } from "@context/app-context";
import tz from "../../theme/tizaraa";
import { CheckoutShell } from "./checkoutStyles";

export default function CheckoutForm({ setDeliveryCharge, totalPrice }) {
 const { state } = useAppContext();
 const router = useRouter();
 const [isMobile, setIsMobile] = useState(false);
 const [seller_type, setSellerType] = useState("");
 const [ShowAddress, setShowAddress] = useState(false);
 const [isTablet, setIsTablet] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
 const [isHasLoading, setIsHasLoading] = useState(false);
 const [isHasPayLoading, setIsHasPayLoading] = useState(false);
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

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
  flexDirection: isMobile ? "row" : "row",
  gap: isMobile ? "1rem" : isTablet ? "10rem" : "30rem",
  alignItems: "center",
  justifyContent: isMobile ? "center" : "space-between",
 };

 useEffect(() => {
  if (typeof window !== "undefined") {
   setTimeout(() => {
    const seller_type = localStorage.getItem("seller_type") || "";
    setSellerType(seller_type.toLowerCase());
    setShowAddress(true);
   }, 100);
  }
 }, [state.cart]);

 useEffect(() => {
  const cart = JSON.parse(sessionStorage.getItem("selectedProducts") || "[]");
  const totalPrice = parseFloat(
   sessionStorage.getItem("savedTotalPrice") || "0"
  );
  const shippingCharge = parseFloat(
   sessionStorage.getItem("savedTotalWithDelivery") || "0"
  );

  if (cart.length > 0) {
   sessionStorage.setItem("cartItems", JSON.stringify(cart));
  }
  sessionStorage.setItem("savedTotalPrice", totalPrice.toString());
  sessionStorage.setItem("savedTotalWithDelivery", shippingCharge.toString());
 }, []);

 // Handle payment button click
 // const handlePayment = () => {
 //   setIsHasPayLoading(true)
 //   const addressData = sessionStorage.getItem("address");
 //   if (addressData) {
 //     // console.log("Payment:", JSON.parse(addressData));
 //     toast.success("Proceed to Payment.");
 //     if(isLoggedIn){
 //       router.push("/payment");
 //     }else{
 //       router.push("/login");
 //     }
 //   } else {
 //     toast.error("No address data found. Please add an address.");
 //     setIsHasPayLoading(false)
 //   }
 // };

 const handlePayment = async () => {
  const isCorporate = seller_type.toLowerCase() === "corporate";

  if (!isCorporate && !selectedAddress) {
   setIsHasPayLoading(false);
   toast.error("Please select or add an address before proceeding to pay", {
    autoClose: 2000,
   });
   return;
  }

  setIsHasPayLoading(true);
  toast.success("Proceeding to payment...", { autoClose: 2000 });

  if (isLoggedIn) {
   router.push("/payment");
  } else {
   router.push("/login");
  }
 };

 // Handle back to cart button click
 const handleBackToCart = () => {
  setIsHasLoading(true);
  toast.info("Returning to Cart...");
  router.push("/cart");
 };

 const handleAddNewAddress = () => {
  setIsLoading(true);
  if (isLoggedIn) {
   router.push("/address/checkoutAddress");
  } else {
   router.push("/login");
  }
 };

 const isCorporateFlow = seller_type.toLocaleLowerCase() === "corporate";

 return (
  <CheckoutShell>
   {/* toasts render in the app-wide <AppToaster /> (lib/registry) */}
   <section className="co-card" aria-label={isCorporateFlow ? "Pickup" : "Delivery address"}>
    {!isCorporateFlow && (
     <div className="co-head">
      <h3 className="co-card-title">
       <span className="co-card-icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
         <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
         <circle cx="12" cy="10" r="3" />
        </svg>
       </span>
       Delivery address
      </h3>
      <button type="button" className="co-add" onClick={handleAddNewAddress} disabled={isLoading}>
       {isLoading ? <BeatLoader size={8} color={tz.color.emberDeep} /> : <>＋ Add new address</>}
      </button>
     </div>
    )}
    {ShowAddress && (
     <CheckoutAddress
      seller_type={seller_type}
      setDeliveryCharge={setDeliveryCharge}
      selectedAddress={selectedAddress}
      setSelectedAddress={setSelectedAddress}
     />
    )}
   </section>

   <OrderedItem></OrderedItem>

   <div className="co-actions">
    <button type="button" className="co-btn" onClick={handleBackToCart} disabled={isHasLoading}>
     {isHasLoading ? (
      <BeatLoader size={10} color={tz.color.emberDeep} />
     ) : (
      <>
       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 12H5M11 18l-6-6 6-6" />
       </svg>
       Back to cart
      </>
     )}
    </button>
    <button type="button" className="co-btn co-btn--solid" onClick={handlePayment} disabled={totalPrice === 0 || isHasPayLoading}>
     {isHasPayLoading ? (
      <BeatLoader size={10} color={tz.color.paper} />
     ) : (
      <>
       Proceed to pay
       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
       </svg>
      </>
     )}
    </button>
   </div>
  </CheckoutShell>
 );
}
