// import { useState } from "react";
// import FlexBox from "@component/FlexBox";
// import Image from "@component/Image";
// import Avatar from "@component/avatar";
// import Box from "@component/Box";
// import ApiBaseUrl from "api/ApiBaseUrl";

// type ProductImagesProps = {
//   images: string[];
// };

// const ProductImages = ({ images }: ProductImagesProps) => {
//   const [selectedImage, setSelectedImage] = useState(0);

//   const handleImageClick = (index: number) => () => setSelectedImage(index);

//   return (
//     <div>
//       <FlexBox
//         mb="20px"
//         overflow="hidden"
//         borderRadius={16}
//         justifyContent="center"
//       >
//         <Image
//           width={200}
//           height={200}
//           // src={images[selectedImage]}
//           src={
//             images[selectedImage]
//               ? `${ApiBaseUrl.ImgUrl}${images[selectedImage]}`
//               : ""
//           }
//           style={{ display: "block", width: "100%", height: "auto" }}
//         />
//       </FlexBox>
//       <FlexBox overflow="auto">
//         {images.map((url, ind) => {
//           const imageUrl = `${ApiBaseUrl.ImgUrl}${url}`; // Prepend base URL to the image URL
//           return (
//             <Box
//               key={ind}
//               size={70}
//               bg="white"
//               minWidth={70}
//               display="flex"
//               cursor="pointer"
//               border="1px solid"
//               borderRadius="10px"
//               alignItems="center"
//               justifyContent="center"
//               ml={ind === 0 ? "auto" : ""}
//               mr={ind === images.length - 1 ? "auto" : "10px"}
//               borderColor={selectedImage === ind ? "primary.main" : "gray.400"}
//               onClick={handleImageClick(ind)}
//             >
//               <Avatar src={imageUrl} borderRadius="10px" size={65} />
//             </Box>
//           );
//         })}
//       </FlexBox>
//     </div>
//   );
// };

// export default ProductImages;




//  ========================= With Magnify Product Image ============================ //
// import { useState, MouseEvent, useEffect } from "react";
// import { createPortal } from "react-dom"; // Import createPortal
// import FlexBox from "@component/FlexBox";
// import Image from "@component/Image";
// import Avatar from "@component/avatar";
// import Box from "@component/Box";
// import ApiBaseUrl from "api/ApiBaseUrl";

// type ProductImagesProps = {
//   images: string[];
// };

// // --- Magnifier Settings ---
// const ZOOM_LEVEL = 2.5;
// const MAGNIFIER_WIDTH_FACTOR = 2;
// const MAGNIFIER_HEIGHT_FACTOR = 1.5;
// const MAGNIFIER_GAP = 10; // Gap in pixels between image and magnifier

// const ProductImages = ({ images }: ProductImagesProps) => {
//   const [selectedImage, setSelectedImage] = useState(0);

//   // --- State for Magnifier ---
//   const [showMagnifier, setShowMagnifier] = useState(false);
//   const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
//   const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });
//   // State for the absolute position of the magnifier on the page
//   const [magnifierPosition, setMagnifierPosition] = useState({ top: 0, left: 0 });
  
//   // State to ensure document.body is available before rendering portal
//   const [isClient, setIsClient] = useState(false);
//   useEffect(() => {
//     setIsClient(true);
//   }, []);


//   const handleImageClick = (index: number) => () => setSelectedImage(index);

//   // --- Event Handlers for Magnifier ---
//   const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
//     const { currentTarget } = e;
//     const { left, top, width, height, right } = currentTarget.getBoundingClientRect();
    
//     // Update dimensions state
//     if (imgDimensions.width !== width || imgDimensions.height !== height) {
//       setImgDimensions({ width, height });
//     }

//     // Update magnifier's absolute position on the page
//     setMagnifierPosition({
//       top: top + window.scrollY,
//       left: right + window.scrollX + MAGNIFIER_GAP,
//     });

//     // Update cursor position relative to the image
//     const x = e.clientX - left;
//     const y = e.clientY - top;
//     setCursorPosition({ x, y });
//   };

//   const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
//     const { width, height } = e.currentTarget.getBoundingClientRect();
//     setImgDimensions({ width, height });
//     setShowMagnifier(true);
//   };

//   const handleMouseLeave = () => {
//     setShowMagnifier(false);
//   };

//   const currentImageUrl = images?.[selectedImage]
//     ? `${ApiBaseUrl.ImgUrl}${images?.[selectedImage]}`
//     : "";

//   return (
//     <div>
//       {/* Container with event handlers remains the same */}
//       <Box
//         position="relative" // Keep relative for potential internal elements
//         onMouseMove={handleMouseMove}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <FlexBox
//           mb="20px"
//           overflow="hidden"
//           borderRadius={16}
//           justifyContent="center"
//         >
//           <Image
//             width={200}
//             height={200}
//             src={currentImageUrl}
//             style={{ display: "block", width: "100%", height: "auto" }}
//           />
//         </FlexBox>
//       </Box>

//       {/* --- The Magnifier Portal --- */}
//       {isClient && showMagnifier && currentImageUrl && createPortal(
//         <div
//           style={{
//             position: "absolute",
//             // Position is now absolute to the page, not the container
//             top: `${magnifierPosition.top}px`,
//             left: `${magnifierPosition.left}px`,
//             zIndex: 9999, // Very high z-index to be on top of everything

//             // Appearance of the magnifier window
//             width: `${imgDimensions.width * MAGNIFIER_WIDTH_FACTOR}px`,
//             height: `${imgDimensions.height * MAGNIFIER_HEIGHT_FACTOR}px`,
//             border: "1px solid #e0e0e0",
//             backgroundColor: "#ffffff",
//             borderRadius: "10px",
//             boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
//             pointerEvents: "none",

//             // Zooming logic remains the same
//             backgroundImage: `url('${currentImageUrl}')`,
//             backgroundRepeat: "no-repeat",
//             backgroundSize: `${imgDimensions.width * ZOOM_LEVEL}px ${imgDimensions.height * ZOOM_LEVEL}px`,
//             backgroundPositionX: `${-cursorPosition.x * ZOOM_LEVEL + (imgDimensions.width * MAGNIFIER_WIDTH_FACTOR) / 2}px`,
//             backgroundPositionY: `${-cursorPosition.y * ZOOM_LEVEL + (imgDimensions.height * MAGNIFIER_HEIGHT_FACTOR) / 2}px`,
//           }}
//         />,
//         document.body // The portal destination
//       )}

//       {/* Thumbnails remain unchanged */}
//       <FlexBox overflow="auto">
//         {images.map((url, ind) => {
//           const imageUrl = `${ApiBaseUrl.ImgUrl}${url}`;
//           return (
//             <Box
//               key={ind}
//               size={70}
//               bg="white"
//               minWidth={70}
//               display="flex"
//               cursor="pointer"
//               border="1px solid"
//               borderRadius="10px"
//               alignItems="center"
//               justifyContent="center"
//               ml={ind === 0 ? "auto" : ""}
//               mr={ind === images.length - 1 ? "auto" : "10px"}
//               borderColor={selectedImage === ind ? "primary.main" : "gray.400"}
//               onClick={handleImageClick(ind)}
//             >
//               <Avatar src={imageUrl} borderRadius="10px" size={65} />
//             </Box>
//           );
//         })}
//       </FlexBox>
//     </div>
//   );
// };

// export default ProductImages;



//  ========================= With Magnify Product Image: Update Version, This version also show magnify in mobile device ============================ //
// import { useState, MouseEvent, useEffect } from "react";
// import { createPortal } from "react-dom"; // Import createPortal
// import FlexBox from "@component/FlexBox";
// import Image from "@component/Image";
// import Avatar from "@component/avatar";
// import Box from "@component/Box";
// import ApiBaseUrl from "api/ApiBaseUrl";

// type ProductImagesProps = {
//   images: string[];
// };

// // --- Magnifier Settings ---
// const ZOOM_LEVEL = 2.5;
// const MAGNIFIER_WIDTH_FACTOR = 2;
// const MAGNIFIER_HEIGHT_FACTOR = 1.5;
// const MAGNIFIER_GAP = 10; // Gap in pixels between image and magnifier

// const ProductImages = ({ images }: ProductImagesProps) => {
//   const [selectedImage, setSelectedImage] = useState(0);

//   // --- State for Magnifier ---
//   const [showMagnifier, setShowMagnifier] = useState(false);
//   const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
//   const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });
//   // State for the absolute position of the magnifier on the page
//   const [magnifierPosition, setMagnifierPosition] = useState({ top: 0, left: 0 });
  
//   // State to ensure document.body is available before rendering portal
//   const [isClient, setIsClient] = useState(false);
//   useEffect(() => {
//     setIsClient(true);
//   }, []);


//   const handleImageClick = (index: number) => () => setSelectedImage(index);

//   // --- Event Handlers for Magnifier ---
//   const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
//     const { currentTarget } = e;
//     const { left, top, width, height, right } = currentTarget.getBoundingClientRect();
    
//     // Update dimensions state
//     if (imgDimensions.width !== width || imgDimensions.height !== height) {
//       setImgDimensions({ width, height });
//     }

//     // Update magnifier's absolute position on the page
//     setMagnifierPosition({
//       top: top + window.scrollY,
//       left: right + window.scrollX + MAGNIFIER_GAP,
//     });

//     // Update cursor position relative to the image
//     const x = e.clientX - left;
//     const y = e.clientY - top;
//     setCursorPosition({ x, y });
//   };

//   const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
//     const { width, height } = e.currentTarget.getBoundingClientRect();
//     setImgDimensions({ width, height });
//     setShowMagnifier(true);
//   };

//   const handleMouseLeave = () => {
//     setShowMagnifier(false);
//   };

//   const currentImageUrl = images?.[selectedImage]
//     ? `${ApiBaseUrl.ImgUrl}${images?.[selectedImage]}`
//     : "";
    
//   // Calculate the size of the "lens" box. This is the inverse of the zoom level.
//   const lensWidth = imgDimensions.width / ZOOM_LEVEL;
//   const lensHeight = imgDimensions.height / ZOOM_LEVEL;

//   // Calculate the position of the "lens" box.
//   // We subtract half the lens width/height so the cursor is in the center of the lens.
//   // Then, clamp the position to ensure it stays within the image bounds.
//   const lensX = Math.max(0, Math.min(cursorPosition.x - lensWidth / 2, imgDimensions.width - lensWidth));
//   const lensY = Math.max(0, Math.min(cursorPosition.y - lensHeight / 2, imgDimensions.height - lensHeight));


//   return (
//     <div>
//       {/* Container with event handlers remains the same */}
//       <Box
//         position="relative"
//         onMouseMove={handleMouseMove}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <FlexBox
//           mb="20px"
//           overflow="hidden"
//           borderRadius={16}
//           justifyContent="center"
//         >
//           <Image
//             width={200}
//             height={200}
//             src={currentImageUrl}
//             style={{ display: "block", width: "100%", height: "auto" }}
//           />
//         </FlexBox>

//         {/* --- The Magnifying Lens Box --- */}
//         {showMagnifier && currentImageUrl && imgDimensions.width > 0 && imgDimensions.height > 0 && (
//           <div
//             style={{
//               position: "absolute",
//               top: `${lensY}px`, // Directly set top with clamped value
//               left: `${lensX}px`, // Directly set left with clamped value
//               width: `${lensWidth}px`,
//               height: `${lensHeight}px`,
//               pointerEvents: "none", // Allows mouse events to pass through to the image
//               border: "1px solid #ccc",
//               backgroundColor: "rgba(255, 255, 255, 0.4)", // Semi-transparent white
//               cursor: "zoom-in",
//               // Optional: Add transition for a smoother movement
//               transition: "top 0.05s ease-out, left 0.05s ease-out",
//             }}
//           />
//         )}
//       </Box>

//       {/* --- The Magnifier Portal (unchanged) --- */}
//       {isClient && showMagnifier && currentImageUrl && createPortal(
//         <div
//           style={{
//             position: "absolute",
//             top: `${magnifierPosition.top}px`,
//             left: `${magnifierPosition.left}px`,
//             zIndex: 9999, // Very high z-index to be on top of everything
//             width: `${imgDimensions.width * MAGNIFIER_WIDTH_FACTOR}px`,
//             height: `${imgDimensions.height * MAGNIFIER_HEIGHT_FACTOR}px`,
//             border: "1px solid #e0e0e0",
//             backgroundColor: "#ffffff",
//             borderRadius: "10px",
//             boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
//             pointerEvents: "none",
//             backgroundImage: `url('${currentImageUrl}')`,
//             backgroundRepeat: "no-repeat",
//             backgroundSize: `${imgDimensions.width * ZOOM_LEVEL}px ${imgDimensions.height * ZOOM_LEVEL}px`,
//             backgroundPositionX: `${-cursorPosition.x * ZOOM_LEVEL + (imgDimensions.width * MAGNIFIER_WIDTH_FACTOR) / 2}px`,
//             backgroundPositionY: `${-cursorPosition.y * ZOOM_LEVEL + (imgDimensions.height * MAGNIFIER_HEIGHT_FACTOR) / 2}px`,
//           }}
//         />,
//         document.body
//       )}

//       {/* Thumbnails remain unchanged */}
//       <FlexBox overflow="auto">
//         {images.map((url, ind) => {
//           const imageUrl = `${ApiBaseUrl.ImgUrl}${url}`;
//           return (
//             <Box
//               key={ind}
//               size={70}
//               bg="white"
//               minWidth={70}
//               display="flex"
//               cursor="pointer"
//               border="1px solid"
//               borderRadius="10px"
//               alignItems="center"
//               justifyContent="center"
//               ml={ind === 0 ? "auto" : ""}
//               mr={ind === images.length - 1 ? "auto" : "10px"}
//               borderColor={selectedImage === ind ? "primary.main" : "gray.400"}
//               onClick={handleImageClick(ind)}
//             >
//               <Avatar src={imageUrl} borderRadius="10px" size={65} />
//             </Box>
//           );
//         })}
//       </FlexBox>
//     </div>
//   );
// };

// export default ProductImages;




//  ========================= With Magnify Product Image: Update Version, This version DON'T show magnify in mobile device ============================ //
import { useState, MouseEvent, useEffect } from "react";
import { createPortal } from "react-dom";
import FlexBox from "@component/FlexBox";
import Image from "@component/Image";
import Avatar from "@component/avatar";
import Box from "@component/Box";
import ApiBaseUrl from "api/ApiBaseUrl";

type ProductImagesProps = {
  images: string[];
};

// --- Magnifier Settings ---
const ZOOM_LEVEL = 2.5;
const MAGNIFIER_WIDTH_FACTOR = 2;
const MAGNIFIER_HEIGHT_FACTOR = 1.5;
const MAGNIFIER_GAP = 10; // Gap in pixels between image and magnifier

const MOBILE_BREAKPOINT = 768; // px — disable magnifier below this

const ProductImages = ({ images }: ProductImagesProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // --- State for Magnifier ---
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });
  const [magnifierPosition, setMagnifierPosition] = useState({ top: 0, left: 0 });

  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleImageClick = (index: number) => () => setSelectedImage(index);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isMobile) return; // Disable on mobile

    const { currentTarget } = e;
    const { left, top, width, height, right } = currentTarget.getBoundingClientRect();

    if (imgDimensions.width !== width || imgDimensions.height !== height) {
      setImgDimensions({ width, height });
    }

    setMagnifierPosition({
      top: top + window.scrollY,
      left: right + window.scrollX + MAGNIFIER_GAP,
    });

    const x = e.clientX - left;
    const y = e.clientY - top;
    setCursorPosition({ x, y });
  };

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    if (isMobile) return; // Disable on mobile
    const { width, height } = e.currentTarget.getBoundingClientRect();
    setImgDimensions({ width, height });
    setShowMagnifier(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return; // Disable on mobile
    setShowMagnifier(false);
  };

  const currentImageUrl = images?.[selectedImage]
    ? `${ApiBaseUrl.ImgUrl}${images?.[selectedImage]}`
    : "";

  const lensWidth = imgDimensions.width / ZOOM_LEVEL;
  const lensHeight = imgDimensions.height / ZOOM_LEVEL;
  const lensX = Math.max(0, Math.min(cursorPosition.x - lensWidth / 2, imgDimensions.width - lensWidth));
  const lensY = Math.max(0, Math.min(cursorPosition.y - lensHeight / 2, imgDimensions.height - lensHeight));

  return (
    <div>
      <Box
        position="relative"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <FlexBox
          mb="15px"
          overflow="hidden"
          borderRadius={16}
          justifyContent="center"
        >
          <Image
            // width={200}
            // height={200}
            src={currentImageUrl}
            style={{ display: "block", width: "350px", height: "350px" }}
          />
        </FlexBox>

        {/* Magnifying Lens (desktop only) */}
        {!isMobile &&
          showMagnifier &&
          currentImageUrl &&
          imgDimensions.width > 0 &&
          imgDimensions.height > 0 && (
            <div
              style={{
                position: "absolute",
                top: `${lensY}px`,
                left: `${lensX}px`,
                width: `${lensWidth}px`,
                height: `${lensHeight}px`,
                pointerEvents: "none",
                border: "1px solid #ccc",
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                cursor: "zoom-in",
                transition: "top 0.05s ease-out, left 0.05s ease-out",
              }}
            />
          )}
      </Box>

      {/* Magnifier Portal (desktop only) */}
      {!isMobile &&
        isClient &&
        showMagnifier &&
        currentImageUrl &&
        createPortal(
          <div
            style={{
              position: "absolute",
              top: `${magnifierPosition.top}px`,
              left: `${magnifierPosition.left}px`,
              zIndex: 9999,
              width: `${imgDimensions.width * MAGNIFIER_WIDTH_FACTOR}px`,
              height: `${imgDimensions.height * MAGNIFIER_HEIGHT_FACTOR}px`,
              border: "1px solid #e0e0e0",
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
              pointerEvents: "none",
              backgroundImage: `url('${currentImageUrl}')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${imgDimensions.width * ZOOM_LEVEL}px ${imgDimensions.height * ZOOM_LEVEL}px`,
              backgroundPositionX: `${-cursorPosition.x * ZOOM_LEVEL + (imgDimensions.width * MAGNIFIER_WIDTH_FACTOR) / 2}px`,
              backgroundPositionY: `${-cursorPosition.y * ZOOM_LEVEL + (imgDimensions.height * MAGNIFIER_HEIGHT_FACTOR) / 2}px`,
            }}
          />,
          document.body
        )}

      {/* Thumbnails */}
      <FlexBox overflow="auto">
        {images.map((url, ind) => {
          const imageUrl = `${ApiBaseUrl.ImgUrl}${url}`;
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
