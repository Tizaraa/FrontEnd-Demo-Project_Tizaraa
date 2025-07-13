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

// "use client";
// import { useState } from "react";
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
// import StyledNavbar from "./styles";
// import navbarNavigations from "@data/navbarNavigations";
// import { FaGlobe, FaUser } from "react-icons/fa";
// import { FaLocationPin } from "react-icons/fa6";
// import { usePathname } from "next/navigation";
// import BeatLoader from "react-spinners/BeatLoader";

// // ==============================================================

// interface Nav {
//   url: string;
//   child?: Nav[]; // child is optional
//   title: string;
//   badge?: string; // badge is optional
//   extLink?: boolean;
// }

// type NavbarProps = { navListOpen?: boolean };

// // ==============================================================

// export default function Navbar({ navListOpen }: NavbarProps) {
//   const pathname = usePathname(); // Get the current path using usePathname()
//   const [loading, setLoading] = useState(false);

//   // Check if the current path is "/location"
//   const isLocationPage = pathname === "/location";
//   const isHomePage = pathname === "/";

//   const handleNavigation = async (url: string, extLink: boolean) => {
//     setLoading(true);
//     try {
//       if (extLink) {
//         window.open(url, "_blank", "noopener noreferrer");
//       } else {
//         window.location.href = url;
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderNestedNav = (list: Nav[], isRoot = false) => {
//     return list?.map((nav: Nav) => {
//       if (isRoot) {
//         // Render root navigation items
//         if (nav.url && nav.extLink) {
//           return (
//             <NavLink
//               href={nav.url}
//               key={nav.title}
//               target="_blank"
//               className="nav-link"
//               rel="noopener noreferrer"
//             >
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
//               key={nav.title}
//             >
//               {nav.badge ? (
//                 <Badge title={nav.badge}>{nav.title}</Badge>
//               ) : (
//                 <Span className="nav-link">{nav.title}</Span>
//               )}
//               <div className="root-child">
//                 <Card
//                   borderRadius={8}
//                   mt="1.25rem"
//                   py="0.5rem"
//                   boxShadow="large"
//                   minWidth="230px"
//                 >
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
//           );
//         }

//         if (nav.child) {
//           return (
//             <Box
//               className="parent"
//               position="relative"
//               minWidth="230px"
//               key={nav.title}
//             >
//               <MenuItem
//                 color="gray.700"
//                 style={{ display: "flex", justifyContent: "space-between" }}
//               >
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
//                 <Card
//                   py="0.5rem"
//                   borderRadius={8}
//                   boxShadow="large"
//                   minWidth="230px"
//                 >
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
//       <Container
//         height="100%"
//         display="flex"
//         alignItems="center"
//         justifyContent="space-between"
//       >
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
//               <Button
//                 width="278px"
//                 height="40px"
//                 bg="body.default"
//                 variant="text"
//               >
//                 <Icon>categories</Icon>
//                 <Typography
//                   ml="10px"
//                   flex="1 1 0"
//                   fontWeight="600"
//                   textAlign="left"
//                   color="text.muted"
//                 >
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
//           {navbarNavigations.map((navItem) => (
//             <Button
//   key={navItem.title}
//   onClick={() => handleNavigation(navItem.url, navItem.extLink)}
//   disabled={loading}
//   style={{
//     display: "flex",
//     alignItems: "center",
//     backgroundColor: navItem.title === "International Products" ? "#E94560" : "#E94560",  // Using primary color for both
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//     transition: "background-color 0.3s, transform 0.3s",  // Added transform for hover effect
//     color: "white",
//     minWidth: "150px",
//     marginLeft: "15px",
//     opacity: loading ? 0.6 : 1,
//     padding: "10px 15px", // Adding padding for more space
//     boxShadow: navItem.title === "International Products" ? "0 4px 10px rgba(233, 69, 96, 0.5)" : "none",  // Subtle shadow for emphasis
//   }}
// >
//   <div style={{ marginRight: "8px" }}>
//     {navItem.title === "Become A Seller" ? (
//       <FaUser />
//     ) : navItem.title === "International Products" ? (
//       <FaGlobe />
//     ) : (
//       <FaLocationPin />
//     )}
//   </div>

//   <Typography style={{ fontWeight: "500" }}>
//     {navItem.title}
//   </Typography>
// </Button>

//           ))}
//           {loading && <BeatLoader size={18} color="#fff" />}
//         </FlexBox>
//       </Container>
//     </StyledNavbar>
//   );
// }


//  =================



"use client";
import { useState, useEffect } from "react";
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
import { FaGlobe, FaUser, FaClock } from "react-icons/fa";
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
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Check if the current path is "/location"
  const isLocationPage = pathname === "/location";
  const isHomePage = pathname === "/";

  // Countdown logic
  useEffect(() => {
    const targetDate = new Date('2025-09-05T00:00:00');
    
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

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
                <Card
                  py="0.5rem"
                  borderRadius={8}
                  boxShadow="large"
                  minWidth="230px"
                >
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
              <Button
                width="278px"
                height="40px"
                bg="body.default"
                variant="text"
              >
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
          {/* Countdown Timer Section */}
          <div style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "5px",
            marginRight: "15px",
            boxShadow: "0 4px 12px rgba(220, 60, 34, 0.15)",
            border: "2px solid #FE7743",
            position: "relative",
            overflow: "hidden"
          }}>
            {/* Subtle background accent */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(135deg, rgba(254, 119, 67, 0.05) 0%, rgba(220, 60, 34, 0.05) 100%)",
              zIndex: 0
            }}></div>
            
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "10px",
              position: "relative",
              zIndex: 1
            }}>
              <FaClock style={{ 
                color: "#DC3C22", 
                fontSize: "16px"
              }} />
              
              <Typography style={{ 
                fontSize: "14px", 
                fontWeight: "600",
                color: "#000",
                marginRight: "4px"
              }}>
                Coming Soon:
              </Typography>
              
              <div style={{ 
                display: "flex", 
                gap: "6px",
                alignItems: "center"
              }}>
                <div style={{
                  backgroundColor: "#DC3C22",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  minWidth: "32px",
                  textAlign: "center"
                }}>
                  <div style={{ 
                    fontSize: "14px", 
                    fontWeight: "700",
                    color: "#fff",
                    lineHeight: "1"
                  }}>
                    {timeLeft.days}
                  </div>
                  <div style={{ 
                    fontSize: "10px", 
                    color: "#fff",
                    opacity: 0.9,
                    lineHeight: "1",
                    marginTop: "1px"
                  }}>DAYS</div>
                </div>
                
                <span style={{ 
                  color: "#DC3C22", 
                  fontSize: "14px", 
                  fontWeight: "bold",
                  margin: "0 2px"
                }}>:</span>
                
                <div style={{
                  backgroundColor: "#FE7743",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  minWidth: "32px",
                  textAlign: "center"
                }}>
                  <div style={{ 
                    fontSize: "14px", 
                    fontWeight: "700",
                    color: "#fff",
                    lineHeight: "1"
                  }}>
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </div>
                  <div style={{ 
                    fontSize: "10px", 
                    color: "#fff",
                    opacity: 0.9,
                    lineHeight: "1",
                    marginTop: "1px"
                  }}>HRS</div>
                </div>
                
                <span style={{ 
                  color: "#DC3C22", 
                  fontSize: "14px", 
                  fontWeight: "bold",
                  margin: "0 2px"
                }}>:</span>
                
                <div style={{
                  backgroundColor: "#DC3C22",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  minWidth: "32px",
                  textAlign: "center"
                }}>
                  <div style={{ 
                    fontSize: "14px", 
                    fontWeight: "700",
                    color: "#fff",
                    lineHeight: "1"
                  }}>
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </div>
                  <div style={{ 
                    fontSize: "10px", 
                    color: "#fff",
                    opacity: 0.9,
                    lineHeight: "1",
                    marginTop: "1px"
                  }}>MIN</div>
                </div>
                
                <span style={{ 
                  color: "#DC3C22", 
                  fontSize: "14px", 
                  fontWeight: "bold",
                  margin: "0 2px"
                }}>:</span>
                
                <div style={{
                  backgroundColor: "#FE7743",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  minWidth: "32px",
                  textAlign: "center"
                }}>
                  <div style={{ 
                    fontSize: "14px", 
                    fontWeight: "700",
                    color: "#fff",
                    lineHeight: "1"
                  }}>
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </div>
                  <div style={{ 
                    fontSize: "10px", 
                    color: "#fff",
                    opacity: 0.9,
                    lineHeight: "1",
                    marginTop: "1px"
                  }}>SEC</div>
                </div>
              </div>
            </div>
          </div>

          {/* Existing Navigation Buttons */}
          {navbarNavigations.map((navItem) => (
            <Button
              key={navItem.title}
              onClick={() => handleNavigation(navItem.url, navItem.extLink)}
              disabled={loading}
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: navItem.title === "International Products" ? "#E94560" : "#E94560",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background-color 0.3s, transform 0.3s",
                color: "white",
                minWidth: "150px",
                marginLeft: "15px",
                opacity: loading ? 0.6 : 1,
                padding: "10px 15px",
                boxShadow: navItem.title === "International Products" ? "0 4px 10px rgba(233, 69, 96, 0.5)" : "none",
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

              <Typography style={{ fontWeight: "500" }}>
                {navItem.title}
              </Typography>
            </Button>
          ))}
          {loading && <BeatLoader size={18} color="#fff" />}
        </FlexBox>
      </Container>
      
      {/* Add CSS for the pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
      `}</style>
    </StyledNavbar>
  );
}