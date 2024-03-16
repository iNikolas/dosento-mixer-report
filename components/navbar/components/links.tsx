import React from "react";
import Link from "next/link";

import { routes } from "@/config";

export function Links() {
  return (
    <>
      {routes.map((route) => (
        <li key={route.label}>
          <Link href={route.path}>{route.label}</Link>
        </li>
      ))}
    </>
  );
}
