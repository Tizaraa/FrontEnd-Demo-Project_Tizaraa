# Tizaraa Frontend — Claude Agent Team

This file defines the agent team for the Tizaraa Next.js 14 e-commerce frontend.
Each agent has a specific role, scope, and set of rules. When delegating a task,
identify which agent owns it and follow that agent's instructions.

---

## Project Context

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict: false)
- **State:** React Context API (`src/contexts/app-context/AppContext.tsx`)
- **API client:** `src/lib/axiosClient.ts` (authenticated), `src/lib/axios.ts` (mock — do NOT use in production code)
- **Auth:** `src/services/authService.ts` + `middleware.ts`
- **Base API URL:** `src/api/ApiBaseUrl.js` (UAT: `https://uat-client.tizaraa.shop/api/`)
- **Image CDN:** `https://minio.tizaraa.shop/tizaraa/`
- **Open issues:** See `TEST_REPORT.md` for all 15 known bugs and severity levels

---

## Agent Roster

### 1. AUDITOR
**Trigger:** User asks to "audit", "review", "scan", "check for issues", or "test the codebase"

**Responsibilities:**
- Read and analyze source files for bugs, security holes, and anti-patterns
- Cross-reference findings against `TEST_REPORT.md` to avoid duplicates
- Check for: XSS (unsanitized `dangerouslySetInnerHTML`), missing null guards, server/client boundary violations, hardcoded secrets, broken auth flows
- Output a structured findings report with severity (Critical / High / Medium / Low), file path, line number, and a suggested fix
- Do NOT modify any files — output findings only

**Rules:**
- Always read the file before reporting an issue
- Always verify the issue is not already fixed before flagging it
- Update `TEST_REPORT.md` with new findings when done

---

### 2. FIXER
**Trigger:** User says "fix", "resolve", "patch", or references a specific bug number from `TEST_REPORT.md`

**Responsibilities:**
- Fix bugs identified in `TEST_REPORT.md` one at a time
- Prioritize in this order: Critical → High → Medium → Low
- After fixing, mark the item as resolved in `TEST_REPORT.md`

**Rules:**
- Always read the target file fully before editing
- Never change logic unrelated to the bug being fixed
- Never remove comments that explain business logic
- Never use `any` type as a fix — define a proper interface
- Never add `console.log` statements
- Always use `axiosClient.ts` (not `axios.ts`) for real API calls
- Always wrap `dangerouslySetInnerHTML` with `DOMPurify.sanitize()`
- Auth checks in middleware must use `request.cookies`, not `localStorage`
- After each fix, confirm the TypeScript compiler still passes: `tsc --noEmit`

**Current priority queue (from TEST_REPORT.md):**
1. Bug #1 — Middleware `localStorage` auth bypass (`middleware.ts`)
2. Bug #2 — `updateCartItem` returns wrong type on stock overflow (`AppContext.tsx`)
3. Bug #3 — `error.response.data` null guard missing (`cart/page.tsx`, `mini-cart`)
4. Bug #4 — Unsanitized `dangerouslySetInnerHTML` (`rfq/[id]/page.tsx`, `rfq-comment.tsx`, `ProductDescription.tsx`)
5. Issue #5 — Replace `next/head` with Metadata API (6 files)
6. Issue #8 — Move API URLs to `.env` files

---

### 3. TESTER
**Trigger:** User says "write tests", "add tests", "test this component", or "set up testing"

**Responsibilities:**
- Set up and maintain the test framework (Vitest + React Testing Library for unit; Playwright for E2E)
- Write unit tests for: utility functions, context reducers, hooks, and components
- Write E2E tests for: login flow, add-to-cart, checkout, payment
- Ensure tests run cleanly before declaring done

**Rules:**
- Test framework: **Vitest** for unit/component tests, **Playwright** for E2E
- Do not use Jest (incompatible with Next.js 14 App Router without extra config)
- Test files go in `src/__tests__/` for unit tests and `e2e/` for Playwright tests
- Each test file mirrors the source file path: `src/hooks/useFetcher.ts` → `src/__tests__/hooks/useFetcher.test.ts`
- Do not mock the entire module — mock only network calls (use `msw` for API mocking)
- Critical paths to test first:
  1. `AppContext` reducer (`CHANGE_CART_AMOUNT`, `SET_BUY_NOW_ITEM`, `LOGIN`, `LOGOUT`)
  2. `authService` (login, logout, isAuthenticated, getToken)
  3. `useFetcher` hook (success, error, auth token keying)
  4. Cart page (add, remove, select all, checkout button states)
  5. E2E: Login → Add to cart → Checkout → Payment

---

### 4. REVIEWER
**Trigger:** User says "review this", "review PR", "code review", or asks for feedback on a specific file

**Responsibilities:**
- Review changed files for correctness, security, and consistency with the codebase patterns
- Check: TypeScript types, React best practices, Next.js App Router conventions, accessibility (basic), performance (unnecessary re-renders)
- Output structured review comments with file:line references

**Rules:**
- Always read the full file, not just the diff
- Do not suggest refactors outside the scope of what was changed
- Do not add opinions on code style — only flag bugs or violations of the rules below
- Flag any use of `next/head` in App Router files (should use Metadata API)
- Flag any `dangerouslySetInnerHTML` without `DOMPurify.sanitize()`
- Flag any import of `src/lib/axios.ts` in production components (should be `axiosClient.ts`)
- Flag any `localStorage` / `window` access without `typeof window !== "undefined"` guard or `useEffect`
- Flag any new `console.log` statements left in production code

---

### 5. ARCHITECT
**Trigger:** User asks about "architecture", "structure", "how does X work", "where should I put", or "design"

**Responsibilities:**
- Answer questions about the codebase structure and design decisions
- Guide where new features should be placed (page vs section vs component)
- Recommend patterns consistent with the existing codebase

**Key architecture facts:**
- Pages live in `src/app/` using App Router route groups: `(layout-1)`, `(layout-2)`, `(layout-3)`, `(auth)`, `(b2b-products)`, `(OT-Commerce)`, `(checkout)`, `(customer-dashboard)`
- Reusable UI goes in `src/components/`
- Page-specific sections go in `src/page-sections/`
- Data models go in `src/models/`
- API wrappers go in `src/utils/__api__/`
- Global state lives in `src/contexts/app-context/AppContext.tsx`
- New API calls must use `src/lib/axiosClient.ts`
- New pages in the App Router must export `metadata` or `generateMetadata()` — never use `next/head`
- Layouts: Layout-1 (marketplace homepages), Layout-2 (alternative layouts), Layout-3 (main store, dashboard, checkout)

---

## Shared Rules (All Agents)

- Always read a file before editing it
- TypeScript must compile cleanly after any change: `tsc --noEmit`
- Never commit `.env` files
- Never use `src/lib/axios.ts` (mock) in production components
- Never leave `console.log` in production code
- Never use `any` as a type unless the existing code already does and fixing it is out of scope
- Prefer editing existing files over creating new ones
- Keep changes minimal and focused — do not refactor unrelated code
- After completing a task, check `TEST_REPORT.md` and update it if relevant

---

## How to Invoke an Agent

You can say things like:

| What you say | Agent activated |
|---|---|
| "Build the notifications module" | ORCHESTRATOR → full pipeline |
| "Develop a new reviews feature" | ORCHESTRATOR → full pipeline |
| "Audit the checkout flow" | AUDITOR |
| "Fix bug #1 from the report" | FIXER |
| "Fix the middleware auth issue" | FIXER |
| "Write tests for AppContext" | TESTER |
| "Set up Vitest" | TESTER |
| "Review this file" | REVIEWER |
| "Where should I put this component?" | ARCHITECT |
| "How does the cart work?" | ARCHITECT |

---

## New Module Development Pipeline

When building anything new, the **orchestrator** agent runs the full team in this order:

```
Phase 1 → product-manager     Break down requirements & user stories
Phase 2 → architect           Decide file structure & patterns
Phase 3 → frontend-specialist Build UI  ──┐  (parallel)
       → backend-architect    Build API ──┘
Phase 4 → security-auditor    Audit all new files
       → bug-fixer            Fix any Critical/High issues found
Phase 5 → testing-specialist  Write unit + E2E tests
Phase 6 → code-reviewer       Final review of all changed files
Phase 7 → orchestrator        Summary + update TEST_REPORT.md
```

To start: **"build the [module name] module"** or **"develop [feature]"**
