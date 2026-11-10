"use client";

import { useState } from "react";
import styled, { keyframes } from "styled-components";
import toast from "react-hot-toast";

type ShippingAddressCardProps = {
 address?: string | null;
 area?: string | null;
 city?: string | null;
 province?: string | null;
 phone?: string | null;
 /** Recipient name, shown above the address */
 name?: string | null;
 /** Delivered orders say "Delivered to" instead of "Shipping to" */
 delivered?: boolean;
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
 animation: ${rise} 460ms cubic-bezier(0.22, 1, 0.36, 1) 80ms both;

 .sa-head {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
 }
 .sa-head:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
  border-radius: 12px;
 }
 .sa-peek {
  max-width: 45%;
  overflow: hidden;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.slate};
  text-overflow: ellipsis;
  white-space: nowrap;
  opacity: 0;
  transform: translateX(6px);
  transition: opacity 220ms ease, transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 &.is-closed .sa-peek {
  opacity: 1;
  transform: none;
 }
 .sa-chev {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.mist};
  color: ${({ theme }) => theme.tz.color.inkSoft};
  transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1), background-color 160ms ease, color 160ms ease;
 }
 .sa-head:hover .sa-chev {
  background: ${({ theme }) => theme.tz.tone.success.bg};
  color: ${({ theme }) => theme.tz.tone.success.fg};
 }
 &.is-closed .sa-chev {
  transform: rotate(-180deg);
 }
 .sa-collapse {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 360ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease;
 }
 &.is-closed .sa-collapse {
  grid-template-rows: 0fr;
  opacity: 0;
 }
 .sa-inner {
  min-height: 0;
  overflow: hidden;
  padding-top: 14px;
 }
 .sa-head {
  margin: -8px;
  padding: 8px;
  width: calc(100% + 16px);
  border-radius: 14px;
  transition: background-color 160ms ease;
 }
 .sa-head:hover {
  background: ${({ theme }) => theme.tz.color.mist};
 }
 .sa-more {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.tone.success.fg};
  background: ${({ theme }) => theme.tz.tone.success.bg};
  white-space: nowrap;
  transition: background-color 160ms ease, color 160ms ease;
 }
 .sa-more svg {
  transform: rotate(180deg);
  transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 &.is-closed .sa-more svg {
  transform: none;
 }
 .sa-head:hover .sa-more {
  background: ${({ theme }) => theme.tz.tone.success.fg};
  color: #fff;
 }

 .sa-who {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
 }
 .sa-avatar {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.navyTint};
  color: ${({ theme }) => theme.tz.color.navy};
  font-size: 13px;
  font-weight: 800;
 }
 .sa-who small {
  display: block;
  font-size: 11.5px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .sa-who strong {
  font-size: 14.5px;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .sa-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px dashed ${({ theme }) => theme.tz.color.line};
 }
 .sa-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 36px;
  padding: 0 14px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.paper};
  color: ${({ theme }) => theme.tz.color.inkSoft};
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: border-color 160ms ease, background-color 160ms ease, color 160ms ease;
 }
 .sa-btn:hover {
  border-color: ${({ theme }) => theme.tz.tone.success.fg};
  background: ${({ theme }) => theme.tz.tone.success.bg};
  color: ${({ theme }) => theme.tz.tone.success.fg};
 }
 .sa-btn:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 .sa-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
 }

 h3 {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 h3 span {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: ${({ theme }) => theme.tz.tone.success.bg};
  color: ${({ theme }) => theme.tz.tone.success.fg};
 }
 svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
 }
 .sa-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 0 0 8px;
  font-size: 14px;
  line-height: 1.55;
  color: ${({ theme }) => theme.tz.color.inkSoft};
  overflow-wrap: anywhere;
 }
 .sa-row svg {
  margin-top: 3px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .sa-row:last-child {
  margin-bottom: 0;
 }
 .sa-empty {
  margin: 0;
  font-size: 13.5px;
  color: ${({ theme }) => theme.tz.color.slate};
 }

 @media (prefers-reduced-motion: reduce) {
  animation: none;
  .sa-collapse,
  .sa-peek,
  .sa-chev,
  .sa-more,
  .sa-more svg,
  .sa-head,
  .sa-btn {
   transition: none;
  }
 }
`;

/**
 * The shipping address block of an order detail page.
 *
 * Orders collected at a shop counter carry no delivery address, and any one of the
 * area / city / province / phone fields can be missing on its own, so each line is
 * dropped when empty and the card says so outright rather than showing a heading
 * over blank space.
 */
export default function ShippingAddressCard({ address, area, city, province, phone, name, delivered = false }: ShippingAddressCardProps) {
 // Street, then area / city / province — but only the ones the street line
 // doesn't already contain (the stored address often has them baked in)
 const street = (address ?? "").trim();
 const extra: string[] = [];
 for (const raw of [area, city, province]) {
  const p = (raw ?? "").trim();
  if (!p) continue;
  const seen = [street, ...extra].some((x) => x.toLowerCase().includes(p.toLowerCase()));
  if (!seen) extra.push(p);
 }
 const line = [street, ...extra].filter(Boolean).join(", ");
 const isEmpty = !line && !phone;

 // Starts folded; the header (with the city) opens it
 const [open, setOpen] = useState(false);
 const who = (name ?? "").trim();

 const copyAddress = async () => {
  try {
   await navigator.clipboard.writeText([who, line, phone].filter(Boolean).join("\n"));
   toast.success("Address copied");
  } catch {
   toast.error("Couldn't copy");
  }
 };
 const peek = (city ?? "").trim() || (area ?? "").trim() || phone || "";

 return (
  <Card aria-label="Shipping address" className={open ? undefined : "is-closed"}>
   <button type="button" className="sa-head" aria-expanded={open} aria-controls="sa-body" onClick={() => setOpen((v) => !v)}>
   <h3>
    <span aria-hidden="true">
     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
     </svg>
    </span>
    {delivered ? "Delivered to" : "Shipping to"}
   </h3>
    {peek && (
     <span className="sa-peek" aria-hidden={open}>
      {peek}
     </span>
    )}
    <span className="sa-more" aria-hidden="true">
     {open ? "Hide" : "View details"}
     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
     </svg>
    </span>
    <span className="sa-sr">{open ? "Hide shipping address" : "Show shipping address"}</span>
   </button>

   <div className="sa-collapse" id="sa-body" aria-hidden={!open}>
   <div className="sa-inner">
   {isEmpty ? (
    <p className="sa-empty">No delivery address — this order was collected at the shop.</p>
   ) : (
    <>
     {who && (
      <div className="sa-who">
       <span className="sa-avatar" aria-hidden="true">
        {who
         .split(/\s+/)
         .filter(Boolean)
         .slice(0, 2)
         .map((w) => w[0])
         .join("")
         .toUpperCase()}
       </span>
       <div>
        <small>Recipient</small>
        <strong>{who}</strong>
       </div>
      </div>
     )}
     {line && (
      <p className="sa-row">
       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
        <circle cx="12" cy="10" r="3" />
       </svg>
       <span>{line}</span>
      </p>
     )}
     {phone && (
      <p className="sa-row">
       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
       </svg>
       <span>{phone}</span>
      </p>
     )}
     <div className="sa-actions">
      {phone && (
       <a className="sa-btn" href={`tel:${String(phone).replace(/[^\d+]/g, "")}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
         <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
        </svg>
        Call
       </a>
      )}
      {line && (
       <button type="button" className="sa-btn" onClick={copyAddress}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
         <rect x="9" y="9" width="13" height="13" rx="2" />
         <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        Copy address
       </button>
      )}
     </div>
    </>
   )}
   </div>
   </div>
  </Card>
 );
}
