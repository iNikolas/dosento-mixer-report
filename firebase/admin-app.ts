import { initializeApp, getApps, cert } from "firebase-admin/app";
import { serviceAccount } from "@/config";

export const firebaseAdminApp =
  getApps().length === 0
    ? initializeApp({ credential: cert(serviceAccount) })
    : getApps()[0];
