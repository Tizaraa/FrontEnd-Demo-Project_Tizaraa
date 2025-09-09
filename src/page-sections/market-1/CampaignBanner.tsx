import Link from "next/link";

import Grid from "@component/grid/Grid";
import Container from "@component/Container";
import NextImage from "@component/NextImage";
// IMAGES
import banner1 from "../../../public/assets/images/banners/banner-1.png";
import banner2 from "../../../public/assets/images/banners/banner-2.png";
import CampaignProducts from "../../../public/assets/images/banners/99.png"

export default function CampaignBanner() {
  return (
    <Container mb="50px">
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
      <Link href="/campaign/campaign">
            <NextImage
             alt="CampaignProductsBanner" 
             src={CampaignProducts}
             priority />
           

          </Link>
    </Container>
  );
}
