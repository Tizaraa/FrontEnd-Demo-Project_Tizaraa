import { ReactNode } from "react";
import Box from "./Box";
import Container from "./Container";
import CategorySectionHeader from "./CategorySectionHeader";
import FlexBox from "./FlexBox";

interface OTsectioncreatorProps {
  title: string;
  seeMoreLink: ReactNode; 
  children: ReactNode;
}

const OTsectioncreator: React.FC<OTsectioncreatorProps> = ({ title, seeMoreLink , children}) => {
  return (
    <Box mb="3.75rem">
    <Container pb="1rem">
      <FlexBox justifyContent="space-between" alignItems="center">
        <CategorySectionHeader title={title} />
        {seeMoreLink}
      </FlexBox>
      {children}
    </Container>
  </Box>
  );
};

export default OTsectioncreator;
