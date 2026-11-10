// "use client";

// import * as yup from "yup";
// import { Formik } from "formik";
// import Box from "@component/Box";
// import Grid from "@component/grid/Grid";
// import { Button } from "@component/buttons";
// import TextField from "@component/text-field";
// import Address from "@models/address.model";

// // ===========================================================
// type AddressFormProps = { address?: Address };
// // ===========================================================

// export default function AddressForm({ address }: AddressFormProps) {
//   const INITIAL_VALUES = {
//     name: address?.title || "",
//     contact: address?.phone || "",
//     city: address?.city || "",
//     street: address?.street || "",
//     country: address?.country || ""
//   };

//   const VALIDATION_SCHEMA = yup.object().shape({
//     name: yup.string().required("required"),
//     street: yup.string().required("required"),
//     city: yup.string().required("required"),
//     country: yup.string().required("required"),
//     contact: yup.string().required("required")
//   });

//   const handleFormSubmit = async (values: any) => {
//     console.log(values);
//   };

//   return (
//     <Formik
//       onSubmit={handleFormSubmit}
//       initialValues={INITIAL_VALUES}
//       validationSchema={VALIDATION_SCHEMA}>
//       {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
//         <form onSubmit={handleSubmit}>
//           <Box mb="30px">
//             <Grid container horizontal_spacing={6} vertical_spacing={4}>
//               <Grid item md={6} xs={12}>
//                 <TextField
//                   fullwidth
//                   name="name"
//                   label="Name"
//                   onBlur={handleBlur}
//                   value={values.name}
//                   onChange={handleChange}
//                   errorText={touched.name && errors.name}
//                 />
//               </Grid>

//               <Grid item md={6} xs={12}>
//                 <TextField
//                   fullwidth
//                   label="Phone"
//                   name="contact"
//                   onBlur={handleBlur}
//                   value={values.contact}
//                   onChange={handleChange}
//                   errorText={touched.contact && errors.contact}
//                 />
//               </Grid>

//               <Grid item md={6} xs={12}>
//                 <TextField
//                   fullwidth
//                   name="street"
//                   label="Street"
//                   onBlur={handleBlur}
//                   value={values.street}
//                   onChange={handleChange}
//                   errorText={touched.street && errors.street}
//                 />
//               </Grid>

//               <Grid item md={6} xs={12}>
//                 <TextField
//                   fullwidth
//                   name="city"
//                   label="City"
//                   onBlur={handleBlur}
//                   value={values.city}
//                   onChange={handleChange}
//                   errorText={touched.city && errors.city}
//                 />
//               </Grid>

//               <Grid item md={6} xs={12}>
//                 <TextField
//                   fullwidth
//                   name="country"
//                   label="Country"
//                   onBlur={handleBlur}
//                   value={values.country}
//                   onChange={handleChange}
//                   errorText={touched.country && errors.country}
//                 />
//               </Grid>
//             </Grid>
//           </Box>

//           <Button type="submit" variant="contained" color="primary">
//             Save Changes
//           </Button>
//         </form>
//       )}
//     </Formik>
//   );
// }

"use client";

import { FC, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { Formik } from "formik";
import AddressFormView from "./AddressFormView";

import Select from "@component/Select";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import Typography from "@component/Typography";
import TextArea from "@component/textarea";
import countryList from "@data/countryList";
import axios from "axios";
import ApiBaseUrl from "api/ApiBaseUrl";
import toast, { Toaster } from "react-hot-toast";
import BeatLoader from "react-spinners/BeatLoader";
import authService from "services/authService";

export default function AddressForm() {
 const router = useRouter();
 const [selectedLandmark, setSelectedLandmark] = useState<number | null>(null);
 const [province, setProvince] = useState([]);
 const [city, setCity] = useState([]);
 const [area, setArea] = useState([]);
 const [loading, setLoading] = useState(false);

 const [isLoggedIn, setIsLoggedIn] = useState(false);

 useEffect(() => {
  setIsLoggedIn(authService.isAuthenticated());
 }, []);

 const handleFormSubmit = async (values: any, { setErrors }: any) => {
  setLoading(true);
  const authtoken = localStorage.getItem("token"); // Retrieve the auth token
  const userInfo = localStorage.getItem("userInfo"); // Assume you store user_id in localStorage
  const userId = JSON.parse(userInfo);
  //console.log(userId);

  const addressData = {
   user_id: userId.id,
   name: values.name,
   phone: values.contact,
   province: values.province,
   city: values.city,
   area: values.area,
   country: "BD", // Assuming country is always Bangladesh
   address: values.address, // Assuming this is the same as the TextArea field
   landmark: selectedLandmark,
   postal_code: values.postal_code,
   is_default: values.is_default ? 1 : 0,
  };

  try {
   const response = await axios.post(
    `${ApiBaseUrl.localApiUrl}user/address/store`,
    addressData,
    {
     headers: {
      Authorization: `Bearer ${authtoken}`, // Attach auth token to headers
     },
    }
   );

   if (response.status === 200 || response.status === 201) {
    // Handle successful response, e.g., redirect or show a success message
    sessionStorage.setItem("address", JSON.stringify(values));
    //console.log(response.data)

    if (isLoggedIn) {
     router.push("/address");
     toast.success("Address Added successfully!");
    } else {
     router.push("/login");
    }
   }
   setLoading(false);
  } catch (error) {
   console.error(
    "Failed submitting address data:",
    error.response.data.message
   );

   if (error.response && error.response.data.message) {
    const { phone, address } = error.response.data.message;

    if (phone) {
     setErrors({ contact: phone[0] });
    }

    if (address) {
     setErrors({ address: address[0] });
    }
   } else {
    toast.error("Something went wrong. Please try again.");
   }
   setLoading(false);
  }
 };

 // Fetch provinces and cities
 const fetchProvince = async () => {
  const authtoken = localStorage.getItem("token"); // Retrieve the auth token
  try {
   const response = await axios.get(`${ApiBaseUrl.localApiUrl}checkout/address`, {
    headers: {
     Authorization: `Bearer ${authtoken}`, // Attach auth token to headers
    },
   });

   if (Array.isArray(response.data)) {
    setProvince(response.data); // Store the whole response
   }
  } catch (error) {
   console.error("Error fetching provinces:", error);
  }
 };

 useEffect(() => {
  fetchProvince();
 }, []);

 // Handle province selection
 const handleProvinceChange = (provinceId: number, setFieldValue: any) => {
  const selectedProvince = province.find((prov: any) => prov.id == provinceId);

  if (selectedProvince) {
   setFieldValue("province", provinceId);
   setCity(selectedProvince.city); // Update the city based on the selected province
   setFieldValue("city", ""); // Reset city and area when province changes
   setFieldValue("area", "");
   setArea([]); // Reset area
  }
 };

 // Handle city selection
 const handleCityChange = (cityId: number, setFieldValue: any) => {
  setFieldValue("city", cityId);

  const selectedCity = city.find((c: any) => c.id == cityId); // Find the selected city object

  if (selectedCity) {
   setArea(selectedCity.areas); // Update the area state based on the selected city
   setFieldValue("area", ""); // Reset area when city changes
  } else {
   setArea([]); // Reset area if the city is not found
  }
 };

 // Handle landmark selection and update the form values
 const handleLandmarkSelect = (landmark: string, setFieldValue: any) => {
  let landmarkValue: number;

  if (landmark === "Home") {
   landmarkValue = 1;
  } else if (landmark === "Office") {
   landmarkValue = 2;
  } else {
   landmarkValue = 0; // Default value if needed
  }

  setSelectedLandmark(landmarkValue); // Set the selected landmark value
  setFieldValue("selectedLandmark", landmarkValue); // Update the form value
 };

 return (
  <Formik initialValues={initialValues} validationSchema={checkoutSchema} onSubmit={handleFormSubmit}>
   {(f) => (
    <form onSubmit={f.handleSubmit} noValidate>
     <AddressFormView
      values={f.values}
      errors={f.errors}
      touched={f.touched}
      submitCount={f.submitCount}
      handleChange={f.handleChange}
      handleBlur={f.handleBlur}
      setFieldValue={f.setFieldValue}
      province={province}
      city={city}
      area={area}
      onProvince={(id) => handleProvinceChange(id, f.setFieldValue)}
      onCity={(id) => handleCityChange(id, f.setFieldValue)}
      landmark={selectedLandmark}
      onLandmark={(v) => handleLandmarkSelect(v === 1 ? "Home" : "Office", f.setFieldValue)}
      landmarkError={f.submitCount > 0 && f.errors.selectedLandmark ? "Please choose Home or Office" : null}
      loading={f.isSubmitting}
      submitLabel="Save address"
      onCancel={() => router.push("/address")}
     />
    </form>
   )}
  </Formik>
 );
}

const initialValues = {
 name: "",
 contact: "",
 address: "",
 province: "",
 city: "",
 area: "",
 selectedLandmark: null,
 postal_code: "",
 is_default: false,
};

const checkoutSchema = yup.object().shape({
 name: yup.string().required("Name is required"),
 contact: yup.string().required("Contact is required"),
 address: yup.string().required("Address is required"),
 province: yup.string().required("Province is required"),
 city: yup.string().required("City is required"),
 area: yup.string().required("Area is required"),
 selectedLandmark: yup.number().required("Landmark is required"),
});
