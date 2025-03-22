"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// Add or modify skills as needed
const skills = [
  { name: "HTML/CSS", level: 90 },
  { name: "JavaScript", level: 85 },
  { name: "React", level: 80 },
  { name: "Next.js", level: 75 },
  { name: "TypeScript", level: 70 },
  { name: "Node.js", level: 65 },
  { name: "Tailwind CSS", level: 85 },
  { name: "Framer Motion", level: 70 },
];

// Tech stack with icons
const techStack = [
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Express",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
  {
    name: "Redux",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  },
  {
    name: "Jest",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const barVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: {
        duration: 1.2,
        ease: "easeInOut",
      },
    }),
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: i * 0.05,
        ease: "easeOut",
      },
    }),
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: i * 0.05,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id="skills" ref={ref} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-12"
        >
          <div className="text-center mb-6">
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 justify-center"
            >
              <div className="h-1 w-10 bg-primary rounded-full"></div>
              <p className="text-muted-foreground font-medium">My Expertise</p>
              <div className="h-1 w-10 bg-primary rounded-full"></div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mt-4"
            >
              Professional <span className="text-primary">Skills</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-muted-foreground max-w-2xl mx-auto mt-4"
            >
              I've spent years honing my skills in web development. Here's a
              snapshot of my technical expertise and the technologies I work
              with.
            </motion.p>
          </div>

          {/* Tech Stack Icons Grid */}
          <motion.div variants={containerVariants} className="mb-12">
            <motion.h3
              variants={itemVariants}
              className="text-xl font-semibold mb-6 text-center"
            >
              My Tech Stack
            </motion.h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8 justify-items-center">
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  custom={i}
                  variants={logoVariants}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-16 h-16 bg-card border border-border rounded-xl p-3 shadow-sm flex items-center justify-center hover:border-primary/50 hover:shadow-md transition-all duration-300">
                    <div className="relative w-full h-full">
                      <Image
                        src={tech.icon}
                        alt={tech.name}
                        width={40}
                        height={40}
                        className="object-contain w-full h-full dark:bg-white dark:p-1 dark:rounded-md"
                      />
                    </div>
                  </div>
                  <span className="text-xs font-medium">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Skill Bars */}
            <motion.div
              variants={containerVariants}
              className="flex flex-col gap-5"
            >
              <motion.h3
                variants={itemVariants}
                className="text-xl font-semibold mb-2"
              >
                Core Proficiencies
              </motion.h3>

              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  className="mb-2"
                >
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <motion.div
                      custom={skill.level}
                      variants={barVariants}
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Technology Tags */}
            <motion.div
              variants={containerVariants}
              className="flex flex-col gap-5"
            >
              <motion.h3
                variants={itemVariants}
                className="text-xl font-semibold mb-2"
              >
                Areas of Expertise
              </motion.h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  variants={itemVariants}
                  className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors duration-300"
                >
                  <div className="text-primary mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
                  </div>
                  <h4 className="font-semibold mb-1">Frontend Development</h4>
                  <p className="text-sm text-muted-foreground">
                    Creating responsive, accessible, and performant user
                    interfaces with modern frameworks and design principles.
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors duration-300"
                >
                  <div className="text-primary mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 10h-4V4h-4v6H6l6 6 6-6z"></path>
                      <path d="M3 17h18"></path>
                      <path d="M5 17v4"></path>
                      <path d="M19 17v4"></path>
                    </svg>
                  </div>
                  <h4 className="font-semibold mb-1">Backend Development</h4>
                  <p className="text-sm text-muted-foreground">
                    Building robust and scalable server-side solutions, APIs,
                    and database integrations using modern technologies.
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors duration-300"
                >
                  <div className="text-primary mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="2"
                        y="3"
                        width="20"
                        height="14"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                  </div>
                  <h4 className="font-semibold mb-1">Responsive Design</h4>
                  <p className="text-sm text-muted-foreground">
                    Crafting fluid layouts that adapt seamlessly to various
                    screen sizes and devices for an optimal user experience.
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors duration-300"
                >
                  <div className="text-primary mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                      <path d="M2 17l10 5 10-5"></path>
                      <path d="M2 12l10 5 10-5"></path>
                    </svg>
                  </div>
                  <h4 className="font-semibold mb-1">API Development</h4>
                  <p className="text-sm text-muted-foreground">
                    Designing and implementing RESTful APIs that enable seamless
                    communication between frontend and backend systems.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
