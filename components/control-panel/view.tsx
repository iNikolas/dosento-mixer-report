import React from "react";

import { Datepicker, Search, ShowAnaliticCheckbox } from "./components";

export function ControlPanel() {
  return (
    <section className="navbar bg-base-100 flex gap-3 overflow-x-auto">
      <Search />
      <Datepicker />
      <ShowAnaliticCheckbox />
    </section>
  );
}
