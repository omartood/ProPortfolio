"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, Filter, Tag, User } from "lucide-react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/Footer";
import { formatDate } from "@/lib/utils";

// Blog Post Interface
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  publishedAt: string;
  tags: string[];
  author?: {
    name: string;
    avatar?: string;
  };
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = urlParams.get("category");
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/blog");
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts");
        }
        const data = await response.json();

        // Sort posts by date (newest first)
        const sortedPosts = data.sort((a: BlogPost, b: BlogPost) => {
          return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
          );
        });

        setPosts(sortedPosts);

        // Extract all unique categories
        const allCategories = Array.from(
          new Set(sortedPosts.flatMap((post: BlogPost) => post.tags))
        );
        setCategories(allCategories as string[]);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // Filter posts when category or search query changes
  useEffect(() => {
    if (posts.length === 0) return;

    let filtered = [...posts];

    // Filter by category if selected
    if (selectedCategory) {
      filtered = filtered.filter((post) =>
        post.tags.includes(selectedCategory)
      );
    }

    // Filter by search query if provided
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    setFilteredPosts(filtered);
  }, [posts, selectedCategory, searchQuery]);

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-muted-foreground mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const displayedPosts = filteredPosts.length > 0 ? filteredPosts : posts;

  return (
    <div>
      <Navbar />

      <section className="pt-24 pb-20">
        <div className="container px-4 mx-auto">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog</h1>
            <p className="text-xl text-muted-foreground">
              Thoughts, stories, and ideas about web development, design, and
              technology.
            </p>
          </div>

          {/* Filters */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-2 bg-muted/30 border border-border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="relative">
                <div className="flex items-center space-x-2">
                  <Filter size={16} className="text-muted-foreground" />
                  <select
                    value={selectedCategory || ""}
                    onChange={(e) => {
                      const value = e.target.value || null;
                      setSelectedCategory(value);

                      // Update URL
                      const url = new URL(window.location.href);
                      if (value) {
                        url.searchParams.set("category", value);
                      } else {
                        url.searchParams.delete("category");
                      }
                      window.history.pushState({}, "", url);
                    }}
                    className="pl-2 pr-8 py-2 bg-muted/30 border border-border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none appearance-none"
                  >
                    <option value="">All categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-muted-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active filter indicator */}
          {selectedCategory && (
            <div className="max-w-4xl mx-auto mb-8">
              <div className="flex items-center">
                <span className="text-sm text-muted-foreground">
                  Filtered by:
                </span>
                <div className="ml-2 flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                  <Tag className="h-3 w-3" />
                  <span>{selectedCategory}</span>
                  <button
                    onClick={() => {
                      setSelectedCategory(null);

                      // Update URL
                      const url = new URL(window.location.href);
                      url.searchParams.delete("category");
                      window.history.pushState({}, "", url);
                    }}
                    className="ml-1 hover:text-primary/80"
                    aria-label="Remove filter"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* No results */}
          {displayedPosts.length === 0 && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center py-12 border border-border rounded-lg bg-card">
                <div className="text-4xl mb-4">🔍</div>
                <h2 className="text-xl font-semibold mb-2">No posts found</h2>
                <p className="text-muted-foreground mb-6">
                  {selectedCategory
                    ? `No posts found in the '${selectedCategory}' category.`
                    : searchQuery
                    ? "No posts match your search criteria."
                    : "No blog posts available yet."}
                </p>
                {(selectedCategory || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSearchQuery("");

                      // Update URL
                      const url = new URL(window.location.href);
                      url.searchParams.delete("category");
                      window.history.pushState({}, "", url);
                    }}
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Featured post (first post) */}
          {displayedPosts.length > 0 && (
            <div className="max-w-4xl mx-auto mb-16">
              <Link href={`/blog/${displayedPosts[0].slug}`} className="group">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center"
                >
                  <div className="md:col-span-7 order-2 md:order-1">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {displayedPosts[0].tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-primary/10 text-primary px-2.5 py-1 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {displayedPosts[0].title}
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      {displayedPosts[0].excerpt}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="h-4 w-4 mr-1.5" />
                        <span>
                          {displayedPosts[0].author?.name ||
                            "Omar Jibril Abdulkadir"}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1.5" />
                        <span>{formatDate(displayedPosts[0].publishedAt)}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1.5" />
                        <span>
                          {Math.ceil(displayedPosts[0].content.length / 1000)}{" "}
                          min read
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-5 order-1 md:order-2">
                    <div className="aspect-[16/9] relative rounded-lg overflow-hidden bg-muted">
                      {displayedPosts[0].coverImage ? (
                        <Image
                          src={displayedPosts[0].coverImage}
                          alt={displayedPosts[0].title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
                          <span className="text-muted-foreground">
                            No image
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              </Link>
            </div>
          )}

          {/* Rest of the posts */}
          {displayedPosts.length > 1 && (
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {displayedPosts.slice(1).map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col group"
                  >
                    <Link href={`/blog/${post.slug}`} className="flex-1">
                      <div className="aspect-[16/9] relative rounded-lg overflow-hidden bg-muted mb-5">
                        {post.coverImage ? (
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
                            <span className="text-muted-foreground">
                              No image
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 2 && (
                            <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-xs">
                              +{post.tags.length - 2}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1.5" />
                            <span>{formatDate(post.publishedAt)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1.5" />
                            <span>
                              {Math.ceil(post.content.length / 1000)} min read
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
