"use client";
import Link from "next/link";
import { format } from "date-fns";

import Box from "@component/Box";
import { Chip } from "@component/Chip";
import Hidden from "@component/hidden";
import TableRow from "@component/TableRow";
import { IconButton } from "@component/buttons";
import Typography, { H5, Small } from "@component/Typography";
import { currency } from "@utils/utils";
import Icon from "@component/icon/Icon";

// =================================================
type OrderRowProps = { order: any }; // Use appropriate type for your order
// =================================================

export default function OrderRow({ order }: OrderRowProps) {
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
    <Link href={`/orders/${order.invoice}`}>
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
          {format(new Date(order.date), "MMM dd, yyyy")}
        </Typography>

        <Typography m="6px" textAlign="left">
          {currency(order.amount)}
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
  );
}
