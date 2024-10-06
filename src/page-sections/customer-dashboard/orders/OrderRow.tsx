"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";

import Box from "@component/Box";
import { Chip } from "@component/Chip";
import Hidden from "@component/hidden";
import Icon from "@component/icon/Icon";
import TableRow from "@component/TableRow";
import { IconButton } from "@component/buttons";
import Typography, { H5, Small } from "@component/Typography";
import { currency } from "@utils/utils";
import Order from "@models/order.model";

// =================================================
type OrderRowProps = { order: Order }; // Keep this for rendering a single order
// =================================================

export default function OrderRow() { // No need to pass a single order here

  let authtoken = localStorage.getItem('token');
  const [orders, setOrders] = useState<Order[]>([]); // State for orders

  const fetchOrders = async () => {
    try {
      const response = await fetch("https://tizaraa.com/api/user/order", {
        headers: {
          Authorization: `Bearer ${authtoken}`
        }
      });

      const data = await response.json();
      console.log("Fetched Data:", data); // Log the response to check the structure

      // Set orders state assuming the structure is data.orders
      if (Array.isArray(data.orders)) {
        setOrders(data.orders); // Ensure you're setting the array correctly
      } else {
        console.error("Orders not found in the expected format");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []); // Fetch orders when component mounts

  const getColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "secondary";
      case "Processing":
        return "secondary";
      case "Delivered":
        return "success";
      case "Cancelled":
        return "error";
      default:
        return "";
    }
  };

  return (
    <>
      {orders.map(order => (
        <Link key={order.invoice} href={`/orders/${order.invoice}`}>
          <TableRow my="1rem" padding="6px 18px">
            <H5 m="6px" textAlign="left">
              #{order.invoice}
            </H5>

            <Box m="6px">
              <Chip p="0.25rem 1rem" bg={`${getColor(order.status)}.light`}>
                <Small color={`${getColor(order.status)}.main`}>{order.status}</Small>
              </Chip>
            </Box>

            <Typography className="flex-grow pre" m="6px" textAlign="left">
              {format(new Date(order.date), "MMM dd, yyyy")} {/* Adjusted to use 'date' */}
            </Typography>

            <Typography m="6px" textAlign="left">
              {currency(order.amount)} {/* Adjusted to use 'amount' */}
            </Typography>

            <Hidden flex="0 0 0 !important" down={769}>
              <Typography textAlign="center" color="text.muted">
                <IconButton>
                  <Icon variant="small" defaultcolor="currentColor">
                    arrow-right
                  </Icon>
                </IconButton>
              </Typography>
            </Hidden>
          </TableRow>
        </Link>
      ))}
    </>
  );
}
