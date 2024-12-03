"use client";

import Link from "next/link";
import { useState } from "react";

export default function CommonHeader() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href="/">
      <div
        className="header-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Tooltip */}
        {isHovered && (
          <div className="tooltip">
            Home
          </div>
        )}

        {/* Logo */}
        <img
          src="/assets/images/tizaraa_logo.png"
          alt="logo"
          className="logo"
        />
      </div>

      <style jsx>{`
        .header-container {
          position: absolute;
          top: 10px;
          left: 10px;
        }

        .tooltip {
          position: absolute;
          top: 50px;
          left: 30px;
          background-color: black;
          color: white;
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 12px;
          white-space: nowrap;
        }

        .logo {
          height: 50px;
          object-fit: contain;
        }

        @media (max-width: 768px) {
          .header-container {
            position: static;
            display: flex;
            justify-content: center;
            margin: 10px 0;
          }

          .tooltip {
            top: 60px;
            left: 50%;
            transform: translateX(-50%);
          }

          .logo {
            margin: 0 auto;
          }
        }
      `}</style>
    </Link>
  );
}
