"use client";

import React, { useState } from "react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/Footer";
import Gallery from "../components/gallery/Gallery";
import GalleryUpload from "../components/gallery/GalleryUpload";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("browse");

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Memory Gallery
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of moments captured through time. Browse through
            memories or add your own to the collection.
          </p>
        </motion.div>

        <Tabs
          defaultValue="browse"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-4xl mx-auto mb-12"
        >
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="browse">Browse Memories</TabsTrigger>
            <TabsTrigger value="upload">Add Memory</TabsTrigger>
          </TabsList>
          <TabsContent value="browse">
            <Gallery />
          </TabsContent>
          <TabsContent value="upload">
            <GalleryUpload />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </>
  );
}
