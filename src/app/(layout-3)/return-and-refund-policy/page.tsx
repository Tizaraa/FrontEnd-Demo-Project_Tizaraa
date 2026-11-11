"use client";

import Head from "next/head";
import Link from "next/link";
import "./terms.css";
import { useEffect, useRef, useState } from "react";

type TocItem = { id: string; num: string; title: string };

// Turns "GENERAL RULES FOR A SUCCESSFUL RETURN" into "General rules for a successful return" for the sidebar
const sentenceCase = (t: string) =>
 /[A-Z]/.test(t) && t === t.toUpperCase() ? t.charAt(0) + t.slice(1).toLowerCase() : t;

// Builds the contents list from the rendered headings, tracks the section in
// view, drives the reading progress (top bar + progress rings), reveals
// section cards as they scroll in, and estimates the reading time.
function useLegalPage(language: string) {
 const rootRef = useRef<HTMLDivElement>(null);
 const progressRef = useRef<HTMLDivElement>(null);
 const [toc, setToc] = useState<TocItem[]>([]);
 const [activeId, setActiveId] = useState("");
 const [showPill, setShowPill] = useState(false);
 const [readMin, setReadMin] = useState(0);
 const headingsRef = useRef<HTMLElement[]>([]);

 useEffect(() => {
  const root = rootRef.current;
  if (!root) return;

  const headings = Array.from(
   root.querySelectorAll<HTMLElement>(".legal-main .section-title"),
  );
  const items: TocItem[] = [];
  headings.forEach((h, i) => {
   const numEl = h.querySelector(".section-number");
   let num = numEl?.textContent?.trim() || "";
   let title = (h.textContent || "").trim();
   if (numEl) title = title.slice(num.length).trim();
   const m = !num && title.match(/^([0-9০-৯]+)[.)]\s*(.*)$/);
   if (m) {
    num = m[1];
    title = m[2];
   }
   if (/^(table of contents|সূচিপত্র)$/i.test(title)) return;
   if (!h.id) h.id = `legal-${language}-${i}`;
   items.push({ id: h.id, num, title: sentenceCase(title.replace(/\s+/g, " ")) });
  });
  setToc(items);
  setActiveId(items[0]?.id || "");

  // ~200 words per minute
  const words = (root.querySelector(".legal-main")?.textContent || "").trim().split(/\s+/).length;
  setReadMin(Math.max(1, Math.round(words / 200)));

  headingsRef.current = items
   .map((it) => document.getElementById(it.id))
   .filter((el): el is HTMLElement => Boolean(el));
  window.dispatchEvent(new Event("scroll"));

  // Reveal cards once as they enter the screen
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
   { threshold: 0.08 },
  );
  root
   .querySelectorAll(".legal-main .section, .legal-main .disclaimer-box, .legal-main .contact-box")
   .forEach((el) => reveal.observe(el));

  return () => {
   reveal.disconnect();
  };
 }, [language]);

 // Reading progress: top bar, rings and percentage labels; floating pill shows after the hero
 useEffect(() => {
  let frame = 0;
  let lastP = -1;
  const onScroll = () => {
   cancelAnimationFrame(frame);
   frame = requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    const y = window.scrollY;
    const footerTop = document.querySelector("footer")?.getBoundingClientRect().top ?? Infinity;

    let current = headingsRef.current[0]?.id || "";
    for (const h of headingsRef.current) {
     if (h.getBoundingClientRect().top <= 160) current = h.id;
     else break;
    }

    const rounded = Math.round(p * 1000) / 1000;
    const root = rootRef.current;
    if (rounded !== lastP) {
     lastP = rounded;
     if (progressRef.current) progressRef.current.style.transform = `scaleX(${rounded})`;
     if (root) {
      root.querySelectorAll<SVGCircleElement>("[data-ring]").forEach((c) => {
       const len = Number(c.dataset.ring);
       c.style.strokeDashoffset = String(len * (1 - rounded));
      });
      root.querySelectorAll<HTMLElement>("[data-pct]").forEach((t) => {
       t.textContent = `${Math.round(rounded * 100)}%`;
      });
     }
    }
    setShowPill(y > 520 && footerTop > window.innerHeight - 40);
    if (current) setActiveId(current);
   });
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => {
   cancelAnimationFrame(frame);
   window.removeEventListener("scroll", onScroll);
  };
 }, []);

 return { rootRef, progressRef, toc, activeId, showPill, readMin };
}

const prefersReducedMotion = () =>
 typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Smooth-scrolls to a heading and briefly flashes its card so the reader sees where they landed
function scrollToId(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
 const el = document.getElementById(id);
 if (!el) return;
 e.preventDefault();
 el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
 history.replaceState(null, "", `#${id}`);
 const card = el.closest(".section");
 if (card) {
  card.classList.remove("is-flash");
  void (card as HTMLElement).offsetWidth;
  card.classList.add("is-flash");
  window.setTimeout(() => card.classList.remove("is-flash"), 1800);
 }
}

// Progress ring
const Ring = ({ r, stroke }: { r: number; stroke: number }) => {
 const len = 2 * Math.PI * r;
 const size = (r + stroke) * 2;
 return (
  <svg className="ring" width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
   <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth={stroke} />
   <circle
    cx={size / 2}
    cy={size / 2}
    r={r}
    fill="none"
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeDasharray={len}
    strokeDashoffset={len}
    data-ring={len}
    transform={`rotate(-90 ${size / 2} ${size / 2})`}
   />
  </svg>
 );
};

function LegalToc({
 toc,
 activeId,
 label,
 query,
 setQuery,
}: {
 toc: TocItem[];
 activeId: string;
 label: string;
 query: string;
 setQuery: (q: string) => void;
}) {
 const navRef = useRef<HTMLElement>(null);
 const indicatorRef = useRef<HTMLSpanElement>(null);
 const q = query.trim().toLowerCase();
 const shown = q ? toc.filter((it) => `${it.num} ${it.title}`.toLowerCase().includes(q)) : toc;

 useEffect(() => {
  const nav = navRef.current;
  const ind = indicatorRef.current;
  if (!nav || !ind) return;
  const item = nav.querySelector<HTMLElement>("a.is-active")?.parentElement;
  if (!item) {
   ind.style.opacity = "0";
   return;
  }
  ind.style.opacity = "1";
  ind.style.height = `${item.offsetHeight}px`;
  ind.style.transform = `translateY(${item.offsetTop}px)`;
  const navBox = nav.getBoundingClientRect();
  const itemBox = item.getBoundingClientRect();
  if (itemBox.top < navBox.top + 80 || itemBox.bottom > navBox.bottom - 40) {
   nav.scrollTo({
    top: nav.scrollTop + (itemBox.top - navBox.top) - nav.clientHeight / 2,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
   });
  }
 }, [activeId, shown.length]);

 return (
  <nav className="legal-toc" aria-label={label} ref={navRef}>
   <div className="toc-head">
    <p className="legal-toc-title">{label}</p>
   </div>
   <label className="toc-search">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
     <circle cx="11" cy="11" r="7" />
     <path d="M20 20l-3.5-3.5" />
    </svg>
    <input
     type="search"
     value={query}
     onChange={(e) => setQuery(e.target.value)}
     placeholder="Search sections"
     aria-label="Search sections"
    />
   </label>
   <ol>
    <span className="toc-indicator" ref={indicatorRef} aria-hidden="true" />
    {shown.map((it) => (
     <li key={it.id}>
      <a
       href={`#${it.id}`}
       className={it.id === activeId ? "is-active" : undefined}
       aria-current={it.id === activeId ? "true" : undefined}
       onClick={(e) => scrollToId(e, it.id)}
      >
       {it.num && <span className="toc-num">{it.num}</span>}
       <span>{it.title}</span>
      </a>
     </li>
    ))}
    {shown.length === 0 && <li className="toc-empty">No matching sections</li>}
   </ol>
  </nav>
 );
}

function useSectionLink() {
 const [hover, setHover] = useState<{ id: string; top: number } | null>(null);
 const [copied, setCopied] = useState(false);
 const onMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
  const sec = (e.target as HTMLElement).closest(".section");
  const id = sec?.querySelector(".section-title")?.id;
  if (!sec || !id) return;
  if (hover?.id === id) return;
  const top = sec.getBoundingClientRect().top - e.currentTarget.getBoundingClientRect().top;
  setHover({ id, top });
  setCopied(false);
 };
 const copy = () => {
  if (!hover) return;
  const url = `${window.location.origin}${window.location.pathname}#${hover.id}`;
  navigator.clipboard?.writeText(url).then(
   () => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
   },
   () => {},
  );
 };
 return { hover, copied, onMouseOver, copy, clear: () => setHover(null) };
}

const ChipIcon = ({ d }: { d: string }) => (
 <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  <path d={d} />
 </svg>
);

// Hero illustration: document unfolds with a "RETURNS" label and Tizaraa Agreed checkmark
const LegalArt = ({ label }: { label: string }) => (
 <svg className="legal-art" viewBox="0 0 260 220" aria-hidden="true">
  <circle className="la-glow" cx="130" cy="110" r="96" fill="rgba(240,80,35,0.16)" />
  <g className="la-shake">
   <g className="la-doc">
    <rect x="58" y="22" width="136" height="176" rx="14" fill="#fff" />
    <rect x="58" y="22" width="136" height="30" rx="14" fill="#f05023" />
    <rect x="58" y="40" width="136" height="12" fill="#f05023" />
    <text x="76" y="42" fontSize="11" fontWeight="800" fill="#fff" fontFamily="inherit">{label}</text>
    {[66, 80, 94, 108, 122, 136].map((y, i) => (
     <rect key={y} className={`la-line l${i + 1}`} x="76" y={y} width={i % 3 === 2 ? 70 : 100} height="6" rx="3" fill="#e3e6ec" />
    ))}
    <rect x="76" y="168" width="56" height="4" rx="2" fill="#cbd5e1" />
   </g>
   <g className="la-stamp">
    <circle cx="104" cy="160" r="30" fill="rgba(255,255,255,0.9)" stroke="#c2400f" strokeWidth="3.5" />
    <circle cx="104" cy="160" r="24" fill="none" stroke="#c2400f" strokeWidth="1.2" strokeDasharray="3 3" />
    <text x="104" y="157" textAnchor="middle" fontSize="9" fontWeight="900" fill="#c2400f" fontFamily="inherit" letterSpacing="1">TIZARAA</text>
    <text x="104" y="170" textAnchor="middle" fontSize="9" fontWeight="900" fill="#c2400f" fontFamily="inherit" letterSpacing="1">VERIFIED ✓</text>
   </g>
  </g>
  <g className="la-shield">
   <circle className="la-pulse" cx="198" cy="150" r="26" fill="rgba(30,138,85,0.35)" />
   <path d="M198 116l30 12v20c0 19-13 33-30 41-17-8-30-22-30-41v-20z" fill="#1e8a55" />
   <path d="M198 124l22 9v15c0 14-9 25-22 31z" fill="#fff" opacity="0.15" />
   <path className="la-check" d="M185 151l9 9 17-18" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
  </g>
  <path className="la-spark s1" d="M40 60l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#ffc53d" />
  <path className="la-spark s2" d="M226 52l2.4 5.6 5.6 2.4-5.6 2.4-2.4 5.6-2.4-5.6-5.6-2.4 5.6-2.4z" fill="#ffc53d" />
 </svg>
);

export default function ReturnRefundPolicy() {
 const [language, setLanguage] = useState("english");
 const { rootRef, progressRef, toc, activeId, showPill, readMin } = useLegalPage(language);
 const [query, setQuery] = useState("");
 const { hover, copied, onMouseOver, copy, clear } = useSectionLink();
 const tocLabel = language === "bangla" ? "সূচিপত্র" : "Contents";
 const activeTitle = toc.find((t) => t.id === activeId)?.title || "";

 return (
  <div className="legal-page" ref={rootRef}>
   {/* Reading progress bar */}
   <div className="legal-progress" ref={progressRef} aria-hidden="true" />

   <Head>
    <title>Return and Refund Policy | Tizaraa</title>
    <meta name="description" content="Tizaraa Return and Refund Policy" />
   </Head>

   <div className="legal-content">
    {/* Hero */}
    <header className="legal-hero">
     <div className="hero-copy">
      <h1 className="terms-title">Return &amp; <span className="title-accent">Refund Policy</span></h1>
      <p className="legal-subtitle">Everything you need to know about returns, exchanges, warranties and refunds.</p>
      {toc.length > 0 && (
       <div className="hero-chips">
        <span className="hero-chip">
         <ChipIcon d="M4 6h16M4 12h16M4 18h10" />
         {toc.length} sections
        </span>
        <span className="hero-chip">
         <ChipIcon d="M12 7v5l3 2M12 21a9 9 0 100-18 9 9 0 000 18z" />
         ~{readMin} min read
        </span>
        <span className="hero-chip">
         <ChipIcon d="M12 7v5l3 2M12 21a9 9 0 100-18 9 9 0 000 18z" />
         Updated{" "}
         {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
         })}
        </span>
       </div>
      )}
     </div>
     <LegalArt label="RETURNS" />
    </header>

    {/* Language switcher */}
    <div className="btn-header" data-lang={language}>
     <span className="lang-indicator" aria-hidden="true" />
     <button
      type="button"
      className={`tab-button ${language === "english" ? "active" : ""}`}
      onClick={() => setLanguage("english")}
     >
      English
     </button>
     <button
      type="button"
      className={`tab-button ${language === "bangla" ? "active" : ""}`}
      onClick={() => setLanguage("bangla")}
     >
      বাংলা
     </button>
    </div>

    {/* Main layout */}
    <div className="legal-layout">
     <LegalToc toc={toc} activeId={activeId} label={tocLabel} query={query} setQuery={setQuery} />

     {/* Article container */}
     <div className="legal-main" key={language} onMouseOver={onMouseOver} onMouseLeave={clear}>
      <details className="legal-toc-mobile">
       <summary>{tocLabel}</summary>
       <LegalToc toc={toc} activeId={activeId} label={tocLabel} query={query} setQuery={setQuery} />
      </details>

      {hover && (
       <button
        type="button"
        className={`sec-link${copied ? " is-copied" : ""}`}
        style={{ top: hover.top + 18 }}
        onClick={copy}
        aria-label="Copy link to this section"
       >
        {copied ? "Copied!" : (
         <ChipIcon d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1" />
        )}
       </button>
      )}

      {/* Content English */}
      {language === "english" && (
       <div className="terms-body">
        {/* Introduction */}
        <section id="introduction" className="section">
         <div className="section-content">
          <p>
           Thank you for your purchase. We hope you are happy with your purchase.
           However, if you are not completely satisfied with your purchase for any
           reason, you may return it to us for a full refund or an exchange.
          </p>
          <p>
           If your product is damaged, defective, incorrect or incomplete at the
           time of delivery, please raise a return request on the app or website
           within 3 days. See below for more information about our return and
           refund policy.
          </p>
          <p>
           If you wish to return a Product to us you may contact us through our
           website, by email at{" "}
           <a href="mailto:info@tizaraa.com">info@tizaraa.com</a> or by calling
           our phone number (<strong>+8801792223444</strong>). We will then
           inform you of the arrangements to return the Product to us.
          </p>
         </div>
        </section>

        {/* Section 1: General Rules */}
        <section id="general-rules" className="section">
         <h2 className="section-title">
          <span className="section-number">1</span>
          GENERAL RULES FOR A SUCCESSFUL RETURN
         </h2>
         <div className="section-content">
          <p>
           Subject to the terms below, if you believe that a Product you have
           ordered from us is defective, you should contact us via our website or
           by email or by telephoning the Customer Call Centre (details are
           available under Contact Us). We will advise you of the appropriate
           steps to take. If you notify us within 3 days of delivery of the
           Product that the Product is defective, you will have the option to
           select a repair, an exchange or a refund. If a fault is found after 3
           days from delivery of the Product, you should contact us by telephoning
           and we will at our discretion either repair or replace the Product and
           deliver the repaired or replacement Product to you, or provide a
           refund.
          </p>
          <p>
           Customers have a legal obligation to take reasonable care of the
           Products while they are in your possession. If you fail to comply with
           this obligation and return the Products to us, we may have a right of
           action against you for compensation. When returning a Product to us, we
           recommend you obtain proof of posting. In all cases, we reserve the
           right to inspect the Product and verify the fault. For an exchange or
           refund, the Product must be in otherwise &apos;as new&apos; condition and if
           possible, with the original packaging. We reserve the right to refuse a
           refund or exchange if the Product returned is deemed to have been
           damaged.
          </p>
          <p>
           The product must be returned in the original and undamaged manufacturer
           packaging/box along with the original tags, user manual, warranty
           cards, freebies and accessories.
          </p>
          <p>
           We do not cover faults caused by misuse, neglect, physical damage,
           tampering or incorrect adjustment or normal wear and tear. Products
           sold on our website are intended for domestic use only and are not for
           commercial use or resale. Nor do we cover faults due to incorrect
           installation in your home. Please do not remove the serial numbers.
          </p>
          <p>
           In case the product was not delivered and you received a delivery
           confirmation email/SMS, report the issue within 15 days from the date
           of delivery confirmation for the seller to investigate.
          </p>
          <p>
           For device-related issues after usage or the expiration of the return
           window, seller warranty or brand warranty could be given by the seller.
           For the seller&apos;s warranty, please contact the seller. For more
           information on warranty claims please view our Warranty Policy.
          </p>
         </div>
        </section>

        {/* Section 2: Warranty Policy */}
        <section id="warranty-policy" className="section">
         <h2 className="section-title">
          <span className="section-number">2</span>
          WARRANTY POLICY
         </h2>
         <div className="section-content">
          <p>
           If a warranty is offered on a product, the warranty period will be
           displayed on the product page. If a product is sold by multiple
           vendors, the warranty period offered by each vendor will be displayed.
          </p>

          <h4 style={{ margin: "20px 0 10px", fontSize: "16px", color: "var(--lp-ink)" }}>
           Types of Warranties:
          </h4>
          <p>
           <strong>1. Brand Warranty:</strong> This limited warranty will apply to
           the products. For product defects under normal use circumstances and at
           the discretion of the company, Brand will provide free of charge repair
           and/or replacement services within the warranty period as per the Brand
           warranty policy. Tizaraa will not take any responsibility for the
           after-sale services.
          </p>
          <p>
           <strong>2. Service Warranty:</strong> Tizaraa is not liable to get the
           product serviced from the Merchant. The customer has to visit the
           vendor directly as well with the invoice paper to claim the warranty.
           Please note if any part of the product needs to be replaced for repair
           under their warranty policy, the customer will have to pay for that
           part.
          </p>
         </div>
        </section>

        {/* Section 3: Product Service Policy */}
        <section id="service-policy" className="section">
         <h2 className="section-title">
          <span className="section-number">3</span>
          PRODUCT SERVICE POLICY
         </h2>
         <div className="section-content">
          <p>
           If you bought a product that is eligible for servicing, please send the
           product(s) directly to the Service Center indicated on the warranty
           card included with your product. If there is no warranty card, please
           check the user manual or product packaging for more details.
          </p>
          <p>
           For a prompt warranty claim kindly include all the accessories,
           information included in packaging and proof of purchase from Tizaraa
           (invoice).
          </p>

          <h4 style={{ margin: "20px 0 10px", fontSize: "16px", color: "var(--lp-ink)" }}>
           SERVICE CENTERS
          </h4>
          <p>
           Please refer to the manufacturer (or service center) details on the
           warranty card included with your product or go to your product page on
           tizaraa.com and look for warranty/service center information in the
           &apos;description&apos; tab.
          </p>
          <p>
           If there is no warranty card, please check the user manual or product
           packaging for more details. If your product is within the warranty
           duration and is damaged by mechanical or electrical systems, you don&apos;t
           have to worry about the repairing cost. You will be covered.
          </p>
         </div>
        </section>

        {/* Section 4: Payment Refund Policy */}
        <section id="refund-policy" className="section">
         <h2 className="section-title">
          <span className="section-number">4</span>
          PAYMENT REFUND POLICY
         </h2>
         <div className="section-content">
          <p>
           If your product is eligible for a refund, you can choose your preferred
           refund method based on the table below. The shipping fee is refunded
           along with the amount paid for your returned product except the Bank
           Charges on EMI in case product was shipped properly and customer
           declines during the delivery process.
          </p>
          <p>
           The time required to complete a refund depends on the refund method you
           have selected. Once we have received your product (6 working days) and
           it has undergone a quality control (2 working days), the expected
           refund processing times are as follows:
          </p>

          <div className="refund-table">
           <table style={{ width: "100%" }}>
            <thead>
             <tr>
              <th>PAYMENT METHOD</th>
              <th>REFUND OPTION</th>
              <th>REFUND TIME</th>
             </tr>
            </thead>
            <tbody>
             <tr>
              <td><strong>All Payment Methods</strong></td>
              <td>Refund Voucher</td>
              <td>5-7 working days</td>
             </tr>
             <tr>
              <td><strong>Cash on Delivery (COD)</strong></td>
              <td>Bank Deposit</td>
              <td>5-7 working days</td>
             </tr>
            </tbody>
           </table>
          </div>

          <div className="disclaimer-box" style={{ marginTop: "24px" }}>
           <p style={{ margin: "0 0 10px", fontWeight: "600" }}>
            📌 <strong>Note:</strong> Maximum refund timeline excludes weekends and public holidays.
           </p>
           <p style={{ margin: 0 }}>
            ⚠️ <strong>Important Note:</strong> The Voucher discount code can only be applied once. The
            leftover amount will not be refunded or used for the next purchase even
            if the value of the order is smaller than the voucher value. Tizaraa
            reserves the right to deduct the Bank Charges on EMI if the product
            initiated to deliver as per the order.
           </p>
          </div>
         </div>
        </section>

        {/* Contact box */}
        <section id="contact-us" className="contact-box">
         <h2 className="section-title">Need help with a return or refund?</h2>
         <div className="section-content">
          <p>
           Our support team is available to assist you with any questions regarding
           returns, warranties or refund processing.
          </p>
          <p style={{ margin: "14px 0" }}>
           Email us at <a href="mailto:info@tizaraa.com" style={{ color: "#ffc53d", fontWeight: "700" }}>info@tizaraa.com</a> or
           call our helpline at <strong style={{ color: "#fff" }}>+8801792223444</strong>.
          </p>
          <Link href="/contact" className="contact-button">
           Contact Customer Support
          </Link>
         </div>
        </section>
       </div>
      )}

      {/* Content Bangla */}
      {language === "bangla" && (
       <div className="terms-body-bangla">
        {/* Introduction */}
        <section id="bn-introduction" className="section">
         <div className="section-content">
          <p>
           আপনার ক্রয়ের জন্য ধন্যবাদ। আমরা আশা করি আপনি আপনার ক্রয় নিয়ে খুশি।
           তবে, যদি আপনি কোনও কারণে আপনার ক্রয় নিয়ে সম্পূর্ণ সন্তুষ্ট না হন, তবে
           আপনি সম্পূর্ণ অর্থ ফেরত বা বিনিময়ের জন্য এটি আমাদের কাছে ফেরত দিতে
           পারেন। ডেলিভারির সময় আপনার পণ্য ক্ষতিগ্রস্ত, ত্রুটিপূর্ণ, ভুল বা
           অসম্পূর্ণ হলে, অনুগ্রহ করে ৩ দিনের মধ্যে অ্যাপ বা ওয়েবসাইটে রিটার্ন
           অনুরোধ দাখিল করুন। আমাদের রিটার্ন এবং রিফান্ড নীতি সম্পর্কে আরও তথ্যের
           জন্য নীচে দেখুন।
          </p>
          <p>
           আপনি যদি কোনও পণ্য আমাদের কাছে ফেরত দিতে চান তবে আপনি আমাদের ওয়েবসাইটের
           মাধ্যমে, ইমেল <a href="mailto:info@tizaraa.com">info@tizaraa.com</a> এর
           মাধ্যমে অথবা আমাদের ফোন নম্বরে (<strong>+৮৮০১৭৯২২২৩৪৪৪</strong>) কল করে
           আমাদের সাথে যোগাযোগ করতে পারেন। তারপরে আমরা আপনাকে পণ্যটি আমাদের কাছে ফেরত
           দেওয়ার ব্যবস্থা সম্পর্কে অবহিত করব।
          </p>
         </div>
        </section>

        {/* Section 1: General Rules Bangla */}
        <section id="bn-general-rules" className="section">
         <h2 className="section-title">
          <span className="section-number">১</span>
          সফল রিটার্নের জন্য সাধারণ নিয়মাবলী
         </h2>
         <div className="section-content">
          <p>
           নীচের শর্তাবলীর সাপেক্ষে, যদি আপনি বিশ্বাস করেন যে আপনি আমাদের কাছ থেকে
           অর্ডার করা কোনও পণ্য ত্রুটিপূর্ণ, তবে আপনাকে আমাদের ওয়েবসাইটের মাধ্যমে
           বা ইমেলের মাধ্যমে বা গ্রাহক কল সেন্টারে (যোগাযোগ করুন বিভাগে বিশদ
           উপলব্ধ) টেলিফোন করে আমাদের সাথে যোগাযোগ করতে হবে। আমরা আপনাকে উপযুক্ত
           পদক্ষেপ গ্রহণের পরামর্শ দেব। যদি আপনি পণ্য ডেলিভারির ৩ দিনের মধ্যে
           আমাদের জানান যে পণ্যটি ত্রুটিপূর্ণ, তবে আপনার মেরামত, বিনিময় বা ফেরত
           নির্বাচন করার বিকল্প থাকবে। পণ্য ডেলিভারির ৩ দিন পর যদি কোনও ত্রুটি
           পাওয়া যায়, তবে আপনাকে টেলিফোন করে আমাদের সাথে যোগাযোগ করতে হবে এবং
           আমরা আমাদের বিবেচনার ভিত্তিতে হয় পণ্যটি মেরামত বা প্রতিস্থাপন করব এবং
           মেরামত করা বা প্রতিস্থাপিত পণ্যটি আপনাকে সরবরাহ করব, অথবা ফেরত দেব।
          </p>
          <p>
           গ্রাহকদের কাছে পণ্য থাকার সময় তাদের যুক্তিসঙ্গত যত্ন নেওয়ার আইনি
           বাধ্যবাধকতা রয়েছে। আপনি যদি এই বাধ্যবাধকতা মেনে চলতে ব্যর্থ হন এবং
           পণ্যগুলি আমাদের কাছে ফেরত দেন, তবে আমাদের ক্ষতিপূরণের জন্য আপনার
           বিরুদ্ধে আইনি ব্যবস্থা নেওয়ার অধিকার থাকতে পারে। আমাদের কাছে পণ্য ফেরত
           দেওয়ার সময়, আমরা আপনাকে পোস্ট করার প্রমাণ নেওয়ার পরামর্শ দিই। সমস্ত
           ক্ষেত্রে, আমরা পণ্যটি পরিদর্শন করার এবং ত্রুটি যাচাই করার অধিকার
           সংরক্ষণ করি। বিনিময় বা ফেরতের জন্য, পণ্যটি অন্যথায় &apos;যেমন নতুন&apos;
           অবস্থায় থাকতে হবে এবং সম্ভব হলে, মূল প্যাকেজিং সহ। ফেরত দেওয়া পণ্যটি
           ক্ষতিগ্রস্ত বলে মনে হলে আমরা ফেরত বা বিনিময় প্রত্যাখ্যান করার অধিকার
           সংরক্ষণ করি।
          </p>
          <p>
           পণ্যটি অবশ্যই মূল এবং অক্ষত প্রস্তুতকারকের প্যাকেজিং/বক্সের মধ্যে মূল
           ট্যাগ, ব্যবহারকারীর ম্যানুয়াল, ওয়ারেন্টি কার্ড, ফ্রিবি এবং আনুষাঙ্গিক
           সহ ফেরত দিতে হবে।
          </p>
          <p>
           আমরা অপব্যবহার, অবহেলা, শারীরিক ক্ষতি, কারসাজি বা ভুল সমন্বয় বা
           স্বাভাবিক পরিধান এবং টিয়ার কারণে সৃষ্ট ত্রুটিগুলি কভার করি না। আমাদের
           ওয়েবসাইটে বিক্রি হওয়া পণ্যগুলি শুধুমাত্র ঘরোয়া ব্যবহারের জন্য এবং
           বাণিজ্যিক ব্যবহার বা পুনঃ বিক্রয়ের জন্য নয়। আমরা আপনার বাড়িতে ভুল
           ইনস্টলেশনের কারণে সৃষ্ট ত্রুটিগুলিও কভার করি না। অনুগ্রহ করে সিরিয়াল
           নম্বরগুলি সরিয়ে ফেলবেন না।
          </p>
          <p>
           যদি পণ্যটি সরবরাহ করা না হয় এবং আপনি একটি ডেলিভারি নিশ্চিতকরণ
           ইমেল/এসএমএস পান, তবে বিক্রেতার তদন্তের জন্য ডেলিভারি নিশ্চিতকরণের তারিখ
           থেকে ১৫ দিনের মধ্যে সমস্যাটি জানান।
          </p>
          <p>
           ব্যবহারের পরে বা রিটার্ন উইন্ডো শেষ হওয়ার পরে ডিভাইস-সম্পর্কিত
           সমস্যাগুলির জন্য, বিক্রেতা ওয়ারেন্টি বা ব্র্যান্ড ওয়ারেন্টি বিক্রেতা
           কর্তৃক দেওয়া হতে পারে। বিক্রেতার ওয়ারেন্টির জন্য, অনুগ্রহ করে
           বিক্রেতার সাথে যোগাযোগ করুন। ওয়ারেন্টি দাবি সম্পর্কে আরও তথ্যের জন্য
           অনুগ্রহ করে আমাদের ওয়ারেন্টি নীতি দেখুন।
          </p>
         </div>
        </section>

        {/* Section 2: Warranty Policy Bangla */}
        <section id="bn-warranty-policy" className="section">
         <h2 className="section-title">
          <span className="section-number">২</span>
          ওয়ারেন্টি নীতি
         </h2>
         <div className="section-content">
          <p>
           যদি কোনও পণ্যের উপর ওয়ারেন্টি দেওয়া হয়, তবে ওয়ারেন্টি সময়কাল
           পণ্যের পৃষ্ঠায় প্রদর্শিত হবে। যদি একাধিক বিক্রেতা কর্তৃক কোনও পণ্য
           বিক্রি করা হয়, তবে প্রতিটি বিক্রেতা কর্তৃক প্রদত্ত ওয়ারেন্টি সময়কাল
           প্রদর্শিত হবে।
          </p>

          <h4 style={{ margin: "20px 0 10px", fontSize: "16px", color: "var(--lp-ink)" }}>
           ওয়ারেন্টির প্রকারভেদ:
          </h4>
          <p>
           <strong>১. ব্র্যান্ড ওয়ারেন্টি:</strong> এই সীমিত ওয়ারেন্টি পণ্যগুলিতে
           প্রযোজ্য হবে। স্বাভাবিক ব্যবহারের পরিস্থিতিতে এবং কোম্পানির বিবেচনার
           ভিত্তিতে পণ্যের ত্রুটির জন্য, ব্র্যান্ড ব্র্যান্ড ওয়ারেন্টি নীতি
           অনুসারে ওয়ারেন্টি সময়কালের মধ্যে বিনামূল্যে মেরামত এবং/অথবা
           প্রতিস্থাপন পরিষেবা সরবরাহ করবে। বিক্রয়োত্তর পরিষেবাগুলির জন্য টিজারা
           কোনও দায় নেবে না।
          </p>
          <p>
           <strong>২. পরিষেবা ওয়ারেন্টি:</strong> টিজারা বণিকের কাছ থেকে পণ্য
           পরিষেবা করার জন্য দায়বদ্ধ নয়। ওয়ারেন্টি দাবি করার জন্য গ্রাহককে
           চালানপত্র সহ সরাসরি বিক্রেতার কাছে যেতে হবে। অনুগ্রহ করে মনে রাখবেন যে
           তাদের ওয়ারেন্টি নীতির অধীনে মেরামতের জন্য পণ্যের কোনও অংশ
           প্রতিস্থাপনের প্রয়োজন হলে, গ্রাহককে সেই অংশের জন্য অর্থ প্রদান করতে
           হবে।
          </p>
         </div>
        </section>

        {/* Section 3: Product Service Policy Bangla */}
        <section id="bn-service-policy" className="section">
         <h2 className="section-title">
          <span className="section-number">৩</span>
          পণ্য পরিষেবা নীতি
         </h2>
         <div className="section-content">
          <p>
           আপনি যদি এমন কোনও পণ্য কিনে থাকেন যা পরিষেবার জন্য যোগ্য, তবে অনুগ্রহ
           করে আপনার পণ্যের সাথে অন্তর্ভুক্ত ওয়ারেন্টি কার্ডে নির্দেশিত পরিষেবা
           কেন্দ্রে সরাসরি পণ্য(গুলি) পাঠান। যদি কোনও ওয়ারেন্টি কার্ড না থাকে,
           তবে আরও বিস্তারিত জানার জন্য ব্যবহারকারীর ম্যানুয়াল বা পণ্যের
           প্যাকেজিং পরীক্ষা করুন।
          </p>
          <p>
           দ্রুত ওয়ারেন্টি দাবির জন্য অনুগ্রহ করে প্যাকেজিংয়ে অন্তর্ভুক্ত সমস্ত
           আনুষাঙ্গিক, তথ্য এবং টিজারা থেকে ক্রয়ের প্রমাণ (ইনভয়েস) অন্তর্ভুক্ত
           করুন।
          </p>

          <h4 style={{ margin: "20px 0 10px", fontSize: "16px", color: "var(--lp-ink)" }}>
           পরিষেবা কেন্দ্র:
          </h4>
          <p>
           আপনার পণ্যের সাথে অন্তর্ভুক্ত ওয়ারেন্টি কার্ডে প্রস্তুতকারক (বা
           পরিষেবা কেন্দ্র) এর বিবরণ দেখুন অথবা টিজারা ডটকম-এ আপনার পণ্যের
           পৃষ্ঠায় যান এবং &apos;বিবরণ&apos; ট্যাবে ওয়ারেন্টি/পরিষেবা কেন্দ্রের তথ্য
           সন্ধান করুন।
          </p>
          <p>
           যদি কোনও ওয়ারেন্টি কার্ড না থাকে, তবে আরও বিস্তারিত জানার জন্য
           ব্যবহারকারীর ম্যানুয়াল বা পণ্যের প্যাকেজিং পরীক্ষা করুন। যদি আপনার
           পণ্য ওয়ারেন্টি সময়কালের মধ্যে থাকে এবং যান্ত্রিক বা বৈদ্যুতিক
           সিস্টেমের কারণে ক্ষতিগ্রস্ত হয়, তবে আপনাকে মেরামতের খরচ নিয়ে চিন্তা
           করতে হবে না। আপনি কভার হবেন।
          </p>
         </div>
        </section>

        {/* Section 4: Payment Refund Policy Bangla */}
        <section id="bn-refund-policy" className="section">
         <h2 className="section-title">
          <span className="section-number">৪</span>
          পরিশোধ ফেরত নীতি
         </h2>
         <div className="section-content">
          <p>
           যদি আপনার পণ্য ফেরতের জন্য যোগ্য হয়, তবে আপনি নীচের টেবিলের উপর ভিত্তি
           করে আপনার পছন্দের ফেরতের পদ্ধতিটি বেছে নিতে পারেন। আপনার ফেরত দেওয়া
           পণ্যের জন্য পরিশোধিত অর্থের সাথে শিপিং ফি ফেরত দেওয়া হবে, তবে পণ্য
           সঠিকভাবে প্রেরণ করা হলে এবং গ্রাহক ডেলিভারি প্রক্রিয়ার সময়
           প্রত্যাখ্যান করলে ইএমআই-এর উপর ব্যাংক চার্জ ব্যতীত।
          </p>
          <p>
           ফেরত প্রক্রিয়া সম্পন্ন করতে প্রয়োজনীয় সময় আপনার নির্বাচিত ফেরতের
           পদ্ধতির উপর নির্ভর করে। একবার আমরা আপনার পণ্য (৬ কার্যদিবস) পাওয়ার পরে
           এবং এটি গুণমান নিয়ন্ত্রণের (২ কার্যদিবস) মধ্য দিয়ে গেলে, প্রত্যাশিত
           ফেরত প্রক্রিয়াকরণের সময়গুলি নিম্নরূপ:
          </p>

          <div className="refund-table">
           <table style={{ width: "100%" }}>
            <thead>
             <tr>
              <th>পরিশোধের পদ্ধতি</th>
              <th>ফেরতের বিকল্প</th>
              <th>ফেরতের সময়</th>
             </tr>
            </thead>
            <tbody>
             <tr>
              <td><strong>সমস্ত মাধ্যম</strong></td>
              <td>ফেরত ভাউচার</td>
              <td>৫-৭ কার্যদিবস</td>
             </tr>
             <tr>
              <td><strong>ক্যাশ অন ডেলিভারি (সিওডি)</strong></td>
              <td>ব্যাংক ডিপোজিট</td>
              <td>৫-৭ কার্যদিবস</td>
             </tr>
            </tbody>
           </table>
          </div>

          <div className="disclaimer-box" style={{ marginTop: "24px" }}>
           <p style={{ margin: "0 0 10px", fontWeight: "600" }}>
            📌 <strong>দ্রষ্টব্য:</strong> সর্বাধিক ফেরতের সময়সীমার মধ্যে সপ্তাহান্ত এবং সরকারি ছুটি অন্তর্ভুক্ত নয়।
           </p>
           <p style={{ margin: 0 }}>
            ⚠️ <strong>গুরুত্বপূর্ণ দ্রষ্টব্য:</strong> ভাউচার ডিসকাউন্ট কোড শুধুমাত্র একবার ব্যবহার
            করা যাবে। অর্ডারের মূল্য ভাউচারের মূল্যের চেয়ে কম হলেও অবশিষ্ট অর্থ
            ফেরত দেওয়া হবে না বা পরবর্তী ক্রয়ের জন্য ব্যবহার করা যাবে না। টিজারা
            অর্ডার অনুযায়ী পণ্য সরবরাহ শুরু করলে ইএমআই-এর উপর ব্যাংক চার্জ কাটার
            অধিকার সংরক্ষণ করে।
           </p>
          </div>
         </div>
        </section>

        {/* Contact box Bangla */}
        <section id="bn-contact-us" className="contact-box">
         <h2 className="section-title">রিটার্ন বা রিফান্ড সংক্রান্ত কোনো সাহায্য প্রয়োজন?</h2>
         <div className="section-content">
          <p>
           আমাদের কাস্টমার সাপোর্ট টিম যেকোনো রিটার্ন, ওয়ারেন্টি বা রিফান্ড সংক্রান্ত বিষয়ে আপনাকে সাহায্য করতে প্রস্তুত।
          </p>
          <p style={{ margin: "14px 0" }}>
           ইমেইল করুন: <a href="mailto:info@tizaraa.com" style={{ color: "#ffc53d", fontWeight: "700" }}>info@tizaraa.com</a> অথবা
           হেল্পলাইনে কল করুন: <strong style={{ color: "#fff" }}>+৮৮০১৭৯২২২৩৪৪৪</strong>
          </p>
          <Link href="/contact" className="contact-button">
           কাস্টমার সাপোর্টে যোগাযোগ করুন
          </Link>
         </div>
        </section>
       </div>
      )}
     </div>
    </div>
   </div>

   {/* Floating reading pill */}
   <div className={`legal-pill${showPill ? " is-shown" : ""}`} aria-hidden={showPill ? undefined : "true"}>
    <span className="pill-ring">
     <Ring r={11} stroke={3} />
    </span>
    <span className="pill-title">{activeTitle}</span>
    <span className="pill-pct" data-pct="">0%</span>
    <button
     type="button"
     className="pill-top"
     aria-label="Back to top"
     tabIndex={showPill ? 0 : -1}
     onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" })}
    >
     ↑
    </button>
   </div>
  </div>
 );
}
