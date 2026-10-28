/**
 * Shared look for the product page.
 *
 * The page is assembled from components that each carried their own hardcoded
 * greys, radii and font stacks, so panels sitting next to each other did not
 * match. Anything on that page should pull its surface, text and accent values
 * from here instead of inventing new ones.
 *
 * Values come from the brand tokens in src/theme/tizaraa.ts.
 */
import tz from "../../theme/tizaraa";

export const productPageTheme = {
  // page width every block lines up to
  maxWidth: "1200px",

  surface: tz.color.paper,
  border: tz.color.line,
  radius: `${tz.radius.md}px`,
  radiusSmall: `${tz.radius.sm}px`,
  shadow: tz.elevation.rest,

  heading: tz.color.ink,
  body: tz.color.inkSoft,
  muted: tz.color.slate,
  // quiet inset panels and chips
  subtle: tz.color.mist,
  // rating stars, the same amber the shared Rating uses
  star: tz.tone.warning.fill,

  // used for both text and fills, so the text-safe ember
  accent: tz.color.emberDeep,
  accentTint: tz.color.emberTint,
  accentBorder: tz.color.ember,
} as const;

/** Section title used above Related Products, Ratings & Reviews, etc. */
export const sectionTitleStyle: React.CSSProperties = {
  margin: "0 0 16px",
  fontFamily: tz.font.display,
  fontSize: "20px",
  fontWeight: 600,
  color: productPageTheme.heading,
};

export default productPageTheme;
