"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "./TizaraaJourney.css";

interface JourneyStep {
  phase: string;
  icon: string;
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
}

const journeySteps: JourneyStep[] = [
  {
    phase: "Phase 01",
    icon: "🎯",
    titleEn: "Define Your Niche & Target Audience",
    titleBn: "পণ্য ক্যাটাগরি ও লক্ষ্যযুক্ত ক্রেতা নির্ধারণ",
    descEn:
      "Clearly identify the products or services you want to sell and define your target audience. Understanding your niche shapes your branding, pricing, and product offerings.",
    descBn:
      "আপনি কী পণ্য বিক্রি করতে চান এবং কাদের কাছে পৌঁছাতে চান তা স্পষ্ট করুন। সঠিক নিশ নির্ধারণ আপনার ব্র্যান্ডিং ও মূল্য নির্ধারণকে ফলপ্রসূ করবে।",
  },
  {
    phase: "Phase 02",
    icon: "📊",
    titleEn: "Conduct In-Depth Market Research",
    titleBn: "বাজার গবেষণা ও প্রতিযোগী বিশ্লেষণ",
    descEn:
      "Research competitors, trending categories, and customer preferences. Identify gaps in the market to formulate your Unique Selling Proposition (USP).",
    descBn:
      "মার্কেটের চাহিদা, বর্তমান ট্রেন্ড এবং প্রতিদ্বন্দীদের অফার পর্যবেক্ষণ করুন। গ্রাহকের প্রয়োজনীয়তা অনুযায়ী আকর্ষণীয় অফার তৈরি করুন।",
  },
  {
    phase: "Phase 03",
    icon: "🚀",
    titleEn: "Partner with Tizaraa E-Commerce",
    titleBn: "টিজারা ই-কমার্স প্ল্যাটফর্মে যুক্ত হোন",
    descEn:
      "Join Tizaraa as a verified merchant. Benefit from ready-made customer traffic, integrated payment solutions, seller dashboard, and robust seller tools.",
    descBn:
      "টিজারার ভেরিফাইড মার্চেন্ট হিসেবে যুক্ত হয়ে তৈরি কাস্টমার বেস, সহজ ড্যাশবোর্ড এবং শক্তিশালী টুলসের সুবিধা উপভোগ করুন।",
  },
  {
    phase: "Phase 04",
    icon: "🏪",
    titleEn: "Set Up Your Digital Storefront",
    titleBn: "অনলাইন স্টোর ও ক্যাটালগ সাজান",
    descEn:
      "Customize your shop profile, upload high-definition product imagery, detailed specifications, and set competitive prices to attract shoppers.",
    descBn:
      "আপনার স্টোরের নাম ও ব্র্যান্ড প্রোফাইল তৈরি করুন। স্পষ্ট ছবি, বিস্তারিত স্পেসিফিকেশন ও আকর্ষণীয় মূল্যে পণ্য আপলোড করুন।",
  },
  {
    phase: "Phase 05",
    icon: "💳",
    titleEn: "Secure Payment & Direct Settlement",
    titleBn: "নিরাপদ পেমেন্ট ও সরাসরি সেটেলমেন্ট",
    descEn:
      "Accept payments through Cash on Delivery, Mobile Financial Services (bKash, Nagad), and debit/credit cards with automated wallet settlements.",
    descBn:
      "ক্যাশ অন ডেলিভারি, বিকাশ, নগদ এবং কার্ডের মাধ্যমে গ্রাহকের কাছ থেকে নিরাপদে টাকা গ্রহণ করুন এবং সরাসরি ব্যাংক উইথড্র উপভোগ করুন।",
  },
  {
    phase: "Phase 06",
    icon: "🚚",
    titleEn: "Fast Nationwide Shipping & Fulfillment",
    titleBn: "দেশজুড়ে দ্রুত ডেলিভারি ও প্যাকেজিং",
    descEn:
      "Leverage Tizaraa's integrated logistics network across all 64 districts in Bangladesh to guarantee safe, timely doorstep deliveries.",
    descBn:
      "টিজারার দেশব্যাপী লজিস্টিক নেটওয়ার্কের সাহায্যে দেশের ৬৪ জেলার যেকোনো প্রান্তে গ্রাহকের ঠিকানায় নিরাপদে পার্সেল পৌঁছে দিন।",
  },
  {
    phase: "Phase 07",
    icon: "🛡️",
    titleEn: "Robust Security & Fraud Prevention",
    titleBn: "সর্বোচ্চ সাইবার নিরাপত্তা ও সুরক্ষা",
    descEn:
      "Enjoy top-tier SSL encryption, secure transaction audits, and anti-fraud mechanisms to keep your shop and customer transactions safe.",
    descBn:
      "সর্বোচ্চ এনক্রিপশন ও সিকিউরিটি প্রোটোকলের সাহায্যে আপনার স্টোর, ডেটা এবং প্রতিটি আর্থিক লেনদেনের পূর্ণ নিরাপত্তা নিশ্চিত থাকে।",
  },
  {
    phase: "Phase 08",
    icon: "📣",
    titleEn: "Digital Marketing & Brand Awareness",
    titleBn: "ডিজিটাল মার্কেটিং ও ব্র্যান্ড প্রচারণা",
    descEn:
      "Participate in Tizaraa mega campaigns, seasonal flash sales, and targeted social promotions to rapidly grow your daily sales volume.",
    descBn:
      "টিজারার মেগা ক্যাম্পেইন, ফ্ল্যাশ সেল ও সোশ্যাল মিডিয়া প্রমোশনের সুযোগ কাজে লাগিয়ে আপনার দৈনিক বিক্রির পরিমাণ বহুগুণ বাড়িয়ে নিন।",
  },
  {
    phase: "Phase 09",
    icon: "📈",
    titleEn: "Data Analytics & Performance Tracking",
    titleBn: "অ্যানালিটিক্স পর্যবেক্ষণ ও বিজনেস গ্রোথ",
    descEn:
      "Track order trends, revenue graphs, bestsellers, and customer metrics directly on your seller panel to make smart, data-driven decisions.",
    descBn:
      "সেলার ড্যাশবোর্ড থেকে অর্ডার হিস্ট্রি, টপ সেলিং প্রোডাক্ট এবং রেভিনিউ রিপোর্ট দেখে ব্যবসার সঠিক কৌশল নির্ধারণ করুন।",
  },
  {
    phase: "Phase 10",
    icon: "🤝",
    titleEn: "Deliver 5-Star Customer Satisfaction",
    titleBn: "উন্নত কাস্টমার সার্ভিস ও ক্রেতার আস্থা",
    descEn:
      "Provide prompt responses, authentic products, and hassle-free returns to earn top seller badges and build lifelong customer loyalty.",
    descBn:
      "সঠিক সময়ে প্রশ্নের উত্তর দিন, আসল পণ্য সরবরাহ করুন এবং চমৎকার সার্ভিসের মাধ্যমে সেরা সেলার রেটিং অর্জন করুন।",
  },
  {
    phase: "Phase 11",
    icon: "💡",
    titleEn: "Stay Informed & Scale Your Business",
    titleBn: "নতুন প্রযুক্তির ব্যবহার ও ব্যবসার প্রসার",
    descEn:
      "Stay ahead of market demands, expand your product lineup, and scale your business into a leading e-commerce brand with Tizaraa.",
    descBn:
      "বাজারে নতুন পণ্যের চাহিদা অনুযায়ী ক্যাটালগ বড় করুন এবং টিজারার সার্বক্ষণিক সহযোগিতায় ব্যবসাকে একটি শীর্ষ ব্র্যান্ডে পরিণত করুন।",
  },
];

export default function TizaraaJourneyPage() {
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
      .querySelectorAll(".journey-overview-card, .journey-card, .journey-cta-banner")
      .forEach((el) => reveal.observe(el));

    return () => {
      reveal.disconnect();
    };
  }, [lang]);

  return (
    <div className="journey-page-wrapper" ref={wrapperRef}>
      {/* Hero Banner */}
      <header className="journey-hero">
        <div className="hero-content">

          <h1 className="hero-title">
            {lang === "en" ? (
              <>
                The Tizaraa <span className="title-accent">Journey</span>
              </>
            ) : (
              <>
                টিজারা <span className="title-accent">মার্চেন্ট জার্নি</span>
              </>
            )}
          </h1>

          <p className="hero-subtitle">
            {lang === "en"
              ? "Your comprehensive blueprint to start, scale, and succeed as an e-commerce entrepreneur with Bangladesh's premier marketplace."
              : "বাংলাদেশের সেরা অনলাইন মার্কেটপ্লেসে সফল উদ্যোক্তা হতে এবং আপনার ব্যবসাকে নতুন উচ্চতায় নিয়ে যেতে ধাপে ধাপে পূর্ণাঙ্গ গাইডলাইন।"}
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
        {/* Overview Highlight Card */}
        <section className="journey-overview-card">
          <div className="overview-icon-box">🏆</div>
          <div className="overview-text-content">
            <h2>
              {lang === "en"
                ? "Steps to Start Selling Successfully on Tizaraa"
                : "টিজারায় সফলভাবে ব্যবসা শুরু করার মূল পদক্ষেপসমূহ"}
            </h2>
            <p>
              {lang === "en"
                ? "Starting an e-commerce venture is an exciting endeavor. Whether you are an established brand or an ambitious local maker, our platform empowers you with nationwide reach, high-converting tools, and zero friction fulfillment."
                : "ই-কমার্স ব্যবসা শুরু করা একটি অত্যন্ত সম্ভাবনাময় সুযোগ। আপনি প্রতিষ্ঠিত ব্র্যান্ড হোন বা নতুন কোনো উদ্যোক্তা—টিজারা আপনাকে দিচ্ছে দেশজুড়ে কোটি ক্রেতার কাছে পৌঁছানোর সুবিধা, আধুনিক বিজনেস টুলস এবং সার্বক্ষণিক লজিস্টিক সাপোর্ট।"}
            </p>
          </div>
        </section>

        {/* Roadmap Grid */}
        <div className="journey-grid">
          {journeySteps.map((step) => (
            <article key={step.phase} className="journey-card">
              <div className="journey-card-header">
                <span className="journey-phase-pill">{step.phase}</span>
                <div className="journey-icon-circle">{step.icon}</div>
              </div>
              <h3 className="journey-card-title">{lang === "en" ? step.titleEn : step.titleBn}</h3>
              <p className="journey-card-desc">{lang === "en" ? step.descEn : step.descBn}</p>
            </article>
          ))}
        </div>

        {/* Call to Action Banner */}
        <section className="journey-cta-banner">
          <div className="cta-banner-content">
            <h3>{lang === "en" ? "Ready to start your selling journey?" : "আপনি কি বিক্রি শুরু করতে প্রস্তুত?"}</h3>
            <p>
              {lang === "en"
                ? "Register as a verified seller today and start reaching thousands of active shoppers across Bangladesh."
                : "আজই টিজারা মার্চেন্ট হিসেবে নিবন্ধন করুন এবং দেশব্যাপী হাজারো কাস্টমারের কাছে আপনার পণ্য বিক্রি শুরু করুন।"}
            </p>
          </div>
          <div className="cta-banner-actions">
            <a
              href="https://seller.tizaraa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-register-btn"
            >
              <span>🚀 {lang === "en" ? "Register as Seller" : "সেলার রেজিস্ট্রেশন"}</span>
            </a>
            <Link href="/helpCenter" className="cta-secondary-btn">
              {lang === "en" ? "Merchant Support" : "মার্চেন্ট হেল্পলাইন"}
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
