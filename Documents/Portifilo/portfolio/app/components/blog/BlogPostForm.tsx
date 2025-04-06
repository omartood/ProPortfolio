"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { XCircle, Plus, Upload, Loader2 } from "lucide-react";
import MarkdownEditor from "./MarkdownEditor";
import { toast } from "react-hot-toast";
import Image from "next/image";

// Blog Post Schema
const blogPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase with hyphens only"
    ),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  coverImage: z.string().url("Must be a valid URL").optional(),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
});

type BlogPostFormValues = z.infer<typeof blogPostSchema>;

interface BlogPostFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function BlogPostForm({
  initialData,
  isEditing = false,
}: BlogPostFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [coverImagePreview, setCoverImagePreview] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);

  const suggestedTags = [
    "JavaScript",
    "React",
    "Next.js",
    "TypeScript",
    "CSS",
    "HTML",
    "Node.js",
    "API",
    "Frontend",
    "Backend",
    "Web Development",
    "Design",
    "Tutorial",
    "Guide",
    "Tips",
  ];

  // Initialize the form with react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      excerpt: initialData?.excerpt || "",
      content: initialData?.content || "",
      coverImage: initialData?.coverImage || "",
      tags: initialData?.tags || [],
    },
  });

  // Watch for changes to update the UI
  const watchedTitle = watch("title");
  const watchedCoverImage = watch("coverImage");

  // Update content when form state changes
  useEffect(() => {
    if (initialData) {
      setContent(initialData.content || "");
      setTags(initialData.tags || []);
      if (initialData.coverImage) {
        setCoverImagePreview(initialData.coverImage);
      }
    }
  }, [initialData]);

  // Update cover image preview
  useEffect(() => {
    if (watchedCoverImage) {
      setCoverImagePreview(watchedCoverImage);
    }
  }, [watchedCoverImage]);

  // Auto-generate slug from title
  useEffect(() => {
    if (watchedTitle && !isEditing) {
      const slug = watchedTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      setValue("slug", slug);
    }
  }, [watchedTitle, setValue, isEditing]);

  // Handle tag management
  const addTag = (tag: string) => {
    if (!tag.trim()) return;

    // Prevent duplicates
    if (!tags.includes(tag.trim())) {
      const updatedTags = [...tags, tag.trim()];
      setTags(updatedTags);
      setValue("tags", updatedTags);
      setNewTag("");
    } else {
      toast.error("Tag already exists");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    setValue("tags", updatedTags);
  };

  // Handle form submission
  const onSubmit = async (data: BlogPostFormValues) => {
    try {
      setIsSubmitting(true);

      const payload = {
        ...data,
        content: content,
        publishedAt: initialData?.publishedAt || new Date().toISOString(),
      };

      const url = isEditing ? `/api/blog/${initialData.id}` : "/api/blog";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Something went wrong");
      }

      const result = await response.json();
      toast.success(
        isEditing ? "Post updated successfully!" : "Post created successfully!"
      );

      // Redirect to the post
      router.push(`/blog/${result.slug}`);
    } catch (error: any) {
      console.error("Error submitting post:", error);
      toast.error(error.message || "Failed to submit post");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle image upload via URL
  const handleImageUpload = async () => {
    const imageUrl = prompt("Enter the URL of your cover image:");
    if (!imageUrl) return;

    try {
      setIsImageLoading(true);
      // Validate that the URL exists (simple check)
      const response = await fetch(imageUrl, { method: "HEAD" });

      if (!response.ok) {
        throw new Error("Image URL is not valid");
      }

      setValue("coverImage", imageUrl);
      setCoverImagePreview(imageUrl);
      toast.success("Cover image added successfully!");
    } catch (error) {
      toast.error("Failed to validate image URL");
      console.error("Image validation error:", error);
    } finally {
      setIsImageLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Cover Image Section */}
        <div className="relative w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
          {coverImagePreview ? (
            <>
              <Image
                src={coverImagePreview}
                alt="Cover Image"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setValue("coverImage", "");
                  setCoverImagePreview("");
                }}
                className="absolute top-4 right-4 p-1 bg-white dark:bg-gray-800 rounded-full shadow-md"
              >
                <XCircle className="w-6 h-6 text-red-500" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleImageUpload}
              className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              disabled={isImageLoading}
            >
              {isImageLoading ? (
                <Loader2 className="w-8 h-8 animate-spin" />
              ) : (
                <>
                  <Upload className="w-8 h-8 mb-2" />
                  <span>Add Cover Image</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Title Input - Medium style large input */}
        <div className="p-6">
          <input
            type="text"
            placeholder="Title"
            className="w-full text-3xl sm:text-4xl font-bold mb-4 p-0 border-0 bg-transparent focus:outline-none focus:ring-0 text-gray-900 dark:text-gray-100"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}

          {/* Slug input with validation */}
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
              <span>yoursite.com/blog/</span>
              <input
                type="text"
                className="flex-1 bg-transparent focus:outline-none focus:ring-0 border-b border-dashed border-gray-300 dark:border-gray-600"
                {...register("slug")}
              />
            </div>
            {errors.slug && (
              <p className="text-red-500 text-sm">{errors.slug.message}</p>
            )}
          </div>

          {/* Excerpt textarea */}
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              Excerpt (Short summary)
            </label>
            <textarea
              rows={2}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write a short summary of your post..."
              {...register("excerpt")}
            />
            {errors.excerpt && (
              <p className="text-red-500 text-sm mt-1">
                {errors.excerpt.message}
              </p>
            )}
          </div>

          {/* Tags section */}
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              Tags
            </label>

            {/* Display selected tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full px-3 py-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new tag */}
            <div className="flex items-center">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag(newTag);
                  }
                }}
                placeholder="Add a tag..."
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800"
              />
              <button
                type="button"
                onClick={() => addTag(newTag)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Suggested tags */}
            <div className="mt-3">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Suggested tags:
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addTag(tag)}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {errors.tags && (
              <p className="text-red-500 text-sm mt-2">{errors.tags.message}</p>
            )}
          </div>

          {/* Markdown Editor */}
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              Content
            </label>
            <MarkdownEditor
              value={content}
              onChange={(value) => {
                setContent(value);
                setValue("content", value);
              }}
              height="min-h-[500px]"
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isEditing ? "Updating..." : "Publishing..."}
                </>
              ) : (
                <>{isEditing ? "Update Post" : "Publish Post"}</>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
