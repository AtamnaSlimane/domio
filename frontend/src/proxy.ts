import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isAuthenticated = token && token !== "undefined";

  // If user is authenticated and tries to access auth pages, redirect to dashboard
  if (isAuthenticated) {
    if (pathname === "/sign-up" || pathname === "/login") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // If user is NOT authenticated and tries to access protected pages, redirect to login
  if (!isAuthenticated) {
    if (pathname === "/dashboard") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/sign-up", "/login"],
};