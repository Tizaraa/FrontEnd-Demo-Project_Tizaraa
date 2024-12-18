import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import authService from "services/authService"; // Ensure this service works server-side

// This function runs on every request
export function middleware(request: NextRequest) {
  // Simulate the check for authentication
  const isLoggedIn = authService.isAuthenticated(); // Adjust the method to work server-side

  const path = request.nextUrl.pathname; // Get the current URL path

  const isAuthPath = ["/login", "/signup"].includes(path); // Public paths like login and signup
  const isProtectedPath = ["/profile", "/orders", "/checkout", "/payment", "/wish-list", "/address", "/payment-methods"].includes(path); // Protected paths

  // If the user is trying to access protected paths without being logged in, redirect to login
  if (isProtectedPath && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the user is authenticated and tries to access login or signup, redirect to home
  if (isAuthPath && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next(); // Continue the request if everything is fine
}

// Configuring the middleware to match specific routes
export const config = {
  matcher: ["/profile", "/address", "/orders", "/checkout", "/payment", "/wish-list", "/login", "/signup", "/payment-methods"], // Routes where this middleware applies
};

