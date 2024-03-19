import React from "react";

import { About, Dropzone } from "@/components";

export default function Home() {
  return (
    <div className="flex flex-wrap items-center justify-center self-center my-auto w-full overflow-x-hidden overflow-y-auto">
      <About />
      <Dropzone />
    </div>
  );
}
