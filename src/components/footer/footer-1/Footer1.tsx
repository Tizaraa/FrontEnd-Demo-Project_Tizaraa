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

"use client"
import Link from "next/link";
import Box from "@component/Box";
import Image from "@component/Image";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import Container from "@component/Container";
import Typography, { Paragraph } from "@component/Typography";
import { useEffect, useState } from "react";

export const aboutLinks = [
  { name: "Help center", url: "/helpCenter" },
  { name: "Order Tracking", url: "/orderTracking" },
  { name: "Shipping & Delivery", url: "/" },
  { name: "Return and Refund Policy", url: "/return-and-refund-policy"},
  { name: "Replacement", url: "/" },
  { name: "How to buy", url: "/howToBuy" },
  { name: "Tizaraa journey", url: "/tizaraa-journey" },
];

export const customerCareLinks = [
  { name: "About Tizaraa", url: "/about-tizaraa" },
  { name: "Tizaraa blog", url: "/tizaraa-blog" },
  { name: "Tizaraa cares", url: "/tizaraa-cares" },
  { name: "Privacy policy", url: "/privacy-policy" },
  { name: "Terms and Conditions", url: "/terms-and-conditions"},
 
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
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
         <main
    style={{
      position: "relative",
      background: "none",
    }}
  >


    <footer>
      <Box style={{ backgroundColor: "#656844" }}>
        <Container style={{ padding: "1rem", color: "white" }}>
          <Box style={{ padding: "2rem 0", overflow: "hidden" }}>
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
                      target="_blank"
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
                      target="_blank"
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

                    target="_blank"
                      href="https://seller.tizaraa.shop/"
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
                </Typography>
                <Typography style={{ padding: "0.3rem 0", color: "inherit" }}>
                    <a
                      href="mailto:info@tizaraa.com"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Email: info@tizaraa.com
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
                    // src="https://frontend.tizaraa.com/public/frontend/assets/img/site-logo/tizaraa-logo.png"
                    src="https://minio.tizaraa.shop/tizaraa/frontend/logo/tizaraa.png"
                  />
                </Link>
                <Paragraph style={{ marginBottom: "1.25rem", color: "inherit" }}>
                  Bangladesh's best online shopping store with 11 thousand
                  products at resounding discounts in Dhaka, Chittagong &amp;
                  All across Bangladesh with cash on delivery (COD)
                </Paragraph>
              </Grid>
              
            </Grid>

            <div
    style={{
      display: "flex",
      justifyContent: "flex-start",
      flexWrap: isMobile ? "wrap" : "nowrap", // Flex wrap for mobile
      flexDirection: isMobile ? "column" : "row", // Stack elements on mobile
    }}
  >
    <img
      src="/assets/images/banners/Payment Banner.png"
      alt="Payment"
      style={{
        width: "100%", // Default for mobile and smaller devices
        height: "auto",
        maxWidth: isMobile ? "100%" : "65%", // For desktop, 65% width
      }}
    />
    
    <a href="https://otcommerce.com/" style={{ textDecoration: "none" }}>
  <div
    style={{
      display: "flex",
      marginLeft: isMobile ? "0" : "26px",
      marginTop: isMobile ? "20px" : "0", // Adjust spacing on mobile
      flexDirection: isMobile ? "column" : "row", // Stack text on mobile
    }}
  >
    <img
      src="/assets/images/footer_image/otCommerce.png"
      alt=""
      style={{ width: "100px" }}
    />
    <span
      className="hr1-a-1-b"
      style={{
        marginTop: isMobile ? "0" : "26px",
        textAlign: isMobile ? "left" : "left", 
        color: "white"
      }}
    >
      <span className="hr1-a-1">
        OpenTrade
      </span>
      <br />
      <span className="hr1-a-2">
        Commerce
      </span>
    </span>
  </div>
</a>

  </div>



          </Box>
        </Container>
      </Box>
    </footer>
  </main>
    </>

  );
}
