"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { currency } from "@utils/utils";
import axios from "@lib/axiosClient";
import { Button } from "@component/buttons";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import TableRow from "@component/TableRow";
import Typography, { H5, H6, Paragraph, Small } from "@component/Typography";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import ApiBaseUrl from "api/ApiBaseUrl";
import {
 OrderStatus,
 ShippingAddressCard,
 WriteReview,
 OrderListButton,
} from "@sections/customer-dashboard/orders";
import { IDParams } from "interfaces";
import { Vortex } from "react-loader-spinner";
import Box from "@component/Box";
import OrderTotalSummary from "@sections/customer-dashboard/orders/OrderTotalSummary";
import BeatLoader from "react-spinners/BeatLoader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faStore,
 faCaretDown,
 faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { Chip } from "@component/Chip";
import CorporatePickupToken from "@component/orders/CorporatePickupToken";
import authService from "services/authService";
import { useRouter } from "next/navigation";
import { Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Loader from "@component/loader";
import styled, { keyframes } from "styled-components";
import toast from "react-hot-toast";

const odRise = keyframes`
 from { opacity: 0; transform: translateY(10px); }
 to { opacity: 1; transform: none; }
`;
const odShimmer = keyframes`
 from { background-position: -600px 0; }
 to { background-position: 600px 0; }
`;
const odSpin = keyframes`
 to { transform: rotate(360deg); }
`;

// Order detail layout: summary hero, then items + tracker (left) and the
// payment summary + address (right, sticky on desktop).
const OD = styled.div`
 display: flex;
 flex-direction: column;
 gap: 20px;

 .od-hero,
 .od-card {
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 18px;
  background: ${({ theme }) => theme.tz.color.paper};
  animation: ${odRise} 460ms cubic-bezier(0.22, 1, 0.36, 1) both;
 }

 /* hero */
 .od-hero {
  position: relative;
  overflow: hidden;
  padding: 22px;
  background:
   radial-gradient(70% 140% at 100% 0%, ${({ theme }) => theme.tz.color.emberTint} 0%, transparent 60%),
   ${({ theme }) => theme.tz.color.paper};
 }
 .od-hero::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 4px;
  background: var(--tone);
 }
 .od-hero-top {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
 }
 .od-id small {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .od-id-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 10px;
  margin-top: 2px;
 }
 .od-id h2 {
  margin: 0;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 22px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.ink};
  overflow-wrap: anywhere;
 }
 .od-status {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  color: var(--tone);
  background: color-mix(in srgb, var(--tone) 12%, white);
 }
 .od-status i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
 }
 .od-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
 }

 .od-facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin: 18px 0 0;
  padding: 16px 0 0;
  border-top: 1px dashed ${({ theme }) => theme.tz.color.line};
 }
 .od-facts div {
  min-width: 0;
 }
 .od-facts dt {
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .od-facts dd {
  margin: 3px 0 0;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .od-facts--plain {
  margin-top: 0;
  padding-top: 0;
  border-top: 0;
 }
 .od-money {
  color: ${({ theme }) => theme.tz.color.emberDeep} !important;
 }
 .od-good {
  color: ${({ theme }) => theme.tz.tone.success.fg} !important;
 }
 .od-error {
  margin: 12px 0 0;
  font-size: 13px;
  color: ${({ theme }) => theme.tz.tone.danger.fg};
 }

 /* buttons */
 .od-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 40px;
  padding: 0 16px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.paper};
  color: ${({ theme }) => theme.tz.color.ink};
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 160ms ease, border-color 160ms ease, transform 160ms ease, box-shadow 160ms ease;
 }
 .od-btn svg {
  width: 16px;
  height: 16px;
 }
 .od-btn:hover {
  border-color: ${({ theme }) => theme.tz.color.navy};
  background: ${({ theme }) => theme.tz.color.navyTint};
 }
 .od-btn--solid {
  border-color: ${({ theme }) => theme.tz.color.emberDeep};
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
  box-shadow: 0 6px 16px rgba(194, 64, 15, 0.24);
 }
 .od-btn--solid:hover:enabled,
 a.od-btn--solid:hover {
  border-color: ${({ theme }) => theme.tz.color.emberDark};
  background: ${({ theme }) => theme.tz.color.emberDark};
  transform: translateY(-1px);
 }
 .od-btn:disabled {
  opacity: 0.7;
  cursor: progress;
 }
 .od-btn:focus-visible,
 .od-icon-btn:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
 .od-icon-btn {
  display: inline-grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 10px;
  background: ${({ theme }) => theme.tz.color.paper};
  color: ${({ theme }) => theme.tz.color.slate};
  cursor: pointer;
  transition: color 160ms ease, border-color 160ms ease;
 }
 .od-icon-btn svg {
  width: 15px;
  height: 15px;
 }
 .od-icon-btn:hover {
  border-color: ${({ theme }) => theme.tz.color.ember};
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .od-spin {
  width: 15px;
  height: 15px;
  border: 2px solid rgba(255, 255, 255, 0.45);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${odSpin} 700ms linear infinite;
 }

 /* grid */
 /* one column, same reading order as the other order pages:
    items -> status -> returns -> payment + address -> invoice */
 .od-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
 }
 .od-main {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
 }
 /* payment summary and address stacked full width, like the delivered page */
 .od-side {
  display: flex;
  flex-direction: column;
  gap: 20px;
 }
 .od-bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
 }

 /* items card */
 .od-card {
  padding: 20px 22px;
  animation-delay: 80ms;
 }
 .od-shop {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 12px;
  padding-bottom: 14px;
  border-bottom: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
 }
 .od-shop-icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${({ theme }) => theme.tz.color.navyTint};
  color: ${({ theme }) => theme.tz.color.navy};
 }
 .od-shop-name {
  display: flex;
  flex-direction: column;
  min-width: 0;
  margin-right: auto;
 }
 .od-shop-name small {
  font-size: 11.5px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .od-shop-name strong {
  font-size: 16px;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .od-chip {
  padding: 4px 11px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  color: var(--tone);
  background: color-mix(in srgb, var(--tone) 12%, white);
 }
 .od-note {
  margin: 14px 0 0;
  padding: 10px 14px;
  border-radius: 12px;
  background: ${({ theme }) => theme.tz.tone.warning.bg};
  font-size: 13px;
  color: ${({ theme }) => theme.tz.tone.warning.fg};
 }
 .od-items {
  --ir-pad: 0; /* the card already has side padding */
  display: flex;
  flex-direction: column;
 }

 /* return card */
 .od-return-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 14px;
 }
 .od-return-head h3 {
  margin: 0;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .od-reason,
 .od-photos {
  margin-top: 14px;
 }
 .od-reason small,
 .od-photos small {
  display: block;
  margin-bottom: 6px;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .od-reason p {
  margin: 0;
  padding: 10px 14px;
  border-left: 3px solid ${({ theme }) => theme.tz.color.ember};
  border-radius: 0 10px 10px 0;
  background: ${({ theme }) => theme.tz.color.mist};
  font-size: 13.5px;
  line-height: 1.6;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }
 .od-photos > div {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
 }
 .od-photos img {
  display: block;
  width: 76px;
  height: 76px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 12px;
  object-fit: cover;
  transition: transform 200ms ease;
 }
 .od-photos a:hover img {
  transform: scale(1.05);
 }

 /* loading / error */
 .od-skel {
  border-radius: 18px;
  background: linear-gradient(90deg, ${({ theme }) => theme.tz.color.mist} 0%, ${({ theme }) => theme.tz.color.lineSoft} 50%, ${({ theme }) => theme.tz.color.mist} 100%);
  background-size: 1200px 100%;
  animation: ${odShimmer} 1.3s linear infinite;
 }
 .od-fail {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.tz.tone.danger.bg};
  border-radius: 18px;
  background: ${({ theme }) => theme.tz.color.paper};
 }
 .od-fail strong {
  display: block;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .od-fail span {
  font-size: 14px;
  color: ${({ theme }) => theme.tz.color.slate};
 }

 @media (max-width: 560px) {
  .od-hero,
  .od-card {
   padding: 16px;
  }
  .od-id h2 {
   font-size: 18px;
  }
  .od-hero-actions {
   width: 100%;
  }
  .od-hero-actions .od-btn {
   flex: 1;
   justify-content: center;
  }
 }

 @media (prefers-reduced-motion: reduce) {
  .od-hero,
  .od-card,
  .od-skel {
   animation: none;
  }
  .od-btn,
  .od-photos img {
   transition: none;
  }
 }
`;

const InvoiceDialog = styled.div`
 position: fixed;
 inset: 0;
 z-index: 1000;
 display: flex;
 align-items: center;
 justify-content: center;
 padding: 16px;
 background: rgba(20, 21, 32, 0.5);
 backdrop-filter: blur(4px);
 -webkit-backdrop-filter: blur(4px);

 .iv-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 820px;
  height: min(90vh, 1000px);
  overflow: hidden;
  border-radius: 18px;
  background: ${({ theme }) => theme.tz.color.paper};
  box-shadow: 0 24px 60px rgba(20, 21, 32, 0.3);
  animation: ${odRise} 260ms cubic-bezier(0.22, 1, 0.36, 1) both;
 }
 .iv-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
 }
 .iv-head > div {
  display: flex;
  align-items: center;
  gap: 8px;
 }
 .iv-head .od-btn {
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  padding: 0 14px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
 }
 .iv-head .od-icon-btn {
  display: inline-grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 10px;
  background: ${({ theme }) => theme.tz.color.paper};
  cursor: pointer;
 }
 .iv-head .od-icon-btn svg {
  width: 16px;
  height: 16px;
 }
 iframe {
  flex: 1;
  width: 100%;
  border: 0;
 }

 @media (prefers-reduced-motion: reduce) {
  .iv-box {
   animation: none;
  }
 }
`;
// import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

export default function OrderDetails({ params }: IDParams) {
 const [order, setOrder] = useState(null);
 const [loading, setLoading] = useState(true);
 const [getStatus, setStatus] = useState(null);
 const [getEstimateDate, setEstimateDate] = useState(null);
 const [invoiceLoading, setInvoiceLoading] = useState(false); // Loading state for invoice
 const [invoiceError, setInvoiceError] = useState(""); // Error message for invoice
 const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null); // Blob URL of the loaded invoice PDF

 // Release the PDF blob when leaving the page.
 useEffect(() => () => {
  if (invoiceUrl) URL.revokeObjectURL(invoiceUrl);
 }, [invoiceUrl]);
 const [onlinePaymentError, setOnlinePaymentError] = useState("");
 const [onlinePaymentLoading, setOnlinePaymentLoading] = useState(false);
 const [orderSuccess, setOrderSuccess] = useState(false);
 const [fetched, setFetched] = useState(false);
 const [returnDetails, setReturnDetails] = useState<any[]>([]);
 const [attempt, setAttempt] = useState(0); // bump to retry the order fetch
 const router = useRouter();

 const [openSummaries, setOpenSummaries] = useState<{
  [key: string]: boolean;
 }>({});
 const buttonRef = useRef<HTMLButtonElement>(null);

 const PrimaryLoader = `${ApiBaseUrl.ImgUrl}frontend/loader/loader.gif`;

 const formatStatus = (s: string): string => {
  if (!s) return s;
  return s
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
 };

 const getColor = (status: string) => {
  switch (status) {
   case "Pending":
    return "var(--tz-warning)"; // Yellow for Pending
   case "Confirmed":
    return "var(--tz-navy)"; // Blue for Processing
   case "Delivered":
    return "var(--tz-success)"; // Green for Delivered
   case "Cancelled":
    return "var(--tz-danger)"; // Red for Cancelled
   default:
    return "var(--tz-slate)"; // Grey for unknown status
  }
 };

 // Corporate orders are collected at the shop counter, so the seller's
 // "processing" state means the order is packed and waiting — the pill has to
 // read the same way the tracker does.
 const getStatusLabel = (status: string) => {
  if (
   order?.Order?.payment_method === "corporate_credit" &&
   status === "Processing"
  ) {
   return "Packed";
  }
  return status;
 };

 const toggleSummary = (shop: string) => {
  setOpenSummaries((prev) => ({
   ...prev,
   [shop]: !prev[shop], // Toggle the summary visibility for the clicked shop
  }));
 };

 useEffect(() => {
  const fetchOrder = async (token: string) => {
   try {
    const response = await axios.get(`user/order/${params.id}`);
    const raw = response.data?.data ?? response.data;

    // Transform our API response to the shape this page expects
    const sellerName = raw.seller_name ?? "Tizaraa Store";
    const orderItems = (raw.items ?? []).map((item: any) => ({
     order_item_id: item.id,
     order_id: Number(params.id),
     product_id: item.product_id,
     product_name: item.product_name,
     product_image: item.thumbnail_url,
     price: item.unit_price,
     original_price: item.original_unit_price,
     quantity: item.quantity,
     color: item.color ?? null,
     size: item.size ?? null,
     attribute: null,
     product_slug: item.product_slug ?? null,
     productType: "Local",
     status: item.item_status ?? raw.order_status,
     order_days_gone: 0,
     return_status: null,
     // Per-item return state — a corporate counter return refunds one item
     // while the rest of the order stays delivered.
     item_return_status: item.return_status ?? "active",
     item_returned_at: item.returned_at ?? null,
     item_refund_amount: item.refund_amount ?? null,
     item_cancelled_at: item.cancelled_at ?? null,
     ratingcheck: false,
     rating: 0,
     comments: "",
     images: [],
    }));

    const isCancelled = raw.order_status === "cancelled";

    const adapted = {
     Order: {
      invoice_id: raw.invoice_no,
      createdAt: raw.created_at,
      isDelivered: raw.order_status === "delivered",
      deliveredAt: raw.delivered_at ?? null,
      productType: "Local",
      status: formatStatus(raw.order_status),
      payment_method: raw.payment_method,
      // corporate shop or company-credit order (API flag); retail otherwise
      is_corporate: Boolean(raw.is_corporate),
      payment_status: raw.payment_status,
      discount_amount: raw.discount_amount,
      promo_code: raw.promo_code,
      amount_percentage: String(raw.advance_payment_percent ?? 100),
      amount: raw.total_amount,
      main_total: raw.subtotal,
      delivery_charge: raw.shipping_amount,
      delivery_charge_reason: "",
      due_amount: 0,
      paid: raw.total_amount,
      address: raw.buyer_address,
      area_id: raw.area_name,
      city_id: raw.city_name,
      province_id: raw.province_name,
      phone: raw.buyer_phone,
      buyer_name: raw.buyer_name ?? null,
      // When the seller marked it packed — printed on the pickup token
      packed_at:
       (raw.timeline ?? []).find((t: { status: string }) => t.status === "processing")?.at ?? null,
      timeline: raw.timeline ?? [],
      refunded_total: raw.refunded_total ?? 0,
      original_total: raw.original_total ?? raw.total_amount,
      original_subtotal: raw.original_subtotal ?? raw.subtotal,
      returned_item_count: raw.returned_item_count ?? 0,
      cancelled_item_count: raw.cancelled_item_count ?? 0,
      cancelled_total: raw.cancelled_total ?? 0,
      items: {
       [sellerName]: {
        delivered_at: raw.delivered_at ?? null,
        return_deadline: raw.return_deadline ?? null,
        status: formatStatus(raw.order_status),
        delivery_charge: raw.shipping_amount,
        // A cancelled order has nothing live left, so subtotal and total_amount read
        // 0.00 when the items were cancelled one at a time and the full charge when
        // the order went at once. The summary shows what was charged instead, which
        // is the same rule the list rows follow.
        sub_total: isCancelled
         ? raw.original_subtotal ?? raw.subtotal
         : raw.subtotal,
        total: isCancelled ? raw.original_total ?? raw.total_amount : raw.total_amount,
        promocodeStatus: (raw.discount_amount > 0 || raw.promo_code) ? 1 : 0,
        isAbroad: false,
        timeline: raw.timeline ?? [],
        order_items: orderItems,
       },
      },
     },
    };

    setOrder(adapted);
    setStatus(adapted.Order.status);
    setEstimateDate(adapted.Order.deliveredAt);

    // Fetch return details if order is in a return flow
    if (raw.returns && raw.returns.length > 0) {
     setReturnDetails(raw.returns);
    } else {
     const returnStatuses = ["return_requested", "returned", "return_approved", "return_received", "refunded"];
     if (returnStatuses.includes(raw.order_status)) {
      try {
       const returnRes = await axios.get(`orders/${params.id}/returns`);
       setReturnDetails(returnRes.data?.data ?? []);
      } catch {
       // non-critical — silently ignore
      }
     }
    }
   } catch (error) {
    console.error("Error fetching order details:", error);
   } finally {
    setLoading(false);
   }
  };

  const token = authService.getToken();

  if (!token) {
   router.push("/login");
  } else if (!fetched) {
   fetchOrder(token); // Pass the token to the fetchOrder function
  }

  const success = localStorage.getItem("orderSuccess");
  if (success) {
   setOrderSuccess(true);
   localStorage.removeItem("orderSuccess");
  }
 }, [fetched, params.id, router, attempt]);

 const fetchInvoice = async () => {
  setInvoiceLoading(true); // Start loading state for invoice
  setInvoiceError(""); // Reset any previous errors
  const authToken = localStorage.getItem("token");
  if (!authToken) {
   setInvoiceError("Authentication token not found. Please log in."); // Handle missing token
   setInvoiceLoading(false);
   return;
  }

  try {
   const response = await axios.get(
    `get-invoice?id=${params.id}`,
    {
     headers: {
      Authorization: `Bearer ${authToken}`,
     },
     responseType: "blob", // Set response type to blob for binary data
    }
   );
   const pdfBlobUrl = URL.createObjectURL(response.data);

   // Shown inline under the Invoice button; free the previous PDF first.
   setInvoiceUrl(prev => {
    if (prev) URL.revokeObjectURL(prev);
    return pdfBlobUrl;
   });
  } catch (error) {
   console.error("Error fetching invoice data:", error);
   setInvoiceError("Failed to load invoice. Please try again."); // Set error message for user
  } finally {
   setInvoiceLoading(false); // Stop loading state
  }
 };

 const handleOnlinePayment = async () => {
  setOnlinePaymentLoading(true);
  setOnlinePaymentError("");
  const authToken = localStorage.getItem("token");
  if (!authToken) {
   setOnlinePaymentError("Authentication token not found. Please log in.");
   setOnlinePaymentLoading(false);
   return;
  }

  try {
   const orderResponse = await axios.get(`user/order/${params.id}`);
   const raw = orderResponse.data?.data ?? orderResponse.data;

   const paymentResponse = await axios.post(`pay-via-ajax`, {
    invoice_id: raw.invoice_no,
    total_amount: raw.total_amount,
    payment_type: "Online Payment",
    payment_method: raw.payment_method,
   });

   const redirectUrl = paymentResponse.data.redirect_url;
   window.location.href = redirectUrl;
  } catch (error) {
   console.error("Error processing payment:", error);
   setOnlinePaymentError("Failed to process payment. Please try again.");
  } finally {
   setOnlinePaymentLoading(false);
  }
 };

 // if (loading) {
 //   return (
 //     <Typography>
 //       <LoaderWrapper>
 //         {/* <img src={PrimaryLoader} alt="Loading" /> */}
 //         <img src={PrimaryLoader} alt="Loading" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
 //       </LoaderWrapper>
 //     </Typography>
 //   );
 // }

 if (loading) {
  return (
   <OD aria-busy="true" aria-label="Loading order">
    <div className="od-skel" style={{ height: 150 }} />
    <div className="od-grid">
     <div className="od-main">
      <div className="od-skel" style={{ height: 220 }} />
      <div className="od-skel" style={{ height: 180 }} />
     </div>
     <div className="od-side">
      <div className="od-skel" style={{ height: 260 }} />
     </div>
    </div>
   </OD>
  );
 }

 if (!order) {
  return (
   <OD>
    <div className="od-fail" role="alert">
     <div>
      <strong>We couldn't load this order</strong>
      <span>Check your connection and try again.</span>
     </div>
     <button
      type="button"
      className="od-btn od-btn--solid"
      onClick={() => {
       setLoading(true);
       setAttempt((a) => a + 1);
      }}
     >
      Try again
     </button>
    </div>
   </OD>
  );
 }

 let abroadProduct = null;

 if (order?.Order?.productType === "Abroad") {
  abroadProduct = (
   <Box key={order?.Order?.invoice_id} my="1rem">
    <div
     style={{
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
     }}
    >
     <div
      style={{
       display: "flex",
       alignItems: "center",
       gap: "0",
      }}
     >
      <Typography
       fontWeight="bold"
       fontSize="18px"
       mb="1rem"
       p="1rem"
       style={{ margin: "0" }}
      >
       <FontAwesomeIcon icon={faStore} size="1x" color="black" />{" "}
       {order?.Order?.items?.shop_name || "Product not available"}
      </Typography>

      <Box m="6px">
       <Chip p="0.25rem 1rem" bg={getColor(order?.Order?.items?.status)}>
        <Small color="white">
         {order?.Order?.items?.status || "Status not available"}
        </Small>
       </Chip>
      </Box>
     </div>


    </div>
    {order?.Order?.items?.order_items?.map((item, index) => (
     <WriteReview
      key={index}
      item={item}
      shopName={order?.Order?.items?.shop_name}
      orderDetails={order}
      status={order?.Order?.items?.status}
      delivered_at={order?.Order?.item?.delivered_at}
      orderItemId={order?.Order?.items?.order_item_id}
      cancel_status={order?.Order?.items?.order_items?.status}
      order_days_gone={order?.Order?.items?.order_items?.order_days_gone}
      return_status={order?.Order?.items?.order_items?.return_status}
     />
    ))}

    <FlexBox mt="1rem" justifyContent="center">
     <Button
      variant="text"
      color="primary"
      onClick={() => toggleSummary(order?.Order?.invoice_id)}
      style={{
       padding: "0.5rem 1rem",
       backgroundColor: "var(--tz-ember-tint)",
       color: "var(--tz-ember-deep)",
       borderRadius: "300px",
       textAlign: "center",
       height: "40px",
       minWidth: "200px",
      }}
     >
      {openSummaries[order?.Order?.invoice_id] ? (
       <>
        Total Summary{" "}
        <FontAwesomeIcon icon={faCaretUp} style={{ marginLeft: "8px" }} />
       </>
      ) : (
       <>
        Total Summary{" "}
        <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: "8px" }} />
       </>
      )}
     </Button>
    </FlexBox>

    {openSummaries[order?.Order?.invoice_id] && (
     <Box p="20px" borderRadius={8} mt="1rem">
      <Typography variant="h6" fontWeight="bold" mt="0px" mb="14px">
       Total Summary (Overseas)
      </Typography>

      <FlexBox
       justifyContent="space-between"
       alignItems="center"
       mb="0.5rem"
       fontWeight="bold"
      >
       <Typography fontSize="14px" color="text.hint">
        Subtotal:
       </Typography>
       <Typography fontSize="14px" color="text.hint">
        {/* {currency(order?.Order?.items?.order_items?.[0]?.price || 0)} */}
        {currency(order?.Order?.main_total || 0)}
       </Typography>
      </FlexBox>

      <FlexBox
       justifyContent="space-between"
       color="var(--tz-success)"
       alignItems="center"
       mb="0.5rem"
       fontWeight="bold"
      >
       <Typography fontSize="14px">
        Advance Paid ({order?.Order?.amount_percentage}%):
       </Typography>
       <Typography fontSize="14px">
        {/* {currency(order?.Order?.items?.order_items?.[0]?.price || 0)} */}
        {currency(order?.Order?.amount - order?.Order?.delivery_charge || 0)}
       </Typography>
      </FlexBox>

      {order?.Order?.amount_percentage !== "100" && (
       <FlexBox
        justifyContent="space-between"
        alignItems="center"
        mb="0.5rem"
        color="var(--tz-ember-deep)"
        fontWeight="bold"
       >
        <Typography fontSize="14px">Due:</Typography>
        <Typography fontSize="14px">
         {currency(order?.Order?.due_amount || 0)}
        </Typography>
       </FlexBox>
      )}

      <FlexBox
       justifyContent="space-between"
       alignItems="center"
       mb="0.5rem"
       color="var(--tz-slate)"
       fontWeight="bold"
      >
       <Typography fontSize="14px">Shipping Fee:</Typography>

       {order?.Order?.delivery_charge === "0" ? (
        <FlexBox alignItems="center">
         <Typography fontSize="14px" mr="0.5rem">
          TBD
         </Typography>
         <Tooltip
          title="Shipping & Courier Charge will be calculated based on actual weight & dimensions when the product is in-house by Tizaraa."
          arrow
          placement="top"
         >
          <InfoOutlinedIcon fontSize="small" color="action" />
         </Tooltip>
        </FlexBox>
       ) : (
        <>
         <Box flex="1" textAlign="center">
          <Typography fontSize="13px" color="textSecondary">
           {order?.Order?.delivery_charge_reason} from{" "}
           {currency(order?.Order?.delivery_charge || 0)}
          </Typography>
         </Box>
         <Typography fontSize="14px">
          {currency(order?.Order?.delivery_charge || 0)}
         </Typography>
        </>
       )}
      </FlexBox>

      {/* <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
          <Typography fontSize="14px" color="text.hint">
            Shipping fee ({order?.Order?.items?.shop_name}):
          </Typography>
          <Typography fontSize="14px" color="text.hint">
            {currency(order?.Order?.items?.delivery_charge || 0)}
          </Typography>
        </FlexBox> */}

      <Divider mb="0.5rem" />

      <FlexBox
       justifyContent="space-between"
       alignItems="center"
       mb="1rem"
       fontWeight="bold"
      >
       <Typography variant="h6">Total Paid</Typography>
       <Typography variant="h6">
        {/* {currency(order?.Order?.items?.order_items?.[0]?.total_price || 0)} */}
        {currency(order?.Order?.paid || 0)}
       </Typography>
      </FlexBox>

      {/* <FlexBox alignItems="center" mb="1rem">
              Payment Method:
              <H6
                my="0px"
                mx="1rem"
                backgroundColor="rgba(255,225,230,1)"
                p="5px"
                px="10px"
                borderRadius="1rem"
                color="var(--tz-ember-deep)"
              >
                {order?.Order?.payment_method}
              </H6>
            </FlexBox>

            <FlexBox alignItems="center" mb="1rem">
              Payment Status:
              <H6
                my="0px"
                mx="1rem"
                backgroundColor={
                  order?.Order?.amount_percentage === 100
                    ? "rgba(200, 255, 200, 1)" // greenish for Paid
                    : order?.Order?.amount_percentage > 0
                    ? "rgba(255, 250, 200, 1)" // yellowish for Partial Paid
                    : "rgba(255,225,230,1)" // reddish for Unpaid
                }
                p="5px"
                px="10px"
                borderRadius="1rem"
                color={
                  order?.Order?.amount_percentage === 100
                    ? "green"
                    : order?.Order?.amount_percentage > 0
                    ? "orange"
                    : "var(--tz-ember-deep)"
                }
              >
                {order?.Order?.amount_percentage === 100
                  ? "Paid"
                  : order?.Order?.amount_percentage > 0
                  ? "Partial Paid"
                  : "Unpaid"}
              </H6>
            </FlexBox> */}

      <FlexBox
       style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "24px",
        marginBottom: "32px",
       }}
      >
       {/* Payment Method Card */}
       <Box
        style={{
         flex: 1,
         minWidth: "280px",
         padding: "28px",
         borderRadius: "20px",
         backgroundColor: "var(--tz-ember-tint)",
         boxShadow: "0 12px 24px rgba(0, 0, 0, 0.08)",
         transition: "all 0.3s ease-in-out",
         display: "flex",
         flexDirection: "column",
         gap: "12px",
        }}
       >
        <Typography
         style={{
          fontSize: "18px",
          fontWeight: "600",
          color: "var(--tz-ember-deep)",
         }}
        >
         Payment Method
        </Typography>
        <Typography
         style={{
          fontSize: "16px",
          backgroundColor: "var(--tz-danger-bg)",
          color: "var(--tz-danger)",
          padding: "10px 16px",
          borderRadius: "999px",
          fontWeight: "bold",
          width: "fit-content",
         }}
        >
         {order?.Order?.payment_method || "N/A"}
        </Typography>
       </Box>

       {/* Payment Status Card */}
       <Box
        style={{
         flex: 1,
         minWidth: "280px",
         padding: "28px",
         borderRadius: "20px",
         backgroundColor:
          order?.Order?.amount_percentage === 100
           ? "var(--tz-success-bg)"
           : order?.Order?.amount_percentage > 0
             ? "var(--tz-warning-bg)"
             : "var(--tz-ember-tint)",
         boxShadow: "0 12px 24px rgba(0, 0, 0, 0.08)",
         transition: "all 0.3s ease-in-out",
         display: "flex",
         flexDirection: "column",
         gap: "12px",
        }}
       >
        <Typography
         style={{
          fontSize: "18px",
          fontWeight: "600",
          color:
           order?.Order?.amount_percentage === 100
            ? "var(--tz-success)"
            : order?.Order?.amount_percentage > 0
              ? "var(--tz-warning)"
              : "var(--tz-danger)",
         }}
        >
         Payment Status
        </Typography>
        <Typography
         style={{
          fontSize: "16px",
          backgroundColor:
           order?.Order?.amount_percentage === "100"
            ? "var(--tz-success-bg)"
            : order?.Order?.amount_percentage > "0"
              ? "var(--tz-warning-bg)"
              : "var(--tz-danger-bg)",
          color:
           order?.Order?.amount_percentage === "100"
            ? "var(--tz-success)"
            : order?.Order?.amount_percentage > "0"
              ? "var(--tz-warning)"
              : "var(--tz-danger)",
          padding: "10px 16px",
          borderRadius: "999px",
          fontWeight: "bold",
          width: "fit-content",
         }}
        >
         {order?.Order?.delivery_charge &&
         order.Order.delivery_charge !== "0" &&
         order.Order.delivery_charge !== 0
          ? "Paid"
          : order?.Order?.amount_percentage === "100"
            ? "Paid (Excluding shipping fee)"
            : order?.Order?.amount_percentage > "0"
              ? "Partial Paid"
              : "Unpaid"}
        </Typography>
       </Box>
      </FlexBox>

      {!(
       order?.Order?.delivery_charge &&
       order.Order.delivery_charge !== "0" &&
       order.Order.delivery_charge !== 0
      ) && (
       <Box
        backgroundColor="rgba(240, 248, 255, 0.8)"
        borderLeft="4px solid var(--tz-ember-deep)"
        borderRight="4px solid var(--tz-ember-deep)"
        p="10px"
        borderRadius="0.5rem"
        fontSize="14px"
        color="var(--tz-ink)"
        fontWeight="500"
       >
        <FlexBox alignItems="flex-start">
         <Box mr="8px" fontSize="18px" lineHeight="1.5">
          📦
         </Box>
         <Box flex="1">
          Shipping & Courier Charge will be calculated based on actual weight &
          dimensions when the product is in-house by <strong>Tizaraa</strong>.
         </Box>
        </FlexBox>
       </Box>
      )}
     </Box>
    )}
   </Box>
  );
 }

 const shops = Object.entries(order?.Order?.items ?? {}) as [string, any][];
 const itemCount = shops.reduce((n, [, d]) => n + (d?.order_items?.length ?? 0), 0);
 const statusLabel = getStatusLabel(order.Order.status);
 const statusColor = getColor(order.Order.status);
 const isCorporateOrder = order?.Order?.payment_method === "corporate_credit";
 const fmt = (d?: string | null) => (d ? format(new Date(d), "dd MMM yyyy, hh:mm a") : "N/A");

 const copyId = async () => {
  try {
   await navigator.clipboard.writeText(String(order.Order.invoice_id));
   toast.success("Order ID copied");
  } catch {
   toast.error("Couldn't copy");
  }
 };

 return (
  <Fragment>
   <DashboardPageHeader
    title="Order details"
    iconName="bag_filled"
    button={<OrderListButton params={params} />}
   />

   <OD>
    {/* ---------- Summary ---------- */}
    <section className="od-hero" style={{ ["--tone" as any]: statusColor }}>
     <div className="od-hero-top">
      <div className="od-id">
       <small>Order</small>
       <div className="od-id-row">
        <h2>#{order.Order.invoice_id}</h2>
        <button type="button" className="od-icon-btn" onClick={copyId} aria-label="Copy order ID" title="Copy order ID">
         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
         </svg>
        </button>
        <span className="od-status">
         <i aria-hidden="true" />
         {statusLabel}
        </span>
       </div>
      </div>
      <div className="od-hero-actions">
       <a className="od-btn" href="/support-tickets">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
         <circle cx="12" cy="12" r="10" />
         <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" />
        </svg>
        Need help?
       </a>
      </div>
     </div>

     <dl className="od-facts">
      <div>
       <dt>Placed on</dt>
       <dd>{fmt(order.Order.createdAt)}</dd>
      </div>
      {order.Order.isDelivered && (
       <div>
        <dt>Delivered on</dt>
        <dd>{fmt(order.Order.deliveredAt)}</dd>
       </div>
      )}
      <div>
       <dt>Items</dt>
       <dd>{itemCount}</dd>
      </div>
      <div>
       <dt>Total</dt>
       <dd className="od-money">{currency(order.Order.amount || 0)}</dd>
      </div>
      <div>
       <dt>Payment</dt>
       <dd>{formatStatus(order.Order.payment_method) || "N/A"}</dd>
      </div>
     </dl>
     {invoiceError && <p className="od-error">{invoiceError}</p>}
    </section>

    <div className="od-grid">
     {/* ---------- Left: items, status, returns ---------- */}
     <div className="od-main">
      {abroadProduct && <section className="od-card">{abroadProduct}</section>}

      {order?.Order?.productType !== "Abroad" &&
       shops.map(([shopName, shopDetails]) => {
        const details = shopDetails as {
         delivered_at: string | null;
         return_deadline?: string | null;
         order_items: any[];
         delivery_charge: number | null;
         promocodeStatus: number | null;
         sub_total: number | null;
         total: number | null;
         status: string | null;
         isAbroad: boolean; // Add a flag for checking if the product is from abroad
        };
        return (
         <Fragment key={shopName}>
          <section className="od-card">
           <header className="od-shop">
            <span className="od-shop-icon" aria-hidden="true">
             <FontAwesomeIcon icon={faStore} />
            </span>
            <div className="od-shop-name">
             <small>Sold by</small>
             <strong>{shopName}</strong>
            </div>
            <span className="od-chip" style={{ ["--tone" as any]: getColor(details?.status) }}>
             {getStatusLabel(details?.status)}
            </span>
            {/* Pickup token — only once the seller has marked the corporate order packed */}
            {isCorporateOrder && details?.status === "Processing" && (
             <CorporatePickupToken
              invoiceNo={order.Order.invoice_id}
              buyerName={order.Order.buyer_name}
              packedAt={order.Order.packed_at}
              orderTotal={order.Order.amount}
              items={details.order_items
               .filter((item) => !item.item_cancelled_at)
               .map((item) => ({
                name: item.product_name,
                quantity: item.quantity,
                total: item.total_price ?? item.price * item.quantity,
               }))}
             />
            )}
           </header>

           {isCorporateOrder && details?.status === "Pending" && (
            <p className="od-note">
             Note: As a corporate employee, you can only cancel this product while the order is still Pending.
            </p>
           )}

           <div className="od-items">
            {details?.order_items?.map((item, ind) => (
             <WriteReview
              key={ind}
              item={item}
              shopName={shopName}
              orderDetails={details}
              status={details.status}
              orderItemId={item.order_item_id}
              cancel_status={item.status}
              order_days_gone={item.order_days_gone}
              return_status={item.return_status}
              delivered_at={details.delivered_at}
              return_deadline={details.return_deadline}
              isCorporate={isCorporateOrder}
             />
            ))}
           </div>
          </section>

          <OrderStatus
           orderStatus={details.status}
           deliveredAt={details.delivered_at}
           returnStatus={returnDetails[0]?.return_status ?? null}
           returnRecord={returnDetails[0] ?? null}
           isCorporate={isCorporateOrder}
           timeline={(details as any).timeline ?? order?.Order?.timeline ?? []}
          />
         </Fragment>
        );
       })}

      {/* Return details card */}
      {returnDetails.map((ret: any) => (
       <section key={ret.id} className="od-card od-return">
        <header className="od-return-head">
         <h3>Return request</h3>
         <span className="od-chip" style={{ ["--tone" as any]: "var(--tz-ember-deep)" }}>
          {formatStatus(ret.return_status)}
         </span>
        </header>
        <dl className="od-facts od-facts--plain">
         <div>
          <dt>Return type</dt>
          <dd>{formatStatus(ret.return_type)}</dd>
         </div>
         {ret.refund_amount && (
          <div>
           <dt>Refund amount</dt>
           <dd className="od-good">BDT {ret.refund_amount}</dd>
          </div>
         )}
        </dl>
        {ret.return_reason && (
         <div className="od-reason">
          <small>Reason</small>
          <p>{ret.return_reason}</p>
         </div>
        )}
        {ret.images?.length > 0 && (
         <div className="od-photos">
          <small>Submitted photos</small>
          <div>
           {ret.images.map((url: string, i: number) => (
            <a key={i} href={url} target="_blank" rel="noopener noreferrer">
             <img src={url} alt={`Return photo ${i + 1}`} loading="lazy" />
            </a>
           ))}
          </div>
         </div>
        )}
       </section>
      ))}
     </div>

     {/* ---------- Right: money + address ---------- */}
     <aside className="od-side">
      {order?.Order?.productType !== "Abroad" &&
       shops.map(([shopName, details]) => (
        <OrderTotalSummary key={shopName} order={order} details={details} shopName={shopName} />
       ))}
      <ShippingAddressCard
       address={order.Order.address}
       area={order.Order.area_id}
       city={order.Order.city_id}
       province={order.Order.province_id}
       phone={order.Order.phone}
       name={order.Order.buyer_name}
       delivered={Boolean(order.Order.isDelivered)}
      />
     </aside>

     {/* Invoice only once the order is delivered — there is nothing to invoice while it is
         still pending, and a cancelled order has no delivery to bill for. */}
     {order.Order.isDelivered && (
      <div className="od-bottom">
       <button type="button" className="od-btn od-btn--solid" onClick={fetchInvoice} disabled={invoiceLoading}>
        {invoiceLoading ? (
         <span className="od-spin" aria-hidden="true" />
        ) : (
         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
         </svg>
        )}
        Invoice
       </button>
      </div>
     )}
    </div>
   </OD>

   {/* Invoice viewer */}
   {invoiceUrl && (
    <InvoiceDialog
     role="dialog"
     aria-modal="true"
     aria-label={`Invoice ${order.Order.invoice_id ?? params.id}`}
     onClick={(e) => {
      if (e.target === e.currentTarget) setInvoiceUrl(null);
     }}
    >
     <div className="iv-box">
      <div className="iv-head">
       <strong>Invoice #{order.Order.invoice_id}</strong>
       <div>
        <a className="od-btn od-btn--solid" href={invoiceUrl} download={`invoice-${order.Order.invoice_id ?? params.id}.pdf`}>
         Download
        </a>
        <button type="button" className="od-icon-btn" onClick={() => setInvoiceUrl(null)} aria-label="Close invoice">
         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M18 6 6 18M6 6l12 12" />
         </svg>
        </button>
       </div>
      </div>
      <iframe src={invoiceUrl} title={`Invoice ${order.Order.invoice_id ?? params.id}`} />
     </div>
    </InvoiceDialog>
   )}
  </Fragment>
 );
}
