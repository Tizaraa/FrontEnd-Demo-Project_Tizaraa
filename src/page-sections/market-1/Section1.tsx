// import { Fragment } from "react";
// import Box from "@component/Box";
// import Container from "@component/Container";
// import Navbar from "@component/navbar/Navbar";
// import { Carousel } from "@component/carousel";
// import { CarouselCard1 } from "@component/carousel-cards";
// import MainCarouselItem from "@models/market-1.model";

// // ======================================================
// type Props = { carouselData: MainCarouselItem[] };
// // ======================================================

// export default function Section1({ carouselData }: Props) {
//   return (
//     <Fragment>
//       <Navbar navListOpen={true} />

//       <Box bg="gray.white" mb="3.75rem">
//         <Container pb="2rem">
//           <Carousel
//             spacing="0px"
//             infinite={true}
//             autoPlay={true}
//             showDots={true}
//             visibleSlides={1}
//             showArrow={false}
//             totalSlides={carouselData.length}>
//             {carouselData.map((item, index) => (
//               <CarouselCard1
//                 key={index}
//                 title={item.title}
//                 image={item.imgUrl}
//                 buttonText={item.buttonText}
//                 description={item.description}
//               />
//             ))}
//           </Carousel>
//         </Container>
//       </Box>
//     </Fragment>
//   );
// }

// "use client";
// import { Fragment, useState, useEffect } from "react";
// import Box from "@component/Box";
// import Container from "@component/Container";
// import Navbar from "@component/navbar/Navbar";
// import { Carousel } from "@component/carousel";
// import { CarouselCard1 } from "@component/carousel-cards";
// import MainCarouselItem from "@models/market-1.model";
// import { Vortex } from "react-loader-spinner";
// import styled from "@emotion/styled";

// const LoaderWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// // ======================================================

// export default function Section1() {
//   const [carouselData, setCarouselData] = useState<MainCarouselItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCarouselData = async () => {
//       try {
//         const response = await fetch(
//           "https://seller.tizaraa.com/api/frontend/slider/all"
//         );
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data: MainCarouselItem[] = await response.json();
//         setCarouselData(data);
//       } catch (error: any) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCarouselData();
//   }, []);

//   return (
//     <Fragment>
//       <Navbar navListOpen={true} />

//       <Box bg="gray.white" mb="3.75rem">
//         <div className="container w-75 mx-auto pb-1">
//           <Container pb="1rem">
//             <Carousel
//               spacing="0px"
//               infinite={true}
//               autoPlay={true}
//               showDots={true}
//               visibleSlides={1}
//               showArrow={false}
//               totalSlides={carouselData.length}
//             >
//               {carouselData.map((item, index) => (
//                 <CarouselCard1
//                   key={index}
//                   image={item.slider_image}
//                   // buttonText={item.buttonText}
//                 />
//               ))}
//             </Carousel>
//             {loading && (
//               <LoaderWrapper>
//                 <Vortex />
//               </LoaderWrapper>
//             )}
//           </Container>
//         </div>
//       </Box>
//     </Fragment>
//   );
// }


// "use client";

// import { Fragment, useState, useEffect, useRef } from "react";
// import Box from "@component/Box";
// import Container from "@component/Container";
// import Navbar from "@component/navbar/Navbar";
// import MainCarouselItem from "@models/market-1.model";
// import { Vortex } from "react-loader-spinner";

// export default function Section1() {
//   const [carouselData, setCarouselData] = useState<MainCarouselItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const carouselRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const fetchCarouselData = async () => {
//       try {
//         const response = await fetch(
//           "https://seller.tizaraa.com/api/frontend/slider/all"
//         );
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data: MainCarouselItem[] = await response.json();
//         setCarouselData(data);
//       } catch (error: any) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCarouselData();
//   }, []);

//   useEffect(() => {
//     if (carouselData.length === 0) return;

//     const slideWidth = 100 / (carouselData.length + 2);
//     const totalWidth = (carouselData.length + 2) * slideWidth;

//     const timer = setInterval(() => {
//       setCurrentSlide((prevSlide) => {
//         const nextSlide = prevSlide + 1;
//         if (nextSlide >= carouselData.length + 1) {
//           setTimeout(() => {
//             if (carouselRef.current) {
//               carouselRef.current.style.transition = 'none';
//               carouselRef.current.style.transform = `translateX(-${slideWidth}%)`;
//               setTimeout(() => {
//                 if (carouselRef.current) {
//                   carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
//                 }
//               }, 50);
//             }
//             setCurrentSlide(1);
//           }, 500);
//           return carouselData.length;
//         }
//         return nextSlide;
//       });
//     }, 2000);

//     return () => clearInterval(timer);
//   }, [carouselData]);

//   const handleDotClick = (index: number) => {
//     setCurrentSlide(index + 1);
//   };

//   const slideWidth = carouselData.length > 0 ? 100 / (carouselData.length + 2) : 100;

//   return (
//     <Fragment>
//       <Navbar navListOpen={true} />

//       <Box bg="gray.white" mb="3.75rem">
//         <div style={{ display: 'flex', width: '100%' }}>
//           {/* Left sidebar - assuming Navbar component renders this */}
//           <div style={{ width: '25%' }}>
//             {/* Sidebar content will be rendered by Navbar component */}
//           </div>

//           {/* Right side carousel */}
//           <div style={{ width: '75%', position: 'relative', overflow: 'hidden' }}>
//             {loading ? (
//               <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
//                 <Vortex />
//               </div>
//             ) : error ? (
//               <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>
//             ) : (
//               <>
//                 <div
//                   ref={carouselRef}
//                   style={{
//                     display: 'flex',
//                     transition: 'transform 0.5s ease-in-out',
//                     transform: `translateX(-${currentSlide * slideWidth}%)`,
//                     width: `${(carouselData.length + 2) * 100}%`,
//                     height: '450px'
//                   }}
//                 >
//                   <div style={{ width: `${slideWidth}%`, height: '100%' }}>
//                     <img
//                       src={carouselData[carouselData.length - 1]?.slider_image}
//                       alt="Last Slide"
//                       style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                     />
//                   </div>
//                   {carouselData.map((item, index) => (
//                     <div key={index} style={{ width: `${slideWidth}%`, height: '100%' }}>
//                       <img
//                         src={item.slider_image}
//                         alt={`Slide ${index + 1}`}
//                         style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                       />
//                     </div>
//                   ))}
//                   <div style={{ width: `${slideWidth}%`, height: '100%' }}>
//                     <img
//                       src={carouselData[0]?.slider_image}
//                       alt="First Slide"
//                       style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                     />
//                   </div>
//                 </div>
//                 <div style={{
//                   position: 'absolute',
//                   bottom: '20px',
//                   left: '50%',
//                   transform: 'translateX(-50%)',
//                   display: 'flex',
//                   gap: '10px'
//                 }}>
//                   {carouselData.map((_, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handleDotClick(index)}
//                       style={{
//                         width: '10px',
//                         height: '10px',
//                         borderRadius: '50%',
//                         border: 'none',
//                         backgroundColor: currentSlide === index + 1 ? '#000' : '#ccc',
//                         cursor: 'pointer'
//                       }}
//                     />
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </Box>
//     </Fragment>
//   );
// }


"use client";

import { Fragment, useState, useEffect, useRef } from "react";
import Box from "@component/Box";
import Container from "@component/Container";
import Navbar from "@component/navbar/Navbar";
import MainCarouselItem from "@models/market-1.model";
import { Vortex } from "react-loader-spinner";

export default function Section1() {
  const [carouselData, setCarouselData] = useState<MainCarouselItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const response = await fetch(
          "https://seller.tizaraa.com/api/frontend/slider/all"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: MainCarouselItem[] = await response.json();
        setCarouselData(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselData();
  }, []);

  useEffect(() => {
    if (carouselData.length === 0) return;

    const slideWidth = 100 / carouselData.length;

    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        const nextSlide = prevSlide + 1;
        if (nextSlide >= carouselData.length) {
          setTimeout(() => {
            if (carouselRef.current) {
              carouselRef.current.style.transition = 'none';
              carouselRef.current.style.transform = `translateX(0%)`; // Reset to start from the first slide
              setTimeout(() => {
                if (carouselRef.current) {
                  carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
                }
              }, 50);
            }
            setCurrentSlide(0); // Go back to the first slide
          }, 500);
          return carouselData.length - 1; // Ensure it loops properly
        }
        return nextSlide;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [carouselData]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const slideWidth = carouselData.length > 0 ? 100 / carouselData.length : 100;

  return (
    <Fragment>
      <Navbar navListOpen={true} />

      <Box bg="gray.white" mb="3.75rem">
        <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap', padding: '0 20px' }}>
          {/* Left sidebar */}
          <div style={{ width: '25%', minWidth: '250px', padding: '1rem' }}></div>

          {/* Right side carousel */}
          <div
            style={{
              width: '75%',
              position: 'relative',
              overflow: 'hidden',
              padding: '0 1rem',
              minWidth: "300px",
              boxSizing: 'border-box',
              backgroundColor: '#fff', // White background for the extra parts
            }}
          >
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                <Vortex />
              </div>
            ) : error ? (
              <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>
            ) : (
              <>
                <div
                  ref={carouselRef}
                  style={{
                    display: 'flex',
                    transition: 'transform 0.5s ease-in-out',
                    transform: `translateX(-${currentSlide * slideWidth}%)`,
                    width: `${carouselData.length * 100}%`, // Container width equals total slide width
                    height: '450px',
                    flexWrap: 'nowrap',
                    position: 'relative', // Ensure proper stacking
                  }}
                >
                  {carouselData.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        width: `${slideWidth}%`, // Width per slide based on number of slides
                        height: '100%',
                        position: 'relative',
                        overflow: 'hidden', // Prevent content overflow
                      }}
                    >
                      <img
                        src={item.slider_image}
                        alt={`Slide ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center center', // Center image in its container
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '10px',
                    zIndex: '10',
                  }}
                >
                  {carouselData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        border: 'none',
                        backgroundColor: currentSlide === index ? '#000' : '#ccc',
                        cursor: 'pointer',
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </Box>

      {/* Media Queries for responsiveness */}
      <style jsx>{`
        @media (max-width: 1024px) {
          div[style*='width: 75%'] {
            width: 100% !important;
            padding: 0 !important;
          }

          div[style*='width: 100%'] {
            width: 100% !important;
          }

          div[style*='height: 450px'] {
            height: auto !important;
          }

          .carousel-wrapper {
            width: 100%;
          }

          .carousel-item {
            width: 100%;
          }

          .dot-container {
            bottom: 15px;
            left: 50%;
          }
        }

        @media (max-width: 768px) {
          div[style*='width: 75%'] {
            width: 100% !important;
            padding: 0 !important;
          }

          div[style*='width: 100%'] {
            width: 100% !important;
          }

          div[style*='height: 450px'] {
            height: auto !important;
          }
        }

        @media (max-width: 480px) {
          div[style*='width: 75%'] {
            width: 100% !important;
            padding: 0 !important;
          }

          div[style*='width: 100%'] {
            width: 100% !important;
          }

          div[style*='height: 450px'] {
            height: auto !important;
          }
        }
      `}</style>
    </Fragment>
  );
}
