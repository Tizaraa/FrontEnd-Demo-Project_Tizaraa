"use client";

import { useState, useContext } from "react"; // Import useContext for AuthContext
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import useVisibility from "./useVisibility";
import { useAppContext } from "contexts/app-context/AppContext";

import Box from "@component/Box";
import Icon from "@component/icon/Icon";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import TextField from "@component/text-field";
import { Button, IconButton } from "@component/buttons";
import { H3, H5, H6, SemiSpan, Small, Span } from "@component/Typography";
import authService from "services/authService"; // Import the authService
// STYLED COMPONENT
import { StyledRoot } from "./styles";



export default function Login() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const { passwordVisibility, togglePasswordVisibility } = useVisibility();
  const [loading, setLoading] = useState(false); // State for loader

  const initialValues = { email: "", password: "" };

  const formSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("${path} is required"),
    password: yup.string().required("${path} is required")
  });

  const handleFormSubmit = async (values: any) => {
    setLoading(true); // Start loading

    try {
      const data = await authService.login(values); // Call login from authService
      const userToken = data.token // this should come from an API
      const userInfo = data.user;
      dispatch({ type: 'LOGIN', payload: { authToken: userToken, userInfo } });
      router.push("/profile"); // Redirect to profile
    } catch (error) {
      alert("Login failed. Please try again.");
      console.error(error);
    }
    finally{
      setLoading(false); // Stop loading
    }

  };

  const handleGoogleLogin = async () => {
    authService.googleLogin();
    // alert('Google login initiated'); // This is just for testing purposes
    // setLoading(true);
    // try {
    //   const result = await signIn("google", { redirect: false }); // Use NextAuth's signIn method
    //   if (result?.error) {
    //     alert("Login failed. Please try again.");
    //   } else {
    //     router.push("/profile"); // Redirect to profile after successful login
    //   }
    // } catch (error) {
    //   alert("Login failed. Please try again.");
    //   console.error(error);
    // } finally {
    //   setLoading(false);
    // }
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

        <Button mb="1.65rem" variant="contained" color="primary" type="submit" fullwidth disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </Button>

        <Box mb="1rem">
          <Divider width="200px" mx="auto" />
          <FlexBox justifyContent="center" mt="-14px">
            <Span color="text.muted" bg="body.paper" px="1rem">
              on
            </Span>
          </FlexBox>
        </Box>

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

        <FlexBox justifyContent="center" mb="1.25rem">
          <SemiSpan>Don’t have an account?</SemiSpan>
          <Link href="/signup">
            <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
              Sign Up
            </H6>
          </Link>
        </FlexBox>
      </form>

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
