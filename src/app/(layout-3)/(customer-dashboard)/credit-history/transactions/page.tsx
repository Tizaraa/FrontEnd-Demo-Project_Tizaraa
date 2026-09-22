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

 if (loading) {
  return (
   <Typography>
    <Loader />
   </Typography>
  );
 }

 const dueButton = (
  <Link
   href="/credit-history"
   style={{
    display: "inline-flex",
    alignItems: "center",
    padding: "10px 18px",
    borderRadius: "8px",
    border: "1px solid #1B3D8F",
    backgroundColor: "#1B3D8F",
    color: "#fff",
    fontSize: "13px",
    fontWeight: 600,
    textDecoration: "none",
   }}
  >
   Due Payment
  </Link>
 );

 if (notCorporate) {
  return (
   <Fragment>
    <DashboardPageHeader title="Transaction History" iconName="credit-card" button={dueButton} />
    <EmptyOrders
     title="This feature is for corporate customers"
     message="Your account isn't linked to a corporate shop, so the Transaction History dashboard isn't available."
    />
   </Fragment>
  );
 }

 return (
  <Fragment>
   <DashboardPageHeader title="Transaction History" iconName="credit-card" button={dueButton} />

   {errorMessage && (
    <Card p="1rem" mb="1.5rem" border="1px solid" borderColor="error.main">
     <Small color="error.main">{errorMessage}</Small>
    </Card>
   )}

   <Card p="1.5rem" mb="1.5rem" borderRadius="8px" border="1px solid #DAE1E7">
    <FlexBox justifyContent="space-between" alignItems="center" flexWrap="wrap" mb="1rem" style={{ gap: "10px" }}>
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
        <H5 color="error.main" my="0px" mx="6px" textAlign="center" style={{ whiteSpace: "nowrap", textAlign: "center", width: "100%" }}>Date</H5>
        <H5 color="error.main" my="0px" mx="6px" textAlign="center" style={{ whiteSpace: "nowrap", textAlign: "center", width: "100%" }}>Items</H5>
        <H5 color="error.main" my="0px" mx="6px" textAlign="center" style={{ whiteSpace: "nowrap", textAlign: "center", width: "100%" }}>Credit Used</H5>
        <H5 color="error.main" my="0px" mx="6px" textAlign="center" style={{ whiteSpace: "nowrap", textAlign: "center", width: "100%" }}>Status</H5>
       </TableRow>
      </Hidden>

      {historyOrders.map((order) => (
       <TableRow
        key={order.id}
        padding="12px 18px"
        mb="0px"
        boxShadow="none"
        style={{
         flexWrap: "nowrap",
         minWidth: "700px",
         borderRadius: 0,
         borderBottom: "1px solid #EDEFF2",
        }}
       >
        <Typography my="0px" mx="6px" fontSize="14px" style={{ whiteSpace: "nowrap" }}>{order.order_number}</Typography>
        <Typography my="0px" mx="6px" fontSize="14px" textAlign="center" style={{ whiteSpace: "nowrap", textAlign: "center", width: "100%" }}>{fmtDateTime(order.created_at)}</Typography>
        <Typography my="0px" mx="6px" fontSize="14px" textAlign="center" style={{ whiteSpace: "nowrap", textAlign: "center", width: "100%" }}>{order.items.length}</Typography>
        <Typography my="0px" mx="6px" fontSize="14px" textAlign="center" style={{ whiteSpace: "nowrap", textAlign: "center", width: "100%" }}>{currency(order.total_amount)}</Typography>
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
  </Fragment>
 );
}
