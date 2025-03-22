"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function MarkdownEditor({
  content,
  onChange,
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<string>("write");

  // Simple parser for the preview
  const renderPreview = () => {
    if (!content) {
      return (
        <div className="text-muted-foreground italic p-4">
          No content to preview
        </div>
      );
    }

    const paragraphs = content.split("\n\n");

    return (
      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
        {paragraphs.map((paragraph, index) => {
          // Heading parsing
          if (paragraph.startsWith("# ")) {
            return (
              <h1 key={index} className="text-2xl font-bold mt-8 mb-4">
                {paragraph.substring(2)}
              </h1>
            );
          } else if (paragraph.startsWith("## ")) {
            return (
              <h2 key={index} className="text-xl font-bold mt-6 mb-3">
                {paragraph.substring(3)}
              </h2>
            );
          } else if (paragraph.startsWith("### ")) {
            return (
              <h3 key={index} className="text-lg font-bold mt-4 mb-2">
                {paragraph.substring(4)}
              </h3>
            );
          }

          // Code block parsing
          if (paragraph.startsWith("```") && paragraph.endsWith("```")) {
            const code = paragraph.slice(3, -3).trim();
            return (
              <div key={index} className="my-4">
                <SyntaxHighlighter
                  language="javascript"
                  style={vscDarkPlus}
                  customStyle={{
                    borderRadius: "0.375rem",
                    padding: "1rem",
                    fontSize: "0.875rem",
                  }}
                >
                  {code}
                </SyntaxHighlighter>
              </div>
            );
          }

          // List parsing
          if (paragraph.match(/^(\d+\.\s|[-*]\s)/m)) {
            const items = paragraph.split("\n");
            const isOrdered = items[0].match(/^\d+\.\s/);

            if (isOrdered) {
              return (
                <ol key={index} className="list-decimal pl-6 my-4 space-y-2">
                  {items.map((item, i) => (
                    <li key={i} className="pl-2">
                      {item.replace(/^\d+\.\s/, "")}
                    </li>
                  ))}
                </ol>
              );
            } else {
              return (
                <ul key={index} className="list-disc pl-6 my-4 space-y-2">
                  {items.map((item, i) => (
                    <li key={i} className="pl-2">
                      {item.replace(/^[-*]\s/, "")}
                    </li>
                  ))}
                </ul>
              );
            }
          }

          // Regular paragraph or anything else
          return (
            <p key={index} className="my-3">
              {paragraph}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="border border-border rounded-md">
      <Tabs defaultValue="write" onValueChange={setActiveTab}>
        <div className="border-b border-border px-3 py-2">
          <TabsList className="grid w-[200px] grid-cols-2">
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="write" className="p-0">
          <Textarea
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your blog post content in Markdown..."
            className="min-h-[400px] p-4 border-0 rounded-none font-mono text-sm resize-y focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </TabsContent>

        <TabsContent value="preview" className="p-4">
          <div className="min-h-[400px] overflow-auto">{renderPreview()}</div>
        </TabsContent>
      </Tabs>

      <div className="border-t border-border p-3 bg-muted/40">
        <div className="text-xs text-muted-foreground">
          <p className="font-semibold mb-1">Markdown Tips:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1">
            <li># Heading 1</li>
            <li>## Heading 2</li>
            <li>### Heading 3</li>
            <li>**Bold Text**</li>
            <li>*Italic Text*</li>
            <li>- List Item</li>
            <li>1. Numbered Item</li>
            <li>[Link Text](URL)</li>
            <li>```code block```</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
