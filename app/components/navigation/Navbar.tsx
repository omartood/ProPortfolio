"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X, Menu, ChevronDown } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Projects", href: "/#projects" },
  { name: "AI", href: "/#ai" },
  { name: "Gallery", href: "/#gallery" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact" },
  { name: "AI Agent", href: "/ai-agent" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [navVisible, setNavVisible] = useState(true);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Handle scroll for showing/hiding navbar and applying background
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Apply background when scrolled down
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide/show navbar based on scroll direction
      if (currentScrollY > 100) {
        if (currentScrollY > prevScrollY && navVisible) {
          // Scrolling down - hide navbar
          setNavVisible(false);
        } else if (currentScrollY < prevScrollY && !navVisible) {
          // Scrolling up - show navbar
          setNavVisible(true);
        }
      } else {
        setNavVisible(true);
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY, navVisible]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileMenuOpen
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle navigation with scroll behavior
  const handleNavigation = (href: string) => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }

    // If it's an anchor link and we're on the home page
    if (href.startsWith("/#") && pathname === "/") {
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    // If it's an anchor link on another page
    if (href.includes("#") && href.startsWith("/") && pathname !== "/") {
      router.push(href);
      return;
    }

    // Regular navigation
    router.push(href);
  };

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: i * 0.1,
        ease: "easeOut",
      },
    }),
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.header
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 safe-padding ${
        isScrolled
          ? "bg-background/90 backdrop-blur-lg shadow-sm border-b border-border/50"
          : "bg-transparent"
      } ${navVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold"
        >
          <Link href="/" className="flex items-center gap-2">
            <span className="text-primary">Portfolio</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              custom={i}
              variants={linkVariants}
              initial="hidden"
              animate="visible"
            >
              <button
                onClick={() => handleNavigation(link.href)}
                className={`text-foreground/80 hover:text-primary transition-colors duration-300 text-sm font-medium ${
                  pathname === link.href ||
                  (link.href.includes("#") &&
                    pathname === "/" &&
                    window.location.hash === link.href.substring(1))
                    ? "text-primary"
                    : ""
                }`}
              >
                {link.name}
              </button>
            </motion.div>
          ))}
          <motion.div
            custom={navLinks.length}
            variants={linkVariants}
            initial="hidden"
            animate="visible"
          >
            <button
              onClick={() =>
                handleNavigation(pathname === "/" ? "#contact" : "/#contact")
              }
              className="bg-primary text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-primary-light transition-colors duration-300"
            >
              Let's Talk
            </button>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-foreground p-2 focus:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="absolute top-full left-0 right-0 bg-card shadow-lg overflow-hidden border-b border-border md:hidden"
          >
            <nav className="flex flex-col px-6 pt-2 pb-6">
              {navLinks.map((link, i) => (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link.href)}
                  className={`flex items-center justify-between text-foreground/80 hover:text-primary py-3 transition-colors duration-300 text-base font-medium text-left border-b border-border/30 last:border-0 ${
                    pathname === link.href ||
                    (link.href.includes("#") &&
                      pathname === "/" &&
                      window.location.hash === link.href.substring(1))
                      ? "text-primary"
                      : ""
                  }`}
                >
                  {link.name}
                  <ChevronDown className="w-4 h-4 transition-transform" />
                </button>
              ))}
              <button
                onClick={() =>
                  handleNavigation(pathname === "/" ? "#contact" : "/#contact")
                }
                className="bg-primary text-white px-5 py-3 rounded-lg text-center text-base font-medium hover:bg-primary-light transition-colors duration-300 mt-4 w-full"
              >
                Let's Talk
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
