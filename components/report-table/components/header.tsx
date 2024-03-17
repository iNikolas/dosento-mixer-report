"use client";

import React from "react";

import { sortingColumns } from "@/config";

import { SortingButton } from "./sorting-button";

export function Header() {
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
        <td className="text-center" colSpan={2}>
          PVC, кг
        </td>
        <td className="text-center" colSpan={2}>
          CaCO3, кг
        </td>
        <td className="text-center" colSpan={2}>
          Податчик 3, кг
        </td>
        <td className="text-center" colSpan={2}>
          Податчик 4, кг
        </td>
        <td className="text-center" colSpan={2}>
          Масло DOP, кг
        </td>
        <td className="text-center" colSpan={2}>
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
        <td className="text-center">Ціль</td>
        <td className="text-center">Факт</td>
        <td className="text-center">Ціль</td>
        <td className="text-center">Факт</td>
        <td className="text-center">Ціль</td>
        <td className="text-center">Факт</td>
        <td className="text-center">Ціль</td>
        <td className="text-center">Факт</td>
        <td className="text-center">Ціль</td>
        <td className="text-center">Факт</td>
        <td className="text-center">Ціль</td>
      </tr>
    </thead>
  );
}
