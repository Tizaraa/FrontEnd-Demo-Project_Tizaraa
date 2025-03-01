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
// "use client";

// import { Fragment, useState, useEffect } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import Cookies from "js-cookie";

// import Icon from "@component/icon/Icon";
// import FlexBox from "@component/FlexBox";
// import Typography from "@component/Typography";
// import authService from "services/authService";
// import { toast } from "react-toastify";

// // STYLED COMPONENTS
// import { DashboardNavigationWrapper, StyledDashboardNav } from "./styles";

// export default function DashboardNavigation() {
//   const pathname = usePathname();
//   const router = useRouter();

//   const [isMobileView, setIsMobileView] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Logout function
//   const handleLogout = () => {
//     authService.logout(); // Call the logout service
//     //Cookies.remove("token"); // Remove the token from cookies
//     localStorage.removeItem("userInfo"); // Clear user info from local storage
//     localStorage.removeItem("token"); // Clear token from local storage
//     setIsLoggedIn(false); // Set the state as logged out
//     router.push("/login");
//     toast.success("Logout Successfully") // Redirect to login page after logout
//   };

//   // Check if user is logged in when component mounts
//   useEffect(() => {
//     // const token = Cookies.get("token");
//     const token = authService.getToken();
//     if (token) {
//       setIsLoggedIn(true); // Set logged-in state if token exists
//     } else {
//       setIsLoggedIn(false); // Set logged-out state if no token exists
//     }
//   }, [pathname]); // Add pathname as a dependency to re-check when route changes

//   // Listen to window resize to update mobile view state
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobileView(window.innerWidth < 768); // Mobile view threshold
//     };

//     handleResize(); // Check on mount

//     window.addEventListener("resize", handleResize); // Listen for resize events

//     return () => window.removeEventListener("resize", handleResize); // Clean up listener
//   }, []);

//   return (
//     <DashboardNavigationWrapper px="0px" pb="1.5rem" color="gray.900" borderRadius={8}>
//       {linkList.map((item) => (
//         <Fragment key={item.title}>
//           <Typography p="26px 30px 1rem" color="text.muted" fontSize="12px">
//             {item.title}
//           </Typography>

//           {item.list.map((navItem) => (
//             <StyledDashboardNav
//               px="1.5rem"
//               mb="1.25rem"
//               href={navItem.href}
//               key={navItem.title}
//               isCurrentPath={pathname.includes(navItem.href)}
//               onClick={() => {
//                 // Prevent access to profile if not logged in
//                 if (navItem.href === "/profile" && !isLoggedIn) {
//                   router.push("/login");
//                 }
//               }}
//             >
//               <FlexBox alignItems="center">
//                 <div className="dashboard-nav-icon-holder">
//                   <Icon variant="small" defaultcolor="currentColor" mr="10px">
//                     {navItem.iconName}
//                   </Icon>
//                 </div>
//                 <span>{navItem.title}</span>
//               </FlexBox>
//               <span>{navItem.count}</span>
//             </StyledDashboardNav>
            
//           ))}
//         </Fragment>
//       ))}

//       {/* Conditionally render logout button in mobile view only if logged in */}
//       {isMobileView && isLoggedIn && (
//           <FlexBox alignItems="center" style={{cursor:"pointer", marginLeft: "30px"}} onClick={handleLogout}>
//             <div className="dashboard-nav-icon-holder">
//               <Icon variant="small" defaultcolor="currentColor" mr="10px">
//                 logout
//               </Icon>
//             </div>
//             <span>Logout</span>
//           </FlexBox>
//       )}
//       {/* {isMobileView && isLoggedIn && (
//         <StyledDashboardNav px="1.5rem" mb="1.25rem" onClick={handleLogout} href="/login">
//           <FlexBox alignItems="center">
//             <div className="dashboard-nav-icon-holder">
//               <Icon variant="small" defaultcolor="currentColor" mr="10px">
//                 logout
//               </Icon>
//             </div>
//             <span>Logout</span>
//           </FlexBox>
//         </StyledDashboardNav>
//       )} */}
//     </DashboardNavigationWrapper>
//   );
// }

// const linkList = [
//   {
//     title: "DASHBOARD",
//     list: [
//       { href: "/orders", title: "Orders", iconName: "bag", count: 1 },
//       { href: "/wish-list", title: "Wishlist", iconName: "heart", count: 19 },
//       { href: "/support-tickets", title: "Support Tickets", iconName: "customer-service", count: 1 },
//     ],
//   },
//   {
//     title: "ACCOUNT SETTINGS",
//     list: [
//       { href: "/profile", title: "Profile Info", iconName: "user", count: 3 },
//       { href: "/address", title: "Addresses", iconName: "pin", count: 16 },
//       { href: "/payment-methods", title: "Payment Methods", iconName: "credit-card", count: 4 },
//     ],
//   },
// ];

"use client";

import { Fragment, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios"; // Import axios for API requests

import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import authService from "services/authService";
import { toast } from "react-hot-toast";
import ApiBaseUrl from "api/ApiBaseUrl";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";

// STYLED COMPONENTS
import { DashboardNavigationWrapper, StyledDashboardNav } from "./styles";

export default function DashboardNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const [isMobileView, setIsMobileView] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orderCount, setOrderCount] = useState(0); // State for order count
  const [pendingOrderCount, setPendingOrderCount] = useState(0); // State for pending order count
  const [deliveredOrderCount, setDeliveredOrderCount] = useState(0); // State for delivered order count
  const [canceledOrderCount, setCanceledOrderCount] = useState(0); // State for Canceled order count
  const [returnOrderCount, setReturnOrderCount] = useState(0); // State for Canceled order count
  const [addressCount, setAddressCount] = useState(0); // State for address count
  const [rfqCount, setRfqCount] = useState(0); // State for RFQ count



  // Fetch user data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = authService.getToken(); // Assuming your authService provides the token
        const response = await axios.get(`${ApiBaseUrl.baseUrl}user/profile/history`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in the Authorization header
          },
        });

        // Extract the needed fields from the API response
        const { totalorder, pending, deliveryitem, cancelitem, returnlitem, customeraddress } = response.data;

        setOrderCount(totalorder); // Set the total order count
        setPendingOrderCount(pending); // Set the pending order count
        setDeliveredOrderCount(deliveryitem); // Set the delivered order count
        setCanceledOrderCount(cancelitem); // Set the delivered order count
        setReturnOrderCount(returnlitem); // Set the delivered order count
        setAddressCount(customeraddress); // Set the customer address count
        const rfqResponse = await axios.get(`${ApiBaseUrl.baseUrl}rfqs`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in the Authorization header
          },
        });

        const { total_rfqs } = rfqResponse.data; // Extract RFQ count from response
        setRfqCount(total_rfqs); // Set the RFQ count

      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };

    fetchData();
  }, []);

  // Logout function
  const handleLogout = () => {
    authService.logout(); // Call the logout service
    localStorage.removeItem("userInfo"); // Clear user info from local storage
    localStorage.removeItem("token"); // Clear token from local storage
    setIsLoggedIn(false); // Set the state as logged out
    router.push("/");
    toast.success("Logout Successfully"); // Redirect to login page after logout
  };

  // Check if user is logged in when component mounts
  useEffect(() => {
    const token = authService.getToken();
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

  const linkList = [ 
    {
      title: "DASHBOARD",
      list: [
        { href: "/orders", title: "All Orders", iconName: "bag_filled", count: orderCount }, // Use orderCount here
        { href: "/pending-orders", title: "Pending Orders", iconName: "bag", count: pendingOrderCount },
        { href: "/delivered-orders", title: "Delivered Orders", iconName: "delivery", count: deliveredOrderCount },
        { href: "/cancel-orders", title: "Cancelled Orders", iconName: "delete", count: canceledOrderCount },
        { href: "/return-orders", title: "Return Orders", iconName: "truck", count: returnOrderCount },
        { href: "/rfq", title: "RFQ", iconName: "request", count: rfqCount },
        // { href: "/wish-list", title: "Wishlist", iconName: "heart", count: 19 },
        // { href: "/support-tickets", title: "Support Tickets", iconName: "customer-service", count: 1 },
      ],
    },
    {
      title: "ACCOUNT SETTINGS",
      list: [
        { href: "/profile", title: "Profile Info", iconName: "user" },
        { href: "/address", title: "Addresses", iconName: "pin", count: addressCount }, // Use addressCount here
        // { href: "/payment-methods", title: "Payment Methods", iconName: "credit-card", count: 4 },
      ],
    },
  ];

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

      {isMobileView && isLoggedIn && (
        <FlexBox alignItems="center" style={{ cursor: "pointer", marginLeft: "30px" }} onClick={handleLogout}>
          <div className="dashboard-nav-icon-holder">
            <Icon variant="small" defaultcolor="currentColor" mr="10px">
              logout
            </Icon>
          </div>
          <span>Logout</span>
        </FlexBox>
      )}
    </DashboardNavigationWrapper>
  );
}

