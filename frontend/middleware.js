import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // allow login page
  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}


// Apply middleware only to these routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
