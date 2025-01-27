

// "use client";
// import { Button } from "@component/buttons";
// import { Input } from "@mui/material";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import ApiBaseUrl from "api/ApiBaseUrl";
// import BeatLoader from "react-spinners/BeatLoader";
// import axios from "axios";

// export default function VerifyEmail() {
//   const [otp, setOtp] = useState("");
//   const [resendTimer, setResendTimer] = useState(180); // Timer in seconds (3 minutes)
//   const [isResendDisabled, setIsResendDisabled] = useState(false); // Track if the button is disabled
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [isLoading, setIsLoading] = useState(false); // For loading state
//   const [error, setError] = useState<string | null>(null); // For error messages

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [newPhoneNumber, setNewPhoneNumber] = useState("");
  // const [currentPhoneNumber, setCurrentPhoneNumber] = useState(null);
  // const [errorMessage, setErrorMessage] = useState("");

  // // Fetch current phone number from API
  // useEffect(() => {
  //   const fetchPhoneNumber = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://frontend.tizaraa.shop/api/get/provided/register/number"
  //       );
  //       setCurrentPhoneNumber(response.data.phone || "No phone number available");
  //     } catch (error) {
  //       console.error("Error fetching phone number:", error);
  //     }
  //   };

  //   fetchPhoneNumber();
  // }, []);

  // // Handle opening and closing modal
  // const toggleModal = () => {
  //   setIsModalOpen((prev) => !prev);
  //   setErrorMessage(""); // Reset error message when closing the modal
  // };

  // // Handle phone number input change with validation
  // const handlePhoneNumberChange = (e) => {
  //   const value = e.target.value;
  //   if (value.length > 11) {
  //     setErrorMessage("Phone number cannot exceed 11 digits.");
  //   } else if (!/^\d*$/.test(value)) {
  //     setErrorMessage("Phone number can only contain digits.");
  //   } else {
  //     setErrorMessage("");
  //   }
  //   setNewPhoneNumber(value.slice(0, 11)); // Limit input to 11 characters
  // };

  // // Handle form submission to change phone number
  // const handleChangePhoneNumber = async (e) => {
  //   e.preventDefault();

  //   if (newPhoneNumber.length < 11) {
  //     setErrorMessage("Phone number must be 11 digits.");
  //     return;
  //   }

  //   try {
  //     // Replace with the API endpoint to update the phone number
  //     const response = await axios.post(
  //       "https://your-api-to-update-phone-number",
  //       { newPhoneNumber }
  //     );
  //     if (response.status === 200) {
  //       alert(`Phone number changed to: ${newPhoneNumber}`);
  //       setCurrentPhoneNumber(newPhoneNumber);
  //       toggleModal(); // Close the modal
  //     } else {
  //       alert("Failed to update phone number");
  //     }
  //   } catch (error) {
  //     console.error("Error updating phone number:", error);
  //     alert("An error occurred while updating the phone number.");
  //   }
  // };

  // useEffect(() => {
  //   // Retrieve the timestamp from sessionStorage if it exists
  //   const storedTimestamp = sessionStorage.getItem('otpTimestamp');
  //   if (storedTimestamp) {
  //     const elapsedTime = Math.floor((Date.now() - parseInt(storedTimestamp)) / 1000); // Calculate elapsed time
  //     const remainingTime = Math.max(0, resendTimer - elapsedTime); // Ensure the timer doesn't go negative
  //     setResendTimer(remainingTime);
  //   } else {
  //     // Store the timestamp when starting the timer
  //     sessionStorage.setItem('otpTimestamp', Date.now().toString());
  //   }

  //   // Timer interval to update the resendTimer
  //   const timerInterval = setInterval(() => {
  //     setResendTimer((prev) => {
  //       if (prev <= 1) {
  //         clearInterval(timerInterval); // Stop the timer when it reaches 0
  //         return 0;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(timerInterval);
  // }, []);



//   // Function to handle OTP submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
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
//     finally {
//       setLoading(false); // Stop loading after request is complete
//     }
//   };

//   // Function to handle Resend OTP button click
//   const handleResendOtp = async () => {
//     try {
//       setIsLoading(true); // Set loading state to true while the API request is in progress
//       const token = localStorage.getItem("token"); // Get the token from localStorage
//       const response = await fetch(`${ApiBaseUrl.baseUrl}resend/otp/register`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to resend OTP');
//       }

//       const data = await response.json();

//       // If OTP is successfully sent, reset the timer and update the timestamp
//       setResendTimer(180); // Reset timer to 3 minutes
//       sessionStorage.setItem('otpTimestamp', Date.now().toString()); // Store the current timestamp

//       // You can show a success message here if necessary
//       alert('OTP sent successfully!');

//     } catch (error: any) {
//       // Handle error (e.g., show a message to the user)
//       setError(error.message || 'An error occurred while resending the OTP.');
//     } finally {
//       setIsLoading(false); // Reset loading state once the request is done
//     }
//   };

//   // Effect to update the resend timer
//   useEffect(() => {
//     let interval;
//     if (resendTimer > 0) {
//       interval = setInterval(() => {
//         setResendTimer((prev) => prev - 1);
//       }, 1000);
//     } else {
//       setIsResendDisabled(false); // Enable the button after 3 minutes
//     }
//     return () => clearInterval(interval);
//   }, [resendTimer]);

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
//             {/* <Input
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
//             /> */}
//             <Input
//   id="otp"
//   type="text"
//   value={otp}
//   onChange={(e) => {
//     const newOtp = e.target.value;

//     // Allow only digits and limit the length to 6
//     if (/^\d{0,6}$/.test(newOtp)) {
//       setOtp(newOtp);
//     }
//   }}
//   style={{
//     width: "100%",
//     border: "2px solid #e5e7eb",
//     padding: "0.5rem",
//     borderRadius: "4px",
//     outline: "none",
//     transition: "border-color 0.3s, box-shadow 0.3s",
//   }}
// />

//              <span style={{
//               marginBottom: "12px",
//               marginTop: "-12px",
//               color: "red"
//             }}>OTP must be a 6-digit number.</span>
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
//             {/* Verify account */}
//             {loading ? <BeatLoader size={18} color="#fff" /> : "Verify account"}
//           </Button>

//           {/* Resend OTP and Change Phone Number */}
//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <div style={{ fontSize: '0.875rem', display: 'flex', justifyContent: 'space-between' }}>
//           {resendTimer > 0 ? (
//             <span style={{ color: '#2563eb' }}>
//               OTP expires in {Math.floor(resendTimer / 60)}:{String(resendTimer % 60).padStart(2, '0')}
//             </span>
//           ) : (
//             <Link
//               href="#"
//               onClick={handleResendOtp}
//               style={{
//                 fontSize: '0.875rem',
//                 color: '#2563eb',
//                 textDecoration: 'none',
//                 cursor: 'pointer',
//                 display: 'block',
//               }}
//             >
//               Resend OTP
//             </Link>
//           )}
//         </div>
        // <div>
        //   <button
        //     onClick={toggleModal}
        //     style={{ fontSize: '0.875rem', color: '#2563eb', cursor: 'pointer', background: 'none', border: 'none' }}
        //   >
        //     Change Phone Number
        //   </button>
        // </div>
//       </div>

    
    //  {/* Modal for changing phone number */}
    //  {isModalOpen && (
    //     <div
    //       style={{
    //         position: "fixed",
    //         top: 0,
    //         left: 0,
    //         width: "100%",
    //         height: "100%",
    //         backgroundColor: "rgba(0, 0, 0, 0.4)",
    //         display: "flex",
    //         justifyContent: "center",
    //         zIndex: 1000,
    //       }}
    //       onClick={toggleModal}
    //     >
    //       <div
    //         style={{
    //           width: "90%",
    //           maxWidth: "500px",
    //           height: "400px",
    //           marginTop: "130px",
    //           backgroundColor: "#ffffff",
    //           borderRadius: "12px",
    //           padding: "20px",
    //           boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    //           position: "relative",
    //         }}
    //         onClick={(e) => e.stopPropagation()}
    //       >
    //         <span
    //           style={{
    //             position: "absolute",
    //             top: "12px",
    //             right: "12px",
    //             fontSize: "1.5rem",
    //             color: "#6b7280",
    //             cursor: "pointer",
    //           }}
    //           onClick={toggleModal}
    //         >
    //           &times;
    //         </span>

    //         <h2
    //           style={{
    //             fontSize: "1.25rem",
    //             fontWeight: "bold",
    //             marginBottom: "12px",
    //             color: "#1f2937",
    //             textAlign: "center",
    //           }}
    //         >
    //           Change Phone Number
    //         </h2>

    //         <form onSubmit={handleChangePhoneNumber}>
    //           <div style={{ marginBottom: "16px" }}>
    //             <label
    //               htmlFor="currentPhone"
    //               style={{
    //                 display: "block",
    //                 fontSize: "0.875rem",
    //                 fontWeight: "500",
    //                 color: "#374151",
    //                 marginBottom: "6px",
    //               }}
    //             >
    //               Current Phone Number
    //             </label>
    //             <input
    //               type="text"
    //               id="currentPhone"
    //               value={currentPhoneNumber || "Loading..."}
    //               readOnly
    //               style={{
    //                 width: "100%",
    //                 padding: "12px 16px",
    //                 border: "1px solid #d1d5db",
    //                 borderRadius: "8px",
    //                 backgroundColor: "#f9fafb",
    //                 color: "#4b5563",
    //                 fontSize: "0.875rem",
    //                 outline: "none",
    //               }}
    //             />
    //           </div>

    //           <div style={{ marginBottom: "16px" }}>
    //             <label
    //               htmlFor="newPhone"
    //               style={{
    //                 display: "block",
    //                 fontSize: "0.875rem",
    //                 fontWeight: "500",
    //                 color: "#374151",
    //                 marginBottom: "6px",
    //               }}
    //             >
    //               New Phone Number
    //             </label>
    //             <input
    //               type="text"
    //               id="newPhone"
    //               value={newPhoneNumber}
    //               onChange={handlePhoneNumberChange}
    //               style={{
    //                 width: "100%",
    //                 padding: "12px 16px",
    //                 border: "1px solid #d1d5db",
    //                 borderRadius: "8px",
    //                 backgroundColor: "#ffffff",
    //                 fontSize: "0.875rem",
    //                 color: "#111827",
    //                 outline: "none",
    //               }}
    //             />
    //             {errorMessage && (
    //               <p style={{ color: "red", fontSize: "0.875rem", marginTop: "6px" }}>
    //                 {errorMessage}
    //               </p>
    //             )}
    //           </div>

    //           <button
    //             type="submit"
    //             style={{
    //               width: "100%",
    //               padding: "12px",
    //               backgroundColor: "#e94560",
    //               color: "white",
    //               fontSize: "0.875rem",
    //               fontWeight: "600",
    //               border: "none",
    //               borderRadius: "8px",
    //               cursor: "pointer",
    //             }}
    //           >
    //             Submit
    //           </button>
    //         </form>
    //       </div>
    //     </div>
    //   )}

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
import axios from "axios";

export default function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(180); // Timer in seconds (3 minutes)
  const [isResendDisabled, setIsResendDisabled] = useState(false); // Track if the button is disabled
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch current phone number from API
  useEffect(() => {
    const fetchPhoneNumber = async () => {
      try {
        const userId = sessionStorage.getItem("userId");
        const response = await axios.get(
          `${ApiBaseUrl.baseUrl}get/provided/register/number/${userId}`
        );
        setCurrentPhoneNumber(response.data.phone || "No phone number available");
      } catch (error) {
        console.error("Error fetching phone number:", error);
      }
    };

    fetchPhoneNumber();
  }, []);

  // Handle opening and closing modal
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
    setErrorMessage(""); // Reset error message when closing the modal
  };

  // Handle phone number input change with validation
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    if (value.length > 11) {
      setErrorMessage("Phone number cannot exceed 11 digits.");
    } else if (!/^\d*$/.test(value)) {
      setErrorMessage("Phone number can only contain digits.");
    } else {
      setErrorMessage("");
    }
    setNewPhoneNumber(value.slice(0, 11)); // Limit input to 11 characters
  };

  // Handle form submission to change phone number
  const handleChangePhoneNumber = async (e) => {
    e.preventDefault();
  
    if (newPhoneNumber.length < 11) {
      setErrorMessage("Phone number must be 11 digits.");
      return;
    }
  
    try {
      const userId = sessionStorage.getItem("userId");
      const response = await axios.post(
        `${ApiBaseUrl.baseUrl}set/provided/register/number/${userId}`,
        { phone: newPhoneNumber }
      );
  
      if (response.status === 200) {
        alert(`Phone number changed to: ${newPhoneNumber}`);
        setCurrentPhoneNumber(newPhoneNumber); // Update the current phone number
        toggleModal(); // Close the modal
      } else {
        alert("Failed to update phone number");
      }
    } catch (error) {
      console.error("Error updating phone number:", error);
      alert("An error occurred while updating the phone number.");
    }
  };
  








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
        toast.error(data.message || "Something went wrong"); // Display error message from the API
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
      const token = localStorage.getItem("token"); // Or fetch token from the appropriate place
      const userId = sessionStorage.getItem("userId");
      const response = await fetch(`${ApiBaseUrl.baseUrl}resend/otp/register/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("OTP resent successfully");
        // Reset the timer after OTP is resent
        setResendTimer(180); // Reset to 3 minutes
      } else {
        console.log("Error:", data);
        toast.error("Failed to resend OTP");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while resending OTP");
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
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
          <div>
          <button
            onClick={toggleModal}
            style={{ fontSize: '0.875rem', color: '#2563eb', cursor: 'pointer', background: 'none', border: 'none' }}
          >
            Change Phone Number
          </button>
          </div>
        </div>


             {/* Modal for changing phone number */}
     {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={toggleModal}
        >
          <div
            style={{
              width: "90%",
              maxWidth: "500px",
              height: "400px",
              marginTop: "130px",
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                fontSize: "1.5rem",
                color: "#6b7280",
                cursor: "pointer",
              }}
              onClick={toggleModal}
            >
              &times;
            </span>

            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginBottom: "12px",
                color: "#1f2937",
                textAlign: "center",
              }}
            >
              Change Phone Number
            </h2>

            <form onSubmit={handleChangePhoneNumber}>
              <div style={{ marginBottom: "16px" }}>
                <label
                  htmlFor="currentPhone"
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "6px",
                  }}
                >
                  Current Phone Number
                </label>
                <input
                  type="text"
                  id="currentPhone"
                  value={currentPhoneNumber || "Loading..."}
                  readOnly
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    backgroundColor: "#f9fafb",
                    color: "#4b5563",
                    fontSize: "0.875rem",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label
                  htmlFor="newPhone"
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "6px",
                  }}
                >
                  New Phone Number
                </label>
                <input
                  type="text"
                  id="newPhone"
                  value={newPhoneNumber}
                  onChange={handlePhoneNumberChange}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    backgroundColor: "#ffffff",
                    fontSize: "0.875rem",
                    color: "#111827",
                    outline: "none",
                  }}
                />
                {errorMessage && (
                  <p style={{ color: "red", fontSize: "0.875rem", marginTop: "6px" }}>
                    {errorMessage}
                  </p>
                )}
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#e94560",
                  color: "white",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
        </div>
      </main>
    </div>
  );
}