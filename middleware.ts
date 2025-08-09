import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Protect authenticated areas (dashboard) with unified secret across API and middleware
export async function middleware(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET || process.env.NEXTAUTH_USS_SECRET;
  const token = await getToken({ req, secret });
  const isAuth = !!token;
  const { pathname } = req.nextUrl;

  // If already authenticated and trying to access /login, redirect to /dashboard
  if (pathname.startsWith("/login") && isAuth) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Guard dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!isAuth) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
