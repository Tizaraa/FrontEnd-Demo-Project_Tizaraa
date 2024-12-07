// global.d.ts
declare global {
    interface Window {
      googleTranslateElementInit: () => void;
      google: {
        translate: {
          TranslateElement: new (
            options: { pageLanguage: string; includedLanguages: string },
            elementId: string
          ) => void;
        };
      };
    }
  }
  
  export {};
  