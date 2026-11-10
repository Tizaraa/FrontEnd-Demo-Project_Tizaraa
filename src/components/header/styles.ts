import styled, { keyframes } from "styled-components";
import { layoutConstant } from "utils/constants";
import { getTheme } from "@utils/utils";

const badgePop = keyframes`
 0% { transform: scale(0.4); }
 60% { transform: scale(1.25); }
 100% { transform: scale(1); }
`;
const menuIn = keyframes`
 from { opacity: 0; transform: translateY(-6px) scale(0.98); }
 to { opacity: 1; transform: none; }
`;
const heartBeat = keyframes`
 0%, 100% { transform: scale(1); }
 30% { transform: scale(1.2); }
 60% { transform: scale(0.95); }
`;

const StyledHeader = styled.header`
 z-index: 111;
 position: relative;
 height: ${layoutConstant.headerHeight};
 background: ${getTheme("colors.body.paper")};
 border-bottom: 1px solid ${({ theme }) => theme.tz.color.line};
 transition: box-shadow ${({ theme }) => theme.tz.motion.base};

 &.scrolled {
  box-shadow: 0 8px 24px rgba(14, 52, 96, 0.08);
  border-bottom-color: transparent;
 }

 .logo {
  img {
   display: block;
  }
 }
 .hd-logo {
  display: block;
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
  transform-origin: left center;
 }
 .hd-logo:hover {
  transform: translateY(-1px) scale(1.02);
 }
 &.scrolled .hd-logo {
  transform: scale(0.94);
 }

 .header-right {
  gap: 6px;
  margin-left: 16px;
 }

 /* Icon + two-line label buttons (account, cart) */
 .hd-action {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 52px;
  padding: 0 12px 0 6px;
  border: 1px solid transparent;
  border-radius: 14px;
  background: transparent;
  color: ${({ theme }) => theme.tz.color.ink};
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color 180ms ease, border-color 180ms ease;
 }
 .hd-action:hover {
  background: ${({ theme }) => theme.tz.color.mist};
  border-color: ${({ theme }) => theme.tz.color.lineSoft};
 }
 .hd-action:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
 .hd-action--icon {
  padding: 0 6px;
 }

 .hd-icon {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.mist};
  color: ${({ theme }) => theme.tz.color.ink};
  transition: background-color 180ms ease, color 180ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 .hd-icon svg {
  width: 20px;
  height: 20px;
 }
 .hd-icon.has-img {
  padding: 2px;
  background: linear-gradient(135deg, ${({ theme }) => theme.tz.color.ember}, #ffb38a);
 }
 .hd-action:hover .hd-icon {
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
  transform: translateY(-1px);
 }
 .hd-action:hover .hd-icon.has-img {
  background: linear-gradient(135deg, ${({ theme }) => theme.tz.color.ember}, #ffb38a);
 }
 .hd-action:hover .hd-heart svg {
  animation: ${heartBeat} 600ms ease;
 }

 .hd-avatar {
  width: 100%;
  height: 100%;
  border: 2px solid #fff;
  border-radius: 50%;
  object-fit: cover;
 }

 .hd-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  white-space: nowrap;
 }
 .hd-text small {
  font-size: 11.5px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .hd-text strong {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .hd-caret {
  width: 14px;
  height: 14px;
  color: ${({ theme }) => theme.tz.color.slate};
  transition: transform 200ms ease;
 }
 .hd-action:hover .hd-caret {
  transform: translateY(1px);
 }

 .hd-badge {
  position: absolute;
  top: -4px;
  right: -6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border: 2px solid #fff;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  animation: ${badgePop} 420ms cubic-bezier(0.22, 1, 0.36, 1);
 }

 /* Account dropdown */
 .hd-menu .menu-item-holder {
  min-width: 250px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 16px;
  box-shadow: 0 18px 40px rgba(14, 52, 96, 0.16);
  animation: ${menuIn} 200ms cubic-bezier(0.22, 1, 0.36, 1) both;
  transform-origin: top right;
 }
 .hd-menu-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
  padding: 10px;
  border-radius: 12px;
  background: linear-gradient(135deg, ${({ theme }) => theme.tz.color.emberTint}, ${({ theme }) => theme.tz.color.navyTint});
 }
 .hd-menu-head > div {
  min-width: 0;
 }
 .hd-menu-head strong,
 .hd-menu-head small {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
 }
 .hd-menu-head strong {
  font-size: 14px;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .hd-menu-head small {
  font-size: 12px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .hd-menu-head .hd-icon {
  width: 38px;
  height: 38px;
  background: #fff;
 }
 .hd-menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: ${({ theme }) => theme.tz.color.inkSoft};
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: background-color 150ms ease, color 150ms ease, padding-left 200ms ease;
 }
 .hd-menu-item svg {
  width: 17px;
  height: 17px;
  color: ${({ theme }) => theme.tz.color.slate};
  transition: color 150ms ease;
 }
 .hd-menu-item:hover,
 .hd-menu-item:focus-visible {
  outline: none;
  padding-left: 16px;
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .hd-menu-item:hover svg,
 .hd-menu-item:focus-visible svg {
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .hd-menu-item.is-danger:hover,
 .hd-menu-item.is-danger:focus-visible {
  background: ${({ theme }) => theme.tz.tone.danger.bg};
  color: ${({ theme }) => theme.tz.tone.danger.fg};
 }
 .hd-menu-item.is-danger:hover svg,
 .hd-menu-item.is-danger:focus-visible svg {
  color: ${({ theme }) => theme.tz.tone.danger.fg};
 }
 .hd-menu-sep {
  height: 1px;
  margin: 6px 4px;
  background: ${({ theme }) => theme.tz.color.lineSoft};
 }

 .icon-holder {
  span {
   font-size: 12px;
   line-height: 1;
   margin-bottom: 4px;
  }
  h4 {
   margin: 0px;
   font-size: 14px;
   line-height: 1;
   font-weight: 600;
  }
  div {
   margin-left: 6px;
  }
 }

 .user {
  cursor: pointer;
 }

 @media only screen and (max-width: 1200px) {
  .hd-text {
   display: none;
  }
  .hd-action {
   padding: 0 4px;
  }
 }

 @media only screen and (max-width: 900px) {
  height: ${layoutConstant.mobileHeaderHeight};

  .logo,
  .icon-holder,
  .category-holder {
   display: none;
  }
  .header-right {
   display: none !important;
  }
 }

 @media (prefers-reduced-motion: reduce) {
  .hd-logo,
  .hd-icon,
  .hd-caret,
  .hd-menu-item {
   transition: none;
  }
  .hd-badge,
  .hd-menu .menu-item-holder,
  .hd-action:hover .hd-heart svg {
   animation: none;
  }
  &.scrolled .hd-logo,
  .hd-logo:hover {
   transform: none;
  }
 }
`;

export default StyledHeader;
