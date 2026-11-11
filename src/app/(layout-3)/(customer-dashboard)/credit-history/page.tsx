"use client";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { differenceInCalendarDays, format } from "date-fns";
import * as XLSX from "xlsx";
import styled, { keyframes } from "styled-components";
import {
 FiAlertTriangle,
 FiCalendar,
 FiChevronDown,
 FiClock,
 FiDownload,
 FiFileText,
 FiGrid,
 FiRefreshCw,
 FiRotateCcw,
 FiShoppingBag,
 FiX,
 FiSliders,
 FiPackage,
 FiFlag,
} from "react-icons/fi";

import axios from "@lib/axiosClient";
import authService from "services/authService";
import Typography from "@component/Typography";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import EmptyOrders from "@sections/customer-dashboard/orders/EmptyOrders";
import Loader from "@component/loader";
import { currency } from "@utils/utils";

// ==============================================================
// Types — mirror the real API response shapes exactly (see
// CreditResource / CorporateOrderResource in tizaraa-customer-api)
// ==============================================================
type CurrentPeriod = {
 start: string;
 end: string;
 due_date: string;
 days_remaining: number;
 renews_on: string;
};

type CreditSummary = {
 credit_limit: number;
 credit_used: number;
 credit_available: number;
 // Delivered orders not yet settled by the employer's seller — drops to 0
 // the moment the seller marks the corresponding bill paid.
 due_amount: number;
 // Delivered orders the seller has already settled.
 paid_amount: number;
 // Gross delivered total: due_amount + paid_amount.
 total_due_amount: number;
 status: string;
 company_name: string | null;
 department: string | null;
 designation: string | null;
 credit_tier: string | null;
 billing_cycle: "weekly" | "bi_weekly" | "monthly" | string;
 current_period: CurrentPeriod;
 has_overdue_invoice: boolean;
 last_reset_at: string | null;
};

type CorporateOrderItem = {
 product_id: number | null;
 product_name: string;
 quantity: number;
 unit_price: number;
 total_price: number;
 return_status: "active" | "return_requested" | "returned" | string;
 returned_at: string | null;
 ready_for_pickup_at: string | null;
 pickup_confirmed_at: string | null;
};

type CorporateOrder = {
 id: number;
 order_number: string;
 order_status: string;
 payment_method: string;
 payment_status: string;
 subtotal: number;
 shipping_amount: number;
 total_amount: number;
 delivery_type: number;
 notes: string | null;
 created_at: string;
 ready_at: string | null;
 delivered_at: string | null;
 pickup_code: string | null;
 items: CorporateOrderItem[];
 pickup: {
  otp: string | null;
  otp_expires_at: string | null;
  otp_expired: boolean;
  location_name: string | null;
 } | null;
};

const CYCLE_LABEL: Record<string, string> = {
 weekly: "This Week's",
 bi_weekly: "This Fortnight's",
 monthly: "This Month's",
};

const STATUS_COLOR: Record<string, "primary" | "secondary" | "success" | "error" | "warning"> = {
 pending: "secondary",
 confirmed: "primary",
 processing: "primary",
 ready_for_pickup: "warning",
 shipped: "primary",
 delivered: "success",
 cancelled: "error",
 refunded: "error",
 return_requested: "warning",
 returned: "error",
};

const ORDER_STATUS_LABEL: Record<string, string> = {
 pending: "Pending",
 processing: "Processing",
 delivered: "Completed",
 cancelled: "Cancelled",
};

function fmtDateTime(value: string | null): string {
 if (!value) return "—";
 try {
  return format(new Date(value), "dd MMM yyyy, hh:mm a");
 } catch {
  return "—";
 }
}

function monthBounds(monthValue: string): { from: string; to: string } {
 const [y, m] = monthValue.split("-").map(Number);
 const from = new Date(y, m - 1, 1);
 const to = new Date(y, m, 0);
 const iso = (d: Date) => d.toISOString().slice(0, 10);
 return { from: iso(from), to: iso(to) };
}

// ==============================================================
// UI helpers (presentation only)
// ==============================================================
type Tone = "success" | "warning" | "danger" | "info" | "neutral";

// STATUS_COLOR (used by the PDF export) translated to theme tones
const STATUS_TONE: Record<string, Tone> = {
 primary: "info",
 secondary: "neutral",
 success: "success",
 warning: "warning",
 error: "danger",
};

const statusTone = (status: string): Tone => STATUS_TONE[STATUS_COLOR[status] ?? "primary"] ?? "neutral";

const CYCLE_NAME: Record<string, string> = {
 weekly: "Weekly cycle",
 bi_weekly: "Bi-weekly cycle",
 monthly: "Monthly cycle",
};

function cycleName(cycle: string | null | undefined): string {
 if (!cycle) return "Billing cycle";
 return CYCLE_NAME[cycle] ?? `${cycle.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase())} cycle`;
}

function fmtShort(value: string | null | undefined): string {
 if (!value) return "—";
 const d = new Date(value);
 return isNaN(d.getTime()) ? "—" : format(d, "d MMM");
}

function fmtMonth(value: string): string {
 const [y, m] = value.split("-").map(Number);
 if (!y || !m) return value;
 return format(new Date(y, m - 1, 1), "MMMM yyyy");
}

function num(v: unknown): number {
 const n = Number(v);
 return isFinite(n) ? n : 0;
}

// One of the six summary tiles (limit, used, remaining, due, paid, outstanding)
function StatTile({
 label,
 value,
 caption,
 tone,
 icon,
 index,
}: {
 label: string;
 value: number;
 caption: string;
 tone: "navy" | "info" | "success" | "warning" | "danger";
 icon: string;
 index: number;
}) {
 const shown = useCount(value);
 return (
  <div className={`ch-stat t-${tone}`} style={{ ["--d" as string]: index }}>
   <span className="ch-stat-icon" aria-hidden="true">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
     <path d={icon} />
    </svg>
   </span>
   <small>{label}</small>
   <b aria-label={currency(value)}>{currency(shown)}</b>
   <span className="ch-stat-cap">{caption}</span>
  </div>
 );
}

// Counts a number up from 0 once (~800ms). Instant under reduced motion.
function useCount(target: number) {
 const [v, setV] = useState(0);
 useEffect(() => {
  if (!target || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
   setV(target);
   return;
  }
  let f = 0;
  const t0 = performance.now();
  const tick = (now: number) => {
   const p = Math.min(1, (now - t0) / 800);
   setV(target * (1 - Math.pow(1 - p, 3)));
   if (p < 1) f = requestAnimationFrame(tick);
  };
  setV(0);
  f = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(f);
 }, [target]);
 return v;
}

const rise = keyframes`
 from { opacity: 0; transform: translateY(10px); }
 to { opacity: 1; transform: none; }
`;
const fadeIn = keyframes`
 from { opacity: 0; }
 to { opacity: 1; }
`;
const grow = keyframes`
 from { transform: scaleX(0); }
 to { transform: scaleX(1); }
`;
const shine = keyframes`
 from { transform: translateX(-120%) skewX(-20deg); }
 to { transform: translateX(380%) skewX(-20deg); }
`;
const menuIn = keyframes`
 from { opacity: 0; transform: translateY(-6px) scale(0.98); }
 to { opacity: 1; transform: none; }
`;
const spinKf = keyframes`
 to { transform: rotate(360deg); }
`;
const shimmer = keyframes`
 from { background-position: -400px 0; }
 to { background-position: 400px 0; }
`;

const Page = styled.div`
 display: flex;
 flex-direction: column;
 gap: 18px;
 color: ${({ theme }) => theme.tz.color.ink};

 .ch-rise {
  animation: ${rise} 460ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--d, 0) * 90ms);
 }

 /* header actions */
 .ch-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
 }
 .ch-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 40px;
  padding: 0 16px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 999px;
  background: #fff;
  color: ${({ theme }) => theme.tz.color.ink};
  font: inherit;
  font-size: 13.5px;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  transition: border-color 160ms ease, background-color 160ms ease, color 160ms ease, transform 160ms ease,
   box-shadow 160ms ease;
 }
 .ch-btn:hover {
  border-color: ${({ theme }) => theme.tz.color.ember};
  transform: translateY(-1px);
 }
 .ch-btn:active {
  transform: translateY(1px) scale(0.98);
 }
 .ch-btn:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
 .ch-btn--solid {
  border-color: ${({ theme }) => theme.tz.color.emberDeep};
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
 }
 .ch-btn--solid:hover {
  border-color: ${({ theme }) => theme.tz.color.emberDark};
  background: ${({ theme }) => theme.tz.color.emberDark};
  box-shadow: 0 6px 16px rgba(194, 64, 15, 0.25);
 }
 .ch-btn--solid:disabled {
  opacity: 0.6;
  cursor: progress;
  transform: none;
 }
 .ch-btn .ch-caret {
  transition: transform 200ms ease;
 }
 .ch-btn[aria-expanded="true"] .ch-caret {
  transform: rotate(180deg);
 }

 .ch-export {
  position: relative;
 }
 .ch-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  z-index: 20;
  min-width: 190px;
  padding: 6px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 14px;
  background: #fff;
  box-shadow: ${({ theme }) => theme.tz.elevation.overlay};
  transform-origin: top right;
  animation: ${menuIn} 180ms cubic-bezier(0.22, 1, 0.36, 1) both;
 }
 .ch-menu button {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 10px;
  background: none;
  color: ${({ theme }) => theme.tz.color.inkSoft};
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: background-color 120ms ease, color 120ms ease;
 }
 .ch-menu button:hover,
 .ch-menu button:focus-visible {
  outline: none;
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .ch-menu svg {
  flex-shrink: 0;
 }

 /* banners */
 .ch-banner {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.5;
 }
 .ch-banner svg {
  flex-shrink: 0;
  margin-top: 2px;
 }
 .ch-banner b {
  display: block;
  font-weight: 800;
 }
 .ch-banner--danger {
  border: 1px solid rgba(192, 38, 45, 0.18);
  background: ${({ theme }) => theme.tz.tone.danger.bg};
  color: ${({ theme }) => theme.tz.tone.danger.fg};
 }

 /* summary cards */
 .ch-summary {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
 }
 @media (max-width: 860px) {
  .ch-summary {
   grid-template-columns: 1fr;
  }
 }
 .ch-label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
 }
 .ch-amount {
  margin-top: 4px;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 34px;
  font-weight: 800;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
  overflow-wrap: anywhere;
 }
 .ch-top {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
 }
 .ch-bar {
  display: flex;
  height: 10px;
  margin: 18px 0 10px;
  overflow: hidden;
  border-radius: 999px;
 }
 .ch-bar i {
  display: block;
  height: 100%;
  transform-origin: left center;
  animation: ${grow} 900ms cubic-bezier(0.22, 1, 0.36, 1) 300ms both;
 }
 .ch-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 16px;
  font-size: 12.5px;
 }
 .ch-legend span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
 }
 .ch-legend i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
 }
 .ch-legend b {
  font-variant-numeric: tabular-nums;
 }
 .ch-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
  padding-top: 14px;
 }
 .ch-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 11px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 700;
  white-space: nowrap;
 }

 .ch-wallet {
  position: relative;
  overflow: hidden;
  padding: 22px 24px;
  border-radius: 22px;
  background: radial-gradient(120% 160% at 100% 0%, rgba(240, 80, 35, 0.35) 0%, transparent 50%),
   linear-gradient(135deg, ${({ theme }) => theme.tz.color.navy} 0%, #1b4a80 100%);
  color: #fff;
  box-shadow: 0 18px 40px rgba(14, 52, 96, 0.25);
 }
 .ch-wallet::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 30%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent);
  pointer-events: none;
  animation: ${shine} 1.6s ease-out 600ms 1 both;
 }
 .ch-wallet .ch-label {
  opacity: 0.75;
 }
 .ch-wallet .ch-bar {
  background: rgba(255, 255, 255, 0.16);
 }
 .ch-wallet .b-used {
  background: #f5b84a;
 }
 .ch-wallet .b-avail {
  background: #4fd18b;
 }
 .ch-wallet .ch-legend span {
  opacity: 0.92;
 }
 .ch-wallet .ch-chips {
  border-top: 1px dashed rgba(255, 255, 255, 0.22);
 }
 .ch-wallet .ch-chip {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
 }
 .ch-company {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 100%;
  padding: 5px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  font-size: 12.5px;
  font-weight: 700;
 }
 .ch-tier {
  display: inline-flex;
  margin-top: 8px;
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(240, 80, 35, 0.9);
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
 }

 .ch-card {
  padding: 22px 24px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 22px;
  background: ${({ theme }) => theme.tz.color.paper};
  box-shadow: ${({ theme }) => theme.tz.elevation.rest};
 }
 .ch-due .ch-label {
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .ch-due .ch-amount {
  color: ${({ theme }) => theme.tz.tone.danger.fg};
 }
 .ch-due .ch-bar {
  background: ${({ theme }) => theme.tz.color.lineSoft};
 }
 .ch-due .b-paid {
  background: ${({ theme }) => theme.tz.tone.success.fill};
 }
 .ch-due .ch-legend {
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .ch-due .ch-legend b {
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .ch-due .ch-chips {
  border-top: 1px dashed ${({ theme }) => theme.tz.color.line};
 }
 .ch-muted {
  margin-top: 6px;
  font-size: 13px;
  color: ${({ theme }) => theme.tz.color.slate};
 }

 .tone-success {
  background: ${({ theme }) => theme.tz.tone.success.bg};
  color: ${({ theme }) => theme.tz.tone.success.fg};
 }
 .tone-warning {
  background: ${({ theme }) => theme.tz.tone.warning.bg};
  color: ${({ theme }) => theme.tz.tone.warning.fg};
 }
 .tone-danger {
  background: ${({ theme }) => theme.tz.tone.danger.bg};
  color: ${({ theme }) => theme.tz.tone.danger.fg};
 }
 .tone-info {
  background: ${({ theme }) => theme.tz.tone.info.bg};
  color: ${({ theme }) => theme.tz.tone.info.fg};
 }
 .tone-neutral {
  background: ${({ theme }) => theme.tz.tone.neutral.bg};
  color: ${({ theme }) => theme.tz.tone.neutral.fg};
 }

 /* filters */
 /* six stat tiles */
 .ch-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
 }
 .ch-stat {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 18px 16px 20px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 18px;
  background: ${({ theme }) => theme.tz.color.paper};
  animation: ${rise} 440ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--d, 0) * 70ms + 200ms);
  transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 200ms ease, border-color 180ms ease;
 }
 .ch-stat::before {
  content: "";
  position: absolute;
  top: 14px;
  bottom: 14px;
  left: 0;
  width: 4px;
  border-radius: 0 4px 4px 0;
  background: var(--accent);
 }
 .ch-stat:hover {
  transform: translateY(-3px);
  border-color: var(--accent);
  box-shadow: 0 12px 26px rgba(14, 52, 96, 0.1);
 }
 .ch-stat-icon {
  position: absolute;
  top: 14px;
  right: 14px;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 11px;
  background: var(--soft);
  color: var(--accent);
  transition: transform 220ms ease;
 }
 .ch-stat:hover .ch-stat-icon {
  transform: scale(1.08) rotate(-4deg);
 }
 .ch-stat small {
  padding-right: 44px;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .ch-stat b {
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 22px;
  font-weight: 800;
  color: var(--ink, ${({ theme }) => theme.tz.color.ink});
  font-variant-numeric: tabular-nums;
 }
 .ch-stat-cap {
  font-size: 12.5px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .ch-stat.t-navy {
  --accent: ${({ theme }) => theme.tz.color.navy};
  --soft: ${({ theme }) => theme.tz.color.navyTint};
 }
 .ch-stat.t-info {
  --accent: ${({ theme }) => theme.tz.tone.info.fg};
  --soft: ${({ theme }) => theme.tz.tone.info.bg};
 }
 .ch-stat.t-success {
  --accent: ${({ theme }) => theme.tz.tone.success.fg};
  --soft: ${({ theme }) => theme.tz.tone.success.bg};
  --ink: ${({ theme }) => theme.tz.tone.success.fg};
 }
 .ch-stat.t-warning {
  --accent: ${({ theme }) => theme.tz.tone.warning.fill};
  --soft: ${({ theme }) => theme.tz.tone.warning.bg};
 }
 .ch-stat.t-danger {
  --accent: ${({ theme }) => theme.tz.tone.danger.fg};
  --soft: ${({ theme }) => theme.tz.tone.danger.bg};
  --ink: ${({ theme }) => theme.tz.tone.danger.fg};
 }
 @media (max-width: 960px) {
  .ch-stats {
   grid-template-columns: repeat(2, minmax(0, 1fr));
  }
 }
 @media (max-width: 520px) {
  .ch-stats {
   grid-template-columns: minmax(0, 1fr);
  }
 }
 @media (prefers-reduced-motion: reduce) {
  .ch-stat {
   animation: none;
   transition: none;
  }
  .ch-stat:hover {
   transform: none;
  }
  .ch-stat-icon {
   transition: none;
  }
 }

 .ch-filters {
  padding: 18px 20px;
 }
 .ch-fhead {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
 }
 .ch-fhead-icon {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .ch-fhead strong {
  display: block;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 15.5px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .ch-fhead small {
  font-size: 12.5px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 /* one tidy row: month | range | product | status | buttons */
 .ch-frow {
  display: grid;
  grid-template-columns: minmax(140px, 0.9fr) minmax(260px, 1.7fr) minmax(160px, 1.1fr);
  grid-template-areas:
   "month range product"
   "status status status"
   "btns btns btns";
  align-items: end;
  gap: 14px;
 }
 .f-month { grid-area: month; }
 .f-range { grid-area: range; }
 .f-product { grid-area: product; }
 .f-status { grid-area: status; }
 .ch-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
 }
 .ch-field > span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }
 .ch-field > span i {
  font-style: normal;
  font-weight: 500;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .ch-range {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 8px;
 }
 .ch-range em {
  font-style: normal;
  font-size: 14px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 /* input with a leading icon (and a caret for selects) */
 .ch-ctl {
  position: relative;
  display: block;
  min-width: 0;
 }
 .ch-ctl-icon {
  position: absolute;
  top: 50%;
  left: 12px;
  color: ${({ theme }) => theme.tz.color.slate};
  transform: translateY(-50%);
  pointer-events: none;
  transition: color 140ms ease;
 }
 .ch-ctl:focus-within .ch-ctl-icon {
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .ch-ctl-caret {
  position: absolute;
  top: 50%;
  right: 12px;
  color: ${({ theme }) => theme.tz.color.slate};
  transform: translateY(-50%);
  pointer-events: none;
  transition: transform 200ms ease;
 }
 .ch-ctl:focus-within .ch-ctl-caret {
  transform: translateY(-50%) rotate(180deg);
 }
 .ch-input {
  width: 100%;
  height: 44px;
  padding: 0 12px 0 36px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 12px;
  background: #fff;
  color: ${({ theme }) => theme.tz.color.ink};
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  outline: none;
  transition: border-color 140ms ease, box-shadow 140ms ease, background-color 140ms ease;
 }
 .ch-input::-webkit-calendar-picker-indicator {
  opacity: 0.55;
  cursor: pointer;
 }
 .ch-input:hover {
  border-color: #cfd4dd;
 }
 .ch-input:focus,
 .ch-input:focus-visible {
  outline: none;
  border-color: ${({ theme }) => theme.tz.color.ember};
  box-shadow: 0 0 0 4px rgba(240, 80, 35, 0.12);
 }
 select.ch-input {
  padding-right: 34px;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
 }

 /* status: segmented pills */
 .ch-seg {
  display: inline-flex;
  align-self: flex-start;
  max-width: 100%;
  overflow-x: auto;
  gap: 3px;
  height: 44px;
  padding: 4px;
  border-radius: 12px;
  background: ${({ theme }) => theme.tz.color.mist};
 }
 .ch-seg button {
  padding: 0 12px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: ${({ theme }) => theme.tz.color.slate};
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 180ms ease, color 180ms ease, box-shadow 180ms ease;
 }
 .ch-seg button:hover {
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .ch-seg button.is-on {
  background: #fff;
  color: ${({ theme }) => theme.tz.color.emberDeep};
  box-shadow: 0 2px 8px rgba(20, 21, 32, 0.08);
 }
 .ch-seg button:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 .f-status {
  flex-direction: row;
  align-items: center;
  gap: 12px;
 }
 .ch-fbtns {
  grid-area: btns;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 14px;
  border-top: 1px dashed ${({ theme }) => theme.tz.color.line};
 }
 .ch-fbtns .ch-btn {
  min-height: 42px;
 }
 .ch-btn--ghost {
  border-color: transparent !important;
  background: transparent !important;
  color: ${({ theme }) => theme.tz.color.slate} !important;
 }
 .ch-btn--ghost:hover {
  background: ${({ theme }) => theme.tz.color.mist} !important;
  color: ${({ theme }) => theme.tz.color.ink} !important;
 }
 .ch-btn--ghost svg {
  transition: transform 300ms ease;
 }
 .ch-btn--ghost:hover svg {
  transform: rotate(-200deg);
 }
 .ch-spin {
  animation: ${spinKf} 800ms linear infinite;
 }

 @media (max-width: 1100px) {
  .ch-frow {
   grid-template-columns: repeat(2, minmax(0, 1fr));
   grid-template-areas:
    "month product"
    "range range"
    "status status"
    "btns btns";
  }
  .ch-seg {
   overflow-x: auto;
  }
  .ch-seg button {
   flex: 1;
  }
 }
 @media (max-width: 600px) {
  .ch-frow {
   grid-template-columns: minmax(0, 1fr);
   grid-template-areas: "month" "range" "product" "status" "btns";
  }
  .ch-fbtns .ch-btn {
   flex: 1;
   justify-content: center;
  }
 }
 @media (prefers-reduced-motion: reduce) {
  .ch-ctl-icon,
  .ch-ctl-caret,
  .ch-seg button,
  .ch-btn--ghost svg {
   transition: none;
  }
  .ch-spin {
   animation: none;
  }
 }

 .ch-active {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
 }
 .ch-active > small {
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .ch-fchip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 100%;
  padding: 4px 6px 4px 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
  font-size: 12.5px;
  font-weight: 700;
 }
 .ch-fchip span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
 }
 .ch-fchip button {
  display: inline-grid;
  place-items: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(194, 64, 15, 0.12);
  color: inherit;
  cursor: pointer;
  transition: background-color 120ms ease;
 }
 .ch-fchip button:hover {
  background: rgba(194, 64, 15, 0.24);
 }
 .ch-fchip button:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
 @media (max-width: 720px) {
  .ch-field,
  .ch-range,
  select.ch-input {
   flex: 1 1 100%;
   max-width: none;
  }
  .ch-range .ch-input {
   flex: 1;
   min-width: 0;
  }
  .ch-input {
   width: 100%;
  }
  .ch-fbtns {
   width: 100%;
   margin-left: 0;
  }
  .ch-fbtns .ch-btn {
   flex: 1;
  }
 }
 /* small phones: two date inputs side by side get too narrow to read */
 @media (max-width: 420px) {
  .ch-range {
   grid-template-columns: minmax(0, 1fr);
   gap: 6px;
  }
 }

 /* tabs */
 .ch-tabs {
  position: relative;
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  padding: 4px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.mist};
  border: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
  margin-bottom: 16px;
  max-width: 100%;
 }
 .ch-tabs::before {
  content: "";
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  width: calc(50% - 4px);
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.ember};
  box-shadow: 0 4px 12px rgba(240, 80, 35, 0.3);
  transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 .ch-tabs[data-active="returned"]::before {
  transform: translateX(100%);
 }
 .ch-tab {
  position: relative;
  z-index: 1;
  min-height: 38px;
  padding: 0 18px;
  border: none;
  border-radius: 999px;
  background: none;
  color: ${({ theme }) => theme.tz.color.slate};
  font: inherit;
  font-size: 13.5px;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;
  transition: color 200ms ease;
 }
 .ch-tab[aria-selected="true"] {
  color: #fff;
 }
 .ch-tab:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 /* table */
 /* Horizontal scroll only; the page scrolls vertically. Very long lists
    (.is-long) get a capped height with a thin scrollbar instead. */
 .ch-scroll {
  overflow-x: auto;
  overflow-y: hidden;
  border: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
  border-radius: 14px;
  /* scroll hint: soft edge shadows appear only when there is more to scroll */
  background: linear-gradient(to right, #fff 30%, rgba(255, 255, 255, 0)) left center / 40px 100% no-repeat local,
   linear-gradient(to left, #fff 30%, rgba(255, 255, 255, 0)) right center / 40px 100% no-repeat local,
   radial-gradient(farthest-side at 0 50%, rgba(14, 52, 96, 0.16), transparent) left center / 14px 100% no-repeat scroll,
   radial-gradient(farthest-side at 100% 50%, rgba(14, 52, 96, 0.16), transparent) right center / 14px 100% no-repeat scroll;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.tz.color.line} transparent;
 }
 .ch-scroll.is-long {
  max-height: 640px;
  overflow-y: auto;
 }
 .ch-scroll::-webkit-scrollbar {
  width: 8px;
  height: 8px;
 }
 .ch-scroll::-webkit-scrollbar-track {
  background: transparent;
 }
 .ch-scroll::-webkit-scrollbar-thumb {
  border: 2px solid transparent;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.line} padding-box;
 }
 .ch-scroll::-webkit-scrollbar-thumb:hover {
  background: ${({ theme }) => theme.tz.color.slate} padding-box;
 }
 .ch-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 14px;
 }
 .ch-table th {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 12px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.tz.color.line};
  background: ${({ theme }) => theme.tz.color.mist};
  color: ${({ theme }) => theme.tz.color.slate};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-align: center;
  vertical-align: middle;
  text-transform: uppercase;
  white-space: nowrap;
 }
 .ch-table td {
  height: 54px;
  padding: 12px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
  color: ${({ theme }) => theme.tz.color.inkSoft};
  text-align: center;
  vertical-align: middle;
  font-variant-numeric: tabular-nums;
 }
 /* Product names are long free text: left-aligned for readability.
    Everything else (order #, qty, amount, date, status) is centered. */
 .ch-table th.is-left,
 .ch-table td.is-left {
  text-align: left;
 }
 .ch-table tbody tr:last-child td {
  border-bottom: none;
 }
 .ch-table tbody tr {
  animation: ${fadeIn} 360ms ease both;
  transition: background-color 120ms ease;
 }
 .ch-table tbody tr:hover {
  background: ${({ theme }) => theme.tz.color.mist};
 }
 .ch-table .num {
  text-align: center;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
 }
 .ch-table .ctr {
  text-align: center;
  font-variant-numeric: tabular-nums;
 }
 .ch-table .nowrap {
  white-space: nowrap;
 }
 .ch-table tfoot td {
  position: sticky;
  bottom: 0;
  border-top: 1px solid ${({ theme }) => theme.tz.color.line};
  border-bottom: none;
  background: #fff;
  color: ${({ theme }) => theme.tz.color.ink};
  font-weight: 800;
 }
 .ch-table tfoot td.ch-tlabel {
  text-align: left;
 }
 .ch-order {
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.ink};
  white-space: nowrap;
 }
 .ch-prod {
  color: ${({ theme }) => theme.tz.color.ink};
  font-weight: 600;
 }
 .ch-table td.ch-prod {
  min-width: 160px;
  max-width: 320px;
  white-space: normal;
  overflow-wrap: anywhere;
  line-height: 1.4;
 }
 .ch-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
 }
 .ch-pill i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
 }

 /* mobile row cards */
 .ch-cards {
  display: none;
  flex-direction: column;
  gap: 10px;
 }
 .ch-rcard {
  padding: 14px 16px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 16px;
  background: #fff;
  animation: ${fadeIn} 360ms ease both;
 }
 .ch-rcard-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
 }
 .ch-rcard dl {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 6px 14px;
  margin: 0;
  font-size: 13.5px;
 }
 .ch-rcard dt {
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .ch-rcard dd {
  margin: 0;
  text-align: right;
  color: ${({ theme }) => theme.tz.color.ink};
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  overflow-wrap: anywhere;
 }
 .ch-rtotal {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 14px;
  background: ${({ theme }) => theme.tz.color.mist};
  font-size: 14px;
  font-weight: 800;
 }
 @media (max-width: 720px) {
  .ch-scroll {
   display: none;
  }
  .ch-cards {
   display: flex;
  }
 }

 /* empty + loading */
 .ch-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 40px 16px;
  text-align: center;
 }
 .ch-empty-icon {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .ch-empty h3 {
  margin: 4px 0 0;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 18px;
  font-weight: 700;
 }
 .ch-empty p {
  margin: 0 0 6px;
  max-width: 380px;
  font-size: 14px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .ch-skel {
  display: flex;
  flex-direction: column;
  gap: 10px;
 }
 .ch-skel i {
  display: block;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(
   90deg,
   ${({ theme }) => theme.tz.color.mist} 0%,
   ${({ theme }) => theme.tz.color.lineSoft} 50%,
   ${({ theme }) => theme.tz.color.mist} 100%
  );
  background-size: 800px 100%;
  animation: ${shimmer} 1.2s linear infinite;
 }

 @media (max-width: 480px) {
  .ch-amount {
   font-size: 28px;
  }
  .ch-wallet,
  .ch-card {
   padding: 18px;
  }
  .ch-tabs {
   display: grid;
   width: 100%;
  }
  .ch-tab {
   padding: 0 10px;
   font-size: 13px;
  }
 }

 @media (prefers-reduced-motion: reduce) {
  .ch-rise,
  .ch-wallet::after,
  .ch-bar i,
  .ch-menu,
  .ch-table tbody tr,
  .ch-rcard,
  .ch-skel i {
   animation: none !important;
  }
  .ch-wallet::after {
   display: none;
  }
  .ch-btn,
  .ch-btn .ch-caret,
  .ch-tabs::before,
  .ch-tab,
  .ch-input {
   transition: none !important;
  }
  .ch-btn:hover,
  .ch-btn:active {
   transform: none;
  }
 }
`;


export default function CreditHistoryPage() {
 const router = useRouter();

 const [loading, setLoading] = useState(true);
 const [notCorporate, setNotCorporate] = useState(false);
 const [errorMessage, setErrorMessage] = useState<string | null>(null);
 const [shopSlug, setShopSlug] = useState<string | null>(null);
 const [employeeProfile, setEmployeeProfile] = useState<{ name: string | null; email: string | null }>({
  name: null,
  email: null,
 });

 const [credit, setCredit] = useState<CreditSummary | null>(null);

 // Section: current-month purchased products
 const currentMonthValue = format(new Date(), "yyyy-MM");
 const [purchaseMonth, setPurchaseMonth] = useState(currentMonthValue);
 const [purchaseDateFrom, setPurchaseDateFrom] = useState("");
 const [purchaseDateTo, setPurchaseDateTo] = useState("");
 const [productFilter, setProductFilter] = useState("all");
 const [statusFilter, setStatusFilter] = useState("all");
 const [purchaseOrders, setPurchaseOrders] = useState<CorporateOrder[]>([]);
 const [purchaseLoading, setPurchaseLoading] = useState(false);

 // Purchase History / Returned Products Log tabs
 const [activeProductTab, setActiveProductTab] = useState<"purchase" | "returned">("purchase");

 // Export dropdown (PDF / Excel) for the credit usage summary
 const [exportOpen, setExportOpen] = useState(false);
 const exportRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
   if (exportRef.current && !exportRef.current.contains(e.target as Node)) {
    setExportOpen(false);
   }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
 }, []);

 const fetchOrders = async (
  slug: string,
  from?: string,
  to?: string
 ): Promise<CorporateOrder[]> => {
  const params: Record<string, string | number> = { per_page: 100 };
  if (from) params.from = from;
  if (to) params.to = to;
  const res = await axios.get(`corporate/${slug}/orders`, { params });
  return res.data?.data ?? [];
 };

 // Initial load: profile -> shop_slug -> credit summary + this month's purchases
 useEffect(() => {
  const token = authService.getToken();
  if (!token) {
   router.push("/login");
   return;
  }

  (async () => {
   try {
    const profileRes = await axios.get(`user/profile`);
    const slug: string | null = profileRes.data?.profile?.shop_slug ?? null;
    setEmployeeProfile({
     name: profileRes.data?.profile?.name ?? null,
     email: profileRes.data?.profile?.email ?? null,
    });

    if (!slug) {
     setNotCorporate(true);
     setLoading(false);
     return;
    }

    setShopSlug(slug);

    const [creditRes] = await Promise.all([axios.get(`corporate/${slug}/credit`)]);
    setCredit(creditRes.data?.data ?? null);

    const { from, to } = monthBounds(currentMonthValue);
    const orders = await fetchOrders(slug, from, to);
    setPurchaseOrders(orders);
   } catch (err: any) {
    if (err?.response?.status === 403) {
     setNotCorporate(true);
    } else {
     setErrorMessage("Failed to load data. Please try again.");
     console.error("Failed to load credit history:", err);
    }
   } finally {
    setLoading(false);
   }
  })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 // Purchases only refetch when "Apply Filter" is clicked — not on every
 // keystroke/change of the month or date inputs.
 // An explicit date range (both fields set) takes priority over the month picker.
 const applyPurchaseFilter = () => {
  if (!shopSlug) return;
  setPurchaseLoading(true);
  const { from, to } =
   purchaseDateFrom && purchaseDateTo
    ? { from: purchaseDateFrom, to: purchaseDateTo }
    : monthBounds(purchaseMonth);
  fetchOrders(shopSlug, from, to)
   .then(setPurchaseOrders)
   .catch((err) => console.error("Failed to load purchases:", err))
   .finally(() => setPurchaseLoading(false));
 };

 const resetPurchaseFilter = () => {
  setPurchaseMonth(currentMonthValue);
  setPurchaseDateFrom("");
  setPurchaseDateTo("");
  setProductFilter("all");
  setStatusFilter("all");
  if (!shopSlug) return;
  setPurchaseLoading(true);
  const { from, to } = monthBounds(currentMonthValue);
  fetchOrders(shopSlug, from, to)
   .then(setPurchaseOrders)
   .catch((err) => console.error("Failed to load purchases:", err))
   .finally(() => setPurchaseLoading(false));
 };

 const exportCreditReportExcel = () => {
  if (!credit) return;

  const summaryRows = [
   ["Tizaraa Corporate Employee / Corporate Customer Management"],
   [],
   ["Company", credit.company_name ?? "—"],
   ["Department", credit.department ?? "—"],
   ["Designation", credit.designation ?? "—"],
   ["Credit Tier", credit.credit_tier ?? "—"],
   ["Billing Cycle", credit.billing_cycle ?? "—"],
   [],
   ["Total Credit Limit", credit.credit_limit],
   ["Used Credit", credit.credit_used],
   ["Remaining Credit", credit.credit_available],
   ["Due Amount", credit.total_due_amount],
   ["Paid Amount", credit.paid_amount],
   ["Outstanding Due Balance", credit.due_amount],
   ["Payment Due Date", credit.current_period?.due_date ?? "—"],
   ["Has Overdue Invoice", credit.has_overdue_invoice ? "Yes" : "No"],
   [],
   ["Current Period Start", credit.current_period?.start ?? "—"],
   ["Current Period End", credit.current_period?.end ?? "—"],
   ["Days Remaining", credit.current_period?.days_remaining ?? "—"],
   ["Renews On", credit.current_period?.renews_on ?? "—"],
   [],
   ["Report Generated", format(new Date(), "dd MMM yyyy, hh:mm a")],
  ];

  const purchaseRows = [
   ["Order ID", "Product Name", "Qty", "Credit Amount", "Order Date/Time", "Order Status"],
   ...purchaseItems.map(({ order, item }) => [
    `#${order.order_number}`,
    item.product_name.trim(),
    item.quantity,
    item.total_price,
    fmtDateTime(order.created_at),
    ORDER_STATUS_LABEL[order.order_status] ?? order.order_status,
   ]),
  ];

  const returnedRows = [
   ["Product", "Order #", "Qty", "Returned At"],
   ...returnedItems.map(({ order, item }) => [
    item.product_name.trim(),
    order.order_number,
    item.quantity,
    fmtDateTime(item.returned_at),
   ]),
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(summaryRows), "Due Payment Summary");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(purchaseRows), "Purchase History");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(returnedRows), "Returned Products");

  XLSX.writeFile(workbook, `due-payment-report-${format(new Date(), "yyyy-MM-dd")}.xlsx`);
  setExportOpen(false);
 };

 const exportCreditReportPdf = () => {
  if (!credit) return;
  const win = window.open("", "_blank");
  if (!win) return;

  const origin = window.location.origin;
  const logoUrl = `${origin}/assets/images/invoice/tizaraa-logo.png`;
  const watermarkUrl = `${origin}/assets/images/invoice/tizaraa-watermark.png`;
  const reportId = `DPR-${credit.company_name ? credit.company_name.slice(0, 3).toUpperCase() : "TZR"}-${format(new Date(), "yyyyMMdd")}`;

  const rowsHtml = purchaseItems
   .map(({ order, item }, idx) => {
    const statusColor = STATUS_COLOR[order.order_status] ?? "primary";
    return `
     <tr>
      <td>${idx + 1}</td>
      <td>#${order.order_number}</td>
      <td>${item.product_name.trim()}</td>
      <td class="center">${item.quantity}</td>
      <td>${fmtDateTime(order.created_at)}</td>
      <td class="center">
       <span class="chip chip-${statusColor}">${ORDER_STATUS_LABEL[order.order_status] ?? order.order_status}</span>
      </td>
      <td class="right">${currency(item.total_price)}</td>
     </tr>`;
   })
   .join("");

  win.document.write(`
   <html>
    <head>
     <title>Due Payment Report - ${credit.company_name ?? ""}</title>
     <style>
      * { box-sizing: border-box; }
      body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 32px; color: #1F2937; background: #fff; }
      .top { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; }
      .top .shop-name { font-size: 26px; font-weight: 800; color: #C2400F; margin: 0 0 6px 0; }
      .top .line { font-size: 13px; color: #374151; margin: 2px 0; }
      .top .logo-block { text-align: right; }
      .top .logo-block img { height: 42px; }
      .top .tagline { font-size: 10px; color: #6B7280; letter-spacing: 0.5px; margin-top: 4px; }
      .divider { border: none; border-top: 3px solid #C2400F; margin: 16px 0 20px 0; }
      .info-box {
       background: #F7F7F7; border-radius: 6px; padding: 16px 20px; display: flex;
       justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 20px;
      }
      .info-box .col p { font-size: 13px; margin: 4px 0; color: #374151; }
      .info-box .col p b { color: #111827; }
      .info-box .col.right { text-align: right; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
      th { background: #C2400F; color: #fff; font-size: 11px; text-transform: uppercase; letter-spacing: 0.3px; padding: 10px 12px; text-align: left; }
      td { padding: 10px 12px; font-size: 13px; border-bottom: 1px solid #EDEFF2; }
      td.center, th.center { text-align: center; }
      td.right, th.right { text-align: right; }
      .chip {
       display: inline-block; padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 600;
      }
      .chip-primary { background: #E3EAF7; color: #0E3460; }
      .chip-secondary { background: #EEF0F3; color: #4B566B; }
      .chip-success { background: #E3F6EC; color: #1FAE68; }
      .chip-warning { background: #FEF3E2; color: #D68910; }
      .chip-error { background: #FDEAEC; color: #C2400F; }
      .seller-total { text-align: right; font-size: 13px; font-weight: 700; margin: 10px 0 24px 0; }
      .table-wrap { position: relative; }
      .watermark {
       position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
       width: 720px; opacity: 0.15; pointer-events: none; z-index: 0;
      }
      .table-wrap table { position: relative; z-index: 1; }
      .totals-wrap { position: relative; display: flex; justify-content: flex-end; }
      .totals-box {
       position: relative; background: #F7F7F7; border-radius: 6px; padding: 16px 20px;
       min-width: 300px; z-index: 1;
      }
      .totals-box p { display: flex; justify-content: space-between; gap: 24px; font-size: 13px; margin: 6px 0; color: #374151; }
      .totals-box p span:first-child { white-space: nowrap; }
      .totals-box p.total { font-size: 15px; font-weight: 800; color: #C2400F; border-top: 1px solid #E2E5EA; padding-top: 8px; margin-top: 10px; }
      .footer-note { text-align: center; font-size: 12px; color: #374151; margin: 12px 0 4px 0; }
      .footer-note.muted { color: #6B7280; }
      hr.thin { border: none; border-top: 1px solid #E2E5EA; margin: 24px 0 16px 0; }
      .signature { display: flex; justify-content: flex-end; }
      .signature .box { width: 320px; border-top: 1px solid #9CA3AF; padding-top: 6px; text-align: center; }
      .signature .box b { font-size: 13px; }
      .signature .box p { font-size: 11px; color: #6B7280; margin: 4px 0 0 0; }
      @media print {
       th, .top .shop-name { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }
     </style>
    </head>
    <body>
     <div class="top">
      <div>
       <h1 class="shop-name">${credit.company_name ?? "Corporate Shop"}</h1>
       <p class="line">Report No : ${reportId}</p>
       <p class="line">Corporate Customer Management</p>
      </div>
      <div class="logo-block">
       <img src="${logoUrl}" alt="Tizaraa" />
       <div class="tagline">E-COMMERCE DREAMS BECOME REALITY</div>
      </div>
     </div>

     <hr class="divider" />

     <div class="info-box">
      <div class="col">
       <p><b>Name:</b> ${employeeProfile.name ?? "—"}</p>
       <p><b>Department:</b> ${credit.department ?? "—"}</p>
       <p><b>Designation:</b> ${credit.designation ?? "—"}</p>
       <p><b>Report Date:</b> ${format(new Date(), "dd MMMM, yyyy")}</p>
      </div>
      <div class="col right">
       <p><b>Order ID:</b> ${reportId}</p>
       <p><b>Email:</b> ${employeeProfile.email ?? "—"}</p>
       <p><b>Payment Due Date:</b> ${credit.current_period?.due_date ?? "—"}</p>
      </div>
     </div>

     <div class="table-wrap">
      <img class="watermark" src="${watermarkUrl}" alt="" />
      <table>
       <thead>
        <tr>
         <th>#</th>
         <th>Order ID</th>
         <th>Product Name</th>
         <th class="center">Qty</th>
         <th>Order Date/Time</th>
         <th class="center">Order Status</th>
         <th class="right">Amount</th>
        </tr>
       </thead>
       <tbody>${rowsHtml}</tbody>
      </table>
     </div>
     <div class="seller-total">Used Credit This Period: ${currency(credit.credit_used)}</div>

     <div class="totals-wrap">
      <div class="totals-box">
       <p><span>Total Credit Limit</span><span>${currency(credit.credit_limit)}</span></p>
       <p><span>Remaining Credit</span><span>${currency(credit.credit_available)}</span></p>
       <p><span>Due Amount</span><span>${currency(credit.total_due_amount)}</span></p>
       <p><span>Paid Amount</span><span>${currency(credit.paid_amount)}</span></p>
       <p class="total"><span>Outstanding Due Balance</span><span>${currency(credit.due_amount)}</span></p>
      </div>
     </div>

     <div class="footer-note">Thank you for shopping with Tizaraa</div>
     <div class="footer-note muted">For any query or support please email us at tizaraabd2023@gmail.com or contact our Hotline number +8801792223444.</div>

     <hr class="thin" />

     <div class="signature">
      <div class="box">
       <b>Received by</b>
       <p>Received the above items in good condition.</p>
       <p>For online invoices, no physical signature is required.</p>
      </div>
     </div>
    </body>
   </html>
  `);
  win.document.close();
  win.focus();
  win.print();
  setExportOpen(false);
 };

 const productOptions = useMemo(() => {
  const names = new Set<string>();
  purchaseOrders.forEach((order) => order.items.forEach((item) => names.add(item.product_name)));
  return Array.from(names).sort();
 }, [purchaseOrders]);

 const purchaseItems = useMemo(
  () =>
   purchaseOrders
    .flatMap((order) => order.items.map((item) => ({ order, item })))
    .filter(({ order, item }) => {
     if (statusFilter !== "all" && order.order_status !== statusFilter) return false;
     if (productFilter !== "all" && item.product_name !== productFilter) return false;
     return true;
    }),
  [purchaseOrders, statusFilter, productFilter]
 );

 // Returned Products Log shares the same Month/Date/Product filter bar as
 // Purchase History (Tab 1), so it reads from purchaseOrders too.
 const returnedItems = useMemo(
  () =>
   purchaseOrders.flatMap((order) =>
    order.items
     .filter((item) => item.return_status && item.return_status !== "active")
     .filter((item) => productFilter === "all" || item.product_name === productFilter)
     .map((item) => ({ order, item }))
   ),
  [purchaseOrders, productFilter]
 );

 // Count-up for the "Available to spend" figure (hook must run before early returns)
 const availableShown = useCount(num(credit?.credit_available));

 if (loading) {
  return (
   <Typography>
    <Loader />
   </Typography>
  );
 }

 if (notCorporate) {
  return (
   <Fragment>
    <DashboardPageHeader title="Credit & due payments" iconName="credit-card" />
    <EmptyOrders
     title="This feature is for corporate customers"
     message="Your account isn't linked to a corporate shop, so the Due Payment dashboard isn't available."
    />
   </Fragment>
  );
 }

 // ---------- presentation-only derived values ----------
 const limit = num(credit?.credit_limit);
 const used = num(credit?.credit_used);
 const available = num(credit?.credit_available);
 const barBase = Math.max(limit, used + available, 1);
 const usedPct = Math.min(100, (used / barBase) * 100);
 const availPct = Math.min(100 - usedPct, (available / barBase) * 100);

 const totalDue = num(credit?.total_due_amount);
 const paid = num(credit?.paid_amount);
 const paidPct = totalDue > 0 ? Math.min(100, (paid / totalDue) * 100) : 0;

 const period = credit?.current_period;
 let dueChip: { tone: Tone; text: string } | null = null;
 if (period?.due_date) {
  const d = new Date(period.due_date);
  if (!isNaN(d.getTime())) {
   const diff = differenceInCalendarDays(d, new Date());
   dueChip =
    diff > 0
     ? { tone: "warning", text: `Due in ${diff} day${diff === 1 ? "" : "s"}` }
     : diff === 0
      ? { tone: "warning", text: "Due today" }
      : { tone: "danger", text: `Overdue by ${-diff} day${diff === -1 ? "" : "s"}` };
  }
 }
 const daysLeft = period?.days_remaining;
 const renewText =
  typeof daysLeft === "number"
   ? `Renews in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`
   : period?.renews_on
    ? `Renews ${fmtShort(period.renews_on)}`
    : null;

 const purchaseTotal = purchaseItems.reduce((sum, { item }) => sum + num(item.total_price), 0);

 const STATUS_FILTER_LABEL: Record<string, string> = {
  pending: "Pending",
  processing: "Packed",
  delivered: "Delivered",
 };
 const hasRange = Boolean(purchaseDateFrom || purchaseDateTo);
 const activeFilters: { key: string; label: string; clear: () => void }[] = [];
 if (hasRange) {
  activeFilters.push({
   key: "range",
   label: `${purchaseDateFrom ? fmtShort(purchaseDateFrom) : "…"} – ${purchaseDateTo ? fmtShort(purchaseDateTo) : "…"}`,
   clear: () => {
    setPurchaseDateFrom("");
    setPurchaseDateTo("");
   },
  });
 } else if (purchaseMonth && purchaseMonth !== currentMonthValue) {
  activeFilters.push({
   key: "month",
   label: fmtMonth(purchaseMonth),
   clear: () => setPurchaseMonth(currentMonthValue),
  });
 }
 if (productFilter !== "all") {
  activeFilters.push({ key: "product", label: productFilter.trim(), clear: () => setProductFilter("all") });
 }
 if (statusFilter !== "all") {
  activeFilters.push({
   key: "status",
   label: STATUS_FILTER_LABEL[statusFilter] ?? statusFilter,
   clear: () => setStatusFilter("all"),
  });
 }

 const readable = (s: string) => (s || "—").replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());

 const statusPill = (status: string) => (
  <span className={`ch-pill tone-${statusTone(status)}`}>
   <i aria-hidden="true" />
   {ORDER_STATUS_LABEL[status] ?? readable(status)}
  </span>
 );

 const emptyState = (kind: "purchase" | "returned") => (
  <div className="ch-empty">
   <span className="ch-empty-icon" aria-hidden="true">
    {kind === "purchase" ? <FiShoppingBag size={26} /> : <FiRotateCcw size={26} />}
   </span>
   <h3>{kind === "purchase" ? "No purchases in this period" : "No returned products"}</h3>
   <p>
    {kind === "purchase"
     ? "No corporate orders match the selected month, date range, product, or status filter."
     : "No products were returned in the currently filtered period."}
   </p>
   <button type="button" className="ch-btn" onClick={resetPurchaseFilter}>
    <FiRefreshCw size={14} /> Reset filters
   </button>
  </div>
 );

 const skeleton = (
  <div className="ch-skel" aria-busy="true" aria-label="Loading">
   {[0, 1, 2, 3].map((n) => (
    <i key={n} />
   ))}
  </div>
 );

 return (
  <Fragment>
   <DashboardPageHeader
    title="Credit & due payments"
    iconName="credit-card"
    button={
     <Page as="div" style={{ display: "contents" }}>
      <div className="ch-actions">
       <Link href="/credit-history/transactions" className="ch-btn">
        <FiClock size={15} /> Transaction History
       </Link>
       {credit && (
        <div className="ch-export" ref={exportRef}>
         <button
          type="button"
          className="ch-btn ch-btn--solid"
          aria-haspopup="menu"
          aria-expanded={exportOpen}
          onClick={() => setExportOpen((prev) => !prev)}
         >
          <FiDownload size={15} /> Export
          <FiChevronDown size={15} className="ch-caret" />
         </button>
         {exportOpen && (
          <div className="ch-menu" role="menu">
           <button type="button" role="menuitem" onClick={exportCreditReportPdf}>
            <FiFileText size={16} /> PDF report
           </button>
           <button type="button" role="menuitem" onClick={exportCreditReportExcel}>
            <FiGrid size={16} /> Excel (.xlsx)
           </button>
          </div>
         )}
        </div>
       )}
      </div>
     </Page>
    }
   />

   <Page>
    {errorMessage && (
     <div className="ch-banner ch-banner--danger ch-rise" role="alert">
      <FiAlertTriangle size={18} />
      <div>{errorMessage}</div>
     </div>
    )}

    {credit?.has_overdue_invoice && (
     <div className="ch-banner ch-banner--danger ch-rise" role="alert">
      <FiAlertTriangle size={18} />
      <div>
       <b>Overdue invoice</b>
       You have an overdue invoice. Please settle your outstanding due to keep using company credit.
      </div>
     </div>
    )}

    {/* Summary: credit card + due card */}
    {credit && (
     <div className="ch-summary">
      <section className="ch-wallet ch-rise" style={{ ["--d" as string]: 0 }} aria-label="Company credit">
       <div className="ch-top">
        <div>
         <small className="ch-label">Available to spend</small>
         <div className="ch-amount">{currency(availableShown)}</div>
         {credit.credit_tier && <span className="ch-tier">{credit.credit_tier}</span>}
        </div>
        <span className="ch-company">{credit.company_name ?? "Corporate Shop"}</span>
       </div>

       <div
        className="ch-bar"
        role="img"
        aria-label={`Used ${currency(used)} of ${currency(limit)} limit`}
       >
        <i className="b-used" style={{ width: `${usedPct}%` }} />
        <i className="b-avail" style={{ width: `${availPct}%` }} />
       </div>
       <div className="ch-legend">
        <span>
         Limit <b>{currency(limit)}</b>
        </span>
        <span>
         <i style={{ background: "#f5b84a" }} /> Used <b>{currency(used)}</b>
        </span>
        <span>
         <i style={{ background: "#4fd18b" }} /> Available <b>{currency(available)}</b>
        </span>
       </div>

       <div className="ch-chips">
        <span className="ch-chip">
         {CYCLE_LABEL[credit.billing_cycle]
          ? `${CYCLE_LABEL[credit.billing_cycle]} cycle`
          : cycleName(credit.billing_cycle)}
        </span>
        {period?.start && period?.end && (
         <span className="ch-chip">
          <FiCalendar size={13} /> {fmtShort(period.start)} – {fmtShort(period.end)}
         </span>
        )}
        {renewText && (
         <span className="ch-chip">
          <FiRefreshCw size={13} /> {renewText}
         </span>
        )}
       </div>
      </section>

      <section className="ch-card ch-due ch-rise" style={{ ["--d" as string]: 1 }} aria-label="Outstanding due">
       <div className="ch-top">
        <div>
         <small className="ch-label">Outstanding due</small>
         <div className="ch-amount">{currency(num(credit.due_amount))}</div>
         {(credit.department || credit.designation) && (
          <div className="ch-muted">
           {[credit.department, credit.designation].filter(Boolean).join(" · ")}
          </div>
         )}
        </div>
        {dueChip && <span className={`ch-chip tone-${dueChip.tone}`}>{dueChip.text}</span>}
       </div>

       <div
        className="ch-bar"
        role="img"
        aria-label={`Paid ${currency(paid)} of ${currency(totalDue)} total due`}
       >
        <i className="b-paid" style={{ width: `${paidPct}%` }} />
       </div>
       <div className="ch-legend">
        <span>
         Total due <b>{currency(totalDue)}</b>
        </span>
        <span>
         Paid <b>{currency(paid)}</b>
        </span>
       </div>

       <div className="ch-chips">
        <span className="ch-chip tone-neutral">
         <FiCalendar size={13} /> Due by {period?.due_date ? fmtShort(period.due_date) : "—"}
        </span>
       </div>
      </section>
     </div>
    )}

    {/* All six numbers at a glance */}
    {credit && (
     <section className="ch-stats" aria-label="Credit summary">
      <StatTile index={0} tone="navy" label="Total credit limit" value={num(credit.credit_limit)} caption="Assigned limit" icon="M2 5h20v14H2zM2 10h20" />
      <StatTile index={1} tone="info" label="Used credit" value={num(credit.credit_used)} caption="This period's usage" icon="M3 3v18h18M7 15l4-4 3 3 5-6" />
      <StatTile index={2} tone="success" label="Remaining credit" value={num(credit.credit_available)} caption="Available balance" icon="M20 6 9 17l-5-5" />
      <StatTile index={3} tone="warning" label="Due amount" value={num(credit.total_due_amount)} caption="Total delivered (settled + unsettled)" icon="M12 8v4l3 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
      <StatTile index={4} tone="success" label="Paid amount" value={num(credit.paid_amount)} caption="Settled by seller" icon="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      <StatTile
       index={5}
       tone="danger"
       label="Outstanding due"
       value={num(credit.due_amount)}
       caption={period?.due_date ? `Due by ${fmtShort(period.due_date)}` : "Not yet due"}
       icon="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01"
      />
     </section>
    )}

    {/* Filters */}
    <section className="ch-card ch-filters ch-rise" style={{ ["--d" as string]: 2 }} aria-label="Filters">
     <div className="ch-fhead">
      <span className="ch-fhead-icon" aria-hidden="true">
       <FiSliders size={16} />
      </span>
      <div>
       <strong>Filter purchases</strong>
       <small>Pick a month, or a custom date range</small>
      </div>
     </div>

     <div className="ch-frow">
      <label className="ch-field f-month">
       <span>Month</span>
       <span className="ch-ctl">
        <FiCalendar size={15} className="ch-ctl-icon" aria-hidden="true" />
        <input
         className="ch-input"
         type="month"
         value={purchaseMonth}
         max={currentMonthValue}
         onChange={(e) => {
          setPurchaseMonth(e.target.value);
          setPurchaseDateFrom("");
          setPurchaseDateTo("");
         }}
        />
       </span>
      </label>

      <div className="ch-field f-range">
       <span>
        Date range <i>(overrides month)</i>
       </span>
       <div className="ch-range">
        <span className="ch-ctl">
         <FiCalendar size={15} className="ch-ctl-icon" aria-hidden="true" />
         <input
          className="ch-input"
          type="date"
          aria-label="From date"
          value={purchaseDateFrom}
          max={purchaseDateTo || undefined}
          onChange={(e) => setPurchaseDateFrom(e.target.value)}
         />
        </span>
        <em aria-hidden="true">→</em>
        <span className="ch-ctl">
         <FiCalendar size={15} className="ch-ctl-icon" aria-hidden="true" />
         <input
          className="ch-input"
          type="date"
          aria-label="To date"
          value={purchaseDateTo}
          min={purchaseDateFrom || undefined}
          onChange={(e) => setPurchaseDateTo(e.target.value)}
         />
        </span>
       </div>
      </div>

      <label className="ch-field f-product">
       <span>Product</span>
       <span className="ch-ctl ch-ctl--select">
        <FiPackage size={15} className="ch-ctl-icon" aria-hidden="true" />
        <select className="ch-input" value={productFilter} onChange={(e) => setProductFilter(e.target.value)}>
         <option value="all">All products</option>
         {productOptions.map((name) => (
          <option key={name} value={name}>
           {name}
          </option>
         ))}
        </select>
        <FiChevronDown size={15} className="ch-ctl-caret" aria-hidden="true" />
       </span>
      </label>

      <div className="ch-field f-status">
       <span>
        <FiFlag size={12} aria-hidden="true" /> Status
       </span>
       <div className="ch-seg" role="radiogroup" aria-label="Order status">
        {[
         { v: "all", l: "All" },
         { v: "pending", l: "Pending" },
         { v: "processing", l: "Packed" },
         { v: "delivered", l: "Delivered" },
        ].map((o) => (
         <button
          key={o.v}
          type="button"
          role="radio"
          aria-checked={statusFilter === o.v}
          className={statusFilter === o.v ? "is-on" : undefined}
          onClick={() => setStatusFilter(o.v)}
         >
          {o.l}
         </button>
        ))}
       </div>
      </div>

      <div className="ch-fbtns">
       <button type="button" className="ch-btn ch-btn--ghost" onClick={resetPurchaseFilter}>
        <FiRotateCcw size={14} />
        Reset
       </button>
       <button
        type="button"
        className="ch-btn ch-btn--solid"
        onClick={applyPurchaseFilter}
        disabled={purchaseLoading}
       >
        {purchaseLoading ? <FiRefreshCw size={14} className="ch-spin" /> : <FiSliders size={14} />}
        {purchaseLoading ? "Applying…" : "Apply filters"}
       </button>
      </div>
     </div>

     {activeFilters.length > 0 && (
      <div className="ch-active">
       <small>Filters:</small>
       {activeFilters.map((f) => (
        <span key={f.key} className="ch-fchip">
         <span>{f.label}</span>
         <button type="button" aria-label={`Clear ${f.key} filter`} onClick={f.clear}>
          <FiX size={12} />
         </button>
        </span>
       ))}
      </div>
     )}
    </section>

    {/* Purchases / Returned */}
    <section className="ch-card ch-rise" style={{ ["--d" as string]: 3 }} aria-label="Products">
     <div className="ch-tabs" role="tablist" data-active={activeProductTab}>
      <button
       type="button"
       role="tab"
       className="ch-tab"
       aria-selected={activeProductTab === "purchase"}
       onClick={() => setActiveProductTab("purchase")}
      >
       Purchases ({purchaseItems.length})
      </button>
      <button
       type="button"
       role="tab"
       className="ch-tab"
       aria-selected={activeProductTab === "returned"}
       onClick={() => setActiveProductTab("returned")}
      >
       Returned ({returnedItems.length})
      </button>
     </div>

     {purchaseLoading ? (
      skeleton
     ) : activeProductTab === "purchase" ? (
      purchaseItems.length === 0 ? (
       emptyState("purchase")
      ) : (
       <>
        <div className={`ch-scroll${purchaseItems.length > 12 ? " is-long" : ""}`}>
         <table className="ch-table">
          <thead>
           <tr>
            <th className="is-left">Order</th>
            <th className="is-left">Product</th>
            <th className="ctr">Qty</th>
            <th className="num">Amount</th>
            <th>Date</th>
            <th>Status</th>
           </tr>
          </thead>
          <tbody>
           {purchaseItems.map(({ order, item }, idx) => (
            <tr key={`${order.id}-${item.product_id}-${idx}`}>
             <td className="ch-order is-left">#{order.order_number}</td>
             <td className="ch-prod is-left">{item.product_name.trim()}</td>
             <td className="ctr">{item.quantity}</td>
             <td className="num">{currency(item.total_price)}</td>
             <td className="nowrap">{fmtDateTime(order.created_at)}</td>
             <td>{statusPill(order.order_status)}</td>
            </tr>
           ))}
          </tbody>
          <tfoot>
           <tr>
            <td className="ch-tlabel" colSpan={3}>Total for this period</td>
            <td className="num">{currency(purchaseTotal)}</td>
            <td colSpan={2} />
           </tr>
          </tfoot>
         </table>
        </div>

        <div className="ch-cards">
         {purchaseItems.map(({ order, item }, idx) => (
          <article className="ch-rcard" key={`${order.id}-${item.product_id}-m-${idx}`}>
           <div className="ch-rcard-head">
            <span className="ch-order">#{order.order_number}</span>
            {statusPill(order.order_status)}
           </div>
           <dl>
            <dt>Product</dt>
            <dd>{item.product_name.trim()}</dd>
            <dt>Qty</dt>
            <dd>{item.quantity}</dd>
            <dt>Amount</dt>
            <dd>{currency(item.total_price)}</dd>
            <dt>Date</dt>
            <dd>{fmtDateTime(order.created_at)}</dd>
           </dl>
          </article>
         ))}
         <div className="ch-rtotal">
          <span>Total for this period</span>
          <span>{currency(purchaseTotal)}</span>
         </div>
        </div>
       </>
      )
     ) : returnedItems.length === 0 ? (
      emptyState("returned")
     ) : (
      <>
       <div className={`ch-scroll${returnedItems.length > 12 ? " is-long" : ""}`}>
        <table className="ch-table">
         <thead>
          <tr>
           <th className="is-left">Product</th>
           <th className="is-left">Order #</th>
           <th className="ctr">Qty</th>
           <th>Returned at</th>
          </tr>
         </thead>
         <tbody>
          {returnedItems.map(({ order, item }, idx) => (
           <tr key={`${order.id}-${item.product_id}-return-${idx}`}>
            <td className="ch-prod is-left">{item.product_name.trim()}</td>
            <td className="ch-order is-left">#{order.order_number}</td>
            <td className="ctr">{item.quantity}</td>
            <td className="nowrap">{fmtDateTime(item.returned_at)}</td>
           </tr>
          ))}
         </tbody>
        </table>
       </div>

       <div className="ch-cards">
        {returnedItems.map(({ order, item }, idx) => (
         <article className="ch-rcard" key={`${order.id}-${item.product_id}-rm-${idx}`}>
          <div className="ch-rcard-head">
           <span className="ch-prod">{item.product_name.trim()}</span>
          </div>
          <dl>
           <dt>Order #</dt>
           <dd>#{order.order_number}</dd>
           <dt>Qty</dt>
           <dd>{item.quantity}</dd>
           <dt>Returned at</dt>
           <dd>{fmtDateTime(item.returned_at)}</dd>
          </dl>
         </article>
        ))}
       </div>
      </>
     )}
    </section>
   </Page>
  </Fragment>
 );
}
