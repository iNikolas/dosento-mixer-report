import React from "react";
import { useUnit } from "effector-react";

import { supportedFormats } from "@/config";
import { mixerBatchModel } from "@/stores";

export function FileInput() {
  const loading = useUnit(mixerBatchModel.$loading);
  const fileChanged = useUnit(mixerBatchModel.fileChanged);

  return (
    <label htmlFor="fileInput" className="absolute inset-0">
      <span className="sr-only">Оберіть файли</span>
      <input
        disabled={loading}
        onChange={(e) => fileChanged(e.target.files?.[0])}
        type="file"
        accept={supportedFormats.map((format) => `.${format}`).join(", ")}
        className="absolute inset-0 opacity-0 w-full h-full z-20 cursor-pointer"
        id="fileInput"
      />
    </label>
  );
}
