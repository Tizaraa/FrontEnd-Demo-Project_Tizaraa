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
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(authService.isAuthenticated());
  }, []);

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

        if(isLoggedIn){
          router.push("/address");
          toast.success("Address Updated successfully!");
        }else{
          router.push("/login");
        }
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
            padding: "2rem",
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
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
          enableReinitialize
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit} style={{ padding: "1rem" }}>
              {/* Shipping Address Card */}
              <div
                style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "1rem",
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
                          e.target.style.borderColor = "#E94560"
                          e.target.style.background = "white"
                          e.target.style.boxShadow = "0 0 0 3px rgba(233, 69, 96, 0.1)"
                        }}
                        onBlur={(e) => {
                          handleBlur(e)
                          e.target.style.borderColor = touched.name && errors.name ? "#E94560" : "#e1e8ed"
                          e.target.style.background = "#fafbfc"
                          e.target.style.boxShadow = "none"
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
                        value={values.contact}
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
                          e.target.style.borderColor = "#E94560"
                          e.target.style.background = "white"
                          e.target.style.boxShadow = "0 0 0 3px rgba(233, 69, 96, 0.1)"
                        }}
                        onBlur={(e) => {
                          handleBlur(e)
                          e.target.style.borderColor = touched.contact && errors.contact ? "#E94560" : "#e1e8ed"
                          e.target.style.background = "#fafbfc"
                          e.target.style.boxShadow = "none"
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
                          e.target.style.borderColor = "#E94560"
                          e.target.style.background = "white"
                          e.target.style.boxShadow = "0 0 0 3px rgba(233, 69, 96, 0.1)"
                        }}
                        onBlur={(e) => {
                          handleBlur(e)
                          e.target.style.borderColor = touched.address && errors.address ? "#E94560" : "#e1e8ed"
                          e.target.style.background = "#fafbfc"
                          e.target.style.boxShadow = "none"
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
                          onClick={() => handleLandmarkSelect(1, setFieldValue)}
                          style={{
                            padding: "0.8rem 1.5rem",
                            border: `2px solid ${selectedLandmark === 1 ? "#E94560" : "#e1e8ed"}`,
                            borderRadius: "25px",
                            background: selectedLandmark === 1 ? "linear-gradient(135deg, #E94560, #d63851)" : "white",
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
                          onClick={() => handleLandmarkSelect(2, setFieldValue)}
                          style={{
                            padding: "0.8rem 1.5rem",
                            border: `2px solid ${selectedLandmark === 2 ? "#E94560" : "#e1e8ed"}`,
                            borderRadius: "25px",
                            background: selectedLandmark === 2 ? "linear-gradient(135deg, #E94560, #d63851)" : "white",
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
                      <div style={{ position: "relative" }}>
                        <select
                          value="BD"
                          onChange={() =>
                            setFieldValue("country", {
                              value: "BD",
                              label: "Bangladesh",
                            })
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
                            e.target.style.borderColor = "#E94560"
                            e.target.style.background = "white"
                            e.target.style.boxShadow = "0 0 0 3px rgba(233, 69, 96, 0.1)"
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = touched.country && errors.country ? "#E94560" : "#e1e8ed"
                            e.target.style.background = "#fafbfc"
                            e.target.style.boxShadow = "none"
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
                          {String(errors.country)}
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
                          onChange={(e) => handleProvinceChange(Number.parseInt(e.target.value), setFieldValue)}
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
                            e.target.style.borderColor = "#E94560"
                            e.target.style.background = "white"
                            e.target.style.boxShadow = "0 0 0 3px rgba(233, 69, 96, 0.1)"
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = touched.province && errors.province ? "#E94560" : "#e1e8ed"
                            e.target.style.background = "#fafbfc"
                            e.target.style.boxShadow = "none"
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
                          onChange={(e) => handleCityChange(Number.parseInt(e.target.value), setFieldValue)}
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
                            e.target.style.borderColor = "#E94560"
                            e.target.style.background = "white"
                            e.target.style.boxShadow = "0 0 0 3px rgba(233, 69, 96, 0.1)"
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = touched.city && errors.city ? "#E94560" : "#e1e8ed"
                            e.target.style.background = "#fafbfc"
                            e.target.style.boxShadow = "none"
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
                          onChange={(e) => setFieldValue("area", Number.parseInt(e.target.value))}
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
                            e.target.style.borderColor = "#E94560"
                            e.target.style.background = "white"
                            e.target.style.boxShadow = "0 0 0 3px rgba(233, 69, 96, 0.1)"
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = touched.area && errors.area ? "#E94560" : "#e1e8ed"
                            e.target.style.background = "#fafbfc"
                            e.target.style.boxShadow = "none"
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
                  justifyContent: "flex-start",
                  paddingTop: "1rem",
                }}
              >
                <button
                  type="submit"
                  style={{
                    background: "linear-gradient(135deg, #E94560, #d63851)",
                    color: "white",
                    border: "none",
                    padding: "1rem 3rem",
                    borderRadius: "50px",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    outline: "none",
                    boxShadow: "0 8px 25px rgba(233, 69, 96, 0.3)",
                    transform: "translateY(0)",
                    minWidth: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  💾 Save Changes
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>

      {/* Add keyframes for animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes slideIn {
            from { transform: translateX(-20px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  )
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  contact: Yup.string().required("Contact is required").matches(/^[0-9]+$/, "Contact must be a number"),
  address: Yup.string().required("Address is required"),
  province: Yup.string().required("Province is required"),
  city: Yup.string().required("City is required"),
  area: Yup.string().required("Area is required"),
});


