"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/navigation/Navbar";
import Footer from "../../components/Footer";
import { confirmDelete } from "@/app/utils/confirmDialog";
import { promiseToast } from "@/app/utils/toast";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  Bookmark,
  Share2,
  ThumbsUp,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { formatDate } from "@/lib/utils";

// BlogPost interface
interface BlogPost {
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
  date?: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);
  const articleRef = useRef<HTMLElement>(null);

  // Set up scroll listener for reading progress
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;

      const element = articleRef.current;
      const totalHeight = element.clientHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (totalHeight - windowHeight <= 0) return;

      const scrolled = Math.min(
        100,
        Math.max(0, (scrollTop / (totalHeight - windowHeight)) * 100)
      );

      setReadingProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if post is bookmarked on initial load
  useEffect(() => {
    const checkBookmarked = () => {
      const bookmarks = JSON.parse(
        localStorage.getItem("blogBookmarks") || "[]"
      );
      setIsBookmarked(bookmarks.includes(slug));
    };

    const checkLikes = () => {
      const likedPosts = JSON.parse(localStorage.getItem("blogLikes") || "{}");
      setLikes(post?.id ? likedPosts[post.id] || 0 : 0);
    };

    checkBookmarked();
    if (post) checkLikes();
  }, [slug, post]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch post by slug using the main API endpoint
        const postResponse = await fetch(`/api/blog/${slug}`);

        if (!postResponse.ok) {
          if (postResponse.status === 404) {
            setPost(null);
            setLoading(false);
            return;
          }
          throw new Error("Failed to fetch blog post");
        }

        const currentPost = await postResponse.json();
        console.log("Fetched post:", currentPost);

        // Format date and add missing fields if needed
        const formattedPost = {
          ...currentPost,
          author: currentPost.author || {
            name: "Omar Jibril Abdulkadir",
          },
          date:
            currentPost.date ||
            new Date(currentPost.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          readTime:
            currentPost.readTime ||
            `${Math.ceil(currentPost.content.length / 1000)} min read`,
        };

        setPost(formattedPost);

        // Fetch all posts for related posts
        const allPostsResponse = await fetch("/api/blog");
        if (!allPostsResponse.ok) {
          throw new Error("Failed to fetch related posts");
        }

        const allPosts = await allPostsResponse.json();

        // Find related posts with similar tags, excluding the current post
        const related = allPosts
          .filter(
            (p: BlogPost) =>
              p.slug !== slug &&
              p.tags.some((tag: string) => formattedPost.tags.includes(tag))
          )
          .slice(0, 3);

        // Format related posts
        const formattedRelated = related.map((post: BlogPost) => ({
          ...post,
          date:
            post.date ||
            new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          readTime:
            post.readTime ||
            `${Math.ceil(post.content.length / 1000)} min read`,
        }));

        setRelatedPosts(formattedRelated);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load blog post. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  const handleDeleteClick = async () => {
    const confirmed = await confirmDelete("blog post");
    if (confirmed) {
      await handleDeletePost();
    }
  };

  const handleDeletePost = async () => {
    if (!post || !post.id) return;

    setIsDeleting(true);

    const deletePost = async () => {
      // Call the API to delete the post
      const response = await fetch(`/api/blog/${post.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      return response.json();
    };

    try {
      await promiseToast(deletePost(), {
        loading: "Deleting post...",
        success: "Post deleted successfully!",
        error: "Error deleting post. Please try again.",
      });

      // Redirect to the blog page
      router.push("/blog");
    } catch (error) {
      console.error("Error deleting post:", error);
      setIsDeleting(false);
    }
  };

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("blogBookmarks") || "[]");
    let newBookmarks;

    if (isBookmarked) {
      newBookmarks = bookmarks.filter(
        (bookmarked: string) => bookmarked !== slug
      );
    } else {
      newBookmarks = [...bookmarks, slug];
    }

    localStorage.setItem("blogBookmarks", JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = () => {
    if (!post?.id) return;

    const likedPosts = JSON.parse(localStorage.getItem("blogLikes") || "{}");
    const currentLikes = likedPosts[post.id] || 0;
    const newLikes = currentLikes + 1;

    likedPosts[post.id] = newLikes;
    localStorage.setItem("blogLikes", JSON.stringify(likedPosts));
    setLikes(newLikes);
  };

  // Share functionality
  const sharePost = async () => {
    if (!post) return;

    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback - copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  // Calculate reading time sections
  const getReadingSections = () => {
    if (!post || !post.content) return [];

    const wordCount = post.content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200); // Assuming 200 words per minute reading speed

    if (minutes <= 3) return [minutes];

    // Create sections for longer articles
    const sections = [];
    const sectionCount = Math.min(5, Math.ceil(minutes / 2));
    const sectionSize = minutes / sectionCount;

    for (let i = 1; i <= sectionCount; i++) {
      sections.push(Math.round(i * sectionSize));
    }

    return sections;
  };

  // Loading state
  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-6"></div>
            <p className="text-muted-foreground">Loading blog post...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 mb-4 text-2xl">⚠️</div>
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p className="text-muted-foreground mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Post not found state
  if (!post) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The blog post you're looking for doesn't exist or has been
              removed.
            </p>
            <Link
              href="/blog"
              className="bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Check if this is a post created from the editor
  const isCreatedPost =
    !post.id.includes("mastering-react") &&
    !post.id.includes("building-a-modern-portfolio-with-nextjs");

  const readingSections = getReadingSections();

  return (
    <div>
      <Navbar />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 z-50 w-full h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <article className="pt-20 pb-16" ref={articleRef}>
        {/* Back Button and Actions */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex justify-between items-center">
            <Link
              href="/blog"
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all posts
            </Link>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleBookmark}
                className={`flex items-center gap-1.5 text-sm ${
                  isBookmarked
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Bookmark
                  className="h-4 w-4"
                  fill={isBookmarked ? "currentColor" : "none"}
                />
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </button>

              <button
                onClick={sharePost}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="w-full aspect-[21/9] relative bg-muted overflow-hidden mb-10">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5"></div>
          )}
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0">
          {/* Title and Meta */}
          <header className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1.5" />
                <span>{post.author?.name || "Omar Jibril Abdulkadir"}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1.5" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1.5" />
                <span>
                  {post.readTime ||
                    `${Math.ceil(post.content.length / 1000)} min read`}
                </span>
              </div>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?category=${tag}`}
                    className="flex items-center text-xs bg-muted hover:bg-muted/80 px-2.5 py-1 rounded-full transition-colors"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </header>

          {/* Excerpt as intro paragraph */}
          {post.excerpt && (
            <div className="mb-10">
              <p className="text-xl text-muted-foreground italic leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          )}

          {/* Reading time indicator */}
          {readingSections.length > 1 && (
            <div className="mb-10 flex items-center justify-center">
              <div className="w-full max-w-xs bg-muted h-1.5 rounded-full overflow-hidden">
                {readingSections.map((minute, index) => (
                  <div
                    key={index}
                    className="relative h-full"
                    style={{
                      left: `${
                        (minute / readingSections[readingSections.length - 1]) *
                        100
                      }%`,
                      transform: "translateX(-50%)",
                      position: "absolute",
                    }}
                  >
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <div className="absolute -bottom-6 transform -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
                      {minute} min
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="prose lg:prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-lg max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Like button */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleLike}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                <ThumbsUp className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="text-sm text-muted-foreground">
                {likes > 0
                  ? `${likes} ${likes === 1 ? "like" : "likes"}`
                  : "Like this post"}
              </span>
            </button>
          </div>

          {/* Author info */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-muted overflow-hidden">
                {post.author?.avatar ? (
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <User className="h-6 w-6" />
                  </div>
                )}
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-medium text-lg">
                  {post.author?.name || "Omar Jibril Abdulkadir"}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Full Stack Developer and Technical Writer
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
