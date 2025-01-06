

"use client";

import React, { Fragment, useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import TableRow from "@component/TableRow";

// GLOBAL CUSTOM COMPONENTS
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

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Fallback component while waiting for search params
function LoadingFallback() {
  return (
    <LoaderWrapper>
      <Vortex />
    </LoaderWrapper>
  );
}

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [data, setData] = useState({
    totalOrders: 0,
    confirmedOrders: 0,
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
        setLoading(false);
      });
    }
  }, [router, searchParams]);

  // Fetch profile and profile history data from API
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch profile data (name, email, phone)
        const profileResponse = await axios.get(`${ApiBaseUrl.baseUrl}user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(profileResponse.data.profile); // Assuming the response has { profile: { name, email, phone } }

        // Fetch profile history (orders, deliveries)
        const historyResponse = await axios.get(`${ApiBaseUrl.baseUrl}user/profile/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const profileData = historyResponse.data;
        setData({
          totalOrders: profileData.totalorder,
          confirmedOrders: profileData.conformitem,
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

  if (loading)
    return (
      <LoaderWrapper>
        <Vortex />
      </LoaderWrapper>
    );

    const infoList = [
      { title: data.totalOrders, subtitle: "All Orders", link: "/orders" },
      { title: data.confirmedOrders, subtitle: "All Confirm Orders", link: "#" },
      { title: data.totalShipments, subtitle: "Total Shipment", link: "#" },
      { title: data.totalDeliveries, subtitle: "Total Delivery", link: "#" },
    ];

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Fragment>
        <DashboardPageHeader
          title="My Profile"
          iconName="user_filled"
          button={<EditProfileButton />}
        />

        <Box mb="30px">
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <FlexBox
                as={Card}
                p="14px 32px"
                height="100%"
                borderRadius={8}
                alignItems="center"
              >
                <Avatar src={user?.image} size={64} />

                <Box ml="12px" flex="1 1 0">
                  <FlexBox
                    flexWrap="wrap"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <div>
                      <H5 my="0px">{profile?.name}</H5>
                    </div>
                  </FlexBox>
                </Box>
              </FlexBox>
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Grid container spacing={4}>
                {infoList.map((item) => (
                  <Grid item lg={3} sm={6} xs={6} key={item.subtitle}>
                    {item.link ? (
        <Link href={item.link} passHref>
          <FlexBox
            as={Card}
            height="100%"
            p="1rem 1.25rem"
            borderRadius={8}
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            style={{ cursor: "pointer" }}
          >
            <H3 color="primary.main" my="0px" fontWeight="600">
              {item?.title}
            </H3>

            <Small color="text.muted" textAlign="center">
              {item?.subtitle}
            </Small>
          </FlexBox>
        </Link>
      ) : (
        <div>
          <FlexBox
            as={Card}
            height="100%"
            p="1rem 1.25rem"
            borderRadius={8}
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
          >
            <H3 color="primary.main" my="0px" fontWeight="600">
              {item?.title}
            </H3>

            <Small color="text.muted" textAlign="center">
              {item?.subtitle}
            </Small>
          </FlexBox>
        </div>
      )}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <TableRow p="0.75rem 1.5rem">
          <FlexBox flexDirection="column" p="0.5rem">
            <Small color="text.muted" mb="4px">
              Email
            </Small>
            <span>{profile?.email}</span>
          </FlexBox>

          <FlexBox flexDirection="column" p="0.5rem">
            <Small color="text.muted" mb="4px" textAlign="left">
              Phone
            </Small>
            <span>{profile?.phone}</span>
          </FlexBox>
        </TableRow>
      </Fragment>
    </Suspense>
  );
}


