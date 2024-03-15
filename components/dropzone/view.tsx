"use client";

import React from "react";

import { AnimatedBackground, FileInput } from "./components";
import { useDragEvents } from "./utils";

export function Dropzone() {
  const { isDraggingOver, handlers } = useDragEvents();

  return (
    <section
      className="max-w-md w-full mx-4 relative rounded-3xl aspect-square"
      {...handlers}
    >
      <FileInput />
      <AnimatedBackground isDraggingOver={isDraggingOver} />
    </section>
  );
}
