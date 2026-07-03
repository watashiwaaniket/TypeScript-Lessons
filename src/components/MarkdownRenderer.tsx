import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Components } from "react-markdown";

interface MarkdownRendererProps {
  content: string;
}

const codeBlockStyle = {
  ...oneDark,
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    margin: 0,
    background: "#0d1117",
  },
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
  pre: ({ children }) => <div className="code-block">{children}</div>,
  code: ({ className, children }) => {
    const match = /language-(\w+)/.exec(className ?? "");
    const code = String(children).replace(/\n$/, "");

    if (match) {
      return (
        <SyntaxHighlighter
          language={match[1]}
          style={codeBlockStyle}
          PreTag="div"
          customStyle={{
            margin: 0,
            padding: "1em 1.25em",
            borderRadius: "0.5rem",
            border: "1px solid rgba(111, 190, 178, 0.3)",
            fontSize: "0.875rem",
            lineHeight: 1.6,
          }}
        >
          {code}
        </SyntaxHighlighter>
      );
    }

    return <code className={className}>{children}</code>;
  },
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="lesson-prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
