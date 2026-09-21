"use client";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import * as XLSX from "xlsx";
import { FiChevronDown, FiDownload, FiFileText, FiGrid } from "react-icons/fi";

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
      .top .shop-name { font-size: 26px; font-weight: 800; color: #E75B2A; margin: 0 0 6px 0; }
      .top .line { font-size: 13px; color: #374151; margin: 2px 0; }
      .top .logo-block { text-align: right; }
      .top .logo-block img { height: 42px; }
      .top .tagline { font-size: 10px; color: #6B7280; letter-spacing: 0.5px; margin-top: 4px; }
      .divider { border: none; border-top: 3px solid #E75B2A; margin: 16px 0 20px 0; }
      .info-box {
       background: #F7F7F7; border-radius: 6px; padding: 16px 20px; display: flex;
       justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 20px;
      }
      .info-box .col p { font-size: 13px; margin: 4px 0; color: #374151; }
      .info-box .col p b { color: #111827; }
      .info-box .col.right { text-align: right; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
      th { background: #E75B2A; color: #fff; font-size: 11px; text-transform: uppercase; letter-spacing: 0.3px; padding: 10px 12px; text-align: left; }
      td { padding: 10px 12px; font-size: 13px; border-bottom: 1px solid #EDEFF2; }
      td.center, th.center { text-align: center; }
      td.right, th.right { text-align: right; }
      .chip {
       display: inline-block; padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 600;
      }
      .chip-primary { background: #E3EAF7; color: #1B3D8F; }
      .chip-secondary { background: #EEF0F3; color: #4B566B; }
      .chip-success { background: #E3F6EC; color: #1FAE68; }
      .chip-warning { background: #FEF3E2; color: #D68910; }
      .chip-error { background: #FDEAEC; color: #E75B2A; }
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
       min-width: 260px; z-index: 1;
      }
      .totals-box p { display: flex; justify-content: space-between; font-size: 13px; margin: 6px 0; color: #374151; }
      .totals-box p.total { font-size: 15px; font-weight: 800; color: #E75B2A; border-top: 1px solid #E2E5EA; padding-top: 8px; margin-top: 10px; }
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
   <DashboardPageHeader
    title="Due Payment"
    iconName="credit-card"
    button={
     <Link
      href="/credit-history/transactions"
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
      Transaction History
     </Link>
    }
   />

   {errorMessage && (
    <Card p="1rem" mb="1.5rem" border="1px solid" borderColor="error.main">
     <Small color="error.main">{errorMessage}</Small>
    </Card>
   )}

   {/* Top: current-period credit usage / remaining */}
   {credit && (
    <Card p="1.5rem" mb="1.5rem" borderRadius="8px" border="1px solid #DAE1E7">
     {/* Header: employee/corporate management label + shop name + export */}
     <FlexBox
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "center" }}
      flexDirection={{ xs: "column", sm: "row" }}
      flexWrap="wrap"
      mb="1.25rem"
      style={{ gap: "12px" }}
     >
      <Box>
       <Small
        color="text.muted"
        fontWeight={600}
        style={{ letterSpacing: "0.4px", textTransform: "uppercase" }}
       >
        Tizaraa Corporate Employee / Corporate Customer Management
       </Small>
       <FlexBox alignItems="center" style={{ gap: "10px" }} mt="4px">
        <H4 my="0px">{credit.company_name ?? "Corporate Shop"}</H4>
        {credit.has_overdue_invoice && (
         <Chip p="0.25rem 0.75rem" bg="error.light">
          <Small color="error.main">Overdue Invoice</Small>
         </Chip>
        )}
       </FlexBox>
      </Box>

      <Box ref={exportRef} style={{ position: "relative" }}>
       <button
        onClick={() => setExportOpen((prev) => !prev)}
        style={{
         display: "flex",
         alignItems: "center",
         gap: "8px",
         padding: "10px 16px",
         borderRadius: "8px",
         border: "1px solid #1B3D8F",
         backgroundColor: "#1B3D8F",
         color: "#fff",
         fontSize: "13px",
         fontWeight: 600,
         cursor: "pointer",
        }}
       >
        <FiDownload size={15} />
        Export Report (PDF/Excel)
        <FiChevronDown size={15} />
       </button>

       {exportOpen && (
        <Box
         style={{
          position: "absolute",
          right: 0,
          top: "calc(100% + 6px)",
          minWidth: "170px",
          backgroundColor: "#fff",
          border: "1px solid #DAE1E7",
          borderRadius: "8px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          overflow: "hidden",
          zIndex: 10,
         }}
        >
         <button
          onClick={exportCreditReportPdf}
          style={{
           display: "flex",
           alignItems: "center",
           gap: "8px",
           width: "100%",
           padding: "10px 14px",
           border: "none",
           background: "none",
           fontSize: "13px",
           textAlign: "left",
           cursor: "pointer",
          }}
         >
          <FiFileText size={14} /> Download as PDF
         </button>
         <button
          onClick={exportCreditReportExcel}
          style={{
           display: "flex",
           alignItems: "center",
           gap: "8px",
           width: "100%",
           padding: "10px 14px",
           border: "none",
           borderTop: "1px solid #EDEFF2",
           background: "none",
           fontSize: "13px",
           textAlign: "left",
           cursor: "pointer",
          }}
         >
          <FiGrid size={14} /> Download as Excel
         </button>
        </Box>
       )}
      </Box>
     </FlexBox>

     {/* Stat cards */}
     <Grid container spacing={6}>
      <Grid item lg={3} md={6} xs={12} style={{ display: "flex" }}>
       <Box
        p="0.75rem 1rem"
        borderRadius="8px"
        style={{
         backgroundColor: "#F7F9FC",
         borderLeft: "4px solid #1B3D8F",
         width: "100%",
         height: "100%",
         boxSizing: "border-box",
        }}
       >
        <Small color="text.muted" style={{ textTransform: "uppercase", fontSize: "11px" }}>
         Total Credit Limit
        </Small>
        <H5 my="4px">{currency(credit.credit_limit)}</H5>
        <Small color="text.muted">Assigned Limit</Small>
       </Box>
      </Grid>
      <Grid item lg={3} md={6} xs={12} style={{ display: "flex" }}>
       <Box
        p="0.75rem 1rem"
        borderRadius="8px"
        style={{
         backgroundColor: "#FFF8F0",
         borderLeft: "4px solid #F5A623",
         width: "100%",
         height: "100%",
         boxSizing: "border-box",
        }}
       >
        <Small color="text.muted" style={{ textTransform: "uppercase", fontSize: "11px" }}>
         Used Credit
        </Small>
        <H5 my="4px">{currency(credit.credit_used)}</H5>
        <Small color="text.muted">
         {CYCLE_LABEL[credit.billing_cycle] ?? "This period's"} usage
        </Small>
       </Box>
      </Grid>
      <Grid item lg={3} md={6} xs={12} style={{ display: "flex" }}>
       <Box
        p="0.75rem 1rem"
        borderRadius="8px"
        style={{
         backgroundColor: "#F0FBF6",
         borderLeft: "4px solid #1FAE68",
         width: "100%",
         height: "100%",
         boxSizing: "border-box",
        }}
       >
        <Small color="text.muted" style={{ textTransform: "uppercase", fontSize: "11px" }}>
         Remaining Credit
        </Small>
        <H5 my="4px" color="success.main">
         {currency(credit.credit_available)}
        </H5>
        <Small color="text.muted">Available balance</Small>
       </Box>
      </Grid>
      <Grid item lg={3} md={6} xs={12} style={{ display: "flex" }}>
       <Box
        p="0.75rem 1rem"
        borderRadius="8px"
        style={{
         backgroundColor: "#FDF6EC",
         borderLeft: "4px solid #D68910",
         width: "100%",
         height: "100%",
         boxSizing: "border-box",
        }}
       >
        <Small color="text.muted" style={{ textTransform: "uppercase", fontSize: "11px" }}>
         Due Amount
        </Small>
        <H5 my="4px">{currency(credit.total_due_amount)}</H5>
        <Small color="text.muted">Total delivered (settled + unsettled)</Small>
       </Box>
      </Grid>
      <Grid item lg={3} md={6} xs={12} style={{ display: "flex" }}>
       <Box
        p="0.75rem 1rem"
        borderRadius="8px"
        style={{
         backgroundColor: "#EEF7EE",
         borderLeft: "4px solid #2E8B57",
         width: "100%",
         height: "100%",
         boxSizing: "border-box",
        }}
       >
        <Small color="text.muted" style={{ textTransform: "uppercase", fontSize: "11px" }}>
         Paid Amount
        </Small>
        <H5 my="4px" color="success.main">
         {currency(credit.paid_amount)}
        </H5>
        <Small color="text.muted">Settled by seller</Small>
       </Box>
      </Grid>
      <Grid item lg={3} md={6} xs={12} style={{ display: "flex" }}>
       <Box
        p="0.75rem 1rem"
        borderRadius="8px"
        style={{
         backgroundColor: "#FDF1F1",
         borderLeft: "4px solid #E94560",
         width: "100%",
         height: "100%",
         boxSizing: "border-box",
        }}
       >
        <Small color="text.muted" style={{ textTransform: "uppercase", fontSize: "11px" }}>
         Outstanding Due Balance
        </Small>
        <H5 my="4px" color="error.main">
         {currency(credit.due_amount)}
        </H5>
        <Small color="text.muted">
         Due by {credit.current_period?.due_date ?? "—"}
        </Small>
       </Box>
      </Grid>
     </Grid>

     <Box mt="1.25rem">
      <Small color="text.muted">
       Current period: {credit.current_period?.start} to {credit.current_period?.end}
       {" "}({credit.current_period?.days_remaining} days remaining)
      </Small>
     </Box>
    </Card>
   )}

   {/* Current month purchases, filterable by month / date range / product / status */}
   <Card p="1.5rem" mb="1.5rem" borderRadius="8px" border="1px solid #DAE1E7">
    <FlexBox flexWrap="wrap" mb="1.25rem" style={{ gap: "10px" }}>
     <FlexBox alignItems="center" style={{ gap: "6px" }}>
      <Small color="text.muted" style={{ whiteSpace: "nowrap" }}>Month:</Small>
      <input
       type="month"
       value={purchaseMonth}
       max={currentMonthValue}
       onChange={(e) => {
        setPurchaseMonth(e.target.value);
        setPurchaseDateFrom("");
        setPurchaseDateTo("");
       }}
       style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #DAE1E7", fontSize: "13px" }}
      />
     </FlexBox>

     <FlexBox alignItems="center" style={{ gap: "6px" }}>
      <Small color="text.muted" style={{ whiteSpace: "nowrap" }}>Date:</Small>
      <input
       type="date"
       value={purchaseDateFrom}
       max={purchaseDateTo || undefined}
       onChange={(e) => setPurchaseDateFrom(e.target.value)}
       style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #DAE1E7", fontSize: "13px" }}
      />
      <Small color="text.muted">to</Small>
      <input
       type="date"
       value={purchaseDateTo}
       min={purchaseDateFrom || undefined}
       onChange={(e) => setPurchaseDateTo(e.target.value)}
       style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #DAE1E7", fontSize: "13px" }}
      />
     </FlexBox>

     <select
      value={productFilter}
      onChange={(e) => setProductFilter(e.target.value)}
      style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #DAE1E7", fontSize: "13px" }}
     >
      <option value="all">All Products</option>
      {productOptions.map((name) => (
       <option key={name} value={name}>{name}</option>
      ))}
     </select>

     <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #DAE1E7", fontSize: "13px" }}
     >
      <option value="all">Order Status: All</option>
      <option value="pending">Pending</option>
      <option value="processing">Packed</option>
      <option value="delivered">Delivered</option>
     </select>

     <FlexBox style={{ gap: "10px", marginLeft: "auto" }}>
      <button
       onClick={applyPurchaseFilter}
       style={{
        padding: "8px 18px",
        borderRadius: "8px",
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

      <button
       onClick={resetPurchaseFilter}
       style={{
        padding: "8px 18px",
        borderRadius: "8px",
        border: "1px solid #DAE1E7",
        backgroundColor: "#fff",
        color: "#4B566B",
        fontSize: "13px",
        fontWeight: 600,
        cursor: "pointer",
       }}
      >
       Reset Filter
      </button>
     </FlexBox>
    </FlexBox>

    {/* Tabs: Purchase History (current filter) / Returned Products Log */}
    <FlexBox mb="1.25rem" style={{ gap: "24px", borderBottom: "1px solid #EDEFF2" }}>
     <Box
      onClick={() => setActiveProductTab("purchase")}
      style={{
       cursor: "pointer",
       padding: "0 0 10px 0",
       borderBottom: activeProductTab === "purchase" ? "2px solid #1B3D8F" : "2px solid transparent",
      }}
     >
      <Small
       color={activeProductTab === "purchase" ? "primary.main" : "text.muted"}
       fontWeight={600}
      >
       Tab 1: Purchase History (Current Month) ({purchaseItems.length})
      </Small>
     </Box>
     <Box
      onClick={() => setActiveProductTab("returned")}
      style={{
       cursor: "pointer",
       padding: "0 0 10px 0",
       borderBottom: activeProductTab === "returned" ? "2px solid #1B3D8F" : "2px solid transparent",
      }}
     >
      <Small
       color={activeProductTab === "returned" ? "primary.main" : "text.muted"}
       fontWeight={600}
      >
       Tab 2: Returned Products Log ({returnedItems.length})
      </Small>
     </Box>
    </FlexBox>

    {activeProductTab === "purchase" ? (
     purchaseLoading ? (
      <Loader />
     ) : purchaseItems.length === 0 ? (
      <EmptyOrders
       title="No purchases found"
       message="No corporate orders match the selected month, date range, product, or status filter."
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
         style={{ flexWrap: "nowrap", minWidth: "860px" }}
        >
         <H5 color="error.main" my="0px" mx="6px" textAlign="left" style={{ whiteSpace: "nowrap", flex: "0 0 150px" }}>Order ID</H5>
         <H5 color="error.main" my="0px" mx="6px" textAlign="center" style={{ whiteSpace: "nowrap", flex: "0 0 150px" }}>Product Name</H5>
         <H5 color="error.main" my="0px" mx="6px" textAlign="center" style={{ whiteSpace: "nowrap", flex: "0 0 70px" }}>Qty</H5>
         <H5 color="error.main" my="0px" mx="6px" textAlign="center" style={{ whiteSpace: "nowrap", flex: "0 0 130px" }}>Credit Amount</H5>
         <Box mx="6px" style={{ flex: "0 0 190px", display: "flex", justifyContent: "center" }}>
          <H5 color="error.main" my="0px" style={{ whiteSpace: "nowrap" }}>Order Date/Time</H5>
         </Box>
         <H5 color="error.main" my="0px" mx="6px" textAlign="center" style={{ whiteSpace: "nowrap", flex: "0 0 130px" }}>Order Status</H5>
        </TableRow>
       </Hidden>

       {purchaseItems.map(({ order, item }, idx) => (
        <TableRow
         key={`${order.id}-${item.product_id}-${idx}`}
         padding="12px 18px"
         mb="0px"
         boxShadow="none"
         style={{
          flexWrap: "nowrap",
          minWidth: "860px",
          borderRadius: 0,
          borderBottom: "1px solid #EDEFF2",
         }}
        >
         <Typography my="0px" mx="6px" fontSize="14px" style={{ whiteSpace: "nowrap", flex: "0 0 150px" }}>#{order.order_number}</Typography>
         <Typography my="0px" mx="6px" fontSize="14px" textAlign="center" style={{ whiteSpace: "nowrap", flex: "0 0 150px" }}>{item.product_name.trim()}</Typography>
         <Typography my="0px" mx="6px" fontSize="14px" textAlign="center" style={{ whiteSpace: "nowrap", flex: "0 0 70px" }}>{item.quantity}</Typography>
         <Typography my="0px" mx="6px" fontSize="14px" textAlign="center" style={{ whiteSpace: "nowrap", flex: "0 0 130px" }}>{currency(item.total_price)}</Typography>
         <Box mx="6px" style={{ flex: "0 0 190px", display: "flex", justifyContent: "center" }}>
          <Typography my="0px" fontSize="14px" style={{ whiteSpace: "nowrap" }}>{fmtDateTime(order.created_at)}</Typography>
         </Box>
         <Box mx="6px" style={{ flex: "0 0 130px", display: "flex", justifyContent: "center" }}>
          <Chip
           p="0.25rem 0.75rem"
           bg={`${STATUS_COLOR[order.order_status] ?? "primary"}.light`}
           style={{ width: "fit-content" }}
          >
           <Small color={`${STATUS_COLOR[order.order_status] ?? "primary"}.main`} style={{ whiteSpace: "nowrap" }}>
            {ORDER_STATUS_LABEL[order.order_status] ?? order.order_status}
           </Small>
          </Chip>
         </Box>
        </TableRow>
       ))}
      </Box>
     )
    ) : returnedItems.length === 0 ? (
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
        <H5 color="error.main" my="0px" mx="6px" textAlign="center" style={{ whiteSpace: "nowrap", textAlign: "center", width: "100%" }}>Qty</H5>
        <H5 color="error.main" my="0px" mx="6px" textAlign="left" style={{ whiteSpace: "nowrap" }}>Returned At</H5>
       </TableRow>
      </Hidden>

      {returnedItems.map(({ order, item }, idx) => (
       <TableRow
        key={`${order.id}-${item.product_id}-return-${idx}`}
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
        <Typography my="0px" mx="6px" fontSize="14px" style={{ whiteSpace: "nowrap" }}>{item.product_name.trim()}</Typography>
        <Typography my="0px" mx="6px" fontSize="14px" style={{ whiteSpace: "nowrap" }}>{order.order_number}</Typography>
        <Typography my="0px" mx="6px" fontSize="14px" textAlign="center" style={{ whiteSpace: "nowrap", textAlign: "center", width: "100%" }}>{item.quantity}</Typography>
        <Typography my="0px" mx="6px" fontSize="14px" style={{ whiteSpace: "nowrap" }}>{fmtDateTime(item.returned_at)}</Typography>
       </TableRow>
      ))}
     </Box>
    )}
   </Card>
  </Fragment>
 );
}
