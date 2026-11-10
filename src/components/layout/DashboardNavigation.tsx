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

import { Fragment, useState, useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "@lib/axiosClient"; // Import axios for API requests

import Icon from "@component/icon/Icon";
import authService from "services/authService";
import { toast } from "react-hot-toast";
import { useDashboardCountsListener } from "utils/dashboardCounts";
import { UserAvatar } from "@sections/customer-dashboard/ui";

// STYLED COMPONENTS
import {
 NavPanel,
 NavUser,
 NavGroupLabel,
 NavItem,
 NavButton,
 NavDivider,
 NavIndicator,
} from "./customer-dashboard/styles";

// Colour per item (icon tile + count badge), matching the profile page
const ITEM_TONE: Record<string, { fg: string; bg: string }> = {
 "/orders": { fg: "#0e3460", bg: "#e8edf4" },
 "/pending-orders": { fg: "#8a5a00", bg: "#fff4dc" },
 "/delivered-orders": { fg: "#1b7a4b", bg: "#e6f4ec" },
 "/cancel-orders": { fg: "#c0262d", bg: "#fdecec" },
 "/return-orders": { fg: "#c2400f", bg: "#fdeee7" },
 "/rfq": { fg: "#6d28d9", bg: "#ede9fe" },
 "/credit-history": { fg: "#0e3460", bg: "#e8edf4" },
 "/profile": { fg: "#c2400f", bg: "#fdeee7" },
 "/address": { fg: "#1b7a4b", bg: "#e6f4ec" },
};

// Sidebar count refresh timing
const POLL_MS = 60_000;
const MAX_POLL_MS = 5 * 60_000;
const MIN_GAP_MS = 10_000;

export default function DashboardNavigation() {
 const pathname = usePathname();
 const router = useRouter();
 const panelRef = useRef<HTMLElement>(null);
 const indicatorRef = useRef<HTMLSpanElement>(null);

 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [user, setUser] = useState<{ name?: string; email?: string; image?: string | null }>({});
 const [orderCount, setOrderCount] = useState(0); // State for order count
 const [pendingOrderCount, setPendingOrderCount] = useState(0); // State for pending order count
 const [deliveredOrderCount, setDeliveredOrderCount] = useState(0); // State for delivered order count
 const [canceledOrderCount, setCanceledOrderCount] = useState(0); // State for Canceled order count
 const [returnOrderCount, setReturnOrderCount] = useState(0); // State for Canceled order count
 const [addressCount, setAddressCount] = useState(0); // State for address count
 const [rfqCount, setRfqCount] = useState(0); // State for RFQ count
 // Corporate employees buy on company credit and have no RFQ flow (yet)
 const [isCorporateEmployee, setIsCorporateEmployee] = useState(false);

 // Request guards so many open tabs don't flood the API:
 //  - one request at a time (a forced refresh during one queues a single re-run)
 //  - non-forced refreshes skip if the last success was under MIN_GAP_MS ago
 //  - after errors, the poll waits longer (backoff) instead of retrying at full speed
 const inFlightRef = useRef(false);
 const rerunRef = useRef(false);
 const lastFetchRef = useRef(0);
 const failCountRef = useRef(0);

 // Fetch user data from the API
 const fetchData = async (force = false) => {
  if (inFlightRef.current) {
   if (force) rerunRef.current = true;
   return;
  }
  if (!force && Date.now() - lastFetchRef.current < MIN_GAP_MS) return;
  inFlightRef.current = true;
  try {
   const response = await axios.get(`user/profile/history`, force ? { params: { fresh: 1 } } : undefined);

   // Extract the needed fields from the API response
   const {
    totalorder,
    pending,
    deliveryitem,
    cancelitem,
    returnlitem,
    customeraddress,
    total_rfqs,
   } = response.data;

   setOrderCount(totalorder ?? 0);
   setPendingOrderCount(pending ?? 0);
   setDeliveredOrderCount(deliveryitem ?? 0);
   setCanceledOrderCount(cancelitem ?? 0);
   setReturnOrderCount(returnlitem ?? 0);
   setAddressCount(customeraddress ?? 0);
   setRfqCount(total_rfqs ?? 0);
   lastFetchRef.current = Date.now();
   failCountRef.current = 0;
  } catch (error) {
   failCountRef.current += 1;
   console.error("Error fetching user profile data:", error);
  } finally {
   inFlightRef.current = false;
   if (rerunRef.current) {
    rerunRef.current = false;
    fetchData(true);
   }
  }
 };

 // This sidebar lives in a layout that survives page changes, so a mount-only fetch
 // goes stale: a seller delivering or cancelling an order doesn't touch this tab.
 // Refresh on every navigation, when the tab regains focus, and on a light poll so
 // the counts follow the real order state.
 useEffect(() => {
  fetchData();
 }, [pathname]);

 useEffect(() => {
  let timer = 0;
  const refresh = () => {
   if (document.visibilityState === "visible") fetchData();
  };
  // Poll every POLL_MS; after failures wait 2x, 4x... up to MAX_POLL_MS
  const schedule = () => {
   const wait = Math.min(POLL_MS * 2 ** failCountRef.current, MAX_POLL_MS);
   timer = window.setTimeout(() => {
    refresh();
    schedule();
   }, wait);
  };
  schedule();
  // focus and visibilitychange often fire together; MIN_GAP_MS dedupes them
  window.addEventListener("focus", refresh);
  document.addEventListener("visibilitychange", refresh);
  return () => {
   window.clearTimeout(timer);
   window.removeEventListener("focus", refresh);
   document.removeEventListener("visibilitychange", refresh);
  };
 }, []);

 // Re-run the same fetch whenever something elsewhere (cancelling an item,
 // submitting a return, adding an address, etc.) reports the counts as stale —
 // otherwise these numbers only ever refresh on a hard reload.
 useDashboardCountsListener(() => fetchData(true));

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

  try {
   const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
   setIsCorporateEmployee(userInfo?.type === "employee" || Boolean(userInfo?.shop_slug));
   setUser({ name: userInfo?.name, email: userInfo?.email, image: userInfo?.image });
  } catch {
   setIsCorporateEmployee(false);
  }
 }, [pathname]); // Add pathname as a dependency to re-check when route changes

 // Glide the highlight to the current page's item
 useLayoutEffect(() => {
  const panel = panelRef.current;
  const ind = indicatorRef.current;
  if (!panel || !ind) return;
  const active = panel.querySelector<HTMLElement>('a[aria-current="page"]');
  if (!active) {
   ind.style.opacity = "0";
   return;
  }
  ind.style.height = `${active.offsetHeight}px`;
  ind.style.transform = `translateY(${active.offsetTop}px)`;
  ind.style.opacity = "1";
 });

 const linkList = [
  {
   title: "Shopping",
   list: [
    {
     href: "/orders",
     title: "All Orders",
     iconName: "bag_filled",
     count: orderCount,
    }, // Use orderCount here
    {
     href: "/pending-orders",
     title: "Pending Orders",
     iconName: "bag",
     count: pendingOrderCount,
    },
    {
     href: "/delivered-orders",
     title: "Delivered Orders",
     iconName: "delivery",
     count: deliveredOrderCount,
    },
    {
     href: "/cancel-orders",
     title: "Cancelled Orders",
     iconName: "delete",
     count: canceledOrderCount,
    },
    {
     href: "/return-orders",
     title: "Return Orders",
     iconName: "truck",
     count: returnOrderCount,
    },
    ...(isCorporateEmployee
     ? [
        {
         href: "/credit-history",
         title: "Credit History",
         iconName: "credit-card",
        },
       ]
     : [{ href: "/rfq", title: "RFQ", iconName: "request", count: rfqCount }]),
    // { href: "/wish-list", title: "Wishlist", iconName: "heart", count: 19 },
    // { href: "/support-tickets", title: "Support Tickets", iconName: "customer-service", count: 1 },
   ],
  },
  {
   title: "Account",
   list: [
    { href: "/profile", title: "Profile Info", iconName: "user" },
    {
     href: "/address",
     title: "Addresses",
     iconName: "pin",
     count: addressCount,
    }, // Use addressCount here
    // { href: "/payment-methods", title: "Payment Methods", iconName: "credit-card", count: 4 },
   ],
  },
 ];

 return (
  <NavPanel aria-label="Account" ref={panelRef}>
   <NavIndicator ref={indicatorRef} aria-hidden="true" />
   {user.name || user.email ? (
    <NavUser>
     <span className="nu-avatar">
      <UserAvatar name={user.name || user.email} image={user.image} size={46} />
      <span className="nu-dot" aria-hidden="true" />
     </span>
     <div className="nu-text">
      <p className="nu-name" title={user.email}>{user.name || "My account"}</p>
      <span className={`nu-chip${isCorporateEmployee ? " nu-chip--corp" : ""}`}>
       {isCorporateEmployee ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
         <rect x="3" y="7" width="18" height="13" rx="2" />
         <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
       ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
         <circle cx="12" cy="8" r="4" />
         <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
       )}
       {isCorporateEmployee ? "Corporate" : "Customer"}
      </span>
     </div>
    </NavUser>
   ) : null}

   {linkList.map((item) => (
    <Fragment key={item.title}>
     <NavGroupLabel>{item.title}</NavGroupLabel>

     {item.list.map((navItem, idx) => (
      <NavItem
       href={navItem.href}
       key={navItem.title}
       aria-current={pathname.includes(navItem.href) ? "page" : undefined}
       style={
        {
         "--fg": ITEM_TONE[navItem.href]?.fg,
         "--bg": ITEM_TONE[navItem.href]?.bg,
         "--i": idx,
        } as React.CSSProperties
       }
       onClick={() => {
        // Prevent access to profile if not logged in
        if (navItem.href === "/profile" && !isLoggedIn) {
         router.push("/login");
        }
       }}
      >
       <span className="ni-icon">
        <Icon variant="small" defaultcolor="currentColor">
         {navItem.iconName}
        </Icon>
       </span>
       <span className="ni-label">{navItem.title}</span>
       {typeof navItem.count === "number" && (
        // key: the badge re-mounts (and pops) whenever the number changes
        <span key={navItem.count} className={`ni-count${navItem.count > 0 ? " has" : ""}`}>
         {navItem.count}
        </span>
       )}
      </NavItem>
     ))}
    </Fragment>
   ))}

   {isLoggedIn && (
    <>
     <NavDivider />
     <NavButton type="button" onClick={handleLogout}>
      <span className="ni-icon">
       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 4h3a2 2 0 012 2v12a2 2 0 01-2 2h-3M10 17l5-5-5-5M15 12H4" />
       </svg>
      </span>
      <span className="ni-label">Logout</span>
     </NavButton>
    </>
   )}
  </NavPanel>
 );
}
