
"use client";
import { Fragment, useState, useEffect } from "react";
import Box from "@component/Box";
import Container from "@component/Container";
import Navbar from "@component/navbar/Navbar";
import { Carousel } from "@component/carousel";
import { CarouselCard1 } from "@component/carousel-cards";
import MainCarouselItem from "@models/market-1.model";

// ======================================================

export default function Section1() {
  const [carouselData, setCarouselData] = useState<MainCarouselItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const response = await fetch('https://seller.tizaraa.com/api/frontend/slider/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
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

 

  return (
    <Fragment>
      <Navbar navListOpen={true} />

      <Box bg="gray.white" mb="3.75rem">
        <Container pb="2rem">
          <Carousel
            spacing="0px"
            infinite={true}
            autoPlay={true}
            showDots={true}
            visibleSlides={1}
            showArrow={false}
            totalSlides={carouselData.length}>
            {carouselData.map((item, index) => (
              <CarouselCard1
                key={index}
                image={item.slider_image}
                buttonText={item.buttonText}
            
              />
            ))}
          </Carousel>
        </Container>
      </Box>
    </Fragment>
  );
}

"use client";
import { Fragment, useState, useEffect } from "react";
import Box from "@component/Box";
import Container from "@component/Container";
import Navbar from "@component/navbar/Navbar";
import { Carousel } from "@component/carousel";
import { CarouselCard1 } from "@component/carousel-cards";
import MainCarouselItem from "@models/market-1.model";

// ======================================================

export default function Section1() {
  const [carouselData, setCarouselData] = useState<MainCarouselItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const response = await fetch('https://seller.tizaraa.com/api/frontend/slider/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
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

 

  return (
    <Fragment>
      <Navbar navListOpen={true} />

      <Box bg="gray.white" mb="3.75rem">
        <Container pb="2rem">
          <Carousel
            spacing="0px"
            infinite={true}
            autoPlay={true}
            showDots={true}
            visibleSlides={1}
            showArrow={false}
            totalSlides={carouselData.length}>
            {carouselData.map((item, index) => (
              <CarouselCard1
                key={index}
                image={item.slider_image}
                buttonText={item.buttonText}
            
              />
            ))}
          </Carousel>
        </Container>
      </Box>
    </Fragment>
  );
}
