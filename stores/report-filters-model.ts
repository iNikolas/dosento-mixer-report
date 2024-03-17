import { createEvent, createStore, sample } from "effector";

import { Filter, SortingFilters } from "@/entities";
import { sortingColumns, sortingType } from "@/config";

export const filterColumnChanged = createEvent<SortingFilters>();

export const $filter = createStore<Filter>({
  column: sortingColumns.timestamp,
  type: sortingType.asc,
});

sample({
  clock: filterColumnChanged,
  source: $filter,
  fn: ({ column, type, ...restParams }, newColumn) => {
    if (column === newColumn) {
      return {
        column,
        type: type === sortingType.asc ? sortingType.desc : sortingType.asc,
        ...restParams,
      };
    }

    return {
      column: newColumn,
      type: sortingType.asc,
      ...restParams,
    };
  },
  target: $filter,
});
