import React from "react";

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
