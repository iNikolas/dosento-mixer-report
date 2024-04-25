"use server";

import { cookies } from "next/headers";
import { auth as firebaseAuth, firestore } from "firebase-admin";
import { getAdminApp } from "@/firebase/admin-app";

import { User } from "@/entities";
import {
  adminCollectionName,
  authCookies,
  authorizedUsersDocumentName,
} from "@/config";

async function getSessionData(sessionCookie: string) {
  const auth = firebaseAuth(getAdminApp());
  const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

  if (!decodedClaims) {
    return null;
  }

  const user = await auth.getUser(decodedClaims.uid);

  return user;
}

export async function getUserFromSessionCookie(
  sessionCookie: string,
): Promise<User | null> {
  const data = await getSessionData(sessionCookie);

  if (!data) {
    return null;
  }

  const { uid, email, emailVerified, displayName } = data;

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

export async function deleteSessionCookies() {
  const options = {
    value: "",
    maxAge: -1,
  };

  authCookies.forEach((name) => cookies().set({ name, ...options }));

  return Promise.resolve();
}
