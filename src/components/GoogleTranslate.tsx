// "use client";
// import { useEffect, useState } from "react";
// import FlexBox from "./FlexBox";

// declare global {
//     interface Window {
//         google?: {
//             translate: {
//                 TranslateElement: new (
//                     options: { pageLanguage: string; includedLanguages?: string },
//                     elementId: string
//                 ) => void;
//             };
//         };
//         googleTranslateElementInit?: () => void;
//     }
// }

// const GoogleTranslate = () => {
//     const [selectedLanguage, setSelectedLanguage] = useState<string>("");

//     useEffect(() => {
//         const addScript = () => {
//             // Define the initialization function
//             window.googleTranslateElementInit = function () {
//                 if (window.google && window.google.translate) {
//                     new window.google.translate.TranslateElement(
//                         {
//                             pageLanguage: "", // Leave empty to auto-detect the page language
//                         },
//                         "google_translate_element"
//                     );
//                 }
//             };

//             // Dynamically add the script
//             const script = document.createElement("script");
//             script.type = "text/javascript";
//             script.src =
//                 "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//             script.async = true;
//             document.body.appendChild(script);
//         };

//         addScript();

//         // Cleanup: Remove the script and the global function
//         return () => {
//             delete window.googleTranslateElementInit;
//             const script = document.querySelector(
//                 "script[src='https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit']"
//             );
//             if (script) {
//                 document.body.removeChild(script);
//             }
//         };
//     }, []);

//     useEffect(() => {
//         // Function to update the selected language and display it in English format
//         const updateSelectedLanguage = () => {
//             const languageElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    
//             if (languageElement && languageElement.options.length > 0) {
//                 const languageName = languageElement.options[languageElement.selectedIndex]?.text || "Select Language";
//                 setSelectedLanguage(languageName); // Update the selected language state with the name
//             }
//         };
    
//         // Poll for changes every 500ms to check the selected language
//         const interval = setInterval(updateSelectedLanguage, 500);
    
//         // Clean up the interval when the component unmounts
//         return () => {
//             clearInterval(interval);
//         };
//     }, []);
    
//     return (
//         <>
//             <FlexBox alignItems="center" ml="20px">
//                 <FlexBox alignItems="center" className="language-container">
//                     {/* Apply the goog-te-ignore class to prevent translation */}
//                     <span translate="no">
//                         {selectedLanguage || "Select Language"}
//                     </span> 
//                     <div id="google_translate_element" className="google-translate-dropdown" />
//                 </FlexBox>
//             </FlexBox>

//             <style jsx global>{`
//                 /* Container for the Language text */
//                 .language-container {
//                     position: relative;
//                     display: inline-block;
//                     cursor: pointer;
//                 }

//                 /* Google Translate dropdown hidden by default */
//  .goog-te-gadget {
//     display: none !important;
//     position: absolute;
//     top: 20px; /* Adjust the dropdown position */
//     left: -80px;
//     background-color: white;
//     border: 1px solid #ccc;
//     border-radius: 4px;
//     box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
//     z-index: 10;
//     padding: 10px;
// }

// /* Adding content using the ::before pseudo-element */

// /* Adjusting style for the second line */
// .goog-te-gadget::before {
//     content: "Select your preferred language"; 
//     font-size: 13px;
//     font-weight: bold;
//     color: #333;
//     white-space: pre-wrap;
//     display: block;
// }





//                 /* Show the dropdown when hovering over the container or dropdown */
//                 .language-container:hover .goog-te-gadget,
//                 .goog-te-gadget:hover {
//                     display: block !important;
//                 }

//                 /* Adjust dropdown styles */
//                 .goog-te-combo {
//                     font-size: 16px;
//                     color: #000 !important; /* Dropdown text color */
//                     border: 1px solid #ccc; /* Add border */
//                     border-radius: 4px;
//                     padding: 5px;
//                 }

//                 /* Hide the Google Translate branding and other elements */
//                 .goog-logo-link, 
//                 .goog-te-banner-frame, 
//                 #goog-gt-tt, 
//                 .goog-te-balloon-frame, 
//                 .goog-te-gadget span,
//                 iframe {
//                     display: none !important;
//                 }

//                 /* Prevent the banner from appearing on language selection */
//                 body > .goog-te-banner-frame {
//                     display: none !important;
//                 }

//                 /* Ensure the main body doesn't shift */
//                 body {
//                     top: 0 !important;
//                 }

//                 /* Hide the Google Translate branding and other elements */
//                 .goog-logo-link, 
//                 .goog-te-banner-frame, 
//                 #goog-gt-tt, 
//                 .goog-te-balloon-frame, 
//                 .goog-te-gadget span,
//                 iframe {
//                     display: none !important;
//                 }

//                 /* Keep only the language dropdown */
//                 .goog-te-gadget {
//                     color: transparent !important; /* Hide text like 'Select Language' */
//                 }

//                 /* Adjust dropdown styles if necessary */
//                 .goog-te-combo {
//                     font-size: 16px;
//                     color: #000 !important; /* Dropdown text color */
//                     border: 1px solid #ccc; /* Add border */
//                     border-radius: 4px;
//                     padding: 5px;
//                 }

//                 /* Custom margin for the dropdown */
//                 .goog-te-gadget .goog-te-combo {
//                     margin: 4px 0 !important; /* Override other styles */
//                     margin-top: 20px !important; /* Set proper spacing from the top */
//                 }

//                 /* Prevent the banner from appearing on language selection */
//                 body > .goog-te-banner-frame {
//                     display: none !important;
//                 }

//                 /* Ensure the main body doesn't shift */
//                 body {
//                     top: 0 !important;
//                 }
//             `}</style>
//         </>
//     );
// };

// export default GoogleTranslate;

"use client";

import { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;

      window.googleTranslateElementInit = function () {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "",
            },
            "google_translate_element"
          );

          // Check if a language is saved in localStorage and apply it
          const savedLanguage = localStorage.getItem("selectedLanguage");
          if (savedLanguage) {
            // Apply saved language
            window.google.translate.TranslateElement.prototype
              .hideBanner();
            window.google.translate.TranslateElement.prototype
              .setLang(savedLanguage);
          }

          // Listen for language change and save it to localStorage
          const translateElement = window.google.translate.TranslateElement.prototype;
          translateElement.setLang = (lang: string) => {
            // Save language to localStorage
            localStorage.setItem("selectedLanguage", lang);
            translateElement.setLang.call(translateElement, lang);
          };
        }
      };

      // Append script to body
      document.body.appendChild(script);

      // Cleanup on unmount
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <>
      <div
        id="google_translate_element"
        style={{ display: "block" }} // Make sure the element is displayed
      />

      <style jsx global>{`
        /* Hide the Google Translate branding and other elements */
        .goog-logo-link,
        .goog-te-banner-frame,
        #goog-gt-tt,
        .goog-te-balloon-frame,
        .goog-te-gadget span,
        iframe {
          display: none !important;
        }

        /* Prevent the banner from appearing on language selection */
        body > .goog-te-banner-frame {
          display: none !important;
        }

        /* Ensure the main body doesn't shift */
        body {
          top: 0 !important;
        }

        /* Keep only the language dropdown */
        .goog-te-gadget {
          color: transparent !important; /* Hide text like 'Select Language' */
        }

        /* Adjust dropdown styles if necessary */
        .goog-te-combo {
          font-size: 16px;
          color: #000 !important; /* Dropdown text color */
          border: 1px solid #ccc; /* Add border */
          border-radius: 4px;
          padding: 5px;
        }

        /* Custom margin for the dropdown */
        .goog-te-gadget .goog-te-combo {
          margin: 4px 0 !important; /* Override other styles */
          margin-top: 20px !important; /* Set proper spacing from the top */
        }
      `}</style>
    </>
  );
};

export default GoogleTranslate;
