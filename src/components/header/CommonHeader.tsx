"use client";

import Link from "next/link";
import { useState } from "react";

export default function CommonHeader() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href="/">
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Tooltip */}
        {isHovered && (
          <div
            style={{
              position: "absolute",
              top: "50px",
              left: "30px",
              backgroundColor: "black",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
              fontSize: "12px",
              whiteSpace: "nowrap",
            }}
          >
            Home
          </div>
        )}

        {/* Logo */}
        <img
          src="/assets/images/tizaraa_logo.webp"
          alt="logo"
          style={{ height: "50px", objectFit: "contain" }}
        />
      </div>
    </Link>
  );
}
