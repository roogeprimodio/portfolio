import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

/**
 * Renders a repository README.
 *
 * The markdown is third-party content — it comes from GitHub, and a repo can
 * contain raw HTML — so it goes through rehype-sanitize before rendering.
 * Nothing here trusts the input.
 *
 * Styling is applied per element rather than via a typography plugin, so the
 * README inherits the site's palette instead of importing a second look.
 */
export function ReadmeView({ markdown }: { markdown: string }) {
  return (
    <div className="space-y-4 text-muted-foreground">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          h1: ({ children }) => (
            <h3 className="mt-8 font-headline text-lg uppercase tracking-widest text-primary">
              {children}
            </h3>
          ),
          h2: ({ children }) => (
            <h3 className="mt-8 font-headline text-lg uppercase tracking-widest text-primary">
              {children}
            </h3>
          ),
          h3: ({ children }) => (
            <h4 className="mt-6 font-code text-sm uppercase tracking-widest text-accent">
              {children}
            </h4>
          ),
          p: ({ children }) => <p className="leading-relaxed">{children}</p>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-accent underline underline-offset-4 hover:text-primary"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="ml-5 list-disc space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="ml-5 list-decimal space-y-1">{children}</ol>
          ),
          code: ({ children, className }) => {
            const isBlock = Boolean(className);
            return isBlock ? (
              <code className="block font-code text-xs leading-relaxed text-accent">
                {children}
              </code>
            ) : (
              <code className="rounded bg-accent/10 px-1.5 py-0.5 font-code text-xs text-accent">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            // Long code lines scroll inside the block instead of widening the page.
            <pre className="overflow-x-auto rounded-xl border border-accent/20 bg-black/40 p-4">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-accent/40 pl-4 italic">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-accent/20 bg-card/40 px-3 py-2 text-left font-code text-xs uppercase tracking-widest text-accent">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-accent/15 px-3 py-2">{children}</td>
          ),
          hr: () => <hr className="border-accent/15" />,
          // Repo READMEs are full of badge images and screenshots with relative
          // paths that break once lifted out of GitHub. Drop them.
          img: () => null,
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
}
