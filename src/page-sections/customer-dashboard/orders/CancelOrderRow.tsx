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

"use client";
import Link from "next/link";
import { format } from "date-fns";
import Box from "@component/Box";
import { Chip } from "@component/Chip";
import Hidden from "@component/hidden";
import TableRow from "@component/TableRow";
import { IconButton } from "@component/buttons";
import Typography, { H5, Small } from "@component/Typography";
import Icon from "@component/icon/Icon";
import { currency } from "@utils/utils";
import { useEffect } from "react";


// =================================================
type OrderRowProps = { order: any };
// =================================================

export default function CancelOrderRow({ order }: OrderRowProps) {
  // Function to determine the background color based on order status

  const getColor = (status: string) => {
    switch (status) {
      case "Order Pending":
        return "#FFC107"; // Yellow for Pending
      case "Order Confirmed":
        return "#2196F3"; // Blue for Processing
      case "Order Delivered":
        return "#4CAF51"; // Green for Delivered
      case "Order Cancelled":
        return "#F44336"; // Red for Cancelled
      default:
        return "#9E9E9E"; // Grey for unknown status
    }
  };

  return (
    <Link href={`/cancel-orders/${order.invoice}`}>
      <TableRow my="1rem" padding="6px 18px">
        <H5 m="6px" textAlign="left">
          {order.invoice}
        </H5>

        {/* <Box m="6px">
          <Chip p="0.25rem 1rem" bg={getColor(order.status)}>
            <Small color="white">{order.status}</Small>
          </Chip>
        </Box> */}

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

