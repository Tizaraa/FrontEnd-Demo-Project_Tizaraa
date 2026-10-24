"use client";

import Link from "next/link";
import styled from "styled-components";

// Customer dashboard shell: sidebar column plus content column.
// The vendor dashboard keeps using ../styles.ts.

export const DashboardShell = styled.div`
 display: grid;
 grid-template-columns: 280px minmax(0, 1fr);
 gap: 24px;
 align-items: start;

 .dash-aside {
  position: sticky;
  top: 24px;
 }

 @media (max-width: 1024px) {
  grid-template-columns: minmax(0, 1fr);

  .dash-aside {
   display: none;
  }
 }
`;

export const NavPanel = styled.nav`
 display: flex;
 flex-direction: column;
 padding: 8px 0 12px;
 background: ${({ theme }) => theme.tz.color.paper};
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: ${({ theme }) => theme.tz.radius.md}px;

 /* Inside the mobile Sidenav drawer */
 @media (max-width: 1024px) {
  min-height: 100%;
  border: 0;
  border-radius: 0;
 }
`;

export const NavUser = styled.div`
 display: flex;
 align-items: center;
 gap: 12px;
 padding: 16px 20px 20px;
 margin-bottom: 4px;
 border-bottom: 1px solid ${({ theme }) => theme.tz.color.lineSoft};

 .nu-text {
  min-width: 0;
 }

 .nu-name {
  margin: 0;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
  color: ${({ theme }) => theme.tz.color.ink};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
 }

 .nu-email {
  margin: 2px 0 0;
  font-size: 13px;
  color: ${({ theme }) => theme.tz.color.slate};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
 }
`;

export const NavGroupLabel = styled.p`
 margin: 0;
 padding: 16px 20px 6px;
 font-size: 12px;
 font-weight: 600;
 letter-spacing: 0.06em;
 text-transform: uppercase;
 color: ${({ theme }) => theme.tz.color.slate};
`;

const navItemStyles = ({ theme }) => `
 position: relative;
 display: flex;
 align-items: center;
 gap: 12px;
 min-height: 44px;
 margin: 2px 12px;
 padding: 8px 12px;
 border-radius: ${theme.tz.radius.sm}px;
 font-size: 15px;
 font-weight: 500;
 line-height: 1.3;
 color: ${theme.tz.color.inkSoft};
 text-decoration: none;
 transition: background-color ${theme.tz.motion.fast}, color ${theme.tz.motion.fast};

 .ni-icon {
  display: flex;
  color: ${theme.tz.color.slate};
  transition: color ${theme.tz.motion.fast};
 }

 .ni-label {
  flex: 1 1 auto;
  min-width: 0;
 }

 .ni-count {
  min-width: 24px;
  padding: 2px 8px;
  border-radius: ${theme.tz.radius.pill}px;
  background: ${theme.tz.color.lineSoft};
  color: ${theme.tz.color.slate};
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  font-variant-numeric: tabular-nums;
 }

 &:hover {
  background: ${theme.tz.color.mist};
  color: ${theme.tz.color.ink};

  .ni-icon {
   color: ${theme.tz.color.ink};
  }
 }

 &:focus-visible {
  outline: none;
  box-shadow: ${theme.tz.focusRing};
 }

 ${theme.tz.media.reducedMotion} {
  transition: none;
 }
`;

export const NavItem = styled(Link)`
 ${navItemStyles}

 &[aria-current="page"] {
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
  font-weight: 600;

  &::before {
   content: "";
   position: absolute;
   left: -12px;
   top: 8px;
   bottom: 8px;
   width: 3px;
   border-radius: 0 3px 3px 0;
   background: ${({ theme }) => theme.tz.color.ember};
  }

  .ni-icon {
   color: ${({ theme }) => theme.tz.color.emberDeep};
  }

  .ni-count {
   background: ${({ theme }) => theme.tz.color.paper};
   color: ${({ theme }) => theme.tz.color.emberDeep};
  }
 }
`;

export const NavButton = styled.button`
 ${navItemStyles}
 width: calc(100% - 24px);
 border: 0;
 background: transparent;
 font-family: inherit;
 text-align: left;
 cursor: pointer;
`;

export const NavDivider = styled.hr`
 margin: 12px 20px 8px;
 border: 0;
 border-top: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
`;
