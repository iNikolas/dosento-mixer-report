import React from "react";

import { Lining } from "./lining";

const initialStyles = { opacity: 0, rotate: 0 };
const animateStyles = { opacity: 1 };

export function AnimatedBackground() {
  return (
    <>
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
