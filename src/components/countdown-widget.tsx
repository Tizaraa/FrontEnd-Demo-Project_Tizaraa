// "use client"

// import type React from "react"
// import { useEffect, useState } from "react"

// const getTimeLeft = (targetDate: Date) => {
//   const now = new Date()
//   const total = targetDate.getTime() - now.getTime()
//   const seconds = Math.floor((total / 1000) % 60)
//   const minutes = Math.floor((total / 1000 / 60) % 60)
//   const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
//   const days = Math.floor(total / (1000 * 60 * 60 * 24))
//   return { total, days, hours, minutes, seconds }
// }

// export default function CountdownWidget() {
//   const targetDate = new Date("2025-10-01T00:00:00")
//   const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate))
//   const [pulseOpacity, setPulseOpacity] = useState(1)
//   const [pingScale, setPingScale] = useState(1)
//   const [isHovered, setIsHovered] = useState(false)
//   const [isHidden, setIsHidden] = useState(false)

//   // Load hidden state from localStorage
//   useEffect(() => {
//     const savedState = localStorage.getItem('countdownWidgetHidden')
//     if (savedState === 'true') {
//       setIsHidden(true)
//     }
//   }, [])

//   // Update countdown
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(getTimeLeft(targetDate))
//     }, 1000)
//     return () => clearInterval(timer)
//   }, [])

//   // Pulse animation effect
//   useEffect(() => {
//     const pulseInterval = setInterval(() => {
//       setPulseOpacity((prev) => (prev === 1 ? 0.7 : 1))
//     }, 1500)
//     return () => clearInterval(pulseInterval)
//   }, [])

//   // Ping animation effect
//   useEffect(() => {
//     const pingInterval = setInterval(() => {
//       setPingScale(1.3)
//       setTimeout(() => setPingScale(1), 500)
//     }, 3000)
//     return () => clearInterval(pingInterval)
//   }, [])

//   const handleClose = () => {
//     setIsHidden(true)
//     localStorage.setItem('countdownWidgetHidden', 'true')
//   }

//   const handleShow = () => {
//     setIsHidden(false)
//     localStorage.setItem('countdownWidgetHidden', 'false')
//   }

//   if (timeLeft.total <= 0) return null

//   // Styles
//   const containerStyle: React.CSSProperties = {
//     position: "fixed",
//     left: 0,
//     top: '50%',
//     zIndex: 9999,
//     transform: "translateY(-50%)",
//     // display: window.innerWidth >= 768 ? "block" : "none",
//   }

//   const widgetStyle: React.CSSProperties = {
//     background: `linear-gradient(135deg, rgba(233, 69, 96, 0.95) 0%, rgba(200, 50, 80, 0.95) 100%)`,
//     color: "white",
//     padding: "24px",
//     borderTopRightRadius: "16px",
//     borderBottomRightRadius: "16px",
//     minWidth: "220px",
//     position: "relative",
//     overflow: "hidden",
//     borderLeft: "4px solid rgba(255, 255, 255, 0.3)",
//     boxShadow: `
//       0 10px 30px rgba(233, 69, 96, 0.5),
//       0 0 0 1px rgba(255, 255, 255, 0.1),
//       inset 0 0 20px rgba(255, 255, 255, 0.1)
//     `,
//     transform: isHovered ? "translateX(8px)" : "translateX(0)",
//     transition: "all 0.3s ease-out",
//     display: isHidden ? "none" : "block",
//   }

//   const toggleButtonStyle: React.CSSProperties = {
//     position: "fixed",
//     left: 0,
//     top: '50%',
//     transform: "translateY(-50%)",
//     zIndex: 9998,
//     background: `linear-gradient(135deg, rgba(233, 69, 96, 0.9) 0%, rgba(200, 50, 80, 0.9) 100%)`,
//     color: "white",
//     border: "none",
//     borderTopRightRadius: "8px",
//     borderBottomRightRadius: "8px",
//     padding: "8px 12px",
//     cursor: "pointer",
//     fontWeight: "bold",
//     fontSize: "12px",
//     letterSpacing: "0.05em",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
//     display: isHidden ? "block" : "none",
//     transition: "all 0.2s ease",
//   }

//   const toggleButtonHoverStyle: React.CSSProperties = {
//     padding: "8px 16px",
//     boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
//   }

//   const closeButtonStyle: React.CSSProperties = {
//     position: "absolute",
//     top: "8px",
//     right: "8px",
//     width: "24px",
//     height: "24px",
//     borderRadius: "25%",
//     background: "#fff",
//     border: "none",
//     color: "#000",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     cursor: "pointer",
//     zIndex: 20,
//     transition: "all 0.2s ease",
//   }
//   const backgroundOverlayStyle: React.CSSProperties = {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
//     opacity: pulseOpacity,
//     transition: "opacity 1.5s ease-in-out",
//   }

//   const accentLineStyle: React.CSSProperties = {
//     position: "absolute",
//     left: 0,
//     top: 0,
//     bottom: 0,
//     width: "4px",
//     background: "linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.2))",
//     opacity: pulseOpacity,
//     transition: "opacity 1.5s ease-in-out",
//   }

//   const headerContainerStyle: React.CSSProperties = {
//     textAlign: "center",
//     marginBottom: "20px",
//     position: "relative",
//     zIndex: 10,
//   }

//   const mainTitleStyle: React.CSSProperties = {
//     color: "white",
//     fontWeight: "800",
//     fontSize: "16px",
//     textTransform: "uppercase",
//     letterSpacing: "0.15em",
//     marginBottom: "6px",
//     textShadow: "0 2px 4px rgba(0,0,0,0.2)",
//   }

//   const subtitleStyle: React.CSSProperties = {
//     color: "rgba(255, 255, 255, 0.8)",
//     fontSize: "13px",
//     fontWeight: "500",
//     letterSpacing: "0.05em",
//   }

//   const gridStyle: React.CSSProperties = {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "14px",
//     marginBottom: "20px",
//     position: "relative",
//     zIndex: 10,
//   }

//   const timeBoxStyle: React.CSSProperties = {
//     textAlign: "center",
//     background: "rgba(255, 255, 255, 0.12)",
//     borderRadius: "10px",
//     padding: "12px 8px",
//     backdropFilter: "blur(6px)",
//     border: "1px solid rgba(255, 255, 255, 0.15)",
//     boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//   }

//   const timeBoxHighlightStyle: React.CSSProperties = {
//     ...timeBoxStyle,
//     background: "rgba(255, 255, 255, 0.18)",
//     border: "1px solid rgba(255, 255, 255, 0.25)",
//   }

//   const timeBoxPulseStyle: React.CSSProperties = {
//     ...timeBoxStyle,
//     background: "rgba(255, 255, 255, 0.25)",
//     border: "1px solid rgba(255, 255, 255, 0.35)",
//     opacity: pulseOpacity,
//     transition: "all 1.5s ease-in-out",
//   }

//   const timeNumberStyle: React.CSSProperties = {
//     fontSize: "28px",
//     fontWeight: "800",
//     color: "white",
//     lineHeight: 1,
//     margin: 0,
//     textShadow: "0 2px 4px rgba(0,0,0,0.2)",
//   }

//   const timeNumberSmallStyle: React.CSSProperties = {
//     fontSize: "24px",
//     fontWeight: "800",
//     color: "white",
//     lineHeight: 1,
//     margin: 0,
//     textShadow: "0 2px 4px rgba(0,0,0,0.2)",
//   }

//   const timeLabelStyle: React.CSSProperties = {
//     fontSize: "12px",
//     fontWeight: "600",
//     color: "rgba(255, 255, 255, 0.9)",
//     textTransform: "uppercase",
//     letterSpacing: "0.1em",
//     marginTop: "6px",
//   }

//   const ctaContainerStyle: React.CSSProperties = {
//     textAlign: "center",
//     position: "relative",
//     zIndex: 10,
//   }

//   const ctaTextStyle: React.CSSProperties = {
//     fontSize: "13px",
//     color: "white",
//     fontWeight: "500",
//     marginBottom: "12px",
//     letterSpacing: "0.05em",
//   }

//   const ctaButtonStyle: React.CSSProperties = {
//     background: "rgba(255, 255, 255, 0.25)",
//     borderRadius: "24px",
//     padding: "8px 16px",
//     backdropFilter: "blur(6px)",
//     border: "1px solid rgba(255, 255, 255, 0.35)",
//     display: "inline-block",
//     cursor: "pointer",
//     transition: "all 0.3s ease",
//     transform: isHovered ? "scale(1.05)" : "scale(1)",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//   }

//   const ctaButtonTextStyle: React.CSSProperties = {
//     fontSize: "12px",
//     fontWeight: "700",
//     color: "white",
//     textTransform: "uppercase",
//     letterSpacing: "0.15em",
//   }

//   const pingDotStyle: React.CSSProperties = {
//     position: "absolute",
//     top: "12px",
//     right: "12px",
//     width: "10px",
//     height: "10px",
//     background: "rgba(255, 255, 255, 0.6)",
//     borderRadius: "50%",
//     transform: `scale(${pingScale})`,
//     transition: "transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
//     boxShadow: "0 0 10px rgba(255,255,255,0.5)",
//   }

//   const pulseDotStyle: React.CSSProperties = {
//     position: "absolute",
//     bottom: "12px",
//     left: "12px",
//     width: "6px",
//     height: "6px",
//     background: "rgba(255, 255, 255, 0.6)",
//     borderRadius: "50%",
//     opacity: pulseOpacity,
//     transition: "opacity 1.5s ease-in-out",
//     boxShadow: "0 0 8px rgba(255,255,255,0.4)",
//   }

//   const confettiStyle: React.CSSProperties = {
//     position: "absolute",
//     width: "10px",
//     height: "10px",
//     background: "rgba(255,255,255,0.8)",
//     opacity: 0,
//     transform: "rotate(45deg)",
//   }

//   return (
//     <>
//       <div style={containerStyle}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}>
//         <div style={widgetStyle}>
//           {/* Close button */}
//           <button
//             style={{
//               ...closeButtonStyle,
//             }}
//             onClick={handleClose}
//             aria-label="Close countdown widget"
//           >
//             ⨉
//           </button>

//           {/* Animated background overlay */}
//           <div style={backgroundOverlayStyle}></div>

//           {/* Glowing accent line */}
//           <div style={accentLineStyle}></div>

//           {/* Confetti elements */}
//           <div style={{ ...confettiStyle, top: '10%', left: '20%', animation: "confettiFall 3s infinite" }}></div>
//           <div style={{ ...confettiStyle, top: '15%', left: '80%', animation: "confettiFall 4s infinite 0.5s" }}></div>
//           <div style={{ ...confettiStyle, top: '85%', left: '30%', animation: "confettiFall 3.5s infinite 1s" }}></div>

//           {/* Professional header */}
//           <div style={headerContainerStyle}>
//             <div style={mainTitleStyle}>COMING SOON</div>
//             <div style={subtitleStyle}>Our Biggest Launch Yet</div>
//           </div>

//           {/* Countdown grid */}
//           <div style={gridStyle}>
//             {/* Days */}
//             <div style={timeBoxStyle}>
//               <div style={timeNumberStyle}>{timeLeft.days}</div>
//               <div style={timeLabelStyle}>Days</div>
//             </div>

//             {/* Hours */}
//             <div style={timeBoxStyle}>
//               <div style={timeNumberStyle}>{timeLeft.hours}</div>
//               <div style={timeLabelStyle}>Hours</div>
//             </div>

//             {/* Minutes */}
//             <div style={timeBoxHighlightStyle}>
//               <div style={timeNumberSmallStyle}>{timeLeft.minutes}</div>
//               <div style={timeLabelStyle}>Minutes</div>
//             </div>

//             {/* Seconds - highlighted with pulse */}
//             <div style={timeBoxPulseStyle}>
//               <div style={timeNumberSmallStyle}>{timeLeft.seconds}</div>
//               <div style={timeLabelStyle}>Seconds</div>
//             </div>
//           </div>

//           {/* Call to action */}
//           <div style={ctaContainerStyle}>
//             <div style={ctaTextStyle}>Join our exclusive waitlist</div>
//             <div style={ctaButtonStyle}>
//               <span style={ctaButtonTextStyle}>Notify Me</span>
//             </div>
//           </div>

//           {/* Subtle corner accents */}
//           <div style={pingDotStyle}></div>
//           <div style={pulseDotStyle}></div>
//         </div>
//       </div>

//       {/* Toggle button to show the widget again */}
//       <button
//         style={{
//           ...toggleButtonStyle,
//           ...(isHidden && isHovered ? toggleButtonHoverStyle : {})
//         }}
//         onClick={handleShow}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         LAUNCH ON
//       </button>

//       {/* CSS for confetti animation */}
//       <style>{`
//         @keyframes confettiFall {
//           0% { transform: translateY(-100px) rotate(45deg); opacity: 0; }
//           10% { opacity: 1; }
//           100% { transform: translateY(200px) rotate(45deg); opacity: 0; }
//         }
//       `}</style>
//     </>
//   )
// }

"use client";

import type React from "react";
import { useEffect, useState } from "react";

const getTimeLeft = (targetDate: Date) => {
 const now = new Date();
 const total = targetDate.getTime() - now.getTime();
 const seconds = Math.floor((total / 1000) % 60);
 const minutes = Math.floor((total / 1000 / 60) % 60);
 const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
 const days = Math.floor(total / (1000 * 60 * 60 * 24));
 return { total, days, hours, minutes, seconds };
};

export default function CountdownWidget() {
 const targetDate = new Date("2025-10-01T00:00:00");
 const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
 const [pulseOpacity, setPulseOpacity] = useState(1);
 const [pingScale, setPingScale] = useState(1);
 const [isHovered, setIsHovered] = useState(false);
 const [isHidden, setIsHidden] = useState(false);
 const [isMobile, setIsMobile] = useState(false);

 // Detect mobile device
 useEffect(() => {
  const checkMobile = () => {
   setIsMobile(window.innerWidth < 768);
  };
  checkMobile();
  window.addEventListener("resize", checkMobile);
  return () => window.removeEventListener("resize", checkMobile);
 }, []);

 // Load hidden state from localStorage
 useEffect(() => {
  const savedState = localStorage.getItem("countdownWidgetHidden");
  if (savedState === "true") {
   setIsHidden(true);
  }
 }, []);

 // Update countdown
 useEffect(() => {
  const timer = setInterval(() => {
   setTimeLeft(getTimeLeft(targetDate));
  }, 1000);
  return () => clearInterval(timer);
 }, []);

 // Pulse animation effect
 useEffect(() => {
  const pulseInterval = setInterval(() => {
   setPulseOpacity((prev) => (prev === 1 ? 0.7 : 1));
  }, 1500);
  return () => clearInterval(pulseInterval);
 }, []);

 // Ping animation effect
 useEffect(() => {
  const pingInterval = setInterval(() => {
   setPingScale(1.3);
   setTimeout(() => setPingScale(1), 500);
  }, 3000);
  return () => clearInterval(pingInterval);
 }, []);

 const handleClose = () => {
  setIsHidden(true);
  localStorage.setItem("countdownWidgetHidden", "true");
 };

 const handleShow = () => {
  setIsHidden(false);
  localStorage.setItem("countdownWidgetHidden", "false");
 };

 if (timeLeft.total <= 0 || !isMobile) return null;

 const containerStyle: React.CSSProperties = {
  position: "fixed",
  left: 0,
  top: "50%",
  zIndex: 9999,
  transform: "translateY(-50%)",
  display: isHidden ? "none" : "block",
 };

 const widgetStyle: React.CSSProperties = {
  background: `linear-gradient(135deg, rgba(233, 69, 96, 0.95) 0%, rgba(200, 50, 80, 0.95) 100%)`,
  color: "white",
  padding: "24px",
  borderTopRightRadius: "16px",
  borderBottomRightRadius: "16px",
  minWidth: "220px",
  position: "relative",
  overflow: "hidden",
  borderLeft: "4px solid rgba(255, 255, 255, 0.3)",
  boxShadow: `
      0 10px 30px rgba(233, 69, 96, 0.5),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      inset 0 0 20px rgba(255, 255, 255, 0.1)
    `,
  transform: isHovered ? "translateX(8px)" : "translateX(0)",
  transition: "all 0.3s ease-out",
  display: isHidden ? "none" : "block",
 };

 const toggleButtonStyle: React.CSSProperties = {
  position: "fixed",
  left: 0,
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 9998,
  background: `linear-gradient(135deg, rgba(233, 69, 96, 0.9) 0%, rgba(200, 50, 80, 0.9) 100%)`,
  color: "white",
  border: "none",
  borderTopRightRadius: "8px",
  borderBottomRightRadius: "8px",
  padding: "8px 12px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "12px",
  letterSpacing: "0.05em",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  display: isHidden ? "block" : "none",
  transition: "all 0.2s ease",
 };

 const toggleButtonHoverStyle: React.CSSProperties = {
  padding: "8px 16px",
  boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
 };

 const closeButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: "8px",
  right: "8px",
  width: "24px",
  height: "24px",
  borderRadius: "25%",
  background: "#fff",
  border: "none",
  color: "#000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  zIndex: 20,
  transition: "all 0.2s ease",
 };

 const backgroundOverlayStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background:
   "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
  opacity: pulseOpacity,
  transition: "opacity 1.5s ease-in-out",
 };

 const accentLineStyle: React.CSSProperties = {
  position: "absolute",
  left: 0,
  top: 0,
  bottom: 0,
  width: "4px",
  background:
   "linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.2))",
  opacity: pulseOpacity,
  transition: "opacity 1.5s ease-in-out",
 };

 const headerContainerStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "20px",
  position: "relative",
  zIndex: 10,
 };

 const mainTitleStyle: React.CSSProperties = {
  color: "white",
  fontWeight: "800",
  fontSize: "16px",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  marginBottom: "6px",
  textShadow: "0 2px 4px rgba(0,0,0,0.2)",
 };

 const subtitleStyle: React.CSSProperties = {
  color: "rgba(255, 255, 255, 0.8)",
  fontSize: "13px",
  fontWeight: "500",
  letterSpacing: "0.05em",
 };

 const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "14px",
  marginBottom: "20px",
  position: "relative",
  zIndex: 10,
 };

 const timeBoxStyle: React.CSSProperties = {
  textAlign: "center",
  background: "rgba(255, 255, 255, 0.12)",
  borderRadius: "10px",
  padding: "12px 8px",
  backdropFilter: "blur(6px)",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
 };

 const timeBoxHighlightStyle: React.CSSProperties = {
  ...timeBoxStyle,
  background: "rgba(255, 255, 255, 0.18)",
  border: "1px solid rgba(255, 255, 255, 0.25)",
 };

 const timeBoxPulseStyle: React.CSSProperties = {
  ...timeBoxStyle,
  background: "rgba(255, 255, 255, 0.25)",
  border: "1px solid rgba(255, 255, 255, 0.35)",
  opacity: pulseOpacity,
  transition: "all 1.5s ease-in-out",
 };

 const timeNumberStyle: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: "800",
  color: "white",
  lineHeight: 1,
  margin: 0,
  textShadow: "0 2px 4px rgba(0,0,0,0.2)",
 };

 const timeNumberSmallStyle: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "800",
  color: "white",
  lineHeight: 1,
  margin: 0,
  textShadow: "0 2px 4px rgba(0,0,0,0.2)",
 };

 const timeLabelStyle: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: "600",
  color: "rgba(255, 255, 255, 0.9)",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginTop: "6px",
 };

 const ctaContainerStyle: React.CSSProperties = {
  textAlign: "center",
  position: "relative",
  zIndex: 10,
 };

 const ctaTextStyle: React.CSSProperties = {
  fontSize: "13px",
  color: "white",
  fontWeight: "500",
  marginBottom: "12px",
  letterSpacing: "0.05em",
 };

 const ctaButtonStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.25)",
  borderRadius: "24px",
  padding: "8px 16px",
  backdropFilter: "blur(6px)",
  border: "1px solid rgba(255, 255, 255, 0.35)",
  display: "inline-block",
  cursor: "pointer",
  transition: "all 0.3s ease",
  transform: isHovered ? "scale(1.05)" : "scale(1)",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
 };

 const ctaButtonTextStyle: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: "700",
  color: "white",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
 };

 const pingDotStyle: React.CSSProperties = {
  position: "absolute",
  top: "12px",
  right: "12px",
  width: "10px",
  height: "10px",
  background: "rgba(255, 255, 255, 0.6)",
  borderRadius: "50%",
  transform: `scale(${pingScale})`,
  transition: "transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
  boxShadow: "0 0 10px rgba(255,255,255,0.5)",
 };

 const pulseDotStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "12px",
  left: "12px",
  width: "6px",
  height: "6px",
  background: "rgba(255, 255, 255, 0.6)",
  borderRadius: "50%",
  opacity: pulseOpacity,
  transition: "opacity 1.5s ease-in-out",
  boxShadow: "0 0 8px rgba(255,255,255,0.4)",
 };

 const confettiStyle: React.CSSProperties = {
  position: "absolute",
  width: "10px",
  height: "10px",
  background: "rgba(255,255,255,0.8)",
  opacity: 0,
  transform: "rotate(45deg)",
 };

 return (
  <>
   <div
    style={containerStyle}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
   >
    <div style={widgetStyle}>
     <button
      style={closeButtonStyle}
      onClick={handleClose}
      aria-label="Close countdown widget"
     >
      ⨉
     </button>

     <div style={backgroundOverlayStyle}></div>
     <div style={accentLineStyle}></div>
     <div
      style={{
       ...confettiStyle,
       top: "10%",
       left: "20%",
       animation: "confettiFall 3s infinite",
      }}
     ></div>
     <div
      style={{
       ...confettiStyle,
       top: "15%",
       left: "80%",
       animation: "confettiFall 4s infinite 0.5s",
      }}
     ></div>
     <div
      style={{
       ...confettiStyle,
       top: "85%",
       left: "30%",
       animation: "confettiFall 3.5s infinite 1s",
      }}
     ></div>

     <div style={headerContainerStyle}>
      <div style={mainTitleStyle}>COMING SOON</div>
      <div style={subtitleStyle}>Our Biggest Launch Yet</div>
     </div>

     <div style={gridStyle}>
      <div style={timeBoxStyle}>
       <div style={timeNumberStyle}>{timeLeft.days}</div>
       <div style={timeLabelStyle}>Days</div>
      </div>
      <div style={timeBoxStyle}>
       <div style={timeNumberStyle}>{timeLeft.hours}</div>
       <div style={timeLabelStyle}>Hours</div>
      </div>
      <div style={timeBoxHighlightStyle}>
       <div style={timeNumberSmallStyle}>{timeLeft.minutes}</div>
       <div style={timeLabelStyle}>Minutes</div>
      </div>
      <div style={timeBoxPulseStyle}>
       <div style={timeNumberSmallStyle}>{timeLeft.seconds}</div>
       <div style={timeLabelStyle}>Seconds</div>
      </div>
     </div>

     <div style={ctaContainerStyle}>
      <div style={ctaTextStyle}>Join our exclusive waitlist</div>
      <div style={ctaButtonStyle}>
       <span style={ctaButtonTextStyle}>Notify Me</span>
      </div>
     </div>

     <div style={pingDotStyle}></div>
     <div style={pulseDotStyle}></div>
    </div>
   </div>

   <button
    style={{
     ...toggleButtonStyle,
     ...(isHidden && isHovered ? toggleButtonHoverStyle : {}),
    }}
    onClick={handleShow}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
   >
    LAUNCH ON
   </button>

   <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(-100px) rotate(45deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(200px) rotate(45deg); opacity: 0; }
        }
      `}</style>
  </>
 );
}
