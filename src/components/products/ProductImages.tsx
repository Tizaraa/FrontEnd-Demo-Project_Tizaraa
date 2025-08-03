import { useState } from "react";
import FlexBox from "@component/FlexBox";
import Image from "@component/Image";
import Avatar from "@component/avatar";
import Box from "@component/Box";
import ApiBaseUrl from "api/ApiBaseUrl";
import ReactImageMagnify from 'react-image-magnify';


type ProductImagesProps = {
  images: string[];
};

const ProductImages = ({ images }: ProductImagesProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const handleImageClick = (index: number) => () => setSelectedImage(index);

  return (
    <div>
      <FlexBox
        mb="20px"
        overflow="hidden"
        borderRadius={16}
        justifyContent="center"
      >
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "",
              src: images[selectedImage]
                ? `${ApiBaseUrl.ImgUrl}${images[selectedImage]}`
                : "",
              isFluidWidth: true, // This makes it respect your existing dimensions
              style: {
                display: "block",
                width: "100%",
                height: "auto",
                borderRadius: 16,
              },
            },
            largeImage: {
              src: images[selectedImage]
                ? `${ApiBaseUrl.ImgUrl}${images[selectedImage]}`
                : "",
              width: 1200, // Large image dimensions
              height: 1200,
            },
            enlargedImageContainerDimensions: {
              width: "150%",
              height: "150%",
            },
            enlargedImageContainerStyle: {
              zIndex: 9999,
              backgroundColor: "white",
              border: "1px solid #eee",
            },
            enlargedImagePosition: "over",
            hoverDelayInMs: 100,
            isHintEnabled: true,
            shouldUsePositiveSpaceLens: true,
            lensStyle: {
              backgroundColor: "rgba(0,0,0,.1)",
              cursor: "zoom-in",
            },
          }}
        />
      </FlexBox>

      {/* <FlexBox overflow="auto">
        {images.map((url, ind) => (
          <Box
            key={ind}
            size={70}
            bg="white"
            minWidth={70}
            display="flex"
            cursor="pointer"
            border="1px solid"
            borderRadius="10px"
            alignItems="center"
            justifyContent="center"
            ml={ind === 0 ? "auto" : ""}
            mr={ind === images.length - 1 ? "auto" : "10px"}
            borderColor={selectedImage === ind ? "primary.main" : "gray.400"}
            onClick={handleImageClick(ind)}
          >
            <Avatar src={url} borderRadius="10px" size={65} />
          </Box>
        ))}
      </FlexBox> 
     */}

      <FlexBox overflow="auto">
        {images.map((url, ind) => {
          const imageUrl = `${ApiBaseUrl.ImgUrl}${url}`; // Prepend base URL to the image URL
          return (
            <Box
              key={ind}
              size={70}
              bg="white"
              minWidth={70}
              display="flex"
              cursor="pointer"
              border="1px solid"
              borderRadius="10px"
              alignItems="center"
              justifyContent="center"
              ml={ind === 0 ? "auto" : ""}
              mr={ind === images.length - 1 ? "auto" : "10px"}
              borderColor={selectedImage === ind ? "primary.main" : "gray.400"}
              onClick={handleImageClick(ind)}
            >
              <Avatar src={imageUrl} borderRadius="10px" size={65} />
            </Box>
          );
        })}
      </FlexBox>
    </div>
  );
};

export default ProductImages;
