"use client";

import { useState, useEffect, useRef } from "react";
import { Check, ChevronDown, Globe, Search, X } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the Google Translate element
const GoogleTranslate = dynamic(() => import("./GoogleTranslate"), {
 ssr: false,
});

// Shown first; names match Google Translate's option text so the saved language lines up
const POPULAR = [
 { code: "en", name: "English", native: "English" },
 { code: "bn", name: "Bengali", native: "বাংলা" },
 { code: "hi", name: "Hindi", native: "हिन्दी" },
 { code: "ar", name: "Arabic", native: "العربية" },
 { code: "ur", name: "Urdu", native: "اردو" },
 { code: "zh-CN", name: "Chinese (Simplified)", native: "中文" },
];

type Lang = { code: string; name: string };

export default function LanguageSelector() {
 const [isOpen, setIsOpen] = useState(false);
 const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
 const [query, setQuery] = useState("");
 const [allLanguages, setAllLanguages] = useState<Lang[]>([]);
 const dropdownRef = useRef<HTMLDivElement>(null);

 // Google's hidden <select> loads a moment after the popup opens; read its languages for the list
 useEffect(() => {
  if (!isOpen) return;
  setQuery("");
  const timer = setInterval(() => {
   const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
   if (combo && combo.options.length > 1) {
    setAllLanguages(
     Array.from(combo.options)
      .filter((o) => o.value)
      .map((o) => ({ code: o.value, name: o.text }))
    );
    clearInterval(timer);
   }
  }, 300);
  const stop = setTimeout(() => clearInterval(timer), 15000);
  const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
  document.addEventListener("keydown", onKey);
  return () => {
   clearInterval(timer);
   clearTimeout(stop);
   document.removeEventListener("keydown", onKey);
  };
 }, [isOpen]);

 // English is the page's own language: drop Google's translation cookie and reload the original
 const resetToEnglish = () => {
  localStorage.setItem("selectedLanguage", "English");
  const expire = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  document.cookie = expire;
  document.cookie = `${expire}; domain=${window.location.hostname}`;
  document.cookie = `${expire}; domain=.${window.location.hostname.split(".").slice(-2).join(".")}`;
  window.location.reload();
 };

 const pick = (lang: Lang) => {
  setIsOpen(false);
  if (lang.code === "en") {
   if (selectedLanguage !== "English") resetToEnglish();
   return;
  }
  handleLanguageChange(lang.code, lang.name);
 };

 const q = query.trim().toLowerCase();
 const popular = POPULAR.filter(
  (l) => !q || l.name.toLowerCase().includes(q) || l.native.toLowerCase().includes(q)
 );
 const others = allLanguages.filter(
  (l) => !POPULAR.some((p) => p.code === l.code) && (!q || l.name.toLowerCase().includes(q))
 );

 // Hide the Google Translate bar if the user isn't interacting with it
 const hideGoogleTranslateBar = () => {
  const googleLogoLink = document.querySelector(
   ".goog-logo-link"
  ) as HTMLElement;
  if (googleLogoLink) googleLogoLink.style.display = "none";

  const banner = document.querySelector(".goog-te-banner-frame") as HTMLElement;
  if (banner) banner.style.display = "none";

  const balloonFrame = document.querySelector(
   ".goog-te-balloon-frame"
  ) as HTMLElement;
  if (balloonFrame) balloonFrame.style.display = "none";

  const tooltip = document.querySelector("#goog-gt-tt") as HTMLElement;
  if (tooltip) tooltip.style.display = "none";

  const iframes = document.querySelectorAll("iframe");
  iframes.forEach((iframe) => {
   (iframe as HTMLElement).style.display = "none";
  });

  const gadgetSpans = document.querySelectorAll(".goog-te-gadget span");
  gadgetSpans.forEach((span) => {
   (span as HTMLElement).style.display = "none";
  });

  document.body.style.top = "0";
 };

 // Effect to hide the Google Translate bar when clicking outside the dropdown
 useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
   if (
    dropdownRef.current &&
    !dropdownRef.current.contains(event.target as Node)
   ) {
    setIsOpen(false);
    hideGoogleTranslateBar();
   }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
   document.removeEventListener("mousedown", handleClickOutside);
  };
 }, []);

 // Effect to initialize the selected language from localStorage on page load
 useEffect(() => {
  const storedLanguage = localStorage.getItem("selectedLanguage");
  if (storedLanguage) {
   setSelectedLanguage(storedLanguage);
  }
 }, []);

 // Effect to trigger Google Translate language change when selectedLanguage changes
 useEffect(() => {
  const googleTranslateElement = document.querySelector(
   ".goog-te-combo"
  ) as HTMLSelectElement;
  if (googleTranslateElement && selectedLanguage) {
   // Set the value based on the selected language
   googleTranslateElement.value = selectedLanguage;

   // Explicitly trigger the "change" event to update the translation
   googleTranslateElement.dispatchEvent(new Event("change"));
  }
 }, [selectedLanguage]);

 // Handle language change from dropdown
 const handleLanguageChange = (languageCode: string, languageName: string) => {
  setSelectedLanguage(languageName);

  // Save the selected language in localStorage
  localStorage.setItem("selectedLanguage", languageName);

  // Trigger Google Translate language change
  const googleTranslateElement = document.querySelector(
   ".goog-te-combo"
  ) as HTMLSelectElement;
  if (googleTranslateElement) {
   googleTranslateElement.value = languageCode;
   googleTranslateElement.dispatchEvent(new Event("change"));
  }

  hideGoogleTranslateBar();
 };

 const row = (lang: Lang, native?: string) => {
  const active = lang.name === selectedLanguage;
  return (
   <li key={lang.code}>
    <button
     type="button"
     role="option"
     aria-selected={active}
     className={`ls-row${active ? " is-active" : ""}`}
     onClick={() => pick(lang)}
    >
     <span className="ls-names">
      <span className="ls-native">{native ?? lang.name}</span>
      {native && native !== lang.name && <span className="ls-en">{lang.name}</span>}
     </span>
     {active && <Check className="ls-check" aria-hidden="true" />}
    </button>
   </li>
  );
 };

 return (
  <div ref={dropdownRef} className="ls" translate="no">
   <button
    type="button"
    className="ls-trigger"
    aria-haspopup="listbox"
    aria-expanded={isOpen}
    onClick={() => setIsOpen((prev) => !prev)}
   >
    <Globe className="ls-ico" aria-hidden="true" />
    <span>{selectedLanguage}</span>
    <ChevronDown className={`ls-chev${isOpen ? " is-open" : ""}`} aria-hidden="true" />
   </button>

   {isOpen && (
    <div className="ls-pop" role="dialog" aria-label="Choose language">
     <div className="ls-head">
      <span className="ls-badge">
       <Globe aria-hidden="true" />
      </span>
      <div className="ls-title">
       <strong>Choose language</strong>
       <span>The whole site is translated for you</span>
      </div>
      <button type="button" className="ls-close" aria-label="Close" onClick={() => setIsOpen(false)}>
       <X aria-hidden="true" />
      </button>
     </div>

     <label className="ls-search">
      <Search aria-hidden="true" />
      <input
       autoFocus
       type="text"
       value={query}
       onChange={(e) => setQuery(e.target.value)}
       placeholder="Search language"
       aria-label="Search language"
      />
     </label>

     <div className="ls-list" role="listbox" aria-label="Languages">
      {popular.length > 0 && (
       <>
        <p className="ls-label">Popular</p>
        <ul>{popular.map((l) => row(l, l.native))}</ul>
       </>
      )}
      {others.length > 0 && (
       <>
        <p className="ls-label">All languages</p>
        <ul>{others.map((l) => row(l))}</ul>
       </>
      )}
      {allLanguages.length === 0 && !q && <p className="ls-empty">Loading more languages…</p>}
      {q && popular.length === 0 && others.length === 0 && (
       <p className="ls-empty">No language matches “{query}”</p>
      )}
     </div>

     <p className="ls-foot">Powered by Google Translate</p>

     {/* Google's own widget stays mounted but hidden; the list above drives it */}
     <div className="ls-engine" aria-hidden="true">
      <GoogleTranslate onLanguageChange={setSelectedLanguage} />
     </div>
    </div>
   )}

   <style jsx>{`
    .ls {
     position: relative;
    }
    .ls-trigger {
     display: inline-flex;
     align-items: center;
     gap: 8px;
     padding: 6px 4px;
     border: 0;
     background: none;
     color: inherit;
     font: inherit;
     font-weight: 600;
     cursor: pointer;
    }
    .ls-trigger :global(.ls-ico) {
     width: 20px;
     height: 20px;
    }
    .ls-trigger :global(.ls-chev) {
     width: 16px;
     height: 16px;
     transition: transform 200ms ease;
    }
    .ls-trigger :global(.ls-chev.is-open) {
     transform: rotate(180deg);
    }
    .ls-pop {
     position: absolute;
     right: 0;
     top: calc(100% + 10px);
     z-index: 1600; /* above the sticky header (1100, 1500 when fixed) */
     width: min(320px, calc(100vw - 32px));
     display: flex;
     flex-direction: column;
     overflow: hidden;
     border: 1px solid #eceef3;
     border-radius: 16px;
     background: #fff;
     color: #1f2330;
     box-shadow: 0 24px 48px -12px rgba(20, 21, 32, 0.28), 0 2px 6px rgba(20, 21, 32, 0.06);
     animation: ls-in 180ms cubic-bezier(0.22, 1, 0.36, 1) both;
    }
    @keyframes ls-in {
     from {
      opacity: 0;
      transform: translateY(-6px) scale(0.98);
     }
    }
    .ls-head {
     display: flex;
     align-items: center;
     gap: 12px;
     padding: 16px 16px 12px;
    }
    .ls-badge {
     display: grid;
     place-items: center;
     flex-shrink: 0;
     width: 40px;
     height: 40px;
     border-radius: 12px;
     background: var(--tz-ember-tint, #fff1ea);
     color: var(--tz-ember-deep, #c2400f);
    }
    .ls-badge :global(svg) {
     width: 20px;
     height: 20px;
    }
    .ls-title {
     display: flex;
     flex: 1;
     flex-direction: column;
     min-width: 0;
    }
    .ls-title strong {
     font-size: 15px;
     font-weight: 700;
    }
    .ls-title span {
     font-size: 12px;
     color: #6b7280;
    }
    .ls-close {
     display: grid;
     place-items: center;
     width: 32px;
     height: 32px;
     border: 0;
     border-radius: 999px;
     background: #f4f5f8;
     color: #4b5563;
     cursor: pointer;
    }
    .ls-close:hover {
     background: #eceef3;
    }
    .ls-close :global(svg) {
     width: 16px;
     height: 16px;
    }
    .ls-search {
     display: flex;
     align-items: center;
     gap: 8px;
     margin: 0 16px 8px;
     padding: 0 12px;
     height: 40px;
     border: 1px solid #e3e6ee;
     border-radius: 10px;
     background: #f8f9fb;
     color: #9aa1af;
     transition: border-color 150ms, box-shadow 150ms;
    }
    .ls-search:focus-within {
     border-color: var(--tz-ember-deep, #c2400f);
     box-shadow: 0 0 0 3px rgba(194, 64, 15, 0.12);
     background: #fff;
    }
    .ls-search :global(svg) {
     width: 16px;
     height: 16px;
     flex-shrink: 0;
    }
    .ls-search input {
     flex: 1;
     min-width: 0;
     border: 0;
     outline: 0;
     background: transparent;
     color: #1f2330;
     font: inherit;
     font-size: 14px;
    }
    .ls-list {
     max-height: min(340px, 50vh);
     overflow-y: auto;
     padding: 0 8px 8px;
     overscroll-behavior: contain;
    }
    .ls-list ul {
     margin: 0;
     padding: 0;
     list-style: none;
    }
    .ls-label {
     margin: 10px 8px 4px;
     font-size: 11px;
     font-weight: 700;
     letter-spacing: 0.06em;
     text-transform: uppercase;
     color: #9aa1af;
    }
    .ls-row {
     display: flex;
     align-items: center;
     justify-content: space-between;
     gap: 8px;
     width: 100%;
     min-height: 44px;
     padding: 8px 10px;
     border: 0;
     border-radius: 10px;
     background: none;
     color: inherit;
     font: inherit;
     text-align: left;
     cursor: pointer;
     transition: background 120ms;
    }
    .ls-row:hover,
    .ls-row:focus-visible {
     background: #f4f5f8;
     outline: none;
    }
    .ls-row.is-active {
     background: var(--tz-ember-tint, #fff1ea);
     color: var(--tz-ember-deep, #c2400f);
    }
    .ls-names {
     display: flex;
     flex-direction: column;
     min-width: 0;
    }
    .ls-native {
     font-size: 14px;
     font-weight: 600;
    }
    .ls-en {
     font-size: 12px;
     color: #8a91a0;
    }
    .ls-row :global(.ls-check) {
     width: 18px;
     height: 18px;
     flex-shrink: 0;
    }
    .ls-empty {
     margin: 12px 8px;
     font-size: 13px;
     color: #8a91a0;
    }
    .ls-foot {
     margin: 0;
     padding: 10px 16px;
     border-top: 1px solid #f0f1f5;
     font-size: 11px;
     color: #9aa1af;
     text-align: center;
    }
    .ls-engine {
     position: absolute;
     width: 1px;
     height: 1px;
     overflow: hidden;
     clip: rect(0 0 0 0);
     white-space: nowrap;
    }
    @media (prefers-reduced-motion: reduce) {
     .ls-pop,
     .ls-trigger :global(.ls-chev) {
      animation: none;
      transition: none;
     }
    }
   `}</style>
  </div>
 );
}
