"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import BeatLoader from "react-spinners/BeatLoader";

import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import TextField from "@component/text-field";
import { Button, IconButton } from "@component/buttons";
import ApiBaseUrl from "api/ApiBaseUrl";
import { AuthCard, AuthSubtitle, AuthTitle } from "./styles";
import tz from "../../theme/tizaraa";
import useVisibility from "./useVisibility";
import useResetCountdown, { formatCountdown } from "./useResetCountdown";

// Mirrors the backend rule (min 8, mixed case, number, symbol) so users see errors before submitting.
const formSchema = yup.object().shape({
 password: yup
  .string()
  .required("New password is required")
  .min(8, "At least 8 characters")
  .matches(/[A-Z]/, "At least 1 uppercase letter")
  .matches(/[a-z]/, "At least 1 lowercase letter")
  .matches(/[0-9]/, "At least 1 number")
  .matches(/[^A-Za-z0-9]/, "At least 1 special character"),
 confirmPassword: yup
  .string()
  .required("Confirm password is required")
  .oneOf([yup.ref("password")], "Passwords do not match"),
});

type LinkState = "checking" | "valid" | "invalid";

export default function ResetPassword() {
 const router = useRouter();
 const searchParams = useSearchParams();
 const email = searchParams.get("email") || "";
 const token = searchParams.get("token") || "";

 const [linkState, setLinkState] = useState<LinkState>("checking");
 const [loading, setLoading] = useState(false);
 const { secondsLeft, start, stop } = useResetCountdown();
 const newPasswordVisibility = useVisibility();
 const confirmPasswordVisibility = useVisibility();

 useEffect(() => {
  if (!email || !token) {
   setLinkState("invalid");
   return;
  }

  axios
   .post(`${ApiBaseUrl.localApiUrl}reset-password/status`, { email, token })
   .then((response) => {
    start(response.data.expires_in);
    setLinkState("valid");
   })
   .catch(() => setLinkState("invalid"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [email, token]);

 const expired = linkState === "invalid" || secondsLeft === 0;

 const handleFormSubmit = async (values: {
  password: string;
  confirmPassword: string;
 }) => {
  setLoading(true);
  try {
   await axios.post(`${ApiBaseUrl.localApiUrl}reset-password`, {
    email,
    token,
    password: values.password,
    password_confirmation: values.confirmPassword,
   });
   stop();
   router.push("/login?reset=success");
  } catch (error) {
   const errors = error.response?.data?.errors;
   toast.error(
    errors?.token?.[0] ||
     errors?.password?.[0] ||
     error.response?.data?.message ||
     "Failed to reset password.",
   );
  } finally {
   setLoading(false);
  }
 };

 const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
  useFormik({
   initialValues: { password: "", confirmPassword: "" },
   onSubmit: handleFormSubmit,
   validationSchema: formSchema,
  });

 const eyeButton = ({
  passwordVisibility,
  togglePasswordVisibility,
 }: ReturnType<typeof useVisibility>) => (
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
 );

 return (
  <AuthCard>
   <AuthTitle>Reset Your Password</AuthTitle>

   {linkState === "checking" && (
    <FlexBox justifyContent="center" my="2rem">
     <BeatLoader size={12} color={tz.color.emberDeep} />
    </FlexBox>
   )}

   {expired && linkState !== "checking" && (
    <>
     <AuthSubtitle>
      This reset link is invalid or has expired. Links are valid for 1
      minute only.
     </AuthSubtitle>
     <Link href="/login">
      <Button size="medium" variant="contained" color="primary" fullwidth>
       Back to Login
      </Button>
     </Link>
    </>
   )}

   {linkState === "valid" && !expired && (
    <form onSubmit={handleSubmit} autoComplete="off">
     <AuthSubtitle style={{ marginBottom: 8 }}>
      Choose a new password for {email}
     </AuthSubtitle>
     <p
      style={{
       margin: "0 0 24px",
       textAlign: "center",
       fontSize: 13,
       fontVariantNumeric: "tabular-nums",
       color:
        (secondsLeft ?? 0) <= 10 ? tz.tone.danger.fg : tz.color.slate,
      }}
     >
      Link expires in: {formatCountdown(secondsLeft ?? 0)}
     </p>

     <TextField
      fullwidth
      mb="1rem"
      name="password"
      label="New Password"
      placeholder="Enter New Password"
      autoComplete="new-password"
      value={values.password}
      onChange={handleChange}
      onBlur={handleBlur}
      errorText={touched.password && errors.password}
      type={newPasswordVisibility.passwordVisibility ? "text" : "password"}
      endAdornment={eyeButton(newPasswordVisibility)}
     />

     <TextField
      fullwidth
      mb="1.5rem"
      name="confirmPassword"
      label="Confirm Password"
      placeholder="Confirm New Password"
      autoComplete="new-password"
      value={values.confirmPassword}
      onChange={handleChange}
      onBlur={handleBlur}
      errorText={touched.confirmPassword && errors.confirmPassword}
      type={
       confirmPasswordVisibility.passwordVisibility ? "text" : "password"
      }
      endAdornment={eyeButton(confirmPasswordVisibility)}
     />

     <Button
      size="medium"
      variant="contained"
      color="primary"
      type="submit"
      fullwidth
      disabled={loading}
     >
      {loading ? (
       <BeatLoader size={12} color={tz.color.slate} />
      ) : (
       "Reset Password"
      )}
     </Button>
    </form>
   )}
  </AuthCard>
 );
}
