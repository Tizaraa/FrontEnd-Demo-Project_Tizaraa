"use client";

import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { currency } from "@utils/utils";

// Payment summary for one shop's part of an order: money lines, total, and
// payment method / status chips. Calculations are unchanged from before.

const formatStatus = (s?: string | null): string =>
 s
  ? s
     .split("_")
     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
     .join(" ")
  : "";

const rise = keyframes`
 from { opacity: 0; transform: translateY(8px); }
 to { opacity: 1; transform: none; }
`;
const lineIn = keyframes`
 from { opacity: 0; transform: translateX(-6px); }
 to { opacity: 1; transform: none; }
`;
const shine = keyframes`
 from { transform: translateX(-120%) skewX(-18deg); }
 to { transform: translateX(320%) skewX(-18deg); }
`;

// Counts a money value up once on mount (~700ms); instant for reduced motion
function useCountUp(target: number) {
 const [v, setV] = useState(target);
 useEffect(() => {
  if (!target || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
   setV(target);
   return;
  }
  let frame = 0;
  const start = performance.now();
  const tick = (now: number) => {
   const p = Math.min(1, (now - start) / 700);
   setV(target * (1 - Math.pow(1 - p, 3)));
   if (p < 1) frame = requestAnimationFrame(tick);
  };
  setV(0);
  frame = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(frame);
 }, [target]);
 return v;
}

const Card = styled.section`
 padding: 20px;
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: 18px;
 background: ${({ theme }) => theme.tz.color.paper};
 animation: ${rise} 460ms cubic-bezier(0.22, 1, 0.36, 1) both;

 /* clickable header: title on the left, total + chevron on the right */
 .ts-head {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
 }
 .ts-head.is-static {
  cursor: default;
 }
 .ts-head:not(.is-static) {
  margin: -8px;
  padding: 8px;
  border-radius: 14px;
  width: calc(100% + 16px);
  transition: background-color 160ms ease;
 }
 .ts-head:not(.is-static):hover {
  background: ${({ theme }) => theme.tz.color.mist};
 }
 .ts-head:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
  border-radius: 12px;
 }
 h3 {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .ts-peek {
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 15px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.emberDeep};
  font-variant-numeric: tabular-nums;
  opacity: 0;
  transform: translateX(6px);
  transition: opacity 220ms ease, transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 &.is-closed .ts-peek {
  opacity: 1;
  transform: none;
 }
 .ts-chev {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.mist};
  color: ${({ theme }) => theme.tz.color.inkSoft};
  transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1), background-color 160ms ease, color 160ms ease;
 }
 .ts-head:hover .ts-chev {
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 &.is-closed .ts-chev {
  transform: rotate(-180deg);
 }

 /* height animation without measuring: grid row 1fr <-> 0fr */
 .ts-collapse {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 360ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease;
 }
 &.is-closed .ts-collapse {
  grid-template-rows: 0fr;
  opacity: 0;
 }
 /* inner box reaches 10px past the card so the receipt notches aren't clipped */
 .ts-inner {
  min-height: 0;
  overflow: hidden;
  margin: 0 -30px;
  padding: 16px 30px 0;
 }

 h3 span {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 h3 svg {
  width: 16px;
  height: 16px;
 }

 .ts-lines > * {
  animation: ${lineIn} 360ms cubic-bezier(0.22, 1, 0.36, 1) both;
 }
 .ts-lines > *:nth-child(1) { animation-delay: 120ms; }
 .ts-lines > *:nth-child(2) { animation-delay: 180ms; }
 .ts-lines > *:nth-child(3) { animation-delay: 240ms; }
 .ts-lines > *:nth-child(4) { animation-delay: 300ms; }
 .ts-lines > *:nth-child(5) { animation-delay: 360ms; }

 .ts-save {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding: 9px 12px;
  overflow: hidden;
  border-radius: 12px;
  background: ${({ theme }) => theme.tz.tone.success.bg};
  color: ${({ theme }) => theme.tz.tone.success.fg};
  font-size: 13px;
  font-weight: 700;
 }
 .ts-save svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
 }
 .ts-save::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 30%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.7), transparent);
  animation: ${shine} 1.2s ease-out 600ms 1 both;
 }

 .ts-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 6px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }
 .ts-line > span:first-child {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  min-width: 0;
 }
 .ts-val {
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
 }
 .ts-line.is-minus .ts-val {
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .ts-line.is-good .ts-val {
  color: ${({ theme }) => theme.tz.tone.success.fg};
 }
 .ts-line.is-muted .ts-val {
  font-weight: 500;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .ts-badge {
  padding: 1px 7px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 800;
  background: ${({ theme }) => theme.tz.tone.success.bg};
  color: ${({ theme }) => theme.tz.tone.success.fg};
 }
 .ts-line.is-muted .ts-badge {
  background: ${({ theme }) => theme.tz.color.lineSoft};
  color: ${({ theme }) => theme.tz.color.slate};
 }

 /* receipt tear line with side notches */
 .ts-total {
  position: relative;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin: 12px -20px 0;
  padding: 16px 20px 0;
  border-top: 2px dashed ${({ theme }) => theme.tz.color.line};
 }
 .ts-total::before,
 .ts-total::after {
  content: "";
  position: absolute;
  top: -10px;
  width: 18px;
  height: 18px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.mist};
 }
 .ts-total::before {
  left: -10px;
 }
 .ts-total::after {
  right: -10px;
 }
 .ts-total span {
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .ts-total strong {
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 22px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.emberDeep};
  font-variant-numeric: tabular-nums;
 }

 /* header right: text toggle */
 .ts-more {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.emberDeep};
  background: ${({ theme }) => theme.tz.color.emberTint};
  white-space: nowrap;
  transition: background-color 160ms ease, color 160ms ease;
 }
 .ts-more svg {
  transform: rotate(180deg);
  transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 &.is-closed .ts-more svg {
  transform: none;
 }
 .ts-head:not(.is-static):hover .ts-more {
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
 }

 /* status strip: amount + paid/due + method, always visible */
 .ts-status {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 14px;
  padding: 12px 14px;
  border-radius: 14px;
  background: ${({ theme }) => theme.tz.color.mist};
 }
 .ts-status.is-paid {
  background: ${({ theme }) => theme.tz.tone.success.bg};
 }
 .ts-status.is-due {
  background: ${({ theme }) => theme.tz.tone.warning.bg};
 }
 .ts-status-icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.paper};
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }
 .ts-status.is-paid .ts-status-icon {
  background: ${({ theme }) => theme.tz.tone.success.fill};
  color: #fff;
 }
 .ts-status.is-due .ts-status-icon {
  background: ${({ theme }) => theme.tz.tone.warning.fill};
  color: #fff;
 }
 .ts-status-icon svg {
  width: 18px;
  height: 18px;
 }
 .ts-status-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
  margin-right: auto;
 }
 .ts-status-text small {
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }
 .ts-status.is-paid .ts-status-text small {
  color: ${({ theme }) => theme.tz.tone.success.fg};
 }
 .ts-status.is-due .ts-status-text small {
  color: ${({ theme }) => theme.tz.tone.warning.fg};
 }
 .ts-status-text strong {
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 20px;
  font-weight: 800;
  line-height: 1.2;
  color: ${({ theme }) => theme.tz.color.ink};
  font-variant-numeric: tabular-nums;
 }
 .ts-method {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.paper};
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.inkSoft};
  white-space: nowrap;
 }
 .ts-method svg {
  width: 14px;
  height: 14px;
 }

 .ts-line-icon {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .ts-line-label {
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
 }
 .ts-line-label small {
  font-size: 11.5px;
  color: ${({ theme }) => theme.tz.color.slate};
 }

 .ts-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
 }

 .ts-pay {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 16px;
 }
 .ts-pay > div {
  padding: 10px 12px;
  border-radius: 12px;
  background: ${({ theme }) => theme.tz.color.mist};
 }
 .ts-pay small {
  display: block;
  margin-bottom: 4px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .ts-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .ts-chip i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.slate};
 }
 .ts-chip.is-paid i {
  background: ${({ theme }) => theme.tz.tone.success.fill};
 }
 .ts-chip.is-due i {
  background: ${({ theme }) => theme.tz.tone.warning.fill};
 }

 @media (prefers-reduced-motion: reduce) {
  &,
  .ts-lines > *,
  .ts-save::after {
   animation: none;
  }
  .ts-collapse,
  .ts-peek,
  .ts-chev,
  .ts-more,
  .ts-more svg,
  .ts-head {
   transition: none;
  }
 }
`;

// One line of the money breakdown. Deductions carry the colour so what came off
// the order is what the eye lands on: green for discounts, red for cancelled /
// returned items.
const ICONS = {
 bag: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0",
 tag: "M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z",
 truck: "M1 3h15v13H1zM16 8h4l3 3v5h-7zM5.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM18.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
 x: "M18 6 6 18M6 6l12 12",
 undo: "M9 14 4 9l5-5M4 9h11a5 5 0 0 1 0 10h-3",
 cash: "M2 6h20v12H2zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 12h.01M18 12h.01",
 card: "M2 5h20v14H2zM2 10h20",
 building: "M4 21V3h11v18M15 9h5v12M8 7h3M8 11h3M8 15h3",
};

// Friendly names for stored payment method codes
function methodInfo(code?: string | null): { label: string; icon: string; cod: boolean } {
 const c = (code ?? "").toLowerCase();
 if (["cod", "cash_on_delivery", "cash"].includes(c)) return { label: "Cash on delivery", icon: ICONS.cash, cod: true };
 if (c === "corporate_credit") return { label: "Company credit", icon: ICONS.building, cod: false };
 if (c === "bkash") return { label: "bKash", icon: ICONS.card, cod: false };
 if (c === "nagad") return { label: "Nagad", icon: ICONS.card, cod: false };
 if (["sslcommerz", "online", "online_payment", "card"].includes(c)) return { label: "Online payment", icon: ICONS.card, cod: false };
 return { label: formatStatus(code) || "N/A", icon: ICONS.card, cod: false };
}

// One line of the money breakdown. Deductions carry the colour so what came off
// the order is what the eye lands on: green for discounts, red for cancelled /
// returned items.
const Line = ({
 label,
 sub,
 value,
 minus = false,
 tone,
 badge,
 icon,
}: {
 label: string;
 sub?: string;
 value: string;
 minus?: boolean;
 tone?: "good" | "muted";
 badge?: string;
 icon?: string;
}) => (
 <div className={`ts-line${minus ? " is-minus" : ""}${tone ? ` is-${tone}` : ""}`}>
  <span>
   {icon && (
    <svg className="ts-line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
     <path d={icon} />
    </svg>
   )}
   <span className="ts-line-label">
    {label}
    {sub && <small>{sub}</small>}
   </span>
   {badge && <span className="ts-badge">{badge}</span>}
  </span>
  <span className="ts-val">{minus ? `−${value}` : value}</span>
 </div>
);

interface Props {
 order: any;
 details: any;
 shopName: string;
}

export default function OrderTotalSummary({ order, details, shopName }: Props) {
 // Retail orders: starts folded, the header (with the total) opens it.
 // Corporate orders: always open, no toggle.
 const isCorporate = Boolean(order?.Order?.is_corporate) || order?.Order?.payment_method === "corporate_credit";
 const collapsible = !isCorporate;
 const [userOpen, setOpen] = useState(false);
 const open = collapsible ? userOpen : true;
 const bodyId = `ts-body-${String(shopName).replace(/\W+/g, "-")}`;

 const items: any[] = details?.order_items ?? [];

 // Subtotal at the original (pre-discount) price, then the discount — product
 // discounts plus any promo — then what shipping added, then the total those lines
 // add up to. The total itself is untouched: it is what was charged.
 const productDiscount = items.reduce((sum, item) => {
  const original = Number(item.original_price ?? item.price ?? 0);
  const paid = Number(item.price ?? 0);
  return sum + Math.max(original - paid, 0) * Number(item.quantity ?? 0);
 }, 0);
 const promoDiscount = Number(order?.Order?.discount_amount ?? 0);
 const totalDiscount = productDiscount + promoDiscount;
 const subtotal = Number(order?.Order?.original_subtotal ?? details?.sub_total ?? 0) + productDiscount;
 const discountPercent = subtotal > 0 ? (totalDiscount / subtotal) * 100 : 0;

 const cancelledCount = order?.Order?.cancelled_item_count ?? 0;
 const returnedCount = order?.Order?.returned_item_count ?? 0;

 const total = Number(details?.total || 0);
 const shownTotal = useCountUp(total);

 const payStatus = formatStatus(order?.Order?.payment_status) || "N/A";
 const isPaid = /^paid$/i.test(payStatus);
 const isDue = /unpaid|due|partial|pending/i.test(payStatus);
 const payTone = isPaid ? "is-paid" : isDue ? "is-due" : "";
 const method = methodInfo(order?.Order?.payment_method);
 const itemQty = items.reduce((n, it) => n + Number(it.quantity ?? 0), 0);

 return (
  <Card aria-label="Payment summary" className={open ? undefined : "is-closed"}>
   <div
    className={`ts-head${collapsible ? "" : " is-static"}`}
    role={collapsible ? "button" : undefined}
    tabIndex={collapsible ? 0 : undefined}
    aria-expanded={collapsible ? open : undefined}
    aria-controls={collapsible ? bodyId : undefined}
    onClick={collapsible ? () => setOpen((v) => !v) : undefined}
    onKeyDown={
     collapsible
      ? (e) => {
         if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen((v) => !v);
         }
        }
      : undefined
    }
   >
    <h3>
     <span aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
       <rect x="2" y="5" width="20" height="14" rx="2" />
       <path d="M2 10h20" />
      </svg>
     </span>
     Payment summary
    </h3>
    {collapsible && (
     <span className="ts-more">
      {open ? "Hide" : "View details"}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
       <path d="m6 9 6 6 6-6" />
      </svg>
     </span>
    )}
   </div>

   {/* The answer most people want first: how much, paid or not, and how */}
   <div className={`ts-status ${payTone}`}>
    <span className="ts-status-icon" aria-hidden="true">
     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d={isPaid ? "M20 6 9 17l-5-5" : isDue ? "M12 8v4l3 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" : method.icon} />
     </svg>
    </span>
    <div className="ts-status-text">
     <small>{isPaid ? "Paid" : isDue ? (method.cod ? "Pay on delivery" : "Payment due") : payStatus}</small>
     <strong aria-label={currency(total)}>{currency(shownTotal)}</strong>
    </div>
    <span className="ts-method">
     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={method.icon} />
     </svg>
     {method.label}
    </span>
   </div>

   <div className="ts-collapse" id={bodyId} aria-hidden={!open}>
   <div className="ts-inner">

   {totalDiscount > 0 && (
    <div className="ts-save">
     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" />
      <circle cx="7.5" cy="7.5" r="1" />
     </svg>
     You saved {currency(totalDiscount)} on this order
    </div>
   )}

   {/* re-keyed on open so the lines slide in again each time */}
   <div className="ts-lines" key={open ? "open" : "closed"}>
   <Line label={`Subtotal (${itemQty} ${itemQty === 1 ? "item" : "items"})`} value={currency(subtotal)} icon={ICONS.bag} />
   {/* Discount only when there is one; a zero line was noise */}
   {totalDiscount > 0 && (
    <Line
     minus
     tone="good"
     icon={ICONS.tag}
     label={promoDiscount > 0 && order?.Order?.promo_code ? `Discount (${order.Order.promo_code})` : "Discount"}
     badge={`${Math.round(discountPercent)}% OFF`}
     value={currency(totalDiscount)}
    />
   )}
   {cancelledCount > 0 && (
    <Line
     minus
     icon={ICONS.x}
     label={`${cancelledCount} ${cancelledCount === 1 ? "item" : "items"} cancelled`}
     value={currency(order?.Order?.cancelled_total || 0)}
    />
   )}
   {returnedCount > 0 && (
    <Line
     minus
     icon={ICONS.undo}
     label={`${returnedCount} ${returnedCount === 1 ? "item" : "items"} returned`}
     value={currency(order?.Order?.refunded_total || 0)}
    />
   )}
   <Line label="Shipping fee" sub={shopName} icon={ICONS.truck} value={currency(details?.delivery_charge || 0)} />
   </div>

   <div className="ts-total">
    <span>Total</span>
    <strong>{currency(total)}</strong>
   </div>

   <div className="ts-pay">
    <div>
     <small>Payment method</small>
     <span className="ts-chip">{method.label}</span>
    </div>
    <div>
     <small>Payment status</small>
     <span className={`ts-chip ${payTone}`}>
      <i aria-hidden="true" />
      {payStatus}
     </span>
    </div>
   </div>
   </div>
   </div>
  </Card>
 );
}
