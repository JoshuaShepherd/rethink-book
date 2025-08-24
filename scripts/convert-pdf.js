/*
  PDF -> MDX converter for Rethink ebook
  - Reads docs/Rethink 12 Principles ebook.pdf
  - Extracts text via pdf-parse
  - Splits into sections by headings like "Principle 1: Title"
  - Writes content/principles/<slug>/overview.mdx with frontmatter
  - Never deletes existing content; skips if directory already exists
*/

const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

const ROOT = path.resolve(__dirname, '..');
const PDF_PATH = path.join(ROOT, 'docs', 'Rethink 12 Principles ebook.pdf');
const OUT_ROOT = path.join(ROOT, 'content', 'principles');

function slugify(str) {
  let s = String(str).trim();
  // Strip leading "Rethink " prefix if present
  s = s.replace(/^re[-\s]?think\s+/i, '');
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeMDX(dir, filename, { title, order, body }) {
  ensureDir(dir);
  const fm = `---\n` +
    `title: "${title.replace(/"/g, '\\"')}"\n` +
    (typeof order === 'number' ? `order: ${order}\n` : '') +
    `---\n\n`;
  const mdx = fm + body + '\n';
  fs.writeFileSync(path.join(dir, filename), mdx, 'utf8');
}

function splitPrinciples(fullText) {
  // Normalize line endings
  const text = fullText.replace(/\r\n?/g, '\n');
  // Look for headings like "Principle 1:", "PRINCIPLE 1:", "Principle One:" etc.
  const headingRegex = /^\s*(?:PRINCIPLE|Principle)\s+(\d+|One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Eleven|Twelve)\s*[:\-]\s*(.+)$/mi;

  // Find all positions of headings
  const lines = text.split('\n');
  const idxs = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^\s*(?:PRINCIPLE|Principle)\s+(\d+|One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Eleven|Twelve)\s*[:\-]\s*(.+)$/);
    if (m) {
      idxs.push({ line: i, raw: lines[i], num: m[1], title: m[2].trim() });
    }
  }

  if (idxs.length === 0) {
    return [{ title: 'Rethink 12 Principles', order: 1, body: text }];
  }

  const sections = [];
  for (let s = 0; s < idxs.length; s++) {
    const start = idxs[s].line;
    const end = s + 1 < idxs.length ? idxs[s + 1].line : lines.length;
    const bodyLines = lines.slice(start, end);
    // Remove the heading line from body
    bodyLines.shift();
    const body = bodyLines.join('\n').trim() + '\n';

    // Convert spelled-out numbers to digits for order
    const mapWord = {
      one: 1, two: 2, three: 3, four: 4, five: 5, six: 6,
      seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12,
    };
    let order = parseInt(idxs[s].num, 10);
    if (Number.isNaN(order)) {
      const w = String(idxs[s].num).toLowerCase();
      order = mapWord[w] || s + 1;
    }
    const title = `Principle ${order}: ${idxs[s].title}`;
    sections.push({ title, order, body });
  }

  return sections;
}

async function main() {
  if (!fs.existsSync(PDF_PATH)) {
    console.error(`PDF not found at ${PDF_PATH}`);
    process.exit(1);
  }
  ensureDir(OUT_ROOT);

  const pdfBuf = fs.readFileSync(PDF_PATH);
  const data = await pdfParse(pdfBuf);
  const text = data.text || '';
  if (!text.trim()) {
    console.error('No text could be extracted from the PDF.');
    process.exit(2);
  }

  const sections = splitPrinciples(text);
  console.log(`Discovered ${sections.length} section(s).`);

  // High-level folder: if multiple principles, create one folder per principle using the principle title as slug
  // If only one section, create rethink-ebook/overview.mdx
  if (sections.length === 1) {
    const baseDir = path.join(OUT_ROOT, 'rethink-ebook');
    if (fs.existsSync(baseDir)) {
      console.warn(`Directory exists, skipping: ${baseDir}`);
    } else {
      ensureDir(baseDir);
      writeMDX(baseDir, 'overview.mdx', sections[0]);
      console.log(`Wrote ${path.relative(ROOT, path.join(baseDir, 'overview.mdx'))}`);
    }
    return;
  }

  const slugCounts = {};
  for (const sec of sections) {
    const principleTitle = sec.title.replace(/^Principle\s+\d+\s*:\s*/i, '').trim();
    let slug = slugify(principleTitle);
    if (!slug) {
      // Fallback to principle number
      slug = `principle-${sec.order || 'x'}`;
    }
    const dir = path.join(OUT_ROOT, slug);
    ensureDir(dir);

    const count = (slugCounts[slug] || 0);
    slugCounts[slug] = count + 1;

    const hasOverview = fs.existsSync(path.join(dir, 'overview.mdx'));
    const base = hasOverview ? 'ebook' : 'overview';
    const filename = count === 0 ? `${base}.mdx` : `${base}-${count + 1}.mdx`;

    writeMDX(dir, filename, sec);
    console.log(`Wrote ${path.relative(ROOT, path.join(dir, filename))}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
