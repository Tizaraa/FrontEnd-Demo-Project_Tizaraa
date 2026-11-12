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
import { useState } from "react";
import Link from "next/link";
import Image from "@component/Image";
import Container from "@component/Container";
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

// Small line icons (stroke = currentColor)
const Ico = ({ d, size = 20 }: { d: string; size?: number }) => (
 <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  <path d={d} />
 </svg>
);
const ICON = {
 truck: "M3 6h11v9H3zM14 9h4l3 3v3h-7M7 18.5a1.8 1.8 0 100-3.6 1.8 1.8 0 000 3.6zM17 18.5a1.8 1.8 0 100-3.6 1.8 1.8 0 000 3.6z",
 cash: "M3 7h18v10H3zM12 15a3 3 0 100-6 3 3 0 000 6zM6 10v4M18 10v4",
 returns: "M4 9h11a5 5 0 010 10H9M8 5L4 9l4 4",
 lock: "M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 017 0v3",
 mail: "M3 6h18v12H3zM3 7l9 6 9-6",
 phone: "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z",
 check: "M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6zM9 12l2 2 4-4",
 chevron: "M6 9l6 6 6-6",
};

// Trust signals shown above everything (claims the site already makes)
const TRUST = [
 { icon: ICON.truck, title: "Fast delivery", text: "All across Bangladesh" },
 { icon: ICON.cash, title: "Cash on delivery", text: "Pay when it arrives" },
 { icon: ICON.returns, title: "Easy returns", text: "Request from your orders" },
 { icon: ICON.lock, title: "Secure payment", text: "Verified by SSLCommerz" },
];

type FooterLink = { name: string; url: string; external?: boolean };
const GROUPS: { title: string; links: FooterLink[] }[] = [
 { title: "Customer Services", links: aboutLinks },
 { title: "Tizaraa", links: customerCareLinks },
 {
  title: "Earn With Tizaraa",
  links: customerCareLink.map((name) => ({ name, url: "https://seller.tizaraa.shop/", external: true })),
 },
];

// Internal pages open in the same tab; external sites in a new tab
const FooterAnchor = ({ link }: { link: FooterLink }) =>
 link.external || /^https?:/.test(link.url) ? (
  <a href={link.url} target="_blank" rel="noopener noreferrer" className="footer-link">
   {link.name}
   <span className="footer-link-arrow" aria-hidden="true">↗</span>
  </a>
 ) : (
  <Link href={link.url} className="footer-link">
   {link.name}
   <span className="footer-link-arrow" aria-hidden="true">→</span>
  </Link>
 );

export default function Footer1() {
 // Mobile: link groups are accordions (desktop always shows them)
 const [open, setOpen] = useState<number | null>(null);

 return (
  <StyledFooter>
   {/* Trust strip */}
   <div className="footer-trust">
    <Container className="footer-trust-inner">
     {TRUST.map((t) => (
      <div className="trust-item" key={t.title}>
       <span className="trust-icon">
        <Ico d={t.icon} size={22} />
       </span>
       <span>
        <strong>{t.title}</strong>
        <small>{t.text}</small>
       </span>
      </div>
     ))}
    </Container>
   </div>

   <Container>
    <div className="footer-main">
     {/* Brand column */}
     <div className="footer-brand">
      <Link href="/" className="footer-logo" aria-label="Tizaraa home">
       <Image alt="Tizaraa" src="https://minio.tizaraa.shop/tizaraa/frontend/logo/tizaraa.png" />
      </Link>
      <p className="footer-about">
       Bangladesh&apos;s online marketplace with 11 thousand products at great prices, delivered
       across Dhaka, Chittagong and all of Bangladesh, with cash on delivery.
      </p>

      <h3 className="footer-heading as-title">Follow us</h3>
      <div className="footer-social">
       {iconList.map((item, ind) => (
        <a href={item.url} target="_blank" rel="noopener noreferrer" key={ind} aria-label={item.iconName}>
         <img src={item.imgSrc} alt="" width={20} height={20} loading="lazy" />
        </a>
       ))}
      </div>

     </div>

     {/* Link groups */}
     {GROUPS.map((g, i) => (
      <div className={`footer-col${open === i ? " is-open" : ""}`} key={g.title}>
       <button
        type="button"
        className="footer-heading"
        aria-expanded={open === i}
        onClick={() => setOpen(open === i ? null : i)}
       >
        {g.title}
        <span className="footer-chevron">
         <Ico d={ICON.chevron} size={16} />
        </span>
       </button>
       <div className="footer-col-links">
        {g.links.map((l) => (
         <FooterAnchor link={l} key={l.name} />
        ))}
       </div>
       {g.title === "Earn With Tizaraa" && (
        <div className="footer-verified">
         <h3 className="footer-heading as-title">Verified business</h3>
         <dl>
          <div>
           <dt>DBID</dt>
           <dd>144381902</dd>
          </div>
          <div>
           <dt>Trade License</dt>
           <dd>TRAD/DNCC/010245/2024</dd>
          </div>
         </dl>
        </div>
       )}
      </div>
     ))}

     {/* Contact */}
     <div className="footer-contact">
      <h3 className="footer-heading as-title">Trade services</h3>
      <a href="mailto:info@tizaraa.com" className="contact-card">
       <span className="contact-icon">
        <Ico d={ICON.mail} size={18} />
       </span>
       <span>
        <small>Email us</small>
        info@tizaraa.com
       </span>
      </a>
      <a href="tel:+8801792223444" className="contact-card">
       <span className="contact-icon">
        <Ico d={ICON.phone} size={18} />
       </span>
       <span>
        <small>Call us</small>
        +880 1792-223444
       </span>
      </a>
     </div>
    </div>

    {/* Payment methods + platform credit */}
    <div className="footer-pay">
     <div className="footer-payment">
      <img src="/assets/images/banners/Payment Banner.png" alt="Accepted payment methods" loading="lazy" />
     </div>
     <a href="https://otcommerce.com/" className="footer-otc" target="_blank" rel="noopener noreferrer">
      <img src="/assets/images/footer_image/otCommerce.png" alt="" loading="lazy" />
      <span>
       <small>Powered by</small>
       OpenTrade Commerce
      </span>
     </a>
    </div>
   </Container>

   {/* Copyright bar */}
   <div className="footer-bar">
    <Container className="footer-bar-inner">
     <span>© {new Date().getFullYear()} Tizaraa. All rights reserved.</span>
     <nav aria-label="Legal">
      <Link href="/privacy-policy">Privacy</Link>
      <Link href="/terms-and-conditions">Terms</Link>
      <Link href="/return-and-refund-policy">Returns</Link>
     </nav>
    </Container>
   </div>
  </StyledFooter>
 );
}
