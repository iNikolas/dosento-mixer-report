import {
  getFirestore,
  collection,
  query,
  getDocs,
  orderBy,
  limit,
  writeBatch,
  doc,
  where,
  QueryConstraint,
} from "firebase/firestore";

import { firebaseApp } from "@/firebase";
import { MixerBatch, MixerBatchTable } from "@/entities";
import { reportsCollectionName } from "@/config";

import { assertMixerBatchArray } from "./utils";

const firestore = getFirestore(firebaseApp);

async function getLatestTimestamp(): Promise<number | null> {
  const q = query(
    collection(firestore, reportsCollectionName),
    orderBy("timestamp", "desc"),
    limit(1),
  );

  const querySnapshot = await getDocs(q);

  const latestBatch = querySnapshot.docs[0]?.data();

  if (latestBatch?.timestamp && typeof latestBatch.timestamp === "number") {
    return latestBatch.timestamp;
  }

  return null;
}

export async function updateReportsStorage(
  data: MixerBatchTable,
): Promise<MixerBatch[]> {
  const reports = Object.values(data);
  const latestRemoteTimestamp = await getLatestTimestamp();

  const filteredReports = latestRemoteTimestamp
    ? reports.filter((batch) => batch.timestamp > latestRemoteTimestamp)
    : reports;

  if (!filteredReports.length) {
    return [];
  }

  const batch = writeBatch(firestore);

  filteredReports.forEach((report) => {
    const reportsRef = collection(firestore, reportsCollectionName);
    batch.set(doc(reportsRef, String(report.timestamp)), report);
  });

  await batch.commit();

  return filteredReports;
}

export async function readFromReportsStorage(
  latestTimestamp: number | null,
): Promise<MixerBatchTable> {
  const queryConstraints: QueryConstraint[] = [];

  if (latestTimestamp) {
    queryConstraints.push(where("timestamp", ">", latestTimestamp));
  }

  const querySnapshot = await getDocs(
    query(collection(firestore, reportsCollectionName), ...queryConstraints),
  );

  const response = querySnapshot.docs.map((record) => record.data());
  assertMixerBatchArray(response);

  if (!response.length) {
    throw new Error("Віддалене сховище не містить жодних нових даних.");
  }

  return response.reduce<MixerBatchTable>(
    (acc, batch) => ({ ...acc, [String(batch.timestamp)]: { ...batch } }),
    {},
  );
}
