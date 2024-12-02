"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import useVisibility from "./useVisibility";
import { useAppContext } from "contexts/app-context/AppContext"; // Context for managing user auth state
import axios from "axios"; // Import axios for API calls
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import Box from "@component/Box";
import Icon from "@component/icon/Icon";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import TextField from "@component/text-field";
import { Button, IconButton } from "@component/buttons";
import { H3, H5, H6, SemiSpan, Small, Span } from "@component/Typography";
import { StyledRoot } from "./styles"; // Import your styled components
import authService from "services/authService";
import ApiBaseUrl from "api/ApiBaseUrl";
import CommonHeader from "@component/header/CommonHeader";

// Modal Component
function ForgotPasswordModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [emailOrPhone, setEmailOrPhone] = useState("");  // Store email or phone input
  const [otp, setOtp] = useState("");  // Store OTP input
  const [newPassword, setNewPassword] = useState("");  // Store new password input
  const [confirmPassword, setConfirmPassword] = useState("");  // Store confirm password input
  const [isOtpStage, setIsOtpStage] = useState(false); // Track whether we are in OTP input stage
  const [isPasswordStage, setIsPasswordStage] = useState(false); // Track whether we are in password input stage
  const [resetToken, setResetToken] = useState("");
  const { passwordVisibility, togglePasswordVisibility } = useVisibility();  // Store reset token after OTP verification
  
  const [loading, setLoading] = useState(false);  // Loading state for the form

  const resetModal = () => {
    setEmailOrPhone("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setIsOtpStage(false);
    setIsPasswordStage(false);
  };
  
  // Handle the email/phone number submission
  const handleEmailOrPhoneSubmit = async () => {
    if (!emailOrPhone) {
      toast.error("Please enter a valid email or phone number");
      return;
    }
    setLoading(true);
    try {
      // Send request to the forgot password API
      const response = await axios.post("https://frontend.tizaraa.com/api/forgot-password", {
        email_or_phone: emailOrPhone,
      });

      if (response.status === 200) {
        toast.success("OTP sent to your email/phone number!");
        setEmailOrPhone("")
        setIsOtpStage(true);  // Switch to OTP stage
      }
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP submission
  const handleOtpSubmit = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }
    setLoading(true);
    try {
      // Send OTP verification request
      const response = await axios.post("https://frontend.tizaraa.com/api/verify-otp", {
        email_or_phone: emailOrPhone,
        otp: otp,
      });

      if (response.status === 200) {
        setResetToken(response.data.reset_token);  // Save reset token
        toast.success("OTP verified successfully!");
        setOtp("")
        setIsPasswordStage(true);  // Switch to password stage
        setIsOtpStage(false); // Hide OTP input
      }
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
      setOtp("")
      //setIsOtpStage(false);
    } finally {
      setLoading(false);
    }
  };

  // Handle New Password submission
  const handlePasswordSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please enter both New Password and Confirm Password");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      // Send password reset request
      const response = await axios.post("https://frontend.tizaraa.com/api/reset-password", {
        email_or_phone: emailOrPhone,
        password: newPassword,
        confirm_password: confirmPassword,
        reset_token: resetToken,
      });

      if (response.status === 200) {
        toast.success("Password reset successfully!");
        resetModal();
        onClose(); // Close the modal after successful password reset
      }
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
      resetModal();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "8px",
        padding: "20px",
        width: "400px",
        maxWidth: "90%",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
        position: "relative",
      }}>
        {/* Close Button */}
        <IconButton
          onClick={() => {
            resetModal();  // Reset the modal to initial state when closing
            onClose();  // Close the modal
          }} // Close the modal
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "#f1f1f1",
            borderRadius: "50%",
            padding: "5px",
          }}
        >
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>X</span>
        </IconButton>

        <H5 mb="1rem" fontSize="20px">Forgot your password?</H5>
        <Small mb="1rem" display="block">Please enter the account for which you want to reset the password.</Small>

        {/* Conditional rendering of Email/Phone field, OTP field or Password fields */}
        {!isOtpStage && !isPasswordStage ? (
          // Email/Phone number field
          <TextField
            fullwidth
            type="email"
            mb="1rem"
            name="emailOrPhone"
            placeholder="Enter your Phone Number or Email"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
          />
        ) : isOtpStage ? (
          // OTP field
          <TextField
            fullwidth
            mb="1rem"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        ) : (
          // New Password and Confirm Password fields
          <>
            <TextField
              fullwidth
              mb="1rem"
              name="newPassword"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
            <TextField
              fullwidth
              mb="1rem"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          </>
        )}

        {/* Action buttons */}
        <FlexBox justifyContent="flex-end" mt="1rem">
          {!(!isOtpStage && !isPasswordStage) &&
            (
              <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              if (isOtpStage) {
                setIsOtpStage(false); // Go back to email/phone stage
              } else if (isPasswordStage) {
                setIsPasswordStage(false); // Go back to OTP stage
                setIsOtpStage(true);
              }
            }} // Back button logic
            style={{ marginRight: "8px" }}
          >
            Back
          </Button>
            )
          }
          <Button
            variant="contained"
            color="primary"
            onClick={!isOtpStage && !isPasswordStage ? handleEmailOrPhoneSubmit : isOtpStage ? handleOtpSubmit : handlePasswordSubmit} // Submit logic based on the stage
          >
            {loading ? "Loading..." : "Confirm"}
          </Button>
        </FlexBox>
      </div>
    </div>
  );
}


export default function Login() {
  const { state, dispatch } = useAppContext(); // Accessing app context for auth
  const router = useRouter();
  const { passwordVisibility, togglePasswordVisibility } = useVisibility();
  const [loading, setLoading] = useState(false); // State for loader
  const [apiError, setApiError] = useState<string | null>(null); // State for API errors
  const [isModalOpen, setModalOpen] = useState(false);

  
  const searchParams = useSearchParams();
  const fromSignup = searchParams.get("from") === "signup";

  const initialValues = { email: "", password: "" };

  // Form validation schema
  const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  // Handle form submission
  const handleFormSubmit = async (values: any) => {
    setLoading(true); // Start loader
    setApiError(null); // Clear any previous errors

    try {
      // Making API request using axios
      const response = await axios.post(`${ApiBaseUrl.baseUrl}login`, {
        email: values.email,
        password: values.password,
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
          payload: { authToken: data.token, userInfo: data.user },
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

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });

  return (
   <>
     {fromSignup && <CommonHeader />}
    <StyledRoot mx="auto" my="2rem" boxShadow="large" borderRadius={8}>
      <form className="content" onSubmit={handleSubmit}>
        <H3 textAlign="center" mb="0.5rem">
          Welcome To Tizaraa
        </H3>

          <H5
            fontWeight="600"
            fontSize="12px"
            color="gray.800"
            textAlign="center"
            mb="2.25rem"
          >
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
            label="Email"
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
                color={passwordVisibility ? "gray.700" : "gray.600"}
              >
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
          <Button
            mb="1.65rem"
            variant="contained"
            color="primary"
            type="submit"
            fullwidth
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </Button>

          {/* Google login */}
          {/* <FlexBox
            mb="0.75rem"
            height="40px"
            color="white"
            bg="#3B5998"
            borderRadius={5}
            cursor="pointer"
            alignItems="center"
            justifyContent="center"
          >
            <Icon variant="small" defaultcolor="auto" mr="0.5rem">
              facebook-filled-white
            </Icon>

            <Small fontWeight="600">Continue with Facebook</Small>
          </FlexBox> */}
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
          <FlexBox justifyContent="center" mb="">
            <SemiSpan>Don’t have an account?</SemiSpan>
            <Link href="/signup">
              <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                Sign Up
              </H6>
            </Link>
          </FlexBox>
        </form>

        {/* Forgot Password */}
        <FlexBox justifyContent="center" alignItems="center" bg="#fff" my="0.5rem">
  <SemiSpan>Forgot your password?</SemiSpan>
  <Button
    onClick={() => setModalOpen(true)} // Triggers the modal on click
    variant="text" // A variant to make it look like a link
    color="primary"
    style={{
      padding: "10px",
      minWidth: "auto",
      marginLeft: "0.5rem",
      textDecoration: "none", // Makes it look like a link
      fontSize: "1rem", // You can adjust the font size if needed
    }}
  >
    Reset It
  </Button>
</FlexBox>
      </StyledRoot>
      <ForgotPasswordModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
