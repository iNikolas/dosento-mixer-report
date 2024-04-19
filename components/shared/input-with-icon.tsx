import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconType } from "react-icons/lib";

import { cn } from "@/utils";

export function InputWithIcon({
  className,
  id,
  Icon,
  error,
  ...inputProps
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { Icon: IconType; error: string }) {
  const reactId = React.useId();
  return (
    <AnimatePresence>
      <div>
        <motion.label
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          htmlFor={id ?? reactId}
          className={cn(
            "input input-bordered flex items-center gap-2",
            !!error && "input-error",
          )}
        >
          <Icon className="w-4 h-4 opacity-70" />
          <input
            id={id ?? reactId}
            className={cn("grow", className)}
            {...inputProps}
          />
        </motion.label>
        {!!error && (
          <div className="label p-0 pt-1">
            <span className="label-text-alt text-error">{error}</span>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
}
