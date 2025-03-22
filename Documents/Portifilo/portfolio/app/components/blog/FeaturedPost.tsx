"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BlogPost } from "./BlogCard";

interface FeaturedPostProps {
  post: BlogPost;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-card border border-border rounded-xl overflow-hidden shadow-md mb-12"
    >
      <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden">
        {post.coverImage && post.coverImage.startsWith("data:") ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        ) : post.coverImage ? (
          <div className="relative w-full h-full">
            <img
              src={post.coverImage}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <p className="text-center text-muted-foreground text-sm p-4">
              Featured Blog Image
              <br />
              (Recommended size: 1200x800px)
            </p>
          </div>
        )}
      </div>

      <div className="p-8 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
            Featured
          </span>
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
          <span className="text-muted-foreground text-xs ml-auto">
            {post.readTime}
          </span>
        </div>

        <Link href={`/blog/${post.id}`}>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 hover:text-primary transition-colors duration-300">
            {post.title}
          </h2>
        </Link>

        <p className="text-muted-foreground mb-6 flex-grow">{post.excerpt}</p>

        <div className="flex items-center gap-4 mt-auto">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted">
            {/* Replace with actual avatar when available */}
            {/* <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className="object-cover"
            /> */}
          </div>
          <div>
            <p className="font-medium">{post.author.name}</p>
            <p className="text-sm text-muted-foreground">{post.date}</p>
          </div>

          <Link
            href={`/blog/${post.id}`}
            className="ml-auto bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center gap-2"
          >
            Read Article
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
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
