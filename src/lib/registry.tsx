"use client";

import { useEffect, useState, ReactNode } from "react";
import { Toaster, ToastBar, toast as hotToast, useToasterStore } from "react-hot-toast";
import { ToastContainer, cssTransition } from "react-toastify";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager, createGlobalStyle } from "styled-components";

export default function StyledComponentsRegistry({
 children,
}: {
 children: ReactNode;
}) {
 // Only create stylesheet once with lazy initial state
 // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
 const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

 useServerInsertedHTML(() => {
  const styles = styledComponentsStyleSheet.getStyleElement();
  styledComponentsStyleSheet.instance.clearTag();
  return <>{styles}</>;
 });

 if (typeof window !== "undefined") return <>{children}</>;

 return (
  <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
   {children}
  </StyleSheetManager>
 );
}

// ---------------------------------------------------------------------------
// App-wide pop-up messages (toasts). Lives here because this is the client
// file the root layout already wraps the app with (the layout itself is a
// server component). The site uses two toast libraries — react-hot-toast and
// react-toastify — and both get the same look, position and timing:
//   top-center, white card, coloured icon, close (×), time-left bar,
//   drop-in with a small bounce, success ~3.5s / error ~6s, pause on hover,
//   at most 3 on screen. Only transform/opacity animate (cheap on the GPU).
// ---------------------------------------------------------------------------

const MAX_TOASTS = 3;

const ToastStyles = createGlobalStyle`
 @keyframes tzToastIn {
  0% { opacity: 0; transform: translateY(-22px) scale(0.92); }
  60% { opacity: 1; transform: translateY(4px) scale(1.01); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
 }
 @keyframes tzToastOut {
  from { opacity: 1; transform: translateY(0) scale(1); }
  to { opacity: 0; transform: translateY(-16px) scale(0.96); }
 }
 @keyframes tzToastBar {
  from { transform: scaleX(1); }
  to { transform: scaleX(0); }
 }

 /* ---- react-hot-toast ---- */
 .tz-toast {
  position: relative;
  overflow: hidden;
  width: min(440px, calc(100vw - 24px));
  max-width: none !important;
  padding: 12px 10px 14px 14px !important;
  border: 1px solid #e3e6ec;
  border-radius: 14px !important;
  background: #fff !important;
  color: #141520 !important;
  font-family: var(--font-body), system-ui, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.45;
  box-shadow: 0 14px 36px rgba(14, 52, 96, 0.16), 0 2px 6px rgba(14, 52, 96, 0.06) !important;
 }
 .tz-toast-icon {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #f4f5f8;
 }
 .tz-toast[data-type="success"] .tz-toast-icon { background: #e6f4ec; }
 .tz-toast[data-type="error"] .tz-toast-icon { background: #fdecec; }
 .tz-toast[data-type="loading"] .tz-toast-icon { background: #fdeee7; }
 .tz-toast-msg {
  flex: 1;
  min-width: 0;
  margin: 0 4px 0 10px;
 }
 .tz-toast-msg > div {
  margin: 0 !important;
 }
 .tz-toast-close {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #5e6678;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  transition: background-color 150ms, color 150ms;
 }
 .tz-toast-close:hover { background: #f4f5f8; color: #141520; }
 .tz-toast-close:focus-visible { outline: none; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #f05023; }
 .tz-toast-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background: #5e6678;
  transform-origin: left;
  animation-name: tzToastBar;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
 }
 .tz-toast[data-type="success"] .tz-toast-bar { background: #1e8a55; }
 .tz-toast[data-type="error"] .tz-toast-bar { background: #d93036; }
 .tz-toast:hover .tz-toast-bar { animation-play-state: paused; }

 /* ---- react-toastify (checkout, profile, etc.) ---- */
 .Toastify__toast-container--top-center {
  top: 16px;
  width: min(440px, calc(100vw - 24px));
 }
 .Toastify__toast {
  min-height: 56px;
  margin-bottom: 10px;
  padding: 12px 12px 14px 14px;
  border: 1px solid #e3e6ec;
  border-radius: 14px;
  background: #fff;
  color: #141520;
  font-family: var(--font-body), system-ui, sans-serif;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 14px 36px rgba(14, 52, 96, 0.16), 0 2px 6px rgba(14, 52, 96, 0.06);
 }
 .Toastify__toast-icon {
  width: 22px;
  margin-right: 12px;
 }
 .Toastify__close-button {
  align-self: center;
  color: #5e6678;
  opacity: 0.8;
 }
 .Toastify__progress-bar { height: 3px; }
 .Toastify__progress-bar--success { background: #1e8a55; }
 .Toastify__progress-bar--error { background: #d93036; }
 .Toastify__progress-bar--info { background: #0e3460; }
 .Toastify__progress-bar--warning { background: #e0a019; }
 .tz-rt-in { animation: tzToastIn 420ms cubic-bezier(0.21, 1.02, 0.73, 1) both; }
 .tz-rt-out { animation: tzToastOut 260ms ease-in both; }

 @media (max-width: 480px) {
  .Toastify__toast-container--top-center {
   left: 50%;
   transform: translateX(-50%);
   padding: 0;
  }
 }

 @media (prefers-reduced-motion: reduce) {
  @keyframes tzToastIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes tzToastOut { from { opacity: 1; } to { opacity: 0; } }
 }
`;

const TizaraaTransition = cssTransition({ enter: "tz-rt-in", exit: "tz-rt-out" });

export function AppToaster() {
 // Keep at most MAX_TOASTS on screen (newest wins)
 const { toasts } = useToasterStore();
 useEffect(() => {
  toasts
   .filter((t) => t.visible)
   .filter((_, i) => i >= MAX_TOASTS)
   .forEach((t) => hotToast.dismiss(t.id));
 }, [toasts]);

 return (
  <>
   <ToastStyles />
   <Toaster
    position="top-center"
    gutter={10}
    containerStyle={{ top: 16 }}
    toastOptions={{
     duration: 4000,
     success: { duration: 3500, iconTheme: { primary: "#1e8a55", secondary: "#fff" } },
     error: { duration: 6000, iconTheme: { primary: "#d93036", secondary: "#fff" } },
     loading: { iconTheme: { primary: "#f05023", secondary: "#fdeee7" } },
    }}
   >
    {(t) => (
     <ToastBar
      toast={t}
      style={{
       animation: t.visible
        ? "tzToastIn 420ms cubic-bezier(0.21, 1.02, 0.73, 1) forwards"
        : "tzToastOut 260ms ease-in forwards",
      }}
     >
      {({ icon, message }) => (
       <div className="tz-toast" data-type={t.type} style={{ display: "flex", alignItems: "center" }}>
        <span className="tz-toast-icon">{icon}</span>
        <span className="tz-toast-msg">{message}</span>
        {t.type !== "loading" && (
         <button type="button" className="tz-toast-close" aria-label="Dismiss" onClick={() => hotToast.dismiss(t.id)}>
          ×
         </button>
        )}
        {t.type !== "loading" && t.duration !== Infinity && (
         <span className="tz-toast-bar" aria-hidden="true" style={{ animationDuration: `${t.duration}ms` }} />
        )}
       </div>
      )}
     </ToastBar>
    )}
   </Toaster>
   <ToastContainer
    position="top-center"
    autoClose={4000}
    newestOnTop
    limit={MAX_TOASTS}
    pauseOnHover
    pauseOnFocusLoss
    closeOnClick
    transition={TizaraaTransition}
   />
  </>
 );
}
