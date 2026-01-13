"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChangeEvent, Fragment, useState } from "react";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import { H6, SemiSpan } from "@component/Typography";
import useWindowSize from "@hook/useWindowSize";
import { useAppContext } from "@context/app-context";
import CheckBox from "@component/CheckBox";
import ApiBaseUrl from "api/ApiBaseUrl";
import toast from "react-hot-toast"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import styles for toast
import PaymentCheckBox from "@component/PaymentCheckBox";
import PaymentImage from "@component/PaymentImage";
import cashOnDeliveryImage from "../../../public/assets/images/payment/cashOnDelivery.jpg";
import onlinePayment from "../../../public/assets/images/payment/Mobile_Banking.jpg";
import bayWithCredit from "../../../public/assets/images/payment/bay-with-credit.png";
import NagadImage from "../../../public/assets/images/payment/Nagad.avif";
import BkashImage from "../../../public/assets/images/payment/Bkash.png";
import BeatLoader from "react-spinners/BeatLoader";
import authService from "services/authService";
import axios from "@lib/axiosClient";
import { AxiosError } from "axios";

export default function CorporatePaymentForm() {
 const { push } = useRouter();
 const { state, dispatch } = useAppContext();
 const [paymentMethod, setPaymentMethod] = useState<string>("");
 const [isHasLoading, setIsHasLoading] = useState(false);
 const [isHasPayLoading, setIsHasPayLoading] = useState(false);
 const [isLoggedIn, setIsLoggedIn] = useState(false);

 const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

 useEffect(() => {
  setIsLoggedIn(authService.isAuthenticated());
 }, []);

 const savedShipping = parseFloat(
  sessionStorage.getItem("savedTotalWithDelivery") || "0"
 );

 const expressDelivery = sessionStorage.getItem("expressDelivery");

 // Check if all products are abroad
 const hasAbroadProduct = state.cart.every(
  (product) => product.productType === "Abroad"
 );

 // For abroad products, use savedTotalPrice instead of newTotal
 const totalFromNewTotal = hasAbroadProduct
  ? parseFloat(sessionStorage.getItem("savedTotalPrice") || "0")
  : parseFloat(sessionStorage.getItem("newTotal") || "0");

 const savedTotalPrice = parseFloat(
  sessionStorage.getItem("savedTotalPrice") || "0"
 );

 const total_ammount = totalFromNewTotal - savedShipping;
 const isSubtotalZero = total_ammount === 0;

 // promocode & promocode_price get from session storage
 const promocode = sessionStorage.getItem("promoCode");
 const promocode_price = parseFloat(sessionStorage.getItem("discount"));

 const advance_payment_percent = parseFloat(
  sessionStorage.getItem("selectedPaymentOption")
 );

 const router = useRouter();

 let authtoken = localStorage.getItem("token");
 const orderSubmit = async () => {
  if (isLoggedIn) {
   router.push("/payment");
  } else {
   router.push("/login");
  }
  setIsHasLoading(true);
  if (isSubtotalZero) {
   toast.error("Your cart is empty. Please add items before proceeding.");
   return;
  }
  let getData = localStorage.getItem("userInfo");
  let userinfo = JSON.parse(getData);
  // Load values from sessionStorage
  const savedPrice = parseFloat(
   sessionStorage.getItem("savedTotalPrice") || "0"
  );

  if (
   paymentMethod.toString() === "4" &&
   userinfo?.type === "Corporate" &&
   savedPrice > Number(userinfo?.credit_balance)
  ) {
   toast.error("Your credit balance is not enough.");
   setIsHasLoading(false);
   return;
  }
  let shippingData = sessionStorage.getItem("address");
  // console.log("Session Storage Data:", shippingData);
  let userShippingdata = JSON.parse(shippingData);

  // let cartData = localStorage.getItem('cart');
  const cartData = JSON.parse(
   sessionStorage.getItem("selectedProducts") || "[]"
  );

  // Ensure cartData is valid and not empty before trying to access its items
  const productType =
   cartData.length > 0 ? cartData[0]?.productType : "General";

  let cart = cartData;

  if (paymentMethod === "2") {
   try {
    const response = await axios.post(`pay-via-ajax`, {
     user_id: userinfo?.id,
     seller_id: cartData[0]?.sellerId,
     cus_name: userShippingdata?.shipping_name || userShippingdata?.name,
     cus_email: userinfo?.email,
     cus_phone: userShippingdata?.shipping_contact || userShippingdata?.phone,
     province_id:
      userShippingdata?.shipping_province || userShippingdata?.province_id,
     city_id: userShippingdata?.shipping_city || userShippingdata?.city_id,
     area_id: userShippingdata?.shipping_area || userShippingdata?.area_id,
     house_level:
      userShippingdata?.selectedLandmark || userShippingdata?.landmark,
     delivery_charge: savedShipping || 0,
     cus_add1: userShippingdata?.shipping_address1 || userShippingdata?.address,
     currency: "BDT",
     total_amount: total_ammount,
     advance_payment_percent: advance_payment_percent,
     productType: productType,
     payment_type: paymentMethod,
     payment_method: paymentMethod,
    });
    // console.log("online Response:", response);

    let orderId = response.data?.orderid;
    // console.log("id", orderId);
    // console.log("Selected payment method:", paymentMethod);
    localStorage.setItem("orderId", orderId);
    localStorage.setItem("orderSuccess", "true");

    await Promise.all(
     cart.map(async (cartdata) => {
      try {
       // Set color handling logic
       let color = cartdata.id;
       if (/\D--\d+$/.test(cartdata.id)) {
        color = cartdata.id.replace(/--\d+$/, "");
       } else if (cartdata.id) {
        color = "";
       }

       // Place order items for all products, including OTC
       const response = await axios.post(`checkout/order-items`, {
        orders: [
         {
          delivery_charge: savedShipping,
          user_id: userinfo.id,
          seller_id: cartdata.sellerId,
          order_id: orderId,
          product_id: cartdata.productId,
          color: cartdata.selectedColor,
          size: cartdata.selectedSize,
          attribute: cartdata.selectedSpecification,
          qty: cartdata.qty,
          note1: "lorem10",
          single_amount: cartdata.price,
          total_amount: cartdata.total_amount,
         },
        ],
       });

       console.log("Cart Item Response:", response.data);
      } catch (error) {
       console.error("Failed to add item to order:", error.response);
       setIsHasLoading(false);
      }
     })
    );

    //router.push("/orders");
    localStorage.removeItem("orderId");
    sessionStorage.removeItem("selectedProducts");
    //localStorage.removeItem("cart");
    sessionStorage.removeItem("paymentMethod");
    sessionStorage.removeItem("savedTotalPrice");
    sessionStorage.removeItem("savedTotalWithDelivery");
    cart.forEach((item) => {
     dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { ...item, qty: 0 },
     });
    });

    const redirectUrl = response.data?.redirect_url;
    // console.log(redirectUrl);
    //return

    if (redirectUrl) {
     //const searchParams = useSearchParams();
     window.location.href = redirectUrl;
     localStorage.setItem("redirectUrl", redirectUrl);
    } else {
     toast.error("Payment initiation failed. No redirect URL received.");
     setIsHasLoading(false);
    }
   } catch (error) {
    console.error("Online Payment Error:", error);
    toast.error("Error initiating online payment payment!");
    setIsHasLoading(false);
   }
  } else {
   try {
    const orderResponse = await axios.post(`checkout/order`, {
     user_id: userinfo?.id,
     name: userShippingdata?.shipping_name || userShippingdata?.name,
     phone: userShippingdata?.shipping_contact || userShippingdata?.phone,
     email: userinfo?.email,
     province_id:
      userShippingdata?.shipping_province || userShippingdata?.province_id,
     city_id: userShippingdata?.shipping_city || userShippingdata?.city_id,
     area_id: userShippingdata?.shipping_area || userShippingdata?.area_id,
     house_level:
      userShippingdata?.selectedLandmark || userShippingdata?.landmark,
     address: userShippingdata?.shipping_address1 || userShippingdata?.address,
     delivery_charge: savedShipping || 0,
     delivery_type: expressDelivery,
     total_ammount: total_ammount,
     payment_type: paymentMethod,
     seller_id: cartData[0]?.sellerId,
     payment_method: paymentMethod,
     productType: productType,
     promocode: promocode_price > 0 ? promocode : null,
     promocode_price: promocode_price > 0 ? promocode_price : null,
    });
    if (!orderResponse.data?.success) {
     toast.error(
      orderResponse.data.message || "Error placing cash on delivery order!"
     );
     return;
    }
    // console.log("Order Response:", orderResponse);

    let orderId = orderResponse.data.message.orderid;
    localStorage.setItem("orderId", orderId);
    localStorage.setItem("orderSuccess", "true");

    const handleOrderItems = async () => {
     try {
      // Wait for all async operations to finish using Promise.all
      await Promise.all(
       cart.map(async (cartdata) => {
        try {
         // Set color handling logic
         let color = cartdata.id;
         if (/\D--\d+$/.test(cartdata.id)) {
          color = cartdata.id.replace(/--\d+$/, "");
         } else if (cartdata.id) {
          color = "";
         }

         const single_amount = Number(
          cartdata.selectedColor && cartdata.selectedSize
           ? cartdata.sizeColor?.colorwithsize?.[cartdata.selectedColor]?.find(
              (s) => s.size === cartdata.selectedSize
             )?.price ||
              cartdata.discountPrice ||
              cartdata.price
           : cartdata.discountPrice || cartdata.price
         );

         // Create the order object
         const order = {
          delivery_charge: savedShipping,
          user_id: userinfo.id,
          seller_id: cartdata.sellerId,
          order_id: orderId,
          product_id: cartdata.productId,
          color: cartdata.selectedColor,
          attribute: cartdata.selectedSpecification,
          size: cartdata.selectedSize,
          qty: cartdata.qty,
          note1: "lorem10",
          single_amount: single_amount,
          total_amount: single_amount * cartdata.qty,
         };

         // Send the order to the API
         const response = await axios.post(`checkout/order-items`, {
          orders: [order],
         });

         console.log("Cart Item Response:", response.data);
        } catch (error) {
         console.error("Failed to add item to order:", error.response);
        }
       })
      );
     } catch (error) {
      console.error("Error in processing cart items:", error);
     } finally {
      setIsHasLoading(false);
     }
    };

    // Call the function to handle the order items
    handleOrderItems();

    router.push("/orders?status=success&message=Order placed successfully");
    localStorage.removeItem("orderId");
    localStorage.removeItem("selectedProducts");
    sessionStorage.removeItem("selectedProducts");
    //localStorage.removeItem("cart");
    sessionStorage.removeItem("cartItems");
    sessionStorage.removeItem("paymentMethod");
    sessionStorage.removeItem("savedTotalPrice");
    sessionStorage.removeItem("savedTotalWithDelivery");
    cart.forEach((item) => {
     dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { ...item, qty: 0 },
     });
    });
   } catch (error: unknown) {
    if (error instanceof AxiosError) {
     toast.error(
      error.response.data?.message || "Error placing cash on delivery order!"
     );
    }
    console.log("Error placing order:", error);
    setIsHasLoading(false);
   }
  }
 };

 const width = useWindowSize();

 useEffect(() => {
  // Retrieve the selected payment method from localStorage on component mount
  const storedPaymentMethod = sessionStorage.getItem("paymentMethod");
  if (storedPaymentMethod) {
   setPaymentMethod(storedPaymentMethod);
  }
 }, []);

 const handlePaymentMethodChange = ({
  target: { name },
 }: ChangeEvent<HTMLInputElement>) => {
  const newPaymentMethod = paymentMethod === name ? "" : name;
  setPaymentMethod(newPaymentMethod);

  // Save the selected payment method to localStorage
  if (newPaymentMethod) {
   sessionStorage.setItem("paymentMethod", newPaymentMethod);
  } else {
   sessionStorage.removeItem("paymentMethod");
  }
 };

 const handleClick = () => {
  setIsHasPayLoading(true);
  if (isLoggedIn) {
   push("/checkout");
  } else {
   router.push("/login");
  }
 };

 const handleCheckboxChange = (e) => {
  setIsCheckboxChecked(e.target.checked);
 };

 return (
  <Fragment>
   <FlexBox>
    <Card1
     mb="2rem"
     display="flex"
     flexDirection="column" // Default direction
     marginRight="2px"
     width="100%"
     style={{
      gap: "20px",
      background: "#FFFFFF",
      boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.09)",
     }}
    >
     <div
      style={{
       display: "flex",
       flexWrap: "wrap",
       gap: "10px", // Adds consistent spacing between elements
      }}
     >
      {/* Cash on Delivery */}
      {!hasAbroadProduct && (
       <PaymentCheckBox
        mb="1.5rem"
        color="secondary"
        name="1"
        onChange={handlePaymentMethodChange}
        checked={paymentMethod === "1"}
        label={
         <div
          style={{
           width: "100px",
           height: "120px",
           boxShadow:
            paymentMethod === "1"
             ? "0 0 0 2px #E94560, 0px 4px 8px rgba(233, 69, 96, 0.2)"
             : "0 0 1px 1px rgba(0, 0, 0, 0.1)",
           display: "flex",
           flexDirection: "column",
           alignItems: "center",
           justifyContent: "center",
           padding: "8px",
           background:
            paymentMethod === "1" ? "rgba(233, 69, 96, 0.05)" : "white",
           transition: "all 0.3s ease",
           boxSizing: "border-box",
           borderRadius: "8px",
           border:
            paymentMethod === "1"
             ? "1px solid #E94560"
             : "1px solid transparent",
           position: "relative",
          }}
         >
          {/* More visible check indicator */}
          {paymentMethod === "1" && (
           <div
            style={{
             position: "absolute",
             top: "4px",
             right: "4px",
             width: "18px",
             height: "18px",
             backgroundColor: "#E94560",
             borderRadius: "50%",
             display: "flex",
             alignItems: "center",
             justifyContent: "center",
            }}
           >
            <svg
             width="10"
             height="8"
             viewBox="0 0 10 8"
             fill="none"
             style={{
              marginLeft: "1px", // slight visual adjustment
             }}
            >
             <path
              d="M1 4L3.5 6.5L9 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
             />
            </svg>
           </div>
          )}

          <PaymentImage
           alt="Cash on Delivery"
           src={cashOnDeliveryImage}
           style={{
            width: "60px",
            height: "60px",
            marginBottom: "8px",
            filter: paymentMethod === "1" ? "none" : "grayscale(20%)",
            opacity: paymentMethod === "1" ? 1 : 0.8,
           }}
           priority
          />
          <span
           style={{
            fontSize: "14px",
            fontWeight: "600",
            textAlign: "center",
            color: paymentMethod === "1" ? "#E94560" : "#333",
           }}
          >
           Cash on Delivery
          </span>
         </div>
        }
       />
      )}

      {/* Buy with credit */}
      <PaymentCheckBox
       mb="1.5rem"
       color="secondary"
       name="4"
       onChange={handlePaymentMethodChange}
       checked={paymentMethod === "4"}
       label={
        <div
         style={{
          width: "100px",
          height: "120px",
          boxShadow:
           paymentMethod === "4"
            ? "0 0 0 2px #E94560, 0px 4px 8px rgba(233, 69, 96, 0.2)"
            : "0 0 1px 1px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px",
          background:
           paymentMethod === "4" ? "rgba(233, 69, 96, 0.05)" : "white",
          transition: "all 0.3s ease",
          boxSizing: "border-box",
          borderRadius: "8px",
          border:
           paymentMethod === "4"
            ? "1px solid #E94560"
            : "1px solid transparent",
          position: "relative",
         }}
        >
         {/* Check indicator */}
         {paymentMethod === "4" && (
          <div
           style={{
            position: "absolute",
            top: "4px",
            right: "4px",
            width: "18px",
            height: "18px",
            backgroundColor: "#E94560",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
           }}
          >
           <svg
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            style={{ marginLeft: "1px" }}
           >
            <path
             d="M1 4L3.5 6.5L9 1"
             stroke="white"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
            />
           </svg>
          </div>
         )}

         <PaymentImage
          alt="Buy with credit"
          src={bayWithCredit}
          style={{
           width: "60px",
           height: "60px",
           marginBottom: "8px",
           filter: paymentMethod === "4" ? "none" : "grayscale(20%)",
           opacity: paymentMethod === "4" ? 1 : 0.8,
          }}
          priority
         />
         <span
          style={{
           fontSize: "14px",
           fontWeight: "600",
           textAlign: "center",
           color: paymentMethod === "4" ? "#E94560" : "#333",
          }}
         >
          Buy with credit
         </span>
        </div>
       }
      />

      {/* Online Payment */}
      <PaymentCheckBox
       mb="1.5rem"
       color="secondary"
       name="2"
       //  onChange={handlePaymentMethodChange}
       checked={paymentMethod === "2"}
       label={
        <div
         style={{
          width: "100px",
          height: "120px",
          boxShadow:
           paymentMethod === "2"
            ? "0 0 0 2px #E94560, 0px 4px 8px rgba(233, 69, 96, 0.2)"
            : "0 0 1px 1px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px",
          background: "rgba(0, 0, 0, 0.5)", // Disabled background
          pointerEvents: "none", // Disable interactions
          // background:
          //  paymentMethod === "2"
          //   ? "rgba(233, 69, 96, 0.05)"
          //   : "white",
          transition: "all 0.3s ease",
          boxSizing: "border-box",
          borderRadius: "8px",
          border:
           paymentMethod === "2"
            ? "1px solid #E94560"
            : "1px solid transparent",
          position: "relative",
         }}
        >
         {/* Check indicator */}
         {paymentMethod === "2" && (
          <div
           style={{
            position: "absolute",
            top: "4px",
            right: "4px",
            width: "18px",
            height: "18px",
            backgroundColor: "#E94560",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
           }}
          >
           <svg
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            style={{ marginLeft: "1px" }}
           >
            <path
             d="M1 4L3.5 6.5L9 1"
             stroke="white"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
            />
           </svg>
          </div>
         )}

         <PaymentImage
          alt="2"
          src={onlinePayment}
          style={{
           width: "60px",
           height: "60px",
           marginBottom: "8px",
           filter: "grayscale(100%) opacity(50%)",
          }}
          priority
         />
         <span
          style={{
           fontSize: "14px",
           fontWeight: "600",
           textAlign: "center",
           color: paymentMethod === "2" ? "#E94560" : "#333",
          }}
         >
          Online Payment
         </span>
        </div>
       }
      />

      {/* Disabled Payment Options (Nagad) */}
      <div
       style={{
        width: "100px", // Ensures equal width for all items
        height: "120px",
        // border: "1px solid rgba(0, 0, 0, 0.5)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px",
        background: "rgba(0, 0, 0, 0.5)", // Disabled background
        pointerEvents: "none", // Disable interactions
        boxSizing: "border-box", // Include padding in size
        borderRadius: "4px",
       }}
      >
       <PaymentImage
        alt="Nagad Payment"
        src={NagadImage}
        style={{
         width: "60px",
         height: "60px",
         marginBottom: "8px",
         filter: "grayscale(100%) opacity(50%)",
        }}
        priority
       />
       <span
        style={{
         fontSize: "14px",
         fontWeight: "600",
         textAlign: "center",
         color: "rgba(0, 0, 0, 0.7)", // Matches disabled state
        }}
       >
        Nagad
       </span>
      </div>

      {/* Disabled Payment Options (Bkash) */}
      <div
       style={{
        width: "100px", // Ensures equal width for all items
        height: "120px",
        // border: "1px solid rgba(0, 0, 0, 0.5)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px",
        background: "rgba(0, 0, 0, 0.5)", // Disabled background
        pointerEvents: "none", // Disable interactions
        boxSizing: "border-box", // Include padding in size
        borderRadius: "4px",
       }}
      >
       <PaymentImage
        alt="Bkash Payment"
        src={BkashImage}
        style={{
         width: "60px",
         height: "60px",
         marginBottom: "8px",
         filter: "grayscale(100%) opacity(50%)",
        }}
        priority
       />
       <span
        style={{
         fontSize: "14px",
         fontWeight: "600",
         textAlign: "center",
         color: "rgba(0, 0, 0, 0.7)", // Matches disabled state
        }}
       >
        Bkash
       </span>
      </div>
     </div>
    </Card1>
   </FlexBox>
   <div style={{ marginBottom: "20px" }}>
    <CheckBox
     name="agreement"
     color="secondary"
     label={
      <FlexBox
       flexWrap="wrap"
       alignItems="center"
       style={{
        fontSize: "11px",
        lineHeight: "1.4",
       }}
      >
       <SemiSpan>By proceeding to checkout, you agree to our</SemiSpan>
       <Box display="inline-flex" flexWrap="wrap">
        <a
         href="/terms-and-conditions"
         target="_blank"
         rel="noreferrer noopener"
         style={{ whiteSpace: "nowrap" }}
        >
         <H6
          ml="0.5rem"
          borderBottom="1px solid"
          borderColor="gray.900"
          fontSize="11px"
          display="inline"
         >
          Terms & Conditions,
         </H6>
        </a>
        <a
         href="/return-and-refund-policy"
         target="_blank"
         rel="noreferrer noopener"
         style={{ whiteSpace: "nowrap" }}
        >
         <H6
          ml="0.5rem"
          borderBottom="1px solid"
          borderColor="gray.900"
          fontSize="11px"
          display="inline"
         >
          Return & Refund Policy,
         </H6>
        </a>
        <a
         href="/privacy-policy"
         target="_blank"
         rel="noreferrer noopener"
         style={{ whiteSpace: "nowrap" }}
        >
         <H6
          ml="0.5rem"
          borderBottom="1px solid"
          borderColor="gray.900"
          fontSize="11px"
          display="inline"
         >
          Privacy Policy
         </H6>
        </a>
       </Box>
      </FlexBox>
     }
     onChange={handleCheckboxChange}
     required
    />
   </div>

   <Grid container spacing={7}>
    <Grid item sm={6} xs={12}>
     <Button
      color="primary"
      bg="primary.light"
      type="button"
      fullwidth
      onClick={handleClick}
     >
      {isHasPayLoading ? (
       <BeatLoader size={18} color="#E94560" />
      ) : (
       "Back to Checkout Details"
      )}
     </Button>
    </Grid>

    <Grid item sm={6} xs={12}>
     <Button
      onClick={orderSubmit}
      style={{
       color:
        isSubtotalZero || !paymentMethod || !isCheckboxChecked
         ? "#999999"
         : "#ffe1e6",
       backgroundColor:
        isSubtotalZero || !paymentMethod || !isCheckboxChecked
         ? "#cccccc"
         : "#e94560",
       cursor:
        isSubtotalZero || !paymentMethod || !isCheckboxChecked // Disable button if checkbox is unchecked
         ? "not-allowed"
         : "pointer",
      }}
      type="button"
      fullwidth
      disabled={
       isSubtotalZero || !paymentMethod || !isCheckboxChecked // Disable button if checkbox is unchecked
      }
     >
      {isHasLoading ? <BeatLoader size={18} color="white" /> : "Proceed to Pay"}
     </Button>
    </Grid>
   </Grid>
  </Fragment>
 );
}
