// "use client";

// import { Fragment, useState, useEffect } from "react";
// import { usePathname } from "next/navigation";

// import Icon from "@component/icon/Icon";
// import FlexBox from "@component/FlexBox";
// import Typography from "@component/Typography";
// // STYLED COMPONENTS
// import { DashboardNavigationWrapper, StyledDashboardNav } from "./styles";

// import { useRouter } from "next/navigation";
// import authService from "services/authService";
// import Cookies from "js-cookie";

// export default function DashboardNavigation() {
//   const pathname = usePathname();
//   const [isMobileView, setIsMobileView] = useState(false); // State to track if it's mobile view
//   const router = useRouter(); 
  
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogout = () => {
//     authService.logout();
//     Cookies.remove('token');
//     localStorage.removeItem('userInfo');
//     localStorage.removeItem('token');
//     setIsLoggedIn(false); // Update login state
//     router.push("/login")
//   };


//   useEffect(() => {
//     setIsLoggedIn(authService.isAuthenticated());
//   }, []);


//   useEffect(() => {
//     // Function to check screen size and update state
//     const handleResize = () => {
//       setIsMobileView(window.innerWidth < 768); // Assuming mobile view is less than 768px
//     };

//     // Check initial window size
//     handleResize();

//     // Add event listener to handle window resizing
//     window.addEventListener("resize", handleResize);

//     // Clean up the event listener
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     if (!isLoggedIn) {
//       router.push("/login");
//     }
//   }, [isLoggedIn, pathname, router]);

//   return (
//     <DashboardNavigationWrapper px="0px" pb="1.5rem" color="gray.900" borderRadius={8}>
//       {linkList.map((item) => (
//         <Fragment key={item.title}>
//           <Typography p="26px 30px 1rem" color="text.muted" fontSize="12px">
//             {item.title}
//           </Typography>

//           {item.list.map((item) => (
//             <StyledDashboardNav
//               px="1.5rem"
//               mb="1.25rem"
//               href={item.href}
//               key={item.title}
//               isCurrentPath={pathname.includes(item.href)}
//             >
//               <FlexBox alignItems="center">
//                 <div className="dashboard-nav-icon-holder">
//                   <Icon variant="small" defaultcolor="currentColor" mr="10px">
//                     {item.iconName}
//                   </Icon>
//                 </div>

//                 <span>{item.title}</span>
//               </FlexBox>

//               <span>{item.count}</span>
//             </StyledDashboardNav>
//           ))}
//         </Fragment>
//       ))}

//       {/* Conditionally render logout button only in mobile view */}
//       {isMobileView && isLoggedIn && (
//         <StyledDashboardNav
//           px="1.5rem"
//           mb="1.25rem"
//           href="#"
//           onClick={handleLogout}
//         >
//           <FlexBox alignItems="center">
//             <div className="dashboard-nav-icon-holder">
//               <Icon onClick={handleLogout} variant="small" defaultcolor="currentColor" mr="10px">
//                 logout
//               </Icon>
//             </div>
//             <span>Logout</span>
//           </FlexBox>
//         </StyledDashboardNav>
//       )}
//     </DashboardNavigationWrapper>
//   );
// }

// const linkList = [
//   {
//     title: "DASHBOARD",
//     list: [
//       { href: "/orders", title: "Orders", iconName: "bag", count: 5 },
//       { href: "/wish-list", title: "Wishlist", iconName: "heart", count: 19 },
//       { href: "/support-tickets", title: "Support Tickets", iconName: "customer-service", count: 1 }
//     ]
//   },
//   {
//     title: "ACCOUNT SETTINGS",
//     list: [
//       { href: "/profile", title: "Profile Info", iconName: "user", count: 3 },
//       { href: "/address", title: "Addresses", iconName: "pin", count: 16 },
//       { href: "/payment-methods", title: "Payment Methods", iconName: "credit-card", count: 4 },
//       // The logout option will be added dynamically for mobile view
//     ]
//   }
// ];
"use client";

import { Fragment, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import authService from "services/authService";

// STYLED COMPONENTS
import { DashboardNavigationWrapper, StyledDashboardNav } from "./styles";

export default function DashboardNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const [isMobileView, setIsMobileView] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Logout function
  const handleLogout = () => {
    authService.logout(); // Call the logout service
    Cookies.remove("token"); // Remove the token from cookies
    localStorage.removeItem("userInfo"); // Clear user info from local storage
    localStorage.removeItem("token"); // Clear token from local storage
    setIsLoggedIn(false); // Set the state as logged out
    router.push("/login"); // Redirect to login page after logout
  };

  // Check if user is logged in when component mounts
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true); // Set logged-in state if token exists
    } else {
      setIsLoggedIn(false); // Set logged-out state if no token exists
    }
  }, [pathname]); // Add pathname as a dependency to re-check when route changes

  // Listen to window resize to update mobile view state
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768); // Mobile view threshold
    };

    handleResize(); // Check on mount

    window.addEventListener("resize", handleResize); // Listen for resize events

    return () => window.removeEventListener("resize", handleResize); // Clean up listener
  }, []);

  return (
    <DashboardNavigationWrapper px="0px" pb="1.5rem" color="gray.900" borderRadius={8}>
      {linkList.map((item) => (
        <Fragment key={item.title}>
          <Typography p="26px 30px 1rem" color="text.muted" fontSize="12px">
            {item.title}
          </Typography>

          {item.list.map((navItem) => (
            <StyledDashboardNav
              px="1.5rem"
              mb="1.25rem"
              href={navItem.href}
              key={navItem.title}
              isCurrentPath={pathname.includes(navItem.href)}
              onClick={() => {
                // Prevent access to profile if not logged in
                if (navItem.href === "/profile" && !isLoggedIn) {
                  router.push("/login");
                }
              }}
            >
              <FlexBox alignItems="center">
                <div className="dashboard-nav-icon-holder">
                  <Icon variant="small" defaultcolor="currentColor" mr="10px">
                    {navItem.iconName}
                  </Icon>
                </div>
                <span>{navItem.title}</span>
              </FlexBox>
              <span>{navItem.count}</span>
            </StyledDashboardNav>
          ))}
        </Fragment>
      ))}

      {/* Conditionally render logout button in mobile view only if logged in */}
      {isMobileView && isLoggedIn && (
        <StyledDashboardNav px="1.5rem" mb="1.25rem" href="#">
          <FlexBox alignItems="center" onClick={handleLogout}>
            <div className="dashboard-nav-icon-holder">
              <Icon variant="small" defaultcolor="currentColor" mr="10px">
                logout
              </Icon>
            </div>
            <span>Logout</span>
          </FlexBox>
        </StyledDashboardNav>
      )}
    </DashboardNavigationWrapper>
  );
}

const linkList = [
  {
    title: "DASHBOARD",
    list: [
      { href: "/orders", title: "Orders", iconName: "bag", count: 1 },
      { href: "/wish-list", title: "Wishlist", iconName: "heart", count: 19 },
      { href: "/support-tickets", title: "Support Tickets", iconName: "customer-service", count: 1 },
    ],
  },
  {
    title: "ACCOUNT SETTINGS",
    list: [
      { href: "/profile", title: "Profile Info", iconName: "user", count: 3 },
      { href: "/address", title: "Addresses", iconName: "pin", count: 16 },
      { href: "/payment-methods", title: "Payment Methods", iconName: "credit-card", count: 4 },
    ],
  },
];
