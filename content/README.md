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

## Principles Content and PDF Conversion

This project includes structured content for the 12 Rethink principles under `content/principles/<slug>/`.

- `overview.mdx` — canonical overview for a principle
- `ebook.mdx` — supplemental content auto-extracted from the Rethink PDF
- `activities.json` — optional activity definitions
- `quiz.json` — optional quiz definitions

To (re)generate MDX from the PDF, place `Rethink 12 Principles ebook.pdf` in `docs/` (already present) and run:

```bash
npm run convert:pdf
```

Notes:
- The converter never deletes or overwrites existing files.
- If a folder already has `overview.mdx`, the converter writes `ebook.mdx`.
- If multiple sections resolve to the same slug, the converter will create `ebook-2.mdx`, `ebook-3.mdx`, etc.
