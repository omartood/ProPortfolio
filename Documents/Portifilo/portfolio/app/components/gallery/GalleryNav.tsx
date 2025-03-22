"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Grid, Grid2X2, List } from "lucide-react";

interface GalleryNavProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  viewMode: string;
  setViewMode: (mode: string) => void;
}

export default function GalleryNav({
  activeCategory,
  setActiveCategory,
  viewMode,
  setViewMode,
}: GalleryNavProps) {
  const categories = [
    { id: "all", label: "All" },
    { id: "personal", label: "Personal" },
    { id: "work", label: "Work" },
    { id: "travel", label: "Travel" },
    { id: "events", label: "Events" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4"
    >
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? "bg-primary text-white"
                : "bg-muted hover:bg-muted/80 text-muted-foreground"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 self-end md:self-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search memories..."
            className="pl-9 pr-4 py-2 w-48 bg-muted border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        </div>

        <div className="flex bg-muted border border-border rounded-full p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-full ${
              viewMode === "grid"
                ? "bg-card shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("large")}
            className={`p-1.5 rounded-full ${
              viewMode === "large"
                ? "bg-card shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            <Grid2X2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-full ${
              viewMode === "list"
                ? "bg-card shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        <button className="p-2.5 bg-muted border border-border rounded-full hover:bg-muted/80 transition-colors">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </motion.div>
  );
}
