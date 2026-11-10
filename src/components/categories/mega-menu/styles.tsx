import styled from "styled-components";
import { getTheme } from "@utils/utils";
import { menuIn, menuShadow, thinScrollbar } from "../styles";

export const StyledMegaMenu1 = styled.div`
 display: none;
 position: absolute;
 left: 94%;
 right: auto;
 top: -1px;
 z-index: 99;
 animation: ${menuIn} 200ms cubic-bezier(0.2, 0, 0, 1);

 @media (prefers-reduced-motion: reduce) {
  animation: none;
 }

 /* Level 2 list panel */
 .mega-panel {
  box-sizing: border-box;
  position: relative;
  margin-left: 1.5rem;
  height: 450px;
  padding: 4px 0;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  background: ${({ theme }) => theme.tz.color.paper};
  box-shadow: ${menuShadow};
  ${thinScrollbar}
 }

 /* Square off the side that meets the level 3 panel */
 .mega-panel.is-joined {
  border-radius: 16px 0 0 16px;
  border-right-color: ${({ theme }) => theme.tz.color.lineSoft};
 }

 .title-link,
 .child-link {
  color: inherit;
  font-weight: 600;
  display: block;
  padding: 0.5rem 0px;
 }

 .child-link {
  font-weight: 400;
 }

 .mega-menu-content {
  padding: 0.5rem 0px;
  margin-left: 1rem;
  border-radius: 4px;
  background-color: ${getTheme("colors.body.paper")};
  box-shadow: ${getTheme("shadows.6")};
  transition: all 250ms ease-in-out;
 }
`;

export const StyledMegaMenuItem = styled.div`
 .menu-item-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0px 1rem;
  height: 40px;
  min-width: 278px;
  white-space: pre;
  transition: all 250ms ease-in-out;
  color: ${getTheme("colors.text.primary")};

  .title {
   padding-left: 0.75rem;
   flex-grow: 1;
  }
 }

 &:hover {
  .menu-item-link {
   color: ${getTheme("colors.primary.main")};
   background: ${getTheme("colors.primary.light")};
  }
 }
`;
