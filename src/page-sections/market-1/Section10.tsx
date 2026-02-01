"use client";
import Link from "next/link";
import Box from "@component/Box";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import Container from "@component/Container";
import Typography from "@component/Typography";
import CategorySectionHeader from "@component/CategorySectionHeader";
import ApiBaseUrl from "../../api/ApiBaseUrl";
import Image from "next/image";
import useFetcher from "@hook/useFetcher";

// ============================================================

type Category = {
 id: number;
 categorie_name: string;
 categorie_image: string;
 categorie_name_slug: string;
};
// ============================================================

export default function Section10() {
 const { data: categories } = useFetcher(`frontend/home/categorie/all`);

 return (
  <Container
   mb={{ xs: "40px", sm: "50px", md: "60px", lg: "70px" }}
   // px={{ xs: "1rem", sm: "1.5rem", md: "2rem" }}
  >
   <CategorySectionHeader title="Categories" iconName="categories" />

   <Grid container spacing={6}>
    {categories?.map((item) => (
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
