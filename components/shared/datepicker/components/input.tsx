import React from "react";

import { cn } from "@/utils";

export const Input = React.forwardRef<HTMLInputElement>(
  (
    {
      className,
      ...props
    }: React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    ref,
  ) => {
    return (
      <input
        ref={ref}
        {...props}
        type="text"
        className={cn(className, "input input-ghost w-[190px]")}
      />
    );
  },
);
