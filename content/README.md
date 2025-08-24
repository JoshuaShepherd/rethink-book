# Content Directory

This directory is reserved for future MDX/blog content.

## Structure

When implementing blog functionality, organize content as follows:

```
/content
  /blog
    /posts
      post-1.mdx
      post-2.mdx
  /docs
    getting-started.mdx
    advanced-guide.mdx
```

## Usage Example

```typescript
// Future implementation for MDX content
import { readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export async function getPostBySlug(slug: string) {
  const fullPath = join(process.cwd(), 'content/blog/posts', `${slug}.mdx`);
  const fileContents = readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    slug,
    frontmatter: data,
    content,
  };
}
```

## Recommended Dependencies

When ready to implement MDX support:

```bash
npm install @next/mdx @mdx-js/loader gray-matter
```
