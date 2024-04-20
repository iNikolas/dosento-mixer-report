import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconType } from "react-icons/lib";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { cn } from "@/utils";

export function InputWithIcon({
  className,
  id,
  Icon,
  error = "",
  type,
  ...inputProps
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { Icon: IconType; error: string }) {
  const [showPasssword, setShowPassword] = React.useState(false);
  const reactId = React.useId();

  const isPassword = type === "password";
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
            type={isPassword && showPasssword ? "text" : type}
            id={id ?? reactId}
            className={cn("grow", className)}
            {...inputProps}
          />
          {isPassword &&
            (showPasssword ? (
              <IoMdEyeOff
                className="cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <IoMdEye
                className="cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            ))}
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
