"use client";
import { useEffect } from "react";

// Extend the Window interface to include google and googleTranslateElementInit
declare global {
    interface Window {
        google?: {
            translate: {
                TranslateElement: new (
                    options: { pageLanguage: string },
                    elementId: string
                ) => void;
            };
        };
        googleTranslateElementInit?: () => void;
    }
}

const GoogleTranslate = () => {
    useEffect(() => {
        const addScript = () => {
            // Define the initialization function
            window.googleTranslateElementInit = function () {
                if (window.google && window.google.translate) {
                    new window.google.translate.TranslateElement(
                        { pageLanguage: "en" },
                        "google_translate_element"
                    );
                }
            };

            // Dynamically add the script
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src =
                "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.body.appendChild(script);
        };

        addScript();

        // Cleanup: Remove the script and the global function
        return () => {
            delete window.googleTranslateElementInit;
            const script = document.querySelector(
                "script[src='https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit']"
            );
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <div>
            {/* Add global CSS to hide unwanted parts */}
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

                /* Prevent the banner from appearing on language selection */
                body > .goog-te-banner-frame {
                    display: none !important;
                }

                /* Ensure the main body doesn't shift */
                body {
                    top: 0 !important;
                }
            `}</style>

            {/* Google Translate widget container */}
            <div id="google_translate_element"></div>
        </div>
    );
};

export default GoogleTranslate;
