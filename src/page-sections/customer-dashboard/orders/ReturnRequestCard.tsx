"use client";

import styled, { keyframes } from "styled-components";
import { format } from "date-fns";
import { currency } from "@utils/utils";

// A submitted return request: status, type, refund amount, reason and photos.

export interface ReturnRequest {
 id?: number;
 return_type?: string | null;
 return_status?: string | null;
 return_reason?: string | null;
 refund_amount?: number | string | null;
 images?: string[] | null;
 created_at?: string | null;
}

const words = (s?: string | null) =>
 (s ?? "")
  .split("_")
  .filter(Boolean)
  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
  .join(" ");

// status -> colour family
const toneOf = (status?: string | null) => {
 const s = (status ?? "").toLowerCase();
 if (["refunded", "approved", "return_approved", "received", "return_received", "returned", "completed"].includes(s)) return "good";
 if (["rejected", "cancelled", "canceled"].includes(s)) return "bad";
 return "wait";
};

const rise = keyframes`
 from { opacity: 0; transform: translateY(8px); }
 to { opacity: 1; transform: none; }
`;

const Card = styled.section`
 padding: 20px;
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: 18px;
 background: ${({ theme }) => theme.tz.color.paper};
 animation: ${rise} 460ms cubic-bezier(0.22, 1, 0.36, 1) both;

 .rr-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
 }
 .rr-icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 11px;
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .rr-title {
  margin: 0 auto 0 0;
 }
 .rr-title h3 {
  margin: 0;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .rr-title small {
  font-size: 12px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .rr-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 11px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
 }
 .rr-pill i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
 }
 .rr-pill--good {
  background: ${({ theme }) => theme.tz.tone.success.bg};
  color: ${({ theme }) => theme.tz.tone.success.fg};
 }
 .rr-pill--bad {
  background: ${({ theme }) => theme.tz.tone.danger.bg};
  color: ${({ theme }) => theme.tz.tone.danger.fg};
 }
 .rr-pill--wait {
  background: ${({ theme }) => theme.tz.tone.warning.bg};
  color: ${({ theme }) => theme.tz.tone.warning.fg};
 }
 .rr-pill--type {
  background: ${({ theme }) => theme.tz.color.lineSoft};
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }

 .rr-refund {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  padding: 12px 14px;
  border-radius: 14px;
  background: ${({ theme }) => theme.tz.tone.success.bg};
 }
 .rr-refund.is-wait {
  background: ${({ theme }) => theme.tz.color.mist};
 }
 .rr-refund span:first-child {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.tone.success.fill};
  color: #fff;
 }
 .rr-refund.is-wait span:first-child {
  background: ${({ theme }) => theme.tz.color.slate};
 }
 .rr-refund small {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.tone.success.fg};
 }
 .rr-refund.is-wait small {
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .rr-refund strong {
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 19px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.ink};
 }

 .rr-block {
  margin-top: 16px;
 }
 .rr-block > small {
  display: block;
  margin-bottom: 6px;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .rr-reason {
  margin: 0;
  padding: 10px 14px;
  border-left: 3px solid ${({ theme }) => theme.tz.color.ember};
  border-radius: 0 12px 12px 0;
  background: ${({ theme }) => theme.tz.color.mist};
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.tz.color.inkSoft};
  overflow-wrap: anywhere;
 }
 .rr-photos {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
 }
 .rr-photos a {
  display: block;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 12px;
 }
 .rr-photos img {
  display: block;
  width: 76px;
  height: 76px;
  object-fit: cover;
  transition: transform 220ms ease;
 }
 .rr-photos a:hover img {
  transform: scale(1.06);
 }

 @media (prefers-reduced-motion: reduce) {
  animation: none;
  .rr-photos img {
   transition: none;
  }
 }
`;

const Svg = ({ d, size = 18 }: { d: string; size?: number }) => (
 <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  <path d={d} />
 </svg>
);

export default function ReturnRequestCard({ ret }: { ret: ReturnRequest }) {
 const tone = toneOf(ret.return_status);
 const refunded = (ret.return_status ?? "").toLowerCase() === "refunded";
 const amount = ret.refund_amount != null && ret.refund_amount !== "" ? Number(ret.refund_amount) : null;
 let when = "";
 try {
  when = ret.created_at ? format(new Date(ret.created_at), "dd MMM yyyy, hh:mm a") : "";
 } catch {
  when = "";
 }

 return (
  <Card aria-label="Return request">
   <div className="rr-head">
    <span className="rr-icon">
     <Svg d="M9 14 4 9l5-5M4 9h11a5 5 0 0 1 0 10h-3" />
    </span>
    <div className="rr-title">
     <h3>Return request</h3>
     {when && <small>Requested {when}</small>}
    </div>
    {ret.return_type && <span className="rr-pill rr-pill--type">{words(ret.return_type)}</span>}
    <span className={`rr-pill rr-pill--${tone}`}>
     <i aria-hidden="true" />
     {words(ret.return_status) || "Pending"}
    </span>
   </div>

   {amount != null && !Number.isNaN(amount) && (
    <div className={`rr-refund${refunded ? "" : " is-wait"}`}>
     <span>
      <Svg d={refunded ? "M20 6 9 17l-5-5" : "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"} size={16} />
     </span>
     <div>
      <small>{refunded ? "Refunded to you" : "Refund amount"}</small>
      <strong>{currency(amount)}</strong>
     </div>
    </div>
   )}

   {ret.return_reason && (
    <div className="rr-block">
     <small>Your reason</small>
     <p className="rr-reason">{ret.return_reason}</p>
    </div>
   )}

   {ret.images && ret.images.length > 0 && (
    <div className="rr-block">
     <small>Photos you sent ({ret.images.length})</small>
     <div className="rr-photos">
      {ret.images.map((url, i) => (
       <a key={i} href={url} target="_blank" rel="noopener noreferrer">
        <img src={url} alt={`Return photo ${i + 1}`} loading="lazy" />
       </a>
      ))}
     </div>
    </div>
   )}
  </Card>
 );
}
