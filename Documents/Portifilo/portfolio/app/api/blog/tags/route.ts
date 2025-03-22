import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  tags: string[];
}

// Path to blog posts data file
const dataFilePath = path.join(process.cwd(), "data", "blog-posts.json");

// Ensure data directory exists
const ensureDataDirExists = () => {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Get all blog posts
const getBlogPosts = (): BlogPostData[] => {
  ensureDataDirExists();

  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]));
    return [];
  }

  const fileContent = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(fileContent);
};

// GET: Fetch all unique tags with counts
export async function GET() {
  try {
    const posts = getBlogPosts();

    // Extract all tags from all posts and count them
    const tagCounts: Record<string, number> = {};

    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    // Convert to array of objects with tag name and count
    const tags = Object.entries(tagCounts).map(([name, count]) => ({
      name,
      count,
    }));

    // Sort by count (descending) and then by name (ascending)
    tags.sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      return a.name.localeCompare(b.name);
    });

    return NextResponse.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 }
    );
  }
}
