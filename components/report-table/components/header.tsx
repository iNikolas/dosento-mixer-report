import React from "react";

export function Header() {
  return (
    <thead>
      <tr>
        <th rowSpan={2}>#</th>
        <td rowSpan={2}>Дата</td>
        <td rowSpan={2}>Рецепт</td>
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
        <td className="text-center">Встановлено</td>
        <td className="text-center">Фактично</td>
        <td className="text-center">Встановлено</td>
        <td className="text-center">Фактично</td>
        <td className="text-center">Встановлено</td>
        <td className="text-center">Фактично</td>
        <td className="text-center">Встановлено</td>
        <td className="text-center">Фактично</td>
        <td className="text-center">Встановлено</td>
        <td className="text-center">Фактично</td>
        <td className="text-center">Встановлено</td>
        <td className="text-center">Фактично</td>
        <td className="text-center">Встановлено</td>
      </tr>
    </thead>
  );
}
