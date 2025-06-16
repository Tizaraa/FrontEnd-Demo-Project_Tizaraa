// 'use client';

// import React, { useEffect, useState } from 'react';
// import Slider from "react-slick";
// import Navbar from "@component/navbar/Navbar";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import { Vortex } from "react-loader-spinner";
// import styled from "@emotion/styled";
// import Image from 'next/image';
// import ApiBaseUrl from 'api/ApiBaseUrl';

// const LoaderWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// interface Slide {
//   slider_image: string;
// }

// export default function CarouselSlider(): JSX.Element {
//   const [slides, setSlides] = useState<Slide[]>([]);
//   const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const CACHE_KEY = "carousel-slides";
//   const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

//   // Fetch slides from API or localStorage
//   useEffect(() => {
//     const fetchSlides = async () => {
//       const cachedSlides = localStorage.getItem(CACHE_KEY);
//       const cacheTimestamp = localStorage.getItem(`${CACHE_KEY}-timestamp`);

//       // If cached data exists and is within the expiry time
//       if (cachedSlides && cacheTimestamp) {
//         const currentTime = Date.now();
//         const timeDiff = currentTime - parseInt(cacheTimestamp, 10);

//         if (timeDiff < CACHE_EXPIRY) {
//           try {
//             // Decrypt the slides data before setting it in state
//             const decryptedSlides = JSON.parse(atob(cachedSlides)); // Decoding from base64
//             setSlides(decryptedSlides);
//             setLoading(false);
//             return;
//           } catch (error) {
//             console.error("Failed to decode base64 data", error);
//             // If decryption fails, proceed with fetching fresh data
//           }
//         }
//       }

//       // Make API call if no valid cache exists
//       try {
//         const response = await fetch('https://seller.tizaraa.shop/api/frontend/slider/all',{
//           cache:"force-cache"
//         });

//         const data = await response.json();

//         // Encrypt the slides data before storing it in localStorage
//         const encryptedSlides = btoa(JSON.stringify(data)); // Encoding to base64
//         localStorage.setItem(CACHE_KEY, encryptedSlides);
//         localStorage.setItem(`${CACHE_KEY}-timestamp`, Date.now().toString());

//         setSlides(data);
//       } catch (error: any) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSlides();

//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const isDesktop = windowWidth >= 1024;

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     arrows: false,
//     pauseOnHover: true,
//     customPaging: (i: number) => (
//       <button
//         style={{
//           width: isDesktop ? '12px' : '8px',
//           height: isDesktop ? '12px' : '8px',
//           borderRadius: '50%',
//           backgroundColor: 'rgba(255, 255, 255, 0.5)',
//           cursor: 'pointer',
//           border: 'none',
//           transition: 'all 0.3s ease',
//           margin: '5px',
//         }}
//         aria-label={`Go to slide ${i + 1}`}
//       />
//     ),
//     appendDots: (dots: React.ReactNode) => (
//       <div
//         style={{
//           position: 'absolute',
//           bottom: isDesktop ? '20px' : '10px',
//           right: isDesktop ? '20px' : '0',
//           left: isDesktop ? 'auto' : '0',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <div
//           style={{
//             background: isDesktop ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.2)',
//             borderRadius: isDesktop ? '20px' : '10px',
//             display: 'flex',
//             justifyContent: "center",
//             alignItems: 'center',
//             padding: isDesktop ? "10px" : "5px",
//           }}
//         >
//           {dots}
//         </div>
//       </div>
//     ),
//   };

//   return (
//     <>
//       <Navbar navListOpen={true} />
//       <div className="slider-container" style={{
//         maxWidth: '1200px',
//         margin: '0 auto',
//         width: '100%',
//         overflow: 'hidden',
//         position: 'relative',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//         <div className="slider-wrapper" style={{
//           display: 'flex',
//           width: '100%',
//           height: '100%',
//           justifyContent: isDesktop ? 'flex-end' : 'center',
//           alignItems: 'center',
//           position: 'relative',
//         }}>
//           <div className="slider" style={{
//             width: isDesktop ? '75%' : 'calc(100% - 40px)',
//             margin: isDesktop ? '20px 0' : '0 20px',
//             borderRadius: '12px',
//             overflow: 'hidden',
//           }}>
//             <Slider {...settings}>
//               {slides.map((slide, index) => (
//                 <div key={index} className="slide" style={{
//                   width: '100%',
//                   height: '100%',
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                   <div className="slide-content" style={{
//                     width: '100%',
//                     height: '100%',
//                     position: 'relative',
//                   }}>
//                     <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden" }}>
//                       <Image
//                         // src={slide.slider_image}
//                         src={`${ApiBaseUrl.ImgUrl}${slide.slider_image}`}
//                         alt={`Slide ${index + 1}`}
//                         layout="responsive"
//                         width={400}
//                         height={40}
//                         objectFit="fill"
//                         style={{ borderRadius: "12px" }}
//                       />
//                     </div>

//                     <div className="slide-overlay" style={{
//                       position: 'absolute',
//                       top: 0,
//                       left: 0,
//                       right: 0,
//                       bottom: 0,
//                       borderRadius: '12px',
//                     }} />
//                   </div>
//                 </div>
//               ))}
//             </Slider>
//           </div>
//         </div>
//         {loading && (
//           <LoaderWrapper>
//             <Vortex />
//           </LoaderWrapper>
//         )}
//       </div>
//       <style jsx global>{`
//         .slick-dots li button:before {
//           display: none;
//         }
//         .slick-dots li.slick-active button {
//           background-color: #fff !important;
//           transform: scale(1.2);
//         }
//       `}</style>
//     </>
//   );
// }

// Responsive carousel that loads fresh slides on every load
"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Navbar from "@component/navbar/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Vortex } from "react-loader-spinner";
import styled from "@emotion/styled";
import Image from "next/image";
import ApiBaseUrl from "api/ApiBaseUrl";
import Typography from "@component/Typography";
import Loader from "@component/loader";

// const LoaderWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

interface Slide {
  slider_image: string;
}

export default function CarouselSlider(): JSX.Element {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch slides directly from API with cache busting
  useEffect(() => {
    const fetchSlides = async () => {
      setLoading(true);
      try {
        // Add timestamp to URL to prevent caching
        const response = await fetch(
          `https://seller.tizaraa.shop/api/frontend/slider/all?t=${Date.now()}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch slides: ${response.status}`);
        }

        const data = await response.json();
        setSlides(data);
        setError(null);
      } catch (error: any) {
        setError(error.message);
        console.error("Error fetching slides:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isDesktop = windowWidth >= 1024;

  const settings = {
    dots: slides.length > 1, // Only show dots if more than one slide
    infinite: slides.length > 1, // Only infinite if more than one slide
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: slides.length > 1, // Only autoplay if more than one slide
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
          {loading ? (
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
                {slides.map((slide, index) => (
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
