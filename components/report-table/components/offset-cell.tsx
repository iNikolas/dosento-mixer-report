import React from "react";

import { cn, formatNumericRow } from "@/utils";
import { FeederOffset } from "@/entities";

export function OffsetCell({ error, warning, offset }: FeederOffset) {
  return (
    <td className={cn(warning && "text-warning", error && "text-error")}>
      {formatNumericRow(offset)}
    </td>
  );
}
