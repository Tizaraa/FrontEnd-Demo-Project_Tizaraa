"use client";

import Link from "next/link";
import { format } from "date-fns";
import styled, { keyframes } from "styled-components";
import { currency } from "@utils/utils";
import { ToneChip, Tone } from "../ui";
import { buildStatusBuckets, normalizeStatus, rowDisplayTotal, statusLabel } from "./orderRowStatus";

// One order on a dashboard order list. All five lists (all, pending, delivered,
// cancelled, return) render this card; they differ only in where it links.

// Shared by the card and the column header so both line up
// One aligned row per order (Baymard: people come to the order list to track,
// return, review, cancel or get an invoice, so status + next action sit on the
// card itself). Columns: order (id + date) · items · payment · total · status ·
// action. A coloured stripe and icon tile show the status at a glance.
// Motion: fade-up once (staggered) and hover lift; nothing loops.
const columns =
 "minmax(0, 1.5fr) minmax(0, 0.5fr) minmax(0, 0.9fr) minmax(0, 0.9fr) minmax(0, 1.4fr) 92px"; // fixed action column so header and cards line up

const cardIn = keyframes`
 from { opacity: 0; transform: translateY(10px); }
 to { opacity: 1; transform: none; }
`;

const stagger = Array.from({ length: 12 }, (_, i) => `&:nth-child(${i + 1}) { animation-delay: ${i * 40}ms; }`).join("\n");

const Card = styled(Link)<{ $tone: Tone }>`
 position: relative;
 display: grid;
 grid-template-columns: ${columns};
 align-items: center;
 gap: 14px;
 margin-bottom: 12px;
 padding: 14px 18px 14px 22px;
 overflow: hidden;
 background: ${({ theme }) => theme.tz.color.paper};
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: 16px;
 color: inherit;
 text-decoration: none;
 transition: box-shadow 200ms, border-color 150ms, transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
 animation: ${cardIn} 420ms cubic-bezier(0.22, 1, 0.36, 1) backwards;
 ${stagger}

 /* Status stripe */
 &::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 4px;
  background: ${({ theme, $tone }) => theme.tz.tone[$tone].fill};
 }

 &:hover {
  border-color: ${({ theme }) => theme.tz.color.slate};
  box-shadow: 0 10px 26px rgba(14, 52, 96, 0.1);
  transform: translateY(-2px);

  .oc-action svg {
   transform: translateX(3px);
  }
 }

 &:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 .oc-order {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
 }

 .oc-icon {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  color: ${({ theme, $tone }) => theme.tz.tone[$tone].fg};
  background: ${({ theme, $tone }) => theme.tz.tone[$tone].bg};
 }

 .oc-id {
  min-width: 0;
 }

 .oc-invoice {
  display: block;
  overflow: hidden;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
  white-space: nowrap;
  text-overflow: ellipsis;
 }

 .oc-date {
  font-size: 13px;
  color: ${({ theme }) => theme.tz.color.slate};
 }

 .oc-cell {
  font-size: 14px;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }

 .oc-total {
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
  font-variant-numeric: tabular-nums;
 }

 .oc-status {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
 }

 .oc-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 6px;
  border-radius: 50%;
  vertical-align: middle;
  background: currentColor;
 }

 .oc-action {
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.inkSoft};
  white-space: nowrap;
  transition: border-color 150ms, color 150ms, background-color 150ms;

  svg {
   transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
  }
 }
 .oc-action.track {
  border-color: ${({ theme }) => theme.tz.color.ember};
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 &:hover .oc-action {
  border-color: ${({ theme }) => theme.tz.color.ember};
  color: ${({ theme }) => theme.tz.color.emberDeep};
  background: ${({ theme }) => theme.tz.color.emberTint};
 }

 .oc-label {
  display: none;
 }

 /* Phones: order + total on top, then items/payment, then status + action */
 @media (max-width: 768px) {
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px 12px;
  padding: 14px 14px 14px 18px;

  .oc-order {
   grid-column: 1;
  }
  .oc-total {
   grid-column: 2;
   grid-row: 1;
   text-align: right;
  }
  .oc-items,
  .oc-pay {
   display: inline;
  }
  .oc-items {
   grid-column: 1;
  }
  .oc-pay {
   grid-column: 2;
   text-align: right;
  }
  .oc-status {
   grid-column: 1;
  }
  .oc-action {
   grid-column: 2;
   justify-self: end;
  }
  .oc-label {
   display: inline;
  }
 }

 ${({ theme }) => theme.tz.media.reducedMotion} {
  transition: none;
  animation: none;

  &:hover {
   transform: none;
  }
 }
`;

const Head = styled.div`
 display: grid;
 grid-template-columns: ${columns};
 gap: 14px;
 padding: 0 19px 8px 23px;
 font-size: 12px;
 font-weight: 700;
 letter-spacing: 0.04em;
 text-transform: uppercase;
 color: ${({ theme }) => theme.tz.color.slate};

 @media (max-width: 768px) {
  display: none;
 }
`;

// Line icon per status
const STATUS_ICON: Record<string, string> = {
 pending: "M12 7v5l3 2M12 21a9 9 0 100-18 9 9 0 000 18z",
 confirmed: "M5 12l4 4 10-10",
 processing: "M4 7h16M4 12h16M4 17h10",
 ready_for_pickup: "M5 8h14l-1 12H6zM9 8V6a3 3 0 016 0v2",
 shipped: "M3 6h11v9H3zM14 9h4l3 3v3h-7M7 18.5a1.8 1.8 0 100-3.6 1.8 1.8 0 000 3.6zM17 18.5a1.8 1.8 0 100-3.6 1.8 1.8 0 000 3.6z",
 delivered: "M4 12l5 5L20 6",
 cancelled: "M6 6l12 12M18 6L6 18",
 return_requested: "M4 9h11a5 5 0 010 10H9M8 5L4 9l4 4",
 returned: "M4 9h11a5 5 0 010 10H9M8 5L4 9l4 4",
 refunded: "M3 7h18v10H3zM12 15a3 3 0 100-6 3 3 0 000 6z",
};

const PAYMENT_LABEL: Record<string, string> = {
 cod: "Cash on delivery",
 cash_on_delivery: "Cash on delivery",
 corporate_credit: "Company credit",
 bkash: "bKash",
 nagad: "Nagad",
 card: "Card",
 sslcommerz: "Online payment",
 online: "Online payment",
};
const paymentLabel = (m?: string) =>
 !m ? "—" : PAYMENT_LABEL[m.toLowerCase()] ?? m.replace(/[_-]+/g, " ").replace(/^\w/, (c) => c.toUpperCase());

// In progress → "Track"; finished → "View"
const IN_PROGRESS = new Set(["pending", "confirmed", "processing", "ready_for_pickup", "shipped", "return_requested"]);

const Ico = ({ d }: { d: string }) => (
 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  <path d={d} />
 </svg>
);

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
   <span>Order</span>
   <span>Items</span>
   <span>Payment</span>
   <span>Total</span>
   <span>Status</span>
   <span />
  </Head>
 );
}

export default function OrderCard({ order, href }: { order: any; href: string }) {
 const buckets = buildStatusBuckets(order);
 const key = normalizeStatus(order.status);
 const activeTone = statusTone(order.status);
 const tracking = IN_PROGRESS.has(key);

 return (
  <Card href={href} $tone={activeTone}>
   <span className="oc-order">
    <span className="oc-icon">
     <Ico d={STATUS_ICON[key] ?? STATUS_ICON.processing} />
    </span>
    <span className="oc-id">
     <span className="oc-invoice">{order.invoice}</span>
     <span className="oc-date">{format(new Date(order.date), "MMM dd, yyyy")}</span>
    </span>
   </span>
   <span className="oc-cell oc-items">
    {order.item_count}
    <span className="oc-label"> {order.item_count === 1 ? "item" : "items"}</span>
   </span>
   <span className="oc-cell oc-pay">{paymentLabel(order.payment_method)}</span>
   <span className="oc-total">{currency(rowDisplayTotal(order))}</span>
   <span className="oc-status">
    {(buckets.length > 0 ? buckets : [{ label: statusLabel(order), count: order.item_count }]).map((bucket) => (
     <ToneChip
      key={bucket.label}
      $tone={bucket.label === "Cancel" ? "danger" : bucket.label === "Returned" ? "neutral" : activeTone}
     >
      <span className="oc-dot" aria-hidden="true" />
      {bucket.count} {bucket.label}
     </ToneChip>
    ))}
   </span>
   <span className={`oc-action${tracking ? " track" : ""}`}>
    {tracking ? "Track" : "View"}
    <Ico d="M5 12h14M13 6l6 6-6 6" />
   </span>
  </Card>
 );
}
