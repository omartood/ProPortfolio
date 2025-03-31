"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Project type definition
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: "active" | "planning" | "completed";
  progress: number;
  startDate: string;
  estimatedCompletion: string;
  thumbnailUrl: string;
}

export default function CurrentProject() {
  // State for projects
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/data/projects.json");
        const data = await response.json();
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Format date to readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handle navigation
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  // Get status label style based on status
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary";
      case "planning":
        return "bg-amber-500";
      case "completed":
        return "bg-green-500";
      default:
        return "bg-primary";
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Current Projects</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
            <p>Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return null;
  }

  const currentProject = projects[currentIndex];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Current Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My active and upcoming development projects focused on innovative
            solutions.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-background/80 border border-border flex items-center justify-center shadow-md hover:bg-card transition-colors duration-200 md:-translate-x-6"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-lg overflow-hidden shadow-md"
          >
            <div className="md:flex">
              <div className="md:w-2/5">
                <div className="h-full relative">
                  <img
                    src={currentProject.thumbnailUrl}
                    alt={currentProject.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div
                    className={`absolute top-4 right-4 ${getStatusStyle(
                      currentProject.status
                    )} text-white px-3 py-1 rounded-full text-xs font-medium`}
                  >
                    {currentProject.status}
                  </div>
                </div>
              </div>

              <div className="md:w-3/5 p-6">
                <h3 className="text-2xl font-bold mb-3">
                  {currentProject.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {currentProject.description}
                </p>

                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span className="font-medium">
                      {currentProject.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div
                      className={`${
                        currentProject.status === "active"
                          ? "bg-primary"
                          : currentProject.status === "planning"
                          ? "bg-amber-500"
                          : "bg-green-500"
                      } h-2.5 rounded-full`}
                      style={{ width: `${currentProject.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-muted px-3 py-1.5 rounded-md text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between text-sm text-muted-foreground">
                  <div>
                    Started:{" "}
                    <span className="font-medium">
                      {formatDate(currentProject.startDate)}
                    </span>
                  </div>
                  <div>
                    Target completion:{" "}
                    <span className="font-medium">
                      {formatDate(currentProject.estimatedCompletion)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-background/80 border border-border flex items-center justify-center shadow-md hover:bg-card transition-colors duration-200 md:translate-x-6"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slide indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full ${
                  index === currentIndex ? "bg-primary" : "bg-muted"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
