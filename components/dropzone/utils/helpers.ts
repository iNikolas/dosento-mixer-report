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

export function isValidFileType(file?: File) {
  const fileExtension = parseFileExtension(file?.name);

  if (!fileExtension) {
    return false;
  }

  return supportedFormats.includes(fileExtension);
}
