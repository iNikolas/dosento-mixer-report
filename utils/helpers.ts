import Papa from "papaparse";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  maxBatchDataLength,
  minBatchDataLength,
  options,
  sortingColumns,
  sortingType,
  supportedFormats,
} from "@/config";
import {
  Filter,
  MixerBatch,
  MixerBatchTable,
  MixerBatchTotal,
} from "@/entities";

function parseFileExtension(name?: string): string | null {
  if (!name) {
    return null;
  }

  const parts = name.split(".");

  if (parts.length === 1) {
    return null;
  }

  if (parts.length === 2 && parts[0] === "") {
    return null;
  }

  return parts.pop() ?? null;
}

function isValidFileType(file?: File) {
  const fileExtension = parseFileExtension(file?.name);

  if (!fileExtension) {
    return false;
  }

  return supportedFormats.includes(fileExtension);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getTimestampFromString(dateString: string) {
  const [date, time] = dateString.split(",");
  const [month, day, year] = date.split("/");
  const [hour, minute, second] = time.split(":");

  const parsedDate = new Date(
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10),
    parseInt(hour, 10),
    parseInt(minute, 10),
    parseInt(second, 10),
  );

  return parsedDate.getTime();
}

function getNumericValue(input: unknown) {
  return Math.round(parseFloat(String(input).trim()) * 100) / 100;
}

function buildMixerBatch(list: unknown[]): MixerBatchTable {
  return list.reduce<MixerBatchTable>((acc, record) => {
    if (
      record instanceof Array &&
      record.length >= minBatchDataLength &&
      record.length <= maxBatchDataLength
    ) {
      const dataOffset = maxBatchDataLength - record.length;

      const timestamp = getTimestampFromString(
        `${String(record[1]).trim()}, ${String(record[2]).trim()}`,
      );

      const recipe = dataOffset > 0 ? "" : String(record[3]).trim();

      return {
        ...acc,
        [String(timestamp)]: {
          timestamp,
          recipe,
          pvc: {
            set: getNumericValue(record[4 - dataOffset]),
            actual: getNumericValue(record[5 - dataOffset]),
          },
          caco3: {
            set: getNumericValue(record[6 - dataOffset]),
            actual: getNumericValue(record[7 - dataOffset]),
          },
          feeder3: {
            set: getNumericValue(record[8 - dataOffset]),
            actual: getNumericValue(record[9 - dataOffset]),
          },
          feeder4: {
            set: getNumericValue(record[10 - dataOffset]),
            actual: getNumericValue(record[11 - dataOffset]),
          },
          oilDop: {
            set: getNumericValue(record[12 - dataOffset]),
            actual: getNumericValue(record[13 - dataOffset]),
          },
          oilDoa: {
            set: getNumericValue(record[14 - dataOffset]),
            actual: getNumericValue(record[15 - dataOffset]),
          },
          nbr: {
            set: getNumericValue(record[16 - dataOffset]),
          },
          current: getNumericValue(record[17 - dataOffset]) + 1,
          total: getNumericValue(record[18 - dataOffset]),
        },
      };
    }

    return acc;
  }, {});
}

export function parseFile(file?: File): Promise<MixerBatchTable> {
  return new Promise((resolve, reject) => {
    if (!file || !isValidFileType(file)) {
      reject(new Error("Тип файлу недійсний"));
      return;
    }

    const handleComplete = (data: unknown[]) => {
      const batchReport = buildMixerBatch(data);

      if (!Object.keys(batchReport).length) {
        reject(new Error("У файлі немає дійсних даних"));
        return;
      }

      resolve(buildMixerBatch(data));
    };

    Papa.parse(file, {
      ...options,
      complete: (result) => handleComplete(result.data.slice(1)),
      error: (error) => reject(error),
    });
  });
}

export function getReportTotal(store: MixerBatch[]) {
  return store.reduce<MixerBatchTotal>(
    (acc, record) => {
      const pvcActual = acc.pvc.actual + record.pvc.actual;
      const pvcSet = acc.pvc.set + record.pvc.set;

      const caco3Actual = acc.caco3.actual + record.caco3.actual;
      const caco3Set = acc.caco3.set + record.caco3.set;

      const feeder3Actual = acc.feeder3.actual + record.feeder3.actual;
      const feeder3Set = acc.feeder3.set + record.feeder3.set;

      const feeder4Actual = acc.feeder4.actual + record.feeder4.actual;
      const feeder4Set = acc.feeder4.set + record.feeder4.set;

      const oilDopActual = acc.oilDop.actual + record.oilDop.actual;
      const oilDopSet = acc.oilDop.set + record.oilDop.set;

      const oilDoaActual = acc.oilDoa.actual + record.oilDoa.actual;
      const oilDoaSet = acc.oilDoa.set + record.oilDoa.set;

      const nbrSet = acc.nbr.set + record.nbr.set;

      return {
        pvc: {
          set: pvcSet,
          actual: pvcActual,
        },
        caco3: {
          set: caco3Set,
          actual: caco3Actual,
        },
        feeder3: {
          set: feeder3Set,
          actual: feeder3Actual,
        },
        feeder4: {
          set: feeder4Set,
          actual: feeder4Actual,
        },
        oilDop: {
          set: oilDopSet,
          actual: oilDopActual,
        },
        oilDoa: {
          set: oilDoaSet,
          actual: oilDoaActual,
        },
        nbr: {
          set: nbrSet,
        },
        total:
          acc.total +
          pvcActual +
          caco3Actual +
          feeder3Actual +
          feeder4Actual +
          oilDopActual +
          oilDoaActual +
          nbrSet,
        targetTotal:
          acc.targetTotal +
          pvcSet +
          caco3Set +
          feeder3Set +
          feeder4Set +
          oilDopSet +
          oilDoaSet +
          nbrSet,
      };
    },
    {
      pvc: {
        set: 0,
        actual: 0,
      },
      caco3: {
        set: 0,
        actual: 0,
      },
      feeder3: {
        set: 0,
        actual: 0,
      },
      feeder4: {
        set: 0,
        actual: 0,
      },
      oilDop: {
        set: 0,
        actual: 0,
      },
      oilDoa: {
        set: 0,
        actual: 0,
      },
      nbr: {
        set: 0,
      },
      total: 0,
      targetTotal: 0,
    },
  );
}

export function formatWeight(weightInKg: number) {
  if (weightInKg >= 1000) {
    const weightInTons = (weightInKg / 1000).toLocaleString("uk-UA", {
      maximumFractionDigits: 3,
    });
    return `${weightInTons} т`;
  }
  const weightInKilograms = weightInKg.toLocaleString("uk-UA", {
    maximumFractionDigits: 2,
  });
  return `${weightInKilograms} кг`;
}

export function formatNumericRow(value: number) {
  return value.toLocaleString("uk-UA", {
    maximumFractionDigits: 2,
  });
}

export function getFilteredReport({
  mixerBatch,
  filter,
}: {
  mixerBatch: MixerBatchTable;
  filter: Filter;
}) {
  const search = filter.search.trim();
  const { startTimestamp, endTimestamp } = filter;
  const report = Object.values(mixerBatch);

  if (filter.column === sortingColumns.recipe) {
    report.sort(({ recipe: a }, { recipe: b }) =>
      filter.type === sortingType.asc ? a.localeCompare(b) : b.localeCompare(a),
    );
  }

  if (filter.column === sortingColumns.timestamp) {
    report.sort(({ timestamp: a }, { timestamp: b }) =>
      filter.type === sortingType.asc ? a - b : b - a,
    );
  }

  if (search || (startTimestamp ?? endTimestamp)) {
    return report.filter((batch) => {
      if (
        search &&
        !batch.recipe.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }

      if (startTimestamp && batch.timestamp < startTimestamp) {
        return false;
      }

      if (endTimestamp && batch.timestamp > endTimestamp) {
        return false;
      }

      return true;
    });
  }

  return report;
}

export function getLatestBatchRecord(mixerbatch: MixerBatchTable) {
  return Object.values(mixerbatch).reduce<number | null>(
    (max, { timestamp }) => {
      if (!max) {
        return timestamp;
      }

      return timestamp > max ? timestamp : max;
    },
    null,
  );
}
