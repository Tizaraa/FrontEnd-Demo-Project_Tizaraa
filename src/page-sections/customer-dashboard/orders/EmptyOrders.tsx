"use client";

import Link from "next/link";
import { PackageOpen } from "lucide-react";
import styled from "styled-components";

const Box = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 padding: 56px 24px;
 text-align: center;
 background: ${({ theme }) => theme.tz.color.paper};
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: ${({ theme }) => theme.tz.radius.md}px;

 .eo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.navyTint};
  color: ${({ theme }) => theme.tz.color.navy};
 }

 h3 {
  margin: 0 0 8px;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.ink};
 }

 p {
  max-width: 360px;
  margin: 0 0 20px;
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.tz.color.slate};
 }

 .eo-action {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 24px;
  border-radius: ${({ theme }) => theme.tz.radius.md}px;
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: ${({ theme }) => theme.tz.color.paper};
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color ${({ theme }) => theme.tz.motion.fast};

  &:hover {
   background: ${({ theme }) => theme.tz.color.emberDark};
  }

  &:focus-visible {
   outline: none;
   box-shadow: ${({ theme }) => theme.tz.focusRing};
  }
 }
`;

type EmptyOrdersProps = {
 title: string;
 message: string;
 /** Optional call to action; defaults to sending the shopper back to the store. */
 actionLabel?: string;
 actionHref?: string;
};

/**
 * Shown on a dashboard order list that has nothing in it, so the page reads as
 * "nothing here yet" instead of an empty table with a pager under it.
 */
export default function EmptyOrders({
 title,
 message,
 actionLabel = "Continue Shopping",
 actionHref = "/",
}: EmptyOrdersProps) {
 return (
  <Box>
   <span className="eo-icon" aria-hidden="true">
    <PackageOpen size={28} />
   </span>
   <h3>{title}</h3>
   <p>{message}</p>
   <Link href={actionHref} className="eo-action">
    {actionLabel}
   </Link>
  </Box>
 );
}
