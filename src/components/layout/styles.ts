"use client";

import styled from "styled-components";

import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import NavLink from "@component/nav-link";
import { getTheme } from "@utils/utils";

export const StyledGrid = styled(Grid)`
 @media only screen and (max-width: 1024px) {
  display: none;
 }
`;

export const DashboardNavigationWrapper = styled(Card)`
 @media only screen and (max-width: 768px) {
  height: calc(100vh - 64px);
  box-shadow: none;
  overflow-y: auto;
 }
`;

// export const StyledDashboardNav = styled(NavLink).withConfig({
//   shouldForwardProp: (prop) => prop !== "isCurrentPath"
// })<{ isCurrentPath?: boolean }>`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   border-left: 4px solid;
//   color: ${({ isCurrentPath }) => (isCurrentPath ? getTheme("colors.primary.main") : "inherit")};
//   border-left-color: ${({ isCurrentPath }) =>
//     isCurrentPath ? getTheme("colors.primary.main") : "transparent"};

//   .dashboard-nav-icon-holder {
//     color: ${getTheme("colors.gray.600")};
//   }

//   &:hover {
//     border-left-color: ${getTheme("colors.primary.main")};

//     .dashboard-nav-icon-holder {
//       color: ${getTheme("colors.primary.main")};
//     }
//   }
// `;

export const StyledDashboardNav = styled(NavLink).withConfig({
 shouldForwardProp: (prop) => prop !== "isCurrentPath",
})<{ isCurrentPath?: boolean }>`
 display: flex;
 justify-content: space-between;
 align-items: center;
 gap: 12px;
 padding: 8px 20px;
 margin: 6px 16px;
 border-radius: 8px;
 font-size: 15px;
 font-weight: 500;
 transition: all 0.25s ease;
 color: ${({ isCurrentPath }) =>
  isCurrentPath
   ? getTheme("colors.primary.main")
   : getTheme("colors.gray.800")};
 background-color: ${({ isCurrentPath }) =>
  isCurrentPath ? getTheme("colors.primary.lighter") : "transparent"};

 &:hover {
  background-color: ${getTheme("colors.gray.100")};
  color: ${getTheme("colors.primary.main")};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* <- Add this shadow */

  .dashboard-nav-icon-holder {
   color: ${getTheme("colors.primary.main")};
  }
 }

 .dashboard-nav-icon-holder {
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ isCurrentPath }) =>
   isCurrentPath
    ? getTheme("colors.primary.main")
    : getTheme("colors.gray.600")};
  transition: color 0.3s ease;
 }
`;
