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


    let stringAddress = JSON.stringify(values)
  sessionStorage.setItem('address',stringAddress);
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

//   const fetchProvince = async () => {
//     try {
//         const response = await axios.get("https://tizaraa.com/api/checkout/address", {
//             headers: {
//                 'Authorization': `Bearer 1204|d7tYXgZU3Fh3ICHKUx25qGM9vTTJqU1GPtypSaDi4dae3f55`
//             }
//         });

//         console.log("API Response:", response.data);

//         if (Array.isArray(response.data)) {
//             // Extract provinces, cities, and areas from the response
//             const provinces = response.data.map(prov => ({
//                 province: prov.province,
//                 id: prov.id,
//             }));

//             const cities = response.data.map(prov => ({
//               city: prov.province,
//               // If you want to store the id as well, uncomment the line below
//               // id: prov.id,
//           }));

//             // Set the state for provinces
//             setProvince(provinces);
//             console.log("Provinces:", provinces);

 
//             setCity(cities); 
//             console.log("Cities:", cities);

//         } else {
//             console.error("Response data is not in expected format.");
//             setProvince([]); 
//             // Optionally reset cities and areas
//             setCity([]);
//         }

//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// };

// // useEffect to call fetchProvince when component mounts
// useEffect(() => {
//     fetchProvince();
// }, []);

// Fetch provinces and cities
const fetchProvince = async () => {
  try {
    const response = await axios.get("https://tizaraa.com/api/checkout/address", {
      headers: {
        'Authorization': `Bearer 1204|d7tYXgZU3Fh3ICHKUx25qGM9vTTJqU1GPtypSaDi4dae3f55`
      }
    });

    if (Array.isArray(response.data)) {
      setProvince(response.data); // Store the whole response
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

useEffect(() => {
  fetchProvince();
}, []);

// Handle province selection
const handleProvinceChange = (provinceId: number, setFieldValue: any) => {
  console.log("Received provinceId:", provinceId); // Debug the value
  const selectedProvince = province.find((prov: any) => prov.id === provinceId);
 
  if (selectedProvince) {
    setFieldValue("shipping_province", provinceId);
    setCity(selectedProvince.city); // Update the city based on the selected province
    setFieldValue("shipping_city", ""); // Reset city and area when province changes
    setFieldValue("shipping_area", "");
    setArea([]); // Reset area
  } else {
    console.log("Province not found.");
  }
};

// Handle city selection
const handleCityChange = (cityId: number, setFieldValue: any) => {
  setFieldValue("shipping_city", cityId);

  const selectedCity = city.find((c: any) => c.id === cityId); // Find the selected city object

  if (selectedCity) {
    setArea(selectedCity.areas); // Update the area state based on the selected city
    setFieldValue("shipping_area", ""); // Reset area when city changes
  } else {
    setArea([]); // Reset area if the city is not found
  }
};


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

{/* Display error text for landmark selection */}
{touched.selectedLandmark && errors.selectedLandmark && (
  <Typography color="error" variant="body2" mt={1}>
    {errors.selectedLandmark}
  </Typography>
)}


              </Grid>

              <Grid item sm={6} xs={12}>
                {/* country  */}
                <Select
  mb="1rem"
  label="Country"
  options={[{ value: "BD", label: "Bangladesh" }]} 
  value={{ value: "BD", label: "Bangladesh" }} 
  errorText={touched.shipping_country && errors.shipping_country}
  onChange={() => setFieldValue("shipping_country", { value: "BD", label: "Bangladesh" })}
/>


          {/* Province Selection */}
<Select
  mb="1rem"
  label="Province / Region"
  options={province.map(prov => ({ value: prov.id, label: prov.province }))} // Correct mapping
  value={
    values.shipping_province
      ? { value: values.shipping_province, label: province.find(prov => prov.id === values.shipping_province)?.province }
      : null
  } // Ensure this value matches the selected option
  errorText={touched.shipping_province && errors.shipping_province}
  onChange={(e: { value: number; label: string }) => handleProvinceChange(e.value, setFieldValue)} // Use correct type
/>

{/* City Selection */}
<Select
  mb="1rem"
  label="City"
  options={city.map((c: any) => ({ value: c.id, label: c.city }))} 
  value={
    values.shipping_city
      ? { value: values.shipping_city, label: city.find(c => c.id === values.shipping_city)?.city }
      : null
  } // Ensure this value matches the selected option
  errorText={touched.shipping_city && errors.shipping_city}
  onChange={(e: { value: number; label: string }) => handleCityChange(e.value, setFieldValue)} // Use correct type
/>

{/* Area Selection */}
<Select
  mb="1rem"
  label="Area"
  options={area.map((a: any) => ({ value: a.id, label: a.area }))} // Assuming area has id and name
  value={
    values.shipping_area
      ? { value: values.shipping_area, label: area.find(a => a.id === values.shipping_area)?.area }
      : null
  } // Ensure this value matches the selected option
  errorText={touched.shipping_area && errors.shipping_area}
  onChange={(selectedArea: { value: number; label: string }) => setFieldValue("shipping_area", selectedArea.value)} // Use correct type
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
  shipping_contact: "",
  shipping_address1: "",
  shipping_province: "",
  shipping_city: "",
  shipping_area: "",
  selectedLandmark: null, 
};

const checkoutSchema = yup.object().shape({
  shipping_name: yup.string().required("Name is required"),
  shipping_contact: yup.string().required("Contact is required"),
  shipping_address1: yup.string().required("Address is required"),
  shipping_province: yup.string().required("Province is required"),
  shipping_city: yup.string().required("City is required"),
  selectedLandmark: yup.number().required("Please select a landmark"),
});