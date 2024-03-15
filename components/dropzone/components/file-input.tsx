import React from "react";

import { Lining } from "./lining";

export function FileInput() {
  return (
    <Lining
      animate={{ scale: 1 }}
      initial={{ scale: 0.7 }}
      className="bg-base-100 p-8 sm:p-16 z-10"
    >
      <div className="h-full flex flex-col justify-center items-center border-2 border-dashed border-neutral-content p-4 rounded-md">
        <p className="text-center text-neutral-content">
          Клацніть або перетягніть файли сюди
        </p>
        <p className="text-center text-gray-600">CSV</p>
        <label htmlFor="fileInput" className="absolute inset-0 cursor-pointer">
          <span className="sr-only">Оберіть файли</span>
          <input
            type="file"
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            id="fileInput"
          />
        </label>
      </div>
    </Lining>
  );
}
