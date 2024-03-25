import React from "react";
import { motion } from "framer-motion";

import { MixerBatch } from "@/entities";
import { formatDate, formatNumericRow, formatTime } from "@/utils";

export function Row({
  data,
  recordNumber,
}: {
  data: MixerBatch;
  recordNumber: number;
}) {
  return (
    <motion.tr
      key={data.timestamp}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
    >
      <th>{recordNumber}</th>
      <td className="text-center">
        {formatDate(data.timestamp)}
        <br />
        {formatTime(data.timestamp)}
      </td>
      <td className="font-bold">{data.recipe}</td>
      <td>{formatNumericRow(data.pvc.set)}</td>
      <td>{formatNumericRow(data.pvc.actual)}</td>
      <td>{formatNumericRow(data.caco3.set)}</td>
      <td>{formatNumericRow(data.caco3.actual)}</td>
      <td>{formatNumericRow(data.feeder3.set)}</td>
      <td>{formatNumericRow(data.feeder3.actual)}</td>
      <td>{formatNumericRow(data.feeder4.set)}</td>
      <td>{formatNumericRow(data.feeder4.actual)}</td>
      <td>{formatNumericRow(data.oilDop.set)}</td>
      <td>{formatNumericRow(data.oilDop.actual)}</td>
      <td>{formatNumericRow(data.oilDoa.set)}</td>
      <td>{formatNumericRow(data.oilDoa.actual)}</td>
      <td>{formatNumericRow(data.nbr.set)}</td>
      <td>{data.total}</td>
      <td>{data.current}</td>
      <th>{recordNumber}</th>
    </motion.tr>
  );
}
