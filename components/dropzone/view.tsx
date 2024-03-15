import React from "react";

import { AnimatedBackground, FileInput } from "./components";

export function Dropzone() {
  return (
    <section className="max-w-md w-full mx-4 relative rounded-3xl aspect-square">
      <FileInput />
      <AnimatedBackground />
    </section>
  );
}
