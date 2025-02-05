// "use client";
// import * as yup from "yup";
// import { Formik } from "formik";
// import { format } from "date-fns";
// import { useState, useEffect } from "react";
// import axios from "axios";

// import Box from "@component/Box";
// import Grid from "@component/grid/Grid";
// import { Button } from "@component/buttons";
// import TextField from "@component/text-field";
// import Select from "@component/Select";

// const API_URL = "https://frontend.tizaraa.com/api/user/profile";
// const UPDATE_API_URL = "https://frontend.tizaraa.com/api/user/profile/update";

// export default function ProfileEditForm() {
//   const [profile, setProfile] = useState(null); // State to hold the user data
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(""); // Error state

//   const fetchUserProfile = async () => {
//     const authtoken = localStorage.getItem("token");

//     try {
//       const response = await axios.get(API_URL, {
//         headers: {
//           Authorization: `Bearer ${authtoken}`,
//         },
//       });
//       setProfile(response.data);
//       setLoading(false);
//     } catch (err) {
//       setError("Failed to load user profile");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   const INITIAL_VALUES = {
//     name: profile?.name || "",
//     contact: profile?.phone || "",
//     birthdate: format(new Date(profile?.birthdate), "yyyy-MM-dd") || "",
//     gender: profile?.gender || "",
//   };

//   const VALIDATION_SCHEMA = yup.object().shape({
//     name: yup.string().required("required"),
//     contact: yup.string().required("required"),
//     birthdate: yup.date().required("invalid date"),
//     gender: yup.string().required("required"),
//   });

//   const handleFormSubmit = async (values: typeof INITIAL_VALUES) => {
//     const authtoken = localStorage.getItem("token");
//     try {
//       const response = await axios.post(
//         UPDATE_API_URL,
//         {
//           name: values.name,
//           phone: values.contact,
//           birthdate: values.birthdate,
//           gender: values.gender,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${authtoken}`,
//           },
//         }
//       );
//       console.log("Profile updated successfully:", response.data);
//     } catch (err) {
//       console.error("Failed to update profile:", err);
//     }
//   };

//   const handleGender = (gender: string, setFieldValue: any) => {
//     setFieldValue("gender", gender);
//   };

//   return (
//     <Formik
//       onSubmit={handleFormSubmit}
//       initialValues={INITIAL_VALUES}
//       validationSchema={VALIDATION_SCHEMA}
//       enableReinitialize={true} // Ensures form initializes when data is fetched
//     >
//       {({
//         values,
//         errors,
//         touched,
//         handleChange,
//         handleBlur,
//         handleSubmit,
//         setFieldValue,
//       }) => (
//         <form onSubmit={handleSubmit}>
//           <Box mb="30px">
//             <Grid container horizontal_spacing={6} vertical_spacing={4}>
//               <Grid item md={6} xs={12}>
//                 <TextField
//                   fullwidth
//                   name="name"
//                   label="Name"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   value={values.name}
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
//                   type="date"
//                   name="birthdate"
//                   label="Birth Date"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   value={values.birthdate}
//                   errorText={touched.birthdate && errors.birthdate}
//                 />
//               </Grid>

//               <Grid item md={6} xs={12}>
//                 <Select
//                   fullwidth
//                   name="gender"
//                   label="Gender"
//                   options={[
//                     { label: "Male", value: "male" },
//                     { label: "Female", value: "female" },
//                     { label: "Other", value: "other" },
//                   ]}
//                   onBlur={handleBlur}
//                   onChange={(e: { value: string; label: string }) =>
//                     handleGender(e.value, setFieldValue)
//                   }
//                   value={values.gender}
//                   errorText={touched.gender && errors.gender}
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

// "use client";
// import * as yup from "yup";
// import { Formik } from "formik";
// import { format } from "date-fns";
// import { useState, useEffect } from "react";
// import axios from "axios";

// import Box from "@component/Box";
// import Grid from "@component/grid/Grid";
// import { Button } from "@component/buttons";
// import TextField from "@component/text-field";
// import Select from "@component/Select";
// import { useRouter } from "next/navigation";
//const router = useRouter();

// const API_URL = "https://frontend.tizaraa.com/api/user/profile";
// const UPDATE_API_URL = "https://frontend.tizaraa.com/api/user/profile/update";

// export default function ProfileEditForm() {
//   const router = useRouter();
//   const [profile, setProfile] = useState({
//     name: "",
//     phone: "",
//     birthdate: "",
//     gender: "",
//   }); // State to hold the user data
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(""); // Error state

//   const fetchUserProfile = async () => {
//     const authtoken = localStorage.getItem("token");

//     try {
//       const response = await axios.get(API_URL, {
//         headers: {
//           Authorization: `Bearer ${authtoken}`,
//         },
//       });

//       const userProfile = response.data.profile;

//       // Update state with the fetched user profile data
//       setProfile({
//         name: userProfile.name || "",
//         phone: userProfile.phone || "",
//         birthdate: userProfile.birthdate
//           ? format(new Date(userProfile.birthdate), "mm/dd/yyyy")
//           : "",
//         gender: userProfile.gender || "",
//       });

//       setLoading(false);
//     } catch (err) {
//       setError("Failed to load user profile");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   const INITIAL_VALUES = {
//     name: profile.name,
//     phone: profile.phone,
//     birthdate: profile.birthdate,
//     gender: profile.gender,
//   };

//   const VALIDATION_SCHEMA = yup.object().shape({
//     name: yup.string().required("Name is required"),
//     phone: yup.string().required("Phone is required"),
//     birthdate: yup.date().required("Birthdate is required"),
//     gender: yup.string().required("Gender is required"),
//   });

//   const handleFormSubmit = async (values: typeof INITIAL_VALUES) => {
//     const authtoken = localStorage.getItem("token");
//     try {
//       const response = await axios.post(
//         UPDATE_API_URL,
//         {
//           name: values.name,
//           phone: values.phone,
//           birthdate: values.birthdate,
//           gender: values.gender,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${authtoken}`,
//           },
//         }
//       );
//       console.log("Profile updated successfully:");
//       router.push("/profile")
//     } catch (err) {
//       console.error("Failed to update profile:", err);
//     }
//   };

//   const handleGender = (gender: string, setFieldValue: any) => {
//     setFieldValue("gender", gender);
//   };

//   return (
//     <Formik
//       onSubmit={handleFormSubmit}
//       initialValues={INITIAL_VALUES}
//       validationSchema={VALIDATION_SCHEMA}
//       enableReinitialize={true} // Ensures form initializes when data is fetched
//     >
//       {({
//         values,
//         errors,
//         touched,
//         handleChange,
//         handleBlur,
//         handleSubmit,
//         setFieldValue,
//       }) => (
//         <form onSubmit={handleSubmit}>
//           <Box mb="30px">
//             <Grid container horizontal_spacing={6} vertical_spacing={4}>
//               <Grid item md={6} xs={12}>
//                 <TextField
//                   fullwidth
//                   name="name"
//                   label="Name"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   value={values.name}
//                   errorText={touched.name && errors.name}
//                 />
//               </Grid>

//               <Grid item md={6} xs={12}>
//                 <TextField
//                   fullwidth
//                   label="Phone"
//                   name="phone"
//                   onBlur={handleBlur}
//                   value={values.phone}
//                   onChange={handleChange}
//                   errorText={touched.phone && errors.phone}
//                 />
//               </Grid>

//               <Grid item md={6} xs={12}>
//                 <TextField
//                   fullwidth
//                   type="date"
//                   name="birthdate"
//                   label="Birth Date"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   value={values.birthdate}
//                   errorText={touched.birthdate && errors.birthdate}
//                 />
//               </Grid>

//               <Grid item md={6} xs={12}>
//                 <Select
//                   fullwidth
//                   name="gender"
//                   label="Gender"
//                   options={[
//                     { label: "Male", value: "male" },
//                     { label: "Female", value: "female" },
//                     { label: "Other", value: "other" },
//                   ]}
//                   onBlur={handleBlur}
//                   onChange={(e: { value: string; label: string }) =>
//                     handleGender(e.value, setFieldValue)
//                   }
//                   value={values.gender}
//                   errorText={touched.gender && errors.gender}
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
import * as yup from "yup";
import { Formik } from "formik";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import axios from "axios";
import ApiBaseUrl from "api/ApiBaseUrl";

import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import Select from "@component/Select";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Vortex } from 'react-loader-spinner'
import  styled from "@emotion/styled";

//const API_URL = "https://frontend.tizaraa.com/api/user/profile";
const API_URL = `${ApiBaseUrl.baseUrl}user/profile`
//const UPDATE_API_URL = "https://frontend.tizaraa.com/api/user/profile/update";
const UPDATE_API_URL = `${ApiBaseUrl.baseUrl}user/profile/update`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ProfileEditForm() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    birth_date: "",
    gender: "",
  }); // State to hold the user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  const fetchUserProfile = async () => {
    const authtoken = localStorage.getItem("token");

    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${authtoken}`,
        },
      });

      const userProfile = response.data.profile;
      //console.log(response.data);
      

      // Update state with the fetched user profile data
      setProfile({
        name: userProfile.name || "",
        phone: userProfile.phone || "",
        birth_date: userProfile.birth_date,
        gender: userProfile.gender || "",
      });

      setLoading(false);
    } catch (err) {
      setError("Failed to load user profile");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading)
    return (
      <LoaderWrapper>
        <Vortex />
      </LoaderWrapper>
    );
  if (error) return <p>{error}</p>;

  const INITIAL_VALUES = {
    name: profile.name,
    phone: profile.phone,
    birth_date: profile.birth_date,
    gender: profile.gender,
  };

  const VALIDATION_SCHEMA = yup.object().shape({
    name: yup.string().required("Name is required"),
    phone: yup.string().required("Phone is required"),
    birth_date: yup.date().required("Birthdate is required"),
    gender: yup.string().required("Gender is required"),
  });

  const handleFormSubmit = async (values: typeof INITIAL_VALUES) => {
    const authtoken = localStorage.getItem("token");
    try {
      const response = await axios.post(
        UPDATE_API_URL,
        {
          name: values.name,
          phone: values.phone,
          birthdate: values.birth_date,
          gender: values.gender,
        },
        {
          headers: {
            Authorization: `Bearer ${authtoken}`,
          },
        }
      );
      //console.log("Profile updated successfully:", response.data);
      toast.success("Profile updated successfully!");
      //router.push("/profile")
      router.back()
    } catch (err) {
      //console.error("Failed to update profile:", err);
      toast.error("Failed to update profile.");
    }
  };

  const handleGender = (gender: string, setFieldValue: any) => {
    setFieldValue("gender", gender);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={INITIAL_VALUES}
      validationSchema={VALIDATION_SCHEMA}
      enableReinitialize={true} // Ensures form initializes when data is fetched
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
          <Box mb="30px">
            <Grid container horizontal_spacing={6} vertical_spacing={4}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullwidth
                  name="name"
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  errorText={touched.name && errors.name}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullwidth
                  label="Phone"
                  name="phone"
                  onBlur={handleBlur}
                  value={values.phone}
                  onChange={handleChange}
                  errorText={touched.phone && errors.phone}
                />
              </Grid>

              <Grid item md={6} xs={12}>
              {/* <TextField
                  fullwidth
                  type="date"
                  name="birth_date"
                  label="Birth Date"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.birth_date} // Birthdate now correctly set
                  errorText={touched.birth_date && errors.birth_date}
                /> */}
                 <TextField
                fullwidth
                type="date"
                name="birth_date"
                label="Birth Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.birth_date}
                errorText={touched.birth_date && errors.birth_date}
                max={format(new Date(), "yyyy-MM-dd")} // Prevents future dates
              />
              </Grid>

              <Grid item md={6} xs={12}>
                <Select
                  fullwidth
                  name="gender"
                  label="Gender"
                  options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Other", value: "other" },
                  ]}
                  onBlur={handleBlur}
                  onChange={(e: { value: string; label: string }) =>
                    handleGender(e.value, setFieldValue)
                  }
                  // Ensure the `value` matches one of the options
                  value={{
                    label:
                      values.gender === "male"
                        ? "Male"
                        : values.gender === "female"
                        ? "Female"
                        : "Other",
                    value: values.gender,
                  }}
                  errorText={touched.gender && errors.gender}
                />
              </Grid>
            </Grid>
          </Box>

          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </form>
      )}
    </Formik>
  );
}



