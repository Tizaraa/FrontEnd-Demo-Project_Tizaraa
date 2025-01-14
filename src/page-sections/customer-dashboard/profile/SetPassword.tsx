"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      console.log("Password reset submitted");
    } else {
      alert("Passwords do not match.");
    }
  };

  const styles = {
    container: {
      display: "flex",
    //   justifyContent: "center",
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
    //   marginBottom: "16px",
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
        top: "50%",
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
              placeholder="Minimum 8 characters with number, letter and special character"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
              minLength={8}
              pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
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

          <div style={{ position: "relative", marginBottom: "24px" }}>
            <label htmlFor="confirmPassword" style={styles.label}>
              Retype password<span style={{ color: "#e53e3e" }}>*</span>
            </label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Please retype your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

          <button type="submit" style={styles.button}>
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}
