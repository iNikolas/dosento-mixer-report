"use client";

import React from "react";
import { useGate, useUnit } from "effector-react";

import { mixerBatchModel } from "@/stores";

import { Footer, Header, Row } from "./components";

export function ReportTable() {
  useGate(mixerBatchModel.Gate);
  const report = useUnit(mixerBatchModel.$report);

  return (
    <div className="overflow-auto max-h-full">
      <table className="table table-md table-pin-rows table-pin-cols">
        <Header />
        <tbody>
          {report.map((batch, index) => (
            <Row key={batch.timestamp} data={batch} recordNumber={index + 1} />
          ))}
        </tbody>
        <Footer />
      </table>
    </div>
  );
}
