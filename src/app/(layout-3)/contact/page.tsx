"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
  faPaperPlane,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "./ContactPage.css";

export default function ContactUsPage() {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = wrapperRef.current;
    if (!root) return;

    root.classList.add("reveal-ready");
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            reveal.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    root
      .querySelectorAll(".contact-form-card, .info-box-card, .quick-help-card")
      .forEach((el) => reveal.observe(el));

    return () => {
      reveal.disconnect();
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      alert("Thank you! Your message has been received. Our team will contact you shortly.");
      setFormState({ name: "", phone: "", email: "", message: "" });
      setSubmitted(false);
    }, 500);
  };

  return (
    <div className="contact-page-wrapper" ref={wrapperRef}>
      {/* Hero Header */}
      <header className="contact-hero">
        <div className="contact-hero-content">

          <h1 className="contact-title">
            We'd Love to <span className="title-accent">Hear From You</span>
          </h1>

          <p className="contact-subtitle">
            Have questions about an order, seller registration, or corporate inquiry?
            Send us a message and our support team will respond promptly.
          </p>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="container main-content-container">
        <div className="contact-grid">
          {/* Contact Form Card */}
          <div className="contact-form-card">
            <div className="form-header">
              <h2>Send Us a Message</h2>
              <p>Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">
                  Full Name <span className="required-star">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-input"
                  placeholder="Enter your full name"
                  value={formState.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  Phone Number <span className="required-star">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="form-input"
                  placeholder="e.g. 01700000000"
                  value={formState.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email Address <span className="required-star">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-input"
                  placeholder="name@example.com"
                  value={formState.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  Your Message <span className="required-star">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  placeholder="Describe your inquiry, order details, or feedback..."
                  value={formState.message}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className="submit-btn" disabled={submitted}>
                <span>{submitted ? "Sending..." : "Send Message"}</span>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          </div>

          {/* Contact Details & Info Sidebar */}
          <div className="contact-sidebar">
            {/* Contact Channels Card */}
            <div className="info-box-card">
              <h3 className="info-box-title">Contact Channels</h3>
              <div className="contact-channels">
                <div className="channel-item">
                  <div className="channel-icon-circle">
                    <FontAwesomeIcon icon={faPhone} style={{ width: "18px" }} />
                  </div>
                  <div className="channel-text">
                    <h4>Direct Helpline</h4>
                    <a href="tel:+8801792223444">+8801792223444</a>
                    <div>
                      <span className="hours-badge">Sat - Thu: 9 AM - 6 PM</span>
                    </div>
                  </div>
                </div>

                <div className="channel-item">
                  <div className="channel-icon-circle">
                    <FontAwesomeIcon icon={faEnvelope} style={{ width: "18px" }} />
                  </div>
                  <div className="channel-text">
                    <h4>Email Support</h4>
                    <a href="mailto:info@tizaraa.com">info@tizaraa.com</a>
                  </div>
                </div>

                <div className="channel-item">
                  <div className="channel-icon-circle">
                    <FontAwesomeIcon icon={faLocationDot} style={{ width: "18px" }} />
                  </div>
                  <div className="channel-text">
                    <h4>Corporate Office</h4>
                    <p>Ga. 131/1, Middle Badda, Dhaka - 1212, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Connect Card */}
            <div className="info-box-card">
              <h3 className="info-box-title">Connect With Us</h3>
              <div className="social-links-row">
                <a
                  href="https://www.facebook.com/TizaraaGroup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-circle-link fb"
                  aria-label="Facebook"
                >
                  <FontAwesomeIcon icon={faFacebookF} style={{ width: "16px" }} />
                </a>

                <a
                  href="https://www.instagram.com/tizaraagroup/?igsh=MXB1b2l1NXN6N2U5dQ%3D%3D#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-circle-link ig"
                  aria-label="Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} style={{ width: "18px" }} />
                </a>

                <a
                  href="https://www.youtube.com/@Tizaraa24"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-circle-link yt"
                  aria-label="YouTube"
                >
                  <FontAwesomeIcon icon={faYoutube} style={{ width: "18px" }} />
                </a>
              </div>
            </div>

            {/* Quick Order Tracking / Help Portal Card */}
            <div className="quick-help-card">
              <h3>Looking for Instant Answers?</h3>
              <p>
                Track your package in real-time or browse our FAQs to resolve common inquiries without waiting.
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <Link href="/orderTracking" className="quick-help-btn">
                  <span>📦 Track Package</span>
                </Link>
                <Link href="/helpCenter" className="quick-help-btn" style={{ background: "rgba(255,255,255,0.15)" }}>
                  <FontAwesomeIcon icon={faHeadset} style={{ width: "14px" }} />
                  <span>Help Center</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
