import { Children, Fragment } from "react";
import { CSSProperties } from "styled-components";
import clsx from "clsx";
import { ButtonBack, ButtonNext, DotGroup, Slide, Slider } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
// GLOBAL CUSTOM COMPONENTS
import Icon from "@component/icon/Icon";
import { IconButton } from "@component/buttons";
// STYLED COMPONENT
import { StyledCarousel } from "./styles";
// CUSTOM DATA MODEL
import { colorOptions } from "interfaces";


// ====================================================
export interface CarouselProps {
  naturalSlideWidth?: number;
  naturalSlideHeight?: number;
  totalSlides?: number;
  visibleSlides?: number;
  currentSlide?: number;
  isIntrinsicHeight?: boolean;
  hasMasterSpinner?: boolean;
  infinite?: boolean;
  autoPlay?: boolean;
  step?: number;
  interval?: number;
  showDots?: boolean;
  showArrow?: boolean;
  showArrowOnHover?: boolean;
  dotClass?: string;
  dotColor?: string;
  dotGroupMarginTop?: string;
  spacing?: string;
  arrowButtonColor?: colorOptions;
  arrowButtonClass?: string;
  leftButtonClass?: string;
  rightButtonClass?: string;
  leftButtonStyle?: CSSProperties;
  rightButtonStyle?: CSSProperties;
  children: any;
}
// ====================================================

const Carousel = ({
  children,
  currentSlide,
  showArrowOnHover,
  dotClass,
  dotColor,
  arrowButtonClass,
  leftButtonClass,
  rightButtonClass,
  leftButtonStyle,
  rightButtonStyle,
  step = 1,
  totalSlides = 5,
  visibleSlides = 5,
  spacing = "1.5rem",
  infinite = true,
  autoPlay = false,
  interval = 2000,
  showDots = false,
  showArrow = true,
  naturalSlideWidth = 100,
  naturalSlideHeight = 125,
  isIntrinsicHeight = true,
  hasMasterSpinner = false,
  dotGroupMarginTop = "2rem",
  arrowButtonColor = "secondary"
}: CarouselProps) => {
  return (
    <StyledCarousel
      step={step}
      spacing={spacing}
      showDots={showDots}
      infinite={infinite}
      interval={interval}
      dotColor={dotColor}
      isPlaying={autoPlay}
      totalSlides={totalSlides}
      currentSlide={currentSlide}
      visibleSlides={visibleSlides}
      hasMasterSpinner={hasMasterSpinner}
      showArrowOnHover={showArrowOnHover}
      naturalSlideWidth={naturalSlideWidth}
      isIntrinsicHeight={isIntrinsicHeight}
      dotGroupMarginTop={dotGroupMarginTop}
      naturalSlideHeight={naturalSlideHeight}>
      <Slider className="custom-slider">
        {Children.map(children, (child, ind) => (
          <Slide index={ind} key={ind}>
            {child}
          </Slide>
        ))}
      </Slider>

      {showDots && (
        <DotGroup
          className={`custom-dot ${dotClass}`}
          renderDots={(props: any) => renderDots({ ...props, step })}
        />
      )}

      {showArrow && (
        <Fragment>
          <IconButton
            as={ButtonBack}
            variant="contained"
            color={arrowButtonColor}
            style={leftButtonStyle || {}}
            className={`arrow-button left-arrow-class ${arrowButtonClass} ${leftButtonClass}`}>
            <Icon variant="small" defaultcolor="currentColor">
              arrow-left
            </Icon>
          </IconButton>

          <IconButton
            as={ButtonNext}
            variant="contained"
            color={arrowButtonColor}
            style={rightButtonStyle || {}}
            className={`arrow-button right-arrow-class ${arrowButtonClass} ${rightButtonClass}`}>
            <Icon variant="small" defaultcolor="currentColor">
              arrow-right
            </Icon>
          </IconButton>
        </Fragment>
      )}
    </StyledCarousel>
  );
};

const renderDots = ({ step, currentSlide, visibleSlides, totalSlides, carouselStore }: any) => {
  const dots = [];
  const total = totalSlides - visibleSlides + 1;

  for (let i = 0; i < total; i += step) {
    dots.push(
      <div
        key={i}
        className={clsx({ dot: true, "dot-active": currentSlide === i })}
        onClick={() => carouselStore.setStoreState({ currentSlide: i, autoPlay: false })}
      />
    );

    if (total - i - 1 < step && total - i - 1 !== 0) {
      dots.push(
        <div
          key={i + total}
          className={clsx({
            dot: true,
            "dot-active": currentSlide === totalSlides - visibleSlides
          })}
          onClick={() =>
            carouselStore.setStoreState({
              currentSlide: totalSlides - visibleSlides,
              autoPlay: false
            })
          }
        />
      );
    }
  }
  return dots;
};

export default Carousel;







// import { Children, Fragment, useEffect, useState } from "react";
// import { CSSProperties } from "styled-components";
// import clsx from "clsx";
// import { ButtonBack, ButtonNext, DotGroup, Slide, Slider } from "pure-react-carousel";
// import "pure-react-carousel/dist/react-carousel.es.css";
// // GLOBAL CUSTOM COMPONENTS
// import Icon from "@component/icon/Icon";
// import { IconButton } from "@component/buttons";
// // STYLED COMPONENT
// import { StyledCarousel } from "./styles";
// // CUSTOM DATA MODEL
// import { colorOptions } from "interfaces";

// // ====================================================

// export interface CarouselProps {
//   naturalSlideWidth?: number;
//   naturalSlideHeight?: number;
//   totalSlides?: number;
//   visibleSlides?: number;
//   currentSlide?: number;
//   isIntrinsicHeight?: boolean;
//   hasMasterSpinner?: boolean;
//   infinite?: boolean;
//   autoPlay?: boolean;
//   step?: number;
//   interval?: number;
//   showDots?: boolean;
//   showArrow?: boolean;
//   showArrowOnHover?: boolean;
//   dotClass?: string;
//   dotColor?: string;
//   dotGroupMarginTop?: string;
//   spacing?: string;
//   arrowButtonColor?: colorOptions;
//   arrowButtonClass?: string;
//   leftButtonClass?: string;
//   rightButtonClass?: string;
//   leftButtonStyle?: CSSProperties;
//   rightButtonStyle?: CSSProperties;
//   children: any;
// }

// // ====================================================

// const Carousel = ({
//   children,
//   currentSlide,
//   showArrowOnHover,
//   dotClass,
//   dotColor,
//   arrowButtonClass,
//   leftButtonClass,
//   rightButtonClass,
//   leftButtonStyle,
//   rightButtonStyle,
//   step = 1,
//   totalSlides = 10,
//   visibleSlides = 6,
//   spacing = "1.5rem",
//   infinite = false,
//   autoPlay = true,
//   interval = 2000,
//   showDots = false,
//   showArrow = true,
//   naturalSlideWidth = 100,
//   naturalSlideHeight = 125,
//   isIntrinsicHeight = true,
//   hasMasterSpinner = false,
//   dotGroupMarginTop = "2rem",
//   arrowButtonColor = "secondary"
// }: CarouselProps) => {
//   const [currentIndex, setCurrentIndex] = useState(currentSlide || 0);

//   // Handle Slide Change: Move forward by step
//   const handleSlideChange = (newIndex: number) => {
//     // Move smoothly and indefinitely, no looping back
//     if (newIndex >= totalSlides) {
//       newIndex = 0;  // After the last slide, go back to the first
//     } else if (newIndex < 0) {
//       newIndex = totalSlides - 1;  // When going before the first slide, go to the last
//     }
//     setCurrentIndex(newIndex); // Update the current slide index
//   };

//   // Automatically change slides if autoplay is enabled
//   useEffect(() => {
//     if (autoPlay) {
//       const intervalId = setInterval(() => {
//         let nextIndex = currentIndex + 1;
//         handleSlideChange(nextIndex); // Update index based on the interval
//       }, interval);

//       return () => clearInterval(intervalId); // Cleanup the interval when the component unmounts
//     }
//   }, [autoPlay, currentIndex, interval]);

//   return (
//     <StyledCarousel
//       step={step}
//       spacing={spacing}
//       showDots={showDots}
//       infinite={infinite}
//       interval={interval}
//       dotColor={dotColor}
//       isPlaying={autoPlay}
//       totalSlides={totalSlides}
//       currentSlide={currentIndex}
//       visibleSlides={visibleSlides}
//       hasMasterSpinner={hasMasterSpinner}
//       showArrowOnHover={showArrowOnHover}
//       naturalSlideWidth={naturalSlideWidth}
//       isIntrinsicHeight={isIntrinsicHeight}
//       dotGroupMarginTop={dotGroupMarginTop}
//       naturalSlideHeight={naturalSlideHeight}>
//       <Slider className="custom-slider">
//         {Children.map(children, (child, ind) => (
//           <Slide index={ind} key={ind}>
//             {child}
//           </Slide>
//         ))}
//       </Slider>

//       {showDots && (
//         <DotGroup
//           className={`custom-dot ${dotClass}`}
//           renderDots={(props: any) => renderDots({ ...props, step, currentIndex, handleSlideChange })}
//         />
//       )}

//       {showArrow && (
//         <Fragment>
//           <IconButton
//             as={ButtonBack}
//             variant="contained"
//             color={arrowButtonColor}
//             style={leftButtonStyle || {}}
//             className={`arrow-button left-arrow-class ${arrowButtonClass} ${leftButtonClass}`}
//             onClick={() => handleSlideChange(currentIndex - 1)}
//           >
//             <Icon variant="small" defaultcolor="currentColor">
//               arrow-left
//             </Icon>
//           </IconButton>

//           <IconButton
//             as={ButtonNext}
//             variant="contained"
//             color={arrowButtonColor}
//             style={rightButtonStyle || {}}
//             className={`arrow-button right-arrow-class ${arrowButtonClass} ${rightButtonClass}`}
//             onClick={() => handleSlideChange(currentIndex + 1)}
//           >
//             <Icon variant="small" defaultcolor="currentColor">
//               arrow-right
//             </Icon>
//           </IconButton>
//         </Fragment>
//       )}
//     </StyledCarousel>
//   );
// };

// const renderDots = ({ step, currentIndex, totalSlides, carouselStore, handleSlideChange }: any) => {
//   const dots = [];
//   const totalDots = Math.ceil(totalSlides / step);

//   for (let i = 0; i < totalDots; i++) {
//     const isActive = currentIndex === i * step;

//     dots.push(
//       <div
//         key={i}
//         className={clsx("dot", { "dot-active": isActive })}
//         onClick={() => {
//           handleSlideChange(i * step); // Call handleSlideChange to move to the selected dot
//         }}
//       />
//     );
//   }

//   return dots;
// };

// export default Carousel;
