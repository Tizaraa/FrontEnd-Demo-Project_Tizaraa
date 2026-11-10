import styled, { keyframes } from "styled-components";

const mcIn = keyframes`
 from { opacity: 0; transform: translateX(16px); }
 to { opacity: 1; transform: none; }
`;
const mcPop = keyframes`
 0% { transform: scale(1); }
 40% { transform: scale(1.12); }
 100% { transform: scale(1); }
`;

// Cart drawer: header, select bar, item cards, fixed summary + actions
export const StyledMiniCart = styled.div`
 display: flex;
 height: 100vh;
 flex-direction: column;
 background: ${({ theme }) => theme.tz.color.mist};

 /* header */
 .mc-head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 16px 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.tz.color.line};
  background: ${({ theme }) => theme.tz.color.paper};
 }
 .mc-head-icon {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .mc-head h2 {
  margin: 0;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 18px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .mc-count {
  padding: 2px 9px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
  font-size: 12px;
  font-weight: 700;
 }
 .mc-close {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  margin-left: auto;
  border: 0;
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.mist};
  color: ${({ theme }) => theme.tz.color.inkSoft};
  cursor: pointer;
  transition: background-color 150ms ease, transform 200ms ease;
 }
 .mc-close:hover {
  background: ${({ theme }) => theme.tz.color.lineSoft};
  transform: rotate(90deg);
 }

 .cart-list {
  flex: 1 1 0;
  overflow: auto;
  padding: 12px;
 }

 /* select bar */
 .mc-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
  padding: 8px 10px 8px 12px;
  border-radius: 14px;
  background: ${({ theme }) => theme.tz.color.paper};
 }
 .mc-all {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
 }
 .mc-all span {
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .mc-all small {
  display: block;
  font-size: 11.5px;
  font-weight: 500;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .mc-remove {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 10px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: ${({ theme }) => theme.tz.tone.danger.fg};
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 150ms ease;
 }
 .mc-remove:hover:enabled {
  background: ${({ theme }) => theme.tz.tone.danger.bg};
 }
 .mc-remove:disabled {
  color: ${({ theme }) => theme.tz.color.slate};
  opacity: 0.6;
  cursor: not-allowed;
 }

 /* items */
 .mc-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
 }
 .cart-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px;
  border: 1.5px solid transparent;
  border-radius: 16px;
  background: ${({ theme }) => theme.tz.color.paper};
  box-shadow: 0 1px 2px rgba(20, 21, 32, 0.04);
  animation: ${mcIn} 360ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--i, 0) * 50ms);
  transition: border-color 160ms ease, background-color 160ms ease;
 }
 .cart-item.is-picked {
  border-color: #f9c4ae;
  background: #fffaf7;
 }
 .cart-item > :first-child {
  margin-top: 26px;
 }
 .mc-thumb {
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  overflow: hidden;
  border-radius: 12px;
  background: ${({ theme }) => theme.tz.color.mist};
 }
 .mc-thumb img {
  width: 72px;
  height: 72px;
  object-fit: cover;
  transition: transform 260ms ease;
 }
 .mc-thumb:hover img {
  transform: scale(1.06);
 }

 .product-details {
  flex: 1 1 0;
  min-width: 0;
 }
 .product-details .title {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.35;
  color: ${({ theme }) => theme.tz.color.ink};
  text-decoration: none;
 }
 .product-details .title:hover {
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .mc-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
 }
 .mc-chips span {
  padding: 1px 7px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.lineSoft};
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }
 .mc-unit {
  margin-top: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .mc-unit del {
  margin-right: 4px;
 }
 .mc-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 8px;
 }
 .mc-stepper {
  display: inline-flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 10px;
  background: ${({ theme }) => theme.tz.color.paper};
 }
 .mc-stepper button {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.tz.color.emberDeep};
  cursor: pointer;
  transition: background-color 140ms ease, transform 120ms ease;
 }
 .mc-stepper button:hover:enabled {
  background: ${({ theme }) => theme.tz.color.emberTint};
 }
 .mc-stepper button:active:enabled {
  transform: scale(0.9);
 }
 .mc-stepper button:disabled {
  color: ${({ theme }) => theme.tz.color.line};
  cursor: not-allowed;
 }
 .mc-line {
  font-size: 15px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.emberDeep};
  animation: ${mcPop} 260ms ease;
 }
 .mc-del {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: ${({ theme }) => theme.tz.color.slate};
  cursor: pointer;
  transition: background-color 150ms ease, color 150ms ease;
 }
 .mc-del:hover {
  background: ${({ theme }) => theme.tz.tone.danger.bg};
  color: ${({ theme }) => theme.tz.tone.danger.fg};
 }

 /* qty field */
 .no-spin-button::-webkit-outer-spin-button,
 .no-spin-button::-webkit-inner-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
 }
 .no-spin-button {
  -moz-appearance: textfield;
  width: 36px;
  height: 30px;
  padding: 0;
  border: 0 !important;
  background: transparent;
  text-align: center;
  font-family: inherit;
  font-size: 14px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.ink};
  box-shadow: none !important;
 }
 .no-spin-button:focus {
  outline: none;
 }

 /* empty */
 .mc-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 320px;
  padding: 20px;
  text-align: center;
  animation: ${mcIn} 360ms ease both;
 }
 .mc-empty-art {
  display: grid;
  place-items: center;
  width: 120px;
  height: 120px;
  margin-bottom: 14px;
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.emberTint};
 }
 .mc-empty strong {
  font-size: 17px;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .mc-empty p {
  margin: 4px 0 16px;
  font-size: 13.5px;
  color: ${({ theme }) => theme.tz.color.slate};
 }

 /* footer */
 .actions {
  padding: 14px 16px 12px;
  border-top: 1px solid ${({ theme }) => theme.tz.color.line};
  background: ${({ theme }) => theme.tz.color.paper};
  box-shadow: 0 -8px 20px rgba(14, 52, 96, 0.06);
 }
 .mc-sum {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 12px;
 }
 .mc-sum span {
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .mc-sum small {
  margin-left: 6px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .mc-sum strong {
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 21px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.ink};
  animation: ${mcPop} 260ms ease;
 }
 .mc-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 46px;
  padding: 0 20px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
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
 .mc-btn:hover:enabled,
 a.mc-btn:hover {
  border-color: ${({ theme }) => theme.tz.color.slate};
 }
 .mc-btn--block {
  width: 100%;
 }
 .mc-btn--block + .mc-btn--block {
  margin-top: 8px;
  min-height: 42px;
  font-size: 14px;
 }
 .mc-btn--solid {
  border-color: transparent;
  background: linear-gradient(135deg, ${({ theme }) => theme.tz.color.ember}, ${({ theme }) => theme.tz.color.emberDeep});
  color: #fff;
  box-shadow: 0 8px 18px rgba(194, 64, 15, 0.28);
 }
 .mc-btn--solid:hover:enabled,
 a.mc-btn--solid:hover {
  border-color: transparent;
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(194, 64, 15, 0.34);
 }
 .mc-btn:disabled {
  background: ${({ theme }) => theme.tz.color.lineSoft};
  color: ${({ theme }) => theme.tz.color.slate};
  box-shadow: none;
  cursor: not-allowed;
 }
 .mc-secure {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin: 10px 0 0;
  font-size: 12px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .mc-close:focus-visible,
 .mc-remove:focus-visible,
 .mc-del:focus-visible,
 .mc-stepper button:focus-visible,
 .mc-btn:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 @media (prefers-reduced-motion: reduce) {
  .cart-item,
  .mc-line,
  .mc-sum strong,
  .mc-empty {
   animation: none;
  }
  .mc-close,
  .mc-btn,
  .mc-thumb img,
  .mc-stepper button {
   transition: none;
  }
 }
`;
