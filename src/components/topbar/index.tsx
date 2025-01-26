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

  const handleCurrencyClick = (curr: typeof currency) => () =>
    setCurrency(curr);

  const handleLanguageClick = (lang: typeof language) => () => {
    setLanguage(lang);
    if (lang.url.startsWith("http")) {
      // External URL
      window.location.href = lang.url;
    } else {
      // Internal URL
      router.push(lang.url);
    }
  }

  useEffect(() => {
    // get language from browser
    // console.log(navigator.language);
  }, []);

  return (
    <StyledTopbar>
      <Container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
      >
        <FlexBox className="topbar-left">
          <div className="logo">
            <a href="/" style={{ display: "block" }}>
              <img
                src="https://frontend.tizaraa.com/public/frontend/assets/img/site-logo/tizaraa-logo.png"
                alt="logo"
              />
            </a>
          </div>
<FlexBox alignItems="center">
  <a href="tel:+8801792223444" style={{ textDecoration: 'none', color: 'inherit' }}>
    <FlexBox alignItems="center">
      <Icon size="14px">phone-call</Icon>
      <span>+8801792223444</span>
    </FlexBox>
  </a>

  <FlexBox alignItems="center" ml="20px">
    <a href="mailto:info@tizaraa.com" style={{ textDecoration: 'none', color: 'inherit' }}>
      <FlexBox alignItems="center">
        <Icon size="14px">mail</Icon>
        <span>info@tizaraa.com</span>
      </FlexBox>
    </a>
  </FlexBox>
</FlexBox>

        </FlexBox>

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

const languageList = [
  { title: "Become A Seller", icon: <FaUser />, url: "https://seller.tizaraa.com", },
  { title: "Find Seller", icon: <FaLocationPin />, url: "/shops" },
];
const currencyList = [
  { title: "USD", imgUrl: "/assets/images/flags/usa.png" },
  { title: "EUR", imgUrl: "/assets/images/flags/uk.png" },
  { title: "BDT", imgUrl: "/assets/images/flags/bd.png" },
  { title: "INR", imgUrl: "/assets/images/flags/in.png" },
];
