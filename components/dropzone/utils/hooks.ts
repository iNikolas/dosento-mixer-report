import React from "react";
import { useUnit } from "effector-react";
import { useRouter } from "next/navigation";

import { mixerBatchModel } from "@/stores";
import { links } from "@/config";

export function useDragEvents() {
  const [isDraggingOver, setIsDraggingOver] = React.useState(false);

  const handleDragOver = () => {
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  return {
    isDraggingOver,
    handlers: {
      onDrop: handleDragLeave,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
    },
  };
}

export function useReportRedirect() {
  const router = useRouter();

  const needRedirect = useUnit(mixerBatchModel.$needRedirect);

  React.useEffect(() => {
    if (needRedirect) {
      router.push(links.report);
    }
  }, [needRedirect, router]);

  return needRedirect;
}
