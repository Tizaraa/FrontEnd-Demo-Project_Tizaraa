// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function runs on every request
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value; // Get the auth token from cookies
  const path = request.nextUrl.pathname; // Get the current URL path

  const isAuthPath = ["/login", "/signup"].includes(path); // Public paths like login and signup
  const isProtectedPath = ["/profile", "/address", "/orders", "/wish-list"].includes(path); // Protected paths

  // If the user is trying to access protected paths without a token, redirect to login
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the user is authenticated and tries to access login or signup, redirect to the homepage
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next(); // Continue the request if everything is fine
}

// Configuring the middleware to match specific routes
export const config = {
  matcher: ["/profile", "/address", "/orders", "/wish-list", "/login", "/signup"], // Routes where this middleware applies
};
