"use client";

import Link from "next/link";
import { ReactNode } from "react";
import styled from "styled-components";
import ApiBaseUrl from "api/ApiBaseUrl";

// Shared building blocks for the customer dashboard pages:
// panel card, avatar, stat tiles, tone chip and label/value list.

export type Tone = "brand" | "info" | "success" | "warning" | "danger" | "neutral";

// ==============================================================
// Panel
// ==============================================================

export const DashPanel = styled.section`
 padding: 24px;
 background: ${({ theme }) => theme.tz.color.paper};
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: ${({ theme }) => theme.tz.radius.md}px;

 @media (max-width: 650px) {
  padding: 16px;
 }
`;

const PanelHeadRow = styled.div`
 display: flex;
 flex-wrap: wrap;
 align-items: center;
 justify-content: space-between;
 gap: 8px 16px;
 margin-bottom: 16px;

 h2 {
  margin: 0;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 18px;
  font-weight: 600;
  line-height: 1.3;
  color: ${({ theme }) => theme.tz.color.ink};
 }
`;

export function DashPanelHead({ title, action }: { title: string; action?: ReactNode }) {
 return (
  <PanelHeadRow>
   <h2>{title}</h2>
   {action}
  </PanelHeadRow>
 );
}

// ==============================================================
// Avatar: the photo when there is one, otherwise initials
// ==============================================================

const AvatarCircle = styled.span<{ $size: number }>`
 flex-shrink: 0;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 width: ${({ $size }) => $size}px;
 height: ${({ $size }) => $size}px;
 border-radius: 50%;
 overflow: hidden;
 background: ${({ theme }) => theme.tz.color.navyTint};
 color: ${({ theme }) => theme.tz.color.navy};
 font-family: ${({ theme }) => theme.tz.font.display};
 font-size: ${({ $size }) => Math.round($size * 0.38)}px;
 font-weight: 600;
 line-height: 1;

 img {
  width: 100%;
  height: 100%;
  object-fit: cover;
 }
`;

export function initialsOf(name?: string) {
 const parts = (name || "").trim().split(/\s+/).filter(Boolean);
 if (!parts.length) return "?";
 const first = parts[0][0];
 const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
 return (first + last).toUpperCase();
}

export function UserAvatar({
 name,
 image,
 size = 48,
}: {
 name?: string;
 image?: string | null;
 size?: number;
}) {
 return (
  <AvatarCircle $size={size} aria-hidden="true">
   {image ? <img src={`${ApiBaseUrl.ImgUrl}${image}`} alt="" /> : initialsOf(name)}
  </AvatarCircle>
 );
}

// ==============================================================
// Tone chip
// ==============================================================

export const ToneChip = styled.span<{ $tone?: Tone }>`
 display: inline-flex;
 align-items: center;
 gap: 6px;
 padding: 3px 10px;
 border-radius: ${({ theme }) => theme.tz.radius.pill}px;
 background: ${({ theme, $tone = "neutral" }) => theme.tz.tone[$tone].bg};
 color: ${({ theme, $tone = "neutral" }) => theme.tz.tone[$tone].fg};
 font-size: 12px;
 font-weight: 600;
 line-height: 1.4;
 white-space: nowrap;
`;

// ==============================================================
// Stat tiles
// ==============================================================

export const StatGrid = styled.div`
 display: grid;
 grid-template-columns: repeat(4, minmax(0, 1fr));
 gap: 16px;

 @media (max-width: 820px) {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
 }
`;

const Tile = styled(Link)<{ $tone: Tone }>`
 display: flex;
 flex-direction: column;
 gap: 4px;
 padding: 16px 20px;
 background: ${({ theme }) => theme.tz.color.paper};
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-top: 3px solid ${({ theme, $tone }) => theme.tz.tone[$tone].fill};
 border-radius: ${({ theme }) => theme.tz.radius.md}px;
 text-decoration: none;
 transition: box-shadow ${({ theme }) => theme.tz.motion.fast},
  border-color ${({ theme }) => theme.tz.motion.fast};

 .st-value {
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 28px;
  font-weight: 600;
  line-height: 1.2;
  color: ${({ theme }) => theme.tz.color.ink};
  font-variant-numeric: tabular-nums;
 }

 .st-label {
  font-size: 14px;
  color: ${({ theme }) => theme.tz.color.slate};
 }

 &:hover {
  box-shadow: ${({ theme }) => theme.tz.elevation.raised};
 }

 &:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 ${({ theme }) => theme.tz.media.reducedMotion} {
  transition: none;
 }
`;

export function StatTile({
 href,
 value,
 label,
 tone,
}: {
 href: string;
 value: ReactNode;
 label: string;
 tone: Tone;
}) {
 return (
  <Tile href={href} $tone={tone}>
   <span className="st-value">{value}</span>
   <span className="st-label">{label}</span>
  </Tile>
 );
}

// ==============================================================
// Label / value list
// ==============================================================

export const DetailList = styled.dl`
 display: grid;
 grid-template-columns: repeat(2, minmax(0, 1fr));
 gap: 0 32px;
 margin: 0;

 @media (max-width: 650px) {
  grid-template-columns: minmax(0, 1fr);
 }

 > div {
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
 }

 dt {
  margin: 0 0 2px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.tz.color.slate};
 }

 dd {
  margin: 0;
  font-size: 15px;
  color: ${({ theme }) => theme.tz.color.ink};
  overflow-wrap: anywhere;
 }

 a {
  color: inherit;
  text-decoration: none;

  &:hover {
   color: ${({ theme }) => theme.tz.color.emberDeep};
   text-decoration: underline;
  }
 }
`;

export function DetailItem({ label, children }: { label: string; children: ReactNode }) {
 return (
  <div>
   <dt>{label}</dt>
   <dd>{children}</dd>
  </div>
 );
}
