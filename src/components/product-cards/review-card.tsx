"use client";

import Image from "next/image";
import { useEffect, useState, CSSProperties } from "react";
import axios from "@lib/axiosClient";
import ProductRating from "./product-rating";
import { productPageTheme as theme } from "@component/products/productPageTheme";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function ReviewCard({ productId }: { productId: string }) {
 const [isMobile, setIsMobile] = useState(false);
 const [comments, setComments] = useState<any[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState("");
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [currentImageIndex, setCurrentImageIndex] = useState(0);
 const [modalImages, setModalImages] = useState<string[]>([]);

 useEffect(() => {
  const fetchComments = async () => {
   try {
    const response = await axios.get(`products/${productId}/reviews`);
    setComments(response.data.data || []);
   } catch (err) {
    console.error("Error fetching comments:", err);
    setError("Failed to load reviews. Please try again.");
   } finally {
    setLoading(false);
   }
  };

  fetchComments();

  const handleResize = () => {
   setIsMobile(window.innerWidth <= 640);
  };

  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
 }, [productId]);

 const openModal = (images: string[], index: number) => {
  setModalImages(images);
  setCurrentImageIndex(index);
  setIsModalOpen(true);
 };

 const closeModal = () => {
  setIsModalOpen(false);
  setCurrentImageIndex(0);
  setModalImages([]);
 };

 const showNextImage = () => {
  setCurrentImageIndex((prevIndex) => (prevIndex + 1) % modalImages.length);
 };

 const showPrevImage = () => {
  setCurrentImageIndex((prevIndex) =>
   prevIndex === 0 ? modalImages.length - 1 : prevIndex - 1
  );
 };
 const isMobilee = window.innerWidth <= 768;
 const isSmallMobile = window.innerWidth <= 480;
 const styles: Record<string, CSSProperties> = {
  container: {
   padding: isMobilee ? "16px" : "20px",
   width: "100%",
   maxWidth: theme.maxWidth,
   boxSizing: "border-box",
   backgroundColor: theme.surface,
   border: `1px solid ${theme.border}`,
   borderRadius: "10px",
  },
  reviewItem: {
   padding: "18px 0",
   borderTop: `1px solid ${theme.border}`,
  },
  header: {
   display: "flex",
   alignItems: "center",
   gap: "12px",
  },
  avatar: {
   width: "40px",
   height: "40px",
   flexShrink: 0,
   borderRadius: "50%",
   backgroundColor: theme.accentTint,
   color: theme.accent,
   fontWeight: 600,
   fontSize: "15px",
   display: "flex",
   alignItems: "center",
   justifyContent: "center",
  },
  userInfo: { display: "flex", flexDirection: "column" as const, gap: "3px" },
  userName: { fontSize: "14px", fontWeight: 600, color: theme.heading },
  date: { color: theme.muted, fontSize: "12.5px", whiteSpace: "nowrap" as const },
  rating: { display: "flex", gap: "3px" },
  star: { color: "#FFC107", fontSize: "12px" },
  reviewText: {
   fontSize: "14px",
   lineHeight: 1.6,
   color: theme.body,
   margin: "12px 0 0",
  },
  reviewImages: {
   display: "flex",
   flexWrap: "wrap" as const,
   gap: "10px",
   marginTop: "12px",
  },
  reviewImage: {
   width: "88px",
   height: "88px",
   objectFit: "cover" as const,
   borderRadius: "8px",
   border: `1px solid ${theme.border}`,
   cursor: "pointer",
  },
  productImage: { borderRadius: "4px", height: "300px", cursor: "pointer" },
  modalOverlay: {
   position: "fixed" as const,
   top: 0,
   left: 0,
   width: "100%",
   height: "100%",
   backgroundColor: "rgba(0, 0, 0, 0.7)",
   display: "flex",
   alignItems: "center",
   justifyContent: "center",
   zIndex: 1000,
  },
  modalContent: {
   position: "relative" as const,
   width: "100%",
   objectFit: "cover",
   maxWidth: "700px",
   textAlign: "center",
  },
  modalImage: { width: "100%", borderRadius: "8px" },
  closeButton: {
   position: "absolute" as const,
   top: "10px",
   right: "10px",
   background: "white",
   border: "none",
   borderRadius: "50%",
   width: "30px",
   height: "30px",
   cursor: "pointer",
  },
  navButton: {
   position: "absolute" as const,
   top: "50%",
   transform: "translateY(-50%)",
   background: "white",
   border: "none",
   borderRadius: "50%",
   width: "40px",
   height: "40px",
   cursor: "pointer",
  },
  prevButton: { left: "10px" },
  nextButton: { right: "10px" },
 };

 if (loading)
  return (
   <div style={{ ...styles.container, color: theme.muted, fontSize: "14px" }}>
    Loading reviews…
   </div>
  );
 if (error)
  return (
   <p style={{ ...styles.container, color: theme.accent, fontSize: "14px" }}>
    {error}
   </p>
  );

 return (
  <div style={styles.container}>
   <ProductRating productId={productId}></ProductRating>
   {comments.map((comment, index) => (
    <div key={index} style={styles.reviewItem}>
     <div
      style={{
       display: "flex",
       justifyContent: "space-between",
       alignItems: "center",
       gap: "12px",
      }}
     >
      {/* User image, name, rating */}
      <div style={styles.header}>
       <div style={styles.avatar}>
        {(comment.buyer_name || "A")[0].toUpperCase()}
       </div>
       <div style={styles.userInfo}>
        <div style={styles.userName}>{comment.buyer_name || "Anonymous"}</div>
        <div style={styles.rating}>
         {Array.from({ length: Number(comment.rating) }).map((_, i) => (
          <span key={i} style={styles.star}>
           <FontAwesomeIcon icon={faStar} />
          </span>
         ))}
        </div>
       </div>
      </div>
      {/* Rating date */}
      <div style={styles.date}>
       {comment.created_at
        ? new Date(comment.created_at).toLocaleDateString()
        : ""}
      </div>
     </div>

     <p style={styles.reviewText}>{comment.comment}</p>

     {comment.images?.length > 0 && (
      <div style={styles.reviewImages}>
       {comment.images.map((imageUrl: string, imgIndex: number) => (
        <Image
         key={imgIndex}
         src={imageUrl}
         alt="Review Image"
         width={88}
         height={88}
         style={styles.reviewImage}
         onClick={() => openModal(comment.images, imgIndex)}
        />
       ))}
      </div>
     )}
    </div>
   ))}

   {/* image slide  */}
   {isModalOpen && (
    <div style={styles.modalOverlay}>
     <div style={styles.modalContent}>
      <button style={styles.closeButton} onClick={closeModal}>
       ✕
      </button>
      <Image
       src={modalImages[currentImageIndex]}
       alt="Preview"
       width={500}
       height={500}
       style={styles.modalImage}
      />
      <button
       style={{ ...styles.navButton, ...styles.prevButton }}
       onClick={showPrevImage}
      >
       ◀
      </button>
      <button
       style={{ ...styles.navButton, ...styles.nextButton }}
       onClick={showNextImage}
      >
       ▶
      </button>
     </div>
    </div>
   )}
  </div>
 );
}
