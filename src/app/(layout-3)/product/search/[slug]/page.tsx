"use client"; // Add this line at the top
import Box from "@component/Box";
import SearchResult from "./SearchResult";
import { useEffect } from "react";

interface Props {
  params: { slug: string };
}

export default function ProductSearchResult({ params }: Props) {
  const { slug } = params;



  return (
    <Box pt="20px">
      <SearchResult sortOptions={sortOptions} slug={slug} />
    </Box>
  );
}

const sortOptions = [
  { label: "Date", value: "Date" },
  { label: "Price Low to High", value: "1" },
  { label: "Price High to Low", value: "2" }
];
