"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Code,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  TextQuote,
} from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  placeholder = "Write your content here...",
  height = "min-h-[400px]",
}) => {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [selectedText, setSelectedText] = useState({
    start: 0,
    end: 0,
    text: "",
  });

  // Track selection changes
  const handleSelect = () => {
    if (editorRef.current) {
      const start = editorRef.current.selectionStart;
      const end = editorRef.current.selectionEnd;
      setSelectedText({
        start,
        end,
        text: value.substring(start, end),
      });
    }
  };

  // Auto resize the textarea based on content
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.style.height = "auto";
      editorRef.current.style.height = `${editorRef.current.scrollHeight}px`;
    }
  }, [value]);

  // Insert formatting at cursor position or around selected text
  const formatText = (prefix: string, suffix: string = "") => {
    if (!editorRef.current) return;

    const { selectionStart, selectionEnd } = editorRef.current;
    const selectedText = value.substring(selectionStart, selectionEnd);

    // If text is selected, wrap it with formatting
    if (selectedText) {
      const beforeText = value.substring(0, selectionStart);
      const afterText = value.substring(selectionEnd);
      const newText = `${beforeText}${prefix}${selectedText}${suffix}${afterText}`;

      onChange(newText);

      // Set the cursor position after the operation
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.focus();
          editorRef.current.setSelectionRange(
            selectionStart + prefix.length,
            selectionEnd + prefix.length
          );
        }
      }, 0);
    } else {
      // If no text is selected, just insert the formatting characters
      const cursorPos = selectionStart;
      const beforeText = value.substring(0, cursorPos);
      const afterText = value.substring(cursorPos);
      const newText = `${beforeText}${prefix}${suffix}${afterText}`;

      onChange(newText);

      // Set cursor between prefix and suffix
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.focus();
          editorRef.current.setSelectionRange(
            cursorPos + prefix.length,
            cursorPos + prefix.length
          );
        }
      }, 0);
    }
  };

  // Toolbar action handlers
  const actions = {
    bold: () => formatText("**", "**"),
    italic: () => formatText("*", "*"),
    h1: () => formatText("# "),
    h2: () => formatText("## "),
    list: () => formatText("- "),
    orderedList: () => formatText("1. "),
    code: () => formatText("```\n", "\n```"),
    inlineCode: () => formatText("`", "`"),
    quote: () => formatText("> "),
    link: () => {
      const url = prompt("Enter link URL:");
      if (url) {
        formatText("[", `](${url})`);
      }
    },
    image: () => {
      const url = prompt("Enter image URL:");
      const alt = prompt("Enter image description:");
      if (url) {
        formatText(`![${alt || "Image"}](${url})`);
      }
    },
    undo: () => document.execCommand("undo"),
    redo: () => document.execCommand("redo"),
  };

  return (
    <div className="w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <button
          onClick={actions.bold}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={actions.italic}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1" />
        <button
          onClick={actions.h1}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          title="Heading 1"
        >
          <Heading1 size={18} />
        </button>
        <button
          onClick={actions.h2}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          title="Heading 2"
        >
          <Heading2 size={18} />
        </button>
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1" />
        <button
          onClick={actions.list}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          onClick={actions.orderedList}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          title="Numbered List"
        >
          <ListOrdered size={18} />
        </button>
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1" />
        <button
          onClick={actions.quote}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          title="Quote"
        >
          <TextQuote size={18} />
        </button>
        <button
          onClick={actions.code}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          title="Code Block"
        >
          <Code size={18} />
        </button>
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1" />
        <button
          onClick={actions.link}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          title="Insert Link"
        >
          <LinkIcon size={18} />
        </button>
        <button
          onClick={actions.image}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          title="Insert Image"
        >
          <ImageIcon size={18} />
        </button>
      </div>

      {/* Editor */}
      <textarea
        ref={editorRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onSelect={handleSelect}
        placeholder={placeholder}
        className={`w-full p-4 focus:outline-none focus:ring-0 resize-none ${height} text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800`}
      />

      {/* Preview - can be toggled but we'll leave it always visible */}
      <div className="p-4 border-t border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Preview
          </span>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {value.length} characters
          </div>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {/* We're not adding an actual preview renderer here as ReactMarkdown is used in MDXRenderer */}
          <div className="text-sm text-gray-500 dark:text-gray-400 italic">
            Preview will be rendered when you save.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
