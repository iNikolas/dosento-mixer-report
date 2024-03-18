import { createEvent, createStore, sample } from "effector";
import { debounce } from "patronum";

import { Filter, SortingFilters } from "@/entities";
import { searchDelayMs, sortingColumns, sortingType } from "@/config";

export const filterColumnChanged = createEvent<SortingFilters>();
export const searchParamChanged = createEvent<string>();

const searchParamChangedDebounced = debounce(searchParamChanged, searchDelayMs);

export const $filter = createStore<Filter>({
  column: sortingColumns.timestamp,
  type: sortingType.asc,
  search: "",
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

sample({
  clock: searchParamChangedDebounced,
  source: $filter,
  fn: (filter, search) => {
    return {
      ...filter,
      search,
    };
  },
  target: $filter,
});
