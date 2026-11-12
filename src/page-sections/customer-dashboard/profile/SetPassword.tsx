import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import BeatLoader from "react-spinners/BeatLoader";
import tz from "../../../theme/tizaraa";
import ApiBaseUrl from "api/ApiBaseUrl";
import { toast } from "react-toastify";

export default function SetPassword({
 resetToken,
 method = "email",
}: {
 resetToken: string;
 method?: "email" | "phone";
}) {
 const [showPassword, setShowPassword] = useState(false);
 const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const [isPasswordValid, setIsPasswordValid] = useState(false);
 const [errorMessages, setErrorMessages] = useState([]);
 const [confirmPasswordError, setConfirmPasswordError] = useState("");
 const [loading, setLoading] = useState(false);

 const validatePassword = (pwd) => {
  const errors = [];

  // Check if the password meets all criteria together
  if (
   pwd.length < 8 ||
   !/[A-Z]/.test(pwd) ||
   !/[a-z]/.test(pwd) ||
   !/[0-9]/.test(pwd) ||
   !/[^A-Za-z0-9]/.test(pwd)
  ) {
   errors.push(
    "Password should be at least 8 characters, contain 1 uppercase, 1 lowercase, 1 number, and 1 special character."
   );
  } else {
   // Check individual patterns if the primary message isn't needed
   if (!/[A-Z]/.test(pwd)) {
    errors.push("Password should contain at least 1 uppercase letter.");
   }
   if (!/[a-z]/.test(pwd)) {
    errors.push("Password should contain at least 1 lowercase letter.");
   }
   if (!/[0-9]/.test(pwd)) {
    errors.push("Password should contain at least 1 number.");
   }
   if (!/[^A-Za-z0-9]/.test(pwd)) {
    errors.push("Password should contain at least 1 special character.");
   }
  }

  setErrorMessages(errors);
 };

 const handlePasswordChange = (e) => {
  const newPassword = e.target.value;
  setPassword(newPassword);
  validatePassword(newPassword);
  if (confirmPassword) {
   validateConfirmPassword(newPassword, confirmPassword);
  }
 };

 const handleConfirmPasswordChange = (e) => {
  const newConfirmPassword = e.target.value;
  setConfirmPassword(newConfirmPassword);
  validateConfirmPassword(password, newConfirmPassword);
 };

 const validateConfirmPassword = (pwd, confirmPwd) => {
  if (pwd !== confirmPwd) {
   setConfirmPasswordError("Password do not match.");
  } else {
   setConfirmPasswordError("");
  }
 };

 const router = useRouter();

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (errorMessages.length > 0 || !password) {
   toast.error("Please choose a stronger password.");
   return;
  }
  if (password !== confirmPassword) {
   setConfirmPasswordError("Password do not match.");
   return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
   toast.error("Please log in again to change your password.");
   return;
  }

  setLoading(true);
  try {
   const response = await axios.post(
    `${ApiBaseUrl.localApiUrl}password/reset`,
    {
     reset_token: resetToken,
     method,
     password,
     password_confirmation: confirmPassword,
    },
    { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }
   );

   toast.success(response.data?.message || "Password changed successfully.");
   router.push("/profile");
  } catch (error: any) {
   const data = error?.response?.data;
   const first = data?.errors ? Object.values(data.errors)[0] : null;
   const msg =
    (Array.isArray(first) && first[0]) ||
    data?.message ||
    "Failed to change password. Please try again.";
   toast.error(String(msg));
   // An expired or used token can't be retried — start the flow again.
   if (data?.errors?.reset_token) {
    setTimeout(() => window.location.reload(), 1500);
   }
  } finally {
   setLoading(false);
  }
 };

 const styles = {
  container: {
   display: "flex",
   alignItems: "center",
  },
  formWrapper: {
   width: "100%",
   maxWidth: "600px",
   backgroundColor: tz.color.paper,
   borderRadius: "8px",
  },
  title: {
   fontSize: "24px",
   fontWeight: "500",
   color: tz.color.inkSoft,
   marginBottom: "24px",
  },
  label: {
   display: "block",
   color: tz.color.inkSoft,
   marginBottom: "8px",
   fontSize: "16px",
  },
  input: {
   width: "100%",
   height: "48px",
   border: `1px solid ${tz.color.line}`,
   borderRadius: `${tz.radius.sm}px`,
   padding: "0 12px",
   fontSize: "16px",
   color: tz.color.inkSoft,
  },
  button: {
   width: "100%",
   height: "48px",
   backgroundColor: tz.color.emberDeep,
   color: tz.color.paper,
   fontSize: "16px",
   fontWeight: "500",
   border: "none",
   borderRadius: `${tz.radius.md}px`,
   cursor: "pointer",
   marginTop: "16px",
  },
  iconButton: {
   position: "absolute" as "absolute",
   top: "60%",
   right: "12px",
   transform: "translateY(-20%)",
   background: "none",
   border: "none",
   cursor: "pointer",
  },
 };

 return (
  <div style={styles.container}>
   <div style={styles.formWrapper}>
    <h1 style={styles.title}>Reset your password</h1>
    <p style={{ color: tz.color.slate, marginBottom: "24px" }}>
     Please enter your new password below.
    </p>
    <form onSubmit={handleSubmit}>
     <div style={{ position: "relative", marginBottom: "24px" }}>
      <label htmlFor="password" style={styles.label}>
       New password<span style={{ color: tz.tone.danger.fg }}>*</span>
      </label>
      <input
       id="password"
       type={showPassword ? "text" : "password"}
       placeholder="Enter Your Password"
       value={password}
       onChange={handlePasswordChange}
       style={styles.input}
       required
      />
      <button
       type="button"
       style={styles.iconButton}
       onClick={() => setShowPassword(!showPassword)}
      >
       {showPassword ? (
        <EyeOff style={{ color: tz.color.slate, width: "20px", height: "20px" }} />
       ) : (
        <Eye style={{ color: tz.color.slate, width: "20px", height: "20px" }} />
       )}
      </button>
     </div>

     {errorMessages.length > 0 && (
      <div style={{ marginTop: "-12px", marginBottom: "13px" }}>
       {errorMessages.map((error, index) => (
        <div
         key={index}
         style={{
          display: "flex",
          alignItems: "center",
          marginTop: "0.5rem",
         }}
        >
         <FontAwesomeIcon
          icon={faCircleExclamation}
          style={{ color: tz.color.emberDeep, marginRight: "0.5rem" }}
         />
         <span style={{ fontSize: "0.875rem", color: tz.color.inkSoft }}>{error}</span>
        </div>
       ))}
      </div>
     )}

     <div style={{ position: "relative", marginBottom: "24px" }}>
      <label htmlFor="confirmPassword" style={styles.label}>
       Confirm password<span style={{ color: tz.tone.danger.fg }}>*</span>
      </label>
      <input
       id="confirmPassword"
       type={showConfirmPassword ? "text" : "password"}
       placeholder="Enter Your Confirm Password"
       value={confirmPassword}
       onChange={handleConfirmPasswordChange}
       style={styles.input}
       required
      />
      <button
       type="button"
       style={styles.iconButton}
       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      >
       {showConfirmPassword ? (
        <EyeOff style={{ color: tz.color.slate, width: "20px", height: "20px" }} />
       ) : (
        <Eye style={{ color: tz.color.slate, width: "20px", height: "20px" }} />
       )}
      </button>
     </div>
     {confirmPasswordError && (
      <div style={{ marginTop: "-12px", marginBottom: "13px" }}>
       <div
        style={{
         display: "flex",
         alignItems: "center",
         marginTop: "0.5rem",
        }}
       >
        <FontAwesomeIcon
         icon={faCircleExclamation}
         style={{ color: tz.color.emberDeep, marginRight: "0.5rem" }}
        />
        <span style={{ fontSize: "0.875rem", color: tz.color.inkSoft }}>
         {confirmPasswordError}
        </span>
       </div>
      </div>
     )}

     <button type="submit" style={styles.button}>
      {/* SUBMIT */}
      {loading ? <BeatLoader size={18} color={tz.color.paper} /> : "Submit"}
     </button>
    </form>
   </div>
  </div>
 );
}
