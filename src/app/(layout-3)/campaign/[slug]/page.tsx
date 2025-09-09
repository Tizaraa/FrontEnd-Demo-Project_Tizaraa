// "use client"; // Add this line at the top
// import Box from "@component/Box";
// import { useEffect } from "react";
// import FlashSale from "./campaign";

// interface Props {
//   params: { slug: string };
// }

// export default function ProductSearchResult({ params }: Props) {
//   const { slug } = params;

//   // useEffect(() => {
//   //   console.log("Slug:", slug); // Should log the slug
//   // }, [slug]);

//   return (
//     <Box pt="20px">
//       <FlashSale sortOptions={sortOptions} slug={slug} />
//     </Box>
//   );
// }

// const sortOptions = [
//   { label: "Latest", value: "Latest" },
//   { label: "Price Low to High", value: "1" },
//   { label: "Price High to Low", value: "2" }
// ];

"use client";
import Box from "@component/Box";
import { Suspense } from "react";
import Campaign from "./campaign";

interface Props {
  params: { slug: string };
}

// Wrapper component to handle Suspense for useSearchParams
function CampaignContent({ params }: Props) {
  const { slug } = params;

  return (
    <Box pt="20px">
      <Campaign sortOptions={sortOptions} slug={slug} />
    </Box>
  );
}

export default function ProductSearchResult({ params }: Props) {
  return (
    <Suspense fallback={<Box pt="20px">Loading campaign...</Box>}>
      <CampaignContent params={params} />
    </Suspense>
  );
}

const sortOptions = [
  { label: "Latest", value: "Latest" },
  { label: "Price Low to High", value: "1" },
  { label: "Price High to Low", value: "2" },
];
