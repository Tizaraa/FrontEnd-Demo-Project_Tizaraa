// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { ChangeEvent, Fragment, useState } from "react";
// import { Formik } from "formik";
// import * as yup from "yup";

// import Box from "@component/Box";
// import Radio from "@component/radio";
// import Grid from "@component/grid/Grid";
// import { Card1 } from "@component/Card1";
// import FlexBox from "@component/FlexBox";
// import Divider from "@component/Divider";
// import { Button } from "@component/buttons";
// import TextField from "@component/text-field";
// import Typography from "@component/Typography";
// import useWindowSize from "@hook/useWindowSize";
// import axios from "axios";
// import { useAppContext } from "@context/app-context";
// import CheckBox from "@component/CheckBox";
// import ApiBaseUrl from "api/ApiBaseUrl";

// import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
// import "react-toastify/dist/ReactToastify.css"; // Import styles for toast

// export default function PaymentForm() {

//   const { state, dispatch } = useAppContext();
//   //const { state } = useAppContext();

//   const getTotalPrice = () => {
//     return state.cart.reduce((accumulator, item) =>
//       // accumulator + (item.discountPrice ?? item.price) * item.qty, 0
//     accumulator + (item.discountPrice ? item.discountPrice : item.price) * item.qty, 0
//     ) || 0;
//   };

//   const total_ammount = getTotalPrice()
//   const isSubtotalZero = total_ammount === 0;

//   const router = useRouter();

//     let authtoken = localStorage.getItem('token');

//   const orderSubmit = async () => {
//     if (isSubtotalZero) {
//       toast.error("Your cart is empty. Please add items before proceeding.");
//       return;
//     }
//     let getData = localStorage.getItem('userInfo');
//     let userinfo = JSON.parse(getData);

//     let shippingData = sessionStorage.getItem('address');
//     console.log('Session Storage Data:', shippingData);
//     let userShippingdata = JSON.parse(shippingData);

//     let cartData = localStorage.getItem('cart');
//     let cart = JSON.parse(cartData);

//     console.log("Selected payment method:", paymentMethod);
//     try {
//         const orderResponse = await axios.post(
//             `${ApiBaseUrl.baseUrl}checkout/order`,
//             {
//                 user_id: userinfo?.id,
//                 name: userShippingdata?.shipping_name || userShippingdata?.name,
//                 phone: userShippingdata?.shipping_contact || userShippingdata?.phone,
//                 email: userinfo?.email,
//                 province_id: userShippingdata?.shipping_province || userShippingdata?.province_id,
//                 city_id: userShippingdata?.shipping_city || userShippingdata?.city_id,
//                 area_id: userShippingdata?.shipping_area || userShippingdata?.area_id,
//                 house_level: userShippingdata?.selectedLandmark || userShippingdata?.landmark,
//                 address: userShippingdata?.shipping_address1 || userShippingdata?.address,
//                 delivery_charge: userShippingdata?.deliveryCharge || 0,
//                 total_ammount: total_ammount,
//                 payment_type: 1,
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${authtoken}`,
//                 },
//             }
//         );

//         console.log("Order Response:", orderResponse);

//         let orderId = orderResponse.data.message.orderid;
//         localStorage.setItem('orderId', orderId);
//         localStorage.setItem('orderSuccess', 'true');

//         await Promise.all(cart.map(async (cartdata) => {
//             if (!cartdata.productId || !cartdata.sellerId) {
//                 // If product does not have an API, store it in sessionStorage instead
//                 const offlineOrders = JSON.parse(sessionStorage.getItem("offlineOrders") || "[]");
//                 offlineOrders.push({
//                     ...cartdata,
//                     order_id: orderId,
//                     user_id: userinfo.id,
//                 });
//                 sessionStorage.setItem("offlineOrders", JSON.stringify(offlineOrders));
//                 console.log("Product without API saved locally:", cartdata);
//                 return;
//             }

//             let color = cartdata.id;
//             if (/\D--\d+$/.test(cartdata.id)) {
//                 color = cartdata.id.replace(/--\d+$/, "");
//             } else if ((cartdata.id)) {
//                 color = "";
//             }

//             // Place order items for products with API
//             const response = await axios.post(
//                 `${ApiBaseUrl.baseUrl}checkout/order/items`,
//                 {
//                     delivery_charge: 60,
//                     user_id: userinfo.id,
//                     seller_id: cartdata.sellerId,
//                     order_id: orderId,
//                     product_id: cartdata.productId,
//                     color: color,
//                     size: '1',
//                     qty: cartdata.qty,
//                     note1: 'lorem10',
//                     single_ammount: cartdata.price,
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${authtoken}`,
//                         'Content-Type': 'application/json'
//                     },
//                 }
//             );
//             console.log("Cart Item Response:", response.data);
//         }));

//         sessionStorage.removeItem("offlineOrders");

//         router.push("/orders");
//         localStorage.removeItem('orderId');
//         localStorage.removeItem('cart');
//         cart.forEach(item => {
//             dispatch({
//                 type: "CHANGE_CART_AMOUNT",
//                 payload: { ...item, qty: 0 }
//             });
//         });

//     } catch (error) {
//         console.error("Error placing order:", error);
//         toast.error("Error placing order!");
//         router.push("/payment");
//     }
// };

//   const width = useWindowSize();
//   const [paymentMethod, setPaymentMethod] = useState<string>("");

//   const isMobile = width < 769;

//   const handleFormSubmit = async (values: any) => {
//     console.log(values);
//     router.push("/payment");
//   };
//   const handlePaymentMethodChange = ({ target: { name } }: ChangeEvent<HTMLInputElement>) => {
//     // Update the payment method to the selected value
//     setPaymentMethod(prevMethod => (prevMethod === name ? "" : name));
//   };

//   return (
//     <Fragment>
//       <Card1 mb="2rem">

//       {/* Cash on Delivery */}
//       <CheckBox
//         mb="1.5rem"
//         color="secondary"
//         name="cod"
//         onChange={handlePaymentMethodChange}
//         checked={paymentMethod === "cod"} // Only check if paymentMethod is "cod"
//         label={
//           <Typography ml="6px" fontWeight="600" fontSize="18px">
//             Cash on Delivery
//           </Typography>
//         }
//       />

//       {/* Mobile Banking */}
//       <CheckBox
//         mb="1.5rem"
//         color="secondary"
//         name="mb"
//         onChange={handlePaymentMethodChange}
//         checked={paymentMethod === "mb"} // Only check if paymentMethod is "mb"
//         label={
//           <Typography ml="6px" fontWeight="600" fontSize="18px">
//             Online Payment
//           </Typography>
//         }
//       />

//       </Card1>

//       <Grid container spacing={7}>
//         <Grid item sm={6} xs={12}>
//           <Link href="/checkout">
//             <Button variant="outlined" color="primary" type="button" fullwidth>
//               Back to checkout details
//             </Button>
//           </Link>
//         </Grid>

//         <Grid item sm={6} xs={12}>

//              <Button
//             onClick={orderSubmit}
//             variant="outlined"
//             color="primary"
//             type="button"
//             fullwidth
//             disabled={isSubtotalZero || !paymentMethod}
//           >Submit</Button>
//             {/* <Button onClick={orderSub} variant="outlined" color="primary" type="button" fullwidth>
//              Paymentclick
//             </Button> */}

//         </Grid>
//       </Grid>
//     </Fragment>
//   );
// }

// const initialValues = {

//   paymentMethod: "",
//   shipping_name: "",
//   shipping_contact: "",
//   shipping_address1: "",
//   shipping_province: "",
//   shipping_city: "",
//   shipping_area: "",
//   selectedLandmark: null,

// };

// const checkoutSchema = yup.object().shape({
//   card_no: yup.string().required("required"),
//   name: yup.string().required("required"),
//   exp_date: yup.string().required("required"),
//   cvc: yup.string().required("required")

// });

// new for otc
"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChangeEvent, Fragment, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

import Box from "@component/Box";
import Radio from "@component/radio";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import FlexBox from "@component/FlexBox";
import Divider from "@component/Divider";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import Typography, { H6, SemiSpan } from "@component/Typography";
import useWindowSize from "@hook/useWindowSize";
import axios from "axios";
import { useAppContext } from "@context/app-context";
import CheckBox from "@component/CheckBox";
import ApiBaseUrl from "api/ApiBaseUrl";
//import { useSearchParams } from "next/navigation";

import toast, { Toaster } from "react-hot-toast"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import styles for toast
import PaymentCheckBox from "@component/PaymentCheckBox";
import PaymentImage from "@component/PaymentImage";

import cashOnDeliveryImage from "../../../public/assets/images/payment/cashOnDelivery.jpg";
import onlinePayment from "../../../public/assets/images/payment/Mobile_Banking.jpg";
import NagadImage from "../../../public/assets/images/payment/Nagad.avif";
import BkashImage from "../../../public/assets/images/payment/Bkash.png";
import BeatLoader from "react-spinners/BeatLoader";
import authService from "services/authService";

export default function PaymentForm() {
  const { push } = useRouter();
  const { state, dispatch } = useAppContext();
  //const [redirectUrl, setRedirectUrl] = useState<string>("");
  const [paymentType, setPaymentType] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isHasLoading, setIsHasLoading] = useState(false);
  const [isHasPayLoading, setIsHasPayLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  useEffect(() => {
    setIsLoggedIn(authService.isAuthenticated());
  }, []);
  const getTotalPrice = () => {
    return state.cart.reduce((accumulator, item) => {
      if (state.selectedProducts.includes(item.id)) {
        return (
          accumulator +
          (item.discountPrice ? item.discountPrice : item.price) * item.qty
        );
      }
      return accumulator;
    }, 0);
  };
  // const total = parseFloat(sessionStorage.getItem("savedTotalPrice") || "0");
  const savedShipping = parseFloat(
    sessionStorage.getItem("savedTotalWithDelivery") || "0"
  );
  // const total_ammount = total;
  // const isSubtotalZero = total_ammount === 0;

  // Check if all products are abroad
  const hasAbroadProduct = state.cart.every(
    (product) => product.productType === "Abroad"
  );

  // For abroad products, use savedTotalPrice instead of newTotal
  const totalFromNewTotal = hasAbroadProduct
    ? parseFloat(sessionStorage.getItem("savedTotalPrice") || "0")
    : parseFloat(sessionStorage.getItem("newTotal") || "0");

  const savedTotalPrice = parseFloat(sessionStorage.getItem("savedTotalPrice") || "0");



  const total_ammount = totalFromNewTotal - savedShipping;
  const isSubtotalZero = total_ammount === 0;

  // promocode & promocode_price get from session storage
  const promocode = sessionStorage.getItem("promoCode");
  const promocode_price = parseFloat(sessionStorage.getItem("discount"));

  const advance_payment_percent = parseFloat(sessionStorage.getItem("selectedPaymentOption"));

  const router = useRouter();

  let authtoken = localStorage.getItem("token");
  const orderSubmit = async () => {
    setIsHasLoading(true);
    if (isSubtotalZero) {
      toast.error("Your cart is empty. Please add items before proceeding.");
      return;
    }
    let getData = localStorage.getItem("userInfo");
    let userinfo = JSON.parse(getData);

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

    // console.log("Orders:", cart);
    // console.log("Product Type:", productType);
    // console.log("Selected payment method:", paymentMethod);
    if (paymentMethod === "Online Payment") {
      try {
        const response = await axios.post(
          `${ApiBaseUrl.baseUrl}pay-via-ajax`,
          {
            user_id: userinfo?.id,
            seller_id: cartData[0]?.sellerId,
            cus_name: userShippingdata?.shipping_name || userShippingdata?.name,
            cus_email: userinfo?.email,
            cus_phone:
              userShippingdata?.shipping_contact || userShippingdata?.phone,
            province_id:
              userShippingdata?.shipping_province ||
              userShippingdata?.province_id,
            city_id:
              userShippingdata?.shipping_city || userShippingdata?.city_id,
            area_id:
              userShippingdata?.shipping_area || userShippingdata?.area_id,
            house_level:
              userShippingdata?.selectedLandmark || userShippingdata?.landmark,
            delivery_charge: savedShipping || 0,
            cus_add1:
              userShippingdata?.shipping_address1 || userShippingdata?.address,
            currency: "BDT",
            total_amount: total_ammount,
            advance_payment_percent: advance_payment_percent,
            productType: productType,
            payment_type: "Online Payment",
            payment_method: "Online Payment",
          },
          {
            headers: {
              Authorization: `Bearer ${authtoken}`,
            },
          }
        );
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
              const response = await axios.post(
                `${ApiBaseUrl.baseUrl}checkout/order-items`,
                {
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
                },
                {
                  headers: {
                    Authorization: `Bearer ${authtoken}`,
                    "Content-Type": "application/json",
                  },
                }
              );

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
    } else if (paymentMethod === "cod") {
      try {
        const orderResponse = await axios.post(
          `${ApiBaseUrl.baseUrl}checkout/order`,
          {
            user_id: userinfo?.id,
            name: userShippingdata?.shipping_name || userShippingdata?.name,
            phone:
              userShippingdata?.shipping_contact || userShippingdata?.phone,
            email: userinfo?.email,
            province_id:
              userShippingdata?.shipping_province ||
              userShippingdata?.province_id,
            city_id:
              userShippingdata?.shipping_city || userShippingdata?.city_id,
            area_id:
              userShippingdata?.shipping_area || userShippingdata?.area_id,
            house_level:
              userShippingdata?.selectedLandmark || userShippingdata?.landmark,
            address:
              userShippingdata?.shipping_address1 || userShippingdata?.address,
            delivery_charge: savedShipping || 0,
            total_ammount: total_ammount,
            payment_type: 1,
            seller_id: cartData[0]?.sellerId,
            // payment_method: "cod",
            productType: productType,
            promocode: promocode_price > 0 ? promocode : null,
            // promocode_price: promocode_price,
            promocode_price: promocode_price > 0 ? promocode_price : null,
          },

          {
            headers: {
              Authorization: `Bearer ${authtoken}`,
            },
          }
        );

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
                      ? cartdata.sizeColor?.colorwithsize?.[
                          cartdata.selectedColor
                        ]?.find((s) => s.size === cartdata.selectedSize)
                          ?.price ||
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
                  const response = await axios.post(
                    `${ApiBaseUrl.baseUrl}checkout/order-items`,
                    { orders: [order] },
                    {
                      headers: {
                        Authorization: `Bearer ${authtoken}`,
                        "Content-Type": "application/json",
                      },
                    }
                  );

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
      } catch (error) {
        console.error("Error placing order:", error);
        toast.error("Error placing cash on delivery order!");
        if (isLoggedIn) {
          router.push("/payment");
        } else {
          router.push("/login");
        }
        setIsHasLoading(false);
      }
    }
  };

  const width = useWindowSize();

  const isMobile = width < 769;

  const handleFormSubmit = async (values: any) => {
    console.log(values);
    router.push("/payment");
  };
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

  const selectedProducts = JSON.parse(
    sessionStorage.getItem("selectedProducts") || "[]"
  );
  // const hasAbroadProduct = selectedProducts.some(
  //   (product: any) => product.productType === "Abroad"
  // );

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
              name="cod"
              onChange={handlePaymentMethodChange}
              checked={paymentMethod === "cod"}
              label={
                <div
                  style={{
                    width: "100px",
                    height: "120px",
                    boxShadow:
                      paymentMethod === "cod"
                        ? "0 0 0 2px #E94560, 0px 4px 8px rgba(233, 69, 96, 0.2)"
                        : "0 0 1px 1px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "8px",
                    background:
                      paymentMethod === "cod"
                        ? "rgba(233, 69, 96, 0.05)"
                        : "white",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                    borderRadius: "8px",
                    border:
                      paymentMethod === "cod"
                        ? "1px solid #E94560"
                        : "1px solid transparent",
                    position: "relative",
                  }}
                >
                  {/* More visible check indicator */}
                  {paymentMethod === "cod" && (
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
                      filter:
                        paymentMethod === "cod" ? "none" : "grayscale(20%)",
                      opacity: paymentMethod === "cod" ? 1 : 0.8,
                    }}
                    priority
                  />
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      textAlign: "center",
                      color: paymentMethod === "cod" ? "#E94560" : "#333",
                    }}
                  >
                    Cash on Delivery
                  </span>
                </div>
              }
            />
            )}

            {/* Online Payment */}
            <PaymentCheckBox
              mb="1.5rem"
              color="secondary"
              name="Online Payment"
              onChange={handlePaymentMethodChange}
              checked={paymentMethod === "Online Payment"}
              label={
                <div
                  style={{
                    width: "100px",
                    height: "120px",
                    boxShadow:
                      paymentMethod === "Online Payment"
                        ? "0 0 0 2px #E94560, 0px 4px 8px rgba(233, 69, 96, 0.2)"
                        : "0 0 1px 1px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "8px",
                    background:
                      paymentMethod === "Online Payment"
                        ? "rgba(233, 69, 96, 0.05)"
                        : "white",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                    borderRadius: "8px",
                    border:
                      paymentMethod === "Online Payment"
                        ? "1px solid #E94560"
                        : "1px solid transparent",
                    position: "relative",
                  }}
                >
                  {/* Check indicator */}
                  {paymentMethod === "Online Payment" && (
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
                    alt="Online Payment"
                    src={onlinePayment}
                    style={{
                      width: "60px",
                      height: "60px",
                      marginBottom: "8px",
                      filter:
                        paymentMethod === "Online Payment"
                          ? "none"
                          : "grayscale(20%)",
                      opacity: paymentMethod === "Online Payment" ? 1 : 0.8,
                    }}
                    priority
                  />
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      textAlign: "center",
                      color:
                        paymentMethod === "Online Payment" ? "#E94560" : "#333",
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

      {/* <div style={{marginBottom: "20px"}}>
      <CheckBox
              mb="20px"
              name="agreement"
              color="secondary"
              label={
                <FlexBox>
                  <SemiSpan style={{fontSize: "11px"}}>By proceeding to checkout, you agree to our</SemiSpan>
                  <a
                    href="/terms-and-conditions"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <H6
                      ml="0.5rem"
                      borderBottom="1px solid"
                      borderColor="gray.900"
                      fontSize="11px"
                    >
                      Terms & Conditions,
                    </H6>
                  </a>
                  <a
                    href="/return-and-refund-policy"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <H6
                      ml="0.5rem"
                      borderBottom="1px solid"
                      borderColor="gray.900"
                      fontSize="11px"
                    >
                      Return & Refund Policy,
                    </H6>
                  </a>
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <H6
                      ml="0.5rem"
                      borderBottom="1px solid"
                      borderColor="gray.900"
                      fontSize="11px"
                    >
                      Privacy Policy
                    </H6>
                  </a>
                </FlexBox>
              }
              onChange={handleCheckboxChange} // Update checkbox state
              required
            />

      </div> */}

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
            {isHasLoading ? (
              <BeatLoader size={18} color="white" />
            ) : (
              "Proceed to Pay"
            )}
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
}

const initialValues = {
  paymentMethod: "",
  shipping_name: "",
  shipping_contact: "",
  shipping_address1: "",
  shipping_province: "",
  shipping_city: "",
  shipping_area: "",
  selectedLandmark: null,
};

const checkoutSchema = yup.object().shape({
  card_no: yup.string().required("required"),
  name: yup.string().required("required"),
  exp_date: yup.string().required("required"),
  cvc: yup.string().required("required"),
});
