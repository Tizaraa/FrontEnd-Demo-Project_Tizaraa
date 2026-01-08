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

// "use client";
// import * as yup from "yup";
// import { Formik } from "formik";
// import { format } from "date-fns";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import ApiBaseUrl from "api/ApiBaseUrl";

// import Box from "@component/Box";
// import Grid from "@component/grid/Grid";
// import { Button } from "@component/buttons";
// import TextField from "@component/text-field";
// import Select from "@component/Select";
// import { useRouter } from "next/navigation";
// import toast, { Toaster } from "react-hot-toast";
// import { Vortex } from 'react-loader-spinner'
// import  styled from "@emotion/styled";

// //const API_URL = "https://frontend.tizaraa.com/api/user/profile";
// const API_URL = `${ApiBaseUrl.baseUrl}user/profile`
// //const UPDATE_API_URL = "https://frontend.tizaraa.com/api/user/profile/update";
// const UPDATE_API_URL = `${ApiBaseUrl.baseUrl}user/profile/update`;

// const LoaderWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// export default function ProfileEditForm() {
//   const router = useRouter();
//   const [profile, setProfile] = useState({
//     name: "",
//     phone: "",
//     birth_date: "",
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
//       //console.log(response.data);

//       // Update state with the fetched user profile data
//       setProfile({
//         name: userProfile.name || "",
//         phone: userProfile.phone || "",
//         birth_date: userProfile.birth_date,
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

//   if (loading)
//     return (
//       <LoaderWrapper>
//         <Vortex />
//       </LoaderWrapper>
//     );
//   if (error) return <p>{error}</p>;

//   const INITIAL_VALUES = {
//     name: profile.name,
//     phone: profile.phone,
//     birth_date: profile.birth_date,
//     gender: profile.gender,
//   };

//   const VALIDATION_SCHEMA = yup.object().shape({
//     name: yup.string().required("Name is required"),
//     phone: yup.string().required("Phone is required"),
//     birth_date: yup.date().required("Birthdate is required"),
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
//           birthdate: values.birth_date,
//           gender: values.gender,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${authtoken}`,
//           },
//         }
//       );
//       //console.log("Profile updated successfully:", response.data);
//       toast.success("Profile updated successfully!");
//       //router.push("/profile")
//       router.back()
//     } catch (err) {
//       //console.error("Failed to update profile:", err);
//       toast.error("Failed to update profile.");
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
//               {/* <TextField
//                   fullwidth
//                   type="date"
//                   name="birth_date"
//                   label="Birth Date"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   value={values.birth_date} // Birthdate now correctly set
//                   errorText={touched.birth_date && errors.birth_date}
//                 /> */}
//                  <TextField
//                 fullwidth
//                 type="date"
//                 name="birth_date"
//                 label="Birth Date"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.birth_date}
//                 errorText={touched.birth_date && errors.birth_date}
//                 max={format(new Date(), "yyyy-MM-dd")} // Prevents future dates
//               />
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
//                   // Ensure the `value` matches one of the options
//                   value={{
//                     label:
//                       values.gender === "male"
//                         ? "Male"
//                         : values.gender === "female"
//                         ? "Female"
//                         : "Other",
//                     value: values.gender,
//                   }}
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
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Vortex } from "react-loader-spinner";

// Tailwind CSS styles with two-column grid
const styles = `
  .form-container {
    border-radius: 1.5rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  .form-title {
    font-size: 2.25rem;
    font-weight: 800;
    color: #1F2A44;
    text-align: center;
    margin-bottom: 2rem;
    background: linear-gradient(to right, #E94560, #E94560);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .input-wrapper {
    position: relative;
    margin-bottom: 1.5rem;
  }
  .input-field {
    width: 100%;
    padding: 1rem;
    border: 2px solid transparent;
    border-radius: 0.75rem;
    background: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  .input-field:focus {
    outline: none;
    border-color: #E94560;
    background: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(233, 69, 96, 0.3);
  }
  .input-label {
    position: absolute;
    top: -0.75rem;
    left: 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #E94560;
    background: white;
    padding: 0 0.5rem;
    transition: all 0.3s ease;
  }
  .input-field:placeholder-shown + .input-label {
    top: 1rem;
    font-size: 1rem;
    color: #6B7280;
    font-weight: 400;
  }
  .input-field:focus + .input-label,
  .input-field:not(:placeholder-shown) + .input-label {
    top: -0.75rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #E94560;
  }
  .error-text {
    color: #DC2626;
    font-size: 0.75rem;
    margin-top: 0.25rem;
    animation: fadeIn 0.3s ease;
  }
  .select-field {
    width: 100%;
    padding: 1rem;
    border: 2px solid transparent;
    border-radius: 0.75rem;
    background: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23E94560' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1.5rem;
  }
  .select-field:focus {
    outline: none;
    border-color: #E94560;
    background: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(233, 69, 96, 0.3);
  }
  .file-input {
    width: 100%;
    padding: 1rem;
    border: 2px solid transparent;
    border-radius: 0.75rem;
    background: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  .file-input:focus {
    outline: none;
    border-color: #E94560;
    background: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(233, 69, 96, 0.3);
  }
  .submit-button {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(to right, #E94560, #E94560);
    color: white;
    font-weight: 700;
    font-size: 1.125rem;
    border-radius: 0.75rem;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .submit-button:hover {
    background: linear-gradient(to right, #D43A53, #E94560);
    transform: translateY(-2px);
  }
  .submit-button:disabled {
    background: linear-gradient(to right, #F3A8B6, #FBCFA8);
    cursor: not-allowed;
    transform: none;
  }
  .cancel-button {
    width: 100%;
    padding: 1rem;
    background: #6B7280;
    color: white;
    font-weight: 700;
    font-size: 1.125rem;
    border-radius: 0.75rem;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .cancel-button:hover {
    background: #4B5563;
    transform: translateY(-2px);
  }
  .button-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 1.5rem;
  }
  .loader-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
    background: linear-gradient(135deg, #E94560, #F28C38);
    border-radius: 1rem;
  }
  .grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: .5rem;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @media (max-width: 640px) {
    .form-container {
      margin: 1rem;
      padding: 1.5rem;
    }
    .form-title {
      font-size: 1.875rem;
    }
    .grid-container {
      grid-template-columns: 1fr;
    }
    .input-field, .select-field, .file-input {
      padding: 0.875rem;
    }
    .button-grid {
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }
  }
`;

const API_URL = `${ApiBaseUrl.baseUrl}user/profile`;
const UPDATE_API_URL = `${ApiBaseUrl.baseUrl}user/profile/update`;

export default function ProfileEditForm() {
 const router = useRouter();
 const [profile, setProfile] = useState({
  name: "",
  phone: "",
  birth_date: "",
  gender: "",
  image: null as File | null,
 });
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState("");

 const fetchUserProfile = async () => {
  const authtoken = localStorage.getItem("token");
  try {
   const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${authtoken}` },
   });
   const userProfile = response.data.profile;
   setProfile({
    name: userProfile.name || "",
    phone: userProfile.phone || "",
    birth_date: userProfile.birth_date || "",
    gender: userProfile.gender || "",
    image: null,
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

 if (loading) {
  return (
   <div className="loader-wrapper">
    <div className="loader"></div>
   </div>
  );
 }
 if (error) {
  return <p className="text-red-600 text-center font-semibold">{error}</p>;
 }

 const INITIAL_VALUES = {
  name: profile.name,
  phone: profile.phone,
  birth_date: profile.birth_date,
  gender: profile.gender,
  image: null as File | null,
 };

 const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone is required"),
  birth_date: yup.date().required("Birthdate is required"),
  gender: yup.string().required("Gender is required"),
 });

 const handleFormSubmit = async (values: typeof INITIAL_VALUES) => {
  const authtoken = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("phone", values.phone);
  formData.append("birthdate", values.birth_date);
  formData.append("gender", values.gender);
  if (values.image) {
   formData.append("image", values.image);
  }

  try {
   await axios.post(UPDATE_API_URL, formData, {
    headers: {
     Authorization: `Bearer ${authtoken}`,
     "Content-Type": "multipart/form-data",
    },
   });
   toast.success("Profile updated successfully!", {
    position: "top-center",
   });
   router.back();
  } catch (err) {
   toast.error("Failed to update profile.", {
    position: "top-center",
   });
  }
 };

 const handleGender = (gender: string, setFieldValue: any) => {
  setFieldValue("gender", gender);
 };

 const handleCancel = () => {
  router.back();
 };

 return (
  <>
   <style>{styles}</style>
   <Toaster />
   <div className="form-container">
    <h2 className="form-title">Edit Profile</h2>
    <Formik
     onSubmit={handleFormSubmit}
     initialValues={INITIAL_VALUES}
     validationSchema={VALIDATION_SCHEMA}
     enableReinitialize={true}
    >
     {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue,
      isSubmitting,
     }) => (
      <form onSubmit={handleSubmit}>
       <div className="grid-container">
        <div className="input-wrapper">
         <input
          id="name"
          name="name"
          type="text"
          className="input-field"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          placeholder=" "
         />
         <label htmlFor="name" className="input-label">
          Name
         </label>
         {touched.name && errors.name && (
          <p className="error-text">{errors.name}</p>
         )}
        </div>

        <div className="input-wrapper">
         <input
          id="phone"
          name="phone"
          type="text"
          className="input-field"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.phone}
          placeholder=" "
         />
         <label htmlFor="phone" className="input-label">
          Phone
         </label>
         {touched.phone && errors.phone && (
          <p className="error-text">{errors.phone}</p>
         )}
        </div>

        <div className="input-wrapper">
         <input
          id="birth_date"
          name="birth_date"
          type="date"
          className="input-field"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.birth_date}
          max={format(new Date(), "yyyy-MM-dd")}
          placeholder=" "
         />
         <label htmlFor="birth_date" className="input-label">
          Birth Date
         </label>
         {touched.birth_date && errors.birth_date && (
          <p className="error-text">{errors.birth_date}</p>
         )}
        </div>

        <div className="input-wrapper">
         <select
          id="gender"
          name="gender"
          className="select-field"
          onChange={(e) => handleGender(e.target.value, setFieldValue)}
          onBlur={handleBlur}
          value={values.gender}
         >
          <option value="" disabled>
           Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
         </select>
         <label htmlFor="gender" className="input-label">
          Gender
         </label>
         {touched.gender && errors.gender && (
          <p className="error-text">{errors.gender}</p>
         )}
        </div>
       </div>

       <div className="input-wrapper">
        <input
         id="image"
         name="image"
         type="file"
         accept="image/jpeg,image/png,image/gif"
         className="file-input"
         onChange={(event) => {
          const file = event.currentTarget.files?.[0] || null;
          setFieldValue("image", file);
         }}
         onBlur={handleBlur}
        />
        <label htmlFor="image" className="input-label">
         Upload Image
        </label>
       </div>

       <div className="button-grid">
        <button type="button" className="cancel-button" onClick={handleCancel}>
         Cancel
        </button>
        <button type="submit" className="submit-button" disabled={isSubmitting}>
         {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
       </div>
      </form>
     )}
    </Formik>
   </div>
  </>
 );
}
