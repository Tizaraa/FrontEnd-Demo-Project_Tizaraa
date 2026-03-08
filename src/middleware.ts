import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import authService from "services/authService";

export function middleware(request: NextRequest) {
// this method gives you a cookie
 const isLoggedIn = authService.isAuthenticated();

 const path = request.nextUrl.pathname;

 // Public paths like login and signup
 const isAuthPath = ["/login", "/signup"].includes(path); 
 
 // Protected paths
 const isProtectedPath = ["/profile", "/orders", "/checkout", "/payment", "/wish-list", "/address", "/payment-methods"].includes(path); 

 // If the user is trying to access protected paths without being logged in, redirect to login
 if (isProtectedPath && !isLoggedIn) {
   return NextResponse.redirect(new URL("/login", request.url));
 }

 // If the user is authenticated and tries to access login or signup, redirect to home
 if (isAuthPath && isLoggedIn) {
   return NextResponse.redirect(new URL("/", request.url));
 }

 // Continue the request if everything is fine
 return NextResponse.next();
}

// Configuring the middleware to match specific routes
export const config = {
  // Routes where this middleware applies
 matcher: [
  "/profile",
  "/address",
  "/orders",
  "/checkout",
  "/payment",
  "/wish-list",
  "/login",
  "/signup",
  "/payment-methods",
 ], 
};

