# Tizaraa frontend redesign plan

Re-skin of the customer shopping flow, based on the brand system in `tizaraa-design-report.pdf` (7 Oct 2026).

## Status

| Phase | Area | Status |
|---|---|---|
| 0 | Foundation: tokens, palette, fonts, primitives, MUI theme | Done |
| 1 | Shell: topbar, header, search, categories, mini-cart, navbar, footer, mobile nav | Done |
| 2 | Home page and shared product card | Done (visual check 13 Oct) |
| 3 | Listing, search and product details | Done |
| 4 | Cart, checkout, payment | Done (checkout and payment not seen logged in) |
| 5 | Auth: login, signup, verify, reset | Done |
| 6 | Shops page and shared leftovers | Done in code |
| 7 | Dashboard shell and profile (new layout) | Done in code, not seen in a browser |
| 8 | Dashboard orders: lists, details, review, return | Done in code, not seen in a browser |
| 9 | Dashboard address, credit history, RFQ, wishlist, tickets, payment methods | Done in code, not seen in a browser |
| 10 | Info pages: contact, location, order tracking, policies, about | Planned |
| 11 | OT-Commerce, B2B product, corporate invite | Planned |

## Phases 6–11 (added 15 Oct 2026)

Scope change: every page that still shows template colours is now in scope, and the customer dashboard gets a new layout, not just new colours. The rules and checks for Phases 0–5 apply to these phases as well.

**Phase 6: Shops page and shared leftovers**
- Shops page title (`shops/page.tsx`), the "Show on Map" button (`VendorMapPage.tsx`), `ShopIntroCard` and `ShopCard1`.
- Shared pieces still pink: `badge/styles.ts`, `checkout/OrderedItem.tsx`, `checkout/RfqCheckoutAddress.tsx`, and `utils/themeColors.ts` if anything still imports it.

**Phase 7: Dashboard shell and profile**
- `layout/customer-dashboard/Layout.tsx`: a 280px sidebar and a content column on mist, replacing the 3/9 grid.
- `DashboardNavigation`: a user block at the top (avatar or initials, name, email), grouped links ("Orders", "Account"), the active link marked with an ember bar on emberTint, and counts as neutral pills. Logout sits at the bottom on every screen size. Counts, polling and the corporate RFQ rule stay as they are.
- `DashboardPageHeader`: the title at `heading` size with an optional subtitle and actions. Below 1024px the menu opens in the existing `Sidenav`.
- Profile page, new layout:
  - a header card with avatar or initials, name, email, account type chip and "Edit profile" / "Change password" actions
  - a row of four order stat tiles (all, pending, delivered, cancelled) that link to their lists, each in its tone colour
  - a "Personal details" card as a label/value list: phone, email, birthday, gender
  - `CorporateCard` restyled on tokens for employee accounts
- `ProfileEditForm`, `EditProfileButton`, `SetPassword` and `SetPasswordForm` restyled on tokens.

**Phase 8: Dashboard orders**
- The five list pages (`orders`, `pending-orders`, `delivered-orders`, `cancel-orders`, `return-orders`) and the old `cancelled-order` / `return-order` pages.
- Row components (`OrderRow`, `PendingOrderRow`, `DeliveredOrderRow`, `CancelOrderRow`, `ReturnOrderRow`): one card style, status as a tone chip, amounts in tabular figures. `EmptyOrders` and `OrdersPagination` restyled.
- Detail pages (`orders/[id]` and the four status copies): `OrderStatus`, `ReturnedOrderStatus`, `OrderTotalSummary`, `ShippingAddressCard`, `WriteReview`.

**Phase 9: Other dashboard pages**
- Address list, `AddressItem`, `AddressForm`, `EditAddressForm`, `CheckOutAddressForm`, the address dialog.
- Credit history and transactions.
- RFQ list, RFQ detail, comments and the RFQ form.
- Wishlist, support tickets, payment methods.

**Phase 10: Info pages**
- `contact`, `location`, `orderTracking` (`TrackPage.css`), `about-tizaraa`, `privacy-policy`, `terms-and-conditions`, `return-and-refund-policy`, `replacement`, `shipiingAndDelivery`.
- CSS files use the `--tz-*` variables from `globalStyles.ts`.

**Phase 11: OT-Commerce, B2B and corporate**
- `otproducts/[id]`, `OtProductSearch/[slug]`, `OTproductsIntro`, its CSS module.
- `b2bproduct/[slug]`, `B2BProductDetails`, `B2BProductIntro`.
- `corporate/invite/[token]`, `page/profile/corporeateCard.tsx` (if not done in Phase 7).

**Phase 6: done in code (15 Oct 2026)**
- Shops page title is ink in the display font. "Show on Map" and "Visit Shop" use emberDeep with the button type and radius. The `ShopIntroCard` header strip is navy.
- `badge/styles.ts` uses the brand tone. `OrderedItem` shows the line total in ink with tabular figures. `RfqCheckoutAddress` cards use line, radius md and rest elevation.
- `utils/themeColors.ts` is left alone: only template demo pages and the star rating import it, and none of them read its pink.

**Phase 7: done in code (15 Oct 2026)**
- New `layout/customer-dashboard/styles.ts`, so the vendor dashboard keeps `layout/styles.ts`. The shell is a 280px sticky sidebar and a content column. Below 1024px the sidebar hides and the header menu button opens it in `Sidenav`.
- `DashboardNavigation`: user block (avatar or initials, name, email from `userInfo`), "Shopping" and "Account" groups, `aria-current` on the active link with an ember bar on emberTint, counts as pills (only for links that have a count), and Logout at the bottom on every screen size. Data fetching, polling and the corporate RFQ rule are unchanged.
- `DashboardPageHeader`: navy icon tile, 24px display title, new optional `subtitle`, actions on the right, and a real `<button>` for the mobile menu.
- New `page-sections/customer-dashboard/ui.tsx`: `DashPanel`, `DashPanelHead`, `UserAvatar`, `ToneChip`, `StatGrid`/`StatTile`, `DetailList`/`DetailItem`. Phases 8–9 reuse these.
- Profile page: `ProfileIdentity` card, four tone stat tiles linking to the order lists, and a "Personal details" list. `CorporateCard` is rebuilt on the same pieces with a credit row (balance, pending, due), work details and a navy corporate shop link.
- `EditProfileButton` and `BackToProfileButton` use the shared `Button` (contained primary, outlined secondary). `ProfileEditForm`, `SetPasswordForm` and `SetPassword` are on tokens; the edit form has labels above 44px fields and right-aligned actions.
- `globalStyles.ts` gained `--tz-focus-ring`, `--tz-success`/`-bg`, `--tz-warning`/`-bg`, `--tz-danger`/`-bg` and `--tz-font-display` for plain CSS.
- `npx tsc --noEmit` is clean. The Playwright browser would not start (Chrome aborts on a GTK settings schema), and the dashboard needs a logged-in test account, so nothing in Phase 7 has been seen in a browser yet.

**Phase 8: done in code (15 Oct 2026)**
- New `orders/OrderCard.tsx` with `OrderListHead` and `statusTone`. The five row components (`OrderRow`, `PendingOrderRow`, `DeliveredOrderRow`, `CancelOrderRow`, `ReturnOrderRow`) were copies that differed only in their link, so each is now a one-line wrapper around it. The card shows invoice, date, item count, total in tabular figures, and the item breakdown as tone chips (cancelled items danger, returned items neutral, the rest in the order's status tone). On phones it stacks into two lines.
- The five list pages use `OrderListHead` instead of the template `TableRow` header, with sentence-case titles. `EmptyOrders` is on tokens.
- Detail pages, `OrderStatus`, `ReturnedOrderStatus`, `OrderTotalSummary`, `ShippingAddressCard`, `WriteReview` and the `cancelled-order` / `return-order` forms: raw colours were mapped to `var(--tz-*)` with a script that skips commented lines. The status chip colours (`getColor`) now use the tone colours, which keep white text readable. Star-rating yellow (`#FFB400`) is kept.
- The cancel and return form buttons use the brand radius and sentence case ("Confirm cancellation", "Submit return"), and their disabled text is readable. Detail page titles are sentence case, and the "Cencelled" typo is fixed. `OrderListButton` reads "Back to orders" as an outlined button.
- `npx tsc --noEmit` is clean. Nothing in Phase 8 has been seen in a browser yet.

**Phase 9: done in code (15 Oct 2026)**
- Address list is a two-column card grid (one column at 820px and below): name, address, phone, and outlined Edit / Delete buttons. The empty state reuses `EmptyOrders`. The delete dialog has Cancel then a danger Delete, and its text uses the display font. `AddNewAddress` is a contained primary button.
- Address forms, credit history, transactions and the RFQ list, detail, comments and form: raw colours mapped to `var(--tz-*)`. RFQ status chips use the warning/success tones.
- The credit-history statement opens in a new window, where the CSS variables don't exist, so the mapping skipped it. Its orange and blue were swapped by hand for literal emberDeep and navy hex.
- The `tzmap.py` mapping script skips print templates (`--skip=start:end`). Lucide icons take `color` as an SVG attribute, where `var()` doesn't work, so `rfq-comment` passes `tz.color.slate` instead.
- Wishlist, support tickets and payment methods are template pages with no raw colours. They only got sentence-case titles, as did every other dashboard title.
- No template pink is left in live dashboard code. `npx tsc --noEmit` is clean.

**Not touched**
- Commented-out code and backup files (`*_Backup*`, `*_24.05.25.tsx`, `ProductDetails_03.08.25.tsx`). They are not rendered.
- Template demo routes `(layout-1)`, `(layout-2)`, `(sale)`.

## Progress notes (stopped 12 Oct 2026)

**Where things stand**
- All work is on branch `redesign/foundation`. Nothing is committed yet; commit only after confirming.
- Leave `src/api/ApiBaseUrl.js` out of every commit. It holds a local-only `localApiUrl` change.
- `npx tsc --noEmit` is clean. A full `npm run build` passed after Phase 0. It has not been run since, because the dev server was running and both write to `.next`.

**Phase 2: done in code**
- New shared card `src/components/product-cards/ProductTile.tsx`, with `ProductTileSkeleton`. It replaces the inline cards in:
  - `NewArrivalsProducts/ProductCarousel.tsx`
  - `CampaingProducts.tsx`
  - `OTCProducts.tsx`
  - `JustForYouPeoducts/JustForYouProducts.tsx`, which is now a 5/3/2-column grid
- New `src/components/SectionHead.tsx` (`SectionHeadRow`, `ViewAllLink`), used by:
  - `CategorySectionHeader.tsx`
  - `CampaignSectionHeader.tsx`, with a navy countdown chip and the Lobster font removed
  - `OTsectioncreator.tsx`
- Smaller visual changes:
  - Category tiles have a border instead of a shadow.
  - Country tiles are now cards.
  - Banners have rounded corners.
  - Sections are spaced 48px apart.
  - The active hero dot is a pill.
  - The "Load more" button has an outlined style.
- `globalStyles.ts` now exposes `--tz-*` CSS variables, so CSS modules can use brand colours. `JustForYouParoducts.module.css` is the first file to use them.

**Phase 2 visual check (13 Oct 2026)**
- Checked `/` at 390, 820 and 1280px against UAT data. Two fixes:
  - `ProductCarousel` returns nothing once loaded with no products. Before, the empty "Stationery & Craft" row showed just a header and arrows.
  - `Carousel` has a new opt-in `hideArrowOnMobile` prop that hides arrows at 425px and below, so they no longer cover product images. Phones swipe instead. It is used by `ProductCarousel`, `CampaingProducts` and `OTCProducts`.
- Not redesign issues, so left alone: `favicon.ico` returns 500 in dev because it exists in both `src/app/` and `public/`, and the OTC section is hidden because the OTPI category API returns no `Content`.

**Phase 3: done in code (13 Oct 2026)**
- New `src/components/listing/Listing.tsx`: `ListingToolbar` (title, count, sort, grid/list toggle, Filters drawer), `ListingGrid`, `ListingRows`, `ListingSkeleton`, `ListingEmpty`, `ListingLoadMore`, `slugToTitle`.
- `ProductTile` gained `layout="row"` for list view. `ProductCard1` and `ProductCard9` now render through it with their props and price rules unchanged, so every listing page and the wishlist share one card.
- `ProductCard1List` / `ProductCard9List` use the shared grid (auto-fill, 2 columns on phones).
- The toolbar, skeleton, empty state and "Show more" are applied to category, search, flash sale, new arrivals, country, campaign, location and shops. On the shops page the product search box now sits above the products, and the toolbar title is "All products".
- `Select` uses brand tokens (44px, 8px corners, focus ring) and now merges a caller's `styles` with its own instead of replacing them.
- Filter cards (`ProductFilterCard` and its Shop/Country/NewArrival/FlashSale/Campaign copies) use tokens instead of the template green and pink.
- Product details:
  - `productPageTheme` now maps to brand tokens, which re-colours the whole page.
  - Intro: 28px title, figure-size price, spec rows, option chips, a stock line in the success/danger tone, brand cart stepper with a focus ring, and the RFQ button on the shared `Button`.
  - The description "Show more" is outlined.
  - Related products use `ProductTile` in `ListingGrid`. This also fixes the "BDT BDT" price.
- Fixed a regression: the side panel, the info page and the B2B product page hardcoded the generated Open Sans class (`__Open_Sans_9c011f`), so they fell back to a serif font after Phase 0. They now inherit.

**Phase 4: done in code (13 Oct 2026)**
- `Stepper` is redesigned as numbered steps joined by a rule, with real buttons and `aria-current`. Done steps are navy, the current step is ember. The mobile stepper in `(checkout)/layout.tsx` uses the same colours.
- `ProductCard7` (cart line) has a new render: shop strip, checkbox, image, a two-line title, a meta line and a joined quantity stepper. Handlers and limits are unchanged.
- Cart page:
  - select-all bar with a selected/total count
  - sticky "Order summary" with the total as its largest text
  - promo field on tokens, with the applied code as a success-tone chip and a real remove button
  - new "Your cart is empty" state
- Checkout and payment sections (`CheckoutForm`, `CheckoutAddress`, `CheckoutSummary`, `RfqCheckoutForm`, `PaymentForm`, `PaymentSummary`, `CorporatePaymentForm`): every colour maps to a token. Totals are ink, in the display font and tabular figures. Selected payment cards get an ember ring on emberTint.
- New `src/page-sections/checkout/StickySummary.tsx` keeps the summary in view on the checkout and payment pages. It stays static at 1024px and below.
- The cart was checked at 1280 and 390px with a cart seeded in the browser. Checkout and payment need a logged-in session, so they were checked in code only.

**Phase 5: done in code (13 Oct 2026)**
- `(auth)/layout.tsx`: a centred 440px column on mist, with the logo above the card.
- `page-sections/auth/styles.ts`: shared `AuthCard`, title, subtitle, text link, error and success notes, divider, social button and input, all on tokens.
- Login, Signup, VerifyEmail, ResetPassword and ForgotPasswordModal are restyled. Google login is an outlined neutral button. The OTP field is 52px with tabular figures. Template metadata on the login, signup and verify pages is replaced.
- Login inside the header's `LoginDialog` now shows the card without the logo.

**Checks across Phases 0–5 (13 Oct 2026)**
- `npx tsc --noEmit` is clean.
- Bangla: Google Translate does not run in the headless browser, so Bangla text was injected into titles, cards, the toolbar and buttons at 390px. Anek Bangla and Hind Siliguri render, long titles wrap or clamp, and nothing overflows.
- Keyboard: tabbing through category, product details and login (173 stops) found a visible focus ring on every control.
- No `#e94560`, `#d23f57` or `#3bb77e` in live code of any changed file, except the B2B product page (out of scope).

**Next steps**
1. `npm run build` with the dev server stopped.
2. Log in and walk checkout and payment, up to the payment step only.
3. Commit Phases 0–5 as separate commits, after confirming.

**Known leftovers outside the phases done so far**
- The shops page title and its "Show on Map" button are still pink.
- About 400 hardcoded pink values remain in pages not yet covered. Phases 3–5 handle the ones in scope.

## Why
The site still looks like the Bazaar template it was bought as: template pink (`#E94560`), Open Sans, default radius and shadows, and four slightly different product cards on the home page. The design report defines a brand system built from the logo. This plan puts that system into code and moves the core shopping pages onto it, one phase per PR.

**In scope:** shell, home, listing/search, product details, cart, checkout, payment, auth.

**Out of scope:**
- Customer dashboard, OT-Commerce and corporate pages were out of scope for Phases 0–5. Phases 7–11 now cover them.
- Template demo routes `(layout-1)`, `(layout-2)`, `(sale)`. They are left untouched, not deleted.

## How styling works today
- The theme holds `{colors, shadows, breakpoints, tz}`: `src/theme/themeOptions.ts`, `src/theme/colors/colors.ts`, `src/theme/shadows/shadows.ts`.
- It is provided by `src/contexts/StyledContext.tsx`, together with the MUI theme and the global styles in `src/theme/global-styles/globalStyles.ts`.
- `Button`, `Typography`, `Card`, `Chip` and `text-field` read theme tokens, so palette changes reach them automatically.
- About 466 hardcoded uses of `#E94560` sit in 84 files, plus off-palette greens (`#3BB77E`) and Tailwind greys. Theme changes don't reach these, so each phase replaces them in its own files.

## Design tokens (`src/theme/tizaraa.ts`, used as `theme.tz`)

| Group | Values |
|---|---|
| Brand | ember `#F05023` (accents, focus, never text), emberDeep `#C2400F` (primary buttons, links), emberDark `#A3360C` (hover), emberTint `#FDEEE7`, navy `#0E3460`, navyTint `#E8EDF4` |
| Neutrals | ink `#141520`, inkSoft `#3A3F4E`, slate `#5E6678`, line `#E3E6EC`, lineSoft `#EEF0F4`, mist `#F4F5F8`, paper `#FFFFFF` |
| Tones | `tone.{brand,info,success,warning,danger,neutral}.{fg,fill,bg}` |
| Fonts | Anek Bangla (display, 500–700), Hind Siliguri (body, 400–600). Both cover Bangla. Loaded with `next/font` as `--font-display` and `--font-body` |
| Type scale | display 44, headline 36, title 28, figure 24, heading 20, body 16, bodySm 14, label 13, caption 12, button 15 |
| Space | 4px grid: 4, 8, 12, 16, 24, 32, 48, 64 |
| Radius | xs 4, sm 8 (inputs), md 12 (buttons, cards), lg 20 (large panels), pill |
| Elevation | rest, raised, overlay, all tinted with navy |
| Motion | fast 120ms, base 220ms, slow 600ms. All switched off under `prefers-reduced-motion` |
| Focus | `tz.focusRing`: a white gap and then an ember ring |

## Phase 0: Foundation (done)
- Added `src/theme/tizaraa.ts` and exposed it as `theme.tz`. `type.ts` and `themeOptions.ts` were updated so it is typed.
- Remapped `colors.ts`:
  - primary is now the ember family, with `main = emberDeep`
  - secondary is navy
  - greys are ink, slate and mist
  - error, success and warn use the tone colours
- Navy-tinted named shadows in `shadows.ts`.
- `globalStyles.ts`:
  - brand fonts, with headings in Anek Bangla
  - `:focus-visible` ring and brand text selection colour
  - `.price` / `.amount` / `.tabular-nums` helpers
  - reduced-motion override
- `layout.tsx`: replaced Open Sans with Anek Bangla and Hind Siliguri, and replaced the template title and description.
- Primitives:
  - `Button`: 12px radius, darker hover, focus ring
  - `Card`: 12px radius
  - `Typography`: H1 28px, H2 24px
  - `text-field`: 44px height, 8px radius, ember focus
- `src/theme/muiTheme.ts` with a MUI `ThemeProvider` in `StyledContext`, so MUI components match the brand.

## Phase 1: Shell
- **Files:**
  - `topbar/index.tsx`
  - `header/Header.tsx`, `header/styles.ts`, `header/LoginDialog.tsx`
  - `search-box/SearchInputWithCategory.tsx`
  - `categories/*`, the dropdown and MegaMenu1/2
  - `mini-cart/index.tsx`
  - `navbar/Navbar.tsx`
  - `footer/footer-1/Footer1.tsx`
  - `mobile-navigation/index.tsx`
- **Header:** white, on one row: logo, search, account and cart. The cart count is a pill badge.
- **Navbar:** quieter, with less colour.
- **Footer:** navy, on a clear column grid.
- **Mobile nav:** a clear active state and 44px touch targets.
- No raw hex left in these files.

## Phase 2: Home
- Pull one shared `ProductCard` into `src/components/product-cards/`. It covers the image ratio, discount badge, a title clamped to 2 lines, rating, a price in tabular figures, and a hover lift that respects reduced motion. It replaces the four inline cards in `page-sections/market-1/*`.
- Restyle these sections with consistent section headers (sentence-case title and a "View all" link) and gaps of 24px or more:
  - hero (`Section1`)
  - categories (`Section10`)
  - `CampaignBanner`, `Section8`
  - `FlashSaleBanner`
  - `JustForYouProducts`
  - countries (`Section12`)

## Phase 3: Listing and product details
- **Listing:**
  - Bring `ProductCard1` and `ProductCard9` in line with the shared card.
  - Restyle `ProductFilterCard` and the `SearchResult.tsx` toolbar: sort, count and grid/list toggle.
- **Product details:**
  - `ProductIntro`: gallery, price block, variant chips, quantity, and a clear "Add to cart" / "Buy now" hierarchy.
  - `ProductDescription` and `ProductReview`: tabs.
  - Restyle `RelatedProducts` and `AvailableShops`.
- Start with the main category and search pages, then carry the pattern to the other `[slug]` copies: shops, campaign and flashsale.

## Phase 4: Cart, checkout, payment
- Restyle the checkout stepper in `(checkout)/layout.tsx` and the `ProductCard7` cart line.
- Restyle `CheckoutForm`, `CheckoutAddress`, `CheckoutSummary`, `PaymentForm` and `PaymentSummary`.
- Order summary:
  - a sticky card
  - right-aligned amounts in tabular figures
  - the total in the largest type in the summary
- Style only. Checkout logic must not change.

## Phase 5: Auth
- `(auth)/layout.tsx`: a centred card on mist with the brand mark on top.
- Restyle `Login`, `Signup`, `VerifyEmail`, `ResetPassword`, `ForgotPasswordModal` and the OTP input CSS.
- Inline error text uses the danger tone.

## Rules for every phase
- Style only. Don't change API calls, state or business logic.
- No new raw hex in touched files. Use `theme.tz.*` or `theme.colors.*`.
- Text contrast must be at least 4.5:1. Ember is never used for text.
- Check every changed page at 390, 820 and 1280px, and with Bangla selected in the language switcher.

## Verification for each phase
1. `npx tsc --noEmit` and `npm run build` are clean. Stop the dev server before building, because both write to `.next`.
2. Run `npm run dev` and walk the phase's pages at 390, 820 and 1280px.
3. Browse against UAT, which is a shared database. Don't place orders, edit addresses or change profiles. Check checkout only up to the payment step.
4. `grep -rniE "#e94560|#d23f57"` over the phase's files returns nothing.
5. Keyboard pass: every button, link and input shows the focus ring.
6. Switch to Bangla: fonts render and nothing overflows.
