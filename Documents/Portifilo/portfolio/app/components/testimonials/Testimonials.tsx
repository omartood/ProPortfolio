"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Add your testimonials here
const testimonials = [
  {
    id: 1,
    content:
      "Working with this developer was an absolute pleasure. They delivered the project on time and exceeded all our expectations with their attention to detail and creative solutions.",
    name: "Alex Johnson",
    position: "CEO, TechStartup",
    image: "/placeholder-avatar.jpg",
  },
  {
    id: 2,
    content:
      "I've worked with many developers, but few have the combination of technical skill and design sense that they possess. Our website has received countless compliments since the redesign.",
    name: "Sarah Williams",
    position: "Marketing Director, DesignCo",
    image: "/placeholder-avatar.jpg",
  },
  {
    id: 3,
    content:
      "The e-commerce platform they built for us increased our sales by 40% in the first month. Their knowledge of both frontend and backend technologies made the entire process seamless.",
    name: "Michael Chen",
    position: "Founder, RetailBrand",
    image: "/placeholder-avatar.jpg",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const testimonialVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.3 },
    },
  };

  const handlePrev = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" ref={ref} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-12"
        >
          <div className="text-center mb-6">
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 justify-center"
            >
              <div className="h-1 w-10 bg-primary rounded-full"></div>
              <p className="text-muted-foreground font-medium">Testimonials</p>
              <div className="h-1 w-10 bg-primary rounded-full"></div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mt-4"
            >
              What My <span className="text-primary">Clients Say</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-muted-foreground max-w-2xl mx-auto mt-4"
            >
              Don't just take my word for it - here's what clients and
              colleagues have to say about working with me.
            </motion.p>
          </div>

          <motion.div
            variants={itemVariants}
            className="relative max-w-4xl mx-auto"
          >
            {/* Background Elements */}
            <div className="absolute -top-6 -left-6 text-6xl text-primary opacity-20">
              "
            </div>
            <div className="absolute -bottom-6 -right-6 text-6xl text-primary opacity-20 rotate-180">
              "
            </div>

            {/* Testimonial Carousel */}
            <div className="relative overflow-hidden py-10 px-4 md:px-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  variants={testimonialVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-4 border-primary/20">
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      {/* Replace with actual image */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10 text-primary/40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                  </div>
                  <p className="text-lg md:text-xl italic mb-6">
                    {testimonials[currentTestimonial].content}
                  </p>
                  <h4 className="font-bold">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[currentTestimonial].position}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-full bg-card border border-border hover:bg-primary/5 transition-colors duration-300"
                  aria-label="Previous testimonial"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <div className="flex items-center gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentTestimonial(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                        i === currentTestimonial
                          ? "bg-primary"
                          : "bg-border hover:bg-primary/30"
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    ></button>
                  ))}
                </div>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-full bg-card border border-border hover:bg-primary/5 transition-colors duration-300"
                  aria-label="Next testimonial"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
