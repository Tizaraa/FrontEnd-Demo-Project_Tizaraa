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
}

export default function OrderStatus({ orderStatus, deliveredAt }: OrderStatusProps) {
  const width = useWindowSize();
  const stepIconList = ["package-box", "truck-1", "delivery"];
  const orderStatusList = ["Confirmed", "Shipped", "Delivered"];

  const breakpoint = 350;

  // Map string status to numeric value
  const statusMap: { [key: string]: number } = {
    "pending": 0,
    "confirmed": 1,
    "processing": 2,
    "shipped": 3,
    "delivered": 4,
    "canceled": 5,
    "return": 6,
  };

  // Convert string status to number
  const numericStatus = orderStatus ? statusMap[orderStatus.toLowerCase()] ?? null : null;

  // Determine the status index for the progress bar
  const getStatusIndex = (status: number | null) => {
    if (status === null || status === undefined) return -1;
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
  const isPending = statusIndex === -2;

  // Log the current status
  useEffect(() => {
    console.log("Current Order Status:", orderStatus, "Numeric Status:", numericStatus);
  }, [orderStatus, numericStatus]);

  // Hide the order status part if the status is "Canceled" or "Return"
  if (statusIndex === -1) {
    return null;
  }

  return (
    <Card p="2rem 1.5rem" mb="30px" borderRadius={8}>
      <FlexBox
        my="2rem"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
        flexDirection={width < breakpoint ? "column" : "row"}
      >
        {stepIconList.map((item, ind) => (
          <Fragment key={item}>
            <Box position="relative">
              <Avatar
                size={64}
                bg={ind <= statusIndex ? "primary.main" : "gray.300"}  // Active steps get a blue background
                color={ind <= statusIndex ? "gray.white" : "primary.main"}
              >
                <Icon size="32px" defaultcolor="currentColor">
                  {item}
                </Icon>
              </Avatar>

              {/* Display "done" icon if the step is completed */}
              {ind < statusIndex && (
                <Box position="absolute" right="0" top="0">
                  <Avatar size={22} bg="gray.200" color="success.main">
                    <Icon size="12px" defaultcolor="currentColor">
                      done
                    </Icon>
                  </Avatar>
                </Box>
              )}
            </Box>

            {/* Render progress line between steps */}
            {ind < stepIconList.length - 1 && (
              <Box
                height={width < breakpoint ? 50 : 4}
                minWidth={width < breakpoint ? 4 : 50}
                flex={width < breakpoint ? "unset" : "1 1 0"}
                bg={ind < statusIndex ? "primary.main" : "gray.300"}
              />
            )}
          </Fragment>
        ))}
      </FlexBox>

      {deliveredAt && (
        <FlexBox justifyContent={width < breakpoint ? "center" : "flex-end"}>
          <Typography
            p="0.5rem 1rem"
            bg="primary.light"
            textAlign="center"
            borderRadius="300px"
            color="primary.main"
          >
            Estimated Delivery Date: <b>{deliveredAt}</b>
          </Typography>
        </FlexBox>
      )}
    </Card>
  );
}
