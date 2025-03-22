"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <section id="about" ref={ref} className="py-20 px-6 bg-card/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="relative">
            <motion.div
              variants={itemVariants}
              className="relative z-10 bg-card border border-border rounded-3xl overflow-hidden shadow-lg"
            >
              {/* About image */}
              <div className="aspect-[4/5] relative">
                <Image
                  src="/images/image-2.png"
                  alt="Omar Jibril Abdulkadir"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              variants={itemVariants}
              className="absolute top-10 -left-5 w-full h-full bg-accent/5 rounded-3xl -z-10 transform -rotate-6"
            ></motion.div>
          </div>

          <motion.div
            variants={containerVariants}
            className="flex flex-col gap-6"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2"
            >
              <div className="h-1 w-10 bg-primary rounded-full"></div>
              <p className="text-muted-foreground font-medium">About Me</p>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold"
            >
              Professional <span className="text-primary">Web Developer</span>{" "}
              with a passion for creating meaningful experiences
            </motion.h2>

            <motion.p variants={itemVariants} className="text-muted-foreground">
              I'm a passionate web developer with expertise in creating modern,
              responsive websites and applications. With a strong background in
              frontend development, I focus on delivering pixel-perfect,
              accessible, and performant user experiences.
            </motion.p>

            <motion.p variants={itemVariants} className="text-muted-foreground">
              My journey in web development began 5 years ago, and since then,
              I've had the opportunity to work on a variety of projects, from
              small business websites to complex web applications. I'm
              constantly learning and staying up-to-date with the latest
              technologies and best practices.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
            >
              <div className="flex items-start gap-2">
                <div className="text-primary mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Frontend Development</h3>
                  <p className="text-sm text-muted-foreground">
                    Creating beautiful, responsive UIs with modern frameworks
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="text-primary mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Backend Development</h3>
                  <p className="text-sm text-muted-foreground">
                    Building robust and scalable server-side solutions
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="text-primary mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Responsive Design</h3>
                  <p className="text-sm text-muted-foreground">
                    Creating websites that work on all devices
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="text-primary mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Performance Optimization</h3>
                  <p className="text-sm text-muted-foreground">
                    Making websites fast and efficient
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
