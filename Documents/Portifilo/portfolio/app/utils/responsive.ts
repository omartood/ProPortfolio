/**
 * Responsive utility functions and constants for use throughout the application
 * Provides consistent breakpoint values and helper functions
 */

// Tailwind CSS breakpoint values (in pixels)
export const breakpoints = {
  xs: 480, // Extra small devices
  sm: 640, // Small devices like mobile phones
  md: 768, // Medium devices like tablets
  lg: 1024, // Large devices like laptops
  xl: 1280, // Extra large devices like desktops
  "2xl": 1536, // 2X Extra large devices like large desktops
};

// Media query strings for use with CSS-in-JS solutions
export const mediaQueries = {
  xs: `(min-width: ${breakpoints.xs}px)`,
  sm: `(min-width: ${breakpoints.sm}px)`,
  md: `(min-width: ${breakpoints.md}px)`,
  lg: `(min-width: ${breakpoints.lg}px)`,
  xl: `(min-width: ${breakpoints.xl}px)`,
  "2xl": `(min-width: ${breakpoints["2xl"]}px)`,
  // Max-width queries for targeting below specific breakpoints
  maxXs: `(max-width: ${breakpoints.xs - 1}px)`,
  maxSm: `(max-width: ${breakpoints.sm - 1}px)`,
  maxMd: `(max-width: ${breakpoints.md - 1}px)`,
  maxLg: `(max-width: ${breakpoints.lg - 1}px)`,
  maxXl: `(max-width: ${breakpoints.xl - 1}px)`,
  max2xl: `(max-width: ${breakpoints["2xl"] - 1}px)`,
  // Orientation and dark mode
  portrait: "(orientation: portrait)",
  landscape: "(orientation: landscape)",
  dark: "(prefers-color-scheme: dark)",
  // Specific device targeting
  mobile: `(max-width: ${breakpoints.md - 1}px)`,
  tablet: `(min-width: ${breakpoints.md}px) and (max-width: ${
    breakpoints.lg - 1
  }px)`,
  desktop: `(min-width: ${breakpoints.lg}px)`,
  touch: "(hover: none) and (pointer: coarse)",
};

// A hook for responsive design in React components would go here
// But since this is a utility file, we'll stick to constants
