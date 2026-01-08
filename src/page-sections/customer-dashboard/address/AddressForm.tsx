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
  };

  try {
   const response = await axios.post(
    `${ApiBaseUrl.baseUrl}user/address/store`,
    addressData,
    {
     headers: {
      Authorization: `Bearer ${authtoken}`, // Attach auth token to headers
     },
    }
   );

   if (response.status === 200) {
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
   const response = await axios.get(`${ApiBaseUrl.baseUrl}checkout/address`, {
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
  const selectedProvince = province.find((prov: any) => prov.id === provinceId);

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

  const selectedCity = city.find((c: any) => c.id === cityId); // Find the selected city object

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
  <div
   style={{
    minHeight: "100vh",
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
   }}
  >
   <div
    style={{
     maxWidth: "1200px",
     margin: "0 auto",
     background: "white",
     borderRadius: "20px",
     boxShadow: "0 20px 40px rgba(233, 69, 96, 0.1)",
     overflow: "hidden",
    }}
   >
    {/* Header */}
    <div
     style={{
      background: "linear-gradient(135deg, #E94560 0%, #d63851 100%)",
      padding: "1rem",
      color: "white",
      textAlign: "center",
     }}
    >
     <h1
      style={{
       margin: 0,
       fontSize: "2.5rem",
       fontWeight: "700",
       textShadow: "0 2px 4px rgba(0,0,0,0.3)",
      }}
     >
      Shipping Information
     </h1>
     <p
      style={{
       margin: "0.5rem 0 0 0",
       fontSize: "1.1rem",
       opacity: 0.9,
      }}
     >
      Please provide your delivery details
     </p>
    </div>

    <Formik
     initialValues={initialValues}
     validationSchema={checkoutSchema}
     onSubmit={handleFormSubmit}
    >
     {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue,
     }) => (
      <form onSubmit={handleSubmit} style={{ padding: "1rem" }}>
       {/* Shipping Address Card */}
       <div
        style={{
         background: "white",
         borderRadius: "16px",
         padding: "2rem",
         border: "2px solid #f0f0f0",
         boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
         transition: "all 0.3s ease",
        }}
       >
        <div
         style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "2rem",
          paddingBottom: "1rem",
          borderBottom: "2px solid #f5f5f5",
         }}
        >
         <div
          style={{
           width: "4px",
           height: "2rem",
           background: "linear-gradient(135deg, #E94560, #d63851)",
           borderRadius: "2px",
           marginRight: "1rem",
          }}
         ></div>
         <h2
          style={{
           margin: 0,
           fontSize: "1.5rem",
           fontWeight: "600",
           color: "#2c3e50",
          }}
         >
          Shipping Address
         </h2>
        </div>

        <div
         style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
         }}
        >
         {/* Left Column */}
         <div>
          {/* Full Name */}
          <div style={{ marginBottom: "1.5rem" }}>
           <label
            style={{
             display: "block",
             marginBottom: "0.5rem",
             fontWeight: "600",
             color: "#2c3e50",
             fontSize: "0.9rem",
            }}
           >
            Full Name *
           </label>
           <input
            type="text"
            name="name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
            style={{
             width: "100%",
             padding: "1rem",
             border: `2px solid ${touched.name && errors.name ? "#E94560" : "#e1e8ed"}`,
             borderRadius: "12px",
             fontSize: "1rem",
             transition: "all 0.3s ease",
             background: "#fafbfc",
             outline: "none",
             boxSizing: "border-box",
            }}
            onFocus={(e) => {
             e.target.style.borderColor = "#E94560";
             e.target.style.background = "white";
             e.target.style.boxShadow = "0 0 0 3px rgba(233, 69, 96, 0.1)";
            }}
           />
           {touched.name && errors.name && (
            <div
             style={{
              color: "#E94560",
              fontSize: "0.8rem",
              marginTop: "0.5rem",
              fontWeight: "500",
             }}
            >
             {String(errors.name)}
            </div>
           )}
          </div>

          {/* Phone Number */}
          <div style={{ marginBottom: "1.5rem" }}>
           <label
            style={{
             display: "block",
             marginBottom: "0.5rem",
             fontWeight: "600",
             color: "#2c3e50",
             fontSize: "0.9rem",
            }}
           >
            Phone Number *
           </label>
           <input
            type="tel"
            name="contact"
            onChange={handleChange}
            value={values.phone}
            style={{
             width: "100%",
             padding: "1rem",
             border: `2px solid ${touched.contact && errors.contact ? "#E94560" : "#e1e8ed"}`,
             borderRadius: "12px",
             fontSize: "1rem",
             transition: "all 0.3s ease",
             background: "#fafbfc",
             outline: "none",
             boxSizing: "border-box",
            }}
            onFocus={(e) => {
             e.target.style.borderColor = "#E94560";
             e.target.style.background = "white";
             e.target.style.boxShadow = "0 0 0 3px rgba(233, 69, 96, 0.1)";
            }}
            onBlur={(e) => {
             handleBlur(e);
             e.target.style.borderColor =
              touched.contact && errors.contact ? "#E94560" : "#e1e8ed";
             e.target.style.background = "#fafbfc";
             e.target.style.boxShadow = "none";
            }}
           />
           {touched.contact && errors.contact && (
            <div
             style={{
              color: "#E94560",
              fontSize: "0.8rem",
              marginTop: "0.5rem",
              fontWeight: "500",
             }}
            >
             {String(errors.contact)}
            </div>
           )}
          </div>

          {/* Address */}
          <div style={{ marginBottom: "1.5rem" }}>
           <label
            style={{
             display: "block",
             marginBottom: "0.5rem",
             fontWeight: "600",
             color: "#2c3e50",
             fontSize: "0.9rem",
            }}
           >
            Address *
           </label>
           <textarea
            name="address"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.address}
            rows={4}
            style={{
             width: "100%",
             padding: "1rem",
             border: `2px solid ${touched.address && errors.address ? "#E94560" : "#e1e8ed"}`,
             borderRadius: "12px",
             fontSize: "1rem",
             transition: "all 0.3s ease",
             background: "#fafbfc",
             outline: "none",
             resize: "vertical",
             fontFamily: "inherit",
             boxSizing: "border-box",
            }}
            onFocus={(e) => {
             e.target.style.borderColor = "#E94560";
             e.target.style.background = "white";
             e.target.style.boxShadow = "0 0 0 3px rgba(233, 69, 96, 0.1)";
            }}
           />
           {touched.address && errors.address && (
            <div
             style={{
              color: "#E94560",
              fontSize: "0.8rem",
              marginTop: "0.5rem",
              fontWeight: "500",
             }}
            >
             {String(errors.address)}
            </div>
           )}
          </div>

          {/* Landmark Selection */}
          <div style={{ marginBottom: "1.5rem" }}>
           <label
            style={{
             display: "block",
             marginBottom: "1rem",
             fontWeight: "600",
             color: "#2c3e50",
             fontSize: "0.9rem",
            }}
           >
            Select a label for effective delivery:
           </label>
           <div
            style={{
             display: "flex",
             gap: "1rem",
             flexWrap: "wrap",
            }}
           >
            <button
             type="button"
             onClick={() => handleLandmarkSelect("Home", setFieldValue)}
             style={{
              padding: "0.8rem 1.5rem",
              border: `2px solid ${selectedLandmark === 1 ? "#E94560" : "#e1e8ed"}`,
              borderRadius: "25px",
              background:
               selectedLandmark === 1
                ? "linear-gradient(135deg, #E94560, #d63851)"
                : "white",
              color: selectedLandmark === 1 ? "white" : "#2c3e50",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              outline: "none",
              fontSize: "0.9rem",
             }}
            >
             🏠 Home
            </button>
            <button
             type="button"
             onClick={() => handleLandmarkSelect("Office", setFieldValue)}
             style={{
              padding: "0.8rem 1.5rem",
              border: `2px solid ${selectedLandmark === 2 ? "#E94560" : "#e1e8ed"}`,
              borderRadius: "25px",
              background:
               selectedLandmark === 2
                ? "linear-gradient(135deg, #E94560, #d63851)"
                : "white",
              color: selectedLandmark === 2 ? "white" : "#2c3e50",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              outline: "none",
              fontSize: "0.9rem",
             }}
            >
             🏢 Office
            </button>
           </div>
           {touched.selectedLandmark && errors.selectedLandmark && (
            <div
             style={{
              color: "#E94560",
              fontSize: "0.8rem",
              marginTop: "0.5rem",
              fontWeight: "500",
             }}
            >
             {String(errors.selectedLandmark)}
            </div>
           )}
          </div>
         </div>

         {/* Right Column */}
         <div>
          {/* Country */}
          <div style={{ marginBottom: "1.5rem" }}>
           <label
            style={{
             display: "block",
             marginBottom: "0.5rem",
             fontWeight: "600",
             color: "#2c3e50",
             fontSize: "0.9rem",
            }}
           >
            Country *
           </label>
           <div
            style={{
             position: "relative",
            }}
           >
            <select
             value="BD"
             onChange={() =>
              setFieldValue("country", { value: "BD", label: "Bangladesh" })
             }
             style={{
              width: "100%",
              padding: "1rem",
              border: `2px solid ${touched.country && errors.country ? "#E94560" : "#e1e8ed"}`,
              borderRadius: "12px",
              fontSize: "1rem",
              background: "#fafbfc",
              outline: "none",
              cursor: "pointer",
              appearance: "none",
              boxSizing: "border-box",
             }}
             onFocus={(e) => {
              e.target.style.borderColor = "#E94560";
              e.target.style.background = "white";
              e.target.style.boxShadow = "0 0 0 3px rgba(233, 69, 96, 0.1)";
             }}
             onBlur={(e) => {
              e.target.style.borderColor =
               touched.country && errors.country ? "#E94560" : "#e1e8ed";
              e.target.style.background = "#fafbfc";
              e.target.style.boxShadow = "none";
             }}
            >
             <option value="BD">🇧🇩 Bangladesh</option>
            </select>
            <div
             style={{
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: "#666",
             }}
            >
             ▼
            </div>
           </div>
           {touched.country && errors.country && (
            <div
             style={{
              color: "#E94560",
              fontSize: "0.8rem",
              marginTop: "0.5rem",
              fontWeight: "500",
             }}
            >
             {typeof errors.country === "string" ? errors.country : ""}
            </div>
           )}
          </div>

          {/* Province */}
          <div style={{ marginBottom: "1.5rem" }}>
           <label
            style={{
             display: "block",
             marginBottom: "0.5rem",
             fontWeight: "600",
             color: "#2c3e50",
             fontSize: "0.9rem",
            }}
           >
            Province / Region *
           </label>
           <div style={{ position: "relative" }}>
            <select
             value={values.province || ""}
             onChange={(e) =>
              handleProvinceChange(
               Number.parseInt(e.target.value),
               setFieldValue
              )
             }
             style={{
              width: "100%",
              padding: "1rem",
              border: `2px solid ${touched.province && errors.province ? "#E94560" : "#e1e8ed"}`,
              borderRadius: "12px",
              fontSize: "1rem",
              background: "#fafbfc",
              outline: "none",
              cursor: "pointer",
              appearance: "none",
              boxSizing: "border-box",
             }}
             onFocus={(e) => {
              e.target.style.borderColor = "#E94560";
              e.target.style.background = "white";
              e.target.style.boxShadow = "0 0 0 3px rgba(233, 69, 96, 0.1)";
             }}
             onBlur={(e) => {
              e.target.style.borderColor =
               touched.province && errors.province ? "#E94560" : "#e1e8ed";
              e.target.style.background = "#fafbfc";
              e.target.style.boxShadow = "none";
             }}
            >
             <option value="">Select Province</option>
             {province?.map((prov) => (
              <option key={prov.id} value={prov.id}>
               {prov.province}
              </option>
             ))}
            </select>
            <div
             style={{
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: "#666",
             }}
            >
             ▼
            </div>
           </div>
           {touched.province && errors.province && (
            <div
             style={{
              color: "#E94560",
              fontSize: "0.8rem",
              marginTop: "0.5rem",
              fontWeight: "500",
             }}
            >
             {String(errors.province)}
            </div>
           )}
          </div>

          {/* City */}
          <div style={{ marginBottom: "1.5rem" }}>
           <label
            style={{
             display: "block",
             marginBottom: "0.5rem",
             fontWeight: "600",
             color: "#2c3e50",
             fontSize: "0.9rem",
            }}
           >
            City *
           </label>
           <div style={{ position: "relative" }}>
            <select
             value={values.city || ""}
             onChange={(e) =>
              handleCityChange(Number.parseInt(e.target.value), setFieldValue)
             }
             style={{
              width: "100%",
              padding: "1rem",
              border: `2px solid ${touched.city && errors.city ? "#E94560" : "#e1e8ed"}`,
              borderRadius: "12px",
              fontSize: "1rem",
              background: "#fafbfc",
              outline: "none",
              cursor: "pointer",
              appearance: "none",
              boxSizing: "border-box",
             }}
             onFocus={(e) => {
              e.target.style.borderColor = "#E94560";
              e.target.style.background = "white";
              e.target.style.boxShadow = "0 0 0 3px rgba(233, 69, 96, 0.1)";
             }}
             onBlur={(e) => {
              e.target.style.borderColor =
               touched.city && errors.city ? "#E94560" : "#e1e8ed";
              e.target.style.background = "#fafbfc";
              e.target.style.boxShadow = "none";
             }}
            >
             <option value="">Select City</option>
             {city?.map((c) => (
              <option key={c.id} value={c.id}>
               {c.city}
              </option>
             ))}
            </select>
            <div
             style={{
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: "#666",
             }}
            >
             ▼
            </div>
           </div>
           {touched.city && errors.city && (
            <div
             style={{
              color: "#E94560",
              fontSize: "0.8rem",
              marginTop: "0.5rem",
              fontWeight: "500",
             }}
            >
             {String(errors.city)}
            </div>
           )}
          </div>

          {/* Area */}
          <div style={{ marginBottom: "1.5rem" }}>
           <label
            style={{
             display: "block",
             marginBottom: "0.5rem",
             fontWeight: "600",
             color: "#2c3e50",
             fontSize: "0.9rem",
            }}
           >
            Area *
           </label>
           <div style={{ position: "relative" }}>
            <select
             value={values.area || ""}
             onChange={(e) =>
              setFieldValue("area", Number.parseInt(e.target.value))
             }
             style={{
              width: "100%",
              padding: "1rem",
              border: `2px solid ${touched.area && errors.area ? "#E94560" : "#e1e8ed"}`,
              borderRadius: "12px",
              fontSize: "1rem",
              background: "#fafbfc",
              outline: "none",
              cursor: "pointer",
              appearance: "none",
              boxSizing: "border-box",
             }}
             onFocus={(e) => {
              e.target.style.borderColor = "#E94560";
              e.target.style.background = "white";
              e.target.style.boxShadow = "0 0 0 3px rgba(233, 69, 96, 0.1)";
             }}
             onBlur={(e) => {
              e.target.style.borderColor =
               touched.area && errors.area ? "#E94560" : "#e1e8ed";
              e.target.style.background = "#fafbfc";
              e.target.style.boxShadow = "none";
             }}
            >
             <option value="">Select Area</option>
             {area?.map((a) => (
              <option key={a.id} value={a.id}>
               {a.area}
              </option>
             ))}
            </select>
            <div
             style={{
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: "#666",
             }}
            >
             ▼
            </div>
           </div>
           {touched.area && errors.area && (
            <div
             style={{
              color: "#E94560",
              fontSize: "0.8rem",
              marginTop: "0.5rem",
              fontWeight: "500",
             }}
            >
             {String(errors.area)}
            </div>
           )}
          </div>
         </div>
        </div>
       </div>

       {/* Submit Button */}
       <div
        style={{
         display: "flex",
         justifyContent: "center",
         paddingTop: "1rem",
        }}
       >
        <button
         type="submit"
         disabled={loading}
         style={{
          background: loading
           ? "#ccc"
           : "linear-gradient(135deg, #E94560, #d63851)",
          color: "white",
          border: "none",
          padding: "1rem 3rem",
          borderRadius: "50px",
          fontSize: "1.1rem",
          fontWeight: "600",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "all 0.3s ease",
          outline: "none",
          boxShadow: loading ? "none" : "0 8px 25px rgba(233, 69, 96, 0.3)",
          transform: loading ? "none" : "translateY(0)",
          minWidth: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
         }}
        >
         {loading ? (
          <>
           <div
            style={{
             width: "18px",
             height: "18px",
             border: "2px solid #ffffff40",
             borderTop: "2px solid #ffffff",
             borderRadius: "50%",
             animation: "spin 1s linear infinite",
            }}
           ></div>
           Saving...
          </>
         ) : (
          <>💾 Save Address</>
         )}
        </button>
       </div>
      </form>
     )}
    </Formik>
   </div>

   {/* Add keyframes for loading animation */}
   <style>
    {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
   </style>
  </div>
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
