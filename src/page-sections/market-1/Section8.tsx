import Link from "next/link";

import Grid from "@component/grid/Grid";
import Container from "@component/Container";
import NextImage from "@component/NextImage";
// IMAGES
import banner1 from "../../../public/assets/images/banners/banner-1.png";
import banner2 from "../../../public/assets/images/banners/banner-2.png";
import NewArrivalsProducts from "../../../public/assets/images/banners/New-arrival_01.jpg";

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
   <Link href="/newarrivals/new_arrivals" style={{ display: "block", borderRadius: 12, overflow: "hidden" }}>
    <NextImage alt="newArrivalBanner" src={NewArrivalsProducts} priority />
   </Link>
  </Container>
 );
}
