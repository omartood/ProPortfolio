"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Image as ImageIcon, Trash2 } from "lucide-react";

export default function GalleryUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState("personal");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Create a preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is just a UI placeholder - no actual upload functionality
    setUploading(true);

    // Simulating upload
    setTimeout(() => {
      setUploading(false);
      setSelectedFile(null);
      setPreview(null);
      setLocation("");
      setDescription("");

      // Show success message (in a real app)
      alert(
        "Upload feature is not implemented yet. This is just a UI placeholder."
      );
    }, 2000);
  };

  const clearForm = () => {
    setSelectedFile(null);
    setPreview(null);
    setLocation("");
    setDescription("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto mt-12 bg-card border border-border rounded-xl p-6 shadow-sm"
    >
      <h2 className="text-2xl font-bold mb-6">Add a Memory</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload area */}
        <div className="relative">
          {preview ? (
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={clearForm}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-border rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG or WEBP (MAX. 5MB)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>

        {/* Form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="travel">Travel</option>
              <option value="events">Events</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Mogadishu, Somalia"
              className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us about this memory..."
            rows={3}
            className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!selectedFile || uploading}
            className={`inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-full transition-colors duration-300 ${
              (!selectedFile || uploading) && "opacity-50 cursor-not-allowed"
            }`}
          >
            {uploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Uploading...
              </>
            ) : (
              <>
                <ImageIcon size={18} />
                Add Memory
              </>
            )}
          </button>
        </div>
      </form>

      <div className="mt-4 text-xs text-muted-foreground text-center">
        Note: This is a UI placeholder - uploads are not currently functional.
      </div>
    </motion.div>
  );
}
