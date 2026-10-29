"use client";

import { useState } from "react";
import { format } from "date-fns";
import { jsPDF } from "jspdf";
import toast from "react-hot-toast";
import BeatLoader from "react-spinners/BeatLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import axios from "@lib/axiosClient";
import { Button } from "@component/buttons";

export interface PickupTokenItem {
 name: string;
 quantity: number;
 total: number;
}

interface Props {
 invoiceNo: string;
 buyerName: string | null;
 packedAt: string | null;
 items: PickupTokenItem[];
 orderTotal: number;
}

interface EmployeeCredit {
 credit_limit: number;
 credit_used: number;
 credit_balance: number;
}

// Receipt geometry (mm) — an 80mm thermal-slip look
const PAGE_W = 80;
const MARGIN = 6;
const RIGHT = PAGE_W - MARGIN;
const BRAND = "#EC4462";
const MUTED = "#7A8A99";
const INK = "#2C3A4A";

/**
 * Random-looking 6-digit token derived from the invoice number, so the same
 * order always prints the same token (employee and counter see one number).
 */
export const pickupTokenFor = (invoiceNo: string): string => {
 let hash = 2166136261;
 for (let i = 0; i < invoiceNo.length; i++) {
  hash ^= invoiceNo.charCodeAt(i);
  hash = Math.imul(hash, 16777619);
 }
 return `T-${String((hash >>> 0) % 1000000).padStart(6, "0")}`;
};

const bdt = (n: number) =>
 `BDT ${Number(n || 0).toLocaleString("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
 })}`;

const readEmployeeCode = (): string | null => {
 try {
  const info = JSON.parse(localStorage.getItem("userInfo") || "null");
  return info?.employee_code ?? null;
 } catch {
  return null;
 }
};

export default function CorporatePickupToken({
 invoiceNo,
 buyerName,
 packedAt,
 items,
 orderTotal,
}: Props) {
 const [loading, setLoading] = useState(false);

 const buildPdf = (credit: EmployeeCredit | null) => {
  const token = pickupTokenFor(invoiceNo);
  const code = readEmployeeCode();
  const employee = [buyerName || "Employee", code ? `(${code})` : null]
   .filter(Boolean)
   .join(" ");

  // Page fits the content: fixed lines + one line per item (+ credit block)
  const height = 99 + items.length * 5 + (credit ? 15 : 0);
  const doc = new jsPDF({ unit: "mm", format: [PAGE_W, height] });
  let y = 10;

  const center = (text: string, size: number, color = INK, bold = false) => {
   doc.setFont("courier", bold ? "bold" : "normal");
   doc.setFontSize(size);
   doc.setTextColor(color);
   doc.text(text, PAGE_W / 2, y, { align: "center" });
  };

  const row = (label: string, value: string, bold = false, color = INK) => {
   doc.setFont("courier", bold ? "bold" : "normal");
   doc.setFontSize(8.5);
   doc.setTextColor(color);
   // Long text is cut with "..." so label and value never overlap
   const fit = (text: string, maxW: number) => {
    let shown = text;
    while (shown.length > 4 && doc.getTextWidth(shown) > maxW) {
     shown = shown.slice(0, -4) + "...";
    }
    return shown;
   };
   const labelW = Math.min(doc.getTextWidth(label), (RIGHT - MARGIN) * 0.6);
   const shownValue = fit(value, RIGHT - MARGIN - labelW - 2);
   const shownLabel = fit(label, RIGHT - MARGIN - doc.getTextWidth(shownValue) - 2);
   doc.text(shownLabel, MARGIN, y);
   doc.text(shownValue, RIGHT, y, { align: "right" });
  };

  const dashed = () => {
   doc.setDrawColor(INK);
   doc.setLineWidth(0.3);
   doc.setLineDashPattern([1.2, 0.8], 0);
   doc.line(MARGIN, y, RIGHT, y);
   doc.setLineDashPattern([], 0);
  };

  center("Tizaraa", 13, BRAND, true);
  y += 5;
  center("CORPORATE SHOP", 8, MUTED);
  y += 4;
  dashed();

  y += 6;
  center("ORDER TOKEN", 8, MUTED);
  y += 11;
  center(token, 26, INK, true);
  y += 5;
  dashed();

  y += 6;
  row("Date", packedAt ? format(new Date(packedAt), "dd MMM yyyy, HH:mm") : "-");
  y += 5;
  row("Employee", employee);
  y += 5;
  row("Order no.", `#${invoiceNo}`);
  y += 4;
  dashed();

  y += 5;
  row("ITEM", "AMOUNT", false, MUTED);
  items.forEach((item) => {
   y += 5;
   row(`${item.quantity}x ${item.name}`, bdt(item.total));
  });
  y += 4;
  dashed();

  y += 6;
  row("ORDER TOTAL", bdt(orderTotal), true);
  if (credit) {
   y += 5;
   row("Credit limit", bdt(credit.credit_limit));
   y += 5;
   row("Used (incl. this)", bdt(credit.credit_used));
   y += 5;
   row("Available", bdt(credit.credit_balance), true);
  }
  y += 4;
  dashed();

  y += 6;
  center("Show this token at the pickup counter.", 7.5, MUTED);

  doc.save(`Tizaraa-Token-${token}.pdf`);
 };

 const handleDownload = async () => {
  setLoading(true);
  try {
   let credit: EmployeeCredit | null = null;
   try {
    const response = await axios.post("employee-details");
    credit = response.data?.data ?? null;
   } catch {
    // Credit lines are optional — the token still prints without them
    credit = null;
   }
   buildPdf(credit);
  } catch {
   toast.error("Could not create the token. Please try again.");
  } finally {
   setLoading(false);
  }
 };

 return (
  <Button
   size="small"
   variant="outlined"
   color="primary"
   onClick={handleDownload}
   disabled={loading}
   style={{ height: "28px", padding: "0 10px", fontSize: "12px", gap: "6px" }}
  >
   {loading ? (
    <BeatLoader size={6} color="currentColor" />
   ) : (
    <>
     <FontAwesomeIcon icon={faDownload} />
     Download Token
    </>
   )}
  </Button>
 );
}
