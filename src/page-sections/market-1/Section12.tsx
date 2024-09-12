// import Card from "@component/Card";
// import Grid from "@component/grid/Grid";
// import Icon from "@component/icon/Icon";
// import FlexBox from "@component/FlexBox";
// import Container from "@component/Container";
// import { H4, SemiSpan } from "@component/Typography";
// import Service from "@models/service.model";

// // ==================================================
// type Props = { serviceList: Service[] };
// // ==================================================

// export default function Section12({ serviceList }: Props) {
//   return (
//     <Container mb="70px">
//       <Grid container spacing={6}>
//         {serviceList.map((item) => (
//           <Grid item lg={3} md={6} xs={12} key={item.id}>
//             <FlexBox
//               p="3rem"
//               as={Card}
//               hoverEffect
//               height="100%"
//               borderRadius={8}
//               boxShadow="border"
//               alignItems="center"
//               flexDirection="column">
//               <FlexBox
//                 size="64px"
//                 bg="gray.200"
//                 alignItems="center"
//                 borderRadius="300px"
//                 justifyContent="center">
//                 <Icon color="secondary" size="1.75rem">
//                   {item.icon}
//                 </Icon>
//               </FlexBox>

//               <H4 mt="20px" mb="10px" textAlign="center">
//                 {item.title}
//               </H4>

//               <SemiSpan textAlign="center">{item.description}</SemiSpan>
//             </FlexBox>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import Container from "@component/Container";
import { H4, SemiSpan } from "@component/Typography";
import Image from "@component/Image";
import CategorySectionCreator from "@component/CategorySectionCreator";
import { marginTop } from "styled-system";

type Service = {
  id: number;
  location: string;
  image: string; // Assuming the icon here will be the image URL after fetching
};

export default function Section12() {
  const [serviceList, setServiceList] = useState<Service[]>([]);

  // Fetch data from the API
  useEffect(() => {
    fetch("https://seller.tizaraa.com/api/frontend/country/product/flag")
      .then((response) => response.json())
      .then((data) => {
        setServiceList(data);
      })
      .catch((error) => {
        console.error("Error fetching service list:", error);
      });
  }, []);

  return (
   <div  style={{ marginTop: '70px' }}>
     <CategorySectionCreator title="Find products by country or region" seeMoreLink="#">
  <Grid container spacing={0} >
    {serviceList.map((item) => (
      <Grid item lg={2} md={2} sm={4} xs={6} key={item.id} style={{ textAlign: 'center' }}>
        <Image src={item.image} alt={item.location} width={64} height={64} />
        <H4 mt="10px" mb="5px" textAlign="center">
          {item.location}
        </H4>
      </Grid>
    ))}
  </Grid>
</CategorySectionCreator>

   </div>
  );
}
