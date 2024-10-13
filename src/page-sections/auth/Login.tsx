"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import useVisibility from "./useVisibility";
import { useAppContext } from "contexts/app-context/AppContext"; // Context for managing user auth state
import axios from "axios"; // Import axios for API calls
import Cookies from "js-cookie";
import {  toast } from 'react-toastify';

import Box from "@component/Box";
import Icon from "@component/icon/Icon";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import TextField from "@component/text-field";
import { Button, IconButton } from "@component/buttons";
import { H3, H5, H6, SemiSpan, Small, Span } from "@component/Typography";
import { StyledRoot } from "./styles"; // Import your styled components
import authService from "services/authService";

export default function Login() {
  const { state, dispatch } = useAppContext(); // Accessing app context for auth
  const router = useRouter();
  const { passwordVisibility, togglePasswordVisibility } = useVisibility();
  const [loading, setLoading] = useState(false); // State for loader
  const [apiError, setApiError] = useState<string | null>(null); // State for API errors

  const initialValues = { email: "", password: "" };

  // Form validation schema
  const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required")
  });

  // Handle form submission
  const handleFormSubmit = async (values: any) => {
    setLoading(true); // Start loader
    setApiError(null); // Clear any previous errors

    try {
      // Making API request using axios
      const response = await axios.post("https://tizaraa.com/api/login", {
        email: values.email,
        password: values.password
      });

      const data = response.data;

      // Check if login was successful
      if (data.token && response.status === 200) {
        // Store token in cookies for both client-side and server-side access
        Cookies.set("token", data.token, { expires: 7 });
        localStorage.setItem("token", data.token);
        localStorage.setItem("userInfo", JSON.stringify(data.user));

        // Dispatch login action with auth token and user info
        dispatch({
          type: "LOGIN",
          payload: { authToken: data.token, userInfo: data.user }
        });

        // Redirect to profile page
        router.push("/profile");
        toast.success("User Login successfully!");
      } else {
        // Handle errors (e.g., incorrect password, email not found, etc.)
        //setApiError("Invalid credentials. Please check your email or password.");
        toast.error("Failed Login. Please check your email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      //setApiError("Failed to login. Please try again later.");
      toast.error("Failed to login. Please try again later.");
    } finally {
      setLoading(false); // Stop loader
    }
  };

  // Google login handler (for future integration)
  const handleGoogleLogin = async () => {
    // Handle Google login here
    console.log("google");
    
    authService.googleLogin();
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: formSchema
  });

  return (
    <StyledRoot mx="auto" my="2rem" boxShadow="large" borderRadius={8}>
      <form className="content" onSubmit={handleSubmit}>
        <H3 textAlign="center" mb="0.5rem">
          Welcome To Ecommerce
        </H3>

        <H5 fontWeight="600" fontSize="12px" color="gray.800" textAlign="center" mb="2.25rem">
          Log in with email & password
        </H5>

        {/* Email Field */}
        <TextField
          fullwidth
          mb="0.75rem"
          name="email"
          type="email"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          placeholder="example@mail.com"
          label="Email or Phone Number"
          errorText={touched.email && errors.email}
        />

        {/* Password Field */}
        <TextField
          mb="1rem"
          fullwidth
          name="password"
          label="Password"
          autoComplete="on"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="*********"
          value={values.password}
          errorText={touched.password && errors.password}
          type={passwordVisibility ? "text" : "password"}
          endAdornment={
            <IconButton
              p="0.25rem"
              mr="0.25rem"
              type="button"
              onClick={togglePasswordVisibility}
              color={passwordVisibility ? "gray.700" : "gray.600"}>
              <Icon variant="small" defaultcolor="currentColor">
                {passwordVisibility ? "eye-alt" : "eye"}
              </Icon>
            </IconButton>
          }
        />

        {/* Display any API errors */}
        {apiError && (
          <Small color="red" mb="1rem">
            {apiError}
          </Small>
        )}

        {/* Submit Button */}
        <Button mb="1.65rem" variant="contained" color="primary" type="submit" fullwidth disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </Button>

        {/* Google login */}
        <FlexBox
          mb="0.75rem"
          height="40px"
          color="white"
          bg="#3B5998"
          borderRadius={5}
          cursor="pointer"
          alignItems="center"
          justifyContent="center">
          <Icon variant="small" defaultcolor="auto" mr="0.5rem">
            facebook-filled-white
          </Icon>

          <Small fontWeight="600">Continue with Facebook</Small>
        </FlexBox>
        <FlexBox
          mb="1.25rem"
          height="40px"
          color="white"
          bg="#4285F4"
          borderRadius={5}
          cursor="pointer"
          alignItems="center"
          justifyContent="center"
          onClick={handleGoogleLogin} // Trigger Google login
        >
          <Icon variant="small" defaultcolor="auto" mr="0.5rem">
            google-1
          </Icon>
          <Small fontWeight="600">Continue with Google</Small>
        </FlexBox>

        {/* Link to Signup */}
        <FlexBox justifyContent="center" mb="1.25rem">
          <SemiSpan>Don’t have an account?</SemiSpan>
          <Link href="/signup">
            <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
              Sign Up
            </H6>
          </Link>
        </FlexBox>
      </form>

      {/* Forgot Password */}
      <FlexBox justifyContent="center" bg="gray.200" py="19px">
        <SemiSpan>Forgot your password?</SemiSpan>
        <Link href="/">
          <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
            Reset It
          </H6>
        </Link>
      </FlexBox>
    </StyledRoot>
  );
}