import styled, { keyframes } from "styled-components";

const tickerIn = keyframes`
 from { opacity: 0; transform: translateY(8px); }
 to { opacity: 1; transform: none; }
`;
// Pulse ring via transform/opacity on a pseudo-element (no per-frame repaint)
const dotPulse = keyframes`
 0% { opacity: 0.7; transform: scale(1); }
 70%, 100% { opacity: 0; transform: scale(2.4); }
`;

const StyledTopbar = styled.div`
 position: relative;
 height: 40px;
 font-size: 12px;
 color: rgba(255, 255, 255, 0.88);
 background: linear-gradient(90deg, ${({ theme }) => theme.tz.color.navy} 0%, #164a85 55%, ${({ theme }) => theme.tz.color.navy} 100%);

 /* thin ember line along the bottom */
 &::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, ${({ theme }) => theme.tz.color.ember}, transparent);
  opacity: 0.55;
 }

 .topbar-left {
  gap: 14px;
  .logo {
   display: none;
   img {
    display: block;
    height: 36px;
   }
  }
  @media only screen and (max-width: 900px) {
   .logo {
    display: block;
   }
   *:not(.logo) {
    display: none;
   }
  }
 }

 .tb-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  color: inherit;
  text-decoration: none;
  transition: color 180ms ease;

  &::after {
   content: "";
   position: absolute;
   left: 22px;
   right: 0;
   bottom: 0;
   height: 1px;
   background: ${({ theme }) => theme.tz.color.ember};
   transform: scaleX(0);
   transform-origin: left;
   transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  &:hover {
   color: #fff;
  }
  &:hover::after {
   transform: scaleX(1);
  }
  &:focus-visible {
   outline: 2px solid ${({ theme }) => theme.tz.color.ember};
   outline-offset: 2px;
   border-radius: 4px;
  }
 }

 .tb-sep {
  width: 1px;
  height: 14px;
  background: rgba(255, 255, 255, 0.22);
 }

 .tb-ticker {
  flex: 1 1 0;
  display: flex;
  justify-content: center;
  overflow: hidden;
  min-width: 0;
  padding: 0 16px;
 }
 .tb-ticker-msg {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: #fff;
  white-space: nowrap;
  animation: ${tickerIn} 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
 }
 .tb-ticker-dot {
  position: relative;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.ember};

  &::after {
   content: "";
   position: absolute;
   inset: 0;
   border-radius: 50%;
   background: ${({ theme }) => theme.tz.color.ember};
   animation: ${dotPulse} 2s ease-out infinite;
  }
 }

 .topbar-right {
  .link {
   padding-right: 30px;
   color: white;
  }
  .dropdown-handler {
   cursor: pointer;
   img {
    height: 14px;
    border-radius: 4px;
   }
   span {
    margin-right: 0.25rem;
    margin-left: 0.5rem;
   }
  }
  @media only screen and (max-width: 900px) {
   .link {
    display: none;
   }
  }
 }

 @media only screen and (max-width: 1100px) {
  .tb-ticker {
   visibility: hidden;
  }
 }

 @media (prefers-reduced-motion: reduce) {
  .tb-ticker-msg,
  .tb-ticker-dot::after {
   animation: none;
  }
  .tb-link::after {
   transition: none;
  }
 }
`;

export default StyledTopbar;
