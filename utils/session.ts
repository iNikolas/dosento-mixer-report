"use server";

import { auth as firebaseAuth, firestore } from "firebase-admin";

import { getAdminApp } from "@/firebase/admin-app";
import { User } from "@/entities";
import { adminCollectionName, authorizedUsersDocumentName } from "@/config";

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

export async function isAuthorizedUser(uid: string): Promise<boolean> {
  try {
    const db = firestore(getAdminApp());

    const authorizedUsersRef = db
      .collection(adminCollectionName)
      .doc(authorizedUsersDocumentName);

    const querySnapshot = await authorizedUsersRef.get();

    if (!querySnapshot.exists) {
      return false;
    }

    return Boolean(querySnapshot.data()?.[uid]);
  } catch (_) {
    throw new Error("Помилка перевірки авторизації");
  }
}
