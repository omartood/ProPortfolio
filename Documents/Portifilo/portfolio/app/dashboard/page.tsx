"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/dashboard/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, PenSquare, Plus } from "lucide-react";

export default function DashboardPage() {
  const [postCount, setPostCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/blog");
        const posts = await response.json();
        setPostCount(posts.length);
      } catch (error) {
        console.error("Error fetching data:", error);
        setPostCount(0);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <PageHeader
        heading="Dashboard"
        text="Manage your blog posts and website content."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <Link href="/dashboard/blog">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle>Blog Posts</CardTitle>
              <CardDescription>Manage your blog content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-primary mr-2" />
                <span className="text-2xl font-bold">
                  {isLoading ? "—" : postCount}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <span className="text-sm text-muted-foreground">
                View and edit all your blog posts
              </span>
            </CardFooter>
          </Card>
        </Link>

        <Link href="/dashboard/blog/new">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle>Create New Post</CardTitle>
              <CardDescription>Write a new blog post</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <PenSquare className="h-8 w-8 text-primary mr-2" />
                <Plus className="h-6 w-6" />
              </div>
            </CardContent>
            <CardFooter>
              <span className="text-sm text-muted-foreground">
                Start writing a new blog post
              </span>
            </CardFooter>
          </Card>
        </Link>
      </div>
    </div>
  );
}
