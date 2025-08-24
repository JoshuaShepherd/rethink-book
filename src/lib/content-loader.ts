import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Principle, Lesson } from '@/types/content';

// This runs only on the server side
const isServer = typeof window === 'undefined';

// Fallback badges mapping for generated principles
const defaultBadges = {
  'missionary-nature-of-god': 'badge_missio_dei',
  'the-missionary-nature-of-god': 'badge_missio_dei', 
  'missio-dei': 'badge_missio_dei',
  'incarnational-mission': 'badge_incarnation',
  'vocation': 'badge_vocation',
  'multiplication': 'badge_multiplication',
  'teams': 'badge_teams',
  'place': 'badge_place',
  'post-christendom': 'badge_post_christendom',
} as const;

const CONTENT_ROOT = path.join(process.cwd(), 'content', 'principles');

export interface PrincipleMDX {
  slug: string;
  title: string;
  summary?: string;
  order?: number;
  content: string;
  hasOverview: boolean;
  hasEbook: boolean;
}

export interface LessonMDX {
  slug: string;
  title: string;
  order?: number;
  content: string;
  principleSlug: string;
}

/**
 * Get all principle slugs from the content directory
 */
export function getPrincipleSlugs(): string[] {
  if (!isServer) return [];
  
  if (!fs.existsSync(CONTENT_ROOT)) {
    return [];
  }
  
  return fs.readdirSync(CONTENT_ROOT, { withFileTypes: true })
    .filter((dirent: fs.Dirent) => dirent.isDirectory())
    .map((dirent: fs.Dirent) => dirent.name)
    .sort();
}

/**
 * Load principle MDX content
 */
export function loadPrincipleMDX(slug: string): PrincipleMDX | null {
  if (!isServer) return null;
  
  const principleDir = path.join(CONTENT_ROOT, slug);
  
  if (!fs.existsSync(principleDir)) {
    return null;
  }

  const overviewPath = path.join(principleDir, 'overview.mdx');
  const ebookPath = path.join(principleDir, 'ebook.mdx');
  
  const hasOverview = fs.existsSync(overviewPath);
  const hasEbook = fs.existsSync(ebookPath);
  
  if (!hasOverview && !hasEbook) {
    return null;
  }

  // Prefer overview.mdx, fallback to ebook.mdx
  const contentPath = hasOverview ? overviewPath : ebookPath;
  const fileContents = fs.readFileSync(contentPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  // Extract title from frontmatter or derive from slug
  const title = data.title || slugToTitle(slug);
  const summary = data.summary || generateSummary(content);
  const order = data.order || extractOrderFromTitle(title);

  return {
    slug,
    title,
    summary,
    order,
    content,
    hasOverview,
    hasEbook
  };
}

/**
 * Load lesson MDX files for a principle
 */
export function loadPrincipleLessons(principleSlug: string): LessonMDX[] {
  if (!isServer) return [];
  
  const principleDir = path.join(CONTENT_ROOT, principleSlug);
  
  if (!fs.existsSync(principleDir)) {
    return [];
  }

  const lessons: LessonMDX[] = [];
  const files = fs.readdirSync(principleDir);
  
  for (const file of files) {
    if (file.startsWith('lesson-') && file.endsWith('.mdx')) {
      const lessonPath = path.join(principleDir, file);
      const fileContents = fs.readFileSync(lessonPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      const lessonSlug = file.replace('.mdx', '');
      const title = data.title || slugToTitle(lessonSlug);
      const order = data.order || extractLessonNumber(file);

      lessons.push({
        slug: lessonSlug,
        title,
        order,
        content,
        principleSlug
      });
    }
  }

  return lessons.sort((a, b) => (a.order || 0) - (b.order || 0));
}

/**
 * Get all principles with content from MDX files
 */
export function getAllPrinciples(): Principle[] {
  const slugs = getPrincipleSlugs();
  const principles: Principle[] = [];

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const mdx = loadPrincipleMDX(slug);
    
    if (mdx) {
      // Map to Principle interface
      const principle: Principle = {
        id: String(i + 1),
        slug: mdx.slug,
        title: mdx.title,
        summary: mdx.summary || '',
        estMinutes: 45, // Default estimate
        badgeId: (defaultBadges as any)[mdx.slug] || `badge_${slug.replace(/-/g, '_')}`
      };
      
      principles.push(principle);
    }
  }

  return principles.sort((a, b) => {
    const mdxA = loadPrincipleMDX(a.slug);
    const mdxB = loadPrincipleMDX(b.slug);
    return (mdxA?.order || 999) - (mdxB?.order || 999);
  });
}

/**
 * Get principle by slug with MDX content
 */
export function getPrincipleBySlugWithContent(slug: string): (Principle & { content?: string }) | null {
  const mdx = loadPrincipleMDX(slug);
  if (!mdx) return null;

  const principles = getAllPrinciples();
  const principle = principles.find(p => p.slug === slug);
  
  if (principle) {
    return {
      ...principle,
      content: mdx.content
    };
  }
  
  return null;
}

/**
 * Convert lessons from MDX to Lesson interface
 */
export function getLessonsByPrincipleSlug(principleSlug: string): Lesson[] {
  const principles = getAllPrinciples();
  const principle = principles.find(p => p.slug === principleSlug);
  
  if (!principle) return [];

  const lessonMDXs = loadPrincipleLessons(principleSlug);
  
  return lessonMDXs.map((lessonMDX, index) => {
    const lesson: Lesson = {
      id: `${principle.id}-lesson-${index + 1}`,
      principleId: principle.id,
      title: lessonMDX.title,
      order: lessonMDX.order || index + 1,
      mdxPath: `/content/principles/${principleSlug}/${lessonMDX.slug}.mdx`,
      keyTakeaways: extractKeyTakeaways(lessonMDX.content)
    };
    
    return lesson;
  });
}

// Utility functions
function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function generateSummary(content: string): string {
  // Extract first paragraph or sentence as summary
  const lines = content.split('\n').filter(line => line.trim());
  const firstParagraph = lines.find(line => 
    !line.startsWith('#') && 
    !line.startsWith('---') && 
    line.trim().length > 20
  );
  
  if (firstParagraph && firstParagraph.length > 100) {
    return firstParagraph.substring(0, 150).trim() + '...';
  }
  
  return firstParagraph || 'Explore this principle in depth.';
}

function extractOrderFromTitle(title: string): number | undefined {
  const match = title.match(/(?:Principle\s+)?(\d+)(?:\s*:|\s|$)/i);
  return match ? parseInt(match[1], 10) : undefined;
}

function extractLessonNumber(filename: string): number {
  const match = filename.match(/lesson-(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
}

function extractKeyTakeaways(content: string): string[] {
  // Look for bullet points, numbered lists, or key points
  const takeaways: string[] = [];
  const lines = content.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    // Match bullet points or key statements
    if (
      trimmed.startsWith('- **') ||
      trimmed.startsWith('* **') ||
      trimmed.match(/^\d+\.\s*\*\*/)
    ) {
      const takeaway = trimmed
        .replace(/^[-*]\s*\*\*(.*?)\*\*.*?/, '$1')
        .replace(/^\d+\.\s*\*\*(.*?)\*\*.*?/, '$1')
        .trim();
      
      if (takeaway && takeaway.length > 10) {
        takeaways.push(takeaway);
      }
    }
  }
  
  // If no structured takeaways found, extract from headings
  if (takeaways.length === 0) {
    for (const line of lines) {
      if (line.startsWith('##') && !line.includes('What This Means')) {
        const heading = line.replace(/^#+\s*/, '').trim();
        if (heading.length > 5 && heading.length < 100) {
          takeaways.push(heading);
        }
      }
    }
  }
  
  return takeaways.slice(0, 4); // Limit to 4 key takeaways
}
