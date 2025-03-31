"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import MDXRenderer from "./MDXRenderer";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  tags: string[];
}

interface BlogPostViewProps {
  post: BlogPost;
}

export default function BlogPostView({ post }: BlogPostViewProps) {
  // Estimate read time (rough calculation: average reading speed is ~225 words per minute)
  const calculateReadTime = () => {
    const words = post.content.split(/\s+/).length;
    const readTime = Math.ceil(words / 225);
    return readTime === 1 ? "1 minute read" : `${readTime} minutes read`;
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      {/* Back to blog button */}
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link
            href="/blog"
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all posts
          </Link>
        </Button>
      </div>

      {/* Post header */}
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-6">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{calculateReadTime()}</span>
          </div>
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag}`}
                className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm hover:bg-primary/10 transition-colors"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Cover image */}
        <div className="rounded-xl overflow-hidden aspect-video relative mb-10">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      </header>

      {/* Post content */}
      <div className="prose dark:prose-invert max-w-none">
        <MDXRenderer content={post.content} />
      </div>

      {/* Post footer */}
      <div className="mt-16 border-t border-border pt-6">
        <div className="flex justify-between items-center">
          <Button variant="ghost" asChild>
            <Link
              href="/blog"
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all posts
            </Link>
          </Button>

          <div className="flex gap-4">
            {post.tags.slice(0, 2).map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag}`}
                className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm hover:bg-primary/10 transition-colors"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
