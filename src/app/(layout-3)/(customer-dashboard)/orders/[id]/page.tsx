"use client"
import { Fragment, useEffect, useState } from "react";
import { format } from "date-fns";
// UTILS
import { currency } from "@utils/utils";
// GLOBAL CUSTOM COMPONENTS
import Box from "@component/Box";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import TableRow from "@component/TableRow";
import Typography, { H5, H6, Paragraph } from "@component/Typography";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
// PAGE SECTION COMPONENTS
import { OrderStatus, WriteReview, OrderListButton } from "@sections/customer-dashboard/orders";
// CUSTOM DATA MODEL
import { IDParams } from "interfaces";

export default function OrderDetails({ params }: IDParams) {
  const [order, setOrder] = useState<any>(null); // State to hold the order details

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const authtoken = localStorage.getItem('token'); // Retrieve the auth token
      try {
        const response = await fetch(`https://tizaraa.com/api/user/order`, {
          headers: {
            Authorization: `Bearer ${authtoken}`,
          },
        });
        const data = await response.json();
        
        // Find the specific order by invoice
        const foundOrder = data.orders.find((o: any) => o.invoice === String(params.id));
        if (foundOrder) {
          setOrder(foundOrder);
        } else {
          console.error("Order not found");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [params.id]); 

  if (!order) return <div>Loading...</div>; 

  return (
    <Fragment>
      <DashboardPageHeader
        title="Order Details"
        iconName="bag_filled"
        button={<OrderListButton />}
      />

      <OrderStatus />

      <Card p="0px" mb="30px" overflow="hidden" borderRadius={8}>
        <TableRow bg="gray.200" p="12px" boxShadow="none" borderRadius={0}>
          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
              Order ID:
            </Typography>

            <Typography fontSize="14px">#{order?.invoice}</Typography> {/* Changed to display invoice */}
          </FlexBox>

          {/* Additional details can go here */}
        </TableRow>

        {/* <Box py="0.5rem">
          {order?.items.map((item: any, ind: number) => (
            <WriteReview key={ind} item={item} />
          ))}
        </Box> */}
      </Card>

      {/* Additional sections can go here */}
    </Fragment>
  );
}
