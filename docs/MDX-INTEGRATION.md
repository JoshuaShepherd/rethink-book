# MDX Content Integration

This document explains how the learning module system integrates with MDX chapter content.

## Architecture

The app uses a hybrid approach that combines:

1. **Mock Data** (`src/lib/mocks/content.ts`) - Provides the principle metadata, lessons, activities, and badges
2. **MDX Content** (`content/principles/*/`) - Contains the chapter content extracted from the PDF
3. **Content Extraction** (`scripts/build-content.js`) - Automatically extracts MDX into TypeScript

## How It Works

### 1. Content Structure

```
content/principles/
├── incarnational-mission/
│   ├── overview.mdx          # Manual content (preferred)
│   ├── ebook.mdx            # Generated from PDF
│   ├── lesson-01.mdx        # Future lesson content
│   └── activities.json      # Activities and quizzes
├── the-missionary-nature-of-god/
│   └── overview.mdx
└── vocation/
    └── overview.mdx
```

### 2. Build Process

When you run `npm run build`:

1. `scripts/build-content.js` runs first
2. Extracts all MDX content from `content/principles/*/`
3. Generates `src/lib/principle-content.ts` with the content
4. Next.js build proceeds with the embedded content

### 3. Runtime Integration

- **Principles Index** (`/principles`) shows all principles from mock data
- **Principle Pages** (`/principles/[slug]`) check for MDX content first:
  - If content exists → renders rich MDX content
  - If no content → shows placeholder or lesson content
- **Lessons/Activities** use existing mock data system

## Adding New Content

### Option 1: Manual Content

Create `content/principles/your-slug/overview.mdx`:

```mdx
---
title: 'Your Principle Title'
order: 1
---

# Your Principle Title

Your content here...
```

### Option 2: PDF Conversion

Run the PDF converter to generate content:

```bash
npm run convert:pdf
```

### Option 3: Lesson Content

Add individual lessons:

```
content/principles/your-slug/
├── overview.mdx       # Principle overview
├── lesson-01.mdx      # First lesson
├── lesson-02.mdx      # Second lesson
└── activities.json    # Interactive elements
```

## Content Extraction

Run the content builder:

```bash
npm run build:content
```

This will:

- Scan all `content/principles/*/` directories
- Extract content from `overview.mdx` or `ebook.mdx` files
- Generate `src/lib/principle-content.ts` with all content embedded
- Show a summary of extracted principles

## Components

### MDX Rendering

- `MarkdownContent` - Converts basic Markdown to HTML
- `MDXContent` - Future: Full MDX component rendering

### Content Loading

- `hasContentForSlug(slug)` - Check if principle has content
- `getContentForSlug(slug)` - Get content string
- `getTitleForSlug(slug)` - Get extracted title

## Development Workflow

1. **Add/edit content** in `content/principles/`
2. **Extract content**: `npm run build:content`
3. **Test locally**: `npm run dev`
4. **Build for production**: `npm run build`

The content is embedded at build time, so no file system access needed at runtime.

## Future Enhancements

- **Full MDX rendering** with React components
- **Dynamic lesson loading** from MDX files
- **Activity extraction** from MDX frontmatter
- **Content validation** and linting
- **Hot reloading** of content in development
