// "use client";
// import Link from "next/link";
// import { format } from "date-fns";

// import Box from "@component/Box";
// import { Chip } from "@component/Chip";
// import Hidden from "@component/hidden";
// import TableRow from "@component/TableRow";
// import { IconButton } from "@component/buttons";
// import Typography, { H5, Small } from "@component/Typography";
// import { currency } from "@utils/utils";
// import Icon from "@component/icon/Icon";

// // =================================================
// type OrderRowProps = { order: any }; // Use appropriate type for your order
// // =================================================

// export default function OrderRow({ order }: OrderRowProps) {
//   const getColor = (status: string) => {
//     switch (status) {
//       case "Order Pending":
//         return "secondary";
//       case "Order Confirmed":
//         return "#FFFF00";
//       case "Order Delivered":
//         return "success";
//       case "Order Cancelled":
//         return "error";
//       default:
//         return "";
//     }
//   };

//   return (
//     <Link href={`/orders/${order.invoice}`}>
//       <TableRow my="1rem" padding="6px 18px">
//         <H5 m="6px" textAlign="left">
//           #{order.invoice}
//         </H5>

//         <Box m="6px">
//   <Chip p="0.25rem 1rem" bg={`${getColor(order.status)}.light`}>
//     <Small color={`${getColor(order.status)}.main`}>{order.status}</Small>
//   </Chip>
// </Box>

//         <Typography className="flex-grow pre" m="6px" textAlign="left">
//           {format(new Date(order.date), "MMM dd, yyyy")}
//         </Typography>

//         <Typography m="6px" textAlign="left">
//           {currency(order.amount)}
//         </Typography>

//         <Hidden flex="0 0 0 !important" down={769}>
//           <Typography textAlign="center" color="text.muted">
//             <IconButton>
//               <Icon variant="small" defaultcolor="currentColor">
//                 arrow-right
//               </Icon>
//             </IconButton>
//           </Typography>
//         </Hidden>
//       </TableRow>
//     </Link>
//   );
// }

// "use client";
// import Link from "next/link";
// import { format } from "date-fns";
// import Box from "@component/Box";
// import { Chip } from "@component/Chip";
// import Hidden from "@component/hidden";
// import TableRow from "@component/TableRow";
// import { IconButton } from "@component/buttons";
// import Typography, { H5, Small } from "@component/Typography";
// import Icon from "@component/icon/Icon";
// import { currency } from "@utils/utils";
// import { useEffect } from "react";

// // =================================================
// type OrderRowProps = { order: any };
// // =================================================

// export default function OrderRow({ order }: OrderRowProps) {
//   // Function to determine the background color based on order status

//   const getColor = (status: string) => {
//     switch (status) {
//       case "Order Pending":
//         return "#FFC107"; // Yellow for Pending
//       case "Order Confirmed":
//         return "#2196F3"; // Blue for Processing
//       case "Order Delivered":
//         return "#4CAF51"; // Green for Delivered
//       case "Order Cancelled":
//         return "#F44336"; // Red for Cancelled
//       default:
//         return "#9E9E9E"; // Grey for unknown status
//     }
//   };

//   return (
//     <Link href={`/orders/${order.invoice}`}>
//       <TableRow my="1rem" padding="6px 18px">
//         <H5 m="6px" textAlign="left">
//           {order.invoice}
//         </H5>

//         {/* <Box m="6px">
//           <Chip p="0.25rem 1rem" bg={getColor(order.status)}>
//             <Small color="white">{order.status}</Small>
//           </Chip>
//         </Box> */}

//         <Typography className="flex-grow pre" m="6px" textAlign="left">
//           {format(new Date(order.date), "MMM dd, yyyy")}
//         </Typography>

//         <Typography m="6px" textAlign="left">
//           {currency(order.amount)}
//         </Typography>

//         <Hidden flex="0 0 0 !important" down={769}>
//           <Typography textAlign="center" color="text.muted">
//             <IconButton>
//               <Icon variant="small" defaultcolor="currentColor">
//                 arrow-right
//               </Icon>
//             </IconButton>
//           </Typography>
//         </Hidden>
//       </TableRow>
//     </Link>
//   );
// }

"use client";

import Link from "next/link";
import { format } from "date-fns";
import styled from "@emotion/styled";
import Box from "@component/Box";
import { Chip } from "@component/Chip";
import Hidden from "@component/hidden";
import { IconButton } from "@component/buttons";
import Typography, { H5, Small } from "@component/Typography";
import Icon from "@component/icon/Icon";
import { currency } from "@utils/utils";

// =================================================
type OrderRowProps = { order: any };
// =================================================

// ✅ Custom styled TableRow with hover effect
const TableRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  margin: 0.5rem 0;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

const StyledIconButton = styled(IconButton)`
  background-color: rgb(233, 69, 96);
  color: white;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgb(200, 50, 80);
    transform: scale(1.1);
  }
`;

export default function OrderRow({ order }: OrderRowProps) {
  const getColor = (status: string) => {
    switch (status) {
      case "Order Pending":
        return "rgb(255, 193, 7)";
      case "Order Confirmed":
        return "rgb(33, 150, 243)";
      case "Order Delivered":
        return "rgb(76, 175, 80)";
      case "Order Cancelled":
        return "rgb(244, 67, 54)";
      default:
        return "rgb(158, 158, 158)";
    }
  };

  return (
    <Link href={`/orders/${order.invoice}`}>
      <TableRow>
        {/* Invoice Number */}
        <H5 m="6px" textAlign="left" color="rgb(233, 69, 96)">
          {order.invoice}
        </H5>

        {/* Order Date */}
        <Typography
          className="flex-grow pre"
          m="6px"
          textAlign="left"
          color="gray.700"
          fontSize="14px"
        >
          {format(new Date(order.date), "MMM dd, yyyy")}
        </Typography>

        {/* Order Amount */}
        <Typography
          m="6px"
          textAlign="left"
          fontWeight="600"
          color="rgb(51, 51, 51)"
        >
          {currency(order.amount)}
        </Typography>

        {/* Action Icon */}
        <Hidden flex="0 0 0 !important" down={769}>
          <Typography textAlign="center" color="text.muted">
            <Typography textAlign="center" color="text.muted">
              <StyledIconButton size="small">
                <Icon variant="small" defaultcolor="currentColor">
                  arrow-right
                </Icon>
              </StyledIconButton>
            </Typography>
          </Typography>
        </Hidden>
      </TableRow>
    </Link>
  );
}
