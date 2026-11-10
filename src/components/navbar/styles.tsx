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

 /* All Categories: solid navy, icon tile, arrow turns on hover */
 .nav-cat {
  padding: 0 14px 0 6px;
  border-radius: 12px;
  background: linear-gradient(135deg, ${({ theme }) => theme.tz.color.navy}, #164a85);
  color: #fff;
  box-shadow: 0 4px 12px rgba(14, 52, 96, 0.22);
  transition: box-shadow 200ms ease, transform 200ms ease;

  &:hover {
   transform: translateY(-1px);
   box-shadow: 0 8px 18px rgba(14, 52, 96, 0.28);
  }
  .dropdown-icon {
   color: rgba(255, 255, 255, 0.8);
   transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  &:hover .dropdown-icon {
   transform: rotate(90deg);
  }
 }
 .nav-cat-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: ${({ theme }) => theme.tz.color.ember};
  color: #fff;
 }

 .nav-action {
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  margin-left: 4px;
  padding: 0 14px;
  border-radius: 10px;
  background: transparent;
  color: ${({ theme }) => theme.tz.color.inkSoft};
  font-size: 14px;
  transition: background-color 180ms ease, color 180ms ease, border-color 180ms ease;

  /* underline grows from the centre */
  &::after {
   content: "";
   position: absolute;
   left: 14px;
   right: 14px;
   bottom: 4px;
   height: 2px;
   border-radius: 2px;
   background: ${({ theme }) => theme.tz.color.ember};
   transform: scaleX(0);
   transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover:enabled {
   color: ${({ theme }) => theme.tz.color.emberDeep};
  }
  &:hover:enabled::after {
   transform: scaleX(1);
  }
  &:hover:enabled .nav-action-icon {
   transform: translateY(-2px);
  }
  &:focus-visible {
   outline: none;
   box-shadow: ${({ theme }) => theme.tz.focusRing};
  }
 }

 /* Become A Seller: outlined ember pill */
 .nav-action--cta {
  margin-right: 6px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.ember};
  border-radius: 999px;
  color: ${({ theme }) => theme.tz.color.emberDeep};

  &::after {
   display: none;
  }
  &:hover:enabled {
   background: ${({ theme }) => theme.tz.color.emberDeep};
   border-color: ${({ theme }) => theme.tz.color.emberDeep};
   color: #fff;
  }
  &:hover:enabled .nav-action-icon {
   color: #fff;
  }
 }

 .nav-action-icon {
  display: flex;
  margin-right: 8px;
  color: ${({ theme }) => theme.tz.color.ember};
  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1), color 180ms ease;
 }

 @media (prefers-reduced-motion: reduce) {
  .nav-cat,
  .nav-cat .dropdown-icon,
  .nav-action,
  .nav-action::after,
  .nav-action-icon {
   transition: none;
  }
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
