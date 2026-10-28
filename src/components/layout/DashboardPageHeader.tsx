"use client";

import { ReactNode } from "react";
import styled from "styled-components";

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
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.tz.radius.sm}px;
  background: ${({ theme }) => theme.tz.color.navyTint};
  color: ${({ theme }) => theme.tz.color.navy};
 }

 .dph-title {
  margin: 0;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 24px;
  font-weight: 600;
  line-height: 1.2;
  color: ${({ theme }) => theme.tz.color.ink};
 }

 .dph-subtitle {
  margin: 2px 0 0;
  font-size: 14px;
  color: ${({ theme }) => theme.tz.color.slate};
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
