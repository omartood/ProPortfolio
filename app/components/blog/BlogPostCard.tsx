"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  tags: string[];
  content: string;
}

interface BlogPostCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogPostCard({ post, index }: BlogPostCardProps) {
  // Estimate read time
  const calculateReadTime = () => {
    const words = post.content.split(/\s+/).length;
    const readTime = Math.ceil(words / 225);
    return readTime === 1 ? "1 minute read" : `${readTime} minutes read`;
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Post image */}
      <Link
        href={`/blog/${post.slug}`}
        className="overflow-hidden aspect-video relative"
      >
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Post content */}
      <div className="flex flex-col justify-between flex-grow p-6">
        <div>
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.slice(0, 3).map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag}`}
                  className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs hover:bg-primary/10 transition-colors"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Link>
              ))}
              {post.tags.length > 3 && (
                <span className="inline-flex rounded-full bg-muted px-2.5 py-0.5 text-xs">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>

          {/* Excerpt */}
          <p className="text-muted-foreground line-clamp-2 mb-4">
            {post.excerpt}
          </p>
        </div>

        <div>
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            </div>
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>{calculateReadTime()}</span>
            </div>
          </div>

          {/* Read more link */}
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Read more <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
