"use client";

import React from "react";
import { useUnit } from "effector-react";
import { AnimatePresence } from "framer-motion";

import { mixerBatchModel } from "@/stores";

import { Row } from "./row";
import { NoData } from "./no-data";

export function Body() {
  const report = useUnit(mixerBatchModel.$report);

  return (
    <tbody>
      <AnimatePresence>
        {report.length ? (
          report.map((batch, index) => (
            <Row key={batch.timestamp} data={batch} recordNumber={index + 1} />
          ))
        ) : (
          <NoData />
        )}
      </AnimatePresence>
    </tbody>
  );
}
