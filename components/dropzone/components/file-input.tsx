import React from "react";

import { supportedFormats } from "@/config";
import { parseFile } from "@/utils";

export function FileInput() {
  return (
    <label htmlFor="fileInput" className="absolute inset-0">
      <span className="sr-only">Оберіть файли</span>
      <input
        onChange={(e) => {
          parseFile(e.target.files?.[0])
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
        }}
        type="file"
        accept={supportedFormats.map((format) => `.${format}`).join(", ")}
        className="absolute inset-0 opacity-0 w-full h-full z-20 cursor-pointer"
        id="fileInput"
      />
    </label>
  );
}
