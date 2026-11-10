import styled, { keyframes } from "styled-components";

const coRise = keyframes`
 from { opacity: 0; transform: translateY(10px); }
 to { opacity: 1; transform: none; }
`;
const coPop = keyframes`
 0% { transform: scale(0.6); opacity: 0; }
 70% { transform: scale(1.08); opacity: 1; }
 100% { transform: none; }
`;
const coSel = keyframes`
 0% { transform: scale(1); }
 40% { transform: scale(1.012); }
 100% { transform: scale(1); }
`;

// Checkout step 1 (address, express, items, buttons). Classes are used by
// CheckoutForm, CheckoutAddress and OrderedItem, which render inside this.
export const CheckoutShell = styled.div`
 display: flex;
 flex-direction: column;
 gap: 16px;
 margin-top: 20px;

 .co-card {
  padding: 18px 20px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 18px;
  background: ${({ theme }) => theme.tz.color.paper};
  animation: ${coRise} 440ms cubic-bezier(0.22, 1, 0.36, 1) both;
 }
 .co-card-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 14px;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 17px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .co-card-icon {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .co-pill {
  padding: 1px 9px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.lineSoft};
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }
 .co-muted {
  margin: 0;
  color: ${({ theme }) => theme.tz.color.slate};
 }

 /* section head: title + add address */
 .co-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 14px;
 }
 .co-head .co-card-title {
  margin: 0;
 }
 .co-add {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 38px;
  padding: 0 14px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.ember};
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.paper};
  color: ${({ theme }) => theme.tz.color.emberDeep};
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease;
 }
 .co-add:hover:enabled {
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
 }

 /* express delivery switch */
 .co-express {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
  padding: 12px 14px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 14px;
  background: ${({ theme }) => theme.tz.color.mist};
  cursor: pointer;
  transition: border-color 160ms ease, background-color 160ms ease;
 }
 .co-express.is-on {
  border-color: ${({ theme }) => theme.tz.color.ember};
  background: ${({ theme }) => theme.tz.color.emberTint};
 }
 .co-express-icon {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 11px;
  background: ${({ theme }) => theme.tz.color.paper};
  color: ${({ theme }) => theme.tz.color.emberDeep};
  font-size: 20px;
 }
 .co-express-text {
  flex: 1;
  min-width: 0;
 }
 .co-express-text strong {
  display: block;
  font-size: 14.5px;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .co-express-text small {
  font-size: 12.5px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .co-express input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
 }
 .co-switch {
  position: relative;
  flex-shrink: 0;
  width: 42px;
  height: 24px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.line};
  transition: background-color 180ms ease;
 }
 .co-switch::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(20, 21, 32, 0.25);
  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 .co-express input:checked + .co-switch {
  background: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .co-express input:checked + .co-switch::after {
  transform: translateX(18px);
 }
 .co-express input:focus-visible + .co-switch {
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 /* address cards */
 .co-addr-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
 }
 .co-addr {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 16px;
  background: ${({ theme }) => theme.tz.color.paper};
  cursor: pointer;
  animation: ${coRise} 380ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--i, 0) * 60ms);
  transition: border-color 160ms ease, background-color 160ms ease, box-shadow 200ms ease;
 }
 .co-addr:hover {
  border-color: #f6b9a3;
 }
 .co-addr.is-on {
  border-color: ${({ theme }) => theme.tz.color.ember};
  background: #fff8f4;
  box-shadow: 0 8px 20px rgba(240, 80, 35, 0.1);
  animation: ${coSel} 300ms ease;
 }
 .co-addr.is-pickup {
  cursor: default;
 }
 .co-addr:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
 .co-radio {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  margin-top: 1px;
  border: 2px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 50%;
  background: #fff;
  transition: border-color 160ms ease;
 }
 .co-radio i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.emberDeep};
  transform: scale(0);
  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 .co-addr.is-on .co-radio {
  border-color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .co-addr.is-on .co-radio i {
  transform: scale(1);
 }
 .co-addr-body {
  flex: 1;
  min-width: 0;
 }
 .co-addr-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 8px;
  margin-bottom: 6px;
 }
 .co-addr-top strong {
  font-size: 15px;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .co-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 9px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.navyTint};
  color: ${({ theme }) => theme.tz.color.navy};
  font-size: 11.5px;
  font-weight: 700;
 }
 .co-tag--def {
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
 }
 .co-here {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  padding: 2px 9px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.tone.success.bg};
  color: ${({ theme }) => theme.tz.tone.success.fg};
  font-size: 11.5px;
  font-weight: 700;
  animation: ${coPop} 300ms cubic-bezier(0.22, 1, 0.36, 1) both;
 }
 .co-line {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 4px 0 0;
  font-size: 13.5px;
  line-height: 1.5;
  color: ${({ theme }) => theme.tz.color.inkSoft};
  overflow-wrap: anywhere;
 }
 .co-line svg {
  flex-shrink: 0;
  margin-top: 2px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 /* "Details" toggle: compact fact grid that slides open */
 .co-more {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
  padding: 3px 10px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.paper};
  color: ${({ theme }) => theme.tz.color.inkSoft};
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: border-color 150ms ease, color 150ms ease;
 }
 .co-more svg {
  transition: transform 240ms ease;
 }
 .co-more[aria-expanded="true"] svg {
  transform: rotate(180deg);
 }
 .co-more:hover {
  border-color: ${({ theme }) => theme.tz.color.ember};
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .co-more:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
 .co-facts-wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 300ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 .co-facts-wrap.is-open {
  grid-template-rows: 1fr;
 }
 .co-facts-wrap > div {
  min-height: 0;
  overflow: hidden;
 }
 .co-short {
  margin: 2px 0 0;
  overflow: hidden;
  font-size: 13px;
  color: ${({ theme }) => theme.tz.color.slate};
  text-overflow: ellipsis;
  white-space: nowrap;
 }
 .co-facts-wrap .co-line:first-child {
  margin-top: 10px;
 }
 .co-facts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;
  margin: 0;
 }
 .co-facts-wrap.is-open .co-facts {
  margin-top: 10px;
 }
 .co-facts > div {
  padding: 7px 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.tz.color.mist};
 }
 .co-facts dt {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .co-facts dd {
  margin: 2px 0 0;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
  overflow-wrap: anywhere;
 }
 .co-addr.is-on .co-facts > div {
  background: ${({ theme }) => theme.tz.color.paper};
 }
 @media (max-width: 560px) {
  .co-facts {
   grid-template-columns: repeat(2, minmax(0, 1fr));
  }
 }

 .co-edit {
  flex-shrink: 0;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 12.5px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.navy};
  text-decoration: none;
 }
 .co-edit:hover {
  background: ${({ theme }) => theme.tz.color.navyTint};
 }
 .co-addr-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 26px 16px;
  border: 2px dashed ${({ theme }) => theme.tz.color.line};
  border-radius: 16px;
  color: ${({ theme }) => theme.tz.color.slate};
  text-align: center;
  text-decoration: none;
  transition: border-color 160ms ease, background-color 160ms ease;
 }
 .co-addr-empty span {
  font-size: 22px;
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .co-addr-empty strong {
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .co-addr-empty:hover {
  border-color: ${({ theme }) => theme.tz.color.ember};
  background: ${({ theme }) => theme.tz.color.emberTint};
 }

 /* items */
 .co-item-list {
  margin: 0;
  padding: 0;
  list-style: none;
 }
 .co-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 0;
 }
 .co-item + .co-item {
  border-top: 1px dashed ${({ theme }) => theme.tz.color.line};
 }
 .co-item-img {
  position: relative;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 12px;
  background: ${({ theme }) => theme.tz.color.mist};
 }
 .co-item-img b {
  position: absolute;
  right: 3px;
  bottom: 3px;
  padding: 0 5px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 10px;
  line-height: 16px;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }
 .co-item-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
 }
 .co-item-info strong {
  font-size: 14.5px;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .co-item-info small {
  font-size: 12.5px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .co-item-info del {
  margin-right: 4px;
 }
 .co-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 2px;
 }
 .co-chips span {
  padding: 1px 7px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.lineSoft};
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }
 .co-item-total {
  font-size: 15px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.ink};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
 }

 /* buttons */
 .co-actions {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 12px;
 }
 .co-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 50px;
  padding: 0 20px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 14px;
  background: ${({ theme }) => theme.tz.color.paper};
  color: ${({ theme }) => theme.tz.color.ink};
  font-family: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: border-color 160ms ease, transform 160ms ease, box-shadow 160ms ease;
 }
 .co-btn:hover:enabled {
  border-color: ${({ theme }) => theme.tz.color.slate};
 }
 .co-btn--solid {
  border-color: transparent;
  background: linear-gradient(135deg, ${({ theme }) => theme.tz.color.ember}, ${({ theme }) => theme.tz.color.emberDeep});
  color: #fff;
  box-shadow: 0 10px 22px rgba(194, 64, 15, 0.28);
 }
 .co-btn--solid:hover:enabled {
  border-color: transparent;
  transform: translateY(-1px);
  box-shadow: 0 14px 28px rgba(194, 64, 15, 0.34);
 }
 .co-btn:disabled {
  opacity: 0.55;
  box-shadow: none;
  cursor: not-allowed;
 }
 .co-btn:focus-visible,
 .co-add:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 @media (max-width: 560px) {
  .co-card {
   padding: 14px;
  }
  .co-actions {
   grid-template-columns: 1fr;
  }
  .co-actions .co-btn--solid {
   order: -1;
  }
 }

 @media (prefers-reduced-motion: reduce) {
  .co-card,
  .co-addr,
  .co-addr.is-on,
  .co-here {
   animation: none;
  }
  .co-switch::after,
  .co-radio i,
  .co-btn {
   transition: none;
  }
 }
`;

const sumPop = keyframes`
 0% { transform: scale(1); }
 40% { transform: scale(1.06); }
 100% { transform: scale(1); }
`;

// Right column: promo code + money lines + total
export const SummaryBox = styled.div`
 .sm-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 14px;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 17px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .sm-label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }
 .sm-promo {
  display: flex;
  align-items: center;
  padding: 4px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 14px;
  background: ${({ theme }) => theme.tz.color.paper};
  transition: border-color 160ms ease, box-shadow 160ms ease;
 }
 .sm-promo:focus-within {
  border-color: ${({ theme }) => theme.tz.color.ember};
  box-shadow: 0 0 0 4px rgba(240, 80, 35, 0.12);
 }
 .sm-promo svg {
  flex-shrink: 0;
  margin: 0 6px 0 8px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .sm-promo input {
  flex: 1;
  min-width: 0;
  height: 38px;
  padding: 0 4px;
  border: 0 !important;
  outline: none !important;
  box-shadow: none !important;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .sm-promo button {
  height: 38px;
  padding: 0 16px;
  border: 0;
  border-radius: 10px;
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 800;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: background-color 150ms ease;
 }
 .sm-promo button:hover {
  background: ${({ theme }) => theme.tz.color.emberDark};
 }
 .sm-applied {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  padding: 4px 6px 4px 10px;
  border: 1px solid ${({ theme }) => theme.tz.tone.success.fill};
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.tone.success.bg};
  color: ${({ theme }) => theme.tz.tone.success.fg};
  font-size: 13px;
  font-weight: 700;
 }
 .sm-applied button {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border: 0;
  border-radius: 50%;
  background: rgba(27, 122, 75, 0.15);
  color: inherit;
  font-weight: 800;
  cursor: pointer;
 }

 .sm-lines {
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
 }
 .sm-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 5px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }
 .sm-line b {
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
  font-variant-numeric: tabular-nums;
 }
 .sm-line .is-good {
  color: ${({ theme }) => theme.tz.tone.success.fg};
 }
 .sm-line .is-brand {
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .sm-line s {
  margin-right: 6px;
  font-size: 13px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .sm-badge {
  margin-left: 6px;
  padding: 1px 7px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.tone.success.bg};
  color: ${({ theme }) => theme.tz.tone.success.fg};
  font-size: 11px;
  font-weight: 800;
 }
 .sm-total {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-top: 12px;
  padding-top: 14px;
  border-top: 2px dashed ${({ theme }) => theme.tz.color.line};
 }
 .sm-total span {
  font-size: 15px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .sm-total strong {
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 28px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.emberDeep};
  font-variant-numeric: tabular-nums;
  animation: ${sumPop} 300ms ease;
 }
 .sm-secure {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin: 14px 0 4px;
  padding: 8px;
  border-radius: 10px;
  background: ${({ theme }) => theme.tz.color.mist};
  font-size: 12.5px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.slate};
 }

 @media (prefers-reduced-motion: reduce) {
  .sm-total strong {
   animation: none;
  }
  .sm-promo,
  .sm-promo button {
   transition: none;
  }
 }
`;
