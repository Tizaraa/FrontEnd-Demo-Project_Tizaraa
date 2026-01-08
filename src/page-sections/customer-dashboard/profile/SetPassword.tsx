import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import BeatLoader from "react-spinners/BeatLoader";

export default function SetPassword() {
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
   pwd.length < 9 ||
   !/[A-Z]/.test(pwd) ||
   !/[a-z]/.test(pwd) ||
   !/[@$!%*#?&]/.test(pwd)
  ) {
   errors.push(
    "Password should be at least 9 characters, contain 1 uppercase, 1 lowercase, and 1 special character."
   );
  } else {
   // Check individual patterns if the primary message isn't needed
   if (!/[A-Z]/.test(pwd)) {
    errors.push("Password should contain at least 1 uppercase letter.");
   }
   if (!/[a-z]/.test(pwd)) {
    errors.push("Password should contain at least 1 lowercase letter.");
   }
   if (!/[@$!%*#?&]/.test(pwd)) {
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
  setLoading(true);

  if (!confirmPasswordError && password === confirmPassword) {
   try {
    const token = localStorage.getItem("token");

    if (!token) {
     console.error("Authentication token not found!");
     return;
    }

    // Call the password reset API
    const response = await axios.post(
     "https://frontend.tizaraa.shop/api/password/reset",
     {
      password: password,
      cpassword: confirmPassword,
     },
     {
      headers: {
       Authorization: `Bearer ${token}`,
      },
     }
    );

    console.log("API response:", response.data);
    alert("Password reset successful");
    // Optionally, redirect to a success page or handle success UI here
    router.push("/profile");
   } catch (error) {
    console.error("Error resetting password:", error);
    alert("Failed to reset password. Please try again.");
   }
  } else {
   alert("Passwords do not match.");
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
   backgroundColor: "#fff",
   borderRadius: "8px",
  },
  title: {
   fontSize: "24px",
   fontWeight: "500",
   color: "#4a5568",
   marginBottom: "24px",
  },
  label: {
   display: "block",
   color: "#4a5568",
   marginBottom: "8px",
   fontSize: "16px",
  },
  input: {
   width: "100%",
   height: "48px",
   border: "1px solid #e2e8f0",
   borderRadius: "4px",
   padding: "0 12px",
   fontSize: "16px",
   color: "#4a5568",
  },
  button: {
   width: "100%",
   height: "48px",
   backgroundColor: "#e94560",
   color: "#fff",
   fontSize: "16px",
   fontWeight: "500",
   border: "none",
   borderRadius: "4px",
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
    <p style={{ color: "#718096", marginBottom: "24px" }}>
     Please enter your new password below.
    </p>
    <form onSubmit={handleSubmit}>
     <div style={{ position: "relative", marginBottom: "24px" }}>
      <label htmlFor="password" style={styles.label}>
       New password<span style={{ color: "#e53e3e" }}>*</span>
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
        <EyeOff style={{ color: "#A0AEC0", width: "20px", height: "20px" }} />
       ) : (
        <Eye style={{ color: "#A0AEC0", width: "20px", height: "20px" }} />
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
          style={{ color: "#e94560", marginRight: "0.5rem" }}
         />
         <span style={{ fontSize: "0.875rem", color: "#495057" }}>{error}</span>
        </div>
       ))}
      </div>
     )}

     <div style={{ position: "relative", marginBottom: "24px" }}>
      <label htmlFor="confirmPassword" style={styles.label}>
       Confirm password<span style={{ color: "#e53e3e" }}>*</span>
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
        <EyeOff style={{ color: "#A0AEC0", width: "20px", height: "20px" }} />
       ) : (
        <Eye style={{ color: "#A0AEC0", width: "20px", height: "20px" }} />
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
         style={{ color: "#e94560", marginRight: "0.5rem" }}
        />
        <span style={{ fontSize: "0.875rem", color: "#495057" }}>
         {confirmPasswordError}
        </span>
       </div>
      </div>
     )}

     <button type="submit" style={styles.button}>
      {/* SUBMIT */}
      {loading ? <BeatLoader size={18} color="#fff" /> : "Submit"}
     </button>
    </form>
   </div>
  </div>
 );
}
