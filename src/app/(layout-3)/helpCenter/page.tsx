"use client";

import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import "./HelpCenter.css";

// Decorative Art SVG matching Return & Refund Policy (Image 4)
const HelpCenterArt = () => (
 <svg className="help-art" viewBox="0 0 260 220" aria-hidden="true">
  <circle className="ha-glow" cx="130" cy="110" r="96" fill="rgba(240,80,35,0.16)" />
  <g className="ha-doc">
   <rect x="58" y="22" width="136" height="176" rx="14" fill="#fff" />
   <rect x="58" y="22" width="136" height="30" rx="14" fill="#0e3460" />
   <rect x="58" y="40" width="136" height="12" fill="#0e3460" />
   <text x="76" y="42" fontSize="11" fontWeight="800" fill="#fff" fontFamily="inherit" letterSpacing="0.8">HELP CENTER</text>
   {[66, 80, 94, 108, 122, 136].map((y, i) => (
    <rect key={y} className={`ha-line l${i + 1}`} x="76" y={y} width={i % 3 === 2 ? 70 : 100} height="6" rx="3" fill="#e3e6ec" />
   ))}
   <rect x="76" y="168" width="56" height="4" rx="2" fill="#cbd5e1" />
  </g>
  <g className="ha-stamp">
   <circle cx="104" cy="160" r="28" fill="rgba(255,255,255,0.95)" stroke="#0e3460" strokeWidth="3" />
   <circle cx="104" cy="160" r="23" fill="none" stroke="#0e3460" strokeWidth="1" strokeDasharray="3 3" />
   <text x="104" y="157" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#0e3460" fontFamily="inherit" letterSpacing="0.8">TIZARAA</text>
   <text x="104" y="169" textAnchor="middle" fontSize="8" fontWeight="900" fill="#0e3460" fontFamily="inherit" letterSpacing="0.8">SUPPORT ✓</text>
  </g>
  <path className="ha-spark s1" d="M40 60l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#ffc53d" />
  <path className="ha-spark s2" d="M226 52l2.4 5.6 5.6 2.4-5.6 2.4-2.4 5.6-2.4-5.6-5.6-2.4 5.6-2.4z" fill="#ffc53d" />
 </svg>
);

export default function HelpCenterPage() {
 const [lang, setLang] = useState<"english" | "bangla">("english");

 return (
  <div className="help-center-page">
   <Head>
    <title>Help Center | Tizaraa Customer Support</title>
    <meta
     name="description"
     content="Tizaraa Help Center: 24/7 Support tickets, live assistance, order inquiries, and FAQs"
    />
   </Head>

   {/* Hero Header with Navy Deep Blue & Drift Animations matching Return/Privacy Policy */}
   <header className="help-hero">
    <div className="hero-copy">
     <h1 className="help-title">
      Help <span className="title-accent">Center</span>
     </h1>
     <p className="help-subtitle">
      {lang === "english"
       ? "We're here to assist you with your orders, returns, payments, seller inquiries, and general support."
       : "আপনার অর্ডার, রিটার্ন, পেমেন্ট ও যেকোনো সেবার সহায়তায় তিজারা কাস্টমার সাপোর্ট টিম সর্বদা প্রস্তুত।"}
     </p>

     <div className="hero-chips">
      <span className="hero-chip">
       <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg>
       {lang === "english" ? "3 Support Channels" : "৩টি সাপোর্ট মাধ্যম"}
      </span>
      <span className="hero-chip">
       <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 7v5l3 2M12 21a9 9 0 100-18 9 9 0 000 18z"/></svg>
       Sat – Thu (9 AM – 6 PM)
      </span>
      <span className="hero-chip">
       <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
       01792223444
      </span>
     </div>
    </div>

    <HelpCenterArt />
   </header>

   {/* Language Switcher Button Bar matching Image 4 */}
   <div className="btn-header" data-lang={lang}>
    <span className="lang-indicator" aria-hidden="true" />
    <button
     type="button"
     className={`tab-button ${lang === "english" ? "active" : ""}`}
     onClick={() => setLang("english")}
    >
     English
    </button>
    <button
     type="button"
     className={`tab-button ${lang === "bangla" ? "active" : ""}`}
     onClick={() => setLang("bangla")}
    >
     বাংলা
    </button>
   </div>

   {/* Main Layout Content */}
   <div className="help-main-layout">
    {lang === "english" ? (
     <>
      {/* 3 Main Interactive Channels */}
      <div className="help-channels-grid">
       {/* 1. Support Ticket */}
       <div className="channel-card">
        <div className="channel-icon-badge">🎫</div>
        <h2 className="channel-title">Support Ticket</h2>
        <p className="channel-desc">
         Submit a support ticket for order disputes, invoice queries, or technical issues. Our dedicated support team responds within 2-4 business hours.
        </p>
        <Link href="/support-tickets" className="channel-action-btn">
         <span>Open Support Ticket</span>
         <span>→</span>
        </Link>
       </div>

       {/* 2. Live Chat Assistance */}
       <div className="channel-card">
        <div className="channel-icon-badge">💬</div>
        <h2 className="channel-title">Live Chat</h2>
        <p className="channel-desc">
         Connect in real-time with our support representatives during active operating hours for instant assistance on shipping or product details.
        </p>
        <button
         type="button"
         onClick={() => {
          if (typeof window !== "undefined") {
           window.alert("Our live chat agent is ready to assist you via WhatsApp/Hotline: 01792223444");
          }
         }}
         className="channel-action-btn"
         style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
        >
         <span>Start Live Chat</span>
         <span>→</span>
        </button>
       </div>

       {/* 3. Phone Support */}
       <div className="channel-card">
        <div className="channel-icon-badge">📞</div>
        <h2 className="channel-title">Phone Support</h2>
        <p className="channel-desc">
         Prefer talking directly? Call our customer service hotline directly for urgent delivery adjustments or general marketplace guidance.
        </p>
        <a href="tel:01792223444" className="channel-action-btn">
         <span>Call 01792223444</span>
         <span>→</span>
        </a>
       </div>
      </div>

      {/* 2-Col Grid: Business Hours & Community/Feedback */}
      <div className="help-two-col-grid">
       <div className="info-box-card">
        <div className="info-box-header">
         <span className="info-box-icon">⏰</span>
         <h3>Business Hours &amp; Availability</h3>
        </div>
        <p>
         Our customer experience center operates during standard business hours to ensure swift issue resolution across Bangladesh:
        </p>
        <div className="hours-badge-row">
         <div>
          <span>Saturday – Thursday:</span>
          <strong className="text-green">9:00 AM – 6:00 PM</strong>
         </div>
         <div>
          <span>Friday:</span>
          <strong className="text-red">Closed (Weekly Holiday)</strong>
         </div>
        </div>
       </div>

       <div className="info-box-card">
        <div className="info-box-header">
         <span className="info-box-icon">💡</span>
         <h3>Feedback &amp; Suggestions</h3>
        </div>
        <p>
         We continuously strive to improve your shopping experience. If you encountered any difficulties or have ideas to share, please let us know.
        </p>
        <div style={{ marginTop: "16px" }}>
         <a href="mailto:info@tizaraa.com" className="channel-action-btn">
          <span>Email info@tizaraa.com</span>
          <span>→</span>
         </a>
        </div>
       </div>
      </div>

      {/* Contact Banner Footer */}
      <div className="help-contact-banner">
       <div>
        <h3>Still Have Questions?</h3>
        <p>Browse our related help sections or get in touch with our help desk directly.</p>
       </div>
       <div className="banner-action-buttons">
        <a href="tel:01792223444" className="banner-call-btn">
         <span>📞 Call Hotline</span>
        </a>
        <Link href="/orderTracking" className="banner-secondary-btn">
         <span>Track My Order →</span>
        </Link>
        <Link href="/return-and-refund-policy" className="banner-secondary-btn">
         <span>Return Policy →</span>
        </Link>
       </div>
      </div>
     </>
    ) : (
     /* BANGLA CONTENT */
     <>
      <div className="help-channels-grid">
       <div className="channel-card">
        <div className="channel-icon-badge">🎫</div>
        <h2 className="channel-title">সাপোর্ট টিকিট</h2>
        <p className="channel-desc">
         অর্ডার সমস্যা, ইনভয়েস সংক্রান্ত প্রশ্ন বা যেকোনো অভিযোগের জন্য সরাসরি সাপোর্ট টিকিট সাবমিট করুন। আমাদের টিম দ্রুততম সময়ে সমাধান দেবে।
        </p>
        <Link href="/support-tickets" className="channel-action-btn">
         <span>টিকিট তৈরি করুন</span>
         <span>→</span>
        </Link>
       </div>

       <div className="channel-card">
        <div className="channel-icon-badge">💬</div>
        <h2 className="channel-title">লাইভ চ্যাট</h2>
        <p className="channel-desc">
         অফিস চলাকালীন সময়ে আমাদের কাস্টমার সাপোর্ট প্রতিনিধির সাথে তাৎক্ষণিক লাইভ চ্যাট করে যেকোনো পণ্যের তথ্য ও ডেলিভারি আপডেট জেনে নিন।
        </p>
        <button
         type="button"
         onClick={() => {
          if (typeof window !== "undefined") {
           window.alert("আমাদের লাইভ চ্যাট প্রতিনিধি আপনার সেবায় প্রস্তুত। হটলাইন: 01792223444");
          }
         }}
         className="channel-action-btn"
         style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
        >
         <span>লাইভ চ্যাট শুরু করুন</span>
         <span>→</span>
        </button>
       </div>

       <div className="channel-card">
        <div className="channel-icon-badge">📞</div>
        <h2 className="channel-title">ফোন সাপোর্ট</h2>
        <p className="channel-desc">
         সরাসরি কথা বলতে চান? জরুরি ডেলিভারি সংক্রান্ত পরামর্শ ও তাৎক্ষণিক সহায়তার জন্য আমাদের কাস্টমার হটলাইনে সরাসরি কল করুন।
        </p>
        <a href="tel:01792223444" className="channel-action-btn">
         <span>কল করুন: 01792223444</span>
         <span>→</span>
        </a>
       </div>
      </div>

      <div className="help-two-col-grid">
       <div className="info-box-card">
        <div className="info-box-header">
         <span className="info-box-icon">⏰</span>
         <h3>অফিস সময় ও প্রাপ্যতা</h3>
        </div>
        <p>
         সারাদেশের গ্রাহকদের দ্রুততম সেবা প্রদানের লক্ষ্যে আমাদের কাস্টমার কেয়ার সেন্টার নিয়মিত কার্যসময়ে সক্রিয় থাকে:
        </p>
        <div className="hours-badge-row">
         <div>
          <span>শনিবার – বৃহস্পতিবার:</span>
          <strong className="text-green">সকাল ৯:০০ – সন্ধ্যা ৬:০০</strong>
         </div>
         <div>
          <span>শুক্রবার:</span>
          <strong className="text-red">সাপ্তাহিক ছুটি (বন্ধ)</strong>
         </div>
        </div>
       </div>

       <div className="info-box-card">
        <div className="info-box-header">
         <span className="info-box-icon">💡</span>
         <h3>মতামত ও পরামর্শ</h3>
        </div>
        <p>
         আপনার কেনাকাটার অভিজ্ঞতা আরও উন্নত করতে আপনার মূল্যবান মতামত বা যেকোনো পরামর্শ আমাদের ইমেইলের মাধ্যমে জানাতে পারেন।
        </p>
        <div style={{ marginTop: "16px" }}>
         <a href="mailto:info@tizaraa.com" className="channel-action-btn">
          <span>ইমেইল: info@tizaraa.com</span>
          <span>→</span>
         </a>
        </div>
       </div>
      </div>

      <div className="help-contact-banner">
       <div>
        <h3>আরও তথ্যের প্রয়োজন?</h3>
        <p>আমাদের সংশ্লিষ্ট সহায়তা পাতাগুলো ব্রাউজ করুন অথবা সরাসরি হেল্পডেস্কে যোগাযোগ করুন।</p>
       </div>
       <div className="banner-action-buttons">
        <a href="tel:01792223444" className="banner-call-btn">
         <span>📞 হটলাইনে কল করুন</span>
        </a>
        <Link href="/orderTracking" className="banner-secondary-btn">
         <span>অর্ডার ট্র্যাক করুন →</span>
        </Link>
        <Link href="/return-and-refund-policy" className="banner-secondary-btn">
         <span>রিটার্ন নীতি →</span>
        </Link>
       </div>
      </div>
     </>
    )}
   </div>
  </div>
 );
}
