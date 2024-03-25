"use client";

import React from "react";
import { useGate, useUnit } from "effector-react";
import { DarkModeSwitch, Props } from "react-toggle-dark-mode";

import { themeModel } from "@/stores";

export function ThemeToggle({
  className,
  ...props
}: Omit<Props, "checked" | "onChange">) {
  useGate(themeModel.Gate);

  const isDarkMode = useUnit(themeModel.$isDarkMode);
  const darkModeSelected = useUnit(themeModel.darkModeSelected);

  return (
    <DarkModeSwitch
      {...props}
      className={className}
      checked={isDarkMode}
      onChange={darkModeSelected}
      size={18}
    />
  );
}
