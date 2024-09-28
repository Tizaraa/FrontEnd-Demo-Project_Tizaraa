"use client";
import { Fragment, useEffect, useState } from "react"; // Ensure Fragment is imported from react
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import api from "@utils/__api__/users"; // Ensure you have this utility
import authService from "services/authService"; // Import the authService
import { Suspense } from "react";

// GLOBAL CUSTOM COMPONENTS
import Box from "@component/Box";
import Card from "@component/Card";
import Avatar from "@component/avatar";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import TableRow from "@component/TableRow";
import Typography, { H3, H5, Small } from "@component/Typography";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import { EditProfileButton } from "@sections/customer-dashboard/profile";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // Loading state
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

  if (loading) return <div>Loading...</div>;

  const infoList = [
    { title: "16", subtitle: "All Orders" },
    { title: "02", subtitle: "Awaiting Payments" },
    { title: "00", subtitle: "Awaiting Shipment" },
    { title: "01", subtitle: "Awaiting Delivery" },
  ];

  return (
  <Suspense>
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
                    <H5 my="0px">{`${user?.name}`}</H5>

                    <FlexBox alignItems="center">
                      <Typography fontSize="14px" color="text.hint">
                        Balance:
                      </Typography>

                      <Typography ml="4px" fontSize="14px" color="primary.main">
                        $500
                      </Typography>
                    </FlexBox>
                  </div>

                  <Typography
                    fontSize="14px"
                    color="text.hint"
                    letterSpacing="0.2em"
                  >
                    SILVER USER
                  </Typography>
                </FlexBox>
              </Box>
            </FlexBox>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Grid container spacing={4}>
              {infoList.map((item) => (
                <Grid item lg={3} sm={6} xs={6} key={item.subtitle}>
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
                      {item.title}
                    </H3>

                    <Small color="text.muted" textAlign="center">
                      {item.subtitle}
                    </Small>
                  </FlexBox>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <TableRow p="0.75rem 1.5rem">
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px">
            First Name
          </Small>
          <span>{user?.name?.firstName}</span>
        </FlexBox>

        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px">
            Last Name
          </Small>
          <span>{user?.name?.lastName}</span>
        </FlexBox>

        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px">
            Email
          </Small>
          <span>{user?.email}</span>
        </FlexBox>

        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Phone
          </Small>
          <span>{user?.phone}</span>
        </FlexBox>
      </TableRow>
    </Fragment>
  </Suspense>
  );
}
