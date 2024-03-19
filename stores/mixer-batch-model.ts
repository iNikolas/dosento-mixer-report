import { createStore, createEvent, sample, combine } from "effector";
import { createGate } from "effector-react";
import { persist } from "effector-storage/local";

import { MixerBatch, MixerBatchTable } from "@/entities";
import { parseFileFx, showErrorMessageFx } from "@/effects";
import { getFilteredReport, getReportTotal } from "@/utils";

import { $filter } from "./report-filters-model";

export const Gate = createGate();

export const fileChanged = createEvent<File | undefined>();

const $mixerBatch = createStore<MixerBatchTable>({});
export const $report = createStore<MixerBatch[]>([]);
export const $total = $report.map(getReportTotal);
export const $loading = combine([parseFileFx.pending], (loading) =>
  loading.some(Boolean),
);
export const $needRedirect = createStore(false);

persist({
  store: $mixerBatch,
  key: "mixer-batch",
  pickup: Gate.open,
});

sample({ clock: Gate.open, fn: () => false, target: $needRedirect });

sample({ clock: parseFileFx.done, fn: () => true, target: $needRedirect });

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
  target: $mixerBatch,
});

sample({ clock: parseFileFx.failData, target: showErrorMessageFx });
