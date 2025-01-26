
// "use client";
// import { Button } from "@component/buttons";
// import { Input } from "@mui/material";
// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import ApiBaseUrl from "api/ApiBaseUrl";

// export default function VerifyEmail() {
//   const [otp, setOtp] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`${ApiBaseUrl.baseUrl}setregister`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ code: otp }),
//       });

//       const data = await response.json();

//       if (response.ok && data.token) {
//         // Save token and user info to localStorage
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("userInfo", JSON.stringify(data.user));

//         console.log("Success:", data);
//         toast.success("Logged in successfully");
//         // Redirect to the home page
//         router.push("/");
//       } else {
//         console.log("Error:", data);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleResendOtp = async () => {
//     try {
//       const token = localStorage.getItem("token"); // Or fetch token from the appropriate place
//       const response = await fetch(`${ApiBaseUrl.baseUrl}resend/otp/register`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success("OTP resent successfully");
//       } else {
//         console.log("Error:", data);
//         toast.error("Failed to resend OTP");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("An error occurred while resending OTP");
//     }
//   };

//   return (
//     <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
//       {/* Main Content */}
//       <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem 1rem" }}>
//         {/* Card */}
//         <div
//           style={{
//             width: "100%",
//             maxWidth: "500px",
//             margin: "50px auto",
//             border: "1px solid #d1d5db",
//             borderRadius: "8px",
//             padding: "1.5rem",
//             display: "flex",
//             flexDirection: "column",
//             gap: "1rem",
//           }}
//         >
//           <h1 style={{ fontSize: "1.5rem", fontWeight: "400" }}>Verify your email address</h1>

//           <p style={{ fontSize: "0.875rem" }}>
//             To verify your email, we have sent a One Time Password (OTP) to your email. Please check your email. Thank you.
//           </p>

//           <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
//             <label htmlFor="otp" style={{ fontSize: "0.875rem", fontWeight: "500" }}>
//               Enter OTP
//             </label>
//             <Input
//               id="otp"
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               style={{
//                 width: "100%",
//                 border: "2px solid #e5e7eb",
//                 padding: "0.5rem",
//                 borderRadius: "4px",
//                 outline: "none",
//                 transition: "border-color 0.3s, box-shadow 0.3s",
//               }}
//             />
//           </div>

//           <Button
//             style={{
//               width: "100%",
//               backgroundColor: "#e94560",
//               color: "white",
//               fontWeight: "600",
//               fontSize: "0.875rem",
//               height: "2rem",
//               borderRadius: "4px",
//               textAlign: "center",
//               cursor: "pointer",
//             }}
//             onClick={handleSubmit}
//           >
//             Create account
//           </Button>

//           <Link
//             href="#"
//             onClick={handleResendOtp}
//             style={{
//               fontSize: "0.875rem",
//               color: "#2563eb",
//               textDecoration: "none",
//               cursor: "pointer",
//               display: "block",
//             }}
//           >
//             Resend OTP
//           </Link>
//         </div>
//       </main>
//     </div>
//   );
// }



"use client";
import { Button } from "@component/buttons";
import { Input } from "@mui/material";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ApiBaseUrl from "api/ApiBaseUrl";
import BeatLoader from "react-spinners/BeatLoader";

export default function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(180); // Timer in seconds (3 minutes)
  const [isResendDisabled, setIsResendDisabled] = useState(false); // Track if the button is disabled
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [error, setError] = useState<string | null>(null); // For error messages
  useEffect(() => {
    // Retrieve the timestamp from sessionStorage if it exists
    const storedTimestamp = sessionStorage.getItem('otpTimestamp');
    if (storedTimestamp) {
      const elapsedTime = Math.floor((Date.now() - parseInt(storedTimestamp)) / 1000); // Calculate elapsed time
      const remainingTime = Math.max(0, resendTimer - elapsedTime); // Ensure the timer doesn't go negative
      setResendTimer(remainingTime);
    } else {
      // Store the timestamp when starting the timer
      sessionStorage.setItem('otpTimestamp', Date.now().toString());
    }

    // Timer interval to update the resendTimer
    const timerInterval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval); // Stop the timer when it reaches 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);



  // Function to handle OTP submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${ApiBaseUrl.baseUrl}setregister`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: otp }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Save token and user info to localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("userInfo", JSON.stringify(data.user));

        console.log("Success:", data);
        toast.success("Logged in successfully");
        // Redirect to the home page
        router.push("/");
      } else {
        console.log("Error:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    finally {
      setLoading(false); // Stop loading after request is complete
    }
  };

  // Function to handle Resend OTP button click
  const handleResendOtp = async () => {
    try {
      setIsLoading(true); // Set loading state to true while the API request is in progress
      const token = localStorage.getItem("token"); // Get the token from localStorage
      const response = await fetch(`${ApiBaseUrl.baseUrl}resend/otp/register`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to resend OTP');
      }

      const data = await response.json();

      // If OTP is successfully sent, reset the timer and update the timestamp
      setResendTimer(180); // Reset timer to 3 minutes
      sessionStorage.setItem('otpTimestamp', Date.now().toString()); // Store the current timestamp

      // You can show a success message here if necessary
      alert('OTP sent successfully!');

    } catch (error: any) {
      // Handle error (e.g., show a message to the user)
      setError(error.message || 'An error occurred while resending the OTP.');
    } finally {
      setIsLoading(false); // Reset loading state once the request is done
    }
  };

  // Effect to update the resend timer
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false); // Enable the button after 3 minutes
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Main Content */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem 1rem" }}>
        {/* Card */}
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            margin: "50px auto",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", fontWeight: "400" }}>Verify your email address</h1>

          <p style={{ fontSize: "0.875rem" }}>
            To verify your email, we have sent a One Time Password (OTP) to your email. Please check your email. Thank you.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="otp" style={{ fontSize: "0.875rem", fontWeight: "500" }}>
              Enter OTP
            </label>
            {/* <Input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{
                width: "100%",
                border: "2px solid #e5e7eb",
                padding: "0.5rem",
                borderRadius: "4px",
                outline: "none",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
            /> */}
            <Input
  id="otp"
  type="text"
  value={otp}
  onChange={(e) => {
    const newOtp = e.target.value;

    // Allow only digits and limit the length to 6
    if (/^\d{0,6}$/.test(newOtp)) {
      setOtp(newOtp);
    }
  }}
  style={{
    width: "100%",
    border: "2px solid #e5e7eb",
    padding: "0.5rem",
    borderRadius: "4px",
    outline: "none",
    transition: "border-color 0.3s, box-shadow 0.3s",
  }}
/>

             <span style={{
              marginBottom: "12px",
              marginTop: "-12px",
              color: "red"
            }}>OTP must be a 6-digit number.</span>
          </div>

          <Button
            style={{
              width: "100%",
              backgroundColor: "#e94560",
              color: "white",
              fontWeight: "600",
              fontSize: "0.875rem",
              height: "2rem",
              borderRadius: "4px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={handleSubmit}
          >
            {/* Verify account */}
            {loading ? <BeatLoader size={18} color="#fff" /> : "Verify account"}
          </Button>

          {/* Resend OTP Link */}
          <div style={{ fontSize: "0.875rem", display: "flex", justifyContent:"space-between" }}>
            {resendTimer > 0 ? (
              <span style={{ color: "#2563eb" }}>
                OTP expires in {Math.floor(resendTimer / 60)}:{String(resendTimer % 60).padStart(2, "0")}
              </span>
            ) : (
              <Link
              href="#"
              onClick={handleResendOtp}
              style={{
                fontSize: "0.875rem",
                color: "#2563eb",
                textDecoration: "none",
                cursor: "pointer",
                display: "block",
              }}
            >
              Resend OTP
            </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
