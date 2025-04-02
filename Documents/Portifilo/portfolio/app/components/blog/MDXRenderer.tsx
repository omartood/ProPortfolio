"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Image from "next/image";

interface MDXRendererProps {
  content: string;
}

export default function MDXRenderer({ content }: MDXRendererProps) {
  return (
    <div className="prose dark:prose-invert max-w-none prose-img:rounded-xl prose-img:mx-auto prose-headings:font-semibold prose-a:text-primary prose-code:rounded prose-pre:bg-transparent prose-pre:p-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xl font-bold mt-4 mb-2">{children}</h4>
          ),
          p: ({ children }) => (
            <p className="my-4 leading-relaxed">{children}</p>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside my-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside my-4">{children}</ol>
          ),
          li: ({ children }) => <li className="my-2">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 my-4 italic">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-8 border-border" />,
          img: ({ src, alt }) => {
            if (src) {
              return (
                <div className="relative my-8 rounded-xl overflow-hidden w-full">
                  <Image
                    src={src}
                    alt={alt || ""}
                    width={1200}
                    height={600}
                    className="object-cover mx-auto"
                  />
                </div>
              );
            }
            return null;
          },
          code: ({ className, children }) => {
            const match = /language-(\w+)/.exec(className || "");
            if (match) {
              return (
                <SyntaxHighlighter
                  style={atomDark}
                  language={match[1]}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              );
            }
            return (
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
                {children}
              </code>
            );
          },
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-border px-4 py-2 bg-muted font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-border px-4 py-2">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
