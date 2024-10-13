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
import {  toast } from 'react-toastify';

export default function AddressForm() {
  const router = useRouter();
  const [selectedLandmark, setSelectedLandmark] = useState<number | null>(null);
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [area, setArea] = useState([]);

  const handleFormSubmit = async (values: any) => {
    const authtoken = localStorage.getItem("token"); // Retrieve the auth token
    const userInfo = localStorage.getItem("userInfo"); // Assume you store user_id in localStorage
    const userId = JSON.parse(userInfo)
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
        "https://tizaraa.com/api/user/address/store",
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
        
        router.push("/address");
        toast.success("Address Added successfully!");

      }
    } catch (error) {
      console.error("Failed submitting address data:", error);
      toast.error("Failed submitting address.");
    }
  };

  // Fetch provinces and cities
  const fetchProvince = async () => {
    const authtoken = localStorage.getItem("token"); // Retrieve the auth token
    try {
      const response = await axios.get(
        `https://tizaraa.com/api/checkout/address`,
        {
          headers: {
            Authorization: `Bearer ${authtoken}`, // Attach auth token to headers
          },
        }
      );

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
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  errorText={touched.name && errors.name}
                />

                <TextField
                  fullwidth
                  mb="1rem"
                  label="Phone Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="contact"
                  value={values.phone}
                  errorText={touched.contact && errors.contact}
                />

                <TextArea
                  fullwidth
                  label="Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="address"
                  value={values.address}
                  errorText={touched.address && errors.address}
                />

                <Typography fontWeight="600" mb="0.5rem">
                  Select a label for effective delivery:
                </Typography>
                <Grid container spacing={2} justifyContent="flex-start">
                  <Grid item>
                    <Button
                      type="button"
                      variant={selectedLandmark === 1 ? "contained" : "outlined"}
                      color="primary"
                      onClick={() =>
                        handleLandmarkSelect("Home", setFieldValue)
                      }
                    >
                      Home
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      type="button"
                      variant={selectedLandmark === 2 ? "contained" : "outlined"}
                      color="primary"
                      onClick={() =>
                        handleLandmarkSelect("Office", setFieldValue)
                      }
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
                  errorText={touched.country && errors.country}
                  onChange={() =>
                    setFieldValue("country", {
                      value: "BD",
                      label: "Bangladesh",
                    })
                  }
                />

                {/* Province Selection */}
                <Select
                  mb="1rem"
                  label="Province / Region"
                  options={province.map((prov) => ({
                    value: prov.id,
                    label: prov.province,
                  }))} // Correct mapping
                  value={
                    values.province
                      ? {
                          value: values.province,
                          label: province.find((prov) => prov.id === values.province)?.province,
                        }
                      : null
                  } // Ensure this value matches the selected option
                  errorText={touched.province && errors.province}
                  onChange={(e: { value: number; label: string }) =>
                    handleProvinceChange(e.value, setFieldValue)
                  } // Use correct type
                />

                {/* City Selection */}
                <Select
                  mb="1rem"
                  label="City"
                  options={city.map((c: any) => ({
                    value: c.id,
                    label: c.city,
                  }))}
                  value={
                    values.city
                      ? {
                          value: values.city,
                          label: city.find((c) => c.id === values.city)?.city,
                        }
                      : null
                  } // Ensure this value matches the selected option
                  errorText={touched.city && errors.city}
                  onChange={(e: { value: number; label: string }) =>
                    handleCityChange(e.value, setFieldValue)
                  } // Use correct type
                />

                {/* Area Selection */}
                <Select
                  mb="1rem"
                  label="Area"
                  options={area.map((a: any) => ({
                    value: a.id,
                    label: a.area,
                  }))} // Assuming area has id and name
                  value={
                    values.area
                      ? {
                          value: values.area,
                          label: area.find((a) => a.id === values.area)?.area,
                        }
                      : null
                  } // Ensure this value matches the selected option
                  errorText={touched.area && errors.area}
                  onChange={(selectedArea: { value: number; label: string }) =>
                    setFieldValue("area", selectedArea.value)
                  } // Use correct type
                />
              </Grid>
            </Grid>
          </Card1>

          <Grid container spacing={7}>
            <Grid item sm={6} xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </Grid>
          </Grid>
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
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  contact: yup.string().required("Contact is required"),
  address: yup.string().required("Address is required"),
  province: yup.string().required("Province is required"),
  city: yup.string().required("City is required"),
  selectedLandmark: yup.number().required("Please select a landmark"),
});