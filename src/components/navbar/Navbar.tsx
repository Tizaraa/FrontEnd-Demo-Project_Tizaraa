// "use client";

// import Box from "../Box";
// import Card from "../Card";
// import Badge from "../badge";
// import Icon from "../icon/Icon";
// import FlexBox from "../FlexBox";
// import NavLink from "../nav-link";
// import MenuItem from "../MenuItem";
// import { Button } from "../buttons";
// import Container from "../Container";
// import Typography, { Span } from "../Typography";
// import Categories from "../categories/Categories";
// //import ResponsiveCategory from "app/(layout-3)/product/[slug]/ResponsiveCategory";

// import StyledNavbar from "./styles";
// import navbarNavigations from "@data/navbarNavigations";

// // ==============================================================
// interface Nav {
//   url: string;
//   child: Nav[];
//   title: string;
//   badge: string;
//   extLink?: boolean;
// }

// type NavbarProps = { navListOpen?: boolean };
// // ==============================================================

// export default function Navbar({ navListOpen }: NavbarProps) {
//   const renderNestedNav = (list: any[], isRoot = false) => {
//     return list?.map((nav: Nav) => {
//       if (isRoot) {
//         if (nav.url && nav.extLink) {
//           return (
//             <NavLink
//               href={nav.url}
//               key={nav.title}
//               target="_blank"
//               className="nav-link"
//               rel="noopener noreferrer">
//               {nav.badge ? (
//                 <Badge style={{ marginRight: "0px" }} title={nav.badge}>
//                   {nav.title}
//                 </Badge>
//               ) : (
//                 <Span className="nav-link">{nav.title}</Span>
//               )}
//             </NavLink>
//           );
//         }

//         if (nav.child) {
//           return (
//             <FlexBox
//               className="root"
//               position="relative"
//               flexDirection="column"
//               alignItems="center"
//               key={nav.title}>
//               {nav.badge ? (
//                 <Badge title={nav.badge}>{nav.title}</Badge>
//               ) : (
//                 <Span className="nav-link">{nav.title}</Span>
//               )}
//               <div className="root-child">
//                 <Card borderRadius={8} mt="1.25rem" py="0.5rem" boxShadow="large" minWidth="230px">
//                   {renderNestedNav(nav.child)}
//                 </Card>
//               </div>
//             </FlexBox>
//           );
//         }

//         if (nav.url) {
//           return (
//             <NavLink className="nav-link" href={nav.url} key={nav.title}>
//               {nav.badge ? (
//                 <Badge style={{ marginRight: "0px" }} title={nav.badge}>
//                   {nav.title}
//                 </Badge>
//               ) : (
//                 <Span className="nav-link">{nav.title}</Span>
//               )}
//             </NavLink>
//           );
//         }
//       } else {
//         if (nav.url) {
//           return (
//             <NavLink href={nav.url} key={nav.title}>
//               <MenuItem>
//                 {nav.badge ? (
//                   <Badge style={{ marginRight: "0px" }} title={nav.badge}>
//                     {nav.title}
//                   </Badge>
//                 ) : (
//                   <Span className="nav-link">{nav.title}</Span>
//                 )}
//               </MenuItem>
//             </NavLink>
//           );
//         }

//         if (nav.child) {
//           return (
//             <Box className="parent" position="relative" minWidth="230px" key={nav.title}>
//               <MenuItem
//                 color="gray.700"
//                 style={{ display: "flex", justifyContent: "space-between" }}>
//                 {nav.badge ? (
//                   <Badge style={{ marginRight: "0px" }} title={nav.badge}>
//                     {nav.title}
//                   </Badge>
//                 ) : (
//                   <Span className="nav-link">{nav.title}</Span>
//                 )}
//                 <Icon size="8px" defaultcolor="currentColor">
//                   right-arrow
//                 </Icon>
//               </MenuItem>

//               <Box className="child" pl="0.5rem">
//                 <Card py="0.5rem" borderRadius={8} boxShadow="large" minWidth="230px">
//                   {renderNestedNav(nav.child)}
//                 </Card>
//               </Box>
//             </Box>
//           );
//         }
//       }
//     });
//   };

//   return (
//     <StyledNavbar>
//       <Container height="100%" display="flex" alignItems="center" justifyContent="space-between">
//         <Categories open={navListOpen}>
//           <Button width="278px" height="40px" bg="body.default" variant="text">
//             <Icon>categories</Icon>
//             <Typography ml="10px" flex="1 1 0" fontWeight="600" textAlign="left" color="text.muted">
//               Categories
//             </Typography>

//             <Icon className="dropdown-icon" variant="small">
//               chevron-right
//             </Icon>
//           </Button>
//         </Categories>
//         <FlexBox style={{ gap: 32 }}>{renderNestedNav(navbarNavigations, true)}</FlexBox>
//       </Container>
//     </StyledNavbar>
//   );
// }

"use client";
import { useState } from "react";
import Box from "../Box";
import Card from "../Card";
import Badge from "../badge";
import Icon from "../icon/Icon";
import FlexBox from "../FlexBox";
import NavLink from "../nav-link";
import MenuItem from "../MenuItem";
import { Button } from "../buttons";
import Container from "../Container";
import Typography, { Span } from "../Typography";
import Categories from "../categories/Categories";
import StyledNavbar from "./styles";
import navbarNavigations from "@data/navbarNavigations";
import { FaGlobe, FaUser } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import BeatLoader from "react-spinners/BeatLoader";

// ==============================================================

interface Nav {
 url: string;
 child?: Nav[]; // child is optional
 title: string;
 badge?: string; // badge is optional
 extLink?: boolean;
}

type NavbarProps = { navListOpen?: boolean };

// ==============================================================

export default function Navbar({ navListOpen }: NavbarProps) {
 const pathname = usePathname(); // Get the current path using usePathname()
 const [loading, setLoading] = useState(false);

 // Check if the current path is "/location"
 const isLocationPage = pathname === "/location";
 const isHomePage = pathname === "/";

 const handleNavigation = async (url: string, extLink: boolean) => {
  setLoading(true);
  try {
   if (extLink) {
    window.open(url, "_blank", "noopener noreferrer");
   } else {
    window.location.href = url;
   }
  } finally {
   setLoading(false);
  }
 };

 const renderNestedNav = (list: Nav[], isRoot = false) => {
  return list?.map((nav: Nav) => {
   if (isRoot) {
    // Render root navigation items
    if (nav.url && nav.extLink) {
     return (
      <NavLink
       href={nav.url}
       key={nav.title}
       target="_blank"
       className="nav-link"
       rel="noopener noreferrer"
      >
       {nav.badge ? (
        <Badge style={{ marginRight: "0px" }} title={nav.badge}>
         {nav.title}
        </Badge>
       ) : (
        <Span className="nav-link">{nav.title}</Span>
       )}
      </NavLink>
     );
    }

    if (nav.child) {
     return (
      <FlexBox
       className="root"
       position="relative"
       flexDirection="column"
       alignItems="center"
       key={nav.title}
      >
       {nav.badge ? (
        <Badge title={nav.badge}>{nav.title}</Badge>
       ) : (
        <Span className="nav-link">{nav.title}</Span>
       )}
       <div className="root-child">
        <Card
         borderRadius={8}
         mt="1.25rem"
         py="0.5rem"
         boxShadow="large"
         minWidth="230px"
        >
         {renderNestedNav(nav.child)}
        </Card>
       </div>
      </FlexBox>
     );
    }

    if (nav.url) {
     return (
      <NavLink className="nav-link" href={nav.url} key={nav.title}>
       {nav.badge ? (
        <Badge style={{ marginRight: "0px" }} title={nav.badge}>
         {nav.title}
        </Badge>
       ) : (
        <Span className="nav-link">{nav.title}</Span>
       )}
      </NavLink>
     );
    }
   } else {
    // Render nested navigation items
    if (nav.url) {
     return (
      <NavLink href={nav.url} key={nav.title}>
       <MenuItem>
        {nav.badge ? (
         <Badge style={{ marginRight: "0px" }} title={nav.badge}>
          {nav.title}
         </Badge>
        ) : (
         <Span className="nav-link">{nav.title}</Span>
        )}
       </MenuItem>
      </NavLink>
     );
    }

    if (nav.child) {
     return (
      <Box
       className="parent"
       position="relative"
       minWidth="230px"
       key={nav.title}
      >
       <MenuItem
        color="gray.700"
        style={{ display: "flex", justifyContent: "space-between" }}
       >
        {nav.badge ? (
         <Badge style={{ marginRight: "0px" }} title={nav.badge}>
          {nav.title}
         </Badge>
        ) : (
         <Span className="nav-link">{nav.title}</Span>
        )}
        <Icon size="8px" defaultcolor="currentColor">
         right-arrow
        </Icon>
       </MenuItem>

       <Box className="child" pl="0.5rem">
        <Card py="0.5rem" borderRadius={8} boxShadow="large" minWidth="230px">
         {renderNestedNav(nav.child)}
        </Card>
       </Box>
      </Box>
     );
    }
   }
  });
 };

 return (
  <StyledNavbar>
   <Container
    height="100%"
    display="flex"
    alignItems="center"
    justifyContent="space-between"
   >
    <FlexBox
     style={{
      gap: "32px",
      display: "flex",
      alignItems: "center",
      flexGrow: 1,
     }}
    >
     {/* Render Categories only if the current page is not '/location' */}
     {!isLocationPage && (
      <Categories open={navListOpen}>
       <Button width="278px" height="40px" bg="body.default" variant="text">
        <Icon>categories</Icon>
        <Typography
         ml="10px"
         flex="1 1 0"
         fontWeight="600"
         textAlign="left"
         color="text.muted"
        >
         Categories
        </Typography>
        {!isHomePage && (
         <Icon className="dropdown-icon" variant="small">
          chevron-right
         </Icon>
        )}
       </Button>
      </Categories>
     )}
    </FlexBox>

    <FlexBox style={{ display: "flex", alignItems: "center" }}>
     {navbarNavigations.map((navItem) => (
      <Button
       key={navItem.title}
       onClick={() => handleNavigation(navItem.url, navItem.extLink)}
       disabled={loading}
       style={{
        display: "flex",
        alignItems: "center",
        backgroundColor:
         navItem.title === "International Products" ? "#E94560" : "#E94560", // Using primary color for both
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background-color 0.3s, transform 0.3s", // Added transform for hover effect
        color: "white",
        minWidth: "150px",
        marginLeft: "15px",
        opacity: loading ? 0.6 : 1,
        padding: "10px 15px", // Adding padding for more space
        boxShadow:
         navItem.title === "International Products"
          ? "0 4px 10px rgba(233, 69, 96, 0.5)"
          : "none", // Subtle shadow for emphasis
       }}
      >
       <div style={{ marginRight: "8px" }}>
        {navItem.title === "Become A Seller" ? (
         <FaUser />
        ) : navItem.title === "International Products" ? (
         <FaGlobe />
        ) : (
         <FaLocationPin />
        )}
       </div>

       <Typography style={{ fontWeight: "500" }}>{navItem.title}</Typography>
      </Button>
     ))}
     {loading && <BeatLoader size={18} color="#fff" />}
    </FlexBox>
   </Container>
  </StyledNavbar>
 );
}

//  =================

// "use client"
// import { useState, useEffect } from "react"
// import Box from "../Box"
// import Card from "../Card"
// import Badge from "../badge"
// import Icon from "../icon/Icon"
// import FlexBox from "../FlexBox"
// import NavLink from "../nav-link"
// import MenuItem from "../MenuItem"
// import { Button } from "../buttons"
// import Container from "../Container"
// import Typography, { Span } from "../Typography"
// import Categories from "../categories/Categories"
// import StyledNavbar from "./styles"
// import navbarNavigations from "@data/navbarNavigations"
// import { FaGlobe, FaUser, FaClock } from "react-icons/fa"
// import { FaLocationPin } from "react-icons/fa6"
// import { usePathname } from "next/navigation"
// import BeatLoader from "react-spinners/BeatLoader"

// // ==============================================================
// interface Nav {
//   url: string
//   child?: Nav[] // child is optional
//   title: string
//   badge?: string // badge is optional
//   extLink?: boolean
// }

// type NavbarProps = { navListOpen?: boolean }

// // ==============================================================
// export default function Navbar({ navListOpen }: NavbarProps) {
//   const pathname = usePathname() // Get the current path using usePathname()
//   const [loading, setLoading] = useState(false)
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   })

//   // Check if the current path is "/location"
//   const isLocationPage = pathname === "/location"
//   const isHomePage = pathname === "/"

//   // Countdown logic
//   useEffect(() => {
//     const targetDate = new Date("2025-10-01T00:00:00")

//     const calculateTimeLeft = () => {
//       const difference = targetDate.getTime() - new Date().getTime()

//       if (difference > 0) {
//         setTimeLeft({
//           days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//           hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//           minutes: Math.floor((difference / 1000 / 60) % 60),
//           seconds: Math.floor((difference / 1000) % 60),
//         })
//       } else {
//         setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
//       }
//     }

//     calculateTimeLeft()
//     const timer = setInterval(calculateTimeLeft, 1000)
//     return () => clearInterval(timer)
//   }, [])

//   const handleNavigation = async (url: string, extLink: boolean) => {
//     setLoading(true)
//     try {
//       if (extLink) {
//         window.open(url, "_blank", "noopener noreferrer")
//       } else {
//         window.location.href = url
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   const renderNestedNav = (list: Nav[], isRoot = false) => {
//     return list?.map((nav: Nav) => {
//       if (isRoot) {
//         // Render root navigation items
//         if (nav.url && nav.extLink) {
//           return (
//             <NavLink href={nav.url} key={nav.title} target="_blank" className="nav-link" rel="noopener noreferrer">
//               {nav.badge ? (
//                 <Badge style={{ marginRight: "0px" }} title={nav.badge}>
//                   {nav.title}
//                 </Badge>
//               ) : (
//                 <Span className="nav-link">{nav.title}</Span>
//               )}
//             </NavLink>
//           )
//         }

//         if (nav.child) {
//           return (
//             <FlexBox className="root" position="relative" flexDirection="column" alignItems="center" key={nav.title}>
//               {nav.badge ? <Badge title={nav.badge}>{nav.title}</Badge> : <Span className="nav-link">{nav.title}</Span>}
//               <div className="root-child">
//                 <Card borderRadius={8} mt="1.25rem" py="0.5rem" boxShadow="large" minWidth="230px">
//                   {renderNestedNav(nav.child)}
//                 </Card>
//               </div>
//             </FlexBox>
//           )
//         }

//         if (nav.url) {
//           return (
//             <NavLink className="nav-link" href={nav.url} key={nav.title}>
//               {nav.badge ? (
//                 <Badge style={{ marginRight: "0px" }} title={nav.badge}>
//                   {nav.title}
//                 </Badge>
//               ) : (
//                 <Span className="nav-link">{nav.title}</Span>
//               )}
//             </NavLink>
//           )
//         }
//       } else {
//         // Render nested navigation items
//         if (nav.url) {
//           return (
//             <NavLink href={nav.url} key={nav.title}>
//               <MenuItem>
//                 {nav.badge ? (
//                   <Badge style={{ marginRight: "0px" }} title={nav.badge}>
//                     {nav.title}
//                   </Badge>
//                 ) : (
//                   <Span className="nav-link">{nav.title}</Span>
//                 )}
//               </MenuItem>
//             </NavLink>
//           )
//         }

//         if (nav.child) {
//           return (
//             <Box className="parent" position="relative" minWidth="230px" key={nav.title}>
//               <MenuItem color="gray.700" style={{ display: "flex", justifyContent: "space-between" }}>
//                 {nav.badge ? (
//                   <Badge style={{ marginRight: "0px" }} title={nav.badge}>
//                     {nav.title}
//                   </Badge>
//                 ) : (
//                   <Span className="nav-link">{nav.title}</Span>
//                 )}
//                 <Icon size="8px" defaultcolor="currentColor">
//                   right-arrow
//                 </Icon>
//               </MenuItem>
//               <Box className="child" pl="0.5rem">
//                 <Card py="0.5rem" borderRadius={8} boxShadow="large" minWidth="230px">
//                   {renderNestedNav(nav.child)}
//                 </Card>
//               </Box>
//             </Box>
//           )
//         }
//       }
//     })
//   }

//   return (
//     <StyledNavbar>
//       <Container height="100%" display="flex" alignItems="center" justifyContent="space-between">
//         <FlexBox
//           style={{
//             gap: "32px",
//             display: "flex",
//             alignItems: "center",
//             flexGrow: 1,
//           }}
//         >
//           {/* Render Categories only if the current page is not '/location' */}
//           {!isLocationPage && (
//             <Categories open={navListOpen}>
//               <Button width="278px" height="40px" bg="body.default" variant="text">
//                 <Icon>categories</Icon>
//                 <Typography ml="10px" flex="1 1 0" fontWeight="600" textAlign="left" color="text.muted">
//                   Categories
//                 </Typography>
//                 {!isHomePage && (
//                   <Icon className="dropdown-icon" variant="small">
//                     chevron-right
//                   </Icon>
//                 )}
//               </Button>
//             </Categories>
//           )}
//         </FlexBox>

//         <FlexBox style={{ display: "flex", alignItems: "center" }}>
//           {/* Professional Countdown Timer */}
//           <div className="countdown-container">
//             <div className="countdown-content">
//               {" "}
//               {/* New wrapper for inline content */}
//               <div className="countdown-header">
//                 <div className="countdown-icon">
//                   <FaClock />
//                 </div>
//                 <div className="countdown-text">
//                   <span className="launch-text">GRAND LAUNCH</span>
//                   <span className="coming-text">Coming Soon</span>
//                 </div>
//               </div>
//               <div className="countdown-timer">
//                 <div className="time-unit">
//                   <div className="time-value">{timeLeft.days}</div>
//                   <div className="time-label">DAYS</div>
//                 </div>
//                 <div className="time-separator">:</div>
//                 <div className="time-unit">
//                   <div className="time-value">{timeLeft.hours.toString().padStart(2, "0")}</div>
//                   <div className="time-label">HRS</div>
//                 </div>
//                 <div className="time-separator">:</div>
//                 <div className="time-unit">
//                   <div className="time-value">{timeLeft.minutes.toString().padStart(2, "0")}</div>
//                   <div className="time-label">MIN</div>
//                 </div>
//                 <div className="time-separator">:</div>
//                 <div className="time-unit">
//                   <div className="time-value">{timeLeft.seconds.toString().padStart(2, "0")}</div>
//                   <div className="time-label">SEC</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Existing Navigation Buttons */}
//           {navbarNavigations.map((navItem) => (
//             <Button
//               key={navItem.title}
//               onClick={() => handleNavigation(navItem.url, navItem.extLink)}
//               disabled={loading}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 backgroundColor: navItem.title === "International Products" ? "#E94560" : "#E94560",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//                 transition: "background-color 0.3s, transform 0.3s",
//                 color: "white",
//                 minWidth: "150px",
//                 marginLeft: "15px",
//                 opacity: loading ? 0.6 : 1,
//                 padding: "10px 15px",
//                 boxShadow: navItem.title === "International Products" ? "0 4px 10px rgba(233, 69, 96, 0.5)" : "none",
//               }}
//             >
//               <div style={{ marginRight: "8px" }}>
//                 {navItem.title === "Become A Seller" ? (
//                   <FaUser />
//                 ) : navItem.title === "International Products" ? (
//                   <FaGlobe />
//                 ) : (
//                   <FaLocationPin />
//                 )}
//               </div>
//               <Typography style={{ fontWeight: "500" }}>{navItem.title}</Typography>
//             </Button>
//           ))}
//           {loading && <BeatLoader size={18} color="#fff" />}
//         </FlexBox>
//       </Container>

//       {/* Compact Gradient Countdown Timer Styles */}
//       <style jsx>
//         {`
//           .countdown-container {
//             display: flex;
//             align-items: center; /* Align items in the center vertically */
//             background: linear-gradient(
//               135deg,
//               rgb(233, 69, 96) 0%,
//               rgb(255, 107, 107) 25%,
//               rgb(233, 69, 96) 50%,
//               rgb(220, 38, 127) 75%,
//               rgb(233, 69, 96) 100%
//             );
//             background-size: 300% 300%;
//             animation: gradientShift 4s ease infinite;
//             border: 2px solid rgba(255, 255, 255, 0.3);
//             border-radius: 8px;
//             padding: 4px 8px; /* Reduced padding */
//             margin-right: 15px;
//             box-shadow: 0 4px 15px rgba(233, 69, 96, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1),
//               inset 0 1px 0 rgba(255, 255, 255, 0.2);
//             position: relative;
//             overflow: hidden;
//             min-width: 330px;
//             height: 50px;
//           }

//           .countdown-container::before {
//             content: "";
//             position: absolute;
//             top: 0;
//             left: 0;
//             right: 0;
//             bottom: 0;
//             background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
//             animation: shimmerWave 3s infinite;
//             pointer-events: none;
//           }

//           .countdown-container::after {
//             content: "";
//             position: absolute;
//             top: -1px;
//             left: -1px;
//             right: -1px;
//             bottom: -1px;
//             background: linear-gradient(45deg, rgba(255, 255, 255, 0.3), transparent, rgba(255, 255, 255, 0.3));
//             border-radius: 10px;
//             z-index: -1;
//             animation: borderGlow 2s ease-in-out infinite alternate;
//           }

//           .countdown-content {
//             display: flex; /* Make content inline */
//             align-items: center;
//             gap: 8px; /* Space between header and timer */
//             position: relative;
//             z-index: 2;
//             width: 100%; /* Ensure it takes full width of container */
//             justify-content: space-between; /* Distribute space */
//           }

//           .countdown-header {
//             display: flex;
//             align-items: center;
//             gap: 4px;
//             margin-bottom: 0; /* Remove bottom margin */
//           }

//           .countdown-icon {
//             color: rgba(255, 255, 255, 0.95);
//             font-size: 15px;
//             animation: iconPulse 2s infinite;
//             filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
//           }

//           .countdown-text {
//             display: flex;
//             flex-direction: column;
//             line-height: 1;
//           }

//           .launch-text {
//             font-size: 13px;
//             font-weight: 700;
//             color: rgba(255, 255, 255, 0.95);
//             letter-spacing: 0.3px;
//             text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
//             background: linear-gradient(45deg, #fff, rgba(255, 255, 255, 0.8));
//             -webkit-background-clip: text;
//             -webkit-text-fill-color: transparent;
//             background-clip: text;
//           }

//           .coming-text {
//             font-size: 11px;
//             color: rgba(255, 255, 255, 0.8);
//             font-weight: 400;
//             text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
//           }

//           .countdown-timer {
//             display: flex;
//             align-items: center;
//             gap: 4px;
//             position: relative;
//             z-index: 2;
//           }

//           .time-unit {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             background: linear-gradient(
//               135deg,
//               rgba(255, 255, 255, 0.25) 0%,
//               rgba(255, 255, 255, 0.1) 50%,
//               rgba(255, 255, 255, 0.05) 100%
//             );
//             backdrop-filter: blur(10px);
//             border: 1px solid rgba(255, 255, 255, 0.2);
//             border-radius: 4px;
//             min-width: 35px;
//             height: 35px;
//             box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3);
//             position: relative;
//             overflow: hidden;
//             transition: all 0.3s ease;
//           }

//           .time-unit::before {
//             content: "";
//             position: absolute;
//             top: 0;
//             left: 0;
//             right: 0;
//             height: 1px;
//             background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
//           }

//           .time-unit::after {
//             content: "";
//             position: absolute;
//             top: 0;
//             left: -100%;
//             width: 100%;
//             height: 100%;
//             background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
//             animation: unitShimmer 3s infinite;
//           }

//           .time-value {
//             font-size: 18px;
//             font-weight: 700;
//             color: white;
//             line-height: 1;
//             font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
//             text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
//             position: relative;
//             z-index: 1;
//           }

//           .time-label {
//             font-size: 10px;
//             color: rgba(255, 255, 255, 0.9);
//             font-weight: 500;
//             margin-top: 1px;
//             letter-spacing: 0.2px;
//             text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
//             position: relative;
//             z-index: 1;
//           }

//           .time-separator {
//             color: rgba(255, 255, 255, 0.9);
//             font-size: 12px;
//             font-weight: bold;
//             animation: separatorBlink 1s infinite;
//             text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
//             filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.5));
//           }

//           @keyframes gradientShift {
//             0% {
//               background-position: 0% 50%;
//             }
//             50% {
//               background-position: 100% 50%;
//             }
//             100% {
//               background-position: 0% 50%;
//             }
//           }

//           @keyframes shimmerWave {
//             0% {
//               transform: translateX(-100%) rotate(45deg);
//             }
//             100% {
//               transform: translateX(300%) rotate(45deg);
//             }
//           }

//           @keyframes borderGlow {
//             0% {
//               opacity: 0.5;
//             }
//             100% {
//               opacity: 1;
//             }
//           }

//           @keyframes iconPulse {
//             0%,
//             100% {
//               transform: scale(1);
//               filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
//             }
//             50% {
//               transform: scale(1.1);
//               filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
//             }
//           }

//           @keyframes separatorBlink {
//             0%,
//             50% {
//               opacity: 1;
//               transform: scale(1);
//             }
//             51%,
//             100% {
//               opacity: 0.4;
//               transform: scale(0.9);
//             }
//           }

//           @keyframes unitShimmer {
//             0% {
//               left: -100%;
//             }
//             100% {
//               left: 100%;
//             }
//           }

//           .countdown-container:hover {
//             transform: translateY(-1px) scale(1.01);
//             box-shadow: 0 6px 20px rgba(233, 69, 96, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2),
//               inset 0 1px 0 rgba(255, 255, 255, 0.3);
//             transition: all 0.3s ease;
//           }

//           .countdown-container:hover::after {
//             animation-duration: 1s;
//           }

//           .time-unit:hover {
//             transform: scale(1.05) translateY(-1px);
//             background: linear-gradient(
//               135deg,
//               rgba(255, 255, 255, 0.35) 0%,
//               rgba(255, 255, 255, 0.2) 50%,
//               rgba(255, 255, 255, 0.15) 100%
//             );
//             box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4);
//             transition: all 0.3s ease;
//           }

//           .time-unit:hover::after {
//             animation-duration: 1.5s;
//           }

//           /* Responsive adjustments */
//           @media (max-width: 768px) {
//             .countdown-container {
//               min-width: 240px; /* Adjusted for smaller screens */
//               padding: 4px 6px;
//               height: 38px;
//             }

//             .countdown-content {
//               gap: 6px;
//             }

//             .countdown-icon {
//               font-size: 9px;
//             }

//             .launch-text {
//               font-size: 7px;
//             }

//             .coming-text {
//               font-size: 6px;
//             }

//             .time-unit {
//               min-width: 20px;
//               padding: 1px 3px;
//               height: 20px;
//             }

//             .time-value {
//               font-size: 9px;
//             }

//             .time-label {
//               font-size: 5px;
//             }

//             .time-separator {
//               font-size: 10px;
//             }
//           }
//         `}
//       </style>
//     </StyledNavbar>
//   )
// }
