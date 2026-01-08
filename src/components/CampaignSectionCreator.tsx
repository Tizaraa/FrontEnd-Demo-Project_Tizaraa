import { ReactNode } from "react";

import Box from "./Box";
import Container from "./Container";
import CampaignSectionHeader from "./CampaignSectionHeader";

// =======================================================
export interface CampaignSectionCreatorProps {
 title?: string;
 iconName?: string;
 children: ReactNode;
 seeMoreLink?: string;
 endTime?: string;
}
// =======================================================

export default function CampaignSectionCreator({
 title,
 iconName,
 children,
 seeMoreLink,
 endTime,
}: CampaignSectionCreatorProps) {
 return (
  <Box mb="3.75rem">
   <Container pb="1rem">
    {title && (
     <CampaignSectionHeader
      title={title}
      iconName={iconName}
      seeMoreLink={seeMoreLink}
      endTime={endTime}
     />
    )}

    {children}
   </Container>
  </Box>
 );
}
