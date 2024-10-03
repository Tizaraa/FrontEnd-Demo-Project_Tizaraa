"use client";
import { Fragment, useEffect, useState } from "react";
// API FUNCTIONS
import api from "@utils/__api__/orders";
// GLOBAL CUSTOM COMPONENTS
import Hidden from "@component/hidden";
import TableRow from "@component/TableRow";
import { H5 } from "@component/Typography";
import { useRouter } from "next/navigation";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
// PAGE SECTION COMPONENTS
import { OrderRow, OrdersPagination } from "@sections/customer-dashboard/orders";
import Cookies from "js-cookie";

export default function OrderList() {
  //const orderList = await api.getOrders();
  const router = useRouter();
  const [orderList, setOrderList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      // Redirect to login if no token is found
      router.push("/login");
    } else {
      // If token is available, fetch the address list
      fetchOrderList(token);
    }
  }, [router]);

  const fetchOrderList = async (token: string) => {
    try {
      // Fetch the address list from the API
      const orderListResponse = await api.getOrders(token); // Make sure your API accepts the token and verifies it
      setOrderList(orderListResponse);
    } catch (error) {
      console.error("Failed to fetch address list:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Fragment>
      <DashboardPageHeader title="My Orders" iconName="bag_filled" />

      <Hidden down={769}>
        <TableRow boxShadow="none" padding="0px 18px" backgroundColor="transparent">
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Order #
          </H5>

          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Status
          </H5>

          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Date purchased
          </H5>

          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Total
          </H5>

          <H5 flex="0 0 0 !important" color="text.muted" px="22px" my="0px" />
        </TableRow>
      </Hidden>

      {orderList.map((item) => (
        <OrderRow order={item} key={item.id} />
      ))}

      <OrdersPagination orderList={orderList} />
    </Fragment>
  );
}
