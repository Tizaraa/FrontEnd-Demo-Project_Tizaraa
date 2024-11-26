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
import { useRouter,usePathname, useSearchParams } from "next/navigation";
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
import Typography from "@component/Typography";
import useWindowSize from "@hook/useWindowSize";
import axios from "axios";
import { useAppContext } from "@context/app-context";
import CheckBox from "@component/CheckBox";
import ApiBaseUrl from "api/ApiBaseUrl";
//import { useSearchParams } from "next/navigation";

import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import styles for toast

export default function PaymentForm() {
  const { state, dispatch } = useAppContext();
  //const [redirectUrl, setRedirectUrl] = useState<string>("");
  const [paymentType, setPaymentType] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  //const searchParams = useSearchParams();
  //const { state } = useAppContext();

  const getTotalPrice = () => {
    return (
      state.cart.reduce(
        (accumulator, item) =>
          // accumulator + (item.discountPrice ?? item.price) * item.qty, 0
          accumulator +
          (item.discountPrice ? item.discountPrice : item.price) * item.qty,
        0
      ) || 0
    );
  };

  const total_ammount = getTotalPrice();
  const isSubtotalZero = total_ammount === 0;

  const router = useRouter();

  

  //const router = useRouter();
  //const searchParams = useSearchParams();

  

  let authtoken = localStorage.getItem("token");
  const orderSubmit = async () => {
    if (isSubtotalZero) {
      toast.error("Your cart is empty. Please add items before proceeding.");
      return; // Prevent form submission
    }
    // if (redirectUrl) {
    //   window.location.href = redirectUrl; // Redirect to the stored URL
    // } else {
    //   toast.error("No redirect URL available for payment.");
    // }
    let getData = localStorage.getItem("userInfo");
    let userinfo = JSON.parse(getData);
    console.log("nazim", userinfo);

    let shippingData = sessionStorage.getItem("address");
    console.log("Session Storage Data:", shippingData);
    let userShippingdata = JSON.parse(shippingData);
    console.log("nazim Data:", userShippingdata);

    // let cartData = localStorage.getItem('cart');
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    console.log("nazim Data:", cartData);

    // Ensure cartData is valid and not empty before trying to access its items
    const productType =
      cartData.length > 0 ? cartData[0]?.productType : "General";

    let cart = cartData;

    console.log("Cart Items:", cart);
    console.log("Product Type:", productType);
    console.log("Selected payment method:", paymentMethod);
    if (paymentMethod === "mb") {
      // const authtoken = localStorage.getItem("token");
      // const getData = localStorage.getItem("userInfo");
      // const userinfo = JSON.parse(getData || "{}");

      // const shippingData = sessionStorage.getItem("address");
      // const userShippingdata = JSON.parse(shippingData || "{}");

      // const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
      // const productType = cartData.length > 0 ? cartData[0]?.productType : "General";

      // let cart = cartData;

      try {
        const response = await axios.post(
          "https://frontend.tizaraa.com/api/pay-via-ajax",
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
            delivery_charge: userShippingdata?.deliveryCharge || 0,
            cus_add1:
              userShippingdata?.shipping_address1 || userShippingdata?.address,
            currency: "BDT",
            total_amount:
              Number(total_ammount) + Number(userShippingdata?.deliveryCharge),
            productType: productType,
            payment_type: "mb",
            payment_method: "mb",
          },
          {
            headers: {
              Authorization: `Bearer ${authtoken}`,
            },
          }
        );
        console.log("online Response:", response);

        let orderId = response.data?.orderid;
        console.log("id", orderId);
        console.log("Selected payment method:", paymentMethod);
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
                `${ApiBaseUrl.baseUrl}checkout/order/items`,
                {
                  delivery_charge: 60,
                  user_id: userinfo.id,
                  seller_id: cartdata.sellerId,
                  order_id: orderId,
                  product_id: cartdata.productId,
                  color: color,
                  size: cartdata.attributes,
                  qty: cartdata.qty,
                  note1: "lorem10",
                  single_ammount: cartdata.price,
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
            }
          })
        );

        //router.push("/orders");
        localStorage.removeItem("orderId");
        localStorage.removeItem("cart");
        cart.forEach((item) => {
          dispatch({
            type: "CHANGE_CART_AMOUNT",
            payload: { ...item, qty: 0 },
          });
        });

        const redirectUrl = response.data?.redirect_url;
        console.log(redirectUrl);
        
        if (redirectUrl) {
          window.location.href = redirectUrl;
          const searchParams = useSearchParams();
          useEffect(() => {
            const message = searchParams.get("message"); // Get the "message" parameter
            const status = searchParams.get("status"); // Get the "status" parameter
        
            if (status === "success" && message) {
              toast.success(message); // Show success message
            } else if (status === "error" && message) {
              toast.error(message); // Show error message
            }
          }, [searchParams]);
        } else {
          toast.error("Payment initiation failed. No redirect URL received.");
        }
      } catch (error) {
        console.error("Online Payment Error:", error);
        toast.error("Error initiating online payment payment!");
      }
    } else if(paymentMethod === "cod") {
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
            delivery_charge: userShippingdata?.deliveryCharge || 0,
            total_ammount: total_ammount,
            payment_type: 1,
            seller_id: cartData[0]?.sellerId,
            // payment_method: "cod",
            // productType: productType,
          },

          {
            headers: {
              Authorization: `Bearer ${authtoken}`,
            },
          }
        );

        console.log("Order Response:", orderResponse);

        let orderId = orderResponse.data.message.orderid;
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
                `${ApiBaseUrl.baseUrl}checkout/order/items`,
                {
                  delivery_charge: 60,
                  user_id: userinfo.id,
                  seller_id: cartdata.sellerId,
                  order_id: orderId,
                  product_id: cartdata.productId,
                  color: color,
                  size: cartdata.attributes,
                  qty: cartdata.qty,
                  note1: "lorem10",
                  single_ammount: cartdata.price,
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
            }
          })
        );

        router.push("/orders");
        localStorage.removeItem("orderId");
        localStorage.removeItem("cart");
        cart.forEach((item) => {
          dispatch({
            type: "CHANGE_CART_AMOUNT",
            payload: { ...item, qty: 0 },
          });
        });
      } catch (error) {
        console.error("Error placing order:", error);
        toast.error("Error placing cash on delivery order!");
        router.push("/payment");
      }
    }
  };

  const width = useWindowSize();

  const isMobile = width < 769;

  const handleFormSubmit = async (values: any) => {
    console.log(values);
    router.push("/payment");
  };
  const handlePaymentMethodChange = async ({
    target: { name },
  }: ChangeEvent<HTMLInputElement>) => {
    // Update the payment method to the selected value
    setPaymentMethod((prevMethod) => (prevMethod === name ? "" : name));
  };

  return (
    <Fragment>
      <Card1 mb="2rem">
        {/* Cash on Delivery */}
        <CheckBox
          mb="1.5rem"
          color="secondary"
          name="cod"
          onChange={handlePaymentMethodChange}
          checked={paymentMethod === "cod"} // Only check if paymentMethod is "cod"
          label={
            <Typography ml="6px" fontWeight="600" fontSize="18px">
              Cash on Delivery
            </Typography>
          }
        />

        {/* Mobile Banking */}
        <CheckBox
          mb="1.5rem"
          color="secondary"
          name="mb"
          onChange={handlePaymentMethodChange}
          checked={paymentMethod === "mb"}
          label={
            <Typography ml="6px" fontWeight="600" fontSize="18px">
              Online Payment
            </Typography>
          }
        />
      </Card1>

      <Grid container spacing={7}>
        <Grid item sm={6} xs={12}>
          <Link href="/checkout">
            <Button variant="outlined" color="primary" type="button" fullwidth>
              Back to checkout details
            </Button>
          </Link>
        </Grid>

        <Grid item sm={6} xs={12}>
          <Button
            onClick={orderSubmit}
            variant="outlined"
            color="primary"
            type="button"
            fullwidth
            disabled={isSubtotalZero || !paymentMethod}
          >
            Payment
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