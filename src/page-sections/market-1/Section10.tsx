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
    // fetch("https://seller.tizaraa.com/api/frontend/home/categorie/all")

    fetch (`${ApiBaseUrl.baseUrl}frontend/home/categorie/all`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("Fetched categories:", data); 
        setCategories(data); 
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <Container mb="70px">
      <CategorySectionHeader title="Categories" iconName="categories" />

      <Grid container spacing={6}>
        {categories.map((item) => (
          <Grid 
            item 
            lg={2} 
            md={3} 
            sm={4} 
            xs={6} 
            key={item.id}
          >
            {/* <Link href={`/categoryPage/${item.id}/${item.categorie_name_slug}`}> */}
            {/* <Link href={`/categoryPage/${item.id}/${item.categorie_name_slug}`}> */}

            <Link href={`/category/${item.categorie_name_slug}`}>

              <Card
                hoverEffect
                p="1rem"
                textAlign="center"
                borderRadius={8}
                boxShadow="small"
                alignItems="center"
                height={200} // Fixed card height to ensure consistency across all boxes
              >
                <Box 
                  height={120} // Fixed height for the box
                  // width={120}
                  display="flex" 
                  justifyContent="center" 
                  alignItems="center"
                  margin="0 auto"
                >
                  {/* <img 
                    // src={item.categorie_image} 
                    src={`${ApiBaseUrl.ImgUrl}${item.categorie_image}`}
                    alt={item.categorie_name} 
                    style={{ width: "100%", height: "100%", objectFit: "contain" }} // Image scaled up, centered within the box
                  /> */}

                      {/* image cache  */}
                <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden" }}>
                    <Image
                      src={`${ApiBaseUrl.ImgUrl}${item.categorie_image}`}
                      alt={item.categorie_name} 
                      layout="responsive" 
                      width={1} 
                      height={1} 
                      objectFit="contain" 
                      style={{ borderRadius: "8px" }}
                      />
                                  
                </div>


                </Box>

                <Typography 
                  fontWeight={600} 
                  fontSize={14} 
                  mt="0.75rem"
                  noWrap // Prevents text from wrapping into multiple lines, keeping the box height consistent
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
