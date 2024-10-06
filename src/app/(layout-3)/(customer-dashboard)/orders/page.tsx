"use client";
import { Fragment, useEffect, useState } from "react";
import api from "@utils/__api__/orders";
import Hidden from "@component/hidden";
import TableRow from "@component/TableRow";
import { H5 } from "@component/Typography";
import { useRouter } from "next/navigation";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import { OrderRow, OrdersPagination } from "@sections/customer-dashboard/orders";
import Cookies from "js-cookie";

export default function OrderList() {
  const router = useRouter();
  const [orderList, setOrderList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
    } else {
      fetchOrderList(token);
    }

    const success = localStorage.getItem('orderSuccess');
    if (success) {
      setOrderSuccess(true);
      localStorage.removeItem('orderSuccess');
    }
  }, [router]);

  useEffect(() => {
    if (orderSuccess) {
      alert("Order placed successfully!");
      setOrderSuccess(false); // Reset after showing the alert
    }
  }, [orderSuccess]);

  const fetchOrderList = async (token: string) => {
    try {
      const orderListResponse = await api.getOrders();
      setOrderList(orderListResponse);
    } catch (error) {
      console.error("Failed to fetch order list:", error);
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
        // <OrderRow order={item} key={item.id} />
        <OrderRow key={item.invoice}></OrderRow>
      ))}

      <OrdersPagination orderList={orderList} />
    </Fragment>
  );
}
