"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Programming language icons to display
const programmingLanguages = [
  {
    name: "JavaScript",
    icon: "/icons/javascript.svg",
    position: { top: "20%", left: "15%" },
  },
  {
    name: "TypeScript",
    icon: "/icons/typescript.svg",
    position: { top: "25%", right: "15%" },
  },
  {
    name: "Python",
    icon: "/icons/python.svg",
    position: { top: "70%", left: "12%" },
  },
  {
    name: "React",
    icon: "/icons/react.svg",
    position: { top: "75%", right: "17%" },
  },
  {
    name: "HTML",
    icon: "/icons/html5.svg",
    position: { top: "40%", left: "8%" },
  },
  {
    name: "CSS",
    icon: "/icons/css3.svg",
    position: { top: "55%", right: "10%" },
  },
  {
    name: "Node.js",
    icon: "/icons/nodejs.svg",
    position: { bottom: "15%", left: "30%" },
  },
  {
    name: "C++",
    icon: "/icons/cpp.svg",
    position: { top: "10%", right: "30%" },
  },
];

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.8 + i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center py-20 pt-28 px-6"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2"
          >
            <div className="h-1 w-10 bg-primary rounded-full"></div>
            <p className="text-muted-foreground font-medium">
              Welcome to my portfolio
            </p>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          >
            Hi, I'm <span className="text-primary">Omar Jibril Abdulkadir</span>
            ,<br />
            Creative{" "}
            <span className="relative">
              Developer
              <motion.span
                className="absolute bottom-2 left-0 h-3 w-full bg-accent/20 -z-10"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 1.2 }}
              ></motion.span>
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-lg max-w-xl"
          >
            I create beautiful, responsive websites and innovative programming
            languages. Currently working on Soplang: Somalia's first programming
            language.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 mt-2"
          >
            <Link
              href="/projects"
              className="bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-full font-medium transition-colors duration-300"
            >
              View My Work
            </Link>
            <Link
              href="/ai-agent"
              className="bg-card border border-border hover:border-primary/50 px-6 py-3 rounded-full font-medium transition-colors duration-300 flex items-center gap-2"
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
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              AI Assistant
            </Link>
            <Link
              href="/#contact"
              className="border border-border hover:border-primary hover:text-primary px-6 py-3 rounded-full font-medium transition-colors duration-300"
            >
              Contact Me
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6 mt-6"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">5+</span>
              <span className="text-muted-foreground text-sm">
                Years
                <br />
                Experience
              </span>
            </div>
            <div className="h-10 w-px bg-border"></div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">50+</span>
              <span className="text-muted-foreground text-sm">
                Projects
                <br />
                Completed
              </span>
            </div>
            <div className="h-10 w-px bg-border"></div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">30+</span>
              <span className="text-muted-foreground text-sm">
                Happy
                <br />
                Clients
              </span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl"></div>
            <div className="relative bg-card border border-border rounded-3xl overflow-hidden shadow-xl h-full">
              {/* Profile image */}
              <Image
                src="/images/image-1.png"
                alt="Omar Jibril Abdulkadir"
                fill
                className="object-cover"
                priority
              />

              {/* Soplang logo overlay (center) */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 5, 0, -5, 0],
                    scale: [1, 1.05, 1, 0.95, 1],
                    transition: {
                      duration: 8,
                      ease: "easeInOut",
                      repeat: Infinity,
                    },
                  }}
                  className="bg-card/80 backdrop-blur-md p-3 rounded-full border-2 border-primary shadow-lg"
                >
                  <div className="relative w-24 h-24">
                    <Image
                      src="/images/soplang-logo.svg"
                      alt="Soplang Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Programming Language Icons */}
              {programmingLanguages.map((lang, i) => (
                <motion.div
                  key={lang.name}
                  custom={i}
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.2 }}
                  className="absolute z-10 bg-card/80 backdrop-blur-sm border border-border rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300"
                  style={lang.position}
                  title={lang.name}
                >
                  <div className="w-10 h-10 relative">
                    <Image
                      src={lang.icon}
                      alt={lang.name}
                      fill
                      className="object-contain p-1.5"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute top-10 -right-10 w-20 h-20 bg-primary/10 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          ></motion.div>
          <motion.div
            className="absolute -bottom-5 -left-5 w-10 h-10 bg-accent/20 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          ></motion.div>
        </motion.div>
      </div>
    </section>
  );
}
