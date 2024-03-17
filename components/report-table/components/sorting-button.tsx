import React from "react";
import { useUnit } from "effector-react";
import { FaArrowDownShortWide, FaArrowUpWideShort } from "react-icons/fa6";

import { cn } from "@/utils";
import { SortingFilters } from "@/entities";
import { reportFiltersModel } from "@/stores";
import { sortingType } from "@/config";

export function SortingButton({
  className,
  column,
  children,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { column: SortingFilters }) {
  const filter = useUnit(reportFiltersModel.$filter);
  const filterColumnChanged = useUnit(reportFiltersModel.filterColumnChanged);

  const isActive = filter.column === column;

  return (
    <button
      type="button"
      className={cn("btn flex-nowrap", isActive && "btn-primary")}
      onClick={() => filterColumnChanged(column)}
      {...props}
    >
      {children}
      {isActive &&
        (filter.type === sortingType.asc ? (
          <FaArrowDownShortWide />
        ) : (
          <FaArrowUpWideShort />
        ))}
    </button>
  );
}
