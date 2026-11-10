"use client";

import styled, { keyframes } from "styled-components";

// Slim row of service promises under the hero. Same texts the footer already
// shows (no new claims).

const rise = keyframes`
 from { opacity: 0; transform: translateY(8px); }
 to { opacity: 1; transform: none; }
`;

const Strip = styled.ul`
 display: grid;
 grid-template-columns: repeat(4, minmax(0, 1fr));
 gap: 12px;
 margin: 18px 0 6px;
 padding: 0;
 list-style: none;

 li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 16px;
  background: ${({ theme }) => theme.tz.color.paper};
  animation: ${rise} 420ms cubic-bezier(0.22, 1, 0.36, 1) backwards;
  animation-delay: calc(var(--i, 0) * 70ms + 200ms);
  transition: border-color 180ms ease, box-shadow 200ms ease, transform 200ms ease;
 }
 li:hover {
  border-color: #f6b9a3;
  box-shadow: 0 10px 22px rgba(240, 80, 35, 0.1);
  transform: translateY(-2px);
 }
 .ts-icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 12px;
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 li:hover .ts-icon {
  transform: translateY(-2px) rotate(-6deg);
 }
 strong {
  display: block;
  font-size: 14px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 small {
  font-size: 12.5px;
  color: ${({ theme }) => theme.tz.color.slate};
 }

 @media (max-width: 900px) {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 14px;
 }
 @media (max-width: 480px) {
  gap: 8px;
  li {
   padding: 10px;
   gap: 8px;
  }
  .ts-icon {
   width: 34px;
   height: 34px;
  }
  strong {
   font-size: 12.5px;
  }
  small {
   display: none;
  }
 }
 @media (prefers-reduced-motion: reduce) {
  li {
   animation: none;
   transition: none;
  }
  li:hover {
   transform: none;
  }
  .ts-icon {
   transition: none;
  }
 }
`;

const ITEMS = [
 { icon: "M3 6h11v9H3zM14 9h4l3 3v3h-7M7 18.5a1.8 1.8 0 100-3.6 1.8 1.8 0 000 3.6zM17 18.5a1.8 1.8 0 100-3.6 1.8 1.8 0 000 3.6z", title: "Fast delivery", text: "All across Bangladesh" },
 { icon: "M3 7h18v10H3zM12 15a3 3 0 100-6 3 3 0 000 6zM6 10v4M18 10v4", title: "Cash on delivery", text: "Pay when it arrives" },
 { icon: "M4 9h11a5 5 0 010 10H9M8 5L4 9l4 4", title: "Easy returns", text: "Request from your orders" },
 { icon: "M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 017 0v3", title: "Secure payment", text: "Verified by SSLCommerz" },
];

export default function TrustStrip() {
 return (
  <Strip aria-label="Why shop with us">
   {ITEMS.map((it, i) => (
    <li key={it.title} style={{ ["--i" as any]: i }}>
     <span className="ts-icon" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
       <path d={it.icon} />
      </svg>
     </span>
     <span>
      <strong>{it.title}</strong>
      <small>{it.text}</small>
     </span>
    </li>
   ))}
  </Strip>
 );
}
