"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="mb-10 overflow-x-auto pb-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex gap-2"
      >
        <button
          onClick={() => onCategoryChange("All")}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
            activeCategory === "All"
              ? "bg-primary text-white"
              : "bg-card border border-border hover:border-primary/50"
          }`}
        >
          All Posts
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
              activeCategory === category
                ? "bg-primary text-white"
                : "bg-card border border-border hover:border-primary/50"
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>
    </div>
  );
}
