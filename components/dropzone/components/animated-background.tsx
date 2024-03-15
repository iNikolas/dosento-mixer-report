import React from "react";

import { Caption } from "./caption";
import { Lining } from "./lining";

const initialStyles = { opacity: 0, rotate: 0 };
const animateStyles = { opacity: 1 };

export function AnimatedBackground({ isDraggingOver = false }) {
  return (
    <>
      <Lining
        animate={{ scale: 1 }}
        initial={{ scale: 0.7 }}
        className="bg-base-100 p-8 sm:p-16 z-10"
      >
        <Caption isDraggingOver={isDraggingOver} />
      </Lining>
      <Lining
        className="bg-accent"
        animate={{ ...animateStyles, rotate: "-12deg" }}
        initial={initialStyles}
      />
      <Lining
        className="bg-secondary"
        animate={{ ...animateStyles, rotate: "-6deg" }}
        initial={initialStyles}
      />
    </>
  );
}
