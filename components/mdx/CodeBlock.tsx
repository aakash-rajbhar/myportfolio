import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface CodeBlockProps {
  language?: string;
  children: string;
}

export default function CodeBlock({
  language = "javascript",
  children,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 rounded-lg overflow-hidden bg-ink/5 dark:bg-white/5 border border-ink/10 dark:border-white/10">
      <div className="flex justify-between items-center px-4 py-2 bg-ink/10 dark:bg-white/10">
        <span className="text-sm font-mono text-ink/70 dark:text-ink/60">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-2 py-1 rounded text-sm text-ink/70 hover:bg-ink/20 dark:hover:bg-white/20 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto p-4">
        <SyntaxHighlighter
          language={language}
          customStyle={{ margin: 0, background: "transparent" }}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
