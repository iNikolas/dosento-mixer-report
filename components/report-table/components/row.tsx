import React from "react";

import { MixerBatch } from "@/entities";
import { formatDate, formatTime } from "@/utils";

export function Row({
  data,
  recordNumber,
}: {
  data: MixerBatch;
  recordNumber: number;
}) {
  return (
    <tr>
      <th>{recordNumber}</th>
      <td className="text-center">
        {formatDate(data.timestamp)}
        <br />
        {formatTime(data.timestamp)}
      </td>
      <td className="font-bold">{data.recipe}</td>
      <td>{data.pvc.set}</td>
      <td>{data.pvc.actual}</td>
      <td>{data.caco3.set}</td>
      <td>{data.caco3.actual}</td>
      <td>{data.feeder3.set}</td>
      <td>{data.feeder3.actual}</td>
      <td>{data.feeder4.set}</td>
      <td>{data.feeder4.actual}</td>
      <td>{data.oilDop.set}</td>
      <td>{data.oilDop.actual}</td>
      <td>{data.oilDoa.set}</td>
      <td>{data.oilDoa.actual}</td>
      <td>{data.nbr.set}</td>
      <td>{data.current}</td>
      <td>{data.total}</td>
      <th>{recordNumber}</th>
    </tr>
  );
}
