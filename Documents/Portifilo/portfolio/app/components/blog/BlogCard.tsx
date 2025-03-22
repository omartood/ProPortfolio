"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
  };
  content?: string;
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex flex-col h-full bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="block aspect-video relative overflow-hidden bg-muted"
      >
        {post.coverImage ? (
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-105"
            style={{ backgroundImage: `url(${post.coverImage})` }}
          ></div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
            <span className="text-muted-foreground">Featured Image</span>
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-grow p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              href={`/blog?category=${tag}`}
              className="px-2 py-1 bg-muted rounded-full text-xs font-medium hover:bg-muted/80 transition-colors"
            >
              {tag}
            </Link>
          ))}
          {post.tags.length > 3 && (
            <span className="px-2 py-1 bg-muted rounded-full text-xs font-medium">
              +{post.tags.length - 3}
            </span>
          )}
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-primary transition-colors duration-300">
            {post.title}
          </h3>
        </Link>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto text-xs text-muted-foreground">
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </motion.article>
  );
}
