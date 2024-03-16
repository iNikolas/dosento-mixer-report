import React from "react";
import { useUnit } from "effector-react";

import { mixerBatchModel } from "@/stores";

export function Loader() {
  const loading = useUnit(mixerBatchModel.$loading);

  return loading ? (
    <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 loading loading-bars loading-lg z-10" />
  ) : null;
}
