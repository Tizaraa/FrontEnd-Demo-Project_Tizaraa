"use client";

import Link from "next/link";

import Icon from "./icon/Icon";
import FlexBox from "./FlexBox";
import { H2, H3, H4, H5, SemiSpan } from "./Typography";

// ==============================================================
export interface CategorySectionHeaderProps {
 title?: string;
 iconName?: string;
 seeMoreLink?: string;
}
// ==============================================================

export default function CategorySectionHeader({
 title,
 iconName,
 seeMoreLink,
}: CategorySectionHeaderProps) {
 return (
  <FlexBox justifyContent="space-between" alignItems="center" mb="1.5rem">
   <FlexBox alignItems="center">
    {iconName && (
     <Icon mr="0.5rem" color="primary">
      {iconName}
     </Icon>
    )}
    <H3 fontWeight="bold" lineHeight="``1">
     {title}
    </H3>
   </FlexBox>

   {seeMoreLink && (
    <Link href={seeMoreLink}>
     <FlexBox alignItems="center" ml="0.5rem" color="text.muted">
      <SemiSpan mr="0.5rem">View all</SemiSpan>
      <Icon size="10px" defaultcolor="currentColor">
       right-arrow
      </Icon>
     </FlexBox>
    </Link>
   )}
  </FlexBox>
 );
}
