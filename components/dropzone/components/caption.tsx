import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { supportedFormats } from "@/config";
import { cn } from "@/utils";

const animationProps = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

export function Caption({ isDraggingOver = false }) {
  return (
    <div
      className={cn(
        "text-center h-full flex flex-col justify-center items-center border-2 border-dashed border-neutral-content p-4 rounded-md transition-all",
        isDraggingOver && "border-accent",
        !isDraggingOver && "border-neutral-content",
      )}
    >
      <AnimatePresence mode="wait">
        {isDraggingOver ? (
          <motion.p
            key="draggingOverText"
            {...animationProps}
            className="text-accent uppercase font-bold text-lg"
          >
            Відпустіть тут
          </motion.p>
        ) : (
          <motion.div key="defaultText" {...animationProps}>
            <p className="text-neutral-content">
              Клацніть або перетягніть файли сюди
            </p>
            <p className="text-gray-600 uppercase">
              {supportedFormats.join(", ")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
