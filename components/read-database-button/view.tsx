"use client";

import React from "react";
import { useGate, useUnit } from "effector-react";
import { TbWorldDownload } from "react-icons/tb";

import { cn } from "@/utils";
import { mixerBatchModel, userModel } from "@/stores";

export function ReadDatabaseButton({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  useGate(mixerBatchModel.Gate);

  const loading = useUnit(mixerBatchModel.$loading);
  const readDatabaseRequested = useUnit(mixerBatchModel.readDatabaseRequested);
  const user = useUnit(userModel.$currentUser);

  return (
    <div
      className={cn(!user && "tooltip", "self-stretch")}
      data-tip="Спочатку авторизуйтеся"
    >
      <button
        disabled={loading || !user}
        type="button"
        className={cn("w-full btn btn-neuteral glass", className)}
        onClick={readDatabaseRequested}
        {...props}
      >
        {loading ? (
          <>
            <span className="loading loading-spinner" /> завантаження...
          </>
        ) : (
          <>
            <TbWorldDownload className="h-6 w-6" /> Завантажити дані
          </>
        )}
      </button>
    </div>
  );
}
