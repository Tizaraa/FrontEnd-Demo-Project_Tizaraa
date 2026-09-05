"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

import FlexBox from "@component/FlexBox";
import TextField from "@component/text-field";
import { Button, IconButton } from "@component/buttons";
import { H3, H5, SemiSpan } from "@component/Typography";
import Icon from "@component/icon/Icon";
import CommonHeader from "@component/header/CommonHeader";
import BeatLoader from "react-spinners/BeatLoader";
import { useAppContext } from "contexts/app-context/AppContext";
import ApiBaseUrl from "api/ApiBaseUrl";
import useVisibility from "page-sections/auth/useVisibility";

import { StyledRoot } from "page-sections/auth/styles";

export default function CorporateInvitePage({ params }: { params: { token: string } }) {
  const { token } = params;
  const router = useRouter();
  const { dispatch } = useAppContext();
  const { passwordVisibility, togglePasswordVisibility } = useVisibility();
  
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [inviteDetails, setInviteDetails] = useState<{ email: string; name: string; phone: string | null; company_name: string; shop_slug: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`${ApiBaseUrl.localApiUrl}corporate/invite/${token}`);
        if (response.data?.data) {
          setInviteDetails(response.data.data);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Invalid or expired invitation token.");
      } finally {
        setLoadingDetails(false);
      }
    };
    if (token) {
        fetchDetails();
    }
  }, [token]);

  const formSchema = yup.object().shape({
    password: yup.string().required("Password is required").min(6, "At least 6 characters"),
    password_confirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required("Confirm password is required"),
    phone: yup
      .string()
      .nullable()
      .test("phone-format", "Enter a valid 11-digit phone number (e.g. 01712345678)", (value) => !value || /^01[3-9]\d{8}$/.test(value)),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: { password: "", password_confirmation: "", phone: "" },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        const response = await axios.post(`${ApiBaseUrl.localApiUrl}corporate/invite/${token}`, values);
        const data = response.data?.data;
        
        if (data?.token) {
          Cookies.set("token", data.token, { expires: 7 });
          localStorage.setItem("token", data.token);
          localStorage.setItem("userInfo", JSON.stringify(data.user));

          dispatch({
            type: "LOGIN",
            payload: { authToken: data.token, userInfo: data.user },
          });

          if (data.employee_status === "active") {
            toast.success(`Welcome to ${data.company_name}! Your account is active.`);
            router.push(`/shops/${data.shop_slug}`);
          } else {
            toast.success("Registration complete! Your account is pending approval from the corporate admin.");
            router.push("/");
          }
        }
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to accept invitation.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (inviteDetails?.phone) {
      setFieldValue("phone", inviteDetails.phone);
    }
  }, [inviteDetails]);

  if (loadingDetails) {
    return (
      <FlexBox justifyContent="center" alignItems="center" height="100vh">
        <BeatLoader color="#e94560" />
      </FlexBox>
    );
  }

  if (error || !inviteDetails) {
    return (
      <FlexBox justifyContent="center" alignItems="center" height="100vh" flexDirection="column">
        <H3 mb="1rem" color="red">Invitation Error</H3>
        <SemiSpan>{error}</SemiSpan>
        <Button mt="2rem" variant="contained" color="primary" onClick={() => router.push('/')}>
          Go to Homepage
        </Button>
      </FlexBox>
    );
  }

  return (
    <>
      <CommonHeader />
      <StyledRoot mx="auto" my="2rem" boxShadow="large" borderRadius={8}>
        <form className="content" onSubmit={handleSubmit} autoComplete="off">
          <H3 textAlign="center" mb="0.5rem">
            Join {inviteDetails.company_name}
          </H3>

          <H5 fontWeight="600" fontSize="13px" color="gray.800" textAlign="center" mb="2.25rem">
            Complete your registration as an employee
          </H5>

          <TextField
            fullwidth
            mb="1rem"
            label="Name"
            value={inviteDetails.name || ""}
            disabled
          />

          <TextField
            fullwidth
            mb="1rem"
            label="Email"
            value={inviteDetails.email}
            disabled
          />

          <TextField
            fullwidth
            mb="1rem"
            name="phone"
            label="Phone Number (Optional)"
            placeholder="Enter your phone number"
            inputMode="numeric"
            maxLength={11}
            value={values.phone}
            onBlur={handleBlur}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              let v = e.target.value.replace(/\D/g, "");
              if (v.startsWith("880")) v = "0" + v.slice(3);
              setFieldValue("phone", v.slice(0, 11));
            }}
            errorText={touched.phone && errors.phone}
            autoComplete="off"
          />

          <TextField
            mb="1rem"
            fullwidth
            name="password"
            label="Password"
            placeholder="Enter a new password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            errorText={touched.password && errors.password}
            type={passwordVisibility ? "text" : "password"}
            endAdornment={
              <IconButton p="0.25rem" mr="0.25rem" type="button" onClick={togglePasswordVisibility} color={passwordVisibility ? "gray.700" : "gray.600"}>
                <Icon variant="small" defaultcolor="currentColor">{passwordVisibility ? "eye-alt" : "eye"}</Icon>
              </IconButton>
            }
          />

          <TextField
            mb="1.5rem"
            fullwidth
            name="password_confirmation"
            label="Confirm Password"
            placeholder="Confirm your password"
            value={values.password_confirmation}
            onBlur={handleBlur}
            onChange={handleChange}
            errorText={touched.password_confirmation && errors.password_confirmation}
            type={passwordVisibility ? "text" : "password"}
            endAdornment={
              <IconButton p="0.25rem" mr="0.25rem" type="button" onClick={togglePasswordVisibility} color={passwordVisibility ? "gray.700" : "gray.600"}>
                <Icon variant="small" defaultcolor="currentColor">{passwordVisibility ? "eye-alt" : "eye"}</Icon>
              </IconButton>
            }
          />

          <Button mb="1.65rem" variant="contained" color="primary" type="submit" fullwidth disabled={submitting}>
            {submitting ? <BeatLoader size={18} color="#fff" /> : "Accept Invitation"}
          </Button>
        </form>
      </StyledRoot>
    </>
  );
}
