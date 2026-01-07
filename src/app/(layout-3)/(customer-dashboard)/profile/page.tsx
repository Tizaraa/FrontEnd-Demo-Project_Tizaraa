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
import TableRow from "@component/TableRow";

import Box from "@component/Box";
import Card from "@component/Card";
import Avatar from "@component/avatar";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import Typography, { H3, H5, Small } from "@component/Typography";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import { EditProfileButton } from "@sections/customer-dashboard/profile";
import { Vortex } from "react-loader-spinner";
import styled from "@emotion/styled";
import ApiBaseUrl from "api/ApiBaseUrl";
import authService from "services/authService";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMars,
  faGenderless,
  faVenus,
  faPhone,
  faUser,
  faCalendar,
  faFemale,
} from "@fortawesome/free-solid-svg-icons";
import { marginBottom } from "styled-system";
import CorporateCard from "@component/page/profile/corporeateCard";

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
`;

function LoadingFallback() {
  return (
    <LoaderWrapper>
      <Vortex />
    </LoaderWrapper>
  );
}
type profileType = {
  id: number;
  name: string;
  email: string;
  phone: any;
  gender: any;
  birth_date: any;
  status: number;
  image: any;
  type: string;
  credit_balance?: string;
  employee_id?: any;
  nid?: any;
  designation?: any;
  employee_status?: any;
  company_name?: any;
  created_at?: string;
  updated_at?: string;
};

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    birth_date: "",
    gender: "",
    image: "",
    type: "",
  });
  const [data, setData] = useState({
    totalOrders: 0,
    confirmedOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    cancelOrders: 0,
    totalShipments: 0,
    totalDeliveries: 0,
    customerAddresses: [],
  });
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

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
    } else {
      authService.getUser().then((userData) => {
        setUser(userData);
        console.log("userData", userData);

        setLoading(false);
      });
    }
  }, [router, searchParams]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const profileResponse = await axios.get(
          `${ApiBaseUrl.baseUrl}v1/user/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProfile(profileResponse.data.profile as profileType);
        setUser(profileResponse.data.profile); // Also update user state

        console.log("profileResponse", profileResponse.data.profile);

        const historyResponse = await axios.get(
          `${ApiBaseUrl.baseUrl}user/profile/history`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const profileData = historyResponse.data;
        setData({
          totalOrders: profileData.totalorder,
          confirmedOrders: profileData.conformitem,
          pendingOrders: profileData.pending,
          deliveredOrders: profileData.deliveryitem,
          cancelOrders: profileData.cancelitem,
          totalShipments: profileData.shipeditem,
          totalDeliveries: profileData.deliveryitem,
          customerAddresses: profileData.customeraddress,
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) return <LoadingFallback />;

  const infoList = [
    {
      title: data.totalOrders,
      subtitle: "All Orders",
      color: "#1e3a8a",
      link: "/orders",
    },
    {
      title: data.pendingOrders,
      subtitle: "Pending Orders",
      color: "#f59e0b",
      link: "/pending-orders",
    },
    {
      title: data.deliveredOrders,
      subtitle: "Delivered Orders",
      color: "#15803d",
      link: "/delivered-orders",
    },
    {
      title: data.cancelOrders,
      subtitle: "Cancelled Orders",
      color: "#dc2626",
      link: "/cancel-orders",
    },
  ];

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Fragment>
        <DashboardPageHeader
          title="My Profile"
          iconName="user_filled"
          button={
            <FlexBox style={{ gap: "1rem" }}>
              <EditProfileButton />
              {/* <Link href="/change-password">Change Password</Link> */}
            </FlexBox>
          }
        />

        <Grid container spacing={4} mb="2rem">
          {/* Profile Card */}
          <Grid item md={6} xs={12}>
            {profile?.type === "Regular" ? (
              <Card
                p="2rem"
                borderRadius="16px"
                style={{
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
                  height: "100%",
                  background: "linear-gradient(145deg, #ffffff, #f5f7fa)",
                  border: "1px solid rgba(230, 230, 230, 0.5)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <FlexBox
                  alignItems="center"
                  mb="1.5rem"
                  style={{ gap: "1.5rem" }}
                >
                  {/* Conditional rendering for Avatar or FontAwesome icon */}
                  {profile?.image ? (
                    <Avatar
                      size={100}
                      src={`${ApiBaseUrl.ImgUrl}${profile.image}`}
                      style={{
                        border: "3px solid #E94560",
                        boxShadow: "0 4px 15px rgba(233, 69, 96, 0.2)",
                        width: "90px",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "90px",

                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #f5f7fa, #e4e8f0)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 15px rgba(107, 114, 128, 0.2)",
                        border: "3px solid #6b7280",
                      }}
                    >
                      {profile?.gender === "male" ? (
                        <FontAwesomeIcon
                          icon={faUser}
                          size="3x"
                          color="#1e3a8a"
                        />
                      ) : profile?.gender === "female" ? (
                        <FontAwesomeIcon
                          icon={faFemale}
                          size="3x"
                          color="#E94560"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faUser}
                          size="3x"
                          color="#6b7280"
                        />
                      )}
                    </div>
                  )}
                  <div>
                    <H5
                      style={{
                        fontSize: "1.5rem",
                        margin: 0,
                        background: "linear-gradient(90deg, #1e3a8a, #E94560)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: "700",
                      }}
                    >
                      {profile?.name || "No Name"}
                    </H5>

                    {/* Birth Date */}
                    <p
                      style={{
                        margin: "0.5rem 0",
                        color: "#6b7280",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faCalendar}
                        size="sm"
                        color="#6b7280"
                      />
                      <strong>Birthday:</strong>
                      {profile?.birth_date
                        ? new Date(profile.birth_date)
                            .toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                            .replace(/(\d{2} \w{3}) (\d{4})/, "$1, $2") // Add comma after month
                        : "N/A"}
                    </p>

                    {/* Gender */}
                    <p
                      style={{
                        margin: "0.5rem 0",
                        color: "#6b7280",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      {profile?.gender === "male" ? (
                        <FontAwesomeIcon
                          icon={faMars}
                          size="sm"
                          color="#1e3a8a"
                        />
                      ) : profile?.gender === "female" ? (
                        <FontAwesomeIcon
                          icon={faVenus}
                          size="sm"
                          color="#E94560"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faGenderless}
                          size="sm"
                          color="#6b7280"
                        />
                      )}
                      <strong>Gender:</strong>{" "}
                      {profile?.gender === "male"
                        ? "Male"
                        : profile?.gender === "female"
                        ? "Female"
                        : "N/A"}
                    </p>
                  </div>
                </FlexBox>
              </Card>
            ) : (
              <CorporateCard profile={profile} />
            )}
          </Grid>

          {/* Contact Info Card */}
          <Grid item md={6} xs={12}>
            <Card
              p="2rem"
              borderRadius="16px"
              style={{
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
                height: "100%",
                background: "linear-gradient(145deg, #ffffff, #f5f7fa)",
                border: "1px solid rgba(230, 230, 230, 0.5)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h5"
                mb="1.5rem"
                fontWeight={"bold"}
                style={{
                  background: "linear-gradient(90deg, #1e3a8a, #E94560)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "1.5rem",
                }}
              >
                Contact Info
              </Typography>
              <FlexBox
                alignItems="center"
                style={{
                  gap: "0.75rem",
                  marginBottom: "1.5rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  background: "rgba(107, 114, 128, 0.05)",
                  transition: "transform 0.2s ease",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    size="lg"
                    color="#ffffff"
                  />
                </div>
                <a
                  href={`mailto:${profile?.email}`}
                  style={{
                    color: "#4b5563",
                    textDecoration: "none",
                    fontWeight: "500",
                    fontSize: "1rem",
                  }}
                >
                  <Typography color="#4b5563">{profile?.email}</Typography>
                </a>
              </FlexBox>

              <FlexBox
                alignItems="center"
                style={{
                  gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  background: "rgba(107, 114, 128, 0.05)",
                  transition: "transform 0.2s ease",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #E94560, #f87171)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FontAwesomeIcon icon={faPhone} size="lg" color="#ffffff" />
                </div>
                <a
                  href={`tel:${profile?.phone}`}
                  style={{
                    color: "#4b5563",
                    textDecoration: "none",
                    fontWeight: "500",
                    fontSize: "1rem",
                  }}
                >
                  <Typography color="#4b5563">{profile?.phone}</Typography>
                </a>
              </FlexBox>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} style={{ marginTop: "1rem" }}>
          {infoList.map((item) => (
            <Grid item md={3} sm={6} xs={12} key={item.subtitle}>
              <Link href={item.link}>
                <Card
                  p="1.5rem"
                  textAlign="center"
                  borderRadius="12px"
                  style={{
                    backgroundColor: `${item.color}10`,
                    cursor: "pointer",
                    border: `1px solid ${item.color}30`,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 8px 20px rgba(0, 0, 0, 0.08)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = "none")
                  }
                >
                  <H3 color={item.color} fontWeight="700" mb="0.5rem">
                    {item.title}
                  </H3>
                  <Small color="#374151" fontSize={"14px"}>
                    {item.subtitle}
                  </Small>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Fragment>
    </Suspense>
  );
}
