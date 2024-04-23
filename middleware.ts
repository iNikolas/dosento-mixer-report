import { NextRequest, NextResponse } from "next/server";
import {
  api,
  authCookieKey,
  authRoutes,
  links,
  protectedRoutes,
} from "@/config";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get(authCookieKey);

  const { pathname } = request.nextUrl;

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isNotAuthorizedRoute = pathname.startsWith(links.notAuthorized);
  const isReportRoute = pathname.startsWith(links.report);

  if ((!session && isNotAuthorizedRoute) || (session && isAuthRoute)) {
    return NextResponse.redirect(new URL(links.uploadData, request.url));
  }

  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL(links.login, request.url));
  }

  if (session && (isProtectedRoute || isNotAuthorizedRoute)) {
    try {
      const responseAPI = await fetch(request.nextUrl.origin + api.login, {
        headers: {
          Cookie: `session=${session.value}`,
        },
      });

      if (!responseAPI.ok && isReportRoute) {
        return NextResponse.redirect(new URL(links.notAuthorized, request.url));
      }

      if (responseAPI.ok && isNotAuthorizedRoute) {
        return NextResponse.redirect(new URL(links.report, request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL(links.login, request.url));
    }
  }

  return NextResponse.next();
}
