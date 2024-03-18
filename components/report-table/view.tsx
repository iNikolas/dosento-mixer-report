"use client";

import React from "react";
import { useGate } from "effector-react";

import { mixerBatchModel } from "@/stores";

import { Body, Footer, Header } from "./components";

export function ReportTable() {
  useGate(mixerBatchModel.Gate);

  return (
    <div className="overflow-auto max-h-full">
      <table className="table table-md table-pin-rows table-pin-cols">
        <Header />
        <Body />
        <Footer />
      </table>
    </div>
  );
}
