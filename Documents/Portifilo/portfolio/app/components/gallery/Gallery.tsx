"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronRight, Image as ImageIcon } from "lucide-react";
import GalleryNav from "./GalleryNav";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  location?: string;
  date?: string;
  description?: string;
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Sample gallery images
  const galleryImages: GalleryImage[] = [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format",
      alt: "Coding Session",
      category: "work",
      location: "Home Office",
      date: "2023-05-15",
      description: "Late night coding session working on a new project.",
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=600&auto=format",
      alt: "Beach Vacation",
      category: "travel",
      location: "Mogadishu Beach",
      date: "2023-07-22",
      description: "Beautiful day at the beach during summer vacation.",
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?q=80&w=600&auto=format",
      alt: "Family Gathering",
      category: "personal",
      location: "Home",
      date: "2023-12-25",
      description: "Wonderful family gathering during the holidays.",
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=600&auto=format",
      alt: "Conference Talk",
      category: "events",
      location: "Tech Conference",
      date: "2023-09-10",
      description:
        "Giving a presentation about web development at the annual tech conference.",
    },
    {
      id: "5",
      src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format",
      alt: "Project Meeting",
      category: "work",
      location: "Office",
      date: "2023-06-05",
      description: "Team meeting discussing the next phase of our project.",
    },
    {
      id: "6",
      src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=600&auto=format",
      alt: "Mountain Hike",
      category: "travel",
      location: "Mount Everest",
      date: "2023-08-15",
      description: "Breathtaking view during a challenging mountain hike.",
    },
  ];

  // Filter images based on active category
  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  // Function to determine column span based on index for a more Pinterest-like layout
  const getColumnSpan = (index: number) => {
    if (viewMode !== "grid") return "";
    const patterns = [
      "col-span-1",
      "col-span-2",
      "col-span-1",
      "col-span-1",
      "col-span-2",
      "col-span-1",
    ];
    return patterns[index % patterns.length];
  };

  // Function to determine row span based on index
  const getRowSpan = (index: number) => {
    if (viewMode !== "grid") return "";
    const patterns = [
      "row-span-1",
      "row-span-1",
      "row-span-2",
      "row-span-1",
      "row-span-1",
      "row-span-2",
    ];
    return patterns[index % patterns.length];
  };

  return (
    <div className="w-full" id="gallery">
      <GalleryNav
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {filteredImages.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <ImageIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground/40" />
          <h3 className="text-xl font-medium mb-2">No memories found</h3>
          <p className="text-muted-foreground">
            There are no images in this category yet.
          </p>
        </motion.div>
      ) : (
        <div
          className={`
          ${
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max"
              : ""
          }
          ${viewMode === "large" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : ""}
          ${viewMode === "list" ? "space-y-4" : ""}
        `}
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`
                ${
                  viewMode === "grid"
                    ? `${getColumnSpan(index)} ${getRowSpan(index)}`
                    : ""
                }
                ${
                  viewMode === "list"
                    ? "flex items-center gap-4 bg-card p-4 rounded-lg"
                    : ""
                }
                relative group overflow-hidden rounded-lg
              `}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div
                    className={`
                      ${
                        viewMode !== "list"
                          ? "aspect-[4/3] cursor-pointer"
                          : "h-20 w-20 shrink-0 cursor-pointer"
                      }
                      relative overflow-hidden rounded-lg
                    `}
                    onClick={() => setSelectedImage(image)}
                  >
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

                {viewMode === "list" && (
                  <div className="ml-2">
                    <h3 className="font-medium mb-1">{image.alt}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{image.location}</span>
                      <span className="mx-2">•</span>
                      <span>{image.date}</span>
                    </div>
                  </div>
                )}

                <DialogContent className="sm:max-w-3xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                      <img
                        src={selectedImage?.src}
                        alt={selectedImage?.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-2">
                        {selectedImage?.alt}
                      </h2>
                      <div className="flex items-center text-muted-foreground mb-4">
                        <span className="capitalize">
                          {selectedImage?.category}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{selectedImage?.date}</span>
                      </div>
                      {selectedImage?.location && (
                        <div className="bg-muted px-3 py-1.5 rounded-full inline-block text-sm mb-4">
                          📍 {selectedImage.location}
                        </div>
                      )}
                      <p className="text-muted-foreground mb-8">
                        {selectedImage?.description}
                      </p>

                      <div className="flex items-center gap-4">
                        <button className="bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-lg transition-colors">
                          Download
                        </button>
                        <button className="bg-muted hover:bg-muted/80 px-4 py-2 rounded-lg transition-colors">
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-12 text-center"
      >
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-full transition-colors duration-300"
        >
          View Full Gallery
          <ChevronRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  );
}
