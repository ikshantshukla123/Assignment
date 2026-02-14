"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Bold, Italic, Underline, List, ListOrdered } from "lucide-react";
import { Button } from "@/components/ui/button";
import DOMPurify from "isomorphic-dompurify";

export default function RichTextEditor({ value = "", onChange, placeholder }) {
  const editorRef = useRef(null);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  // clear editor when empty
  useEffect(() => {
    if (editorRef.current && value === "" && editorRef.current.innerHTML !== "") {
      editorRef.current.innerHTML = "";
    }
  }, [value]);

  // Sanitize HTML content
  const sanitize = (html) => {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ["b", "strong", "i", "em", "u", "ul", "ol", "li", "br"],
      ALLOWED_ATTR: [],
    });
  };

  // Execute formatting command
  const format = (command) => {
    document.execCommand(command, false, null);
    editorRef.current?.focus();
    updateFormats();
    updateContent();
  };

  // Update active format states
  const updateFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
    });
  };

  // Update content
  const updateContent = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      onChange(sanitize(html));
    }
  };

  return (
    <div className="rounded border bg-white">
      {/* Toolbar */}
      <div className="flex gap-1 border-b bg-gray-50 p-2">
        <Button
          type="button"
          variant={activeFormats.bold ? "default" : "ghost"}
          size="sm"
          onClick={() => format("bold")}
          title="Bold"
          className="h-8 w-8 p-0"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant={activeFormats.italic ? "default" : "ghost"}
          size="sm"
          onClick={() => format("italic")}
          title="Italic"
          className="h-8 w-8 p-0"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant={activeFormats.underline ? "default" : "ghost"}
          size="sm"
          onClick={() => format("underline")}
          title="Underline"
          className="h-8 w-8 p-0"
        >
          <Underline className="h-4 w-4" />
        </Button>
        <div className="mx-1 border-l" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => format("insertUnorderedList")}
          title="Bullet List"
          className="h-8 w-8 p-0"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => format("insertOrderedList")}
          title="Numbered List"
          className="h-8 w-8 p-0"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={updateContent}
        onMouseUp={updateFormats}
        onKeyUp={updateFormats}
        className="min-h-25 p-3 outline-none focus:ring-2 focus:ring-blue-500"
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
        }
        [contenteditable] b,
        [contenteditable] strong {
          font-weight: 700;
        }
        [contenteditable] i,
        [contenteditable] em {
          font-style: italic;
        }
        [contenteditable] u {
          text-decoration: underline;
        }
        [contenteditable] ul,
        [contenteditable] ol {
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        [contenteditable] ul {
          list-style-type: disc;
        }
        [contenteditable] ol {
          list-style-type: decimal;
        }
      `}</style>
    </div>
  );
}






// This component provides a rich text editor with basic formatting options bold, italic, underline, lists.

// i taked that code from google and made some changes to it, so that it can be used in our project. It uses contenteditable div and execCommand for formatting, and DOMPurify for sanitization.