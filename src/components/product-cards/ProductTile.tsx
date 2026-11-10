"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import Rating from "@component/rating";
import { currency } from "@utils/utils";

// Shared product card for the home page and listing grids.
// Shows the current price, and the original price struck through when it is higher.
// layout="row" puts the image beside the details, for the listing pages' list view.

type ProductTileProps = {
 href: string;
 imageSrc: string;
 name: string;
 price: number | string;
 originalPrice?: number | string;
 rating?: number;
 isRfq?: boolean;
 // OT images come from a third-party CDN that rejects referrers
 externalImage?: boolean;
 layout?: "grid" | "row";
};

const Tile = styled.article<{ $row?: boolean }>`
 position: relative;
 display: flex;
 flex-direction: column;
 height: 100%;
 overflow: hidden;
 background: ${({ theme }) => theme.tz.color.paper};
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: 16px;
 transition: box-shadow 220ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
  border-color 180ms ease;

 &:hover {
  border-color: #f6b9a3;
  box-shadow: 0 14px 30px rgba(14, 52, 96, 0.1);
  transform: translateY(-4px);
 }

 .tile-media {
  position: relative;
  aspect-ratio: 1 / 1;
  background: ${({ theme }) => theme.tz.color.mist};
  overflow: hidden;

  img {
   object-fit: contain;
   transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
  }
 }

 &:hover .tile-media img {
  transform: scale(1.05);
 }

 .tile-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  padding: 3px 9px;
  border-radius: ${({ theme }) => theme.tz.radius.pill}px;
  /* emberDeep keeps the white text readable (plain ember is 3.6:1) */
  background: ${({ theme }) => theme.tz.color.emberDeep};
  box-shadow: 0 4px 10px rgba(194, 64, 15, 0.25);
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.3;
  font-variant-numeric: tabular-nums;
 }

 .tile-body {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  gap: 6px;
  padding: 12px;
 }

 .tile-name {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: calc(2 * 1.4em);
  margin: 0;
  font-family: ${({ theme }) => theme.tz.font.body};
  font-size: 13.5px;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }

 .tile-price {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px;
  margin-top: auto;
  font-variant-numeric: tabular-nums;
 }

 .tile-price-now {
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
 }

 .tile-price-now.is-deal {
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }

 .tile-price-was {
  font-size: 13px;
  color: ${({ theme }) => theme.tz.color.slate};
  text-decoration: line-through;
 }

 .tile-rfq {
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }

 ${({ $row }) =>
  $row &&
  `
  display: grid;
  grid-template-columns: 180px 1fr;

  &:hover {
   transform: none;
  }

  .tile-body {
   justify-content: center;
   gap: 8px;
   padding: 16px 20px;
  }

  .tile-name {
   min-height: 0;
   font-size: 16px;
  }

  .tile-price {
   margin-top: 4px;
  }

  .tile-price-now {
   font-size: 18px;
  }

  @media (max-width: 650px) {
   grid-template-columns: 112px 1fr;

   .tile-body {
    padding: 12px;
   }

   .tile-name {
    font-size: 14px;
   }

   .tile-price-now {
    font-size: 16px;
   }
  }
 `}

 ${({ theme }) => theme.tz.media.reducedMotion} {
  transition: none;

  &:hover,
  &:hover .tile-media img {
   transform: none;
  }
  .tile-media img {
   transition: none;
  }
 }
`;

export default function ProductTile({
 href,
 imageSrc,
 name,
 price,
 originalPrice,
 rating,
 isRfq,
 externalImage,
 layout = "grid",
}: ProductTileProps) {
 const now = Number(price);
 const was = Number(originalPrice);
 const hasDiscount = !isRfq && was > 0 && now > 0 && now < was;
 const discountPercent = hasDiscount ? Math.floor(((was - now) / was) * 100) : 0;

 return (
  <Link href={href} style={{ display: "block", height: "100%" }}>
   <Tile $row={layout === "row"}>
    {hasDiscount && discountPercent > 0 && (
     <span className="tile-badge">−{discountPercent}%</span>
    )}

    <div className="tile-media">
     <Image
      src={imageSrc}
      alt={name}
      fill
      sizes={
       layout === "row"
        ? "180px"
        : "(max-width: 650px) 50vw, (max-width: 950px) 33vw, 20vw"
      }
      {...(externalImage && {
       referrerPolicy: "no-referrer",
       crossOrigin: "anonymous",
      })}
     />
    </div>

    <div className="tile-body">
     <h3 className="tile-name" title={name}>
      {name}
     </h3>

     {rating > 0 && (
      <Rating value={rating} outof={5} color="warn" readOnly size="small" />
     )}

     <div className="tile-price">
      {isRfq ? (
       <span className="tile-rfq">Request a quote</span>
      ) : (
       <>
        <span className={hasDiscount ? "tile-price-now is-deal" : "tile-price-now"}>
         {currency(now)}
        </span>
        {hasDiscount && (
         <span className="tile-price-was">{currency(was)}</span>
        )}
       </>
      )}
     </div>
    </div>
   </Tile>
  </Link>
 );
}

const SkeletonTile = styled(Tile)`
 &:hover {
  box-shadow: none;
  transform: none;
  border-color: ${({ theme }) => theme.tz.color.line};
 }

 .bone {
  border-radius: ${({ theme }) => theme.tz.radius.xs}px;
  background: linear-gradient(
   90deg,
   ${({ theme }) => theme.tz.color.lineSoft} 0%,
   ${({ theme }) => theme.tz.color.mist} 50%,
   ${({ theme }) => theme.tz.color.lineSoft} 100%
  );
  background-size: 200% 100%;
  animation: tile-shimmer 1.4s ease-in-out infinite;
 }

 @keyframes tile-shimmer {
  from {
   background-position: 200% 0;
  }
  to {
   background-position: -200% 0;
  }
 }

 ${({ theme }) => theme.tz.media.reducedMotion} {
  .bone {
   animation: none;
  }
 }
`;

export function ProductTileSkeleton() {
 return (
  <SkeletonTile aria-hidden="true">
   <div className="tile-media bone" style={{ borderRadius: 0 }} />
   <div className="tile-body">
    <div className="bone" style={{ height: 14, width: "90%" }} />
    <div className="bone" style={{ height: 14, width: "60%" }} />
    <div className="bone" style={{ height: 18, width: "45%", marginTop: 8 }} />
   </div>
  </SkeletonTile>
 );
}
