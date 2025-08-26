import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/principles');

export interface EbookChapter {
  slug: string;
  title: string;
  chapter: number;
  type: 'chapter' | 'principle';
  content: string;
  frontmatter: {
    title: string;
    description?: string;
    keywords?: string[];
    author?: string;
    date?: string;
    [key: string]: any;
  };
}

export async function getAllEbookChapters(): Promise<EbookChapter[]> {
  try {
    const chapters: EbookChapter[] = [];

    // Get all directories in the content/principles folder
    const principlesDirs = fs
      .readdirSync(contentDirectory, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .sort();

    for (let i = 0; i < principlesDirs.length; i++) {
      const dirName = principlesDirs[i];
      const overviewPath = path.join(contentDirectory, dirName, 'overview.mdx');

      if (fs.existsSync(overviewPath)) {
        try {
          const fileContents = fs.readFileSync(overviewPath, 'utf8');
          const { data: frontmatter, content } = matter(fileContents);

          // Determine chapter type and number
          let chapterType: 'chapter' | 'principle' = 'principle';
          let chapterNumber = i + 1;

          if (dirName === 'introduction') {
            chapterType = 'chapter';
            chapterNumber = 0;
          }

          chapters.push({
            slug: dirName,
            title: frontmatter.title || `Principle ${chapterNumber}`,
            chapter: chapterNumber,
            type: chapterType,
            content,
            frontmatter: {
              title: frontmatter.title || `Principle ${chapterNumber}`,
              description: frontmatter.description,
              keywords: frontmatter.keywords || [],
              author: frontmatter.author,
              date: frontmatter.date,
              ...frontmatter,
            },
          });
        } catch (error) {
          console.error(`Error reading ${overviewPath}:`, error);
        }
      }
    }

    // Sort chapters by chapter number
    return chapters.sort((a, b) => a.chapter - b.chapter);
  } catch (error) {
    console.error('Error loading ebook chapters:', error);
    return [];
  }
}

export async function getEbookChapter(
  slug: string
): Promise<EbookChapter | null> {
  try {
    const overviewPath = path.join(contentDirectory, slug, 'overview.mdx');

    if (!fs.existsSync(overviewPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(overviewPath, 'utf8');
    const { data: frontmatter, content } = matter(fileContents);

    // Determine chapter type and number
    let chapterType: 'chapter' | 'principle' = 'principle';
    let chapterNumber = 1;

    if (slug === 'introduction') {
      chapterType = 'chapter';
      chapterNumber = 0;
    } else if (slug.startsWith('principle-')) {
      const match = slug.match(/principle-(\d+)/);
      if (match) {
        chapterNumber = parseInt(match[1]);
      }
    }

    return {
      slug,
      title: frontmatter.title || `Principle ${chapterNumber}`,
      chapter: chapterNumber,
      type: chapterType,
      content,
      frontmatter: {
        title: frontmatter.title || `Principle ${chapterNumber}`,
        description: frontmatter.description,
        keywords: frontmatter.keywords || [],
        author: frontmatter.author,
        date: frontmatter.date,
        ...frontmatter,
      },
    };
  } catch (error) {
    console.error(`Error reading chapter ${slug}:`, error);
    return null;
  }
}

export function getTableOfContents(): Array<{
  slug: string;
  title: string;
  chapter: number;
  type: 'chapter' | 'principle';
}> {
  return [
    {
      slug: 'introduction',
      title: 'Introduction',
      chapter: 0,
      type: 'chapter',
    },
    {
      slug: 'principle-1',
      title: 'PRINCIPLE 1: RETHINK THE MISSIONARY NATURE OF GOD',
      chapter: 1,
      type: 'principle',
    },
    {
      slug: 'principle-2',
      title: 'PRINCIPLE 2: RETHINK THE MISSIONARY NATURE OF THE CHURCH',
      chapter: 2,
      type: 'principle',
    },
    {
      slug: 'principle-3',
      title: 'PRINCIPLE 3: INCARNATIONAL MISSION',
      chapter: 3,
      type: 'principle',
    },
    {
      slug: 'principle-4',
      title: 'PRINCIPLE 4: RETHINK MISSIO DEI',
      chapter: 4,
      type: 'principle',
    },
    {
      slug: 'principle-5',
      title: 'PRINCIPLE 5: POST-CHRISTENDOM',
      chapter: 5,
      type: 'principle',
    },
    {
      slug: 'principle-6',
      title: 'PRINCIPLE 6: RETHINK PLACE',
      chapter: 6,
      type: 'principle',
    },
    {
      slug: 'principle-7',
      title: 'PRINCIPLE 7: RETHINK VOCATION',
      chapter: 7,
      type: 'principle',
    },
    {
      slug: 'principle-8',
      title: 'PRINCIPLE 8: RETHINK MULTIPLICATION',
      chapter: 8,
      type: 'principle',
    },
    {
      slug: 'principle-9',
      title: 'PRINCIPLE 9: RETHINK TEAMS',
      chapter: 9,
      type: 'principle',
    },
    {
      slug: 'principle-10',
      title: 'PRINCIPLE 10: RETHINK STRATEGIES AND MODELS',
      chapter: 10,
      type: 'principle',
    },
    {
      slug: 'principle-11',
      title: 'PRINCIPLE 11: RETHINK FLOW',
      chapter: 11,
      type: 'principle',
    },
    {
      slug: 'principle-12',
      title: 'PRINCIPLE 12: RETHINK SCORECARDS',
      chapter: 12,
      type: 'principle',
    },
  ];
}
