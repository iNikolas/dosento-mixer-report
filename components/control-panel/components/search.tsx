"use client";

import React from "react";
import { useUnit } from "effector-react";

import { reportFiltersModel } from "@/stores";

export function Search() {
  const { search } = useUnit(reportFiltersModel.$filter);
  const [searchValue, setSearchValue] = React.useState(search);
  const searchParamChanged = useUnit(reportFiltersModel.searchParamChanged);

  React.useEffect(() => {
    searchParamChanged(searchValue);
  }, [searchParamChanged, searchValue]);

  return (
    <input
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      type="text"
      placeholder="Пошук за назвою рецепта"
      className="input input-bordered w-auto"
    />
  );
}
