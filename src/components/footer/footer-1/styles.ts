"use client";

import Link from "next/link";
import styled from "styled-components";

import { getTheme } from "@utils/utils";

// STYLED COMPONENTS
export const StyledLink = styled(Link)`
 position: relative;
 display: block;
 padding: 0.3rem 0rem;
 color: ${getTheme("colors.gray.500")};
 cursor: pointer;
 border-radius: 4px;
 &:hover {
  color: ${getTheme("colors.gray.100")};
 }
`;

// Site footer. Hover effects only (no looping animations), so it adds no
// ongoing CPU/GPU work.
export const StyledFooter = styled.footer`
 --f-ember: ${({ theme }) => theme.tz.color.ember};
 --f-ember-deep: ${({ theme }) => theme.tz.color.emberDeep};
 --f-line: rgba(255, 255, 255, 0.1);
 --f-text: rgba(255, 255, 255, 0.72);
 --f-ease: cubic-bezier(0.22, 1, 0.36, 1);

 position: relative;
 color: var(--f-text);
 font-size: 14px;
 background: radial-gradient(60% 120% at 100% 0%, rgba(240, 80, 35, 0.12) 0%, transparent 60%),
  linear-gradient(180deg, ${({ theme }) => theme.tz.color.navy} 0%, #0b2748 100%);

 a {
  color: inherit;
  text-decoration: none;
 }

 /* ---------- Trust strip ---------- */
 .footer-trust {
  border-bottom: 1px solid var(--f-line);
  background: rgba(255, 255, 255, 0.03);
 }
 .footer-trust-inner {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding-top: 20px;
  padding-bottom: 20px;
 }
 .trust-item {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
  padding: 6px 20px;

  strong {
   display: block;
   font-family: ${({ theme }) => theme.tz.font.display};
   font-size: 14.5px;
   font-weight: 700;
   line-height: 1.3;
   color: #fff;
  }
  small {
   display: block;
   margin-top: 2px;
   font-size: 12.5px;
   line-height: 1.4;
   color: rgba(255, 255, 255, 0.62);
  }
 }
 /* thin dividers between items */
 .trust-item + .trust-item {
  border-left: 1px solid var(--f-line);
 }
 .trust-item:first-child {
  padding-left: 0;
 }
 .trust-icon {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  color: ${({ theme }) => theme.tz.color.emberDeep};
  background: ${({ theme }) => theme.tz.color.emberTint};
  box-shadow: 0 0 0 4px rgba(253, 238, 231, 0.08);
  transition: transform 260ms var(--f-ease), box-shadow 260ms ease;
 }
 .trust-item:hover .trust-icon {
  transform: translateY(-3px) scale(1.06);
  box-shadow: 0 0 0 6px rgba(253, 238, 231, 0.12), 0 8px 16px rgba(0, 0, 0, 0.18);
 }

 /* ---------- Main grid ---------- */
 .footer-main {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) repeat(3, minmax(0, 1fr)) minmax(0, 1.25fr);
  gap: 32px;
  padding: 48px 0 36px;
 }

 .footer-logo img {
  display: block;
  max-width: 150px;
  margin-bottom: 16px;
 }
 .footer-about {
  max-width: 340px;
  margin: 0 0 18px;
  line-height: 1.65;
  color: inherit;
 }

 .footer-social {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  a {
   display: grid;
   place-items: center;
   width: 40px;
   height: 40px;
   border: 1px solid var(--f-line);
   border-radius: 50%;
   background: rgba(255, 255, 255, 0.06);
   transition: transform 220ms var(--f-ease), border-color 200ms, background-color 200ms;
  }
  a:hover {
   transform: translateY(-3px);
   border-color: var(--f-ember);
   background: rgba(240, 80, 35, 0.15);
  }
  a:focus-visible {
   outline: none;
   box-shadow: 0 0 0 2px var(--f-ember);
  }
  img {
   display: block;
   width: 20px;
   height: 20px;
  }
 }

 .footer-verified {
  max-width: 300px;
  padding: 12px 14px;
  border: 1px solid var(--f-line);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);

  dl {
   display: grid;
   gap: 6px;
   margin: 8px 0 0;
  }
  dl > div {
   display: flex;
   justify-content: space-between;
   gap: 12px;
   font-size: 12.5px;
  }
  dt {
   color: rgba(255, 255, 255, 0.55);
  }
  dd {
   margin: 0;
   font-weight: 600;
   color: #fff;
   font-variant-numeric: tabular-nums;
  }
 }
 .verified-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #6ee7a8;
 }

 /* Column headings (buttons so they work as mobile accordions) */
 .footer-heading {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0 0 16px;
  padding: 0 0 10px;
  border: 0;
  background: none;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 15px;
  font-weight: 700;
  line-height: 1.3;
  color: #fff;
  text-align: left;
  white-space: nowrap;
  cursor: default;
 }
 .footer-heading::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 28px;
  height: 2px;
  border-radius: 2px;
  background: var(--f-ember);
 }
 .footer-chevron {
  display: none;
  transition: transform 260ms var(--f-ease);
 }

 .footer-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  padding: 5px 0;
  color: inherit;
  transition: color 200ms, transform 220ms var(--f-ease);
 }
 .footer-link::after {
  content: "";
  position: absolute;
  left: 0;
  right: 18px;
  bottom: 3px;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 260ms var(--f-ease);
 }
 .footer-link-arrow {
  font-size: 12px;
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 200ms, transform 220ms var(--f-ease);
 }
 .footer-link:hover {
  color: #fff;
  transform: translateX(3px);
 }
 .footer-link:hover::after {
  transform: scaleX(1);
 }
 .footer-link:hover .footer-link-arrow {
  opacity: 1;
  transform: none;
 }
 .footer-link:focus-visible,
 .contact-card:focus-visible,
 .footer-bar a:focus-visible {
  outline: none;
  border-radius: 4px;
  box-shadow: 0 0 0 2px var(--f-ember);
 }

 /* Contact cards */
 .contact-card {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
  padding: 10px 12px;
  border: 1px solid var(--f-line);
  border-radius: 14px;
  font-weight: 600;
  color: #fff;
  background: rgba(255, 255, 255, 0.04);
  transition: border-color 200ms, background-color 200ms, transform 220ms var(--f-ease);

  small {
   display: block;
   font-size: 11.5px;
   font-weight: 500;
   color: rgba(255, 255, 255, 0.55);
  }
 }
 .contact-card:hover {
  border-color: var(--f-ember);
  background: rgba(240, 80, 35, 0.1);
  transform: translateY(-2px);
 }
 .contact-icon {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  color: var(--f-ember);
  background: rgba(240, 80, 35, 0.14);
 }

 /* ---------- Payment row ---------- */
 .footer-pay {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 24px 0 32px;
  border-top: 1px solid var(--f-line);
 }
 .footer-payment {
  display: flex;
  flex: 0 1 72%;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.18);

  img {
   display: block;
   min-width: 0;
   width: 100%;
   height: auto;
  }
 }
 .pay-label {
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .footer-otc {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
  font-weight: 700;
  line-height: 1.25;
  color: #fff;
  opacity: 0.85;
  transition: opacity 200ms;

  img {
   width: 52px;
  }
  small {
   display: block;
   font-size: 11px;
   font-weight: 500;
   color: rgba(255, 255, 255, 0.55);
  }
 }
 .footer-otc:hover {
  opacity: 1;
 }

 /* ---------- Copyright bar ---------- */
 .footer-bar {
  border-top: 1px solid var(--f-line);
  background: rgba(0, 0, 0, 0.18);
 }
 .footer-bar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 16px;
  padding-bottom: 16px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);

  nav {
   display: flex;
   gap: 18px;
  }
  nav a {
   transition: color 200ms;
  }
  nav a:hover {
   color: #fff;
  }
 }

 /* ---------- Responsive ---------- */
 @media only screen and (max-width: 1024px) {
  .footer-main {
   grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .footer-brand,
  .footer-contact {
   grid-column: span 3;
  }
  .footer-trust-inner {
   grid-template-columns: repeat(2, minmax(0, 1fr));
   row-gap: 14px;
  }
  .trust-item:nth-child(odd) {
   padding-left: 0;
   border-left: none;
  }
 }

 @media only screen and (max-width: 768px) {
  padding-bottom: 72px; /* room for the mobile bottom nav */

  .footer-main {
   grid-template-columns: 1fr;
   gap: 0;
   padding-top: 32px;
  }
  .footer-brand,
  .footer-contact {
   grid-column: auto;
  }
  .footer-brand {
   margin-bottom: 20px;
  }
  .footer-contact {
   margin-top: 20px;
  }

  /* Link groups become tap-to-open accordions */
  .footer-col {
   border-bottom: 1px solid var(--f-line);
  }
  .footer-col .footer-heading {
   margin: 0;
   padding: 16px 0;
   cursor: pointer;
  }
  .footer-col .footer-heading::after {
   display: none;
  }
  .footer-chevron {
   display: inline-flex;
  }
  .footer-col.is-open .footer-chevron {
   transform: rotate(180deg);
  }
  .footer-col-links {
   display: none;
   padding-bottom: 12px;
  }
  .footer-col.is-open .footer-col-links {
   display: block;
  }

  .footer-pay {
   flex-direction: column;
   align-items: stretch;
  }
  .footer-payment {
   flex-basis: auto;
   flex-direction: column;
   align-items: flex-start;
  }
  .footer-otc {
   margin-left: 0;
  }
  .footer-bar-inner {
   flex-direction: column;
   text-align: center;
  }
 }

 @media only screen and (max-width: 480px) {
  .footer-trust-inner {
   grid-template-columns: 1fr;
   row-gap: 0;
   padding-top: 8px;
   padding-bottom: 8px;
  }
  .trust-item {
   padding: 12px 0;
   border-left: none !important;
  }
  .trust-item + .trust-item {
   border-top: 1px solid var(--f-line);
  }
  .trust-icon {
   width: 40px;
   height: 40px;
  }
 }

 @media (prefers-reduced-motion: reduce) {
  *,
  *::after {
   transition: none !important;
  }
  .trust-item:hover .trust-icon {
   transform: none;
  }
 }
`;
