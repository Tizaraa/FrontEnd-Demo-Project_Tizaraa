"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Store, Shield, Globe, Mail, Phone, MessageSquare } from "lucide-react";
import "./TizaraaCares.css";

const pillars = [
  {
    icon: <Store size={30} />,
    title: "Vendor Success",
    description:
      "Empowering our sellers with smart analytics, digital tools, and operational training to scale their businesses nationwide.",
    features: [
      "Dedicated Merchant Mentorship",
      "Marketing & Campaign Support",
      "Real-Time Sales Analytics",
      "Guaranteed Payment Protection",
    ],
  },
  {
    icon: <Shield size={30} />,
    title: "Customer Protection",
    description:
      "Ensuring 100% genuine products, safe and encrypted transactions, and seamless post-purchase replacement guarantees.",
    features: [
      "Money-Back Guarantee",
      "Bank-Grade Secure Checkout",
      "Strict Quality Control",
      "24/7 Dedicated Care Support",
    ],
  },
  {
    icon: <Globe size={30} />,
    title: "Community & Impact",
    description:
      "Fostering an inclusive e-commerce ecosystem that connects Bangladeshi entrepreneurs with active shoppers nationwide.",
    features: [
      "Nationwide 64-District Reach",
      "Local Business Enablement",
      "Zero Hidden Cost Policy",
      "Fair Trade & Transparency",
    ],
  },
];

const supportChannels = [
  {
    icon: <Mail size={26} />,
    title: "Email Support",
    info: "info@tizaraa.com",
    href: "mailto:info@tizaraa.com",
    description: "Detailed ticket and inquiry assistance",
    availability: "Response within 24 Hours",
  },
  {
    icon: <Phone size={26} />,
    title: "Direct Helpline",
    info: "+8801792223444",
    href: "tel:+8801792223444",
    description: "Speak directly with customer care executives",
    availability: "Sat - Thu: 9 AM - 6 PM",
  },
  {
    icon: <MessageSquare size={26} />,
    title: "Instant Resolution",
    info: "Help Center & FAQs",
    href: "/helpCenter",
    description: "Browse articles, tutorials, or submit a ticket",
    availability: "Always Accessible",
  },
];

const quickTopics = [
  { label: "📦 Order Tracking", link: "/orderTracking" },
  { label: "🔄 Returns & Refunds", link: "/return-and-refund-policy" },
  { label: "🛡️ Replacement Policy", link: "/replacement" },
  { label: "🛒 How To Buy", link: "/howToBuy" },
  { label: "🚚 Shipping & Delivery", link: "/shipiingAndDelivery" },
  { label: "📞 Contact Us", link: "/contact" },
];

export default function TizaraaCaresPage() {
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
      .querySelectorAll(".pillar-card, .support-channel-card, .quick-topics-card")
      .forEach((el) => reveal.observe(el));

    return () => {
      reveal.disconnect();
    };
  }, []);

  return (
    <div className="cares-page-wrapper" ref={wrapperRef}>
      {/* Hero Banner (Top pill badge removed as requested) */}
      <header className="cares-hero">
        <div className="cares-hero-content">
          <h1 className="cares-title">
            Tizaraa <span className="title-accent">Cares</span>
          </h1>

          <p className="cares-subtitle">
            At Tizaraa, caring means creating a transparent marketplace where vendors thrive,
            customers shop with confidence, and communities prosper together.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container main-content-container">
        {/* Three Core Pillars */}
        <div className="pillars-grid">
          {pillars.map((item, idx) => (
            <article key={idx} className="pillar-card">
              <div className="pillar-icon-box">{item.icon}</div>
              <h2 className="pillar-title">{item.title}</h2>
              <p className="pillar-desc">{item.description}</p>
              <ul className="pillar-perks">
                {item.features.map((feature, fIdx) => (
                  <li key={fIdx} className="pillar-perk-item">
                    <span className="perk-check">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Section Headline */}
        <div className="section-headline">
          <h2>Need Immediate Assistance?</h2>
          <p>Our dedicated care team is standing by to resolve any issue or question.</p>
        </div>

        {/* Support Channels Grid */}
        <div className="support-channels-grid">
          {supportChannels.map((channel, idx) => (
            <div key={idx} className="support-channel-card">
              <div className="support-channel-icon">{channel.icon}</div>
              <h3 className="support-channel-title">{channel.title}</h3>
              <a href={channel.href} className="support-channel-info">
                {channel.info}
              </a>
              <p className="support-channel-desc">{channel.description}</p>
              <span className="support-availability-tag">{channel.availability}</span>
            </div>
          ))}
        </div>

        {/* Quick Help Topics */}
        <section className="quick-topics-card">
          <h3>Quick Help &amp; Resource Center</h3>
          <p>
            Explore instant answers to frequently asked questions, policy guidelines, and tracking portals.
          </p>
          <div className="quick-topics-pills">
            {quickTopics.map((topic, idx) => (
              <Link key={idx} href={topic.link} className="topic-pill-btn">
                <span>{topic.label}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
