import { createStore, createEvent, sample, combine } from "effector";
import persist from "effector-localstorage";

import { MixerBatchTable } from "@/entities";
import { parseFileFx, showErrorMessageFx } from "@/effects";

export const fileChanged = createEvent<File | undefined>();

const $mixerBatch = createStore<MixerBatchTable>({});
export const $loading = combine([parseFileFx.pending], (loading) =>
  loading.some(Boolean),
);

persist({
  store: $mixerBatch,
  key: "mixer-batch",
});

sample({ clock: fileChanged, target: parseFileFx });

sample({
  clock: parseFileFx.doneData,
  source: $mixerBatch,
  fn: (store, parsedData) => ({ ...store, ...parsedData }),
  target: $mixerBatch,
});

sample({ clock: parseFileFx.failData, target: showErrorMessageFx });
