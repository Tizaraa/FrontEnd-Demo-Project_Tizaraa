"use client";

import Link from "next/link";
import styled from "styled-components";

import Grid from "@component/grid/Grid";
import Container from "@component/Container";
import NextImage from "@component/NextImage";
// IMAGES
import banner1 from "../../../public/assets/images/banners/banner-1.png";
import banner2 from "../../../public/assets/images/banners/banner-2.png";
import NewArrivalsProducts from "../../../public/assets/images/banners/New-arrival_01.jpg";

// Promo banner between home sections: rounded, soft shadow, gentle zoom on hover
export const PromoBannerLink = styled(Link)`
 display: block;
 overflow: hidden;
 border-radius: ${({ theme }) => theme.tz.radius.lg}px;
 box-shadow: ${({ theme }) => theme.tz.elevation.rest};
 transition: box-shadow 220ms ease;

 img {
  display: block;
  transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
 }

 &:hover {
  box-shadow: ${({ theme }) => theme.tz.elevation.raised};
 }
 &:hover img {
  transform: scale(1.03);
 }
 &:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 @media (max-width: 767px) {
  border-radius: ${({ theme }) => theme.tz.radius.md}px;
 }

 ${({ theme }) => theme.tz.media.reducedMotion} {
  transition: none;

  img {
   transition: none;
  }
  &:hover img {
   transform: none;
  }
 }
`;

export default function Section8() {
 return (
  <Container mb="3rem">
   {/* <Grid container >
        <Grid item xs={12} md={4}>
          <Link href="/">
            <NextImage alt="banner" src={banner1} />
          </Link>
        </Grid>

        <Grid item xs={12} md={8}>
          <Link href="/">
            <NextImage alt="banner" src={banner2} />
          </Link>
        </Grid>
      </Grid> */}
   <PromoBannerLink href="/newarrivals/new_arrivals">
    <NextImage alt="newArrivalBanner" src={NewArrivalsProducts} priority />
   </PromoBannerLink>
  </Container>
 );
}
