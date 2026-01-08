"use client"; // Add this line at the top
import Box from "@component/Box";
// import SearchResult from "./CountryList";
import { useEffect } from "react";
import CountryList from "../CountryList";

export default function ProductSearchResult() {
 return (
  <Box pt="20px">
   {/* <SearchResult sortOptions={sortOptions} slug={slug} /> */}
   <CountryList></CountryList>
  </Box>
 );
}
