import React from "react";

import { supportedFormats } from "@/config";

import { isValidFileType } from "../utils";

export function FileInput() {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !isValidFileType(file)) {
      return;
    }

    console.log(file.name);
  };
  return (
    <label htmlFor="fileInput" className="absolute inset-0">
      <span className="sr-only">Оберіть файли</span>
      <input
        onChange={handleFileChange}
        type="file"
        accept={supportedFormats.map((format) => `.${format}`).join(", ")}
        className="absolute inset-0 opacity-0 w-full h-full z-20 cursor-pointer"
        id="fileInput"
      />
    </label>
  );
}
