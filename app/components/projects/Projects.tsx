"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ProjectCarousel from "./ProjectCarousel";

// Replace with your actual projects
const projects = [
  {
    id: 1,
    title: "Soplang The Somalia Programming Language",
    description:
      "Soplang is a programming language that is designed to be easy to learn and use. It is a statically typed language that is similar to Python.",
    tags: ["Soplang", "Programming Language", "Python", "C++"],
    imageUrl: "/placeholder-project.jpg",
    demoUrl: "https://www.soplang.org/",
    githubUrl: "https://github.com/omartood/soplang.org",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description:
      "A responsive portfolio website built with Next.js, Framer Motion for animations, and Tailwind CSS for styling.",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
    imageUrl: "/placeholder-project.jpg",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Task Management App",
    description:
      "A task management application with drag-and-drop functionality, user authentication, and real-time updates.",
    tags: ["React", "Firebase", "Tailwind CSS", "React DnD"],
    imageUrl: "/placeholder-project.jpg",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description:
      "A weather dashboard that displays current weather conditions and forecasts for multiple locations.",
    tags: ["JavaScript", "Weather API", "Chart.js", "CSS"],
    imageUrl: "/placeholder-project.jpg",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "Blog Platform",
    description:
      "A blog platform with a rich text editor, categories, tags, and user authentication.",
    tags: ["Next.js", "MongoDB", "NextAuth", "TipTap"],
    imageUrl: "/placeholder-project.jpg",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "Recipe App",
    description:
      "A recipe application that allows users to search, save, and share recipes.",
    tags: ["React", "Firebase", "Tailwind CSS", "PWA"],
    imageUrl: "/placeholder-project.jpg",
    demoUrl: "#",
    githubUrl: "#",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

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

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id="projects" ref={ref} className="py-20 px-6 bg-card/50">
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
              <p className="text-muted-foreground font-medium">My Work</p>
              <div className="h-1 w-10 bg-primary rounded-full"></div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mt-4"
            >
              Featured <span className="text-primary">Projects</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-muted-foreground max-w-2xl mx-auto mt-4"
            >
              Here are some of my recent projects. Each project showcases
              different skills and technologies that I've worked with.
            </motion.p>
          </div>

          {/* Featured Project Carousel */}
          <motion.div variants={itemVariants} className="mb-12">
            <ProjectCarousel />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                custom={i}
                variants={cardVariants}
                className="bg-card border border-border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="h-48 bg-muted/20 relative overflow-hidden">
                  {/* Replace with actual image */}
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <p>Project Image</p>
                  </div>

                  {/* Overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-primary/80 flex items-center justify-center transition-opacity duration-300 ${
                      hoveredId === project.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="flex gap-4">
                      <a
                        href={project.demoUrl}
                        className="bg-white text-primary p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View live demo"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                      <a
                        href={project.githubUrl}
                        className="bg-white text-primary p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View code on GitHub"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-muted/10 px-2 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
