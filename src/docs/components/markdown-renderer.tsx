"use client";

import ReactMarkdown from "react-markdown";
// const ReactMarkdown = (await import("react-markdown")).default;
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom code block rendering
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                customStyle={{
                  margin: "1rem 0",
                  borderRadius: "0.5rem",
                }}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          // Custom heading rendering with IDs
          h1({ children }) {
            const id = String(children).toLowerCase().replace(/\s+/g, "-");
            return (
              <h1 id={id} className="text-3xl font-bold mb-4">
                {children}
              </h1>
            );
          },
          h2({ children }) {
            const id = String(children).toLowerCase().replace(/\s+/g, "-");
            return (
              <h2 id={id} className="text-2xl font-semibold mb-3 mt-6">
                {children}
              </h2>
            );
          },
          h3({ children }) {
            const id = String(children).toLowerCase().replace(/\s+/g, "-");
            return (
              <h3 id={id} className="text-xl font-semibold mb-2 mt-4">
                {children}
              </h3>
            );
          },
          // Custom link rendering
          a({ href, children }) {
            return (
              <a
                href={href}
                className="text-primary hover:underline"
                target={href?.startsWith("http") ? "_blank" : undefined}
                rel={
                  href?.startsWith("http") ? "noopener noreferrer" : undefined
                }
              >
                {children}
              </a>
            );
          },
          // Custom list rendering
          ul({ children }) {
            return (
              <ul className="list-disc list-inside mb-4 space-y-1">
                {children}
              </ul>
            );
          },
          ol({ children }) {
            return (
              <ol className="list-decimal list-inside mb-4 space-y-1">
                {children}
              </ol>
            );
          },
          // Custom paragraph rendering
          p({ children }) {
            return (
              <p className="mb-4 text-muted-foreground leading-7">{children}</p>
            );
          },
          // Custom blockquote rendering
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-4">
                {children}
              </blockquote>
            );
          },
          // Custom table rendering
          table({ children }) {
            return (
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border-collapse border border-border">
                  {children}
                </table>
              </div>
            );
          },
          th({ children }) {
            return (
              <th className="border border-border bg-muted px-4 py-2 text-left font-semibold">
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td className="border border-border px-4 py-2">{children}</td>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
