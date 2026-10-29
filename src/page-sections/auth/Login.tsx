"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import useVisibility from "./useVisibility";
import { useAppContext } from "contexts/app-context/AppContext"; // Context for managing user auth state
import axios from "axios"; // Import axios for API calls
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

import Box from "@component/Box";
import Icon from "@component/icon/Icon";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import TextField from "@component/text-field";
import CheckBox from "@component/CheckBox";
import { Button, IconButton } from "@component/buttons";
import { H3, H5, H6, SemiSpan, Small, Span } from "@component/Typography";
import {
 AuthCard,
 AuthDivider,
 AuthErrorText,
 AuthFooter,
 AuthSubtitle,
 AuthSuccessNote,
 AuthTextButton,
 AuthTextLink,
 AuthTitle,
 SocialButton,
} from "./styles";
import tz from "../../theme/tizaraa";
import authService from "services/authService";
import ApiBaseUrl from "api/ApiBaseUrl";
import BeatLoader from "react-spinners/BeatLoader";
import ForgotPasswordModal from "./ForgotPasswordModal";

// Separate from the seller/admin keys used by the seller panel
const REMEMBER_EMAIL_KEY = "customer_remember_email";


export default function Login() {
 const { state, dispatch } = useAppContext(); // Accessing app context for auth
 const router = useRouter();
 const { passwordVisibility, togglePasswordVisibility } = useVisibility();
 const [loading, setLoading] = useState(false); // State for loader
 const [apiError, setApiError] = useState<string | null>(null); // State for API errors
 const [isModalOpen, setModalOpen] = useState(false);
 const [isHasPayLoading, setIsHasPayLoading] = useState(false);
 const [rememberMe, setRememberMe] = useState(false);

 const searchParams = useSearchParams();
 const fromSignup = searchParams.get("from") === "signup";
 const passwordWasReset = searchParams.get("reset") === "success";

 useEffect(() => {
  if (passwordWasReset) {
   toast.success(
    "Password reset successfully. Please log in with your email and new password.",
   );
  }
 }, [passwordWasReset]);

 const initialValues = { email: "", password: "" };

 // Form validation schema
 const formSchema = yup.object().shape({
  email: yup
   .string()
   .email("Email format is Invalid")
   .required("Email is required"),
  password: yup.string().required("Password is required"),
 });

 // Handle form submission
 // const handleFormSubmit = async (values: any) => {
 //   setLoading(true); // Start loader
 //   setApiError(null); // Clear any previous errors

 //   try {
 //     // Making API request using axios
 //     const response = await axios.post(`${ApiBaseUrl.baseUrl}login`, {
 //       email: values.email,
 //       password: values.password,
 //     });

 //     const data = response.data;

 //     // Check if login was successful
 //     if (data.token && response.status === 200) {
 //       // Store token in cookies for both client-side and server-side access
 //       Cookies.set("token", data.token, { expires: 7 });
 //       localStorage.setItem("token", data.token);
 //       localStorage.setItem("userInfo", JSON.stringify(data.user));

 //       // Dispatch login action with auth token and user info
 //       dispatch({
 //         type: "LOGIN",
 //         payload: { authToken: data.token, userInfo: data.user },
 //       });

 //       // Redirect to profile page
 //       router.push("/");
 //       toast.success("User Login successfully!");
 //     } else {
 //       // Handle errors (e.g., incorrect password, email not found, etc.)
 //       //setApiError("Invalid credentials. Please check your email or password.");
 //       toast.error("Failed Login. Please check your email or password.");
 //     }
 //   } catch (error) {
 //     console.error("Login error:", error);
 //     //setApiError("Failed to login. Please try again later.");
 //     toast.error("Failed to login. Please try again later.");
 //   } finally {
 //     setLoading(false); // Stop loader
 //   }
 // };
 const handleFormSubmit = async (values: any) => {
  setLoading(true);
  setApiError(null);

  try {
   const response = await axios.post(`${ApiBaseUrl.localApiUrl}login`, {
    email: values.email,
    password: values.password,
   });

   const data = response.data;

   if (data.token && response.status === 200) {
    Cookies.set("token", data.token, { expires: 7 });
    localStorage.setItem("token", data.token);
    localStorage.setItem("userInfo", JSON.stringify(data.user));

    // "Remember me" — only the email is kept, never the password
    if (rememberMe) {
     localStorage.setItem(REMEMBER_EMAIL_KEY, values.email);
    } else {
     localStorage.removeItem(REMEMBER_EMAIL_KEY);
    }

    dispatch({
     type: "LOGIN",
     payload: { authToken: data.token, userInfo: data.user },
    });

    toast.success("User logged in successfully!");

    // ✅ Check for redirect URL
    const redirectPath = sessionStorage.getItem("redirectAfterLogin");
    if (redirectPath) {
     sessionStorage.removeItem("redirectAfterLogin");
     router.push(redirectPath); // Redirect back to the product page
    } else {
     router.push("/"); // Default home page
    }
   } else {
    toast.error("Failed login. Please check your email or password.");
   }
  } catch (error) {
   console.error("Login error:", error);
   toast.error("Failed to login. Please try again later.");
  } finally {
   setLoading(false);
  }
 };

 // Google login handler (for future integration)
 const handleGoogleLogin = async () => {
  setIsHasPayLoading(true);
  // Handle Google login here
  console.log("google");

  authService.googleLogin();
 };

 const {
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  setFieldValue,
 } = useFormik({
  initialValues,
  onSubmit: handleFormSubmit,
  validationSchema: formSchema,
 });

 // Pre-fill the email saved on the last remembered login
 useEffect(() => {
  const savedEmail = localStorage.getItem(REMEMBER_EMAIL_KEY);
  if (savedEmail) {
   setFieldValue("email", savedEmail);
   setRememberMe(true);
  }
 }, []);

 return (
  <>
   <AuthCard>
    <form onSubmit={handleSubmit} autoComplete="off">
     <AuthTitle>Welcome To Tizaraa</AuthTitle>

     <AuthSubtitle>Log in with email & password</AuthSubtitle>

     {passwordWasReset && (
      <AuthSuccessNote>
       Your password has been reset. Log in with your email and new password.
      </AuthSuccessNote>
     )}

     {/* Email Field */}
     <TextField
      fullwidth
      mb="1rem"
      name="email"
      type="email"
      value={values.email}
      onChange={(e) => {
       handleChange(e);
       // Mark as touched for real-time error display
       if (!touched.email) touched.email = true;
      }}
      onBlur={handleBlur}
      placeholder="Enter Your Email"
      label="Email"
      autoComplete="new-email"
      errorText={errors.email}
     />

     {/* Password Field */}
     <TextField
      mb="0.5rem"
      fullwidth
      name="password"
      label="Password"
      onBlur={handleBlur}
      onChange={handleChange}
      placeholder="Enter Your Passoword"
      value={values.password}
      autoComplete="new-password"
      errorText={touched.password && errors.password}
      type={passwordVisibility ? "text" : "password"}
      endAdornment={
       <IconButton
        p="0.25rem"
        mr="0.25rem"
        type="button"
        onClick={togglePasswordVisibility}
        color={passwordVisibility ? "gray.700" : "gray.600"}
       >
        <Icon variant="small" defaultcolor="currentColor">
         {passwordVisibility ? "eye-alt" : "eye"}
        </Icon>
       </IconButton>
      }
     />

     {/* Display any API errors */}
     {apiError && <AuthErrorText>{apiError}</AuthErrorText>}

     {/* Remember me + Forgot Password */}
     <FlexBox justifyContent="space-between" alignItems="center" mb="1.5rem">
      <CheckBox
       id="remember-me"
       name="remember"
       color="primary"
       size={16}
       label={<Small color="text.muted">Remember me</Small>}
       checked={rememberMe}
       onChange={(e) => setRememberMe(e.target.checked)}
      />
      <AuthTextButton
       type="button"
       onClick={() => setModalOpen(true)} // Triggers the modal on click
      >
       Forgot password?
      </AuthTextButton>
     </FlexBox>

     {/* Submit Button */}
     <Button
      size="medium"
      variant="contained"
      color="primary"
      type="submit"
      fullwidth
      disabled={loading}
     >
      {loading ? <BeatLoader size={12} color={tz.color.slate} /> : "Login"}
     </Button>

     <AuthDivider>or</AuthDivider>

     {/* Google login */}
     <SocialButton type="button" onClick={handleGoogleLogin}>
      {isHasPayLoading ? (
       <BeatLoader size={12} color={tz.color.slate} />
      ) : (
       <>
        <Icon variant="small" defaultcolor="auto">
         google-1
        </Icon>
        Continue with Google
       </>
      )}
     </SocialButton>

     {/* Link to Signup */}
     <AuthFooter>
      <span>Don’t have an account?</span>
      <AuthTextLink href="/signup">Sign Up</AuthTextLink>
     </AuthFooter>
    </form>
   </AuthCard>
   <ForgotPasswordModal
    isOpen={isModalOpen}
    onClose={() => setModalOpen(false)}
   />
  </>
 );
}
