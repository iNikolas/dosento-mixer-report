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
  const isAuthRoute = authRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL(links.login, request.url));
  }

  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL(links.uploadData, request.url));
  }

  if (session && isProtectedRoute) {
    try {
      console.log(`${request.nextUrl.origin}${api.login}`);
      const responseAPI = await fetch(`${request.nextUrl.origin}${api.login}`, {
        headers: {
          Cookie: `session=${session.value}`,
        },
      });

      console.log(responseAPI);

      if (!responseAPI.ok) {
        await fetch(api.login, { method: "DELETE" });
        return NextResponse.redirect(new URL(links.login, request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL(links.login, request.url));
    }
  }

  return NextResponse.next();
}
