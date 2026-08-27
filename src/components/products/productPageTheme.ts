/**
 * Shared look for the product page.
 *
 * The page is assembled from components that each carried their own hardcoded
 * greys, radii and font stacks, so panels sitting next to each other did not
 * match. Anything on that page should pull its surface, text and accent values
 * from here instead of inventing new ones.
 */
export const productPageTheme = {
  // page width every block lines up to
  maxWidth: "1200px",

  surface: "#fff",
  border: "#EDEFF2",
  radius: "12px",
  radiusSmall: "8px",
  shadow: "0 1px 3px rgba(0,0,0,0.06)",

  heading: "#2C3A4A",
  body: "#4B5563",
  muted: "#8A94A6",

  accent: "#E94560",
  accentTint: "#FDECEF",
  accentBorder: "#F8D4DA",
} as const;

/** Section title used above Related Products, Ratings & Reviews, etc. */
export const sectionTitleStyle: React.CSSProperties = {
  margin: "0 0 16px",
  fontSize: "18px",
  fontWeight: 600,
  color: productPageTheme.heading,
};

export default productPageTheme;
