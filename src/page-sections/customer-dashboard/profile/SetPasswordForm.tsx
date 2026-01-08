// "use client";
// import { Button } from "@component/buttons";
// import { Shield } from "lucide-react";
// import { useState, CSSProperties, useEffect } from "react";
// import SetPassword from "./SetPassword";
// import axios from "axios";
// import { toast } from "react-toastify";
// import ApiBaseUrl from "api/ApiBaseUrl";

// const styles = {
//   container: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     background: "#fff",
//   } as CSSProperties,
//   innerContainer: {
//     width: "100%",
//     maxWidth: "28rem",
//     display: "flex",
//     flexDirection: "column",
//   } as CSSProperties,
//   iconWrapper: {
//     display: "flex",
//     justifyContent: "center",
//   } as CSSProperties,
//   iconCircle: {
//     width: "6rem",
//     height: "6rem",
//     borderRadius: "50%",
//     backgroundColor: "#E8F1FF",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   } as CSSProperties,
//   icon: {
//     width: "3rem",
//     height: "3rem",
//     color: "#4B8BF7",
//   } as CSSProperties,
//   textContent: {
//     textAlign: "center",
//     display: "flex",
//     flexDirection: "column",
//   } as CSSProperties,
//   title: {
//     fontSize: "1.25rem",
//     fontWeight: 500,
//     color: "#374151",
//   } as CSSProperties,
//   subtitle: {
//     fontSize: "1rem",
//     color: "#6B7280",
//   } as CSSProperties,
//   buttonContainer: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "0.75rem",
//   } as CSSProperties,
//   input: {
//     width: "100%",
//     padding: "0.5rem",
//     fontSize: "1rem",
//     border: "1px solid #E5E7EB",
//     borderRadius: "0.375rem",
//     marginBottom: "1rem",
//   } as CSSProperties,
//   errorMessage: {
//     color: "red",
//     fontSize: "0.875rem",
//     marginTop: "0.5rem",
//   } as CSSProperties,
//   timer: {
//     textAlign: "center",
//     marginTop: "20px",
//   } as CSSProperties,
// };

// export default function SetPasswordForm() {
//   const [isOtpPage, setIsOtpPage] = useState(false);
//   const [isPasswordPage, setIsPasswordPage] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const [timer, setTimer] = useState(180); // 3 minutes in seconds
//   const [isTimerActive, setIsTimerActive] = useState(true);
//   const [verificationMethod, setVerificationMethod] = useState<"email" | "phone">("email"); // Track verification method

//   // Handle verification through email
//   const handleVerifyThroughEmail = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         console.error("Authentication token not found!");
//         return;
//       }

//       const response = await axios.get(`${ApiBaseUrl.baseUrl}verify/password/reset`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log("API response:", response.data);
//       toast.success(response.data.message || "OTP sent successfully to your email.");
//       setIsOtpPage(true);
//       setVerificationMethod("email");
//     } catch (error) {
//       console.error("Error verifying through email:", error);
//       toast.error("Error sending OTP. Please try again.");
//     }
//   };

//   // Handle verification through phone
//   const handleVerifyThroughPhone = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         console.error("Authentication token not found!");
//         return;
//       }

//       const response = await axios.get(`${ApiBaseUrl.baseUrl}verify/password/phone/reset`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log("API response:", response.data);
//       toast.success(response.data.message || "OTP sent successfully to your phone.");
//       setIsOtpPage(true);
//       setVerificationMethod("phone");
//     } catch (error) {
//       console.error("Error verifying through phone:", error);
//       toast.error("Error sending OTP. Please try again.");
//     }
//   };

//   // Handle OTP submission
//   const handleOtpSubmit = async () => {
//     if (otp.length !== 6) {
//       setError("OTP must be exactly 6 digits.");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         console.error("Authentication token not found!");
//         return;
//       }

//       const response = await axios.post(
//         `${ApiBaseUrl.baseUrl}check/password/reset`,
//         { code: otp },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("OTP verification response:", response.data);
//       toast.success(response.data.message || "OTP verified successfully.");
//       setIsPasswordPage(true);
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       toast.error("Invalid OTP. Please try again.");
//     }
//   };

//   // Timer effect
//   useEffect(() => {
//     if (isTimerActive && timer > 0) {
//       const interval = setInterval(() => {
//         setTimer((prevTimer) => prevTimer - 1);
//       }, 1000);

//       return () => clearInterval(interval);
//     } else if (timer === 0) {
//       setIsTimerActive(false);
//     }
//   }, [timer, isTimerActive]);

//   // Format timer in MM:SS format
//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
//   };

//   // Handle OTP input change
//   const handleOtpChange = (e) => {
//     const newOtp = e.target.value;

//     // Allow only digits and limit the length to 6
//     if (/^\d{0,6}$/.test(newOtp)) {
//       setOtp(newOtp);
//       if (newOtp.length > 6) {
//         setError("OTP cannot be more than 6 digits.");
//       } else {
//         setError("");
//       }
//     } else {
//       // If the input contains any non-numeric characters, reset the OTP value
//       setOtp(newOtp.replace(/[^0-9]/g, "")); // Remove anything that is not a number
//       setError("Only numeric values are allowed.");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.innerContainer}>
//         {isPasswordPage ? (
//           <SetPassword />
//         ) : isOtpPage ? (
//           <>
//             <div style={styles.textContent}>
//               <h1 style={styles.title}>Enter OTP</h1>
//               <p style={styles.subtitle}>
//                 We have sent an OTP to your {verificationMethod === "email" ? "email" : "phone"}. Please enter it below:
//               </p>
//             </div>
//             <input
//               type="text"
//               value={otp}
//               onChange={handleOtpChange}
//               style={styles.input}
//               placeholder="Enter OTP"
//               maxLength={6}
//             />
//             {/* {error && <p style={styles.errorMessage}>{error}</p>} */}
//             <span style={{
//               marginBottom: "12px",
//               marginTop: "-12px",
//               color: "red"
//             }}>OTP must be a 6-digit number.</span>
//             <Button
//               variant="outlined"
//               style={{ width: "100%" }}
//               onClick={handleOtpSubmit}
//               disabled={isTimerActive && timer > 0 ? false : true}
//             >
//               Submit OTP
//             </Button>
//             <div style={styles.timer}>
//               {isTimerActive ? (
//                 <p>Time remaining: {formatTime(timer)}</p>
//               ) : (
//                 <p style={{ color: "red" }}>OTP expired. Please request a new one.</p>
//               )}
//             </div>
//           </>
//         ) : (
//           <>
//             <div style={styles.iconWrapper}>
//               <div style={styles.iconCircle}>
//                 <Shield style={styles.icon} />
//               </div>
//             </div>
//             <div style={styles.textContent}>
//               <h1 style={styles.title}>
//                 To protect your account security, we need to verify your identity
//               </h1>
//             </div>
//             <div style={styles.buttonContainer}>
//               <Button
//                 variant="outlined"
//                 style={{ width: "100%" }}
//                 onClick={handleVerifyThroughEmail}
//               >
//                 Verify through Email
//               </Button>
//               <Button
//                 variant="outlined"
//                 style={{ width: "100%" }}
//                 onClick={handleVerifyThroughPhone}
//               >
//                 Verify through Phone
//               </Button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { Button } from "@component/buttons";
import { Shield, Mail, Smartphone } from "lucide-react";
import { useState, CSSProperties, useEffect } from "react";
import SetPassword from "./SetPassword";
import axios from "axios";
import { toast } from "react-toastify";
import ApiBaseUrl from "api/ApiBaseUrl";

const styles = {
 container: {
  // display: "flex",
  // alignItems: "center",
  // justifyContent: "center",
  // background: "linear-gradient(135deg, #f9f9f9 0%, #f0f0f0 100%)",
  // minHeight: "100vh",
  // padding: "2rem",
 } as CSSProperties,
 innerContainer: {
  width: "100%",
  maxWidth: "28rem",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  background: "#fff",
  borderRadius: "1rem",
  // boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
  // padding: "2.5rem",
  margin: "auto",
 } as CSSProperties,
 iconWrapper: {
  display: "flex",
  justifyContent: "center",
  marginBottom: "0.5rem",
 } as CSSProperties,
 iconCircle: {
  width: "5rem",
  height: "5rem",
  borderRadius: "50%",
  backgroundColor: "rgba(233, 69, 96, 0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
 } as CSSProperties,
 icon: {
  width: "2.5rem",
  height: "2.5rem",
  color: "rgb(233, 69, 96)",
 } as CSSProperties,
 textContent: {
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  marginBottom: "0.5rem",
 } as CSSProperties,
 title: {
  fontSize: "1.5rem",
  fontWeight: 600,
  color: "#111827",
  lineHeight: "1.3",
  margin: 0,
 } as CSSProperties,
 subtitle: {
  fontSize: "1rem",
  color: "#6B7280",
  lineHeight: "1.5",
  margin: 0,
 } as CSSProperties,
 buttonContainer: {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  marginTop: "0.5rem",
 } as CSSProperties,
 inputContainer: {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  marginTop: "0.5rem",
 } as CSSProperties,
 input: {
  width: "100%",
  padding: "0.875rem 1rem",
  fontSize: "1rem",
  border: "1px solid #E5E7EB",
  borderRadius: "0.5rem",
  backgroundColor: "#f9fafb",
  transition: "all 0.2s ease",
 } as CSSProperties,
 inputFocus: {
  outline: "none",
  borderColor: "rgb(233, 69, 96)",
  boxShadow: "0 0 0 3px rgba(233, 69, 96, 0.2)",
 } as CSSProperties,
 errorMessage: {
  color: "#ef4444",
  fontSize: "0.875rem",
  marginTop: "-0.5rem",
 } as CSSProperties,
 timer: {
  textAlign: "center",
  fontSize: "0.875rem",
  marginTop: "0.5rem",
 } as CSSProperties,
 timerActive: {
  color: "rgb(233, 69, 96)",
  fontWeight: 500,
 } as CSSProperties,
 timerExpired: {
  color: "#ef4444",
  fontWeight: 500,
 } as CSSProperties,
 methodButton: {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.75rem",
  padding: "0.875rem 1rem",
  borderRadius: "0.5rem",
  border: "1px solid #E5E7EB",
  backgroundColor: "#fff",
  color: "#111827",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.2s ease",
 } as CSSProperties,
 methodButtonHover: {
  borderColor: "rgb(233, 69, 96)",
  backgroundColor: "rgba(233, 69, 96, 0.03)",
 } as CSSProperties,
 submitButton: {
  backgroundColor: "rgb(233, 69, 96)",
  color: "#fff",
  fontWeight: 500,
  padding: "0.875rem 1rem",
  borderRadius: "0.5rem",
  border: "none",
  cursor: "pointer",
  transition: "all 0.2s ease",
  marginTop: "0.5rem",
 } as CSSProperties,
 submitButtonHover: {
  backgroundColor: "rgba(233, 69, 96, 0.9)",
  transform: "translateY(-1px)",
 } as CSSProperties,
 submitButtonDisabled: {
  backgroundColor: "#E5E7EB",
  color: "#9CA3AF",
  cursor: "not-allowed",
 } as CSSProperties,
};

export default function SetPasswordForm() {
 const [isOtpPage, setIsOtpPage] = useState(false);
 const [isPasswordPage, setIsPasswordPage] = useState(false);
 const [otp, setOtp] = useState("");
 const [error, setError] = useState("");
 const [timer, setTimer] = useState(180);
 const [isTimerActive, setIsTimerActive] = useState(true);
 const [verificationMethod, setVerificationMethod] = useState<
  "email" | "phone"
 >("email");
 const [isInputFocused, setIsInputFocused] = useState(false);

 const handleVerifyThroughEmail = async () => {
  try {
   const token = localStorage.getItem("token");
   if (!token) {
    console.error("Authentication token not found!");
    return;
   }

   const response = await axios.get(
    `${ApiBaseUrl.baseUrl}verify/password/reset`,
    {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    }
   );

   toast.success(
    response.data.message || "OTP sent successfully to your email."
   );
   setIsOtpPage(true);
   setVerificationMethod("email");
   setTimer(180);
   setIsTimerActive(true);
  } catch (error) {
   console.error("Error verifying through email:", error);
   toast.error("Error sending OTP. Please try again.");
  }
 };

 const handleVerifyThroughPhone = async () => {
  try {
   const token = localStorage.getItem("token");
   if (!token) {
    console.error("Authentication token not found!");
    return;
   }

   const response = await axios.get(
    `${ApiBaseUrl.baseUrl}verify/password/phone/reset`,
    {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    }
   );

   toast.success(
    response.data.message || "OTP sent successfully to your phone."
   );
   setIsOtpPage(true);
   setVerificationMethod("phone");
   setTimer(180);
   setIsTimerActive(true);
  } catch (error) {
   console.error("Error verifying through phone:", error);
   toast.error("Error sending OTP. Please try again.");
  }
 };

 const handleOtpSubmit = async () => {
  if (otp.length !== 6) {
   setError("OTP must be exactly 6 digits.");
   return;
  }

  try {
   const token = localStorage.getItem("token");
   if (!token) {
    console.error("Authentication token not found!");
    return;
   }

   const response = await axios.post(
    `${ApiBaseUrl.baseUrl}check/password/reset`,
    { code: otp },
    {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    }
   );

   toast.success(response.data.message || "OTP verified successfully.");
   setIsPasswordPage(true);
  } catch (error) {
   console.error("Error verifying OTP:", error);
   toast.error("Invalid OTP. Please try again.");
   setError("Invalid OTP. Please check and try again.");
  }
 };

 useEffect(() => {
  if (isTimerActive && timer > 0) {
   const interval = setInterval(() => {
    setTimer((prevTimer) => prevTimer - 1);
   }, 1000);
   return () => clearInterval(interval);
  } else if (timer === 0) {
   setIsTimerActive(false);
  }
 }, [timer, isTimerActive]);

 const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
 };

 const handleOtpChange = (e) => {
  const newOtp = e.target.value;
  if (/^\d{0,6}$/.test(newOtp)) {
   setOtp(newOtp);
   if (newOtp.length > 6) {
    setError("OTP cannot be more than 6 digits.");
   } else {
    setError("");
   }
  } else {
   setOtp(newOtp.replace(/[^0-9]/g, ""));
   setError("Only numeric values are allowed.");
  }
 };

 return (
  <div style={styles.container}>
   <div style={styles.innerContainer}>
    {isPasswordPage ? (
     <SetPassword />
    ) : isOtpPage ? (
     <>
      <div style={styles.iconWrapper}>
       <div style={styles.iconCircle}>
        <Shield style={styles.icon} />
       </div>
      </div>
      <div style={styles.textContent}>
       <h1 style={styles.title}>Enter Verification Code</h1>
       <p style={styles.subtitle}>
        We've sent a 6-digit code to your{" "}
        {verificationMethod === "email" ? "email address" : "phone number"}.
       </p>
      </div>
      <div style={styles.inputContainer}>
       <input
        type="text"
        value={otp}
        onChange={handleOtpChange}
        style={{
         ...styles.input,
         ...(isInputFocused ? styles.inputFocus : {}),
        }}
        placeholder="Enter 6-digit code"
        maxLength={6}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
       />
       {error && <p style={styles.errorMessage}>{error}</p>}
       <button
        style={{
         ...styles.submitButton,
         ...(!isTimerActive || timer === 0 ? styles.submitButtonDisabled : {}),
        }}
        onClick={handleOtpSubmit}
        disabled={!isTimerActive || timer === 0}
        onMouseEnter={(e) => {
         if (isTimerActive && timer > 0) {
          e.currentTarget.style.backgroundColor = "rgba(233, 69, 96, 0.9)";
         }
        }}
        onMouseLeave={(e) => {
         e.currentTarget.style.backgroundColor =
          !isTimerActive || timer === 0 ? "#E5E7EB" : "rgb(233, 69, 96)";
        }}
       >
        Verify Code
       </button>
      </div>
      <div style={styles.timer}>
       {isTimerActive ? (
        <p style={styles.timerActive}>Code expires in: {formatTime(timer)}</p>
       ) : (
        <p style={styles.timerExpired}>
         Code has expired. Please request a new one.
        </p>
       )}
      </div>
     </>
    ) : (
     <>
      <div style={styles.iconWrapper}>
       <div style={styles.iconCircle}>
        <Shield style={styles.icon} />
       </div>
      </div>
      <div style={styles.textContent}>
       <h1 style={styles.title}>Secure Your Account</h1>
       <p style={styles.subtitle}>
        Verify your identity to reset your password
       </p>
      </div>
      <div style={styles.buttonContainer}>
       <button
        style={styles.methodButton}
        onClick={handleVerifyThroughEmail}
        onMouseEnter={(e) => {
         e.currentTarget.style.borderColor = "rgb(233, 69, 96)";
         e.currentTarget.style.backgroundColor = "rgba(233, 69, 96, 0.03)";
        }}
        onMouseLeave={(e) => {
         e.currentTarget.style.borderColor = "#E5E7EB";
         e.currentTarget.style.backgroundColor = "#fff";
        }}
       >
        <Mail size={20} color="rgb(233, 69, 96)" />
        Verify via Email
       </button>
       <button
        style={styles.methodButton}
        onClick={handleVerifyThroughPhone}
        onMouseEnter={(e) => {
         e.currentTarget.style.borderColor = "rgb(233, 69, 96)";
         e.currentTarget.style.backgroundColor = "rgba(233, 69, 96, 0.03)";
        }}
        onMouseLeave={(e) => {
         e.currentTarget.style.borderColor = "#E5E7EB";
         e.currentTarget.style.backgroundColor = "#fff";
        }}
       >
        <Smartphone size={20} color="rgb(233, 69, 96)" />
        Verify via Phone
       </button>
      </div>
     </>
    )}
   </div>
  </div>
 );
}
