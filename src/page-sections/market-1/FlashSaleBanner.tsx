import Link from "next/link";

import Grid from "@component/grid/Grid";
import Container from "@component/Container";
import NextImage from "@component/NextImage";
// IMAGES

import FlasSaleBanner from "../../../public/assets/images/banners/Flash_sale_banner.webp"

export default function FlashSaleBanner() {
  return (
    <Container mb="70px">
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
      <Link href="/flashsale/flash_sale">
            <NextImage
             alt="flashSaleBanner"
              src={FlasSaleBanner}
              priority />
          </Link>
    </Container>
  );
}
