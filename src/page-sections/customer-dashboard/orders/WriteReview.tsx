// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import Box from "@component/Box";
// import Avatar from "@component/avatar";
// import FlexBox from "@component/FlexBox";
// import { Button } from "@component/buttons";
// import Typography, { H6 } from "@component/Typography";
// import { currency } from "@utils/utils";
// import Modal from "@component/Modal"; // Import the Modal component

// export default function WriteReview({
//   item,
//   shopName,
//   orderDetails,
//   status,
// }: {
//   item: any;
//   shopName: string;
//   orderDetails: any;
//   status: string;
// }) {
//   const [isSummaryOpen, setIsSummaryOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

//   const summaryRef = useRef<HTMLDivElement>(null);
//   const buttonRef = useRef<HTMLButtonElement>(null);

//   const deliveryCharge = orderDetails?.delivery_charge;

//   // Toggle visibility of the summary
//   const toggleSummary = (event: React.MouseEvent) => {
//     event.stopPropagation(); // Prevent event propagation to the document
//     setIsSummaryOpen((prev) => !prev);
//   };

//   // Handle click outside to close the summary
//   const handleClickOutside = (event: MouseEvent) => {
//     if (
//       summaryRef.current &&
//       !summaryRef.current.contains(event.target as Node) &&
//       buttonRef.current &&
//       !buttonRef.current.contains(event.target as Node)
//     ) {
//       setIsSummaryOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <>
//       <FlexBox px="1rem" py="0.5rem" flexWrap="wrap" alignItems="center" key={item.product_name}>
//         <FlexBox flex="2 2 260px" m="6px" alignItems="center">
//           <Avatar src={item.product_image} alt={item.product_image} size={64} />
//           <Box ml="20px">
//             <H6 my="0px">{item.product_name}</H6>
//             <Typography fontSize="14px" color="text.muted">
//               {currency(item.price)} x {item.quantity}
//             </Typography>
//           </Box>
//         </FlexBox>

//         <FlexBox flex="1 1 260px" m="6px" alignItems="center">
//           <Typography fontSize="14px" color="text.muted">
//             {item.color || "-"}
//           </Typography>
//         </FlexBox>

//         <div style={{ display: "flex" }}>
//           <FlexBox flex="160px" m="6px" alignItems="center">
//             <Button
//               variant="text"
//               color="primary"
//               disabled={status !== "Delivered"} // Disable the button if status is not 'Delivered'
//               onClick={() => setIsModalOpen(true)} // Open the modal on click
//             >
//               <Typography fontSize="14px">Review</Typography>
//             </Button>
//           </FlexBox>
//         </div>
//       </FlexBox>

//       {/* Render the Modal */}
//       <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
//   <Box
//     p="1rem"
//     bg="white"
//     borderRadius="8px"
//     width="500px"
//     mx="auto"
//     onClick={(e) => e.stopPropagation()}
//   >
//     {/* Product Information */}
//     <FlexBox flex="2 2 260px" m="6px" alignItems="center">
//       <Avatar src={item.product_image} alt={item.product_image} size={64} />
//       <Box ml="20px">
//         <H6 my="0px">{item.product_name}</H6>
//       </Box>
//     </FlexBox>

//     {/* Rating System */}
//     <Box mt="1rem">
//       <Typography fontSize="14px" mb="0.5rem">Rate the Product:</Typography>
//       <FlexBox>
//         {[1, 2, 3, 4, 5].map((star) => (
//           <button
//             key={star}
//             style={{
//               border: "none",
//               background: "transparent",
//               cursor: "pointer",
//               fontSize: "24px",
//               color: "#FFD700", // gold color
//             }}
//             onClick={() => console.log(`Rated ${star} stars`)}
//           >
//             ★
//           </button>
//         ))}
//       </FlexBox>
//     </Box>

//     {/* Upload Image */}
//     <Box mt="1rem">
//   <Typography fontSize="14px" mb="0.5rem">
//     Upload Images:
//   </Typography>
//   <Box
//     border="1px dashed #ccc"
//     p="1rem"
//     borderRadius="8px"
//     display="flex"
//     flexDirection="column"
//     alignItems="center"
//     justifyContent="center"
//     textAlign="center"
//     style={{ cursor: "pointer" }}
//     onClick={() => document.getElementById("imageUploadInput")?.click()}
//   >
//     <Typography fontSize="14px" color="#888">
//       Click to upload or drag and drop
//     </Typography>
//     <Typography fontSize="12px" color="#aaa">
//       You can upload multiple images
//     </Typography>
//   </Box>
//   <input
//     type="file"
//     id="imageUploadInput"
//     accept="image/*"
//     multiple
//     style={{ display: "none" }}
//     onChange={(e) => {
//       const files = e.target.files;
//       console.log("Uploaded images:", files);
//       // Handle files logic (e.g., preview or send to backend)
//     }}
//   />

//   {/* Preview of Uploaded Images */}
//   <Box display="flex" flexWrap="wrap" mt="1rem">
//     {/* Replace the below map with dynamic images */}
//     {["image1.jpg", "image2.jpg"].map((image, index) => (
//       <Box
//         key={index}
//         width="60px"
//         height="60px"
//         border="1px solid #ddd"
//         borderRadius="4px"
//         overflow="hidden"
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//         bg="#f9f9f9"
//       >
//         <img
//           src={image}
//           alt={`Uploaded preview ${index + 1}`}
//           style={{ width: "100%", height: "100%", objectFit: "cover" }}
//         />
//       </Box>
//     ))}
//   </Box>
// </Box>


//     {/* Review Text Area */}
//     <Box mt="1rem">
//       <Typography fontSize="14px" mb="0.5rem">Write a Review:</Typography>
//       <textarea
//         rows={4}
//         style={{
//           width: "100%",
//           padding: "8px",
//           border: "1px solid #ccc",
//           borderRadius: "4px",
//         }}
//         placeholder="Share your experience..."
//         onChange={(e) => console.log(e.target.value)}
//       />
//     </Box>

//     {/* Submit Button */}
//     <Box mt="1.5rem" textAlign="center">
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => {
//           console.log("Review submitted");
//           setIsModalOpen(false);
//         }}
//       >
//         Submit Review
//       </Button>
//     </Box>
//   </Box>
// </Modal>

//     </>
//   );
// }


import React, { useState, useRef, useEffect } from "react";
import Box from "@component/Box";
import Avatar from "@component/avatar";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import Typography, { H6 } from "@component/Typography";
import { currency } from "@utils/utils";
import Modal from "@component/Modal"; // Import the Modal component
import toast from "react-hot-toast";

export default function WriteReview({
  item,
  shopName,
  orderDetails,
  status,
}: {
  item: any;
  shopName: string;
  orderDetails: any;
  status: string;
}) {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [rating, setRating] = useState(0); // Rating state
  const [comments, setComments] = useState(""); // Review comments state
  const [image, setImage] = useState<File[]>([]); // Images state

const [errorMessage, setErrorMessage] = useState("");

  

  const summaryRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const deliveryCharge = orderDetails?.delivery_charge;

  // Toggle visibility of the summary
  const toggleSummary = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent event propagation to the document
    setIsSummaryOpen((prev) => !prev);
  };

  // Handle click outside to close the summary
  const handleClickOutside = (event: MouseEvent) => {
    if (
      summaryRef.current &&
      !summaryRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsSummaryOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to handle form submission
  const handleReviewSubmit = async () => {
    // Check if comments have fewer than 10 characters
    if (comments.length < 10) {
      setErrorMessage("The comments field must be at least 10 characters.");
      return; // Prevent further execution
    } else {
      setErrorMessage("");
    }
  
    // Validate other required fields
    if (!item?.order_item_id || !item?.product_id || rating === 0 || !comments) {
      console.error("Missing required fields.");
      return; // Return early if any required fields are missing
    }
  
    const formData = new FormData();
  
    // Append data to FormData
    formData.append("order_item_id", String(item?.order_item_id));
    formData.append("product_id", String(item?.product_id));
    formData.append("rating", String(rating));
    formData.append("comments", comments);
  
    // Append images to FormData
    image.forEach((image) => {
      formData.append("image[]", image); // Use the correct field name
    });
  
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No auth token found");
      return; // Exit if no token is found
    }
  
    try {
      const response = await fetch("https://frontend.tizaraa.com/api/order/product/review", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        // Handle successful response
        const responseBody = await response.json(); // Parse as JSON
        console.log("Review submitted successfully:", responseBody);
        toast.success(responseBody.message); // Show success message
        setIsModalOpen(false); // Close modal
      } else {
        // Handle error response
        const responseBody = await response.json(); // Parse as JSON
        console.error("Error submitting review:", responseBody);
        toast.error(responseBody.message); // Show error message
      }
    } catch (error) {
      console.error("Error submitting review", error);
    }
  
    // Clear all fields after submission
    setRating(0); // Reset rating
    setImage([]); // Clear uploaded images
    setComments(""); // Clear comments
    setIsModalOpen(false); // Close modal
  };
  
  
  

  return (
    <>
      <FlexBox px="1rem" py="0.5rem" flexWrap="wrap" alignItems="center" key={item.product_name}>
        <FlexBox flex="2 2 260px" m="6px" alignItems="center">
          <Avatar src={item.product_image} alt={item.product_image} size={64} />
          <Box ml="20px">
            <H6 my="0px">{item.product_name}</H6>
            <Typography fontSize="14px" color="text.muted">
              {currency(item.price)} x {item.quantity}
            </Typography>
          </Box>
        </FlexBox>

        <FlexBox flex="1 1 260px" m="6px" alignItems="center">
          <Typography fontSize="14px" color="text.muted">
            {item.color || "-"}
          </Typography>
        </FlexBox>

        <div style={{ display: "flex" }}>
          <FlexBox flex="160px" m="6px" alignItems="center">
            <Button
              variant="text"
              color="primary"
              disabled={status !== "Delivered"} 
              onClick={() => setIsModalOpen(true)} 
            >
              <Typography fontSize="14px">Review</Typography>
            </Button>
          </FlexBox>
        </div>
      </FlexBox>

      {/* Render the Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          p="1rem"
          bg="white"
          borderRadius="8px"
          width="500px"
          mx="auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Product Information */}
          <FlexBox flex="2 2 260px" m="6px" alignItems="center">
            <Avatar src={item.product_image} alt={item.product_image} size={64} />
            <Box ml="20px">
              <H6 my="0px">{item.product_name}</H6>
            </Box>
          </FlexBox>

          {/* Rating System */}
          <Box mt="1rem">
            <Typography fontSize="14px" mb="0.5rem">Rate the Product:</Typography>
            <FlexBox>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    fontSize: "24px",
                    color: star <= rating ? "#FFD700" : "#ccc", // Set color based on rating
                  }}
                  onClick={() => setRating(star)} // Set rating on click
                >
                  ★
                </button>
              ))}
            </FlexBox>
          </Box>

          {/* Upload Image */}
          {/* <Box mt="1rem">
  <Typography fontSize="14px" mb="0.5rem">
    Upload Images:
  </Typography>
  <input
    type="file"
    id="imageUploadInput"
    accept="image/*"
    multiple
    onChange={(e) => {
      const files = e.target.files;
      if (files) {
        setImage([...image, ...Array.from(files)]); // Append new files to the existing state
      }
    }}
  />
</Box> */}
<Box mt="1rem">
  <Typography fontSize="14px" mb="0.5rem">
    Upload Images:
  </Typography>
  <Box
    border="1px dashed #ccc"
    p="1rem"
    borderRadius="8px"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    textAlign="center"
    style={{ cursor: "pointer" }}
    onClick={() => document.getElementById("imageUploadInput")?.click()}
  >
    <Typography fontSize="14px" color="#888">
      Click to upload or drag and drop
    </Typography>
    <Typography fontSize="12px" color="#aaa">
      You can upload multiple images
    </Typography>
  </Box>
  <input
    type="file"
    id="imageUploadInput"
    accept="image/*"
    multiple
    style={{ display: "none" }}
    onChange={(e) => {
      const files = e.target.files;
      if (files) {
        setImage([...image, ...Array.from(files)]);
      }
    }}
  />

  {/* Image Preview Section */}
  <Box mt="1rem" display="flex" flexWrap="wrap">
    {image.map((img, index) => (
      <Box
        key={index}
        position="relative"
        border="1px solid #ccc"
        borderRadius="8px"
        overflow="hidden"
        width="100px"
        height="100px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {/* Image Preview */}
        <img
          src={URL.createObjectURL(img)}
          alt={`Selected ${index + 1}`}
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />

        {/* Delete Button */}
        <Box
          position="absolute"
          top="5px"
          right="5px"
          width="20px"
          height="20px"
          borderRadius="50%"
          display="flex"
          alignItems="center"
          justifyContent="center"
         
          color="black"
          fontSize="24px"
          fontWeight="bold"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setImage(image.filter((_, imgIndex) => imgIndex !== index));
          }}
        >
          ×
        </Box>
      </Box>
    ))}
  </Box>
</Box>


          {/* Review Text Area */}
          <Box mt="1rem">
            <Typography fontSize="14px" mb="0.5rem">Write a Review:</Typography>
            <textarea
              rows={4}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              placeholder="Share your experience..."
              onChange={(e) => setComments(e.target.value)} // Store comments
            />
          </Box>
          {errorMessage && (
    <Typography fontSize="12px" color="red" mt="0.5rem">
      {errorMessage} 
    </Typography>
  )}


          {/* Submit Button */}
          <Box mt="1.5rem" textAlign="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleReviewSubmit} // Submit the review
            >
              Submit Review
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
