// Server-only: calls the customer API from Next.js server code (pages,
// generateMetadata). Importing next/headers makes a client import fail at build
// time, so SSR_API_KEY can never reach the browser bundle.
import { cache } from "react";
import { headers } from "next/headers";
import ApiBaseUrl from "api/ApiBaseUrl";

export type ApiResult<T> =
  | { status: "ok"; data: T }
  | { status: "not_found" }
  | { status: "rate_limited"; retryAfter: number }
  | { status: "error" };

const TIMEOUT_MS = 8000;

/**
 * The visitor's IP as seen by the proxy in front of this server.
 *
 * x-real-ip is set by Traefik from the TCP peer, so a client cannot fake it.
 * Fallback: the last X-Forwarded-For entry, which the nearest proxy appended.
 * Earlier entries can be client-supplied. The API checks the value again and
 * caps all SSR traffic globally, so a bad value cannot widen anyone's budget.
 */
function visitorIp(): string | null {
  try {
    const h = headers();
    const realIp = h.get("x-real-ip")?.trim();
    if (realIp) return realIp;

    const forwarded = h.get("x-forwarded-for");
    if (!forwarded) return null;
    const parts = forwarded.split(",").map((p) => p.trim()).filter(Boolean);
    return parts.length ? parts[parts.length - 1] : null;
  } catch {
    // Outside a request scope (e.g. build time): no visitor to name.
    return null;
  }
}

/**
 * Headers that let the API rate-limit an SSR call as the visitor rather than as
 * this server, which renders for everyone from one IP. Without SSR_API_KEY
 * nothing extra is sent and the API treats the call like any other client.
 */
function ssrHeaders(): Record<string, string> {
  const key = process.env.SSR_API_KEY;
  if (!key) return {};

  const out: Record<string, string> = { "X-SSR-Key": key };
  const ip = visitorIp();
  if (ip) out["X-Client-IP"] = ip;
  return out;
}

/** Slugs arrive URL-encoded and may hold "#", "?", "'" or bad % sequences. */
export function encodeSlug(slug: string): string {
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    // Malformed escape: use it as typed.
  }
  return encodeURIComponent(decoded);
}

/** GET from the customer API (path relative to /api/v1/), never cached. */
export async function customerApiGet<T>(path: string): Promise<ApiResult<T>> {
  try {
    const response = await fetch(`${ApiBaseUrl.localApiUrl}${path}`, {
      cache: "no-store",
      headers: { Accept: "application/json", ...ssrHeaders() },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (response.status === 404) return { status: "not_found" };

    if (response.status === 429) {
      const body = await response.json().catch(() => null);
      const retryAfter = Number(body?.retry_after ?? response.headers.get("Retry-After"));
      return { status: "rate_limited", retryAfter: Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : 60 };
    }

    if (!response.ok) {
      console.error(`Customer API ${path} failed: ${response.status}`);
      return { status: "error" };
    }

    return { status: "ok", data: (await response.json()) as T };
  } catch (error) {
    console.error(`Customer API ${path} unreachable:`, error);
    return { status: "error" };
  }
}

export interface ProductDetailResponse {
  productsingledetails?: {
    product_id?: number;
    product_name?: string;
    short_description?: string;
    product_thumbnail?: string;
    [key: string]: unknown;
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string;
    url?: string;
    image?: string;
    site_name?: string;
  };
  [key: string]: unknown;
}

/**
 * Product detail for a page render. cache() makes generateMetadata and the
 * page body share one API call per request instead of two.
 * A 200 without a product id counts as not found, as before.
 */
export const fetchProductDetail = cache(
  async (slug: string): Promise<ApiResult<ProductDetailResponse>> => {
    const result = await customerApiGet<ProductDetailResponse>(
      `frontend/product/details/${encodeSlug(slug)}`
    );

    if (result.status === "ok" && !result.data?.productsingledetails?.product_id) {
      return { status: "not_found" };
    }

    return result;
  }
);
