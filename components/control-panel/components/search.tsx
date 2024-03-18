"use client";

import React from "react";
import { useUnit } from "effector-react";

import { reportFiltersModel } from "@/stores";

export function Search() {
  const search = useUnit(reportFiltersModel.$searchInput);
  const searchInputChanged = useUnit(reportFiltersModel.searchInputChanged);

  return (
    <input
      value={search}
      onChange={(e) => searchInputChanged(e.target.value)}
      type="text"
      placeholder="Пошук за назвою рецепта"
      className="input input-bordered w-auto"
    />
  );
}
