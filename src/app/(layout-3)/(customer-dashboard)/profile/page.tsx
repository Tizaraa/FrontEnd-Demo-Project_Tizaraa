// "use client";

// import React, { Fragment, useEffect, useState, Suspense } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import axios from "axios";
// import TableRow from "@component/TableRow";

// // GLOBAL CUSTOM COMPONENTS
// import Box from "@component/Box";
// import Card from "@component/Card";
// import Avatar from "@component/avatar";
// import Grid from "@component/grid/Grid";
// import FlexBox from "@component/FlexBox";
// import Typography, { H3, H5, Small } from "@component/Typography";
// import DashboardPageHeader from "@component/layout/DashboardPageHeader";
// import { EditProfileButton } from "@sections/customer-dashboard/profile";
// import { Vortex } from "react-loader-spinner";
// import styled from "@emotion/styled";
// import ApiBaseUrl from "api/ApiBaseUrl";
// import authService from "services/authService";
// import Link from "next/link";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';

// const LoaderWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// // Fallback component while waiting for search params
// function LoadingFallback() {
//   return (
//     <LoaderWrapper>
//       <Vortex />
//     </LoaderWrapper>
//   );
// }

// export default function Profile() {
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });
//   const [data, setData] = useState({
//     totalOrders: 0,
//     confirmedOrders: 0,
//     pendingOrders: 0,
//     deliveredOrders: 0,
//     cancelOrders: 0,
//     totalShipments: 0,
//     totalDeliveries: 0,
//     customerAddresses: [],
//   });
//   const [loading, setLoading] = useState(true);
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     const token = searchParams.get("token");
//     const userFromURL = searchParams.get("user");

//     if (token && userFromURL) {
//       localStorage.setItem("token", token);
//       localStorage.setItem("userInfo", userFromURL);

//       router.push("/profile");
//     }

//     if (!authService.isAuthenticated()) {
//       router.push("/login");
//     } else {
//       authService.getUser().then((userData) => {
//         setUser(userData);
//         setLoading(false);
//       });
//     }
//   }, [router, searchParams]);

//   // Fetch profile and profile history data from API
//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         // Fetch profile data (name, email, phone)
//         const profileResponse = await axios.get(`${ApiBaseUrl.baseUrl}user/profile`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setProfile(profileResponse.data.profile); // Assuming the response has { profile: { name, email, phone } }

//         // Fetch profile history (orders, deliveries)
//         const historyResponse = await axios.get(`${ApiBaseUrl.baseUrl}user/profile/history`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const profileData = historyResponse.data;
//         setData({
//           totalOrders: profileData.totalorder,
//           confirmedOrders: profileData.conformitem,
//           pendingOrders: profileData.pending,
//           deliveredOrders: profileData.deliveryitem,
//           cancelOrders: profileData.cancelitem,
//           totalShipments: profileData.shipeditem,
//           totalDeliveries: profileData.deliveryitem,
//           customerAddresses: profileData.customeraddress,
//         });
//       } catch (error) {
//         console.error("Error fetching profile data:", error);
//       }
//     };

//     fetchProfileData();
//   }, []);

//   if (loading)
//     return (
//       <LoaderWrapper>
//         <Vortex />
//       </LoaderWrapper>
//     );

//     const infoList = [
//       { title: data.totalOrders, subtitle: "All Orders", link: "/orders" },
//       { title: data.pendingOrders, subtitle: "Pending Orders", link: "/pending-orders" },
//       { title: data.deliveredOrders, subtitle: "Delivered Orders", link: "/delivered-orders" },
//       { title: data.cancelOrders, subtitle: "Cancelled Orders", link: "/cancel-orders" },
//       // { title: data.totalDeliveries, subtitle: "Total Delivery", link: "#" },
//     ];

//   return (
//     <Suspense fallback={<LoadingFallback />}>
//       <Fragment>
//         <DashboardPageHeader
//           title="My Profile"
//           iconName="user_filled"
//           button={<EditProfileButton />}
//         />

//         <Box mb="30px">
//           <Grid container spacing={6}>
//             <Grid item lg={6} md={6} sm={12} xs={12}>
//               <FlexBox
//                 as={Card}
//                 p="14px 32px"
//                 height="100%"
//                 borderRadius={8}
//                 alignItems="center"
//               >
//                 {/* <Avatar src={user?.image} size={64} /> */}

//                 {user?.image ? (
//                 <Avatar src={user.image} size={64} />
//               ) : (
//                 <FontAwesomeIcon icon={faUser} size="2x" />
//               )}

//                 <Box ml="12px" flex="1 1 0">
//                   <FlexBox
//                     flexWrap="wrap"
//                     justifyContent="space-between"
//                     alignItems="center"
//                   >
//                     <div>
//                       <H5 my="0px">{profile?.name}</H5>
//                     </div>
//                   </FlexBox>
//                 </Box>
//               </FlexBox>
//             </Grid>

//             <Grid item lg={6} md={6} sm={12} xs={12}>
//               <Grid container spacing={4}>
//                 {infoList.map((item) => (
//                   <Grid item lg={3} sm={6} xs={6} key={item.subtitle}>
//                     {item.link ? (
//         <Link href={item.link} passHref>
//           <FlexBox
//             as={Card}
//             height="100%"
//             p="1rem 1.25rem"
//             borderRadius={8}
//             alignItems="center"
//             flexDirection="column"
//             justifyContent="center"
//             style={{ cursor: "pointer" }}
//           >
//             <H3 color="primary.main" my="0px" fontWeight="600">
//               {item?.title}
//             </H3>

//             <Small color="text.muted" textAlign="center">
//               {item?.subtitle}
//             </Small>
//           </FlexBox>
//         </Link>
//       ) : (
//         <div>
//           <FlexBox
//             as={Card}
//             height="100%"
//             p="1rem 1.25rem"
//             borderRadius={8}
//             alignItems="center"
//             flexDirection="column"
//             justifyContent="center"
//           >
//             <H3 color="primary.main" my="0px" fontWeight="600">
//               {item?.title}
//             </H3>

//             <Small color="text.muted" textAlign="center">
//               {item?.subtitle}
//             </Small>
//           </FlexBox>
//         </div>
//       )}
//                   </Grid>
//                 ))}
//               </Grid>
//             </Grid>
//           </Grid>
//         </Box>

//         <TableRow p="0.75rem 1.5rem">
//           <FlexBox flexDirection="column" p="0.5rem">
//             <Small color="text.muted" mb="4px">
//               Email
//             </Small>
//             <span>{profile?.email}</span>
//           </FlexBox>

//           <FlexBox flexDirection="column" p="0.5rem">
//             <Small color="text.muted" mb="4px" textAlign="left">
//               Phone
//             </Small>
//             <span>{profile?.phone}</span>
//           </FlexBox>
//         </TableRow>
//       </Fragment>
//     </Suspense>
//   );
// }

"use client";

import React, { Fragment, useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import styled from "styled-components";

import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import ApiBaseUrl from "api/ApiBaseUrl";
import authService from "services/authService";
import CorporateCard from "@component/page/profile/corporeateCard";
import Loader from "@component/loader";
import { useDashboardCountsListener } from "utils/dashboardCounts";
import {
 ProfileHero,
 RecentOrders,
 QuickActions,
 ActionLink,
} from "@sections/customer-dashboard/profile/ProfileIdentity";

// Customer profile page.
// - Retail customers (any `type` other than "employee") get the retail
//   dashboard: hero with contact icons + completeness, order stats, recent
//   orders, quick actions, personal details and saved address.
// - Corporate employees (`type === "employee"`) keep the credit card view.
// The API sends `type` as "employee" or the user's role (e.g. "buyer"); the
// page used to check for "Regular", which never arrives, so every retail
// customer was shown the corporate card.

const Stack = styled.div`
 display: flex;
 flex-direction: column;
 gap: 20px;
`;

const ErrorBox = styled.div`
 display: flex;
 flex-wrap: wrap;
 align-items: center;
 justify-content: space-between;
 gap: 12px;
 padding: 20px;
 border: 1px solid ${({ theme }) => theme.tz.tone.danger.bg};
 border-radius: 18px;
 background: ${({ theme }) => theme.tz.color.paper};

 strong {
  display: block;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 span {
  color: ${({ theme }) => theme.tz.color.slate};
 }
 button {
  height: 40px;
  padding: 0 18px;
  border: 0;
  border-radius: 999px;
  font-weight: 700;
  color: #fff;
  background: ${({ theme }) => theme.tz.color.emberDeep};
  cursor: pointer;
 }
`;

// Same Tizaraa loader for retail users and corporate employees
function LoadingSkeleton() {
 return <Loader />;
}

export default function Profile() {
 const router = useRouter();
 const searchParams = useSearchParams();
 const [profile, setProfile] = useState<any>(null);
 const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
 const [canChangePassword, setCanChangePassword] = useState(true);
 const [data, setData] = useState({
  totalOrders: 0,
  pendingOrders: 0,
  deliveredOrders: 0,
  cancelOrders: 0,
  returnOrders: 0,
  addresses: 0,
 });
 const [countsLoaded, setCountsLoaded] = useState(false);

 useEffect(() => {
  const token = searchParams.get("token");
  const userFromURL = searchParams.get("user");
  if (token && userFromURL) {
   localStorage.setItem("token", token);
   localStorage.setItem("userInfo", userFromURL);
   router.push("/profile");
  }
  if (!authService.isAuthenticated()) {
   router.push("/login");
   return;
  }
  // Accounts created with Google (status 2) have no password to change
  try {
   const info = JSON.parse(localStorage.getItem("userInfo") || "null");
   setCanChangePassword(info?.status !== 2);
  } catch {
   // keep the default
  }
 }, [router, searchParams]);

 const fetchProfileData = async (fresh = false) => {
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };
  try {
   const profileResponse = await axios.get(`${ApiBaseUrl.localApiUrl}user/profile`, { headers });
   setProfile(profileResponse.data.profile);
   setStatus("ready");
  } catch (error) {
   console.error("Error fetching profile:", error);
   setStatus("error");
   return;
  }
  try {
   const historyResponse = await axios.get(`${ApiBaseUrl.localApiUrl}user/profile/history`, {
    headers,
    params: fresh ? { fresh: 1 } : undefined,
   });
   const h = historyResponse.data;
   setData({
    totalOrders: h.totalorder ?? 0,
    pendingOrders: h.pending ?? 0,
    deliveredOrders: h.deliveryitem ?? 0,
    cancelOrders: h.cancelitem ?? 0,
    returnOrders: h.returnlitem ?? 0,
    addresses: h.customeraddress ?? 0,
   });
   setCountsLoaded(true);
  } catch (error) {
   console.error("Error fetching order counts:", error);
  }
 };

 useEffect(() => {
  fetchProfileData();
 }, []);

 // Re-fetch the moment something elsewhere (cancelling an item, submitting a
 // return, etc.) reports the counts as stale, instead of only on a hard reload.
 useDashboardCountsListener(() => fetchProfileData(true));

 const isCorporate = profile?.type === "employee";

 return (
  <Suspense fallback={<LoadingSkeleton />}>
   <Fragment>
    <DashboardPageHeader
     title="My profile"
     subtitle="Your account, orders and saved details in one place"
     iconName="user_filled"
    />

    {status === "loading" ? (
     <LoadingSkeleton />
    ) : status === "error" ? (
     <ErrorBox role="alert">
      <span>
       <strong>We couldn&apos;t load your profile</strong>
       Please check your connection and try again.
      </span>
      <button
       type="button"
       onClick={() => {
        setStatus("loading");
        fetchProfileData();
       }}
      >
       Try again
      </button>
     </ErrorBox>
    ) : isCorporate ? (
     <Stack>
      <CorporateCard profile={profile} />
      <RecentOrders delay={120} />
     </Stack>
    ) : (
     <Stack>
      <ProfileHero profile={profile} canChangePassword={canChangePassword} />

      {/* Order counts live in the sidebar; quick actions come straight after the hero */}
      <QuickActions
       canChangePassword={canChangePassword}
       delay={80}
       counts={
        countsLoaded
         ? { orders: data.totalOrders, returns: data.returnOrders, addresses: data.addresses }
         : null
       }
      />
      <RecentOrders delay={140} />

      {/* Personal details now live in the hero (email, phone, birthday, gender) */}
     </Stack>
    )}
   </Fragment>
  </Suspense>
 );
}
