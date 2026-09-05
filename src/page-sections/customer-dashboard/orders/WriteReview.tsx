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
 const [hoverRating, setHoverRating] = useState(0);
 const [comments, setComments] = useState("");
 const [isAnonymous, setIsAnonymous] = useState(false);
 const [image, setImage] = useState<File[]>([]);
 const [previews, setPreviews] = useState<string[]>([]);
 const fileInputRef = useRef<HTMLInputElement>(null);
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

 // Object URLs are created once per selected file and revoked when the file is
 // dropped or the modal unmounts — building them inside render leaks one blob
 // per repaint.
 useEffect(() => {
  const urls = image.map((file) => URL.createObjectURL(file));
  setPreviews(urls);

  return () => urls.forEach((url) => URL.revokeObjectURL(url));
 }, [image]);

 const MAX_IMAGES = 5;
 const MAX_COMMENT = 1000;

 const addFiles = (files: FileList | null) => {
  if (!files) return;

  const picked = Array.from(files).filter((f) => f.type.startsWith("image/"));
  const room = MAX_IMAGES - image.length;

  if (room <= 0) {
   toast.error(`You can attach up to ${MAX_IMAGES} images.`);
   return;
  }
  if (picked.length > room) {
   toast.error(`Only ${room} more image${room === 1 ? "" : "s"} can be added.`);
  }

  setImage([...image, ...picked.slice(0, room)]);
 };

 const removeFile = (index: number) =>
  setImage(image.filter((_, i) => i !== index));

 const ratingLabels = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];
 const shownRating = hoverRating || rating;
 const canSubmit = rating > 0 && comments.trim().length >= 10 && !submitting;
 const savedRating = Math.round(Number(existingReview?.rating ?? rating)) || 0;

 // Full-size view of one attachment, opened from the preview grid.
 const [zoomedImage, setZoomedImage] = useState<string | null>(null);

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
        <Typography
         fontSize="14px"
         color="text.muted"
         style={
          isItemReturned || isItemCancelled
           ? { textDecoration: "line-through" }
           : undefined
         }
        >
         {currency(item.price)} x {item.quantity}
         {item.color && `, Color: ${item.color}`}
         {item.attribute && `, Specification: ${item.attribute}`}
         {item.size && `, Size: ${item.size}`}
        </Typography>

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
     p="1.5rem"
     bg="white"
     borderRadius="12px"
     width="520px"
     maxWidth="92vw"
     mx="auto"
     // A five-photo grid plus a long comment can outgrow a short viewport.
     style={{
      maxHeight: "88vh",
      overflowY: "auto",
      boxShadow: "0 12px 40px rgba(15,52,96,0.18)",
     }}
     onClick={(e) => e.stopPropagation()}
    >
     {reviewMode === "submit" ? (
      <>
       {/* Header — the product being reviewed, so the buyer is never guessing
           which item of a multi-item order this modal belongs to. */}
       <FlexBox alignItems="center" style={{ gap: "12px" }}>
        <Avatar
         src={getProductImageUrl(item.product_image)}
         alt={item.product_name}
         size={48}
        />
        <Box>
         <Typography fontSize="1.05rem" fontWeight="700" color="#0F3460">
          Write a review
         </Typography>
         <Typography
          fontSize="13px"
          color="text.muted"
          style={{
           maxWidth: "360px",
           overflow: "hidden",
           textOverflow: "ellipsis",
           whiteSpace: "nowrap",
          }}
         >
          {item.product_name}
         </Typography>
        </Box>
       </FlexBox>

       <Box
        mt="1rem"
        mb="1.25rem"
        style={{ height: "1px", background: "#E5E9F0" }}
       />

       {/* Rating */}
       <Box>
        <Typography fontSize="13px" fontWeight="600" color="#2C3A4A" mb="6px">
         Rate the product
        </Typography>
        <FlexBox alignItems="center" style={{ gap: "10px" }}>
         <FlexBox onMouseLeave={() => setHoverRating(0)}>
          {[1, 2, 3, 4, 5].map((star) => (
           <button
            key={star}
            type="button"
            aria-label={`${star} star${star === 1 ? "" : "s"}`}
            onMouseEnter={() => setHoverRating(star)}
            onClick={() => setRating(star)}
            style={{
             background: "transparent",
             cursor: "pointer",
             fontSize: "28px",
             lineHeight: 1,
             color: star <= shownRating ? "#FFB400" : "#DCE0E6",
             border: "none",
             padding: "0 2px",
             transition: "color 0.15s ease, transform 0.15s ease",
             transform: star <= hoverRating ? "scale(1.12)" : "none",
            }}
           >
            ★
           </button>
          ))}
         </FlexBox>
         {shownRating > 0 && (
          <Typography fontSize="13px" fontWeight="600" color="#FFB400">
           {ratingLabels[shownRating]}
          </Typography>
         )}
        </FlexBox>
       </Box>

       {/* Comment */}
       <Box mt="1.25rem">
        <Typography fontSize="13px" fontWeight="600" color="#2C3A4A" mb="6px">
         Your experience
        </Typography>
        <textarea
         rows={4}
         value={comments}
         maxLength={MAX_COMMENT}
         placeholder="What did you like or dislike? How was the quality and the delivery?"
         onChange={(e) => setComments(e.target.value)}
         style={{
          width: "100%",
          border: "1px solid #DCE0E6",
          borderRadius: "8px",
          padding: "10px 12px",
          fontSize: "14px",
          fontFamily: "inherit",
          color: "#2C3A4A",
          resize: "vertical",
          outline: "none",
         }}
        />
        <FlexBox justifyContent="space-between" mt="4px">
         <Typography fontSize="12px" color={comments.trim().length > 0 && comments.trim().length < 10 ? "#D32F2F" : "text.muted"}>
          {comments.trim().length < 10
           ? `At least 10 characters (${comments.trim().length}/10)`
           : "Looks good"}
         </Typography>
         <Typography fontSize="12px" color="text.muted">
          {comments.length}/{MAX_COMMENT}
         </Typography>
        </FlexBox>
       </Box>

       {/* Photos */}
       <Box mt="1.25rem">
        <FlexBox justifyContent="space-between" alignItems="center" mb="6px">
         <Typography fontSize="13px" fontWeight="600" color="#2C3A4A">
          Add photos <span style={{ color: "#8a94a6", fontWeight: 400 }}>(optional)</span>
         </Typography>
         <Typography fontSize="12px" color="text.muted">
          {image.length}/{MAX_IMAGES}
         </Typography>
        </FlexBox>

        <input
         ref={fileInputRef}
         type="file"
         accept="image/*"
         multiple
         style={{ display: "none" }}
         onChange={(e) => {
          addFiles(e.target.files);
          // Reset so picking the same file twice still fires onChange.
          e.target.value = "";
         }}
        />

        {/* Fixed 5-up grid so the tiles never wrap — MAX_IMAGES is 5, and the
            add-tile takes the last free cell. */}
        <Box
         style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "10px",
         }}
        >
         {previews.map((src, index) => (
          <Box
           key={src}
           style={{
            position: "relative",
            width: "100%",
            aspectRatio: "1 / 1",
            borderRadius: "10px",
            overflow: "hidden",
            border: "1px solid #E5E9F0",
            background: "#F7F9FC",
           }}
          >
           <img
            src={src}
            alt={`Attachment ${index + 1}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
           />
           <button
            type="button"
            aria-label={`Remove image ${index + 1}`}
            onClick={() => removeFile(index)}
            style={{
             position: "absolute",
             top: "4px",
             right: "4px",
             width: "20px",
             height: "20px",
             borderRadius: "50%",
             border: "none",
             background: "rgba(17,24,39,0.65)",
             color: "white",
             fontSize: "13px",
             lineHeight: "20px",
             cursor: "pointer",
             padding: 0,
            }}
           >
            ×
           </button>
          </Box>
         ))}

         {image.length < MAX_IMAGES && (
          <button
           type="button"
           onClick={() => fileInputRef.current?.click()}
           style={{
            width: "100%",
            aspectRatio: "1 / 1",
            borderRadius: "10px",
            border: "1px dashed #C6CDD8",
            background: "#FAFBFC",
            color: "#8a94a6",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2px",
            fontFamily: "inherit",
           }}
          >
           <span style={{ fontSize: "20px", lineHeight: 1 }}>+</span>
           <span style={{ fontSize: "11px" }}>Add photo</span>
          </button>
         )}
        </Box>
       </Box>

       {/* Anonymous */}
       <Box mt="1.25rem" p="10px 12px" bg="#F7F9FC" borderRadius="8px">
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
         <Typography fontSize="14px" color="#2C3A4A">
          Post this review anonymously
         </Typography>
        </label>
        <Typography fontSize="12px" color="text.muted" mt="4px" ml="24px">
         Your name won&apos;t be shown on the product page. The Verified
         Purchase badge stays.
        </Typography>
       </Box>

       {/* Actions */}
       <FlexBox
        justifyContent="flex-end"
        alignItems="center"
        mt="1.25rem"
        style={{ gap: "10px" }}
       >
        <Button
         variant="text"
         disabled={submitting}
         onClick={() => setIsModalOpen(false)}
         style={{
          height: "38px",
          borderRadius: "100px",
          padding: "0 18px",
          color: "#5b6472",
         }}
        >
         <Typography fontSize="14px">Cancel</Typography>
        </Button>
        <Button
         variant="text"
         disabled={!canSubmit}
         onClick={handleReviewSubmit}
         style={{
          height: "38px",
          borderRadius: "100px",
          padding: "0 22px",
          backgroundColor: canSubmit ? "#e94560" : "#F0C4CC",
          color: "white",
          cursor: canSubmit ? "pointer" : "not-allowed",
         }}
        >
         <Typography fontSize="14px" fontWeight="600">
          {submitting ? "Submitting…" : "Submit review"}
         </Typography>
        </Button>
       </FlexBox>
      </>
     ) : (
      <>
       {/* Same header as the submit view, so switching between the two does not
           feel like two different dialogs. */}
       <FlexBox alignItems="center" style={{ gap: "12px" }}>
        <Avatar
         src={getProductImageUrl(item.product_image)}
         alt={item.product_name}
         size={48}
        />
        <Box>
         <Typography fontSize="1.05rem" fontWeight="700" color="#0F3460">
          Your review
         </Typography>
         <Typography
          fontSize="13px"
          color="text.muted"
          style={{
           maxWidth: "360px",
           overflow: "hidden",
           textOverflow: "ellipsis",
           whiteSpace: "nowrap",
          }}
         >
          {item.product_name}
         </Typography>
        </Box>
       </FlexBox>

       <Box
        mt="1rem"
        mb="1.25rem"
        style={{ height: "1px", background: "#E5E9F0" }}
       />

       <Box
        style={{
         background: "#FAFBFC",
         border: "1px solid #E5E9F0",
         borderRadius: "10px",
         padding: "1.15rem 1.25rem",
        }}
       >
        <FlexBox
         alignItems="center"
         justifyContent="space-between"
         flexWrap="wrap"
         style={{ gap: "0.5rem" }}
        >
         <FlexBox alignItems="center" style={{ gap: "8px" }}>
          <FlexBox alignItems="center">
           {[1, 2, 3, 4, 5].map((star) => (
            <span
             key={star}
             style={{
              fontSize: "22px",
              lineHeight: 1,
              color: star <= savedRating ? "#FFB400" : "#DCE0E6",
              marginRight: "2px",
             }}
            >
             ★
            </span>
           ))}
          </FlexBox>
          {savedRating > 0 && (
           <Typography fontSize="13px" fontWeight="600" color="#FFB400">
            {ratingLabels[savedRating]}
           </Typography>
          )}
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

        {/* Quote mark sits in the margin instead of wrapping the text, so a long
            comment stays readable. */}
        <FlexBox mt="0.9rem" style={{ gap: "10px" }}>
         <Box
          style={{
           width: "3px",
           borderRadius: "3px",
           background: "#E5E9F0",
           flexShrink: 0,
          }}
         />
         <Typography
          style={{
           color: "#3d4753",
           lineHeight: 1.65,
           fontSize: "14px",
           wordBreak: "break-word",
           whiteSpace: "pre-line",
          }}
         >
          {existingReview?.comments || comments}
         </Typography>
        </FlexBox>

        {existingReview?.images && existingReview.images.length > 0 && (
         <>
          <Typography
           fontSize="12px"
           fontWeight="600"
           color="text.muted"
           mt="1.1rem"
           mb="8px"
           style={{ letterSpacing: "0.3px" }}
          >
           {existingReview.images.length} PHOTO
           {existingReview.images.length === 1 ? "" : "S"}
          </Typography>
          {/* Fixed 5-up grid: the cap is 5 photos, so they always sit on one row. */}
          <Box
           style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "10px",
           }}
          >
           {existingReview.images.map((src, idx) => (
            <button
             key={idx}
             type="button"
             aria-label={`View photo ${idx + 1} full size`}
             onClick={() => setZoomedImage(getProductImageUrl(src))}
             style={{
              width: "100%",
              aspectRatio: "1 / 1",
              padding: 0,
              borderRadius: "10px",
              overflow: "hidden",
              border: "1px solid #E5E9F0",
              background: "#fff",
              cursor: "zoom-in",
             }}
            >
             <img
              src={getProductImageUrl(src)}
              alt={`Review attachment ${idx + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
             />
            </button>
           ))}
          </Box>
         </>
        )}
       </Box>

       <FlexBox justifyContent="flex-end" mt="1.25rem">
        <Button
         variant="text"
         onClick={() => setIsModalOpen(false)}
         style={{
          height: "38px",
          borderRadius: "100px",
          padding: "0 22px",
          backgroundColor: "#e94560",
          color: "white",
         }}
        >
         <Typography fontSize="14px" fontWeight="600">
          Close
         </Typography>
        </Button>
       </FlexBox>
      </>
     )}
    </Box>
   </Modal>

   {/* Attachments are small in the grid; this shows one at full size. */}
   <Modal open={Boolean(zoomedImage)} onClose={() => setZoomedImage(null)}>
    <Box
     mx="auto"
     style={{ maxWidth: "92vw", maxHeight: "88vh" }}
     onClick={() => setZoomedImage(null)}
    >
     {zoomedImage && (
      <img
       src={zoomedImage}
       alt="Review attachment"
       style={{
        maxWidth: "92vw",
        maxHeight: "88vh",
        objectFit: "contain",
        borderRadius: "12px",
        display: "block",
        cursor: "zoom-out",
       }}
      />
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
