"use client";

import React from "react";

import { cn } from "@/utils";

import { AnimatedBackground, FileInput, Loader } from "./components";
import { useDragEvents } from "./utils";

export function Dropzone({
  className,
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
  const { isDraggingOver, handlers } = useDragEvents();

  return (
    <section
      {...props}
      className={cn(
        className,
        "max-w-md w-full mx-4 relative rounded-3xl aspect-square",
      )}
      {...handlers}
    >
      <FileInput />
      <AnimatedBackground isDraggingOver={isDraggingOver} />
      <Loader />
    </section>
  );
}
