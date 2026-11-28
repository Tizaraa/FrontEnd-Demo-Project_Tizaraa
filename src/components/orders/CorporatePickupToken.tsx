"use client";

import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import BeatLoader from "react-spinners/BeatLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faChevronDown,
  faFilePdf,
  faFileImage,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import axios from "@lib/axiosClient";
import styled from "styled-components";

interface Props {
  orderId: number | string;
  invoiceNo: string;
}

interface TokenItem {
  name: string;
  quantity: number;
  total: number;
}

interface TokenData {
  token: string;
  invoiceNo: string;
  paymentMethod?: string;
  isCod?: boolean;
  packedAt?: string | null;
  employee?: string;
  items: TokenItem[];
  orderTotal: number;
  credit?: {
    limit: number;
    used: number;
    available: number;
  } | null;
}

export const pickupTokenFor = (invoiceNo: string): string => {
  let hash = 2166136261;
  for (let i = 0; i < invoiceNo.length; i++) {
    hash ^= invoiceNo.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return `T-${String((hash >>> 0) % 1000000).padStart(6, "0")}`;
};

const TokenDropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  z-index: 50;
`;

const MainButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 12px;
  font-size: 12px;
  font-weight: 600;
  color: #c2410c;
  background: #ffffff;
  border: 1px solid #c2410c;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #fff7ed;
    border-color: #ea580c;
    color: #ea580c;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .arrow-icon {
    font-size: 10px;
    margin-left: 2px;
    transition: transform 0.2s ease;
  }

  &.open .arrow-icon {
    transform: rotate(180deg);
  }
`;

const MenuDropdown = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  z-index: 99999;
  min-width: 220px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 12px 30px -5px rgba(0, 0, 0, 0.15), 0 8px 12px -6px rgba(0, 0, 0, 0.1);
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  animation: fadeIn 0.15s ease-out;

  @media (max-width: 600px) {
    min-width: 200px;
    max-width: calc(100vw - 32px);
    right: 0;
    left: auto;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MenuDivider = styled.div`
  height: 1px;
  background-color: #e2e8f0;
  margin: 4px 6px;
`;

const MenuSectionTitle = styled.div`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #94a3b8;
  padding: 4px 10px 2px;
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 10px;
  font-size: 12px;
  font-weight: 500;
  color: #334155;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s ease, color 0.15s ease;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover, &:active {
    background: #f1f5f9;
    color: #0f172a;
  }

  &.wa-item:hover, &.wa-item:active {
    background: #f0fdf4;
    color: #16a34a;
  }

  @media (max-width: 600px) {
    padding: 10px 10px; /* larger tap target on mobile */
    font-size: 13px;
  }

  .item-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .item-icon {
    font-size: 14px;
    width: 16px;
    text-align: center;
  }

  .icon-pdf {
    color: #dc2626;
  }
  .icon-png {
    color: #2563eb;
  }
  .icon-wa {
    color: #22c55e;
  }

  .tag {
    font-size: 9px;
    font-weight: 600;
    padding: 2px 5px;
    border-radius: 4px;
    background: #f1f5f9;
    color: #64748b;
  }
`;

export default function CorporatePickupToken({ orderId, invoiceNo }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch token metadata from API
  const fetchTokenData = async (): Promise<TokenData | null> => {
    try {
      const response = await axios.get(`user/order/${orderId}/pickup-token?format=json`);
      if (response.data?.success && response.data?.data) {
        return response.data.data;
      }
      return null;
    } catch {
      return null;
    }
  };

  // Helper: Fetch PDF Blob
  const getPdfBlob = async (): Promise<Blob> => {
    const response = await axios.get(`user/order/${orderId}/pickup-token`, {
      responseType: "blob",
      headers: {
        Accept: "application/pdf",
      },
    });
    return response.data;
  };

  // Helper: Generate Canvas PNG Data
  const generatePngBlob = async (): Promise<{ blob: Blob; token: string }> => {
    const tokenData = await fetchTokenData();
    const token = tokenData?.token || pickupTokenFor(invoiceNo);
    const items = tokenData?.items || [];
    const orderTotal = tokenData?.orderTotal ?? 0;
    const credit = tokenData?.credit;
    const employee = tokenData?.employee || "Corporate Employee";

    const width = 480;
    const padding = 32;
    const lineSpacing = 28;
    const itemsHeight = items.length * lineSpacing;
    const creditHeight = credit ? 80 : 0;
    const height = 480 + itemsHeight + creditHeight;

    const canvas = document.createElement("canvas");
    canvas.width = width * 2;
    canvas.height = height * 2;
    const ctx = canvas.getContext("2d");

    if (!ctx) throw new Error("Canvas context unavailable");

    ctx.scale(2, 2);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    ctx.fillStyle = "#000000";
    ctx.font = "bold 22px monospace, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Tizaraa", width / 2, 45);

    ctx.fillStyle = "#000000";
    ctx.font = "bold 11px monospace, sans-serif";
    ctx.fillText("CORPORATE SHOP", width / 2, 65);

    const drawDashedLine = (y: number) => {
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    let currentY = 82;
    drawDashedLine(currentY);

    currentY += 26;
    ctx.fillStyle = "#000000";
    ctx.font = "11px monospace, sans-serif";
    ctx.fillText("ORDER TOKEN · CORPORATE EMPLOYEE COPY", width / 2, currentY);

    currentY += 46;
    ctx.fillStyle = "#000000";
    ctx.font = "bold 34px monospace, sans-serif";
    ctx.fillText(token, width / 2, currentY);

    currentY += 18;
    drawDashedLine(currentY);

    currentY += 24;
    ctx.font = "12px monospace, sans-serif";
    ctx.textAlign = "left";

    ctx.fillStyle = "#000000";
    ctx.fillText("Employee", padding, currentY);
    ctx.fillStyle = "#000000";
    ctx.textAlign = "right";
    ctx.fillText(employee.length > 24 ? employee.slice(0, 24) + "..." : employee, width - padding, currentY);

    currentY += 22;
    ctx.textAlign = "left";
    ctx.fillStyle = "#000000";
    ctx.fillText("Order no.", padding, currentY);
    ctx.fillStyle = "#000000";
    ctx.textAlign = "right";
    ctx.fillText(`#${invoiceNo}`, width - padding, currentY);

    if (tokenData?.isCod || tokenData?.paymentMethod === "cod") {
      currentY += 20;
      ctx.textAlign = "left";
      ctx.fillStyle = "#000000";
      ctx.fillText("Payment", padding, currentY);
      ctx.fillStyle = "#000000";
      ctx.font = "bold 13px monospace, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("Cash on Delivery (COD)", width - padding, currentY);
      ctx.font = "12px monospace, sans-serif";
    }

    currentY += 16;
    drawDashedLine(currentY);

    currentY += 20;
    ctx.textAlign = "left";
    ctx.fillStyle = "#000000";
    ctx.font = "bold 11px monospace, sans-serif";
    ctx.fillText("ITEM", padding, currentY);
    ctx.textAlign = "right";
    ctx.fillText("AMOUNT", width - padding, currentY);

    ctx.font = "12px monospace, sans-serif";
    items.forEach((item) => {
      currentY += 22;
      ctx.textAlign = "left";
      ctx.fillStyle = "#000000";
      const itemName = `${item.quantity}x ${item.name}`;
      ctx.fillText(itemName.length > 25 ? itemName.slice(0, 25) + "..." : itemName, padding, currentY);
      ctx.textAlign = "right";
      ctx.fillText(`BDT ${Number(item.total).toFixed(2)}`, width - padding, currentY);
    });

    currentY += 16;
    drawDashedLine(currentY);

    currentY += 24;
    ctx.font = "bold 13px monospace, sans-serif";
    ctx.textAlign = "left";
    ctx.fillStyle = "#000000";
    ctx.fillText("ORDER TOTAL", padding, currentY);
    ctx.textAlign = "right";
    ctx.fillText(`BDT ${Number(orderTotal).toFixed(2)}`, width - padding, currentY);

    if (credit) {
      currentY += 22;
      ctx.font = "12px monospace, sans-serif";
      ctx.textAlign = "left";
      ctx.fillStyle = "#000000";
      ctx.fillText("Credit Limit", padding, currentY);
      ctx.textAlign = "right";
      ctx.fillStyle = "#000000";
      ctx.fillText(`BDT ${Number(credit.limit).toFixed(2)}`, width - padding, currentY);

      currentY += 20;
      ctx.textAlign = "left";
      ctx.fillStyle = "#000000";
      ctx.fillText("Available Credit", padding, currentY);
      ctx.textAlign = "right";
      ctx.fillStyle = "#000000";
      ctx.font = "bold 12px monospace, sans-serif";
      ctx.fillText(`BDT ${Number(credit.available).toFixed(2)}`, width - padding, currentY);
    }

    currentY += 18;
    drawDashedLine(currentY);

    currentY += 28;
    ctx.font = "11px monospace, sans-serif";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.fillText("Show this token at the pickup counter.", width / 2, currentY);

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve({ blob, token });
        } else {
          reject(new Error("Canvas blob conversion failed"));
        }
      }, "image/png");
    });
  };

  // 1. Download PDF
  const handleDownloadPdf = async () => {
    setLoading("pdf");
    try {
      const blob = await getPdfBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Tizaraa-Token-${pickupTokenFor(invoiceNo)}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      toast.success("Token PDF downloaded successfully!");
      setOpen(false);
    } catch {
      toast.error("Could not download PDF. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  // 2. Download PNG
  const handleDownloadPng = async () => {
    setLoading("png");
    try {
      const { blob, token } = await generatePngBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Tizaraa-Token-${token}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      toast.success("Token PNG downloaded successfully!");
      setOpen(false);
    } catch {
      toast.error("Could not download PNG. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  // Helper to open WhatsApp Web/App with message
  const openWhatsAppUrl = (token: string, fileNotice = "") => {
    const text =
      `*Tizaraa Corporate Order Token*\n\n` +
      `📦 *Order No:* #${invoiceNo}\n` +
      `🔑 *Pickup Token:* *${token}*\n` +
      (fileNotice ? `📎 *${fileNotice}*\n` : "") +
      `\nShow this token at the pickup counter to collect your order.\n` +
      `https://tizaraa.shop`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank", "width=600,height=500");
  };

  // 3. Share on WhatsApp (PDF)
  const handleShareWhatsAppPdf = async () => {
    setLoading("wa-pdf");
    try {
      const token = pickupTokenFor(invoiceNo);
      const blob = await getPdfBlob();
      const fileName = `Tizaraa-Token-${token}.pdf`;
      const file = new File([blob], fileName, { type: "application/pdf" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Tizaraa Token ${token}`,
          text: `Pickup Token ${token} for Order #${invoiceNo}`,
        });
        toast.success("Shared PDF successfully!");
      } else {
        // Fallback: auto-download PDF and open WhatsApp with token details
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);

        openWhatsAppUrl(token, `Downloaded PDF: ${fileName} (attach in chat)`);
        toast.success("PDF saved! Opening WhatsApp to send...");
      }
      setOpen(false);
    } catch (e: any) {
      if (e?.name !== "AbortError") {
        toast.error("Could not share PDF to WhatsApp.");
      }
    } finally {
      setLoading(null);
    }
  };

  // 4. Share on WhatsApp (PNG)
  const handleShareWhatsAppPng = async () => {
    setLoading("wa-png");
    try {
      const { blob, token } = await generatePngBlob();
      const fileName = `Tizaraa-Token-${token}.png`;
      const file = new File([blob], fileName, { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Tizaraa Token ${token}`,
          text: `Pickup Token ${token} for Order #${invoiceNo}`,
        });
        toast.success("Shared PNG successfully!");
      } else {
        // Fallback: auto-download PNG and open WhatsApp with token details
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);

        openWhatsAppUrl(token, `Downloaded Image: ${fileName} (attach in chat)`);
        toast.success("PNG image saved! Opening WhatsApp to send...");
      }
      setOpen(false);
    } catch (e: any) {
      if (e?.name !== "AbortError") {
        toast.error("Could not share PNG to WhatsApp.");
      }
    } finally {
      setLoading(null);
    }
  };

  return (
    <TokenDropdownWrapper ref={wrapperRef}>
      <MainButton
        type="button"
        className={open ? "open" : ""}
        onClick={() => setOpen(!open)}
        disabled={!!loading}
      >
        {loading ? (
          <BeatLoader size={6} color="#c2410c" />
        ) : (
          <>
            <FontAwesomeIcon icon={faDownload} />
            <span>Download Token</span>
            <FontAwesomeIcon icon={faChevronDown} className="arrow-icon" />
          </>
        )}
      </MainButton>

      {open && (
        <MenuDropdown>
          {/* Download Options */}
          <MenuSectionTitle>Download File</MenuSectionTitle>
          <MenuItem type="button" onClick={handleDownloadPdf}>
            <div className="item-left">
              <FontAwesomeIcon icon={faFilePdf} className="item-icon icon-pdf" />
              <span>Download PDF</span>
            </div>
            <span className="tag">PDF</span>
          </MenuItem>

          <MenuItem type="button" onClick={handleDownloadPng}>
            <div className="item-left">
              <FontAwesomeIcon icon={faFileImage} className="item-icon icon-png" />
              <span>Download PNG</span>
            </div>
            <span className="tag">PNG</span>
          </MenuItem>

          <MenuDivider />

          {/* WhatsApp Share Options */}
          <MenuSectionTitle>Share on WhatsApp</MenuSectionTitle>
          <MenuItem type="button" className="wa-item" onClick={handleShareWhatsAppPdf}>
            <div className="item-left">
              <FontAwesomeIcon icon={faWhatsapp} className="item-icon icon-wa" />
              <span>Share PDF on WhatsApp</span>
            </div>
            <span className="tag">PDF</span>
          </MenuItem>

          <MenuItem type="button" className="wa-item" onClick={handleShareWhatsAppPng}>
            <div className="item-left">
              <FontAwesomeIcon icon={faWhatsapp} className="item-icon icon-wa" />
              <span>Share PNG on WhatsApp</span>
            </div>
            <span className="tag">PNG</span>
          </MenuItem>
        </MenuDropdown>
      )}
    </TokenDropdownWrapper>
  );
}
