"use client";

import React, { useState } from "react";
import Head from "next/head";
import "../replacement/ReplacementPolicy.css";

// Decorative Art SVG matching Return & Refund Policy (Image 4)
const ReplacementArt = () => (
 <svg className="replacement-art" viewBox="0 0 260 220" aria-hidden="true">
  <circle className="ra-glow" cx="130" cy="110" r="96" fill="rgba(240,80,35,0.16)" />
  <g className="ra-doc">
   <rect x="58" y="22" width="136" height="176" rx="14" fill="#fff" />
   <rect x="58" y="22" width="136" height="30" rx="14" fill="#f05023" />
   <rect x="58" y="40" width="136" height="12" fill="#f05023" />
   <text x="74" y="42" fontSize="10.5" fontWeight="800" fill="#fff" fontFamily="inherit" letterSpacing="0.8">REPLACEMENT</text>
   {[66, 80, 94, 108, 122, 136].map((y, i) => (
    <rect key={y} className={`ra-line l${i + 1}`} x="76" y={y} width={i % 3 === 2 ? 70 : 100} height="6" rx="3" fill="#e3e6ec" />
   ))}
   <rect x="76" y="168" width="56" height="4" rx="2" fill="#cbd5e1" />
  </g>
  <g className="ra-stamp">
   <circle cx="104" cy="160" r="28" fill="rgba(255,255,255,0.95)" stroke="#c2400f" strokeWidth="3" />
   <circle cx="104" cy="160" r="23" fill="none" stroke="#c2400f" strokeWidth="1" strokeDasharray="3 3" />
   <text x="104" y="157" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#c2400f" fontFamily="inherit" letterSpacing="0.8">TIZARAA</text>
   <text x="104" y="169" textAnchor="middle" fontSize="8" fontWeight="900" fill="#c2400f" fontFamily="inherit" letterSpacing="0.8">GUARANTEE ✓</text>
  </g>
  <path className="ra-spark s1" d="M40 60l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#ffc53d" />
  <path className="ra-spark s2" d="M226 52l2.4 5.6 5.6 2.4-5.6 2.4-2.4 5.6-2.4-5.6-5.6-2.4 5.6-2.4z" fill="#ffc53d" />
 </svg>
);

export default function ReplacementPolicy() {
 const [lang, setLang] = useState<"english" | "bangla">("english");

 return (
  <div className="replacement-page">
   <Head>
    <title>Replacement Policy | Tizaraa</title>
    <meta
     name="description"
     content="Tizaraa Replacement Policy: Genuine products with one-time hassle-free replacement warranty"
    />
   </Head>

   {/* Hero matching Image 4 (Navy Deep Blue with glowing gradient and Art) */}
   <header className="replacement-hero">
    <div className="hero-copy">
     <h1 className="terms-title">
      Replacement <span className="title-accent">Policy</span>
     </h1>
     <p className="legal-subtitle">
      {lang === "english"
       ? "Everything you need to know about our 100% genuine products, one-time replacement warranty, and claims process."
       : "আসল পণ্য, এককালীন রিপ্লেসমেন্ট ওয়ারেন্টি ও ক্লেইম প্রক্রিয়ার সকল প্রয়োজনীয় তথ্যাবলি।"}
     </p>

     <div className="hero-chips">
      <span className="hero-chip">
       <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg>
       {lang === "english" ? "6 sections" : "৬টি অনুচ্ছেদ"}
      </span>
      <span className="hero-chip">
       <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 7v5l3 2M12 21a9 9 0 100-18 9 9 0 000 18z"/></svg>
       ~3 min read
      </span>
      <span className="hero-chip">
       <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 7v5l3 2M12 21a9 9 0 100-18 9 9 0 000 18z"/></svg>
       Updated {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </span>
     </div>
    </div>

    <ReplacementArt />
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
   <div className="replacement-main-layout">
    {lang === "english" ? (
     <div className="policy-cards-stack">
      {/* 1. Our Commitment */}
      <section className="policy-card">
       <div className="card-badge-num">01</div>
       <div className="card-body">
        <h2 className="section-title">Our Commitment</h2>
        <p className="card-lead">
         At <strong>Tizaraa</strong>, we’re committed to delivering 100% genuine and quality-checked products. We understand that sometimes things don’t go as expected — and we’re here to help!
        </p>
        <p className="card-subtext">
         Some of our products come with a brand warranty, while others may not. Warranty details (if applicable) will be clearly mentioned on the product page, invoice, or provided through a separate warranty card.
        </p>
       </div>
      </section>

      {/* 2. One-Time Replacement Guarantee */}
      <section className="policy-card">
       <div className="card-badge-num">02</div>
       <div className="card-body">
        <h2 className="section-title">One-Time Replacement Guarantee</h2>
        <p className="card-lead">
         If a product comes with a Replacement Warranty, it means you're eligible for a one-time product replacement in case of qualifying issues.
        </p>
        <ul className="styled-rule-list">
         <li>
          <span className="check-bullet">✓</span>
          <span><strong>One-Time Eligibility:</strong> Replacement is strictly valid once per purchased product unit.</span>
         </li>
         <li>
          <span className="check-bullet">✓</span>
          <span><strong>Service Warranty Transition:</strong> If the product shows issues again after the first replacement, it will be treated under our Service Warranty rather than being replaced again.</span>
         </li>
        </ul>
       </div>
      </section>

      {/* 3. When Can You Request a Replacement? */}
      <section className="policy-card">
       <div className="card-badge-num">03</div>
       <div className="card-body">
        <h2 className="section-title">When Can You Request a Replacement?</h2>
        <p className="card-lead">
         You may be eligible for a replacement if your product exhibits any of the following qualifying defects within the warranty window:
        </p>
        <div className="features-sub-grid">
         <div className="sub-box">
          <span className="sub-box-icon">⚙️</span>
          <strong>Manufacturing Defect</strong>
          <p>Factory faults, assembly flaws, or internal hardware failures right out of the box.</p>
         </div>
         <div className="sub-box">
          <span className="sub-box-icon">💻</span>
          <strong>OS-Level Issues</strong>
          <p>System software malfunctions or bootloops (excluding third-party app issues).</p>
         </div>
         <div className="sub-box">
          <span className="sub-box-icon">⚡</span>
          <strong>No Power On</strong>
          <p>Main unit fails to power up (excluding external remotes, cables or loose batteries).</p>
         </div>
         <div className="sub-box">
          <span className="sub-box-icon">📉</span>
          <strong>Performance Degradation</strong>
          <p>Frequent spontaneous restarts or benchmark performance below 60% of rated capacity.</p>
         </div>
        </div>
        <p className="card-note-highlight">
         ✓ If approved after technical inspection, you will receive a brand new replacement unit of the exact same model.
        </p>
       </div>
      </section>

      {/* 4. When Replacement May Be Denied */}
      <section className="policy-card caution-border">
       <div className="card-badge-num caution">04</div>
       <div className="card-body">
        <h2 className="section-title text-caution">When Replacement May Be Denied</h2>
        <p className="card-lead">
         Unfortunately, replacements cannot be accepted or authorized in the following circumstances:
        </p>
        <ul className="styled-rule-list caution-list">
         <li>
          <span className="cross-bullet">✕</span>
          <span><strong>Physical or Liquid Damage:</strong> Cracks, drops, water immersion, or liquid spillage.</span>
         </li>
         <li>
          <span className="cross-bullet">✕</span>
          <span><strong>Electrical Burn:</strong> Burnt circuit components or short circuits caused by external voltage surges.</span>
         </li>
         <li>
          <span className="cross-bullet">✕</span>
          <span><strong>Unauthorized Tampering:</strong> Modified or rooted firmware, broken warranty seals, or removed serial stickers.</span>
         </li>
         <li>
          <span className="cross-bullet">✕</span>
          <span><strong>Improper Usage:</strong> Exposure to extreme heat, moisture, or unauthorized chargers/adapters.</span>
         </li>
        </ul>
       </div>
      </section>

      {/* 5. Replacement Process & Timeline */}
      <section className="policy-card">
       <div className="card-badge-num">05</div>
       <div className="card-body">
        <h2 className="section-title">Replacement Process & Timeline</h2>
        <div className="steps-cards-row">
         <div className="proc-step">
          <div className="proc-step-num">Step 1</div>
          <strong>Inspection</strong>
          <p>Returned products undergo thorough diagnosis by our verified technical engineers.</p>
         </div>
         <div className="proc-step">
          <div className="proc-step-num">Step 2</div>
          <strong>Stock Verification</strong>
          <p>If the model is in active stock, replacement dispatch is processed promptly.</p>
         </div>
         <div className="proc-step">
          <div className="proc-step-num">Step 3</div>
          <strong>Alternative Options</strong>
          <p>If discontinued or out-of-stock, we offer service warranty or an approved equivalent model.</p>
         </div>
        </div>
       </div>
      </section>

      {/* 6. Contact & Support */}
      <section className="policy-card contact-card-theme">
       <div className="card-badge-num">06</div>
       <div className="card-body">
        <h2 className="section-title">Need More Help?</h2>
        <p className="card-lead">
         Have questions regarding your warranty, returns, or order status? Our customer support is here for you.
        </p>
        <div className="support-actions-row">
         <a href="tel:01792223444" className="hotline-btn">
          📞 01792223444
         </a>
         <a href="/return-and-refund-policy" className="secondary-link-btn">
          Return &amp; Refund Policy →
         </a>
         <a href="/orderTracking" className="secondary-link-btn">
          Track Your Package →
         </a>
        </div>
       </div>
      </section>
     </div>
    ) : (
     /* BANGLA CONTENT */
     <div className="policy-cards-stack">
      {/* 1. Our Commitment */}
      <section className="policy-card">
       <div className="card-badge-num">০১</div>
       <div className="card-body">
        <h2 className="section-title">আমাদের প্রতিশ্রুতি</h2>
        <p className="card-lead">
         <strong>তিজারা</strong> সবসময় আপনাকে ১০০% আসল ও মান-যাচাইকৃত পণ্য সরবরাহে প্রতিশ্রুতিবদ্ধ। তবে কখনো কখনো পণ্য সম্পর্কিত কিছু অপ্রত্যাশিত ত্রুটি দেখা দিতে পারে — সে ক্ষেত্রে আমরা আছি সর্বদা আপনার পাশে!
        </p>
        <p className="card-subtext">
         আমাদের কিছু পণ্যে ব্র্যান্ড ওয়ারেন্টি থাকে, আবার কিছু পণ্যে নাও থাকতে পারে। সংশ্লিষ্ট ওয়ারেন্টির তথ্য পণ্যের পেইজ, চালান (ইনভয়েস), বা আলাদা ওয়ারেন্টি কার্ডের মাধ্যমে স্পষ্টভাবে জানিয়ে দেওয়া হয়।
        </p>
       </div>
      </section>

      {/* 2. One-Time Replacement Guarantee */}
      <section className="policy-card">
       <div className="card-badge-num">০২</div>
       <div className="card-body">
        <h2 className="section-title">এককালীন রিপ্লেসমেন্ট গ্যারান্টি</h2>
        <p className="card-lead">
         যদি কোনো পণ্যে রিপ্লেসমেন্ট ওয়ারেন্টি অন্তর্ভুক্ত থাকে, তাহলে আপনি ত্রুটিজনিত কারণে একবারের জন্য সম্পূর্ণ নতুন পণ্য পাওয়ার আবেদন করতে পারবেন:
        </p>
        <ul className="styled-rule-list">
         <li>
          <span className="check-bullet">✓</span>
          <span><strong>একবার প্রযোজ্য:</strong> রিপ্লেসমেন্ট শুধুমাত্র প্রতি পণ্যের জন্য একবারই প্রযোজ্য হবে।</span>
         </li>
         <li>
          <span className="check-bullet">✓</span>
          <span><strong>সার্ভিস ওয়ারেন্টি:</strong> যদি প্রথমবার রিপ্লেসমেন্টের পর পুনরায় সমস্যা দেখা দেয়, তবে তা সার্ভিস ওয়ারেন্টির আওতায় মেরামতযোগ্য হবে (নতুন পণ্য প্রতিস্থাপন করা হবে না)।</span>
         </li>
        </ul>
       </div>
      </section>

      {/* 3. When Can You Request a Replacement? */}
      <section className="policy-card">
       <div className="card-badge-num">০৩</div>
       <div className="card-body">
        <h2 className="section-title">কখন রিপ্লেসমেন্টের জন্য আবেদন করা যাবে?</h2>
        <p className="card-lead">
         ওয়ারেন্টির মেয়াদের মধ্যে পণ্যে নিম্নোক্ত সমস্যাগুলো দেখা দিলে আপনি রিপ্লেসমেন্টের দাবি করতে পারবেন:
        </p>
        <div className="features-sub-grid">
         <div className="sub-box">
          <span className="sub-box-icon">⚙️</span>
          <strong>ফ্যাক্টরি ত্রুটি</strong>
          <p>কারখানা জনিত ম্যানুফ্যাকচারিং ফল্ট বা অভ্যন্তরীণ যান্ত্রিক ত্রুটি।</p>
         </div>
         <div className="sub-box">
          <span className="sub-box-icon">💻</span>
          <strong>অপারেটিং সিস্টেম ত্রুটি</strong>
          <p>সিস্টেম ওএস-এর সমস্যা (থার্ড-পার্টি অ্যাপসের ত্রুটি ছাড়া)।</p>
         </div>
         <div className="sub-box">
          <span className="sub-box-icon">⚡</span>
          <strong>পাওয়ার অন না হওয়া</strong>
          <p>ডিভাইস অন না হওয়া (রিমোট, কেবল বা ব্যাটারির মতো অ্যাকসেসরিজ ছাড়া)।</p>
         </div>
         <div className="sub-box">
          <span className="sub-box-icon">📉</span>
          <strong>পারফর্মেন্স ঘাটতি</strong>
          <p>ঘন ঘন স্বয়ংক্রিয় রিস্টার্ট বা কার্যক্ষমতা ৬০% এর নিচে নেমে যাওয়া।</p>
         </div>
        </div>
        <p className="card-note-highlight">
         ✓ টেকনিক্যাল টিম কর্তৃক ত্রুটি প্রমাণিত হলে আপনাকে একই মডেলের একটি সম্পূর্ণ নতুন ইউনিট প্রদান করা হবে।
        </p>
       </div>
      </section>

      {/* 4. When Replacement May Be Denied */}
      <section className="policy-card caution-border">
       <div className="card-badge-num caution">০৪</div>
       <div className="card-body">
        <h2 className="section-title text-caution">যেসব ক্ষেত্রে রিপ্লেসমেন্ট প্রযোজ্য নয়</h2>
        <p className="card-lead">
         নিম্নোক্ত যেকোনো পরিস্থিতিতে পণ্য রিপ্লেসমেন্টের আওতাভুক্ত থাকবে না:
        </p>
        <ul className="styled-rule-list caution-list">
         <li>
          <span className="cross-bullet">✕</span>
          <span><strong>বাহ্যিক বা তরল ক্ষতি:</strong> পড়ে গিয়ে ভাঙা, ফাটল বা পানিতে ভেজা জনিত ক্ষতি।</span>
         </li>
         <li>
          <span className="cross-bullet">✕</span>
          <span><strong>পোড়া বা শর্ট সার্কিট:</strong> বিদ্যুৎ ভোল্টেজ ওঠানামার কারণে অভ্যন্তরীণ সার্কিট পুড়ে যাওয়া।</span>
         </li>
         <li>
          <span className="cross-bullet">✕</span>
          <span><strong>অননুমোদিত পরিবর্তন:</strong> সফটওয়্যার মডিফিকেশন, রুটিং, ওয়ারেন্টি স্টিকার খোলা বা নষ্ট করা।</span>
         </li>
         <li>
          <span className="cross-bullet">✕</span>
          <span><strong>অনুপযুক্ত পরিবেশ:</strong> মাত্রাতিরিক্ত তাপ, আর্দ্রতা বা অননুমোদিত চার্জার ব্যবহারের কারণে ক্ষতি।</span>
         </li>
        </ul>
       </div>
      </section>

      {/* 5. Process & Timeline */}
      <section className="policy-card">
       <div className="card-badge-num">০৫</div>
       <div className="card-body">
        <h2 className="section-title">রিপ্লেসমেন্ট প্রক্রিয়া ও সময়সীমা</h2>
        <div className="steps-cards-row">
         <div className="proc-step">
          <div className="proc-step-num">ধাপ ১</div>
          <strong>কারিগরি নিরীক্ষা</strong>
          <p>আমাদের দক্ষ টেকনিক্যাল টিম পণ্যটি পুঙ্খানুপুঙ্খভাবে যাচাই করবে।</p>
         </div>
         <div className="proc-step">
          <div className="proc-step-num">ধাপ ২</div>
          <strong>দ্রুত প্রতিস্থাপন</strong>
          <p>স্টকে পণ্যটি মজুত থাকলে দ্রুততম সময়ে নতুন পণ্য পাঠানো হবে।</p>
         </div>
         <div className="proc-step">
          <div className="proc-step-num">ধাপ ৩</div>
          <strong>বিকল্প সমাধান</strong>
          <p>পণ্যটি স্টকে না থাকলে সার্ভিস ওয়ারেন্টি বা সমমূল্যের বিকল্প পণ্য অফার করা হবে।</p>
         </div>
        </div>
       </div>
      </section>

      {/* 6. Support */}
      <section className="policy-card contact-card-theme">
       <div className="card-badge-num">০৬</div>
       <div className="card-body">
        <h2 className="section-title">সহায়তা বা তথ্যের প্রয়োজন?</h2>
        <p className="card-lead">
         যেকোনো ওয়ারেন্টি, রিটার্ন বা ডেলিভারি তথ্যের জন্য আমাদের সাপোর্ট টিম সর্বদা প্রস্তুত:
        </p>
        <div className="support-actions-row">
         <a href="tel:01792223444" className="hotline-btn">
          📞 কল করুন: 01792223444
         </a>
         <a href="/return-and-refund-policy" className="secondary-link-btn">
          রিটার্ন ও রিফান্ড নীতি পড়ুন →
         </a>
         <a href="/orderTracking" className="secondary-link-btn">
          অর্ডার ট্র্যাক করুন →
         </a>
        </div>
       </div>
      </section>
     </div>
    )}
   </div>
  </div>
 );
}
