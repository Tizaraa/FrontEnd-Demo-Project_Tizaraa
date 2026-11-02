"use client";

import React, { Fragment } from "react";
import Box from "@component/Box";
import Card from "@component/Card";
import Avatar from "@component/avatar";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";

interface OrderStatusProps {
 return_status: number | string;
 deliveredAt?: string;
}

export default function ReturnedOrderStatus({
 return_status,
 deliveredAt,
}: OrderStatusProps) {
 const numStatus = typeof return_status === "string" ? parseInt(return_status, 10) || 0 : return_status;

 const returnSteps = [
  {
   key: "pending",
   label: "Return Requested",
   icon: "package-box",
   activeDesc: "Return request submitted by customer",
   pendingDesc: "Waiting for return request",
  },
  {
   key: "approved",
   label: "Return Approved",
   icon: "check",
   activeDesc: "Return request approved by seller. Please send or return the item.",
   pendingDesc: "Waiting for seller approval",
  },
  {
   key: "received",
   label: "Item Received",
   icon: "truck-1",
   activeDesc: "Item received and verified at the seller shop / warehouse",
   pendingDesc: "Waiting for item receipt and inspection",
  },
  {
   key: "refunded",
   label: "Refunded",
   icon: "done",
   activeDesc: "Refund processed successfully to your account",
   pendingDesc: "Waiting for refund disbursement",
  },
 ];

 // Mapping: 0 or 1 = requested, 2 = approved, 3 = received, 4 = refunded
 const activeIndex = numStatus >= 4 ? 3 : numStatus >= 3 ? 2 : numStatus >= 2 ? 1 : 0;

 return (
  <Card p="2rem 1.5rem" borderRadius={8} style={{ border: "1px solid #DDE5EE" }}>
   <Typography fontSize="15px" fontWeight="700" color="#2C3A4A" mb="1.5rem">
    Return Status
   </Typography>

   <FlexBox flexDirection="column" style={{ width: "100%" }}>
    {returnSteps.map((step, ind) => {
     const isActive = ind <= activeIndex;
     const isCompleted = ind <= activeIndex;

     return (
      <FlexBox key={step.label} alignItems="flex-start" style={{ gap: "20px" }}>
       {/* Left Column: Avatar Icon + Vertical Connecting Line */}
       <FlexBox flexDirection="column" alignItems="center" style={{ width: "56px", flexShrink: 0 }}>
        <Box position="relative">
         <Avatar
          size={56}
          bg={isActive ? "primary.main" : "gray.300"}
          color={isActive ? "white" : "primary.main"}
          style={{
           boxShadow: isActive ? "0 4px 12px rgba(236,68,98,0.22)" : "none",
           transition: "all 0.3s ease",
          }}
         >
          <Icon size="28px" defaultcolor="currentColor">
           {step.icon}
          </Icon>
         </Avatar>

         {/* Done Checkmark Badge */}
         {isCompleted && (
          <Box position="absolute" right="-2px" top="-2px">
           <Avatar
            size={20}
            bg="white"
            color="primary.main"
            border="1.5px solid"
            borderColor="primary.main"
            style={{
             display: "flex",
             alignItems: "center",
             justifyContent: "center",
             boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
           >
            <Icon size="10px" defaultcolor="currentColor">
             done
            </Icon>
           </Avatar>
          </Box>
         )}
        </Box>

        {/* Vertical Progress Line between steps */}
        {ind < returnSteps.length - 1 && (
         <Box
          width="4px"
          minHeight="48px"
          bg={ind < activeIndex ? "primary.main" : "gray.300"}
          style={{
           margin: "6px 0",
           borderRadius: "2px",
           transition: "background-color 0.3s ease",
          }}
         />
        )}
       </FlexBox>

       {/* Right Column: Speech Bubble Badge + Timeline Details */}
       <Box pt="10px" pb={ind < returnSteps.length - 1 ? "24px" : "8px"} flex="1" minWidth="0">
        {/* Tooltip Badge with arrow pointing left */}
        <Box
         bg={isActive ? "primary.main" : "var(--tz-line)"}
         color={isActive ? "white" : "var(--tz-slate)"}
         px="14px"
         py="6px"
         borderRadius="6px"
         fontSize="11px"
         fontWeight="700"
         style={{
          display: "inline-block",
          boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
          position: "relative",
         }}
        >
         {step.label}
         {/* Arrow pointing left toward the circular icon */}
         <Box
          position="absolute"
          left="-6px"
          top="50%"
          width="0"
          height="0"
          style={{
           transform: "translateY(-50%)",
           borderTop: "6px solid transparent",
           borderBottom: "6px solid transparent",
           borderRight: `6px solid ${isActive ? "var(--tz-ember-deep)" : "var(--tz-line)"}`,
          }}
         />
        </Box>

        {/* Status Description */}
        <Typography
         fontSize="13px"
         color={isActive ? "text.secondary" : "text.disabled"}
         mt="6px"
         lineHeight="1.5"
        >
         {isActive ? step.activeDesc : step.pendingDesc}
        </Typography>
       </Box>
      </FlexBox>
     );
    })}
   </FlexBox>
  </Card>
 );
}
