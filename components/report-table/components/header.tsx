"use client";

import React from "react";
import { useUnit } from "effector-react";

import { sortingColumns } from "@/config";
import { reportFiltersModel } from "@/stores";

import { SortingButton } from "./sorting-button";

export function Header() {
  const showAnalitic = useUnit(reportFiltersModel.$showAnalitic);
  const feederColspan = showAnalitic ? 3 : 2;
  return (
    <thead>
      <tr>
        <th rowSpan={2}>#</th>
        <td rowSpan={2}>
          <SortingButton column={sortingColumns.timestamp}>Дата</SortingButton>
        </td>
        <td rowSpan={2}>
          <SortingButton column={sortingColumns.recipe}>Рецепт</SortingButton>
        </td>
        <td className="text-center" colSpan={feederColspan}>
          PVC, кг
        </td>
        <td className="text-center" colSpan={feederColspan}>
          CaCO3, кг
        </td>
        <td className="text-center" colSpan={feederColspan}>
          Податчик 3, кг
        </td>
        <td className="text-center" colSpan={feederColspan}>
          Податчик 4, кг
        </td>
        <td className="text-center" colSpan={feederColspan}>
          Масло DOP, кг
        </td>
        <td className="text-center" colSpan={feederColspan}>
          Масло DOA, кг
        </td>
        <td>NBR, кг</td>
        <td rowSpan={2}>Партій</td>
        <td rowSpan={2}>Партія</td>
        <th rowSpan={2}>#</th>
      </tr>

      <tr>
        <td className="text-center">Ціль</td>
        <td className="text-center">Факт</td>
        {showAnalitic && <td className="text-center">%</td>}
        <td className="text-center">Ціль</td>
        <td className="text-center">Факт</td>
        {showAnalitic && <td className="text-center">%</td>}
        <td className="text-center">Ціль</td>
        <td className="text-center">Факт</td>
        {showAnalitic && <td className="text-center">%</td>}
        <td className="text-center">Ціль</td>
        <td className="text-center">Факт</td>
        {showAnalitic && <td className="text-center">%</td>}
        <td className="text-center">Ціль</td>
        <td className="text-center">Факт</td>
        {showAnalitic && <td className="text-center">%</td>}
        <td className="text-center">Ціль</td>
        <td className="text-center">Факт</td>
        {showAnalitic && <td className="text-center">%</td>}
        <td className="text-center">Ціль</td>
      </tr>
    </thead>
  );
}
