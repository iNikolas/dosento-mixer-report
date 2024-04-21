import { auth as firebaseAuth } from "firebase-admin";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { authCookieKey, cookieExpirationDays, links } from "@/config";
import { getAdminApp } from "@/firebase/admin-app";

export async function GET() {
  const auth = firebaseAuth(getAdminApp());
  const session = cookies().get(authCookieKey)?.value ?? "";

  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  const decodedClaims = await auth.verifySessionCookie(session, true);

  if (!decodedClaims) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  return NextResponse.json({ isLogged: true }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const auth = firebaseAuth(getAdminApp());
  const authorization = headers().get("Authorization");
  if (authorization?.startsWith("Bearer ")) {
    const idToken = authorization.split("Bearer ")[1];
    const decodedToken = await auth.verifyIdToken(idToken);

    if (decodedToken) {
      const expiresIn = 60 * 60 * 24 * cookieExpirationDays * 1000;
      const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn,
      });
      const options = {
        name: authCookieKey,
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      };

      cookies().set(options);
    }
  }

  return NextResponse.redirect(new URL(links.report, request.url));
}

export function DELETE(request: NextRequest) {
  const options = {
    name: authCookieKey,
    value: "",
    maxAge: -1,
  };

  cookies().set(options);
  return NextResponse.redirect(new URL(links.login, request.url));
}
