"use client";

import Link from "next/link";
import styled from "styled-components";

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
   transform: translateX(4px);
  }
 }
 &:focus-visible {
  outline: none;
  border-radius: 4px;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 ${({ theme }) => theme.tz.media.reducedMotion} {
  .view-all-arrow {
   transition: none;
  }
  &:hover .view-all-arrow {
   transform: none;
  }
 }
`;

export function ViewAllLink({ href }: { href: string }) {
 return (
  <StyledViewAll href={href}>
   View all
   <span className="view-all-arrow">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
     <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
   </span>
  </StyledViewAll>
 );
}
