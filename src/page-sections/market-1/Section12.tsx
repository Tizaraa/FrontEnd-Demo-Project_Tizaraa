"use client";

import Grid from "@component/grid/Grid";
import CategorySectionCreator from "@component/CategorySectionCreator";
import { H4 } from "@component/Typography";
import Link from "next/link";
import Image from "next/image"; // ← prefer next/image
import useFetcher from "@hook/useFetcher";
import Box from "@component/Box";

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────
type CountryItem = {
 id: number;
 location: string;
 image: string; // full URL expected
 location_slug: string;
};

// ──────────────────────────────────────────────
// Skeleton Item
// ──────────────────────────────────────────────
function CountrySkeleton() {
 return (
  <Grid item lg={2} md={2} sm={4} xs={6}>
   <Box textAlign="center" py="0.5rem">
    {/* Flag / image placeholder */}
    <Box
     width={100}
     height={64}
     mx="auto"
     borderRadius={8}
     backgroundColor="#e0e0e0"
     mb="12px"
    />
   </Box>
  </Grid>
 );
}

// ──────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────
export default function Section12() {
 const { data, isLoading } = useFetcher(`product/country/flag`);
 const countries: CountryItem[] = data?.country || [];

 return (
  <Box mt="70px">
   <CategorySectionCreator
    title="Find products by country"
    seeMoreLink="/countryList/CountryList"
   >
    <Grid container spacing={2}>
     {isLoading ? (
      [1, 2, 3, 4, 5, 6].map((i) => <CountrySkeleton key={`skeleton-${i}`} />)
     ) : countries.length > 0 ? (
      countries.map((country) => (
       <Grid item lg={2} md={2} sm={4} xs={6} key={country.id}>
        <Link href={`/country/${encodeURIComponent(country.location_slug)}`}>
         <Box textAlign="center" py="0.5rem">
          <Box position="relative" width={100} height={64} mx="auto" mb="12px">
           <Image
            src={country.image}
            alt={`${country.location} flag`}
            fill
            sizes="(max-width: 600px) 120px, 100px"
            style={{ objectFit: "cover", borderRadius: "8px" }}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAErgJ9aA9l9gAAAABJRU5ErkJggg==" // low quality placeholder
           />
          </Box>

          <H4
           fontSize={{ xs: "14px", sm: "15px", md: "16px" }}
           fontWeight={600}
           lineHeight={1.3}
           mb={0}
          >
           {country.location}
          </H4>
         </Box>
        </Link>
       </Grid>
      ))
     ) : (
      // ─── Empty state ───
      <Grid item xs={12}>
       <Box textAlign="center" py="40px" color="text.muted">
        <H4 fontSize="18px" mb="8px">
         No countries available
        </H4>
        <p>Check back later or explore other categories.</p>
       </Box>
      </Grid>
     )}
    </Grid>
   </CategorySectionCreator>
  </Box>
 );
}
