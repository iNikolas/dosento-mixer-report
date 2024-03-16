import React from "react";
import { useUnit } from "effector-react";

import { mixerBatchModel } from "@/stores";
import { formatWeight } from "@/utils";

export function Footer() {
  const total = useUnit(mixerBatchModel.$total);
  return (
    <tfoot>
      <tr>
        <th>#</th>
        <td className="text-center" colSpan={2}>
          Підсумок рядка
        </td>
        <td>{formatWeight(total.pvc.set)}</td>
        <td>{formatWeight(total.pvc.actual)}</td>
        <td>{formatWeight(total.caco3.set)}</td>
        <td>{formatWeight(total.caco3.actual)}</td>
        <td>{formatWeight(total.feeder3.set)}</td>
        <td>{formatWeight(total.feeder3.actual)}</td>
        <td>{formatWeight(total.feeder4.set)}</td>
        <td>{formatWeight(total.feeder4.actual)}</td>
        <td>{formatWeight(total.oilDop.set)}</td>
        <td>{formatWeight(total.oilDop.actual)}</td>
        <td>{formatWeight(total.oilDoa.set)}</td>
        <td>{formatWeight(total.oilDoa.actual)}</td>
        <td>{formatWeight(total.nbr.set)}</td>
        <td>Всього фактично</td>
        <td>{formatWeight(total.total)}</td>
        <th>#</th>
      </tr>
    </tfoot>
  );
}
