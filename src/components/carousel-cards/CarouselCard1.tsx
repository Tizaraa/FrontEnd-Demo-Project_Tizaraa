// import styled from "styled-components";

// // STYLED COMPONENT
// const StyledCarouselCard1 = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 1rem 0;
//   justify-content: center;

//   .image-holder {
//     position: relative;
//     width: 100%; // Full width of the carousel item
//     height: 400px; // Fixed height for the image
//     overflow: hidden; // Hide any overflowed part of the image


//     img {
//       width: 100%; // Ensure the image width matches the container
//       height: 100%; // Ensure the image height matches the container
//       object-fit: contain; // Show the full image without cropping
//     }
//   }
// `;

// // ===============================================
// interface Props {
//   image: string;
//   buttonText: string;
// }
// // ===============================================

// export default function CarouselCard1({ image, buttonText }: Props) {
//   return (
//     <StyledCarouselCard1>
//       <div className="image-holder">
//         <img src={image} alt="carousel-slide" />
//       </div>
//     </StyledCarouselCard1>
//   );
// }

import styled from "styled-components";
// GLOBAL CUSTOM COMPONENTS
import { Button } from "@component/buttons";
import Typography from "@component/Typography";

// STYLED COMPONENT
const StyledCarouselCard1 = styled.div`
  display: flex;
  text-align: left;
  margin-left: 280px;
  align-items: center;
  padding: 1rem 0 1rem 2rem;
  justify-content: space-between;

  .title {
    font-size: 50px;
    margin-top: 0px;
    line-height: 1.2;
    margin-bottom: 1.35rem;
  }

  .image-holder {
    position: relative;
    width: 100%;
    img {
      width: 100%;
       height: 420px;
    object-fit: fill;
      
      
    }
  }

  @media only screen and (max-width: 900px) {
    margin-left: 0px;
    padding-left: 0px;

    .title {
      font-size: 32px;
    }
  }

  @media only screen and (max-width: 425px) {
    .title {
      font-size: 16px;
    }
    .title + * {
      font-size: 13px;
    }
    .button-link {
      font-size: 13px;
      padding: 0.66rem 0.95rem;
    }
  }
`;

// ===============================================
interface Props {
  // title: string;
  image: string;
  // buttonText: string;
  // description: string;
}
// ===============================================

export default function CarouselCard1({ image }: Props) {
  return (
    <StyledCarouselCard1>
      <div>
        {/* <h1 className="title">{title}</h1> */}
        {/* <Typography color="secondary.main" mb="1.35rem">
          {description}
        </Typography> */}

        {/* <Button className="button-link" variant="contained" color="primary" p="1rem 1.5rem">
          {buttonText}
        </Button> */}
      </div>

      <div className="image-holder">
        <img src={image} alt="apple-watch-1" />
      </div>
    </StyledCarouselCard1>
  );
}