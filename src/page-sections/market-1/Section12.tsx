"use client";

import Grid from "@component/grid/Grid";
import CategorySectionCreator from "@component/CategorySectionCreator";
import { H4 } from "@component/Typography";
import React from "react";
import Link from "next/link";
import Image from "next/image"; // ← prefer next/image
import useFetcher from "@hook/useFetcher";
import Box from "@component/Box";
import styled, { keyframes } from "styled-components";

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
// Styles
// ──────────────────────────────────────────────
const rise = keyframes`
 from { opacity: 0; transform: translateY(10px); }
 to { opacity: 1; transform: none; }
`;
const shimmer = keyframes`
 from { background-position: -300px 0; }
 to { background-position: 300px 0; }
`;

const CountryWrap = styled.div`
 .country-link {
  display: block;
  height: 100%;
  border-radius: 16px;
 }
 .country-link:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 .country-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  height: 100%;
  padding: 18px 10px 14px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 16px;
  background: ${({ theme }) => theme.tz.color.paper};
  box-shadow: ${({ theme }) => theme.tz.elevation.rest};
  animation: ${rise} 380ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(min(var(--i, 0), 12) * 40ms);
  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 220ms ease, border-color 180ms ease;
 }

 .country-flag {
  position: relative;
  width: 88px;
  height: 58px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 10px;
  background: ${({ theme }) => theme.tz.color.mist};
  transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
 }

 .country-name {
  margin: 0;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 14px;
  font-weight: 700;
  line-height: 1.3;
  color: ${({ theme }) => theme.tz.color.ink};
  transition: color 180ms ease;
 }

 .country-link:hover .country-card,
 .country-link:focus-visible .country-card {
  transform: translateY(-4px);
  border-color: #f6b9a3;
  box-shadow: 0 14px 30px rgba(14, 52, 96, 0.1);
 }
 .country-link:hover .country-flag,
 .country-link:focus-visible .country-flag {
  transform: scale(1.05);
 }
 .country-link:hover .country-name,
 .country-link:focus-visible .country-name {
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .country-link:active .country-card {
  transform: translateY(-1px);
 }

 .country-skeleton {
  height: 118px;
  border-radius: 16px;
  background: linear-gradient(
   90deg,
   ${({ theme }) => theme.tz.color.lineSoft} 0%,
   ${({ theme }) => theme.tz.color.mist} 50%,
   ${({ theme }) => theme.tz.color.lineSoft} 100%
  );
  background-size: 600px 100%;
  animation: ${shimmer} 1.2s linear infinite;
 }

 @media (max-width: 767px) {
  .country-name {
   font-size: 13px;
  }
 }

 ${({ theme }) => theme.tz.media.reducedMotion} {
  .country-card,
  .country-skeleton {
   animation: none;
  }
  .country-card,
  .country-flag,
  .country-name {
   transition: none;
  }
  .country-link:hover .country-card,
  .country-link:focus-visible .country-card,
  .country-link:active .country-card,
  .country-link:hover .country-flag,
  .country-link:focus-visible .country-flag {
   transform: none;
  }
 }
`;

// ──────────────────────────────────────────────
// Skeleton Item
// ──────────────────────────────────────────────
function CountrySkeleton() {
 return (
  <Grid item lg={2} md={2} sm={4} xs={6}>
   <div className="country-skeleton" aria-hidden="true" />
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
  <Box mt="1rem">
   <CategorySectionCreator
    title="Find products by country"
    seeMoreLink="/countryList/CountryList"
   >
    <CountryWrap>
     <Grid container spacing={2}>
      {isLoading ? (
       [1, 2, 3, 4, 5, 6].map((i) => <CountrySkeleton key={`skeleton-${i}`} />)
      ) : countries.length > 0 ? (
       countries.map((country, index) => (
        <Grid item lg={2} md={2} sm={4} xs={6} key={country.id}>
         <Link
          href={`/country/${encodeURIComponent(country.location_slug)}`}
          className="country-link"
         >
          <div className="country-card" style={{ "--i": index } as React.CSSProperties}>
           <div className="country-flag">
            <Image
             src={country.image}
             alt={`${country.location} flag`}
             fill
             sizes="(max-width: 600px) 120px, 100px"
             style={{ objectFit: "cover" }}
             placeholder="blur"
             blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAErgJ9aA9l9gAAAABJRU5ErkJggg==" // low quality placeholder
            />
           </div>

           <H4 className="country-name">{country.location}</H4>
          </div>
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
    </CountryWrap>
   </CategorySectionCreator>
  </Box>
 );
}
