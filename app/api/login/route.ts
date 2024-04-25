import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { auth as firebaseAuth } from "firebase-admin";
import { getAdminApp } from "@/firebase/admin-app";

import { authCookieKey, cookieExpirationDays, userCookieKey } from "@/config";
import {
  deleteSessionCookies,
  getUserFromSessionCookie,
  isAuthorizedUser,
} from "@/utils";

export async function GET() {
  const auth = firebaseAuth(getAdminApp());
  const session = cookies().get(authCookieKey)?.value ?? "";

  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(session, true);

    if (!decodedClaims) {
      throw new Error("Помилка перевірки сеансу користувача");
    }

    const isAuthorized = await isAuthorizedUser(decodedClaims.uid);

    return NextResponse.json(
      { isLogged: true },
      { status: isAuthorized ? 200 : 401 },
    );
  } catch (e) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }
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

    return NextResponse.json({}, { status: 200 });
  }
}

export async function DELETE() {
  await deleteSessionCookies();

  return NextResponse.json({}, { status: 200 });
}
