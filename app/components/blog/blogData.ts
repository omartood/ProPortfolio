import { BlogPost } from "@/app/types/blog";

export const blogPosts: BlogPost[] = [
  {
    id: "javascript-promises-async-await",
    slug: "javascript-promises-async-await",
    title: "Understanding JavaScript Promises and Async/Await",
    excerpt:
      "A comprehensive guide to working with asynchronous JavaScript using Promises and the async/await syntax.",
    date: "2024-03-20",
    author: {
      name: "Omar Jibril",
      avatar: "/images/avatar.jpg",
    },
    coverImage: "/images/blog/async-await.jpg",
    tags: ["JavaScript", "Async", "Programming"],
    readTime: "5 min read",
    content: `
# Understanding JavaScript Promises and Async/Await

JavaScript is a single-threaded language, but it can handle asynchronous operations efficiently using Promises and the async/await syntax...
    `,
  },
  {
    id: "building-a-modern-portfolio-with-nextjs",
    slug: "building-a-modern-portfolio-with-nextjs",
    title: "Building a Modern Portfolio Website with Next.js and Tailwind CSS",
    excerpt:
      "Learn how to create a stunning portfolio website using Next.js 14 and Tailwind CSS with modern best practices.",
    date: "2024-03-21",
    author: {
      name: "Omar Jibril",
      avatar: "/images/avatar.jpg",
    },
    coverImage: "/images/blog/portfolio.jpg",
    tags: ["Next.js", "Tailwind CSS", "Web Development"],
    readTime: "8 min read",
    content: `
# Building a Modern Portfolio Website with Next.js and Tailwind CSS

In this guide, we'll walk through the process of creating a modern, responsive portfolio website...
    `,
  },
  {
    id: "mastering-react-hooks",
    slug: "mastering-react-hooks",
    title: "Mastering React Hooks: A Comprehensive Guide",
    excerpt:
      "Deep dive into React Hooks and learn how to build more maintainable and efficient React applications.",
    date: "2024-03-22",
    author: {
      name: "Omar Jibril",
      avatar: "/images/avatar.jpg",
    },
    coverImage: "/images/blog/react-hooks.jpg",
    tags: ["React", "Hooks", "JavaScript"],
    readTime: "10 min read",
    content: `
# Mastering React Hooks: A Comprehensive Guide

React Hooks have revolutionized how we write React components. In this guide, we'll explore the most important hooks...
    `,
  },
  {
    id: "next-js-server-components",
    slug: "next-js-server-components",
    title: "Understanding Next.js Server Components",
    excerpt:
      "Learn how Server Components in Next.js 14 can improve your application's performance and developer experience.",
    date: "2024-03-23",
    author: {
      name: "Omar Jibril",
      avatar: "/images/avatar.jpg",
    },
    coverImage: "/images/blog/server-components.jpg",
    tags: ["Next.js", "React", "Performance"],
    readTime: "7 min read",
    content: `
# Understanding Next.js Server Components

Server Components are a revolutionary feature in Next.js that changes how we think about React applications...
    `,
  },
];
