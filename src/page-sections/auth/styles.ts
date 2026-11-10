import Link from "next/link";
import Card from "@component/Card";
import styled, { css, keyframes } from "styled-components";
import { TextFieldWrapper } from "@component/text-field/styles";

// Still used by the corporate invite page, which sits outside the auth layout.
export const StyledRoot = styled(Card)`
 width: 500px;
 overflow: hidden;
 .content {
  padding: 3rem 3.75rem 0px;
 }

 @media screen and (max-width: 550px) {
  width: 90%;
  .content {
   padding: 1.5rem 1rem 0px;
  }
 }
`;

// Card that holds every auth form (login, signup, OTP, reset password)
export const AuthCard = styled.div`
 width: 100%;
 max-width: 440px;
 margin: 0 auto;
 padding: 32px;
 background: ${({ theme }) => theme.tz.color.paper};
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: ${({ theme }) => theme.tz.radius.lg}px;
 box-shadow: ${({ theme }) => theme.tz.elevation.raised};
 color: ${({ theme }) => theme.tz.color.inkSoft};
 font-family: ${({ theme }) => theme.tz.font.body};

 @media screen and (max-width: 480px) {
  padding: 24px;
 }
`;

export const AuthTitle = styled.h1`
 margin: 0 0 8px;
 font-family: ${({ theme }) => theme.tz.font.display};
 font-size: 28px;
 font-weight: 600;
 line-height: 1.2;
 text-align: center;
 color: ${({ theme }) => theme.tz.color.ink};

 @media screen and (max-width: 480px) {
  font-size: 24px;
 }
`;

export const AuthSubtitle = styled.p`
 margin: 0 0 24px;
 font-size: 14px;
 line-height: 1.55;
 text-align: center;
 color: ${({ theme }) => theme.tz.color.slate};
`;

const textLinkStyles = css`
 padding: 0;
 border: none;
 background: none;
 font-family: inherit;
 font-size: 14px;
 font-weight: 600;
 line-height: 1.4;
 color: ${({ theme }) => theme.tz.color.emberDeep};
 text-decoration: none;
 cursor: pointer;
 border-radius: ${({ theme }) => theme.tz.radius.xs}px;
 transition: color ${({ theme }) => theme.tz.motion.fast};

 &:hover {
  color: ${({ theme }) => theme.tz.color.emberDark};
  text-decoration: underline;
 }

 &:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
`;

// Secondary action that runs a handler (always type="button" so it never submits a form)
export const AuthTextButton = styled.button`
 ${textLinkStyles}
`;

// Secondary action that navigates
export const AuthTextLink = styled(Link)`
 ${textLinkStyles}
`;

export const AuthErrorText = styled.p`
 margin: 4px 0 0;
 font-size: 13px;
 line-height: 1.4;
 color: ${({ theme }) => theme.tz.tone.danger.fg};
`;

export const AuthSuccessNote = styled.p`
 margin: 0 0 16px;
 padding: 10px 12px;
 font-size: 14px;
 line-height: 1.5;
 text-align: center;
 color: ${({ theme }) => theme.tz.tone.success.fg};
 background: ${({ theme }) => theme.tz.tone.success.bg};
 border-radius: ${({ theme }) => theme.tz.radius.sm}px;
`;

// Small print row under the form, e.g. "Don't have an account? Sign up"
export const AuthFooter = styled.div`
 display: flex;
 flex-wrap: wrap;
 align-items: center;
 justify-content: center;
 gap: 6px;
 margin-top: 24px;
 padding-top: 20px;
 border-top: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
 font-size: 14px;
 color: ${({ theme }) => theme.tz.color.slate};
`;

export const AuthDivider = styled.div`
 display: flex;
 align-items: center;
 gap: 12px;
 margin: 20px 0;
 font-size: 13px;
 color: ${({ theme }) => theme.tz.color.slate};

 &::before,
 &::after {
  content: "";
  flex: 1;
  height: 1px;
  background: ${({ theme }) => theme.tz.color.line};
 }
`;

// Neutral outlined button for third-party sign-in (Google, Facebook)
export const SocialButton = styled.button`
 display: flex;
 width: 100%;
 height: 44px;
 align-items: center;
 justify-content: center;
 gap: 8px;
 padding: 0 16px;
 background: ${({ theme }) => theme.tz.color.paper};
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: ${({ theme }) => theme.tz.radius.md}px;
 font-family: inherit;
 font-size: 15px;
 font-weight: 600;
 color: ${({ theme }) => theme.tz.color.ink};
 cursor: pointer;
 transition: background-color ${({ theme }) => theme.tz.motion.fast},
  border-color ${({ theme }) => theme.tz.motion.fast};

 &:hover {
  background: ${({ theme }) => theme.tz.color.mist};
  border-color: ${({ theme }) => theme.tz.color.slate};
 }

 &:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
`;

// Plain inputs used where the shared TextField can't be swapped in
export const AuthLabel = styled.label`
 display: block;
 margin-bottom: 6px;
 font-size: 14px;
 font-weight: 500;
 color: ${({ theme }) => theme.tz.color.inkSoft};
`;

export const AuthInput = styled.input`
 width: 100%;
 height: 44px;
 padding: 0 14px;
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: ${({ theme }) => theme.tz.radius.sm}px;
 background: ${({ theme }) => theme.tz.color.paper};
 font-family: inherit;
 font-size: 15px;
 color: ${({ theme }) => theme.tz.color.ink};
 outline: none;
 transition: border-color ${({ theme }) => theme.tz.motion.fast},
  box-shadow ${({ theme }) => theme.tz.motion.fast};

 &:focus {
  border-color: ${({ theme }) => theme.tz.color.ember};
  box-shadow: 0 0 0 3px ${({ theme }) => theme.tz.color.emberTint};
 }

 &[readonly] {
  background: ${({ theme }) => theme.tz.color.mist};
  color: ${({ theme }) => theme.tz.color.slate};
 }
`;

// ---------------------------------------------------------------------------
// Login page: full-screen 50/50 split.
// Left = form on the page background, right = tilted wall of shop cards that
// slowly scrolls. The wall hides below 900px so mobile only sees the form.
// ---------------------------------------------------------------------------

// Login <-> signup swap, in ONE continuous motion. The click switches the
// page right away (it is prefetched), and the new page plays the whole
// transition on arrival: its showcase panel starts exactly where it sat on the
// previous page and glides across to its own side, while the new form slides
// in from the other side behind it. Nothing waits in the middle.
// Driven by data attributes on AuthPage (see useAuthSwap in Login.tsx):
//   data-wall="left|right"  where the showcase panel ends up on this page
//   data-swap="in"          just arrived through a swap
// Only transform/opacity animate, so the GPU runs it without repaints.
const showcaseIn = keyframes`
 from { transform: translateX(var(--swap-x)); }
 to { transform: translateX(0); }
`;

const paneIn = keyframes`
 0% { opacity: 0; transform: translateX(calc(var(--swap-x) * -0.6)); }
 35% { opacity: 0; }
 100% { opacity: 1; transform: translateX(0); }
`;

const fadeIn = keyframes`
 from { opacity: 0; }
 to { opacity: 1; }
`;

export const AUTH_SWAP_MS = 800;
const swapEase = "cubic-bezier(0.45, 0, 0.15, 1)";

// Full-screen stage: the animated card wall (AuthCardWall) fills it as a
// backdrop and the AuthShell card floats in the middle.
export const AuthPage = styled.div`
 position: relative;
 display: grid;
 place-items: center;
 min-height: 100vh;
 padding: 40px 24px;
 overflow: hidden;
 /* Transparent so the shared wall from (auth)/layout.tsx shows through */
 background: transparent;
 font-family: ${({ theme }) => theme.tz.font.body};

 &[data-wall="right"] {
  --swap-x: -100%;
 }
 &[data-wall="left"] {
  --swap-x: 100%;
 }

 &[data-swap="in"] {
  overflow: hidden;
 }

 @media screen and (max-width: 900px) {
  padding: 0;
  place-items: stretch;
  background: ${({ theme }) => theme.tz.color.mist};
 }
`;

const shellIn = keyframes`
 from { opacity: 0; transform: translateY(28px) scale(0.97); }
 to { opacity: 1; transform: none; }
`;

// The floating white card: form on one side, feature showcase on the other.
export const AuthShell = styled.div`
 position: relative;
 z-index: 1;
 display: grid;
 grid-template-columns: 1fr 1fr;
 width: 100%;
 max-width: 1120px;
 min-height: 660px;
 overflow: hidden;
 border-radius: 32px;
 background: ${({ theme }) => theme.tz.color.paper};
 /* Crisp and clearly in front: tight shadow for the edge + deep shadow
    for lift, and a solid light ring instead of a translucent one */
 box-shadow: 0 2px 6px rgba(3, 7, 18, 0.25), 0 32px 80px rgba(3, 7, 18, 0.6),
  0 0 0 1px rgba(255, 255, 255, 0.9);
 animation: ${shellIn} 700ms cubic-bezier(0.2, 0, 0, 1) both;

 /* Arriving from a swap: the card is already in place, don't replay */
 [data-swap="in"] & {
  animation: none;
 }

 @media screen and (max-width: 900px) {
  grid-template-columns: 1fr;
  max-width: none;
  min-height: 100vh;
  border-radius: 0;
  box-shadow: none;
  background: ${({ theme }) => theme.tz.color.mist};
 }

 @media (prefers-reduced-motion: reduce) {
  animation: none;
 }
`;

const rowUp = keyframes`
 from { opacity: 0; transform: translateY(14px); }
 to { opacity: 1; transform: translateY(0); }
`;

const shineSweep = keyframes`
 from { transform: translateX(-120%) skewX(-20deg); }
 to { transform: translateX(260%) skewX(-20deg); }
`;

const spinOnce = keyframes`
 from { transform: rotate(0deg); }
 to { transform: rotate(360deg); }
`;

const checkPop = keyframes`
 0% { transform: scale(1); }
 40% { transform: scale(1.3); }
 100% { transform: scale(1); }
`;

const staggerRows = Array.from(
 { length: 16 },
 (_, i) => `> form > *:nth-child(${i + 1}) { animation-delay: ${320 + i * 55}ms; }`,
).join("\n");

export const AuthPane = styled.div`
 position: relative;
 z-index: 1;

 > form > * {
  animation: ${rowUp} 500ms cubic-bezier(0.2, 0, 0, 1) both;
 }
 ${staggerRows}

 /* Arriving through a swap: the whole form slides in as one piece (no row
    stagger, which used to look like a separate third step) */
 [data-swap="in"] & {
  animation: ${paneIn} ${AUTH_SWAP_MS}ms ${swapEase} both;

  @media screen and (max-width: 900px) {
   animation: ${fadeIn} 300ms ease both;
  }
 }
 [data-swap="in"] & > form > * {
  animation: none;
 }

 @media (prefers-reduced-motion: reduce) {
  > form > * {
   animation: none;
  }
 }

 display: flex;
 align-items: center;
 justify-content: center;
 padding: 48px 56px;
 color: ${({ theme }) => theme.tz.color.inkSoft};

 > form {
  width: 100%;
  max-width: 400px;
 }

 ${AuthTitle} {
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -0.02em;
 }

 /* "back" in solid brand orange (clean, no gradient) */
 .title-accent {
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }

 ${AuthSubtitle} {
  font-size: 15px;
  color: ${({ theme }) => theme.tz.color.slate};
 }

 ${AuthDivider} {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #8a91a0;
 }

 .remember-label {
  font-size: 13px;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }

 ${AuthFooter} {
  font-size: 14px;
 }

 .link-arrow {
  display: inline-block;
  margin-left: 4px;
  transition: transform 250ms cubic-bezier(0.2, 0, 0, 1);
 }

 a:hover .link-arrow {
  transform: translateX(4px);
 }

 /* ---------- Outlined fields (login + signup only) ----------
    Resting: the label sits inside the empty field like a placeholder.
    Focused / filled: it shrinks onto the top border, which "opens" behind it.
    The floated look is the default; :has() adds the resting state, so older
    browsers just keep the label on the border. */
 ${TextFieldWrapper} {
  position: relative;

  > label {
   position: absolute;
   top: 0;
   left: 12px;
   z-index: 1;
   max-width: calc(100% - 56px);
   margin: 0;
   padding: 0 6px;
   overflow: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;
   font-size: 12px;
   font-weight: 500;
   line-height: 1.2;
   color: ${({ theme }) => theme.tz.color.slate};
   /* top half matches the page, bottom half the field: hides the border line */
   background: linear-gradient(
    to bottom,
    var(--notch-top, ${({ theme }) => theme.tz.color.paper}) 50%,
    ${({ theme }) => theme.tz.color.paper} 50%
   );
   transform: translateY(-50%);
   pointer-events: none;
   transition: top 180ms cubic-bezier(0.2, 0, 0, 1), font-size 180ms cubic-bezier(0.2, 0, 0, 1),
    color 180ms, font-weight 180ms;
  }

  input {
   height: 52px;
   padding: 14px 16px;
   font-size: 15px;
   border: 1.5px solid #c9ced8;
   border-radius: ${({ theme }) => theme.tz.radius.md}px;
   background: ${({ theme }) => theme.tz.color.paper};
   transition: border-color 160ms, box-shadow 200ms cubic-bezier(0.2, 0, 0, 1);
  }

  input:hover {
   border-color: ${({ theme }) => theme.tz.color.slate};
  }

  input:focus {
   border-color: ${({ theme }) => theme.tz.color.ember};
   box-shadow: inset 0 0 0 1px ${({ theme }) => theme.tz.color.ember},
    0 0 0 4px ${({ theme }) => theme.tz.color.emberTint};
  }

  &:focus-within > label {
   color: ${({ theme }) => theme.tz.color.emberDeep};
  }

  > small {
   margin: 6px 0 0 14px;
   font-size: 12px;
  }

  .end-adornment {
   right: 8px;
  }

  /* Eye toggle: grows on hover, twists on press */
  .end-adornment > * {
   transition: transform 300ms cubic-bezier(0.2, 0, 0, 1);
  }
  .end-adornment:hover > * {
   transform: scale(1.12);
  }
  .end-adornment:active > * {
   transform: rotate(-25deg) scale(0.9);
  }
 }

 @supports selector(:has(*)) {
  ${TextFieldWrapper}:has(input:placeholder-shown):not(:focus-within) > label {
   top: 26px;
   font-size: 15px;
   font-weight: 400;
   background: transparent;
  }

  /* The label plays placeholder while resting; the real one shows on focus */
  ${TextFieldWrapper} input::placeholder {
   color: transparent;
   transition: color 160ms;
  }
  ${TextFieldWrapper}:focus-within input::placeholder {
   color: #9aa1af;
  }

  ${TextFieldWrapper}:has(> small) > label {
   color: ${({ theme }) => theme.tz.tone.danger.fg};
  }
  ${TextFieldWrapper}:has(> small) input {
   border-color: ${({ theme }) => theme.tz.tone.danger.fill};
  }
 }

 /* ---------- Primary button: lift, glow, shine sweep, arrow ---------- */
 button[type="submit"] {
  position: relative;
  overflow: hidden;
  height: 52px;
  border-radius: ${({ theme }) => theme.tz.radius.pill}px;
  transition: transform 220ms cubic-bezier(0.2, 0, 0, 1), box-shadow 220ms cubic-bezier(0.2, 0, 0, 1),
   background-color 120ms;

  &::after {
   content: "";
   position: absolute;
   top: 0;
   left: 0;
   width: 45%;
   height: 100%;
   background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
   transform: translateX(-120%) skewX(-20deg);
   pointer-events: none;
  }

  &:hover:enabled {
   transform: translateY(-2px);
   box-shadow: 0 12px 28px rgba(194, 64, 15, 0.35);
  }

  &:hover:enabled::after {
   animation: ${shineSweep} 850ms cubic-bezier(0.2, 0, 0, 1);
  }

  &:active:enabled {
   transform: translateY(0) scale(0.98);
   box-shadow: 0 4px 10px rgba(194, 64, 15, 0.3);
  }

  .btn-label {
   display: inline-flex;
   align-items: center;
  }

  .btn-arrow {
   display: inline-block;
   width: 0;
   margin-left: 0;
   overflow: hidden;
   opacity: 0;
   transform: translateX(-8px);
   transition: width 220ms, margin 220ms, opacity 220ms, transform 220ms cubic-bezier(0.2, 0, 0, 1);
  }

  &:hover:enabled .btn-arrow {
   width: 1em;
   margin-left: 8px;
   opacity: 1;
   transform: translateX(0);
  }
 }

 /* ---------- Google button: lift, ember border, G spins once ---------- */
 ${SocialButton} {
  height: 52px;
  margin-bottom: 4px;
  border-radius: ${({ theme }) => theme.tz.radius.pill}px;
  transition: transform 220ms cubic-bezier(0.2, 0, 0, 1), box-shadow 220ms, border-color 160ms,
   background-color 120ms;

  &:hover {
   transform: translateY(-2px);
   background: ${({ theme }) => theme.tz.color.paper};
   border-color: ${({ theme }) => theme.tz.color.ember};
   box-shadow: ${({ theme }) => theme.tz.elevation.overlay};
  }

  &:hover > :first-child {
   animation: ${spinOnce} 650ms cubic-bezier(0.2, 0, 0, 1);
  }

  &:active {
   transform: scale(0.98);
  }
 }

 /* ---------- Text links: underline grows from the left ---------- */
 ${AuthTextButton}, ${AuthTextLink} {
  position: relative;

  &:hover {
   text-decoration: none;
  }

  &::after {
   content: "";
   position: absolute;
   left: 0;
   right: 0;
   bottom: -2px;
   height: 2px;
   border-radius: 2px;
   background: currentColor;
   transform: scaleX(0);
   transform-origin: left;
   transition: transform 260ms cubic-bezier(0.2, 0, 0, 1);
  }

  &:hover::after,
  &:focus-visible::after {
   transform: scaleX(1);
  }
 }

 /* ---------- Checkbox pop ---------- */
 input[type="checkbox"]:checked {
  animation: ${checkPop} 320ms cubic-bezier(0.2, 0, 0, 1);
 }

 @media (prefers-reduced-motion: reduce) {
  &,
  & *,
  & *::after {
   animation: none !important;
   transition: none !important;
  }

  button[type="submit"]:hover:enabled,
  ${SocialButton}:hover {
   transform: none;
  }
 }

 /* On mobile the card goes away and the form sits on the mist page */
 @media screen and (max-width: 900px) {
  --notch-top: ${({ theme }) => theme.tz.color.mist};
  padding: 40px 20px;
 }

 @media screen and (max-width: 480px) {
  padding: 32px 16px;

  ${AuthTitle} {
   font-size: 28px;
  }
 }
`;

// tizaraa_logo.png is 200x90 but the logo itself only fills x 7-192,
// y 24-64. Scaling the whole file down made the pale globe fade and look
// detached, so the link is a 186x41 window showing the logo at 1:1.
export const AuthBrand = styled(Link)`
 position: relative;
 display: block;
 width: 186px;
 height: 41px;
 margin: 0 auto 28px;
 overflow: hidden;
 border-radius: ${({ theme }) => theme.tz.radius.xs}px;

 img {
  position: absolute;
  top: -24px;
  left: -7px;
  display: block;
  width: 200px;
  max-width: none;
  height: 90px;
 }

 &:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
`;

// "New to Tizaraa?" / "Already have an account?" label, drawn between two
// thin lines so it reads as the start of a separate choice
export const AuthAltLabel = styled.p`
 display: flex;
 align-items: center;
 gap: 12px;
 margin: 24px 0 12px;
 font-size: 13px;
 font-weight: 500;
 color: ${({ theme }) => theme.tz.color.slate};

 &::before,
 &::after {
  content: "";
  flex: 1;
  height: 1px;
  background: ${({ theme }) => theme.tz.color.line};
 }
`;

// Secondary call to action (Create an account / Log in): a full-width
// outlined pill, the same size as the Google button, so it clearly reads as
// a button rather than plain text
export const AuthAltCta = styled(Link)`
 display: flex;
 align-items: center;
 justify-content: center;
 gap: 8px;
 width: 100%;
 height: 50px;
 border: 1.5px solid ${({ theme }) => theme.tz.color.ember};
 border-radius: ${({ theme }) => theme.tz.radius.pill}px;
 background: ${({ theme }) => theme.tz.color.paper};
 font-family: inherit;
 font-size: 15px;
 font-weight: 700;
 color: ${({ theme }) => theme.tz.color.emberDeep};
 text-decoration: none;
 cursor: pointer;
 transition: background-color 200ms, transform 220ms cubic-bezier(0.2, 0, 0, 1),
  box-shadow 220ms cubic-bezier(0.2, 0, 0, 1);

 .link-arrow {
  display: inline-block;
  transition: transform 250ms cubic-bezier(0.2, 0, 0, 1);
 }

 &:hover {
  background: ${({ theme }) => theme.tz.color.emberTint};
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(240, 80, 35, 0.18);
 }

 &:hover .link-arrow {
  transform: translateX(4px);
 }

 &:active {
  transform: scale(0.98);
 }

 &:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 @media (prefers-reduced-motion: reduce) {
  transition: none;

  &:hover,
  &:hover .link-arrow {
   transform: none;
  }
 }
`;

export const AuthLegal = styled.p`
 max-width: 360px;
 margin: 18px auto 0;
 font-size: 12px;
 line-height: 1.7;
 text-align: center;
 color: #8a91a0;

 /* Terms / Privacy: clearly links (ember, small icon), never split */
 a {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  white-space: nowrap;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.emberDeep};
  text-decoration: none;
  border-bottom: 1px solid rgba(240, 80, 35, 0.35);
  transition: color 200ms, border-color 200ms;
 }

 a svg {
  flex-shrink: 0;
 }

 a:hover {
  color: ${({ theme }) => theme.tz.color.emberDark};
  border-bottom-color: ${({ theme }) => theme.tz.color.ember};
 }

 a:focus-visible {
  outline: none;
  border-radius: 3px;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
`;

// Feature showcase panel inside the card (FeatureShowcase in Login.tsx).
// One slide at a time: animated SVG illustration, title, text, and bar
// indicators whose fill drives the auto-advance (animationend).
const scFill = keyframes`
 from { transform: scaleX(0); }
 to { transform: scaleX(1); }
`;
const scFloat = keyframes`
 0%, 100% { transform: translateY(0); }
 50% { transform: translateY(-8px); }
`;

// ---- Showcase stories (DeliveryArt / PaymentArt / ReturnsArt / ShopArt) -----
// Each illustration is a tiny looping story. All parts of one story share the
// same duration, so keyframe percentages line up like a timeline. Only
// transform and opacity are animated (GPU-composited, no repaints). With no
// animation (reduced motion) every SVG shows its base state, which is drawn as
// the happy final scene.
export const DL_MS = 10000; // delivery story
export const STORY_MS = 6000; // payment / returns / shop stories

// Alternating frames inside time windows: legs, bobbing, waving
const wiggle = (windows: number[][], step: number, a: string, b: string, rest: string) => {
 const f = [`0% { transform: ${rest}; }`];
 windows.forEach(([from, to]) => {
  f.push(`${from}% { transform: ${rest}; }`);
  let k = 0;
  for (let t = from + step; t < to - 0.01; t += step, k += 1) {
   f.push(`${t.toFixed(2)}% { transform: ${k % 2 ? b : a}; }`);
  }
  f.push(`${to}% { transform: ${rest}; }`);
 });
 f.push(`100% { transform: ${rest}; }`);
 return keyframes`${f.join("\n")}`;
};

/* Delivery (10s)
   0-14 truck zooms in | 14-20 brake squash, puffs, "Beep beep!"
   22 boy hops out | 26-46 bouncy walk | 47-53 "Knock knock!"
   52-55 door opens | 56 parcel handed, tracker done | 57-66 customer jumps,
   hearts, "Yay!" | 63-70 boy waves | 66 "Happy shopping!" | 70-79 walk back
   80 hop in | 82-94 wheelie + zoom off | 96-100 pause */
const dlTruck = keyframes`
 0% { transform: translateX(-320px); opacity: 0; }
 2% { opacity: 1; }
 14% { transform: translateX(0); }
 82% { transform: translateX(0); opacity: 1; }
 94% { transform: translateX(380px); opacity: 1; }
 96%, 100% { transform: translateX(380px); opacity: 0; }
`;
const dlSquash = keyframes`
 0%, 14% { transform: scale(1, 1) rotate(0deg); }
 15.5% { transform: scale(1.07, 0.88) rotate(0deg); }
 17% { transform: scale(0.96, 1.06) rotate(0deg); }
 18.5% { transform: scale(1.02, 0.98) rotate(0deg); }
 20%, 82% { transform: scale(1, 1) rotate(0deg); }
 85% { transform: scale(1, 1) rotate(-7deg); }
 89% { transform: scale(1, 1) rotate(-3deg); }
 92%, 100% { transform: scale(1, 1) rotate(0deg); }
`;
const dlWheel = keyframes`
 0% { transform: rotate(0deg); }
 14%, 82% { transform: rotate(1080deg); }
 94%, 100% { transform: rotate(2160deg); }
`;
const dlSpeed = keyframes`
 0%, 11% { opacity: 1; }
 14%, 82% { opacity: 0; }
 85%, 93% { opacity: 1; }
 95%, 100% { opacity: 0; }
`;
const dlPuff = keyframes`
 0%, 13% { opacity: 0; transform: translateX(0) scale(0.4); }
 15.5% { opacity: 0.9; transform: translateX(-4px) scale(1); }
 22% { opacity: 0; transform: translateX(-18px) scale(1.7); }
 82% { opacity: 0; transform: translateX(0) scale(0.4); }
 85% { opacity: 0.9; transform: translateX(-4px) scale(1); }
 91%, 100% { opacity: 0; transform: translateX(-20px) scale(1.8); }
`;
const dlBeep = keyframes`
 0%, 15% { opacity: 0; transform: scale(0.4); }
 17% { opacity: 1; transform: scale(1.08); }
 18.5%, 26% { opacity: 1; transform: scale(1); }
 28%, 100% { opacity: 0; transform: scale(0.8); }
`;
const dlWalk = keyframes`
 0%, 21% { transform: translateX(-62px); opacity: 0; }
 22%, 26% { transform: translateX(-62px); opacity: 1; }
 46%, 70% { transform: translateX(0); opacity: 1; }
 79% { transform: translateX(-62px); opacity: 1; }
 81%, 100% { transform: translateX(-62px); opacity: 0; }
`;
const dlHop = keyframes`
 0%, 22% { transform: translateY(0); }
 23.5% { transform: translateY(-14px); }
 25%, 79% { transform: translateY(0); }
 80% { transform: translateY(-12px); }
 81%, 100% { transform: translateY(0); }
`;
const dlBob = wiggle([[26, 46], [70, 79]], 1.25, "translateY(-2.5px)", "translateY(0px)", "translateY(0px)");
const dlLegA = wiggle([[26, 46], [70, 79]], 1.25, "rotate(26deg)", "rotate(-26deg)", "rotate(0deg)");
const dlLegB = wiggle([[26, 46], [70, 79]], 1.25, "rotate(-26deg)", "rotate(26deg)", "rotate(0deg)");
const dlFace = keyframes`
 0%, 69.9% { transform: scaleX(1); }
 70%, 80% { transform: scaleX(-1); }
 80.1%, 100% { transform: scaleX(1); }
`;
const dlHandParcel = keyframes`
 0%, 55.5% { opacity: 1; }
 56.5%, 100% { opacity: 0; }
`;
const dlWaveOn = keyframes`
 0%, 63% { opacity: 0; }
 63.5%, 69.5% { opacity: 1; }
 70%, 100% { opacity: 0; }
`;
// Arms swing opposite to the legs while walking
const dlArmA = wiggle([[26, 46], [70, 79]], 1.25, "rotate(-22deg)", "rotate(22deg)", "rotate(0deg)");
const dlArmB = wiggle([[26, 46], [70, 79]], 1.25, "rotate(22deg)", "rotate(-22deg)", "rotate(0deg)");
// After the hand-over his front hand is free (and swings on the way back)
const dlHandFree = keyframes`
 0%, 55.5% { opacity: 0; }
 56.5%, 63% { opacity: 1; }
 63.5%, 69.5% { opacity: 0; }
 70%, 100% { opacity: 1; }
`;
// Tips his cap to say bye
const dlCap = keyframes`
 0%, 63.5% { transform: translateY(0) rotate(0deg); }
 64.5%, 68.5% { transform: translateY(-5px) rotate(-18deg); }
 69.5%, 100% { transform: translateY(0) rotate(0deg); }
`;
// Ambient scene loops (own short clocks, independent of the story)
const sceneCloud = keyframes`
 from { transform: translateX(-18px); }
 to { transform: translateX(26px); }
`;
const sceneSmoke = keyframes`
 0% { opacity: 0; transform: translate(0, 0) scale(0.5); }
 25% { opacity: 0.7; }
 100% { opacity: 0; transform: translate(7px, -26px) scale(1.5); }
`;
const signBlink = keyframes`
 0%, 49% { opacity: 1; }
 50%, 100% { opacity: 0.25; }
`;
const eyeBlink = keyframes`
 0%, 92%, 100% { transform: scaleY(1); }
 95% { transform: scaleY(0.1); }
`;
// Her dupatta flutters while she jumps
const dlDupatta = wiggle([[57, 66]], 1, "rotate(8deg)", "rotate(-6deg)", "rotate(0deg)");

// Customer hugs the parcel, then throws both arms up while jumping
const dlArmsUp = keyframes`
 0%, 58.5% { opacity: 0; }
 59%, 65.5% { opacity: 1; }
 66%, 100% { opacity: 0; }
`;
const dlArmsDown = keyframes`
 0%, 58.5% { opacity: 1; }
 59%, 65.5% { opacity: 0; }
 66%, 100% { opacity: 1; }
`;
const dlSpark = keyframes`
 0%, 58% { opacity: 0; transform: scale(0) rotate(0deg); }
 60.5% { opacity: 1; transform: scale(1.25) rotate(45deg); }
 64%, 67% { opacity: 1; transform: scale(1) rotate(90deg); }
 71%, 100% { opacity: 0; transform: scale(0.4) rotate(120deg); }
`;
const dlKnock = keyframes`
 0%, 46.5% { opacity: 0; transform: scale(0.4); }
 48% { opacity: 1; transform: scale(1.08); }
 49%, 52% { opacity: 1; transform: scale(1); }
 53.5%, 100% { opacity: 0; transform: scale(0.8); }
`;
const dlDoor = keyframes`
 0%, 51% { transform: scaleX(1); }
 54.5%, 92% { transform: scaleX(0.15); }
 95%, 100% { transform: scaleX(1); }
`;
const dlCustomer = keyframes`
 0%, 52% { opacity: 0; }
 54.5%, 92% { opacity: 1; }
 94%, 100% { opacity: 0; }
`;
const dlJump = keyframes`
 0%, 57% { transform: translateY(0); }
 59% { transform: translateY(-13px); }
 61% { transform: translateY(0); }
 63% { transform: translateY(-9px); }
 65%, 100% { transform: translateY(0); }
`;
const dlCParcel = keyframes`
 0%, 55.5% { opacity: 0; }
 56.5%, 100% { opacity: 1; }
`;
const dlYay = keyframes`
 0%, 57.5% { opacity: 0; transform: scale(0.4); }
 59.5% { opacity: 1; transform: scale(1.1); }
 61%, 66% { opacity: 1; transform: scale(1); }
 68%, 100% { opacity: 0; transform: scale(0.8); }
`;
const dlHeart = keyframes`
 0%, 58% { opacity: 0; transform: translateY(0) scale(0.5); }
 61% { opacity: 1; transform: translateY(-10px) scale(1); }
 72%, 100% { opacity: 0; transform: translateY(-44px) scale(0.9); }
`;
const dlBanner = keyframes`
 0%, 65% { opacity: 0; transform: translateY(10px) scale(0.3); }
 68% { opacity: 1; transform: translateY(0) scale(1.08); }
 70%, 93% { opacity: 1; transform: translateY(0) scale(1); }
 96%, 100% { opacity: 0; transform: translateY(-6px) scale(1); }
`;
const dlLine1 = keyframes`
 0% { transform: scaleX(0); }
 14%, 100% { transform: scaleX(1); }
`;
const dlLine2 = keyframes`
 0%, 14% { transform: scaleX(0); }
 56%, 100% { transform: scaleX(1); }
`;
const dlStep2 = keyframes`
 0%, 13% { opacity: 0; }
 15%, 100% { opacity: 1; }
`;
const dlStep3 = keyframes`
 0%, 55% { opacity: 0; transform: scale(0.4); }
 57.5% { opacity: 1; transform: scale(1.3); }
 59%, 100% { opacity: 1; transform: scale(1); }
`;

/* Payment (6s): card slides into the phone, Pay is pressed, spinner,
   "Payment successful" + confetti, hold, reset */
const payCard = keyframes`
 0% { opacity: 0; transform: translateX(-120px) rotate(-14deg); }
 6% { opacity: 1; }
 22% { opacity: 1; transform: translateX(0) rotate(0deg) scale(1); }
 27% { opacity: 1; transform: translateX(36px) rotate(0deg) scale(0.85); }
 31%, 100% { opacity: 0; transform: translateX(46px) rotate(0deg) scale(0.6); }
`;
const payBtn = keyframes`
 0%, 30% { transform: scale(1); }
 32% { transform: scale(0.88); }
 35%, 100% { transform: scale(1); }
`;
const paySpinOn = keyframes`
 0%, 34% { opacity: 0; }
 36%, 49% { opacity: 1; }
 51%, 100% { opacity: 0; }
`;
const paySpin = keyframes`
 to { transform: rotate(360deg); }
`;
const payOk = keyframes`
 0%, 50% { opacity: 0; transform: scale(0.2); }
 54% { opacity: 1; transform: scale(1.18); }
 57%, 92% { opacity: 1; transform: scale(1); }
 96%, 100% { opacity: 0; transform: scale(1); }
`;
const payConfetti = keyframes`
 0%, 52% { opacity: 0; transform: translate(0, 0) rotate(0deg) scale(0.4); }
 55% { opacity: 1; transform: translate(calc(var(--dx) * 0.3), calc(var(--dy) * 0.3)) rotate(90deg) scale(1); }
 76%, 100% { opacity: 0; transform: translate(var(--dx), var(--dy)) rotate(300deg) scale(1); }
`;

/* Returns (6s): the box blinks and waves "Bye!", hops into the van,
   the van drives off, "Return requested" pops, the van comes back */
const retBlink = keyframes`
 0%, 7%, 9.5%, 19%, 21.5%, 100% { transform: scaleY(1); }
 8.2%, 20.2% { transform: scaleY(0.1); }
`;
const retArm = wiggle([[4, 28]], 1.5, "rotate(-35deg)", "rotate(20deg)", "rotate(0deg)");
const retBye = keyframes`
 0%, 6% { opacity: 0; transform: scale(0.4); }
 9% { opacity: 1; transform: scale(1.08); }
 11%, 27% { opacity: 1; transform: scale(1); }
 30%, 100% { opacity: 0; transform: scale(0.8); }
`;
const retBox = keyframes`
 0%, 30% { opacity: 1; transform: translate(0, 0) scale(1); }
 33% { transform: translate(28px, -24px) scale(1.04, 0.96); }
 36% { transform: translate(44px, 0) scale(1.08, 0.9); }
 39% { transform: translate(72px, -24px) scale(1); }
 42% { transform: translate(88px, 0) scale(1.08, 0.9); }
 46% { opacity: 1; transform: translate(112px, -20px) scale(0.8); }
 50% { opacity: 0; transform: translate(124px, 0) scale(0.4); }
 88% { opacity: 0; transform: translate(0, 0) scale(0.4); }
 94%, 100% { opacity: 1; transform: translate(0, 0) scale(1); }
`;
const retVan = keyframes`
 0%, 54% { opacity: 1; transform: translateX(0); }
 74% { opacity: 1; transform: translateX(240px); }
 76% { opacity: 0; transform: translateX(240px); }
 78% { opacity: 0; transform: translateX(-220px); }
 80% { opacity: 1; transform: translateX(-220px); }
 92%, 100% { opacity: 1; transform: translateX(0); }
`;
const retWheel = keyframes`
 0%, 54% { transform: rotate(0deg); }
 74% { transform: rotate(900deg); }
 80% { transform: rotate(900deg); }
 92%, 100% { transform: rotate(1800deg); }
`;
const retPuff = keyframes`
 0%, 54% { opacity: 0; transform: translateX(0) scale(0.4); }
 57% { opacity: 0.9; transform: translateX(-6px) scale(1); }
 64%, 100% { opacity: 0; transform: translateX(-22px) scale(1.7); }
`;
const retChip = keyframes`
 0%, 58% { opacity: 0; transform: scale(0.3); }
 62% { opacity: 1; transform: scale(1.1); }
 64%, 92% { opacity: 1; transform: scale(1); }
 96%, 100% { opacity: 0; transform: scale(1); }
`;

/* Shop (6s): shopkeeper waves, products pop onto the shelf, stars,
   the "Trusted seller" stamp slams down and the shop shakes */
const shopWave = wiggle([[4, 30], [70, 86]], 1.6, "rotate(-35deg)", "rotate(15deg)", "rotate(0deg)");
const shopItem = keyframes`
 0%, 10% { opacity: 0; transform: translateY(-18px) scale(0.3); }
 15% { opacity: 1; transform: translateY(0) scale(1.15); }
 18%, 92% { opacity: 1; transform: translateY(0) scale(1); }
 96%, 100% { opacity: 0; transform: translateY(0) scale(1); }
`;
const shopStar = keyframes`
 0%, 34% { opacity: 0; transform: scale(0) rotate(-60deg); }
 39% { opacity: 1; transform: scale(1.3) rotate(10deg); }
 42%, 92% { opacity: 1; transform: scale(1) rotate(0deg); }
 96%, 100% { opacity: 0; transform: scale(0.6) rotate(0deg); }
`;
const shopStamp = keyframes`
 0%, 52% { opacity: 0; transform: scale(2.6) rotate(-30deg); }
 59% { opacity: 1; transform: scale(0.94) rotate(-12deg); }
 61% { opacity: 1; transform: scale(1.06) rotate(-12deg); }
 63%, 92% { opacity: 1; transform: scale(1) rotate(-12deg); }
 96%, 100% { opacity: 0; transform: scale(1) rotate(-12deg); }
`;
const shopShake = keyframes`
 0%, 58.5% { transform: translateX(0); }
 59.5% { transform: translateX(-5px); }
 60.5% { transform: translateX(5px); }
 61.5% { transform: translateX(-3px); }
 62.5% { transform: translateX(3px); }
 63.5%, 100% { transform: translateX(0); }
`;

// Slide crossfade inside the showcase
const scSlideIn = keyframes`
 from { opacity: 0; transform: translateY(16px) scale(0.98); }
 to { opacity: 1; transform: none; }
`;
const scSlideOut = keyframes`
 from { opacity: 1; transform: none; }
 to { opacity: 0; transform: translateY(-14px) scale(0.98); }
`;

const loop = (k: ReturnType<typeof keyframes>, ms: number, ease = "ease-in-out") => css`
 animation: ${k} ${ms}ms ${ease} infinite both;
`;

export const AuthShowcase = styled.section`
 position: relative;
 z-index: 2;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 gap: 8px;
 padding: 48px 44px 40px;
 overflow: hidden;
 text-align: center;
 /* Flat, crisp panel (no soft glows / gradient haze) */
 background: #fbf7f4;
 border-left: 1px solid ${({ theme }) => theme.tz.color.line};

 /* Swap arrival: glides from where it sat on the previous page to its new
    side, in front of the form */
 [data-swap="in"] & {
  animation: ${showcaseIn} ${AUTH_SWAP_MS}ms ${swapEase} both;
 }


 > * {
  position: relative;
  z-index: 1;
 }

 /* Slides stack in one grid cell so the outgoing and incoming slide can
    crossfade on top of each other */
 .sc-viewport {
  display: grid;
  width: 100%;
  justify-items: center;
 }

 .sc-slide {
  grid-area: 1 / 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
 }

 .sc-slide.is-in {
  animation: ${scSlideIn} 700ms cubic-bezier(0.22, 1, 0.36, 1) 160ms both;
 }

 .sc-slide.is-out {
  pointer-events: none;
  animation: ${scSlideOut} 520ms cubic-bezier(0.4, 0, 0.2, 1) both;
 }

 .sc-stage {
  width: 100%;
  max-width: 360px;
 }

 .sc-stage svg {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
 }

 .sc-copy {
  max-width: 380px;
 }

 .sc-eyebrow {
  display: inline-block;
  margin-bottom: 10px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.tz.color.emberDeep};
  background: rgba(240, 80, 35, 0.1);
 }

 .sc-title {
  margin: 0 0 8px;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 24px;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.tz.color.ink};
 }

 .sc-text {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.6;
  color: ${({ theme }) => theme.tz.color.slate};
 }

 .sc-nav {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 22px;
 }

 .sc-bar {
  position: relative;
  width: 28px;
  height: 6px;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: 999px;
  background: rgba(14, 52, 96, 0.14);
  cursor: pointer;
  transition: width 350ms cubic-bezier(0.2, 0, 0, 1), background-color 200ms;
 }

 .sc-bar:hover {
  background: rgba(14, 52, 96, 0.24);
 }

 .sc-bar.is-active {
  width: 56px;
 }

 .sc-bar > span {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(90deg, ${({ theme }) => theme.tz.color.ember}, ${({ theme }) => theme.tz.color.emberDeep});
  transform-origin: left;
  animation: ${scFill} var(--sc-ms, 4500ms) linear both;
 }

 &[data-paused] .sc-bar > span {
  animation-play-state: paused;
 }

 .sc-bar:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }


 /* ---- shared helpers ---- */
 .sc-float {
  animation: ${scFloat} 3.4s ease-in-out infinite;
 }
 .sc-float.d1 {
  animation-delay: -0.9s;
 }
 .sc-float.d2 {
  animation-delay: -1.8s;
 }
 .sc-float.d3 {
  animation-delay: -2.6s;
 }

 /* ---- stories: every animated part keeps its own box as transform origin */
 .sc-stage svg * {
  transform-box: fill-box;
  transform-origin: center;
 }
 .o-bottom {
  transform-origin: 50% 100% !important;
 }
 .o-top {
  transform-origin: 50% 0 !important;
 }
 .o-left {
  transform-origin: 0 50% !important;
 }
 .o-rear {
  transform-origin: 22% 100% !important;
 }

 /* delivery */
 .dl-truck { ${loop(dlTruck, DL_MS)} }
 .dl-squash { ${loop(dlSquash, DL_MS)} }
 .dl-wheel { ${loop(dlWheel, DL_MS)} }
 .dl-speed { ${loop(dlSpeed, DL_MS, "linear")} }
 .dl-puff { ${loop(dlPuff, DL_MS, "ease-out")} }
 .dl-puff.p2 { animation-delay: 90ms; }
 .dl-puff.p3 { animation-delay: 180ms; }
 .dl-beep { ${loop(dlBeep, DL_MS, "ease-out")} }
 .dl-walk { ${loop(dlWalk, DL_MS)} }
 .dl-hop { ${loop(dlHop, DL_MS)} }
 .dl-bob { ${loop(dlBob, DL_MS, "linear")} }
 .dl-leg.a { ${loop(dlLegA, DL_MS, "linear")} }
 .dl-leg.b { ${loop(dlLegB, DL_MS, "linear")} }
 .dl-face { ${loop(dlFace, DL_MS, "linear")} }
 .dl-hand-parcel { ${loop(dlHandParcel, DL_MS, "linear")} }
 .dl-wave-on { ${loop(dlWaveOn, DL_MS, "linear")} }
 .dl-arm.a { ${loop(dlArmA, DL_MS, "linear")} }
 .dl-arm.b { ${loop(dlArmB, DL_MS, "linear")} }
 .dl-hand-free { ${loop(dlHandFree, DL_MS, "linear")} }
 .dl-cap { ${loop(dlCap, DL_MS)} }
 .dl-arms-up { ${loop(dlArmsUp, DL_MS, "linear")} }
 .dl-arms-down { ${loop(dlArmsDown, DL_MS, "linear")} }
 .dl-spark { ${loop(dlSpark, DL_MS, "ease-out")} }
 .dl-dupatta { ${loop(dlDupatta, DL_MS, "linear")} }
 .dl-cloud {
  animation: ${sceneCloud} 16s ease-in-out infinite alternate;
 }
 .dl-cloud.c2 {
  animation-duration: 22s;
  animation-delay: -7s;
 }
 .dl-smoke {
  animation: ${sceneSmoke} 3.6s ease-out infinite;
 }
 .dl-smoke.s2 { animation-delay: -1.2s; }
 .dl-smoke.s3 { animation-delay: -2.4s; }
 .dl-signlight {
  animation: ${signBlink} 0.9s steps(1) infinite;
 }
 .dl-signlight.b2 { animation-delay: -0.45s; }
 .blink {
  animation: ${eyeBlink} 3.4s ease-in-out infinite;
 }
 .blink.late { animation-delay: -1.7s; }
 .dl-spark.k2 { animation-delay: 150ms; }
 .dl-spark.k3 { animation-delay: 300ms; }
 .dl-knock { ${loop(dlKnock, DL_MS, "ease-out")} }
 .dl-door { ${loop(dlDoor, DL_MS)} }
 .dl-customer { ${loop(dlCustomer, DL_MS)} }
 .dl-jump { ${loop(dlJump, DL_MS)} }
 .dl-cparcel { ${loop(dlCParcel, DL_MS, "linear")} }
 .dl-yay { ${loop(dlYay, DL_MS, "ease-out")} }
 .dl-heart { ${loop(dlHeart, DL_MS, "ease-out")} }
 .dl-heart.h2 { animation-delay: 220ms; }
 .dl-heart.h3 { animation-delay: 440ms; }
 .dl-banner { ${loop(dlBanner, DL_MS, "ease-out")} }
 .dl-line1 { ${loop(dlLine1, DL_MS)} }
 .dl-line2 { ${loop(dlLine2, DL_MS)} }
 .dl-step2 { ${loop(dlStep2, DL_MS, "linear")} }
 .dl-step3 { ${loop(dlStep3, DL_MS, "ease-out")} }

 /* payment */
 .pay-card { ${loop(payCard, STORY_MS)} }
 .pay-btn { ${loop(payBtn, STORY_MS)} }
 .pay-spin-on { ${loop(paySpinOn, STORY_MS, "linear")} }
 .pay-spin {
  animation: ${paySpin} 800ms linear infinite;
 }
 .pay-ok { ${loop(payOk, STORY_MS, "ease-out")} }
 .pay-ok.late { animation-delay: 120ms; }
 .pay-confetti { ${loop(payConfetti, STORY_MS, "ease-out")} }

 /* returns */
 .ret-eye { ${loop(retBlink, STORY_MS, "linear")} }
 .ret-arm { ${loop(retArm, STORY_MS, "linear")} }
 .ret-bye { ${loop(retBye, STORY_MS, "ease-out")} }
 .ret-box { ${loop(retBox, STORY_MS)} }
 .ret-van { ${loop(retVan, STORY_MS)} }
 .ret-wheel { ${loop(retWheel, STORY_MS)} }
 .ret-puff { ${loop(retPuff, STORY_MS, "ease-out")} }
 .ret-puff.p2 { animation-delay: 120ms; }
 .ret-chip { ${loop(retChip, STORY_MS, "ease-out")} }

 /* shop */
 .shop-wave { ${loop(shopWave, STORY_MS, "linear")} }
 .shop-item { ${loop(shopItem, STORY_MS, "ease-out")} }
 .shop-item.i2 { animation-delay: 360ms; }
 .shop-item.i3 { animation-delay: 720ms; }
 .shop-star { ${loop(shopStar, STORY_MS, "ease-out")} }
 .shop-star.s2 { animation-delay: 240ms; }
 .shop-star.s3 { animation-delay: 480ms; }
 .shop-stamp { ${loop(shopStamp, STORY_MS, "ease-in")} }
 .shop-shake { ${loop(shopShake, STORY_MS, "linear")} }

 /* Bubbles, hearts, puffs, confetti and the wave arm are hidden in the base
    (reduced-motion) scene; their keyframes bring them in */
 @media (prefers-reduced-motion: reduce) {
  .dl-beep,
  .dl-knock,
  .dl-yay,
  .dl-heart,
  .dl-puff,
  .dl-speed,
  .dl-wave-on,
  .dl-hand-parcel,
  .dl-arms-up,
  .dl-spark,
  .dl-smoke,
  .pay-card,
  .pay-spin-on,
  .pay-confetti,
  .ret-bye,
  .ret-puff {
   opacity: 0;
  }
 }

 /* Hover / pause button freezes the story (and every slide) mid-scene */
 &[data-paused] .sc-stage * {
  animation-play-state: paused;
 }

 @media screen and (max-width: 900px) {
  display: none;
 }

 @media (prefers-reduced-motion: reduce) {
  &,
  & * {
   animation: none !important;
  }
 }
`;

const scrollUp = keyframes`
 from { transform: translateY(0); }
 to { transform: translateY(-50%); }
`;

const scrollDown = keyframes`
 from { transform: translateY(-50%); }
 to { transform: translateY(0); }
`;

// The glow elements are drawn at half size and scaled 2x here: soft gradients
// look identical, but the GPU only has to keep 1/4 of the pixels.
const auroraDrift = keyframes`
 0%, 100% { transform: translate3d(0, 0, 0) scale(2); }
 33% { transform: translate3d(16%, -12%, 0) scale(2.3); }
 66% { transform: translate3d(-12%, 16%, 0) scale(1.8); }
`;

const sheenSweep = keyframes`
 0%, 70% { transform: translateX(-120%); }
 100% { transform: translateX(400%); }
`;

// Deep showcase panel: navy-to-ink base, 3 drifting aurora glows, the tilted
// HD card wall, a cursor spotlight, grain, and a glass caption.
// $side = where the wall sits (left on signup, right on login).
// Rendered once in (auth)/layout.tsx for /login and /signup, so it stays
// mounted (same cards, same scroll position) when the pages switch.
export const AuthWall = styled.div`
 position: fixed;
 inset: 0;
 z-index: 0;
 overflow: hidden;
 perspective: 1400px;
 background: radial-gradient(120% 90% at 20% 0%, #17406f 0%, transparent 60%),
  linear-gradient(160deg, ${({ theme }) => theme.tz.color.navy} 0%, #0b1a33 55%, #090d18 100%);
 isolation: isolate;

 /* Aurora glows: soft radial gradients (no blur filter), drifting by
    transform only, so they are painted once and moved by the compositor. */
 .wall-aurora {
  position: absolute;
  z-index: 0;
  opacity: 0.35;
  pointer-events: none;
  animation: ${auroraDrift} 18s ease-in-out infinite;
 }
 .wall-aurora.a1 {
  top: -5%;
  left: -2.5%;
  width: 45%;
  height: 40%;
  background: radial-gradient(closest-side, rgba(240, 80, 35, 0.75), transparent);
 }
 .wall-aurora.a2 {
  bottom: -8.75%;
  right: -1.25%;
  width: 47.5%;
  height: 42.5%;
  background: radial-gradient(closest-side, rgba(43, 108, 176, 0.75), transparent);
  animation-duration: 22s;
  animation-delay: -6s;
 }

 /* One shared light sheen sweeping over the whole wall (instead of a
    separate glint animation on every card). */
 .wall-sheen {
  position: absolute;
  top: -20%;
  bottom: -20%;
  left: 0;
  z-index: 2;
  width: 35%;
  pointer-events: none;
  background: linear-gradient(
   100deg,
   transparent,
   rgba(255, 255, 255, 0.1) 45%,
   rgba(255, 255, 255, 0.16) 50%,
   rgba(255, 255, 255, 0.1) 55%,
   transparent
  );
  animation: ${sheenSweep} 9s ease-in-out infinite;
 }

 /* Cursor spotlight: a fixed-size glow; AuthCardWall moves it by writing its
    transform directly (no blend mode, no CSS variables, no repaint). */
 .wall-spot {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  width: 420px;
  height: 420px;
  pointer-events: none;
  background: radial-gradient(closest-side, rgba(255, 170, 120, 0.07), transparent);
  /* half-size glow scaled 2x around its centre (same look, 1/4 the memory) */
  transform: translate3d(calc(50vw - 210px), calc(50vh - 210px), 0) scale(2);
  transition: transform 150ms linear;
 }


 /* Give the whole frame budget to the swap while it runs */
 html[data-auth-swap] & .wall-aurora,
 html[data-auth-swap] & .wall-sheen {
  animation-play-state: paused;
 }

 @media (prefers-reduced-motion: reduce) {
  .wall-aurora,
  .wall-sheen {
   animation: none;
  }
  .wall-sheen {
   display: none;
  }
 }

 /* Tab hidden / window not focused: everything stands still */
 &[data-paused],
 &[data-paused] * {
  animation-play-state: paused !important;
 }

 @media screen and (max-width: 900px) {
  display: none;
 }
`;

// Rotated row of columns; oversized so the tilt never shows an empty corner
export const AuthWallTrack = styled.div<{ $tilt?: number }>`
 position: absolute;
 z-index: 1;
 /* Just big enough to cover the screen at -18deg (plus parallax room);
    narrower columns keep each column's GPU layer small */
 top: -28%;
 left: -16%;
 display: flex;
 gap: 26px;
 width: 132%;
 height: 156%;
 /* Mouse parallax writes the full transform inline (AuthCardWall); this is
    the resting pose */
 transform: rotate(${({ $tilt = -18 }) => $tilt}deg);
 transition: transform 700ms cubic-bezier(0.2, 0, 0, 1);

 @media (prefers-reduced-motion: reduce) {
  transition: none;
 }
`;

// $depth 0 = front (full size, sharp), 1 = middle, 2 = back (smaller, dim, soft)
export const AuthWallColumn = styled.div<{
 $reverse?: boolean;
 $duration?: number;
 $depth?: 0 | 1 | 2;
}>`
 display: flex;
 flex: ${({ $depth = 0 }) => [1, 0.88, 0.76][$depth]};
 flex-direction: column;
 gap: 26px;
 /* Depth + the backdrop dimming in one opacity value (the columns are
    already GPU layers, so this costs nothing; a separate full-screen dark
    layer would cost ~4 MB) */
 opacity: ${({ $depth = 0 }) => [0.3, 0.27, 0.22][$depth]};
 animation: ${({ $reverse }) => ($reverse ? scrollDown : scrollUp)}
  ${({ $duration = 40 }) => $duration}s linear infinite;

 /* The wall lives outside AuthPage now, so match the swap from the root */
 html[data-auth-swap] & {
  animation-play-state: paused;
 }

 /* Lite mode (weak devices): the wall stands still */
 [data-lite] & {
  animation: none;
 }

 @media (prefers-reduced-motion: reduce) {
  animation: none;
 }
`;

type WallTone = "paper" | "ember" | "navy";

export const AuthWallCard = styled.div<{ $tone?: WallTone; $tint?: string }>`
 position: relative;
 flex-shrink: 0;
 overflow: hidden;
 padding: 10px;
 border-radius: 24px;
 border: 1px solid rgba(255, 255, 255, 0.08);
 box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35), 0 2px 6px rgba(0, 0, 0, 0.2);
 background: ${({ theme, $tone = "paper" }) =>
  $tone === "ember"
   ? `linear-gradient(140deg, ${theme.tz.color.ember}, ${theme.tz.color.emberDark})`
   : $tone === "navy"
     ? `linear-gradient(140deg, #1d4f8c, ${theme.tz.color.navy})`
     : theme.tz.color.paper};
 color: ${({ theme, $tone = "paper" }) =>
  $tone === "paper" ? theme.tz.color.ink : theme.tz.color.paper};
 transition: transform 300ms cubic-bezier(0.2, 0, 0, 1), box-shadow 300ms;

 &:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 28px 60px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 170, 120, 0.4);
 }

 /* Studio shot: HD cutout on a soft tinted backdrop */
 .wall-shot {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 1 / 1;
  padding: 6px;
  border-radius: 16px;
  background: radial-gradient(80% 70% at 50% 40%, #fff 0%, ${({ $tint = "#F4F5F8" }) => $tint} 80%);
 }

 .wall-shot img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 12px 14px rgba(14, 21, 32, 0.22));
  transition: transform 400ms cubic-bezier(0.2, 0, 0, 1);
 }

 &:hover .wall-shot img {
  transform: scale(1.06);
 }

 .wall-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  padding: 3px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  background: ${({ theme }) => theme.tz.tone.danger.fill};
  box-shadow: 0 4px 10px rgba(217, 48, 54, 0.35);
 }

 .wall-heart {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 15px;
  line-height: 1;
  color: ${({ theme }) => theme.tz.color.emberDeep};
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 3px 8px rgba(14, 21, 32, 0.12);
 }

 .wall-cat {
  margin: 10px 4px 0;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.tz.color.slate};
 }

 .wall-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 2px 4px 2px;
 }

 .wall-row .wall-price {
  margin: 0;
 }

 .wall-was {
  font-size: 12px;
  color: ${({ theme }) => theme.tz.color.slate};
 }

 .wall-add {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  margin-left: auto;
  border-radius: 50%;
  font-size: 18px;
  font-weight: 600;
  line-height: 1;
  color: #fff;
  background: ${({ theme }) => theme.tz.color.ink};
  transition: background-color 200ms, transform 200ms;
 }

 &:hover .wall-add {
  background: ${({ theme }) => theme.tz.color.ember};
  transform: rotate(90deg);
 }

 img.wide {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 7;
  object-fit: cover;
  border-radius: 16px;
 }

 .wall-name {
  margin: 10px 4px 2px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 600;
 }

 .wall-cat + .wall-name {
  margin-top: 2px;
 }

 .wall-price {
  margin: 0 4px 4px;
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme, $tone = "paper" }) =>
   $tone === "paper" ? theme.tz.color.emberDeep : "inherit"};
 }

 .wall-big {
  margin: 8px 6px;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 28px;
  font-weight: 700;
  line-height: 1.05;
 }

 .wall-small {
  margin: 0 6px 6px;
  font-size: 13px;
  opacity: 0.85;
 }

 .wall-icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin: 6px 6px 4px;
  border-radius: 14px;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.paper};
  background: ${({ theme }) => theme.tz.color.ember};
 }

 .wall-bar {
  height: 8px;
  margin: 10px 6px 6px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.lineSoft};
  overflow: hidden;
 }

 .wall-bar > span {
  display: block;
  width: 75%;
  height: 100%;
  border-radius: inherit;
  background: ${({ theme }) => theme.tz.color.ember};
 }

`;
