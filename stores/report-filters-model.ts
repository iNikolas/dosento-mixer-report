import { createEvent, createStore, sample } from "effector";
import { debounce } from "patronum";

import { Filter, SortingFilters } from "@/entities";
import { searchDelayMs, sortingColumns, sortingType } from "@/config";

export const filterColumnChanged = createEvent<SortingFilters>();
export const searchInputChanged = createEvent<string>();

export const $searchInput = createStore("");
const $searchSanitized = $searchInput.map((search) => search.trim());

export const $filter = createStore<Filter>({
  column: sortingColumns.timestamp,
  type: sortingType.asc,
  search: "",
});

const searchFilterChanged = debounce<string>($searchSanitized, searchDelayMs);

sample({ clock: searchInputChanged, target: $searchInput });

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
  clock: searchFilterChanged,
  source: $filter,
  filter: (filter, search) => filter.search !== search,
  fn: (filter, search) => {
    return {
      ...filter,
      search,
    };
  },
  target: $filter,
});
