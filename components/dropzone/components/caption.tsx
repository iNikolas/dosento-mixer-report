import React from "react";
import { useUnit } from "effector-react";
import { motion, AnimatePresence } from "framer-motion";

import { supportedFormats } from "@/config";
import { cn } from "@/utils";
import { mixerBatchModel } from "@/stores";

const animationProps = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

export function Caption({ isDraggingOver = false }) {
  const loading = useUnit(mixerBatchModel.$loading);

  return (
    <AnimatePresence mode="wait">
      <div
        className={cn(
          "text-center h-full flex flex-col justify-center items-center border-2 border-dashed border-neutral-content p-4 rounded-md transition-all",
          isDraggingOver && "border-accent",
          !isDraggingOver && "border-neutral-content",
          loading && "[&_*]:opacity-0",
        )}
      >
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
      </div>
    </AnimatePresence>
  );
}
