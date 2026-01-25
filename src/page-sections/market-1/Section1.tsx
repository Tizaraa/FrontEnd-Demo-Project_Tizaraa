"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Navbar from "@component/navbar/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import ApiBaseUrl from "api/ApiBaseUrl";
import Typography from "@component/Typography";
import Loader from "@component/loader";
import useFetcher from "@hook/useFetcher";

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

 const settings = {
  dots: slides?.length > 1, // Only show dots if more than one slide
  infinite: slides?.length > 1, // Only infinite if more than one slide
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: slides?.length > 1, // Only autoplay if more than one slide
  autoplaySpeed: 2000,
  arrows: false,
  pauseOnHover: true,
  customPaging: (i: number) => (
   <button
    style={{
     width: isDesktop ? "12px" : "8px",
     height: isDesktop ? "12px" : "8px",
     borderRadius: "50%",
     backgroundColor: "rgba(255, 255, 255, 0.5)",
     cursor: "pointer",
     border: "none",
     transition: "all 0.3s ease",
     margin: "5px",
    }}
    aria-label={`Go to slide ${i + 1}`}
   />
  ),
  appendDots: (dots: React.ReactNode) => (
   <div
    style={{
     position: "absolute",
     bottom: isDesktop ? "20px" : "10px",
     right: isDesktop ? "20px" : "0",
     left: isDesktop ? "auto" : "0",
     display: "flex",
     justifyContent: "center",
     alignItems: "center",
    }}
   >
    <div
     style={{
      background: isDesktop ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.2)",
      borderRadius: isDesktop ? "20px" : "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: isDesktop ? "10px" : "5px",
     }}
    >
     {dots}
    </div>
   </div>
  ),
 };

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
     {isLoading ? (
      <Typography>
       <Loader />
      </Typography>
     ) : (
      <div
       className="slider"
       style={{
        width: isDesktop ? "75%" : "calc(100% - 40px)",
        margin: isDesktop ? "20px 0" : "0 20px",
        borderRadius: "12px",
        overflow: "hidden",
       }}
      >
       <Slider {...settings}>
        {slides?.map((slide, index) => (
         <div key={index}>
          <div
           style={{
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
           }}
          >
           <Image
            src={`${ApiBaseUrl.ImgUrl}${slide.slider_image}`}
            alt={`Slide ${index + 1}`}
            width={800}
            height={400}
            style={{
             width: "100%",
             height: "auto",
             borderRadius: "12px",
            }}
            priority={index === 0}
           />
          </div>
         </div>
        ))}
       </Slider>
      </div>
     )}
    </div>
   </div>
   <style jsx global>{`
    .slick-dots li button:before {
     display: none;
    }
    .slick-dots li.slick-active button {
     background-color: #fff !important;
     transform: scale(1.2);
    }
   `}</style>
  </>
 );
}
