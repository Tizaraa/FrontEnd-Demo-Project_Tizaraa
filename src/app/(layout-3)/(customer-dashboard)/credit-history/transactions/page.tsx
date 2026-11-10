"use client";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";

import axios from "@lib/axiosClient";
import authService from "services/authService";
import Box from "@component/Box";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Hidden from "@component/hidden";
import TableRow from "@component/TableRow";
import { Chip } from "@component/Chip";
import Typography, { H5, Small } from "@component/Typography";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import EmptyOrders from "@sections/customer-dashboard/orders/EmptyOrders";
import Loader from "@component/loader";
import { currency } from "@utils/utils";
import { FiArrowLeft } from "react-icons/fi";
import styled, { keyframes } from "styled-components";

const rise = keyframes`
 from { opacity: 0; transform: translateY(10px); }
 to { opacity: 1; transform: none; }
`;
const shimmer = keyframes`
 from { background-position: -600px 0; }
 to { background-position: 600px 0; }
`;

// Transaction history: summary tiles, filter row with status tabs, a list of
// orders that expand to show their items.
const Tx = styled.div`
 .tx-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 40px;
  padding: 0 16px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 999px;
  background: #fff;
  color: ${({ theme }) => theme.tz.color.ink};
  font-size: 13.5px;
  font-weight: 700;
  text-decoration: none;
  transition: border-color 160ms ease, transform 160ms ease;
 }
 .tx-back:hover {
  border-color: ${({ theme }) => theme.tz.color.ember};
  transform: translateX(-2px);
 }
 .tx-banner {
  margin-bottom: 16px;
  padding: 12px 16px;
  border-radius: 14px;
  background: ${({ theme }) => theme.tz.tone.danger.bg};
  color: ${({ theme }) => theme.tz.tone.danger.fg};
  font-weight: 600;
 }

 .tx-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 16px;
 }
 .tx-stat {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 14px 16px 14px 18px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 16px;
  background: #fff;
  animation: ${rise} 420ms cubic-bezier(0.22, 1, 0.36, 1) backwards;
  animation-delay: calc(var(--d, 0) * 70ms);
  transition: transform 200ms ease, box-shadow 200ms ease;
 }
 .tx-stat::before {
  content: "";
  position: absolute;
  top: 12px;
  bottom: 12px;
  left: 0;
  width: 4px;
  border-radius: 0 4px 4px 0;
  background: var(--c);
 }
 .tx-stat:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(14, 52, 96, 0.08);
 }
 .tx-stat small {
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .tx-stat b {
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 22px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.ink};
  font-variant-numeric: tabular-nums;
 }
 .tx-stat span {
  font-size: 12px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .t-brand { --c: ${({ theme }) => theme.tz.color.emberDeep}; --s: ${({ theme }) => theme.tz.color.emberTint}; }
 .t-success { --c: ${({ theme }) => theme.tz.tone.success.fg}; --s: ${({ theme }) => theme.tz.tone.success.bg}; }
 .t-danger { --c: ${({ theme }) => theme.tz.tone.danger.fg}; --s: ${({ theme }) => theme.tz.tone.danger.bg}; }
 .t-warning { --c: ${({ theme }) => theme.tz.tone.warning.fg}; --s: ${({ theme }) => theme.tz.tone.warning.bg}; }
 .t-neutral { --c: ${({ theme }) => theme.tz.color.slate}; --s: ${({ theme }) => theme.tz.color.lineSoft}; }

 .tx-card {
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 20px;
  background: #fff;
  animation: ${rise} 440ms cubic-bezier(0.22, 1, 0.36, 1) 150ms backwards;
 }
 .tx-filters {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
 }
 .tx-range {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 10px;
 }
 .tx-range label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 11.5px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .tx-range input {
  min-height: 40px;
  padding: 0 10px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 12px;
  font-family: inherit;
  font-size: 13.5px;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .tx-range input:focus {
  outline: none;
  border-color: ${({ theme }) => theme.tz.color.ember};
  box-shadow: 0 0 0 4px rgba(240, 80, 35, 0.12);
 }
 .tx-apply {
  min-height: 40px;
  padding: 0 18px;
  border: 0;
  border-radius: 12px;
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 800;
  cursor: pointer;
  transition: transform 150ms ease, background-color 150ms ease;
 }
 .tx-apply:hover:enabled {
  background: ${({ theme }) => theme.tz.color.emberDark};
  transform: translateY(-1px);
 }
 .tx-apply:active:enabled {
  transform: scale(0.97);
 }
 .tx-apply:disabled {
  opacity: 0.6;
  cursor: wait;
 }
 .tx-tabs {
  display: flex;
  gap: 4px;
  padding: 4px;
  border-radius: 12px;
  background: ${({ theme }) => theme.tz.color.mist};
 }
 .tx-tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 34px;
  padding: 0 12px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: ${({ theme }) => theme.tz.color.slate};
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 180ms ease, color 180ms ease, box-shadow 180ms ease;
 }
 .tx-tab em {
  min-width: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.lineSoft};
  font-size: 11px;
  font-style: normal;
  line-height: 18px;
 }
 .tx-tab.is-on {
  background: #fff;
  color: ${({ theme }) => theme.tz.color.emberDeep};
  box-shadow: 0 2px 8px rgba(20, 21, 32, 0.08);
 }
 .tx-tab.is-on em {
  background: ${({ theme }) => theme.tz.color.emberTint};
 }

 .tx-head,
 .tx-main {
  display: grid;
  grid-template-columns: minmax(150px, 1.3fr) minmax(170px, 1.4fr) 70px minmax(110px, 1fr) 120px 28px;
  align-items: center;
  gap: 10px;
 }
 .tx-head {
  padding: 8px 14px;
  border-radius: 10px;
  background: ${({ theme }) => theme.tz.color.mist};
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .c { text-align: center; }
 .r { text-align: right; }
 .tx-list {
  margin: 6px 0 0;
  padding: 0;
  list-style: none;
 }
 .tx-row {
  border-bottom: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
  animation: ${rise} 360ms cubic-bezier(0.22, 1, 0.36, 1) backwards;
  animation-delay: calc(var(--i, 0) * 40ms + 100ms);
 }
 .tx-main {
  width: 100%;
  padding: 14px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
  color: ${({ theme }) => theme.tz.color.inkSoft};
  text-align: left;
  cursor: pointer;
  transition: background-color 150ms ease;
 }
 .tx-main:hover,
 .tx-row.is-open .tx-main {
  background: ${({ theme }) => theme.tz.color.mist};
 }
 .tx-main:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
 .tx-order {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
 }
 .tx-order b {
  overflow: hidden;
  color: ${({ theme }) => theme.tz.color.ink};
  text-overflow: ellipsis;
  white-space: nowrap;
 }
 .tx-dot {
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--c);
 }
 .tx-amt {
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.ink};
  font-variant-numeric: tabular-nums;
 }
 .tx-amt.is-void {
  color: ${({ theme }) => theme.tz.color.slate};
  text-decoration: line-through;
  font-weight: 600;
 }
 .tx-pill {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  background: var(--s);
  color: var(--c);
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
 }
 .tx-chev {
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.tz.color.slate};
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 .tx-row.is-open .tx-chev {
  transform: rotate(180deg);
 }
 .tx-more {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 280ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 .tx-row.is-open .tx-more {
  grid-template-rows: 1fr;
 }
 .tx-more > div {
  min-height: 0;
  overflow: hidden;
 }
 .tx-items {
  margin: 4px 14px 8px 30px;
  padding: 10px 14px;
  list-style: none;
  border-left: 3px solid ${({ theme }) => theme.tz.color.ember};
  border-radius: 0 12px 12px 0;
  background: ${({ theme }) => theme.tz.color.mist};
 }
 .tx-items li {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 60px 110px;
  gap: 10px;
  padding: 5px 0;
  font-size: 13.5px;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }
 .tx-items .q {
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .tx-open {
  display: inline-block;
  margin: 0 0 12px 30px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.emberDeep};
  text-decoration: none;
 }
 .tx-open:hover {
  text-decoration: underline;
 }
 .tx-foot {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 10px;
  padding: 12px 14px 0;
  border-top: 2px dashed ${({ theme }) => theme.tz.color.line};
  font-size: 13px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .tx-foot b {
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 17px;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .tx-skel {
  height: 54px;
  margin-bottom: 8px;
  border-radius: 12px;
  background: linear-gradient(90deg, ${({ theme }) => theme.tz.color.mist} 0%, ${({ theme }) => theme.tz.color.lineSoft} 50%, ${({ theme }) => theme.tz.color.mist} 100%);
  background-size: 1200px 100%;
  animation: ${shimmer} 1.3s linear infinite;
 }

 @media (max-width: 900px) {
  .tx-stats {
   grid-template-columns: repeat(2, minmax(0, 1fr));
  }
 }
 @media (max-width: 720px) {
  .tx-head {
   display: none;
  }
  .tx-main {
   grid-template-columns: 1fr 1fr;
   gap: 6px 10px;
  }
  .tx-main > [data-label]::before {
   content: attr(data-label);
   display: block;
   font-size: 11px;
   font-weight: 700;
   color: ${({ theme }) => theme.tz.color.slate};
  }
  .tx-order {
   grid-column: 1 / -1;
  }
  .c,
  .r {
   text-align: left;
  }
  .tx-chev {
   display: none;
  }
  .tx-items {
   margin-left: 14px;
  }
  .tx-open {
   margin-left: 14px;
  }
 }

 @media (prefers-reduced-motion: reduce) {
  .tx-stat,
  .tx-card,
  .tx-row,
  .tx-skel {
   animation: none;
  }
  .tx-back,
  .tx-stat,
  .tx-apply,
  .tx-tab,
  .tx-main,
  .tx-chev,
  .tx-more {
   transition: none;
  }
 }
`;

// ==============================================================
// Types — mirror the real API response shape exactly (see
// CorporateOrderResource in tizaraa-customer-api)
// ==============================================================
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

function fmtDateTime(value: string | null): string {
 if (!value) return "—";
 try {
  return format(new Date(value), "dd MMM yyyy, hh:mm a");
 } catch {
  return "—";
 }
}

export default function TransactionHistoryPage() {
 const router = useRouter();

 const [loading, setLoading] = useState(true);
 const [notCorporate, setNotCorporate] = useState(false);
 const [errorMessage, setErrorMessage] = useState<string | null>(null);
 const [shopSlug, setShopSlug] = useState<string | null>(null);

 const [historyFrom, setHistoryFrom] = useState("");
 const [historyTo, setHistoryTo] = useState("");
 const [historyOrders, setHistoryOrders] = useState<CorporateOrder[]>([]);
 const [historyLoading, setHistoryLoading] = useState(false);

 const VISIBLE_STATUSES = ["delivered", "cancelled", "returned"];

 const fetchOrders = async (
  slug: string,
  from?: string,
  to?: string
 ): Promise<CorporateOrder[]> => {
  const params: Record<string, string | number> = { per_page: 100 };
  if (from) params.from = from;
  if (to) params.to = to;
  const res = await axios.get(`corporate/${slug}/orders`, { params });
  const orders: CorporateOrder[] = res.data?.data ?? [];
  return orders.filter((order) => VISIBLE_STATUSES.includes(order.order_status));
 };

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

    if (!slug) {
     setNotCorporate(true);
     setLoading(false);
     return;
    }

    setShopSlug(slug);
    const orders = await fetchOrders(slug);
    setHistoryOrders(orders);
   } catch (err: any) {
    if (err?.response?.status === 403) {
     setNotCorporate(true);
    } else {
     setErrorMessage("Failed to load data. Please try again.");
     console.error("Failed to load transaction history:", err);
    }
   } finally {
    setLoading(false);
   }
  })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 const applyHistoryFilter = () => {
  if (!shopSlug) return;
  setHistoryLoading(true);

  const from = historyFrom || undefined;
  const to = historyTo || undefined;

  fetchOrders(shopSlug, from, to)
   .then(setHistoryOrders)
   .catch((err) => console.error("Failed to load history:", err))
   .finally(() => setHistoryLoading(false));
 };

 const [statusTab, setStatusTab] = useState<"all" | "delivered" | "cancelled" | "returned">("all");
 const [openId, setOpenId] = useState<number | null>(null);

 const counts = {
  all: historyOrders.length,
  delivered: historyOrders.filter((o) => o.order_status === "delivered").length,
  cancelled: historyOrders.filter((o) => o.order_status === "cancelled").length,
  returned: historyOrders.filter((o) => o.order_status === "returned").length,
 };
 const creditUsed = historyOrders
  .filter((o) => o.order_status === "delivered")
  .reduce((sum, o) => sum + Number(o.total_amount || 0), 0);
 const shown = statusTab === "all" ? historyOrders : historyOrders.filter((o) => o.order_status === statusTab);
 const shownTotal = shown.reduce((sum, o) => sum + Number(o.total_amount || 0), 0);
 const tone = (st: string) =>
  st === "delivered" ? "success" : st === "cancelled" ? "danger" : st === "returned" ? "warning" : "neutral";
 const label = (st: string) => (st ? st.charAt(0).toUpperCase() + st.slice(1).replace(/_/g, " ") : "—");

 const backButton = (
  <Link href="/credit-history" className="tx-back">
   <FiArrowLeft size={15} />
   Back to credit
  </Link>
 );

 if (loading) {
  return (
   <Tx>
    <DashboardPageHeader title="Transaction history" iconName="credit-card" button={backButton} />
    <div className="tx-card">
     {[0, 1, 2, 3].map((i) => (
      <div key={i} className="tx-skel" />
     ))}
    </div>
   </Tx>
  );
 }

 if (notCorporate) {
  return (
   <Tx>
    <DashboardPageHeader title="Transaction history" iconName="credit-card" button={backButton} />
    <EmptyOrders
     title="This feature is for corporate customers"
     message="Your account isn't linked to a corporate shop, so the Transaction History dashboard isn't available."
    />
   </Tx>
  );
 }

 return (
  <Tx>
   <DashboardPageHeader
    title="Transaction history"
    subtitle="Every company-credit order: delivered, cancelled and returned"
    iconName="credit-card"
    button={backButton}
   />

   {errorMessage && (
    <div className="tx-banner" role="alert">
     {errorMessage}
    </div>
   )}

   {/* summary */}
   <div className="tx-stats">
    <div className="tx-stat t-brand" style={{ ["--d" as string]: 0 }}>
     <small>Credit used</small>
     <b>{currency(creditUsed)}</b>
     <span>on delivered orders</span>
    </div>
    <div className="tx-stat t-success" style={{ ["--d" as string]: 1 }}>
     <small>Delivered</small>
     <b>{counts.delivered}</b>
     <span>order{counts.delivered === 1 ? "" : "s"}</span>
    </div>
    <div className="tx-stat t-danger" style={{ ["--d" as string]: 2 }}>
     <small>Cancelled</small>
     <b>{counts.cancelled}</b>
     <span>no credit charged</span>
    </div>
    <div className="tx-stat t-warning" style={{ ["--d" as string]: 3 }}>
     <small>Returned</small>
     <b>{counts.returned}</b>
     <span>credit given back</span>
    </div>
   </div>

   <section className="tx-card">
    {/* filters */}
    <div className="tx-filters">
     <div className="tx-range">
      <label>
       <span>From</span>
       <input type="date" value={historyFrom} onChange={(e) => setHistoryFrom(e.target.value)} />
      </label>
      <label>
       <span>To</span>
       <input type="date" value={historyTo} onChange={(e) => setHistoryTo(e.target.value)} />
      </label>
      <button type="button" className="tx-apply" onClick={applyHistoryFilter} disabled={historyLoading}>
       {historyLoading ? "Loading…" : "Apply"}
      </button>
     </div>
     <div className="tx-tabs" role="tablist" aria-label="Status">
      {(["all", "delivered", "cancelled", "returned"] as const).map((k) => (
       <button
        key={k}
        type="button"
        role="tab"
        aria-selected={statusTab === k}
        className={`tx-tab${statusTab === k ? " is-on" : ""}`}
        onClick={() => setStatusTab(k)}
       >
        {k === "all" ? "All" : label(k)}
        <em>{counts[k]}</em>
       </button>
      ))}
     </div>
    </div>

    {historyLoading ? (
     <div>
      {[0, 1, 2, 3].map((i) => (
       <div key={i} className="tx-skel" />
      ))}
     </div>
    ) : shown.length === 0 ? (
     <EmptyOrders
      title="No transactions found"
      message="No orders were found in the selected period."
      actionLabel="Continue Shopping"
      actionHref={shopSlug ? `/shops/${shopSlug}` : "/"}
     />
    ) : (
     <>
      <div className="tx-head" aria-hidden="true">
       <span>Order</span>
       <span>Date</span>
       <span className="c">Items</span>
       <span className="r">Credit used</span>
       <span className="c">Status</span>
       <span />
      </div>
      <ul className="tx-list" key={statusTab}>
       {shown.map((order, i) => {
        const open = openId === order.id;
        return (
         <li key={order.id} className={`tx-row${open ? " is-open" : ""}`} style={{ ["--i" as string]: Math.min(i, 10) }}>
          <button
           type="button"
           className="tx-main"
           aria-expanded={open}
           onClick={() => setOpenId(open ? null : order.id)}
          >
           <span className="tx-order">
            <span className={`tx-dot t-${tone(order.order_status)}`} aria-hidden="true" />
            <b>#{order.order_number}</b>
           </span>
           <span className="tx-date" data-label="Date">
            {fmtDateTime(order.created_at)}
           </span>
           <span className="c" data-label="Items">
            {order.items.length}
           </span>
           <span className={`r tx-amt${order.order_status !== "delivered" ? " is-void" : ""}`} data-label="Credit used">
            {currency(order.total_amount)}
           </span>
           <span className="c" data-label="Status">
            <span className={`tx-pill t-${tone(order.order_status)}`}>{label(order.order_status)}</span>
           </span>
           <span className="tx-chev" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
             <path d="m6 9 6 6 6-6" />
            </svg>
           </span>
          </button>
          <div className="tx-more">
           <div>
            <ul className="tx-items">
             {order.items.map((it, k) => (
              <li key={k}>
               <span>{(it.product_name || "").trim()}</span>
               <span className="q">× {it.quantity}</span>
               <span className="r">{currency(it.total_price)}</span>
              </li>
             ))}
            </ul>
            <Link href={`/orders/${order.id}`} className="tx-open">
             View order →
            </Link>
           </div>
          </div>
         </li>
        );
       })}
      </ul>
      <div className="tx-foot">
       <span>
        {shown.length} order{shown.length === 1 ? "" : "s"}
       </span>
       <b>Total {currency(shownTotal)}</b>
      </div>
     </>
    )}
   </section>
  </Tx>
 );
}
