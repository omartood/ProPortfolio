"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Use the same project type from the main Projects component
type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoUrl: string;
  githubUrl: string;
};

// Replace with the same projects data
const featuredProjects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with a modern UI, user authentication, payment processing, and order management.",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    imageUrl: "/placeholder-project.jpg",
    demoUrl: "#",
    githubUrl: "#",
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
];

export default function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
  };

  // Handle mouse drag for carousel
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walkX = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walkX;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (!carouselRef.current) return;

    // Calculate which slide to snap to
    const slideWidth = carouselRef.current.offsetWidth;
    const scrollPosition = carouselRef.current.scrollLeft;
    const slideIndex = Math.round(scrollPosition / slideWidth);

    // If scroll amount is significant, change slide
    if (Math.abs(scrollLeft - scrollPosition) > 50) {
      if (scrollLeft < scrollPosition) {
        setDirection(1);
      } else {
        setDirection(-1);
      }
      setCurrentIndex(slideIndex % featuredProjects.length);
    }

    // Snap to slide
    carouselRef.current.scrollTo({
      left: slideIndex * slideWidth,
      behavior: "smooth",
    });
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="relative w-full overflow-hidden py-10">
      <div
        ref={carouselRef}
        className="cursor-grab"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="max-w-4xl mx-auto px-8"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -100) {
                handleNext();
              } else if (info.offset.x > 100) {
                handlePrev();
              }
            }}
          >
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xl">
              <div className="relative h-48 sm:h-64 md:h-80 bg-muted/20">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <p>Project Image</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  {featuredProjects[currentIndex].title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {featuredProjects[currentIndex].description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredProjects[currentIndex].tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-muted/10 px-2 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a
                    href={featuredProjects[currentIndex].demoUrl}
                    className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-light transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </a>
                  <a
                    href={featuredProjects[currentIndex].githubUrl}
                    className="bg-card border border-border px-4 py-2 rounded-lg text-sm hover:bg-muted/10 transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Code
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center mt-6 gap-6">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full bg-card border border-border hover:bg-primary/5 transition-colors duration-300"
          aria-label="Previous project"
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
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="flex gap-2">
          {featuredProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentIndex
                  ? "bg-primary"
                  : "bg-muted hover:bg-primary/50"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-card border border-border hover:bg-primary/5 transition-colors duration-300"
          aria-label="Next project"
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
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
