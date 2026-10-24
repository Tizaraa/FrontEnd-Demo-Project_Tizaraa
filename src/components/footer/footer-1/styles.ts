"use client";

import Link from "next/link";
import styled from "styled-components";

import { getTheme } from "@utils/utils";

// STYLED COMPONENTS
export const StyledLink = styled(Link)`
 position: relative;
 display: block;
 padding: 0.3rem 0rem;
 color: ${getTheme("colors.gray.500")};
 cursor: pointer;
 border-radius: 4px;
 &:hover {
  color: ${getTheme("colors.gray.100")};
 }
`;

export const StyledFooter = styled.footer`
 background: ${({ theme }) => theme.tz.color.navy};
 color: rgba(255, 255, 255, 0.72);
 padding: 56px 0 32px;
 font-size: 14px;

 .footer-logo img {
  display: block;
  max-width: 150px;
  margin-bottom: 20px;
 }

 .footer-about {
  max-width: 360px;
  margin-bottom: 20px;
  line-height: 1.6;
  color: inherit;
 }

 .footer-social {
  gap: 8px;

  a {
   display: flex;
   align-items: center;
   justify-content: center;
   width: 40px;
   height: 40px;
   border-radius: ${({ theme }) => theme.tz.radius.sm}px;
   background: rgba(255, 255, 255, 0.08);
   transition: background-color ${({ theme }) => theme.tz.motion.fast};

   &:hover {
    background: rgba(255, 255, 255, 0.16);
   }
  }

  img {
   width: 22px;
   height: 22px;
   display: block;
  }
 }

 .footer-heading {
  margin: 0 0 16px;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
  color: #ffffff;
  white-space: nowrap;
 }

 .footer-link {
  display: block;
  padding: 4px 0;
  color: inherit;
  transition: color ${({ theme }) => theme.tz.motion.fast};

  &:hover {
   color: #ffffff;
  }
 }

 .footer-facts {
  margin: 20px 0 0;

  dt {
   margin-top: 12px;
   font-weight: 600;
   color: #ffffff;
  }

  dd {
   margin: 2px 0 0;
  }
 }

 .footer-bottom {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
 }

 .footer-payment {
  flex: 0 1 65%;
  padding: 8px;
  border-radius: ${({ theme }) => theme.tz.radius.sm}px;
  background: #ffffff;

  img {
   display: block;
   width: 100%;
   height: auto;
  }
 }

 .footer-otc {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ffffff;
  font-weight: 600;
  line-height: 1.2;

  img {
   width: 72px;
  }
 }

 @media only screen and (max-width: 768px) {
  padding: 40px 0 96px;

  .footer-bottom {
   flex-direction: column;
   align-items: flex-start;
  }

  .footer-payment {
   flex-basis: auto;
   width: 100%;
  }
 }
`;
