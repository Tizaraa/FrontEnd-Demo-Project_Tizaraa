import React, { useState, useRef, useEffect } from "react";
import Box from "@component/Box";
import Avatar from "@component/avatar";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import Typography, { H6 } from "@component/Typography";
import { currency } from "@utils/utils";
import Modal from "@component/Modal";
import toast from "react-hot-toast";
import ApiBaseUrl from "api/ApiBaseUrl";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [image, setImage] = useState<File[]>([]);
  const [reviewMode, setReviewMode] = useState<"submit" | "preview">(
    item.ratingcheck ? "preview" : "submit"
  );
  const [existingReview, setExistingReview] = useState<{
    rating: any;
    comments: string;
    images: string[];
  } | null>(null);

  const deliveryCharge = orderDetails?.delivery_charge;

  useEffect(() => {
    // Check localStorage for any stored reviews on page load
    const storedReview = localStorage.getItem(`review-${item.order_item_id}`);
    if (storedReview) {
      const parsedReview = JSON.parse(storedReview);
      setRating(parsedReview.rating);
      setComments(parsedReview.comments);
      setImage(parsedReview.images);
      setReviewMode("preview"); // Set to preview mode if review already exists
    }

    // Set the existing review data for preview mode if applicable
    if (reviewMode === "preview" && item.ratingcheck) {
      setExistingReview({
        rating: item.rating,
        comments: item.comments,
        images: item.images,
      });
    }
  }, [reviewMode, item]);

  const handleReviewSubmit = async () => {
    if (comments.length < 10) {
      toast.error("The comments field must be at least 10 characters.");
      return;
    }

    if (!item?.order_item_id || !item?.product_id || rating === 0 || !comments) {
      console.error("Missing required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("order_item_id", String(item?.order_item_id));
    formData.append("product_id", String(item?.product_id));
    formData.append("rating", String(rating));
    formData.append("comments", comments);

    image.forEach((img) => formData.append("image[]", img));

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No auth token found");
      return;
    }

    try {
      const response = await fetch(`${ApiBaseUrl.baseUrl}order/product/review`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const responseBody = await response.json();
        toast.success(responseBody.message);
        
        // Save the review in localStorage for persistence across page reloads
        const reviewData = {
          rating: String(rating),
          comments,
          images: image.map((img) => URL.createObjectURL(img)),
        };
        localStorage.setItem(`review-${item.order_item_id}`, JSON.stringify(reviewData));

        setReviewMode("preview"); // Switch to preview mode
        setExistingReview(reviewData);
        setIsModalOpen(false);
      } else {
        const responseBody = await response.json();
        toast.error(responseBody.message);
      }
    } catch (error) {
      console.error("Error submitting review", error);
    }
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

        <FlexBox flex="160px" m="6px" alignItems="center">
          <Button
            variant="text"
            color="primary"
            disabled={status !== "Pending" && reviewMode === "submit"}
            onClick={() => setIsModalOpen(true)}
          >
            <Typography fontSize="14px">
              {reviewMode === "submit" ? "Review" : "Preview"}
            </Typography>
          </Button>
        </FlexBox>
      </FlexBox>

      {/* Render Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          p="1rem"
          bg="white"
          borderRadius="8px"
          width="500px"
          mx="auto"
          onClick={(e) => e.stopPropagation()}
        >
          {reviewMode === "submit" ? (
            <>
              <Typography mb="1rem">Submit Your Review:</Typography>
              {/* Review Form */}
              <Box>
                <Typography>Rate the Product:</Typography>
                <FlexBox>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      style={{
                        background: "transparent",
                        cursor: "pointer",
                        fontSize: "24px",
                        color: star <= rating ? "#FFD700" : "#ccc",
                        border: "none",
                        padding: "2px",
                      }}
                      onClick={() => setRating(star)}
                    >
                      ★
                    </button>
                  ))}
                </FlexBox>
              </Box>
              <Box mt="1rem">
                <Typography>Upload Images:</Typography>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    setImage([...image, ...Array.from(e.target.files || [])])
                  }
                />
              </Box>
              <Box mt="1rem">
                <textarea
                  rows={4}
                  placeholder="Share your experience..."
                  onChange={(e) => setComments(e.target.value)}
                  style={{ width: "100%", border: "1px solid #ccc", padding: "8px" }}
                />
              </Box>
              <Button variant="contained" color="primary" onClick={handleReviewSubmit}>
                Submit Review
              </Button>
            </>
          ) : (
            <>
              <Typography mb="1rem">Your Review:</Typography>
              {/* preReview Form */}
              <Box>
                <Typography>Rate the Product:</Typography>
                <FlexBox>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      style={{
                        background: "transparent",
                        cursor: "pointer",
                        fontSize: "24px",
                        color: star <= existingReview?.rating ? "#FFD700" : "#ccc", // Yellow for selected stars, gray for unselected
                        border: "none",
                        padding: "2px",
                      }}
                    >
                      ★
                    </button>
                  ))}
                </FlexBox>
              </Box>
              <Box mt="1rem">
                <Typography>Upload Images:</Typography>
                {/* Display already reviewed images */}
                {existingReview?.images && existingReview?.images.length > 0 && (
                  <Box mt="1rem">
                    <Typography>Reviewed Images:</Typography>
                    <Box>
                      {existingReview.images.map((src, idx) => (
                        <img
                          key={idx}
                          src={`${ApiBaseUrl.baseUrl}${src}`}
                          alt={`Review Image ${idx}`}
                          style={{ width: "100px", height: "100px", marginRight: "8px" }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
                {/* Input to upload new images */}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    setImage([...image, ...Array.from(e.target.files || [])])
                  }
                />
              </Box>
              <Box mt="1rem">
                <Typography>Share your experience:</Typography>
                <textarea
                  rows={4}
                  value={comments || existingReview?.comments || ""} 
                  placeholder="Share your experience..."
                  onChange={(e) => setComments(e.target.value)}
                  style={{
                    width: "100%",
                    border: "1px solid #ccc",
                    padding: "8px",
                  }}
                />
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}








// image preview *******


// {/* <Box mt="1rem">
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
//       if (files) {
//         setImage([...image, ...Array.from(files)]);
//       }
//     }}
//   />

//   {/* Image Preview Section */}
//   <Box mt="1rem" display="flex" flexWrap="wrap">
//     {image.map((img, index) => (
//       <Box
//         key={index}
//         position="relative"
//         border="1px solid #ccc"
//         borderRadius="8px"
//         overflow="hidden"
//         width="100px"
//         height="100px"
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//       >
//         {/* Image Preview */}
//         <img
//           src={URL.createObjectURL(img)}
//           alt={`Selected ${index + 1}`}
//           style={{ maxWidth: "100%", maxHeight: "100%" }}
//         />

//         {/* Delete Button */}
//         <Box
//           position="absolute"
//           top="5px"
//           right="5px"
//           width="20px"
//           height="20px"
//           borderRadius="50%"
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
         
//           color="black"
//           fontSize="24px"
//           fontWeight="bold"
//           style={{ cursor: "pointer" }}
//           onClick={() => {
//             setImage(image.filter((_, imgIndex) => imgIndex !== index));
//           }}
//         >
//           ×
//         </Box>
//       </Box>
//     ))}
//   </Box>
// </Box> */}
