"use client";

import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import React from "react";

import { cn } from "@/utils";

export function AnimatedButton({
  className,
  children,
  ...props
}: HTMLMotionProps<"button">) {
  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn("mt-2 btn btn-primary grow uppercase", className)}
        {...props}
      >
        {children}
      </motion.button>
    </AnimatePresence>
  );
}
