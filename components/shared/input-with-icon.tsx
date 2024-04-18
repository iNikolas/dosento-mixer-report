import React from "react";
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
    <label
      htmlFor={id ?? reactId}
      className="input input-bordered flex items-center gap-2"
    >
      <Icon className="w-4 h-4 opacity-70" />
      <input
        id={id ?? reactId}
        className={cn("grow", className)}
        {...inputProps}
      />
    </label>
  );
}
