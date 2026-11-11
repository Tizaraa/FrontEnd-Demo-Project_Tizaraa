import axios from "@lib/axiosClient";
import ApiBaseUrl from "api/ApiBaseUrl";

/**
 * The fields of the login / profile user (customer-api UserResource) that
 * decide where a corporate employee lands after signing in.
 */
export interface CorporateLoginUser {
  type?: string | null;
  employee_status?: string | null;
  shop_slug?: string | null;
}

/**
 * Where a user should land right after login.
 *
 * An ACTIVE corporate employee always goes straight into their own corporate
 * shop (`/shops/{shop_slug}`) — this wins over any remembered page. Pending,
 * suspended or inactive employees and normal customers get `null`, so the
 * caller keeps its usual redirect (remembered page or home).
 */
export function corporateHomeFor(user: CorporateLoginUser | null | undefined): string | null {
  if (!user) return null;
  const isEmployee = user.type === "employee";
  const isActive = user.employee_status === "active";
  const slug = (user.shop_slug ?? "").trim();
  if (!isEmployee || !isActive || slug === "") return null;
  return `/shops/${encodeURIComponent(slug)}`;
}

/**
 * Path to open after a successful login: the corporate shop for an active
 * employee, otherwise the page remembered before login (e.g. add-to-cart),
 * otherwise home. Always clears the remembered page.
 */
export function postLoginPath(user: CorporateLoginUser | null | undefined): string {
  const remembered = typeof window !== "undefined" ? sessionStorage.getItem("redirectAfterLogin") : null;
  if (typeof window !== "undefined") sessionStorage.removeItem("redirectAfterLogin");
  return corporateHomeFor(user) ?? remembered ?? "/";
}

/**
 * Fetch the full profile for a fresh token. Used where the login response does
 * not carry the corporate fields (Google sign-in). Returns null on failure so
 * login still completes with the normal redirect.
 */
export async function fetchProfileUser<T extends CorporateLoginUser = CorporateLoginUser>(token: string): Promise<T | null> {
  try {
    const res = await axios.get(`${ApiBaseUrl.localApiUrl}user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return (res.data?.profile as T) ?? null;
  } catch {
    return null;
  }
}
