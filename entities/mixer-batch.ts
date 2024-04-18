export interface FeederRecord {
  set: number;
  actual: number;
}

export interface FeederOffset {
  offset: number;
  warning: boolean;
  error: boolean;
}

type ComputedFeederRecord = FeederRecord & FeederOffset;

interface BatchMetadata {
  timestamp: number;
  recipe: string;
  current: number;
  total: number;
}

interface BatchDosage {
  pvc: FeederRecord;
  caco3: FeederRecord;
  feeder3: FeederRecord;
  feeder4: FeederRecord;
  oilDop: FeederRecord;
  oilDoa: FeederRecord;
  nbr: {
    set: number;
  };
}

interface BatchReport {
  pvc: ComputedFeederRecord;
  caco3: ComputedFeederRecord;
  feeder3: ComputedFeederRecord;
  feeder4: ComputedFeederRecord;
  oilDop: ComputedFeederRecord;
  oilDoa: ComputedFeederRecord;
  nbr: {
    set: number;
  };
}

export type MixerBatch = BatchDosage & BatchMetadata;
export type MixerReport = BatchReport & BatchMetadata;

interface MixerTotalizer {
  total: number;
  targetTotal: number;
}

export type MixerBatchTotal = Omit<
  MixerBatch,
  "timestamp" | "recipe" | "current" | "total"
> &
  MixerTotalizer;

export type MixerBatchTable = Record<string, MixerBatch>;
