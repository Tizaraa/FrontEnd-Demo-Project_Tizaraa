"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import BeatLoader from "react-spinners/BeatLoader";

import FlexBox from "@component/FlexBox";
import TextField from "@component/text-field";
import { Button, IconButton } from "@component/buttons";
import { H5, Small } from "@component/Typography";
import ApiBaseUrl from "api/ApiBaseUrl";
import useResetCountdown, { formatCountdown } from "./useResetCountdown";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordModal({
 isOpen,
 onClose,
}: {
 isOpen: boolean;
 onClose: () => void;
}) {
 const [email, setEmail] = useState("");
 const [emailError, setEmailError] = useState("");
 const [loading, setLoading] = useState(false);
 const [linkSent, setLinkSent] = useState(false);
 const { secondsLeft, start, stop } = useResetCountdown();

 if (!isOpen) return null;

 const handleClose = () => {
  stop();
  setEmail("");
  setEmailError("");
  setLinkSent(false);
  onClose();
 };

 const handleSend = async () => {
  if (!email.trim()) {
   setEmailError("Email is required");
   return;
  }
  if (!EMAIL_PATTERN.test(email.trim())) {
   setEmailError("Email format is Invalid");
   return;
  }

  setEmailError("");
  setLoading(true);
  try {
   const response = await axios.post(
    `${ApiBaseUrl.localApiUrl}forgot-password`,
    { email: email.trim() },
   );
   setLinkSent(true);
   start(response.data.expires_in ?? 60);
   toast.success(response.data.message);
  } catch (error) {
   const message =
    error.response?.data?.message ||
    error.response?.data?.errors?.email?.[0] ||
    "Failed to send reset link.";
   if (error.response?.status === 404) {
    setEmailError(message);
   } else {
    toast.error(message);
   }
  } finally {
   setLoading(false);
  }
 };

 const expired = linkSent && secondsLeft === 0;

 return (
  <div
   style={{
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
   }}
  >
   <div
    style={{
     background: "#fff",
     borderRadius: "8px",
     padding: "20px",
     width: "400px",
     maxWidth: "90%",
     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
     position: "relative",
    }}
   >
    <IconButton
     onClick={handleClose}
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

    <H5 mb="1rem" fontSize="20px">
     Forgot your password?
    </H5>

    {!linkSent ? (
     <>
      <Small mb="1rem" display="block">
       Enter your account email and we will send you a password reset link.
      </Small>
      <TextField
       fullwidth
       type="email"
       mb="1rem"
       name="email"
       label="Email"
       placeholder="Enter Your Email"
       value={email}
       errorText={emailError}
       onChange={(e) => {
        setEmail(e.target.value);
        setEmailError("");
       }}
      />
      <FlexBox justifyContent="flex-end" mt="1rem">
       <Button
        variant="contained"
        color="primary"
        disabled={loading}
        onClick={handleSend}
       >
        {loading ? <BeatLoader size={18} color="#fff" /> : "Send Reset Link"}
       </Button>
      </FlexBox>
     </>
    ) : (
     <>
      <Small mb="1rem" display="block">
       {expired
        ? "The reset link has expired. Send a new one to continue."
        : `We sent a reset link to ${email}. It is valid for 1 minute only.`}
      </Small>
      <FlexBox justifyContent="space-between" alignItems="center">
       <Small color={expired ? "red" : undefined}>
        {expired
         ? "Link expired"
         : `Link expires in: ${formatCountdown(secondsLeft ?? 0)}`}
       </Small>
       <Button
        variant="outlined"
        color="secondary"
        disabled={loading || !expired}
        onClick={handleSend}
       >
        {loading ? <BeatLoader size={18} color="#E94560" /> : "Resend Link"}
       </Button>
      </FlexBox>
     </>
    )}
   </div>
  </div>
 );
}
