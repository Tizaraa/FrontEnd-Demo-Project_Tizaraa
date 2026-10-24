"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import BeatLoader from "react-spinners/BeatLoader";

import FlexBox from "@component/FlexBox";
import TextField from "@component/text-field";
import { Button, IconButton } from "@component/buttons";
import ApiBaseUrl from "api/ApiBaseUrl";
import useResetCountdown, { formatCountdown } from "./useResetCountdown";
import tz from "../../theme/tizaraa";

const helperStyle = {
 margin: "0 0 20px",
 fontSize: "14px",
 lineHeight: 1.55,
 color: tz.color.slate,
};

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
    role="dialog"
    aria-modal="true"
    aria-labelledby="forgot-password-title"
    style={{
     background: tz.color.paper,
     border: `1px solid ${tz.color.line}`,
     borderRadius: tz.radius.lg,
     padding: "28px 24px 24px",
     width: "420px",
     maxWidth: "calc(100% - 32px)",
     boxShadow: tz.elevation.overlay,
     position: "relative",
     fontFamily: tz.font.body,
     color: tz.color.inkSoft,
    }}
   >
    <IconButton
     type="button"
     aria-label="Close"
     onClick={handleClose}
     style={{
      position: "absolute",
      top: "12px",
      right: "12px",
      width: "36px",
      height: "36px",
      padding: 0,
      backgroundColor: tz.color.mist,
      color: tz.color.inkSoft,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
     }}
    >
     <span aria-hidden="true" style={{ fontSize: "20px", lineHeight: 1 }}>
      &times;
     </span>
    </IconButton>

    <h2
     id="forgot-password-title"
     style={{
      margin: "0 40px 8px 0",
      fontFamily: tz.font.display,
      fontSize: "22px",
      fontWeight: 600,
      lineHeight: 1.25,
      color: tz.color.ink,
     }}
    >
     Forgot your password?
    </h2>

    {!linkSent ? (
     <>
      <p style={helperStyle}>
       Enter your account email and we will send you a password reset link.
      </p>
      <TextField
       fullwidth
       type="email"
       mb="1.5rem"
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
      <Button
       size="medium"
       variant="contained"
       color="primary"
       fullwidth
       disabled={loading}
       onClick={handleSend}
      >
       {loading ? (
        <BeatLoader size={12} color={tz.color.slate} />
       ) : (
        "Send Reset Link"
       )}
      </Button>
     </>
    ) : (
     <>
      <p style={helperStyle}>
       {expired
        ? "The reset link has expired. Send a new one to continue."
        : `We sent a reset link to ${email}. It is valid for 1 minute only.`}
      </p>
      <FlexBox
       justifyContent="space-between"
       alignItems="center"
       flexWrap="wrap"
       style={{ gap: "12px" }}
      >
       <span
        style={{
         fontSize: "13px",
         fontWeight: 500,
         fontVariantNumeric: "tabular-nums",
         color: expired ? tz.tone.danger.fg : tz.tone.success.fg,
        }}
       >
        {expired
         ? "Link expired"
         : `Link expires in: ${formatCountdown(secondsLeft ?? 0)}`}
       </span>
       <Button
        variant="outlined"
        color="secondary"
        disabled={loading || !expired}
        onClick={handleSend}
       >
        {loading ? (
         <BeatLoader size={12} color={tz.color.slate} />
        ) : (
         "Resend Link"
        )}
       </Button>
      </FlexBox>
     </>
    )}
   </div>
  </div>
 );
}
