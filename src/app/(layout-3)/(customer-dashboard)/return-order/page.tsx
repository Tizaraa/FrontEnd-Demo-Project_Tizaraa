"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import styled, { keyframes } from "styled-components";
import toast from "react-hot-toast";
import ApiBaseUrl from "api/ApiBaseUrl";
import axios from "@lib/axiosClient";
import { currency } from "@utils/utils";
import { notifyDashboardCountsChanged } from "utils/dashboardCounts";

// Return request: item card, reason category + return type as option cards,
// written reason with quick chips, photo drop zone, policy, sticky submit bar.
// API payload and validation rules are unchanged.

const REASON_CATEGORIES = [
 {
  value: "buyer_remorse",
  label: "Changed my mind / No longer needed",
  hint: "Return within 7 days of delivery",
  icon: "M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5",
  chips: ["Size doesn't fit", "Ordered by mistake", "Found a better price", "No longer needed"],
 },
 {
  value: "seller_fault",
  label: "Damaged / Defective / Wrong item",
  hint: "Report within 48 hours · photo required",
  icon: "M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01",
  chips: ["Arrived damaged", "Not working", "Wrong item received", "Not as described", "Missing parts"],
 },
];

const RETURN_TYPES = [
 { value: "refund", label: "Refund", hint: "Money back once the return is approved", icon: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
 // Only refunds are offered for now (replacement / store credit hidden)
];

const POLICY = [
 { key: "buyer_remorse", text: <>Buyer remorse returns are accepted within <strong>7 days</strong> of delivery.</> },
 { key: "seller_fault", text: <>Damaged or defective item returns must be reported within <strong>48 hours</strong> of delivery and require photo evidence.</> },
 { key: "refund", text: <>Refunds are processed within 24 hours after the return is approved.</> },
 { key: "all", text: <>Products in non-returnable categories are not eligible for returns.</> },
];

const MAX_LENGTH = 1000;
const MIN_LENGTH = 10;
const MAX_IMAGES = 5;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const rise = keyframes`
 from { opacity: 0; transform: translateY(10px); }
 to { opacity: 1; transform: none; }
`;
const pop = keyframes`
 0% { opacity: 0; transform: scale(0.5); }
 70% { opacity: 1; transform: scale(1.12); }
 100% { opacity: 1; transform: none; }
`;
const spin = keyframes`
 to { transform: rotate(360deg); }
`;

const Page = styled.div`
 display: flex;
 flex-direction: column;
 gap: 18px;

 .rp-card {
  padding: 22px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 18px;
  background: ${({ theme }) => theme.tz.color.paper};
  animation: ${rise} 460ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--d, 0) * 80ms);
 }

 /* head */
 .rp-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
 }
 .rp-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 22px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .rp-title-icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: linear-gradient(135deg, ${({ theme }) => theme.tz.color.ember}, ${({ theme }) => theme.tz.color.emberDeep});
  color: #fff;
  box-shadow: 0 6px 16px rgba(194, 64, 15, 0.28);
 }
 .rp-steps {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
 }
 .rp-steps li {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .rp-steps li + li::before {
  content: "";
  width: 22px;
  height: 2px;
  margin-right: 2px;
  border-radius: 2px;
  background: ${({ theme }) => theme.tz.color.line};
 }
 .rp-steps b {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.lineSoft};
  font-size: 12px;
 }
 .rp-steps li.is-done {
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .rp-steps li.is-done b {
  background: ${({ theme }) => theme.tz.color.ember};
  color: #fff;
  animation: ${pop} 320ms cubic-bezier(0.22, 1, 0.36, 1) both;
 }
 .rp-steps li.is-done + li::before,
 .rp-steps li.is-done::before {
  background: ${({ theme }) => theme.tz.color.ember};
 }

 /* item */
 .rp-item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  margin-top: 18px;
  padding: 14px;
  border: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
  border-radius: 16px;
  background: ${({ theme }) => theme.tz.color.mist};
 }
 .rp-thumb {
  width: 84px;
  height: 84px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 14px;
  background: ${({ theme }) => theme.tz.color.lineSoft};
 }
 .rp-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
 }
 .rp-item-info {
  flex: 1 1 200px;
  min-width: 0;
 }
 .rp-item-name {
  margin: 0;
  font-size: 15.5px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .rp-item-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 14px;
  margin-top: 6px;
  font-size: 13px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .rp-value {
  text-align: right;
 }
 .rp-value small {
  display: block;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .rp-value strong {
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 20px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .rp-value span {
  display: block;
  max-width: 200px;
  margin-top: 2px;
  font-size: 11.5px;
  color: ${({ theme }) => theme.tz.color.slate};
 }

 /* sections */
 .rp-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 12px;
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .rp-label em {
  font-style: normal;
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .rp-label .rp-badge {
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
  background: ${({ theme }) => theme.tz.tone.danger.bg};
  color: ${({ theme }) => theme.tz.tone.danger.fg};
  animation: ${pop} 300ms cubic-bezier(0.22, 1, 0.36, 1) both;
 }
 .rp-label .rp-badge--ok {
  background: ${({ theme }) => theme.tz.tone.success.bg};
  color: ${({ theme }) => theme.tz.tone.success.fg};
 }
 .rp-section + .rp-section {
  margin-top: 24px;
  padding-top: 22px;
  border-top: 1px dashed ${({ theme }) => theme.tz.color.line};
 }

 /* option cards */
 .rp-options {
  display: grid;
  gap: 12px;
 }
 .rp-options--2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
 }
 .rp-options--3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
 }
 .rp-opt {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 14px;
  background: ${({ theme }) => theme.tz.color.paper};
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: border-color 160ms ease, background-color 160ms ease, transform 200ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 200ms ease;
 }
 .rp-opt:hover {
  border-color: #f6b9a3;
  transform: translateY(-2px);
 }
 .rp-opt[aria-checked="true"] {
  border-color: ${({ theme }) => theme.tz.color.ember};
  background: ${({ theme }) => theme.tz.color.emberTint};
  box-shadow: 0 8px 20px rgba(240, 80, 35, 0.12);
 }
 .rp-opt:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
 .rp-opt-icon {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 11px;
  background: ${({ theme }) => theme.tz.color.mist};
  color: ${({ theme }) => theme.tz.color.inkSoft};
  transition: background-color 160ms ease, color 160ms ease;
 }
 .rp-opt[aria-checked="true"] .rp-opt-icon {
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
 }
 .rp-opt-text {
  min-width: 0;
  padding-right: 18px;
 }
 .rp-opt-text strong {
  display: block;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.35;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .rp-opt-text span {
  display: block;
  margin-top: 3px;
  font-size: 12.5px;
  line-height: 1.4;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .rp-opt-check {
  position: absolute;
  top: 10px;
  right: 10px;
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
  animation: ${pop} 300ms cubic-bezier(0.22, 1, 0.36, 1) both;
 }

 /* dropdowns */
 .rp-selects {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 16px;
 }
 .rp-select {
  position: relative;
  display: flex;
  align-items: center;
 }
 .rp-select-icon {
  position: absolute;
  left: 10px;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
  pointer-events: none;
 }
 .rp-select-caret {
  position: absolute;
  right: 14px;
  color: ${({ theme }) => theme.tz.color.slate};
  pointer-events: none;
  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1), color 160ms ease;
 }
 .rp-select select {
  width: 100%;
  min-height: 52px;
  padding: 0 44px 0 52px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 14px;
  background: ${({ theme }) => theme.tz.color.paper};
  color: ${({ theme }) => theme.tz.color.ink};
  font-family: inherit;
  font-size: 14.5px;
  font-weight: 600;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  transition: border-color 160ms ease, box-shadow 160ms ease;
 }
 .rp-select select:hover {
  border-color: #f6b9a3;
 }
 .rp-select select:focus {
  outline: none;
  border-color: ${({ theme }) => theme.tz.color.ember};
  box-shadow: 0 0 0 4px rgba(240, 80, 35, 0.12);
 }
 .rp-select:focus-within .rp-select-caret {
  transform: rotate(180deg);
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .rp-select select:disabled {
  cursor: default;
  background: ${({ theme }) => theme.tz.color.mist};
 }
 .rp-select-hint {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 8px 2px 0;
  font-size: 12.5px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .rp-select-hint i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.ember};
 }

 /* reason */
 .rp-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
 }
 .rp-chip {
  padding: 6px 12px;
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
 .rp-chip:hover {
  border-color: ${({ theme }) => theme.tz.color.ember};
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .rp-chip:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
 .rp-text {
  position: relative;
 }
 .rp-text textarea {
  display: block;
  width: 100%;
  min-height: 120px;
  padding: 12px 14px 30px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 14px;
  background: ${({ theme }) => theme.tz.color.paper};
  color: ${({ theme }) => theme.tz.color.ink};
  font-family: inherit;
  font-size: 14.5px;
  line-height: 1.55;
  resize: vertical;
  transition: border-color 160ms ease, box-shadow 160ms ease;
 }
 .rp-text textarea:focus {
  outline: none;
  border-color: ${({ theme }) => theme.tz.color.ember};
  box-shadow: 0 0 0 4px rgba(240, 80, 35, 0.12);
 }
 .rp-text-foot {
  position: absolute;
  right: 12px;
  bottom: 8px;
  left: 14px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: ${({ theme }) => theme.tz.color.slate};
  pointer-events: none;
 }
 .rp-text-foot .is-ok {
  color: ${({ theme }) => theme.tz.tone.success.fg};
  font-weight: 600;
 }

 /* photos */
 .rp-drop {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 22px 16px;
  border: 2px dashed ${({ theme }) => theme.tz.color.line};
  border-radius: 16px;
  background: ${({ theme }) => theme.tz.color.mist};
  color: ${({ theme }) => theme.tz.color.slate};
  font-family: inherit;
  font-size: 13px;
  text-align: center;
  cursor: pointer;
  transition: border-color 160ms ease, background-color 160ms ease;
 }
 .rp-drop strong {
  font-size: 14px;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .rp-drop-icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.paper};
  color: ${({ theme }) => theme.tz.color.emberDeep};
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 .rp-drop:hover,
 .rp-drop.is-drag {
  border-color: ${({ theme }) => theme.tz.color.ember};
  background: ${({ theme }) => theme.tz.color.emberTint};
 }
 .rp-drop:hover .rp-drop-icon,
 .rp-drop.is-drag .rp-drop-icon {
  transform: translateY(-3px);
 }
 .rp-drop:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
 .rp-drop[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
 }
 .rp-thumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
 }
 .rp-ph {
  position: relative;
  width: 84px;
  height: 84px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  animation: ${pop} 320ms cubic-bezier(0.22, 1, 0.36, 1) both;
 }
 .rp-ph img {
  width: 100%;
  height: 100%;
  object-fit: cover;
 }
 .rp-ph button {
  position: absolute;
  top: 4px;
  right: 4px;
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border: 0;
  border-radius: 50%;
  background: rgba(20, 21, 32, 0.72);
  color: #fff;
  cursor: pointer;
 }
 .rp-ph button:hover {
  background: ${({ theme }) => theme.tz.tone.danger.fill};
 }

 /* policy */
 .rp-policy {
  border: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
  border-radius: 14px;
  background: ${({ theme }) => theme.tz.color.mist};
 }
 .rp-policy-head {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 14px 16px;
  border: 0;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
  text-align: left;
  cursor: pointer;
 }
 .rp-policy-head svg:last-child {
  margin-left: auto;
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 .rp-policy-head[aria-expanded="true"] svg:last-child {
  transform: rotate(180deg);
 }
 .rp-policy-head:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
  border-radius: 14px;
 }
 .rp-collapse {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 320ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 .rp-collapse.is-open {
  grid-template-rows: 1fr;
 }
 .rp-collapse > div {
  min-height: 0;
  overflow: hidden;
 }
 .rp-policy ol {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0;
  padding: 0 16px 14px;
  list-style: none;
  counter-reset: rule;
 }
 .rp-policy li {
  position: relative;
  padding: 8px 10px 8px 38px;
  border-radius: 10px;
  font-size: 13.5px;
  line-height: 1.5;
  color: ${({ theme }) => theme.tz.color.inkSoft};
  counter-increment: rule;
  transition: background-color 200ms ease;
 }
 .rp-policy li::before {
  content: counter(rule);
  position: absolute;
  top: 8px;
  left: 10px;
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.paper};
  font-size: 11px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .rp-policy li.is-hot {
  background: ${({ theme }) => theme.tz.color.paper};
  color: ${({ theme }) => theme.tz.color.ink};
  box-shadow: inset 3px 0 0 ${({ theme }) => theme.tz.color.ember};
 }
 .rp-policy li.is-hot::before {
  background: ${({ theme }) => theme.tz.color.ember};
  color: #fff;
 }

 .rp-agree {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 14px;
  font-size: 13.5px;
  color: ${({ theme }) => theme.tz.color.inkSoft};
  cursor: pointer;
 }
 .rp-agree input {
  width: 18px;
  height: 18px;
  margin: 1px 0 0;
  accent-color: ${({ theme }) => theme.tz.color.emberDeep};
  cursor: pointer;
 }
 .rp-agree a {
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }

 /* submit bar */
 .rp-bar {
  position: sticky;
  bottom: 16px;
  z-index: 5;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px 14px 20px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(14, 52, 96, 0.1);
  animation: ${rise} 460ms cubic-bezier(0.22, 1, 0.36, 1) 300ms both;
 }
 .rp-todo {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 14px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 13px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .rp-todo li {
  display: inline-flex;
  align-items: center;
  gap: 6px;
 }
 .rp-todo li i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.tone.warning.fill};
 }
 .rp-ready {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.tone.success.fg};
 }
 .rp-actions {
  display: flex;
  gap: 10px;
 }
 .rp-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 46px;
  padding: 0 22px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 12px;
  background: ${({ theme }) => theme.tz.color.paper};
  color: ${({ theme }) => theme.tz.color.ink};
  font-family: inherit;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 160ms ease, border-color 160ms ease, transform 160ms ease, box-shadow 160ms ease;
 }
 .rp-btn:hover:enabled {
  border-color: ${({ theme }) => theme.tz.color.slate};
 }
 .rp-btn--solid {
  border-color: ${({ theme }) => theme.tz.color.emberDeep};
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
  box-shadow: 0 6px 16px rgba(194, 64, 15, 0.28);
 }
 .rp-btn--solid:hover:enabled {
  border-color: ${({ theme }) => theme.tz.color.emberDark};
  background: ${({ theme }) => theme.tz.color.emberDark};
  transform: translateY(-1px);
 }
 .rp-btn:disabled {
  opacity: 0.5;
  box-shadow: none;
  cursor: not-allowed;
 }
 .rp-btn:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
 .rp-spin {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.45);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${spin} 700ms linear infinite;
 }

 .rp-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 40px 20px;
  text-align: center;
 }
 .rp-empty strong {
  font-size: 17px;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .rp-empty span {
  font-size: 14px;
  color: ${({ theme }) => theme.tz.color.slate};
 }

 .rp-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
 }

 @media (max-width: 760px) {
  .rp-selects {
   grid-template-columns: minmax(0, 1fr);
  }
  .rp-options--2,
  .rp-options--3 {
   grid-template-columns: minmax(0, 1fr);
  }
  .rp-value {
   width: 100%;
   text-align: left;
  }
 }
 @media (max-width: 560px) {
  .rp-card {
   padding: 16px;
  }
  .rp-steps {
   display: none;
  }
  .rp-bar {
   bottom: 8px;
  }
  .rp-actions {
   width: 100%;
  }
  .rp-actions .rp-btn {
   flex: 1;
  }
 }

 @media (prefers-reduced-motion: reduce) {
  .rp-card,
  .rp-bar,
  .rp-opt-check,
  .rp-ph,
  .rp-label .rp-badge,
  .rp-steps li.is-done b {
   animation: none;
  }
  .rp-opt,
  .rp-drop-icon,
  .rp-collapse,
  .rp-policy-head svg:last-child,
  .rp-btn {
   transition: none;
  }
  .rp-opt:hover,
  .rp-btn--solid:hover:enabled {
   transform: none;
  }
 }
`;

const Ico = ({ d, size = 18 }: { d: string; size?: number }) => (
 <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  <path d={d} />
 </svg>
);
const CHECK = "M20 6 9 17l-5-5";

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
const ReturnPage = () => {
 const [returnItem, setReturnItem] = useState<any | null>(null);
 const [checked, setChecked] = useState(false); // sessionStorage read done
 const [returnReason, setReturnReason] = useState("");
 const [reasonCategory, setReasonCategory] = useState("buyer_remorse");
 const [returnType, setReturnType] = useState("refund");
 const [policyAccepted, setPolicyAccepted] = useState(false);
 const [policyOpen, setPolicyOpen] = useState(true);
 const [images, setImages] = useState<File[]>([]);
 const [previews, setPreviews] = useState<string[]>([]);
 const [dragging, setDragging] = useState(false);
 const [submitting, setSubmitting] = useState(false);
 const fileRef = useRef<HTMLInputElement>(null);
 const router = useRouter();
 const searchParams = useSearchParams();
 const orderId = Number(searchParams.get("orderId"));

 useEffect(() => {
  const storedItem = sessionStorage.getItem("returnItem");
  if (storedItem) {
   try {
    setReturnItem(JSON.parse(storedItem));
   } catch {
    setReturnItem(null);
   }
  }
  setChecked(true);
 }, []);

 // Object URLs for thumbnails, freed when the list changes / page unmounts
 useEffect(() => {
  const urls = images.map((f) => URL.createObjectURL(f));
  setPreviews(urls);
  return () => urls.forEach((u) => URL.revokeObjectURL(u));
 }, [images]);

 if (!returnItem) {
  return (
   <Page>
    {checked ? (
     <section className="rp-card rp-empty">
      <strong>We couldn't find the item to return</strong>
      <span>Open the order again and press Return on the item.</span>
      <Link href="/orders" className="rp-btn rp-btn--solid">
       Go to my orders
      </Link>
     </section>
    ) : (
     <section className="rp-card" aria-busy="true" style={{ minHeight: 200 }} />
    )}
   </Page>
  );
 }

 const addFiles = (files: FileList | null) => {
  if (!files) return;
  const picked = Array.from(files).filter((f) => IMAGE_TYPES.includes(f.type));
  if (picked.length < files.length) toast.error("Only JPG, PNG or WEBP images can be added.");
  const room = MAX_IMAGES - images.length;
  if (room <= 0) {
   toast.error(`You can add up to ${MAX_IMAGES} images.`);
   return;
  }
  if (picked.length > room) toast.error(`Only ${room} more image${room === 1 ? "" : "s"} can be added.`);
  setImages([...images, ...picked.slice(0, room)]);
 };

 const addChip = (text: string) => {
  setReturnReason((r) => {
   const base = r.trim();
   if (base.toLowerCase().includes(text.toLowerCase())) return r;
   return (base ? `${base}. ${text}` : text).slice(0, MAX_LENGTH);
  });
 };

 const handleSubmit = async () => {
  if (submitting) return; // one request per click
  setSubmitting(true);
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
   // Sidebar counts and the profile page cards fetched once on mount, so
   // without this they'd stay stale until the browser was reloaded.
   notifyDashboardCountsChanged();
   toast.success("Return request submitted successfully");
   router.back();
  } catch (error: any) {
   const msg = error?.response?.data?.message ?? "Failed to submit return request.";
   toast.error(msg);
   setSubmitting(false);
  }
 };

 const productImageSrc = /^https?:\/\//i.test(returnItem.product_image)
  ? returnItem.product_image
  : `${ApiBaseUrl.ImgUrl}${returnItem.product_image}`;

 const needsPhoto = reasonCategory === "seller_fault";
 const reasonLen = returnReason.trim().length;
 const reasonOk = reasonLen >= MIN_LENGTH;
 const photosOk = !needsPhoto || images.length > 0;
 const canSubmit = policyAccepted && reasonOk && photosOk;

 const todo = [
  !reasonOk && "Write a reason",
  !photosOk && "Add a photo",
  !policyAccepted && "Accept the policy",
 ].filter(Boolean) as string[];

 const category = REASON_CATEGORIES.find((c) => c.value === reasonCategory) ?? REASON_CATEGORIES[0];
 const itemValue = Number(returnItem.price ?? 0) * Number(returnItem.quantity ?? 1);
 const hotRule = (key: string) => key === reasonCategory || (key === "refund" && returnType === "refund");

 return (
  <Page>
   {/* ---- Head + item ---- */}
   <section className="rp-card" style={{ ["--d" as any]: 0 }}>
    <div className="rp-head">
     <h1 className="rp-title">
      <span className="rp-title-icon" aria-hidden="true">
       <Ico d="M9 14 4 9l5-5M4 9h11a5 5 0 0 1 0 10h-3" size={20} />
      </span>
      Return request
     </h1>
     <ol className="rp-steps" aria-label="Progress">
      <li className="is-done">
       <b>{<Ico d={CHECK} size={13} />}</b>Reason
      </li>
      <li className={reasonOk && photosOk ? "is-done" : undefined}>
       <b>{reasonOk && photosOk ? <Ico d={CHECK} size={13} /> : 2}</b>Details
      </li>
      <li className={canSubmit ? "is-done" : undefined}>
       <b>{canSubmit ? <Ico d={CHECK} size={13} /> : 3}</b>Confirm
      </li>
     </ol>
    </div>

    <div className="rp-item">
     <span className="rp-thumb">
      {returnItem.product_image ? <img src={productImageSrc} alt="" /> : null}
     </span>
     <div className="rp-item-info">
      <p className="rp-item-name">{returnItem.product_name}</p>
      <div className="rp-item-meta">
       <span>Qty: {returnItem.quantity}</span>
       {returnItem.price != null && <span>{currency(returnItem.price)} each</span>}
       {(orderId || returnItem.order_id) && <span>Order #{orderId || returnItem.order_id}</span>}
       {(returnItem.color || returnItem.size) && (
        <span>{[returnItem.color, returnItem.size].filter(Boolean).join(" · ")}</span>
       )}
      </div>
     </div>
     {returnItem.price != null && (
      <div className="rp-value">
       <small>Item value</small>
       <strong>{currency(itemValue)}</strong>
       <span>Final amount is confirmed after the seller checks the item.</span>
      </div>
     )}
    </div>
   </section>

   {/* ---- Form ---- */}
   <section className="rp-card" style={{ ["--d" as any]: 1 }}>
    <div className="rp-section">
     <div className="rp-selects">
      <div>
       <label className="rp-label" htmlFor="rp-cat">
        Why are you returning it? <em>*</em>
       </label>
       <div className="rp-select">
        <span className="rp-select-icon" aria-hidden="true">
         <Ico d={category.icon} size={16} />
        </span>
        <select id="rp-cat" value={reasonCategory} onChange={(e) => setReasonCategory(e.target.value)}>
         {REASON_CATEGORIES.map((c) => (
          <option key={c.value} value={c.value}>
           {c.label}
          </option>
         ))}
        </select>
        <span className="rp-select-caret" aria-hidden="true">
         <Ico d="m6 9 6 6 6-6" size={16} />
        </span>
       </div>
       <p className="rp-select-hint">
        <i aria-hidden="true" />
        {category.hint}
       </p>
      </div>

      <div>
       <label className="rp-label" htmlFor="rp-type">
        What would you like? <em>*</em>
       </label>
       <div className="rp-select">
        <span className="rp-select-icon" aria-hidden="true">
         <Ico d={(RETURN_TYPES.find((t) => t.value === returnType) ?? RETURN_TYPES[0]).icon} size={16} />
        </span>
        <select id="rp-type" value={returnType} onChange={(e) => setReturnType(e.target.value)}>
         {RETURN_TYPES.map((t) => (
          <option key={t.value} value={t.value}>
           {t.label}
          </option>
         ))}
        </select>
        <span className="rp-select-caret" aria-hidden="true">
         <Ico d="m6 9 6 6 6-6" size={16} />
        </span>
       </div>
       <p className="rp-select-hint">
        <i aria-hidden="true" />
        {(RETURN_TYPES.find((t) => t.value === returnType) ?? RETURN_TYPES[0]).hint}
       </p>
      </div>
     </div>
    </div>

    <div className="rp-section">
     <label className="rp-label" htmlFor="rp-reason">
      Tell us what happened <em>*</em>
      {reasonOk && <span className="rp-badge rp-badge--ok">Looks good</span>}
     </label>
     <div className="rp-chips" aria-label="Quick reasons">
      {category.chips.map((chip) => (
       <button key={chip} type="button" className="rp-chip" onClick={() => addChip(chip)}>
        + {chip}
       </button>
      ))}
     </div>
     <div className="rp-text">
      <textarea
       id="rp-reason"
       value={returnReason}
       onChange={(e) => setReturnReason(e.target.value)}
       maxLength={MAX_LENGTH}
       placeholder="Describe the problem (at least 10 characters)"
       aria-describedby="rp-reason-foot"
      />
      <div className="rp-text-foot" id="rp-reason-foot">
       <span className={reasonOk ? "is-ok" : undefined}>
        {reasonOk ? "✓ Enough detail" : `${MIN_LENGTH - reasonLen} more character${MIN_LENGTH - reasonLen === 1 ? "" : "s"} needed`}
       </span>
       <span>
        {returnReason.length}/{MAX_LENGTH}
       </span>
      </div>
     </div>
    </div>

    <div className="rp-section">
     <p className="rp-label">
      Photos
      <span style={{ fontWeight: 500, color: "var(--tz-slate)", fontSize: 13 }}>
       {images.length}/{MAX_IMAGES}
      </span>
      {needsPhoto && <span className={`rp-badge${images.length ? " rp-badge--ok" : ""}`}>{images.length ? "Added" : "Required"}</span>}
     </p>
     <button
      type="button"
      className={`rp-drop${dragging ? " is-drag" : ""}`}
      disabled={images.length >= MAX_IMAGES}
      onClick={() => fileRef.current?.click()}
      onDragOver={(e) => {
       e.preventDefault();
       setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
       e.preventDefault();
       setDragging(false);
       addFiles(e.dataTransfer.files);
      }}
     >
      <span className="rp-drop-icon">
       <Ico d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" size={20} />
      </span>
      <strong>{images.length >= MAX_IMAGES ? "Maximum photos added" : "Click or drag photos here"}</strong>
      <span>
       Up to {MAX_IMAGES} images · JPG, PNG, WEBP{needsPhoto ? " · show the damage or the wrong item clearly" : ""}
      </span>
     </button>
     <input
      ref={fileRef}
      type="file"
      accept={IMAGE_TYPES.join(",")}
      multiple
      className="rp-sr"
      tabIndex={-1}
      onChange={(e) => {
       addFiles(e.target.files);
       e.target.value = "";
      }}
     />
     {previews.length > 0 && (
      <div className="rp-thumbs">
       {previews.map((src, i) => (
        <div key={src} className="rp-ph">
         <img src={src} alt={`Photo ${i + 1}`} />
         <button type="button" aria-label={`Remove photo ${i + 1}`} onClick={() => setImages(images.filter((_, j) => j !== i))}>
          <Ico d="M18 6 6 18M6 6l12 12" size={12} />
         </button>
        </div>
       ))}
      </div>
     )}
    </div>

    <div className="rp-section">
     <div className="rp-policy">
      <button type="button" className="rp-policy-head" aria-expanded={policyOpen} onClick={() => setPolicyOpen((v) => !v)}>
       <Ico d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
       Return policy
       <Ico d="m6 9 6 6 6-6" size={16} />
      </button>
      <div className={`rp-collapse${policyOpen ? " is-open" : ""}`}>
       <div>
        <ol>
         {POLICY.map((r) => (
          <li key={r.key} className={hotRule(r.key) ? "is-hot" : undefined}>
           {r.text}
          </li>
         ))}
        </ol>
       </div>
      </div>
     </div>
     <label className="rp-agree">
      <input type="checkbox" checked={policyAccepted} onChange={(e) => setPolicyAccepted(e.target.checked)} required />
      <span>
       I have read and accepted the Return Policy of{" "}
       <a href="/terms_condition" target="_blank" rel="noreferrer noopener">
        Tizaraa
       </a>
      </span>
     </label>
    </div>
   </section>

   {/* ---- Submit ---- */}
   <div className="rp-bar">
    {todo.length ? (
     <ul className="rp-todo" aria-live="polite">
      {todo.map((t) => (
       <li key={t}>
        <i aria-hidden="true" />
        {t}
       </li>
      ))}
     </ul>
    ) : (
     <span className="rp-ready" aria-live="polite">
      <Ico d={CHECK} size={16} />
      Ready to submit
     </span>
    )}
    <div className="rp-actions">
     <button type="button" className="rp-btn" onClick={() => router.back()} disabled={submitting}>
      Cancel
     </button>
     <button type="button" className="rp-btn rp-btn--solid" disabled={!canSubmit || submitting} onClick={handleSubmit}>
      {submitting && <span className="rp-spin" aria-hidden="true" />}
      {submitting ? "Submitting..." : "Submit return"}
     </button>
    </div>
   </div>
  </Page>
 );
};

export default ReturnPage;
