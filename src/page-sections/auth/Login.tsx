"use client";

import { useState, useContext,useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import useVisibility from "./useVisibility";
import ReactInputVerificationCode from 'react-input-verification-code';
import { useAppContext } from "contexts/app-context/AppContext"; // Context for managing user auth state
import axios from "axios"; // Import axios for API calls
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

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
import BeatLoader from "react-spinners/BeatLoader";

import "./CustomOtpInput.css"; // Import the custom CSS file for styling

// Modal Component
function ForgotPasswordModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [emailOrPhone, setEmailOrPhone] = useState(""); // Store email or phone input
  const [otp, setOtp] = useState(""); // Store OTP input
  const [otpError, setOtpError] = useState(""); // Store OTP error
  const [newPassword, setNewPassword] = useState(""); // Store new password input
  const [confirmPassword, setConfirmPassword] = useState(""); // Store confirm password input
  const [isOtpStage, setIsOtpStage] = useState(false); // Track whether we are in OTP input stage
  const [isPasswordStage, setIsPasswordStage] = useState(false); // Track whether we are in password input stage
  const [resetToken, setResetToken] = useState("");
  const [otpTimer, setOtpTimer] = useState<number | null>(null); // Timer state
  const [isResetOtpDisabled, setIsResetOtpDisabled] = useState(false); // State for disabling Reset OTP button
  const { passwordVisibility, togglePasswordVisibility } = useVisibility();
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Ref to store timer ID

  const [loading, setLoading] = useState(false); // Loading state for the form
  const [isHasLoading, setIsHasLoading] = useState(false);

  // Reset modal fields
  const resetModal = () => {
    setEmailOrPhone("");
    setOtp("");
    setOtpError("");
    setNewPassword("");
    setConfirmPassword("");
    setIsOtpStage(false);
    setIsPasswordStage(false);
    setOtpTimer(null);
    setIsResetOtpDisabled(false);
    clearTimer(); // Clear any running timers
  };

  // Clear OTP countdown timer
  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Start OTP countdown
  const startOtpCountdown = () => {
    setIsResetOtpDisabled(true); // Disable the button
    let countdown = 60; // 2 minutes
    setOtpTimer(countdown);

    clearTimer(); // Clear any existing timer before starting a new one

    timerRef.current = setInterval(() => {
      countdown -= 1;
      setOtpTimer(countdown);

      if (countdown <= 0) {
        clearTimer();
        setIsResetOtpDisabled(false); // Re-enable the button
        setOtpTimer(null);
        toast.error("OTP Session Time Out");
      }
    }, 1000);
  };

   // Handle OTP validation
   const validateOtp = (inputOtp: string) => {
    if (!/^[0-9]{6}$/.test(inputOtp)) {
      setOtpError("OTP must be a 6-digit number.");
    } else {
      setOtpError("");
    }
  };

  // Handle OTP input change
  const handleOtpChange = (value: string) => {
    setOtp(value);
    validateOtp(value);
  };

  // Handle OTP reset request
  const handleResetOtp = async () => {
    if (!emailOrPhone) {
      toast.error("Invalid email or phone number. Please try again.");
      return;
    }
    try {
      setLoading(false); // Ensure "Confirm" button doesn't show loading
      setIsResetOtpDisabled(true); // Disable the "Reset OTP" button during the process
      const response = await axios.post(`${ApiBaseUrl.baseUrl}forgot-password`, {
        email_or_phone: emailOrPhone,
      });
      toast.success(response.data.message); // Show API success message
      startOtpCountdown(); // Start the countdown after resetting OTP
    } catch (error) {
      setIsResetOtpDisabled(false); // Re-enable the button
      setOtpTimer(null);
      toast.error(error.response?.data?.message || "Failed to resend OTP."); // Show API error message
    }
  };

  // Handle the email/phone number submission
  const handleEmailOrPhoneSubmit = async () => {
    if (!emailOrPhone) {
      toast.error("Please enter a valid email or phone number");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${ApiBaseUrl.baseUrl}forgot-password`, {
        email_or_phone: emailOrPhone,
      });

      if (response.status === 200) {
        toast.success(response.data.message); // Show API success message
        setIsOtpStage(true);
        startOtpCountdown(); // Start OTP countdown timer
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP."); // Show API error message
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP submission
  const handleOtpSubmit = async () => {
    if (!otp) {
      setOtpError("Please enter the OTP");
      return;
    }
    if (otpError) {
      toast.error("Invalid OTP.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${ApiBaseUrl.baseUrl}verify-otp`, {
        email_or_phone: emailOrPhone,
        otp: otp,
      });

      if (response.status === 200) {
        clearTimer(); // Stop OTP countdown
        setOtpTimer(null); // Set OTP timer to null
        setIsResetOtpDisabled(false)
        setResetToken(response.data.reset_token);
        setIsPasswordStage(true);
        setIsOtpStage(false);
        toast.success(response.data.message); // Show API success message
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP."); // Show API error message
      setIsResetOtpDisabled(false)
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
      const response = await axios.post(`${ApiBaseUrl.baseUrl}reset-password`, {
        email_or_phone: emailOrPhone,
        password: newPassword,
        confirm_password: confirmPassword,
        reset_token: resetToken,
      });

      if (response.status === 200) {
        toast.success(response.data.message); // Show API success message
        resetModal();
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password."); // Show API error message
      setNewPassword("");
    setConfirmPassword("");
      //resetModal();
      // onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleBack = () =>{
  setIsHasLoading(true)
  if (isOtpStage) {
    setIsOtpStage(false);
    setIsHasLoading(false)
    clearTimer(); // Stop OTP countdown
    setOtpTimer(null); // Set OTP timer to null
    setIsResetOtpDisabled(false)
  } else if (isPasswordStage) {
    setIsPasswordStage(false);
    setIsOtpStage(true);
    setIsHasLoading(false)
  }
  }

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
        <IconButton
          onClick={() => {
            resetModal();
            onClose();
          }}
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
        <Small mb="1rem" display="block">Reset password.</Small>

        {!isOtpStage && !isPasswordStage ? (
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
          <>
            <div className="otp-container">
              <ReactInputVerificationCode
                length={6}
                placeholder=""
                onChange={handleOtpChange}
                value={otp}
              />
            </div>
            {otpError && (
              <Small color="red" mb="1rem" mt="3rem">
                {otpError}
              </Small>
            )}
            <FlexBox justifyContent="space-between" alignItems="center">
              <Small>OTP expires in: {otpTimer || "0"}s</Small>
              <Button
                variant="outlined"
                color="secondary"
                disabled={isResetOtpDisabled}
                onClick={handleResetOtp}
                mt="1rem"
              >
                {isResetOtpDisabled ? <BeatLoader size={18} color="#E94560" /> : "Reset OTP"}
              </Button>
            </FlexBox>
          </>
        ) : (
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

        <FlexBox justifyContent="flex-end" mt="1rem">
          {(isOtpStage || isPasswordStage) && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleBack}
              style={{ marginRight: "8px" }}
            >
              {isHasLoading ? <BeatLoader size={18} color="#0000FF" /> : "Back"}
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={!isOtpStage && !isPasswordStage ? handleEmailOrPhoneSubmit : isOtpStage ? handleOtpSubmit : handlePasswordSubmit}
          >
            {loading ? <BeatLoader size={18} color="#fff" /> : "Confirm"}
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
  const [isHasPayLoading, setIsHasPayLoading] = useState(false);

  
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
        router.push("/");
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
    setIsHasPayLoading(true)
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
<CommonHeader />
    <StyledRoot mx="auto" my="2rem" boxShadow="large" borderRadius={8}>
      <form className="content" onSubmit={handleSubmit} autoComplete="off">
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
            placeholder="Enter Your Email"
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
            placeholder="Enter Your Passoword"
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

                {/* Forgot Password */}
        <FlexBox justifyContent="end" bg="#fff" >
        <span
  onClick={() => setModalOpen(true)} // Triggers the modal on click
  style={{
    padding: "10px",
    marginTop: "-1.5rem",
    minWidth: "auto",
    marginLeft: "0.5rem",
    marginRight: "-0.5rem",
    textDecoration: "none", // Makes it look like a link
    color: "#e94560", // Primary color for link
    cursor: "pointer", // Makes it clickable
    fontSize: "0.8rem", // Optional for text size
    marginBottom: "10px",
  }}
>
  Forgot password?
</span>

</FlexBox>

          {/* Submit Button */}
          <Button
            mb="1.65rem"
            variant="contained"
            color="primary"
            type="submit"
            fullwidth
            disabled={loading}
          >
            {loading ? <BeatLoader size={18} color="#e94560" /> : "Login"}
            
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
      {isHasPayLoading ? (
        <BeatLoader size={18} color="#0000FF" />
      ) : (
        <>
          <Icon variant="small" defaultcolor="auto" mr="0.5rem">
            google-1
          </Icon>
          <Small fontWeight="600">Continue with Google</Small>
        </>
      )}
    </FlexBox>

          {/* Link to Signup */}
          <FlexBox justifyContent="center" mb="">
            <SemiSpan>Don’t have an account?</SemiSpan>
            <Link href="/signup">
              <H6 ml="0.5rem" mb="1.5rem" borderBottom="1px solid" borderColor="gray.900">
                Sign Up
              </H6>
            </Link>
          </FlexBox>
        </form>

  
      </StyledRoot>
      <ForgotPasswordModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}