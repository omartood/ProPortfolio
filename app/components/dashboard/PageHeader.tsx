"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  heading: string;
  text?: string;
}

export function PageHeader({ heading, text }: PageHeaderProps) {
  return (
    <div className="mb-4">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-3xl font-bold tracking-tight"
      >
        {heading}
      </motion.h2>
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-muted-foreground mt-1"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}
