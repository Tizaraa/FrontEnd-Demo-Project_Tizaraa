"use client";

import { ReactNode } from "react";
import styled, { keyframes } from "styled-components";

import Icon from "@component/icon/Icon";
import useWindowSize from "@hook/useWindowSize";
import Sidenav from "@component/sidenav/Sidenav";
import DashboardNavigation from "./DashboardNavigation";

// ==============================================================
export interface DashboardPageHeaderProps {
 title?: string;
 subtitle?: string;
 iconName?: string;
 button?: ReactNode;
}
// ==============================================================

// Header motion: icon pops, title slides in, underline grows, subtitle fades.
// Plays once per page; off for reduced motion.
const dphPop = keyframes`
 0% { opacity: 0; transform: scale(0.6) rotate(-12deg); }
 70% { opacity: 1; transform: scale(1.06) rotate(2deg); }
 100% { opacity: 1; transform: none; }
`;
const dphSlide = keyframes`
 from { opacity: 0; transform: translateX(-12px); }
 to { opacity: 1; transform: none; }
`;
const dphLine = keyframes`
 from { transform: scaleX(0); }
 to { transform: scaleX(1); }
`;
const dphFade = keyframes`
 from { opacity: 0; transform: translateY(4px); }
 to { opacity: 1; transform: none; }
`;

const Head = styled.div`
 display: flex;
 flex-wrap: wrap;
 align-items: center;
 justify-content: space-between;
 gap: 16px;
 margin-bottom: 24px;

 .dph-main {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
 }

 .dph-icon {
  position: relative;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: ${({ theme }) => theme.tz.radius.sm + 2}px;
  background: linear-gradient(135deg, ${({ theme }) => theme.tz.color.ember} 0%, ${({ theme }) => theme.tz.color.emberDeep} 100%);
  color: #fff;
  box-shadow: 0 6px 16px rgba(194, 64, 15, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.22);
  animation: ${dphPop} 520ms cubic-bezier(0.22, 1, 0.36, 1) both;
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 260ms ease;
 }

 .dph-main:hover .dph-icon {
  transform: translateY(-2px) rotate(-4deg);
  box-shadow: 0 10px 22px rgba(194, 64, 15, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.22);
 }

 .dph-title {
  position: relative;
  display: inline-block;
  margin: 0;
  padding-bottom: 6px;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 26px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.tz.color.ink};
  animation: ${dphSlide} 480ms cubic-bezier(0.22, 1, 0.36, 1) 80ms both;

  &::after {
   content: "";
   position: absolute;
   left: 0;
   bottom: 0;
   width: 44px;
   height: 3px;
   border-radius: 3px;
   background: linear-gradient(90deg, ${({ theme }) => theme.tz.color.ember}, #ffb38a);
   transform-origin: left center;
   animation: ${dphLine} 560ms cubic-bezier(0.22, 1, 0.36, 1) 380ms both;
  }
 }

 .dph-subtitle {
  margin: 6px 0 0;
  font-size: 14px;
  color: ${({ theme }) => theme.tz.color.slate};
  animation: ${dphFade} 460ms cubic-bezier(0.22, 1, 0.36, 1) 260ms both;
 }

 .dph-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
 }

 .dph-menu {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: ${({ theme }) => theme.tz.radius.sm}px;
  background: ${({ theme }) => theme.tz.color.paper};
  color: ${({ theme }) => theme.tz.color.ink};
  cursor: pointer;
 }

 @media (max-width: 650px) {
  .dph-title {
   font-size: 20px;
  }

  .dph-actions {
   width: 100%;
  }
 }

 @media (prefers-reduced-motion: reduce) {
  .dph-icon,
  .dph-title,
  .dph-title::after,
  .dph-subtitle {
   animation: none;
  }
  .dph-icon {
   transition: none;
  }
 }
`;

export default function DashboardPageHeader({
 iconName,
 title,
 subtitle,
 button,
}: DashboardPageHeaderProps) {
 const width = useWindowSize();
 const isTablet = width < 1025;

 return (
  <Head>
   <div className="dph-main">
    {isTablet && (
     <Sidenav
      position="left"
      scroll
      handle={
       <button type="button" className="dph-menu" aria-label="Open account menu">
        <Icon variant="small">menu</Icon>
       </button>
      }
     >
      <DashboardNavigation />
     </Sidenav>
    )}

    {iconName && !isTablet ? (
     <span className="dph-icon">
      <Icon variant="small" defaultcolor="currentColor">
       {iconName}
      </Icon>
     </span>
    ) : null}

    <div>
     <h1 className="dph-title">{title}</h1>
     {subtitle && <p className="dph-subtitle">{subtitle}</p>}
    </div>
   </div>

   {button && <div className="dph-actions">{button}</div>}
  </Head>
 );
}
