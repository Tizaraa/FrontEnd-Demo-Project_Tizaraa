"use client";

import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

import useVisibility from "./useVisibility";
import Select from "@component/Select";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import CheckBox from "@component/CheckBox";
import TextField from "@component/text-field";
import { Button, IconButton } from "@component/buttons";
import { H3, H6, SemiSpan } from "@component/Typography";
import { useRouter } from "next/navigation";

import { StyledRoot } from "./styles";
import CommonHeader from "@component/header/CommonHeader";

import BeatLoader from "react-spinners/BeatLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import axios from "@lib/axiosClient";
import useFetcher from "@hook/useFetcher";

// ──────────────────────────────────────────────

interface FormValues {
  name: string;
  email: string;
  phone: string;
  employee_id: string;
  nid: string;
  corporate_shop_id: string;
  password: string;
  confirm_password: string;
  agreement: boolean;
}

export default function EmployeeSignup() {
  const { data } = useFetcher(`v1/corporate-shop`);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    passwordVisibility: showPassword,
    togglePasswordVisibility: togglePassword,
  } = useVisibility();

  const {
    passwordVisibility: showConfirmPassword,
    togglePasswordVisibility: toggleConfirmPassword,
  } = useVisibility();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      agreement: false,
    },
  });

  const password = watch("password");

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(`v1/employee/registration`, data);
      const result = response.data;

      if (response.status === 200) {
        sessionStorage.setItem("userId", result.id);
        router.push("/emailValidation");
        toast.success(result.message || "Account created successfully!");
      } else {
        toast.error(result.message || "Registration failed");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const options = data?.data || [];

  return (
    <>
      <CommonHeader />

      <StyledRoot mx="auto" my="1.5rem" boxShadow="large" borderRadius={8}>
        <form className="content" onSubmit={handleSubmit(onSubmit)} noValidate>
          <H3 textAlign="center" mb="1.5rem">
            Create Your Account
          </H3>

          {/* Name */}
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullwidth
                mb="1rem"
                label={
                  <>
                    Full Name <span style={{ color: "#e94560" }}>*</span>
                  </>
                }
                placeholder="Enter Your Name"
                errorText={errors.name?.message}
              />
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullwidth
                mb="1rem"
                type="email"
                label={
                  <>
                    Email <span style={{ color: "#e94560" }}>*</span>
                  </>
                }
                placeholder="Enter Your Email"
                errorText={errors.email?.message}
              />
            )}
          />

          {/* Phone */}
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "Phone is required",
              pattern: {
                value: /^01[0-9]{9}$/,
                message: "Phone must be 11 digits starting with 01",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullwidth
                mb="1rem"
                type="tel"
                label={
                  <>
                    Phone <span style={{ color: "#e94560" }}>*</span>
                  </>
                }
                placeholder="Enter Your Phone Number"
                errorText={errors.phone?.message}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            )}
          />

          {/* Employee ID */}
          <Controller
            name="employee_id"
            control={control}
            rules={{
              required: "Employee ID is required",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullwidth
                mb="1rem"
                type="text"
                label={
                  <>
                    Employee ID <span style={{ color: "#e94560" }}>*</span>
                  </>
                }
                placeholder="Enter Your Employee ID"
                errorText={errors.employee_id?.message}
              />
            )}
          />

          {/* NID */}
          <Controller
            name="nid"
            control={control}
            rules={{
              required: "NID is required",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullwidth
                mb="1rem"
                type="text"
                label={
                  <>
                    NID <span style={{ color: "#e94560" }}>*</span>
                  </>
                }
                placeholder="Enter Your NID"
                errorText={errors.nid?.message}
              />
            )}
          />

          {/* Corporate Shop */}
          <Controller
            name="corporate_shop_id"
            control={control}
            rules={{ required: "Please select your corporate shop" }}
            render={({ field }) => (
              <Select
                mb="1rem"
                label="Corporate Shop"
                placeholder="Select Corporate Shop"
                options={options}
                errorText={errors.corporate_shop_id?.message}
                value={options.find((opt: any) => opt.value === field.value)}
                onChange={(option: any) => field.onChange(option?.value || "")}
                isSearchable={false}
              />
            )}
          />
          {/* Company - using your custom Select component */}

          {/* Password */}
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: { value: 3, message: "At least 3 characters" },
              maxLength: { value: 25, message: "At most 25 characters" },
              // pattern: {
              //   value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()]).{9,}$/,
              //   message:
              //     "Must contain uppercase, lowercase & special character",
              // },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullwidth
                mb="0.5rem"
                type={showPassword ? "text" : "password"}
                label={
                  <>
                    Password <span style={{ color: "#e94560" }}>*</span>
                  </>
                }
                placeholder="Enter Your Password"
                errorText={errors.password?.message}
                endAdornment={
                  <IconButton
                    p="0.25rem"
                    mr="0.25rem"
                    type="button"
                    onClick={togglePassword}
                  >
                    <Icon variant="small">
                      {showPassword ? "eye-alt" : "eye"}
                    </Icon>
                  </IconButton>
                }
              />
            )}
          />

          {password && errors.password && (
            <FlexBox alignItems="center" mt="0.5rem" mb="1rem">
              <FontAwesomeIcon
                icon={faCircleExclamation}
                style={{
                  color: "#e94560",
                  marginRight: "0.5rem",
                  fontSize: "0.9rem",
                }}
              />
              <span style={{ fontSize: "0.8125rem", color: "#555" }}>
                Password must be 9+ chars with uppercase, lowercase & special
                character
              </span>
            </FlexBox>
          )}

          {/* Confirm Password */}
          <Controller
            name="confirm_password"
            control={control}
            rules={{
              required: "Please confirm password",
              validate: (val) => val === password || "Passwords don't match",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullwidth
                mb="1rem"
                type={showConfirmPassword ? "text" : "password"}
                label={
                  <>
                    Confirm Password <span style={{ color: "#e94560" }}>*</span>
                  </>
                }
                placeholder="Confirm Your Password"
                errorText={errors.confirm_password?.message}
                endAdornment={
                  <IconButton
                    p="0.25rem"
                    mr="0.25rem"
                    type="button"
                    onClick={toggleConfirmPassword}
                  >
                    <Icon variant="small">
                      {showConfirmPassword ? "eye-alt" : "eye"}
                    </Icon>
                  </IconButton>
                }
              />
            )}
          />

          {/* Agreement */}
          <Controller
            name="agreement"
            control={control}
            rules={{ required: "You must accept the terms" }}
            render={({ field }) => (
              <CheckBox
                name={field.name}
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
                mb="1.25rem"
                color="secondary"
                label={
                  <FlexBox alignItems="center">
                    <SemiSpan>I agree to the</SemiSpan>
                    <a
                      href="/terms-and-conditions"
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      <H6
                        color="primary"
                        borderBottom="1px solid"
                        borderColor="primary.main"
                        display="inline"
                      >
                        Terms & Conditions
                      </H6>
                    </a>
                  </FlexBox>
                }
              />
            )}
          />

          {errors.agreement && (
            <span
              style={{
                color: "#e94560",
                fontSize: "0.8125rem",
                display: "block",
                marginBottom: "1rem",
              }}
            >
              {errors.agreement.message}
            </span>
          )}

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullwidth
            disabled={isSubmitting}
            mt="1.65rem"
          >
            {isSubmitting ? (
              <BeatLoader size={18} color="#fff" />
            ) : (
              "Create Account"
            )}
          </Button>

          <FlexBox justifyContent="center" py="19px">
            <SemiSpan>Already have an account?</SemiSpan>
            <Link href={{ pathname: "/login", query: { from: "signup" } }}>
              <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                Log in
              </H6>
            </Link>
          </FlexBox>
        </form>
      </StyledRoot>
    </>
  );
}
