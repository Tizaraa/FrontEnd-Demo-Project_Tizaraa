"use client";

import TextArea from "@component/textarea";
import Typography, { H6, SemiSpan } from "@component/Typography";
import { Button } from "@mui/material";
import ApiBaseUrl from "api/ApiBaseUrl";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "@lib/axiosClient";
import { useRouter, useSearchParams } from "next/navigation";
import CheckBox from "@component/CheckBox";
import FlexBox from "@component/FlexBox";
import Box from "@component/Box";
import toast from "react-hot-toast";

const REASON_CATEGORIES = [
  { value: "buyer_remorse", label: "Changed my mind / No longer needed" },
  { value: "seller_fault", label: "Damaged / Defective / Wrong item" },
];

const RETURN_TYPES = [
  { value: "refund", label: "Refund" },
  { value: "replacement", label: "Replacement" },
  { value: "store_credit", label: "Store Credit" },
];

const ReturnPage = () => {
  const [returnItem, setReturnItem] = useState<any | null>(null);
  const [returnReason, setReturnReason] = useState("");
  const [reasonCategory, setReasonCategory] = useState("buyer_remorse");
  const [returnType, setReturnType] = useState("refund");
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = Number(searchParams.get("orderId"));

  useEffect(() => {
    const storedItem = sessionStorage.getItem("returnItem");
    if (storedItem) {
      setReturnItem(JSON.parse(storedItem));
    }
  }, []);

  if (!returnItem) {
    return <Typography>Loading...</Typography>;
  }

  const maxLength = 1000;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files).slice(0, 5));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("order_id", String(orderId || returnItem.order_id));
    formData.append("order_item_id", String(returnItem.order_item_id));
    formData.append("return_reason_category", reasonCategory);
    formData.append("return_reason", returnReason);
    formData.append("return_type", returnType);
    images.forEach((img) => formData.append("images[]", img));

    try {
      await axios.post("order/item/return", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Return request submitted successfully");
      router.back();
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ?? "Failed to submit return request.";
      toast.error(msg);
    }
  };

  const productImageSrc = /^https?:\/\//i.test(returnItem.product_image)
    ? returnItem.product_image
    : `${ApiBaseUrl.ImgUrl}${returnItem.product_image}`;

  const canSubmit =
    policyAccepted &&
    returnReason.trim().length >= 10 &&
    (reasonCategory !== "seller_fault" || images.length > 0);

  return (
    <div>
      <Box p="1.5rem" borderRadius="8px" bg="white" shadow={4}>
        <Typography style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1.5rem" }}>
          Return Request
        </Typography>

        {/* Product summary */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.5rem" }}>
          <Image
            src={productImageSrc}
            alt={returnItem.product_name}
            width={100}
            height={100}
            style={{ borderRadius: "0.375rem", objectFit: "cover" }}
          />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.25rem" }}>
              {returnItem.product_name}
            </p>
            <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
              Qty: {returnItem.quantity}
            </p>
          </div>
        </div>

        {/* Reason category */}
        <Box mb="1rem">
          <Typography style={{ fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>
            Reason Category <span style={{ color: "#e94560" }}>*</span>
          </Typography>
          <select
            value={reasonCategory}
            onChange={(e) => setReasonCategory(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
            }}
          >
            {REASON_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </Box>

        {/* Return type */}
        <Box mb="1rem">
          <Typography style={{ fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>
            Return Type <span style={{ color: "#e94560" }}>*</span>
          </Typography>
          <select
            value={returnType}
            onChange={(e) => setReturnType(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
            }}
          >
            {RETURN_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Box>

        {/* Return reason */}
        <Box mb="1rem">
          <Typography style={{ fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>
            Return Reason <span style={{ color: "#e94560" }}>*</span>
          </Typography>
          <div style={{ position: "relative" }}>
            <TextArea
              value={returnReason}
              onChange={(e) => setReturnReason(e.target.value)}
              maxLength={maxLength}
              placeholder="Describe the reason for your return (min 10 characters)"
              style={{
                minHeight: "100px",
                width: "100%",
                resize: "none",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "0.375rem",
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: "0.5rem",
                right: "0.5rem",
                fontSize: "0.75rem",
                color: "#6c757d",
              }}
            >
              {returnReason.length}/{maxLength}
            </span>
          </div>
        </Box>

        {/* Images */}
        <Box mb="1.5rem">
          <Typography style={{ fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>
            Upload Images{reasonCategory === "seller_fault" && <span style={{ color: "#e94560" }}> * (required for damaged/defective items)</span>}
          </Typography>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleImageChange}
          />
          <Typography style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.25rem" }}>
            Max 5 images. JPG, PNG, WEBP accepted.
          </Typography>
        </Box>

        {/* Policy */}
        <Box mb="1.5rem" p="1rem" bg="#f8f9fa" borderRadius="0.375rem">
          <Typography style={{ fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>
            Return Policy
          </Typography>
          <ol style={{ listStyleType: "decimal", paddingLeft: "1rem", fontSize: "0.875rem", margin: 0 }}>
            <li style={{ marginBottom: "0.5rem" }}>
              Buyer remorse returns are accepted within <strong>7 days</strong> of delivery.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Damaged or defective item returns must be reported within <strong>48 hours</strong> of delivery and require photo evidence.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Refunds are processed within 24 hours after the return is approved.
            </li>
            <li>
              Products in non-returnable categories are not eligible for returns.
            </li>
          </ol>
        </Box>

        <CheckBox
          mb="1.75rem"
          name="agreement"
          color="secondary"
          onChange={(e) => setPolicyAccepted(e.target.checked)}
          checked={policyAccepted}
          label={
            <FlexBox>
              <SemiSpan>I have read and accepted the Return Policy of</SemiSpan>
              <a href="/terms_condition" target="_blank" rel="noreferrer noopener">
                <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                  Tizaraa
                </H6>
              </a>
            </FlexBox>
          }
          required
        />

        <Button
          style={{
            width: "100%",
            maxWidth: "200px",
            backgroundColor: !canSubmit ? "#d1d1d1" : "#e94560",
            color: "#fff",
          }}
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          SUBMIT RETURN
        </Button>
      </Box>
    </div>
  );
};

export default ReturnPage;
