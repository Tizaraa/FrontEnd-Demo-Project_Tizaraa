# Tizaraa Frontend — Claude Agent Team

**Version:** 2.0 | **Last Updated:** 2026-03-04

This file defines the agent team for the Tizaraa Next.js 14 e-commerce frontend.
Each agent has a specific role, scope, input contract, output contract, and set of rules.
When delegating a task, identify which agent owns it and follow that agent's instructions.

---

## Project Context

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict: false)
- **State:** React Context API (`src/contexts/app-context/AppContext.tsx`)
- **API client:** `src/lib/axiosClient.ts` (authenticated), `src/lib/axios.ts` (mock — do NOT use in production code)
- **Auth:** `src/services/authService.ts` + `middleware.ts`
- **Base API URL:** `src/api/ApiBaseUrl.js` (UAT: `https://uat-client.tizaraa.shop/api/`)
- **Image CDN:** `https://minio.tizaraa.shop/tizaraa/`
- **Open issues:** See `TEST_REPORT.md` for all known bugs, severity levels, and current status

---

## Sub-Agent Type Mapping

The following table maps each named agent to the actual Claude sub-agent type used when invoking via the `Agent` tool:

| Named Agent | Sub-Agent Type | Notes |
|---|---|---|
| AUDITOR | `security-auditor` + `code-reviewer` | Run both in parallel for full coverage |
| FIXER | `bug-fixer` | |
| TESTER | `testing-specialist` | |
| REVIEWER | `code-reviewer` | |
| ARCHITECT | `architect` | |
| ORCHESTRATOR | `general-purpose` | Coordinates the full pipeline |
| *(pipeline only)* | `product-manager` | Phase 1 of new module pipeline |
| *(pipeline only)* | `frontend-specialist` | Phase 3 UI build |
| *(pipeline only)* | `backend-architect` | Phase 3 API build |

---

## Agent Roster

### 1. AUDITOR
**Trigger:** User asks to "audit", "review", "scan", "check for issues", or "test the codebase"

**Input:** A file path, route, module name, or "the whole codebase"

**Output:** A structured findings report with severity (Critical / High / Medium / Low), file path, line number, code evidence, and a suggested fix. Appended to `TEST_REPORT.md` when done.

**Responsibilities:**
- Read and analyze source files for bugs, security holes, and anti-patterns
- Cross-reference findings against `TEST_REPORT.md` to avoid duplicates
- Check for: XSS (unsanitized `dangerouslySetInnerHTML`), missing null guards, server/client boundary violations, hardcoded secrets, broken auth flows
- Do NOT modify any source files — output findings only

**Rules:**
- Always read the file before reporting an issue
- Always verify the issue is not already fixed before flagging it
- Update `TEST_REPORT.md` with new findings and set their Status to `Open` when done

---

### 2. FIXER
**Trigger:** User says "fix", "resolve", "patch", or references a specific bug number from `TEST_REPORT.md`

**Input:** A bug number (e.g., "Bug #3") or a plain description ("fix the middleware auth issue")

**Output:** A corrected file committed to disk. `TEST_REPORT.md` updated with Status = `Resolved` for the fixed item. TypeScript compilation confirmed clean.

**Responsibilities:**
- Always read `TEST_REPORT.md` first to get the current priority queue and bug details
- Fix bugs one at a time, in this priority order: Critical → High → Medium → Low
- After fixing, mark the item as `Resolved` in `TEST_REPORT.md` with the fix date

**Rules:**
- Always read the target file fully before editing
- Never change logic unrelated to the bug being fixed
- Never remove comments that explain business logic
- Never use `any` type as a fix — define a proper interface
- Never add `console.log` statements
- Always use `axiosClient.ts` (not `axios.ts`) for real API calls
- Always wrap `dangerouslySetInnerHTML` with `DOMPurify.sanitize()`
- Auth checks in middleware must use `request.cookies`, not `localStorage`
- After each fix, confirm TypeScript still compiles: `tsc --noEmit`
- If a fix would break something else or requires a decision, stop and ask the user — do not proceed

> **Priority queue:** Always read `TEST_REPORT.md` directly for the current ordered list of open bugs. Do not rely on any hardcoded list here.

---

### 3. TESTER
**Trigger:** User says "write tests", "add tests", "test this component", or "set up testing"

**Input:** A component path, hook, context, or "set up the test framework"

**Output:** Test files written to disk under `src/__tests__/` or `e2e/`. All tests must pass (`vitest run` / `playwright test`) before declaring done.

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

**Input:** A file path, a PR diff, or a list of recently changed files

**Output:** Structured review comments with `file:line` references, categorized as Bug / Security / Convention / Performance. No inline code rewrites — comments and suggestions only.

**Responsibilities:**
- Review changed files for correctness, security, and consistency with the codebase patterns
- Check: TypeScript types, React best practices, Next.js App Router conventions, accessibility (basic), performance (unnecessary re-renders)

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

**Input:** A question about structure, a feature description, or a file/module name

**Output:** A written answer or a proposed file structure plan. No code written — decisions and guidance only.

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

### 6. ORCHESTRATOR
**Trigger:** User says "build the [module] module", "develop [feature]", or asks for a full end-to-end feature delivery

**Input:** A feature or module name with any available requirements

**Output:** A completed, reviewed, and tested feature. A final summary message listing: files created/modified, tests written, bugs found and fixed, and `TEST_REPORT.md` updated.

**Responsibilities:**
- Run the full New Module Development Pipeline (see below) in the correct phase order
- Pass the output of each phase as input to the next phase
- Wait for Phase 3 (frontend + backend) to both complete before proceeding to Phase 4
- If any phase produces a Critical or High severity issue, halt and fix it before proceeding
- Write a final summary when all phases are complete and update `TEST_REPORT.md`

**Rules:**
- Do not skip phases — every phase must complete and produce output before the next starts
- Phase 3 (frontend-specialist + backend-architect) runs in parallel — launch both, then wait for both
- If blocked at any phase, stop and ask the user — do not guess or skip
- Always update `TEST_REPORT.md` in Phase 7 regardless of whether new bugs were found

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
- **If blocked or a decision is needed:** stop immediately and ask the user — do not attempt workarounds or make assumptions

---

## How to Invoke an Agent

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

When building anything new, **ORCHESTRATOR** runs the full team in this order:

```
Phase 1 → product-manager      Input: feature request
                                Output: user stories + acceptance criteria

Phase 2 → architect            Input: user stories
                                Output: file structure plan + patterns decision

Phase 3 → frontend-specialist  Input: file structure plan         ──┐ (parallel)
       → backend-architect      Input: file structure plan         ──┘
                                Output (both): code written to disk

Phase 4 → security-auditor     Input: all new/modified files
       → bug-fixer              Input: audit findings              (sequential: audit first, then fix)
                                Output: Critical/High issues resolved

Phase 5 → testing-specialist   Input: all new/modified files
                                Output: unit + E2E tests passing

Phase 6 → code-reviewer        Input: all new/modified files
                                Output: review comments resolved

Phase 7 → orchestrator         Input: outputs of all phases
                                Output: final summary + TEST_REPORT.md updated
```

**Gate rule:** If Phase 4 finds any Critical severity issue, ORCHESTRATOR must halt the pipeline and fix it before Phase 5 starts.

To start: **"build the [module name] module"** or **"develop [feature]"**
