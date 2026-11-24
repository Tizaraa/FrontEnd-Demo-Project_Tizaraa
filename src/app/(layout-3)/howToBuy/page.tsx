"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "./HowToBuy.css";

interface StepItem {
  number: string;
  icon: string;
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
}

const stepsData: StepItem[] = [
  {
    number: "Step 01",
    icon: "👤",
    titleEn: "Sign In or Create an Account",
    titleBn: "সাইন ইন অথবা নতুন অ্যাকাউন্ট তৈরি করুন",
    descEn:
      "If you don't already have an account on Tizaraa, sign up in seconds. If you're already registered, simply log in to your account.",
    descBn:
      "যদি আপনার টিজারা অ্যাকাউন্ট না থাকে, তবে মাত্র কয়েক সেকেন্ডে সাইন আপ করে নিন। আর অ্যাকাউন্ট থাকলে সহজে লগ ইন করুন।",
  },
  {
    number: "Step 02",
    icon: "🔍",
    titleEn: "Search & Browse Products",
    titleBn: "পণ্য খুঁজুন এবং ব্রাউজ করুন",
    descEn:
      "Use our smart search bar, explore featured categories, or filter by price and brand to discover authentic products.",
    descBn:
      "স্মার্ট সার্চ বার ব্যবহার করুন, বিভিন্ন ক্যাটাগরি ঘুরে দেখুন অথবা ব্র্যান্ড ও দাম অনুযায়ী পছন্দের আসল পণ্য খুঁজে নিন।",
  },
  {
    number: "Step 03",
    icon: "📋",
    titleEn: "Inspect Product Details & Specs",
    titleBn: "পণ্যের বিস্তারিত তথ্য ও বিবরণ যাচাই করুন",
    descEn:
      "Review customer reviews, warranty policies, specifications, and seller ratings before deciding on your purchase.",
    descBn:
      "ক্রয় করার আগে পণ্যের বিবরণ, স্পেসিফিকেশন, ওয়ারেন্টি শর্তাবলী ও সেলারের রেটিং ভালো করে দেখে নিন।",
  },
  {
    number: "Step 04",
    icon: "🛒",
    titleEn: "Add to Cart or Buy Now",
    titleBn: "কার্টে যুক্ত করুন বা সরাসরি কিনুন",
    descEn:
      "Select your preferred variant, color, or size, then click 'Add to Cart' or proceed directly with 'Buy Now'.",
    descBn:
      "আপনার পছন্দের সাইজ, রঙ বা ভ্যারিয়েন্ট সিলেক্ট করে 'Add to Cart' চাপুন অথবা সরাসরি কিনতে 'Buy Now' ক্লিক করুন।",
  },
  {
    number: "Step 05",
    icon: "🛍️",
    titleEn: "Review Your Shopping Cart",
    titleBn: "শপিং কার্ট পর্যবেক্ষণ করুন",
    descEn:
      "Open your cart to adjust quantities, apply discount coupon codes, and review your estimated pricing.",
    descBn:
      "কার্ট ওপেন করে পণ্যের পরিমাণ প্রয়োজনমতো পরিবর্তন করুন, ডিসকাউন্ট ভাউচার কোড অ্যাপ্লাই করুন ও মোট মূল্য যাচাই করুন।",
  },
  {
    number: "Step 06",
    icon: "📍",
    titleEn: "Provide Delivery Address",
    titleBn: "ডেলিভারি ঠিকানা প্রদান করুন",
    descEn:
      "Enter your accurate shipping address and active phone number for seamless, timely doorstep delivery across Bangladesh.",
    descBn:
      "সঠিক হোম ডেলিভারির জন্য আপনার সম্পূর্ণ ডেলিভারি ঠিকানা এবং সচল মোবাইল নম্বর প্রদান করুন।",
  },
  {
    number: "Step 07",
    icon: "💳",
    titleEn: "Choose Secure Payment Method",
    titleBn: "নিরাপদ পেমেন্ট পদ্ধতি নির্বাচন করুন",
    descEn:
      "Pay securely using Cash on Delivery (COD), bKash, Nagad, Credit/Debit cards, or internet banking.",
    descBn:
      "ক্যাশ অন ডেলিভারি (সিওডি), বিকাশ, নগদ, ভিসা/মাস্টারকার্ড অথবা ইন্টারনেট ব্যাংকিংয়ের মাধ্যমে নিরাপদে মূল্য পরিশোধ করুন।",
  },
  {
    number: "Step 08",
    icon: "✅",
    titleEn: "Confirm & Place Order",
    titleBn: "অর্ডার নিশ্চিত করুন",
    descEn:
      "Review order summary including delivery charges, then click 'Place Order' to finalize your purchase.",
    descBn:
      "ডেলিভারি চার্জসহ চূড়ান্ত মূল্য দেখে 'Place Order' বাটনে ক্লিক করে আপনার অর্ডারটি সম্পন্ন করুন।",
  },
  {
    number: "Step 09",
    icon: "📦",
    titleEn: "Live Real-Time Order Tracking",
    titleBn: "অর্ডারের রিয়েল-টাইম ট্র্যাকিং",
    descEn:
      "Receive instant SMS and email confirmation with your unique Order ID. Track shipment progress real-time at /orderTracking.",
    descBn:
      "তাৎক্ষণিক SMS ও ইমেইলে ট্র্যাকিং আইডি পেয়ে যাবেন। আমাদের /orderTracking পেজে যেকোনো সময় পার্সেলের লাইভ আপডেট জানুন।",
  },
];

export default function HowToBuyPage() {
  const [lang, setLang] = useState<"en" | "bn">("en");
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
      .querySelectorAll(".video-showcase-card, .step-card, .howtobuy-contact-banner")
      .forEach((el) => reveal.observe(el));

    return () => {
      reveal.disconnect();
    };
  }, [lang]);

  return (
    <div className="howtobuy-page-wrapper" ref={wrapperRef}>
      {/* Hero Banner */}
      <header className="howtobuy-hero">
        <div className="hero-content">

          <h1 className="hero-title">
            {lang === "en" ? (
              <>
                How to Buy on <span className="title-accent">Tizaraa</span>
              </>
            ) : (
              <>
                টিজারা থেকে <span className="title-accent">পণ্য কেনার নিয়ম</span>
              </>
            )}
          </h1>

          <p className="hero-subtitle">
            {lang === "en"
              ? "Follow our simple step-by-step shopping guide for a smooth, fast, and 100% secure online shopping experience."
              : "খুব সহজে, দ্রুত এবং শতভাগ নিরাপদে টিজারা থেকে পছন্দের পণ্য অর্ডার করার বিস্তারিত গাইডলাইন।"}
          </p>

          {/* Language Switcher Tabs */}
          <div className="lang-switcher">
            <button
              type="button"
              className={`lang-btn ${lang === "en" ? "active" : ""}`}
              onClick={() => setLang("en")}
            >
              🇬🇧 English
            </button>
            <button
              type="button"
              className={`lang-btn ${lang === "bn" ? "active" : ""}`}
              onClick={() => setLang("bn")}
            >
              🇧🇩 বাংলা
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container main-content-container">
        {/* Video Tutorial Card */}
        <section className="video-showcase-card">
          <div className="video-header">
            <div className="video-header-left">
              <div className="video-icon-badge">▶</div>
              <div>
                <h3 className="video-title">
                  {lang === "en" ? "Video Tutorial & Buying Process" : "ভিডিও টিউটোরিয়াল ও কেনাকাটার নিয়ম"}
                </h3>
                <p className="video-subtitle">
                  {lang === "en"
                    ? "Watch our quick visual walkthrough to master ordering on Tizaraa"
                    : "ভিডিও দেখে সহজে বুঝে নিন কীভাবে অর্ডার সম্পন্ন করবেন"}
                </p>
              </div>
            </div>
            <div className="video-tag">
              <span>HD Video Guide</span>
            </div>
          </div>

          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/BwK5RRfs-mg?si=6aOtgmJKc-tVETEK"
              title="How to Buy on Tizaraa Video Guide"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>

        {/* Section Headline */}
        <div className="section-headline">
          <h2>{lang === "en" ? "Step-by-Step Purchasing Guide" : "ধাপে ধাপে পণ্য কেনার নির্দেশিকা"}</h2>
          <p>
            {lang === "en"
              ? "Everything you need to know from product search to doorstep delivery"
              : "পণ্য খোঁজা থেকে শুরু করে হোম ডেলিভারি পর্যন্ত সম্পূর্ণ নিয়মাবলি"}
          </p>
        </div>

        {/* 9-Step Interactive Grid */}
        <div className="steps-grid">
          {stepsData.map((step) => (
            <article key={step.number} className="step-card">
              <div className="step-card-header">
                <span className="step-number-pill">{step.number}</span>
                <div className="step-icon-bubble">{step.icon}</div>
              </div>
              <h3 className="step-title">{lang === "en" ? step.titleEn : step.titleBn}</h3>
              <p className="step-desc">{lang === "en" ? step.descEn : step.descBn}</p>
            </article>
          ))}
        </div>

        {/* Contact / Help Banner */}
        <section className="howtobuy-contact-banner">
          <div className="contact-banner-content">
            <h3>{lang === "en" ? "Need help with placing an order?" : "অর্ডার করতে কোনো সমস্যা হচ্ছে?"}</h3>
            <p>
              {lang === "en"
                ? "Our customer care team is available Sat - Thu (9 AM - 6 PM) to assist you."
                : "আমাদের সাপোর্ট টিম শনি থেকে বৃহস্পতি (সকাল ৯টা - সন্ধ্যা ৬টা) আপনাকে সাহায্য করতে প্রস্তুত।"}
            </p>
          </div>
          <div className="contact-banner-actions">
            <a href="tel:+8801792223444" className="banner-call-btn">
              <span>📞 01792223444</span>
            </a>
            <Link href="/helpCenter" className="banner-secondary-btn">
              {lang === "en" ? "Visit Help Center" : "হেল্প সেন্টার"}
            </Link>
            <Link href="/orderTracking" className="banner-secondary-btn">
              {lang === "en" ? "Track Order" : "অর্ডার ট্র্যাক"}
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
