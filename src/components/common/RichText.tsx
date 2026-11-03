import { Fragment, useMemo } from "react";
import katex from "katex";
import { cn } from "@/utils/cn";

const cache = new Map<string, string>();

function renderTex(tex: string, displayMode: boolean): string {
  const key = `${displayMode ? "D" : "I"}:${tex}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const html = katex.renderToString(tex, { displayMode, throwOnError: false, output: "htmlAndMathml" });
  cache.set(key, html);
  return html;
}

const TOKEN = /(\$[^$]+\$|\*\*[^*]+\*\*|\*[^*]+\*)/g;

/**
 * Renders text with inline math ($...$), **bold** and *italic*.
 */
export function RichText({ text, className }: { text: string; className?: string }) {
  const nodes = useMemo(() => parse(text), [text]);
  return <span className={className}>{nodes}</span>;
}

function parse(text: string): React.ReactNode[] {
  return text.split(TOKEN).map((part, i) => {
    if (!part) return null;
    if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
      return <span key={i} className="inline-math" dangerouslySetInnerHTML={{ __html: renderTex(part.slice(1, -1), false) }} />;
    }
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={i} className="font-semibold text-slate-900">
          {parse(part.slice(2, -2))}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={i}>{parse(part.slice(1, -1))}</em>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/** Centered display-style equation. */
export function MathBlock({ tex, caption, className }: { tex: string; caption?: string; className?: string }) {
  return (
    <figure className={cn("my-3 text-center", className)}>
      <div
        className="overflow-x-auto py-1 text-xl sm:text-2xl"
        dangerouslySetInnerHTML={{ __html: renderTex(tex, true) }}
      />
      {caption && <figcaption className="mt-1 text-sm text-slate-500">{caption}</figcaption>}
    </figure>
  );
}
