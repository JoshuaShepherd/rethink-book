const fs = require('fs');
const path = require('path');

const contentRoot = path.join(process.cwd(), 'content', 'principles');

// Enhanced principle metadata
const principleMetadata = {
  'incarnational-mission': {
    title: 'Rethink Incarnational Mission',
    chapter: 3,
    order: 3,
    author: 'ReThink Leadership',
    readingTime: '15 minutes',
    keyPoints: [
      'Incarnation means proximity and presence',
      'Mission flows from being, not just doing',
      'Context shapes method, not message',
    ],
  },
  'principle-1': {
    title: 'Rethink Church',
    chapter: 1,
    order: 1,
    author: 'ReThink Leadership',
    readingTime: '12 minutes',
    keyPoints: [
      'Church is not a building but a movement',
      'Community forms around mission',
      'Simple expressions can have profound impact',
    ],
  },
  'principle-2': {
    title: 'Rethink Disciple-Making',
    chapter: 2,
    order: 2,
    author: 'ReThink Leadership',
    readingTime: '14 minutes',
    keyPoints: [
      'Discipleship happens in community',
      'Every believer is called to make disciples',
      'Reproducible methods create multiplication',
    ],
  },
  'principle-3': {
    title: 'Rethink Neighboring',
    chapter: 3,
    order: 3,
    author: 'ReThink Leadership',
    readingTime: '13 minutes',
    keyPoints: [
      'Love your neighbor as yourself',
      'Proximity creates opportunity',
      'Consistent presence builds trust',
    ],
  },
  'principle-4': {
    title: 'Rethink Missio Dei',
    chapter: 4,
    order: 4,
    author: 'ReThink Leadership',
    readingTime: '16 minutes',
    keyPoints: [
      'Mission belongs to God',
      'We join God in what He is already doing',
      'The Holy Spirit leads mission strategy',
    ],
  },
  'principle-5': {
    title: 'Rethink Post-Christendom',
    chapter: 5,
    order: 5,
    author: 'ReThink Leadership',
    readingTime: '18 minutes',
    keyPoints: [
      'Western culture has shifted',
      'We are now missionaries to our own context',
      'New approaches are needed for new realities',
    ],
  },
  'principle-6': {
    title: 'Rethink Place',
    chapter: 6,
    order: 6,
    author: 'ReThink Leadership',
    readingTime: '14 minutes',
    keyPoints: [
      'Geography matters for mission',
      'Local context shapes ministry approach',
      'Rootedness builds credibility',
    ],
  },
  'principle-7': {
    title: 'Rethink Leadership',
    chapter: 7,
    order: 7,
    author: 'ReThink Leadership',
    readingTime: '15 minutes',
    keyPoints: [
      'Leadership is influence, not position',
      'Servant leadership creates disciples',
      'Multiplication requires releasing control',
    ],
  },
  'principle-9': {
    title: 'Rethink Teams',
    chapter: 9,
    order: 9,
    author: 'ReThink Leadership',
    readingTime: '17 minutes',
    keyPoints: [
      'Teams accomplish more than individuals',
      'Diversity brings strength',
      'Unity around mission creates momentum',
    ],
  },
  'principle-10': {
    title: 'Rethink Strategies and Models',
    chapter: 10,
    order: 10,
    author: 'ReThink Leadership',
    readingTime: '19 minutes',
    keyPoints: [
      'Methods must match the mission',
      'Flexibility enables effectiveness',
      'Context determines strategy',
    ],
  },
  'principle-11': {
    title: 'Rethink Flow',
    chapter: 11,
    order: 11,
    author: 'ReThink Leadership',
    readingTime: '16 minutes',
    keyPoints: [
      'Systems create sustainable movement',
      'Clear processes enable reproduction',
      'Flow reduces friction in multiplication',
    ],
  },
  'principle-12': {
    title: 'Rethink Scorecards',
    chapter: 12,
    order: 12,
    author: 'ReThink Leadership',
    readingTime: '18 minutes',
    keyPoints: [
      'What gets measured gets done',
      'Kingdom metrics differ from business metrics',
      'Health indicators guide growth',
    ],
  },
  rethink: {
    title: 'Rethink Multiplication',
    chapter: 8,
    order: 8,
    author: 'ReThink Leadership',
    readingTime: '20 minutes',
    keyPoints: [
      'Multiplication is the biblical model',
      'Reproduction requires intentionality',
      'Exponential growth changes everything',
    ],
  },
  'rethink-scorecards': {
    title: 'Rethink Scorecards',
    chapter: 12,
    order: 12,
    author: 'ReThink Leadership',
    readingTime: '18 minutes',
    keyPoints: [
      'What gets measured gets done',
      'Kingdom metrics differ from business metrics',
      'Health indicators guide growth',
    ],
  },
  scorecards: {
    title: 'Rethink Scorecards',
    chapter: 12,
    order: 12,
    author: 'ReThink Leadership',
    readingTime: '18 minutes',
    keyPoints: [
      'What gets measured gets done',
      'Kingdom metrics differ from business metrics',
      'Health indicators guide growth',
    ],
  },
};

function enhanceContentStructure(content, metadata) {
  // Split content into paragraphs
  let paragraphs = content.split('\n\n').filter(p => p.trim());

  // Find the first substantial paragraph for chapter intro
  let chapterIntro = '';
  let mainContent = [];
  let foundIntro = false;

  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i].trim();

    // Skip very short paragraphs or page numbers
    if (paragraph.length < 50 || /^\d+$/.test(paragraph)) {
      continue;
    }

    if (!foundIntro && paragraph.length > 100) {
      chapterIntro = paragraph;
      foundIntro = true;
    } else {
      mainContent.push(paragraph);
    }
  }

  // Structure the enhanced content
  let enhancedContent = '';

  // Add chapter introduction
  if (chapterIntro) {
    enhancedContent += `<ChapterIntro>\n${chapterIntro}\n</ChapterIntro>\n\n`;
  }

  // Process main content and add structure
  let inQuoteSection = false;
  let currentSection = '';

  for (let i = 0; i < mainContent.length; i++) {
    const paragraph = mainContent[i];

    // Detect quotes (usually short, impactful statements)
    if (paragraph.length < 200 && paragraph.includes('"')) {
      enhancedContent += `<Quote>\n${paragraph}\n</Quote>\n\n`;
      continue;
    }

    // Detect potential section headers (short, bold statements)
    if (
      paragraph.length < 100 &&
      !paragraph.includes('.') &&
      paragraph === paragraph.toUpperCase()
    ) {
      enhancedContent += `## ${paragraph}\n\n`;
      continue;
    }

    // Add key insights for important concepts
    if (
      paragraph.toLowerCase().includes('key') ||
      paragraph.toLowerCase().includes('important') ||
      paragraph.toLowerCase().includes('remember')
    ) {
      enhancedContent += `<KeyInsight>\n${paragraph}\n</KeyInsight>\n\n`;
      continue;
    }

    // Regular paragraphs
    enhancedContent += `${paragraph}\n\n`;

    // Add reflection prompts every few paragraphs
    if (i > 0 && i % 8 === 0 && i < mainContent.length - 2) {
      enhancedContent += `<Reflection>\nHow does this principle apply to your current ministry context? What would change if you implemented this approach?\n</Reflection>\n\n`;
    }
  }

  // Add chapter summary at the end
  if (metadata.keyPoints) {
    enhancedContent += `<ChapterSummary keyPoints={${JSON.stringify(metadata.keyPoints)}} />\n\n`;
  }

  // Add practice box
  enhancedContent += `<PracticeBox title="This Week's Challenge">\n1. Identify one area where you can apply this principle\n2. Take one concrete step toward implementation\n3. Share your experience with someone who can provide feedback\n4. Plan how you'll measure progress\n</PracticeBox>\n\n`;

  return enhancedContent;
}

function migrateContent() {
  console.log('🚀 Starting content migration to enhanced MDX...\n');

  if (!fs.existsSync(contentRoot)) {
    console.error('❌ Content directory not found:', contentRoot);
    return;
  }

  const directories = fs
    .readdirSync(contentRoot, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  let processed = 0;

  directories.forEach(slug => {
    const principleDir = path.join(contentRoot, slug);
    const overviewPath = path.join(principleDir, 'overview.mdx');
    const ebookPath = path.join(principleDir, 'ebook.mdx');

    // Find the content file
    let contentPath = null;
    if (fs.existsSync(overviewPath)) {
      contentPath = overviewPath;
    } else if (fs.existsSync(ebookPath)) {
      contentPath = ebookPath;
    }

    if (!contentPath) {
      console.log(`⚠️  No content file found for ${slug}`);
      return;
    }

    try {
      const content = fs.readFileSync(contentPath, 'utf8');
      const metadata = principleMetadata[slug] || {
        title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        chapter: processed + 1,
        order: processed + 1,
        author: 'ReThink Leadership',
        readingTime: '15 minutes',
        keyPoints: [
          'Key insight to be added',
          'Another important point',
          'Application for ministry',
        ],
      };

      // Extract existing frontmatter if present
      let existingFrontmatter = {};
      let rawContent = content;

      if (content.startsWith('---')) {
        const frontmatterEnd = content.indexOf('---', 3);
        if (frontmatterEnd !== -1) {
          const frontmatterText = content.slice(3, frontmatterEnd);
          rawContent = content.slice(frontmatterEnd + 3).trim();

          // Parse simple YAML-like frontmatter
          frontmatterText.split('\n').forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex > 0) {
              const key = line.slice(0, colonIndex).trim();
              const value = line
                .slice(colonIndex + 1)
                .trim()
                .replace(/^["']|["']$/g, '');
              existingFrontmatter[key] = value;
            }
          });
        }
      }

      // Combine metadata
      const finalMetadata = { ...metadata, ...existingFrontmatter };

      // Enhance the content structure
      const enhancedContent = enhanceContentStructure(
        rawContent,
        finalMetadata
      );

      // Create new MDX content with frontmatter
      const frontmatter = `---
title: "${finalMetadata.title}"
chapter: ${finalMetadata.chapter}
order: ${finalMetadata.order}
author: "${finalMetadata.author}"
readingTime: "${finalMetadata.readingTime}"
keyPoints:
${finalMetadata.keyPoints.map(point => `  - "${point}"`).join('\n')}
---

# ${finalMetadata.title}

${enhancedContent}`;

      // Write the enhanced content
      fs.writeFileSync(contentPath, frontmatter, 'utf8');

      console.log(`✅ Enhanced ${slug}: "${finalMetadata.title}"`);
      processed++;
    } catch (error) {
      console.error(`❌ Error processing ${slug}:`, error.message);
    }
  });

  console.log(`\n🎉 Migration complete! Enhanced ${processed} principle(s).`);
  console.log('\n📚 Enhanced features added:');
  console.log('   • Structured frontmatter with metadata');
  console.log('   • Chapter introductions');
  console.log('   • Key insights and quotes');
  console.log('   • Reflection prompts');
  console.log('   • Practice boxes');
  console.log('   • Chapter summaries');
  console.log('\n🚀 Ready for enhanced MDX rendering!');
}

// Run the migration
migrateContent();
