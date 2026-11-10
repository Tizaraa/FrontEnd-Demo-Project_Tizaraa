import styled, { keyframes } from "styled-components";

const atcPop = keyframes`
 0% { transform: scale(0.6); opacity: 0; }
 70% { transform: scale(1.1); opacity: 1; }
 100% { transform: none; }
`;
const atcShine = keyframes`
 from { transform: translateX(-120%) skewX(-20deg); }
 to { transform: translateX(260%) skewX(-20deg); }
`;

export const Styledbutton = styled.div`
 /* main CTA: gradient, icon, lift on hover, press-in on click, one shine */
 .add-to-cart-btn {
  position: relative;
  overflow: hidden;
  gap: 10px;
  min-width: 240px;
  height: 52px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(135deg, ${({ theme }) => theme.tz.color.ember}, ${({ theme }) => theme.tz.color.emberDeep});
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.01em;
  box-shadow: 0 10px 22px rgba(194, 64, 15, 0.3);
  transition: transform 160ms ease, box-shadow 200ms ease, filter 160ms ease;
 }
 .add-to-cart-btn::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 30%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
  pointer-events: none;
  animation: ${atcShine} 1.2s ease-out 700ms 1 both;
 }
 .add-to-cart-btn:hover:enabled {
  transform: translateY(-2px);
  filter: brightness(1.04);
  box-shadow: 0 14px 28px rgba(194, 64, 15, 0.36);
 }
 .add-to-cart-btn:active:enabled {
  transform: translateY(0) scale(0.98);
  box-shadow: 0 6px 14px rgba(194, 64, 15, 0.3);
 }
 .add-to-cart-btn:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
 .atc-icon {
  flex-shrink: 0;
 }

 /* Stock Out / loading — show the "not allowed" cursor on hover */
 .add-to-cart-btn:disabled {
  cursor: not-allowed;
  background: ${({ theme }) => theme.tz.color.lineSoft};
  color: ${({ theme }) => theme.tz.color.slate};
  box-shadow: none;
 }
 .add-to-cart-btn:disabled::after {
  display: none;
 }

 /* "In your cart" tag + one-piece quantity stepper */
 .in-cart {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.tone.success.bg};
  color: ${({ theme }) => theme.tz.tone.success.fg};
  font-size: 13px;
  font-weight: 700;
  animation: ${atcPop} 320ms cubic-bezier(0.22, 1, 0.36, 1) both;
 }
 .qty-group {
  display: inline-flex;
  align-items: center;
  padding: 4px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 14px;
  background: ${({ theme }) => theme.tz.color.paper};
 }

 .qty-btn {
  width: 44px;
  height: 44px;
  padding: 0;
  border: 0;
  border-radius: 10px;
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
  transition: background-color 150ms ease, transform 120ms ease;
 }
 .qty-btn:hover:enabled {
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
 }
 .qty-btn:active:enabled {
  transform: scale(0.92);
 }
 .qty-btn:disabled {
  background: ${({ theme }) => theme.tz.color.mist};
  color: ${({ theme }) => theme.tz.color.slate};
  opacity: 0.6;
 }

 /* Quantity box: brand field look, numbers line up */
 .no-spin-button {
  width: 64px;
  height: 44px;
  padding: 0 8px;
  text-align: center;
  font-family: inherit;
  font-size: 17px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.tz.color.ink};
  background: transparent;
  border: 0;
  border-radius: 10px;
 }

 /* Hide spin buttons in WebKit browsers (Chrome, Safari, Edge) */
 .no-spin-button::-webkit-outer-spin-button,
 .no-spin-button::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
 }

 /* Hide spin buttons in Firefox */
 .no-spin-button[type="number"] {
  -moz-appearance: textfield;
 }

 .no-spin-button:focus {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 .qty-limit {
  font-size: 12px;
  color: ${({ theme }) => theme.tz.color.slate};
 }

 @media (max-width: 560px) {
  .add-to-cart-btn {
   width: 100%;
  }
 }

 @media (prefers-reduced-motion: reduce) {
  .add-to-cart-btn,
  .qty-btn {
   transition: none;
  }
  .add-to-cart-btn::after,
  .in-cart {
   animation: none;
  }
 }
`;
