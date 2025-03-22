"use client";

import React from "react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function AIAgentPage() {
  return (
    <div>
      <Navbar />

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Toodagent: AI Assistant
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Interact with my AI assistant to help with your web development
              and programming needs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card border border-border rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-0">
              <iframe
                id="JotFormIFrame-01959c7d0f2d796092a3016793901c454ffa"
                title="Toodagent: Full-Stack Developer"
                allowTransparency={true}
                allow="geolocation; microphone; camera; fullscreen"
                src="https://agent.jotform.com/01959c7d0f2d796092a3016793901c454ffa?embedMode=iframe&background=1&shadow=1"
                frameBorder="0"
                style={{
                  minWidth: "100%",
                  maxWidth: "100%",
                  height: "688px",
                  border: "none",
                  width: "100%",
                }}
                scrolling="no"
              ></iframe>
              <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                  __html: `
                  document.addEventListener('DOMContentLoaded', function() {
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
                    script.async = true;
                    script.onload = function() {
                      window.jotformEmbedHandler("iframe[id='JotFormIFrame-01959c7d0f2d796092a3016793901c454ffa']", "https://www.jotform.com");
                    };
                    document.body.appendChild(script);
                  });
                `,
                }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <h2 className="text-xl font-semibold mb-4">About Toodagent</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Toodagent is powered by advanced AI and can help you with
              programming questions, project ideas, coding challenges, and more.
              Feel free to ask anything related to web development, software
              engineering, or technology.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
