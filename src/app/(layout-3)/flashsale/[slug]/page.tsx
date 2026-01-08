"use client"; // Add this line at the top
import Box from "@component/Box";
import { useEffect } from "react";
import FlashSale from "./flash_sale";

interface Props {
 params: { slug: string };
}

export default function ProductSearchResult({ params }: Props) {
 const { slug } = params;

 // useEffect(() => {
 //   console.log("Slug:", slug); // Should log the slug
 // }, [slug]);

 return (
  <Box pt="20px">
   <FlashSale sortOptions={sortOptions} slug={slug} />
  </Box>
 );
}

const sortOptions = [
 { label: "Latest", value: "Latest" },
 { label: "Price Low to High", value: "1" },
 { label: "Price High to Low", value: "2" },
];
