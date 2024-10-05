"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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



export default function PaymentForm() {
  
    let authtoken = localStorage.getItem('token');

  // `Bearer 1322|IQr8fvJUuNUnUZVuzWBsw1tVLsdR1U2Rp43YeNKL4b96967a`

 const orderSubmit = ()=>{

  let getData = localStorage.getItem('userInfo');
  let userinfo = JSON.parse(getData);

  // user shipping

  let shippingData = sessionStorage.getItem('address');
  let userShippingdata = JSON.parse(shippingData);


  // Cart Data 
  let cartData = localStorage.getItem('cart');
  let cart = JSON.parse(cartData);

  axios.post('https://tizaraa.com/api/checkout/order',
    {
      user_id: userinfo.id,
      name: userShippingdata.shipping_name,
      phone: userShippingdata.shipping_contact,
      email: userinfo.email,
      province_id: userShippingdata.shipping_province,
      city_id: userShippingdata.shipping_city,
      area_id: userShippingdata.shipping_area,
      house_level: userShippingdata.selectedLandmark,
      address: userShippingdata.shipping_address1,
      delivery_charge: 60,
      total_ammount: 600,
    },
    {
      headers: {
        Authorization: `Bearer ${authtoken}`
      }
    }
  )
  .then(function (response) {

    let Ordersid = response.data.message.orderid
     localStorage.setItem('orderId',Ordersid)

       localStorage.setItem('orderSuccess', 'true');

     let status = 500
    
  })
  .catch(function (error) {
    console.log(error);
  });


  let orderId = localStorage.getItem('orderId');

  if(orderId != null){
    
    console.log(cart)

    cart.map(cartdata=>{

      // cart.productId
      // cart.qty
      // cart.price
      // cart.id

      console.log(cart.qty)
      
  axios.post('https://tizaraa.com/api/checkout/order/items',
    {

      delivery_charge: 60,
      user_id: userinfo.id,
      seller_id: cartdata.sellerId,
      order_id: orderId,
      product_id: cartdata.productId,
      color: 'black' ,
      size: '1',
      qty: cartdata.qty,
      note1: 'lorem10',
      single_ammount: cartdata.price,

    },
    {
      headers: {
        Authorization: `Bearer ${authtoken}`
      }
    }
  )
  .then(function (response) {

   console.log(response.data)

  //  window.location.href="http://localhost:3000/orders"
  router.push("/orders");

    
  })
  .catch(function (error) {
    console.log(error);
  });

    })

  }

 }



  const router = useRouter();
  const width = useWindowSize();
  // const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const isMobile = width < 769;

  const handleFormSubmit = async (values: any) => {
    console.log(values);
    router.push("/payment");
  };

  const handlePaymentMethodChange = ({ target: { name } }: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(name);
  };


  return (
    <Fragment>
      <Card1 mb="2rem">
        {/* <Radio
          mb="1.5rem"
          color="secondary"
          name="credit-card"
          onChange={handlePaymentMethodChange}
          checked={paymentMethod === "credit-card"}
          label={
            <Typography ml="6px" fontWeight="600" fontSize="18px">
              Pay with credit card
            </Typography>
          }
        />

        <Divider mb="1.25rem" mx="-2rem" />

        {paymentMethod === "credit-card" && (
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}>
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Box mb="1.5rem">
                  <Grid container horizontal_spacing={6} vertical_spacing={4}>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullwidth
                        name="card_no"
                        label="Card Number"
                        onBlur={handleBlur}
                        value={values.card_no}
                        onChange={handleChange}
                        errorText={touched.card_no && errors.card_no}
                      />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullwidth
                        name="exp_date"
                        label="Exp Date"
                        placeholder="MM/YY"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.exp_date}
                        errorText={touched.exp_date && errors.exp_date}
                      />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullwidth
                        name="name"
                        onBlur={handleBlur}
                        value={values.name}
                        label="Name on Card"
                        onChange={handleChange}
                        errorText={touched.name && errors.name}
                      />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullwidth
                        name="name"
                        onBlur={handleBlur}
                        value={values.name}
                        label="Name on Card"
                        onChange={handleChange}
                        errorText={touched.name && errors.name}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Button variant="outlined" color="primary" mb="30px">
                  Submit
                </Button>

                <Divider mb="1.5rem" mx="-2rem" />
              </form>
            )}
          </Formik>
        )}

        <Radio
          mb="1.5rem"
          name="paypal"
          color="secondary"
          onChange={handlePaymentMethodChange}
          checked={paymentMethod === "paypal"}
          label={
            <Typography ml="6px" fontWeight="600" fontSize="18px">
              Pay with Paypal
            </Typography>
          }
        />
        <Divider mb="1.5rem" mx="-2rem" />

        {paymentMethod === "paypal" && (
          <Fragment>
            <FlexBox alignItems="flex-end" mb="30px">
              <TextField
                fullwidth
                name="email"
                type="email"
                label="Paypal Email"
                mr={isMobile ? "1rem" : "30px"}
              />
              <Button variant="outlined" color="primary" type="button">
                Submit
              </Button>
            </FlexBox>

            <Divider mb="1.5rem" mx="-2rem" />
          </Fragment>
        )} */}
        <CheckBox
         mb="1.5rem"
         color="secondary"
         name="cod"
         onChange={handlePaymentMethodChange}
         checked={paymentMethod === "cod"}
         label={
           <Typography ml="6px" fontWeight="600" fontSize="18px">
             Cash on Delivery
           </Typography>
         }>
          
        </CheckBox>

{/* <Radio
          mb="1.5rem"
          color="secondary"
          name="cod"
          onChange={handlePaymentMethodChange}
          checked={paymentMethod === "cod"}
          label={
            <Typography ml="6px" fontWeight="600" fontSize="18px">
              Cash on Delivery
            </Typography>
          }
        /> */}
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
   
            {/* <Button onClick={orderSubmit} variant="contained" color="primary" type="submit" fullwidth>
              Review
            </Button> */}

           
            <Button onClick={orderSubmit} variant="outlined" color="primary" type="button" fullwidth>
              Review
            </Button>
        
   
        </Grid>
      </Grid>
    </Fragment>
  );
}

const initialValues = {
  // card_no: "",
  // name: "",
  // exp_date: "",
  // cvc: "",
  // shipping_zip: "",
  // shipping_country: "",
  // shipping_address1: "",
  // shipping_address2: "",

  // billing_name: "",
  // billing_email: "",
  // billing_contact: "",
  // billing_company: "",
  // billing_zip: "",
  // billing_country: "",
  // billing_address1: "",
  // billing_address2: "",
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
  cvc: yup.string().required("required")
  // shipping_zip: yup.string().required("required"),
  // shipping_country: yup.object().required("required"),
  // shipping_address1: yup.string().required("required"),
  // billing_name: yup.string().required("required"),
  // billing_email: yup.string().required("required"),
  // billing_contact: yup.string().required("required"),
  // billing_zip: yup.string().required("required"),
  // billing_country: yup.string().required("required"),
  // billing_address1: yup.string().required("required"),
});
