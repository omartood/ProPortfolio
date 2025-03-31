import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

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

// Save blog posts to file
const saveBlogPosts = (posts: BlogPostData[]) => {
  ensureDataDirExists();
  fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));
};

// GET: Fetch all blog posts
export async function GET() {
  try {
    const posts = getBlogPosts();

    // Sort by publishedAt date (newest first)
    posts.sort(
      (a: BlogPostData, b: BlogPostData) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

// POST: Create a new blog post
export async function POST(request: NextRequest) {
  try {
    const postData = await request.json();

    // Validate required fields
    if (!postData.title || !postData.slug || !postData.content) {
      return NextResponse.json(
        { error: "Title, slug, and content are required" },
        { status: 400 }
      );
    }

    const posts = getBlogPosts();

    // Check for duplicate slug
    if (posts.some((post: BlogPostData) => post.slug === postData.slug)) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 400 }
      );
    }

    // Create new post
    const newPost: BlogPostData = {
      id: uuidv4(),
      title: postData.title,
      slug: postData.slug,
      excerpt: postData.excerpt || "",
      content: postData.content,
      coverImage: postData.coverImage || "",
      publishedAt: postData.publishedAt || new Date().toISOString(),
      tags: postData.tags || [],
    };

    // Add to posts and save
    posts.push(newPost);
    saveBlogPosts(posts);

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
