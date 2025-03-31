import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  publishedAt: string;
  imageUrl?: string;
}

// Get the path to the JSON file
const dataFilePath = path.join(process.cwd(), "data", "posts.json");

// Helper function to read posts
const readPosts = (): Post[] => {
  try {
    const fileData = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    return [];
  }
};

// Helper function to write posts
const writePosts = (posts: Post[]) => {
  try {
    const fileDirectory = path.dirname(dataFilePath);

    // Create directory if it doesn't exist
    if (!fs.existsSync(fileDirectory)) {
      fs.mkdirSync(fileDirectory, { recursive: true });
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing posts:", error);
    return false;
  }
};

// Generate a slug from a title
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-");
};

// GET handler - retrieve a single post
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const posts = readPosts();

  // First, try to find by id
  let post = posts.find((post) => post.id === params.slug);

  // If not found by id, try to find by slug
  if (!post) {
    post = posts.find((post) => post.slug === params.slug);
  }

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

// PUT handler - update a post
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const posts = readPosts();

  // Try to find the post by id
  let postIndex = posts.findIndex((post) => post.id === params.slug);

  // If not found by id, try to find by slug
  if (postIndex === -1) {
    postIndex = posts.findIndex((post) => post.slug === params.slug);
  }

  if (postIndex === -1) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  // Get the request body
  const { title, content, imageUrl } = await request.json();

  // Update the post
  posts[postIndex] = {
    ...posts[postIndex],
    title,
    content,
    slug: generateSlug(title),
    imageUrl,
  };

  // Write the updated posts
  const success = writePosts(posts);

  if (!success) {
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }

  return NextResponse.json(posts[postIndex]);
}

// DELETE handler - delete a post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const posts = readPosts();

  // Try to find the post by id
  let postIndex = posts.findIndex((post) => post.id === params.slug);

  // If not found by id, try to find by slug
  if (postIndex === -1) {
    postIndex = posts.findIndex((post) => post.slug === params.slug);
  }

  if (postIndex === -1) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  // Remove the post
  posts.splice(postIndex, 1);

  // Write the updated posts
  const success = writePosts(posts);

  if (!success) {
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
