import React, { useEffect, useState } from "react";
import axios from "@lib/axiosClient";
import NoReviews from "./no-reviews";
import Rating from "@component/rating";
import { productPageTheme as theme } from "@component/products/productPageTheme";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ProductRating = ({ productId }) => {
 const [ratingData, setRatingData] = useState(null);

 useEffect(() => {
  const fetchRatingData = async () => {
   try {
    const response = await axios.get(`products/${productId}/reviews`);
    setRatingData(response.data.stats);
   } catch (error) {
    console.error("Error fetching rating data:", error);
   }
  };

  fetchRatingData();
 }, [productId]);

 if (!ratingData) {
  return (
   <div style={{ color: theme.muted, fontSize: "14px" }}>Loading ratings…</div>
  );
 }

 const { average: rating_avarage, total: total_rating, per_rating: perrating } = ratingData;

 const isMobilee = window.innerWidth <= 768;
 const isSmallMobile = window.innerWidth <= 480;

 // Check if there are no reviews
 if (!total_rating || total_rating === 0) {
  return <NoReviews></NoReviews>;
 }

 return (
  <div style={{ paddingBottom: "20px", borderBottom: `1px solid ${theme.border}` }}>
   <h3
    style={{
     margin: "0 0 16px",
     fontSize: "16px",
     fontWeight: 600,
     color: theme.heading,
    }}
   >
    Ratings & Reviews
   </h3>

   <div
    style={{
     display: "flex",
     gap: isSmallMobile ? "16px" : "32px",
     flexDirection: isMobilee ? "column" : "row",
     alignItems: isMobilee ? "flex-start" : "center",
    }}
   >
    {/* average score */}
    <div style={{ minWidth: "120px" }}>
     <div
      style={{
       fontSize: "36px",
       fontWeight: 700,
       lineHeight: 1.1,
       color: theme.heading,
      }}
     >
      {rating_avarage?.toFixed(1)}
      <span style={{ fontSize: "18px", color: theme.muted, fontWeight: 500 }}>
       /5
      </span>
     </div>

     {/* Same half-star rendering as the stars under the product title, so 2.5
         shows as two and a half filled rather than rounding up to three. */}
     <div style={{ margin: "8px 0 6px" }}>
      <Rating value={rating_avarage} outof={5} color="warn" readOnly />
     </div>

     <div style={{ fontSize: "12.5px", color: theme.muted }}>
      {total_rating} {total_rating === 1 ? "Rating" : "Ratings"}
     </div>
    </div>

    {/* per-star breakdown */}
    <div style={{ flex: 1, width: "100%", maxWidth: "420px" }}>
     {[5, 4, 3, 2, 1].map((stars) => (
      <div
       key={stars}
       style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "7px",
        gap: "10px",
       }}
      >
       <span
        style={{
         display: "inline-flex",
         alignItems: "center",
         gap: "4px",
         width: "34px",
         fontSize: "12.5px",
         color: "#6B7280",
        }}
       >
        {stars}
        <FontAwesomeIcon icon={faStar} style={{ color: "#ffc107" }} />
       </span>

       <div
        style={{
         flex: 1,
         background: theme.border,
         borderRadius: "999px",
         overflow: "hidden",
         height: "6px",
        }}
       >
        <div
         style={{
          background: "#ffc107",
          width: `${((perrating[stars] || 0) / total_rating) * 100}%`,
          height: "100%",
         }}
        ></div>
       </div>

       <span
        style={{
         width: "24px",
         textAlign: "right",
         fontSize: "12.5px",
         color: theme.muted,
        }}
       >
        {perrating[stars] || 0}
       </span>
      </div>
     ))}
    </div>
   </div>
  </div>
 );
};

export default ProductRating;
