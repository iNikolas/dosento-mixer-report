import { NextResponse } from "next/server";
import { auth as firebaseAuth } from "firebase-admin";
import { cookies, headers } from "next/headers";

import { authCookieKey, cookieExpirationDays, userCookieKey } from "@/config";
import { getAdminApp } from "@/firebase/admin-app";
import { getUserFromSessionCookie } from "@/utils";

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

export async function POST() {
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

      cookies().set({
        name: authCookieKey,
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      });

      const user = await getUserFromSessionCookie(sessionCookie);

      cookies().set({
        name: userCookieKey,
        value: JSON.stringify(user),
        maxAge: expiresIn,
        secure: true,
      });
    }
  }

  return NextResponse.json({}, { status: 200 });
}

export function DELETE() {
  const options = {
    value: "",
    maxAge: -1,
  };

  cookies().set({ name: authCookieKey, ...options });
  cookies().set({ name: userCookieKey, ...options });

  return NextResponse.json({}, { status: 200 });
}
