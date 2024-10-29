import Link from "next/link";

import Box from "@component/Box";
import Image from "@component/Image";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import AppStore from "@component/AppStore";
import Container from "@component/Container";
import Typography, { Paragraph } from "@component/Typography";

// STYLED COMPONENTS
import { StyledLink } from "./styles";
// CUSTOM DATA
import { aboutLinks, customerCareLinks, customerCareLink, iconList } from "./data";

export default function Footer1() {
  return (
    <footer>
      {/* #0F3460  */}
      <Box bg="#656844 ">
        <Container p="1rem" color="white">
          <Box py="5rem" overflow="hidden">
            <Grid container spacing={6}>
              <Grid item lg={2} md={3} sm={6} xs={12}>
                <Typography
                  mb="1.25rem"
                  lineHeight="1"
                  fontSize="18px"
                  fontWeight="600"
                  style={{ whiteSpace: "nowrap" }} // Prevents breaking into multiple lines
                >
                  Customer Services
                </Typography>
                <div>
                  {aboutLinks.map((item, ind) => (
                    <StyledLink href="/" key={ind}>
                      {item}
                    </StyledLink>
                  ))}
                </div>
              </Grid>

              <Grid item lg={2} md={3} sm={6} xs={12}>
                <Typography
                  mb="1.25rem"
                  lineHeight="1"
                  fontSize="18px"
                  fontWeight="600"
                  style={{ whiteSpace: "nowrap" }} // Prevents breaking into multiple lines
                >
                  Tizaraa
                </Typography>
                <div>
                  {customerCareLinks.map((item, ind) => (
                    <StyledLink href="/" key={ind}>
                      {item}
                    </StyledLink>
                  ))}
                </div>
              </Grid>

              <Grid item lg={2} md={3} sm={6} xs={12}>
                <Typography
                  mb="1.25rem"
                  lineHeight="1"
                  fontSize="18px"
                  fontWeight="600"
                  style={{ whiteSpace: "nowrap" }} // Prevents breaking into multiple lines
                >
                  Earn With Tizaraa
                </Typography>
                <div>
                  {customerCareLink.map((item, ind) => (
                    <StyledLink href="/" key={ind}>
                      {item}
                    </StyledLink>
                  ))}
                </div>
              </Grid>

              <Grid item lg={2} md={3} sm={6} xs={12}>
                <Typography
                  mb="1.25rem"
                  lineHeight="1"
                  fontSize="18px"
                  fontWeight="600"
                  style={{ whiteSpace: "nowrap" }} // Prevents breaking into multiple lines
                >
                  Trade services
                </Typography>

                <Typography py="0.3rem" color="gray.500">
                  House No: 15A, Road: 35, Gulshan 2, Dhaka 1212, Bangladesh
                </Typography>

                <Typography py="0.3rem" color="gray.500">
                  Email: tizaraabd2023@gmail.com
                </Typography>

                <Typography py="0.3rem" mb="1rem" color="gray.500">
                  Phone: +8801792223444
                </Typography>

                <FlexBox className="flex" mx="-5px">
                  {iconList.map((item) => (
                    <a
                      href={item.url}
                      target="_blank"
                      key={item.iconName}
                      rel="noreferrer noopenner"
                    >
                      <Box
                        m="5px"
                        p="10px"
                        size="small"
                        borderRadius="50%"
                        bg="rgba(0,0,0,0.2)"
                      >
                        <Icon size="12px" defaultcolor="auto">
                          {item.iconName}
                        </Icon>
                      </Box>
                    </a>
                  ))}
                </FlexBox>
              </Grid>

              <Grid item lg={4} md={12} sm={12} xs={12}>
                <Link href="/">
                  <Image
                    alt="logo"
                    mb="1.25rem"
                    src="/assets/images/tizaraa_logo.webp"
                  />
                </Link>

                <Paragraph mb="1.25rem" color="gray.500">
                  Bangladesh's best online shopping store with 11 thousand
                  products at resounding discounts in Dhaka, Chittagong &amp;
                  All across Bangladesh with cash on delivery (COD)
                </Paragraph>

                {/* <AppStore /> */}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
