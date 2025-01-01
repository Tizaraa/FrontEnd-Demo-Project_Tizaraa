import React, { useEffect, useState } from "react";
import axios from "axios";
import ApiBaseUrl from "api/ApiBaseUrl";
import NoReviews from "./no-reviews";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


const ProductRating = ({ productId }) => {
  const [ratingData, setRatingData] = useState(null);
  const apiURL = `${ApiBaseUrl.baseUrl}product/comment/${productId}`;

  useEffect(() => {
    const fetchRatingData = async () => {
      try {
        const response = await axios.get(apiURL);
        setRatingData(response.data);
      } catch (error) {
        console.error("Error fetching rating data:", error);
      }
    };

    fetchRatingData();
  }, [apiURL]);

  if (!ratingData) {
    return <div>Loading...</div>;
  }

  const { rating_avarage, total_rating, perrating } = ratingData;

  // Check if there are no reviews
  if (!total_rating || total_rating === 0) {
    return <NoReviews></NoReviews>;
  }

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h3 style={{ marginBottom: "10px", fontSize: "1.2rem" }}>
        Ratings & Reviews
      </h3>
      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              // gap: "10px",
            }}
          >
            <div style={{ fontSize: "3rem", fontWeight: "bold" }}>
              {rating_avarage?.toFixed(1)}/5
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  gap: "2px",
                  marginBottom: "5px",
                }}
              >
                {Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <span
                      key={index}
                      style={{
                        color:
                          index < Math.round(rating_avarage)
                            ? "#ffc107"
                            : "#e4e5e9",
                        fontSize: "2rem",
                       
                      }}
                    >
                     <FontAwesomeIcon icon={faStar} />
                    </span>
                  ))}
              </div>
              <div style={{ fontSize: "14px", color: "#555" }}>
                  {total_rating} {total_rating === 1 ? "Rating" : "Ratings"}
              </div>

            </div>
          </div>
        </div>
        <div
          style={{
            flexBasis: "100%",
            maxWidth: "500px",
            margin: "0 50px",
          }}
        >
          {[5, 4, 3, 2, 1].map((stars) => (
            <div
              key={stars}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
                gap: "10px",
              }}
            >
            <span style={{ display: "inline-flex", textAlign: "right" }}>
  {Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon
      key={index}
      icon={faStar}
      style={{ color: "#ffc107", marginRight: "2px" }}
    />
  ))}
</span>

              <div
                style={{
                  flex: 1,
                  background: "#e4e5e9",
                  borderRadius: "4px",
                  overflow: "hidden",
                  height: "8px",
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
              <span>{perrating[stars] || 0}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductRating;
