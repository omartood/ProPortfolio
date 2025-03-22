"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../components/navigation/Navbar";
import Footer from "../../../components/Footer";
import { motion } from "framer-motion";
import { blogPosts } from "../../../components/blog/blogData";
import { BlogPost } from "../../../components/blog/BlogCard";
import { showErrorToast, promiseToast } from "@/app/utils/toast";

export default function EditBlogPost() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [originalPost, setOriginalPost] = useState<BlogPost | null>(null);

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  // Load existing blog post data
  useEffect(() => {
    async function fetchBlogPost() {
      try {
        const response = await fetch(`/api/blog/${slug}`);

        if (!response.ok) {
          if (response.status === 404) {
            // Post not found, redirect to blog
            router.push("/blog");
            return;
          }
          throw new Error("Failed to fetch blog post");
        }

        const post = await response.json();
        setOriginalPost(post);
        setTitle(post.title);
        setContent(post.content || post.excerpt.replace("...", ""));
        setTags(post.tags);
        setCoverImage(post.coverImage);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        router.push("/blog");
      }
    }

    if (slug) {
      fetchBlogPost();
    }
  }, [slug, router]);

  // Auto-resize title textarea
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }
  }, [title]);

  // Auto-resize content textarea
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = "auto";
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
  }, [content]);

  // Handle tag input
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Handle file upload for cover image
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCoverImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSave = async () => {
    if (!title.trim()) {
      showErrorToast("Please add a title to your post");
      return;
    }

    if (!content.trim()) {
      showErrorToast("Please add content to your post");
      return;
    }

    setIsSaving(true);

    try {
      // Create updated post data
      const postData = {
        title: title,
        content: content,
        coverImage: coverImage || originalPost?.coverImage,
        tags: tags.length > 0 ? tags : ["Uncategorized"],
      };

      const updatePost = async () => {
        // Send update to API
        const response = await fetch(`/api/blog/${slug}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        if (!response.ok) {
          throw new Error("Failed to update blog post");
        }

        return await response.json();
      };

      const updatedPost = await promiseToast(updatePost(), {
        loading: "Saving your changes...",
        success: "Post updated successfully!",
        error: "Failed to update post. Please try again.",
      });

      // Redirect to the blog post
      router.push(`/blog/${updatedPost.id}`);
    } catch (error) {
      console.error("Error updating post:", error);
      setIsSaving(false);
    }
  };

  // Render preview content
  const renderPreviewContent = () => {
    return content.split("\n\n").map((paragraph, index) => {
      // Check if paragraph is a heading
      if (paragraph.startsWith("# ")) {
        return (
          <h1 key={index} className="text-3xl font-bold mt-10 mb-5">
            {paragraph.substring(2)}
          </h1>
        );
      } else if (paragraph.startsWith("## ")) {
        return (
          <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
            {paragraph.substring(3)}
          </h2>
        );
      } else if (paragraph.startsWith("### ")) {
        return (
          <h3 key={index} className="text-xl font-bold mt-6 mb-3">
            {paragraph.substring(4)}
          </h3>
        );
      }
      // Check if paragraph is a code block
      else if (paragraph.startsWith("```")) {
        const code = paragraph.slice(3, -3);
        return (
          <pre
            key={index}
            className="bg-card p-4 rounded-md overflow-auto my-4"
          >
            <code className="text-sm font-mono">{code}</code>
          </pre>
        );
      }
      // Check if paragraph is a list
      else if (paragraph.match(/^(\d+\.\s|[-*]\s)/m)) {
        const items = paragraph.split("\n");
        const isOrdered = items[0].match(/^\d+\.\s/);

        if (isOrdered) {
          return (
            <ol key={index} className="list-decimal pl-6 my-4 space-y-2">
              {items.map((item, i) => (
                <li key={i} className="pl-2">
                  {item.replace(/^\d+\.\s/, "")}
                </li>
              ))}
            </ol>
          );
        } else {
          return (
            <ul key={index} className="list-disc pl-6 my-4 space-y-2">
              {items.map((item, i) => (
                <li key={i} className="pl-2">
                  {item.replace(/^[-*]\s/, "")}
                </li>
              ))}
            </ul>
          );
        }
      }
      // Regular paragraph
      else {
        return (
          <p key={index} className="text-lg mb-6 leading-relaxed">
            {paragraph}
          </p>
        );
      }
    });
  };

  if (!originalPost) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-6"></div>
            <p className="text-muted-foreground">Loading post...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Edit Blog Post</h1>
              <button
                onClick={() => router.push(`/blog/${slug}`)}
                className="px-4 py-2 text-sm bg-card border border-border rounded-md hover:border-primary/50"
              >
                Cancel
              </button>
            </div>

            {/* Cover image uploader */}
            <div className="mb-8">
              <label
                htmlFor="cover-image"
                className="block relative aspect-[16/9] rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 cursor-pointer group"
              >
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 mx-auto mb-3 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-lg font-medium">Change cover image</p>
                      <p className="text-sm text-muted-foreground">
                        Recommended size: 1200x675px
                      </p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-lg font-medium">
                    Change cover image
                  </p>
                </div>
              </label>
              <input
                id="cover-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            {/* Title input */}
            <div className="mb-8">
              <textarea
                ref={titleRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full text-4xl md:text-5xl font-bold bg-transparent border-none focus:outline-none resize-none overflow-hidden"
                rows={1}
              />
            </div>

            {/* Tags input */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium flex items-center"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-2 w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30"
                    >
                      <span className="sr-only">Remove tag</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6L6 18"></path>
                        <path d="M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Add tags (press Enter)"
                  className="flex-grow bg-transparent border-none focus:outline-none text-sm"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Press Enter to add a tag. Tags help readers find your story.
              </p>
            </div>

            {/* Preview toggle */}
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm bg-card border border-border hover:border-primary/50 transition-colors duration-300"
              >
                {isPreviewMode ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 19l-7-7 7-7" />
                      <path d="M19 12H5" />
                    </svg>
                    Back to Editor
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Preview
                  </>
                )}
              </button>
            </div>

            {/* Content input */}
            {isPreviewMode ? (
              <div className="prose prose-lg dark:prose-invert max-w-none mb-12 border border-border rounded-lg p-6 bg-card/30">
                <h1 className="text-3xl md:text-4xl font-bold mb-6">
                  {title || "Untitled"}
                </h1>
                <div className="whitespace-pre-wrap leading-relaxed mb-4">
                  {content ? (
                    renderPreviewContent()
                  ) : (
                    <p className="text-muted-foreground">
                      No content yet. Start writing your story...
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="mb-12">
                <div className="mb-3 flex items-center gap-2">
                  <button
                    type="button"
                    className="p-2 rounded hover:bg-card text-muted-foreground hover:text-foreground"
                    onClick={() => setContent(content + "# ")}
                    title="Heading 1"
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
                      <path d="M4 12h8" />
                      <path d="M4 18V6" />
                      <path d="M12 18V6" />
                      <path d="M16 12h4" />
                      <path d="M16 6h4" />
                      <path d="M16 18h4" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded hover:bg-card text-muted-foreground hover:text-foreground"
                    onClick={() => setContent(content + "## ")}
                    title="Heading 2"
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
                      <path d="M4 12h8" />
                      <path d="M4 18V6" />
                      <path d="M12 18V6" />
                      <path d="M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded hover:bg-card text-muted-foreground hover:text-foreground"
                    onClick={() => setContent(content + "* ")}
                    title="Bullet List"
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
                      <path d="M21 12H9" />
                      <path d="M21 6H9" />
                      <path d="M21 18H9" />
                      <path d="M4 12a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z" />
                      <path d="M4 6a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z" />
                      <path d="M4 18a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded hover:bg-card text-muted-foreground hover:text-foreground"
                    onClick={() => setContent(content + "1. ")}
                    title="Numbered List"
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
                      <path d="M21 12H9" />
                      <path d="M21 6H9" />
                      <path d="M21 18H9" />
                      <path d="M5 6V4" />
                      <path d="M5 10V8" />
                      <path d="M6 16v-2.8a1 1 0 0 0-1.6-.8l-1.2.8" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded hover:bg-card text-muted-foreground hover:text-foreground"
                    onClick={() => setContent(content + "```\n\n```")}
                    title="Code Block"
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
                      <path d="m8 18-6-6 6-6" />
                      <path d="m16 6 6 6-6 6" />
                    </svg>
                  </button>
                  <div className="text-xs text-muted-foreground ml-2">
                    Use Markdown syntax for formatting
                  </div>
                </div>
                <textarea
                  ref={contentRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tell your story..."
                  className="w-full text-lg bg-transparent border-none focus:outline-none resize-none overflow-hidden min-h-[300px] leading-relaxed"
                  rows={10}
                />
              </div>
            )}

            {/* Save button */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center gap-2 disabled:opacity-70"
              >
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>Save Changes</>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
