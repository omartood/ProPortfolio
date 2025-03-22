"use client";

import { PageHeader } from "@/components/dashboard/PageHeader";
import BlogPostForm from "@/components/blog/BlogPostForm";

export default function NewBlogPostPage() {
  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <PageHeader
        heading="Create Blog Post"
        text="Write and publish a new blog post."
      />

      <div className="mt-8">
        <BlogPostForm />
      </div>
    </div>
  );
}
