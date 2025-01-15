// "use client"
// import { Button } from "@component/buttons";
// import { Input } from "@mui/material";
// import Link from "next/link";
// import { useState } from "react";

// export default function VerifyEmail() {
//   const [otp, setOtp] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault(); 
//     try {
//       const response = await fetch("https://frontend.tizaraa.shop/api/setregister", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ code: otp }), 
//       });

//       const data = await response.json(); 

//       if (response.ok) {
//         console.log("Success:", data); 
//       } else {
//         console.log("Error:", data);
//       }
//     } catch (error) {
//       console.error("Error:", error); 
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
//           <h1 style={{ fontSize: "1.5rem", fontWeight: "400" }}>Verify email address</h1>

//           <p style={{ fontSize: "0.875rem" }}>
//             To verify your email, we&apos;ve sent a One Time Password (OTP) to nahidazaman2000@gmail.com{" "}
//             <Link href="#" style={{ color: "#2563eb", textDecoration: "none", cursor: "pointer" }}>
//               (Change)
//             </Link>
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
//             Create your Tizaraa account
//           </Button>

//           <Link
//             href="#"
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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ApiBaseUrl from "api/ApiBaseUrl";

export default function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        toast.success("Logged in successfully")
        // Redirect to the home page
        router.push("/");
      } else {
        console.log("Error:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
          <h1 style={{ fontSize: "1.5rem", fontWeight: "400" }}>Verify email address</h1>

          <p style={{ fontSize: "0.875rem" }}>
            To verify your email, we&apos;ve sent a One Time Password (OTP){" "}
            {/* <Link href="#" style={{ color: "#2563eb", textDecoration: "none", cursor: "pointer" }}>
              (Change)
            </Link> */}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="otp" style={{ fontSize: "0.875rem", fontWeight: "500" }}>
              Enter OTP
            </label>
            <Input
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
            />
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
            Create your Tizaraa account
          </Button>

          <Link
            href="#"
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
        </div>
      </main>
    </div>
  );
}
