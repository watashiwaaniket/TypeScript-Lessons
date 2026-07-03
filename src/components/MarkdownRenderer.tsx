import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import type { Components } from "react-markdown";

interface MarkdownRendererProps {
  content: string;
}

const rehypePrettyCodeOptions = {
  theme: "github-dark",
  keepBackground: true,
  defaultLang: "plaintext",
};

const components: Components = {
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-[#6FBEB2] underline underline-offset-2 hover:text-white transition-colors"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt ?? ""}
      className="rounded-md border border-[#6FBEB2]/40 my-6 max-w-full"
      loading="lazy"
    />
  ),
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="lesson-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypePrettyCode, rehypePrettyCodeOptions]]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
