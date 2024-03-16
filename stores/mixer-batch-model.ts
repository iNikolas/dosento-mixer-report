import { createStore, createEvent, sample, combine } from "effector";
import { createGate } from "effector-react";
import { persist } from "effector-storage/local";

import { MixerBatch, MixerBatchTable } from "@/entities";
import { parseFileFx, showErrorMessageFx } from "@/effects";
import { getReportTotal } from "@/utils";

export const Gate = createGate();

export const fileChanged = createEvent<File | undefined>();

const $mixerBatch = createStore<MixerBatchTable>({});

export const $report = createStore<MixerBatch[]>([]);

export const $total = $report.map(getReportTotal);

export const $loading = combine([parseFileFx.pending], (loading) =>
  loading.some(Boolean),
);

persist({
  store: $mixerBatch,
  key: "mixer-batch",
  pickup: Gate.open,
});

sample({
  clock: $mixerBatch,
  fn: (record) => {
    return Object.values(record);
  },
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
