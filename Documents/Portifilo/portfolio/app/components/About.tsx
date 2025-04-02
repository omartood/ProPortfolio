"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "SQL",
    "Git",
    "Docker",
    "AWS",
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative h-[400px] lg:h-[500px] mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-20 dark:opacity-30" />
            <Image
              src="/images/profile.jpg"
              alt="Omar Tood"
              fill
              className="object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-xl"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-bold">About Me</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              I'm a passionate full-stack developer with a strong foundation in
              web development and a keen eye for creating beautiful,
              user-friendly applications. With several years of experience in
              the industry, I've worked on various projects ranging from small
              business websites to complex enterprise applications.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              My approach to development combines technical expertise with
              creative problem-solving, ensuring that every project I work on is
              not only functional but also delivers an exceptional user
              experience.
            </p>

            {/* Skills */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Experience</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Senior Full Stack Developer</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Company Name • 2020 - Present
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Full Stack Developer</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Company Name • 2018 - 2020
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
