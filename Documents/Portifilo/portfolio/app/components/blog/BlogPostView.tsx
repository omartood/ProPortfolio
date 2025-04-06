"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  User,
  Tag,
  ThumbsUp,
  Bookmark,
  Share2,
  Edit,
  Trash2,
  Twitter,
  Facebook,
  Linkedin,
  Link2,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { MDXRenderer } from "./MDXRenderer";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import { toast } from "react-hot-toast";

interface BlogPostViewProps {
  post: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    coverImage: string;
    publishedAt: string;
    tags: string[];
    author?: {
      name: string;
      avatar?: string;
    };
    readTime?: string;
  };
  onDelete?: () => Promise<void>;
  isAuthor?: boolean;
}

export default function BlogPostView({
  post,
  onDelete,
  isAuthor = false,
}: BlogPostViewProps) {
  const pathname = usePathname();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Calculate estimated reading time
  const readingTime =
    post.readTime || `${Math.ceil(post.content.length / 1000)} min read`;
  const formattedDate = formatDate(post.publishedAt);

  // Check if post is bookmarked
  useEffect(() => {
    // Get bookmarks from localStorage
    const bookmarks = JSON.parse(localStorage.getItem("blogBookmarks") || "[]");
    setIsBookmarked(bookmarks.includes(post.slug));

    // Get likes
    const likedPosts = JSON.parse(localStorage.getItem("blogLikes") || "{}");
    setLikes(likedPosts[post.id] || 0);

    // Set up scroll listener for reading progress
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      // Calculate how far the user has scrolled as a percentage
      const scrolled = Math.min(
        100,
        Math.max(0, (scrollTop / (documentHeight - windowHeight)) * 100)
      );

      setReadingProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [post.slug, post.id]);

  // Toggle bookmark
  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("blogBookmarks") || "[]");
    let newBookmarks;

    if (isBookmarked) {
      // Remove from bookmarks
      newBookmarks = bookmarks.filter((slug: string) => slug !== post.slug);
      toast.success("Removed from bookmarks");
    } else {
      // Add to bookmarks
      newBookmarks = [...bookmarks, post.slug];
      toast.success("Added to bookmarks");
    }

    localStorage.setItem("blogBookmarks", JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  // Handle like
  const handleLike = () => {
    const likedPosts = JSON.parse(localStorage.getItem("blogLikes") || "{}");
    const newLikes = (likedPosts[post.id] || 0) + 1;

    likedPosts[post.id] = newLikes;
    localStorage.setItem("blogLikes", JSON.stringify(likedPosts));
    setLikes(newLikes);
    toast.success("Thanks for your appreciation!");
  };

  // Share functionality
  const sharePost = (platform?: string) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const title = post.title;

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(title)}`,
          "_blank"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      default:
        if (navigator.share) {
          navigator
            .share({
              title,
              text: post.excerpt,
              url,
            })
            .catch((err) => console.error("Error sharing:", err));
        } else {
          // Fallback to clipboard copy
          navigator.clipboard
            .writeText(url)
            .then(() => toast.success("Link copied to clipboard!"))
            .catch(() => toast.error("Failed to copy link"));
        }
    }

    setShowShareMenu(false);
  };

  return (
    <article className="relative max-w-3xl mx-auto">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 z-50 w-full h-1 bg-gray-200 dark:bg-gray-800">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-400 text-sm mb-6 gap-x-6 gap-y-2">
          {/* Author info */}
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            <span>{post.author?.name || "Anonymous"}</span>
          </div>

          {/* Date */}
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formattedDate}</span>
          </div>

          {/* Reading time */}
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{readingTime}</span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg overflow-hidden mb-6">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <span className="text-gray-400 dark:text-gray-600">
                No Cover Image
              </span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?category=${tag}`}
              className="flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-colors"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Link>
          ))}
        </div>

        {/* Author actions */}
        {isAuthor && (
          <div className="flex items-center gap-4 mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Author Actions:
            </span>
            <Link
              href={`/blog/edit/${post.slug}`}
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Link>
            <button
              onClick={onDelete}
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 text-sm"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </button>
          </div>
        )}
      </header>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none dark:prose-invert mb-10 prose-img:rounded-lg prose-a:text-blue-600 dark:prose-a:text-blue-400">
        <MDXRenderer content={post.content} />
      </div>

      {/* Article Footer */}
      <footer className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
        {/* Action buttons */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <ThumbsUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {likes}
              </span>
            </button>

            <button
              onClick={toggleBookmark}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
                isBookmarked
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span className="text-sm">
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Share2 className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Share
                </span>
              </button>

              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 z-10"
                >
                  <button
                    onClick={() => sharePost("twitter")}
                    className="flex items-center gap-2 w-full p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <Twitter className="w-4 h-4 text-blue-400" />
                    Share on Twitter
                  </button>
                  <button
                    onClick={() => sharePost("facebook")}
                    className="flex items-center gap-2 w-full p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <Facebook className="w-4 h-4 text-blue-600" />
                    Share on Facebook
                  </button>
                  <button
                    onClick={() => sharePost("linkedin")}
                    className="flex items-center gap-2 w-full p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <Linkedin className="w-4 h-4 text-blue-800" />
                    Share on LinkedIn
                  </button>
                  <button
                    onClick={() => sharePost()}
                    className="flex items-center gap-2 w-full p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <Link2 className="w-4 h-4" />
                    Copy Link
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          <Link
            href="/blog"
            className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
          >
            ← Back to Blog
          </Link>
        </div>

        {/* Author bio */}
        <div className="flex items-start gap-4 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            {post.author?.avatar ? (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                {post.author?.name.charAt(0) || "A"}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {post.author?.name || "Anonymous"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Author of this post and other amazing content
            </p>
            <div className="flex gap-2 mt-2">
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Follow
              </a>
              <span className="text-gray-400">•</span>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                See all posts
              </a>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
}
