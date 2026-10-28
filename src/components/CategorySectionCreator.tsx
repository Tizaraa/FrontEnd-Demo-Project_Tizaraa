import { ReactNode } from "react";

import Box from "./Box";
import Container from "./Container";
import CategorySectionHeader from "./CategorySectionHeader";

// =======================================================
export interface CategorySectionCreatorProps {
 title?: string;
 iconName?: string;
 children: ReactNode;
 seeMoreLink?: string;
}
// =======================================================

export default function CategorySectionCreator({
 title,
 iconName,
 children,
 seeMoreLink,
}: CategorySectionCreatorProps) {
 return (
  <Box mb="3rem">
   <Container pb="1rem">
    {title && (
     <CategorySectionHeader
      title={title}
      iconName={iconName}
      seeMoreLink={seeMoreLink}
     />
    )}

    {children}
   </Container>
  </Box>
 );
}
