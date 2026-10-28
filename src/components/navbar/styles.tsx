import { getTheme } from "@utils/utils";
import styled from "styled-components";

const StyledNavbar = styled.div`
 position: relative;
 height: 56px;
 background: ${getTheme("colors.body.paper")};
 border-bottom: 1px solid ${({ theme }) => theme.tz.color.line};

 .categories-btn {
  border-radius: ${({ theme }) => theme.tz.radius.sm}px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  &:hover {
   background: ${({ theme }) => theme.tz.color.lineSoft};
  }
 }

 .nav-action {
  display: flex;
  align-items: center;
  height: 40px;
  margin-left: 4px;
  padding: 0 14px;
  border-radius: ${({ theme }) => theme.tz.radius.sm}px;
  background: transparent;
  color: ${({ theme }) => theme.tz.color.inkSoft};
  font-size: 14px;
  transition: background-color ${({ theme }) => theme.tz.motion.fast},
   color ${({ theme }) => theme.tz.motion.fast};

  &:hover:enabled {
   background: ${({ theme }) => theme.tz.color.emberTint};
   color: ${({ theme }) => theme.tz.color.emberDeep};
  }
 }

 .nav-action-icon {
  display: flex;
  margin-right: 8px;
  color: ${({ theme }) => theme.tz.color.ember};
 }

 .nav-link {
  font-size: 14px;
  /* margin-right: 32px; */
  cursor: pointer;
  &:hover {
   color: ${getTheme("colors.primary.main")};
  }
 }
 .nav-link:last-child {
  margin-right: 0px;
 }

 .root-child {
  display: none;
  position: absolute;
  left: 0;
  top: 100%;
  z-index: 5;
 }
 .root:hover {
  .root-child {
   display: block;
  }
 }

 .child {
  display: none;
  position: absolute;
  top: 0;
  left: 100%;
  z-index: 5;
 }
 .parent:hover > .child {
  display: block;
 }

 .dropdown-icon {
  color: ${getTheme("colors.text.muted")};
 }
 @media only screen and (max-width: 900px) {
  display: none;
 }
`;

export default StyledNavbar;
