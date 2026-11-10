"use client";

import Link from "next/link";
import styled, { keyframes } from "styled-components";

// Sidebar motion: items fade in once (staggered), the active highlight glides
// between items, count badges pop when their number changes. Transform /
// opacity only, nothing loops.
const navIn = keyframes`
 from { opacity: 0; transform: translateX(-8px); }
 to { opacity: 1; transform: none; }
`;
const countPop = keyframes`
 0% { transform: scale(1); }
 40% { transform: scale(1.3); }
 100% { transform: scale(1); }
`;

// Customer dashboard shell: sidebar column plus content column.
// The vendor dashboard keeps using ../styles.ts.

export const DashboardShell = styled.div`
 display: grid;
 grid-template-columns: 280px minmax(0, 1fr);
 gap: 24px;
 align-items: start;

 .dash-aside {
  position: sticky;
  top: 24px;
 }

 @media (max-width: 1024px) {
  grid-template-columns: minmax(0, 1fr);

  .dash-aside {
   display: none;
  }
 }
`;

export const NavPanel = styled.nav`
 position: relative;
 display: flex;
 flex-direction: column;
 overflow: hidden;
 padding: 0 0 12px;
 background: ${({ theme }) => theme.tz.color.paper};
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: ${({ theme }) => theme.tz.radius.md}px;

 /* Inside the mobile Sidenav drawer */
 @media (max-width: 1024px) {
  min-height: 100%;
  border: 0;
  border-radius: 0;
 }
`;

// User card motion: ring turns slowly, glow breathes, a one-time shine sweeps
// across, text lines rise in one after another. All off for reduced motion.
const nuSpin = keyframes`
 to { transform: rotate(360deg); }
`;
// Glow is a pseudo-element that scales + fades (GPU only), not an animated
// box-shadow, which would repaint every frame for as long as the page is open.
const nuGlow = keyframes`
 0% { opacity: 0.55; transform: scale(1); }
 70%, 100% { opacity: 0; transform: scale(1.32); }
`;
const nuShine = keyframes`
 from { transform: translateX(-120%) skewX(-18deg); }
 to { transform: translateX(260%) skewX(-18deg); }
`;
const nuRise = keyframes`
 from { opacity: 0; transform: translateY(6px); }
 to { opacity: 1; transform: none; }
`;
const nuPop = keyframes`
 0% { opacity: 0; transform: scale(0.6); }
 70% { opacity: 1; transform: scale(1.06); }
 100% { opacity: 1; transform: none; }
`;
const nuDot = keyframes`
 0%, 100% { transform: scale(1); opacity: 1; }
 50% { transform: scale(1.25); opacity: 0.85; }
`;

export const NavUser = styled.div`
 position: relative;
 overflow: hidden;
 isolation: isolate;
 display: flex;
 align-items: center;
 gap: 14px;
 padding: 22px 18px 20px;
 margin-bottom: 4px;
 border-bottom: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
 background: radial-gradient(90% 140% at 0% 0%, ${({ theme }) => theme.tz.color.emberTint} 0%, transparent 65%),
  radial-gradient(70% 120% at 100% 100%, rgba(14, 52, 96, 0.09) 0%, transparent 70%),
  linear-gradient(135deg, #fff8f4 0%, ${({ theme }) => theme.tz.color.navyTint} 100%);

 /* one-time shine on load */
 &::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 40%;
  z-index: -1;
  pointer-events: none;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.7), transparent);
  transform: translateX(-120%) skewX(-18deg);
  animation: ${nuShine} 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.35s 1 both;
 }

 .nu-avatar {
  position: relative;
  flex-shrink: 0;
  display: inline-flex;
  padding: 3px;
  border-radius: 50%;
  isolation: isolate;
  animation: ${nuPop} 520ms cubic-bezier(0.22, 1, 0.36, 1) both;
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);

  /* rotating gradient ring */
  &::before {
   content: "";
   position: absolute;
   inset: 0;
   z-index: -1;
   border-radius: 50%;
   background: conic-gradient(
    from 0deg,
    ${({ theme }) => theme.tz.color.ember},
    #ffb38a,
    ${({ theme }) => theme.tz.color.navy},
    #ffb38a,
    ${({ theme }) => theme.tz.color.ember}
   );
   animation: ${nuSpin} 6s linear infinite;
  }

  /* breathing glow */
  &::after {
   content: "";
   position: absolute;
   inset: 0;
   z-index: -2;
   border-radius: 50%;
   background: rgba(240, 80, 35, 0.45);
   opacity: 0;
   animation: ${nuGlow} 2.8s ease-out 0.6s infinite;
  }

  > * {
   border: 2px solid #fff;
   border-radius: 50%;
  }
 }

 .nu-dot {
  position: absolute;
  right: 1px;
  bottom: 1px;
  width: 12px;
  height: 12px;
  border: 2px solid #fff;
  border-radius: 50%;
  background: #1e8a55;
  animation: ${nuDot} 2.4s ease-in-out infinite;
 }

 &:hover .nu-avatar {
  transform: scale(1.05);
 }
 &:hover .nu-avatar::before {
  animation-duration: 1.6s;
 }

 .nu-text {
  min-width: 0;
 }

 .nu-name {
  margin: 0;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
  color: ${({ theme }) => theme.tz.color.ink};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  animation: ${nuRise} 460ms cubic-bezier(0.22, 1, 0.36, 1) 120ms both;
 }

 .nu-email {
  margin: 2px 0 0;
  font-size: 13px;
  color: ${({ theme }) => theme.tz.color.slate};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  animation: ${nuRise} 460ms cubic-bezier(0.22, 1, 0.36, 1) 200ms both;
 }

 .nu-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 7px;
  padding: 3px 10px 3px 7px;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.tz.color.navy};
  background: linear-gradient(#fff, #fff) padding-box,
   linear-gradient(135deg, ${({ theme }) => theme.tz.color.ember}, ${({ theme }) => theme.tz.color.navy}) border-box;
  box-shadow: 0 2px 8px rgba(14, 52, 96, 0.08);
  animation: ${nuRise} 460ms cubic-bezier(0.22, 1, 0.36, 1) 280ms both;

  svg {
   width: 12px;
   height: 12px;
  }
 }

 .nu-chip--corp {
  color: #6d28d9;
  background: linear-gradient(#fff, #fff) padding-box, linear-gradient(135deg, #a78bfa, #6d28d9) border-box;
 }

 @media (prefers-reduced-motion: reduce) {
  &::after,
  .nu-avatar,
  .nu-avatar::before,
  .nu-avatar::after,
  .nu-dot,
  .nu-name,
  .nu-email,
  .nu-chip {
   animation: none;
  }
  &::after {
   display: none;
  }
  .nu-avatar {
   transition: none;
  }
 }
`;

export const NavGroupLabel = styled.p`
 display: flex;
 align-items: center;
 gap: 10px;
 margin: 0;
 padding: 16px 20px 6px;

 &::after {
  content: "";
  flex: 1;
  height: 1px;
  background: ${({ theme }) => theme.tz.color.lineSoft};
 }

 font-size: 12px;
 font-weight: 600;
 letter-spacing: 0.06em;
 text-transform: uppercase;
 color: ${({ theme }) => theme.tz.color.slate};
`;

const navItemStyles = ({ theme }) => `
 position: relative;
 display: flex;
 align-items: center;
 gap: 12px;
 min-height: 44px;
 margin: 2px 12px;
 padding: 8px 12px;
 border-radius: ${theme.tz.radius.sm}px;
 font-size: 15px;
 font-weight: 500;
 line-height: 1.3;
 color: ${theme.tz.color.inkSoft};
 text-decoration: none;
 z-index: 1;
 transition: color ${theme.tz.motion.fast}, transform 200ms cubic-bezier(0.22, 1, 0.36, 1);

 .ni-icon {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  color: var(--fg, ${theme.tz.color.slate});
  background: var(--bg, ${theme.tz.color.mist});
  transition: color 150ms, background-color 150ms, transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
 }

 .ni-label {
  flex: 1 1 auto;
  min-width: 0;
 }

 .ni-count {
  min-width: 24px;
  padding: 2px 8px;
  border-radius: ${theme.tz.radius.pill}px;
  background: ${theme.tz.color.lineSoft};
  color: ${theme.tz.color.slate};
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  font-variant-numeric: tabular-nums;
 }
 /* Something to look at: the badge takes the item's colour */
 .ni-count.has {
  color: var(--fg, ${theme.tz.color.ink});
  background: var(--bg, ${theme.tz.color.mist});
 }

 &:hover {
  color: ${theme.tz.color.ink};
  transform: translateX(3px);

  .ni-icon {
   color: #fff;
   background: var(--fg, ${theme.tz.color.ink});
  }
 }

 &:focus-visible {
  outline: none;
  box-shadow: ${theme.tz.focusRing};
 }

 ${theme.tz.media.reducedMotion} {
  transition: none;
  animation: none;

  .ni-count {
   animation: none;
  }

  &:hover {
   transform: none;
  }
 }
`;

export const NavItem = styled(Link)`
 ${navItemStyles}

 /* Keyframe animations live here: navItemStyles is a plain string helper,
    where styled-components can't inject keyframes */
 animation: ${navIn} 420ms cubic-bezier(0.22, 1, 0.36, 1) calc(var(--i, 0) * 40ms) backwards;

 .ni-count {
  animation: ${countPop} 360ms cubic-bezier(0.22, 1, 0.36, 1);
 }

 ${({ theme }) => theme.tz.media.reducedMotion} {
  animation: none;

  .ni-count {
   animation: none;
  }
 }

 /* The tinted background comes from the sliding NavIndicator */
 &[aria-current="page"] {
  color: ${({ theme }) => theme.tz.color.emberDeep};
  font-weight: 700;

  .ni-icon {
   color: #fff;
   background: linear-gradient(135deg, ${({ theme }) => theme.tz.color.ember}, ${({ theme }) => theme.tz.color.emberDeep});
  }

  .ni-count {
   background: ${({ theme }) => theme.tz.color.paper};
   color: ${({ theme }) => theme.tz.color.emberDeep};
  }
 }
`;

// One highlight that glides to the current page (moved by transform from
// DashboardNavigation). Sits under the items (z-index).
export const NavIndicator = styled.span`
 position: absolute;
 top: 0;
 left: 12px;
 right: 12px;
 z-index: 0;
 height: 44px;
 border-radius: ${({ theme }) => theme.tz.radius.sm}px;
 background: ${({ theme }) => theme.tz.color.emberTint};
 opacity: 0;
 pointer-events: none;
 transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), height 420ms cubic-bezier(0.22, 1, 0.36, 1),
  opacity 200ms;

 &::before {
  content: "";
  position: absolute;
  left: -12px;
  top: 8px;
  bottom: 8px;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: ${({ theme }) => theme.tz.color.ember};
 }

 ${({ theme }) => theme.tz.media.reducedMotion} {
  transition: none;
 }
`;

export const NavButton = styled.button`
 ${navItemStyles}

 /* Keyframe animations live here: navItemStyles is a plain string helper,
    where styled-components can't inject keyframes */
 animation: ${navIn} 420ms cubic-bezier(0.22, 1, 0.36, 1) calc(var(--i, 0) * 40ms) backwards;

 .ni-count {
  animation: ${countPop} 360ms cubic-bezier(0.22, 1, 0.36, 1);
 }

 ${({ theme }) => theme.tz.media.reducedMotion} {
  animation: none;

  .ni-count {
   animation: none;
  }
 }
 width: calc(100% - 24px);
 border: 0;
 background: transparent;
 font-family: inherit;
 text-align: left;
 cursor: pointer;
 --fg: #c0262d;
 --bg: #fdecec;

 &:hover {
  color: #c0262d;
 }
`;

export const NavDivider = styled.hr`
 margin: 12px 20px 8px;
 border: 0;
 border-top: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
`;
