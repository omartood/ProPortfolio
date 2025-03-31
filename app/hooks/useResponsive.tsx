"use client";

import { useState, useEffect } from "react";
import { breakpoints, mediaQueries } from "../utils/responsive";

/**
 * A hook that returns the current responsive breakpoint and utility functions
 * to check if the current viewport matches a specific breakpoint
 */
export default function useResponsive() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("xs");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [isTouch, setIsTouch] = useState<boolean>(false);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait"
  );

  useEffect(() => {
    // Function to update state based on current viewport
    const updateBreakpoint = () => {
      // Determine current breakpoint
      if (window.matchMedia(mediaQueries["2xl"]).matches) {
        setCurrentBreakpoint("2xl");
      } else if (window.matchMedia(mediaQueries.xl).matches) {
        setCurrentBreakpoint("xl");
      } else if (window.matchMedia(mediaQueries.lg).matches) {
        setCurrentBreakpoint("lg");
      } else if (window.matchMedia(mediaQueries.md).matches) {
        setCurrentBreakpoint("md");
      } else if (window.matchMedia(mediaQueries.sm).matches) {
        setCurrentBreakpoint("sm");
      } else {
        setCurrentBreakpoint("xs");
      }

      // Update device type states
      setIsMobile(window.matchMedia(mediaQueries.mobile).matches);
      setIsTablet(window.matchMedia(mediaQueries.tablet).matches);
      setIsDesktop(window.matchMedia(mediaQueries.desktop).matches);
      setIsTouch(window.matchMedia(mediaQueries.touch).matches);

      // Update orientation
      setOrientation(
        window.matchMedia(mediaQueries.portrait).matches
          ? "portrait"
          : "landscape"
      );
    };

    // Initial check
    updateBreakpoint();

    // Set up event listeners for viewport changes
    const resizeHandler = () => {
      updateBreakpoint();
    };

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("orientationchange", resizeHandler);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("orientationchange", resizeHandler);
    };
  }, []);

  /**
   * Check if current viewport is at least the given breakpoint
   * @param bp - The breakpoint to check against (xs, sm, md, lg, xl, 2xl)
   */
  const isBreakpoint = (bp: keyof typeof breakpoints): boolean => {
    const breakpointValues = {
      xs: 0,
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4,
      "2xl": 5,
    };

    const currentValue =
      breakpointValues[currentBreakpoint as keyof typeof breakpointValues] || 0;
    const checkValue = breakpointValues[bp] || 0;

    return currentValue >= checkValue;
  };

  /**
   * Check if current viewport is below the given breakpoint
   * @param bp - The breakpoint to check against (xs, sm, md, lg, xl, 2xl)
   */
  const isBelow = (bp: keyof typeof breakpoints): boolean => {
    const breakpointValues = {
      xs: 0,
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4,
      "2xl": 5,
    };

    const currentValue =
      breakpointValues[currentBreakpoint as keyof typeof breakpointValues] || 0;
    const checkValue = breakpointValues[bp] || 0;

    return currentValue < checkValue;
  };

  return {
    currentBreakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isTouch,
    orientation,
    isBreakpoint,
    isBelow,
  };
}
