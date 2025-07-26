// "use client";

// import Link from "next/link";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { useState } from "react";
// import toast, { Toaster } from "react-hot-toast";

// import useVisibility from "./useVisibility";

// import Box from "@component/Box";
// import Icon from "@component/icon/Icon";
// import Divider from "@component/Divider";
// import FlexBox from "@component/FlexBox";
// import CheckBox from "@component/CheckBox";
// import TextField from "@component/text-field";
// import { Button, IconButton } from "@component/buttons";
// import { H3, H5, H6, SemiSpan, Small, Span } from "@component/Typography";
// //router.push("/profile");
// import { useRouter } from "next/navigation";
// import ApiBaseUrl from "api/ApiBaseUrl";

// // STYLED COMPONENT
// import { StyledRoot } from "./styles";
// import CommonHeader from "@component/header/CommonHeader";

// export default function Signup() {
//   const router = useRouter();
//   const { passwordVisibility, togglePasswordVisibility } = useVisibility();
//   const [apiError, setApiError] = useState({
//     email: "",
//     password: "",
//     cpassword: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const initialValues = {
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     cpassword: "",
//     agreement: false,
//   };

//   const formSchema = yup.object().shape({
//     name: yup.string().required("Name is required"),
//     email: yup.string().email("Invalid email").required("Email is required"),
//     phone: yup
//       .string()
//       .matches(/^[0-9]+$/, "Only numbers are allowed")
//       .required("Phone is required"),
//       password: yup
//       .string()
//       .min(9, "Password must be at least 9 characters")
//       .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
//       .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
//       .required("Password is required"),
    
//     cpassword: yup
//       .string()
//       .oneOf([yup.ref("password")], "Passwords must match")
//       .required("Confirm password is required"),
//     agreement: yup
//       .bool()
//       .oneOf([true], "You must accept the terms and conditions")
//       .required("You must accept the terms and conditions"),
//   });
  
  

//   const handleFormSubmit = async (values: any) => {
//     setApiError({ email: "", password: "", cpassword: "" });
//     setIsSubmitting(true);

//     try {
//       const response = await fetch(`${ApiBaseUrl.baseUrl}register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: values.name,
//           email: values.email,
//           phone: values.phone,
//           password: values.password,
//           cpassword: values.cpassword,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         //console.log("User registered successfully:", data);
//         router.push("/profile");
//         toast.success("User registered successfully!");
//       } else {
//         toast.error("Failed to register user.");

//         // Handle specific field errors
//         if (data.errors) {
//           setApiError({
//             email: data.errors.email || "",
//             password: data.errors.password || "",
//             cpassword: data.errors.cpassword || "",
//           });
//         } else {
//           setApiError({
//             email: "The email has already been taken.",
//             password: "",
//             cpassword: "",
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error during registration:", error);
//       setApiError({
//         email: "The email has already been taken.",
//         password: "",
//         cpassword: "",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
//     useFormik({
//       initialValues,
//       onSubmit: handleFormSubmit,
//       validationSchema: formSchema,
//     });

//   return (
//     <>
//     <CommonHeader></CommonHeader>
//         <StyledRoot mx="auto" my="2rem" boxShadow="large" borderRadius={8}>
//       <form className="content" onSubmit={handleSubmit}>
//         <H3 textAlign="center" mb="0.5rem">
//           Create Your Account
//         </H3>

//         {/* <H5
//           fontWeight="600"
//           fontSize="12px"
//           color="gray.800"
//           textAlign="center"
//           mb="2.25rem"
//         >
//           Please fill all forms to continue
//         </H5> */}

//         {/* Name */}
//         <TextField
//           fullwidth
//           name="name"
//           mb="0.75rem"
//           label="Full Name"
//           onBlur={handleBlur}
//           value={values.name}
//           onChange={handleChange}
//           placeholder="Enter Your Name"
//           errorText={touched.name && errors.name}
//         />

//         {/* Email */}
//         <TextField
//           fullwidth
//           mb="0.75rem"
//           name="email"
//           type="email"
//           onBlur={handleBlur}
//           value={values.email}
//           onChange={handleChange}
//           placeholder="Enter Your Email"
//           label="Email"
//           errorText={touched.email && (errors.email || apiError.email)}
//         />

//         {/* Phone */}
//         <TextField
//           fullwidth
//           mb="0.75rem"
//           name="phone"
//           type="text"
//           onBlur={handleBlur}
//           value={values.phone}
//           onChange={handleChange}
//           placeholder="Enter Your Phone Number"
//           label="Phone"
//           errorText={touched.phone && errors.phone}
//         />
// {/* Password */}
// <TextField
//   fullwidth
//   mb="0.75rem"
//   name="password"
//   label="Password"
//   placeholder="Enter Your Password"
//   onBlur={handleBlur}
//   value={values.password}
//   onChange={handleChange}
//   errorText={touched.password && (errors.password || apiError.password)} // Display error
//   type={passwordVisibility ? "text" : "password"}
//   endAdornment={
//     <IconButton
//       p="0.25rem"
//       mr="0.25rem"
//       type="button"
//       color={passwordVisibility ? "gray.700" : "gray.600"}
//       onClick={togglePasswordVisibility}
//     >
//       <Icon variant="small" defaultcolor="currentColor">
//         {passwordVisibility ? "eye-alt" : "eye"}
//       </Icon>
//     </IconButton>
//   }
// />

// {/* Confirm Password */}
// <TextField
//   fullwidth
//   mb="0.75rem"
//   name="cpassword"
//   label="Confirm Password"
//   placeholder="Enter Your Confirm Password"
//   onBlur={handleBlur}
//   value={values.cpassword}
//   onChange={handleChange}
//   errorText={touched.cpassword && (errors.cpassword || apiError.cpassword)} // Display error
//   type={passwordVisibility ? "text" : "password"}
//   endAdornment={
//     <IconButton
//       p="0.25rem"
//       mr="0.25rem"
//       type="button"
//       color={passwordVisibility ? "gray.700" : "gray.600"}
//       onClick={togglePasswordVisibility}
//     >
//       <Icon variant="small" defaultcolor="currentColor">
//         {passwordVisibility ? "eye-alt" : "eye"}
//       </Icon>
//     </IconButton>
//   }
// />



//         <CheckBox
//           mb="1.75rem"
//           name="agreement"
//           color="secondary"
//           onChange={handleChange}
//           checked={values.agreement}
//           label={
//             <FlexBox>
//               <SemiSpan>By signing up, you agree to</SemiSpan>
//               <a href="/terms_condition" target="_blank" rel="noreferrer noopener">
//                 <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
//                   Terms & Condition
//                 </H6>
//               </a>
//             </FlexBox>
//           }
//           required
//         />

//         <Button
//           mb="1.65rem"
//           mt="1.65rem"
//           variant="contained"
//           color="primary"
//           type="submit"
//           fullwidth
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? "Creating Account..." : "Create Account"}
//         </Button>
//       </form>

//       {/* <FlexBox justifyContent="center" bg="gray.200" py="19px">
//         <SemiSpan>Already have an account?</SemiSpan>
//         <Link href="/login">
//           <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
//             Log in
//           </H6>
//         </Link>
//       </FlexBox> */}

// <FlexBox justifyContent="center" bg="gray.200" py="19px">
//   <SemiSpan>Already have an account?</SemiSpan>
//   <Link href={{ pathname: "/login", query: { from: "signup" } }}>
//     <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
//       Log in
//     </H6>
//   </Link>
// </FlexBox>

//     </StyledRoot>
//     </>

//   );
// }


"use client";

import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import useVisibility from "./useVisibility";

import Box from "@component/Box";
import Icon from "@component/icon/Icon";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import CheckBox from "@component/CheckBox";
import TextField from "@component/text-field";
import { Button, IconButton } from "@component/buttons";
import { H3, H5, H6, SemiSpan, Small, Span } from "@component/Typography";
//router.push("/profile");
import { useRouter } from "next/navigation";
import ApiBaseUrl from "api/ApiBaseUrl";

// STYLED COMPONENT
import { StyledRoot } from "./styles";
import CommonHeader from "@component/header/CommonHeader";

import BeatLoader from "react-spinners/BeatLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function Signup() {
  const router = useRouter();
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  // const { passwordVisibility, togglePasswordVisibility } = useVisibility();

  const {
    passwordVisibility: passwordVisibility1,
    togglePasswordVisibility: togglePasswordVisibility1,
  } = useVisibility();
  
  const {
    passwordVisibility: passwordVisibility2,
    togglePasswordVisibility: togglePasswordVisibility2,
  } = useVisibility();

  const [apiError, setApiError] = useState({
    phone: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
    agreement: false,
  };

  const formSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup
      .string()
      .matches(/^[0-9]{11}$/, "Phone number must be exactly 11 digits")
      .required("Phone is required"),
    password: yup
      .string()
      .min(9, "Password must be at least 9 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
    cpassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password must match")
      .required("Confirm password is required"),
    agreement: yup
      .bool()
      .oneOf([true], "You must accept the terms and conditions")
      .required("You must accept the terms and conditions"),
  });

  const handleFormSubmit = async (values: any) => {
    setApiError({ phone: "", email: "", password: "", cpassword: "" });
    setIsSubmitting(true);
  
    try {
      const response = await fetch(`${ApiBaseUrl.baseUrl}register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          password: values.password,
          cpassword: values.cpassword,
        }),
      });
  
      const data = await response.json();
      console.log(data)
  
      if (response.ok) {
        sessionStorage.setItem('userId', data.id);
        router.push("/emailValidation");
        toast.success(data.message);
      } else {
        toast.error("Failed to register user.");
  
        // Handle specific field errors based on the structure of the response
        if (data.message) {
          setApiError({
            phone: data.message.phone ? data.message.phone[0] : "",
            email: data.message.email ? data.message.email[0] : "",
            password: "",
            cpassword: "",
          });
        } else {
          setApiError({
            // phone: "An error occurred with the phone number.",
            // email: "An error occurred with the email address.",
            // password: "",
            // cpassword: "",
            phone: data.message.phone ? data.message.phone[0] : "",
            email: data.message.email ? data.message.email[0] : "",
            password: "",
            cpassword: "",
          });
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An unexpected error occurred.");
      setApiError({
        phone: "",
        email: "",
        password: "",
        cpassword: "",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });

    
  useEffect(() => {
    // const passwordValidation = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{9,}$/;
    const passwordValidation = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).{9,}$/;

    // Check if the password matches the required pattern
    setIsPasswordValid(passwordValidation.test(values.password));
  }, [values.password]);

  return (
    <>
      <CommonHeader></CommonHeader>
      <StyledRoot mx="auto" my="2rem" boxShadow="large" borderRadius={8}>
        <form className="content" onSubmit={handleSubmit} autoComplete="off">
          <H3 textAlign="center" mb="0.5rem">
            Create Your Account
          </H3>

          <TextField
  fullwidth
  name="name"
  mb="0.75rem"
  label={
    <>
      Full Name <span style={{ color: '#e94560' }}>*</span>
    </>
  }
  onBlur={handleBlur}
  value={values.name}
  onChange={handleChange}
  placeholder="Enter Your Name"
  errorText={touched.name && errors.name}
/>


          <TextField
            fullwidth
            mb="0.75rem"
            name="email"
            type="email"
            onBlur={handleBlur}
            value={values.email}
            onChange={handleChange}
            placeholder="Enter Your Email"
            label={
              <>
                Email <span style={{ color: '#e94560' }}>*</span>
              </>
            }
            autoComplete="new-email"
            errorText={touched.email && (errors.email || apiError.email)}
          />

          <TextField
            fullwidth
            mb="0.75rem"
            name="phone"
            type="text"
            maxLength="11"
            onBlur={handleBlur}
            value={values.phone}
            onChange={handleChange}
            placeholder="Enter Your Phone Number"
            label={
              <>
                Phone <span style={{ color: '#e94560' }}>*</span>
              </>
            }
            errorText={touched.phone && (errors.phone || apiError.phone)}
          />

          <TextField
            fullwidth
            mb="0.75rem"
            name="password"
            // label="Password"
            label={
              <>
               Password <span style={{ color: '#e94560' }}>*</span>
              </>
            }
            placeholder="Enter Your Password"
            onBlur={handleBlur}
            value={values.password}
            onChange={handleChange}
            autoComplete="new-password"
            errorText={touched.password && errors.password}
            type={passwordVisibility1 ? "text" : "password"}
            endAdornment={
              <IconButton
                p="0.25rem"
                mr="0.25rem"
                type="button"
                color={passwordVisibility1 ? "gray.700" : "gray.600"}
                onClick={togglePasswordVisibility1}
              >
                <Icon variant="small" defaultcolor="currentColor">
                  {passwordVisibility1 ? "eye-alt" : "eye"}
                </Icon>
              </IconButton>
            }
          />
            {/* FontAwesome Icon indicating password requirements */}
            {!isPasswordValid && (
            <div style={{ display: "flex", alignItems: "center", marginTop: "0.5rem" }}>
              <FontAwesomeIcon
                icon={faCircleExclamation}
                style={{ color: "#e94560", marginRight: "0.5rem" }}
              />
              <span style={{ fontSize: "0.875rem", color: "#495057" }}>
                Password should be at least 9 characters, contain 1 uppercase, 1 lowercase, and 1 special character.
              </span>
            </div>
          )}

          <TextField
            fullwidth
            mb="0.75rem"
            name="cpassword"
            // label="Confirm Password"
            label={
              <>
                Confirm Password <span style={{ color: '#e94560' }}>*</span>
              </>
            }
            placeholder="Enter Your Confirm Password"
            onBlur={handleBlur}
            value={values.cpassword}
            onChange={handleChange}
            errorText={touched.cpassword && errors.cpassword}
            type={passwordVisibility2 ? "text" : "password"}
            endAdornment={
              <IconButton
                p="0.25rem"
                mr="0.25rem"
                type="button"
                color={passwordVisibility2 ? "gray.700" : "gray.600"}
                onClick={togglePasswordVisibility2}
              >
                <Icon variant="small" defaultcolor="currentColor">
                  {passwordVisibility2 ? "eye-alt" : "eye"}
                </Icon>
              </IconButton>
            }
          />

          <CheckBox
            mb="1.75rem"
            name="agreement"
            color="secondary"
            onChange={handleChange}
            checked={values.agreement}
            label={
              <FlexBox>
                <SemiSpan>By signing up, you agree to</SemiSpan>
                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <H6
                    ml="0.5rem"
                    borderBottom="1px solid"
                    borderColor="gray.900"
                  >
                    Terms & Conditions
                  </H6>
                </a>
              </FlexBox>
            }
            required
          />

          <Button
            mb="1.65rem"
            mt="1.65rem"
            variant="contained"
            color="primary"
            type="submit"
            fullwidth
            disabled={isSubmitting}
          >
            {isSubmitting ? <BeatLoader size={18} color="#fff" /> : "Create Account"}
          </Button>
        </form>

        <FlexBox justifyContent="center" bg="gray.200" py="19px">
          <SemiSpan>Already have an account?</SemiSpan>
          <Link href={{ pathname: "/login", query: { from: "signup" } }}>
            <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
              Log in
            </H6>
          </Link>
        </FlexBox>
      </StyledRoot>
    </>
  );
}
