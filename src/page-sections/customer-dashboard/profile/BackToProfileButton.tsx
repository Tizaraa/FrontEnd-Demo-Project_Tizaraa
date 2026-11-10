"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";

// Brand-tinted pill: ember tint at rest, solid ember on hover, arrow nudges left
const BackButton = styled.button`
 display: inline-flex;
 align-items: center;
 gap: 8px;
 min-height: 42px;
 padding: 0 18px 0 14px;
 border: 1px solid ${({ theme }) => theme.tz.color.emberTint};
 border-radius: 999px;
 background: ${({ theme }) => theme.tz.color.emberTint};
 color: ${({ theme }) => theme.tz.color.emberDeep};
 font-family: inherit;
 font-size: 14px;
 font-weight: 700;
 cursor: pointer;
 transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease, box-shadow 180ms ease;

 svg {
  width: 16px;
  height: 16px;
  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
 }

 &:hover {
  background: ${({ theme }) => theme.tz.color.emberDeep};
  border-color: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
  box-shadow: 0 6px 16px rgba(194, 64, 15, 0.25);
 }
 &:hover svg {
  transform: translateX(-3px);
 }
 &:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 @media (prefers-reduced-motion: reduce) {
  transition: none;
  svg {
   transition: none;
  }
 }
`;

export default function BackToProfileButton() {
 const { push } = useRouter();

 return (
  <BackButton type="button" onClick={() => push("/profile")}>
   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 12H5M12 19l-7-7 7-7" />
   </svg>
   Back to profile
  </BackButton>
 );
}
