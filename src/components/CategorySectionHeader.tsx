"use client";

import Icon from "./icon/Icon";
import { SectionHeadRow, ViewAllLink } from "./SectionHead";

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
  <SectionHeadRow>
   <h2 className="section-title">
    {iconName && <Icon color="primary">{iconName}</Icon>}
    {title}
   </h2>

   {seeMoreLink && <ViewAllLink href={seeMoreLink} />}
  </SectionHeadRow>
 );
}
