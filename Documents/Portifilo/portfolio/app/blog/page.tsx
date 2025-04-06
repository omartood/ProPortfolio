"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Filter,
  Tag,
  User,
  Bookmark,
  Plus,
} from "lucide-react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/Footer";
import { formatDate } from "@/lib/utils";
import { toast } from "react-hot-toast";

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
  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>([]);

  // Load bookmarked posts from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const bookmarks = JSON.parse(
        localStorage.getItem("blogBookmarks") || "[]"
      );
      setBookmarkedPosts(bookmarks);
    }
  }, []);

  // Handle URL parameters for category filtering
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = urlParams.get("category");
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, []);

  // Fetch blog posts
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

  // Toggle bookmark for a post
  const toggleBookmark = (slug: string) => {
    const newBookmarks = [...bookmarkedPosts];
    const index = newBookmarks.indexOf(slug);

    if (index === -1) {
      // Add to bookmarks
      newBookmarks.push(slug);
      toast.success("Post added to bookmarks");
    } else {
      // Remove from bookmarks
      newBookmarks.splice(index, 1);
      toast.success("Post removed from bookmarks");
    }

    setBookmarkedPosts(newBookmarks);
    localStorage.setItem("blogBookmarks", JSON.stringify(newBookmarks));
  };

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
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
            <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded"
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
  const featuredPost = displayedPosts[0]; // First post is featured

  return (
    <div>
      <Navbar />

      <section className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Thoughts, stories, and ideas about web development, design, and
              technology.
            </p>
          </div>

          {/* Create New Post Button (for Authors) */}
          <div className="max-w-6xl mx-auto mb-8 flex justify-end">
            <Link
              href="/blog/new"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Write a Post
            </Link>
          </div>

          {/* Filters */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
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
                  className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="relative">
                <div className="flex items-center space-x-2">
                  <Filter
                    size={16}
                    className="text-gray-500 dark:text-gray-400"
                  />
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
                    className="pl-2 pr-8 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none appearance-none"
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
                      className="h-4 w-4 text-gray-500 dark:text-gray-400"
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
            <div className="max-w-6xl mx-auto mb-8">
              <div className="flex items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Filtered by:
                </span>
                <div className="ml-2 flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full text-sm">
                  <Tag className="h-3 w-3" />
                  <span>{selectedCategory}</span>
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      const url = new URL(window.location.href);
                      url.searchParams.delete("category");
                      window.history.pushState({}, "", url);
                    }}
                    className="ml-1 hover:text-blue-900 dark:hover:text-blue-200"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Featured post (first post) */}
          {featuredPost && displayedPosts.length > 0 && (
            <div className="max-w-6xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
              >
                <div className="relative h-60 md:h-auto">
                  {featuredPost.coverImage ? (
                    <Image
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-400 dark:text-gray-500">
                        No image
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6 md:p-8 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start space-x-1">
                      {featuredPost.tags.slice(0, 3).map((tag) => (
                        <Link
                          key={tag}
                          href={`/blog?category=${tag}`}
                          className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                    <button
                      onClick={() => toggleBookmark(featuredPost.slug)}
                      className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <Bookmark
                        className={`h-5 w-5 ${
                          bookmarkedPosts.includes(featuredPost.slug)
                            ? "fill-current text-blue-600 dark:text-blue-400"
                            : ""
                        }`}
                      />
                    </button>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {featuredPost.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-blue-600 mr-3 flex items-center justify-center text-white">
                        {featuredPost.author?.avatar ? (
                          <Image
                            src={featuredPost.author.avatar}
                            alt={featuredPost.author.name || "Author"}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <span>
                            {(featuredPost.author?.name || "A").charAt(0)}
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          {featuredPost.author?.name || "Anonymous"}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{formatDate(featuredPost.publishedAt)}</span>
                          <span className="mx-1">•</span>
                          <Clock className="w-3 h-3 mr-1" />
                          <span>
                            {Math.ceil(featuredPost.content.length / 1000)} min
                            read
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Post grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedPosts.slice(1).map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block relative h-48"
                  >
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-400 dark:text-gray-500">
                          No image
                        </span>
                      </div>
                    )}
                  </Link>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-start space-x-1">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Link
                            key={tag}
                            href={`/blog?category=${tag}`}
                            className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-colors"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleBookmark(post.slug);
                        }}
                        className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <Bookmark
                          className={`h-4 w-4 ${
                            bookmarkedPosts.includes(post.slug)
                              ? "fill-current text-blue-600 dark:text-blue-400"
                              : ""
                          }`}
                        />
                      </button>
                    </div>

                    <h2 className="text-xl font-bold mb-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4 flex-grow">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center">
                        <div className="relative w-6 h-6 rounded-full overflow-hidden bg-blue-600 mr-2 flex items-center justify-center text-white text-xs">
                          {post.author?.avatar ? (
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name || "Author"}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <span>{(post.author?.name || "A").charAt(0)}</span>
                          )}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <span>{post.author?.name || "Anonymous"}</span>
                          <span className="mx-1">•</span>
                          <span>
                            {Math.ceil(post.content.length / 1000)} min read
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* No results */}
            {displayedPosts.length === 0 && (
              <div className="max-w-6xl mx-auto">
                <div className="text-center py-12 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                  <div className="text-4xl mb-4">🔍</div>
                  <h2 className="text-xl font-semibold mb-2">No posts found</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
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
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
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
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
