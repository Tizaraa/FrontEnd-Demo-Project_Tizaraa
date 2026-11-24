"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "./about.css";

export default function AboutUsPage() {
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
      .querySelectorAll(
        ".about-story-card, .trust-badge-card, .feature-card, .commitment-card, .delivery-quick-card, .about-contact-banner"
      )
      .forEach((el) => reveal.observe(el));

    return () => {
      reveal.disconnect();
    };
  }, [lang]);

  return (
    <div className="about-page-wrapper" ref={wrapperRef}>
      {/* Hero Banner */}
      <header className="about-hero">
        <div className="about-hero-content">

          <h1 className="about-title">
            {lang === "en" ? (
              <>
                About <span className="title-accent">Tizaraa</span>
              </>
            ) : (
              <>
                টিজারা <span className="title-accent">সম্পর্কে জানুন</span>
              </>
            )}
          </h1>

          <p className="about-subtitle">
            {lang === "en"
              ? "Connecting millions of shoppers with verified merchants and genuine products through technology, trust, and exceptional service."
              : "প্রযুক্তি, বিশ্বাস এবং সেরা সেবার সমন্বয়ে কোটি ক্রেতাকে বিশ্বস্ত বিক্রেতা ও আসল পণ্যের সাথে সংযুক্ত করছি।"}
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
        {/* Story Section Card */}
        <section className="about-story-card">
          <div className="story-icon-box">📖</div>
          <div className="story-text-box">
            <h2>{lang === "en" ? "Our Story" : "আমাদের গল্প"}</h2>
            <p>
              {lang === "en"
                ? "Welcome to Tizaraa, your premier destination for a seamless and diverse online shopping experience. Founded in 2024, Tizaraa was born out of a passion for connecting buyers with high-quality, authentic products from trusted, vetted sellers across Bangladesh and beyond."
                : "তিজারা একটি আধুনিক অনলাইন মার্কেটপ্লেস, যেখানে ক্রেতা ও বিক্রেতারা নির্বিঘ্নে ও নিরাপদে লেনদেনের অভিজ্ঞতা উপভোগ করতে পারেন। বিশ্বস্ত বিক্রেতাদের মানসম্মত ও আসল পণ্য সরাসরি গ্রাহকের দোরগোড়ায় পৌঁছে দেয়ার প্রত্যয় নিয়ে আমাদের পথচলা।"}
            </p>
          </div>
        </section>

        {/* Mission & Vision Card */}
        <section className="about-story-card">
          <div className="story-icon-box">🎯</div>
          <div className="story-text-box">
            <h2>{lang === "en" ? "Mission & Vision" : "মিশন ও ভিশন"}</h2>
            <p>
              {lang === "en"
                ? "Our mission is to build a reliable, accessible, and user-friendly digital ecosystem that empowers both everyday consumers and forward-thinking merchants. We strive to create a vibrant marketplace where anyone can discover unique products, experience hassle-free delivery, and enjoy 100% genuine customer protection."
                : "আমাদের লক্ষ্য হলো একটি নির্ভরযোগ্য, প্রযুক্তিনির্ভর ও সহজ অনলাইন শপিং প্ল্যাটফর্ম গড়ে তোলা, যা ক্রেতা ও বিক্রেতা উভয়কেই ক্ষমতায়ন করে। গ্রাহকের সন্তুষ্টি ও আস্থা বজায় রেখে দেশের ই-কমার্স সেক্টরে ইতিবাচক পরিবর্তন আনাই আমাদের প্রধান ভিশন।"}
            </p>
          </div>
        </section>

        {/* Verified Licensing & Trust Cards */}
        <div className="about-trust-grid">
          <div className="trust-badge-card">
            <div className="trust-icon-pill">📜</div>
            <div className="trust-content">
              <h3>{lang === "en" ? "Government Trade License" : "সরকারি ট্রেড লাইসেন্স"}</h3>
              <span className="trust-license-num">TRAD/DNCC/010245/2024</span>
              <p>
                {lang === "en"
                  ? "Fully registered business compliant with all municipal e-commerce regulations."
                  : "ঢাকা উত্তর সিটি কর্পোরেশনের আওতাভুক্ত পূর্ণাঙ্গ ও বৈধ ট্রেড লাইসেন্সপ্রাপ্ত প্রতিষ্ঠান।"}
              </p>
            </div>
          </div>

          <div className="trust-badge-card">
            <div className="trust-icon-pill">🛡️</div>
            <div className="trust-content">
              <h3>{lang === "en" ? "Digital Commerce ID (DBID)" : "ডিজিটাল কমার্স আইডি (DBID)"}</h3>
              <span className="trust-license-num">144381902</span>
              <p>
                {lang === "en"
                  ? "Ministry of Commerce certified digital business identification for consumer trust."
                  : "গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের বাণিজ্য মন্ত্রণালয় কর্তৃক অনুমোদিত ডিজিটাল কমার্স আইডি।"}
              </p>
            </div>
          </div>
        </div>

        {/* What Sets Us Apart */}
        <div className="section-headline">
          <h2>{lang === "en" ? "What Sets Tizaraa Apart" : "কেন তিজারা সবার চেয়ে আলাদা"}</h2>
          <p>
            {lang === "en"
              ? "Discover the core principles that make us the preferred marketplace for smart shoppers"
              : "গ্রাহকের সন্তুষ্টি ও সেরা অনলাইন শপিং নিশ্চিত করতে আমাদের বিশেষ সুবিধাসমূহ"}
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon-wrap">✨</div>
            <h3>{lang === "en" ? "Curated Quality Selection" : "বাছাইকৃত মানসম্মত পণ্য"}</h3>
            <p>
              {lang === "en"
                ? "Every item on our platform undergoes strict vetting to ensure only 100% genuine and high-grade goods reach you."
                : "আমাদের প্রতিটি পণ্য কঠোর মান নিয়ন্ত্রণ ও যাচাইয়ের মধ্য দিয়ে যায়, যাতে আপনি সবসময় আসল পণ্য পান।"}
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrap">🤝</div>
            <h3>{lang === "en" ? "Customer-Centric Care" : "গ্রাহক-বান্ধব সেবা"}</h3>
            <p>
              {lang === "en"
                ? "Dedicated 6-days-a-week hotline and instant live support to answer queries and resolve order requests promptly."
                : "সপ্তাহে ৬ দিন নিবেদিত কল সেন্টার ও চ্যাট সাপোর্ট, যা আপনার যেকোনো জিজ্ঞাসা ও সমস্যায় পাশে থাকে।"}
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrap">🔒</div>
            <h3>{lang === "en" ? "Bank-Grade Secure Shopping" : "নিরাপদ পেমেন্ট গেটওয়ে"}</h3>
            <p>
              {lang === "en"
                ? "End-to-end encryption with Cash on Delivery, bKash, Nagad, and secure credit card checkouts."
                : "সর্বোচ্চ স্তরের এনক্রিপশন ও ক্যাশ অন ডেলিভারি, বিকাশ ও কার্ডের মাধ্যমে শতভাগ নিরাপদ লেনদেন।"}
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrap">⚡</div>
            <h3>{lang === "en" ? "Modern Technology & Speed" : "আধুনিক প্রযুক্তি ও গতি"}</h3>
            <p>
              {lang === "en"
                ? "Ultra-fast Next.js architecture, real-time live order tracking, and intuitive mobile shopping experience."
                : "আল্ট্রা-ফাস্ট প্ল্যাটফর্ম এবং প্রতিটি পার্সেল ট্র্যাকিংয়ের জন্য রিয়েল-টাইম অর্ডার ট্র্যাকিং প্রযুক্তি।"}
            </p>
          </div>
        </div>

        {/* Commitment Section */}
        <div className="section-headline">
          <h2>{lang === "en" ? "Our Core Commitments" : "আমাদের প্রতিশ্রুতি"}</h2>
          <p>
            {lang === "en"
              ? "Uncompromising dedication to product authenticity and community growth"
              : "মানের ক্ষেত্রে কোনো আপোষ নয় এবং একটি বিশ্বস্ত ই-কমার্স পরিবেশ গড়ে তোলা"}
          </p>
        </div>

        <div className="commitment-grid">
          <div className="commitment-card">
            <h3>🛡️ {lang === "en" ? "Quality Assurance Guarantee" : "গুণগত মানে আপোষহীন নিশ্চয়তা"}</h3>
            <p>
              {lang === "en"
                ? "Tizaraa is deeply committed to ensuring product authenticity. We partner directly with verified merchants, brand authorized distributors, and local manufacturers with easy return and warranty policies."
                : "আমরা সরাসরি ভেরিফাইড মার্চেন্ট, অথরাইজড ডিস্ট্রিবিউটর ও প্রস্তুতকারকদের সাথে কাজ করি। কোনো পণ্যে ত্রুটি থাকলে ঝামেলাহীন রিপ্লেসমেন্ট ও রিটার্ন সুবিধা নিশ্চিত করা হয়।"}
            </p>
          </div>

          <div className="commitment-card">
            <h3>🌐 {lang === "en" ? "Vibrant Connected Community" : "একটি সংযুক্ত ডিজিটাল কমিউনিটি"}</h3>
            <p>
              {lang === "en"
                ? "Beyond ordinary transactions, Tizaraa empowers local micro-entrepreneurs and connects shoppers with genuine value, creating a transparent and sustainable e-commerce network."
                : "তিজারা কেবল একটি শপিং সাইট নয়—এটি হাজারো দেশীয় উদ্যোক্তা ও স্মার্ট ক্রেতার একটি মেলবন্ধন, যা বাংলাদেশের ডিজিটাল অর্থনীতিকে এগিয়ে নিয়ে যাচ্ছে।"}
            </p>
          </div>
        </div>

        {/* Delivery Timeline Quick Strip */}
        <div className="delivery-quick-card">
          <div className="delivery-quick-left">
            <h3>🚚 {lang === "en" ? "Nationwide Delivery Timeline" : "ডেলিভারি সময়সীমা"}</h3>
            <p>
              {lang === "en"
                ? "Fast and reliable doorstep delivery to all 64 districts in Bangladesh"
                : "সমগ্র বাংলাদেশে দ্রুততম হোম ডেলিভারি নিশ্চয়তা"}
            </p>
          </div>
          <div className="delivery-badges-group">
            <div className="delivery-badge">
              <span className="badge-dot-green" />
              <span>{lang === "en" ? "Inside Dhaka: 2 - 3 Days" : "ঢাকার ভেতরে: ২ - ৩ কার্যদিবস"}</span>
            </div>
            <div className="delivery-badge">
              <span className="badge-dot-green" />
              <span>{lang === "en" ? "Outside Dhaka: 3 - 5 Days" : "ঢাকার বাইরে: ৩ - ৫ কার্যদিবস"}</span>
            </div>
          </div>
        </div>

        {/* Contact / Help Banner */}
        <section className="about-contact-banner">
          <div>
            <h3>{lang === "en" ? "Have Questions or Need Assistance?" : "কোনো প্রশ্ন বা সহায়তা প্রয়োজন?"}</h3>
            <p>
              {lang === "en"
                ? "Our support team is always available to help you make informed shopping decisions."
                : "আমাদের কাস্টমার কেয়ার টিম শনি থেকে বৃহস্পতি (সকাল ৯টা - সন্ধ্যা ৬টা) আপনার সহযোগিতায় প্রস্তুত।"}
            </p>
          </div>
          <div className="banner-actions">
            <a href="tel:+8801792223444" className="banner-call-btn">
              <span>📞 01792223444</span>
            </a>
            <Link href="/helpCenter" className="banner-secondary-btn">
              {lang === "en" ? "Help Center" : "হেল্প সেন্টার"}
            </Link>
            <Link href="/contact" className="banner-secondary-btn">
              {lang === "en" ? "Contact Us" : "যোগাযোগ করুন"}
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
