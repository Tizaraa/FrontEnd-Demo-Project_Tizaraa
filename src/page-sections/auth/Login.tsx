"use client";

import { postLoginPath } from "@utils/corporateRedirect";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import useVisibility from "./useVisibility";
import { useAppContext } from "contexts/app-context/AppContext"; // Context for managing user auth state
import axios from "axios"; // Import axios for API calls
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

import Box from "@component/Box";
import Icon from "@component/icon/Icon";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import TextField from "@component/text-field";
import CheckBox from "@component/CheckBox";
import { Button, IconButton } from "@component/buttons";
import { H3, H5, H6, SemiSpan, Small, Span } from "@component/Typography";
import {
 AuthBrand,
 AuthDivider,
 AuthErrorText,
 AuthAltCta,
 AuthAltLabel,
 AuthLegal,
 AuthPage,
 AuthPane,
 AuthSubtitle,
 AuthWall,
 AuthShell,
 AuthShowcase,
 AuthWallCard,
 DL_MS,
 STORY_MS,
 AuthWallColumn,
 AuthWallTrack,
 AuthSuccessNote,
 AuthTextButton,
 AuthTitle,
 SocialButton,
 AUTH_SWAP_MS,
} from "./styles";
import tz from "../../theme/tizaraa";
import authService from "services/authService";
import ApiBaseUrl from "api/ApiBaseUrl";
import BeatLoader from "react-spinners/BeatLoader";
import ForgotPasswordModal from "./ForgotPasswordModal";

// Separate from the seller/admin keys used by the seller panel
const REMEMBER_EMAIL_KEY = "customer_remember_email";


// Decorative card wall shared by login (wall on the right) and signup (wall on
// the left, imported from here). Product shots are the HD transparent cutouts
// in public/assets/images (640-1600px), so cards stay sharp on large screens.
type WallCard =
 | {
   kind: "product";
   img: string;
   name: string;
   cat: string;
   price: string;
   was?: string; // old price, shown crossed out
   off?: string; // sale badge, e.g. "-20%"
   tint: string;
  }
 | { kind: "banner"; img: string }
 | { kind: "promo"; tone: "ember" | "navy"; big: string; small: string }
 | { kind: "perk"; icon: string; title: string; small: string }
 | { kind: "track"; title: string; status: string };

type WallColumn = {
 cards: WallCard[];
 reverse?: boolean;
 duration: number;
 depth: 0 | 1 | 2; // 0 front, 2 back
};

const img = (path: string) => encodeURI(`/assets/images/${path}`);

// Soft studio backdrops behind each cutout
const TINT = {
 peach: "#FDE3D6",
 mint: "#DDF3E8",
 lavender: "#E6E3FA",
 sky: "#DCEBFA",
 sand: "#F6EBD9",
 rose: "#FADDE3",
};

// One entry per product. Only 500x500 images are used here: a decoded image
// costs width x height x 4 bytes of RAM, so the earlier 800-1000px photos
// (~3-4 MB each) were swapped for these (~1 MB each). 10 unique images total;
// columns reuse them.
const PRODUCT = {
 puffer: { img: img("products/Fashion/Clothes/10.LandsJacket.png"), name: "Quilted Puffer Jacket", cat: "Fashion", price: "৳ 3,450", was: "৳ 4,300", off: "-20%", tint: TINT.rose },
 overcoat: { img: img("products/Fashion/Clothes/16.DoubleWoolOvercoat.png"), name: "Wool Overcoat", cat: "Fashion", price: "৳ 6,800", was: "৳ 8,500", off: "-20%", tint: TINT.sky },
 jeans: { img: img("products/Fashion/Clothes/4.DenimBlueJeans.png"), name: "Slim Denim Jeans", cat: "Fashion", price: "৳ 1,890", was: "৳ 2,350", off: "-20%", tint: TINT.sky },
 frock: { img: img("products/Fashion/Clothes/2.BlueBlossomFrock.png"), name: "Kids Blossom Frock", cat: "Kids", price: "৳ 1,250", tint: TINT.mint },
 cap: { img: img("products/Fashion/Accessories/3.BrownCap.png"), name: "Classic Cap", cat: "Accessories", price: "৳ 590", was: "৳ 750", off: "-21%", tint: TINT.sand },
 watch: { img: img("products/Fashion/Accessories/17.DigitalWristWatch.png"), name: "Smart Fitness Watch", cat: "Accessories", price: "৳ 3,290", was: "৳ 4,100", off: "-20%", tint: TINT.lavender },
 necklace: { img: img("products/Fashion/Jewellery/1.Heavy22ktGoldNecklaceSet.png"), name: "Gold Necklace Set", cat: "Jewellery", price: "৳ 85,000", tint: TINT.sand },
 locket: { img: img("products/Fashion/Jewellery/12.BlueStoneLocket.png"), name: "Blue Stone Locket", cat: "Jewellery", price: "৳ 7,500", was: "৳ 8,900", off: "-16%", tint: TINT.sky },
 cactus: { img: img("products/Home&Garden/11.BeautifulCactusinCeramicCup.png"), name: "Cactus Trio", cat: "Home", price: "৳ 650", was: "৳ 850", off: "-24%", tint: TINT.mint },
 speaker: { img: img("products/Electronics/1.Siri2020.png"), name: "Smart Speaker", cat: "Electronics", price: "৳ 4,990", was: "৳ 5,900", off: "-15%", tint: TINT.sky },
};

const p = (key: keyof typeof PRODUCT): WallCard => ({ kind: "product", ...PRODUCT[key] });

const LOGIN_COLUMNS: WallColumn[] = [
 {
  depth: 1,
  duration: 50,
  cards: [p("overcoat"), { kind: "promo", tone: "ember", big: "Flash Sale", small: "Up to 50% off today" }, p("cactus"), p("necklace")],
 },
 {
  depth: 0,
  reverse: true,
  duration: 44,
  cards: [p("puffer"), p("watch"), { kind: "track", title: "Order on the way", status: "Shipped · arriving tomorrow" }, p("locket")],
 },
 {
  depth: 2,
  duration: 60,
  cards: [p("speaker"), p("frock"), { kind: "promo", tone: "navy", big: "Free Delivery", small: "On orders over ৳ 1,000" }, p("jeans")],
 },
 {
  depth: 0,
  reverse: true,
  duration: 46,
  cards: [p("cap"), p("necklace"), { kind: "banner", img: img("banners/New-Arrival.webp") }, p("overcoat")],
 },
 {
  depth: 1,
  duration: 54,
  cards: [p("jeans"), { kind: "promo", tone: "ember", big: "New Arrivals", small: "Fresh picks every week" }, p("watch"), p("puffer")],
 },
];

function renderWallCard(card: WallCard, key: string) {
 switch (card.kind) {
  case "product":
   return (
    <AuthWallCard key={key} $tint={card.tint}>
     <div className="wall-shot">
      {card.off && <span className="wall-badge">{card.off}</span>}
      <span className="wall-heart">♡</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card.img} alt="" loading="lazy" decoding="async" />
     </div>
     <p className="wall-cat">{card.cat}</p>
     <p className="wall-name">{card.name}</p>
     <div className="wall-row">
      <span className="wall-price">{card.price}</span>
      {card.was && <s className="wall-was">{card.was}</s>}
      <span className="wall-add">+</span>
     </div>
    </AuthWallCard>
   );
  case "banner":
   return (
    <AuthWallCard key={key}>
     {/* eslint-disable-next-line @next/next/no-img-element */}
     <img className="wide" src={card.img} alt="" loading="lazy" decoding="async" />
    </AuthWallCard>
   );
  case "promo":
   return (
    <AuthWallCard key={key} $tone={card.tone}>
     <p className="wall-big">{card.big}</p>
     <p className="wall-small">{card.small}</p>
    </AuthWallCard>
   );
  case "perk":
   return (
    <AuthWallCard key={key}>
     <span className="wall-icon">{card.icon}</span>
     <p className="wall-name">{card.title}</p>
     <p className="wall-small">{card.small}</p>
    </AuthWallCard>
   );
  case "track":
   return (
    <AuthWallCard key={key}>
     <p className="wall-name">{card.title}</p>
     <div className="wall-bar">
      <span />
     </div>
     <p className="wall-small">{card.status}</p>
    </AuthWallCard>
   );
 }
}

// Login <-> signup panel swap. The click navigates immediately and leaves a
// flag in sessionStorage; the new page sees it and plays the whole swap in
// one motion (AuthPage data-swap="in", see styles.ts). Direct visits (typed
// URL, refresh) carry no flag.
const SWAP_KEY = "tz_auth_swap";
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useAuthSwap() {
 const router = useRouter();
 const [swap, setSwap] = useState<"in" | undefined>(undefined);

 // Fetch both auth pages ahead of time so the switch is instant
 // (Next only prefetches in production builds).
 useEffect(() => {
  router.prefetch("/signup");
  router.prefetch("/login");
 }, [router]);

 // Arrived through a swap? Play the transition. Layout effect so the panel
 // is already at its starting spot on the very first painted frame.
 useIsoLayoutEffect(() => {
  let timer = 0;
  try {
   if (sessionStorage.getItem(SWAP_KEY)) {
    sessionStorage.removeItem(SWAP_KEY);
    setSwap("in");
    // Lets the background (outside this page) pause cheaply meanwhile
    document.documentElement.dataset.authSwap = "in";
    timer = window.setTimeout(() => {
     delete document.documentElement.dataset.authSwap;
    }, AUTH_SWAP_MS);
   }
  } catch {
   // storage blocked: just skip the arrival animation
  }
  return () => {
   window.clearTimeout(timer);
   delete document.documentElement.dataset.authSwap;
  };
 }, []);

 const swapTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  // Let new-tab / modified clicks behave like normal links
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  e.preventDefault();
  try {
   sessionStorage.setItem(SWAP_KEY, "1");
  } catch {
   // storage blocked: the next page just won't animate in
  }
  // Switch right away; the new page animates the whole swap in one motion
  router.push(href);
 };

 return { swap, swapTo };
}

// Full-screen animated backdrop behind the login/signup card. Rendered once
// by (auth)/layout.tsx so it never remounts or changes between the two pages.
// The mouse position anywhere on the page tilts the card track in 3D and
// moves the spotlight.
// True while the tab is hidden or the browser window isn't focused. Animations
// pause then, so the page does no work while nobody is looking at it.
function useWindowAway() {
 const [away, setAway] = useState(false);
 useEffect(() => {
  const update = () => setAway(document.hidden || !document.hasFocus());
  update();
  document.addEventListener("visibilitychange", update);
  window.addEventListener("blur", update);
  window.addEventListener("focus", update);
  return () => {
   document.removeEventListener("visibilitychange", update);
   window.removeEventListener("blur", update);
   window.removeEventListener("focus", update);
  };
 }, []);
 return away;
}

// Lite mode for low-RAM / low-CPU devices or data-saver users: the wall is
// drawn once (no duplicate set for the loop), stands still, and its glow /
// sheen / spotlight layers are skipped. The card and its stories stay as-is.
const isLiteDevice = () => {
 const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
 return (
  (nav.deviceMemory ?? 8) <= 4 ||
  (nav.hardwareConcurrency ?? 8) <= 4 ||
  Boolean(nav.connection?.saveData)
 );
};

export function AuthCardWall() {
 const trackRef = useRef<HTMLDivElement>(null);
 const spotRef = useRef<HTMLSpanElement>(null);
 const [lite, setLite] = useState(false);
 const away = useWindowAway();

 useEffect(() => {
  setLite(isLiteDevice());
 }, []);

 // Mouse parallax + spotlight. The transforms are written straight onto the
 // two moving elements: changing CSS variables on the wall root used to make
 // the browser re-check the styles of every card on each mouse move.
 // The wall is fixed to the viewport, so the viewport size is its size.
 useEffect(() => {
  if (lite || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let frame = 0;
  const onMove = (e: MouseEvent) => {
   cancelAnimationFrame(frame);
   frame = requestAnimationFrame(() => {
    const mx = e.clientX / window.innerWidth - 0.5;
    const my = e.clientY / window.innerHeight - 0.5;
    if (trackRef.current) {
     trackRef.current.style.transform = `rotateX(${(my * 8).toFixed(2)}deg) rotateY(${(-mx * 8).toFixed(2)}deg) translate3d(${(-mx * 36).toFixed(1)}px, ${(-my * 36).toFixed(1)}px, 0) rotate(-18deg)`;
    }
    if (spotRef.current) {
     spotRef.current.style.transform = `translate3d(${Math.round(e.clientX - 210)}px, ${Math.round(e.clientY - 210)}px, 0) scale(2)`;
    }
   });
  };
  window.addEventListener("mousemove", onMove, { passive: true });
  return () => {
   cancelAnimationFrame(frame);
   window.removeEventListener("mousemove", onMove);
  };
 }, [lite]);

 const columns = LOGIN_COLUMNS;

 return (
  <AuthWall
   aria-hidden="true"
   data-lite={lite ? "true" : undefined}
   data-paused={away ? "true" : undefined}
  >
   {!lite && (
    <>
     <span className="wall-aurora a1" />
     <span className="wall-aurora a2" />
    </>
   )}

   <AuthWallTrack ref={trackRef} $tilt={-18}>
    {/* Each column is rendered twice so the scroll loops seamlessly
        (lite mode doesn't scroll, so one copy is enough) */}
    {columns.map((col, c) => (
     <AuthWallColumn
      key={c}
      $reverse={col.reverse}
      $duration={col.duration}
      $depth={col.depth}
     >
      {(lite ? col.cards : [...col.cards, ...col.cards]).map((card, i) =>
       renderWallCard(card, `${c}-${i}`),
      )}
     </AuthWallColumn>
    ))}
   </AuthWallTrack>

   {!lite && <span className="wall-sheen" />}
   {!lite && <span ref={spotRef} className="wall-spot" />}
  </AuthWall>
 );
}

// ---------------------------------------------------------------------------
// Feature showcase inside the card. Each slide = a tiny looping SVG story +
// title + text. The active bar fills over the slide's `ms`; its animationend
// moves to the next slide, so hover/focus or the pause button
// (animation-play-state) pause the bar and the story together. Slides
// crossfade: the old one stays mounted (.is-out) until its exit animation
// ends. Hover pauses it; it also pauses while the tab is hidden.
// Story timing lives in styles.ts (DL_MS / STORY_MS and the .dl-/.pay-/
// .ret-/.shop- classes); every SVG's base state is the happy final scene.
// ---------------------------------------------------------------------------
const C = tz.color;
const SKIN = "#f2c7a5";
const OK = tz.tone.success.fill;

// Speech bubble with a little tail; `o-bottom` makes it pop from the tail
const Bubble = ({
 x,
 y,
 w,
 text,
 className,
}: {
 x: number;
 y: number;
 w: number;
 text: string;
 className: string;
}) => (
 <g className={`${className} o-bottom`}>
  <rect x={x} y={y} width={w} height="22" rx="11" fill="#fff" stroke="#e3e6ec" />
  <path d={`M${x + w / 2 - 5} ${y + 21}l5 7 5-7z`} fill="#fff" />
  <text x={x + w / 2} y={y + 15} textAnchor="middle" fontSize="11" fontWeight="800" fill={C.ink} fontFamily="inherit">
   {text}
  </text>
 </g>
);

const Heart = ({ x, y, className }: { x: number; y: number; className: string }) => (
 <path
  className={className}
  d={`M${x} ${y + 9}c-6-4-9-7-9-10.5a4.5 4.5 0 019-1.5 4.5 4.5 0 019 1.5c0 3.5-3 6.5-9 10.5z`}
  fill={C.ember}
 />
);

// The real Tizaraa logo, cropped from the 200x90 PNG (logo area x7-192, y24-64)
const TruckLogo = ({ x, y, w }: { x: number; y: number; w: number }) => (
 <svg x={x} y={y} width={w} height={(w * 41) / 186} viewBox="7 24 186 41">
  <image href="/assets/images/tizaraa_logo.png" width="200" height="90" />
 </svg>
);

/* Delivery story (DL_MS = 10s): zoom in + brake squash + "Beep beep!", boy
   hops out and bounces to the door, "Knock knock!", customer hugs the parcel
   and jumps arms-up with hearts, sparkles and "Yay!", boy tips his cap,
   "Happy shopping!", boy hops back, wheelie, zoom off */
const HAIR = "#2b1d16";
const SHOE = "#1f2937";
const CUSTOMER_SKIN = "#c68642";
const KURTI = "#0f9d8a";

// 4-point sparkle
const Spark = ({ x, y, r, className }: { x: number; y: number; r: number; className: string }) => (
 <path
  className={className}
  d={`M${x} ${y - r}Q${x + r * 0.2} ${y - r * 0.2} ${x + r} ${y}Q${x + r * 0.2} ${y + r * 0.2} ${x} ${y + r}Q${x - r * 0.2} ${y + r * 0.2} ${x - r} ${y}Q${x - r * 0.2} ${y - r * 0.2} ${x} ${y - r}z`}
  fill="#ffc53d"
 />
);

const SANDAL = "#b45309";
const GOLD = "#f5b82e";

// Little potted plant / bush helpers for the house front
const Pot = ({ x }: { x: number }) => (
 <g>
  <path d={`M${x - 7} 196h14l-2 10h-10z`} fill="#c2703d" />
  <circle cx={x - 4} cy="191" r="5" fill="#3f9d62" />
  <circle cx={x + 4} cy="190" r="5.5" fill="#5bb57a" />
  <circle cx={x} cy="186" r="5" fill="#4caf6e" />
 </g>
);

const DeliveryArt = () => (
 <svg viewBox="0 0 360 240" aria-hidden="true">
  {/* ---- Sky: sun glow, drifting clouds, faint skyline ---- */}
  <circle cx="34" cy="76" r="26" fill="#ffd9b8" opacity="0.55" />
  <circle cx="34" cy="76" r="15" fill="#ffc58f" opacity="0.8" />
  <g className="dl-cloud" opacity="0.9">
   <ellipse cx="200" cy="96" rx="20" ry="8" fill="#fff" />
   <ellipse cx="190" cy="92" rx="10" ry="8" fill="#fff" />
   <ellipse cx="207" cy="89" rx="11" ry="9" fill="#fff" />
  </g>
  <g className="dl-cloud c2" opacity="0.75">
   <ellipse cx="110" cy="58" rx="16" ry="6" fill="#fff" />
   <ellipse cx="104" cy="54" rx="8" ry="6" fill="#fff" />
   <ellipse cx="116" cy="52" rx="9" ry="7" fill="#fff" />
  </g>
  <g fill="#e9edf4">
   <rect x="0" y="160" width="18" height="46" />
   <rect x="20" y="146" width="22" height="60" />
   <rect x="44" y="168" width="16" height="38" />
   <rect x="62" y="152" width="26" height="54" />
   <rect x="90" y="172" width="14" height="34" />
   <rect x="106" y="158" width="20" height="48" />
   <rect x="128" y="176" width="18" height="30" />
   <rect x="148" y="164" width="22" height="42" />
   <rect x="172" y="178" width="16" height="28" />
  </g>

  {/* Mini order tracker */}
  <g fontFamily="inherit" fontSize="10" fontWeight="600" fill={C.slate} textAnchor="middle">
   <line x1="66" y1="14" x2="174" y2="14" stroke="#e3e6ec" strokeWidth="3" strokeLinecap="round" />
   <line x1="186" y1="14" x2="294" y2="14" stroke="#e3e6ec" strokeWidth="3" strokeLinecap="round" />
   <line className="dl-line1 o-left" x1="66" y1="14" x2="174" y2="14" stroke={C.ember} strokeWidth="3" strokeLinecap="round" />
   <line className="dl-line2 o-left" x1="186" y1="14" x2="294" y2="14" stroke={C.ember} strokeWidth="3" strokeLinecap="round" />
   <circle cx="60" cy="14" r="6" fill={C.ember} />
   <circle cx="180" cy="14" r="6" fill="#cfd5df" />
   <circle className="dl-step2" cx="180" cy="14" r="6" fill={C.ember} />
   <circle cx="300" cy="14" r="6" fill="#cfd5df" />
   <circle className="dl-step3" cx="300" cy="14" r="6" fill={OK} />
   <text x="60" y="33">Shipped</text>
   <text x="180" y="33">Out for delivery</text>
   <text x="300" y="33">Delivered</text>
  </g>

  {/* Ground */}
  <ellipse cx="180" cy="212" rx="176" ry="9" fill="rgba(14,52,96,0.07)" />
  <line x1="6" y1="206" x2="354" y2="206" stroke="#cfd5df" strokeWidth="3" strokeLinecap="round" strokeDasharray="22 10" />

  {/* Street lamp (behind the truck) */}
  <rect x="9" y="118" width="4" height="88" rx="2" fill="#94a3b8" />
  <path d="M11 120q0-8 10-8h4" fill="none" stroke="#94a3b8" strokeWidth="3" />
  <rect x="21" y="110" width="10" height="6" rx="2" fill={C.navy} />
  <ellipse cx="26" cy="118" rx="6" ry="2.5" fill="#ffe8a3" opacity="0.8" />

  {/* Tree beside the house */}
  <rect x="226" y="166" width="7" height="40" rx="2" fill="#8b5a2b" />
  <circle cx="229" cy="156" r="16" fill="#3f9d62" />
  <circle cx="219" cy="164" r="11" fill="#4caf6e" />
  <circle cx="240" cy="163" r="12" fill="#5bb57a" />
  <circle cx="232" cy="148" r="8" fill="#6cc488" opacity="0.8" />

  {/* ---- Truck: drawn before the house so it drives off behind it ---- */}
  <g className="dl-truck">
   <ellipse cx="110" cy="208" rx="92" ry="4" fill="rgba(14,21,32,0.14)" />
   <g stroke={C.ember} strokeWidth="4" strokeLinecap="round" className="dl-speed">
    <line x1="-4" y1="140" x2="14" y2="140" />
    <line x1="-12" y1="160" x2="12" y2="160" />
    <line x1="-2" y1="180" x2="16" y2="180" />
   </g>
   <circle className="dl-puff" cx="14" cy="188" r="6" fill="#d7dbe3" />
   <circle className="dl-puff p2" cx="4" cy="184" r="8" fill="#e3e6ec" />
   <circle className="dl-puff p3" cx="-8" cy="188" r="6" fill="#d7dbe3" />
   <g className="dl-squash o-rear">
    {/* Roof sign with blinking lights */}
    <rect x="62" y="108" width="4" height="13" fill={C.navy} />
    <rect x="104" y="108" width="4" height="13" fill={C.navy} />
    <rect x="44" y="90" width="82" height="21" rx="7" fill={C.ember} stroke={C.emberDeep} strokeWidth="1.5" />
    <text x="85" y="105" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff" fontFamily="inherit" letterSpacing="0.3">
     Tizaraa
    </text>
    <circle className="dl-signlight" cx="50" cy="100.5" r="2.2" fill="#ffe08a" />
    <circle className="dl-signlight b2" cx="120" cy="100.5" r="2.2" fill="#ffe08a" />
    {/* Exhaust pipe */}
    <rect x="16" y="186" width="10" height="4" rx="2" fill="#6b7280" />
    {/* Cargo body: two-tone with the logo panel */}
    <rect x="24" y="120" width="118" height="74" rx="10" fill={C.ember} />
    <rect x="24" y="120" width="118" height="14" rx="7" fill={C.emberDeep} opacity="0.35" />
    <rect x="24" y="178" width="118" height="16" rx="6" fill={C.emberDeep} opacity="0.3" />
    <rect x="36" y="140" width="94" height="34" rx="8" fill="#fff" />
    <TruckLogo x={44} y={147.5} w={78} />
    {/* Cab with door, handle, mirror, window shine */}
    <path d="M142 140h36l20 26v28h-56z" fill={C.navy} />
    <path d="M150 148h24l12 16h-36z" fill="#bcd6f2" />
    <path d="M156 150l8 12" stroke="#fff" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
    <rect x="148" y="168" width="30" height="22" rx="3" fill="none" stroke="#0b2748" strokeWidth="1.5" />
    <rect x="168" y="172" width="7" height="2.5" rx="1.2" fill="#cbd5e1" />
    <rect x="179" y="150" width="4" height="9" rx="1.5" fill="#0b2748" />
    <rect x="190" y="178" width="8" height="6" rx="2" fill="#ffd27a" />
    <ellipse cx="208" cy="181" rx="10" ry="4" fill="#ffe8a3" opacity="0.45" />
    <rect x="188" y="188" width="14" height="6" rx="2.5" fill="#6b7280" />
    {/* Wheel arches + wheels with hubcaps */}
    <path d="M40 194a16 16 0 0132 0z" fill="#0b2748" opacity="0.55" />
    <path d="M154 194a16 16 0 0132 0z" fill="#0b2748" />
    {[56, 170].map((cx) => (
     <g key={cx} className="dl-wheel">
      <circle cx={cx} cy="196" r="13" fill={C.ink} />
      <circle cx={cx} cy="196" r="7" fill="#cbd5e1" />
      <path d={`M${cx} 189.5v13M${cx - 6.5} 196h13`} stroke="#6b7280" strokeWidth="2" />
      <circle cx={cx} cy="196" r="2.4" fill="#475569" />
     </g>
    ))}
   </g>
   <Bubble className="dl-beep" x={150} y={96} w={74} text="Beep beep!" />
  </g>

  {/* ---- Cozy house ---- */}
  <rect x="324" y="66" width="13" height="26" fill="#8b4a3a" />
  <rect x="322" y="63" width="17" height="5" rx="1.5" fill="#6d3a2e" />
  <circle className="dl-smoke" cx="331" cy="58" r="5" fill="#e3e6ec" />
  <circle className="dl-smoke s2" cx="331" cy="58" r="5" fill="#e3e6ec" />
  <circle className="dl-smoke s3" cx="331" cy="58" r="5" fill="#e3e6ec" />
  <path d="M242 108L303 62l61 46z" fill={C.navy} />
  <g stroke="#1d4f8c" strokeWidth="1.5">
   <line x1="282" y1="78" x2="324" y2="78" />
   <line x1="266" y1="90" x2="340" y2="90" />
   <line x1="253" y1="100" x2="353" y2="100" />
  </g>
  <rect x="238" y="104" width="130" height="6" rx="3" fill="#0b2748" />
  <rect x="250" y="110" width="104" height="96" fill="#fff" stroke="#e3e6ec" />
  <rect x="332" y="110" width="22" height="96" fill="#f1f3f7" />
  <rect x="250" y="198" width="104" height="8" fill="#e9edf4" />
  {/* Window with curtains and a flower box */}
  <rect x="316" y="122" width="28" height="26" rx="3" fill="#dcebfa" stroke="#cfd5df" />
  <path d="M316 122h10l-6 26h-4zM344 122h-10l6 26h4z" fill="#ffd0c2" />
  <path d="M330 122v26M316 135h28" stroke="#fff" strokeWidth="1.6" />
  <rect x="313" y="148" width="34" height="6" rx="2" fill="#a0522d" />
  {[318, 325, 332, 339].map((x, i) => (
   <circle key={x} cx={x} cy="146" r="3" fill={i % 2 ? "#ffc53d" : "#ff6b6b"} />
  ))}
  {/* Porch lamp */}
  <rect x="309" y="128" width="2" height="8" fill="#475569" />
  <rect x="307" y="134" width="6" height="8" rx="2" fill="#ffd27a" />
  <circle cx="310" cy="138" r="9" fill="#ffe8a3" opacity="0.35" />
  {/* Doorway, step and mat */}
  <rect x="262" y="118" width="48" height="88" rx="4" fill="#e9edf4" />
  <rect x="266" y="122" width="40" height="84" rx="3" fill="#2a2f3c" />
  <rect x="258" y="204" width="56" height="4" rx="1.5" fill="#cbd5e1" />
  <rect x="270" y="202" width="32" height="3" rx="1.5" fill={C.ember} opacity="0.8" />

  {/* Customer: long hair, teal kurti, dupatta, earrings, bangles */}
  <g className="dl-customer">
   <g className="dl-jump">
    <rect x="279" y="184" width="6" height="20" rx="3" fill="#334155" />
    <rect x="288" y="184" width="6" height="20" rx="3" fill="#334155" />
    <rect x="277" y="202" width="9" height="3.5" rx="1.75" fill={SANDAL} />
    <rect x="287" y="202" width="9" height="3.5" rx="1.75" fill={SANDAL} />
    <path d="M276 140a10.5 10.5 0 0121 0v16q-10.5 5-21 0z" fill={HAIR} />
    <path d="M276 152h21l5 36h-31z" fill={KURTI} />
    <path d="M282 152l4.5 6 4.5-6" fill="none" stroke="#fff" strokeWidth="1.6" opacity="0.8" />
    <path d="M272 186l3-6h23l3 6" fill="none" stroke="#0b7a6b" strokeWidth="2" />
    <g className="dl-dupatta o-top">
     <path d="M296 152q6 14 2 34l-5-2q3-16-3-30z" fill="#ffb38a" />
    </g>
    <rect x="284" y="146" width="5" height="7" fill={CUSTOMER_SKIN} />
    <circle cx="286.5" cy="139" r="9.5" fill={CUSTOMER_SKIN} />
    <path d="M277 137a9.5 9.5 0 0119 0q-6-5-11-2-4 2-8 2z" fill={HAIR} />
    <circle cx="277.5" cy="143.5" r="1.6" fill={GOLD} />
    <circle cx="295.5" cy="143.5" r="1.6" fill={GOLD} />
    <path d="M281.5 139.5q1.5-1.6 3 0M288.5 139.5q1.5-1.6 3 0" fill="none" stroke={C.ink} strokeWidth="1.3" strokeLinecap="round" />
    <circle cx="281" cy="143" r="1.8" fill="#ff8fa3" opacity="0.6" />
    <circle cx="292" cy="143" r="1.8" fill="#ff8fa3" opacity="0.6" />
    <path d="M283.5 143.5q3 3.5 6 0z" fill="#8b1e2d" />
    {/* Arms hugging the parcel (base) */}
    <g className="dl-arms-down">
     <g className="dl-cparcel">
      <rect x="279" y="160" width="16" height="13" rx="2" fill="#e8b07a" />
      <path d="M287 160v13" stroke="#fff" strokeWidth="2" opacity="0.7" />
     </g>
     <path d="M277 155q-2 10 4 13M296 155q2 10-4 13" fill="none" stroke={KURTI} strokeWidth="5" strokeLinecap="round" />
     <circle cx="282" cy="168" r="2.6" fill={CUSTOMER_SKIN} />
     <circle cx="292" cy="168" r="2.6" fill={CUSTOMER_SKIN} />
     <circle cx="281" cy="166" r="2.4" fill="none" stroke={GOLD} strokeWidth="1" />
     <circle cx="293" cy="166" r="2.4" fill="none" stroke={GOLD} strokeWidth="1" />
    </g>
    {/* Both arms up while jumping */}
    <g className="dl-arms-up">
     <rect x="279" y="160" width="16" height="13" rx="2" fill="#e8b07a" />
     <path d="M277 155l-8-16M296 155l8-16" fill="none" stroke={KURTI} strokeWidth="5" strokeLinecap="round" />
     <circle cx="268" cy="137" r="2.8" fill={CUSTOMER_SKIN} />
     <circle cx="305" cy="137" r="2.8" fill={CUSTOMER_SKIN} />
     <circle cx="270" cy="141" r="2.4" fill="none" stroke={GOLD} strokeWidth="1" />
     <circle cx="303" cy="141" r="2.4" fill="none" stroke={GOLD} strokeWidth="1" />
    </g>
   </g>
  </g>
  <g className="dl-door o-left">
   <rect x="266" y="122" width="40" height="84" rx="3" fill={C.emberTint} stroke="#f6c7b4" />
   <rect x="271" y="128" width="30" height="30" rx="2" fill="none" stroke="#f6c7b4" />
   <rect x="271" y="164" width="30" height="36" rx="2" fill="none" stroke="#f6c7b4" />
   <circle cx="299" cy="168" r="2.4" fill={C.emberDeep} />
  </g>
  <Pot x={256} />
  <Pot x={344} />
  <Heart className="dl-heart" x={286} y={112} />
  <Heart className="dl-heart h2" x={302} y={120} />
  <Heart className="dl-heart h3" x={270} y={122} />
  <Spark className="dl-spark" x={262} y={134} r={6} />
  <Spark className="dl-spark k2" x={314} y={142} r={5} />
  <Spark className="dl-spark k3" x={300} y={102} r={4} />
  <Bubble className="dl-yay" x={306} y={84} w={44} text="Yay!" />
  <Bubble className="dl-knock" x={196} y={100} w={86} text="Knock knock!" />

  {/* Happy shopping! (above everything) */}
  <g className="dl-banner o-bottom">
   <rect x="58" y="44" width="168" height="34" rx="17" fill={C.ember} />
   <path d="M76 56h12l-1.5 12h-9z" fill="#fff" />
   <path d="M78.5 56a3.5 3.5 0 017 0" fill="none" stroke="#fff" strokeWidth="1.8" />
   <text x="152" y="66" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff" fontFamily="inherit">
    Happy shopping!
   </text>
  </g>

  {/* ---- Delivery boy (~72px tall). walk = position, hop = jumps, bob =
      bouncy step, face = turns around; legs and arms swing while walking ---- */}
  <g className="dl-walk">
   <ellipse cx="246" cy="207" rx="13" ry="2.6" fill="rgba(14,52,96,0.15)" />
   <g className="dl-hop">
    <g className="dl-bob">
     <g className="dl-face">
      {/* back arm: sleeve + forearm + hand */}
      <g className="dl-arm b o-top">
       <rect x="235" y="156" width="7" height="10" rx="3.5" fill={C.emberDeep} />
       <rect x="236" y="164" width="5" height="12" rx="2.5" fill={SKIN} />
       <circle cx="238.5" cy="177.5" r="3" fill={SKIN} />
      </g>
      {/* legs with laced shoes */}
      <g className="dl-leg a o-top">
       <rect x="239" y="178" width="7" height="24" rx="3" fill={C.navy} />
       <rect x="238" y="200" width="11" height="6" rx="3" fill={SHOE} />
       <path d="M241 201.5h5" stroke="#fff" strokeWidth="0.8" />
      </g>
      <g className="dl-leg b o-top">
       <rect x="247" y="178" width="7" height="24" rx="3" fill={C.navy} />
       <rect x="246" y="200" width="11" height="6" rx="3" fill={SHOE} />
       <path d="M249 201.5h5" stroke="#fff" strokeWidth="0.8" />
      </g>
      {/* polo with collar, placket, pocket and belt */}
      <rect x="235" y="151" width="23" height="31" rx="8" fill={C.ember} />
      <path d="M241 151l5.5 6.5 5.5-6.5z" fill="#fff" opacity="0.9" />
      <path d="M246.5 157.5v8" stroke={C.emberDeep} strokeWidth="1.4" />
      <rect x="250" y="160" width="5" height="5" rx="1" fill="none" stroke={C.emberDeep} strokeWidth="1" />
      <rect x="235" y="177" width="23" height="3.5" fill={SHOE} />
      <rect x="244.5" y="176.5" width="4" height="4.5" rx="1" fill="#cbd5e1" />
      {/* head */}
      <rect x="243.5" y="145" width="6" height="8" fill={SKIN} />
      <circle cx="247" cy="137" r="11" fill={SKIN} />
      <path d="M236 133q-1 9 4 12l2-9z" fill={HAIR} />
      <circle cx="237.5" cy="139" r="2.8" fill={SKIN} />
      <ellipse className="blink" cx="252.5" cy="138.5" rx="1.5" ry="2" fill={C.ink} />
      <circle cx="253" cy="137.8" r="0.6" fill="#fff" />
      <path d="M250 133.5l4.5-0.6" stroke={HAIR} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="254.5" cy="143" r="2.1" fill="#ff8fa3" opacity="0.55" />
      <path d="M249 143.5q3.2 3 6.4 0" fill="none" stroke={C.ink} strokeWidth="1.3" strokeLinecap="round" />
      {/* cap (tips up to say bye) with hair peeking under it */}
      <g className="dl-cap o-rear">
       <path d="M249 134q3-2 6 0" fill="none" stroke={HAIR} strokeWidth="2" />
       <path d="M235.5 135a11.5 11.5 0 0123 0z" fill={C.ember} />
       <rect x="252" y="132" width="14" height="4.2" rx="2.1" fill={C.emberDeep} />
       <circle cx="245" cy="129" r="3.4" fill="#fff" />
       <circle cx="245" cy="129" r="1.6" fill={C.ember} />
      </g>
      {/* carrying the parcel with both hands */}
      <g className="dl-hand-parcel">
       <rect x="252" y="157" width="20" height="17" rx="2.5" fill="#e8b07a" />
       <rect x="252" y="157" width="20" height="4" rx="2" fill="#d9995d" />
       <path d="M262 157v17" stroke="#fff" strokeWidth="2.2" opacity="0.7" />
       <rect x="245" y="162" width="11" height="6" rx="3" fill={C.ember} />
       <circle cx="256" cy="165" r="3.2" fill={SKIN} />
       <circle cx="270" cy="170" r="3" fill={SKIN} />
      </g>
      {/* front hand free after the hand-over */}
      <g className="dl-hand-free">
       <g className="dl-arm a o-top">
        <rect x="249" y="156" width="7" height="10" rx="3.5" fill={C.ember} />
        <rect x="250" y="164" width="5" height="12" rx="2.5" fill={SKIN} />
        <circle cx="252.5" cy="177.5" r="3" fill={SKIN} />
       </g>
      </g>
      {/* raised hand at the cap while tipping it */}
      <g className="dl-wave-on">
       <path d="M252 157l6-21" fill="none" stroke={C.ember} strokeWidth="7" strokeLinecap="round" />
       <circle cx="259" cy="133" r="3.4" fill={SKIN} />
      </g>
     </g>
     {/* Shirt print stays outside the flipping group so it never mirrors */}
     <text x="246.5" y="173" textAnchor="middle" fontSize="7" fontWeight="800" fill="#fff" fontFamily="inherit">Ti</text>
    </g>
   </g>
  </g>
 </svg>
);

/* Payment story (6s): card slides into the phone, Pay is pressed, spinner,
   "Payment successful" with confetti */
const CONFETTI = [
 { dx: -70, dy: -60, c: C.ember },
 { dx: 70, dy: -64, c: "#ffc53d" },
 { dx: -86, dy: 6, c: "#2b6cb0" },
 { dx: 88, dy: 0, c: OK },
 { dx: -50, dy: 60, c: "#ffc53d" },
 { dx: 56, dy: 62, c: C.ember },
 { dx: 0, dy: -84, c: OK },
 { dx: -24, dy: 76, c: "#2b6cb0" },
 { dx: 30, dy: -80, c: C.emberDeep },
 { dx: 96, dy: 40, c: "#ff8fb1" },
];

const PaymentArt = () => (
 <svg viewBox="0 0 360 240" aria-hidden="true">
  <ellipse cx="180" cy="224" rx="110" ry="8" fill="rgba(14,52,96,0.08)" />
  {[
   { x: 18, y: 44, w: 66, t: "bKash", d: "" },
   { x: 272, y: 56, w: 66, t: "Nagad", d: "d1" },
   { x: 276, y: 156, w: 58, t: "Card", d: "d2" },
   { x: 24, y: 176, w: 56, t: "COD", d: "d3" },
  ].map((c) => (
   <g key={c.t} className={`sc-float ${c.d}`}>
    <rect x={c.x} y={c.y} width={c.w} height="28" rx="14" fill="#fff" stroke="#e3e6ec" />
    <text x={c.x + c.w / 2} y={c.y + 18.5} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={C.inkSoft} fontFamily="inherit">
     {c.t}
    </text>
   </g>
  ))}

  {/* Phone with a checkout screen */}
  <rect x="120" y="30" width="120" height="190" rx="20" fill={C.navy} />
  <rect x="128" y="42" width="104" height="166" rx="12" fill="#fff" />
  <rect x="164" y="35" width="32" height="4" rx="2" fill="#0b2748" />
  <text x="140" y="62" fontSize="11" fontWeight="800" fill={C.ink} fontFamily="inherit">Checkout</text>
  <rect x="140" y="72" width="80" height="7" rx="3.5" fill="#eef0f4" />
  <rect x="140" y="85" width="60" height="7" rx="3.5" fill="#eef0f4" />
  <text x="140" y="112" fontSize="10" fill={C.slate} fontFamily="inherit">Total</text>
  <text x="220" y="112" textAnchor="end" fontSize="12" fontWeight="800" fill={C.ink} fontFamily="inherit">৳ 2,450</text>
  <g className="pay-spin-on">
   <circle className="pay-spin" cx="180" cy="146" r="12" fill="none" stroke={C.ember} strokeWidth="4" strokeDasharray="48 28" strokeLinecap="round" />
  </g>
  <g className="pay-ok">
   <circle cx="180" cy="140" r="16" fill={OK} />
   <path d="M172 140l5.5 5.5 10.5-10.5" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
  </g>
  <text className="pay-ok late" x="180" y="170" textAnchor="middle" fontSize="10" fontWeight="800" fill={OK} fontFamily="inherit">
   Payment successful
  </text>
  <g className="pay-btn">
   <rect x="140" y="180" width="80" height="22" rx="11" fill={C.ember} />
   <text x="180" y="195" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff" fontFamily="inherit">Pay now</text>
  </g>
  {CONFETTI.map((p, i) => (
   <rect
    key={i}
    className="pay-confetti"
    x="177"
    y="137"
    width="6"
    height={i % 2 ? 6 : 9}
    rx="1.5"
    fill={p.c}
    style={{ "--dx": `${p.dx}px`, "--dy": `${p.dy}px` } as React.CSSProperties}
   />
  ))}

  {/* Card that slides in and dips into the phone */}
  <g className="pay-card">
   <rect x="40" y="118" width="86" height="56" rx="9" fill={C.ember} />
   <rect x="40" y="130" width="86" height="10" fill={C.emberDark} />
   <rect x="50" y="148" width="18" height="13" rx="3" fill="#ffd27a" />
   <rect x="74" y="160" width="40" height="5" rx="2.5" fill="#fff" opacity="0.6" />
  </g>
 </svg>
);

/* Returns story (6s): the box blinks and waves "Bye!", hops into the van,
   the van drives off and "Return requested" pops, then the van comes back */
const ReturnsArt = () => (
 <svg viewBox="0 0 360 240" aria-hidden="true">
  <ellipse cx="180" cy="214" rx="160" ry="9" fill="rgba(14,52,96,0.07)" />
  <line x1="10" y1="206" x2="350" y2="206" stroke="#cfd5df" strokeWidth="3" strokeLinecap="round" strokeDasharray="22 10" />

  <g className="ret-chip">
   <rect x="98" y="30" width="164" height="34" rx="17" fill="#fff" stroke="#e3e6ec" />
   <circle cx="120" cy="47" r="10" fill={OK} />
   <path d="M115 47l3.5 3.5 6.5-6.5" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
   <text x="138" y="52" fontSize="13" fontWeight="800" fill={C.ink} fontFamily="inherit">Return requested</text>
  </g>

  {/* Returns van */}
  <g className="ret-van">
   <circle className="ret-puff" cx="226" cy="190" r="7" fill="#d7dbe3" />
   <circle className="ret-puff p2" cx="214" cy="186" r="9" fill="#e3e6ec" />
   <rect x="232" y="132" width="96" height="62" rx="10" fill={C.navy} />
   <rect x="232" y="142" width="14" height="44" rx="3" fill="#0b2748" />
   <text x="288" y="168" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff" fontFamily="inherit">Returns</text>
   <path d="M328 148h14l12 18v28h-26z" fill={C.ember} />
   <path d="M332 154h9l8 12h-17z" fill="#bcd6f2" />
   {[258, 334].map((cx) => (
    <g key={cx} className="ret-wheel">
     <circle cx={cx} cy="196" r="11" fill={C.ink} />
     <path d={`M${cx} 189v14M${cx - 7} 196h14`} stroke="#6b7280" strokeWidth="2.2" />
     <circle cx={cx} cy="196" r="3.5" fill="#fff" />
    </g>
   ))}
  </g>

  {/* The cute box */}
  <g className="ret-box o-bottom">
   <rect x="96" y="148" width="62" height="58" rx="7" fill="#e8b07a" />
   <rect x="96" y="148" width="62" height="12" rx="6" fill="#d9995d" />
   <rect x="122" y="148" width="10" height="20" fill="#fff" opacity="0.55" />
   <circle className="ret-eye" cx="116" cy="178" r="3.6" fill={C.ink} />
   <circle className="ret-eye" cx="138" cy="178" r="3.6" fill={C.ink} />
   <circle cx="110" cy="187" r="3.5" fill="#ff8fa3" opacity="0.6" />
   <circle cx="144" cy="187" r="3.5" fill="#ff8fa3" opacity="0.6" />
   <path d="M121 188q6 6 12 0" fill="none" stroke={C.ink} strokeWidth="2" strokeLinecap="round" />
   <rect className="ret-arm o-left" x="157" y="170" width="16" height="5" rx="2.5" fill="#d9995d" />
  </g>
  <Bubble className="ret-bye" x={64} y={118} w={46} text="Bye!" />
 </svg>
);

/* Shop story (6s): shopkeeper waves, products pop onto the shelf, stars,
   the "Trusted seller" stamp slams down and the shop shakes */
const ShopArt = () => (
 <svg viewBox="0 0 360 240" aria-hidden="true">
  <ellipse cx="180" cy="214" rx="150" ry="9" fill="rgba(14,52,96,0.07)" />
  {[
   { x: 92, y: 36, c: "" },
   { x: 180, y: 22, c: "s2" },
   { x: 268, y: 36, c: "s3" },
  ].map((st) => (
   <path
    key={st.x}
    className={`shop-star ${st.c}`}
    d={`M${st.x} ${st.y - 12}l3.6 7.3 8 1.2-5.8 5.6 1.4 8-7.2-3.8-7.2 3.8 1.4-8-5.8-5.6 8-1.2z`}
    fill="#ffc53d"
   />
  ))}
  <g className="shop-shake">
   <rect x="74" y="96" width="212" height="110" rx="10" fill="#fff" stroke="#e3e6ec" />
   <rect x="64" y="58" width="232" height="32" rx="9" fill={C.navy} />
   <text x="180" y="80" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff" fontFamily="inherit" letterSpacing="2">
    SHOP
   </text>
   {[0, 1, 2, 3, 4, 5].map((i) => (
    <path key={i} d={`M${68 + i * 37.3} 90h37.3v8a18.65 18.65 0 01-37.3 0z`} fill={i % 2 ? "#fff" : C.ember} stroke={i % 2 ? "#f6c7b4" : "none"} />
   ))}
   {/* Window display with a shelf */}
   <rect x="90" y="124" width="112" height="64" rx="6" fill="#dcebfa" />
   <rect x="90" y="168" width="112" height="5" fill="#b8cde6" />
   <g className="shop-item o-bottom">
    <rect x="100" y="146" width="22" height="22" rx="3" fill={C.ember} />
    <path d="M105 146a6 6 0 0112 0" fill="none" stroke={C.emberDeep} strokeWidth="2.4" />
   </g>
   <g className="shop-item i2 o-bottom">
    <path d="M134 150l8-5h8l8 5-3 6h-3v12h-12v-12h-3z" fill="#2b6cb0" />
   </g>
   <g className="shop-item i3 o-bottom">
    <rect x="170" y="150" width="18" height="18" rx="3" fill={OK} />
    <path d="M188 154h4a4 4 0 010 8h-4" fill="none" stroke={OK} strokeWidth="2.4" />
   </g>
   {/* Door with the shopkeeper (same style as the delivery characters) */}
   <rect x="216" y="124" width="56" height="82" rx="4" fill={C.emberTint} stroke="#f6c7b4" />
   <rect x="238" y="186" width="6" height="18" rx="3" fill={C.navy} />
   <rect x="246" y="186" width="6" height="18" rx="3" fill={C.navy} />
   <rect x="236" y="201" width="9" height="5" rx="2.5" fill={SHOE} />
   <rect x="245" y="201" width="9" height="5" rx="2.5" fill={SHOE} />
   <rect x="233" y="160" width="24" height="29" rx="8" fill="#2b6cb0" />
   <path d="M237 165h16v22h-16z" fill="#fff" />
   <path d="M239 165l-2-5M251 165l2-5" stroke="#fff" strokeWidth="2" />
   <rect x="241" y="172" width="8" height="6" rx="1.5" fill={C.ember} opacity="0.85" />
   <rect x="234" y="163" width="6" height="18" rx="3" fill="#2b6cb0" />
   <circle cx="237" cy="182" r="3" fill={SKIN} />
   <rect x="242" y="153" width="6" height="8" fill={SKIN} />
   <circle cx="245" cy="146" r="10" fill={SKIN} />
   <circle cx="235.5" cy="147" r="2.4" fill={SKIN} />
   <circle cx="254.5" cy="147" r="2.4" fill={SKIN} />
   <path d="M235 145a10 10 0 0120 0q-4-6-10-5-6 1-10 5z" fill={HAIR} />
   <ellipse className="blink late" cx="241.5" cy="146.5" rx="1.3" ry="1.8" fill={C.ink} />
   <ellipse className="blink late" cx="248.5" cy="146.5" rx="1.3" ry="1.8" fill={C.ink} />
   <path d="M240 151.5q5 4 10 0" fill="none" stroke={C.ink} strokeWidth="1.3" strokeLinecap="round" />
   <path d="M241 155q4 2 8 0" fill="none" stroke={HAIR} strokeWidth="2.2" strokeLinecap="round" />
   <g className="shop-wave o-bottom">
    <rect x="252" y="146" width="6" height="18" rx="3" fill="#2b6cb0" />
    <circle cx="255" cy="144" r="3.4" fill={SKIN} />
   </g>
  </g>
  {/* Trusted seller stamp */}
  <g className="shop-stamp">
   <circle cx="282" cy="186" r="36" fill="rgba(255,255,255,0.85)" stroke={C.ember} strokeWidth="4" />
   <circle cx="282" cy="186" r="29" fill="none" stroke={C.ember} strokeWidth="1.5" strokeDasharray="3 3" />
   <text x="282" y="183" textAnchor="middle" fontSize="11" fontWeight="900" fill={C.emberDeep} fontFamily="inherit" letterSpacing="1">
    TRUSTED
   </text>
   <text x="282" y="197" textAnchor="middle" fontSize="11" fontWeight="900" fill={C.emberDeep} fontFamily="inherit" letterSpacing="1">
    SELLER
   </text>
  </g>
 </svg>
);

const SLIDES = [
 {
  key: "delivery",
  ms: DL_MS + 500, // let the whole delivery story play once
  eyebrow: "Delivery",
  title: "Fast delivery across Bangladesh",
  text: "Follow every parcel from the seller’s shop to your door, with live order status.",
  Art: DeliveryArt,
 },
 {
  key: "secure",
  ms: STORY_MS,
  eyebrow: "Payment",
  title: "Pay your way, safely",
  text: "Check out with card, bKash, Nagad or cash on delivery.",
  Art: PaymentArt,
 },
 {
  key: "returns",
  ms: STORY_MS,
  eyebrow: "Returns",
  title: "Easy returns",
  text: "Changed your mind? Request a return right from your order page.",
  Art: ReturnsArt,
 },
 {
  key: "sellers",
  ms: STORY_MS,
  eyebrow: "Marketplace",
  title: "Trusted sellers, one marketplace",
  text: "Shop from sellers and corporate stores across Bangladesh in one place.",
  Art: ShopArt,
 },
];

type SlideData = (typeof SLIDES)[number];

const SlideView = ({
 slide,
 out,
 enter,
 live,
}: {
 slide: SlideData;
 out?: boolean;
 enter?: boolean;
 live?: boolean;
}) => (
 <div
  className={`sc-slide${out ? " is-out" : enter ? " is-in" : ""}`}
  aria-hidden={out ? "true" : undefined}
 >
  <div className="sc-stage">
   <slide.Art />
  </div>
  <div className="sc-copy" aria-live={live ? "polite" : "off"}>
   <span className="sc-eyebrow">{slide.eyebrow}</span>
   <h2 className="sc-title">{slide.title}</h2>
   <p className="sc-text">{slide.text}</p>
  </div>
 </div>
);

// Survives the login <-> signup page switch (same document), so the new
// page's showcase continues the same slide from the same moment instead of
// restarting it.
const showcaseMemory = { slide: 0, startedAt: 0 };

export function FeatureShowcase() {
 const rootRef = useRef<HTMLElement>(null);
 const [active, setActive] = useState(() => showcaseMemory.slide);
 const [leaving, setLeaving] = useState<number | null>(null);
 const [gen, setGen] = useState(0); // unique key per change, so a slide can re-enter while leaving
 const [hovered, setHovered] = useState(false);
 const away = useWindowAway();
 const slide = SLIDES[active];

 // After a swap, fast-forward the story and the progress bar by the time the
 // slide had already been playing on the previous page
 useIsoLayoutEffect(() => {
  const now = performance.now();
  let arriving = false;
  try {
   arriving = Boolean(sessionStorage.getItem(SWAP_KEY));
  } catch {
   // storage blocked: just start fresh
  }
  const root = rootRef.current;
  if (arriving && root && showcaseMemory.startedAt) {
   const elapsed = now - showcaseMemory.startedAt;
   root.querySelectorAll(".sc-stage, .sc-bar").forEach((node) =>
    node.getAnimations({ subtree: true }).forEach((anim) => {
     anim.currentTime = (Number(anim.currentTime) || 0) + elapsed;
    }),
   );
  } else {
   showcaseMemory.startedAt = now;
  }
 }, []);

 const goTo = (i: number) => {
  if (i === active) return;
  showcaseMemory.slide = i;
  showcaseMemory.startedAt = performance.now();
  setLeaving(active);
  setActive(i);
  setGen((g) => g + 1);
 };
 const next = () => goTo((active + 1) % SLIDES.length);

 return (
  <AuthShowcase
   ref={rootRef}
   aria-roledescription="carousel"
   aria-label="Why shop on Tizaraa"
   style={{ "--sc-ms": `${slide.ms}ms` } as React.CSSProperties}
   data-paused={hovered || away ? "true" : undefined}
   onMouseEnter={() => setHovered(true)}
   onMouseLeave={() => setHovered(false)}
  >
   <div className="sc-viewport">
    {leaving !== null && (
     <div
      key={`out-${gen}`}
      style={{ display: "contents" }}
      onAnimationEnd={(e) => {
       if ((e.target as HTMLElement).classList.contains("is-out")) setLeaving(null);
      }}
     >
      <SlideView slide={SLIDES[leaving]} out />
     </div>
    )}
    {/* First slide after mount shows at once; later changes crossfade in */}
    <SlideView key={`in-${gen}`} slide={slide} enter={gen > 0} />
   </div>

   <div className="sc-nav">
    {SLIDES.map((sl, i) => (
     <button
      key={sl.key}
      type="button"
      className={`sc-bar${i === active ? " is-active" : ""}`}
      aria-label={`Show slide ${i + 1}: ${sl.title}`}
      aria-current={i === active ? "true" : undefined}
      onClick={() => goTo(i)}
     >
      {i === active && <span key={`fill-${gen}`} onAnimationEnd={next} />}
     </button>
    ))}
   </div>
  </AuthShowcase>
 );
}

// Tiny line icons for the Terms / Privacy links
const DocIcon = () => (
 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
  <path d="M14 3v5h5M9 13h6M9 17h4" />
 </svg>
);
const ShieldIcon = () => (
 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
  <path d="M9 12l2 2 4-4" />
 </svg>
);

export default function Login() {
 const { state, dispatch } = useAppContext(); // Accessing app context for auth
 const router = useRouter();
 const { passwordVisibility, togglePasswordVisibility } = useVisibility();
 const [loading, setLoading] = useState(false); // State for loader
 const [apiError, setApiError] = useState<string | null>(null); // State for API errors
 const [isModalOpen, setModalOpen] = useState(false);
 const [isHasPayLoading, setIsHasPayLoading] = useState(false);
 const [rememberMe, setRememberMe] = useState(false);
 const { swap, swapTo } = useAuthSwap();

 const searchParams = useSearchParams();
 const fromSignup = searchParams.get("from") === "signup";
 const passwordWasReset = searchParams.get("reset") === "success";

 useEffect(() => {
  if (passwordWasReset) {
   toast.success(
    "Password reset successfully. Please log in with your email and new password.",
   );
  }
 }, [passwordWasReset]);

 const initialValues = { email: "", password: "" };

 // Form validation schema
 const formSchema = yup.object().shape({
  email: yup
   .string()
   .email("Email format is Invalid")
   .required("Email is required"),
  password: yup.string().required("Password is required"),
 });

 // Handle form submission
 // const handleFormSubmit = async (values: any) => {
 //   setLoading(true); // Start loader
 //   setApiError(null); // Clear any previous errors

 //   try {
 //     // Making API request using axios
 //     const response = await axios.post(`${ApiBaseUrl.baseUrl}login`, {
 //       email: values.email,
 //       password: values.password,
 //     });

 //     const data = response.data;

 //     // Check if login was successful
 //     if (data.token && response.status === 200) {
 //       // Store token in cookies for both client-side and server-side access
 //       Cookies.set("token", data.token, { expires: 7 });
 //       localStorage.setItem("token", data.token);
 //       localStorage.setItem("userInfo", JSON.stringify(data.user));

 //       // Dispatch login action with auth token and user info
 //       dispatch({
 //         type: "LOGIN",
 //         payload: { authToken: data.token, userInfo: data.user },
 //       });

 //       // Redirect to profile page
 //       router.push("/");
 //       toast.success("User Login successfully!");
 //     } else {
 //       // Handle errors (e.g., incorrect password, email not found, etc.)
 //       //setApiError("Invalid credentials. Please check your email or password.");
 //       toast.error("Failed Login. Please check your email or password.");
 //     }
 //   } catch (error) {
 //     console.error("Login error:", error);
 //     //setApiError("Failed to login. Please try again later.");
 //     toast.error("Failed to login. Please try again later.");
 //   } finally {
 //     setLoading(false); // Stop loader
 //   }
 // };
 const handleFormSubmit = async (values: any) => {
  setLoading(true);
  setApiError(null);

  try {
   const response = await axios.post(`${ApiBaseUrl.localApiUrl}login`, {
    email: values.email,
    password: values.password,
   });

   const data = response.data;

   if (data.token && response.status === 200) {
    Cookies.set("token", data.token, { expires: 7 });
    localStorage.setItem("token", data.token);
    localStorage.setItem("userInfo", JSON.stringify(data.user));

    // "Remember me" — only the email is kept, never the password
    if (rememberMe) {
     localStorage.setItem(REMEMBER_EMAIL_KEY, values.email);
    } else {
     localStorage.removeItem(REMEMBER_EMAIL_KEY);
    }

    dispatch({
     type: "LOGIN",
     payload: { authToken: data.token, userInfo: data.user },
    });

    toast.success("User logged in successfully!");

    // Active corporate employee → straight into their corporate shop;
    // otherwise the page remembered before login, otherwise home.
    router.push(postLoginPath(data.user));
   } else {
    toast.error("Failed login. Please check your email or password.");
   }
  } catch (error) {
   console.error("Login error:", error);
   toast.error("Failed to login. Please try again later.");
  } finally {
   setLoading(false);
  }
 };

 // Google login handler (for future integration)
 const handleGoogleLogin = async () => {
  setIsHasPayLoading(true);
  // Handle Google login here
  console.log("google");

  authService.googleLogin();
 };

 const {
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  setFieldValue,
 } = useFormik({
  initialValues,
  onSubmit: handleFormSubmit,
  validationSchema: formSchema,
 });

 // Pre-fill the email saved on the last remembered login
 useEffect(() => {
  const savedEmail = localStorage.getItem(REMEMBER_EMAIL_KEY);
  if (savedEmail) {
   setFieldValue("email", savedEmail);
   setRememberMe(true);
  }
 }, []);

 return (
  <>
   <AuthPage data-wall="right" data-swap={swap}>
    {/* The animated shop wall behind the card comes from (auth)/layout.tsx */}
    <AuthShell>
    <AuthPane>
     <form onSubmit={handleSubmit} autoComplete="off">
      <AuthBrand href="/" aria-label="Tizaraa home">
       {/* eslint-disable-next-line @next/next/no-img-element */}
       <img src="/assets/images/tizaraa_logo.png" alt="Tizaraa" width={200} height={90} />
      </AuthBrand>

      <AuthTitle>
       Welcome <span className="title-accent">back</span>
      </AuthTitle>

      <AuthSubtitle>Log in to continue shopping on Tizaraa</AuthSubtitle>

      {passwordWasReset && (
       <AuthSuccessNote>
        Your password has been reset. Log in with your email and new password.
       </AuthSuccessNote>
      )}

      {/* Email Field */}
      <TextField
       fullwidth
       mb="1rem"
       name="email"
       type="email"
       value={values.email}
       onChange={(e) => {
        handleChange(e);
        // Mark as touched for real-time error display
        if (!touched.email) touched.email = true;
       }}
       onBlur={handleBlur}
       placeholder="Enter Your Email"
       label="Email"
       autoComplete="new-email"
       errorText={errors.email}
      />

      {/* Password Field */}
      <TextField
       mb="0.5rem"
       fullwidth
       name="password"
       label="Password"
       onBlur={handleBlur}
       onChange={handleChange}
       placeholder="Enter Your Password"
       value={values.password}
       autoComplete="new-password"
       errorText={touched.password && errors.password}
       type={passwordVisibility ? "text" : "password"}
       endAdornment={
        <IconButton
         p="0.25rem"
         mr="0.25rem"
         type="button"
         onClick={togglePasswordVisibility}
         color={passwordVisibility ? "gray.700" : "gray.600"}
        >
         <Icon variant="small" defaultcolor="currentColor">
          {passwordVisibility ? "eye-alt" : "eye"}
         </Icon>
        </IconButton>
       }
      />

      {/* Display any API errors */}
      {apiError && <AuthErrorText>{apiError}</AuthErrorText>}

      {/* Remember me + Forgot Password */}
      <FlexBox justifyContent="space-between" alignItems="center" mb="1.5rem">
       <CheckBox
        id="remember-me"
        name="remember"
        color="primary"
        size={16}
        label={<span className="remember-label">Remember me</span>}
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
       />
       <AuthTextButton
        type="button"
        onClick={() => setModalOpen(true)} // Triggers the modal on click
       >
        Forgot password?
       </AuthTextButton>
      </FlexBox>

      {/* Submit Button */}
      <Button
       size="medium"
       variant="contained"
       color="primary"
       type="submit"
       fullwidth
       disabled={loading}
      >
       {loading ? <BeatLoader size={12} color={tz.color.slate} /> : (
        <span className="btn-label">
         Log in
         <span className="btn-arrow" aria-hidden="true">→</span>
        </span>
       )}
      </Button>

      <AuthDivider>or continue with</AuthDivider>

      {/* Google login */}
      <SocialButton type="button" onClick={handleGoogleLogin}>
       {isHasPayLoading ? (
        <BeatLoader size={12} color={tz.color.slate} />
       ) : (
        <>
         <Icon variant="small" defaultcolor="auto">
          google-1
         </Icon>
         Continue with Google
        </>
       )}
      </SocialButton>

      {/* Link to Signup */}
      {/* Separate, clearly-a-button choice for new customers */}
      <AuthAltLabel>New to Tizaraa?</AuthAltLabel>
      <AuthAltCta href="/signup" onClick={(e) => swapTo(e, "/signup")}>
       Create an account
       <span className="link-arrow" aria-hidden="true">→</span>
      </AuthAltCta>

      <AuthLegal>
       By continuing, you agree to Tizaraa’s{" "}
       <Link href="/terms-and-conditions">
        <DocIcon />
        Terms of Service
       </Link>{" "}
       and{" "}
       <Link href="/privacy-policy">
        <ShieldIcon />
        Privacy Policy
       </Link>
       .
      </AuthLegal>
     </form>
    </AuthPane>

    <FeatureShowcase />
    </AuthShell>
   </AuthPage>
   <ForgotPasswordModal
    isOpen={isModalOpen}
    onClose={() => setModalOpen(false)}
   />
  </>
 );
}
