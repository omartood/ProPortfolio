"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/navigation/Navbar";
import Footer from "../../components/Footer";

export default function JavaScriptPromisesPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the dynamic blog post page
    router.push("/blog/javascript-promises-async-await");
  }, [router]);

  return (
    <div>
      <Navbar />
      <div className="pt-24 pb-20 px-6 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-6"></div>
          <p className="text-muted-foreground">Loading blog post...</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
