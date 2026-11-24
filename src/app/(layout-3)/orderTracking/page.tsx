"use client";

import React, { useState, useEffect } from "react";
import "./TrackPage.css";
import ApiBaseUrl from "api/ApiBaseUrl";
import authService from "services/authService";

interface Seller {
 name: string;
 order_status: number;
 contact: string;
 estimated_delivery_date: string | null;
 items: {
  product_name: string;
  quantity: string;
  price: string;
 }[];
}

interface TrackingData {
 order_id: string;
 order_date: string;
 delivery_address: string;
 sellers: Seller[];
 total_amount: string | null;
 payment_status: string | null;
}

export default function TrackPage() {
 const [trackingId, setTrackingId] = useState("");
 const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
 const [error, setError] = useState<string | null>(null);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [isMounted, setIsMounted] = useState(false);
 const [isLoading, setIsLoading] = useState(false);

 const authtoken = authService.getToken();

 useEffect(() => {
  if (isModalOpen) {
   setIsMounted(true);
  }
 }, [isModalOpen]);

  const handleTrack = async () => {
    const cleanId = trackingId.trim();
    if (!cleanId) {
      setError("⚠️ Please enter a tracking ID or Order Number.");
      setTrackingData(null);
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true);
    setError(null);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (authtoken) {
      headers.Authorization = `Bearer ${authtoken}`;
    }

    const candidateUrls = [
      `${ApiBaseUrl.localApiUrl}track/order/${encodeURIComponent(cleanId)}`,
      `${ApiBaseUrl.baseUrl}track/order/${encodeURIComponent(cleanId)}`,
    ];

    let fetchedData = null;
    let fetchErrorMessage = null;

    for (const url of candidateUrls) {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers,
        });
        if (response.ok) {
          const data = await response.json();
          if (data.status && data.data) {
            fetchedData = data.data;
            break;
          } else if (data.message) {
            fetchErrorMessage = data.message;
          }
        } else if (response.status === 404) {
          const data = await response.json().catch(() => null);
          fetchErrorMessage = data?.message || "Order not found. Please verify your tracking ID or Order number.";
        }
      } catch {
        // try next candidate
      }
    }

    if (fetchedData) {
      setTrackingData(fetchedData);
      setError(null);
    } else {
      setError(fetchErrorMessage || "Order not found. Please check your tracking ID or Order number.");
      setTrackingData(null);
    }

    setIsLoading(false);
    setIsModalOpen(true);
  };
 const closeModal = () => {
  setIsModalOpen(false);
 };

 const handleAnimationEnd = () => {
  if (!isModalOpen) {
   setIsMounted(false);
  }
 };

 const getStatusText = (status: number) => {
  switch (status) {
   case 0:
    return "Pending";
   case 1:
    return "Confirmed";
   case 2:
    return "Processing";
   case 3:
    return "Shipped";
   case 4:
    return "Delivered";
   case 5:
    return "Canceled";
   case 6:
    return "Returned";
   default:
    return "Unknown";
  }
 };

 return (
  <>
   {/* Tracking Section */}
   <div className="tracking-section">
    <div className="container">
     <div className="tracking-card">
      <div className="tracking-header-icon">
       <svg viewBox="0 0 24 24" className="icon-pulse">
        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.7 1.3 3 3 3s3-1.3 3-3h6c0 1.7 1.3 3 3 3s3-1.3 3-3h2v-5l-3-4zM6 18.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm9-3.5H8.2c-.5-.6-1.2-1-2-1H3V6h12v9zm3 3.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zM17 12V9.5h2.5l2 2.5H17z" />
       </svg>
      </div>
      <div className="tracking-text-group">
       <span className="tracking-badge">LIVE TRACKING</span>
       <h1 className="tracking-title">Track your Order</h1>
       <p className="tracking-subtitle">
        Enter your order ID below to get real-time delivery status & updates on your package.
       </p>
      </div>

      <div className="tracking-form-group">
       <div className="input-wrapper">
        <svg className="search-icon" viewBox="0 0 24 24">
         <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
        <input
         type="text"
         placeholder="e.g. 10429 or TZ-98421"
         value={trackingId}
         onChange={(e) => setTrackingId(e.target.value)}
         onKeyDown={(e) => {
          if (e.key === "Enter") handleTrack();
         }}
         className={`tracking-input ${trackingId ? "input-active" : ""}`}
        />
        {trackingId && (
         <button
          type="button"
          className="clear-input-btn"
          onClick={() => setTrackingId("")}
          aria-label="Clear input"
         >
          &times;
         </button>
        )}
       </div>

       <button
        onClick={handleTrack}
        className="track-button"
        disabled={isLoading}
       >
        {isLoading ? (
         <>
          <span className="button-spinner"></span>
          <span>Searching...</span>
         </>
        ) : (
         <>
          <span>Track Now</span>
          <svg className="btn-arrow" viewBox="0 0 24 24">
           <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
         </>
        )}
       </button>
      </div>

      <div className="tracking-features-pill">
       <div className="feature-item">
        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
        <span>Real-time Status</span>
       </div>
       <span className="pill-dot">•</span>
       <div className="feature-item">
        <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.5h-2v-2h2v2zm0-4.5h-2V7h2v5z"/></svg>
        <span>Instant Updates</span>
       </div>
       <span className="pill-dot">•</span>
       <div className="feature-item">
        <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
        <span>Secure Tracking</span>
       </div>
      </div>
     </div>
    </div>
   </div>

   {/* Modal */}
   {isMounted && (
    <div
     className={`modal-overlay ${isModalOpen ? "open" : "closing"}`}
     onClick={closeModal}
     onAnimationEnd={handleAnimationEnd}
    >
     <div
      className={`modal-content ${isModalOpen ? "open" : "closing"}`}
      onClick={(e) => e.stopPropagation()}
     >
      <span className="modal-close" onClick={closeModal}>
       &times;
      </span>
      <h3 className="modal-title">Order Tracking Details</h3>

      {isLoading ? (
       <div className="loading-spinner">Loading...</div>
      ) : error ? (
       <div className="error-message">{error}</div>
      ) : trackingData ? (
       <div className="tracking-details">
        {/* Order Header Card */}
        <div className="order-header-card">
         <div className="order-badge">
          <svg className="order-icon" viewBox="0 0 24 24">
           <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.7 1.3 3 3 3s3-1.3 3-3h6c0 1.7 1.3 3 3 3s3-1.3 3-3h2v-5l-3-4zM6 18.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm9-3.5H8.2c-.5-.6-1.2-1-2-1H3V6h12v9zm3 3.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zM17 12V9.5h2.5l2 2.5H17z" />
          </svg>
          <span>ORDER #{trackingData.order_id}</span>
         </div>

         <div className="order-meta-grid">
          <div className="meta-item">
           <span className="meta-label">Order Date</span>
           <span className="meta-value highlight">
            {new Date(trackingData.order_date).toLocaleDateString("en-US", {
             weekday: "long",
             year: "numeric",
             month: "long",
             day: "numeric",
            })}
           </span>
          </div>

          <div className="meta-item">
           <span className="meta-label">Order Time</span>
           <span className="meta-value">
            {new Date(trackingData.order_date).toLocaleTimeString("en-US", {
             hour: "2-digit",
             minute: "2-digit",
            })}
           </span>
          </div>
         </div>
        </div>

        {/* Delivery Address Card */}
        <div className="address-card">
         <div className="card-header">
          <svg className="location-icon" viewBox="0 0 24 24">
           <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <h4>Delivery Address</h4>
         </div>
         <div className="address-content">
          {trackingData.delivery_address.split("\n").map((line, i) => (
           <p key={i}>{line}</p>
          ))}
         </div>
        </div>
        {/* </div> */}

        <h4 className="orderStatusHeading">Order Status by Seller:</h4>
        {trackingData.sellers.map((seller, index) => (
         <div key={index} className="seller-info">
          <div className="seller-header">
           <strong>{seller.name}</strong>
           <span className={`status-badge status-${seller.order_status}`}>
            {getStatusText(seller.order_status)}
           </span>
          </div>
          <div className="seller-contact">
           <strong>Contact:</strong> {seller.contact}
          </div>

          {/* Updated estimated delivery section */}
          <div className="estimated-delivery">
           <strong>Estimated Delivery:&nbsp;</strong>
           {seller.estimated_delivery_date ? (
            new Date(seller.estimated_delivery_date).toLocaleDateString()
           ) : (
            <span className="not-available">Not available yet</span>
           )}
          </div>

          <div className="items-list">
           <strong>Items:</strong>
           <ul>
            {seller.items.map((item, itemIndex) => (
             <li key={itemIndex}>
              <span className="item-name">{item.product_name}</span>
              <span className="item-details">
               <span className="item-quantity">Qty: {item.quantity}</span>
               <span className="price">৳{item.price}</span>
              </span>
             </li>
            ))}
           </ul>
          </div>
         </div>
        ))}

        {trackingData.total_amount && (
         <div className="total-amount">
          <strong>Total Amount:</strong> ৳{trackingData.total_amount}
         </div>
        )}
        {trackingData.payment_status && (
         <div className="payment-status">
          <strong>Payment Status:</strong> {trackingData.payment_status}
         </div>
        )}
       </div>
      ) : null}
     </div>
    </div>
   )}
  </>
 );
}
