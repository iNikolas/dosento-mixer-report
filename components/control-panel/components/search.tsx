"use client";

import React from "react";
import { useUnit } from "effector-react";
import { PiMagnifyingGlassBold } from "react-icons/pi";

import { reportFiltersModel } from "@/stores";

export function Search() {
  const search = useUnit(reportFiltersModel.$searchInput);
  const searchChanged = useUnit(reportFiltersModel.searchInputChanged);

  return (
    <label
      htmlFor="search-input"
      className="input input-bordered flex items-center gap-2"
    >
      <input
        id="search-input"
        value={search}
        onChange={(e) => searchChanged(e.target.value)}
        type="text"
        placeholder="Пошук за назвою рецепта"
        className="grow"
      />
      <PiMagnifyingGlassBold className="w-4 h-4 opacity-70" />
    </label>
  );
}
