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
      const caco3Actual = acc.caco3.actual + record.caco3.actual;
      const feeder3Actual = acc.feeder3.actual + record.feeder3.actual;
      const feeder4Actual = acc.feeder4.actual + record.feeder4.actual;
      const oilDopActual = acc.oilDop.actual + record.oilDop.actual;
      const oilDoaActual = acc.oilDoa.actual + record.oilDoa.actual;
      const nbrSet = acc.nbr.set + record.nbr.set;

      return {
        pvc: {
          set: acc.pvc.set + record.pvc.set,
          actual: pvcActual,
        },
        caco3: {
          set: acc.caco3.set + record.caco3.set,
          actual: caco3Actual,
        },
        feeder3: {
          set: acc.feeder3.set + record.feeder3.set,
          actual: feeder3Actual,
        },
        feeder4: {
          set: acc.feeder4.set + record.feeder4.set,
          actual: feeder4Actual,
        },
        oilDop: {
          set: acc.oilDop.set + record.oilDop.set,
          actual: oilDopActual,
        },
        oilDoa: {
          set: acc.oilDoa.set + record.oilDoa.set,
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
    },
  );
}

export function formatWeight(weightInKg: number) {
  if (weightInKg >= 1000) {
    const weightInTons = (weightInKg / 1000).toFixed(3);
    return `${weightInTons.replace(".", ",")} т`;
  }
  const weightInKilograms = weightInKg.toFixed(2);
  return `${weightInKilograms.replace(".", ",")} кг`;
}

export function getFilteredReport({
  mixerBatch,
  filter,
}: {
  mixerBatch: MixerBatchTable;
  filter: Filter;
}) {
  const search = filter.search.trim();
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

  if (search) {
    return report.filter((batch) =>
      batch.recipe.toLowerCase().includes(search.toLowerCase()),
    );
  }

  return report;
}
