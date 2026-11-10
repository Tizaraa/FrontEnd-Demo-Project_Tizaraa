import styled, { css, keyframes } from "styled-components";
import { isValidProp } from "@utils/utils";

type StyledCategoryProps = { open: boolean };

type CategoryDropdownProps = {
 open: boolean;
 position?: "absolute" | "relative";
};

// Shared bits for every level of the category menu
export const menuShadow = "0 18px 40px rgba(14, 52, 96, 0.14)";

export const menuIn = keyframes`
 from { opacity: 0; transform: translateY(-6px); }
 to { opacity: 1; transform: translateY(0); }
`;

export const thinScrollbar = css`
 scrollbar-width: thin;
 scrollbar-color: ${({ theme }) => theme.tz.color.line} transparent;

 &::-webkit-scrollbar {
  width: 6px;
  height: 6px;
 }
 &::-webkit-scrollbar-track {
  background: transparent;
 }
 &::-webkit-scrollbar-thumb {
  background: ${({ theme }) => theme.tz.color.line};
  border-radius: 999px;
 }
 &::-webkit-scrollbar-thumb:hover {
  background: ${({ theme }) => theme.tz.color.slate};
 }
`;

export const StyledCategory = styled.div.withConfig({
 shouldForwardProp: (prop: string) => isValidProp(prop),
})<StyledCategoryProps>`
 position: relative;
 .cursor-pointer {
  cursor: pointer;
 }
 .dropdown-icon {
  margin-left: 0.25rem;
  transition: all 250ms ease-in-out;
  transform: rotate(${(props) => (props.open ? "90deg" : "0deg")});
 }

 @media (prefers-reduced-motion: reduce) {
  .dropdown-icon {
   transition: none;
  }
 }
`;

// Level 1: the white card under "All Categories" (always open on home page)
export const StyledCategoryDropdown = styled.div.withConfig({
 shouldForwardProp: (prop: string) => isValidProp(prop),
})<CategoryDropdownProps>`
 box-sizing: border-box;
 left: 0;
 right: auto;
 width: 278px;
 height: 450px;
 padding: 4px 0;
 border-radius: 16px;
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 background-color: ${({ theme }) => theme.tz.color.paper};
 box-shadow: ${menuShadow};
 position: ${({ position }) => position};
 top: ${({ position }) =>
  position === "absolute" ? "calc(100% + 0.7rem)" : "0.5rem"};
 opacity: ${({ open }) => (open ? 1 : 0)};
 visibility: ${({ open }) => (open ? "visible" : "hidden")};
 pointer-events: ${({ open }) => (open ? "auto" : "none")};
 transform: ${({ open }) => (open ? "translateY(0)" : "translateY(-8px)")};
 transition:
  opacity 200ms cubic-bezier(0.2, 0, 0, 1),
  transform 200ms cubic-bezier(0.2, 0, 0, 1),
  visibility 200ms;
 z-index: 98;

 @media (prefers-reduced-motion: reduce) {
  transition: none;
  transform: none;
 }
`;

// One row, used for level 1 and level 2 lists
export const StyledCategoryMenuItem = styled.div`
 & > a {
  display: block;
  margin: 0 6px;
  border-radius: 10px;
  outline: none;
  text-decoration: none;
 }

 .category-dropdown-link {
  position: relative;
  height: 40px;
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 8px;
  padding: 0 10px 0 14px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.tz.color.inkSoft};
  transition:
   background-color 120ms cubic-bezier(0.2, 0, 0, 1),
   color 120ms cubic-bezier(0.2, 0, 0, 1);

  &::before {
   content: "";
   position: absolute;
   left: 0;
   top: 9px;
   bottom: 9px;
   width: 3px;
   border-radius: 0 3px 3px 0;
   background: ${({ theme }) => theme.tz.color.ember};
   transform: scaleY(0);
   transition: transform 160ms cubic-bezier(0.2, 0, 0, 1);
  }

  .cat-thumb {
   display: grid;
   place-items: center;
   width: 26px;
   height: 26px;
   flex-shrink: 0;
   overflow: hidden;
   border: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
   border-radius: 50%;
   background: ${({ theme }) => theme.tz.color.mist};
   color: ${({ theme }) => theme.tz.color.slate};
   font-size: 11px;
   font-weight: 800;
   transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1), border-color 150ms ease;
  }
  .cat-thumb img {
   width: 100%;
   height: 100%;
   object-fit: cover;
   background: #fff;
  }

  .title {
   flex-grow: 1;
   min-width: 0;
   overflow: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;
  }

  .chev {
   flex-shrink: 0;
   color: ${({ theme }) => theme.tz.color.slate};
   transition:
    transform 160ms cubic-bezier(0.2, 0, 0, 1),
    color 120ms cubic-bezier(0.2, 0, 0, 1);
  }
 }

 &:hover > a > .category-dropdown-link,
 &.is-active > a > .category-dropdown-link,
 & > a:focus-visible > .category-dropdown-link {
  color: ${({ theme }) => theme.tz.color.emberDeep};
  background: ${({ theme }) => theme.tz.color.emberTint};

  &::before {
   transform: scaleY(1);
  }

  .chev {
   color: ${({ theme }) => theme.tz.color.emberDeep};
   transform: translateX(3px);
  }

  .cat-thumb {
   transform: scale(1.12);
   border-color: ${({ theme }) => theme.tz.color.ember};
  }
 }

 & > a:focus-visible {
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 &:hover > .mega-menu {
  display: block;
 }

 .non-clickable:hover {
  background: transparent;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }

 @media (prefers-reduced-motion: reduce) {
  .category-dropdown-link,
  .category-dropdown-link::before,
  .category-dropdown-link .chev {
   transition: none;
  }
  &:hover > a > .category-dropdown-link .chev,
  &.is-active > a > .category-dropdown-link .chev,
  & > a:focus-visible > .category-dropdown-link .chev {
   transform: none;
  }
 }
`;
