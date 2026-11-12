"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import toast from "react-hot-toast";
import axios from "@lib/axiosClient";
import { currency } from "@utils/utils";
import { UserAvatar } from "@sections/customer-dashboard/ui";

// Profile for corporate employees: identity, company credit "wallet" with a
// usage bar, ready-to-collect alert, work details, shop link, quick actions.

const rise = keyframes`
 from { opacity: 0; transform: translateY(10px); }
 to { opacity: 1; transform: none; }
`;
const grow = keyframes`
 from { transform: scaleX(0); }
 to { transform: scaleX(1); }
`;
const shine = keyframes`
 from { transform: translateX(-120%) skewX(-20deg); }
 to { transform: translateX(320%) skewX(-20deg); }
`;
const growY = keyframes`
 from { transform: scaleY(0); }
 to { transform: scaleY(1); }
`;
const drift = keyframes`
 0% { transform: translate(0, 0) scale(1); }
 50% { transform: translate(-40px, 18px) scale(1.15); }
 100% { transform: translate(0, 0) scale(1); }
`;
const sweep = keyframes`
 0% { transform: translateX(-100%); }
 60%, 100% { transform: translateX(400%); }
`;
const fadeUp = keyframes`
 from { opacity: 0; transform: translateY(6px); }
 to { opacity: 1; transform: none; }
`;
const dotPing = keyframes`
 0% { box-shadow: 0 0 0 0 rgba(79, 209, 139, 0.6); }
 70%, 100% { box-shadow: 0 0 0 6px rgba(79, 209, 139, 0); }
`;
const pulse = keyframes`
 0%, 100% { transform: scale(1); }
 50% { transform: scale(1.08); }
`;

const Wrap = styled.div`
 display: flex;
 flex-direction: column;
 gap: 18px;

 .cp-card {
  padding: 22px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 20px;
  background: ${({ theme }) => theme.tz.color.paper};
  animation: ${rise} 460ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--d, 0) * 90ms);
 }

 /* identity */
 .cp-id {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px;
  background: radial-gradient(80% 140% at 0% 0%, ${({ theme }) => theme.tz.color.navyTint} 0%, transparent 60%), ${({ theme }) => theme.tz.color.paper};
 }
 .cp-avatar {
  flex-shrink: 0;
  padding: 3px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${({ theme }) => theme.tz.color.navy}, ${({ theme }) => theme.tz.color.ember});
 }
 .cp-avatar > * {
  border: 3px solid #fff;
  border-radius: 50%;
 }
 .cp-who {
  flex: 1 1 260px;
  min-width: 0;
 }
 .cp-who h2 {
  margin: 0;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .cp-tags,
 .cp-contacts {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
 }
 .cp-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.navyTint};
  color: ${({ theme }) => theme.tz.color.navy};
  font-size: 12px;
  font-weight: 700;
 }
 .cp-tag--ok {
  background: ${({ theme }) => theme.tz.tone.success.bg};
  color: ${({ theme }) => theme.tz.tone.success.fg};
 }
 .cp-tag--off {
  background: ${({ theme }) => theme.tz.tone.warning.bg};
  color: ${({ theme }) => theme.tz.tone.warning.fg};
 }
 .cp-tag--ok i,
 .cp-tag--off i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
 }
 .cp-contact {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
  border-radius: 10px;
  background: #fff;
  font-size: 13px;
  color: ${({ theme }) => theme.tz.color.inkSoft};
  text-decoration: none;
  transition: border-color 150ms ease, color 150ms ease;
 }
 .cp-contact:hover {
  border-color: ${({ theme }) => theme.tz.color.ember};
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .cp-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
 }
 .cp-edit {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 40px;
  padding: 0 16px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 999px;
  background: #fff;
  color: ${({ theme }) => theme.tz.color.ink};
  font-size: 13.5px;
  font-weight: 700;
  text-decoration: none;
  transition: border-color 160ms ease, transform 160ms ease;
 }
 .cp-edit:hover {
  border-color: ${({ theme }) => theme.tz.color.ember};
  transform: translateY(-1px);
 }

 /* wallet */
 .cp-wallet {
  position: relative;
  overflow: hidden;
  padding: 22px 24px;
  border-radius: 22px;
  background: radial-gradient(120% 160% at 100% 0%, rgba(240, 80, 35, 0.35) 0%, transparent 50%),
   linear-gradient(135deg, ${({ theme }) => theme.tz.color.navy} 0%, #1b4a80 100%);
  color: #fff;
  box-shadow: 0 18px 40px rgba(14, 52, 96, 0.25);
  animation: ${rise} 460ms cubic-bezier(0.22, 1, 0.36, 1) 90ms backwards;
  isolation: isolate;
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 260ms ease;
 }
 .cp-wallet:hover {
  transform: translateY(-3px);
  box-shadow: 0 24px 50px rgba(14, 52, 96, 0.32);
 }
 /* slow drifting glow behind the content (transform only) */
 .cp-wallet::before {
  content: "";
  position: absolute;
  top: -60px;
  right: -40px;
  z-index: -1;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(240, 80, 35, 0.35) 0%, transparent 70%);
  animation: ${drift} 12s ease-in-out infinite;
  pointer-events: none;
 }
 .cp-w-top,
 .cp-legend > span,
 .cp-w-foot > * {
  animation: ${fadeUp} 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
 }
 .cp-w-top {
  animation-delay: 150ms;
 }
 .cp-legend > span:nth-child(1) { animation-delay: 500ms; }
 .cp-legend > span:nth-child(2) { animation-delay: 580ms; }
 .cp-legend > span:nth-child(3) { animation-delay: 660ms; }
 .cp-legend > span:nth-child(4) { animation-delay: 740ms; }
 .cp-w-foot > * {
  animation-delay: 820ms;
 }
 .cp-w-company {
  transition: background-color 180ms ease, transform 180ms ease;
 }
 .cp-wallet:hover .cp-w-company {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
 }
 .cp-renew svg {
  transition: transform 500ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 .cp-renew:hover svg {
  transform: rotate(-360deg);
 }
 .cp-wallet::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 30%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent);
  pointer-events: none;
  animation: ${shine} 1.6s ease-out 600ms 1 both;
 }
 .cp-w-top {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
 }
 .cp-w-top small {
  display: block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0.75;
 }
 .cp-w-amount {
  margin-top: 4px;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 34px;
  font-weight: 800;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
 }
 .cp-w-company {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  font-size: 12.5px;
  font-weight: 700;
 }
 .cp-bar {
  position: relative;
  display: flex;
  height: 10px;
  margin: 18px 0 10px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
 }
 .cp-bar i {
  display: block;
  height: 100%;
  transform-origin: left center;
  animation: ${grow} 900ms cubic-bezier(0.22, 1, 0.36, 1) 300ms both;
 }
 .cp-bar .b-due {
  background: #ff7a7a;
 }
 .cp-bar .b-pend {
  background: #f5b84a;
 }
 .cp-bar .b-avail {
  background: #4fd18b;
 }
 /* gentle light sweep along the bar every few seconds */
 .cp-bar::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 25%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent);
  animation: ${sweep} 3.6s ease-in-out 1.4s infinite;
  pointer-events: none;
 }
 .cp-legend > span:last-child i {
  animation: ${dotPing} 2s ease-out 1.2s infinite;
 }
 .cp-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 18px;
  font-size: 12.5px;
 }
 .cp-legend span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  opacity: 0.92;
 }
 .cp-legend i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
 }
 .cp-legend b {
  font-variant-numeric: tabular-nums;
 }
 .cp-w-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px dashed rgba(255, 255, 255, 0.22);
 }
 .cp-low {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255, 122, 122, 0.18);
  color: #ffd2d2;
  font-size: 12.5px;
  font-weight: 700;
 }
 .cp-w-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: background-color 160ms ease;
 }
 .cp-w-link:hover {
  background: rgba(255, 255, 255, 0.24);
 }
 .cp-w-link svg {
  transition: transform 200ms ease;
 }
 .cp-w-link:hover svg {
  transform: translateX(3px);
 }

 .cp-renew {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  font-size: 12.5px;
  font-weight: 700;
 }

 /* spending chart: one series, navy bars, current month in ember */
 .cp-sp-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 14px;
 }
 .cp-sp-now {
  font-size: 13px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .cp-sp-now b {
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .cp-sp-skel {
  height: 170px;
  border-radius: 14px;
  background: ${({ theme }) => theme.tz.color.mist};
 }
 .cp-chart {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 10px;
  height: 180px;
  padding: 0 4px;
  border-bottom: 1px solid ${({ theme }) => theme.tz.color.line};
 }
 .cp-col {
  display: flex;
  flex-direction: column;
  min-width: 0;
  cursor: pointer;
  outline: none;
 }
 .cp-col-plot {
  position: relative;
  display: flex;
  flex: 1;
  align-items: flex-end;
  justify-content: center;
 }
 .cp-col-plot i {
  display: block;
  width: min(36px, 70%);
  border-radius: 4px 4px 0 0;
  background: ${({ theme }) => theme.tz.color.navy};
  opacity: 0.85;
  transform-origin: bottom center;
  animation: ${growY} 700ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--n, 0) * 70ms + 200ms);
  transition: opacity 150ms ease;
 }
 .cp-col.is-now .cp-col-plot i {
  background: ${({ theme }) => theme.tz.color.ember};
 }
 .cp-col.is-hover .cp-col-plot i,
 .cp-col:focus-visible .cp-col-plot i {
  opacity: 1;
 }
 .cp-col:focus-visible .cp-col-label {
  color: ${({ theme }) => theme.tz.color.emberDeep};
  text-decoration: underline;
 }
 .cp-col-label {
  padding: 8px 0 6px;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .cp-col.is-now .cp-col-label {
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .cp-val {
  position: absolute;
  bottom: calc(100% + 0px);
  margin-bottom: 4px;
  font-size: 11.5px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.inkSoft};
  white-space: nowrap;
 }
 .cp-col-plot .cp-val {
  position: static;
  order: -1;
 }
 .cp-col-plot {
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
 }
 .cp-tip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.tz.color.ink};
  color: #fff;
  font-size: 11.5px;
  white-space: nowrap;
  transform: translate(-50%, -6px);
  pointer-events: none;
 }
 .cp-tip b {
  font-size: 13px;
 }

 .cp-stmt {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
 }
 .cp-stmt-pick {
  display: flex;
  flex: 1 1 260px;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }
 .cp-stmt-pick select {
  flex: 1;
  min-height: 40px;
  padding: 0 12px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 12px;
  background: #fff;
  font-family: inherit;
  font-size: 13.5px;
  color: ${({ theme }) => theme.tz.color.ink};
  cursor: pointer;
 }
 .cp-stmt-pick select:focus {
  outline: none;
  border-color: ${({ theme }) => theme.tz.color.ember};
  box-shadow: 0 0 0 4px rgba(240, 80, 35, 0.12);
 }
 .cp-stmt-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 40px;
  padding: 0 16px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 12px;
  background: #fff;
  color: ${({ theme }) => theme.tz.color.ink};
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  transition: border-color 150ms ease, transform 150ms ease;
 }
 .cp-stmt-btn:hover:enabled {
  border-color: ${({ theme }) => theme.tz.color.slate};
  transform: translateY(-1px);
 }
 .cp-stmt-btn--solid {
  border-color: ${({ theme }) => theme.tz.color.emberDeep};
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
 }
 .cp-stmt-btn--solid:hover:enabled {
  border-color: ${({ theme }) => theme.tz.color.emberDark};
  background: ${({ theme }) => theme.tz.color.emberDark};
 }
 .cp-stmt-btn:disabled {
  opacity: 0.55;
  cursor: wait;
 }
 .cp-stmt-btn:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 .cp-codes {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
 }
 .cp-code {
  padding: 3px 10px;
  border: 1.5px dashed ${({ theme }) => theme.tz.tone.success.fill};
  border-radius: 8px;
  background: #fff;
  font-family: ui-monospace, monospace;
  font-size: 15px;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.tz.color.ink};
 }

 /* ready to collect */
 .cp-ready {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  border: 1.5px solid ${({ theme }) => theme.tz.tone.success.fill};
  border-radius: 16px;
  background: ${({ theme }) => theme.tz.tone.success.bg};
  color: ${({ theme }) => theme.tz.tone.success.fg};
  text-decoration: none;
  animation: ${rise} 400ms ease both;
 }
 .cp-ready-icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 12px;
  background: ${({ theme }) => theme.tz.tone.success.fill};
  color: #fff;
  animation: ${pulse} 2s ease-in-out infinite;
 }
 .cp-ready strong {
  display: block;
  font-size: 15px;
 }
 .cp-ready small {
  font-size: 12.5px;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }
 .cp-ready > svg {
  margin-left: auto;
 }

 /* details */
 .cp-h {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 12px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .cp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
 }
 .cp-grid + .cp-h {
  margin-top: 20px;
 }
 .cp-fact {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
  border-radius: 14px;
  background: ${({ theme }) => theme.tz.color.paper};
  transition: border-color 160ms ease, transform 200ms ease;
 }
 .cp-fact:hover {
  border-color: #f6b9a3;
  transform: translateY(-1px);
 }
 .cp-fact-icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 11px;
  background: ${({ theme }) => theme.tz.color.navyTint};
  color: ${({ theme }) => theme.tz.color.navy};
 }
 .cp-fact small {
  display: block;
  font-size: 11.5px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .cp-fact b {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14.5px;
  color: ${({ theme }) => theme.tz.color.ink};
  overflow-wrap: anywhere;
 }
 .cp-fact b.is-empty {
  font-weight: 500;
  font-style: italic;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .cp-copy {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border: 0;
  border-radius: 7px;
  background: ${({ theme }) => theme.tz.color.mist};
  color: ${({ theme }) => theme.tz.color.slate};
  cursor: pointer;
 }
 .cp-copy:hover {
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }

 /* shop */
 .cp-shop {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 18px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 18px;
  background: linear-gradient(135deg, ${({ theme }) => theme.tz.color.emberTint} 0%, #fff 70%);
  color: inherit;
  text-decoration: none;
  transition: border-color 180ms ease, transform 200ms ease, box-shadow 200ms ease;
  animation: ${rise} 460ms ease 270ms backwards;
 }
 .cp-shop:hover {
  border-color: ${({ theme }) => theme.tz.color.ember};
  transform: translateY(-2px);
  box-shadow: 0 12px 26px rgba(240, 80, 35, 0.14);
 }
 .cp-shop-logo {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 16px;
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 22px;
  font-weight: 800;
 }
 .cp-shop strong {
  display: block;
  font-size: 16px;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .cp-shop small {
  font-size: 13px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .cp-shop-go {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
  padding: 10px 16px;
  border-radius: 12px;
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  white-space: nowrap;
 }
 .cp-shop-go svg {
  transition: transform 200ms ease;
 }
 .cp-shop:hover .cp-shop-go svg {
  transform: translateX(3px);
 }

 .cp-edit:focus-visible,
 .cp-contact:focus-visible,
 .cp-w-link:focus-visible,
 .cp-ready:focus-visible,
 .cp-shop:focus-visible,
 .cp-copy:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 @media (max-width: 640px) {
  .cp-card,
  .cp-wallet {
   padding: 16px;
  }
  .cp-w-amount {
   font-size: 28px;
  }
  .cp-shop {
   flex-wrap: wrap;
  }
  .cp-shop-go {
   margin-left: 0;
  }
 }

 @media (prefers-reduced-motion: reduce) {
  .cp-card,
  .cp-wallet,
  .cp-wallet::after,
  .cp-wallet::before,
  .cp-bar::after,
  .cp-w-top,
  .cp-legend > span,
  .cp-legend > span:last-child i,
  .cp-w-foot > *,
  .cp-bar i,
  .cp-col-plot i,
  .cp-ready,
  .cp-ready-icon,
  .cp-shop {
   animation: none !important;
  }
  .cp-wallet,
  .cp-w-company,
  .cp-renew svg,
  .cp-edit,
  .cp-contact,
  .cp-fact,
  .cp-shop,
  .cp-w-link svg,
  .cp-shop-go svg {
   transition: none;
  }
 }
`;

const Ico = ({ d, size = 16 }: { d: string; size?: number }) => (
 <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  <path d={d} />
 </svg>
);
const I = {
 mail: "M2 4h20v16H2zM22 7l-10 6L2 7",
 phone:
  "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z",
 building: "M4 21V3h11v18M15 9h5v12M8 7h3M8 11h3M8 15h3",
 badge: "M3 4h18v16H3zM9 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM15 8h3M15 12h3M6 16c.6-1.5 1.8-2.5 3-2.5s2.4 1 3 2.5",
 brief: "M3 7h18v13H3zM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
 check: "M20 6 9 17l-5-5",
 cake: "M3 21h18M5 21V11h14v10M12 7v4M12 3c-1 1-1 2 0 3 1-1 1-2 0-3z",
 user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
 arrow: "M5 12h14M13 6l6 6-6 6",
 copy: "M9 9h13v13H9zM5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1",
 edit: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z",
 lock: "M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3",
 box: "M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8",
 bag: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0",
 card: "M2 5h20v14H2zM2 10h20",
 store: "M3 9l1.5-5h15L21 9M3 9v11h18V9M3 9h18M9 20v-6h6v6",
 help: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01",
 alert: "M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01",
};

const num = (v: any) => {
 const n = Number(v);
 return Number.isFinite(n) ? n : 0;
};

// Count a money value up once (~800ms); instant for reduced motion
function useCount(target: number) {
 const [v, setV] = useState(target);
 useEffect(() => {
  if (!target || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
   setV(target);
   return;
  }
  let f = 0;
  const t0 = performance.now();
  const tick = (now: number) => {
   const p = Math.min(1, (now - t0) / 800);
   setV(target * (1 - Math.pow(1 - p, 3)));
   if (p < 1) f = requestAnimationFrame(tick);
  };
  setV(0);
  f = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(f);
 }, [target]);
 return v;
}

const CorporateCard = ({ profile }) => {
 const limit = num(profile?.credit_limit);
 const due = num(profile?.due_amount);
 const pending = num(profile?.credit_pending);
 // what can still be spent now (limit minus everything used, incl. pending)
 const available = profile?.credit_available != null ? num(profile.credit_available) : num(profile?.credit_balance);
 const shown = useCount(available);
 const pct = (v: number) => (limit > 0 ? Math.max(0, Math.min(100, (v / limit) * 100)) : 0);
 const low = limit > 0 && available / limit < 0.2;

 const status = String(profile?.employee_status ?? "").toLowerCase();
 const active = status === "active" || status === "1" || status === "approved";

 // Corporate data: credit cycle (renew date) + last 6 months of credit orders
 const slug = profile?.shop_slug;
 const [cycle, setCycle] = useState<{ renews_on?: string; days_remaining?: number; overdue?: boolean } | null>(null);
 const [orders, setOrders] = useState<any[] | null>(null);
 const since = new Date(new Date().getFullYear(), new Date().getMonth() - 5, 1);
 useEffect(() => {
  if (!slug) return;
  let alive = true;
  axios
   .get(`corporate/${slug}/credit`)
   .then((res) => {
    const d = res.data?.data ?? res.data ?? {};
    if (alive)
     setCycle({
      renews_on: d.current_period?.renews_on,
      days_remaining: d.current_period?.days_remaining,
      overdue: Boolean(d.has_overdue_invoice),
     });
   })
   .catch(() => {});
  axios
   .get(`corporate/${slug}/orders`, {
    params: { per_page: 200, from: `${since.getFullYear()}-${String(since.getMonth() + 1).padStart(2, "0")}-01` },
   })
   .then((res) => {
    const list = res.data?.data ?? [];
    if (alive) setOrders(Array.isArray(list) ? list : []);
   })
   .catch(() => alive && setOrders([]));
  return () => {
   alive = false;
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [slug]);

 const stOf = (o: any) => String(o?.order_status ?? o?.status ?? "").toLowerCase();
 const readyOrders = (orders ?? []).filter((o) => ["processing", "ready_for_pickup", "packed"].includes(stOf(o)));
 const ready = { count: readyOrders.length, firstId: readyOrders[0]?.id };

 // spending per month (cancelled orders don't count)
 const months = Array.from({ length: 6 }, (_, i) => {
  const d = new Date(since.getFullYear(), since.getMonth() + i, 1);
  return { key: `${d.getFullYear()}-${d.getMonth()}`, date: d, label: d.toLocaleDateString("en-GB", { month: "short" }), total: 0, count: 0, list: [] as any[] };
 });
 (orders ?? []).forEach((o) => {
  if (stOf(o) === "cancelled" || stOf(o) === "canceled" || !o.created_at) return;
  const d = new Date(o.created_at);
  const m = months.find((x) => x.key === `${d.getFullYear()}-${d.getMonth()}`);
  if (m) {
   m.total += num(o.total_amount);
   m.count += 1;
   m.list.push(o);
  }
 });
 const maxTotal = Math.max(0, ...months.map((m) => m.total));
 const thisMonth = months[months.length - 1];
 const [stmtKey, setStmtKey] = useState<string>("");
 const stmtMonth = months.find((m) => m.key === stmtKey) ?? thisMonth;
 const [hoverBar, setHoverBar] = useState<number | null>(null);

 const csvOf = (m: typeof thisMonth) => {
  const rows = [["Order", "Date", "Status", "Amount (৳)"]].concat(
   m.list.map((o) => [
    o.order_number ?? `#${o.id}`,
    o.created_at ? new Date(o.created_at).toLocaleDateString("en-GB") : "",
    stOf(o),
    num(o.total_amount).toFixed(2),
   ])
  );
  rows.push(["", "", "Total", m.total.toFixed(2)]);
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
 };
 const downloadCsv = () => {
  const blob = new Blob([csvOf(stmtMonth)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `credit-statement-${stmtMonth.date.getFullYear()}-${String(stmtMonth.date.getMonth() + 1).padStart(2, "0")}.csv`;
  a.click();
  URL.revokeObjectURL(url);
 };
 const printStatement = () => {
  const esc = (v: any) => String(v ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));
  const title = `${stmtMonth.date.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}`;
  const rows = stmtMonth.list
   .map(
    (o) =>
     `<tr><td>${esc(o.order_number ?? "#" + o.id)}</td><td>${esc(o.created_at ? new Date(o.created_at).toLocaleDateString("en-GB") : "")}</td><td>${esc(stOf(o))}</td><td class="r">${esc(currency(num(o.total_amount)))}</td></tr>`
   )
   .join("");
  const w = window.open("", "_blank", "width=820,height=900");
  if (!w) {
   toast.error("Allow pop-ups to print the statement");
   return;
  }
  w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Credit statement ${esc(title)}</title>
<style>body{font-family:system-ui,sans-serif;color:#141520;margin:40px}h1{margin:0;font-size:22px}p{margin:4px 0;color:#5e6678}
table{width:100%;border-collapse:collapse;margin-top:24px;font-size:14px}th,td{padding:10px 8px;border-bottom:1px solid #e3e6ec;text-align:left}
th{font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:#5e6678}.r{text-align:right}tfoot td{font-weight:700;border-top:2px solid #141520}</style></head>
<body><h1>Company credit statement · ${esc(title)}</h1><p>${esc(profile?.name)} · ${esc(profile?.employee_code ?? "")} · ${esc(profile?.company_name ?? "")}</p>
<p>${stmtMonth.count} order(s) on company credit (cancelled orders excluded)</p>
<table><thead><tr><th>Order</th><th>Date</th><th>Status</th><th class="r">Amount</th></tr></thead><tbody>${rows || '<tr><td colspan="4">No orders this month</td></tr>'}</tbody>
<tfoot><tr><td colspan="3">Total</td><td class="r">${esc(currency(stmtMonth.total))}</td></tr></tfoot></table>
<script>window.onload=function(){window.print()}</script></body></html>`);
  w.document.close();
 };

 const birthday = profile?.birth_date
  ? new Date(profile.birth_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
  : null;
 const gender = profile?.gender === "male" ? "Male" : profile?.gender === "female" ? "Female" : profile?.gender === "other" ? "Other" : null;

 const copyCode = async () => {
  try {
   await navigator.clipboard.writeText(String(profile?.employee_code));
   toast.success("Employee ID copied");
  } catch {
   toast.error("Couldn't copy");
  }
 };

 const Fact = ({ icon, label, value, extra }: { icon: string; label: string; value?: any; extra?: React.ReactNode }) => (
  <div className="cp-fact">
   <span className="cp-fact-icon">
    <Ico d={icon} />
   </span>
   <div>
    <small>{label}</small>
    {value ? (
     <b>
      {value}
      {extra}
     </b>
    ) : (
     <b className="is-empty">Not added</b>
    )}
   </div>
  </div>
 );

 return (
  <Wrap>
   {/* identity */}
   <section className="cp-card cp-id" style={{ ["--d" as any]: 0 }}>
    <span className="cp-avatar">
     <UserAvatar name={profile?.name || profile?.email} image={profile?.image} size={78} />
    </span>
    <div className="cp-who">
     <h2>{profile?.name || "My account"}</h2>
     <div className="cp-tags">
      {profile?.company_name && (
       <span className="cp-tag">
        <Ico d={I.building} size={13} />
        {profile.company_name}
       </span>
      )}
      <span className="cp-tag">
       <Ico d={I.brief} size={13} />
       Corporate employee
      </span>
      {status && (
       <span className={`cp-tag ${active ? "cp-tag--ok" : "cp-tag--off"}`}>
        <i aria-hidden="true" />
        {active ? "Active" : status.charAt(0).toUpperCase() + status.slice(1)}
       </span>
      )}
     </div>
     <div className="cp-contacts">
      {profile?.email && (
       <a className="cp-contact" href={`mailto:${profile.email}`}>
        <Ico d={I.mail} size={14} />
        {profile.email}
       </a>
      )}
      {profile?.phone && (
       <a className="cp-contact" href={`tel:${profile.phone}`}>
        <Ico d={I.phone} size={14} />
        {profile.phone}
       </a>
      )}
     </div>
    </div>
    <div className="cp-actions">
     <Link className="cp-edit" href="/profile/edit">
      <Ico d={I.edit} size={15} />
      Edit profile
     </Link>
     <Link className="cp-edit" href="/profile/set-password">
      <Ico d={I.lock} size={15} />
      Change password
     </Link>
    </div>
   </section>

   {/* company credit */}
   <section className="cp-wallet" aria-label="Company credit">
    <div className="cp-w-top">
     <div>
      <small>Available to spend</small>
      <div className="cp-w-amount" aria-label={currency(available)}>
       {currency(shown)}
      </div>
     </div>
     {profile?.company_name && (
      <span className="cp-w-company">
       <Ico d={I.building} size={14} />
       {profile.company_name} credit
      </span>
     )}
    </div>
    {limit > 0 && (
     <div className="cp-bar" role="img" aria-label={`Due ${currency(due)}, pending ${currency(pending)}, available ${currency(available)} of ${currency(limit)}`}>
      <i className="b-due" style={{ width: `${pct(due)}%` }} />
      <i className="b-pend" style={{ width: `${pct(pending)}%` }} />
      <i className="b-avail" style={{ width: `${pct(available)}%` }} />
     </div>
    )}
    <div className="cp-legend">
     {limit > 0 && (
      <span>
       Limit <b>{currency(limit)}</b>
      </span>
     )}
     <span>
      <i style={{ background: "#ff7a7a" }} />
      Due <b>{currency(due)}</b>
     </span>
     <span>
      <i style={{ background: "#f5b84a" }} />
      Pending <b>{currency(pending)}</b>
     </span>
     <span>
      <i style={{ background: "#4fd18b" }} />
      Available <b>{currency(available)}</b>
     </span>
    </div>
    <div className="cp-w-foot">
     {cycle?.renews_on && (
      <span className="cp-renew">
       <Ico d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5" size={13} />
       Renews {new Date(cycle.renews_on).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
       {typeof cycle.days_remaining === "number" && ` · ${cycle.days_remaining} day${cycle.days_remaining === 1 ? "" : "s"} left`}
      </span>
     )}
     {cycle?.overdue && (
      <span className="cp-low">
       <Ico d={I.alert} size={13} />
       Company invoice overdue
      </span>
     )}
     {low && (
      <span className="cp-low">
       <Ico d={I.alert} size={13} />
       Credit running low
      </span>
     )}
     <Link className="cp-w-link" href="/credit-history">
      View credit history
      <Ico d={I.arrow} size={14} />
     </Link>
    </div>
   </section>

   {/* ready to collect */}
   {ready.count > 0 && (
    <Link className="cp-ready" href={ready.count === 1 && ready.firstId ? `/orders/${ready.firstId}` : "/orders"}>
     <span className="cp-ready-icon">
      <Ico d={I.box} size={20} />
     </span>
     <span>
      <strong>
       {ready.count} order{ready.count > 1 ? "s" : ""} ready to collect
      </strong>
      <small>Packed and waiting at the shop. Show this code at the counter.</small>
      {readyOrders.some((o) => o.pickup_code) && (
       <span className="cp-codes">
        {readyOrders
         .filter((o) => o.pickup_code)
         .slice(0, 3)
         .map((o) => (
          <b key={o.id} className="cp-code" title={o.order_number}>
           {o.pickup_code}
          </b>
         ))}
       </span>
      )}
     </span>
     <Ico d={I.arrow} size={18} />
    </Link>
   )}

   {/* details */}
   <section className="cp-card" style={{ ["--d" as any]: 2 }}>
    <h3 className="cp-h">Work details</h3>
    <div className="cp-grid">
     <Fact icon={I.building} label="Company" value={profile?.company_name} />
     <Fact
      icon={I.badge}
      label="Employee ID"
      value={profile?.employee_code}
      extra={
       profile?.employee_code ? (
        <button type="button" className="cp-copy" aria-label="Copy employee ID" onClick={copyCode}>
         <Ico d={I.copy} size={12} />
        </button>
       ) : null
      }
     />
     <Fact icon={I.brief} label="Designation" value={profile?.designation} />
    </div>
    <h3 className="cp-h">Personal</h3>
    <div className="cp-grid">
     <Fact icon={I.cake} label="Birthday" value={birthday} />
     <Fact icon={I.user} label="Gender" value={gender} />
    </div>
   </section>

   {/* spending + statement */}
   {slug && (
    <section className="cp-card" style={{ ["--d" as any]: 3 }} aria-label="Credit spending">
     <div className="cp-sp-head">
      <h3 className="cp-h" style={{ margin: 0 }}>
       Spending on company credit
      </h3>
      <span className="cp-sp-now">
       This month <b>{currency(thisMonth.total)}</b> · {thisMonth.count} order{thisMonth.count === 1 ? "" : "s"}
      </span>
     </div>
     {orders === null ? (
      <div className="cp-sp-skel" />
     ) : (
      <div className="cp-chart" role="list" onMouseLeave={() => setHoverBar(null)}>
       {months.map((m, i) => {
        const h = maxTotal > 0 ? Math.max(m.total > 0 ? 4 : 0, (m.total / maxTotal) * 100) : 0;
        const showLabel = m.total > 0 && (m.total === maxTotal || i === months.length - 1);
        return (
         <div
          key={m.key}
          className={`cp-col${i === months.length - 1 ? " is-now" : ""}${hoverBar === i ? " is-hover" : ""}`}
          role="listitem"
          tabIndex={0}
          aria-label={`${m.date.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}: ${currency(m.total)}, ${m.count} orders`}
          onMouseEnter={() => setHoverBar(i)}
          onFocus={() => setHoverBar(i)}
          onBlur={() => setHoverBar(null)}
          onClick={() => setStmtKey(m.key)}
         >
          <div className="cp-col-plot">
           {hoverBar === i && (
            <span className="cp-tip">
             <b>{currency(m.total)}</b>
             {m.count} order{m.count === 1 ? "" : "s"}
            </span>
           )}
           {showLabel && hoverBar !== i && <span className="cp-val">{currency(m.total, 0)}</span>}
           <i style={{ height: `${h}%`, ["--n" as any]: i }} />
          </div>
          <span className="cp-col-label">{m.label}</span>
         </div>
        );
       })}
      </div>
     )}

     <div className="cp-stmt">
      <label className="cp-stmt-pick">
       <span>Statement</span>
       <select value={stmtMonth.key} onChange={(e) => setStmtKey(e.target.value)}>
        {[...months].reverse().map((m) => (
         <option key={m.key} value={m.key}>
          {m.date.toLocaleDateString("en-GB", { month: "long", year: "numeric" })} · {currency(m.total, 0)}
         </option>
        ))}
       </select>
      </label>
      <button type="button" className="cp-stmt-btn" onClick={downloadCsv} disabled={orders === null}>
       <Ico d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" size={15} />
       CSV
      </button>
      <button type="button" className="cp-stmt-btn cp-stmt-btn--solid" onClick={printStatement} disabled={orders === null}>
       <Ico d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z" size={15} />
       Print / PDF
      </button>
     </div>
    </section>
   )}

   {/* corporate shop */}
   {profile?.shop_slug && (
    <Link className="cp-shop" href={`/shops/${profile.shop_slug}`}>
     <span className="cp-shop-logo">{(profile?.company_name || "S").trim().charAt(0).toUpperCase()}</span>
     <span>
      <strong>Shop at {profile?.company_name || "your company shop"}</strong>
      <small>Buy on company credit · collect at the shop</small>
     </span>
     <span className="cp-shop-go">
      Visit shop
      <Ico d={I.arrow} size={15} />
     </span>
    </Link>
   )}

  </Wrap>
 );
};

export default CorporateCard;
