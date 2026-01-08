// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// import Box from "@component/Box";
// import Card from "@component/Card";
// import Grid from "@component/grid/Grid";
// import Container from "@component/Container";
// import Typography from "@component/Typography";
// import CategorySectionHeader from "@component/CategorySectionHeader";

// import ApiBaseUrl from "../../api/ApiBaseUrl";
// import Image from "next/image";

// // ============================================================

// type Category = {
//   id: number;
//   categorie_name: string;
//   categorie_image: string;
//   categorie_name_slug: string;
// };
// // ============================================================

// export default function Section10() {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     // Fetch categories from the API
//     // fetch("https://seller.tizaraa.com/api/frontend/home/categorie/all")

//     fetch (`${ApiBaseUrl.baseUrl}frontend/home/categorie/all`)
//       .then((response) => response.json())
//       .then((data) => {
//         // console.log("Fetched categories:", data);
//         setCategories(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching categories:", error);
//       });
//   }, []);

//   return (
//     <Container mb="70px">
//       <CategorySectionHeader title="Categories" iconName="categories" />

//       <Grid container spacing={6}>
//         {categories.map((item) => (
//           <Grid
//             item
//             lg={2}
//             md={3}
//             sm={4}
//             xs={6}
//             key={item.id}
//           >
//             {/* <Link href={`/categoryPage/${item.id}/${item.categorie_name_slug}`}> */}
//             {/* <Link href={`/categoryPage/${item.id}/${item.categorie_name_slug}`}> */}

//             <Link href={`/category/${item.categorie_name_slug}`}>

//               <Card
//                 hoverEffect
//                 p="1rem"
//                 textAlign="center"
//                 borderRadius={8}
//                 boxShadow="small"
//                 alignItems="center"
//                 height={200} // Fixed card height to ensure consistency across all boxes
//               >
//                 <Box
//                   height={120} // Fixed height for the box
//                   // width={120}
//                   display="flex"
//                   justifyContent="center"
//                   alignItems="center"
//                   margin="0 auto"
//                 >
//                   {/* <img
//                     // src={item.categorie_image}
//                     src={`${ApiBaseUrl.ImgUrl}${item.categorie_image}`}
//                     alt={item.categorie_name}
//                     style={{ width: "100%", height: "100%", objectFit: "contain" }} // Image scaled up, centered within the box
//                   /> */}

//                       {/* image cache  */}
//                 <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden" }}>
//                     <Image
//                       src={`${ApiBaseUrl.ImgUrl}${item.categorie_image}`}
//                       alt={item.categorie_name}
//                       layout="responsive"
//                       width={1}
//                       height={1}
//                       objectFit="contain"
//                       style={{ borderRadius: "8px" }}
//                       />

//                 </div>

//                 </Box>

//                 <Typography
//                   fontWeight={600}
//                   fontSize={14}
//                   mt="0.75rem"
//                   noWrap // Prevents text from wrapping into multiple lines, keeping the box height consistent
//                 >
//                   {item.categorie_name}
//                 </Typography>
//               </Card>
//             </Link>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Box from "@component/Box";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import Container from "@component/Container";
import Typography from "@component/Typography";
import CategorySectionHeader from "@component/CategorySectionHeader";

import ApiBaseUrl from "../../api/ApiBaseUrl";
import Image from "next/image";

// ============================================================

type Category = {
 id: number;
 categorie_name: string;
 categorie_image: string;
 categorie_name_slug: string;
};
// ============================================================

export default function Section10() {
 const [categories, setCategories] = useState([]);

 useEffect(() => {
  // Fetch categories from the API
  fetch(`${ApiBaseUrl.baseUrl}frontend/home/categorie/all`)
   .then((response) => response.json())
   .then((data) => {
    setCategories(data);
   })
   .catch((error) => {
    console.error("Error fetching categories:", error);
   });
 }, []);

 return (
  <Container
   mb={{ xs: "40px", sm: "50px", md: "60px", lg: "70px" }}
   // px={{ xs: "1rem", sm: "1.5rem", md: "2rem" }}
  >
   <CategorySectionHeader title="Categories" iconName="categories" />

   <Grid container spacing={6}>
    {categories.map((item) => (
     <Grid item lg={2} md={3} sm={4} xs={6} key={item.id}>
      <Link href={`/category/${item.categorie_name_slug}`}>
       <Card
        hoverEffect
        p={{ xs: "0.75rem", sm: "1rem", md: "1.25rem" }}
        textAlign="center"
        borderRadius={8}
        boxShadow="small"
        alignItems="center"
        height={{ xs: "160px", sm: "180px", md: "200px", lg: "220px" }}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
       >
        <Box
         height={{ xs: "80px", sm: "100px", md: "120px", lg: "140px" }}
         width="100%"
         display="flex"
         justifyContent="center"
         alignItems="center"
         margin="0 auto"
         mb={{ xs: "0.5rem", sm: "0.75rem" }}
        >
         <div
          style={{
           position: "relative",
           width: "100%",
           height: "100%",
           borderRadius: "8px",
           overflow: "hidden",
          }}
         >
          <Image
           src={`${ApiBaseUrl.ImgUrl}${item.categorie_image}`}
           alt={item.categorie_name}
           fill
           sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
           style={{
            objectFit: "contain",
            borderRadius: "8px",
           }}
           priority={false}
          />
         </div>
        </Box>

        <Typography
         fontWeight={600}
         fontSize={{ xs: "12px", sm: "13px", md: "14px", lg: "15px" }}
         lineHeight={{ xs: 1.3, sm: 1.4 }}
         textAlign="center"
         sx={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          minHeight: { xs: "32px", sm: "36px" }, // Consistent height for text area
         }}
        >
         {item.categorie_name}
        </Typography>
       </Card>
      </Link>
     </Grid>
    ))}
   </Grid>
  </Container>
 );
}
