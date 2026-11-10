"use client";

import { useEffect, useState } from "react";
import Menu from "../Menu";
import Image from "../Image";
import Icon from "../icon/Icon";
import FlexBox from "../FlexBox";
import NavLink from "../nav-link";
import MenuItem from "../MenuItem";
import Container from "../Container";
import { Small } from "../Typography";
import StyledTopbar from "./styles";
import { FaUser } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import GoogleTranslate from "@component/GoogleTranslate";
import LanguageSelector from "@component/LanguageSelector";

export default function Topbar() {
 const [currency, setCurrency] = useState(currencyList[0]);
 const [language, setLanguage] = useState(languageList[1]);
 const router = useRouter();

 const handleCurrencyClick = (curr: typeof currency) => () => setCurrency(curr);

 const handleLanguageClick = (lang: typeof language) => () => {
  setLanguage(lang);
  if (lang.url.startsWith("http")) {
   // External URL
   window.location.href = lang.url;
  } else {
   // Internal URL
   router.push(lang.url);
  }
 };

 useEffect(() => {
  // get language from browser
  // console.log(navigator.language);
 }, []);

 // Rotating centre message; stays on the first one for reduced motion
 const [tick, setTick] = useState(0);
 useEffect(() => {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  // Skip ticks while the tab is hidden so a background tab does no work
  const id = window.setInterval(() => {
   if (document.visibilityState === "visible") setTick((t) => (t + 1) % TICKER.length);
  }, 4000);
  return () => window.clearInterval(id);
 }, []);

 return (
  <StyledTopbar>
   <Container
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    height="100%"
   >
    <FlexBox className="topbar-left" alignItems="center">
     <div className="logo">
      <a href="/" style={{ display: "block" }}>
       <img
        // src="https://frontend.tizaraa.com/public/frontend/assets/img/site-logo/tizaraa-logo.png"
        src="https://minio.tizaraa.shop/tizaraa/frontend/logo/tizaraa.png"
        alt="logo"
       />
      </a>
     </div>
     <a href="tel:+8801792223444" className="tb-link">
      <Icon size="14px">phone-call</Icon>
      <span>+8801792223444</span>
     </a>
     <span className="tb-sep" aria-hidden="true" />
     <a href="mailto:info@tizaraa.com" className="tb-link">
      <Icon size="14px">mail</Icon>
      <span>info@tizaraa.com</span>
     </a>
    </FlexBox>

    <div className="tb-ticker" aria-live="polite">
     <span key={tick} className="tb-ticker-msg">
      <i className="tb-ticker-dot" aria-hidden="true" />
      {TICKER[tick]}
     </span>
    </div>

    <FlexBox className="topbar-right" alignItems="center">
     {/* <GoogleTranslate></GoogleTranslate> */}
     <LanguageSelector></LanguageSelector>
    </FlexBox>
   </Container>

   <style jsx>{`
    /* Hide on desktop */
    .responsive-menu {
     display: none;
    }

    /* Show on mobile and tablet */
    @media (max-width: 768px) {
     .responsive-menu {
      display: block;
     }
    }
   `}</style>
  </StyledTopbar>
 );
}

// Top bar centre messages: edit freely
const TICKER = [
 "Welcome to Tizaraa",
 "Open your shop on Tizaraa and start selling",
 "Need help? Call +8801792223444",
];

const languageList = [
 {
  title: "Become A Seller",
  icon: <FaUser />,
  url: "https://seller.tizaraa.com",
 },
 { title: "Find Seller", icon: <FaLocationPin />, url: "/shops" },
];
const currencyList = [
 { title: "USD", imgUrl: "/assets/images/flags/usa.png" },
 { title: "EUR", imgUrl: "/assets/images/flags/uk.png" },
 { title: "BDT", imgUrl: "/assets/images/flags/bd.png" },
 { title: "INR", imgUrl: "/assets/images/flags/in.png" },
];
