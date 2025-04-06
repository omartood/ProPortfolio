import { NextRequest, NextResponse } from "next/server";
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
  author?: {
    name: string;
    avatar?: string;
  };
}

// Path to blog posts data file
const dataFilePath = path.join(process.cwd(), "data", "blog-posts.json");

// Get all blog posts
const getBlogPosts = (): BlogPostData[] => {
  if (!fs.existsSync(dataFilePath)) {
    return [];
  }

  const fileContent = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(fileContent);
};

// Save blog posts to file
const saveBlogPosts = (posts: BlogPostData[]) => {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));
};

// GET: Get a specific blog post by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const posts = getBlogPosts();

    // First try to find by ID
    let post = posts.find((p) => p.id === params.id);

    // If not found by ID, try by slug
    if (!post) {
      post = posts.find((p) => p.slug === params.id);
    }

    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

// PUT: Update a blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const posts = getBlogPosts();
    const postIndex = posts.findIndex((p) => p.id === params.id);

    if (postIndex === -1) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    const updatedData = await request.json();

    // Check for duplicate slug with other posts
    const slugExists = posts.some(
      (p, i) => p.slug === updatedData.slug && i !== postIndex
    );

    if (slugExists) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 400 }
      );
    }

    // Update the post
    const updatedPost = {
      ...posts[postIndex],
      ...updatedData,
      // Don't allow overriding the ID
      id: params.id,
    };

    posts[postIndex] = updatedPost;
    saveBlogPosts(posts);

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const posts = getBlogPosts();
    const postIndex = posts.findIndex((p) => p.id === params.id);

    if (postIndex === -1) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Remove the post
    const removedPost = posts.splice(postIndex, 1)[0];
    saveBlogPosts(posts);

    return NextResponse.json({ success: true, post: removedPost });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
