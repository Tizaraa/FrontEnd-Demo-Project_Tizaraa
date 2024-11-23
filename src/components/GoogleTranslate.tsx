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
             {/* <style jsx global>{`
                .goog-logo-link, .goog-te-gadget span {
                    display: none !important;
                }
       `}</style> */}
            <div id="google_translate_element"></div>
           
        </div>
    );
};

export default GoogleTranslate;