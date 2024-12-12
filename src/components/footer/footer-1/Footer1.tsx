// import Link from "next/link";

// import Box from "@component/Box";
// import Image from "@component/Image";
// import Grid from "@component/grid/Grid";
// import Icon from "@component/icon/Icon";
// import FlexBox from "@component/FlexBox";
// import AppStore from "@component/AppStore";
// import Container from "@component/Container";
// import Typography, { Paragraph } from "@component/Typography";

// // STYLED COMPONENTS
// import { StyledLink } from "./styles";
// // CUSTOM DATA
// import { aboutLinks, customerCareLinks, customerCareLink, iconList } from "./data";

// export default function Footer1() {
//   return (
//     <footer>
//       {/* #0F3460  */}
//       <Box bg="#656844 ">
//         <Container p="1rem" color="white">
//           <Box py="5rem" overflow="hidden">
//             <Grid container spacing={6}>
//               <Grid item lg={2} md={3} sm={6} xs={12}>
//                 <Typography
//                   mb="1.25rem"
//                   lineHeight="1"
//                   fontSize="18px"
//                   fontWeight="600"
//                   style={{ whiteSpace: "nowrap" }} // Prevents breaking into multiple lines
//                 >
//                   Customer Services
//                 </Typography>
//                 <div>
//                   {aboutLinks.map((item, ind) => (
//                     <StyledLink href="/" key={ind}>
//                       {item}
//                     </StyledLink>
//                   ))}
//                 </div>
//               </Grid>

//               <Grid item lg={2} md={3} sm={6} xs={12}>
//                 <Typography
//                   mb="1.25rem"
//                   lineHeight="1"
//                   fontSize="18px"
//                   fontWeight="600"
//                   style={{ whiteSpace: "nowrap" }} // Prevents breaking into multiple lines
//                 >
//                   Tizaraa
//                 </Typography>
//                 <div>
//                   {customerCareLinks.map((item, ind) => (
//                     <StyledLink href="/" key={ind}>
//                       {item}
//                     </StyledLink>
//                   ))}
//                 </div>
//               </Grid>

//               <Grid item lg={2} md={3} sm={6} xs={12}>
//                 <Typography
//                   mb="1.25rem"
//                   lineHeight="1"
//                   fontSize="18px"
//                   fontWeight="600"
//                   style={{ whiteSpace: "nowrap" }} // Prevents breaking into multiple lines
//                 >
//                   Earn With Tizaraa
//                 </Typography>
//                 <div>
//                   {customerCareLink.map((item, ind) => (
//                     <StyledLink href="/" key={ind}>
//                       {item}
//                     </StyledLink>
//                   ))}
//                 </div>
//               </Grid>

//               <Grid item lg={2} md={3} sm={6} xs={12}>
//                 <Typography
//                   mb="1.25rem"
//                   lineHeight="1"
//                   fontSize="18px"
//                   fontWeight="600"
//                   style={{ whiteSpace: "nowrap" }} // Prevents breaking into multiple lines
//                 >
//                   Trade services
//                 </Typography>

//                 <Typography py="0.3rem" color="gray.500">
//                   House No: 15A, Road: 35, Gulshan 2, Dhaka 1212, Bangladesh
//                 </Typography>


//                 <Typography py="0.3rem" color="gray.500">
//                   <a href="mailto:tizaraabd2023@gmail.com" style={{ textDecoration: 'none', color: 'inherit' }}>
//                   Email: tizaraabd2023@gmail.com
//                   </a>
                 
//                 </Typography>

//                 <Typography py="0.3rem" mb="1rem" color="gray.500">
//                   <a href="tel:+8801792223444" style={{ textDecoration: 'none', color: 'inherit' }}>
//                   Phone: +8801792223444
//                   </a>
                 
//                 </Typography>

//                 <FlexBox className="flex" mx="-5px">
//                   {iconList.map((item) => (
//                     <a
//                       href={item.url}
//                       target="_blank"
//                       key={item.iconName}
//                       rel="noreferrer noopenner"
//                     >
//                       <Box
//                         m="5px"
//                         p="10px"
//                         size="small"
//                         borderRadius="50%"
//                         bg="rgba(0,0,0,0.2)"
//                       >
//                         <Icon size="12px" defaultcolor="auto">
//                           {item.iconName}
//                         </Icon>
//                       </Box>
//                     </a>
//                   ))}
//                 </FlexBox>
//               </Grid>

//               <Grid item lg={4} md={12} sm={12} xs={12}>
//                 <Link href="/">
//                   <Image
//                     alt="logo"
//                     mb="1.25rem"
//                     src="https://frontend.tizaraa.com/public/frontend/assets/img/site-logo/tizaraa-logo.png"
//                   />
//                 </Link>

//                 <Paragraph mb="1.25rem" color="gray.500">
//                   Bangladesh's best online shopping store with 11 thousand
//                   products at resounding discounts in Dhaka, Chittagong &amp;
//                   All across Bangladesh with cash on delivery (COD)
//                 </Paragraph>

//                 {/* <AppStore /> */}
//               </Grid>
//             </Grid>
//           </Box>
//         </Container>
//       </Box>
//     </footer>
//   );
// }


import Link from "next/link";
import Box from "@component/Box";
import Image from "@component/Image";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import Container from "@component/Container";
import Typography, { Paragraph } from "@component/Typography";

// CUSTOM DATA
// export const aboutLinks = ["Terms & Conditions", "Privacy Policy"];
// export const customerCareLinks = [
//   "Help Center",
//   "Track Your Order",
//   "Corporate & Bulk Purchasing",
//   "Returns & Refunds",
// ];
export const aboutLinks = [
  { name: "Help Center", url: "/helpCenter" },
  { name: "How to Buy", url: "/howToBuy" },
  { name: "Tizara Journey", url: "/privacy-policy" }
];

export const customerCareLinks = [
  { name: "About Tizaraa", url: "/help-center" },
  { name: "Tizaraa Blog", url: "/track-order" },
  { name: "Tizaraa Cares", url: "/corporate-purchasing" },
  { name: "Privacy Policy", url: "/returns-refunds" },
];

export const customerCareLink = ["Sell on Tizaraa"];
export const iconList = [
  {
    iconName: "YouTube",
    url: "https://www.youtube.com/@Tizaraa24",
    imgSrc: "/youtube.png",
  },
  {
    iconName: "Instagram",
    url: "https://www.instagram.com/tizaraagroup/?igsh=MXB1b2l1NXN6N2U5dQ%3D%3D#",
    imgSrc: "/instagram.png",
  },
  // {
  //   iconName: "LinkedIn",
  //   url: "https://www.linkedin.com/",
  //   imgSrc: "/facebook_seller.png",
  // },
  {
    iconName: "LinkedIn",
    url: "https://www.facebook.com/groups/1710663079506281/?ref=share&mibextid=NSMWBT",
    imgSrc: "/facebook_seller.png",
  },
  {
    iconName: "Facebook",
    url: "https://www.facebook.com/TizaraaGroup",
    imgSrc: "/facebook.png",
  },
];

export default function Footer1() {
  return (
    <footer>
      <Box style={{ backgroundColor: "#656844" }}>
        <Container style={{ padding: "1rem", color: "white" }}>
          <Box style={{ padding: "5rem 0", overflow: "hidden" }}>
            <Grid container spacing={6}>
              {/* Customer Services */}
              <Grid item lg={2} md={3} sm={6} xs={12}>
                <Typography
                  style={{
                    marginBottom: "1.25rem",
                    lineHeight: "1",
                    fontSize: "18px",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                  }}
                >
                  Customer Services
                </Typography>
                <div>
                  {aboutLinks.map((item, ind) => (
                    <a
                      href={item.url}
                      key={ind}
                      style={{
                        display: "block",
                        color: "white",
                        textDecoration: "none",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </Grid>

              {/* Tizaraa */}
              <Grid item lg={2} md={3} sm={6} xs={12}>
                <Typography
                  style={{
                    marginBottom: "1.25rem",
                    lineHeight: "1",
                    fontSize: "18px",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                  }}
                >
                  Tizaraa
                </Typography>
                <div>
                  {customerCareLinks.map((item, ind) => (
                    <a
                      href={item.url}
                      key={ind}
                      style={{
                        display: "block",
                        color: "white",
                        textDecoration: "none",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </Grid>

              {/* Earn With Tizaraa */}
              <Grid item lg={2} md={3} sm={6} xs={12}>
                <Typography
                  style={{
                    marginBottom: "1.25rem",
                    lineHeight: "1",
                    fontSize: "18px",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                  }}
                >
                  Earn With Tizaraa
                </Typography>
                <div>
                  {customerCareLink.map((item, ind) => (
                    <a
                      href="/"
                      key={ind}
                      style={{
                        display: "block",
                        color: "white",
                        textDecoration: "none",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </Grid>

              {/* Contact Info */}
              <Grid item lg={2} md={3} sm={6} xs={12}>
                <Typography
                  style={{
                    marginBottom: "1.25rem",
                    lineHeight: "1",
                    fontSize: "18px",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                  }}
                >
                  Trade services
                </Typography>
                <Typography style={{ padding: "0.3rem 0", color: "inherit" }}>
                  House No: 15A, Road: 35, Gulshan 2, Dhaka 1212, Bangladesh
                </Typography>
                <Typography style={{ padding: "0.3rem 0", color: "inherit" }}>
                  <a
                    href="mailto:tizaraabd2023@gmail.com"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Email: tizaraabd2023@gmail.com
                  </a>
                </Typography>
                <Typography
                  style={{
                    padding: "0.3rem 0",
                    marginBottom: "1rem",
                    color: "inherit",
                  }}
                >
                  <a
                    href="tel:+8801792223444"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Phone: +8801792223444
                  </a>
                </Typography>

                <FlexBox style={{ display: "flex", gap: "5px" }}>
                  {iconList.map((item, ind) => (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={ind}
                    >
                      <Box
                        style={{
                          margin: "0px",
                          paddingTop: "8px",
                          paddingLeft: "0px",
                          paddingBottom: "8px",
                          paddingRight: "10px",
                          borderRadius: "50%",
                          //backgroundColor: "rgba(0,0,0,0.2)",
                        }}
                      >
                        <img
                          src={item.imgSrc}
                          alt={item.iconName}
                          style={{
                            width: "24px",
                            height: "24px",
                            display: "block",
                          }}
                        />
                      </Box>
                    </a>
                  ))}
                </FlexBox>
              </Grid>
              {/* Logo and Description */}
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <Link href="/">
                  <Image
                    alt="logo"
                    style={{ marginBottom: "1.25rem", maxWidth: "150px" }}
                    src="https://frontend.tizaraa.com/public/frontend/assets/img/site-logo/tizaraa-logo.png"
                  />
                </Link>
                <Paragraph style={{ marginBottom: "1.25rem", color: "inherit" }}>
                  Bangladesh's best online shopping store with 11 thousand
                  products at resounding discounts in Dhaka, Chittagong &amp;
                  All across Bangladesh with cash on delivery (COD)
                </Paragraph>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
