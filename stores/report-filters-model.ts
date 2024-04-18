import { createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { persist } from "effector-storage/local";
import { debounce } from "patronum";

import { Filter, SortingFilters } from "@/entities";
import {
  filterDateDelayMs,
  searchDelayMs,
  sortingColumns,
  sortingType,
} from "@/config";
import { deserializeDate, getUtcTimestamp, serializeDate } from "@/utils";

export const DatePickerGate = createGate();
export const AnaliticGate = createGate();

export const filterColumnChanged = createEvent<SortingFilters>();
export const filterStartDateChanged = createEvent<Date | null>();
export const filterEndDateChanged = createEvent<Date | null>();
export const searchInputChanged = createEvent<string>();
export const toggleShowAnaliticRequested = createEvent();

export const $searchInput = createStore("");
export const $startDate = createStore<Date | null>(null);
export const $endDate = createStore<Date | null>(null);
export const $showAnalitic = createStore(true);

const $searchSanitized = $searchInput.map((search) => search.trim());
const $startTimestamp = $startDate.map(getUtcTimestamp);
const $endTimestamp = $endDate.map(getUtcTimestamp);

export const $filter = createStore<Filter>({
  column: sortingColumns.timestamp,
  type: sortingType.asc,
  search: "",
  startTimestamp: null,
  endTimestamp: null,
});

const searchFilterChanged = debounce($searchSanitized, searchDelayMs);
const startTimestampChanged = debounce($startTimestamp, filterDateDelayMs);
const endTimestampChanged = debounce($endTimestamp, filterDateDelayMs);

persist({
  store: $startDate,
  key: "filter-start-date",
  pickup: DatePickerGate.open,
  serialize: serializeDate,
  deserialize: deserializeDate,
});

persist({
  store: $endDate,
  key: "filter-end-date",
  pickup: DatePickerGate.open,
  serialize: serializeDate,
  deserialize: deserializeDate,
});

persist({
  store: $showAnalitic,
  key: "filter-show-analitic",
  pickup: AnaliticGate.open,
});

sample({
  clock: toggleShowAnaliticRequested,
  source: $showAnalitic,
  fn: (prevState) => !prevState,
  target: $showAnalitic,
});

sample({
  clock: filterStartDateChanged,
  target: $startDate,
});

sample({
  clock: filterEndDateChanged,
  target: $endDate,
});

sample({
  clock: startTimestampChanged,
  source: $filter,
  filter: (filter, startTimestamp) =>
    Boolean(filter.startTimestamp) && startTimestamp !== filter.startTimestamp,
  fn: (filter, startTimestamp) => ({ ...filter, startTimestamp }),
  target: $filter,
});

sample({
  clock: endTimestampChanged,
  source: $filter,
  filter: (filter, endTimestamp) =>
    Boolean(filter.endTimestamp) && endTimestamp !== filter.endTimestamp,
  fn: (filter, endTimestamp) => ({ ...filter, endTimestamp }),
  target: $filter,
});

sample({
  clock: $startTimestamp,
  source: $filter,
  filter: (filter, startTimestamp) =>
    !filter.startTimestamp && startTimestamp !== filter.startTimestamp,
  fn: (filter, startTimestamp) => ({ ...filter, startTimestamp }),
  target: $filter,
});

sample({
  clock: endTimestampChanged,
  source: $filter,
  filter: (filter, endTimestamp) =>
    !filter.endTimestamp && endTimestamp !== filter.endTimestamp,
  fn: (filter, endTimestamp) => ({ ...filter, endTimestamp }),
  target: $filter,
});

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
