// "use client";

// import { Fragment, useEffect } from "react";
// import Box from "@component/Box";
// import Card from "@component/Card";
// import Avatar from "@component/avatar";
// import Icon from "@component/icon/Icon";
// import FlexBox from "@component/FlexBox";
// import Typography from "@component/Typography";
// import useWindowSize from "@hook/useWindowSize";
// import { format } from "date-fns";

// type Status =  "Pending" | "Confirmed" | "Processing" | "Shipped" | "Delivered";

// interface OrderStatusProps {
//   orderStatus: Status;
//   deliveredAt: string;
// }

// export default function OrderStatus({ orderStatus, deliveredAt }: OrderStatusProps) {
//   const width = useWindowSize();
//   const stepIconList = ["package-box", "truck-1", "delivery"];
//   const orderStatusList = ["Confirmed", "Shipped", "Delivered"];

//   const breakpoint = 350;
//   const statusIndex =
//   orderStatus === "Processing"
//     ? 0.5
//     : orderStatusList.indexOf(orderStatus);

//   // current status
//   useEffect(() => {
//     console.log("Current Order Status:", orderStatus);
//   }, [orderStatus]);

//   return (
//     <Card p="2rem 1.5rem" mb="30px" borderRadius={8}>
//       <FlexBox
//         my="2rem"
//         flexWrap="wrap"
//         alignItems="center"
//         justifyContent="space-between"
//         flexDirection={width < breakpoint ? "column" : "row"}
//       >
//         {stepIconList.map((item, ind) => (
//           <Fragment key={item}>
//             <Box position="relative">
//               <Avatar
//                 size={64}
//                 bg={ind <= statusIndex ? "primary.main" : "gray.300"}
//                 color={ind <= statusIndex ? "gray.white" : "primary.main"}
//               >
//                 <Icon size="32px" defaultcolor="currentColor">
//                   {item}
//                 </Icon>
//               </Avatar>

//               {ind < statusIndex && (
//                 <Box position="absolute" right="0" top="0">
//                   <Avatar size={22} bg="gray.200" color="success.main">
//                     <Icon size="12px" defaultcolor="currentColor">
//                       done
//                     </Icon>
//                   </Avatar>
//                 </Box>
//               )}
//             </Box>

//             {ind < stepIconList.length - 1 && (
//               <Box
//                 height={width < breakpoint ? 50 : 4}
//                 minWidth={width < breakpoint ? 4 : 50}
//                 flex={width < breakpoint ? "unset" : "1 1 0"}
//                 bg={ind < statusIndex ? "primary.main" : "gray.300"}
//               />
//             )}
//           </Fragment>
//         ))}
//       </FlexBox>

//       <FlexBox justifyContent={width < breakpoint ? "center" : "flex-end"}>
//         <Typography
//           p="0.5rem 1rem"
//           bg="primary.light"
//           textAlign="center"
//           borderRadius="300px"
//           color="primary.main"
//         >
//           Estimated Delivery Date: <b>{deliveredAt}</b>
//         </Typography>
//       </FlexBox>
//     </Card>
//   );
// }

// "use client";

// import { Fragment, useEffect } from "react";
// import Box from "@component/Box";
// import Card from "@component/Card";
// import Avatar from "@component/avatar";
// import Icon from "@component/icon/Icon";
// import FlexBox from "@component/FlexBox";
// import Typography from "@component/Typography";
// import useWindowSize from "@hook/useWindowSize";
// import { format } from "date-fns";

// type Status = "Pending" | "Confirmed" | "Processing" | "Shipped" | "Delivered" | "Return";

// interface OrderStatusProps {
//   orderStatus: Status;
//   deliveredAt: string;
// }

// export default function OrderStatus({ orderStatus, deliveredAt }: OrderStatusProps) {
//   const width = useWindowSize();
//   const stepIconList = ["package-box", "truck-1", "delivery"];
//   const orderStatusList = ["Confirmed", "Shipped", "Delivered"];

//   const breakpoint = 350;
//   const statusIndex =
//     orderStatus === "Processing"
//       ? 0.5
//       : orderStatusList.indexOf(orderStatus);

//   // Log the current status
//   useEffect(() => {
//     console.log("Current Order Status:", orderStatus);
//   }, [orderStatus]);

//   // Hide the order status part if the status is "Return"
//   if (orderStatus === "Return") {
//     return null; // Render nothing if the status is "Return"
//   }

//   return (
//     <Card p="2rem 1.5rem" mb="30px" borderRadius={8}>
//       <FlexBox
//         my="2rem"
//         flexWrap="wrap"
//         alignItems="center"
//         justifyContent="space-between"
//         flexDirection={width < breakpoint ? "column" : "row"}
//       >
//         {stepIconList.map((item, ind) => (
//           <Fragment key={item}>
//             <Box position="relative">
//               <Avatar
//                 size={64}
//                 bg={ind <= statusIndex ? "primary.main" : "gray.300"}
//                 color={ind <= statusIndex ? "gray.white" : "primary.main"}
//               >
//                 <Icon size="32px" defaultcolor="currentColor">
//                   {item}
//                 </Icon>
//               </Avatar>

//               {ind < statusIndex && (
//                 <Box position="absolute" right="0" top="0">
//                   <Avatar size={22} bg="gray.200" color="success.main">
//                     <Icon size="12px" defaultcolor="currentColor">
//                       done
//                     </Icon>
//                   </Avatar>
//                 </Box>
//               )}
//             </Box>

//             {ind < stepIconList.length - 1 && (
//               <Box
//                 height={width < breakpoint ? 50 : 4}
//                 minWidth={width < breakpoint ? 4 : 50}
//                 flex={width < breakpoint ? "unset" : "1 1 0"}
//                 bg={ind < statusIndex ? "primary.main" : "gray.300"}
//               />
//             )}
//           </Fragment>
//         ))}
//       </FlexBox>

//       <FlexBox justifyContent={width < breakpoint ? "center" : "flex-end"}>
//         <Typography
//           p="0.5rem 1rem"
//           bg="primary.light"
//           textAlign="center"
//           borderRadius="300px"
//           color="primary.main"
//         >
//           Estimated Delivery Date: <b>{deliveredAt}</b>
//         </Typography>
//       </FlexBox>
//     </Card>
//   );
// }

// "use client";

// import { Fragment, useEffect } from "react";
// import Box from "@component/Box";
// import Card from "@component/Card";
// import Avatar from "@component/avatar";
// import Icon from "@component/icon/Icon";
// import FlexBox from "@component/FlexBox";
// import Typography from "@component/Typography";
// import useWindowSize from "@hook/useWindowSize";

// interface OrderStatusProps {
//   orderStatus: string | null;
//   deliveredAt: string | null;
// }

// export default function OrderStatus({ orderStatus, deliveredAt }: OrderStatusProps) {
//   const width = useWindowSize();
//   const stepIconList = ["package-box", "truck-1", "delivery"];
//   const orderStatusList = ["Confirmed", "Shipped", "Delivered"];

//   const breakpoint = 350;

//   // Map string status to numeric value
//   const statusMap: { [key: string]: number } = {
//     "pending": 0,
//     "confirmed": 1,
//     "processing": 2,
//     "shipped": 3,
//     "delivered": 4,
//     "canceled": 5,
//     "return": 6,
//   };

//   // Convert string status to number
//   const numericStatus = orderStatus ? statusMap[orderStatus.toLowerCase()] ?? null : null;

//   // Determine the status index for the progress bar
//   const getStatusIndex = (status: number | null) => {
//     if (status === null || status === undefined) return -1;
//     switch (status) {
//       case 0: // Pending
//       case 1: // Confirmed
//         return -2; // No active steps
//       case 2: // Processing
//         return 0; // First active step
//       case 3: // Shipped
//         return 1; // Second step active
//       case 4: // Delivered
//         return 2; // Final step active
//       case 5: // Canceled
//       case 6: // Return
//         return -1; // No progress bar
//       default:
//         return -1;
//     }
//   };

//   const statusIndex = getStatusIndex(numericStatus);
//   const isPending = statusIndex === -2;

//   // Log the current status
//   useEffect(() => {
//     console.log("Current Order Status:", orderStatus, "Numeric Status:", numericStatus);
//   }, [orderStatus, numericStatus]);

//   // Hide the order status part if the status is "Canceled" or "Return"
//   if (statusIndex === -1) {
//     return null;
//   }

//   return (
//     <Card p="2rem 1.5rem" mb="30px" borderRadius={8}>
//       <FlexBox
//         my="2rem"
//         flexWrap="wrap"
//         alignItems="center"
//         justifyContent="space-between"
//         flexDirection={width < breakpoint ? "column" : "row"}
//       >
//         {stepIconList.map((item, ind) => (
//           <Fragment key={item}>
//             <Box position="relative">
//               <Avatar
//                 size={64}
//                 bg={ind <= statusIndex ? "primary.main" : "gray.300"}  // Active steps get a blue background
//                 color={ind <= statusIndex ? "gray.white" : "primary.main"}
//               >
//                 <Icon size="32px" defaultcolor="currentColor">
//                   {item}
//                 </Icon>
//               </Avatar>

//               {/* Display "done" icon if the step is completed */}
//               {ind < statusIndex && (
//                 <Box position="absolute" right="0" top="0">
//                   <Avatar size={22} bg="gray.200" color="success.main">
//                     <Icon size="12px" defaultcolor="currentColor">
//                       done
//                     </Icon>
//                   </Avatar>
//                 </Box>
//               )}
//             </Box>

//             {/* Render progress line between steps */}
//             {ind < stepIconList.length - 1 && (
//               <Box
//                 height={width < breakpoint ? 50 : 4}
//                 minWidth={width < breakpoint ? 4 : 50}
//                 flex={width < breakpoint ? "unset" : "1 1 0"}
//                 bg={ind < statusIndex ? "primary.main" : "gray.300"}
//               />
//             )}
//           </Fragment>
//         ))}
//       </FlexBox>

//       {deliveredAt && (
//         <FlexBox justifyContent={width < breakpoint ? "center" : "flex-end"}>
//           <Typography
//             p="0.5rem 1rem"
//             bg="primary.light"
//             textAlign="center"
//             borderRadius="300px"
//             color="primary.main"
//           >
//             Estimated Delivery Date: <b>{deliveredAt}</b>
//           </Typography>
//         </FlexBox>
//       )}
//     </Card>
//   );
// }

"use client";

import { Fragment, useEffect } from "react";
import Box from "@component/Box";
import Card from "@component/Card";
import Avatar from "@component/avatar";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import useWindowSize from "@hook/useWindowSize";

interface OrderStatusProps {
 orderStatus: string | null;
 deliveredAt: string | null;
 returnStatus?: string | null; // return_status from the order_returns record
 isCorporate?: boolean; // corporate shop order — collected at the counter, never shipped
}

export default function OrderStatus({
 orderStatus,
 deliveredAt,
 returnStatus,
 isCorporate = false,
}: OrderStatusProps) {
 const width = useWindowSize();
 const breakpoint = 350;

 // Return record status → step index
 // DB values: pending | approved | rejected | received | refunded
 const RETURN_RECORD_STEPS: { [key: string]: number } = {
  pending:  0,
  approved: 1,
  received: 2,
  refunded: 3,
 };

 const normalizedStatus = orderStatus?.toLowerCase() ?? "";
 const RETURN_FLOW_ORDER_STATUSES = ["return requested", "returned", "refunded", "return approved", "return received"];
 const isReturnFlow = RETURN_FLOW_ORDER_STATUSES.includes(normalizedStatus);

 // Use the return record status when available; if the order itself is "refunded" force final step
 const returnStepIndex = isReturnFlow
  ? (normalizedStatus === "refunded"
     ? 3
     : (returnStatus ? (RETURN_RECORD_STEPS[returnStatus.toLowerCase()] ?? 0) : 0))
  : -1;

 // Map string status to numeric value
 const statusMap: { [key: string]: number } = {
  pending: 0,
  confirmed: 1,
  processing: 2,
  shipped: 3,
  delivered: 4,
  canceled: 5,
  return: 6,
 };

 // Convert string status to number
 const numericStatus = orderStatus
  ? (statusMap[normalizedStatus] ?? null)
  : null;

 // Determine the status index for the progress bar
 const getStatusIndex = (status: number | null) => {
  if (status === null || status === undefined) return -1;

  // Corporate orders are collected at the shop counter — there is no shipping leg,
  // so the tracker runs packed -> delivered. The seller flow now skips "confirmed"
  // entirely (pending goes straight to processing), so "Mark as Packed" lights up
  // once the seller marks the order as processing, not on confirmation.
  if (isCorporate) {
   switch (status) {
    case 0: // Pending — order placed, seller has not started processing yet
     return -2; // No active steps
    case 1: // Confirmed — kept for any order that reached this before the flow changed
     return 0;
    case 2: // Processing — seller has marked it as processing / packing
     return 0;
    case 3: // Shipped — not part of the corporate flow, but treat as packed
     return 0;
    case 4: // Delivered
     return 2;
    case 5: // Canceled
    case 6: // Return
     return -1; // No progress bar
    default:
     return -1;
   }
  }

  switch (status) {
   case 0: // Pending
   case 1: // Confirmed
    return -2; // No active steps
   case 2: // Processing
    return 0; // First active step
   case 3: // Shipped
    return 1; // Second step active
   case 4: // Delivered
    return 2; // Final step active
   case 5: // Canceled
   case 6: // Return
    return -1; // No progress bar
   default:
    return -1;
  }
 };

 const statusIndex = getStatusIndex(numericStatus);

 const orderSteps = isCorporate
  ? [
     {
      icon: "bag",
      label: "Mark as Packed",
     },
     {
      icon: "package-box",
      label: "Packed",
     },
     {
      icon: "delivery",
      label: "Delivered",
     },
    ]
  : [
     {
      icon: "package-box",
      label: "Processing",
     },
     {
      icon: "truck-1",
      label: "Shipped",
     },
     {
      icon: "delivery",
      label: "Delivered",
     },
    ];

 // Log the current status
 useEffect(() => {
  console.log(
   "Current Order Status:",
   orderStatus,
   "Numeric Status:",
   numericStatus
  );
 }, [orderStatus, numericStatus]);

 // Return flow tracker
 if (isReturnFlow) {
  const returnSteps = ["Return Requested", "Return Approved", "Item Received", "Refunded"];
  const isRejected = returnStatus?.toLowerCase() === "rejected";
  const activeStep = isRejected ? 0 : returnStepIndex;

  return (
   <Box p="1rem">
    <Typography fontWeight="600" fontSize="14px" color="#e94560" mb="1rem">
     Return Status
    </Typography>
    <FlexBox alignItems="center" flexWrap="wrap" style={{ gap: "0" }}>
     {returnSteps.map((step, ind) => {
      const done = ind < activeStep;
      const current = ind === activeStep;
      const color = done || current ? "#e94560" : "#ccc";
      return (
       <Fragment key={step}>
        <FlexBox flexDirection="column" alignItems="center" style={{ minWidth: 80 }}>
         <Box
          width="32px"
          height="32px"
          borderRadius="50%"
          bg={done || current ? "#e94560" : "#eee"}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
         >
          <Typography fontSize="12px" color={done || current ? "white" : "#999"} fontWeight="700">
           {done ? "✓" : ind + 1}
          </Typography>
         </Box>
         <Typography fontSize="11px" color={color} textAlign="center" mt="6px" fontWeight={current ? "700" : "400"}>
          {step}
         </Typography>
        </FlexBox>
        {ind < returnSteps.length - 1 && (
         <Box
          flex="1"
          height="3px"
          bg={ind < activeStep ? "#e94560" : "#eee"}
          style={{ minWidth: 20, marginBottom: 22 }}
         />
        )}
       </Fragment>
      );
     })}
    </FlexBox>
    {isRejected && (
     <Box mt="12px" p="10px 14px" bg="#fee2e2" borderRadius="6px">
      <Typography fontSize="13px" color="#b91c1c" fontWeight="600">
       Your return request was rejected by the seller.
      </Typography>
     </Box>
    )}
   </Box>
  );
 }

 // Hide the order status part if the status is "Canceled" or unknown
 if (statusIndex === -1) {
  return null;
 }

 const getStepColor = (ind: number) => {
  if (ind <= statusIndex) {
   return { bg: "primary.main", color: "white" };
  }
  return { bg: "gray.300", color: "primary.main" };
 };

 const getStatusDescription = () => {
  if (isCorporate) {
   switch (numericStatus) {
    case 0:
     return "Your order is pending confirmation from the shop";
    case 1:
     return "Your order has been confirmed and will be packed soon";
    case 2:
    case 3:
     return "Your order is packed and ready to collect from the shop";
    case 4:
     return "Your order has been delivered successfully";
    default:
     return "Order status information";
   }
  }

  switch (numericStatus) {
   case 0:
    return "Your order is pending";
   case 1:
    return "Your order has been confirmed and will be processed soon";
   case 2:
    return "Your order is being processed and prepared for shipment";
   case 3:
    return "Your order has been shipped and is on the way";
   case 4:
    return "Your order has been delivered successfully";
   default:
    return "Order status information";
  }
 };

 return (
  <Card p="2rem 1.5rem" mb="30px" borderRadius={8}>
   <style jsx>{`
    @keyframes slideDown {
     0% {
      opacity: 0;
      transform: translateY(-10px);
     }
     100% {
      opacity: 1;
      transform: translateY(0);
     }
    }

    @keyframes pulse {
     0%,
     100% {
      transform: scale(1);
     }
     50% {
      transform: scale(1.05);
     }
    }

    .status-tooltip {
     animation:
      slideDown 0.4s ease-out,
      pulse 2s ease-in-out infinite;
     animation-delay: 0s, 0.4s;
    }
   `}</style>

   <FlexBox
    my="2rem"
    flexWrap="wrap"
    alignItems="center"
    justifyContent="space-between"
    flexDirection={width < breakpoint ? "column" : "row"}
   >
    {orderSteps.map((step, ind) => {
     const stepColor = getStepColor(ind);
     const isActive = ind <= statusIndex;
     const isCompleted = ind < statusIndex;

     return (
      <Fragment key={step.label}>
       <FlexBox flexDirection="column" alignItems="center" position="relative">
        {/* Animated Tooltip */}
        <Box
         position="absolute"
         top="-45px"
         zIndex={10}
         width="80px"
         className="status-tooltip"
         style={{
          animationDelay: `${ind * 0.15}s, ${ind * 0.15 + 0.4}s`,
         }}
        >
         <Box
          bg={isActive ? "primary.main" : "#E8E8E8"}
          color={isActive ? "white" : "#666"}
          px="14px"
          py="8px"
          borderRadius="6px"
          fontSize="10px"
          textAlign="center"
          fontWeight="600"
          style={{
           boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          }}
         >
          {step.label}
         </Box>

         {/* Arrow pointing down */}
         <Box
          position="absolute"
          left="50%"
          bottom="-8px"
          width="0"
          height="0"
          style={{
           transform: "translateX(-50%)",
           borderLeft: "8px solid transparent",
           borderRight: "8px solid transparent",
           borderTop: `8px solid ${isActive ? "#E94560" : "#E8E8E8"}`,
          }}
         />
        </Box>

        <Box position="relative">
         <Avatar size={64} bg={stepColor.bg} color={stepColor.color}>
          <Icon size="32px" defaultcolor="currentColor">
           {step.icon}
          </Icon>
         </Avatar>

         {/* Display "done" icon if the step is completed */}
         {(isActive || isCompleted) && (
          <Box position="absolute" right="-1px" top="-3px">
           <Avatar
            size={22}
            bg="white"
            color="primary.main"
            border="1px solid"
            borderColor="primary.main"
           >
            <Icon size="12px" defaultcolor="currentColor">
             done
            </Icon>
           </Avatar>
          </Box>
         )}
        </Box>
       </FlexBox>

       {/* Render progress line between steps */}
       {ind < orderSteps.length - 1 && (
        <Box
         height={width < breakpoint ? 50 : 4}
         minWidth={width < breakpoint ? 4 : 50}
         flex={width < breakpoint ? "unset" : "1 1 0"}
         bg={ind < statusIndex ? "primary.main" : "gray.300"}
         alignSelf={width < breakpoint ? "stretch" : "center"}
         marginTop={width < breakpoint ? "0" : "0px"}
        />
       )}
      </Fragment>
     );
    })}
   </FlexBox>

   <FlexBox
    justifyContent="space-between"
    flexWrap="wrap"
    style={{ gap: "1rem" }}
   >
    <Box
     p="0.75rem 1rem"
     bg="white"
     borderRadius="8px"
     flex="2"
     minWidth="240px"
     transition="all 0.2s ease"
    >
     <Typography
      fontSize="13px"
      color="primary.main"
      mb="0.25rem"
      fontWeight="500"
     >
      Order Status
     </Typography>
     <Typography fontSize="13px" color="text.secondary" lineHeight="1.5">
      {getStatusDescription()}
     </Typography>
    </Box>
   </FlexBox>
  </Card>
 );
}
