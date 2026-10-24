"use client";

import Link from "next/link";
import { format } from "date-fns";
import styled from "styled-components";
import Icon from "@component/icon/Icon";
import { currency } from "@utils/utils";
import { ToneChip, Tone } from "../ui";
import { buildStatusBuckets, normalizeStatus, rowDisplayTotal } from "./orderRowStatus";

// One order on a dashboard order list. All five lists (all, pending, delivered,
// cancelled, return) render this card; they differ only in where it links.

// Shared by the card and the column header so both line up
const columns = "minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 0.6fr) minmax(0, 1fr) 32px";

const Card = styled(Link)`
 display: block;
 margin-bottom: 12px;
 padding: 16px 20px;
 background: ${({ theme }) => theme.tz.color.paper};
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: ${({ theme }) => theme.tz.radius.md}px;
 color: inherit;
 text-decoration: none;
 transition: box-shadow ${({ theme }) => theme.tz.motion.fast},
  border-color ${({ theme }) => theme.tz.motion.fast};

 &:hover {
  border-color: ${({ theme }) => theme.tz.color.slate};
  box-shadow: ${({ theme }) => theme.tz.elevation.raised};

  .oc-arrow {
   color: ${({ theme }) => theme.tz.color.emberDeep};
  }
 }

 &:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 ${({ theme }) => theme.tz.media.reducedMotion} {
  transition: none;
 }

 .oc-main {
  display: grid;
  grid-template-columns: ${columns};
  align-items: center;
  gap: 12px;
 }

 .oc-invoice {
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.ink};
  overflow-wrap: anywhere;
 }

 .oc-cell {
  font-size: 14px;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }

 .oc-total {
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.ink};
  font-variant-numeric: tabular-nums;
 }

 .oc-arrow {
  display: flex;
  justify-content: flex-end;
  color: ${({ theme }) => theme.tz.color.slate};
  transition: color ${({ theme }) => theme.tz.motion.fast};
 }

 .oc-label {
  display: none;
 }

 .oc-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
 }

 /* Phones: invoice and total on top, date and items under them */
 @media (max-width: 768px) {
  padding: 16px;

  .oc-main {
   grid-template-columns: minmax(0, 1fr) auto;
   gap: 4px 12px;
  }

  .oc-invoice {
   grid-column: 1;
   grid-row: 1;
  }

  .oc-total {
   grid-column: 2;
   grid-row: 1;
   text-align: right;
  }

  .oc-date {
   grid-column: 1;
   grid-row: 2;
  }

  .oc-items {
   grid-column: 2;
   grid-row: 2;
   text-align: right;
  }

  .oc-label {
   display: inline;
  }

  .oc-arrow {
   display: none;
  }
 }
`;

const Head = styled.div`
 display: grid;
 grid-template-columns: ${columns};
 gap: 12px;
 padding: 0 21px 8px;
 font-size: 13px;
 font-weight: 500;
 color: ${({ theme }) => theme.tz.color.slate};

 @media (max-width: 768px) {
  display: none;
 }
`;

// How each item bucket on the card's footer is coloured
export function statusTone(status: string): Tone {
 switch (normalizeStatus(status)) {
  case "pending":
  case "return_requested":
   return "warning";
  case "delivered":
   return "success";
  case "cancelled":
   return "danger";
  case "returned":
  case "refunded":
   return "neutral";
  default:
   return "info";
 }
}

export function OrderListHead() {
 return (
  <Head aria-hidden="true">
   <span>Order ID</span>
   <span>Date purchased</span>
   <span>Items</span>
   <span>Total</span>
   <span />
  </Head>
 );
}

export default function OrderCard({ order, href }: { order: any; href: string }) {
 const buckets = buildStatusBuckets(order);
 const activeTone = statusTone(order.status);

 return (
  <Card href={href}>
   <div className="oc-main">
    <span className="oc-invoice">{order.invoice}</span>
    <span className="oc-cell oc-date">{format(new Date(order.date), "MMM dd, yyyy")}</span>
    <span className="oc-cell oc-items">
     {order.item_count}
     <span className="oc-label"> {order.item_count === 1 ? "item" : "items"}</span>
    </span>
    <span className="oc-total">{currency(rowDisplayTotal(order))}</span>
    <span className="oc-arrow" aria-hidden="true">
     <Icon variant="small" defaultcolor="currentColor">
      arrow-right
     </Icon>
    </span>
   </div>

   {buckets.length > 0 && (
    <div className="oc-chips">
     {buckets.map((bucket) => (
      <ToneChip
       key={bucket.label}
       $tone={
        bucket.label === "Cancel" ? "danger" : bucket.label === "Returned" ? "neutral" : activeTone
       }
      >
       {bucket.count} {bucket.label}
      </ToneChip>
     ))}
    </div>
   )}
  </Card>
 );
}
