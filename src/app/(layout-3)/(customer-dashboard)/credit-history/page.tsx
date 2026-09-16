"use client";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import axios from "@lib/axiosClient";
import authService from "services/authService";
import Box from "@component/Box";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Hidden from "@component/hidden";
import TableRow from "@component/TableRow";
import { Chip } from "@component/Chip";
import Typography, { H4, H5, Small } from "@component/Typography";
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

export default function CreditHistoryPage() {
 const router = useRouter();

 const [loading, setLoading] = useState(true);
 const [notCorporate, setNotCorporate] = useState(false);
 const [errorMessage, setErrorMessage] = useState<string | null>(null);
 const [shopSlug, setShopSlug] = useState<string | null>(null);

 const [credit, setCredit] = useState<CreditSummary | null>(null);

 // Section: current-month purchased products
 const currentMonthValue = format(new Date(), "yyyy-MM");
 const [purchaseMonth, setPurchaseMonth] = useState(currentMonthValue);
 const [purchaseOrders, setPurchaseOrders] = useState<CorporateOrder[]>([]);
 const [purchaseLoading, setPurchaseLoading] = useState(false);

 // Section: previous months' transaction history (date range filter)
 const [historyFrom, setHistoryFrom] = useState("");
 const [historyTo, setHistoryTo] = useState("");
 const [historyOrders, setHistoryOrders] = useState<CorporateOrder[]>([]);
 const [historyLoading, setHistoryLoading] = useState(false);

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
    setHistoryOrders(orders);
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

 // Refetch current-month purchases when the month filter changes
 useEffect(() => {
  if (!shopSlug) return;
  setPurchaseLoading(true);
  const { from, to } = monthBounds(purchaseMonth);
  fetchOrders(shopSlug, from, to)
   .then(setPurchaseOrders)
   .catch((err) => console.error("Failed to load purchases:", err))
   .finally(() => setPurchaseLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [shopSlug, purchaseMonth]);

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

 const purchaseItems = useMemo(
  () =>
   purchaseOrders.flatMap((order) =>
    order.items.map((item) => ({ order, item }))
   ),
  [purchaseOrders]
 );

 const returnedItems = useMemo(
  () =>
   historyOrders.flatMap((order) =>
    order.items
     .filter((item) => item.return_status && item.return_status !== "active")
     .map((item) => ({ order, item }))
   ),
  [historyOrders]
 );

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
    <DashboardPageHeader title="Due Payment" iconName="credit-card" />
    <EmptyOrders
     title="This feature is for corporate customers"
     message="Your account isn't linked to a corporate shop, so the Due Payment dashboard isn't available."
    />
   </Fragment>
  );
 }

 return (
  <Fragment>
   <DashboardPageHeader title="Due Payment" iconName="credit-card" />

   {errorMessage && (
    <Card p="1rem" mb="1.5rem" border="1px solid" borderColor="error.main">
     <Small color="error.main">{errorMessage}</Small>
    </Card>
   )}

   {/* Top: current-period credit usage / remaining */}
   {credit && (
    <Card p="1.5rem" mb="1.5rem" borderRadius="8px" border="1px solid #DAE1E7">
     <FlexBox justifyContent="space-between" alignItems="center" flexWrap="wrap" mb="1rem">
      <H4 my="0px">{CYCLE_LABEL[credit.billing_cycle] ?? "This Period's"} Credit Usage</H4>
      {credit.has_overdue_invoice && (
       <Chip p="0.25rem 0.75rem" bg="error.light">
        <Small color="error.main">Overdue Invoice</Small>
       </Chip>
      )}
     </FlexBox>

     <Grid container spacing={6}>
      <Grid item lg={3} md={6} xs={12}>
       <Small color="text.muted">Credit Used</Small>
       <H5 my="4px" color="error.main">
        {currency(credit.credit_used)}
       </H5>
      </Grid>
      <Grid item lg={3} md={6} xs={12}>
       <Small color="text.muted">Credit Remaining</Small>
       <H5 my="4px" color="success.main">
        {currency(credit.credit_available)}
       </H5>
      </Grid>
      <Grid item lg={3} md={6} xs={12}>
       <Small color="text.muted">Total Credit Limit</Small>
       <H5 my="4px">{currency(credit.credit_limit)}</H5>
      </Grid>
      <Grid item lg={3} md={6} xs={12}>
       <Small color="text.muted">Payment Due Date</Small>
       <H5 my="4px">{credit.current_period?.due_date ?? "—"}</H5>
      </Grid>
     </Grid>

     <Box mt="1rem">
      <Small color="text.muted">
       Current period: {credit.current_period?.start} to {credit.current_period?.end}
       {" "}({credit.current_period?.days_remaining} days remaining)
      </Small>
     </Box>
    </Card>
   )}

   {/* Current month purchases, filterable by month */}
   <Card p="1.5rem" mb="1.5rem" borderRadius="8px" border="1px solid #DAE1E7">
    <FlexBox justifyContent="space-between" alignItems="center" flexWrap="wrap" mb="1rem">
     <H4 my="0px">Purchased Products</H4>
     <input
      type="month"
      value={purchaseMonth}
      max={currentMonthValue}
      onChange={(e) => setPurchaseMonth(e.target.value)}
      style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #DAE1E7" }}
     />
    </FlexBox>

    {purchaseLoading ? (
     <Loader />
    ) : purchaseItems.length === 0 ? (
     <EmptyOrders
      title="No purchases this month"
      message="No corporate orders were found for the selected month."
      actionLabel="Continue Shopping"
      actionHref={shopSlug ? `/shops/${shopSlug}` : "/"}
     />
    ) : (
     <Box style={{ overflowX: "auto" }}>
      <Hidden down={769}>
       <TableRow
        boxShadow="none"
        padding="0px 18px"
        backgroundColor="transparent"
        style={{ flexWrap: "nowrap", minWidth: "700px" }}
       >
        <H5 color="error.main" my="0px" mx="6px" textAlign="left" style={{ whiteSpace: "nowrap" }}>Product</H5>
        <H5 color="error.main" my="0px" mx="6px" textAlign="center" style={{ whiteSpace: "nowrap" }}>Qty</H5>
        <H5 color="error.main" my="0px" mx="6px" textAlign="left" style={{ whiteSpace: "nowrap" }}>Credit Used</H5>
        <H5 color="error.main" my="0px" mx="6px" textAlign="left" style={{ whiteSpace: "nowrap" }}>Order Date & Time</H5>
       </TableRow>
      </Hidden>

      {purchaseItems.map(({ order, item }, idx) => (
       <TableRow
        key={`${order.id}-${item.product_id}-${idx}`}
        padding="12px 18px"
        mb="10px"
        border="1px solid #EDEFF2"
        style={{ flexWrap: "nowrap", minWidth: "700px" }}
       >
        <Typography my="0px" mx="6px" fontSize="14px" style={{ whiteSpace: "nowrap" }}>{item.product_name}</Typography>
        <Typography my="0px" mx="6px" fontSize="14px" textAlign="center" style={{ whiteSpace: "nowrap" }}>{item.quantity}</Typography>
        <Typography my="0px" mx="6px" fontSize="14px" style={{ whiteSpace: "nowrap" }}>{currency(item.total_price)}</Typography>
        <Typography my="0px" mx="6px" fontSize="14px" style={{ whiteSpace: "nowrap" }}>{fmtDateTime(order.created_at)}</Typography>
       </TableRow>
      ))}
     </Box>
    )}
   </Card>

   {/* Previous months' transaction history — filterable by month and date */}
   <Card p="1.5rem" mb="1.5rem" borderRadius="8px" border="1px solid #DAE1E7">
    <FlexBox justifyContent="space-between" alignItems="center" flexWrap="wrap" mb="1rem" style={{ gap: "10px" }}>
     <H4 my="0px">Transaction History</H4>
     <FlexBox alignItems="center" flexWrap="wrap" style={{ gap: "8px" }}>
      <input
       type="date"
       value={historyFrom}
       onChange={(e) => setHistoryFrom(e.target.value)}
       style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #DAE1E7" }}
      />
      <Typography my="0px" fontSize="13px" color="text.muted">to</Typography>
      <input
       type="date"
       value={historyTo}
       onChange={(e) => setHistoryTo(e.target.value)}
       style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #DAE1E7" }}
      />
      <button
       onClick={applyHistoryFilter}
       style={{
        padding: "6px 16px",
        borderRadius: "999px",
        border: "none",
        backgroundColor: "#E94560",
        color: "#fff",
        fontSize: "13px",
        fontWeight: 600,
        cursor: "pointer",
       }}
      >
       Apply Filter
      </button>
     </FlexBox>
    </FlexBox>

    {historyLoading ? (
     <Loader />
    ) : historyOrders.length === 0 ? (
     <EmptyOrders
      title="No transactions found"
      message="No orders were found in the selected period."
      actionLabel="Continue Shopping"
      actionHref={shopSlug ? `/shops/${shopSlug}` : "/"}
     />
    ) : (
     <Box style={{ overflowX: "auto" }}>
      <Hidden down={769}>
       <TableRow
        boxShadow="none"
        padding="0px 18px"
        backgroundColor="transparent"
        style={{ flexWrap: "nowrap", minWidth: "700px" }}
       >
        <H5 color="error.main" my="0px" mx="6px" textAlign="left" style={{ whiteSpace: "nowrap" }}>Order #</H5>
        <H5 color="error.main" my="0px" mx="6px" textAlign="left" style={{ whiteSpace: "nowrap" }}>Date</H5>
        <H5 color="error.main" my="0px" mx="6px" textAlign="center" style={{ whiteSpace: "nowrap" }}>Items</H5>
        <H5 color="error.main" my="0px" mx="6px" textAlign="left" style={{ whiteSpace: "nowrap" }}>Credit Used</H5>
        <H5 color="error.main" my="0px" mx="6px" textAlign="center" style={{ whiteSpace: "nowrap" }}>Status</H5>
       </TableRow>
      </Hidden>

      {historyOrders.map((order) => (
       <TableRow
        key={order.id}
        padding="12px 18px"
        mb="10px"
        border="1px solid #EDEFF2"
        style={{ flexWrap: "nowrap", minWidth: "700px" }}
       >
        <Typography my="0px" mx="6px" fontSize="14px" style={{ whiteSpace: "nowrap" }}>{order.order_number}</Typography>
        <Typography my="0px" mx="6px" fontSize="14px" style={{ whiteSpace: "nowrap" }}>{fmtDateTime(order.created_at)}</Typography>
        <Typography my="0px" mx="6px" fontSize="14px" textAlign="center" style={{ whiteSpace: "nowrap" }}>{order.items.length}</Typography>
        <Typography my="0px" mx="6px" fontSize="14px" style={{ whiteSpace: "nowrap" }}>{currency(order.total_amount)}</Typography>
        <Box mx="6px" style={{ flex: "1 1 0", display: "flex", justifyContent: "center" }}>
         <Chip
          p="0.25rem 0.75rem"
          bg={`${STATUS_COLOR[order.order_status] ?? "primary"}.light`}
          style={{ width: "fit-content" }}
         >
          <Small color={`${STATUS_COLOR[order.order_status] ?? "primary"}.main`} style={{ whiteSpace: "nowrap" }}>
           {order.order_status}
          </Small>
         </Chip>
        </Box>
       </TableRow>
      ))}
     </Box>
    )}
   </Card>

   {/* Returned products */}
   <Card p="1.5rem" borderRadius="8px" border="1px solid #DAE1E7">
    <H4 mb="1rem">Returned Products</H4>

    {returnedItems.length === 0 ? (
     <EmptyOrders
      title="No products returned"
      message="No products were returned in the currently filtered period."
      actionLabel="Continue Shopping"
      actionHref={shopSlug ? `/shops/${shopSlug}` : "/"}
     />
    ) : (
     <Box style={{ overflowX: "auto" }}>
      <Hidden down={769}>
       <TableRow
        boxShadow="none"
        padding="0px 18px"
        backgroundColor="transparent"
        style={{ flexWrap: "nowrap", minWidth: "700px" }}
       >
        <H5 color="error.main" my="0px" mx="6px" textAlign="left" style={{ whiteSpace: "nowrap" }}>Product</H5>
        <H5 color="error.main" my="0px" mx="6px" textAlign="left" style={{ whiteSpace: "nowrap" }}>Order #</H5>
        <H5 color="error.main" my="0px" mx="6px" textAlign="center" style={{ whiteSpace: "nowrap" }}>Qty</H5>
        <H5 color="error.main" my="0px" mx="6px" textAlign="left" style={{ whiteSpace: "nowrap" }}>Return Status</H5>
        <H5 color="error.main" my="0px" mx="6px" textAlign="left" style={{ whiteSpace: "nowrap" }}>Returned At</H5>
       </TableRow>
      </Hidden>

      {returnedItems.map(({ order, item }, idx) => (
       <TableRow
        key={`${order.id}-${item.product_id}-return-${idx}`}
        padding="12px 18px"
        mb="10px"
        border="1px solid #EDEFF2"
        style={{ flexWrap: "nowrap", minWidth: "700px" }}
       >
        <Typography my="0px" mx="6px" fontSize="14px" style={{ whiteSpace: "nowrap" }}>{item.product_name}</Typography>
        <Typography my="0px" mx="6px" fontSize="14px" style={{ whiteSpace: "nowrap" }}>{order.order_number}</Typography>
        <Typography my="0px" mx="6px" fontSize="14px" textAlign="center" style={{ whiteSpace: "nowrap" }}>{item.quantity}</Typography>
        <Box mx="6px" style={{ flex: "1 1 0" }}>
         <Chip
          p="0.25rem 0.75rem"
          bg={`${STATUS_COLOR[item.return_status] ?? "warning"}.light`}
          style={{ width: "fit-content" }}
         >
          <Small color={`${STATUS_COLOR[item.return_status] ?? "warning"}.main`} style={{ whiteSpace: "nowrap" }}>
           {item.return_status}
          </Small>
         </Chip>
        </Box>
        <Typography my="0px" mx="6px" fontSize="14px" style={{ whiteSpace: "nowrap" }}>{fmtDateTime(item.returned_at)}</Typography>
       </TableRow>
      ))}
     </Box>
    )}
   </Card>
  </Fragment>
 );
}
