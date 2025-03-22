import Navbar from "./components/navigation/Navbar";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import Skills from "./components/skills/Skills";
import Projects from "./components/projects/Projects";
import AIExpertise from "./components/ai/AIExpertise";
import Testimonials from "./components/testimonials/Testimonials";
import Gallery from "./components/gallery/Gallery";
import BlogSection from "./components/blog/BlogSection";
import Contact from "./components/contact/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <AIExpertise />
      <Gallery />
      <Testimonials />
      <BlogSection />
      <Contact />
      <Footer />
    </main>
  );
}
