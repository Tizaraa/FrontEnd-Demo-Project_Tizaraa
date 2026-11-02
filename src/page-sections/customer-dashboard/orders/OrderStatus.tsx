"use client";

import React, { Fragment, useEffect } from "react";
import Box from "@component/Box";
import Card from "@component/Card";
import Avatar from "@component/avatar";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import useWindowSize from "@hook/useWindowSize";
import { format } from "date-fns";

export interface TimelineEvent {
 id?: number;
 from_status?: string | null;
 to_status?: string | null;
 status?: string | null;
 notes?: string | null;
 changed_by_name?: string | null;
 changed_by_role?: string | null;
 created_at?: string | null;
 at?: string | null;
}

export interface ReturnRecord {
 id?: number;
 return_status?: string | null;
 return_type?: string | null;
 return_reason?: string | null;
 refund_amount?: number | null;
 admin_notes?: string | null;
 reviewed_at?: string | null;
 returned_at?: string | null;
 refunded_at?: string | null;
 created_at?: string | null;
}

interface OrderStatusProps {
 orderStatus: string | null;
 deliveredAt?: string | null;
 returnStatus?: string | null;
 isCorporate?: boolean;
 hideReturnFlow?: boolean;
 timeline?: TimelineEvent[];
 returnRecord?: ReturnRecord | null;
}

const formatTimelineDate = (dateStr?: string | null): string => {
 if (!dateStr) return "";
 try {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return String(dateStr);
  return format(d, "MMM d, yyyy, h:mm a");
 } catch {
  return String(dateStr);
 }
};

const normalize = (s?: string | null): string => (s ?? "").trim().toLowerCase();

export default function OrderStatus({
 orderStatus,
 deliveredAt,
 returnStatus,
 isCorporate = false,
 hideReturnFlow = false,
 timeline = [],
 returnRecord = null,
}: OrderStatusProps) {
 const width = useWindowSize();
 const breakpoint = 350;
 const normStatus = normalize(orderStatus);

 // =========================================================================
 // 1. CORPORATE SHOP ORDER FLOW (Counter pickup — 3 horizontal steps)
 // =========================================================================
 if (isCorporate) {
  const statusMap: { [key: string]: number } = {
   pending: 0,
   confirmed: 1,
   processing: 2,
   packed: 2,
   ready_for_pickup: 3,
   shipped: 3,
   delivered: 4,
   canceled: 5,
   cancelled: 5,
   return: 6,
  };

  const numericStatus = statusMap[normStatus] ?? 0;

  const getCorporateStatusIndex = (status: number) => {
   switch (status) {
    case 0: // Pending
    case 1: // Confirmed
     return 0; // First step ("Pending") active
    case 2: // Processing / Packed
    case 3: // Shipped
     return 1; // Second step ("Packed") active
    case 4: // Delivered
     return 2; // Third step ("Delivered") active
    default:
     return -1;
   }
  };

  const corporateStatusIndex = getCorporateStatusIndex(numericStatus);

  const corporateSteps = [
   { icon: "bag", label: "Pending" },
   { icon: "package-box", label: "Packed" },
   { icon: "delivery", label: "Delivered" },
  ];

  const getCorporateDescription = () => {
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
  };

  return (
   <Card p="2rem 1.5rem" mb="30px" borderRadius={8}>
    <style jsx>{`
     @keyframes slideDown {
      0% { opacity: 0; transform: translateY(-10px); }
      100% { opacity: 1; transform: translateY(0); }
     }
     @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
     }
     .status-tooltip {
      animation: slideDown 0.4s ease-out, pulse 2s ease-in-out infinite;
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
     {corporateSteps.map((step, ind) => {
      const isActive = ind <= corporateStatusIndex;
      const isCompleted = ind < corporateStatusIndex || (ind === corporateStatusIndex && corporateStatusIndex === 2);

      return (
       <Fragment key={step.label}>
        <FlexBox flexDirection="column" alignItems="center" position="relative">
         {/* Animated Tooltip pointing down */}
         <Box
          position="absolute"
          top="-45px"
          zIndex={10}
          width="80px"
          className="status-tooltip"
          style={{ animationDelay: `${ind * 0.15}s, ${ind * 0.15 + 0.4}s` }}
         >
          <Box
           bg={isActive ? "primary.main" : "var(--tz-line)"}
           color={isActive ? "white" : "var(--tz-slate)"}
           px="14px"
           py="8px"
           borderRadius="6px"
           fontSize="10px"
           textAlign="center"
           fontWeight="600"
           style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}
          >
           {step.label}
          </Box>
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
            borderTop: `8px solid ${isActive ? "var(--tz-ember-deep)" : "var(--tz-line)"}`,
           }}
          />
         </Box>

         <Box position="relative">
          <Avatar
           size={64}
           bg={isActive ? "primary.main" : "gray.300"}
           color={isActive ? "white" : "primary.main"}
          >
           <Icon size="32px" defaultcolor="currentColor">
            {step.icon}
           </Icon>
          </Avatar>

          {isCompleted && (
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

        {/* Horizontal progress line between steps */}
        {ind < corporateSteps.length - 1 && (
         <Box
          height={width < breakpoint ? 50 : 4}
          minWidth={width < breakpoint ? 4 : 50}
          flex={width < breakpoint ? "unset" : "1 1 0"}
          bg={ind < corporateStatusIndex ? "primary.main" : "gray.300"}
          alignSelf={width < breakpoint ? "stretch" : "center"}
         />
        )}
       </Fragment>
      );
     })}
    </FlexBox>

    <FlexBox justifyContent="space-between" flexWrap="wrap" style={{ gap: "1rem" }}>
     <Box p="0.75rem 1rem" bg="white" borderRadius="8px" flex="2" minWidth="240px">
      <Typography fontSize="13px" color="primary.main" mb="0.25rem" fontWeight="500">
       Order Status
      </Typography>
      <Typography fontSize="13px" color="text.secondary" lineHeight="1.5">
       {getCorporateDescription()}
      </Typography>
     </Box>
    </FlexBox>
   </Card>
  );
 }

 // =========================================================================
 // 2. RETURN FLOW (4-step Vertical Flow: Return Requested > Return Approved > Item Received > Refunded)
 // =========================================================================
 const RETURN_FLOW_ORDER_STATUSES = [
  "return requested",
  "return_requested",
  "returned",
  "refunded",
  "return approved",
  "return_approved",
  "return received",
  "return_received",
  "return",
 ];

 const normReturnStatus = normalize(returnStatus);
 const isReturnFlow =
  !hideReturnFlow &&
  (RETURN_FLOW_ORDER_STATUSES.includes(normStatus) ||
   Boolean(returnStatus && normReturnStatus !== "none" && normReturnStatus !== "active") ||
   Boolean(returnRecord));

 if (isReturnFlow) {
  const RETURN_RECORD_STEPS: { [key: string]: number } = {
   pending: 0,
   return_requested: 0,
   "return requested": 0,
   approved: 1,
   return_approved: 1,
   "return approved": 1,
   received: 2,
   return_received: 2,
   "return received": 2,
   returned: 2,
   refunded: 3,
  };

  const isRejected = normReturnStatus === "rejected";

  const returnCurrentIndex =
   normStatus === "refunded" || normReturnStatus === "refunded"
    ? 3
    : isRejected
    ? 0
    : RETURN_RECORD_STEPS[normReturnStatus] ??
      RETURN_RECORD_STEPS[normStatus] ??
      0;

  const returnSteps = [
   {
    key: "pending",
    label: "Return Requested",
    icon: "package-box",
    targetStatus: "pending",
    activeDesc: "Return request submitted by customer",
    pendingDesc: "Waiting for return request",
   },
   {
    key: "approved",
    label: "Return Approved",
    icon: "check",
    targetStatus: "approved",
    activeDesc: "Return request approved by seller. Please send or return the item.",
    pendingDesc: "Waiting for seller approval",
   },
   {
    key: "received",
    label: "Item Received",
    icon: "truck-1",
    targetStatus: "received",
    activeDesc: "Item received and verified at the seller shop / warehouse",
    pendingDesc: "Waiting for item receipt and inspection",
   },
   {
    key: "refunded",
    label: "Refunded",
    icon: "done",
    targetStatus: "refunded",
    activeDesc: "Refund processed successfully to your account",
    pendingDesc: "Waiting for refund disbursement",
   },
  ];

  const findReturnEvent = (targetStatus: string, ind: number) => {
   if (returnRecord) {
    if (ind === 0 && returnRecord.created_at) {
     return {
      created_at: returnRecord.created_at,
      changed_by_name: null,
      changed_by_role: "customer",
      notes: returnRecord.return_reason ?? null,
     };
    }
    if (ind === 1 && returnRecord.reviewed_at) {
     return {
      created_at: returnRecord.reviewed_at,
      changed_by_name: null,
      changed_by_role: "seller",
      notes: returnRecord.admin_notes ?? null,
     };
    }
    if (ind === 2 && returnRecord.returned_at) {
     return {
      created_at: returnRecord.returned_at,
      changed_by_name: null,
      changed_by_role: "seller",
      notes: null,
     };
    }
    if (ind === 3 && returnRecord.refunded_at) {
     return {
      created_at: returnRecord.refunded_at,
      changed_by_name: "Tizaraa Finance",
      changed_by_role: "system",
      notes: returnRecord.refund_amount
       ? `Refund amount: ৳ ${Number(returnRecord.refund_amount).toFixed(2)}`
       : null,
     };
    }
   }

   const match = (timeline ?? []).find(
    (t) =>
     normalize(t.to_status) === targetStatus ||
     normalize(t.status) === targetStatus ||
     (targetStatus === "pending" && (normalize(t.to_status) === "return_requested" || normalize(t.to_status) === "return")) ||
     (targetStatus === "approved" && normalize(t.to_status) === "return_approved") ||
     (targetStatus === "received" && (normalize(t.to_status) === "return_received" || normalize(t.to_status) === "returned"))
   );
   if (match) return match;

   if (ind <= returnCurrentIndex) {
    return {
     created_at: null,
     changed_by_name: null,
     changed_by_role: ind === 0 ? "customer" : "seller",
     notes: null,
    };
   }

   return null;
  };

  const stepsToRender = isRejected ? [returnSteps[0]] : returnSteps;

  return (
   <Card p="2rem 1.5rem" mb="30px" borderRadius={8} style={{ border: "1px solid #DDE5EE" }}>
    <Typography fontSize="15px" fontWeight="700" color="#2C3A4A" mb="1.5rem">
     Return Status
    </Typography>

    <FlexBox flexDirection="column" style={{ width: "100%" }}>
     {stepsToRender.map((step, ind) => {
      const isActive = ind <= returnCurrentIndex;
      const isCompleted = ind <= returnCurrentIndex;
      const event = findReturnEvent(step.targetStatus, ind);

      const dateStr = event ? formatTimelineDate(event.created_at || (event as any).at) : "";
      const actorStr = event?.changed_by_name
       ? ` · ${event.changed_by_name} (${event.changed_by_role || (ind === 0 ? "customer" : "seller")})`
       : "";

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

         {/* Vertical Progress Line between steps, or connecting down to Rejected step */}
         {(ind < stepsToRender.length - 1 || isRejected) && (
          <Box
           width="4px"
           minHeight="48px"
           bg={isRejected || ind < returnCurrentIndex ? "primary.main" : "gray.300"}
           style={{
            margin: "6px 0",
            borderRadius: "2px",
            transition: "background-color 0.3s ease",
           }}
          />
         )}
        </FlexBox>

        {/* Right Column: Speech Bubble Badge + Timeline Details */}
        <Box pt="10px" pb={(ind < stepsToRender.length - 1 || isRejected) ? "24px" : "8px"} flex="1" minWidth="0">
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

         {/* Date, Time and Actor */}
         {isActive && (dateStr || actorStr) && (
          <Typography fontSize="12px" color="#7A8A99" mt="6px" fontWeight="500">
           {dateStr}
           {actorStr}
          </Typography>
         )}

         {/* Notes / Reason if any */}
         {isActive && event?.notes && (
          <Typography fontSize="12px" color="#7A8A99" mt="2px" fontStyle="italic">
           {event.notes}
          </Typography>
         )}

         {/* Status Description */}
         <Typography
          fontSize="13px"
          color={isActive ? "text.secondary" : "text.disabled"}
          mt="4px"
          lineHeight="1.5"
         >
          {isActive ? step.activeDesc : step.pendingDesc}
         </Typography>
        </Box>
       </FlexBox>
      );
     })}

     {/* Rejected Step (if return was rejected) */}
     {isRejected && (
      <FlexBox alignItems="flex-start" style={{ gap: "20px" }}>
       <FlexBox flexDirection="column" alignItems="center" style={{ width: "56px", flexShrink: 0 }}>
        <Avatar
         size={56}
         bg="#EF4444"
         color="white"
         style={{
          boxShadow: "0 4px 12px rgba(239,68,68,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
         }}
        >
         <Typography fontSize="22px" fontWeight="700" color="white" style={{ lineHeight: 1 }}>
          ✕
         </Typography>
        </Avatar>
       </FlexBox>
       <Box pt="10px" flex="1">
        <Box
         bg="#EF4444"
         color="white"
         px="14px"
         py="6px"
         borderRadius="6px"
         fontSize="11px"
         fontWeight="700"
         style={{
          display: "inline-block",
          position: "relative",
          boxShadow: "0 2px 8px rgba(239,68,68,0.25)",
         }}
        >
         Return Rejected
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
           borderRight: "6px solid #EF4444",
          }}
         />
        </Box>
        {returnRecord?.reviewed_at && (
         <Typography fontSize="12px" color="#7A8A99" mt="6px" fontWeight="500">
          {formatTimelineDate(returnRecord.reviewed_at)} · Seller
         </Typography>
        )}
        {returnRecord?.admin_notes && (
         <Typography fontSize="12px" color="#7A8A99" mt="2px" fontStyle="italic">
          {returnRecord.admin_notes}
         </Typography>
        )}
        <Typography fontSize="13px" color="#EF4444" mt="4px" fontWeight="500">
         Your return request was rejected by the seller.
        </Typography>
       </Box>
      </FlexBox>
     )}
    </FlexBox>
   </Card>
  );
 }

 // =========================================================================
 // 3. RETAIL PRODUCT ORDER FLOW (5-step Vertical Flow: Pending > Confirmed > Processing > Shipped > Delivered)
 // =========================================================================
 const STATUS_MAP: { [key: string]: number } = {
  pending: 0,
  confirmed: 1,
  processing: 2,
  shipped: 3,
  delivered: 4,
 };

 const currentStatusIndex =
  STATUS_MAP[normStatus] ??
  (normStatus.includes("deliver")
   ? 4
   : normStatus.includes("ship")
   ? 3
   : normStatus.includes("process")
   ? 2
   : normStatus.includes("confirm")
   ? 1
   : 0);

 const isCancelled = normStatus === "cancelled" || normStatus === "canceled";

 const retailSteps = [
  {
   key: "pending",
   label: "Pending",
   icon: "bag",
   targetStatus: "pending",
   activeDesc: "Order placed and received by seller",
   pendingDesc: "Order placed by customer",
  },
  {
   key: "confirmed",
   label: "Confirmed",
   icon: "check",
   targetStatus: "confirmed",
   activeDesc: "Your order has been confirmed by the seller",
   pendingDesc: "Waiting for seller confirmation",
  },
  {
   key: "processing",
   label: "Processing",
   icon: "package-box",
   targetStatus: "processing",
   activeDesc: "Your order is being processed and prepared for shipment",
   pendingDesc: "Waiting for seller to process order",
  },
  {
   key: "shipped",
   label: "Shipped",
   icon: "truck-1",
   targetStatus: "shipped",
   activeDesc: "Your order has been shipped and is on the way",
   pendingDesc: "Waiting for shipment dispatch",
  },
  {
   key: "delivered",
   label: "Delivered",
   icon: "delivery",
   targetStatus: "delivered",
   activeDesc: "Your order has been delivered successfully",
   pendingDesc: "Waiting for delivery handoff",
  },
 ];

 const findEvent = (targetStatus: string, ind: number) => {
  const match = (timeline ?? []).find(
   (t) =>
    normalize(t.to_status) === targetStatus ||
    normalize(t.status) === targetStatus
  );

  if (match) return match;

  if (ind <= currentStatusIndex) {
   if (targetStatus === "delivered" && deliveredAt) {
    return {
     to_status: "delivered",
     created_at: deliveredAt,
     changed_by_name: null,
     changed_by_role: "seller",
     notes: null,
    };
   }
   return {
    to_status: targetStatus,
    created_at: null,
    changed_by_name: null,
    changed_by_role: "seller",
    notes: null,
   };
  }

  return null;
 };

 const cancelEvent = isCancelled
  ? (timeline ?? []).find(
     (t) => normalize(t.to_status) === "cancelled" || normalize(t.to_status) === "canceled"
    ) ?? null
  : null;

 // Determine steps to render:
 // For cancelled orders, render completed steps up to cancellation point,
 // then seamlessly connect downwards to the red Cancelled step.
 let stepsToRender = retailSteps;
 if (isCancelled) {
  let lastStepKey = "pending";
  if (cancelEvent?.from_status && STATUS_MAP[normalize(cancelEvent.from_status)] !== undefined) {
   lastStepKey = normalize(cancelEvent.from_status);
  } else {
   let maxIdx = 0;
   (timeline ?? []).forEach((t) => {
    const s = normalize(t.to_status || t.status);
    if (s !== "cancelled" && s !== "canceled" && STATUS_MAP[s] !== undefined) {
     if (STATUS_MAP[s] > maxIdx) {
      maxIdx = STATUS_MAP[s];
      lastStepKey = s;
     }
    }
   });
  }
  const lastIdx = STATUS_MAP[lastStepKey] ?? 0;
  stepsToRender = retailSteps.filter((_, ind) => ind <= lastIdx);
 }

 return (
  <Card p="2rem 1.5rem" mb="30px" borderRadius={8} style={{ border: "1px solid #DDE5EE" }}>
   <Typography fontSize="15px" fontWeight="700" color="#2C3A4A" mb="1.5rem">
    Order Status
   </Typography>

   <FlexBox flexDirection="column" style={{ width: "100%" }}>
    {stepsToRender.map((step, ind) => {
     const isActive = isCancelled ? true : ind <= currentStatusIndex;
     const isCompleted = isCancelled ? true : ind <= currentStatusIndex;
     const event = findEvent(step.targetStatus, ind);

     const dateStr = event ? formatTimelineDate(event.created_at || event.at) : "";
     const actorStr = event?.changed_by_name
      ? ` · ${event.changed_by_name} (${event.changed_by_role || "seller"})`
      : "";

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

        {/* Vertical Progress Line between steps, or connecting down to Cancelled step */}
        {(ind < stepsToRender.length - 1 || isCancelled) && (
         <Box
          width="4px"
          minHeight="48px"
          bg={isCancelled || ind < currentStatusIndex ? "primary.main" : "gray.300"}
          style={{
           margin: "6px 0",
           borderRadius: "2px",
           transition: "background-color 0.3s ease",
          }}
         />
        )}
       </FlexBox>

       {/* Right Column: Speech Bubble Badge + Timeline Details */}
       <Box pt="10px" pb={(ind < stepsToRender.length - 1 || isCancelled) ? "24px" : "8px"} flex="1" minWidth="0">
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

        {/* Date, Time and Seller Name */}
        {isActive && (dateStr || actorStr) && (
         <Typography fontSize="12px" color="#7A8A99" mt="6px" fontWeight="500">
          {dateStr}
          {actorStr}
         </Typography>
        )}

        {/* Notes if any */}
        {isActive && event?.notes && (
         <Typography fontSize="12px" color="#7A8A99" mt="2px" fontStyle="italic">
          {event.notes}
         </Typography>
        )}

        {/* Status Description */}
        <Typography
         fontSize="13px"
         color={isActive ? "text.secondary" : "text.disabled"}
         mt="4px"
         lineHeight="1.5"
        >
         {isActive ? step.activeDesc : step.pendingDesc}
        </Typography>
       </Box>
      </FlexBox>
     );
    })}

    {/* Cancelled Step (if order was cancelled) */}
    {isCancelled && (
     <FlexBox alignItems="flex-start" style={{ gap: "20px" }}>
      <FlexBox flexDirection="column" alignItems="center" style={{ width: "56px", flexShrink: 0 }}>
       <Avatar
        size={56}
        bg="#EF4444"
        color="white"
        style={{
         boxShadow: "0 4px 12px rgba(239,68,68,0.3)",
         display: "flex",
         alignItems: "center",
         justifyContent: "center",
        }}
       >
        <Typography fontSize="22px" fontWeight="700" color="white" style={{ lineHeight: 1 }}>
         ✕
        </Typography>
       </Avatar>
      </FlexBox>
      <Box pt="10px" flex="1">
       <Box
        bg="#EF4444"
        color="white"
        px="14px"
        py="6px"
        borderRadius="6px"
        fontSize="11px"
        fontWeight="700"
        style={{
         display: "inline-block",
         position: "relative",
         boxShadow: "0 2px 8px rgba(239,68,68,0.25)",
        }}
       >
        Cancelled
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
          borderRight: "6px solid #EF4444",
         }}
        />
       </Box>
       {cancelEvent?.created_at && (
        <Typography fontSize="12px" color="#7A8A99" mt="6px" fontWeight="500">
         {formatTimelineDate(cancelEvent.created_at || cancelEvent.at)}
         {cancelEvent.changed_by_name && ` · ${cancelEvent.changed_by_name} (${cancelEvent.changed_by_role || "customer"})`}
        </Typography>
       )}
       {cancelEvent?.notes && (
        <Typography fontSize="12px" color="#7A8A99" mt="2px" fontStyle="italic">
         {cancelEvent.notes}
        </Typography>
       )}
       <Typography fontSize="13px" color="#EF4444" mt="4px" fontWeight="500">
        This order has been cancelled.
       </Typography>
      </Box>
     </FlexBox>
    )}
   </FlexBox>
  </Card>
 );
}
