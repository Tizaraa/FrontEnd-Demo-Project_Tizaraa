'use client';

import React, { useState, useEffect } from 'react';
import './TrackPage.css';
import ApiBaseUrl from 'api/ApiBaseUrl';
import authService from 'services/authService';

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
  const [trackingId, setTrackingId] = useState('');
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
    if (trackingId.trim() === '') {
      setError('⚠️ Please enter a tracking ID.');
      setTrackingData(null);
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${ApiBaseUrl.baseUrl}track/order/${trackingId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authtoken}`,
        },
      });
      const data = await response.json();

      if (data.status) {
        setTrackingData(data.data);
        setError(null);
      } else {
        setError('Order not found. Please check your tracking ID.');
        setTrackingData(null);
      }
    } catch (err) {
      setError('Failed to fetch tracking information. Please try again later.');
      setTrackingData(null);
    } finally {
      setIsLoading(false);
      setIsModalOpen(true);
    }
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
      case 0: return 'Pending';
      case 1: return 'Confirmed';
      case 2: return 'Processing';
      case 3: return 'Shipped';
      case 4: return 'Delivered';
      case 5: return 'Canceled';
      case 6: return 'Returned';
      default: return 'Unknown';
    }
  };

  return (
    <>
      {/* Tracking Section */}
      <div className="tracking-section">
        <div className="container">
          <div className="tracking-card">
            <div>
              <h2 className="tracking-title">Track your Order</h2>
              <p>Enter your order ID below to get real-time updates on your package.</p>
            </div>
            <input
              type="text"
              placeholder="Enter Order ID"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className={`tracking-input ${trackingId ? 'input-focus' : ''}`}
            />
            <button
              onClick={handleTrack}
              className="track-button"
              disabled={isLoading}
            >
              {isLoading ? 'Tracking...' : 'Track Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isMounted && (
        <div 
          className={`modal-overlay ${isModalOpen ? 'open' : 'closing'}`}
          onClick={closeModal}
          onAnimationEnd={handleAnimationEnd}
        >
          <div 
            className={`modal-content ${isModalOpen ? 'open' : 'closing'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span 
              className="modal-close"
              onClick={closeModal}
            >
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
                        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.7 1.3 3 3 3s3-1.3 3-3h6c0 1.7 1.3 3 3 3s3-1.3 3-3h2v-5l-3-4zM6 18.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm9-3.5H8.2c-.5-.6-1.2-1-2-1H3V6h12v9zm3 3.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zM17 12V9.5h2.5l2 2.5H17z"/>
                    </svg>
                    <span>ORDER #{trackingData.order_id}</span>
                    </div>

                    <div className="order-meta-grid">
                    <div className="meta-item">
                        <span className="meta-label">Order Date</span>
                        <span className="meta-value highlight">
                        {new Date(trackingData.order_date).toLocaleDateString('en-US', {
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric'
                        })}
                        </span>
                    </div>

                    <div className="meta-item">
                        <span className="meta-label">Order Time</span>
                        <span className="meta-value">
                        {new Date(trackingData.order_date).toLocaleTimeString('en-US', {
                            hour: '2-digit', 
                            minute: '2-digit'
                        })}
                        </span>
                    </div>
                    </div>
                </div>

                {/* Delivery Address Card */}
                <div className="address-card">
                    <div className="card-header">
                    <svg className="location-icon" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <h4>Delivery Address</h4>
                    </div>
                    <div className="address-content">
                    {trackingData.delivery_address.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}
                    </div>
                </div>
                {/* </div> */}
                
                <h4 className='orderStatusHeading'>Order Status by Seller:</h4>
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