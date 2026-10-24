import styled from "styled-components";
import { layoutConstant } from "utils/constants";
import { getTheme } from "@utils/utils";

const StyledHeader = styled.header`
 z-index: 111;
 position: relative;
 height: ${layoutConstant.headerHeight};
 background: ${getTheme("colors.body.paper")};
 border-bottom: 1px solid ${({ theme }) => theme.tz.color.line};
 transition: box-shadow ${({ theme }) => theme.tz.motion.base};

 &.scrolled {
  box-shadow: ${({ theme }) => theme.tz.elevation.raised};
  border-bottom-color: transparent;
 }

 .header-icon-btn {
  transition: background-color ${({ theme }) => theme.tz.motion.fast};
  &:hover {
   background: ${({ theme }) => theme.tz.color.emberTint};
  }
 }

 .logo {
  img {
   display: block;
  }
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
`;

export default StyledHeader;
