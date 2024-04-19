import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconType } from "react-icons/lib";

import { cn } from "@/utils";

export function InputWithIcon({
  className,
  id,
  Icon,
  ...inputProps
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { Icon: IconType }) {
  const reactId = React.useId();
  return (
    <AnimatePresence>
      <motion.label
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        htmlFor={id ?? reactId}
        className="input input-bordered flex items-center gap-2"
      >
        <Icon className="w-4 h-4 opacity-70" />
        <input
          id={id ?? reactId}
          className={cn("grow", className)}
          {...inputProps}
        />
      </motion.label>
    </AnimatePresence>
  );
}
