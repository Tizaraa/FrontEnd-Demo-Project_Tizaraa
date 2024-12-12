"use client";

import { useEffect } from "react";

interface GoogleTranslateProps {
  onLanguageChange: (languageName: string) => void;
}

const GoogleTranslate = ({ onLanguageChange }: GoogleTranslateProps) => {
  useEffect(() => {
    // Function to handle the language change from Google Translate
    const handleLanguageChange = () => {
      const googleTranslateDropdown = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (googleTranslateDropdown) {
        const selectedLanguage = googleTranslateDropdown.options[googleTranslateDropdown.selectedIndex].text;
        // Save the selected language in localStorage
        localStorage.setItem("selectedLanguage", selectedLanguage);
        // Notify parent component about the language change
        onLanguageChange(selectedLanguage);
      }
    };

    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;

      // Initialize Google Translate
      window.googleTranslateElementInit = function () {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "", // Add specific languages if needed
            },
            "google_translate_element"
          );
        }

        // Add event listener to Google Translate dropdown
        const googleTranslateDropdown = document.querySelector(".goog-te-combo") as HTMLSelectElement;
        if (googleTranslateDropdown) {
          googleTranslateDropdown.addEventListener("change", handleLanguageChange);
        }

        // Check if a language is stored in localStorage and set it
        const savedLanguage = localStorage.getItem("selectedLanguage");
        if (savedLanguage) {
          const googleTranslateDropdown = document.querySelector(".goog-te-combo") as HTMLSelectElement;
          const option = Array.from(googleTranslateDropdown.options).find(
            (option) => option.text === savedLanguage
          );
          if (option) {
            googleTranslateDropdown.value = option.value;
            googleTranslateDropdown.dispatchEvent(new Event("change"));
          }
        }
      };

      // Append the Google Translate script to the document
      document.body.appendChild(script);

      // Cleanup on unmount
      return () => {
        document.body.removeChild(script);
        const googleTranslateDropdown = document.querySelector(".goog-te-combo") as HTMLSelectElement;
        if (googleTranslateDropdown) {
          googleTranslateDropdown.removeEventListener("change", handleLanguageChange);
        }
      };
    }
  }, [onLanguageChange]);

  return (
    <>
      <div id="google_translate_element" style={{ display: "block" }} />

      <style jsx global>{`
        /* Completely hide the Google Translate banner and elements */
        .goog-logo-link,
        .goog-te-banner-frame,
        #goog-gt-tt,
        .goog-te-balloon-frame,
        iframe,
        .goog-te-gadget span {
          display: none !important;
        }

        /* Disable unwanted elements */
        body > .goog-te-banner-frame {
          display: none !important;
        }

        /* Prevent the body from shifting */
        body {
          top: 0 !important;
        }
      `}</style>
    </>
  );
};

export default GoogleTranslate;
