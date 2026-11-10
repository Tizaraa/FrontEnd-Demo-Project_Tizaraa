"use client";

import { FC, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import AddressFormView from "./AddressFormView";
import { Formik } from "formik";
import Select from "@component/Select";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import Typography from "@component/Typography";
import TextArea from "@component/textarea";
import axios from "axios";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import ApiBaseUrl from "api/ApiBaseUrl";
import authService from "services/authService";
export default function EditAddressForm({ addressId }: { addressId: string }) {
 const router = useRouter();
 const [selectedLandmark, setSelectedLandmark] = useState<number | null>(null);
 const [province, setProvince] = useState([]);
 const [city, setCity] = useState([]);
 const [area, setArea] = useState([]);
 const [initialValues, setInitialValues] = useState({
  name: "",
  contact: "",
  address: "",
  province: "",
  city: "",
  area: "",
  selectedLandmark: null,
  postal_code: "",
  is_default: false,
 });

 const [isLoggedIn, setIsLoggedIn] = useState(false);

 useEffect(() => {
  setIsLoggedIn(authService.isAuthenticated());
 }, []);

 useEffect(() => {
  const fetchProvinces = async () => {
   const authtoken = localStorage.getItem("token");
   try {
    const response = await axios.get(`${ApiBaseUrl.localApiUrl}checkout/address`, {
     headers: {
      Authorization: `Bearer ${authtoken}`,
     },
    });

    if (Array.isArray(response.data)) {
     // console.log(response.data);
     setProvince(response.data);
    }
   } catch (error) {
    console.error("Error fetching provinces:", error);
   }
  };

  const fetchAddress = async () => {
   const authtoken = localStorage.getItem("token");
   try {
    const response = await axios.get(
     `${ApiBaseUrl.localApiUrl}user/address/edit/${addressId}`,
     {
      headers: {
       Authorization: `Bearer ${authtoken}`,
      },
     }
    );

    const data = response.data.address;
    
    const mappedLandmark = data.landmark === "Home" ? 1 : data.landmark === "Office" ? 2 : 0;
    setSelectedLandmark(mappedLandmark);

    setInitialValues({
     name: data.name || "",
     contact: data.phone || "",
     address: data.address || "",
     province: data.province_id || "",
     city: data.city_id || "",
     area: data.area_id || "",
     selectedLandmark: mappedLandmark,
     postal_code: data.postal_code || "",
     is_default: data.is_default ? true : false,
    });

    // Fetch provinces after setting initial values
    await fetchProvinces();
   } catch (error) {
    console.error("Error fetching address:", error);
   }
  };

  fetchAddress();
 }, [addressId]);

 const handleFormSubmit = async (values: any) => {
  const authtoken = localStorage.getItem("token");

  const updateAddressData = {
   name: values.name,
   phone: values.contact,
   province: values.province,
   city: values.city,
   area: values.area,
   country: "BD",
   address: values.address,
   landmark: selectedLandmark,
   postal_code: values.postal_code,
   is_default: values.is_default ? 1 : 0,
  };

  // console.log(updateAddressData);

  try {
   const response = await axios.post(
    `${ApiBaseUrl.localApiUrl}user/address/update/${addressId}`,
    updateAddressData,
    {
     headers: {
      Authorization: `Bearer ${authtoken}`,
     },
    }
   );

   if (response.status >= 200 && response.status < 300) {
    if (isLoggedIn) {
     router.push("/address");
     toast.success("Address Updated successfully!");
    } else {
     router.push("/login");
    }
   }
  } catch (error) {
   console.error("Error updating address:", error);
   toast.error("Failed updating address.");
  }
 };

 const handleProvinceChange = (provinceId: number, setFieldValue: any) => {
  const selectedProvince = province.find((prov: any) => prov.id == provinceId);

  if (selectedProvince) {
   setFieldValue("province", provinceId);
   setCity(selectedProvince.city || []); // Access the cities from the selected province
   setFieldValue("area", ""); // Reset area when province changes
   setArea([]); // Clear area options
  }
 };

 const handleCityChange = (cityId: number, setFieldValue: any) => {
  setFieldValue("city", cityId);

  const selectedCity = city.find((c: any) => c.id == cityId);

  if (selectedCity) {
   setArea(selectedCity.areas || []); // Access areas from the selected city
   setFieldValue("area", ""); // Reset area selection
  } else {
   setArea([]);
  }
 };

 const handleLandmarkSelect = (landmark: number, setFieldValue: any) => {
  setFieldValue("landmark", landmark);
  setSelectedLandmark(landmark);
 };

 useEffect(() => {
  const selectedProvince = province.find(
   (prov: any) => prov.id == initialValues.province
  );

  if (selectedProvince) {
   setCity(selectedProvince.city || []); // Set cities based on selected province
  }
 }, [initialValues.province, province]);

 useEffect(() => {
  const selectedCity = city.find((city: any) => city.id == initialValues.city);
  if (selectedCity) {
   setArea(selectedCity.areas);
  }
 }, [initialValues.city, city]);

 return (
  <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleFormSubmit} enableReinitialize>
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
      onLandmark={(v) => handleLandmarkSelect(v, f.setFieldValue)}
      landmarkError={null}
      loading={f.isSubmitting}
      submitLabel="Update address"
      onCancel={() => router.push("/address")}
     />
    </form>
   )}
  </Formik>
 );
}

const validationSchema = Yup.object({
 name: Yup.string().required("Name is required"),
 contact: Yup.string()
  .required("Contact is required")
  .matches(/^[0-9]+$/, "Contact must be a number"),
 address: Yup.string().required("Address is required"),
 province: Yup.string().required("Province is required"),
 city: Yup.string().required("City is required"),
 area: Yup.string().required("Area is required"),
});
