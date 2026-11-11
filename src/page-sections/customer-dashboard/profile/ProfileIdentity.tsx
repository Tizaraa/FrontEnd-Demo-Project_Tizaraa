"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import axiosClient from "@lib/axiosClient";
import ApiBaseUrl from "api/ApiBaseUrl";
import { DashPanel, DashPanelHead, ToneChip, UserAvatar } from "../ui";
import { statusTone } from "../orders/OrderCard";
import { statusLabel, rowDisplayTotal } from "../orders/orderRowStatus";

// Building blocks for the customer profile page (retail) plus the shared
// identity card the corporate card reuses. Built to Baymard's account
// dashboard findings: people come here for one task (mostly orders), so the
// page leads with identity + order stats + recent orders, then icon shortcuts.
// Motion is entry-only (fade-up once, numbers count up once) and hover lifts —
// no looping animations, and entry animations only fill "backwards" so no
// GPU layers are held afterwards.

const fadeUp = keyframes`
 from { opacity: 0; transform: translateY(14px); }
 to { opacity: 1; transform: none; }
`;

// ---------------------------------------------------------------------------
// Icons (stroke = currentColor)
// ---------------------------------------------------------------------------
export const PIcon = ({ d, size = 18 }: { d: string; size?: number }) => (
 <svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="1.9"
  strokeLinecap="round"
  strokeLinejoin="round"
  aria-hidden="true"
 >
  <path d={d} />
 </svg>
);
export const P_ICON = {
 mail: "M3 6h18v12H3zM3 7l9 6 9-6",
 phone: "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z",
 verified: "M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6zM9 12l2 2 4-4",
 calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
 edit: "M4 20h4L19 9l-4-4L4 16zM14 6l4 4",
 lock: "M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 017 0v3",
 bag: "M5 8h14l-1 12H6zM9 8V6a3 3 0 016 0v2",
 clock: "M12 7v5l3 2M12 21a9 9 0 100-18 9 9 0 000 18z",
 check: "M5 12l4 4 10-10",
 cross: "M6 6l12 12M18 6L6 18",
 returns: "M4 9h11a5 5 0 010 10H9M8 5L4 9l4 4",
 pin: "M12 21s-7-6.5-7-12a7 7 0 0114 0c0 5.5-7 12-7 12zM12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
 heart: "M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z",
 ticket: "M4 7h16v3a2 2 0 000 4v3H4v-3a2 2 0 000-4zM14 7v10",
 truck: "M3 6h11v9H3zM14 9h4l3 3v3h-7M7 18.5a1.8 1.8 0 100-3.6 1.8 1.8 0 000 3.6zM17 18.5a1.8 1.8 0 100-3.6 1.8 1.8 0 000 3.6z",
 arrow: "M5 12h14M13 6l6 6-6 6",
 plus: "M12 5v14M5 12h14",
 home: "M4 11l8-7 8 7v9H4zM10 20v-6h4v6",
 cake: "M4 21h16M5 21v-7a2 2 0 012-2h10a2 2 0 012 2v7M5 16c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 5 0M12 12V8M12 5.5a1 1 0 001-1c0-.8-1-2-1-2s-1 1.2-1 2a1 1 0 001 1z",
 person: "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0",
};

// ---------------------------------------------------------------------------
// Contact line: email + phone, each with its own icon and clickable
// ---------------------------------------------------------------------------
const Contacts = styled.div`
 display: flex;
 flex-wrap: wrap;
 gap: 8px 18px;
 margin: 0 0 12px;

 a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.tz.color.inkSoft};
  text-decoration: none;
  overflow-wrap: anywhere;
  transition: color 150ms;
 }
 a:hover {
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 a:focus-visible {
  outline: none;
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 .ci {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  color: ${({ theme }) => theme.tz.color.emberDeep};
  background: ${({ theme }) => theme.tz.color.emberTint};
 }
 .ci.phone {
  color: ${({ theme }) => theme.tz.tone.success.fg};
  background: ${({ theme }) => theme.tz.tone.success.bg};
 }
 .ci.cake {
  color: #8a5a00;
  background: #fff4dc;
 }
 .ci.person {
  color: ${({ theme }) => theme.tz.color.navy};
  background: ${({ theme }) => theme.tz.color.navyTint};
 }

 /* Plain value (not a link) */
 .cv {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }

 /* Missing value: dashed "+ Add …" chip */
 a.c-add {
  padding: 3px 12px 3px 4px;
  border: 1px dashed ${({ theme }) => theme.tz.color.ember};
  border-radius: 999px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 a.c-add:hover {
  background: ${({ theme }) => theme.tz.color.emberTint};
 }
`;

// Optional birthday / gender (the retail hero passes them; `showMissing`
// turns empty ones into "+ Add …" chips that open Edit profile)
export function ContactLine({
 email,
 phone,
 birthday,
 gender,
 showMissing = false,
}: {
 email?: string;
 phone?: string;
 birthday?: string | null;
 gender?: string | null;
 showMissing?: boolean;
}) {
 const addChip = (key: string, icon: string, cls: string, label: string) => (
  <Link key={key} href="/profile/edit" className="c-add">
   <span className={`ci ${cls}`}>
    <PIcon d={icon} size={15} />
   </span>
   + Add {label}
  </Link>
 );
 if (!email && !phone && !birthday && !gender && !showMissing) return null;
 return (
  <Contacts>
   {email && (
    <a href={`mailto:${email}`} aria-label={`Email ${email}`}>
     <span className="ci">
      <PIcon d={P_ICON.mail} size={15} />
     </span>
     {email}
    </a>
   )}
   {phone ? (
    <a href={`tel:${phone}`} aria-label={`Call ${phone}`}>
     <span className="ci phone">
      <PIcon d={P_ICON.phone} size={15} />
     </span>
     {phone}
    </a>
   ) : (
    showMissing && addChip("phone", P_ICON.phone, "phone", "phone")
   )}
   {birthday ? (
    <span className="cv" title="Birthday">
     <span className="ci cake">
      <PIcon d={P_ICON.cake} size={15} />
     </span>
     {birthday}
    </span>
   ) : (
    showMissing && addChip("birthday", P_ICON.cake, "cake", "birthday")
   )}
   {gender ? (
    <span className="cv" title="Gender">
     <span className="ci person">
      <PIcon d={P_ICON.person} size={15} />
     </span>
     {gender}
    </span>
   ) : null}
  </Contacts>
 );
}

// ---------------------------------------------------------------------------
// Identity card (shared with the corporate card)
// ---------------------------------------------------------------------------
const Row = styled.div`
 display: flex;
 align-items: center;
 gap: 20px;

 .pi-text {
  min-width: 0;
 }

 .pi-name {
  margin: 0 0 8px;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 24px;
  font-weight: 600;
  line-height: 1.25;
  color: ${({ theme }) => theme.tz.color.ink};
  overflow-wrap: anywhere;
 }

 @media (max-width: 650px) {
  align-items: flex-start;
  gap: 16px;

  .pi-name {
   font-size: 20px;
  }
 }
`;

export default function ProfileIdentity({
 name,
 email,
 phone,
 image,
 typeLabel,
 children,
}: {
 name?: string;
 email?: string;
 phone?: string;
 image?: string | null;
 typeLabel?: string;
 children?: ReactNode;
}) {
 return (
  <DashPanel>
   <Row>
    <UserAvatar name={name || email} image={image} size={72} />
    <div className="pi-text">
     <h2 className="pi-name">{name || "Your profile"}</h2>
     <ContactLine email={email} phone={phone} />
     {typeLabel && <ToneChip $tone="info">{typeLabel}</ToneChip>}
    </div>
   </Row>
   {children}
  </DashPanel>
 );
}

// ---------------------------------------------------------------------------
// Retail hero: identity, badges, actions, profile completeness
// ---------------------------------------------------------------------------
const Hero = styled.section`
 position: relative;
 overflow: hidden;
 padding: 24px;
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: 20px;
 background: radial-gradient(70% 140% at 100% 0%, ${({ theme }) => theme.tz.color.emberTint} 0%, transparent 60%),
  ${({ theme }) => theme.tz.color.paper};
 animation: ${fadeUp} 500ms cubic-bezier(0.22, 1, 0.36, 1) backwards;

 .ph-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
 }

 .ph-avatar {
  position: relative;
  border-radius: 50%;
  padding: 3px;
  background: linear-gradient(135deg, ${({ theme }) => theme.tz.color.ember}, #ffb38a);
 }

 .ph-text {
  flex: 1;
  min-width: 220px;
 }

 .ph-name {
  margin: 0 0 6px;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 26px;
  font-weight: 700;
  line-height: 1.2;
  color: ${({ theme }) => theme.tz.color.ink};
  overflow-wrap: anywhere;
 }

 .ph-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
 }

 .ph-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.slate};
  background: ${({ theme }) => theme.tz.color.mist};
 }
 .ph-badge.ok {
  color: ${({ theme }) => theme.tz.tone.success.fg};
  background: ${({ theme }) => theme.tz.tone.success.bg};
 }

 .ph-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-self: flex-start;
 }

 .ph-complete {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 16px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
  font-size: 13px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .ph-meter {
  flex: 0 1 220px;
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.lineSoft};
 }
 .ph-meter > span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, ${({ theme }) => theme.tz.color.ember}, ${({ theme }) => theme.tz.color.emberDeep});
  transform-origin: left;
  transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 .ph-complete strong {
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .ph-add {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border: 1px dashed ${({ theme }) => theme.tz.color.ember};
  border-radius: 999px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.emberDeep};
  text-decoration: none;
  transition: background-color 150ms;
 }
 .ph-add:hover {
  background: ${({ theme }) => theme.tz.color.emberTint};
 }

 @media (max-width: 650px) {
  padding: 18px;

  .ph-name {
   font-size: 21px;
  }
 }

 ${({ theme }) => theme.tz.media.reducedMotion} {
  animation: none;

  .ph-meter > span {
   transition: none;
  }
 }
`;

export const ActionLink = styled(Link)<{ $variant?: "primary" | "outline" }>`
 display: inline-flex;
 align-items: center;
 gap: 8px;
 height: 42px;
 padding: 0 18px;
 border: 1.5px solid ${({ theme, $variant }) => ($variant === "outline" ? theme.tz.color.navy : "transparent")};
 border-radius: 999px;
 font-size: 14px;
 font-weight: 700;
 text-decoration: none;
 color: ${({ theme, $variant }) => ($variant === "outline" ? theme.tz.color.navy : theme.tz.color.paper)};
 background: ${({ theme, $variant }) =>
  $variant === "outline"
   ? theme.tz.color.paper
   : `linear-gradient(135deg, ${theme.tz.color.ember}, ${theme.tz.color.emberDeep})`};
 box-shadow: ${({ $variant }) => ($variant === "outline" ? "none" : "0 8px 18px rgba(194, 64, 15, 0.25)")};
 transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 200ms, background-color 150ms;

 &:hover {
  transform: translateY(-2px);
  box-shadow: ${({ $variant }) =>
   $variant === "outline" ? "0 8px 18px rgba(14, 52, 96, 0.12)" : "0 12px 24px rgba(194, 64, 15, 0.32)"};
 }
 &:active {
  transform: scale(0.97);
 }
 &:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
`;

const memberSince = (iso?: string) => {
 if (!iso) return "";
 const d = new Date(iso);
 return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
};

export function ProfileHero({
 profile,
 canChangePassword,
}: {
 profile: any;
 canChangePassword: boolean;
}) {
 const checks = [
  { done: Boolean(profile?.name), label: "Add your name" },
  { done: Boolean(profile?.phone), label: "Add phone" },
  { done: Boolean(profile?.birth_date), label: "Add birthday" },
  { done: Boolean(profile?.gender), label: "Add gender" },
  { done: Boolean(profile?.image), label: "Add a photo" },
 ];
 const done = checks.filter((c) => c.done).length;
 const pct = Math.round((done / checks.length) * 100);

 const birthday = profile?.birth_date
  ? new Date(profile.birth_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
  : null;
 const gender = profile?.gender === "male" ? "Male" : profile?.gender === "female" ? "Female" : null;

 // The meter fills once after mount (transform only)
 const [fill, setFill] = useState(0);
 useEffect(() => {
  const id = requestAnimationFrame(() => setFill(pct / 100));
  return () => cancelAnimationFrame(id);
 }, [pct]);

 const since = memberSince(profile?.created_at);

 return (
  <Hero aria-label="Your account">
   <div className="ph-top">
    <span className="ph-avatar">
     <UserAvatar name={profile?.name || profile?.email} image={profile?.image} size={80} />
    </span>
    <div className="ph-text">
     <h2 className="ph-name">{profile?.name || "Welcome to Tizaraa"}</h2>
     <div className="ph-badges">
      {profile?.email_verified_at ? (
       <span className="ph-badge ok">
        <PIcon d={P_ICON.verified} size={13} /> Email verified
       </span>
      ) : null}
      {since && (
       <span className="ph-badge">
        <PIcon d={P_ICON.calendar} size={13} /> Member since {since}
       </span>
      )}
     </div>
     <ContactLine email={profile?.email} phone={profile?.phone} birthday={birthday} gender={gender} showMissing />
    </div>
    <div className="ph-actions">
     <ActionLink href="/profile/edit">
      <PIcon d={P_ICON.edit} size={16} /> Edit profile
     </ActionLink>
    </div>
   </div>

   {pct < 100 && (
    <div className="ph-complete">
     <span>
      Profile <strong>{pct}%</strong> complete
     </span>
     <span className="ph-meter" aria-hidden="true">
      <span style={{ transform: `scaleX(${fill})` }} />
     </span>
    </div>
   )}
  </Hero>
 );
}

// ---------------------------------------------------------------------------
// Number that counts up once (rAF, ~700ms, stops by itself)
// ---------------------------------------------------------------------------
export function CountUp({ value }: { value: number }) {
 const [shown, setShown] = useState(0);
 useEffect(() => {
  const target = Number(value) || 0;
  if (target === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
   setShown(target);
   return;
  }
  let frame = 0;
  const start = performance.now();
  const tick = (now: number) => {
   const p = Math.min(1, (now - start) / 700);
   setShown(Math.round(target * (1 - Math.pow(1 - p, 3))));
   if (p < 1) frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(frame);
 }, [value]);
 return <>{shown}</>;
}

// ---------------------------------------------------------------------------
// Panels shared look (fade-up once, staggered by --d)
// ---------------------------------------------------------------------------
const Panel = styled(DashPanel)`
 border-radius: 18px;
 animation: ${fadeUp} 500ms cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms) backwards;

 ${({ theme }) => theme.tz.media.reducedMotion} {
  animation: none;
 }
`;

const MoreLink = styled(Link)`
 display: inline-flex;
 align-items: center;
 gap: 6px;
 font-size: 14px;
 font-weight: 600;
 color: ${({ theme }) => theme.tz.color.emberDeep};
 text-decoration: none;

 svg {
  transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 &:hover svg {
  transform: translateX(3px);
 }
`;

const Skeleton = styled.div<{ $h?: number }>`
 height: ${({ $h = 56 }) => $h}px;
 border-radius: 12px;
 background: ${({ theme }) => theme.tz.color.mist};
`;

const Empty = styled.div`
 display: flex;
 flex-wrap: wrap;
 align-items: center;
 justify-content: space-between;
 gap: 12px;
 padding: 18px;
 border: 1px dashed ${({ theme }) => theme.tz.color.line};
 border-radius: 14px;
 color: ${({ theme }) => theme.tz.color.slate};

 strong {
  display: block;
  margin-bottom: 2px;
  color: ${({ theme }) => theme.tz.color.ink};
 }
`;

// ---------------------------------------------------------------------------
// Recent orders (latest 3) — the main reason people open this page
// ---------------------------------------------------------------------------
const OrderRows = styled.ul`
 display: grid;
 gap: 10px;
 margin: 0;
 padding: 0;
 list-style: none;

 li {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 14px;
  padding: 12px 14px;
  border: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
  border-radius: 14px;
  transition: border-color 150ms, box-shadow 200ms;
 }
 li:hover {
  border-color: ${({ theme }) => theme.tz.color.line};
  box-shadow: 0 8px 20px rgba(14, 52, 96, 0.06);
 }

 .or-icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  color: ${({ theme }) => theme.tz.color.navy};
  background: ${({ theme }) => theme.tz.color.navyTint};
 }
 .or-main {
  min-width: 0;
 }
 .or-inv {
  display: block;
  overflow: hidden;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
  white-space: nowrap;
  text-overflow: ellipsis;
 }
 .or-meta {
  font-size: 13px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .or-total {
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
  font-variant-numeric: tabular-nums;
 }
 .or-side {
  display: flex;
  align-items: center;
  gap: 10px;
 }
 .or-track {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 14px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.ember};
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.emberDeep};
  text-decoration: none;
  transition: background-color 150ms;
 }
 .or-track:hover {
  background: ${({ theme }) => theme.tz.color.emberTint};
 }

 @media (max-width: 650px) {
  li {
   grid-template-columns: auto minmax(0, 1fr);
  }
  .or-total,
  .or-side {
   grid-column: 2;
  }
  .or-track {
   height: 40px;
  }
 }
`;

const fmtTaka = (n: number) => `৳ ${Math.round(n).toLocaleString("en-IN")}`;

export function RecentOrders({ delay = 0 }: { delay?: number }) {
 const [orders, setOrders] = useState<any[] | null>(null);
 const [failed, setFailed] = useState(false);

 useEffect(() => {
  let alive = true;
  axiosClient
   .get("user/order", { params: { page: 1 } })
   .then((res) => {
    const list = res.data?.data ?? res.data?.orders ?? [];
    if (alive) setOrders(Array.isArray(list) ? list.slice(0, 3) : []);
   })
   .catch(() => alive && setFailed(true));
  return () => {
   alive = false;
  };
 }, []);

 return (
  <Panel style={{ "--d": `${delay}ms` } as React.CSSProperties} aria-label="Recent orders">
   <DashPanelHead
    title="Recent orders"
    action={
     <MoreLink href="/orders">
      View all <PIcon d={P_ICON.arrow} size={15} />
     </MoreLink>
    }
   />
   {failed ? (
    <Empty>
     <span>
      <strong>Couldn&apos;t load your orders</strong>
      Check your connection and open the orders page.
     </span>
     <ActionLink href="/orders" $variant="outline">
      Open orders
     </ActionLink>
    </Empty>
   ) : orders === null ? (
    <div style={{ display: "grid", gap: 10 }}>
     <Skeleton />
     <Skeleton />
    </div>
   ) : orders.length === 0 ? (
    <Empty>
     <span>
      <strong>No orders yet</strong>
      When you order something, you can track it right here.
     </span>
     <ActionLink href="/">
      <PIcon d={P_ICON.bag} size={16} /> Start shopping
     </ActionLink>
    </Empty>
   ) : (
    <OrderRows>
     {orders.map((o) => (
      <li key={o.id}>
       <span className="or-icon">
        <PIcon d={P_ICON.truck} size={20} />
       </span>
       <span className="or-main">
        <span className="or-inv">{o.invoice || `Order #${o.id}`}</span>
        <span className="or-meta">
         {o.date ? new Date(o.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : ""}
         {o.item_count ? ` · ${o.item_count} ${o.item_count === 1 ? "item" : "items"}` : ""}
        </span>
       </span>
       <span className="or-total">{fmtTaka(rowDisplayTotal(o))}</span>
       <span className="or-side">
        <ToneChip $tone={statusTone(o.status)}>{statusLabel(o)}</ToneChip>
        <Link className="or-track" href={`/orders/${o.id}`}>
         Track
        </Link>
       </span>
      </li>
     ))}
    </OrderRows>
   )}
  </Panel>
 );
}

// ---------------------------------------------------------------------------
// Quick actions: icon shortcuts to every account feature
// ---------------------------------------------------------------------------
const qaPop = keyframes`
 0% { opacity: 0; transform: scale(0.5); }
 70% { opacity: 1; transform: scale(1.12); }
 100% { opacity: 1; transform: none; }
`;
const qaShimmer = keyframes`
 from { background-position: -60px 0; }
 to { background-position: 60px 0; }
`;

const Actions = styled.div`
 display: grid;
 grid-template-columns: repeat(6, minmax(0, 1fr));
 gap: 12px;

 a {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 18px 8px 16px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
  border-radius: 16px;
  background: ${({ theme }) => theme.tz.color.paper};
  text-align: center;
  text-decoration: none;
  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1), border-color 160ms, box-shadow 220ms;
 }
 a:hover {
  transform: translateY(-3px);
  border-color: ${({ theme }) => theme.tz.color.ember};
  box-shadow: 0 12px 24px rgba(240, 80, 35, 0.12);
 }
 a:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 .qa-icon {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  margin-bottom: 8px;
  border-radius: 14px;
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 a:hover .qa-icon {
  transform: scale(1.08) rotate(-4deg);
 }

 .qa-label {
  font-size: 13.5px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .qa-sub {
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.tz.color.slate};
  font-variant-numeric: tabular-nums;
 }

 /* count pill, top-right */
 .qa-count {
  position: absolute;
  top: 10px;
  right: 10px;
  min-width: 26px;
  height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  line-height: 22px;
  text-align: center;
  font-variant-numeric: tabular-nums;
  animation: ${qaPop} 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
 }
 .qa-count.is-zero {
  color: ${({ theme }) => theme.tz.color.slate} !important;
  background: ${({ theme }) => theme.tz.color.lineSoft} !important;
 }
 .qa-count.is-loading {
  width: 26px;
  color: transparent;
  background: linear-gradient(90deg, ${({ theme }) => theme.tz.color.lineSoft} 0%, ${({ theme }) => theme.tz.color.mist} 50%, ${({ theme }) => theme.tz.color.lineSoft} 100%);
  background-size: 120px 100%;
  animation: ${qaShimmer} 1.1s linear infinite;
 }

 /* arrow slides in on hover */
 .qa-go {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: inline-flex;
  color: ${({ theme }) => theme.tz.color.emberDeep};
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 180ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 a:hover .qa-go,
 a:focus-visible .qa-go {
  opacity: 1;
  transform: none;
 }

 @media (max-width: 900px) {
  grid-template-columns: repeat(3, minmax(0, 1fr));
 }

 @media (prefers-reduced-motion: reduce) {
  a,
  .qa-icon,
  .qa-go {
   transition: none;
  }
  .qa-count,
  .qa-count.is-loading {
   animation: none;
  }
 }
`;

type QuickCounts = { orders: number; returns: number; addresses: number };
type QuickItem = {
 label: string;
 href: string;
 icon: string;
 fg: string;
 bg: string;
 password?: boolean;
 // Which count to show (from user/profile/history); items without one show `sub`
 count?: keyof QuickCounts;
 unit?: [string, string];
 sub?: string;
};

const QUICK: QuickItem[] = [
 { label: "My orders", href: "/orders", icon: P_ICON.bag, fg: "#0e3460", bg: "#e8edf4", count: "orders", unit: ["order", "orders"] },
 { label: "Returns", href: "/return-orders", icon: P_ICON.returns, fg: "#8a5a00", bg: "#fff4dc", count: "returns", unit: ["return", "returns"] },
 { label: "Addresses", href: "/address", icon: P_ICON.pin, fg: "#1b7a4b", bg: "#e6f4ec", count: "addresses", unit: ["saved", "saved"] },
 // Wishlist API is not built yet (WishlistController is a TODO), so no count
 { label: "Wishlist", href: "/wish-list", icon: P_ICON.heart, fg: "#c0262d", bg: "#fdecec", sub: "Saved items" },
 { label: "Password", href: "/profile/set-password", icon: P_ICON.lock, fg: "#c2400f", bg: "#fdeee7", password: true, sub: "Keep it secure" },
];

export function QuickActions({
 canChangePassword,
 delay = 0,
 counts = null,
}: {
 canChangePassword: boolean;
 delay?: number;
 counts?: QuickCounts | null;
}) {
 return (
  <Panel style={{ "--d": `${delay}ms` } as React.CSSProperties} aria-label="Quick actions">
   <DashPanelHead title="Quick actions" />
   <Actions>
    {QUICK.filter((q) => canChangePassword || !q.password).map((q) => {
     const n = q.count && counts ? counts[q.count] : null;
     const loading = Boolean(q.count) && !counts;
     return (
      <Link
       key={q.label}
       href={q.href}
       aria-label={n !== null ? `${q.label}, ${n} ${q.unit?.[n === 1 ? 0 : 1]}` : undefined}
      >
       {q.count && (
        <span
         className={`qa-count${loading ? " is-loading" : n === 0 ? " is-zero" : ""}`}
         style={{ color: q.fg, background: q.bg }}
         aria-hidden="true"
        >
         {n !== null ? n > 999 ? "999+" : <CountUp value={n} /> : "0"}
        </span>
       )}
       <span className="qa-icon" style={{ color: q.fg, background: q.bg }}>
        <PIcon d={q.icon} size={22} />
       </span>
       <span className="qa-label">{q.label}</span>
       <span className="qa-sub" aria-hidden={n !== null}>
        {q.count ? (n !== null ? `${n} ${q.unit?.[n === 1 ? 0 : 1]}` : "Loading…") : q.sub}
       </span>
       <span className="qa-go" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
         <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
       </span>
      </Link>
     );
    })}
   </Actions>
  </Panel>
 );
}

// ---------------------------------------------------------------------------
// Saved address preview (default first)
// ---------------------------------------------------------------------------
const AddrCard = styled.div`
 display: flex;
 gap: 12px;
 padding: 14px;
 border: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
 border-radius: 14px;

 .ad-icon {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  color: ${({ theme }) => theme.tz.tone.success.fg};
  background: ${({ theme }) => theme.tz.tone.success.bg};
 }
 .ad-name {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .ad-line {
  font-size: 13.5px;
  line-height: 1.55;
  color: ${({ theme }) => theme.tz.color.slate};
  overflow-wrap: anywhere;
 }
`;

export function AddressPreview({ delay = 0 }: { delay?: number }) {
 const [addresses, setAddresses] = useState<any[] | null>(null);
 const [failed, setFailed] = useState(false);
 const ran = useRef(false);

 useEffect(() => {
  if (ran.current) return;
  ran.current = true;
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  axios
   .get(`${ApiBaseUrl.localApiUrl}user/address`, { headers: { Authorization: `Bearer ${token}` } })
   .then((res) => setAddresses(Array.isArray(res.data?.address) ? res.data.address : []))
   .catch(() => setFailed(true));
 }, []);

 const main = addresses?.find((a) => a.is_default) ?? addresses?.[0];
 const place = main
  ? [main.address, main.area?.area, main.city?.city, main.province?.province, main.postal_code]
     .filter(Boolean)
     // drop parts already present (e.g. area and city both "Dhaka")
     .filter((part, i, all) => !all.slice(0, i).some((prev) => String(prev).includes(String(part))))
     .join(", ")
  : "";

 return (
  <Panel style={{ "--d": `${delay}ms` } as React.CSSProperties} aria-label="Saved addresses">
   <DashPanelHead
    title="Saved addresses"
    action={
     <MoreLink href="/address">
      Manage <PIcon d={P_ICON.arrow} size={15} />
     </MoreLink>
    }
   />
   {failed ? (
    <Empty>
     <span>
      <strong>Couldn&apos;t load your addresses</strong>
      Open the addresses page to see them.
     </span>
    </Empty>
   ) : addresses === null ? (
    <Skeleton $h={84} />
   ) : !main ? (
    <Empty>
     <span>
      <strong>No saved address</strong>
      Add one to check out faster.
     </span>
     <ActionLink href="/address" $variant="outline">
      <PIcon d={P_ICON.plus} size={15} /> Add address
     </ActionLink>
    </Empty>
   ) : (
    <AddrCard>
     <span className="ad-icon">
      <PIcon d={P_ICON.home} size={20} />
     </span>
     <span>
      <span className="ad-name">
       {main.name}
       {main.is_default ? <ToneChip $tone="success">Default</ToneChip> : null}
       {addresses.length > 1 ? (
        <ToneChip $tone="neutral">+{addresses.length - 1} more</ToneChip>
       ) : null}
      </span>
      <span className="ad-line">
       {place}
       {main.phone ? (
        <>
         <br />
         {main.phone}
        </>
       ) : null}
      </span>
     </span>
    </AddrCard>
   )}
  </Panel>
 );
}

// Panel wrapper for the page's other sections (same entry motion)
export function ProfilePanel({ delay = 0, label, children }: { delay?: number; label: string; children: ReactNode }) {
 return (
  <Panel style={{ "--d": `${delay}ms` } as React.CSSProperties} aria-label={label}>
   {children}
  </Panel>
 );
}
