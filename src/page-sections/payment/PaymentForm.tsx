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
import axios from "@lib/axiosClient";
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
import tz from "../../theme/tizaraa";
import { currency } from "@utils/utils";
import { PayShell } from "./payStyles";

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

 const isFreeShipping = sessionStorage.getItem("isFreeShipping") === "1";
 const savedShipping = isFreeShipping
  ? 0
  : parseFloat(sessionStorage.getItem("savedTotalWithDelivery") || "0");

 const hasAbroadProduct = state.cart.every(
  (product) => product.productType === "Abroad"
 );
 const totalFromNewTotal = hasAbroadProduct
  ? parseFloat(sessionStorage.getItem("savedTotalPrice") || "0")
  : parseFloat(sessionStorage.getItem("newTotal") || "0");

 const totalAmount = totalFromNewTotal - savedShipping;
 const isSubtotalZero = totalAmount === 0;

 const router = useRouter();

 const clearSessionState = (cartItems: any[]) => {
  [
   "selectedProducts", "address", "paymentMethod", "savedTotalPrice",
   "savedTotalWithDelivery", "promoCode", "discount", "isFreeShipping",
   "newTotal", "cartItems", "expressDelivery", "selectedPaymentOption",
  ].forEach((k) => sessionStorage.removeItem(k));
  localStorage.removeItem("orderId");
  localStorage.removeItem("selectedProducts");
  cartItems.forEach((item: any) => {
   dispatch({ type: "CHANGE_CART_AMOUNT", payload: { ...item, qty: 0 } });
  });
 };

 const orderSubmit = async () => {
  setIsHasLoading(true);

  const addressData = JSON.parse(sessionStorage.getItem("address") || "null");
  const addressId = addressData?.id;

  if (!addressId) {
   toast.error("Please select a delivery address.");
   setIsHasLoading(false);
   return;
  }

  const selectedItems = JSON.parse(
   sessionStorage.getItem("selectedProducts") || "[]"
  );

  if (selectedItems.length === 0) {
   toast.error("Your cart is empty. Please add items before proceeding.");
   setIsHasLoading(false);
   return;
  }

  const promoCode = sessionStorage.getItem("promoCode");
  const promoPrice = parseFloat(sessionStorage.getItem("discount") || "0");

  try {
   // Sync selected items to Redis cart for atomic engine checkout
   await axios.delete("cart/clear");
   await Promise.all(
    selectedItems.map((item: any) =>
     axios.post("cart/add", {
      product_id: Number(item.productId),
      quantity: Number(item.qty),
      variant_id: item.variantId ? Number(item.variantId) : null,
     })
    )
   );

   const gateway = paymentMethod === "cod" ? "cod" : "sslcommerz";

   const orderRes = await axios.post("checkout/order", {
    address_id: addressId,
    payment_method: gateway,
    promo_code: promoPrice > 0 || isFreeShipping ? promoCode : null,
   });

   const orders: any[] = orderRes.data?.data?.orders ?? [];

   clearSessionState(selectedItems);

   if (paymentMethod === "cod") {
    router.push("/orders?status=success&message=Order placed successfully");
    return;
   }

   // Online payment: initiate SSLCommerz gateway
   if (orders.length === 0) throw new Error("No orders created.");
   const orderId = orders[0].order_id;

   const payRes = await axios.post("pay-via-ajax", {
    order_id: orderId,
    gateway: "sslcommerz",
   });

   const redirectUrl = payRes.data?.redirect_url;
   if (redirectUrl) {
    window.location.href = redirectUrl;
   } else {
    toast.error("Payment initiation failed. No redirect URL received.");
    setIsHasLoading(false);
   }
  } catch (err: any) {
   const msg =
    err?.response?.data?.message || "Error placing order. Please try again.";
   toast.error(msg);
   if (!isLoggedIn) router.push("/login");
   setIsHasLoading(false);
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

 const methods = [
  ...(!hasAbroadProduct
   ? [{ key: "cod", title: "Cash on Delivery", desc: "Pay in cash when your order arrives.", img: cashOnDeliveryImage, soon: false }]
   : []),
  { key: "Online Payment", title: "Online Payment", desc: "Card, mobile banking or net banking via SSLCommerz.", img: onlinePayment, soon: false },
  { key: "nagad", title: "Nagad", desc: "Pay with your Nagad wallet.", img: NagadImage, soon: true },
  { key: "bkash", title: "bKash", desc: "Pay with your bKash wallet.", img: BkashImage, soon: true },
 ];
 const amountText = totalFromNewTotal > 0 ? currency(totalFromNewTotal) : "";
 const missing = !paymentMethod
  ? "Choose a payment method to continue"
  : !isCheckboxChecked
  ? "Accept the terms to continue"
  : isSubtotalZero
  ? "Your order total is empty"
  : "";
 const canPay = !isSubtotalZero && !!paymentMethod && isCheckboxChecked;

 return (
  <PayShell>
   <section className="py-card" aria-label="Payment method">
    <h3 className="py-title">
     <span className="py-title-icon" aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
       <rect x="2" y="5" width="20" height="14" rx="2" />
       <path d="M2 10h20" />
      </svg>
     </span>
     Choose payment method
    </h3>

    <div className="py-list" role="radiogroup" aria-label="Payment method">
     {methods.map((m, i) => {
      const on = paymentMethod === m.key;
      return (
       <div key={m.key} className="py-opt-wrap" style={{ ["--i" as any]: i }}>
        <button
         type="button"
         role="radio"
         aria-checked={on}
         aria-disabled={m.soon}
         disabled={m.soon}
         className={`py-opt${on ? " is-on" : ""}${m.soon ? " is-soon" : ""}`}
         onClick={() =>
          handlePaymentMethodChange({ target: { name: m.key } } as unknown as ChangeEvent<HTMLInputElement>)
         }
        >
         <span className="py-logo">
          <PaymentImage alt={m.title} src={m.img} style={{ width: "40px", height: "40px", objectFit: "contain" }} />
         </span>
         <span className="py-text">
          <strong>
           {m.title}
           {m.soon && <em>Coming soon</em>}
          </strong>
          <small>{m.desc}</small>
         </span>
         <span className="py-radio" aria-hidden="true">
          <i />
         </span>
        </button>
        <div className={`py-note${on ? " is-open" : ""}`}>
         <div>
          <p>
           {m.key === "cod"
            ? `Pay ${amountText || "the total"} in cash when your order arrives.`
            : "You'll be taken to a secure payment page to finish."}
          </p>
         </div>
        </div>
       </div>
      );
     })}
    </div>
   </section>

   <label className={`py-agree${isCheckboxChecked ? " is-on" : ""}`}>
    <input type="checkbox" checked={isCheckboxChecked} onChange={handleCheckboxChange} />
    <span className="py-check" aria-hidden="true">
     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
     </svg>
    </span>
    <span>
     I agree to the{" "}
     <Link href="/terms-and-conditions" target="_blank">
      Terms &amp; Conditions
     </Link>
     ,{" "}
     <Link href="/return-and-refund-policy" target="_blank">
      Return &amp; Refund Policy
     </Link>{" "}
     and{" "}
     <Link href="/privacy-policy" target="_blank">
      Privacy Policy
     </Link>
     .
    </span>
   </label>

   <div className="py-actions">
    <button type="button" className="py-btn" onClick={handleClick} disabled={isHasPayLoading}>
     {isHasPayLoading ? (
      <BeatLoader size={10} color={tz.color.emberDeep} />
     ) : (
      <>
       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 12H5M11 18l-6-6 6-6" />
       </svg>
       Back to details
      </>
     )}
    </button>
    <button type="button" className="py-btn py-btn--solid" onClick={orderSubmit} disabled={!canPay || isHasLoading}>
     {isHasLoading ? (
      <BeatLoader size={10} color={tz.color.paper} />
     ) : !paymentMethod ? (
      "Choose a payment method"
     ) : paymentMethod === "cod" ? (
      <>Place order{amountText && ` · ${amountText}`}</>
     ) : (
      <>
       <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
       </svg>
       Pay securely{amountText && ` · ${amountText}`}
      </>
     )}
    </button>
   </div>
   {missing && (
    <p className="py-missing" aria-live="polite">
     {missing}
    </p>
   )}
  </PayShell>
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
