import * as admin from "firebase-admin";
import { getApps, cert } from "firebase-admin/app";

import { serviceAccount } from "@/config";

export function getAdminApp() {
  return getApps().length === 0
    ? admin.initializeApp({ credential: cert(serviceAccount) })
    : getApps()[0];
}
