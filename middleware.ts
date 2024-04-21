import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { authCookieKey, authRoutes, links, protectedRoutes } from "@/config";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get(authCookieKey);
  const isAuthRoute = authRoutes.some((route) => request.url.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.url.startsWith(route),
  );

  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL(links.login, request.url));
  }

  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL(links.uploadData, request.url));
  }

  if (session && isProtectedRoute) {
    try {
      const responseAPI = await axios.get("/api/login", {
        headers: {
          Cookie: `session=${session?.value}`,
        },
      });

      if (responseAPI.status !== 200) {
        return NextResponse.redirect(new URL(links.login, request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL(links.login, request.url));
    }
  }

  return NextResponse.next();
}
