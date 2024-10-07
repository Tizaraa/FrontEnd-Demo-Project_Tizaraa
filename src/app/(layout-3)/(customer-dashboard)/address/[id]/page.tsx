"use client"
import { Fragment } from "react";
// API FUNCTIONS
import api from "@utils/__api__/address";
// GLOBAL CUSTOM COMPONENTS
import { Card1 } from "@component/Card1";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
// PAGE SECTION COMPONENTS
import { BackToAddress, AddressForm } from "@sections/customer-dashboard/address";
// CUSTOM DATA MODEL
import { IDParams } from "interfaces";
import Cookies from "js-cookie";
import { NextPageContext } from "next";
import { useRouter } from "next/navigation";
import authService from "services/authService";

const AddressDetails = async ({ params }: IDParams) => {
  const router = useRouter();
  // Check if token is present in cookies (indicating that user is logged in)
  // const token = Cookies.get("token");
  const token = authService.getToken();

  // If token is not found, redirect to login page
  // if (!token) {
  //   router.push("/login");
  //   return null; // Return null or loading component while redirecting
  // }
  const address = await api.getAddress(String(params.id));

  return (
    <Fragment>
      <DashboardPageHeader iconName="pin_filled" title="Edit Address" button={<BackToAddress />} />

      <Card1 borderRadius={8}>
        <AddressForm address={address} />
      </Card1>
    </Fragment>
  );
};

export default AddressDetails;
