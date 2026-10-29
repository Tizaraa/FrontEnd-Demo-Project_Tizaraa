import styled from "styled-components";

export const Styledbutton = styled.div`
 .add-to-cart-btn {
  min-width: 220px;
  height: 48px;
 }

 /* Stock Out / loading — show the "not allowed" cursor on hover */
 .add-to-cart-btn:disabled {
  cursor: not-allowed;
 }

 .qty-btn {
  width: 44px;
  height: 44px;
  padding: 0;
 }

 /* Quantity box: brand field look, numbers line up */
 .no-spin-button {
  width: 64px;
  height: 44px;
  padding: 0 8px;
  text-align: center;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.tz.color.ink};
  background: ${({ theme }) => theme.tz.color.paper};
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: ${({ theme }) => theme.tz.radius.sm}px;
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
  border-color: ${({ theme }) => theme.tz.color.ember};
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 .qty-limit {
  font-size: 12px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
`;
