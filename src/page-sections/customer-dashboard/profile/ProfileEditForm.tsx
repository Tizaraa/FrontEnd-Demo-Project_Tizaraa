// "use client";
// import * as yup from "yup";
// import { Formik } from "formik";
// import { format } from "date-fns";

// import Box from "@component/Box";
// import Hidden from "@component/hidden";
// import Avatar from "@component/avatar";
// import Icon from "@component/icon/Icon";
// import Grid from "@component/grid/Grid";
// import FlexBox from "@component/FlexBox";
// import { Button } from "@component/buttons";
// import TextField from "@component/text-field";
// import Radio from "@component/radio";
// import User from "@models/user.model";

// export default function ProfileEditForm({ user }: { user: User }) {
//   const INITIAL_VALUES = {
//     first_name: user.name.firstName || "",
//     last_name: user.name.lastName || "",
//     email: user.email || "",
//     contact: user.phone || "",
//     birth_date: format(new Date(user.dateOfBirth), "yyyy-MM-dd") || "",
//     gender: user.gender || "male" // Assuming 'male' as default
//   };

//   const VALIDATION_SCHEMA = yup.object().shape({
//     first_name: yup.string().required("required"),
//     last_name: yup.string().required("required"),
//     email: yup.string().email("invalid email").required("required"),
//     contact: yup.string().required("required"),
//     birth_date: yup.date().required("invalid date"),
//     gender: yup.string().required("required")
//   });

//   const handleFormSubmit = async (values: typeof INITIAL_VALUES) => {
//     console.log(values);
//   };

//   return (
//     <>
//       <FlexBox alignItems="flex-end" mb="22px">
//         <Avatar src="/assets/images/faces/ralph.png" size={64} />

//         <Box ml="-20px" zIndex={1}>
//           <label htmlFor="profile-image">
//             <Button
//               p="6px"
//               as="span"
//               size="small"
//               height="auto"
//               bg="gray.300"
//               color="secondary"
//               borderRadius="50%">
//               <Icon>camera</Icon>
//             </Button>
//           </label>
//         </Box>

//         <Hidden>
//           <input
//             type="file"
//             accept="image/*"
//             className="hidden"
//             id="profile-image"
//             onChange={(e) => console.log(e.target.files)}
//           />
//         </Hidden>
//       </FlexBox>

//       <Formik
//         onSubmit={handleFormSubmit}
//         initialValues={INITIAL_VALUES}
//         validationSchema={VALIDATION_SCHEMA}>
//         {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
//           <form onSubmit={handleSubmit}>
//             <Box mb="30px">
//               <Grid container horizontal_spacing={6} vertical_spacing={4}>
//                 <Grid item md={6} xs={12}>
//                   <TextField
//                     fullwidth
//                     name="first_name"
//                     label="First Name"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.first_name}
//                     errorText={touched.first_name && errors.first_name}
//                   />
//                 </Grid>

//                 <Grid item md={6} xs={12}>
//                   <TextField
//                     fullwidth
//                     name="last_name"
//                     label="Last Name"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.last_name}
//                     errorText={touched.last_name && errors.last_name}
//                   />
//                 </Grid>

//                 <Grid item md={6} xs={12}>
//                   <TextField
//                     fullwidth
//                     name="email"
//                     type="email"
//                     label="Email"
//                     onBlur={handleBlur}
//                     value={values.email}
//                     onChange={handleChange}
//                     errorText={touched.email && errors.email}
//                   />
//                 </Grid>

//                 <Grid item md={6} xs={12}>
//                   <TextField
//                     fullwidth
//                     label="Phone"
//                     name="contact"
//                     onBlur={handleBlur}
//                     value={values.contact}
//                     onChange={handleChange}
//                     errorText={touched.contact && errors.contact}
//                   />
//                 </Grid>

//                 <Grid item md={6} xs={12}>
//                   <TextField
//                     fullwidth
//                     type="date"
//                     name="birth_date"
//                     label="Birth Date"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.birth_date}
//                     errorText={touched.birth_date && errors.birth_date}
//                   />
//                 </Grid>
//               </Grid>
//             </Box>

//             <Button type="submit" variant="contained" color="primary">
//               Save Changes
//             </Button>
//           </form>
//         )}
//       </Formik>
//     </>
//   );
// }

"use client";
import * as yup from "yup";
import { Formik } from "formik";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import axios from "axios";

import Box from "@component/Box";
import Hidden from "@component/hidden";
import Avatar from "@component/avatar";
import Icon from "@component/icon/Icon";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import Select from "@component/Select";

const API_URL = "https://tizaraa.com/api/user/profile";
const UPDATE_API_URL = "https://tizaraa.com/api/user/profile/update";

export default function ProfileEditForm() {
  const [profile, setProfile] = useState(null); // State to hold the user data
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
      setProfile(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load user profile");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const INITIAL_VALUES = {
    first_name: profile?.name?.firstName || "",
    last_name: profile?.name?.lastName || "",
    email: profile?.email || "",
    contact: profile?.phone || "",
    //birth_date: format(new Date(profile?.dateOfBirth), "yyyy-MM-dd") || "",
    gender: profile?.gender || "",
  };

  const VALIDATION_SCHEMA = yup.object().shape({
    first_name: yup.string().required("required"),
    last_name: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup.string().required("required"),
    birth_date: yup.date().required("invalid date"),
    gender: yup.string().required("required"),
  });

  const handleFormSubmit = async (values: typeof INITIAL_VALUES) => {
    const authtoken = localStorage.getItem("token");
    try {
      const response = await axios.post(
        UPDATE_API_URL,
        {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          phone: values.contact,
          //date_of_birth: values.birth_date,
          gender: values.gender,
        },
        {
          headers: {
            Authorization: `Bearer ${authtoken}`,
          },
        }
      );
      console.log("Profile updated successfully:", response.data);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  const handleGender = (gender: string, setFieldValue: any) => {
    setFieldValue("gender", gender);
  };

  return (
    <>
      {/* <FlexBox alignItems="flex-end" mb="22px">
        <Avatar src="/assets/images/faces/ralph.png" size={64} />

        <Box ml="-20px" zIndex={1}>
          <label htmlFor="profile-image">
            <Button
              p="6px"
              as="span"
              size="small"
              height="auto"
              bg="gray.300"
              color="secondary"
              borderRadius="50%"
            >
              <Icon>camera</Icon>
            </Button>
          </label>
        </Box>

        <Hidden>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="profile-image"
            onChange={(e) => console.log(e.target.files)}
          />
        </Hidden>
      </FlexBox> */}

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
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
                    name="first_name"
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.first_name}
                    errorText={touched.first_name && errors.first_name}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullwidth
                    name="last_name"
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.last_name}
                    errorText={touched.last_name && errors.last_name}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullwidth
                    name="email"
                    type="email"
                    label="Email"
                    onBlur={handleBlur}
                    value={values.email}
                    onChange={handleChange}
                    errorText={touched.email && errors.email}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullwidth
                    label="Phone"
                    name="contact"
                    onBlur={handleBlur}
                    value={values.contact}
                    onChange={handleChange}
                    errorText={touched.contact && errors.contact}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullwidth
                    type="date"
                    name="birth_date"
                    label="Birth Date"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    //value={values.birth_date}
                    //errorText={touched.birth_date && errors.birth_date}
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
                    value={values.gender}
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
    </>
  );
}

