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
import { FaUser } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";

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
              rel="noopener noreferrer">
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
              key={nav.title}>
              {nav.badge ? (
                <Badge title={nav.badge}>{nav.title}</Badge>
              ) : (
                <Span className="nav-link">{nav.title}</Span>
              )}
              <div className="root-child">
                <Card borderRadius={8} mt="1.25rem" py="0.5rem" boxShadow="large" minWidth="230px">
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
            <Box className="parent" position="relative" minWidth="230px" key={nav.title}>
              <MenuItem
                color="gray.700"
                style={{ display: "flex", justifyContent: "space-between" }}>
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
      <Container height="100%" display="flex" alignItems="center" justifyContent="space-between">
        <Categories open={navListOpen}>
          <Button width="278px" height="40px" bg="body.default" variant="text">
            <Icon>categories</Icon>
            <Typography ml="10px" flex="1 1 0" fontWeight="600" textAlign="left" color="text.muted">
              Categories
            </Typography>
            <Icon className="dropdown-icon" variant="small">
              chevron-right
            </Icon>
          </Button>
        </Categories>

        <FlexBox style={{ gap: "32px", display: "flex", alignItems: "center" }}>
          {navbarNavigations.map((navItem) => (
            <NavLink
              key={navItem.title}
              href={navItem.url}
              target={navItem.extLink ? "_blank" : undefined}
              rel={navItem.extLink ? "noopener noreferrer" : undefined}
              style={{ textDecoration: "none" }} // Removing underline from links
            >
              <Button
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#E94560",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                  color: "white",
                  minWidth: "150px", // Ensuring a minimum width for buttons
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#E94560")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#E94560")}
              >
                {/* Wrapping the Icon with a span for margin control */}
                <span style={{ marginRight: "8px" }}>
                {navItem.title === "Become A Seller" ? <FaUser /> : <FaLocationPin />}
                </span>
                <Typography style={{ fontWeight: "500" }}>{navItem.title}</Typography>
              </Button>
            </NavLink>
          ))}
        </FlexBox>
      </Container>
    </StyledNavbar>
  );
}



