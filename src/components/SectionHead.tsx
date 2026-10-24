"use client";

import Link from "next/link";
import styled from "styled-components";
import Icon from "./icon/Icon";

// Shared look for home section headers: title on the left, extras and "View all" on the right

export const SectionHeadRow = styled.div`
 display: flex;
 flex-wrap: wrap;
 align-items: center;
 justify-content: space-between;
 gap: 12px 16px;
 margin-bottom: 20px;

 .section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 22px;
  font-weight: 600;
  line-height: 1.2;
  color: ${({ theme }) => theme.tz.color.ink};
 }

 .section-extras {
  display: flex;
  align-items: center;
  gap: 16px;
 }

 /* OT sections pass their own "View all" markup */
 .ot-see-more {
  ul {
   margin: 0;
   padding: 0;
   list-style: none;
  }

  a,
  a * {
   font-size: 14px;
   font-weight: 600;
   color: ${({ theme }) => theme.tz.color.emberDeep} !important;
  }
 }

 @media (max-width: 650px) {
  .section-title {
   font-size: 19px;
  }
 }
`;

const StyledViewAll = styled(Link)`
 display: inline-flex;
 align-items: center;
 gap: 6px;
 padding: 6px 0;
 font-size: 14px;
 font-weight: 600;
 color: ${({ theme }) => theme.tz.color.emberDeep};

 .view-all-arrow {
  display: inline-flex;
  transition: transform ${({ theme }) => theme.tz.motion.fast};
 }

 &:hover {
  color: ${({ theme }) => theme.tz.color.emberDark};

  .view-all-arrow {
   transform: translateX(3px);
  }
 }
`;

export function ViewAllLink({ href }: { href: string }) {
 return (
  <StyledViewAll href={href}>
   View all
   <span className="view-all-arrow">
    <Icon size="11px" defaultcolor="currentColor">
     right-arrow
    </Icon>
   </span>
  </StyledViewAll>
 );
}
