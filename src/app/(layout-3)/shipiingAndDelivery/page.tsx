"use client";

import React, { useState, useEffect, useRef } from "react";
import "../shipiingAndDelivery/ShippingPage.css";

export default function ShippingAndDeliveryPage() {
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
      .querySelectorAll(".glass-feature-banner, .shipping-card, .shipping-contact-banner")
      .forEach((el) => reveal.observe(el));

    return () => {
      reveal.disconnect();
    };
  }, [lang]);

 return (
  <div className="shipping-page-wrapper" ref={wrapperRef}>
   {/* Hero Banner */}
   <div className="shipping-hero">
    <div className="hero-content">
     <h1 className="hero-title">
      <span className="hero-icon">
       <svg viewBox="0 0 24 24"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.7 1.3 3 3 3s3-1.3 3-3h6c0 1.7 1.3 3 3 3s3-1.3 3-3h2v-5l-3-4zM6 18.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm9-3.5H8.2c-.5-.6-1.2-1-2-1H3V6h12v9zm3 3.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zM17 12V9.5h2.5l2 2.5H17z"/></svg>
      </span>
      {lang === "en" ? (
        <>
          Shipping & <span className="title-accent">Delivery</span>
        </>
      ) : (
        <>
          শিপিং ও <span className="title-accent">ডেলিভারি নির্দেশিকা</span>
        </>
      )}
     </h1>
     <p className="hero-subtitle">
      {lang === "en"
       ? "Fast, reliable & transparent doorstep delivery across all 64 districts in Bangladesh"
       : "সারাদেশের ৬৪ জেলায় দ্রুত, নির্ভরযোগ্য ও নিরাপদ হোম ডেলিভারি নিশ্চয়তা"}
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
   </div>

   <div className="container main-content-container">
    {lang === "en" ? (
     <div className="shipping-content-grid">
      {/* Intro Highlight Card */}
      <div className="glass-feature-banner">
       <div className="banner-icon-box">
        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
       </div>
       <p className="intro-text">
        At <strong>Tizaraa</strong>, we strive to deliver your products quickly, safely, and efficiently. Whether you're in Dhaka metropolitan area or anywhere else across Bangladesh, we partner with industry-leading courier services to bring your favorite products right to your doorstep.
       </p>
      </div>

      {/* Delivery Charges Section (Cards) */}
      <div className="shipping-card">
       <div className="card-header-styled">
        <div className="header-icon-circle">💰</div>
        <div>
         <h2 className="card-main-title">Delivery Charges & Rates</h2>
         <p className="card-main-subtitle">Transparent and affordable shipping fees with no hidden costs</p>
        </div>
       </div>

       <div className="charges-dual-grid">
        <div className="rate-card rate-card-dhaka">
         <div className="rate-pill">Metropolitan</div>
         <h3 className="rate-zone-title">Inside Dhaka</h3>
         <div className="rate-price">
          <span className="currency">৳</span>
          <span className="amount">60</span>
          <span className="unit">/ base</span>
         </div>
         <ul className="rate-perks">
          <li>
           <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
           <span>Standard delivery charge: <strong>৳ 60</strong></span>
          </li>
          <li>
           <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
           <span>Over 1 kg: <strong>+৳ 25</strong> for each additional kilogram</span>
          </li>
          <li>
           <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
           <span>Fastest 2 to 3 days delivery window</span>
          </li>
         </ul>
        </div>

        <div className="rate-card rate-card-outside">
         <div className="rate-pill outside">Nationwide</div>
         <h3 className="rate-zone-title">Outside Dhaka</h3>
         <div className="rate-price">
          <span className="currency">৳</span>
          <span className="amount">120</span>
          <span className="unit">/ base</span>
         </div>
         <ul className="rate-perks">
          <li>
           <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
           <span>Standard delivery charge: <strong>৳ 120</strong></span>
          </li>
          <li>
           <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
           <span>Over 1 kg: <strong>+৳ 25</strong> per additional kilogram</span>
          </li>
          <li>
           <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
           <span>Complete door-to-door coverage across 64 districts</span>
          </li>
         </ul>
        </div>
       </div>

       <div className="calculation-example-box">
        <div className="calc-badge">Calculation Example</div>
        <p>
         📦 If your order weighs <strong>3 kg</strong> and is being shipped outside Dhaka:
         <br />
         Base fee <strong>৳ 120</strong> + (2 extra kg × <strong>৳ 25</strong>) = <strong className="total-highlight">৳ 170 total</strong>.
        </p>
       </div>
      </div>

      {/* Delivery Partners & Times */}
      <div className="shipping-two-col-grid">
       {/* Partners */}
       <div className="shipping-card">
        <div className="card-header-styled">
         <div className="header-icon-circle">🚚</div>
         <div>
          <h2 className="card-main-title">Delivery Partners</h2>
          <p className="card-main-subtitle">Selected for punctuality and safe handling</p>
         </div>
        </div>

        <div className="partner-badges-container">
         <div className="courier-badge">
          <span className="courier-logo-tag">REDX</span>
          <div className="courier-meta">
           <strong>RedX Logistics</strong>
           <span>Official Delivery Partner</span>
          </div>
          <span className="verified-status-tag">Active</span>
         </div>
        </div>
        <p className="card-inline-note">
         ✓ Handled only by verified logistics professionals with live GPS trackability.
        </p>
       </div>

       {/* Timelines */}
       <div className="shipping-card">
        <div className="card-header-styled">
         <div className="header-icon-circle">⏱️</div>
         <div>
          <h2 className="card-main-title">Estimated Timelines</h2>
          <p className="card-main-subtitle">Expected transit times to your area</p>
         </div>
        </div>

        <div className="timeline-items-stack">
         <div className="timeline-row">
          <div className="timeline-icon">🏙️</div>
          <div className="timeline-info">
           <strong>Inside Dhaka</strong>
           <span>Estimated 2 – 3 business days</span>
          </div>
          <span className="timeline-tag express">Express</span>
         </div>
         <div className="timeline-row">
          <div className="timeline-icon">🌄</div>
          <div className="timeline-info">
           <strong>Outside Dhaka</strong>
           <span>Estimated 3 – 5 business days</span>
          </div>
          <span className="timeline-tag standard">Standard</span>
         </div>
        </div>
        <p className="card-inline-note">
         * Remote or upazila areas may occasionally take 1-2 additional days depending on weather or local transit conditions.
        </p>
       </div>
      </div>

      {/* Processing & Tracking Stack */}
      <div className="shipping-card">
       <div className="card-header-styled">
        <div className="header-icon-circle">📋</div>
        <div>
         <h2 className="card-main-title">Order Processing & Live Tracking</h2>
         <p className="card-main-subtitle">What happens once you hit place order</p>
        </div>
       </div>

       <div className="steps-flow-grid">
        <div className="flow-step-card">
         <div className="step-number">01</div>
         <h3>Same-Day Dispatch</h3>
         <p>Orders confirmed before <strong>6:00 PM</strong> (Sat - Thu) are packed and dispatched on the same day.</p>
        </div>
        <div className="flow-step-card">
         <div className="step-number">02</div>
         <h3>SMS & Email Updates</h3>
         <p>You receive instant order confirmation and a unique tracking ID as soon as the courier picks it up.</p>
        </div>
        <div className="flow-step-card">
         <div className="step-number">03</div>
         <h3>Live Tracking</h3>
         <p>Track your shipment on our <a href="/orderTracking" className="text-link">Live Order Tracking</a> portal anytime.</p>
        </div>
        <div className="flow-step-card">
         <div className="step-number">04</div>
         <h3>Doorstep Delivery</h3>
         <p>The delivery rider contacts your phone before arrival for a seamless and safe handoff.</p>
        </div>
       </div>
      </div>

      {/* Changing Details & Support Policy */}
      <div className="shipping-two-col-grid">
       <div className="shipping-card alert-theme-card">
        <div className="card-header-styled">
         <div className="header-icon-circle alert">🔄</div>
         <div>
          <h2 className="card-main-title">Need to Change Address?</h2>
          <p className="card-main-subtitle">Prompt communication is key</p>
         </div>
        </div>
        <p className="policy-desc">
         If you need to adjust your recipient phone number or delivery location, please contact us immediately before the package is dispatched:
        </p>
        <div className="quick-hotline-pill">
         <span className="phone-icon">📞</span>
         <span>Customer Hotline:</span>
         <a href="tel:01792223444" className="hotline-number">01792223444</a>
        </div>
        <p className="card-inline-note warning">
         ⚠️ Once your package is handed over to the courier partner, addresses cannot be altered in transit.
        </p>
       </div>

       <div className="shipping-card">
        <div className="card-header-styled">
         <div className="header-icon-circle">🏢</div>
         <div>
          <h2 className="card-main-title">Office Pickup Policy</h2>
          <p className="card-main-subtitle">Convenience & security first</p>
         </div>
        </div>
        <div className="pickup-info-box">
         <p>
          Currently, Tizaraa operates on an <strong>exclusive direct-to-door delivery model</strong>. We do not provide physical office pick-up to ensure seamless logistics tracking and customer protection.
         </p>
        </div>
       </div>
      </div>

      {/* Contact & Support Section */}
      <div className="shipping-contact-banner">
       <div className="contact-banner-text">
        <h3>Have Questions or Need Assistance?</h3>
        <p>Our dedicated customer support team is ready to assist you Saturday to Thursday (9 AM – 6 PM).</p>
       </div>
       <div className="contact-banner-actions">
        <a href="tel:01792223444" className="banner-call-btn">
         <span>📞 Call 01792223444</span>
        </a>
        <a href="/orderTracking" className="banner-secondary-btn">
         <span>Track My Order →</span>
        </a>
       </div>
      </div>
     </div>
    ) : (
     /* BENGALI CONTENT */
     <div className="shipping-content-grid">
      <div className="glass-feature-banner">
       <div className="banner-icon-box">
        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
       </div>
       <p className="intro-text">
        <strong>তিজারা</strong> সবসময় চেষ্টা করে আপনার পছন্দের পণ্যগুলো দ্রুত, নিরাপদ ও নির্ভরযোগ্যভাবে আপনার দোরগোড়ায় পৌঁছে দিতে। আপনি ঢাকা শহরের মধ্যে অবস্থান করুন অথবা দেশের যেকোনো প্রান্তে, আমরা বিশ্বস্ত কুরিয়ার পার্টনারদের মাধ্যমে আপনার অর্ডার পৌঁছে দেওয়ার শতভাগ নিশ্চয়তা প্রদান করি।
       </p>
      </div>

      {/* Charges in Bengali */}
      <div className="shipping-card">
       <div className="card-header-styled">
        <div className="header-icon-circle">💰</div>
        <div>
         <h2 className="card-main-title">ডেলিভারি চার্জের বিবরণ</h2>
         <p className="card-main-subtitle">স্বচ্ছ ও সাশ্রয়ী ডেলিভারি ফি, কোনো প্রকার অতিরিক্ত চার্জ ছাড়াই</p>
        </div>
       </div>

       <div className="charges-dual-grid">
        <div className="rate-card rate-card-dhaka">
         <div className="rate-pill">মেট্রোপলিটন এলাকা</div>
         <h3 className="rate-zone-title">ঢাকার ভেতরে</h3>
         <div className="rate-price">
          <span className="currency">৳</span>
          <span className="amount">৬০</span>
          <span className="unit">/ প্রাথমিক</span>
         </div>
         <ul className="rate-perks">
          <li>
           <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
           <span>স্ট্যান্ডার্ড ডেলিভারি চার্জ: <strong>৬০ টাকা</strong></span>
          </li>
          <li>
           <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
           <span>১ কেজির বেশি ওজনে: অতিরিক্ত প্রতি কেজির জন্য <strong>+২৫ টাকা</strong></span>
          </li>
          <li>
           <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
           <span>দ্রুততম ২ থেকে ৩ কার্যদিবসের মধ্যে ডেলিভারি</span>
          </li>
         </ul>
        </div>

        <div className="rate-card rate-card-outside">
         <div className="rate-pill outside">সারাদেশে</div>
         <h3 className="rate-zone-title">ঢাকার বাইরে</h3>
         <div className="rate-price">
          <span className="currency">৳</span>
          <span className="amount">১২০</span>
          <span className="unit">/ প্রাথমিক</span>
         </div>
         <ul className="rate-perks">
          <li>
           <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
           <span>স্ট্যান্ডার্ড ডেলিভারি চার্জ: <strong>১২০ টাকা</strong></span>
          </li>
          <li>
           <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
           <span>১ কেজির বেশি ওজনে: অতিরিক্ত প্রতি কেজির জন্য <strong>+২৫ টাকা</strong></span>
          </li>
          <li>
           <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
           <span>দেশের ৬৪টি জেলার প্রত্যন্ত অঞ্চল পর্যন্ত হোম ডেলিভারি</span>
          </li>
         </ul>
        </div>
       </div>

       <div className="calculation-example-box">
        <div className="calc-badge">সহজ হিসাব উদাহরণ</div>
        <p>
         📦 ঢাকার বাইরে যদি আপনার প্যাকেজের ওজন <strong>৩ কেজি</strong> হয়:
         <br />
         প্রাথমিক চার্জ <strong>১২০ টাকা</strong> + (অতিরিক্ত ২ কেজি × <strong>২৫ টাকা</strong>) = সর্বমোট <strong className="total-highlight">১৭০ টাকা</strong>।
        </p>
       </div>
      </div>

      {/* Bengali Delivery Timeline & Partners */}
      <div className="shipping-two-col-grid">
       <div className="shipping-card">
        <div className="card-header-styled">
         <div className="header-icon-circle">🚚</div>
         <div>
          <h2 className="card-main-title">বিশ্বস্ত ডেলিভারি পার্টনার</h2>
          <p className="card-main-subtitle">সময়মতো নিরাপদ পৌঁছানোর প্রতিশ্রুতি</p>
         </div>
        </div>

        <div className="partner-badges-container">
         <div className="courier-badge">
          <span className="courier-logo-tag">REDX</span>
          <div className="courier-meta">
           <strong>RedX লজিস্টিকস</strong>
           <span>অফিসিয়াল ডেলিভারি পার্টনার</span>
          </div>
          <span className="verified-status-tag">সক্রিয়</span>
         </div>
        </div>
        <p className="card-inline-note">
         ✓ সর্বোচ্চ গতি ও সুরক্ষার জন্য তিজারা শুধুমাত্র অনুমোদিত কুরিয়ার সার্ভিসের সাথে কাজ করে।
        </p>
       </div>

       <div className="shipping-card">
        <div className="card-header-styled">
         <div className="header-icon-circle">⏱️</div>
         <div>
          <h2 className="card-main-title">আনুমানিক সময়সীমা</h2>
          <p className="card-main-subtitle">আপনার এলাকায় পণ্য পৌঁছানোর সম্ভাব্য সময়</p>
         </div>
        </div>

        <div className="timeline-items-stack">
         <div className="timeline-row">
          <div className="timeline-icon">🏙️</div>
          <div className="timeline-info">
           <strong>ঢাকার মধ্যে</strong>
           <span>আনুমানিক ২ – ৩ কর্মদিবস</span>
          </div>
          <span className="timeline-tag express">এক্সপ্রেস</span>
         </div>
         <div className="timeline-row">
          <div className="timeline-icon">🌄</div>
          <div className="timeline-info">
           <strong>ঢাকার বাইরে</strong>
           <span>আনুমানিক ৩ – ৫ কর্মদিবস</span>
          </div>
          <span className="timeline-tag standard">স্ট্যান্ডার্ড</span>
         </div>
        </div>
        <p className="card-inline-note">
         * দূরবর্তী ও প্রত্যন্ত উপজেলা এলাকায় আবহাওয়া বা স্থানীয় পরিস্থিতির কারণে অতিরিক্ত ১-২ দিন সময় লাগতে পারে।
        </p>
       </div>
      </div>

      {/* Bengali Support Banner */}
      <div className="shipping-contact-banner">
       <div className="contact-banner-text">
        <h3>যেকোনো প্রশ্ন বা তথ্যের জন্য যোগাযোগ করুন</h3>
        <p>আমাদের সাপোর্ট টিম শনিবার থেকে বৃহস্পতিবার (সকাল ৯টা – সন্ধ্যা ৬টা) আপনার সেবায় নিয়োজিত।</p>
       </div>
       <div className="contact-banner-actions">
        <a href="tel:01792223444" className="banner-call-btn">
         <span>📞 কল করুন: 01792223444</span>
        </a>
        <a href="/orderTracking" className="banner-secondary-btn">
         <span>অর্ডার ট্র্যাক করুন →</span>
        </a>
       </div>
      </div>
     </div>
    )}
   </div>
  </div>
 );
}
