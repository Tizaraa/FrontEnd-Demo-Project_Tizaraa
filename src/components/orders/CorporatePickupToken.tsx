"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import BeatLoader from "react-spinners/BeatLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import axios from "@lib/axiosClient";
import { Button } from "@component/buttons";

interface Props {
  orderId: number | string;
  invoiceNo: string;
}

/**
 * Random-looking 6-digit token derived from the invoice number, so the same
 * order always prints the same token (employee and counter see one number).
 * Must match PickupTokenService::tokenFor() in customer-api and the seller panel.
 */
export const pickupTokenFor = (invoiceNo: string): string => {
  let hash = 2166136261;
  for (let i = 0; i < invoiceNo.length; i++) {
    hash ^= invoiceNo.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return `T-${String((hash >>> 0) % 1000000).padStart(6, "0")}`;
};

// Downloads the pickup token PDF — the same receipt the seller and the SMS link give.
export default function CorporatePickupToken({ orderId, invoiceNo }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`user/order/${orderId}/pickup-token`, {
        responseType: "blob",
      });
      const url = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Tizaraa-Token-${pickupTokenFor(invoiceNo)}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Could not download the token. Please try again.");
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
