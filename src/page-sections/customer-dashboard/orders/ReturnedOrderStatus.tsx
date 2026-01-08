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
//   return_status: number; // Numeric status: 0, 1, 2, ...
//   deliveredAt: string;   // Delivery date
// }

// export default function ReturnedOrderStatus({
//   return_status,
//   deliveredAt,
// }: OrderStatusProps) {
//   const width = useWindowSize();

//   // Define the icons and their corresponding conditions
//   const stepIconList = [
//     { icon: "package-box", condition: return_status >= 2 }, // package-box active if return_status >= 2
//     { icon: "truck-1", condition: return_status >= 3 },    // truck-1 active if return_status >= 3
//     { icon: "delivery", condition: return_status >= 4 },   // delivery active if return_status >= 4
//   ];

//   const breakpoint = 350; // Screen width breakpoint

//   // Log the current numeric status for debugging
//   useEffect(() => {
//     console.log("Current Return Status (number):", return_status);
//   }, [return_status]);

//   return (
//     <Card p="2rem 1.5rem" mb="30px" borderRadius={8}>
//       <FlexBox
//         my="2rem"
//         flexWrap="wrap"
//         alignItems="center"
//         justifyContent="space-between"
//         flexDirection={width < breakpoint ? "column" : "row"}
//       >
//         {stepIconList.map(({ icon, condition }, ind) => (
//           <Fragment key={icon}>
//             <Box position="relative">
//               <Avatar
//                 size={64}
//                 bg={condition ? "primary.main" : "gray.300"}  // Active if condition is true
//                 color={condition ? "gray.white" : "primary.main"}  // Change icon color if active
//               >
//                 <Icon size="32px" defaultcolor="currentColor">
//                   {icon}
//                 </Icon>
//               </Avatar>

//               {return_status >= ind && (
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
//                 bg={return_status >= ind ? "primary.main" : "gray.300"}
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
 return_status: number;
 deliveredAt: string;
}

export default function ReturnedOrderStatus({
 return_status,
 deliveredAt,
}: OrderStatusProps) {
 const width = useWindowSize();

 const returnSteps = [
  {
   icon: "delivery",
   label: "Delivered",
   status: return_status >= 0 ? "completed" : "pending",
  },
  {
   icon: "package-box",
   label: "Return Processing",
   status: return_status >= 2 ? "active" : "pending",
  },
  {
   icon: "truck",
   label: "Return Shipped",
   status: return_status >= 3 ? "active" : "pending",
  },
  {
   icon: "checkbox",
   label: "Returned",
   status: return_status >= 4 ? "active" : "pending",
  },
 ];

 const breakpoint = 350;

 useEffect(() => {
  console.log("Current Return Status:", return_status);
 }, [return_status]);

 const getStepColor = (step: (typeof returnSteps)[0]) => {
  switch (step.status) {
   case "completed":
   case "active":
    return { bg: "#E94560", color: "white" };
   case "pending":
    return { bg: "gray.300", color: "#E94560" };
   default:
    return { bg: "gray.300", color: "#E94560" };
  }
 };

 const getLabelColor = (step: (typeof returnSteps)[0]) => {
  switch (step.status) {
   case "completed":
   case "active":
    return "#E94560";
   case "pending":
    return "gray.500";
   default:
    return "gray.500";
  }
 };

 return (
  <Card p="2rem 1.5rem" borderRadius={8}>
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

    .arrow-down {
     width: 0;
     height: 0;
     border-left: 8px solid transparent;
     border-right: 8px solid transparent;
     border-top: 8px solid;
     position: absolute;
     bottom: -8px;
     left: 50%;
     transform: translateX(-50%);
    }
   `}</style>

   <FlexBox
    my="2rem"
    flexWrap="wrap"
    alignItems="center"
    justifyContent="space-between"
    flexDirection={width < breakpoint ? "column" : "row"}
   >
    {returnSteps.map((step, ind) => {
     const stepColor = getStepColor(step);
     const labelColor = getLabelColor(step);
     const isActive = step.status === "completed" || step.status === "active";

     return (
      <Fragment key={step.label}>
       <FlexBox flexDirection="column" alignItems="center" position="relative">
        {/* Arrow-style Tooltip */}
        <Box
         position="absolute"
         top="-45px"
         zIndex={10}
         width="120px"
         className="status-tooltip"
         style={{
          animationDelay: `${ind * 0.15}s, ${ind * 0.15 + 0.4}s`,
         }}
        >
         <Box
          bg={isActive ? "#E94560" : "#E8E8E8"}
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

         {isActive && (
          <Box position="absolute" right="-1px" top="-3px">
           <Avatar
            size={22}
            bg="white"
            color="#E94560"
            border="1px solid #E94560"
           >
            <Icon size="12px" defaultcolor="currentColor">
             done
            </Icon>
           </Avatar>
          </Box>
         )}
        </Box>
       </FlexBox>

       {ind < returnSteps.length - 1 && (
        <Box
         height={width < breakpoint ? 50 : 4}
         minWidth={width < breakpoint ? 4 : 50}
         flex={width < breakpoint ? "unset" : "1 1 0"}
         bg={
          returnSteps[ind + 1].status === "active" ||
          returnSteps[ind + 1].status === "completed"
           ? "#E94560"
           : "gray.300"
         }
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
     border="1px solid #e5d1d0"
     borderRadius="8px"
     flex="1"
     minWidth="180px"
     transition="all 0.2s ease"
    >
     <Typography
      fontSize="11px"
      color="#E94560"
      mb="0.25rem"
      fontWeight="500"
      textTransform="uppercase"
      letterSpacing="0.3px"
     >
      Estimated Returned Date
     </Typography>
     <Typography fontSize="14px" fontWeight="600" color="#73877b">
      {deliveredAt}
     </Typography>
    </Box>

    {/* Return Status Description */}
    <Box
     p="0.75rem 1rem"
     bg="white"
     border="1px solid #e5d1d0"
     borderRadius="8px"
     flex="2"
     minWidth="240px"
     transition="all 0.2s ease"
    >
     <Typography fontSize="13px" color="#E94560" mb="0.25rem">
      Return Status
     </Typography>
     <Typography fontSize="13px" color="#73877b" lineHeight="1.5">
      {return_status === 0 && "Your return was successful"}
      {return_status === 1 && "Your return has been confirmed"}
      {return_status === 2 &&
       "Return request is being processed. We'll inspect the item soon."}
      {return_status === 3 &&
       "Return shipped back to warehouse. You get updates available soon."}
      {return_status === 4 &&
       "Return completed. Refund will be processed according to our policy."}
     </Typography>
    </Box>
   </FlexBox>
  </Card>
 );
}
