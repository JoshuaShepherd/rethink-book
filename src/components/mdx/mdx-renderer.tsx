import { MDXProvider } from '@mdx-js/react';
import { Callout } from './callout';
import { Quote } from './quote';
import { Scripture } from './scripture';

// MDX components mapping
export const mdxComponents = {
  Callout,
  Quote,
  Scripture,
  // Override default elements with better styling
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="mb-6 text-3xl font-bold tracking-tight text-foreground"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mb-4 mt-8 text-2xl font-semibold tracking-tight text-foreground"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mb-3 mt-6 text-xl font-semibold tracking-tight text-foreground"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-relaxed text-foreground/90" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 ml-6 list-disc space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-foreground/90" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-foreground/90" {...props}>
      {children}
    </em>
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-gray-300 dark:border-gray-700" {...props} />
  ),
};

interface MDXRendererProps {
  children: React.ReactNode;
  className?: string;
}

export const MDXRenderer = ({ children, className }: MDXRendererProps) => {
  return (
    <div className={className}>
      <MDXProvider components={mdxComponents}>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          {children}
        </div>
      </MDXProvider>
    </div>
  );
};
