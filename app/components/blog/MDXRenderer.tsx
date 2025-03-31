"use client";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import Image from "next/image";

interface MDXRendererProps {
  content: string;
}

export default function MDXRenderer({ content }: MDXRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className="prose dark:prose-invert max-w-none prose-img:rounded-xl prose-img:mx-auto prose-headings:font-semibold prose-a:text-primary prose-code:rounded prose-pre:bg-transparent prose-pre:p-0"
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-3xl font-bold mt-8 mb-4" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-2xl font-bold mt-6 mb-3" {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className="text-xl font-bold mt-4 mb-2" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="mb-6 leading-relaxed text-lg" {...props} />
        ),
        a: ({ node, ...props }) => (
          <a
            className="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary transition-colors"
            {...props}
            target="_blank"
            rel="noopener noreferrer"
          />
        ),
        ul: ({ node, ...props }) => (
          <ul className="mb-6 list-disc pl-6" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="mb-6 list-decimal pl-6" {...props} />
        ),
        li: ({ node, ...props }) => <li className="mb-2 text-lg" {...props} />,
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-l-4 border-primary/50 pl-4 italic text-muted-foreground my-6"
            {...props}
          />
        ),
        hr: ({ node, ...props }) => (
          <hr className="my-8 border-border" {...props} />
        ),
        img: ({ node, alt, src, ...props }) => {
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
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <div className="my-6 rounded-lg overflow-hidden">
              <div className="bg-muted px-4 py-2 text-sm text-muted-foreground border-b border-border">
                {match[1]}
              </div>
              <SyntaxHighlighter
                style={atomDark}
                language={match[1]}
                PreTag="div"
                customStyle={{
                  margin: 0,
                  borderRadius: "0 0 0.5rem 0.5rem",
                  padding: "1.5rem",
                }}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code
              className="bg-muted px-1.5 py-0.5 rounded-md text-primary font-mono text-sm"
              {...props}
            >
              {children}
            </code>
          );
        },
        table: ({ node, ...props }) => (
          <div className="my-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-border" {...props} />
          </div>
        ),
        thead: ({ node, ...props }) => (
          <thead className="bg-muted" {...props} />
        ),
        th: ({ node, ...props }) => (
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            {...props}
          />
        ),
        td: ({ node, ...props }) => (
          <td className="px-6 py-4 whitespace-nowrap text-sm" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
