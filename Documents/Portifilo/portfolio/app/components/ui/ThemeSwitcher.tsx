"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ThemeSwitcher() {
  // Default to system preference
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [mounted, setMounted] = useState(false);

  // Check for user's saved preference and system preference
  useEffect(() => {
    // Set mounted to true when on client
    setMounted(true);

    // Get user's saved preference from local storage
    const savedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | "system"
      | null;

    if (savedTheme) {
      setTheme(savedTheme);

      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else if (savedTheme === "light") {
        document.documentElement.classList.remove("dark");
      } else {
        // Apply system preference
        applySystemTheme();
      }
    } else {
      // No saved preference, use system preference
      applySystemTheme();
    }
  }, []);

  // Apply system theme preference
  const applySystemTheme = () => {
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (systemPrefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Handle theme change
  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (newTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      // Apply system preference
      applySystemTheme();
    }
  };

  // If component hasn't mounted yet, don't render anything to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed right-6 top-20 z-40">
      <motion.div
        className="flex flex-col gap-2 bg-card border border-border rounded-full p-2 shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <button
          onClick={() => handleThemeChange("light")}
          className={`p-2 rounded-full ${
            theme === "light"
              ? "bg-primary text-white"
              : "text-muted-foreground hover:bg-muted/50"
          } transition-colors duration-200`}
          aria-label="Light theme"
          title="Light theme"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        </button>
        <button
          onClick={() => handleThemeChange("dark")}
          className={`p-2 rounded-full ${
            theme === "dark"
              ? "bg-primary text-white"
              : "text-muted-foreground hover:bg-muted/50"
          } transition-colors duration-200`}
          aria-label="Dark theme"
          title="Dark theme"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
        <button
          onClick={() => handleThemeChange("system")}
          className={`p-2 rounded-full ${
            theme === "system"
              ? "bg-primary text-white"
              : "text-muted-foreground hover:bg-muted/50"
          } transition-colors duration-200`}
          aria-label="System theme"
          title="System theme"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </button>
      </motion.div>
    </div>
  );
}
