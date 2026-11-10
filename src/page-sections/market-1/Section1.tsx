"use client";

import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import styled, { keyframes } from "styled-components";
import Navbar from "@component/navbar/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import ApiBaseUrl from "api/ApiBaseUrl";
import Typography from "@component/Typography";
import Loader from "@component/loader";
import useFetcher from "@hook/useFetcher";

const heroIn = keyframes`
 from {
  opacity: 0;
  transform: translateY(8px);
 }
 to {
  opacity: 1;
  transform: none;
 }
`;

// Hero banner frame: rounded, soft shadow, pill dots, hover arrows
const dotFill = keyframes`
 from { transform: scaleX(0); }
 to { transform: scaleX(1); }
`;

const HeroFrame = styled.div`
 position: relative;
 overflow: hidden;
 border-radius: ${({ theme }) => theme.tz.radius.lg}px;
 background: ${({ theme }) => theme.tz.color.mist};
 box-shadow: ${({ theme }) => theme.tz.elevation.raised};
 animation: ${heroIn} 420ms cubic-bezier(0.22, 1, 0.36, 1) both;

 .slick-slider,
 .slick-list {
  border-radius: inherit;
 }
 .slick-dotted.slick-slider {
  margin-bottom: 0;
 }
 .hero-slide img {
  display: block;
 }

 /* Pill dots: active one is wider and ember */
 .hero-dots {
  position: absolute;
  bottom: 14px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  pointer-events: none;
 }
 .hero-dots ul {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  padding: 6px 10px;
  list-style: none;
  border-radius: ${({ theme }) => theme.tz.radius.pill}px;
  background: rgba(20, 21, 32, 0.28);
  backdrop-filter: blur(4px);
  pointer-events: auto;
 }
 .hero-dots li {
  width: auto;
  height: auto;
  margin: 0;
 }
 .hero-dots li button {
  display: block;
  width: 8px;
  height: 8px;
  padding: 0;
  border: none;
  border-radius: ${({ theme }) => theme.tz.radius.pill}px;
  background: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: width ${({ theme }) => theme.tz.motion.base}, background-color ${({ theme }) => theme.tz.motion.base};
 }
 .hero-dots li button:before {
  display: none;
 }
 .hero-dots li button:hover {
  background: #fff;
 }
 .hero-dots li button:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
 /* active dot = a small progress bar that fills over one slide's time */
 .hero-dots li button {
  position: relative;
  overflow: hidden;
 }
 .hero-dots li.slick-active button {
  width: 32px;
  background: rgba(255, 255, 255, 0.55);
 }
 .hero-dots li.slick-active button::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: ${({ theme }) => theme.tz.color.ember};
  transform: scaleX(0);
  transform-origin: left center;
  animation: ${dotFill} 4.5s linear forwards;
 }
 /* slider pauses on hover, so does the progress */
 &:hover .hero-dots li.slick-active button::after {
  animation-play-state: paused;
 }

 /* Prev / next arrows, shown on hover or keyboard focus */
 .hero-arrow {
  position: absolute;
  top: 50%;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  line-height: 1;
  color: ${({ theme }) => theme.tz.color.ink};
  background: rgba(255, 255, 255, 0.92);
  box-shadow: ${({ theme }) => theme.tz.elevation.raised};
  cursor: pointer;
  opacity: 0;
  transform: translateY(-50%) scale(0.9);
  transition: opacity ${({ theme }) => theme.tz.motion.base}, transform ${({ theme }) => theme.tz.motion.base},
   color ${({ theme }) => theme.tz.motion.fast};
 }
 .hero-arrow.prev {
  left: 14px;
 }
 .hero-arrow.next {
  right: 14px;
 }
 &:hover .hero-arrow,
 .hero-arrow:focus-visible {
  opacity: 1;
  transform: translateY(-50%) scale(1);
 }
 .hero-arrow:hover {
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .hero-arrow:active {
  transform: translateY(-50%) scale(0.94);
 }
 .hero-arrow:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 @media (max-width: 1023px) {
  border-radius: ${({ theme }) => theme.tz.radius.md}px;

  .hero-dots {
   bottom: 8px;
  }
  .hero-dots li button {
   width: 6px;
   height: 6px;
  }
  .hero-dots li.slick-active button {
   width: 16px;
  }
  .hero-arrow {
   display: none;
  }
 }

 ${({ theme }) => theme.tz.media.reducedMotion} {
  .hero-dots li.slick-active button::after {
   animation: none;
   transform: scaleX(1);
  }
  animation: none;

  .slick-track {
   transition: none !important;
  }
  .hero-dots li button,
  .hero-arrow {
   transition: none;
  }
 }
`;

export default function CarouselSlider(): JSX.Element {
 const { data: slides, isLoading, error } = useFetcher(`frontend/slider/all`);
 const [windowWidth, setWindowWidth] = useState(
  typeof window !== "undefined" ? window.innerWidth : 0
 );

 useEffect(() => {
  const handleResize = () => setWindowWidth(window.innerWidth);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
 }, []);

 const isDesktop = windowWidth >= 1024;
 const sliderRef = useRef<Slider>(null);
 const hasMany = slides?.length > 1;

 const settings = {
  dots: slides?.length > 1, // Only show dots if more than one slide
  infinite: slides?.length > 1, // Only infinite if more than one slide
  speed: 700,
  fade: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: slides?.length > 1, // Only autoplay if more than one slide
  autoplaySpeed: 4500,
  arrows: false,
  pauseOnHover: true,
  cssEase: "cubic-bezier(.2, 0, 0, 1)",
  dotsClass: "hero-dots",
  customPaging: (i: number) => <button type="button" aria-label={`Go to slide ${i + 1}`} />,
  appendDots: (dots: React.ReactNode) => (
   <div>
    <ul>{dots}</ul>
   </div>
  ),
 };

 if (isLoading) {
  return (
   <Typography>
    <Loader />
   </Typography>
  );
 }

 return (
  <>
   <Navbar navListOpen={true} />
   <div
    className="slider-container"
    style={{
     maxWidth: "1200px",
     margin: "0 auto",
     width: "100%",
     overflow: "hidden",
     position: "relative",
     display: "flex",
     flexDirection: "column",
     justifyContent: "center",
     alignItems: "center",
    }}
   >
    {error && (
     <div
      style={{
       color: "red",
       textAlign: "center",
       padding: "10px",
       backgroundColor: "rgba(255, 0, 0, 0.1)",
       borderRadius: "4px",
       margin: "10px 0",
      }}
     >
      Error loading slides: {error}
     </div>
    )}

    <div
     className="slider-wrapper"
     style={{
      display: "flex",
      width: "100%",
      height: "100%",
      justifyContent: isDesktop ? "flex-end" : "center",
      alignItems: "center",
      position: "relative",
     }}
    >
     <HeroFrame
      className="slider"
      style={{
       width: isDesktop ? "75%" : "calc(100% - 40px)",
       margin: isDesktop ? "20px 0" : "0 20px",
      }}
     >
      <Slider ref={sliderRef} {...settings}>
       {slides?.map((slide, index) => (
        <div key={index}>
         <div className="hero-slide" style={{ position: "relative" }}>
          <Image
           src={slide.slider_image?.startsWith('http') ? slide.slider_image : `${ApiBaseUrl.ImgUrl}${slide.slider_image}`}
           alt={`Slide ${index + 1}`}
           width={800}
           height={400}
           style={{
            width: "100%",
            height: "auto",
           }}
           priority={index === 0}
          />
         </div>
        </div>
       ))}
      </Slider>
      {hasMany && (
       <>
        <button
         type="button"
         className="hero-arrow prev"
         aria-label="Previous slide"
         onClick={() => sliderRef.current?.slickPrev()}
        >
         ‹
        </button>
        <button
         type="button"
         className="hero-arrow next"
         aria-label="Next slide"
         onClick={() => sliderRef.current?.slickNext()}
        >
         ›
        </button>
       </>
      )}
     </HeroFrame>
    </div>
   </div>
  </>
 );
}
