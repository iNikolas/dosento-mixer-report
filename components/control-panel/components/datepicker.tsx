"use client";

import React from "react";
import { useGate, useUnit } from "effector-react";

import { ReactDatePicker } from "@/components/shared";
import { reportFiltersModel } from "@/stores";

export function Datepicker() {
  useGate(reportFiltersModel.DatePickerGate);

  const [filterStartDateChanged, filterEndDateChanged] = useUnit([
    reportFiltersModel.filterStartDateChanged,
    reportFiltersModel.filterEndDateChanged,
  ]);
  const [startDate, endDate] = useUnit([
    reportFiltersModel.$startDate,
    reportFiltersModel.$endDate,
  ]);

  return (
    <div className="flex gap-1 [&_.react-datepicker-popper]:z-50">
      <ReactDatePicker
        placeholderText="Початкова дата"
        selected={startDate}
        onChange={filterStartDateChanged}
        startDate={startDate}
        endDate={endDate}
        selectsStart
      />
      <span>-</span>
      <ReactDatePicker
        placeholderText="Кінцева дата"
        todayButton="Сьогодні"
        selected={endDate}
        onChange={filterEndDateChanged}
        startDate={startDate}
        endDate={endDate}
        selectsEnd
      />
    </div>
  );
}
