import React, { useState, useRef, useEffect } from "react";
import Box from "@component/Box";
import Avatar from "@component/avatar";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import Typography, { H6 } from "@component/Typography";
import { currency } from "@utils/utils";
import { format } from "date-fns";
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
 isCorporate = false,
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
 isCorporate?: boolean;
}) {
 const [showOrderStatus, setShowOrderStatus] = useState(false);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [isCorporateReturnOpen, setIsCorporateReturnOpen] = useState(false);
 const [rating, setRating] = useState(0);
 const [comments, setComments] = useState("");
 const [isAnonymous, setIsAnonymous] = useState(false);
 const [image, setImage] = useState<File[]>([]);
 const [reviewMode, setReviewMode] = useState<"submit" | "preview">(
  item.ratingcheck ? "preview" : "submit"
 );
 const [existingReview, setExistingReview] = useState<{
  rating: any;
  comments: string;
  images: string[];
  isAnonymous: boolean;
 } | null>(null);
 const router = useRouter();

 const deliveryCharge = orderDetails?.delivery_charge;

 // A corporate counter return refunds this one item while the rest of the order
 // stays delivered, so the row has to carry its own returned state.
 const isItemReturned = item?.item_return_status === "returned";

 // Likewise an item can be cancelled on its own before delivery, by either the
 // buyer here or the seller in the panel.
 const isItemCancelled = Boolean(item?.item_cancelled_at);

 // Buyers may only pull an item until the seller starts preparing the order; the
 // engine enforces this too, this just avoids offering a button that will 422.
 const canCancelItem =
  !isItemCancelled &&
  !isItemReturned &&
  ["Pending", "Confirmed"].includes(status);

 useEffect(() => {
  // Server data is authoritative; only fall back to the localStorage cache
  // (written right after a submit) if the server hasn't recorded a review yet.
  if (item.ratingcheck) {
   setExistingReview({
    rating: item.rating,
    comments: item.comments,
    images: item.images,
    isAnonymous: Boolean(item.is_anonymous),
   });
   setReviewMode("preview");
   return;
  }

  const storedReview = localStorage.getItem(`review-${item.order_item_id}`);
  if (storedReview) {
   const parsedReview = JSON.parse(storedReview);
   setRating(parsedReview.rating);
   setComments(parsedReview.comments);
   setIsAnonymous(Boolean(parsedReview.isAnonymous));
   setExistingReview({
    rating: parsedReview.rating,
    comments: parsedReview.comments,
    images: parsedReview.images || [],
    isAnonymous: Boolean(parsedReview.isAnonymous),
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
  // "1"/"0", not "true"/"false" — Laravel's boolean rule rejects the word forms.
  formData.append("is_anonymous", isAnonymous ? "1" : "0");

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
    isAnonymous: Boolean(created.is_anonymous ?? isAnonymous),
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
  if (!canCancelItem) return;
  // The cancellation page reads this to offer "just this item" or "the whole order".
  sessionStorage.setItem("cancelItem", JSON.stringify(item));
  router.push(`/cancelled-order?orderItemId=${btoa(String(item.order_item_id))}`);
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
        style={isItemReturned || isItemCancelled ? { opacity: 0.5 } : undefined}
       />
       <Box ml="20px">
        <H6
         my="0px"
         style={
          isItemReturned || isItemCancelled
           ? { textDecoration: "line-through", color: "#8a94a6" }
           : undefined
         }
        >
         {item.product_name}
        </H6>
        {isItemCancelled ? (
         <Typography fontSize="14px" color="text.muted">
          <span
           style={{
            textDecoration: "line-through",
            textDecorationColor: "#e53935",
            textDecorationThickness: "2px",
           }}
          >
           {currency(item.price)}
          </span>{" "}
          x {item.quantity}
          {item.color && `, Color: ${item.color}`}
          {item.attribute && `, Specification: ${item.attribute}`}
          {item.size && `, Size: ${item.size}`}
          <br />
          <Typography
           as="span"
           fontSize="14px"
           fontWeight="700"
           color="#333"
          >
           {currency(0)}
          </Typography>
         </Typography>
        ) : (
         <Typography
          fontSize="14px"
          color="text.muted"
          style={
           isItemReturned ? { textDecoration: "line-through" } : undefined
          }
         >
          {currency(item.price)} x {item.quantity}
          {item.color && `, Color: ${item.color}`}
          {item.attribute && `, Specification: ${item.attribute}`}
          {item.size && `, Size: ${item.size}`}
         </Typography>
        )}

        {isItemCancelled && (
         <FlexBox alignItems="center" mt="6px" style={{ gap: "8px" }}>
          <Box
           px="8px"
           py="2px"
           bg="#FEE2E2"
           borderRadius="100px"
           style={{ whiteSpace: "nowrap" }}
          >
           <Typography
            fontSize="10px"
            fontWeight="700"
            color="#b91c1c"
            style={{ letterSpacing: "0.4px" }}
           >
            CANCELLED
           </Typography>
          </Box>
          <Typography fontSize="12px" color="text.muted">
           {format(new Date(item.item_cancelled_at), "dd MMM yyyy")}
          </Typography>
         </FlexBox>
        )}

        {isItemReturned && (
         <FlexBox alignItems="center" mt="6px" style={{ gap: "8px" }}>
          <Box
           px="8px"
           py="2px"
           bg="#EEF1F5"
           borderRadius="100px"
           style={{ whiteSpace: "nowrap" }}
          >
           <Typography
            fontSize="10px"
            fontWeight="700"
            color="#5b6472"
            style={{ letterSpacing: "0.4px" }}
           >
            RETURNED
           </Typography>
          </Box>
          <Typography fontSize="12px" color="#2e7d32" fontWeight="600">
           {currency(item.item_refund_amount ?? item.price * item.quantity)}{" "}
           refunded
          </Typography>
          {item.item_returned_at && (
           <Typography fontSize="12px" color="text.muted">
            {format(new Date(item.item_returned_at), "dd MMM yyyy")}
           </Typography>
          )}
         </FlexBox>
        )}
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

     {status === "Delivered" && cancel_status !== 5 && cancel_status !== 6 && !isItemReturned && !isItemCancelled && (
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
      order_days_gone !== 3 &&
      !isItemReturned &&
      !isItemCancelled && (
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
         onClick={
          // Corporate shop returns happen face to face at the counter — the seller
          // presses the return button, not the buyer. Explain instead of navigating.
          isCorporate
           ? () => setIsCorporateReturnOpen(true)
           : handleReturnClick
         }
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

     {/* item cancel — buyer's window closes once the seller starts processing */}
     {status !== "Delivered" && cancel_status !== 6 && !isItemCancelled && (
      <FlexBox flex="160px" m="6px" alignItems="center">
       <Button
        variant="text"
        style={{
         color: canCancelItem ? "blue" : "gray",
         height: "30px",
         borderRadius: "100px",
         cursor: canCancelItem ? "pointer" : "not-allowed",
        }}
        onClick={handleCancelClick}
        disabled={!canCancelItem}
       >
        <Typography fontSize="14px">Cancel</Typography>
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
       <Box mt="0.75rem" mb="1rem">
        <label
         style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
         }}
        >
         <input
          type="checkbox"
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
          style={{ cursor: "pointer" }}
         />
         <Typography fontSize="14px">Post this review anonymously</Typography>
        </label>
        <Typography fontSize="12px" color="text.muted" mt="4px" ml="24px">
         Your name won&apos;t be shown on the product page. The Verified
         Purchase badge stays.
        </Typography>
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

         <FlexBox alignItems="center" style={{ gap: "6px" }}>
          {existingReview?.isAnonymous && (
           <span
            style={{
             fontSize: "0.7rem",
             fontWeight: 600,
             color: "#5b6472",
             background: "#EEF1F5",
             padding: "3px 10px",
             borderRadius: "999px",
             whiteSpace: "nowrap",
            }}
           >
            Posted anonymously
           </span>
          )}

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

   {/* Corporate shop returns are processed by the seller at the counter, so the
       buyer gets instructions rather than the online return request form. */}
   <Modal
    open={isCorporateReturnOpen}
    onClose={() => setIsCorporateReturnOpen(false)}
   >
    <Box
     p="1.5rem"
     bg="white"
     borderRadius="8px"
     width="440px"
     maxWidth="90vw"
     mx="auto"
     onClick={(e) => e.stopPropagation()}
    >
     <FlexBox alignItems="center" mb="1rem" style={{ gap: "10px" }}>
      <Box
       width="40px"
       height="40px"
       borderRadius="50%"
       bg="#FFF4F6"
       style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
       }}
      >
       <FontAwesomeIcon icon={faStore} style={{ color: "#e94560" }} />
      </Box>
      <Typography fontSize="17px" fontWeight="700" color="#e94560">
       Return at the shop
      </Typography>
     </FlexBox>

     <Typography fontSize="14px" color="#444" style={{ lineHeight: 1.6 }}>
      This item was bought from a corporate shop, so returns are handled in
      person — there is nothing to submit here.
     </Typography>

     <Box mt="1rem" p="12px 14px" bg="#F7F9FC" borderRadius="8px">
      <Typography fontSize="13px" fontWeight="600" color="#2C3A4A" mb="8px">
       What to do
      </Typography>
      <Typography fontSize="13px" color="#555" style={{ lineHeight: 1.7 }}>
       1. Bring <b>{item?.product_name}</b> back to the shop.
       <br />
       2. Give the seller your Order ID, shown at the top of this page.
       <br />
       3. The seller confirms the return and your credit is restored on the
       spot.
      </Typography>
     </Box>

     <Typography fontSize="12px" color="text.muted" mt="12px">
      Returns must be made on the same day the item was delivered.
     </Typography>

     <FlexBox justifyContent="flex-end" mt="1.25rem">
      <Button
       variant="text"
       style={{
        height: "34px",
        borderRadius: "100px",
        backgroundColor: "#e94560",
        color: "white",
        padding: "0 20px",
       }}
       onClick={() => setIsCorporateReturnOpen(false)}
      >
       <Typography fontSize="14px">Got it</Typography>
      </Button>
     </FlexBox>
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
