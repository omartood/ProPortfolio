import fs from "fs";
import path from "path";
import { BlogPost } from "../components/blog/BlogCard";
import { blogPosts as initialBlogPosts } from "../components/blog/blogData";

// Path to the JSON file to store blog posts
const DB_PATH = path.join(process.cwd(), "data", "blogPosts.json");

// Ensure the data directory exists
function ensureDataDirectoryExists() {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Initialize the JSON file with default blog posts if it doesn't exist
export function initBlogStorage() {
  ensureDataDirectoryExists();

  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(
      DB_PATH,
      JSON.stringify(initialBlogPosts, null, 2),
      "utf8"
    );
    console.log("Blog posts database initialized with default data");
  }
}

// Get all blog posts
export function getAllBlogPosts(): BlogPost[] {
  try {
    initBlogStorage();
    const data = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(data) as BlogPost[];
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return initialBlogPosts;
  }
}

// Get a single blog post by ID
export function getBlogPostById(id: string): BlogPost | null {
  const posts = getAllBlogPosts();
  return posts.find((post) => post.id === id) || null;
}

// Add a new blog post
export function addBlogPost(post: BlogPost): BlogPost {
  const posts = getAllBlogPosts();

  // Check if post with same ID already exists
  const existingPostIndex = posts.findIndex((p) => p.id === post.id);

  if (existingPostIndex !== -1) {
    // Replace existing post
    posts[existingPostIndex] = post;
  } else {
    // Add new post to the beginning
    posts.unshift(post);
  }

  // Save to file
  fs.writeFileSync(DB_PATH, JSON.stringify(posts, null, 2), "utf8");
  return post;
}

// Update a blog post
export function updateBlogPost(
  id: string,
  updatedPost: Partial<BlogPost>
): BlogPost | null {
  const posts = getAllBlogPosts();
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    return null;
  }

  // Update the post
  posts[postIndex] = { ...posts[postIndex], ...updatedPost };

  // Save to file
  fs.writeFileSync(DB_PATH, JSON.stringify(posts, null, 2), "utf8");
  return posts[postIndex];
}

// Delete a blog post
export function deleteBlogPost(id: string): boolean {
  const posts = getAllBlogPosts();
  const initialLength = posts.length;

  const filteredPosts = posts.filter((post) => post.id !== id);

  if (filteredPosts.length === initialLength) {
    return false;
  }

  // Save to file
  fs.writeFileSync(DB_PATH, JSON.stringify(filteredPosts, null, 2), "utf8");
  return true;
}
