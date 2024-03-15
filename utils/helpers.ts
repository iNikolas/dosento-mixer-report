import Papa from "papaparse";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { supportedFormats } from "@/config";

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

export function parseFile(file?: File): Promise<unknown> {
  return new Promise((resolve, reject) => {
    if (!file || !isValidFileType(file)) {
      reject(new Error("File type is invalid"));
      return;
    }

    Papa.parse(file, {
      delimiter: ",",
      complete: (result) => resolve(result),
      error: (error) => reject(error),
    });
  });
}
