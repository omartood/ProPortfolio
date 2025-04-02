"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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

export default function AIAgentPage() {
  // State for projects - keeping this for potential future use
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjects, setActiveProjects] = useState<Project[]>([]);

  // Fetch projects on component mount - keeping this for potential future use
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/data/projects.json");
        const data = await response.json();
        setProjects(data);

        // Filter for active projects
        const active = data.filter(
          (project: Project) => project.status === "active"
        );
        setActiveProjects(active);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Sample AI-related images for the gallery
  const galleryImages = [
    {
      id: "1",
      src: "/images/image-1.png",
      alt: "AI Assistant Interface",
      description:
        "The intuitive interface of Toodagent helping with code generation.",
    },
    {
      id: "2",
      src: "/images/image-2.png",
      alt: "Problem Solving Session",
      description:
        "Toodagent helping to debug and solve complex programming issues.",
    },
    {
      id: "3",
      src: "/images/images-3.png",
      alt: "Code Generation",
      description:
        "Examples of code generated by Toodagent for various applications.",
    },
    {
      id: "4",
      src: "/images/imag-4.jpg",
      alt: "Project Planning",
      description:
        "Using Toodagent to plan and structure development projects.",
    },
  ];

  // Format date to readable format - keeping this for potential future use
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <Navbar />

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Toodagent: AI Assistant
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Interact with my AI assistant to help with your web development
              and programming needs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card border border-border rounded-lg shadow-sm overflow-hidden relative"
          >
            <div className="p-0">
              <iframe
                id="JotFormIFrame-01959c7d0f2d796092a3016793901c454ffa"
                title="Toodagent: Full-Stack Developer"
                allowTransparency={true}
                allow="geolocation; microphone; camera; fullscreen"
                src="https://agent.jotform.com/01959c7d0f2d796092a3016793901c454ffa?embedMode=iframe&background=1&shadow=1"
                frameBorder="0"
                style={{
                  minWidth: "100%",
                  maxWidth: "100%",
                  height: "688px",
                  border: "none",
                  width: "100%",
                }}
                scrolling="no"
              ></iframe>
              <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                  __html: `
                  document.addEventListener('DOMContentLoaded', function() {
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
                    script.async = true;
                    script.onload = function() {
                      window.jotformEmbedHandler("iframe[id='JotFormIFrame-01959c7d0f2d796092a3016793901c454ffa']", "https://www.jotform.com");
                    };
                    document.body.appendChild(script);
                  });
                `,
                }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <h2 className="text-xl font-semibold mb-4">About Toodagent</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
              Toodagent is powered by advanced AI and can help you with
              programming questions, project ideas, coding challenges, and more.
              Feel free to ask anything related to web development, software
              engineering, or technology.
            </p>
          </motion.div>

          {/* AI Assistant Gallery Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Toodagent in Action
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative group overflow-hidden rounded-lg"
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="aspect-[4/3] cursor-pointer relative overflow-hidden rounded-lg">
                        {/* Display actual image */}
                        <div className="w-full h-full bg-muted/60 relative">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white font-medium">View</span>
                        </div>
                      </div>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-3xl">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold mb-4">
                            {image.alt}
                          </h2>
                          <p className="text-muted-foreground mb-8">
                            {image.description}
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
