
// import { Fragment } from "react";
// import { redirect } from "next/navigation"; // For redirecting to login page
// import Cookies from "js-cookie"; // To access cookies for token verification
// // API FUNCTIONS
// import api from "@utils/__api__/address";
// // GLOBAL CUSTOM COMPONENTS
// import DashboardPageHeader from "@component/layout/DashboardPageHeader";
// // PAGE SECTION COMPONENTS
// import {
//   AddressItem,
//   AddNewAddress,
//   AddressPagination
// } from "@sections/customer-dashboard/address";

// export default async function AddressList() {
//   // Check if the user is authenticated by looking for a valid token in cookies
//   // const token = Cookies.get("token");
//   // console.log(token);
  

//   // // If no token is found, redirect the user to the login page
//   // if (!token) {
//   //   redirect("/login");
//   // }

//   // Fetch the address list only if the user is authenticated
//   const addressList = await api.getAddressList();

//   return (
//     <Fragment>
//       <DashboardPageHeader title="My Addresses" iconName="pin_filled" button={<AddNewAddress />} />

//       {/* Map through the address list and render each address */}
//       {addressList.map((item) => (
//         <AddressItem item={item} key={item.id} />
//       ))}

//       {/* Uncomment when pagination logic is needed */}
//       {/* <AddressPagination addressList={addressList} /> */}
//     </Fragment>
//   );
// }

"use client";

import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // To check cookies for token verification
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import { AddNewAddress, AddressItem } from "@sections/customer-dashboard/address"; // Components for address listing
import api from "@utils/__api__/address"; // API for fetching address list

export default function AddressList() {
  const router = useRouter();
  const [addressList, setAddressList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated (e.g., check token in cookies)
  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      // Redirect to login if no token is found
      router.push("/login");
    } else {
      // If token is available, fetch the address list
      fetchAddressList(token);
    }
  }, [router]);

  const fetchAddressList = async (token: string) => {
    try {
      // Fetch the address list from the API
      const addressListResponse = await api.getAddressList(token); // Make sure your API accepts the token and verifies it
      setAddressList(addressListResponse);
    } catch (error) {
      console.error("Failed to fetch address list:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Fragment>
      <DashboardPageHeader title="My Addresses" iconName="pin_filled" button={<AddNewAddress />} />

      {/* Render each address */}
      {addressList.length > 0 ? (
        addressList.map((item) => (
          <AddressItem item={item} key={item.id} />
        ))
      ) : (
        <div>No addresses found</div>
      )}
    </Fragment>
  );
}

