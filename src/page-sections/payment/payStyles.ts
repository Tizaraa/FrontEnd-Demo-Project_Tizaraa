import styled, { keyframes } from "styled-components";

const rise = keyframes`
 from { opacity: 0; transform: translateY(8px); }
 to { opacity: 1; transform: none; }
`;
const pop = keyframes`
 0% { transform: scale(0); }
 70% { transform: scale(1.2); }
 100% { transform: scale(1); }
`;

// Payment step: method rows, agreement, actions
export const PayShell = styled.div`
 display: flex;
 flex-direction: column;
 gap: 14px;
 margin-bottom: 2rem;

 .py-card {
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 18px;
  background: ${({ theme }) => theme.tz.color.paper};
  animation: ${rise} 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
 }
 .py-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 14px;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 17px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .py-title-icon {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }

 .py-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
 }
 .py-opt-wrap {
  animation: ${rise} 360ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--i, 0) * 70ms + 80ms);
 }
 .py-opt {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 12px 16px 12px 12px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 16px;
  background: ${({ theme }) => theme.tz.color.paper};
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: border-color 160ms ease, background-color 160ms ease, box-shadow 200ms ease, transform 200ms ease;
 }
 .py-opt:hover:enabled {
  border-color: #f6b9a3;
  transform: translateY(-1px);
 }
 .py-opt.is-on {
  border-color: ${({ theme }) => theme.tz.color.ember};
  background: #fff8f4;
  box-shadow: 0 8px 20px rgba(240, 80, 35, 0.12);
 }
 .py-opt.is-soon {
  cursor: not-allowed;
  background: ${({ theme }) => theme.tz.color.mist};
 }
 .py-opt.is-soon .py-logo,
 .py-opt.is-soon .py-text {
  opacity: 0.55;
  filter: grayscale(0.7);
 }
 .py-opt:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
 .py-logo {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
  border-radius: 14px;
  background: #fff;
 }
 .py-text {
  flex: 1;
  min-width: 0;
 }
 .py-text strong {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .py-text em {
  padding: 1px 8px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.navyTint};
  color: ${({ theme }) => theme.tz.color.navy};
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
 }
 .py-text small {
  display: block;
  margin-top: 2px;
  font-size: 12.5px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .py-radio {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  border: 2px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 50%;
  background: #fff;
  transition: border-color 160ms ease;
 }
 .py-radio i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.emberDeep};
  transform: scale(0);
 }
 .py-opt.is-on .py-radio {
  border-color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .py-opt.is-on .py-radio i {
  animation: ${pop} 300ms cubic-bezier(0.22, 1, 0.36, 1) both;
 }

 .py-note {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 280ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 .py-note.is-open {
  grid-template-rows: 1fr;
 }
 .py-note > div {
  min-height: 0;
  overflow: hidden;
 }
 .py-note p {
  margin: 8px 0 2px 66px;
  padding: 8px 12px;
  border-left: 3px solid ${({ theme }) => theme.tz.color.ember};
  border-radius: 0 10px 10px 0;
  background: ${({ theme }) => theme.tz.color.emberTint};
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }

 /* agreement */
 .py-agree {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 14px;
  background: ${({ theme }) => theme.tz.color.paper};
  font-size: 13.5px;
  line-height: 1.55;
  color: ${({ theme }) => theme.tz.color.inkSoft};
  cursor: pointer;
  transition: border-color 160ms ease, background-color 160ms ease;
 }
 .py-agree.is-on {
  border-color: ${({ theme }) => theme.tz.tone.success.fill};
  background: ${({ theme }) => theme.tz.tone.success.bg};
 }
 .py-agree input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
 }
 .py-check {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 1px;
  border: 2px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 6px;
  background: #fff;
  color: transparent;
  transition: background-color 150ms ease, border-color 150ms ease, color 150ms ease;
 }
 .py-agree input:checked + .py-check {
  border-color: ${({ theme }) => theme.tz.tone.success.fill};
  background: ${({ theme }) => theme.tz.tone.success.fill};
  color: #fff;
 }
 .py-agree input:focus-visible + .py-check {
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
 .py-agree a {
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.emberDeep};
  text-decoration: underline;
  text-underline-offset: 2px;
 }

 /* actions */
 .py-actions {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 12px;
 }
 .py-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 52px;
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
 .py-btn:hover:enabled {
  border-color: ${({ theme }) => theme.tz.color.slate};
 }
 .py-btn--solid {
  border-color: transparent;
  background: linear-gradient(135deg, ${({ theme }) => theme.tz.color.ember}, ${({ theme }) => theme.tz.color.emberDeep});
  color: #fff;
  box-shadow: 0 10px 22px rgba(194, 64, 15, 0.3);
 }
 .py-btn--solid:hover:enabled {
  border-color: transparent;
  transform: translateY(-1px);
  box-shadow: 0 14px 28px rgba(194, 64, 15, 0.36);
 }
 .py-btn--solid:disabled {
  background: ${({ theme }) => theme.tz.color.lineSoft};
  color: ${({ theme }) => theme.tz.color.slate};
  box-shadow: none;
  cursor: not-allowed;
 }
 .py-btn:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
 .py-missing {
  margin: 0;
  font-size: 12.5px;
  text-align: right;
  color: ${({ theme }) => theme.tz.tone.warning.fg};
  animation: ${rise} 220ms ease both;
 }

 @media (max-width: 600px) {
  .py-card {
   padding: 14px;
  }
  .py-note p {
   margin-left: 0;
  }
  .py-actions {
   grid-template-columns: 1fr;
  }
  .py-actions .py-btn--solid {
   order: -1;
  }
  .py-missing {
   text-align: center;
  }
 }

 @media (prefers-reduced-motion: reduce) {
  .py-card,
  .py-opt-wrap,
  .py-opt.is-on .py-radio i,
  .py-missing {
   animation: none;
  }
  .py-opt.is-on .py-radio i {
   transform: scale(1);
  }
  .py-opt,
  .py-note,
  .py-agree,
  .py-check,
  .py-btn {
   transition: none;
  }
 }
`;
