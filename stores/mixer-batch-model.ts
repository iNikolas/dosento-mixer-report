import { createStore, createEvent, sample, combine } from "effector";
import { createGate } from "effector-react";
import { persist } from "effector-storage/local";

import { MixerBatchTable, MixerReport } from "@/entities";
import {
  parseFileFx,
  readFromeRemoteStorageFx,
  showErrorMessageFx,
  showSuccessfullDataDownloadMessage,
  showSuccessfullDataUploadMessage,
  updateRemoteStorageFx,
} from "@/effects";
import {
  getFilteredReport,
  getLatestBatchRecord,
  getReportTotal,
} from "@/utils";

import { $filter } from "./report-filters-model";

export const Gate = createGate();

export const fileChanged = createEvent<File | undefined>();
export const readDatabaseRequested = createEvent();
export const readLocalStorageeRequested = createEvent();

const $mixerBatch = createStore<MixerBatchTable>({});
export const $report = createStore<MixerReport[]>([]);
export const $total = $report.map(getReportTotal);
export const $loading = combine(
  [parseFileFx.pending, readFromeRemoteStorageFx.pending],
  (loading) => loading.some(Boolean),
);
export const $needRedirect = createStore(false);

persist({
  store: $mixerBatch,
  key: "mixer-batch",
  pickup: Gate.open,
});

sample({ clock: Gate.open, fn: () => false, target: $needRedirect });

sample({
  clock: [parseFileFx.done, readFromeRemoteStorageFx.done],
  fn: () => true,
  target: $needRedirect,
});

sample({
  clock: [$mixerBatch, $filter],
  source: { mixerBatch: $mixerBatch, filter: $filter },
  fn: getFilteredReport,
  target: $report,
});

sample({ clock: fileChanged, target: parseFileFx });

sample({
  clock: parseFileFx.doneData,
  source: $mixerBatch,
  fn: (store, parsedData) => ({ ...store, ...parsedData }),
  target: [$mixerBatch, updateRemoteStorageFx],
});

sample({
  clock: readFromeRemoteStorageFx.doneData,
  source: $mixerBatch,
  fn: (store, parsedData) => ({ ...store, ...parsedData }),
  target: $mixerBatch,
});

sample({ clock: parseFileFx.failData, target: showErrorMessageFx });

sample({ clock: updateRemoteStorageFx.failData, target: showErrorMessageFx });

sample({
  clock: updateRemoteStorageFx.doneData,
  filter: (reports) => Boolean(reports.length),
  fn: (reports) => reports.length,
  target: showSuccessfullDataUploadMessage,
});

sample({
  clock: readDatabaseRequested,
  source: $mixerBatch,
  fn: getLatestBatchRecord,
  target: readFromeRemoteStorageFx,
});

sample({
  clock: readFromeRemoteStorageFx.failData,
  target: showErrorMessageFx,
});

sample({
  clock: readFromeRemoteStorageFx.doneData,
  filter: (data) => Boolean(Object.keys(data).length),
  fn: (data) => Object.keys(data).length,
  target: showSuccessfullDataDownloadMessage,
});
