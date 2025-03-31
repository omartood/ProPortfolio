"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";
import { formatDate } from "@/lib/utils";

// We'll need to recreate or import the MarkdownEditor
const MarkdownEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-64 p-4 border rounded-md"
      placeholder="Write your content in Markdown..."
    />
  );
};

interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt?: string;
  tags: string[];
}

interface BlogPostFormProps {
  post?: BlogPost;
  isEditing?: boolean;
}

export default function BlogPostForm({
  post,
  isEditing = false,
}: BlogPostFormProps) {
  const initialPost: BlogPost = post || {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    tags: [],
  };

  const [formData, setFormData] = useState<BlogPost>(initialPost);
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Generate slug from title
  useEffect(() => {
    if (!isEditing && formData.title && !formData.slug) {
      setFormData((prev) => ({
        ...prev,
        slug: formData.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-"),
      }));
    }
  }, [formData.title, isEditing, formData.slug]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.content ||
      !formData.excerpt ||
      !formData.slug
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint = isEditing ? `/api/blog/${post?.id}` : "/api/blog";
      const method = isEditing ? "PUT" : "POST";

      console.log("Submitting blog post:", {
        endpoint,
        method,
        data: {
          ...formData,
          publishedAt: formData.publishedAt || new Date().toISOString(),
        },
      });

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          publishedAt: formData.publishedAt || new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Error response:", {
          status: response.status,
          data: errorData,
        });
        throw new Error(errorData.error || "Failed to save blog post");
      }

      const savedPost = await response.json();
      console.log("Successfully saved post:", savedPost);

      toast.success(
        isEditing
          ? "Blog post updated successfully"
          : "Blog post created successfully"
      );
      router.push("/dashboard/blog");
      router.refresh();
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast.error((error as Error).message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog post title"
              required
            />
          </div>

          <div>
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="your-post-url"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              This will be the URL of your blog post: /blog/{formData.slug}
            </p>
          </div>

          <div>
            <Label htmlFor="excerpt">Excerpt *</Label>
            <Input
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Brief summary of your post"
              required
            />
          </div>

          <div>
            <Label htmlFor="coverImage">Cover Image URL *</Label>
            <Input
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div>
            <Label>Tags</Label>
            <div className="flex gap-2 mt-1">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button type="button" variant="secondary" onClick={handleAddTag}>
                Add
              </Button>
            </div>

            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <div
                    key={tag}
                    className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 rounded-full hover:bg-muted-foreground/20 p-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="content">Content *</Label>
            <div className="mt-1">
              <MarkdownEditor
                value={formData.content}
                onChange={handleContentChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="flex items-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              {isEditing ? "Update Post" : "Create Post"}
            </>
          )}
        </Button>
      </div>
    </motion.form>
  );
}
