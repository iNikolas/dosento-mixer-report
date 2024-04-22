"use server";

import { auth as firebaseAuth } from "firebase-admin";

import { getAdminApp } from "@/firebase/admin-app";
import { User } from "@/entities";

export async function getUserFromSessionCookie(
  sessionCookie: string,
): Promise<User | null> {
  const auth = firebaseAuth(getAdminApp());
  const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

  if (!decodedClaims) {
    return null;
  }

  const { uid, email, emailVerified, displayName } = await auth.getUser(
    decodedClaims.uid,
  );

  if (!email || !displayName) {
    throw new Error("Дані користувача неповні");
  }

  return { uid, email, emailVerified, displayName };
}
