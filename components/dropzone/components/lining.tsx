"use client";

import React from "react";
import { motion, MotionProps } from "framer-motion";

import { cn } from "@/utils";

export function Lining({
  className,
  ...divProps
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  MotionProps) {
  return (
    <motion.div
      className={cn("absolute inset-0 shadow-lg rounded-3xl", className)}
      {...divProps}
    />
  );
}
