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
import axios from "axios";
import * as Yup from "yup";
import {  toast } from 'react-toastify';
import ApiBaseUrl from "api/ApiBaseUrl";

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
  });

  useEffect(() => {
    const fetchProvinces = async () => {
      const authtoken = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${ApiBaseUrl.baseUrl}checkout/address`,
          {
            headers: {
              Authorization: `Bearer ${authtoken}`,
            },
          }
        );

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
          `${ApiBaseUrl.baseUrl}user/address/edit/${addressId}`,
          {
            headers: {
              Authorization: `Bearer ${authtoken}`,
            },
          }
        );

        const data = response.data.address;
        // console.log(data);
        setInitialValues({
          name: data.name || "",
          contact: data.phone || "",
          address: data.address || "",
          province: data.province_id || "",
          city: data.city_id || "",
          area: data.area_id || "",
          selectedLandmark: data.landmark || null,
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
      landmark: 1,
    };

    // console.log(updateAddressData);

    try {
      const response = await axios.post(
        `${ApiBaseUrl.baseUrl}user/address/update/${addressId}`,
        updateAddressData,
        {
          headers: {
            Authorization: `Bearer ${authtoken}`,
          },
        }
      );

      if (response.status === 200) {
        router.push("/address");
        toast.success("Address Updated successfully!");
      }
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Failed updating address.");
    }
  };

  const handleProvinceChange = (provinceId: number, setFieldValue: any) => {
    const selectedProvince = province.find((prov: any) => prov.id === provinceId);

    if (selectedProvince) {
      setFieldValue("province", provinceId);
      setCity(selectedProvince.city || []); // Access the cities from the selected province
      setFieldValue("area", ""); // Reset area when province changes
      setArea([]); // Clear area options
    }
  };

  const handleCityChange = (cityId: number, setFieldValue: any) => {
    setFieldValue("city", cityId);
    
    const selectedCity = city.find((c: any) => c.id === cityId);

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
    const selectedProvince = province.find((prov: any) => prov.id === initialValues.province);
    
    if (selectedProvince) {
      setCity(selectedProvince.city || []); // Set cities based on selected province
    }
  }, [initialValues.province, province]);

  useEffect(() => {

    const selectedCity= city.find((city:any)=>city.id=== initialValues.city);
    if(selectedCity){
      setArea(selectedCity.areas);
    }

  }, [initialValues.city, city]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
      enableReinitialize
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
                  value={values.contact} 
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
                        handleLandmarkSelect(1, setFieldValue)
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
                        handleLandmarkSelect(2, setFieldValue)
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
                {/* Country Selection */}
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
                  }))}
                  value={
                    values.province
                      ? {
                          value: values.province,
                          label: province.find((prov) => prov.id === values.province)?.province,
                        }
                      : null
                  }
                  errorText={touched.province && errors.province}
                  onChange={(e: { value: number; label: string }) =>
                    handleProvinceChange(e.value, setFieldValue)
                  }
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
                  }
                  errorText={touched.city && errors.city}
                  onChange={(e: { value: number; label: string }) =>
                    handleCityChange(e.value, setFieldValue)
                  }
                />

                {/* Area Selection */}
                <Select
                  mb="1rem"
                  label="Area"
                  options={area.map((a: any) => ({
                    value: a.id,
                    label: a.area,
                  }))}
                  value={
                    values.area
                      ? {
                          value: values.area,
                          label: area.find((a) => a.id === values.area)?.area,
                        }
                      : null
                  }
                  errorText={touched.area && errors.area}
                  onChange={(selectedArea: { value: number; label: string }) =>
                    setFieldValue("area", selectedArea.value)
                  }
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

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  contact: Yup.string().required("Contact is required").matches(/^[0-9]+$/, "Contact must be a number"),
  address: Yup.string().required("Address is required"),
  province: Yup.string().required("Province is required"),
  city: Yup.string().required("City is required"),
  area: Yup.string().required("Area is required"),
});


