import { ValueOf } from "next/dist/shared/lib/constants";

import { sortingColumns, sortingType } from "@/config";

export type SortingFilters = ValueOf<typeof sortingColumns>;

type SortingType = ValueOf<typeof sortingType>;

export interface Filter {
  column: SortingFilters;
  type: SortingType;
  search: string;
  startTimestamp: number | null;
  endTimestamp: number | null;
}
