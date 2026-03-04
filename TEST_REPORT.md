# Tizaraa Frontend — Software Testing Report

**Project:** Next.js 14 E-commerce Frontend
**Test Type:** Static Analysis, Code Audit, Architecture Review
**Date:** 2026-03-04

---

## PASSED

### TypeScript Compilation
- `tsc --noEmit` exits cleanly — **zero type errors**.

### ESLint
- No ESLint config exists (`.eslintrc` absent), so `next lint` prompts for setup. **No lint rules are enforced**, which is a risk, not a blocker.

### DOMPurify Usage (XSS)
- All active `dangerouslySetInnerHTML` that render user/API data pass through `DOMPurify.sanitize()` in:
  - `src/app/(layout-3)/product/[slug]/ProductDetails.tsx`
  - `src/app/(b2b-products)/b2bproduct/[slug]/ProductDetails.tsx`
  - `src/app/(OT-Commerce)/otproducts/[id]/page.tsx`

---

## CRITICAL BUGS

### 1. Middleware Uses `localStorage` on the Server — Always Bypassed
**File:** `middleware.ts` line 8

```ts
const isLoggedIn = authService.isAuthenticated(); // runs on the server
// authService calls localStorage.getItem("token") — localStorage does not exist on the server!
```

`authService.isAuthenticated()` calls `localStorage.getItem("token")`, which throws (or returns `null`) in the Edge runtime where middleware runs. This means **every protected route check silently returns `false`** — authenticated users may get redirected to `/login`, and protection is effectively non-functional.

**Fix required:** Read auth state from cookies in middleware (cookies are accessible server-side via `request.cookies`).

---

### 2. Cart `updateCartItem` Returns Wrong Value on Stock Overflow
**File:** `src/contexts/app-context/AppContext.tsx` line 364

```ts
if (cartItem.qty > cartItem.productStock) {
  return cartItem; // returns the single item, not the cart array!
}
```

When quantity exceeds stock, the function should return the unchanged `cart` array, but it returns just `cartItem` (the payload object). This replaces `state.cart` with a single object instead of an array, breaking all cart rendering.

---

### 3. Unsafe `error.response.data` Access Without Null Guard
**Files:**
- `src/app/(layout-3)/(checkout)/cart/page.tsx` line 167
- `src/components/mini-cart/index.tsx`
- `src/page-sections/payment/CorporatePaymentForm.tsx`

```ts
if (error instanceof AxiosError) {
  toast.error(error.response.data?.message || ...);
  // error.response can be undefined (network errors, timeouts)
  // This throws: Cannot read properties of undefined (reading 'data')
}
```

**Fix:** Use `error.response?.data?.message`

---

### 4. Unsanitized `dangerouslySetInnerHTML` on RFQ Pages — XSS Vulnerability
**Files:**
- `src/app/(layout-3)/(customer-dashboard)/rfq/[id]/page.tsx` line 764 — renders `productDetails.detailedRequirements` raw
- `src/app/(layout-3)/(customer-dashboard)/rfq/[id]/rfq-comment.tsx` line 219 — renders `c.message_content` raw (user-generated content)
- `src/components/products/ProductDescription.tsx` line 43 — renders `description` raw

These render **unsanitized API/user data as HTML** — XSS vulnerability. DOMPurify is installed but not used here.

---

## HIGH SEVERITY ISSUES

### 5. `next/head` Used Inside the App Directory — SEO Tags Silently Ignored
**Files:**
- `src/app/layout.tsx` line 176
- `src/app/(layout-3)/privacy-policy/page.tsx`
- `src/app/(layout-3)/about-tizaraa/page.tsx`
- `src/app/(layout-3)/return-and-refund-policy/page.tsx`
- `src/app/(layout-3)/terms-and-conditions/page.tsx`
- `src/app/(layout-3)/replacement/page.tsx`
- `src/components/CampaignSectionHeader.tsx`

`next/head` is a Pages Router API. In the App Router it silently does nothing. This means **favicons, meta tags, and SEO tags from these files are never applied**. Use the Metadata API (`export const metadata = { ... }` or `generateMetadata()`) instead.

---

### 6. `authService.ts` Marked `"use client"` But Called in Middleware
**File:** `src/services/authService.ts` line 1

The `"use client"` directive means this module is browser-only. Importing it in `middleware.ts` (which runs in the Edge runtime) is incorrect and is the root cause of Bug #1.

---

### 7. Two Duplicate Toast Libraries Both Active Simultaneously
**File:** `src/app/layout.tsx` lines 172–173

```tsx
import { ToastContainer } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
// Both <ToastContainer /> and <Toaster /> are mounted simultaneously
```

Toast notifications are fired inconsistently across the codebase — some components use `react-toastify`, others use `react-hot-toast`. Both render at the same time, causing potential z-index conflicts and duplicate toasts.

---

### 8. Hardcoded API URLs — No Environment Variable Support
**File:** `src/api/ApiBaseUrl.js`

```js
baseUrl: `https://uat-client.tizaraa.shop/api/`, // UAT hardcoded
```

No `NEXT_PUBLIC_API_URL` or `.env` files exist. Switching from UAT to production requires a **code change**, not a config change. This is a deployment risk.

---

### 9. Two Separate Axios Instances (Mock vs Real) — Silent Mock Risk
- `src/lib/axios.ts` — uses `MockAdapter`, intercepts all calls with mock data
- `src/lib/axiosClient.ts` — real authenticated axios client

Different files import different instances. If a component imports `axios.ts` instead of `axiosClient.ts`, it gets mocked responses in production silently.

---

## MEDIUM SEVERITY ISSUES

### 10. Dead Code / Backup Files in Production Source Tree
7 backup files are committed into `src/`:

| File |
|------|
| `src/app/(layout-3)/category/[slug]/SearchResult_Backup-01-07-25.tsx` |
| `src/components/products/ProductFilterCard_Backup-01-07-25.tsx` |
| `src/components/products/OTproductsIntro_Backup.tsx` |
| `src/components/products/FlashSaleProductFilter_Backup.tsx` |
| `src/components/products/CountryProductFilterCard_Backup.tsx` |
| `src/components/products/ShopProductFilterCard_Backup.tsx` |
| `src/components/products/NewArrivalProductFilter_Backup.tsx` |

These inflate the bundle and create confusion. They also contain `console.log` calls. A total of **709 `console.log/warn/error` calls exist across 154 files**.

---

### 11. SWR Cache Key Includes `null` Token After Logout
**File:** `src/hooks/useFetcher.ts` line 25

```ts
const { data, error, isLoading, mutate } = useSWR(
  url + token, // token is null after logout → key becomes "endpoint/null"
  ...
);
```

After logout, `token` is `null`, so the SWR cache key becomes `"endpoint/null"`. Previously fetched authenticated data continues to be served from cache, potentially exposing private user data until the page is hard-refreshed.

---

### 12. Full App Renders Nothing Until Mounted — Blank Flash on Every Page Load
**File:** `src/contexts/app-context/AppContext.tsx` line 601

```tsx
{isMounted ? children : null}
```

Until the `useEffect` fires after hydration, **the entire app renders nothing**. This causes a visible blank flash on every page load and is bad for Core Web Vitals (LCP). Children should render immediately; cart hydration should happen separately without blocking render.

---

### 13. Payment Page Uses `setTimeout` to Read `localStorage` — Race Condition
**File:** `src/app/(layout-3)/(checkout)/payment/page.tsx` lines 35–39

```ts
setTimeout(() => {
  const seller_type = localStorage.getItem("seller_type") || "";
  setSellerType(seller_type.toLowerCase());
}, 100);
```

Using a 100ms timeout to read from `localStorage` is a race condition — it may or may not work depending on rendering speed. Should use a `useEffect` with a proper dependency.

---

### 14. No ESLint Configuration
No `.eslintrc` file exists in the project. Common React bugs (missing deps in `useEffect`, missing list `key` props, accessibility issues) go uncaught. The `next lint` command prompts for initial setup rather than running.

---

### 15. No Automated Test Suite
No Jest, Vitest, Playwright, or Cypress is installed. The codebase has **zero automated tests** covering 95 pages, 175+ components, and all business logic (cart, checkout, auth, payments).

---

## SUMMARY TABLE

| # | Severity | Issue | File(s) |
|---|----------|-------|---------|
| 1 | Critical | Middleware auth check uses `localStorage` (server-side) — always fails | `middleware.ts` |
| 2 | Critical | Cart `updateCartItem` returns payload instead of cart array on stock overflow | `AppContext.tsx` |
| 3 | Critical | `error.response.data` accessed without null guard — throws on network errors | `cart/page.tsx`, `mini-cart/index.tsx` |
| 4 | Critical | Unsanitized `dangerouslySetInnerHTML` — XSS vulnerability on RFQ and product pages | `rfq/[id]/page.tsx`, `rfq-comment.tsx`, `ProductDescription.tsx` |
| 5 | High | `next/head` in App Router — SEO/meta tags silently ignored | `layout.tsx` + 6 pages |
| 6 | High | `authService` is `"use client"` but imported by server-side middleware | `authService.ts`, `middleware.ts` |
| 7 | High | Two toast libraries (`react-toastify` + `react-hot-toast`) both mounted at root | `layout.tsx` |
| 8 | High | API URLs hardcoded — no `.env` support, switching envs requires code changes | `ApiBaseUrl.js` |
| 9 | High | Two axios instances (mock vs real) — wrong import silently uses mocks in prod | `axios.ts` vs `axiosClient.ts` |
| 10 | Medium | 7 backup files in production `src/` tree — dead code, inflate bundle | Multiple |
| 11 | Medium | SWR cache keyed on `url + null` after logout — serves stale auth data | `useFetcher.ts` |
| 12 | Medium | Full app blank flash on mount due to `isMounted` gate blocking render | `AppContext.tsx` |
| 13 | Medium | `setTimeout` for `localStorage` read in payment page — race condition | `payment/page.tsx` |
| 14 | Medium | No ESLint config — no linting enforced across 770+ TypeScript files | Root |
| 15 | Medium | No automated test suite — zero tests for 95 pages and 175+ components | Entire project |

---

## RECOMMENDATIONS (Priority Order)

1. **Fix Bug #1 + #6** — Replace `localStorage` auth check in middleware with cookie-based auth. This is a security hole — route protection does not work.
2. **Fix Bug #4** — Wrap all unsanitized `dangerouslySetInnerHTML` with `DOMPurify.sanitize()`. XSS risk on user-facing pages.
3. **Fix Bug #2** — Return `cart` (not `cartItem`) when stock is exceeded in `updateCartItem`.
4. **Fix Bug #3** — Add `?.` optional chaining on all `error.response.data` accesses.
5. **Fix Issue #5** — Replace `next/head` with the Metadata API (`generateMetadata`) on all App Router pages.
6. **Fix Issue #8** — Move API base URLs to `.env.local` / `.env.production` using `NEXT_PUBLIC_API_URL`.
7. **Fix Issue #7** — Pick one toast library and remove the other throughout the codebase.
8. **Fix Issue #9** — Remove or clearly separate the mock axios instance; ensure production code always imports `axiosClient`.
9. **Fix Issue #12** — Remove the `isMounted` render gate from `AppContext`; hydrate cart state in background.
10. **Address Issue #15** — Set up Vitest (unit tests) and Playwright (E2E tests) for critical flows: login, cart, checkout, payment.
