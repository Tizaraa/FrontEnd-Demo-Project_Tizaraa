"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Globe } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the Google Translate element
const GoogleTranslate = dynamic(() => import("./GoogleTranslate"), { ssr: false });

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Hide the Google Translate bar if the user isn't interacting with it
  const hideGoogleTranslateBar = () => {
    const googleLogoLink = document.querySelector(".goog-logo-link") as HTMLElement;
    if (googleLogoLink) googleLogoLink.style.display = "none";

    const banner = document.querySelector(".goog-te-banner-frame") as HTMLElement;
    if (banner) banner.style.display = "none";

    const balloonFrame = document.querySelector(".goog-te-balloon-frame") as HTMLElement;
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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
    const googleTranslateElement = document.querySelector(".goog-te-combo") as HTMLSelectElement;
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
    const googleTranslateElement = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (googleTranslateElement) {
      googleTranslateElement.value = languageCode;
      googleTranslateElement.dispatchEvent(new Event("change"));
    }

    hideGoogleTranslateBar();
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      {/* Trigger */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
        }}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Globe style={{ width: "20px", height: "20px" }} />
        <span translate="no" style={{ fontWeight: "600" }}>{selectedLanguage}</span>
        <ChevronDown style={{ width: "16px", height: "16px" }} />
      </div>

      {/* Dropdown only shows when user clicks */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            left: "-192px",
            marginTop: "8px",
            width: "300px",
            backgroundColor: "#ffffff",
            border: "1px solid #d1d5db",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 50,
          }}
          translate="no"
        >
          <div style={{ padding: "16px" }}>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "700",
                marginBottom: "4px",
                color: "black",
              }}
            >
              Set language
            </h3>
            <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
              Select your preferred language. You can update the settings at any time.
            </p>

            {/* Google Translate Dropdown */}
            <div style={{ marginBottom: "8px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#374151",
                }}
              >
                Language
              </label>
              {/* Pass the state updater to GoogleTranslate */}
              <GoogleTranslate onLanguageChange={setSelectedLanguage} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
