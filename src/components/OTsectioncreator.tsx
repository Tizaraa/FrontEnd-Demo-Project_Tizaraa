import { ReactNode } from "react";
import Box from "./Box";
import Container from "./Container";
import { SectionHeadRow } from "./SectionHead";

interface OTsectioncreatorProps {
 title: string;
 seeMoreLink: ReactNode;
 children: ReactNode;
}

const OTsectioncreator: React.FC<OTsectioncreatorProps> = ({
 title,
 seeMoreLink,
 children,
}) => {
 return (
  <Box mb="3rem">
   <Container pb="1rem">
    <SectionHeadRow>
     <h2 className="section-title">{title}</h2>
     <div className="section-extras ot-see-more">{seeMoreLink}</div>
    </SectionHeadRow>
    {children}
   </Container>
  </Box>
 );
};

export default OTsectioncreator;
