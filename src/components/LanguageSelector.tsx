"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the Google Translate element
const GoogleTranslate = dynamic(() => import("./GoogleTranslate"), { ssr: false });

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to handle language selection
  const handleLanguageChange = (languageCode: string, languageName: string) => {
    setSelectedLanguage(languageName);

    // Google Translate functionality
    const googleTranslateElement = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (googleTranslateElement) {
      googleTranslateElement.value = languageCode; // Set the selected language code
      googleTranslateElement.dispatchEvent(new Event("change")); // Trigger the translation
    }
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

      {/* Dropdown */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            left: "-192px", // Adjust positioning for the initial state
            marginTop: "8px",
            width: "300px",
            backgroundColor: "#ffffff",
            border: "1px solid #d1d5db",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 50,
          }}
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
              <GoogleTranslate></GoogleTranslate>
              {/* <select
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "0.875rem",
                  color: "#374151",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                }}
                onChange={(e) => {
                  const selectedOption = e.target.options[e.target.selectedIndex];
                  handleLanguageChange(e.target.value, selectedOption.text);
                }}
                value={selectedLanguage}
              >
                <option value="">Select Language</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="zh-CN">Chinese</option>
                <option value="ar">Arabic</option>
              </select> */}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
