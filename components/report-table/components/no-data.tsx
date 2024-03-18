import React from "react";
import Image from "next/image";
import Link from "next/link";

import { links, maxBatchDataLength } from "@/config";
import noDataPic from "@/assets/images/decrease_3.png";

export function NoData() {
  return (
    <tr className="prose">
      <th> </th>
      <td
        className="[&_*]:mx-auto [&_*]:text-center"
        colSpan={maxBatchDataLength}
      >
        <h3>Немає даних</h3>
        <Image width={480} src={noDataPic} alt="заглушка немає даних" />
        <p>
          Щоб розпочати, <Link href={links.uploadData}>завантажте</Link> звіт у
          форматі CSV
        </p>
      </td>
      <th> </th>
    </tr>
  );
}
