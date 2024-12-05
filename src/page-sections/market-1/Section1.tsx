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

'use client'

import React, { useEffect, useState, useCallback, useRef } from 'react'
import Navbar from "@component/navbar/Navbar"

interface Slide {
  slider_image: string
}

export default function CarouselSlider(): JSX.Element {
  const [slides, setSlides] = useState<Slide[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const slideInterval = useRef<NodeJS.Timeout | null>(null)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)

  // Fetch slides from API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch('https://seller.tizaraa.com/api/frontend/slider/all')
        const data = await response.json()
        setSlides(data)
      } catch (error) {
        console.error('Error fetching slides:', error)
      }
    }
    fetchSlides()
  }, [])

  // Handle auto-sliding
  const nextSlide = useCallback(() => {
    if (isTransitioning || slides.length === 0) return

    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => prevIndex + 1)

    // If it's the last clone slide, reset to the first slide
    setTimeout(() => {
      if (currentIndex === slides.length) {
        setCurrentIndex(0)
        setIsTransitioning(false)
      } else {
        setIsTransitioning(false)
      }
    }, 500)
  }, [currentIndex, slides.length, isTransitioning])

  // Set up auto-sliding interval
  useEffect(() => {
    if (slides.length > 0) {
      slideInterval.current = setInterval(nextSlide, 3000)
    }
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current)
      }
    }
  }, [slides.length, nextSlide])

  // Reset interval when manually changing slides
  const resetInterval = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current)
      slideInterval.current = setInterval(nextSlide, 3000)
    }
  }

  // Handle dot click
  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
    resetInterval()
  }

  return (
    <>
      <Navbar navListOpen={true} />
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Empty space for desktop/laptop view */}
          <div
            style={{
              display: window.innerWidth >= 1024 ? 'block' : 'none',
              width: '30%',
              height: '100%',
            }}
          ></div>

          {/* Slider Container */}
          <div
            style={{
              width: window.innerWidth >= 1024 ? '95%' : '100%',
              height: window.innerWidth >= 1024 ? '470px' : '300px', // Adjust height for different views
              position: 'relative',
              overflow: 'hidden',
              margin: window.innerWidth < 1024 ? '0 12px' : '0',
            }}
          >
            <div
              style={{
                display: 'flex',
                height: '100%',
                transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  style={{
                    minWidth: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      padding: '20px 0px',
                      boxSizing: 'border-box',
                    }}
                  >
                    {/* Image Section */}
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                      }}
                    >
                      <img
                        src={slide.slider_image}
                        alt={`Slide ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'fill',
                          borderRadius: '12px',
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {/* Clone the first slide for seamless looping */}
              {slides.length > 0 && (
                <div
                  style={{
                    minWidth: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      padding: '10px',
                      boxSizing: 'border-box',
                    }}
                  >
                    {/* Image Section for the clone */}
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                      }}
                    >
                      <img
                        src={slides[0].slider_image}
                        alt="First Slide Clone"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '12px',
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dots Navigation */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px', // Minimal gap for dots
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              style={{
                width: '12px', // Small dots
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: index === currentIndex % slides.length ? '#000' : '#ccc',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s ease',
                transform: index === currentIndex % slides.length ? 'scale(1.2)' : 'scale(1)',
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  )
}






// 'use client'

// import { useEffect, useState, useCallback, useRef } from 'react'
// import Navbar from "@component/navbar/Navbar"

// interface Slide {
//   slider_image: string
// }

// export default function Slider() {
//   const [slides, setSlides] = useState<Slide[]>([])
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [direction, setDirection] = useState<'left' | 'right'>('right')
//   const [isMobileView, setIsMobileView] = useState(false)
//   const slideInterval = useRef<NodeJS.Timeout>()

//   // Detect screen size
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobileView(window.innerWidth < 768)
//     }
//     handleResize()
//     window.addEventListener('resize', handleResize)
//     return () => {
//       window.removeEventListener('resize', handleResize)
//     }
//   }, [])

//   // Fetch slides from API
//   useEffect(() => {
//     const fetchSlides = async () => {
//       try {
//         const response = await fetch('https://seller.tizaraa.com/api/frontend/slider/all')
//         const data = await response.json()
//         setSlides(data)
//       } catch (error) {
//         console.error('Error fetching slides:', error)
//       }
//     }
//     fetchSlides()
//   }, [])

//   // Handle auto-sliding
//   const nextSlide = useCallback(() => {
//     setCurrentIndex((prevIndex) => {
//       if (direction === 'right') {
//         if (prevIndex === slides.length - 1) {
//           setDirection('left')
//           return prevIndex - 1
//         }
//         return prevIndex + 1
//       } else {
//         if (prevIndex === 0) {
//           setDirection('right')
//           return prevIndex + 1
//         }
//         return prevIndex - 1
//       }
//     })
//   }, [slides.length, direction])

//   // Set up auto-sliding interval
//   useEffect(() => {
//     if (slides.length > 0) {
//       slideInterval.current = setInterval(nextSlide, 3000)
//       return () => {
//         if (slideInterval.current) {
//           clearInterval(slideInterval.current)
//         }
//       }
//     }
//   }, [slides.length, nextSlide])

//   // Reset interval when manually changing slides
//   const resetInterval = () => {
//     if (slideInterval.current) {
//       clearInterval(slideInterval.current)
//       slideInterval.current = setInterval(nextSlide, 3000)
//     }
//   }

//   // Handle dot click
//   const handleDotClick = (index: number) => {
//     setCurrentIndex(index)
//     resetInterval()
//   }

//   return (
//     <>
//     <Navbar navListOpen={true} />
//     <div 
//       style={{
//         width: '100%',
//         position: 'relative',
//         overflow: 'hidden',
//         padding: '20px',
//         boxSizing: 'border-box',
//       }}
//     >
//       <div
//         style={{
//           width: '100%',
//           maxWidth: '1200px',
//           margin: '0 auto',
//           display: 'flex',
//           justifyContent: isMobileView ? 'center' : 'space-between',
//         }}
//       >
//         <div
//           style={{
//             width: isMobileView ? '100%' : '60%',
//             boxSizing: 'border-box',
//             padding: '0 10px',
//           }}
//         >
//           {slides.length > 0 && (
//             <div
//               style={{
//                 position: 'relative',
//                 width: '100%',
//                 paddingTop: '56.25%', // 16:9 aspect ratio
//                 borderRadius: '12px',
//                 overflow: 'hidden',
//               }}
//             >
//               {slides.map((slide, index) => (
//                 <div
//                   key={index}
//                   style={{
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     width: '100%',
//                     height: '100%',
//                     opacity: index === currentIndex ? 1 : 0,
//                     transition: 'opacity 0.5s ease-in-out',
//                   }}
//                 >
//                   <img
//                     src={slide.slider_image}
//                     alt={`Slide ${index + 1}`}
//                     style={{
//                       width: '100%',
//                       height: '100%',
//                       objectFit: 'cover',
//                       borderRadius: '12px',
//                     }}
//                   />
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Dots navigation */}
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'center',
//               gap: '8px',
//               marginTop: '16px',
//             }}
//           >
//             {slides.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleDotClick(index)}
//                 style={{
//                   width: '12px',
//                   height: '12px',
//                   borderRadius: '50%',
//                   border: 'none',
//                   backgroundColor: index === currentIndex ? '#000' : '#ccc',
//                   cursor: 'pointer',
//                   padding: 0,
//                   transition: 'background-color 0.3s ease',
//                 }}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//         {!isMobileView && (
//           <div
//             style={{
//               display: 'block',
//               width: '40%',
//             }}
//           >
//             {/* Add any additional content or space here */}
//           </div>
//         )}
//       </div>
//     </div>
//     </>
//   )
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

//     const slideWidth = 100 / carouselData.length;

//     const timer = setInterval(() => {
//       setCurrentSlide((prevSlide) => {
//         const nextSlide = prevSlide + 1;
//         if (nextSlide >= carouselData.length) {
//           setTimeout(() => {
//             if (carouselRef.current) {
//               carouselRef.current.style.transition = 'none';
//               carouselRef.current.style.transform = `translateX(0%)`; // Reset to start from the first slide
//               setTimeout(() => {
//                 if (carouselRef.current) {
//                   carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
//                 }
//               }, 50);
//             }
//             setCurrentSlide(0); // Go back to the first slide
//           }, 500);
//           return carouselData.length - 1; // Ensure it loops properly
//         }
//         return nextSlide;
//       });
//     }, 2000);

//     return () => clearInterval(timer);
//   }, [carouselData]);

//   const handleDotClick = (index: number) => {
//     setCurrentSlide(index);
//   };

//   const slideWidth = carouselData.length > 0 ? 100 / carouselData.length : 100;

//   return (
//     <Fragment>
//       <Navbar navListOpen={true} />

//       <Box bg="gray.white" mb="3.75rem">
//         <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap', padding: '0 20px' }}>
//           {/* Left sidebar */}
//           <div style={{ width: '25%', minWidth: '250px', padding: '1rem' }}></div>

//           {/* Right side carousel */}
//           <div
//             style={{
//               width: '75%',
//               position: 'relative',
//               overflow: 'hidden',
//               padding: '0 1rem',
//               minWidth: "300px",
//               boxSizing: 'border-box',
//               backgroundColor: '#fff', // White background for the extra parts
//             }}
//           >
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
//                     width: `${carouselData.length * 100}%`, // Container width equals total slide width
//                     height: '450px',
                    
//                     position: 'relative', // Ensure proper stacking
//                   }}
//                 >
//                   {carouselData.map((item, index) => (
//                     <div
//                       key={index}
//                       style={{
//                         width: `${slideWidth}%`, // Width per slide based on number of slides
//                         height: '100%',
//                         position: 'relative',
//                         overflow: 'hidden', // Prevent content overflow
//                       }}
//                     >
//                       <img
//                         src={item.slider_image}
//                         alt={`Slide ${index + 1}`}
//                         style={{
//                           width: '100%',
//                           height: '100%',
//                           objectFit: 'cover',
//                           objectPosition: 'center center', // Center image in its container
//                         }}
//                       />
//                     </div>
//                   ))}
//                 </div>
//                 <div
//                   style={{
//                     position: 'absolute',
//                     bottom: '20px',
//                     left: '50%',
//                     transform: 'translateX(-50%)',
//                     display: 'flex',
//                     gap: '10px',
//                     zIndex: '10',
//                   }}
//                 >
//                   {carouselData.map((_, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handleDotClick(index)}
//                       style={{
//                         width: '10px',
//                         height: '10px',
//                         borderRadius: '50%',
//                         border: 'none',
//                         backgroundColor: currentSlide === index ? '#000' : '#ccc',
//                         cursor: 'pointer',
//                       }}
//                     />
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </Box>

//       {/* Media Queries for responsiveness */}
//       <style jsx>{`
//         @media (max-width: 1024px) {
//           div[style*='width: 75%'] {
//             width: 100% !important;
//             padding: 0 !important;
//           }

//           div[style*='width: 100%'] {
//             width: 100% !important;
//           }

//           div[style*='height: 450px'] {
//             height: auto !important;
//           }

//           .carousel-wrapper {
//             width: 100%;
//           }

//           .carousel-item {
//             width: 100%;
//           }

//           .dot-container {
//             bottom: 15px;
//             left: 50%;
//           }
//         }

//         @media (max-width: 768px) {
//           div[style*='width: 75%'] {
//             width: 100% !important;
//             padding: 0 !important;
//           }

//           div[style*='width: 100%'] {
//             width: 100% !important;
//           }

//           div[style*='height: 450px'] {
//             height: auto !important;
//           }
//         }

//         @media (max-width: 480px) {
//           div[style*='width: 75%'] {
//             width: 100% !important;
//             padding: 0 !important;
//           }

//           div[style*='width: 100%'] {
//             width: 100% !important;
//           }

//           div[style*='height: 450px'] {
//             height: auto !important;
//           }
//         }
//       `}</style>
//     </Fragment>
//   );
// }
