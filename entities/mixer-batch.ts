export interface MixerBatch {
  timestamp: number;
  recipe: string;
  pvc: {
    set: number;
    actual: number;
  };
  caco3: {
    set: number;
    actual: number;
  };
  feeder3: {
    set: number;
    actual: number;
  };
  feeder4: {
    set: number;
    actual: number;
  };
  oilDop: {
    set: number;
    actual: number;
  };
  oilDoa: {
    set: number;
    actual: number;
  };
  nbr: {
    set: number;
  };
  current: number;
  total: number;
}
