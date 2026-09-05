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

// export default function ReturnOrderRow({ order }: OrderRowProps) {
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
//     <Link href={`/return-orders/${order.id}`}>
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
import Hidden from "@component/hidden";
import { IconButton } from "@component/buttons";
import Typography, { H5 } from "@component/Typography";
import Icon from "@component/icon/Icon";
import { currency } from "@utils/utils";
import { buildStatusBuckets } from "./orderRowStatus";

// =================================================
type OrderRowProps = { order: any };
// =================================================

// Reusable styled components
// The arrow sits outside the text column so it stays centred against the whole
// card, not just the first line, once the breakdown footer is present.
const TableRow = styled.div`
 display: flex;
 align-items: center;
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

const RowContent = styled.div`
 display: flex;
 flex-direction: column;
 flex: 1 1 auto;
 min-width: 0;
`;

const MainLine = styled.div`
 display: flex;
 align-items: center;
 justify-content: space-between;
`;

// Footer line: how the order's items split, when they are not all in one state.
const BreakdownLine = styled.div`
 display: flex;
 align-items: center;
 flex-wrap: wrap;
 gap: 8px;
 margin-top: 8px;
`;

const Pill = styled.span`
 display: inline-block;
 padding: 2px 10px;
 border-radius: 100px;
 background-color: #eef1f5;
 color: #5b6472;
 font-size: 11px;
 font-weight: 600;
 white-space: nowrap;
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

export default function ReturnOrderRow({ order }: OrderRowProps) {
 const buckets = buildStatusBuckets(order);
 const originalTotal =
  typeof order.original_total === "number" ? order.original_total : order.amount;
 const returnedTotal = originalTotal - order.amount;

 return (
  <Link href={`/return-orders/${order.id}`}>
   <TableRow>
    <RowContent>
     <MainLine>
      <H5 m="6px" textAlign="left" color="rgb(233, 69, 96)" flex="1 1 0">
       {order.invoice}
      </H5>

      <Typography
       className="flex-grow pre"
       m="6px"
       textAlign="left"
       color="gray.700"
       fontSize="14px"
       flex="1 1 0"
      >
       {format(new Date(order.date), "MMM dd, yyyy")}
      </Typography>

      <Typography
       m="6px"
       textAlign="left"
       color="gray.700"
       fontSize="14px"
       flex="1 1 0"
      >
       {order.item_count}
      </Typography>

      <Typography m="6px" textAlign="left" flex="1 1 0">
       <span style={{ fontSize: "13px", color: "#7A8A99" }}>
        Original Price: {currency(originalTotal)}
       </span>
       <br />
       <span style={{ fontWeight: 600, color: "rgb(51, 51, 51)" }}>
        Returned: {currency(returnedTotal)}
       </span>
      </Typography>
     </MainLine>

     {buckets.length > 0 && (
      <BreakdownLine>
       {buckets.map((bucket) => (
        <Pill key={bucket.label}>
         {bucket.count} {bucket.label}
        </Pill>
       ))}
      </BreakdownLine>
     )}
    </RowContent>

    <Hidden flex="0 0 auto !important" down={769}>
     <Typography textAlign="center" color="text.muted">
      <StyledIconButton size="small">
       <Icon variant="small" defaultcolor="currentColor">
        arrow-right
       </Icon>
      </StyledIconButton>
     </Typography>
    </Hidden>
   </TableRow>
  </Link>
 );
}
