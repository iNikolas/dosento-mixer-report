import { MixerBatch } from "@/entities";

function isMixerBatch(item: unknown): item is MixerBatch {
  return typeof item === "object" && item !== null;
}

export function assertMixerBatchArray(
  data: unknown,
): asserts data is MixerBatch[] {
  if (!Array.isArray(data) || !data.every(isMixerBatch)) {
    throw new Error(
      "Неправильний формат даних. Очікувався масив об'єктів типу MixerBatch.",
    );
  }
}
