"use client";
import { Button } from "@component/buttons";
import { Shield } from "lucide-react";
import { useState, CSSProperties } from "react";
import SetPassword from "./SetPassword"; 
import axios from "axios";
import { toast } from "react-toastify";

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
  } as CSSProperties,
  innerContainer: {
    width: "100%",
    maxWidth: "28rem",
    display: "flex",
    flexDirection: "column",
  } as CSSProperties,
  iconWrapper: {
    display: "flex",
    justifyContent: "center",
  } as CSSProperties,
  iconCircle: {
    width: "6rem",
    height: "6rem",
    borderRadius: "50%",
    backgroundColor: "#E8F1FF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as CSSProperties,
  icon: {
    width: "3rem",
    height: "3rem",
    color: "#4B8BF7",
  } as CSSProperties,
  textContent: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
  } as CSSProperties,
  title: {
    fontSize: "1.25rem",
    fontWeight: 500,
    color: "#374151",
  } as CSSProperties,
  subtitle: {
    fontSize: "1rem",
    color: "#6B7280",
  } as CSSProperties,
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  } as CSSProperties,
  input: {
    width: "100%",
    padding: "0.5rem",
    fontSize: "1rem",
    border: "1px solid #E5E7EB",
    borderRadius: "0.375rem",
    marginBottom: "1rem",
  } as CSSProperties,
};

export default function SetPasswordForm() {
  const [isOtpPage, setIsOtpPage] = useState(false);
  const [isPasswordPage, setIsPasswordPage] = useState(false);
  const [otp, setOtp] = useState("");

  // Handle verification through email
  const handleVerifyThroughEmail = async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      // Check if token exists
      if (!token) {
        console.error("Authentication token not found!");
        return;
      }

      // Make the API request with the token for authentication
      const response = await axios.get("https://frontend.tizaraa.shop/api/verify/password/reset", {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token to the request headers
        },
      });

      console.log("API response:", response.data);
      
      // Show success toast with message from the API response
      toast.success(response.data.message || "OTP sent successfully to your email.");

      // Move to OTP page
      setIsOtpPage(true);
    } catch (error) {
      console.error("Error verifying through email:", error);
      toast.error("Error sending OTP. Please try again.");
    }
  };

  // Handle OTP submission
  const handleOtpSubmit = async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      // Check if token exists
      if (!token) {
        console.error("Authentication token not found!");
        return;
      }

      // Make the API request to check the OTP
      const response = await axios.post(
        "https://frontend.tizaraa.shop/api/check/password/reset",
        { code: otp },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("OTP verification response:", response.data);

      // Show success toast and move to password page
      toast.success(response.data.message || "OTP verified successfully.");
      setIsPasswordPage(true);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Invalid OTP. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        {isPasswordPage ? (
          <SetPassword /> 
        ) : isOtpPage ? (
          <>
            <div style={styles.textContent}>
              <h1 style={styles.title}>Enter OTP</h1>
              <p style={styles.subtitle}>We have sent an OTP to your email. Please enter it below:</p>
            </div>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={styles.input}
              placeholder="Enter OTP"
            />
            <Button
              variant="outlined"
              style={{ width: "100%" }}
              onClick={handleOtpSubmit}
            >
              Submit OTP
            </Button>
          </>
        ) : (
          <>
            <div style={styles.iconWrapper}>
              <div style={styles.iconCircle}>
                <Shield style={styles.icon} />
              </div>
            </div>
            <div style={styles.textContent}>
              <h1 style={styles.title}>
                To protect your account security, we need to verify your identity
              </h1>
            </div>
            <div style={styles.buttonContainer}>
              <Button
                variant="outlined"
                style={{ width: "100%" }}
                onClick={handleVerifyThroughEmail}
              >
                Verify through Email
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}