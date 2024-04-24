"use server";

import { firestore } from "firebase-admin";

import { getAdminApp } from "@/firebase/admin-app";
import { adminCollectionName, authorizedUsersDocumentName } from "@/config";

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
