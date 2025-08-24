#!/usr/bin/env node

/**
 * Build script to extract content from MDX files and generate principle-content.ts
 * Run with: node scripts/build-content.js
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_ROOT = path.join(__dirname, '..', 'content', 'principles');
const OUTPUT_FILE = path.join(
  __dirname,
  '..',
  'src',
  'lib',
  'principle-content.ts'
);

function readMDXContent(principleSlug) {
  const principleDir = path.join(CONTENT_ROOT, principleSlug);

  if (!fs.existsSync(principleDir)) {
    return null;
  }

  // Look for overview.mdx first, then ebook.mdx
  const overviewPath = path.join(principleDir, 'overview.mdx');
  const ebookPath = path.join(principleDir, 'ebook.mdx');

  let contentPath = null;
  if (fs.existsSync(overviewPath)) {
    contentPath = overviewPath;
  } else if (fs.existsSync(ebookPath)) {
    contentPath = ebookPath;
  }

  if (!contentPath) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(contentPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || slugToTitle(principleSlug),
      content: content.trim(),
      hasContent: content.trim().length > 0,
    };
  } catch (error) {
    console.warn(`Failed to read ${contentPath}:`, error.message);
    return null;
  }
}

function slugToTitle(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function escapeString(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\${/g, '\\${');
}

function generateContentFile() {
  if (!fs.existsSync(CONTENT_ROOT)) {
    console.error(`Content directory not found: ${CONTENT_ROOT}`);
    process.exit(1);
  }

  const principles = fs
    .readdirSync(CONTENT_ROOT, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .sort();

  const contentEntries = [];

  for (const slug of principles) {
    const mdxData = readMDXContent(slug);

    if (mdxData && mdxData.hasContent) {
      contentEntries.push({
        slug,
        ...mdxData,
      });
    }
  }

  // Generate TypeScript file content
  let output = `// Auto-generated from MDX files in content/principles/
// Run 'node scripts/build-content.js' to regenerate

export const principleContent: Record<string, { title: string; content: string; hasContent: boolean }> = {
`;

  for (const entry of contentEntries) {
    output += `  '${entry.slug}': {
    title: '${escapeString(entry.title)}',
    hasContent: true,
    content: \`${escapeString(entry.content)}\`,
  },
`;
  }

  output += `};

// Helper function to check if we have content for a slug
export function hasContentForSlug(slug: string): boolean {
  return principleContent[slug]?.hasContent || false;
}

// Helper function to get content for a slug
export function getContentForSlug(slug: string): string | null {
  return principleContent[slug]?.content || null;
}

// Helper function to get title for a slug
export function getTitleForSlug(slug: string): string | null {
  return principleContent[slug]?.title || null;
}
`;

  // Write the output file
  fs.writeFileSync(OUTPUT_FILE, output, 'utf8');
  console.log(
    `Generated ${OUTPUT_FILE} with ${contentEntries.length} principle(s)`
  );

  // List the principles found
  if (contentEntries.length > 0) {
    console.log('Principles with content:');
    for (const entry of contentEntries) {
      console.log(`  - ${entry.slug}: ${entry.title}`);
    }
  }
}

if (require.main === module) {
  generateContentFile();
}

module.exports = { generateContentFile };
