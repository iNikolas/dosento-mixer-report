import { sortingColumns, sortingType } from "@/config";
import { ValueOf } from "@/utils";

export type SortingFilters = ValueOf<typeof sortingColumns>;

type SortingType = ValueOf<typeof sortingType>;

export interface Filter {
  column: SortingFilters;
  type: SortingType;
}
