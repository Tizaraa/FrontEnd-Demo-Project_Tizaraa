"use client";

import { useState } from "react";
import { format } from "date-fns";
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

// Receipt styling constants
const BRAND = "#EC4462";
const MUTED = "#7A8A99";
const INK = "#2C3A4A";
const BORDER = "#E2E8F0";

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

  const buildPng = (credit: EmployeeCredit | null) => {
    const token = pickupTokenFor(invoiceNo);
    const code = readEmployeeCode();
    const employee = [buyerName || "Employee", code ? `(${code})` : null]
      .filter(Boolean)
      .join(" ");

    const WIDTH = 480;
    const PADDING = 28;
    const RIGHT = WIDTH - PADDING;
    const SCALE = 2; // 2x for sharp retina rendering
    const totalHeight = 362 + items.length * 24 + (credit ? 88 : 0);

    const canvas = document.createElement("canvas");
    canvas.width = WIDTH * SCALE;
    canvas.height = totalHeight * SCALE;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      toast.error("Could not initialize canvas context.");
      return;
    }

    ctx.scale(SCALE, SCALE);

    // White background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, WIDTH, totalHeight);

    // Subtle clean border
    ctx.strokeStyle = BORDER;
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, WIDTH - 1, totalHeight - 1);

    let y = 32;

    const center = (text: string, font: string, color: string) => {
      ctx.font = font;
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, WIDTH / 2, y);
    };

    const row = (
      label: string,
      value: string,
      font: string,
      color: string = INK
    ) => {
      ctx.font = font;
      ctx.fillStyle = color;
      ctx.textBaseline = "middle";

      const valW = ctx.measureText(value).width;
      const maxLabelW = RIGHT - PADDING - valW - 12;

      let displayLabel = label;
      if (ctx.measureText(displayLabel).width > maxLabelW) {
        while (
          displayLabel.length > 3 &&
          ctx.measureText(displayLabel + "...").width > maxLabelW
        ) {
          displayLabel = displayLabel.slice(0, -1);
        }
        displayLabel += "...";
      }

      ctx.textAlign = "left";
      ctx.fillText(displayLabel, PADDING, y);

      ctx.textAlign = "right";
      ctx.fillText(value, RIGHT, y);
    };

    const dashed = () => {
      ctx.strokeStyle = "#B0BCC7";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(PADDING, y);
      ctx.lineTo(RIGHT, y);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    // Header
    center("Tizaraa", "bold 24px 'Segoe UI', Roboto, sans-serif", BRAND);
    y += 24;
    center("CORPORATE SHOP", "600 12px 'Courier New', monospace", MUTED);
    y += 18;
    dashed();

    // Token
    y += 22;
    center("ORDER TOKEN", "600 12px 'Courier New', monospace", MUTED);
    y += 34;
    center(token, "bold 38px 'Courier New', monospace", INK);
    y += 26;
    dashed();

    // Order Info
    y += 22;
    row(
      "Date",
      packedAt ? format(new Date(packedAt), "dd MMM yyyy, HH:mm") : "-",
      "13px 'Courier New', monospace",
      INK
    );
    y += 24;
    row("Employee", employee, "13px 'Courier New', monospace", INK);
    y += 24;
    row("Order no.", `#${invoiceNo}`, "13px 'Courier New', monospace", INK);
    y += 20;
    dashed();

    // Items table
    y += 20;
    row("ITEM", "AMOUNT", "600 12px 'Courier New', monospace", MUTED);
    items.forEach((item) => {
      y += 24;
      row(
        `${item.quantity}x ${item.name}`,
        bdt(item.total),
        "13px 'Courier New', monospace",
        INK
      );
    });
    y += 20;
    dashed();

    // Order total
    y += 24;
    row(
      "ORDER TOTAL",
      bdt(orderTotal),
      "bold 14px 'Courier New', monospace",
      INK
    );

    // Optional employee credit details
    if (credit) {
      y += 24;
      row(
        "Credit limit",
        bdt(credit.credit_limit),
        "13px 'Courier New', monospace",
        INK
      );
      y += 22;
      row(
        "Used (incl. this)",
        bdt(credit.credit_used),
        "13px 'Courier New', monospace",
        INK
      );
      y += 22;
      row(
        "Available",
        bdt(credit.credit_balance),
        "bold 13px 'Courier New', monospace",
        INK
      );
      y += 20;
      dashed();
    } else {
      y += 20;
      dashed();
    }

    // Footer note
    y += 24;
    center(
      "Show this token at the pickup counter.",
      "12px 'Courier New', monospace",
      MUTED
    );

    // Download PNG synchronously
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `Tizaraa-Token-${token}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      buildPng(credit);
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
