import React, { useState, useRef, useEffect } from "react";
import Box from "@component/Box";
import Avatar from "@component/avatar";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import Typography, { H6 } from "@component/Typography";
import { currency } from "@utils/utils";
import { format } from "date-fns";
import Modal from "@component/Modal";
import toast from "react-hot-toast";
import ApiBaseUrl from "api/ApiBaseUrl";
import axios from "@lib/axiosClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReturnedOrderStatus from "./ReturnedOrderStatus";
import styled, { keyframes } from "styled-components";

// One order item: thumbnail, name, variant, unit price × qty on the left;
// line total and actions on the right. Cancelled / returned items are dimmed.
// Review dialog
const rvPop = keyframes`
 from { opacity: 0; transform: translateY(12px) scale(0.97); }
 to { opacity: 1; transform: none; }
`;
const rvStar = keyframes`
 0% { transform: scale(1); }
 40% { transform: scale(1.35) rotate(-8deg); }
 100% { transform: scale(1); }
`;
const rvWord = keyframes`
 from { opacity: 0; transform: translateY(4px); }
 to { opacity: 1; transform: none; }
`;
const rvSpin = keyframes`
 to { transform: rotate(360deg); }
`;

const ReviewBox = styled.div`
 position: relative;
 display: flex;
 flex-direction: column;
 width: 540px;
 max-width: 94vw;
 max-height: 90vh;
 margin: 0 auto;
 overflow: hidden;
 border-radius: 22px;
 background: ${({ theme }) => theme.tz.color.paper};
 box-shadow: 0 24px 60px rgba(14, 52, 96, 0.25);
 animation: ${rvPop} 260ms cubic-bezier(0.22, 1, 0.36, 1) both;

 .rv-close {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  color: ${({ theme }) => theme.tz.color.inkSoft};
  cursor: pointer;
  transition: background-color 150ms ease, transform 200ms ease;
 }
 .rv-close:hover {
  background: #fff;
  transform: rotate(90deg);
 }

 .rv-head {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px 60px 18px 22px;
  background: linear-gradient(135deg, ${({ theme }) => theme.tz.color.emberTint} 0%, ${({ theme }) => theme.tz.color.navyTint} 100%);
 }
 .rv-thumb {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  overflow: hidden;
  border: 3px solid #fff;
  border-radius: 16px;
  background: ${({ theme }) => theme.tz.color.mist};
  box-shadow: 0 4px 12px rgba(14, 52, 96, 0.12);
 }
 .rv-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
 }
 .rv-head-text {
  min-width: 0;
 }
 .rv-head h2 {
  margin: 0;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 19px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .rv-head p {
  margin: 2px 0 0;
  overflow: hidden;
  font-size: 13.5px;
  color: ${({ theme }) => theme.tz.color.inkSoft};
  text-overflow: ellipsis;
  white-space: nowrap;
 }

 .rv-body {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 20px 22px 6px;
 }
 .rv-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .rv-label em {
  font-style: normal;
  font-weight: 500;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .rv-label--row {
  display: flex;
  justify-content: space-between;
 }
 .rv-count {
  font-size: 12.5px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.slate};
 }

 .rv-rate {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
  border-radius: 16px;
  background: ${({ theme }) => theme.tz.color.mist};
  text-align: center;
 }
 .rv-stars {
  display: flex;
  gap: 6px;
 }
 .rv-star {
  padding: 2px;
  border: 0;
  background: transparent;
  cursor: pointer;
  transition: transform 150ms ease;
 }
 .rv-star svg {
  width: 38px;
  height: 38px;
  fill: ${({ theme }) => theme.tz.color.line};
  transition: fill 150ms ease;
 }
 .rv-star.is-on svg {
  fill: #ffb400;
 }
 .rv-star:hover {
  transform: scale(1.12);
 }
 .rv-star.is-picked svg {
  animation: ${rvStar} 360ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 .rv-star:focus-visible {
  outline: none;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
 .rv-rate-word {
  margin-top: 6px;
  font-size: 13.5px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.slate};
  animation: ${rvWord} 220ms ease both;
 }
 .rv-rate-word.is-on {
  color: #b77d00;
 }

 .rv-field {
  margin-top: 20px;
 }
 .rv-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
 }
 .rv-chip {
  padding: 5px 11px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.paper};
  color: ${({ theme }) => theme.tz.color.inkSoft};
  font-family: inherit;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 150ms ease, background-color 150ms ease, color 150ms ease;
 }
 .rv-chip:hover {
  border-color: ${({ theme }) => theme.tz.color.ember};
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .rv-field textarea {
  display: block;
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 14px;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.55;
  color: ${({ theme }) => theme.tz.color.ink};
  resize: vertical;
  transition: border-color 160ms ease, box-shadow 160ms ease;
 }
 .rv-field textarea:focus {
  outline: none;
  border-color: ${({ theme }) => theme.tz.color.ember};
  box-shadow: 0 0 0 4px rgba(240, 80, 35, 0.12);
 }
 .rv-meter {
  height: 4px;
  margin-top: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.lineSoft};
 }
 .rv-meter i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: ${({ theme }) => theme.tz.tone.warning.fill};
  transition: width 220ms ease, background-color 220ms ease;
 }
 .rv-meter i.is-ok {
  background: ${({ theme }) => theme.tz.tone.success.fill};
 }
 .rv-foot {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  font-size: 12px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .rv-foot .is-ok {
  color: ${({ theme }) => theme.tz.tone.success.fg};
  font-weight: 600;
 }
 .rv-foot .is-warn {
  color: ${({ theme }) => theme.tz.tone.danger.fg};
 }

 .rv-photos {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
 }
 .rv-photo {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 12px;
  animation: ${rvPop} 240ms cubic-bezier(0.22, 1, 0.36, 1) both;
 }
 .rv-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
 }
 .rv-photo button {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 22px;
  height: 22px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgba(20, 21, 32, 0.7);
  color: #fff;
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;
 }
 .rv-photo button:hover {
  background: ${({ theme }) => theme.tz.tone.danger.fill};
 }
 .rv-add {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  aspect-ratio: 1 / 1;
  border: 2px dashed ${({ theme }) => theme.tz.color.line};
  border-radius: 12px;
  background: ${({ theme }) => theme.tz.color.mist};
  color: ${({ theme }) => theme.tz.color.slate};
  font-family: inherit;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 160ms ease, background-color 160ms ease, color 160ms ease;
 }
 .rv-add:hover {
  border-color: ${({ theme }) => theme.tz.color.ember};
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }

 /* anonymous: switch */
 .rv-anon {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 20px;
  padding: 12px 14px;
  border-radius: 14px;
  background: ${({ theme }) => theme.tz.color.mist};
  cursor: pointer;
 }
 .rv-anon input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
 }
 .rv-switch {
  position: relative;
  flex-shrink: 0;
  width: 38px;
  height: 22px;
  margin-top: 1px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.line};
  transition: background-color 180ms ease;
 }
 .rv-switch::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(20, 21, 32, 0.2);
  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 .rv-anon input:checked + .rv-switch {
  background: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .rv-anon input:checked + .rv-switch::after {
  transform: translateX(16px);
 }
 .rv-anon input:focus-visible + .rv-switch {
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
 .rv-anon strong {
  display: block;
  font-size: 14px;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .rv-anon small {
  display: block;
  margin-top: 2px;
  font-size: 12px;
  line-height: 1.45;
  color: ${({ theme }) => theme.tz.color.slate};
 }

 .rv-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 22px 18px;
  border-top: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
 }
 .rv-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 20px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 12px;
  background: ${({ theme }) => theme.tz.color.paper};
  color: ${({ theme }) => theme.tz.color.inkSoft};
  font-family: inherit;
  font-size: 14.5px;
  font-weight: 700;
  cursor: pointer;
 }
 .rv-btn--solid {
  border-color: ${({ theme }) => theme.tz.color.emberDeep};
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
  box-shadow: 0 6px 16px rgba(194, 64, 15, 0.28);
 }
 .rv-btn--solid:hover:enabled {
  background: ${({ theme }) => theme.tz.color.emberDark};
 }
 .rv-btn:disabled {
  opacity: 0.45;
  box-shadow: none;
  cursor: not-allowed;
 }
 .rv-btn:focus-visible,
 .rv-chip:focus-visible,
 .rv-add:focus-visible,
 .rv-close:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
 .rv-spin {
  width: 15px;
  height: 15px;
  border: 2px solid rgba(255, 255, 255, 0.45);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${rvSpin} 700ms linear infinite;
 }

 .rv-preview {
  overflow-y: auto;
  padding: 22px;
 }

 @media (max-width: 480px) {
  .rv-star svg {
   width: 32px;
   height: 32px;
  }
  .rv-photos {
   gap: 6px;
  }
  /* bigger tap targets on phones */
  .rv-close {
   width: 40px;
   height: 40px;
  }
  .rv-photo button {
   width: 28px;
   height: 28px;
   line-height: 28px;
  }
 }

 @media (prefers-reduced-motion: reduce) {
  &,
  .rv-photo,
  .rv-star.is-picked svg,
  .rv-rate-word {
   animation: none;
  }
  .rv-close,
  .rv-star,
  .rv-switch::after,
  .rv-meter i {
   transition: none;
  }
 }
`;

const ItemRow = styled.div`
 display: flex;
 flex-wrap: wrap;
 align-items: center;
 justify-content: space-between;
 gap: 14px 20px;
 /* side padding: pages that already pad their card set --ir-pad: 0 */
 padding: 16px var(--ir-pad, 16px);
 border-bottom: 1px solid ${({ theme }) => theme.tz.color.lineSoft};

 &:last-of-type {
  border-bottom: 0;
 }

 .ir-product {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1 1 280px;
  min-width: 0;
  color: inherit;
  text-decoration: none;
 }
 .ir-thumb {
  position: relative;
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
  border-radius: 14px;
  background: ${({ theme }) => theme.tz.color.mist};
 }
 .ir-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 .ir-product:hover .ir-thumb img {
  transform: scale(1.06);
 }
 /* light quantity tag so it doesn't sit on the photo like a watermark */
 .ir-qty {
  position: absolute;
  right: 4px;
  bottom: 4px;
  padding: 0 5px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.82);
  color: ${({ theme }) => theme.tz.color.inkSoft};
  font-size: 10px;
  font-weight: 700;
  line-height: 16px;
  box-shadow: 0 1px 3px rgba(20, 21, 32, 0.12);
 }
 .ir-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
 }
 .ir-name {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.35;
  color: ${({ theme }) => theme.tz.color.ink};
  transition: color 160ms ease;
 }
 .ir-product:hover .ir-name {
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .ir-variant {
  font-size: 12.5px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .ir-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-size: 13.5px;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }
 .ir-was {
  font-size: 12px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .ir-flag {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 8px;
  margin-top: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .ir-pill {
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: ${({ theme }) => theme.tz.color.lineSoft};
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .ir-pill--danger {
  background: ${({ theme }) => theme.tz.tone.danger.bg};
  color: ${({ theme }) => theme.tz.tone.danger.fg};
 }
 .ir-refund {
  color: ${({ theme }) => theme.tz.tone.success.fg};
 }

 .ir-side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  margin-left: auto;
 }
 .ir-total {
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .ir-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
 }
 .ir-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 36px;
  padding: 0 14px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.emberDeep};
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.paper};
  color: ${({ theme }) => theme.tz.color.emberDeep};
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease, transform 160ms ease;
 }
 .ir-btn svg {
  width: 15px;
  height: 15px;
 }
 .ir-btn:hover {
  background: ${({ theme }) => theme.tz.color.emberTint};
  transform: translateY(-1px);
 }
 .ir-btn--solid {
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
 }
 .ir-btn--solid:hover {
  background: ${({ theme }) => theme.tz.color.emberDark};
 }
 .ir-btn--danger {
  border-color: ${({ theme }) => theme.tz.color.line};
  color: ${({ theme }) => theme.tz.tone.danger.fg};
 }
 .ir-btn--danger:hover {
  border-color: ${({ theme }) => theme.tz.tone.danger.fg};
  background: ${({ theme }) => theme.tz.tone.danger.bg};
 }
 .ir-btn:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
 .ir-deadline {
  font-size: 12px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .ir-deadline--live {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }

 &.is-off .ir-thumb {
  opacity: 0.5;
 }
 &.is-off .ir-name,
 &.is-off .ir-strike,
 &.is-off .ir-total {
  text-decoration: line-through;
  color: ${({ theme }) => theme.tz.color.slate};
 }

 @media (max-width: 560px) {
  .ir-side {
   width: 100%;
   flex-direction: row;
   flex-wrap: wrap;
   align-items: center;
   justify-content: space-between;
  }
  .ir-deadline {
   width: 100%;
  }
  .ir-btn {
   min-height: 40px;
  }
 }

 @media (prefers-reduced-motion: reduce) {
  .ir-thumb img,
  .ir-btn {
   transition: none;
  }
  .ir-product:hover .ir-thumb img,
  .ir-btn:hover {
   transform: none;
  }
 }
`;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faStore,
 faCaretDown,
 faCaretUp,
} from "@fortawesome/free-solid-svg-icons";

export default function WriteReview({
 item,
 shopName,
 orderDetails,
 status,
 cancel_status,
 orderItemId,
 order_days_gone,
 return_status,
 delivered_at,
 return_deadline = null,
 isCorporate = false,
}: {
 item: any;
 shopName: string;
 orderDetails: any;
 status: any;
 orderItemId: any;
 cancel_status: any;
 order_days_gone: any;
 return_status: any;
 delivered_at: any;
 return_deadline?: string | null;
 isCorporate?: boolean;
}) {
 const [showOrderStatus, setShowOrderStatus] = useState(false);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [isCorporateReturnOpen, setIsCorporateReturnOpen] = useState(false);
 const [returnWindowLeft, setReturnWindowLeft] = useState<string | null>(null);
 const [returnWindowClosed, setReturnWindowClosed] = useState(false);
 // The API sends return_deadline only for corporate shop / company-credit orders
 // (same rule the seller panel and engine use), so it marks a counter return.
 const isCounterReturn = isCorporate || Boolean(return_deadline);
 const showCorporateCountdown = isCounterReturn && status === "Delivered" && Boolean(return_deadline);

 // Corporate returns close at the admin-set cutoff after delivery. The API sends
 // that moment as return_deadline, so the countdown matches what the shop enforces.
 useEffect(() => {
  if (!showCorporateCountdown) {
   setReturnWindowLeft(null);
   return;
  }

  const deadline = new Date(return_deadline);

  const tick = () => {
   const diffMs = deadline.getTime() - Date.now();
   if (diffMs <= 0) {
    setReturnWindowLeft("Return window has closed");
    setReturnWindowClosed(true);
    return;
   }
   const hours = Math.floor(diffMs / (1000 * 60 * 60));
   const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
   const seconds = Math.floor((diffMs / 1000) % 60);
   setReturnWindowLeft(
    `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s left to return`
   );
  };

  tick();
  const interval = setInterval(tick, 1000);
  return () => clearInterval(interval);
 }, [showCorporateCountdown, return_deadline]);
 const [rating, setRating] = useState(0);
 const [hoverRating, setHoverRating] = useState(0);
 const [comments, setComments] = useState("");
 const [isAnonymous, setIsAnonymous] = useState(false);
 const [image, setImage] = useState<File[]>([]);
 const [previews, setPreviews] = useState<string[]>([]);
 const fileInputRef = useRef<HTMLInputElement>(null);
 const [reviewMode, setReviewMode] = useState<"submit" | "preview">(
  item.ratingcheck ? "preview" : "submit"
 );
 const [existingReview, setExistingReview] = useState<{
  rating: any;
  comments: string;
  images: string[];
  isAnonymous: boolean;
 } | null>(null);
 const router = useRouter();

 const deliveryCharge = orderDetails?.delivery_charge;

 // A corporate counter return refunds this one item while the rest of the order
 // stays delivered, so the row has to carry its own returned state.
 const isItemReturned = item?.item_return_status === "returned";

 // Likewise an item can be cancelled on its own before delivery, by either the
 // buyer here or the seller in the panel.
 const isItemCancelled = Boolean(item?.item_cancelled_at);

 // Buyers may only pull an item until the seller starts preparing the order; the
 // engine enforces this too, this just avoids offering a button that will 422.
 const canCancelItem =
  !isItemCancelled &&
  !isItemReturned &&
  ["Pending", "Confirmed"].includes(status);

 useEffect(() => {
  // Server data is authoritative; only fall back to the localStorage cache
  // (written right after a submit) if the server hasn't recorded a review yet.
  if (item.ratingcheck) {
   setExistingReview({
    rating: item.rating,
    comments: item.comments,
    images: item.images,
    isAnonymous: Boolean(item.is_anonymous),
   });
   setReviewMode("preview");
   return;
  }

  const storedReview = localStorage.getItem(`review-${item.order_item_id}`);
  if (storedReview) {
   const parsedReview = JSON.parse(storedReview);
   setRating(parsedReview.rating);
   setComments(parsedReview.comments);
   setIsAnonymous(Boolean(parsedReview.isAnonymous));
   setExistingReview({
    rating: parsedReview.rating,
    comments: parsedReview.comments,
    images: parsedReview.images || [],
    isAnonymous: Boolean(parsedReview.isAnonymous),
   });
   setReviewMode("preview"); // Set to preview mode if review already exists
  }
 }, [item]);

 const [submitting, setSubmitting] = useState(false);

 // Object URLs are created once per selected file and revoked when the file is
 // dropped or the modal unmounts — building them inside render leaks one blob
 // per repaint.
 useEffect(() => {
  const urls = image.map((file) => URL.createObjectURL(file));
  setPreviews(urls);

  return () => urls.forEach((url) => URL.revokeObjectURL(url));
 }, [image]);

 const MAX_IMAGES = 5;
 const MAX_COMMENT = 1000;

 const addFiles = (files: FileList | null) => {
  if (!files) return;

  const picked = Array.from(files).filter((f) => f.type.startsWith("image/"));
  const room = MAX_IMAGES - image.length;

  if (room <= 0) {
   toast.error(`You can attach up to ${MAX_IMAGES} images.`);
   return;
  }
  if (picked.length > room) {
   toast.error(`Only ${room} more image${room === 1 ? "" : "s"} can be added.`);
  }

  setImage([...image, ...picked.slice(0, room)]);
 };

 const removeFile = (index: number) =>
  setImage(image.filter((_, i) => i !== index));

 const ratingLabels = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];
 const shownRating = hoverRating || rating;
 const canSubmit = rating > 0 && comments.trim().length >= 10 && !submitting;
 const savedRating = Math.round(Number(existingReview?.rating ?? rating)) || 0;

 // Full-size view of one attachment, opened from the preview grid.
 const [zoomedImage, setZoomedImage] = useState<string | null>(null);

 const handleReviewSubmit = async () => {
  if (comments.length < 10) {
   toast.error("The comments field must be at least 10 characters.");
   return;
  }

  if (!item?.order_item_id || rating === 0 || !comments) {
   toast.error("Missing required fields.");
   return;
  }

  const formData = new FormData();
  formData.append("order_item_id", String(item.order_item_id));
  formData.append("rating", String(rating));
  formData.append("comment", comments);
  // "1"/"0", not "true"/"false" — Laravel's boolean rule rejects the word forms.
  formData.append("is_anonymous", isAnonymous ? "1" : "0");

  image.forEach((img) => formData.append("images[]", img));

  setSubmitting(true);
  try {
   const response = await axios.post("reviews", formData, {
    headers: { "Content-Type": "multipart/form-data" },
   });

   toast.success("Review submitted successfully");

   // Use the server's saved copy (real image URLs, not ephemeral blob: URLs)
   // so the preview stays accurate after a reload.
   const created = response.data?.data ?? {};
   const reviewData = {
    rating: created.rating ?? rating,
    comments: created.comment ?? comments,
    images: created.images ?? [],
    isAnonymous: Boolean(created.is_anonymous ?? isAnonymous),
   };
   localStorage.setItem(
    `review-${item.order_item_id}`,
    JSON.stringify(reviewData)
   );

   setReviewMode("preview"); // Switch to preview mode
   setExistingReview(reviewData);
   setIsModalOpen(false);
  } catch (error: any) {
   const msg =
    error?.response?.data?.message ?? "Failed to submit review.";
   toast.error(msg);
  } finally {
   setSubmitting(false);
  }
 };

 // const handleCancelClick = () => {
 //   if (cancelMode === "submit" && status === "Pending") {
 //     // Encrypt the orderItemId
 //     const encryptedOrderItemId = btoa(orderItemId);
 //     // Encrypt product name if needed, or pass directly as part of the URL
 //     const encodedProductName = encodeURIComponent(item.product_name);
 //     router.push(`/cancelled-order?orderItemId=${encryptedOrderItemId}`);

 //   }
 // };

 // product return function

 const handleReturnClick = () => {
  const encryptedOrderItemId = btoa(orderItemId);
  sessionStorage.setItem("returnItem", JSON.stringify(item));
  router.push(`/return-order?orderItemId=${encryptedOrderItemId}&orderId=${item.order_id}`);
 };

 // cancek click function
 const handleCancelClick = () => {
  if (!canCancelItem) return;
  // The cancellation page reads this to offer "just this item" or "the whole order".
  sessionStorage.setItem("cancelItem", JSON.stringify(item));
  router.push(`/cancelled-order?orderItemId=${btoa(String(item.order_item_id))}`);
 };

 const handleToggle = () => {
  setShowOrderStatus((prev) => !prev); // Toggle the state
 };


 // Conditionally Handle Image URL for product image for General and Abroad products
 const getProductImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (/^https?:\/\//i.test(imagePath)) {
   return imagePath;
  }
  if (imagePath.startsWith("/")) {
   return `${ApiBaseUrl.ImgUrl}${imagePath}`;
  }
  return `${ApiBaseUrl.ImgUrl}/${imagePath}`;
 };

 return (
  <>
   <ItemRow className={isItemCancelled || isItemReturned ? "is-off" : undefined}>
    <Link
     className="ir-product"
     href={`/${item.productType === "Abroad" ? "otproducts" : "product"}/${item.product_slug}`}
    >
     <span className="ir-thumb">
      {getProductImageUrl(item.product_image) ? (
       <img src={getProductImageUrl(item.product_image)} alt="" loading="lazy" />
      ) : (
       <span className="ir-thumb-empty" aria-hidden="true" />
      )}
      {Number(item.quantity) > 1 && <span className="ir-qty">×{item.quantity}</span>}
     </span>
     <span className="ir-info">
      <span className="ir-name">{item.product_name}</span>
      {(item.color || item.size || item.attribute) && (
       <span className="ir-variant">
        {[item.color && `Color: ${item.color}`, item.size && `Size: ${item.size}`, item.attribute && `Spec: ${item.attribute}`]
         .filter(Boolean)
         .join(" · ")}
       </span>
      )}
      {/* The price is struck once, on the line it belongs to — the pill below
          says what happened, so a separate 0.00 line only repeated it. */}
      <span className="ir-price">
       <span className="ir-strike">
        {currency(item.price)} × {item.quantity}
       </span>
       {Number(item.original_price) > Number(item.price) && (
        <s className="ir-was">{currency(item.original_price)}</s>
       )}
      </span>
      {isItemCancelled && (
       <span className="ir-flag">
        <span className="ir-pill ir-pill--danger">Cancelled</span>
        on {format(new Date(item.item_cancelled_at), "dd MMM yyyy")}
       </span>
      )}
      {isItemReturned && (
       <span className="ir-flag">
        <span className="ir-pill">Returned</span>
        <b className="ir-refund">
         {currency(item.item_refund_amount ?? item.price * item.quantity)} refunded
        </b>
        {item.item_returned_at && <>on {format(new Date(item.item_returned_at), "dd MMM yyyy")}</>}
       </span>
      )}
     </span>
    </Link>

    <div className="ir-side">
     <span className="ir-total">{currency(Number(item.price) * Number(item.quantity))}</span>
     <div className="ir-actions">
      {status === "Delivered" && cancel_status !== 5 && cancel_status !== 6 && !isItemReturned && !isItemCancelled && (
       <button
        type="button"
        className={`ir-btn${reviewMode === "submit" ? " ir-btn--solid" : ""}`}
        onClick={() => setIsModalOpen(true)}
       >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
         <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
        </svg>
        {reviewMode === "submit" ? "Write review" : "Your review"}
       </button>
      )}
      {/* return — retail opens the online request; corporate shows how to
          return at the shop, until the cutoff (11:59 PM on delivery day) */}
      {status === "Delivered" && cancel_status !== 6 && !isItemReturned && !isItemCancelled &&
       (isCounterReturn ? Boolean(return_deadline) && !returnWindowClosed : order_days_gone !== 3) && (
       <button
        type="button"
        className="ir-btn"
        onClick={isCounterReturn ? () => setIsCorporateReturnOpen(true) : handleReturnClick}
       >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
         <path d="M9 14 4 9l5-5M4 9h11a5 5 0 0 1 0 10h-3" />
        </svg>
        Return
       </button>
      )}
      {/* Show "Returned" when status is 6 */}
      {cancel_status === 6 && (
       <button type="button" className="ir-btn" onClick={handleToggle} aria-expanded={showOrderStatus}>
        Returned
        <FontAwesomeIcon icon={showOrderStatus ? faCaretUp : faCaretDown} />
       </button>
      )}
      {/* item cancel — the button disappears once the buyer's window closes
          (seller started preparing the order), rather than sitting disabled */}
      {canCancelItem && status !== "Delivered" && cancel_status !== 6 && (
       <button type="button" className="ir-btn ir-btn--danger" onClick={handleCancelClick}>
        Cancel item
       </button>
      )}
     </div>
     {showCorporateCountdown && !returnWindowClosed && !isItemReturned && !isItemCancelled && cancel_status !== 6 && returnWindowLeft && (
      <span className="ir-deadline ir-deadline--live">
       Return at the shop by{" "}
       {new Date(return_deadline).toLocaleTimeString("en-GB", {
        timeZone: "Asia/Dhaka",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
       })}{" "}
       · {returnWindowLeft}
      </span>
     )}
     {status === "Delivered" && !isCounterReturn && return_deadline && !isItemReturned && !isItemCancelled && cancel_status !== 6 && (
      <span className="ir-deadline">
       Return available until {format(new Date(return_deadline), "dd MMM yyyy")}
      </span>
     )}
    </div>
   </ItemRow>
   {/* Render Modal */}
   <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
    <ReviewBox role="dialog" aria-modal="true" aria-label={reviewMode === "submit" ? "Write a review" : "Your review"} onClick={(e) => e.stopPropagation()}>
     <button type="button" className="rv-close" aria-label="Close" onClick={() => setIsModalOpen(false)}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
       <path d="M18 6 6 18M6 6l12 12" />
      </svg>
     </button>
     {reviewMode === "submit" ? (
      <>
       {/* Header — the product being reviewed, so the buyer is never guessing
           which item of a multi-item order this modal belongs to. */}
       <div className="rv-head">
        <span className="rv-thumb">
         {getProductImageUrl(item.product_image) ? <img src={getProductImageUrl(item.product_image)} alt="" /> : null}
        </span>
        <div className="rv-head-text">
         <h2>Write a review</h2>
         <p>{item.product_name}</p>
        </div>
       </div>

       <div className="rv-body">
        {/* Rating */}
        <div className="rv-rate">
         <span className="rv-label">How would you rate it?</span>
         <div className="rv-stars" onMouseLeave={() => setHoverRating(0)} role="radiogroup" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((star) => (
           <button
            key={star}
            type="button"
            role="radio"
            aria-checked={rating === star}
            aria-label={`${star} star${star === 1 ? "" : "s"}`}
            className={`rv-star${star <= shownRating ? " is-on" : ""}${star === rating ? " is-picked" : ""}`}
            onMouseEnter={() => setHoverRating(star)}
            onClick={() => setRating(star)}
           >
            <svg viewBox="0 0 24 24" aria-hidden="true">
             <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
            </svg>
           </button>
          ))}
         </div>
         <span key={shownRating} className={`rv-rate-word${shownRating ? " is-on" : ""}`}>
          {shownRating ? ratingLabels[shownRating] : "Tap a star to rate"}
         </span>
        </div>

        {/* Comment */}
        <div className="rv-field">
         <label className="rv-label" htmlFor={`rv-text-${item.order_item_id}`}>
          Your experience
         </label>
         <div className="rv-chips">
          {["Good quality", "As described", "Fast delivery", "Well packed", "Good value"].map((t) => (
           <button
            key={t}
            type="button"
            className="rv-chip"
            onClick={() =>
             setComments((c) =>
              c.toLowerCase().includes(t.toLowerCase()) ? c : (c.trim() ? `${c.trim()}. ${t}` : t).slice(0, MAX_COMMENT)
             )
            }
           >
            + {t}
           </button>
          ))}
         </div>
         <textarea
          id={`rv-text-${item.order_item_id}`}
          rows={4}
          value={comments}
          maxLength={MAX_COMMENT}
          placeholder="What did you like or dislike? How was the quality and the delivery?"
          onChange={(e) => setComments(e.target.value)}
         />
         <div className="rv-meter" aria-hidden="true">
          <i
           style={{ width: `${Math.min(100, (comments.trim().length / 10) * 100)}%` }}
           className={comments.trim().length >= 10 ? "is-ok" : undefined}
          />
         </div>
         <div className="rv-foot">
          <span className={comments.trim().length >= 10 ? "is-ok" : comments.trim().length > 0 ? "is-warn" : undefined}>
           {comments.trim().length < 10 ? `At least 10 characters (${comments.trim().length}/10)` : "✓ Looks good"}
          </span>
          <span>
           {comments.length}/{MAX_COMMENT}
          </span>
         </div>
        </div>

        {/* Photos */}
        <div className="rv-field">
         <div className="rv-label rv-label--row">
          <span>
           Add photos <em>(optional)</em>
          </span>
          <span className="rv-count">
           {image.length}/{MAX_IMAGES}
          </span>
         </div>
         <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={(e) => {
           addFiles(e.target.files);
           // Reset so picking the same file twice still fires onChange.
           e.target.value = "";
          }}
         />
         {/* Fixed 5-up grid so the tiles never wrap — MAX_IMAGES is 5, and the
             add-tile takes the last free cell. */}
         <div className="rv-photos">
          {previews.map((src, index) => (
           <div key={src} className="rv-photo">
            <img src={src} alt={`Attachment ${index + 1}`} />
            <button type="button" aria-label={`Remove image ${index + 1}`} onClick={() => removeFile(index)}>
             ×
            </button>
           </div>
          ))}
          {image.length < MAX_IMAGES && (
           <button type="button" className="rv-add" onClick={() => fileInputRef.current?.click()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
             <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
             <circle cx="12" cy="13" r="4" />
            </svg>
            <span>Add photo</span>
           </button>
          )}
         </div>
        </div>

        {/* Anonymous */}
        <label className="rv-anon">
         <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} />
         <span className="rv-switch" aria-hidden="true" />
         <span>
          <strong>Post this review anonymously</strong>
          <small>Your name won&apos;t be shown on the product page. The Verified Purchase badge stays.</small>
         </span>
        </label>
       </div>

       {/* Actions */}
       <div className="rv-actions">
        <button type="button" className="rv-btn" disabled={submitting} onClick={() => setIsModalOpen(false)}>
         Cancel
        </button>
        <button type="button" className="rv-btn rv-btn--solid" disabled={!canSubmit} onClick={handleReviewSubmit}>
         {submitting && <span className="rv-spin" aria-hidden="true" />}
         {submitting ? "Submitting…" : "Submit review"}
        </button>
       </div>
      </>
     ) : (
      <>
       {/* Same header as the submit view, so switching between the two does not
           feel like two different dialogs. */}
       <div className="rv-preview">
       <FlexBox alignItems="center" style={{ gap: "12px" }}>
        <Avatar
         src={getProductImageUrl(item.product_image)}
         alt={item.product_name}
         size={48}
        />
        <Box style={{ minWidth: 0 }}>
         <Typography fontSize="1.05rem" fontWeight="700" color="var(--tz-navy)">
          Your review
         </Typography>
         <Typography
          fontSize="13px"
          color="text.muted"
          style={{
           maxWidth: "360px",
           overflow: "hidden",
           textOverflow: "ellipsis",
           whiteSpace: "nowrap",
          }}
         >
          {item.product_name}
         </Typography>
        </Box>
       </FlexBox>

       <Box
        mt="1rem"
        mb="1.25rem"
        style={{ height: "1px", background: "var(--tz-line)" }}
       />

       <Box
        style={{
         background: "var(--tz-mist)",
         border: "1px solid var(--tz-line)",
         borderRadius: "10px",
         padding: "1.15rem 1.25rem",
        }}
       >
        <FlexBox
         alignItems="center"
         justifyContent="space-between"
         flexWrap="wrap"
         style={{ gap: "0.5rem" }}
        >
         <FlexBox alignItems="center" style={{ gap: "8px" }}>
          <FlexBox alignItems="center">
           {[1, 2, 3, 4, 5].map((star) => (
            <span
             key={star}
             style={{
              fontSize: "22px",
              lineHeight: 1,
              color: star <= savedRating ? "#FFB400" : "var(--tz-line)",
              marginRight: "2px",
             }}
            >
             ★
            </span>
           ))}
          </FlexBox>
          {savedRating > 0 && (
           <Typography fontSize="13px" fontWeight="600" color="#FFB400">
            {ratingLabels[savedRating]}
           </Typography>
          )}
         </FlexBox>

         <FlexBox alignItems="center" style={{ gap: "6px" }}>
          {existingReview?.isAnonymous && (
           <span
            style={{
             fontSize: "0.7rem",
             fontWeight: 600,
             color: "var(--tz-slate)",
             background: "var(--tz-mist)",
             padding: "3px 10px",
             borderRadius: "999px",
             whiteSpace: "nowrap",
            }}
           >
            Posted anonymously
           </span>
          )}

          <span
           style={{
            fontSize: "0.7rem",
            fontWeight: 600,
            color: "var(--tz-success)",
            background: "rgba(30,142,62,0.1)",
            padding: "3px 10px",
            borderRadius: "999px",
            whiteSpace: "nowrap",
           }}
          >
           ✓ Verified Purchase
          </span>
         </FlexBox>
        </FlexBox>

        {/* Quote mark sits in the margin instead of wrapping the text, so a long
            comment stays readable. */}
        <FlexBox mt="0.9rem" style={{ gap: "10px" }}>
         <Box
          style={{
           width: "3px",
           borderRadius: "3px",
           background: "var(--tz-line)",
           flexShrink: 0,
          }}
         />
         <Typography
          style={{
           color: "var(--tz-ink-soft)",
           lineHeight: 1.65,
           fontSize: "14px",
           wordBreak: "break-word",
           whiteSpace: "pre-line",
          }}
         >
          {existingReview?.comments || comments}
         </Typography>
        </FlexBox>

        {existingReview?.images && existingReview.images.length > 0 && (
         <>
          <Typography
           fontSize="12px"
           fontWeight="600"
           color="text.muted"
           mt="1.1rem"
           mb="8px"
           style={{ letterSpacing: "0.3px" }}
          >
           {existingReview.images.length} PHOTO
           {existingReview.images.length === 1 ? "" : "S"}
          </Typography>
          {/* Fixed 5-up grid: the cap is 5 photos, so they always sit on one row. */}
          <Box
           style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "10px",
           }}
          >
           {existingReview.images.map((src, idx) => (
            <button
             key={idx}
             type="button"
             aria-label={`View photo ${idx + 1} full size`}
             onClick={() => setZoomedImage(getProductImageUrl(src))}
             style={{
              width: "100%",
              aspectRatio: "1 / 1",
              padding: 0,
              borderRadius: "10px",
              overflow: "hidden",
              border: "1px solid var(--tz-line)",
              background: "#fff",
              cursor: "zoom-in",
             }}
            >
             <img
              src={getProductImageUrl(src)}
              alt={`Review attachment ${idx + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
             />
            </button>
           ))}
          </Box>
         </>
        )}
       </Box>

       <FlexBox justifyContent="flex-end" mt="1.25rem">
        <Button
         variant="text"
         onClick={() => setIsModalOpen(false)}
         style={{
          height: "38px",
          borderRadius: "100px",
          padding: "0 22px",
          backgroundColor: "var(--tz-ember-deep)",
          color: "white",
         }}
        >
         <Typography fontSize="14px" fontWeight="600">
          Close
         </Typography>
        </Button>
       </FlexBox>
       </div>
      </>
     )}
    </ReviewBox>
   </Modal>

   {/* Attachments are small in the grid; this shows one at full size. */}
   <Modal open={Boolean(zoomedImage)} onClose={() => setZoomedImage(null)}>
    <Box
     mx="auto"
     style={{ maxWidth: "92vw", maxHeight: "88vh" }}
     onClick={() => setZoomedImage(null)}
    >
     {zoomedImage && (
      <img
       src={zoomedImage}
       alt="Review attachment"
       style={{
        maxWidth: "92vw",
        maxHeight: "88vh",
        objectFit: "contain",
        borderRadius: "12px",
        display: "block",
        cursor: "zoom-out",
       }}
      />
     )}
    </Box>
   </Modal>

   {/* Corporate shop returns are processed by the seller at the counter, so the
       buyer gets instructions rather than the online return request form. */}
   <Modal
    open={isCorporateReturnOpen}
    onClose={() => setIsCorporateReturnOpen(false)}
   >
    <Box
     p="1.5rem"
     bg="white"
     borderRadius="8px"
     width="440px"
     maxWidth="90vw"
     mx="auto"
     onClick={(e) => e.stopPropagation()}
    >
     <FlexBox alignItems="center" mb="1rem" style={{ gap: "10px" }}>
      <Box
       width="40px"
       height="40px"
       borderRadius="50%"
       bg="var(--tz-ember-tint)"
       style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
       }}
      >
       <FontAwesomeIcon icon={faStore} style={{ color: "var(--tz-ember-deep)" }} />
      </Box>
      <Typography fontSize="17px" fontWeight="700" color="var(--tz-ember-deep)">
       Return at the shop
      </Typography>
     </FlexBox>

     <Typography fontSize="14px" color="var(--tz-ink-soft)" style={{ lineHeight: 1.6 }}>
      This item was bought from a corporate shop, so returns are handled in
      person — there is nothing to submit here.
     </Typography>

     <Box mt="1rem" p="12px 14px" bg="var(--tz-mist)" borderRadius="8px">
      <Typography fontSize="13px" fontWeight="600" color="var(--tz-ink)" mb="8px">
       What to do
      </Typography>
      <Typography fontSize="13px" color="var(--tz-ink-soft)" style={{ lineHeight: 1.7 }}>
       1. Bring <b>{item?.product_name}</b> back to the shop.
       <br />
       2. Give the seller your Order ID, shown at the top of this page.
       <br />
       3. The seller confirms the return and refunds you on the spot
       {isCorporate ? " (your company credit is restored)" : ""}.
      </Typography>
     </Box>

     <Typography fontSize="12px" color="text.muted" mt="12px">
      {return_deadline
       ? `Returns must be made by ${new Date(return_deadline).toLocaleString("en-GB", {
          timeZone: "Asia/Dhaka",
          day: "numeric",
          month: "short",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
         })} (Bangladesh time).`
       : "Returns must be made at the shop within the return window."}
     </Typography>

     {returnWindowLeft && (
      <Box mt="8px" p="8px 12px" bg="var(--tz-ember-tint)" borderRadius="6px">
       <Typography
        fontSize="13px"
        fontWeight="600"
        color="var(--tz-ember-deep)"
        textAlign="center"
       >
        {returnWindowLeft}
       </Typography>
      </Box>
     )}

     <FlexBox justifyContent="flex-end" mt="1.25rem">
      <Button
       variant="text"
       style={{
        height: "34px",
        borderRadius: "100px",
        backgroundColor: "var(--tz-ember-deep)",
        color: "white",
        padding: "0 20px",
       }}
       onClick={() => setIsCorporateReturnOpen(false)}
      >
       <Typography fontSize="14px">Got it</Typography>
      </Button>
     </FlexBox>
    </Box>
   </Modal>

   {/* Show the component outside of FlexBox, but directly underneath */}
   {showOrderStatus && (
    <Box mt="10px" p="10px" border="1px solid var(--tz-ember-deep)" borderRadius="8px">
     <ReturnedOrderStatus
      return_status={return_status}
      deliveredAt={delivered_at}
     />
    </Box>
   )}
  </>
 );
}
