"use client";
import React from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import Container from "@component/Container";
import CategorySectionHeader from "@component/CategorySectionHeader";
import ApiBaseUrl from "../../api/ApiBaseUrl";
import Image from "next/image";
import useFetcher from "@hook/useFetcher";

// ============================================================

type Category = {
 id: number;
 categorie_name: string;
 categorie_image: string;
 categorie_name_slug: string;
};
// ============================================================

const rise = keyframes`
 from { opacity: 0; transform: translateY(10px); }
 to { opacity: 1; transform: none; }
`;

const CategoryGrid = styled.div`
 display: grid;
 grid-template-columns: repeat(6, minmax(0, 1fr));
 gap: 16px;

 .cat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  height: 100%;
  padding: 10px 10px 12px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 16px;
  background: ${({ theme }) => theme.tz.color.paper};
  box-shadow: ${({ theme }) => theme.tz.elevation.rest};
  /* backwards (not both) so the hover lift isn't locked by the entrance */
  animation: ${rise} 380ms cubic-bezier(0.22, 1, 0.36, 1) backwards;
  animation-delay: calc(min(var(--i, 0), 12) * 40ms);
  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 220ms ease, border-color 180ms ease;
 }

 .cat-media {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 12px;
  /* soft pastel per card (set inline), falls back to mist */
  background: var(--tint, ${({ theme }) => theme.tz.color.mist});
  transition: background-color 220ms ease, filter 220ms ease;
 }
 .cat-media img {
  padding: 10%;
  transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
 }

 .cat-name {
  display: -webkit-box;
  min-height: calc(2 * 1.35em);
  margin: 0;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.35;
  text-align: center;
  color: ${({ theme }) => theme.tz.color.ink};
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  transition: color 180ms ease;
 }

 a {
  display: block;
  height: 100%;
  border-radius: 16px;
 }
 a:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 a:hover .cat-card,
 a:focus-visible .cat-card {
  transform: translateY(-4px);
  border-color: #f6b9a3;
  box-shadow: 0 14px 30px rgba(14, 52, 96, 0.1);
 }
 a:hover .cat-media,
 a:focus-visible .cat-media {
  filter: saturate(1.25) brightness(0.98);
 }
 .cat-cta {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: -4px;
  font-size: 12px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.emberDeep};
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity 180ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 a:hover .cat-cta,
 a:focus-visible .cat-cta {
  opacity: 1;
  transform: none;
 }
 a:hover .cat-media img,
 a:focus-visible .cat-media img {
  transform: scale(1.06);
 }
 a:hover .cat-name,
 a:focus-visible .cat-name {
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 a:active .cat-card {
  transform: translateY(-1px);
 }

 @media (max-width: 1023px) {
  grid-template-columns: repeat(4, minmax(0, 1fr));
 }
 /* phones: one swipeable row */
 @media (max-width: 767px) {
  grid-template-columns: none;
  grid-auto-flow: column;
  grid-auto-columns: 38%;
  gap: 12px;
  margin: 0 -16px;
  padding: 2px 16px 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;

  &::-webkit-scrollbar {
   display: none;
  }
  a {
   scroll-snap-align: start;
  }
  .cat-name {
   font-size: 13px;
  }
  .cat-cta {
   display: none;
  }
 }
 @media (max-width: 425px) {
  grid-auto-columns: 44%;
 }

 ${({ theme }) => theme.tz.media.reducedMotion} {
  .cat-card {
   animation: none;
  }
  .cat-card,
  .cat-media,
  .cat-media img,
  .cat-name,
  .cat-cta {
   transition: none;
  }
  a:hover .cat-card,
  a:focus-visible .cat-card,
  a:active .cat-card,
  a:hover .cat-media img,
  a:focus-visible .cat-media img {
   transform: none;
  }
 }
`;

// soft pastel backgrounds behind category images, cycled per card
const TINTS = ["#FDEEE7", "#E8EDF4", "#E6F4EC", "#FFF4DC", "#EDE9FE", "#FDECEC"];

export default function Section10() {
 const { data: categories } = useFetcher(`frontend/home/categorie/all`);

 return (
  <Container
   mb={{ xs: "32px", sm: "40px", md: "48px" }}
   // px={{ xs: "1rem", sm: "1.5rem", md: "2rem" }}
  >
   <CategorySectionHeader title="Categories" iconName="categories" />

   <CategoryGrid>
    {categories?.map((item: Category, index: number) => (
     <Link href={`/category/${item.categorie_name_slug}`} key={item.id}>
      <div
       className="cat-card"
       style={{ "--i": index, "--tint": TINTS[index % TINTS.length] } as React.CSSProperties}
      >
       <div className="cat-media">
        <Image
         src={item.categorie_image?.startsWith("http") ? item.categorie_image : `${ApiBaseUrl.ImgUrl}${item.categorie_image}`}
         alt={item.categorie_name}
         fill
         sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
         style={{ objectFit: "contain" }}
         priority={false}
        />
       </div>

       <p className="cat-name">{item.categorie_name}</p>
       <span className="cat-cta" aria-hidden="true">
        Shop now →
       </span>
      </div>
     </Link>
    ))}
   </CategoryGrid>
  </Container>
 );
}
