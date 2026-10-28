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
//                   <a href="mailto:info@tizaraa.com" style={{ textDecoration: 'none', color: 'inherit' }}>
//                   Email: info@tizaraa.com
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

"use client";
import Link from "next/link";
import Box from "@component/Box";
import Image from "@component/Image";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import Container from "@component/Container";
import Typography, { Paragraph } from "@component/Typography";
import { StyledFooter } from "./styles";

export const aboutLinks = [
 { name: "Order Tracking", url: "/orderTracking" },
 { name: "Shipping & Delivery", url: "/shipiingAndDelivery" },
 { name: "Return and Refund Policy", url: "/return-and-refund-policy" },
 { name: "Replacement", url: "/replacement" },
 { name: "Help center", url: "/helpCenter" },
 { name: "How to buy", url: "/howToBuy" },
 { name: "Tizaraa journey", url: "/tizaraa-journey" },
];

export const customerCareLinks = [
 { name: "About Tizaraa", url: "/about-tizaraa" },
 { name: "Privacy policy", url: "/privacy-policy" },
 { name: "Terms and Conditions", url: "/terms-and-conditions" },
 // { name: "Terms and Conditions", url: "/terms-and-conditions"},
 { name: "Contact Us", url: "/contact" },
 { name: "Tizaraa cares", url: "/tizaraa-cares" },
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
  <StyledFooter>
   <Container>
    <Grid container spacing={6}>
     {/* Logo and Description */}
     <Grid item lg={4} md={12} sm={12} xs={12}>
      <Link href="/" className="footer-logo">
       <Image
        alt="Tizaraa"
        // src="https://frontend.tizaraa.com/public/frontend/assets/img/site-logo/tizaraa-logo.png"
        src="https://minio.tizaraa.shop/tizaraa/frontend/logo/tizaraa.png"
       />
      </Link>
      <Paragraph className="footer-about">
       Bangladesh's best online shopping store with 11 thousand products at
       resounding discounts in Dhaka, Chittagong &amp; All across Bangladesh
       with cash on delivery (COD)
      </Paragraph>

      <FlexBox className="footer-social">
       {iconList.map((item, ind) => (
        <a
         href={item.url}
         target="_blank"
         rel="noopener noreferrer"
         key={ind}
         aria-label={item.iconName}
        >
         <img src={item.imgSrc} alt={item.iconName} />
        </a>
       ))}
      </FlexBox>
     </Grid>

     {/* Customer Services */}
     <Grid item lg={2} md={3} sm={6} xs={12}>
      <Typography as="h3" className="footer-heading">
       Customer Services
      </Typography>
      {aboutLinks.map((item, ind) => (
       <a target="_blank" href={item.url} key={ind} className="footer-link">
        {item.name}
       </a>
      ))}
     </Grid>

     {/* Tizaraa */}
     <Grid item lg={2} md={3} sm={6} xs={12}>
      <Typography as="h3" className="footer-heading">
       Tizaraa
      </Typography>
      {customerCareLinks.map((item, ind) => (
       <a target="_blank" href={item.url} key={ind} className="footer-link">
        {item.name}
       </a>
      ))}
     </Grid>

     {/* Earn With Tizaraa */}
     <Grid item lg={2} md={3} sm={6} xs={12}>
      <Typography as="h3" className="footer-heading">
       Earn With Tizaraa
      </Typography>
      {customerCareLink.map((item, ind) => (
       <a
        target="_blank"
        href="https://seller.tizaraa.shop/"
        key={ind}
        className="footer-link"
       >
        {item}
       </a>
      ))}

      <dl className="footer-facts">
       <dt>DBID</dt>
       <dd>Registration ID : 144381902</dd>
       <dt>Trade License</dt>
       <dd>TRAD/DNCC/010245/2024</dd>
      </dl>
     </Grid>

     {/* Contact Info */}
     <Grid item lg={2} md={3} sm={6} xs={12}>
      <Typography as="h3" className="footer-heading">
       Trade services
      </Typography>
      <a href="mailto:info@tizaraa.com" className="footer-link">
       Email: info@tizaraa.com
      </a>
      <a href="tel:+8801792223444" className="footer-link">
       Phone: +8801792223444
      </a>
     </Grid>
    </Grid>

    <div className="footer-bottom">
     <div className="footer-payment">
      <img src="/assets/images/banners/Payment Banner.png" alt="Payment methods" />
     </div>

     <a href="https://otcommerce.com/" className="footer-otc">
      <img src="/assets/images/footer_image/otCommerce.png" alt="" />
      <span>
       OpenTrade
       <br />
       Commerce
      </span>
     </a>
    </div>
   </Container>
  </StyledFooter>
 );
}
