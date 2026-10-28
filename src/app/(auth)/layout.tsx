import { PropsWithChildren } from "react";
import Link from "next/link";
import tz from "../../theme/tizaraa";

export default function Layout({ children }: PropsWithChildren) {
 return (
  <div
   style={{
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    padding: "32px 16px",
    background: tz.color.mist,
   }}
  >
   {/* Brand mark, same asset as the site header */}
   <Link href="/" aria-label="Tizaraa home" style={{ display: "block" }}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
     src="/assets/images/tizaraa_logo.png"
     alt="Tizaraa"
     width={200}
     height={90}
     style={{ display: "block", height: 64, width: "auto" }}
    />
   </Link>

   <div style={{ width: "100%", maxWidth: 440 }}>{children}</div>
  </div>
 );
}
