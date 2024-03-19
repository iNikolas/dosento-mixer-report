import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export function PageLoader({ show = true }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-75 backdrop-filter backdrop-blur-sm"
        >
          <span className="loading loading-bars loading-lg" />
        </motion.section>
      )}
    </AnimatePresence>
  );
}
