"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

type FeaturedPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
  slug: string;
};

const featuredPosts: FeaturedPost[] = [
  {
    id: "1",
    title: "Getting Started with Machine Learning in 2023",
    excerpt:
      "A beginner's guide to understanding machine learning concepts and implementing your first ML model.",
    date: "Jun 15, 2023",
    category: "Machine Learning",
    imageUrl: "/images/images-3.png",
    slug: "getting-started-with-machine-learning",
  },
  {
    id: "2",
    title: "The Future of AI in Web Development",
    excerpt:
      "How artificial intelligence is transforming the way we build and interact with web applications.",
    date: "Jul 22, 2023",
    category: "AI",
    imageUrl: "/blog/ai-web-dev.jpg",
    slug: "future-of-ai-in-web-development",
  },
  {
    id: "3",
    title: "Building Responsive UIs with React and Tailwind",
    excerpt:
      "Learn how to combine React and Tailwind CSS to create beautiful, responsive user interfaces.",
    date: "Aug 10, 2023",
    category: "Web Development",
    imageUrl: "/blog/react-tailwind.jpg",
    slug: "building-responsive-uis-with-react-and-tailwind",
  },
];

export default function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="blog" ref={ref} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-12"
        >
          <div className="text-center mb-6">
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 justify-center"
            >
              <div className="h-1 w-10 bg-primary rounded-full"></div>
              <p className="text-muted-foreground font-medium">Blog</p>
              <div className="h-1 w-10 bg-primary rounded-full"></div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mt-4"
            >
              Featured <span className="text-primary">Articles</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-muted-foreground max-w-2xl mx-auto mt-4"
            >
              Insights, tutorials, and thoughts on AI, machine learning, and web
              development
            </motion.p>
          </div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary/80 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-xs text-muted-foreground mb-2">
                    {post.date}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors duration-300">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1 mt-auto transition-colors duration-300"
                  >
                    Read article
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
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center mt-8">
            <Link
              href="/blog"
              className="bg-primary hover:bg-primary/90 text-white py-2.5 px-6 rounded-lg inline-flex items-center gap-2 transition-colors duration-300"
            >
              View all articles
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
