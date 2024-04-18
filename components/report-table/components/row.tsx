"use client";

import React from "react";
import { useUnit } from "effector-react";
import { motion } from "framer-motion";

import { MixerReport } from "@/entities";
import { reportFiltersModel } from "@/stores";
import { formatDate, formatNumericRow, formatTime } from "@/utils";

import { OffsetCell } from "./offset-cell";

export function Row({
  data,
  recordNumber,
}: {
  data: MixerReport;
  recordNumber: number;
}) {
  const showAnalitic = useUnit(reportFiltersModel.$showAnalitic);

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
      {showAnalitic && <OffsetCell {...data.pvc} />}
      <td>{formatNumericRow(data.caco3.set)}</td>
      <td>{formatNumericRow(data.caco3.actual)}</td>
      {showAnalitic && <OffsetCell {...data.caco3} />}
      <td>{formatNumericRow(data.feeder3.set)}</td>
      <td>{formatNumericRow(data.feeder3.actual)}</td>
      {showAnalitic && <OffsetCell {...data.feeder3} />}
      <td>{formatNumericRow(data.feeder4.set)}</td>
      <td>{formatNumericRow(data.feeder4.actual)}</td>
      {showAnalitic && <OffsetCell {...data.feeder4} />}
      <td>{formatNumericRow(data.oilDop.set)}</td>
      <td>{formatNumericRow(data.oilDop.actual)}</td>
      {showAnalitic && <OffsetCell {...data.oilDop} />}
      <td>{formatNumericRow(data.oilDoa.set)}</td>
      <td>{formatNumericRow(data.oilDoa.actual)}</td>
      {showAnalitic && <OffsetCell {...data.oilDoa} />}
      <td>{formatNumericRow(data.nbr.set)}</td>
      <td>{data.total}</td>
      <td>{data.current}</td>
      <th>{recordNumber}</th>
    </motion.tr>
  );
}
