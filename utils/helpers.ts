import Papa from "papaparse";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  maxBatchDataLength,
  minBatchDataLength,
  options,
  supportedFormats,
} from "@/config";
import { MixerBatchTable } from "@/entities";

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
  return parseFloat(String(input).trim());
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
          current: getNumericValue(record[17 - dataOffset]),
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
