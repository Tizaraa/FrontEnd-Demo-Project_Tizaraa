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
import axios from "@lib/axiosClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReturnedOrderStatus from "./ReturnedOrderStatus";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faStore,
 faCaretDown,
 faCaretUp,
} from "@fortawesome/free-solid-svg-icons";

export default function WriteReview({
 item,
 shopName,
 orderDetails,
 status,
 cancel_status,
 orderItemId,
 order_days_gone,
 return_status,
 delivered_at,
}: {
 item: any;
 shopName: string;
 orderDetails: any;
 status: any;
 orderItemId: any;
 cancel_status: any;
 order_days_gone: any;
 return_status: any;
 delivered_at: any;
}) {
 const [showOrderStatus, setShowOrderStatus] = useState(false);
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
 const router = useRouter();

 const deliveryCharge = orderDetails?.delivery_charge;

 useEffect(() => {
  // Server data is authoritative; only fall back to the localStorage cache
  // (written right after a submit) if the server hasn't recorded a review yet.
  if (item.ratingcheck) {
   setExistingReview({
    rating: item.rating,
    comments: item.comments,
    images: item.images,
   });
   setReviewMode("preview");
   return;
  }

  const storedReview = localStorage.getItem(`review-${item.order_item_id}`);
  if (storedReview) {
   const parsedReview = JSON.parse(storedReview);
   setRating(parsedReview.rating);
   setComments(parsedReview.comments);
   setExistingReview({
    rating: parsedReview.rating,
    comments: parsedReview.comments,
    images: parsedReview.images || [],
   });
   setReviewMode("preview"); // Set to preview mode if review already exists
  }
 }, [item]);

 const [submitting, setSubmitting] = useState(false);

 const handleReviewSubmit = async () => {
  if (comments.length < 10) {
   toast.error("The comments field must be at least 10 characters.");
   return;
  }

  if (!item?.order_item_id || rating === 0 || !comments) {
   toast.error("Missing required fields.");
   return;
  }

  const formData = new FormData();
  formData.append("order_item_id", String(item.order_item_id));
  formData.append("rating", String(rating));
  formData.append("comment", comments);

  image.forEach((img) => formData.append("images[]", img));

  setSubmitting(true);
  try {
   const response = await axios.post("reviews", formData, {
    headers: { "Content-Type": "multipart/form-data" },
   });

   toast.success("Review submitted successfully");

   // Use the server's saved copy (real image URLs, not ephemeral blob: URLs)
   // so the preview stays accurate after a reload.
   const created = response.data?.data ?? {};
   const reviewData = {
    rating: created.rating ?? rating,
    comments: created.comment ?? comments,
    images: created.images ?? [],
   };
   localStorage.setItem(
    `review-${item.order_item_id}`,
    JSON.stringify(reviewData)
   );

   setReviewMode("preview"); // Switch to preview mode
   setExistingReview(reviewData);
   setIsModalOpen(false);
  } catch (error: any) {
   const msg =
    error?.response?.data?.message ?? "Failed to submit review.";
   toast.error(msg);
  } finally {
   setSubmitting(false);
  }
 };

 // const handleCancelClick = () => {
 //   if (cancelMode === "submit" && status === "Pending") {
 //     // Encrypt the orderItemId
 //     const encryptedOrderItemId = btoa(orderItemId);
 //     // Encrypt product name if needed, or pass directly as part of the URL
 //     const encodedProductName = encodeURIComponent(item.product_name);
 //     router.push(`/cancelled-order?orderItemId=${encryptedOrderItemId}`);

 //   }
 // };

 // product return function

 const handleReturnClick = () => {
  const encryptedOrderItemId = btoa(orderItemId);
  sessionStorage.setItem("returnItem", JSON.stringify(item));
  router.push(`/return-order?orderItemId=${encryptedOrderItemId}&orderId=${item.order_id}`);
 };

 // cancek click function
 const handleCancelClick = () => {
  if (cancel_status >= 0 && cancel_status <= 2) {
   const encryptedOrderItemId = btoa(orderItemId);
   sessionStorage.setItem("cancelItem", JSON.stringify(item));
   router.push(`/cancelled-order?orderItemId=${encryptedOrderItemId}`);
  }
 };

 const handleToggle = () => {
  setShowOrderStatus((prev) => !prev); // Toggle the state
 };

 console.log("item-->", item.productType);
 console.log(item);

 // Conditionally Handle Image URL for product image for General and Abroad products
 const getProductImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (/^https?:\/\//i.test(imagePath)) {
   return imagePath;
  }
  if (imagePath.startsWith("/")) {
   return `${ApiBaseUrl.ImgUrl}${imagePath}`;
  }
  return `${ApiBaseUrl.ImgUrl}/${imagePath}`;
 };

 return (
  <>
   <FlexBox
    px="1rem"
    py="0.5rem"
    flexWrap="wrap"
    alignItems="center"
    key={item.product_name}
    style={{ display: "flex", justifyContent: "space-between" }}
   >
    <div>
     {/* <Link href={`/product/${item.product_slug}`}>
            <FlexBox flex="2 2 260px" m="6px" alignItems="center">
              <Avatar
                // src={item.product_image}
                // src={`${ApiBaseUrl.ImgUrl}${item.product_image}`}
                src={getProductImageUrl(item.product_image)}
                alt={item.product_image}
                size={64}
              />
              <Box ml="20px">
                <H6 my="0px">{item.product_name}</H6>
                <Typography fontSize="14px" color="text.muted">
                  {currency(item.price)} x {item.quantity}
                  {item.color && `, Color: ${item.color}`}
                  {item.size && `, Size: ${item.size}`}
                </Typography>
              </Box>
            </FlexBox>
          </Link> */}

     <Link
      href={`/${
       item.productType === "Abroad" ? "otproducts" : "product"
      }/${item.product_slug}`}
     >
      <FlexBox flex="2 2 260px" m="6px" alignItems="center">
       <Avatar
        src={getProductImageUrl(item.product_image)}
        alt={item.product_image}
        size={64}
       />
       <Box ml="20px">
        <H6 my="0px">{item.product_name}</H6>
        <Typography fontSize="14px" color="text.muted">
         {currency(item.price)} x {item.quantity}
         {item.color && `, Color: ${item.color}`}
         {item.attribute && `, Specification: ${item.attribute}`}
         {item.size && `, Size: ${item.size}`}
        </Typography>
       </Box>
      </FlexBox>
     </Link>
    </div>

    <div style={{ display: "flex" }}>
     {/* review and preview  */}
     {/* <FlexBox flex="160px" m="6px" alignItems="center">
          <Button
            variant="text"
            color="primary"
            disabled={status !== "Delivered"}  
            onClick={() => setIsModalOpen(true)}  
            style={{
              height: "30px",
              borderRadius: "100px",
              backgroundColor: reviewMode !== "submit" ? "#e94560" : "",  
              color: reviewMode !== "submit" ? "white" : "gray",  
              pointerEvents: status !== "Delivered" ? "none" : "auto", 
              transition: "none"  
            }}
          >
            <Typography fontSize="14px">
              {reviewMode === "submit" ? "Review" : "Preview"}
            </Typography>
          </Button>
        </FlexBox> */}

     {cancel_status !== 5 && cancel_status !== 6 && (
      <FlexBox flex="160px" m="6px" alignItems="center">
       <Button
        variant="text"
        color="primary"
        disabled={status !== "Delivered"}
        onClick={() => setIsModalOpen(true)}
        style={{
         height: "30px",
         borderRadius: "100px",
         backgroundColor: status === "Delivered" ? "#e94560" : "gray", // Set background color
         color: status === "Delivered" ? "white" : "darkgray", // Set text color
         cursor: status === "Delivered" ? "pointer" : "not-allowed",
         pointerEvents: status !== "Delivered" ? "none" : "auto",
         transition: "none",
        }}
       >
        <Typography fontSize="14px">
         {reviewMode === "submit" ? "Review" : "Preview"}
        </Typography>
       </Button>
      </FlexBox>
     )}

     {/* return policy */}
     {status === "Delivered" &&
      cancel_status !== 6 &&
      order_days_gone !== 3 && (
       <FlexBox flex="160px" m="6px" alignItems="center">
        <Button
         variant="text"
         color="primary"
         style={{
          height: "30px",
          borderRadius: "100px",
          backgroundColor: "#e94560",
          color: "white",
         }}
         onClick={handleReturnClick}
        >
         <Typography fontSize="14px">Return</Typography>
        </Button>
       </FlexBox>
      )}

     {/* Show "Returned" when status is 6 */}
     {cancel_status === 6 && (
      <>
       <FlexBox flex="160px" m="6px" alignItems="center" flexDirection="column">
        <Button
         variant="text"
         style={{
          color: "white",
          height: "30px",
          borderRadius: "100px",
          backgroundColor: "#e94560",
         }}
         onClick={handleToggle} // Toggle the component visibility on click
        >
         <Typography fontSize="14px">Returned</Typography>

         <FontAwesomeIcon
          icon={showOrderStatus ? faCaretUp : faCaretDown}
          style={{ marginLeft: "8px" }}
         />
        </Button>
       </FlexBox>
      </>
     )}

     {/* order cancel */}
     {status !== "Delivered" && cancel_status !== 6 && (
      <FlexBox flex="160px" m="6px" alignItems="center">
       <Button
        variant="text"
        style={{
         color:
          cancel_status >= 0 && cancel_status <= 2
           ? "blue"
           : cancel_status === 5
             ? "gray"
             : "gray",
         height: "30px",
         borderRadius: "100px",
        }}
        onClick={handleCancelClick}
        disabled={
         cancel_status === 5 || !(cancel_status >= 0 && cancel_status <= 2)
        }
       >
        <Typography fontSize="14px">
         {cancel_status >= 0 && cancel_status <= 2 ? "Cancel" : "Cancelled"}
        </Typography>
       </Button>
      </FlexBox>
     )}
    </div>
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
         style={{
          width: "100%",
          border: "1px solid #ccc",
          padding: "8px",
         }}
        />
       </Box>
       <Button
        variant="contained"
        color="primary"
        disabled={submitting}
        onClick={handleReviewSubmit}
       >
        {submitting ? "Submitting..." : "Submit Review"}
       </Button>
      </>
     ) : (
      <>
       <FlexBox alignItems="center" mb="1rem" style={{ gap: "8px" }}>
        <FontAwesomeIcon icon={faStore} size="sm" color="#0F3460" />
        <Typography fontWeight="600" fontSize="1.05rem" color="#0F3460">
         Your Review
        </Typography>
       </FlexBox>

       <Box
        style={{
         background: "#FAFBFC",
         border: "1px solid #E5E9F0",
         borderRadius: "10px",
         padding: "1rem 1.25rem",
        }}
       >
        <FlexBox
         alignItems="center"
         justifyContent="space-between"
         flexWrap="wrap"
         style={{ gap: "0.5rem" }}
        >
         <FlexBox alignItems="center">
          {[1, 2, 3, 4, 5].map((star) => (
           <span
            key={star}
            style={{
             fontSize: "20px",
             lineHeight: 1,
             color:
              star <= Math.round(Number(existingReview?.rating ?? rating))
               ? "#FFD700"
               : "#DDD",
             marginRight: "2px",
            }}
           >
            ★
           </span>
          ))}
         </FlexBox>

         <span
          style={{
           fontSize: "0.7rem",
           fontWeight: 600,
           color: "#1E8E3E",
           background: "rgba(30,142,62,0.1)",
           padding: "3px 10px",
           borderRadius: "999px",
           whiteSpace: "nowrap",
          }}
         >
          ✓ Verified Purchase
         </span>
        </FlexBox>

        <Typography
         mt="0.75rem"
         style={{
          color: "#444",
          lineHeight: 1.6,
          fontStyle: "italic",
          wordBreak: "break-word",
         }}
        >
         &ldquo;{existingReview?.comments || comments}&rdquo;
        </Typography>

        {existingReview?.images && existingReview.images.length > 0 && (
         <FlexBox mt="1rem" flexWrap="wrap" style={{ gap: "8px" }}>
          {existingReview.images.map((src, idx) => (
           <img
            key={idx}
            src={getProductImageUrl(src)}
            alt={`Review attachment ${idx + 1}`}
            style={{
             width: "72px",
             height: "72px",
             objectFit: "cover",
             borderRadius: "8px",
             border: "1px solid #E5E9F0",
            }}
           />
          ))}
         </FlexBox>
        )}
       </Box>
      </>
     )}
    </Box>
   </Modal>

   {/* Show the component outside of FlexBox, but directly underneath */}
   {showOrderStatus && (
    <Box mt="10px" p="10px" border="1px solid #e94560" borderRadius="8px">
     <ReturnedOrderStatus
      return_status={return_status}
      deliveredAt={delivered_at}
     />
    </Box>
   )}
  </>
 );
}

// image preview *******

// <Box mt="1rem">
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
// </Box>
