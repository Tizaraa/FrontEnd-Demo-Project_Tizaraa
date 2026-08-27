"use client";

import Link from "next/link";
import { PackageOpen } from "lucide-react";

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
  <div
   style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "56px 24px",
    backgroundColor: "#fff",
    border: "1px solid #EDEFF2",
    borderRadius: "12px",
   }}
  >
   <div
    style={{
     width: "64px",
     height: "64px",
     borderRadius: "50%",
     backgroundColor: "#FDECEF",
     color: "#E94560",
     display: "flex",
     alignItems: "center",
     justifyContent: "center",
     marginBottom: "16px",
    }}
   >
    <PackageOpen size={28} />
   </div>

   <h3
    style={{
     margin: "0 0 8px",
     fontSize: "17px",
     fontWeight: 600,
     color: "#2C3A4A",
    }}
   >
    {title}
   </h3>

   <p
    style={{
     margin: "0 0 20px",
     fontSize: "14px",
     lineHeight: 1.6,
     color: "#6B7280",
     maxWidth: "360px",
    }}
   >
    {message}
   </p>

   <Link
    href={actionHref}
    style={{
     backgroundColor: "#E94560",
     color: "#fff",
     textDecoration: "none",
     padding: "9px 22px",
     borderRadius: "999px",
     fontSize: "13px",
     fontWeight: 600,
    }}
   >
    {actionLabel}
   </Link>
  </div>
 );
}
