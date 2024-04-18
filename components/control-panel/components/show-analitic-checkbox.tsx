"use client";

import React from "react";
import { useGate, useUnit } from "effector-react";

import { reportFiltersModel } from "@/stores";

export function ShowAnaliticCheckbox() {
  useGate(reportFiltersModel.AnaliticGate);
  const toggleAnalitic = useUnit(
    reportFiltersModel.toggleShowAnaliticRequested,
  );

  const show = useUnit(reportFiltersModel.$showAnalitic);
  return (
    <div className="form-control">
      <label htmlFor="analitic-checkbox" className="label cursor-pointer">
        <span className="label-text text-neutral-content mr-2">
          Показувати аналітику
        </span>
        <input
          onChange={toggleAnalitic}
          type="checkbox"
          checked={show}
          className="checkbox"
          id="analitic-checkbox"
        />
      </label>
    </div>
  );
}
