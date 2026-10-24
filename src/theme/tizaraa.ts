// Tizaraa design tokens, from tizaraa-design-report.pdf (7 Oct 2026).
// Use these through `theme.tz.*` instead of writing raw hex in components.

const color = {
 // Brand, from the logo mark
 ember: "#F05023", // rings, rules, focus, accents. 3.6:1, never for text
 emberDeep: "#C2400F", // primary buttons, links. 5.2:1 with white
 emberDark: "#A3360C", // hover and pressed
 emberTint: "#FDEEE7", // brand surfaces
 navy: "#0E3460", // structure, secondary actions. 12.5:1
 navyTint: "#E8EDF4", // quiet buttons, info surfaces

 // Neutrals
 ink: "#141520", // primary text. 18.1:1
 inkSoft: "#3A3F4E", // body copy. 10.5:1
 slate: "#5E6678", // labels, secondary text. 5.8:1
 line: "#E3E6EC", // borders, rules
 lineSoft: "#EEF0F4", // inner dividers, tracks
 mist: "#F4F5F8", // page background, tiles
 paper: "#FFFFFF", // panels
};

// Each tone: fg for text, fill for solid marks, bg for tinted surfaces
const tone = {
 brand: { fg: color.emberDeep, fill: color.ember, bg: color.emberTint },
 info: { fg: color.navy, fill: color.navy, bg: color.navyTint },
 success: { fg: "#1B7A4B", fill: "#1E8A55", bg: "#E6F4EC" },
 warning: { fg: "#8A5A00", fill: "#E0A019", bg: "#FFF4DC" },
 danger: { fg: "#C0262D", fill: "#D93036", bg: "#FDECEC" },
 neutral: { fg: color.slate, fill: color.slate, bg: color.lineSoft },
};

const font = {
 display: "var(--font-display), var(--font-body), system-ui, sans-serif",
 body: "var(--font-body), system-ui, sans-serif",
};

// Major third (1.25) on a 16px base
const type = {
 display: { fontFamily: font.display, fontSize: "44px", fontWeight: 700, lineHeight: 1.1 },
 headline: { fontFamily: font.display, fontSize: "36px", fontWeight: 700, lineHeight: 1.15 },
 title: { fontFamily: font.display, fontSize: "28px", fontWeight: 600, lineHeight: 1.2 },
 figure: { fontFamily: font.display, fontSize: "24px", fontWeight: 600, lineHeight: 1.2 },
 heading: { fontFamily: font.display, fontSize: "20px", fontWeight: 600, lineHeight: 1.3 },
 body: { fontFamily: font.body, fontSize: "16px", fontWeight: 400, lineHeight: 1.6 },
 bodySm: { fontFamily: font.body, fontSize: "14px", fontWeight: 400, lineHeight: 1.55 },
 label: { fontFamily: font.body, fontSize: "13px", fontWeight: 500, lineHeight: 1.4 },
 caption: { fontFamily: font.body, fontSize: "12px", fontWeight: 400, lineHeight: 1.4 },
 button: { fontFamily: font.body, fontSize: "15px", fontWeight: 600, lineHeight: 1 },
};

// 4px grid
const space = [0, 4, 8, 12, 16, 24, 32, 48, 64];

// The bigger the container, the softer the corner
const radius = { xs: 4, sm: 8, md: 12, lg: 20, pill: 999 };

// Tinted with navy
const elevation = {
 rest: "0 1px 2px rgba(14, 52, 96, 0.06), 0 1px 3px rgba(14, 52, 96, 0.04)",
 raised: "0 4px 16px rgba(14, 52, 96, 0.08), 0 1px 3px rgba(14, 52, 96, 0.05)",
 overlay: "0 12px 40px rgba(14, 52, 96, 0.14), 0 2px 6px rgba(14, 52, 96, 0.06)",
};

const motion = {
 fast: "120ms cubic-bezier(.2, 0, 0, 1)", // hover colour changes
 base: "220ms cubic-bezier(.2, 0, 0, 1)", // open and close, toggles
 slow: "600ms cubic-bezier(.2, 0, 0, 1)", // one-off fills when data arrives
};

// White gap plus ember ring, used on every focusable control
const focusRing = `0 0 0 2px ${color.paper}, 0 0 0 4px ${color.ember}`;

const media = {
 reducedMotion: "@media (prefers-reduced-motion: reduce)",
};

const tizaraa = { color, tone, font, type, space, radius, elevation, motion, focusRing, media };

export type TizaraaTokens = typeof tizaraa;

export default tizaraa;
