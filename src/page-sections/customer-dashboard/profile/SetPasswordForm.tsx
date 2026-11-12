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
//     border: `1px solid ${tz.color.line}`,
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
import { Shield, Mail } from "lucide-react";
import { useState, CSSProperties, useEffect, useRef } from "react";
import SetPassword from "./SetPassword";
import axios from "axios";
import { toast } from "react-toastify";
import ApiBaseUrl from "api/ApiBaseUrl";
import tz from "../../../theme/tizaraa";

const OTP_LENGTH = 6;

/** Six single-digit boxes: auto-advance, backspace goes back, paste fills all. */
function OtpBoxes({
 value,
 onChange,
 hasError,
 disabled,
}: {
 value: string;
 onChange: (code: string) => void;
 hasError: boolean;
 disabled?: boolean;
}) {
 const refs = useRef<(HTMLInputElement | null)[]>([]);
 const [focused, setFocused] = useState<number | null>(null);
 const digits = Array.from({ length: OTP_LENGTH }, (_, i) => value[i] ?? "");

 useEffect(() => {
  refs.current[0]?.focus();
 }, []);

 const focusAt = (i: number) => {
  const el = refs.current[Math.max(0, Math.min(OTP_LENGTH - 1, i))];
  el?.focus();
  el?.select();
 };

 const setDigitsFrom = (start: number, incoming: string) => {
  const clean = incoming.replace(/\D/g, "");
  if (!clean) return;
  const next = digits.slice();
  for (let k = 0; k < clean.length && start + k < OTP_LENGTH; k++) next[start + k] = clean[k];
  onChange(next.join("").slice(0, OTP_LENGTH));
  focusAt(Math.min(start + clean.length, OTP_LENGTH - 1));
 };

 return (
  <div
   style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}
   onPaste={(e) => {
    e.preventDefault();
    setDigitsFrom(0, e.clipboardData.getData("text"));
   }}
  >
   {digits.map((d, i) => {
    const active = focused === i;
    return (
     <input
      key={i}
      ref={(el) => {
       refs.current[i] = el;
      }}
      type="text"
      inputMode="numeric"
      autoComplete={i === 0 ? "one-time-code" : "off"}
      aria-label={`Digit ${i + 1}`}
      maxLength={OTP_LENGTH}
      value={d}
      disabled={disabled}
      onFocus={(e) => {
       setFocused(i);
       e.target.select();
      }}
      onBlur={() => setFocused(null)}
      onChange={(e) => {
       const v = e.target.value.replace(/\D/g, "");
       if (!v) {
        const next = digits.slice();
        next[i] = "";
        onChange(next.join(""));
        return;
       }
       // One digit typed, or several from autofill — spread them forward.
       setDigitsFrom(i, v.length > 1 && d ? v.replace(d, "") || v : v);
      }}
      onKeyDown={(e) => {
       if (e.key === "Backspace" && !digits[i] && i > 0) {
        e.preventDefault();
        const next = digits.slice();
        next[i - 1] = "";
        onChange(next.join(""));
        focusAt(i - 1);
       } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        focusAt(i - 1);
       } else if (e.key === "ArrowRight") {
        e.preventDefault();
        focusAt(i + 1);
       }
      }}
      style={{
       width: "3rem",
       height: "3.5rem",
       textAlign: "center",
       fontSize: "1.5rem",
       fontWeight: 700,
       color: tz.color.ink,
       borderRadius: "0.75rem",
       border: `1.5px solid ${hasError ? tz.tone.danger.fg : active ? tz.color.emberDeep : d ? tz.color.emberDeep + "66" : tz.color.line}`,
       backgroundColor: d ? tz.color.emberTint : tz.color.paper,
       boxShadow: active ? tz.focusRing : "none",
       outline: "none",
       transition: "all 0.15s ease",
       caretColor: tz.color.emberDeep,
       minWidth: 0,
       flex: "0 1 3rem",
      }}
     />
    );
   })}
  </div>
 );
}

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
  background: tz.color.paper,
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
  backgroundColor: tz.color.emberTint,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
 } as CSSProperties,
 icon: {
  width: "2.5rem",
  height: "2.5rem",
  color: tz.color.emberDeep,
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
  color: tz.color.ink,
  lineHeight: "1.3",
  margin: 0,
 } as CSSProperties,
 subtitle: {
  fontSize: "1rem",
  color: tz.color.slate,
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
  border: `1px solid ${tz.color.line}`,
  borderRadius: `${tz.radius.sm}px`,
  backgroundColor: tz.color.paper,
  transition: "all 0.2s ease",
 } as CSSProperties,
 inputFocus: {
  outline: "none",
  borderColor: tz.color.emberDeep,
  boxShadow: tz.focusRing,
 } as CSSProperties,
 errorMessage: {
  color: tz.tone.danger.fg,
  fontSize: "0.875rem",
  marginTop: "-0.5rem",
 } as CSSProperties,
 timer: {
  textAlign: "center",
  fontSize: "0.875rem",
  marginTop: "0.5rem",
 } as CSSProperties,
 timerActive: {
  color: tz.color.emberDeep,
  fontWeight: 500,
 } as CSSProperties,
 timerExpired: {
  color: tz.tone.danger.fg,
  fontWeight: 500,
 } as CSSProperties,
 methodButton: {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.75rem",
  padding: "0.875rem 1rem",
  borderRadius: "0.5rem",
  border: `1px solid ${tz.color.line}`,
  backgroundColor: tz.color.paper,
  color: tz.color.ink,
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.2s ease",
 } as CSSProperties,
 methodButtonHover: {
  borderColor: tz.color.emberDeep,
  backgroundColor: tz.color.emberTint,
 } as CSSProperties,
 submitButton: {
  backgroundColor: tz.color.emberDeep,
  color: tz.color.paper,
  fontWeight: 500,
  padding: "0.875rem 1rem",
  borderRadius: "0.5rem",
  border: "none",
  cursor: "pointer",
  transition: "all 0.2s ease",
  marginTop: "0.5rem",
 } as CSSProperties,
 submitButtonHover: {
  backgroundColor: tz.color.emberDark,
  transform: "translateY(-1px)",
 } as CSSProperties,
 submitButtonDisabled: {
  backgroundColor: tz.color.line,
  color: tz.color.slate,
  cursor: "not-allowed",
 } as CSSProperties,
};

// The code from /verify/password/reset expires after 2 minutes on the server.
const CODE_TTL_SECONDS = 120;

/** Pull the most useful message out of an API error. */
function apiError(error: any, fallback: string): string {
 const data = error?.response?.data;
 if (data?.errors) {
  const first = Object.values(data.errors)[0];
  if (Array.isArray(first) && first[0]) return String(first[0]);
 }
 if (error?.response?.status === 429) return "Too many attempts. Please wait a minute and try again.";
 return data?.message || fallback;
}

export default function SetPasswordForm() {
 const [isOtpPage, setIsOtpPage] = useState(false);
 const [isPasswordPage, setIsPasswordPage] = useState(false);
 const [otp, setOtp] = useState("");
 const [error, setError] = useState("");
 const [timer, setTimer] = useState(CODE_TTL_SECONDS);
 const [isTimerActive, setIsTimerActive] = useState(true);
 const [verificationMethod, setVerificationMethod] = useState<
  "email" | "phone"
 >("email");
 const [isInputFocused, setIsInputFocused] = useState(false);
 const [resetToken, setResetToken] = useState("");
 const [sending, setSending] = useState<"email" | "phone" | null>(null);
 const [verifying, setVerifying] = useState(false);

 const sendCode = async (method: "email" | "phone") => {
  const token = localStorage.getItem("token");
  if (!token) {
   toast.error("Please log in again to change your password.");
   return;
  }

  setSending(method);
  try {
   const path = method === "email" ? "verify/password/reset" : "verify/password/phone/reset";
   const response = await axios.get(`${ApiBaseUrl.localApiUrl}${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
   });

   toast.success(
    response.data?.message ||
     (method === "email" ? "Code sent to your email." : "Code sent to your phone.")
   );
   setVerificationMethod(method);
   setIsOtpPage(true);
   setOtp("");
   setError("");
   setTimer(CODE_TTL_SECONDS);
   setIsTimerActive(true);
  } catch (err) {
   toast.error(apiError(err, "Could not send the code. Please try again."));
  } finally {
   setSending(null);
  }
 };

 const handleVerifyThroughEmail = () => sendCode("email");

 const handleOtpSubmit = async () => {
  if (otp.length !== 6) {
   setError("OTP must be exactly 6 digits.");
   return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
   toast.error("Please log in again to change your password.");
   return;
  }

  setVerifying(true);
  try {
   const response = await axios.post(
    `${ApiBaseUrl.localApiUrl}check/password/reset`,
    { code: otp, method: verificationMethod },
    { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }
   );

   toast.success(response.data?.message || "Code verified.");
   setResetToken(response.data?.reset_token || "");
   setIsPasswordPage(true);
  } catch (err) {
   const msg = apiError(err, "Invalid code. Please check and try again.");
   toast.error(msg);
   setError(msg);
  } finally {
   setVerifying(false);
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

 // Allow a resend 30 seconds after the last code went out.
 const resendLocked = sending !== null || (isTimerActive && timer > CODE_TTL_SECONDS - 30);

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
     <SetPassword resetToken={resetToken} method={verificationMethod} />
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
       <OtpBoxes
        value={otp}
        onChange={(code) => {
         setOtp(code);
         setError("");
        }}
        hasError={Boolean(error)}
        disabled={verifying}
       />
       {error && <p style={{ ...styles.errorMessage, textAlign: "center", marginTop: 0 }}>{error}</p>}
       <button
        style={{
         ...styles.submitButton,
         ...(!isTimerActive || timer === 0 || verifying || otp.length !== 6 ? styles.submitButtonDisabled : {}),
        }}
        onClick={handleOtpSubmit}
        disabled={!isTimerActive || timer === 0 || verifying || otp.length !== 6}
       >
        {verifying ? "Verifying…" : "Verify Code"}
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
       <p style={{ marginTop: "0.75rem", color: tz.color.slate }}>
        Didn't get it?{" "}
        <button
         type="button"
         onClick={() => sendCode(verificationMethod)}
         disabled={resendLocked}
         style={{
          background: "none",
          border: "none",
          padding: 0,
          font: "inherit",
          fontWeight: 600,
          color: tz.color.emberDeep,
          cursor: resendLocked ? "not-allowed" : "pointer",
          opacity: resendLocked ? 0.5 : 1,
         }}
        >
         {sending ? "Sending…" : "Resend code"}
        </button>
        {" · "}
        <button
         type="button"
         onClick={() => { setIsOtpPage(false); setOtp(""); setError(""); }}
         style={{ background: "none", border: "none", padding: 0, font: "inherit", color: tz.color.slate, textDecoration: "underline", cursor: "pointer" }}
        >
         Back
        </button>
       </p>
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
        We'll email you a 6-digit code to confirm it's you
       </p>
      </div>
      <div style={styles.buttonContainer}>
       <button
        style={styles.methodButton}
        onClick={handleVerifyThroughEmail}
        disabled={sending !== null}
        onMouseEnter={(e) => {
         e.currentTarget.style.borderColor = tz.color.emberDeep;
         e.currentTarget.style.backgroundColor = tz.color.emberTint;
        }}
        onMouseLeave={(e) => {
         e.currentTarget.style.borderColor = tz.color.line;
         e.currentTarget.style.backgroundColor = tz.color.paper;
        }}
       >
        <Mail size={20} color={tz.color.emberDeep} />
        {sending === "email" ? "Sending code…" : "Send code to my email"}
       </button>
      </div>
     </>
    )}
   </div>
  </div>
 );
}
