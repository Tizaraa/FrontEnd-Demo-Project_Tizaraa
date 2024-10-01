// "use client";

// import { FC, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import * as yup from "yup";
// import { Formik } from "formik";

// import Select from "@component/Select";
// import Grid from "@component/grid/Grid";
// import { Card1 } from "@component/Card1";
// import CheckBox from "@component/CheckBox";
// import countryList from "@data/countryList";
// import { Button } from "@component/buttons";
// import TextField from "@component/text-field";
// import Typography from "@component/Typography";
// import TextArea from "@component/textarea";

// export default function CheckoutForm() {
//   const router = useRouter();
//   const [sameAsShipping, setSameAsShipping] = useState(false);

//   const handleFormSubmit = async (values: any) => {
//     console.log(values);
//     router.push("/payment");
//   };

//   const handleCheckboxChange =
//     (values: typeof initialValues, setFieldValue: any) =>
//     ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
//       setSameAsShipping(checked);
//       setFieldValue("same_as_shipping", checked);
//       setFieldValue("billing_name", checked ? values.shipping_name : "");
//     };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={checkoutSchema}
//       onSubmit={handleFormSubmit}>
//       {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
//         <form onSubmit={handleSubmit}>
//           <Card1 mb="2rem">
//             <Typography fontWeight="600" mb="1rem">
//               Shipping Address
//             </Typography>

//             <Grid container spacing={7}>
//               <Grid item sm={6} xs={12}>
//                 <TextField
//                   fullwidth
//                   mb="1rem"
//                   label="Full Name"
//                   name="shipping_name"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   value={values.shipping_name}
//                   errorText={touched.shipping_name && errors.shipping_name}
//                 />

                

//                 <TextField
//                   fullwidth
//                   mb="1rem"
//                   label="Phone Number"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   name="shipping_contact"
//                   value={values.shipping_contact}
//                   errorText={touched.shipping_contact && errors.shipping_contact}
//                 />

             

//                 {/* <TextField
//                   fullwidth
//                   label="Address 1"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   name="shipping_address1"
//                   value={values.shipping_address1}
//                   errorText={touched.shipping_address1 && errors.shipping_address1}
//                 /> */}

//                 {/* address  */}
//                 <TextArea
//                   fullwidth
//                   label="Address 1"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   name="shipping_address1"
//                   value={values.shipping_address1}
//                   errorText={touched.shipping_address1 && errors.shipping_address1}></TextArea>



//                  {/* landmark  */}

//                  {/* <TextField
//                   fullwidth
//                   mb="1rem"
//                   type="number"
//                   label="Zip Code"
//                   onBlur={handleBlur}
//                   name="shipping_zip"
//                   onChange={handleChange}
//                   value={values.shipping_zip}
//                   errorText={touched.shipping_zip && errors.shipping_zip}
//                 /> */}

                
//                <Grid container spacing={2} justifyContent="flex-start">
                
//               <Grid item>
//               <Button variant="outlined">Home</Button>
//               </Grid>
//               <Grid item>
//               <Button variant="outlined">Office</Button>
//               </Grid>
//                </Grid>
                
//               </Grid>

//               <Grid item sm={6} xs={12}>

//                 {/* province/ region  */}
//               <Select
//                   mb="1rem"
//                   label="Province / Region"
//                   options={countryList}
//                   value={values.shipping_country || "US"}
//                   errorText={touched.shipping_country && errors.shipping_country}
//                   onChange={(country) => setFieldValue("shipping_country", country)}
//                 />

//                 {/* city  */}
//                 <Select
//                   mb="1rem"
//                   label="City"
//                   options={countryList}
//                   value={values.shipping_country || "US"}
//                   errorText={touched.shipping_country && errors.shipping_country}
//                   onChange={(country) => setFieldValue("shipping_country", country)}
//                 />

//                 {/* country  */}

//               <Select
//                   mb="1rem"
//                   label="Country"
//                   options={countryList}
//                   value={values.shipping_country || "US"}
//                   errorText={touched.shipping_country && errors.shipping_country}
//                   onChange={(country) => setFieldValue("shipping_country", country)}
//                 />


//                 {/* <TextField
//                   fullwidth
//                   mb="1rem"
//                   type="email"
//                   onBlur={handleBlur}
//                   label="Email Address"
//                   name="shipping_email"
//                   onChange={handleChange}
//                   value={values.shipping_email}
//                   errorText={touched.shipping_email && errors.shipping_email}
//                 /> */}

//                 {/* <TextField
//                   fullwidth
//                   mb="1rem"
//                   label="Company"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   name="shipping_company"
//                   value={values.shipping_company}
//                   errorText={touched.shipping_company && errors.shipping_company}
//                 /> */}

              
//                 {/* Area  */}
//                 {/* <TextField
//                   fullwidth
//                   label="Address 2"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   name="shipping_address2"
//                   value={values.shipping_address2}
//                   errorText={touched.shipping_address2 && errors.shipping_address2}
//                 /> */}
//                  <Select
//                   mb="1rem"
//                   label="Area"
//                   options={countryList}
//                   value={values.shipping_country || "BD"}
//                   errorText={touched.shipping_country && errors.shipping_country}
//                   onChange={(country) => setFieldValue("shipping_country", country)}
//                 />
//               </Grid>
//             </Grid>
//           </Card1>

//           {/* <Card1 mb="2rem">
//             <Typography fontWeight="600" mb="1rem">
//               Billing Address
//             </Typography>

//             <CheckBox
//               color="secondary"
//               label="Same as shipping address"
//               mb={sameAsShipping ? "" : "1rem"}
//               onChange={handleCheckboxChange(values, setFieldValue)}
//             />

//             {!sameAsShipping && (
//               <Grid container spacing={7}>
//                 <Grid item sm={6} xs={12}>
//                   <TextField
//                     fullwidth
//                     mb="1rem"
//                     label="Full Name"
//                     name="billing_name"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.billing_name}
//                     errorText={touched.billing_name && errors.billing_name}
//                   />

//                   <TextField
//                     fullwidth
//                     mb="1rem"
//                     onBlur={handleBlur}
//                     label="Phone Number"
//                     name="billing_contact"
//                     onChange={handleChange}
//                     value={values.billing_contact}
//                     errorText={touched.billing_contact && errors.billing_contact}
//                   />

//                   <TextField
//                     fullwidth
//                     mb="1rem"
//                     type="number"
//                     label="Zip Code"
//                     name="billing_zip"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.billing_zip}
//                     errorText={touched.billing_zip && errors.billing_zip}
//                   />

//                   <TextField
//                     fullwidth
//                     label="Address 1"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     name="billing_address1"
//                     value={values.billing_address1}
//                     errorText={touched.billing_address1 && errors.billing_address1}
//                   />
//                 </Grid>

//                 <Grid item sm={6} xs={12}>
//                   <TextField
//                     fullwidth
//                     mb="1rem"
//                     type="email"
//                     onBlur={handleBlur}
//                     name="billing_email"
//                     label="Email Address"
//                     onChange={handleChange}
//                     value={values.billing_email}
//                     errorText={touched.billing_email && errors.billing_email}
//                   />

//                   <TextField
//                     fullwidth
//                     mb="1rem"
//                     label="Company"
//                     onBlur={handleBlur}
//                     name="billing_company"
//                     onChange={handleChange}
//                     value={values.billing_company}
//                     errorText={touched.billing_company && errors.billing_company}
//                   />

//                   <Select
//                     mb="1rem"
//                     label="Country"
//                     options={countryList}
//                     errorText={touched.billing_country && errors.billing_country}
//                   />

//                   <TextField
//                     fullwidth
//                     label="Address 2"
//                     onBlur={handleBlur}
//                     name="billing_address2"
//                     onChange={handleChange}
//                     value={values.billing_address2}
//                     errorText={touched.billing_address2 && errors.billing_address2}
//                   />
//                 </Grid>
//               </Grid>
//             )}
//           </Card1> */}

//           <Grid container spacing={7}>
//             <Grid item sm={6} xs={12}>
//               <Link href="/cart">
//                 <Button variant="outlined" color="primary" type="button" fullwidth>
//                   Back to Cart
//                 </Button>
//               </Link>
//             </Grid>

//             <Grid item sm={6} xs={12}>
//               <Button variant="contained" color="primary" type="submit" fullwidth>
//                 Proceed to Payment
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       )}
//     </Formik>
//   );
// }

// const initialValues = {
//   shipping_name: "",
//   shipping_email: "",
//   shipping_contact: "",
//   shipping_company: "",
//   shipping_zip: "",
//   shipping_country: "",
//   shipping_address1: "",
//   shipping_address2: "",

//   billing_name: "",
//   billing_email: "",
//   billing_contact: "",
//   billing_company: "",
//   billing_zip: "",
//   billing_country: "",
//   billing_address1: "",
//   billing_address2: ""
// };

// const checkoutSchema = yup.object().shape({
//   // shipping_name: yup.string().required("required"),
//   // shipping_email: yup.string().email("invalid email").required("required"),
//   // shipping_contact: yup.string().required("required"),
//   // shipping_zip: yup.string().required("required"),
//   // shipping_country: yup.object().required("required"),
//   // shipping_address1: yup.string().required("required"),
//   // billing_name: yup.string().required("required"),
//   // billing_email: yup.string().required("required"),
//   // billing_contact: yup.string().required("required"),
//   // billing_zip: yup.string().required("required"),
//   // billing_country: yup.string().required("required"),
//   // billing_address1: yup.string().required("required"),
// });


"use client";

import { FC, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { Formik } from "formik";

import Select from "@component/Select";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import Typography from "@component/Typography";
import TextArea from "@component/textarea";
import countryList from "@data/countryList";
import axios from "axios";

export default function CheckoutForm() {
  const router = useRouter();
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [selectedLandmark, setSelectedLandmark] = useState<number | null>(null);
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [area, setArea] = useState([]);



  const handleFormSubmit = async (values: any) => {
    console.log(values);
    router.push("/payment");
  };

  // const fetchProvince = async () => {
  //   try {
  //     const response = await axios.get("https://tizaraa.com/api/checkout/address", {
  //       headers: {
  //         'Authorization': `Bearer 1204|d7tYXgZU3Fh3ICHKUx25qGM9vTTJqU1GPtypSaDi4dae3f55` 
  //       }
  //     });

  //     console.log(response.data); 
  //     const province = response.data.province || []; 
  //     setProvince(province); 

  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchProvince(); 
  // }, []);

  const fetchProvince = async () => {
    try {
        const response = await axios.get("https://tizaraa.com/api/checkout/address", {
            headers: {
                'Authorization': `Bearer 1204|d7tYXgZU3Fh3ICHKUx25qGM9vTTJqU1GPtypSaDi4dae3f55`
            }
        });

        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
            // Extract provinces, cities, and areas from the response
            const provinces = response.data.map(prov => ({
                province: prov.province,
                // If you want to store the id as well, uncomment the line below
                // id: prov.id,
            }));

            const cities = response.data.map(prov => ({
              city: prov.province,
              // If you want to store the id as well, uncomment the line below
              // id: prov.id,
          }));

            // Set the state for provinces
            setProvince(provinces);
            console.log("Provinces:", provinces);

 
            setCity(cities); 
            console.log("Cities:", cities);

        } else {
            console.error("Response data is not in expected format.");
            setProvince([]); 
            // Optionally reset cities and areas
            setCity([]);
        }

    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// useEffect to call fetchProvince when component mounts
useEffect(() => {
    fetchProvince();
}, []);



  const handleCheckboxChange =
    (values: typeof initialValues, setFieldValue: any) =>
    ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
      setSameAsShipping(checked);
      setFieldValue("same_as_shipping", checked);
      setFieldValue("billing_name", checked ? values.shipping_name : "");
    };

  // Handle landmark selection and update the form values
  const handleLandmarkSelect = (landmark: string, setFieldValue: any) => {
    let landmarkValue: number;

    if (landmark === "Home") {
      landmarkValue = 1;
      // console.log("landmark: 1");
    } else if (landmark === "Office") {
      landmarkValue = 2;
      // console.log("landmark: 2");
    } else {
      landmarkValue = 0; // Default value if needed
    }

    setSelectedLandmark(landmarkValue); // Set the selected landmark value
    setFieldValue("selectedLandmark", landmarkValue); // Update the form value
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={checkoutSchema}
      onSubmit={handleFormSubmit}>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
      }) => (
        <form onSubmit={handleSubmit}>
          <Card1 mb="2rem">
            <Typography fontWeight="600" mb="1rem">
              Shipping Address
            </Typography>

            <Grid container spacing={7}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullwidth
                  mb="1rem"
                  label="Full Name"
                  name="shipping_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shipping_name}
                  errorText={touched.shipping_name && errors.shipping_name}
                />

                <TextField
                  fullwidth
                  mb="1rem"
                  label="Phone Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="shipping_contact"
                  value={values.shipping_contact}
                  errorText={touched.shipping_contact && errors.shipping_contact}
                />

                <TextArea
                  fullwidth
                  label="Address 1"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="shipping_address1"
                  value={values.shipping_address1}
                  errorText={touched.shipping_address1 && errors.shipping_address1}
                ></TextArea>

                <Typography fontWeight="600" mb="0.5rem">
                  Select a label for effective delivery:
                </Typography>

                <Grid container spacing={2} justifyContent="flex-start">
  <Grid item>
    <Button
      type="button" 
      variant={selectedLandmark === 1 ? "contained" : "outlined"}
      onClick={() => handleLandmarkSelect("Home", setFieldValue)}
    >
      Home
    </Button>
  </Grid>
  <Grid item>
    <Button
      type="button" 
      variant={selectedLandmark === 2 ? "contained" : "outlined"}
      onClick={() => handleLandmarkSelect("Office", setFieldValue)}
    >
      Office
    </Button>
  </Grid>
</Grid>

              </Grid>

              <Grid item sm={6} xs={12}>

                {/* province  */}
                <Select
    mb="1rem"
    label="Province / Region"
    options={province.map(prov => ({ value: prov.id, label: prov.province }))} // Map to extract id and province name
    value={values.shipping_province || ""} // Use appropriate initial value
    errorText={touched.shipping_province && errors.shipping_province}
    onChange={(selectedProvince) => setFieldValue("shipping_province", selectedProvince)}
/>

{/* city  */}
                <Select
                  mb="1rem"
                  label="City"
                  options={city}
                  value={values.shipping_city || "US"}
                  errorText={touched.shipping_country && errors.shipping_country}
                  onChange={(country) => setFieldValue("shipping_country", country)}
                />

                <Select
                  mb="1rem"
                  label="Country"
                  options={countryList}
                  value={values.shipping_country || "BD"}
                  errorText={touched.shipping_country && errors.shipping_country}
                  onChange={(country) => setFieldValue("shipping_country", country)}
                />
                
{/* area  */}
                <Select
                  mb="1rem"
                  label="Area"
                  options={countryList}
                  value={values.shipping_country || "BD"}
                  errorText={touched.shipping_country && errors.shipping_country}
                  onChange={(country) => setFieldValue("shipping_country", country)}
                />
              </Grid>
            </Grid>
          </Card1>

          <Grid container spacing={7}>
            <Grid item sm={6} xs={12}>
              <Link href="/cart">
                <Button variant="outlined" color="primary" type="button" fullwidth>
                  Back to Cart
                </Button>
              </Link>
            </Grid>

            <Grid item sm={6} xs={12}>
              <Button variant="contained" color="primary" type="submit" fullwidth>
                Proceed to Payment
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}

const initialValues = {
  shipping_name: "",
  shipping_email: "",
  shipping_contact: "",
  shipping_company: "",
  shipping_zip: "",
  shipping_country: "",
  shipping_address1: "",
  shipping_address2: "",
  selectedLandmark: null, 
  shipping_province: "",
};

const checkoutSchema = yup.object().shape({
  // Define your validation schema if needed
});
