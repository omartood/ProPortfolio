"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// AI technologies and frameworks
const aiTechnologies = [
  {
    name: "OpenAI",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    category: "LLM Platform",
  },
  {
    name: "LangChain",
    icon: "https://www.vectorlogo.zone/logos/langchain/langchain-icon.svg",
    category: "LLM Framework",
  },
  {
    name: "TensorFlow",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    category: "Framework",
  },
  {
    name: "PyTorch",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
    category: "Framework",
  },
  {
    name: "Hugging Face",
    icon: "https://upload.wikimedia.org/wikipedia/commons/8/83/Hugging_Face_logo.svg",
    category: "AI Platform",
  },
  {
    name: "Claude",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", // Using a generic AI icon since Claude doesn't have a public icon
    category: "LLM",
  },
  {
    name: "Scikit-Learn",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
    category: "Library",
  },
  {
    name: "Keras",
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Keras_logo.svg",
    category: "Framework",
  },
  {
    name: "Pandas",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
    category: "Library",
  },
  {
    name: "NumPy",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
    category: "Library",
  },
  {
    name: "OpenCV",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
    category: "Library",
  },
  {
    name: "Jupyter",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
    category: "Tool",
  },
];

// AI domains and specializations
const aiDomains = [
  {
    title: "Machine Learning",
    description:
      "Building models that can learn patterns from data and make predictions or decisions without explicit programming.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2v8m0 12V12m0 0L2 9m10 3l10-3" />
      </svg>
    ),
  },
  {
    title: "Prompt Engineering",
    description:
      "Crafting and optimizing prompts for large language models to achieve specific tasks and generate high-quality outputs.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2" />
        <path d="M8 11h8" />
        <path d="M10 15h4" />
        <path d="M8 7h8" />
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      </svg>
    ),
  },
  {
    title: "Computer Vision",
    description:
      "Developing systems that can interpret and understand visual information from images and videos.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="2" />
        <path d="M12 19c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
        <path d="M12 5v2m0 10v2m-7-7H3m18 0h-2" />
      </svg>
    ),
  },
  {
    title: "Natural Language Processing",
    description:
      "Creating systems capable of understanding, interpreting, and generating human language text.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2M7 10h8m-8 5h2m-2-5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2" />
      </svg>
    ),
  },
  {
    title: "Deep Learning",
    description:
      "Leveraging neural networks with many layers to model complex patterns and solve challenging AI problems.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
        <line x1="6" y1="6" x2="18" y2="18" />
        <line x1="6" y1="18" x2="18" y2="6" />
      </svg>
    ),
  },
];

export default function AIExpertise() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id="ai" ref={ref} className="py-20 px-6 bg-card/50">
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
              <p className="text-muted-foreground font-medium">
                AI & Machine Learning
              </p>
              <div className="h-1 w-10 bg-primary rounded-full"></div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mt-4"
            >
              Artificial <span className="text-primary">Intelligence</span>{" "}
              Expertise
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-muted-foreground max-w-2xl mx-auto mt-4"
            >
              Leveraging the power of AI and machine learning to build
              intelligent systems and solutions that solve complex problems and
              drive innovation.
            </motion.p>
          </div>

          {/* AI Domains */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {aiDomains.map((domain, i) => (
              <motion.div
                key={domain.title}
                custom={i}
                variants={cardVariants}
                className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div className="text-primary mb-4">{domain.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{domain.title}</h3>
                <p className="text-muted-foreground text-sm flex-grow">
                  {domain.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* AI Technologies */}
          <motion.div variants={containerVariants} className="mt-12">
            <motion.h3
              variants={itemVariants}
              className="text-xl font-semibold mb-6 text-center"
            >
              AI Technologies & Tools
            </motion.h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 justify-items-center">
              {aiTechnologies.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  custom={i}
                  variants={cardVariants}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-16 h-16 bg-card border border-border rounded-xl p-3 shadow-sm flex items-center justify-center hover:border-primary/50 hover:shadow-md transition-all duration-300">
                    <div className="relative w-full h-full">
                      <Image
                        src={tech.icon}
                        alt={tech.name}
                        width={40}
                        height={40}
                        className="object-contain w-full h-full dark:bg-white dark:p-1 dark:rounded-md"
                      />
                    </div>
                  </div>
                  <span className="text-xs font-medium">{tech.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {tech.category}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Projects Highlight */}
          <motion.div variants={containerVariants} className="mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <motion.div
                variants={itemVariants}
                className="order-2 lg:order-1"
              >
                <h3 className="text-2xl font-bold mb-4">
                  Building Intelligent Solutions
                </h3>
                <p className="text-muted-foreground mb-4">
                  My expertise in AI and machine learning enables me to develop
                  cutting-edge solutions that can understand data, learn from
                  patterns, and make intelligent decisions.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
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
                    <p className="text-sm">
                      <span className="font-medium">Prompt Engineering:</span>{" "}
                      Optimizing LLM interactions for enhanced results
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
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
                    <p className="text-sm">
                      <span className="font-medium">Predictive Analytics:</span>{" "}
                      Building models that can forecast trends and outcomes
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
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
                    <p className="text-sm">
                      <span className="font-medium">NLP Applications:</span>{" "}
                      Creating intelligent text processing and analysis tools
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
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
                    <p className="text-sm">
                      <span className="font-medium">
                        Data-Driven Automation:
                      </span>{" "}
                      Automating complex processes using ML models
                    </p>
                  </li>
                </ul>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="order-1 lg:order-2 relative"
              >
                <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl h-64 md:h-80 flex items-center justify-center overflow-hidden">
                  <div className="relative z-10 p-6 text-center">
                    <div className="text-primary mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-16 h-16 mx-auto"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="18" cy="18" r="3" />
                        <circle cx="6" cy="6" r="3" />
                        <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                        <path d="M11 18H8a2 2 0 0 1-2-2V9" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold mb-2">
                      AI-Powered Solutions
                    </h4>
                    <p className="text-sm">
                      Transforming businesses and user experiences through
                      intelligent AI applications
                    </p>
                  </div>
                  {/* Background decorative elements */}
                  <div className="absolute top-0 left-0 w-full h-full opacity-20">
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-primary/40"></div>
                    <div className="absolute bottom-8 right-8 w-20 h-20 rounded-full bg-accent/40"></div>
                    <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-primary/30"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
