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
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ApiBaseUrl from "api/ApiBaseUrl";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Edit profile: photo card, read-only account card, personal details card and a
// sticky save bar. Only Tizaraa tokens (--tz-*) for colour. Motion is
// transform/opacity, plays once, and is off for reduced motion.
const styles = `
  @keyframes pef-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
  @keyframes pef-pop { 0% { opacity: 0; transform: scale(.7); } 70% { opacity: 1; transform: scale(1.05); } 100% { opacity: 1; transform: none; } }
  @keyframes pef-spin { to { transform: rotate(360deg); } }
  @keyframes pef-shimmer { from { background-position: -400px 0; } to { background-position: 400px 0; } }
  @keyframes pef-blink { 0%, 100% { opacity: 1; } 50% { opacity: .35; } }

  .pef { display: flex; flex-direction: column; gap: 20px; }

  .pef-card {
    position: relative;
    padding: 24px;
    border: 1px solid var(--tz-line);
    border-radius: 18px;
    background: var(--tz-paper);
    box-shadow: 0 1px 2px rgba(20, 21, 32, .04);
    animation: pef-rise 480ms cubic-bezier(.22, 1, .36, 1) both;
    animation-delay: calc(var(--d, 0) * 90ms);
  }
  .pef-card-head { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
  .pef-card-icon {
    display: inline-flex; align-items: center; justify-content: center;
    width: 36px; height: 36px; flex-shrink: 0;
    border-radius: 10px;
    background: var(--tz-ember-tint);
    color: var(--tz-ember-deep);
  }
  .pef-card-icon svg { width: 18px; height: 18px; }
  .pef-card-title { margin: 0; font-family: var(--tz-font-display); font-size: 18px; font-weight: 700; color: var(--tz-ink); }
  .pef-card-sub { margin: 2px 0 0; font-size: 13px; color: var(--tz-slate); }

  /* Photo */
  .pef-photo {
    display: flex; align-items: center; gap: 24px;
    overflow: hidden;
    background:
      radial-gradient(60% 140% at 0% 0%, var(--tz-ember-tint) 0%, transparent 70%),
      linear-gradient(135deg, #fff8f4 0%, var(--tz-paper) 60%);
  }
  .pef-photo.is-drag { border-color: var(--tz-ember); box-shadow: var(--tz-focus-ring); }
  .pef-avatar-wrap { position: relative; flex-shrink: 0; animation: pef-pop 560ms cubic-bezier(.22, 1, .36, 1) 120ms both; }
  .pef-avatar {
    width: 104px; height: 104px;
    padding: 4px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--tz-ember), #ffb38a);
  }
  .pef-avatar-inner {
    display: flex; align-items: center; justify-content: center;
    width: 100%; height: 100%;
    overflow: hidden;
    border: 3px solid var(--tz-paper);
    border-radius: 50%;
    background: var(--tz-navy-tint);
    color: var(--tz-navy);
    font-family: var(--tz-font-display);
    font-size: 32px; font-weight: 700;
  }
  .pef-avatar-inner img { width: 100%; height: 100%; object-fit: cover; }
  .pef-cam {
    position: absolute; right: 2px; bottom: 2px;
    display: inline-flex; align-items: center; justify-content: center;
    width: 34px; height: 34px;
    border: 3px solid var(--tz-paper);
    border-radius: 50%;
    background: var(--tz-ember-deep);
    color: #fff;
    cursor: pointer;
    transition: transform 220ms cubic-bezier(.22, 1, .36, 1), background-color var(--tz-motion-fast);
  }
  .pef-cam:hover { transform: scale(1.1); background: var(--tz-ember-dark); }
  .pef-cam:focus-visible { outline: none; box-shadow: var(--tz-focus-ring); }
  .pef-cam svg { width: 16px; height: 16px; }
  .pef-photo-text { min-width: 0; }
  .pef-photo-name { margin: 0; font-family: var(--tz-font-display); font-size: 20px; font-weight: 700; color: var(--tz-ink); }
  .pef-photo-hint { margin: 4px 0 12px; font-size: 13px; color: var(--tz-slate); }
  .pef-photo-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
  .pef-btn-soft, .pef-btn-link {
    display: inline-flex; align-items: center; gap: 6px;
    min-height: 36px; padding: 0 14px;
    border-radius: 999px;
    font-family: inherit; font-size: 13px; font-weight: 700;
    cursor: pointer;
    transition: background-color var(--tz-motion-fast), color var(--tz-motion-fast), border-color var(--tz-motion-fast);
  }
  .pef-btn-soft { border: 1px solid var(--tz-ember-tint); background: var(--tz-ember-tint); color: var(--tz-ember-deep); }
  .pef-btn-soft:hover { background: var(--tz-ember-deep); border-color: var(--tz-ember-deep); color: #fff; }
  .pef-btn-link { border: 1px solid transparent; background: transparent; color: var(--tz-slate); }
  .pef-btn-link:hover { color: var(--tz-danger); background: var(--tz-danger-bg); }
  .pef-btn-soft:focus-visible, .pef-btn-link:focus-visible { outline: none; box-shadow: var(--tz-focus-ring); }
  .pef-btn-soft svg, .pef-btn-link svg { width: 14px; height: 14px; }
  .pef-new { font-size: 12px; font-weight: 600; color: var(--tz-success); }

  /* Fields */
  .pef-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px 20px; }
  .pef-field { display: flex; flex-direction: column; gap: 7px; min-width: 0; }
  .pef-field--full { grid-column: 1 / -1; }
  .pef-label { display: flex; justify-content: space-between; gap: 8px; font-size: 13px; font-weight: 600; color: var(--tz-ink-soft); }
  .pef-label small { font-weight: 500; color: var(--tz-slate); }
  .pef-control { position: relative; display: flex; align-items: center; }
  .pef-control > .pef-ico {
    position: absolute; left: 14px;
    display: inline-flex; color: var(--tz-slate);
    pointer-events: none;
    transition: color var(--tz-motion-fast);
  }
  .pef-control > .pef-ico svg { width: 18px; height: 18px; }
  .pef-control:focus-within > .pef-ico { color: var(--tz-ember-deep); }
  .pef-input {
    width: 100%; min-height: 48px;
    padding: 12px 40px 12px 44px;
    border: 1px solid var(--tz-line);
    border-radius: 12px;
    background: var(--tz-paper);
    color: var(--tz-ink);
    font-family: inherit; font-size: 15px;
    transition: border-color var(--tz-motion-fast), box-shadow var(--tz-motion-fast), background-color var(--tz-motion-fast);
  }
  .pef-input:hover { border-color: var(--tz-slate); }
  .pef-input:focus { outline: none; border-color: var(--tz-ember); box-shadow: var(--tz-focus-ring); }
  .pef-input[readonly] { background: var(--tz-mist); color: var(--tz-ink-soft); cursor: default; }
  .pef-input[readonly]:hover { border-color: var(--tz-line); }
  .pef-field.is-error .pef-input { border-color: var(--tz-danger); background: #fffafa; }
  .pef-field.is-error .pef-ico { color: var(--tz-danger); }
  .pef-input--phone { padding-left: 112px; }
  .pef-prefix {
    position: absolute; left: 44px;
    display: inline-flex; align-items: center; gap: 6px;
    padding-right: 10px;
    border-right: 1px solid var(--tz-line);
    font-size: 14px; font-weight: 600; color: var(--tz-ink-soft);
    pointer-events: none;
  }
  .pef-ok {
    position: absolute; right: 14px;
    display: inline-flex; align-items: center; justify-content: center;
    width: 20px; height: 20px;
    border-radius: 50%;
    background: var(--tz-success-bg); color: var(--tz-success);
    animation: pef-pop 320ms cubic-bezier(.22, 1, .36, 1) both;
    pointer-events: none;
  }
  .pef-ok svg { width: 12px; height: 12px; }
  .pef-badge {
    position: absolute; right: 12px;
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 9px;
    border-radius: 999px;
    font-size: 11px; font-weight: 700;
  }
  .pef-badge svg { width: 12px; height: 12px; }
  .pef-badge--ok { background: var(--tz-success-bg); color: var(--tz-success); }
  .pef-badge--warn { background: var(--tz-warning-bg); color: var(--tz-warning); }
  .pef-input--email { padding-right: 110px; }
  .pef-help { margin: 0; font-size: 12px; color: var(--tz-slate); }
  .pef-error { display: flex; align-items: center; gap: 6px; margin: 0; font-size: 12.5px; font-weight: 500; color: var(--tz-danger); animation: pef-rise 240ms ease both; }
  .pef-error svg { width: 14px; height: 14px; flex-shrink: 0; }
  .pef-count { font-variant-numeric: tabular-nums; }
  .pef-count.is-full { color: var(--tz-success); }

  /* Gender pills */
  .pef-seg {
    position: relative;
    display: grid; grid-template-columns: repeat(3, 1fr);
    padding: 4px;
    min-height: 48px;
    border: 1px solid var(--tz-line);
    border-radius: 12px;
    background: var(--tz-mist);
  }
  .pef-field.is-error .pef-seg { border-color: var(--tz-danger); }
  .pef-seg-thumb {
    position: absolute; top: 4px; bottom: 4px; left: 4px;
    width: calc((100% - 8px) / 3);
    border-radius: 9px;
    background: var(--tz-paper);
    box-shadow: 0 2px 8px rgba(194, 64, 15, .14), 0 0 0 1px var(--tz-ember-tint);
    transition: transform 320ms cubic-bezier(.22, 1, .36, 1), opacity 200ms ease;
  }
  .pef-seg button {
    position: relative; z-index: 1;
    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
    border: 0; border-radius: 9px;
    background: transparent;
    color: var(--tz-slate);
    font-family: inherit; font-size: 14px; font-weight: 600;
    cursor: pointer;
    transition: color var(--tz-motion-fast);
  }
  .pef-seg button svg { width: 14px; height: 14px; flex-shrink: 0; animation: pef-pop 280ms cubic-bezier(.22, 1, .36, 1) both; }
  .pef-seg button:hover { color: var(--tz-ink); }
  .pef-seg button[aria-checked="true"] { color: var(--tz-ember-deep); }
  .pef-seg button:focus-visible { outline: none; box-shadow: var(--tz-focus-ring); }

  /* Save bar */
  .pef-bar {
    position: sticky; bottom: 16px; z-index: 5;
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
    padding: 14px 16px 14px 20px;
    border: 1px solid var(--tz-line);
    border-radius: 16px;
    background: rgba(255, 255, 255, .92);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 10px 30px rgba(14, 52, 96, .10);
    animation: pef-rise 480ms cubic-bezier(.22, 1, .36, 1) 300ms both;
    transition: border-color 240ms ease, box-shadow 240ms ease;
  }
  .pef-bar.is-dirty { border-color: #f9c4ae; box-shadow: 0 10px 30px rgba(194, 64, 15, .14); }
  .pef-status { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: var(--tz-slate); }
  .pef-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--tz-line); }
  .pef-bar.is-dirty .pef-status { color: var(--tz-ember-deep); }
  .pef-bar.is-dirty .pef-dot { background: var(--tz-ember); animation: pef-blink 1.4s ease-in-out infinite; }
  .pef-actions { display: flex; gap: 10px; }
  .pef-cancel, .pef-save {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    min-height: 46px; padding: 0 22px;
    border-radius: 12px;
    font-family: inherit; font-size: 15px; font-weight: 700;
    cursor: pointer;
    transition: background-color var(--tz-motion-fast), border-color var(--tz-motion-fast), transform 160ms ease, box-shadow var(--tz-motion-fast);
  }
  .pef-cancel { border: 1px solid var(--tz-line); background: var(--tz-paper); color: var(--tz-ink); }
  .pef-cancel:hover { border-color: var(--tz-slate); background: var(--tz-mist); }
  .pef-save {
    border: 1px solid var(--tz-ember-deep);
    background: var(--tz-ember-deep);
    color: #fff;
    box-shadow: 0 6px 16px rgba(194, 64, 15, .28);
  }
  .pef-save:hover:enabled { background: var(--tz-ember-dark); border-color: var(--tz-ember-dark); transform: translateY(-1px); }
  .pef-save:active:enabled { transform: none; }
  .pef-save:disabled { opacity: .55; box-shadow: none; cursor: not-allowed; }
  .pef-cancel:focus-visible, .pef-save:focus-visible { outline: none; box-shadow: var(--tz-focus-ring); }
  .pef-spinner { width: 16px; height: 16px; border: 2px solid rgba(255, 255, 255, .45); border-top-color: #fff; border-radius: 50%; animation: pef-spin 700ms linear infinite; }

  /* Loading / error */
  .pef-skel {
    border-radius: 18px;
    background: linear-gradient(90deg, var(--tz-mist) 0%, var(--tz-line-soft) 50%, var(--tz-mist) 100%);
    background-size: 800px 100%;
    animation: pef-shimmer 1.3s linear infinite;
  }
  .pef-fail { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; padding: 20px; border: 1px solid var(--tz-danger-bg); border-radius: 18px; background: var(--tz-paper); }
  .pef-fail strong { display: block; color: var(--tz-ink); }
  .pef-fail span { font-size: 14px; color: var(--tz-slate); }

  .pef-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

  @media (max-width: 640px) {
    .pef-card { padding: 18px; }
    .pef-photo { flex-direction: column; text-align: center; }
    .pef-photo-actions { justify-content: center; }
    .pef-grid { grid-template-columns: 1fr; }
    .pef-bar { flex-direction: column; align-items: stretch; bottom: 8px; }
    .pef-status { justify-content: center; }
    .pef-actions { flex-direction: column-reverse; }
  }

  @media (prefers-reduced-motion: reduce) {
    .pef-card, .pef-avatar-wrap, .pef-ok, .pef-error, .pef-bar, .pef-skel, .pef-dot, .pef-bar.is-dirty .pef-dot { animation: none !important; }
    .pef-seg-thumb, .pef-cam, .pef-save, .pef-input { transition: none; }
  }
`;

// Inline icons (stroke = currentColor)
const Svg = ({ d, children }: { d?: string; children?: React.ReactNode }) => (
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  {d ? <path d={d} /> : children}
 </svg>
);
const I = {
 user: <Svg><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Svg>,
 phone: <Svg d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />,
 cal: <Svg><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></Svg>,
 mail: <Svg><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></Svg>,
 cam: <Svg><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></Svg>,
 upload: <Svg d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />,
 trash: <Svg d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />,
 check: <Svg d="M20 6 9 17l-5-5" />,
 alert: <Svg><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></Svg>,
 shield: <Svg d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
 id: <Svg><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="11" r="2.5" /><path d="M15 9h3M15 13h3M6 17c.6-1.5 1.8-2.5 3-2.5s2.4 1 3 2.5" /></Svg>,
};

const API_URL = `${ApiBaseUrl.localApiUrl}user/profile`;
const UPDATE_API_URL = `${ApiBaseUrl.localApiUrl}user/profile/update`;
const MAX_IMAGE_BYTES = 2 * 1024 * 1024; // backend: image|max:2048
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];
const GENDERS = [
 { value: "male", label: "Male" },
 { value: "female", label: "Female" },
 { value: "other", label: "Other" },
];

function initialsOf(name?: string) {
 const parts = (name || "").trim().split(/\s+/).filter(Boolean);
 if (!parts.length) return "?";
 return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

function Skeleton() {
 return (
  <div className="pef" aria-busy="true" aria-label="Loading your profile">
   <div className="pef-skel" style={{ height: 152 }} />
   <div className="pef-skel" style={{ height: 130 }} />
   <div className="pef-skel" style={{ height: 260 }} />
  </div>
 );
}

export default function ProfileEditForm() {
 const router = useRouter();
 const fileRef = useRef<HTMLInputElement>(null);
 const [profile, setProfile] = useState({
  name: "",
  email: "",
  emailVerified: false,
  imageUrl: "",
  phone: "",
  birth_date: "",
  gender: "",
  image: null as File | null,
 });
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState("");
 const [preview, setPreview] = useState<string | null>(null);
 const [dragging, setDragging] = useState(false);

 const fetchUserProfile = async () => {
  const authtoken = localStorage.getItem("token");
  setLoading(true);
  setError("");
  try {
   const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${authtoken}` },
   });
   const userProfile = response.data.profile;
   setProfile({
    name: userProfile.name || "",
    email: userProfile.email || "",
    emailVerified: Boolean(userProfile.email_verified_at),
    imageUrl: userProfile.image ? `${ApiBaseUrl.ImgUrl}${userProfile.image}` : "",
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

 // Free the object URL when the preview changes or the form unmounts
 useEffect(() => {
  return () => {
   if (preview) URL.revokeObjectURL(preview);
  };
 }, [preview]);

 if (loading) {
  return (
   <>
    <style>{styles}</style>
    <Skeleton />
   </>
  );
 }
 if (error) {
  return (
   <>
    <style>{styles}</style>
    <div className="pef-fail" role="alert">
     <div>
      <strong>We couldn't load your profile</strong>
      <span>Check your connection and try again.</span>
     </div>
     <button type="button" className="pef-save" onClick={fetchUserProfile}>
      Try again
     </button>
    </div>
   </>
  );
 }

 const INITIAL_VALUES = {
  name: profile.name,
  phone: profile.phone,
  birth_date: profile.birth_date,
  gender: profile.gender,
  image: null as File | null,
 };

 const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().trim().required("Name is required"),
  phone: yup
   .string()
   .required("Phone is required")
   .matches(/^01[3-9]\d{8}$/, "Enter a valid 11-digit phone number (e.g. 01712345678)"),
  birth_date: yup.date().required("Birthdate is required"),
  gender: yup.string().required("Gender is required"),
 });

 const handleFormSubmit = async (values: typeof INITIAL_VALUES) => {
  const authtoken = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("phone", values.phone);
  formData.append("birth_date", values.birth_date);
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
    position: "top-right",
   });
   router.back();
   router.refresh();
  } catch (err: any) {
   // Surface the server's validation message (e.g. phone already in use)
   const phoneError = err?.response?.data?.errors?.phone?.[0];
   const imageError = err?.response?.data?.errors?.image?.[0];
   toast.error(phoneError || imageError || "Failed to update profile.", {
    position: "top-right",
   });
  }
 };

 const handleCancel = () => {
  router.back();
 };

 return (
  <>
   <style>{styles}</style>
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
     dirty,
     handleChange,
     handleBlur,
     handleSubmit,
     setFieldValue,
     setFieldTouched,
     isSubmitting,
    }) => {
     const pickFile = (file?: File | null) => {
      if (!file) return;
      if (!IMAGE_TYPES.includes(file.type)) {
       toast.error("Please choose a JPG, PNG or GIF image.", { position: "top-right" });
       return;
      }
      if (file.size > MAX_IMAGE_BYTES) {
       toast.error("Photo must be 2MB or smaller.", { position: "top-right" });
       return;
      }
      setFieldValue("image", file);
      setPreview(URL.createObjectURL(file));
     };
     const clearFile = () => {
      setFieldValue("image", null);
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
     };

     const showErr = (k: keyof typeof INITIAL_VALUES) => Boolean(touched[k] && errors[k]);
     const showOk = (k: keyof typeof INITIAL_VALUES) => Boolean(touched[k] && !errors[k] && values[k]);
     const errorText = (k: keyof typeof INITIAL_VALUES) =>
      showErr(k) ? (
       <p className="pef-error" id={`${k}-error`}>
        {I.alert}
        {errors[k] as string}
       </p>
      ) : null;
     const okMark = (k: keyof typeof INITIAL_VALUES) =>
      showOk(k) ? <span className="pef-ok">{I.check}</span> : null;

     const genderIdx = GENDERS.findIndex((g) => g.value === values.gender);
     const avatarSrc = preview || profile.imageUrl;

     return (
      <form className="pef" onSubmit={handleSubmit} noValidate>
       {/* Photo */}
       <section
        className={`pef-card pef-photo${dragging ? " is-drag" : ""}`}
        style={{ ["--d" as any]: 0 }}
        onDragOver={(e) => {
         e.preventDefault();
         setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
         e.preventDefault();
         setDragging(false);
         pickFile(e.dataTransfer.files?.[0]);
        }}
        aria-label="Profile photo"
       >
        <div className="pef-avatar-wrap">
         <div className="pef-avatar">
          <div className="pef-avatar-inner">
           {avatarSrc ? <img src={avatarSrc} alt="Your profile photo" /> : initialsOf(values.name || profile.email)}
          </div>
         </div>
         <button
          type="button"
          className="pef-cam"
          onClick={() => fileRef.current?.click()}
          aria-label="Change profile photo"
         >
          {I.cam}
         </button>
        </div>

        <div className="pef-photo-text">
         <p className="pef-photo-name">{values.name || "Your name"}</p>
         <p className="pef-photo-hint">JPG, PNG or GIF, up to 2MB. Drag a photo here or upload one.</p>
         <div className="pef-photo-actions">
          <button type="button" className="pef-btn-soft" onClick={() => fileRef.current?.click()}>
           {I.upload}
           {avatarSrc ? "Change photo" : "Upload photo"}
          </button>
          {preview && (
           <>
            <button type="button" className="pef-btn-link" onClick={clearFile}>
             {I.trash}
             Remove
            </button>
            <span className="pef-new">New photo ready to save</span>
           </>
          )}
         </div>
        </div>

        <input
         ref={fileRef}
         id="image"
         name="image"
         type="file"
         accept={IMAGE_TYPES.join(",")}
         className="pef-sr"
         tabIndex={-1}
         onChange={(event) => pickFile(event.currentTarget.files?.[0] || null)}
        />
       </section>

       {/* Account */}
       {profile.email && (
        <section className="pef-card" style={{ ["--d" as any]: 1 }}>
         <div className="pef-card-head">
          <span className="pef-card-icon">{I.shield}</span>
          <div>
           <h2 className="pef-card-title">Account</h2>
           <p className="pef-card-sub">Your sign-in email. Contact support to change it.</p>
          </div>
         </div>
         <div className="pef-field">
          <label htmlFor="email" className="pef-label">Email</label>
          <div className="pef-control">
           <span className="pef-ico">{I.mail}</span>
           <input id="email" type="email" className="pef-input pef-input--email" value={profile.email} readOnly />
           {/* Email/password sign-ups have no verify step yet, so only show the positive badge */}
           {profile.emailVerified && <span className="pef-badge pef-badge--ok">{I.check} Verified</span>}
          </div>
         </div>
        </section>
       )}

       {/* Personal details */}
       <section className="pef-card" style={{ ["--d" as any]: 2 }}>
        <div className="pef-card-head">
         <span className="pef-card-icon">{I.id}</span>
         <div>
          <h2 className="pef-card-title">Personal details</h2>
          <p className="pef-card-sub">Used for your orders and deliveries.</p>
         </div>
        </div>

        <div className="pef-grid">
         <div className={`pef-field${showErr("name") ? " is-error" : ""}`}>
          <label htmlFor="name" className="pef-label">Full name</label>
          <div className="pef-control">
           <span className="pef-ico">{I.user}</span>
           <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="pef-input"
            placeholder="Your full name"
            onChange={(e) => {
             handleChange(e);
             setFieldTouched("name", true, false);
            }}
            onBlur={handleBlur}
            value={values.name}
            aria-invalid={showErr("name")}
            aria-describedby={showErr("name") ? "name-error" : undefined}
           />
           {okMark("name")}
          </div>
          {errorText("name")}
         </div>

         <div className={`pef-field${showErr("phone") ? " is-error" : ""}`}>
          <label htmlFor="phone" className="pef-label">
           Phone number
           <small className={`pef-count${values.phone.length === 11 ? " is-full" : ""}`}>
            {values.phone.length}/11
           </small>
          </label>
          <div className="pef-control">
           <span className="pef-ico">{I.phone}</span>
           <span className="pef-prefix" aria-hidden="true">🇧🇩 +88</span>
           <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            maxLength={11}
            className="pef-input pef-input--phone"
            placeholder="01XXXXXXXXX"
            onChange={(e) => {
             let v = e.target.value.replace(/\D/g, "");
             if (v.startsWith("880")) v = "0" + v.slice(3);
             v = v.slice(0, 11);
             setFieldValue("phone", v);
             setFieldTouched("phone", true, false);
            }}
            onBlur={handleBlur}
            value={values.phone}
            aria-invalid={showErr("phone")}
            aria-describedby={showErr("phone") ? "phone-error" : undefined}
           />
           {okMark("phone")}
          </div>
          {errorText("phone")}
         </div>

         <div className={`pef-field${showErr("birth_date") ? " is-error" : ""}`}>
          <label htmlFor="birth_date" className="pef-label">Birth date</label>
          <div className="pef-control">
           <span className="pef-ico">{I.cal}</span>
           <input
            id="birth_date"
            name="birth_date"
            type="date"
            className="pef-input"
            style={{ paddingRight: 14 }}
            onChange={(e) => {
             handleChange(e);
             setFieldTouched("birth_date", true, false);
            }}
            onBlur={handleBlur}
            value={values.birth_date}
            max={format(new Date(), "yyyy-MM-dd")}
            aria-invalid={showErr("birth_date")}
            aria-describedby={showErr("birth_date") ? "birth_date-error" : undefined}
           />
          </div>
          {errorText("birth_date")}
         </div>

         <div className={`pef-field${showErr("gender") ? " is-error" : ""}`}>
          <span className="pef-label" id="gender-label">Gender</span>
          <div className="pef-seg" role="radiogroup" aria-labelledby="gender-label">
           <span
            className="pef-seg-thumb"
            aria-hidden="true"
            style={{
             transform: `translateX(${Math.max(genderIdx, 0) * 100}%)`,
             opacity: genderIdx < 0 ? 0 : 1,
            }}
           />
           {GENDERS.map((g) => (
            <button
             key={g.value}
             type="button"
             role="radio"
             aria-checked={values.gender === g.value}
             onClick={() => {
              setFieldValue("gender", g.value);
              setFieldTouched("gender", true, false);
             }}
            >
             {values.gender === g.value && I.check}
             {g.label}
            </button>
           ))}
          </div>
          {errorText("gender")}
         </div>
        </div>
       </section>

       {/* Save bar */}
       <div className={`pef-bar${dirty ? " is-dirty" : ""}`}>
        <span className="pef-status" aria-live="polite">
         <span className="pef-dot" aria-hidden="true" />
         {dirty ? "Unsaved changes" : "No changes yet"}
        </span>
        <div className="pef-actions">
         <button type="button" className="pef-cancel" onClick={handleCancel}>
          Cancel
         </button>
         <button type="submit" className="pef-save" disabled={!dirty || isSubmitting}>
          {isSubmitting && <span className="pef-spinner" aria-hidden="true" />}
          {isSubmitting ? "Saving..." : "Save changes"}
         </button>
        </div>
       </div>
      </form>
     );
    }}
   </Formik>
  </>
 );
}
