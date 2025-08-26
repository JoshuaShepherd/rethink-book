#!/usr/bin/env python3
"""
PDF to MDX Converter for Rethink 12 Principles Ebook

This script converts a PDF file to organized MDX files by chapters,
preparing them for use in a Next.js ebook application.
"""

import fitz  # PyMuPDF
import os
import re
import json
from pathlib import Path
from typing import List, Dict, Tuple
import frontmatter

class PDFToMDXConverter:
    def __init__(self, pdf_path: str, output_dir: str):
        self.pdf_path = pdf_path
        self.output_dir = Path(output_dir)
        self.doc = None
        self.chapters = []
        
    def open_pdf(self):
        """Open the PDF document"""
        try:
            self.doc = fitz.open(self.pdf_path)
            print(f"✅ Successfully opened PDF: {self.pdf_path}")
            print(f"📄 Total pages: {len(self.doc)}")
        except Exception as e:
            print(f"❌ Error opening PDF: {e}")
            raise
    
    def extract_text_from_page(self, page_num: int) -> str:
        """Extract text from a specific page"""
        page = self.doc[page_num]
        text = page.get_text()
        return text
    
    def detect_chapter_breaks(self) -> List[Tuple[int, str]]:
        """Detect chapter breaks and titles"""
        chapter_breaks = []
        
        for page_num in range(len(self.doc)):
            text = self.extract_text_from_page(page_num)
            lines = text.split('\n')
            
            for line in lines:
                line = line.strip()
                # Look for chapter patterns
                if self.is_chapter_title(line):
                    chapter_breaks.append((page_num, line))
                    print(f"📖 Found chapter on page {page_num + 1}: {line}")
                    break
        
        return chapter_breaks
    
    def is_chapter_title(self, line: str) -> bool:
        """Determine if a line is likely a chapter title"""
        line = line.strip()
        
        # Common chapter patterns
        chapter_patterns = [
            r'^CHAPTER\s+\d+',
            r'^Chapter\s+\d+',
            r'^PRINCIPLE\s+\d+',
            r'^Principle\s+\d+',
            r'^\d+\.\s+[A-Z]',  # Numbered chapters like "1. TITLE"
            r'^INTRODUCTION$',
            r'^PREFACE$',
            r'^FOREWORD$',
            r'^CONCLUSION$',
            r'^APPENDIX',
        ]
        
        for pattern in chapter_patterns:
            if re.match(pattern, line, re.IGNORECASE):
                return True
        
        # Also check for lines that are all caps and substantial length
        if (line.isupper() and 
            len(line) > 10 and 
            len(line) < 60 and
            not any(char in line for char in ['(', ')', '.', ',', ';', ':']) and
            line.count(' ') <= 5):
            return True
            
        return False
    
    def clean_text(self, text: str) -> str:
        """Clean and format text for MDX"""
        # Remove excessive whitespace
        text = re.sub(r'\n\s*\n\s*\n', '\n\n', text)
        text = re.sub(r' +', ' ', text)
        
        # Fix common PDF extraction issues
        text = re.sub(r'([a-z])([A-Z])', r'\1 \2', text)  # Add space between lowercase and uppercase
        text = re.sub(r'(\.)([A-Z])', r'. \2', text)  # Add space after periods
        
        # Clean up line breaks in paragraphs
        lines = text.split('\n')
        cleaned_lines = []
        
        for i, line in enumerate(lines):
            line = line.strip()
            if not line:
                cleaned_lines.append('')
                continue
                
            # If line ends mid-sentence and next line continues, join them
            if (i < len(lines) - 1 and 
                line and 
                not line.endswith('.') and 
                not line.endswith('!') and 
                not line.endswith('?') and
                not line.endswith(':') and
                lines[i + 1].strip() and
                not lines[i + 1].strip()[0].isupper()):
                cleaned_lines.append(line + ' ')
            else:
                cleaned_lines.append(line)
        
        text = ''.join(cleaned_lines)
        text = re.sub(r' +', ' ', text)
        
        return text.strip()
    
    def create_slug(self, title: str) -> str:
        """Create a URL-friendly slug from title"""
        slug = re.sub(r'[^\w\s-]', '', title.lower())
        slug = re.sub(r'[-\s]+', '-', slug)
        return slug.strip('-')
    
    def extract_chapters(self) -> List[Dict]:
        """Extract chapters from the PDF"""
        chapter_breaks = self.detect_chapter_breaks()
        chapters = []
        
        if not chapter_breaks:
            # If no chapters detected, treat entire PDF as one chapter
            full_text = ""
            for page_num in range(len(self.doc)):
                full_text += self.extract_text_from_page(page_num) + "\n"
            
            chapters.append({
                'title': 'Rethink 12 Principles',
                'slug': 'rethink-12-principles',
                'content': self.clean_text(full_text),
                'page_start': 1,
                'page_end': len(self.doc)
            })
        else:
            # Extract content for each chapter
            for i, (page_num, title) in enumerate(chapter_breaks):
                # Determine end page for this chapter
                if i < len(chapter_breaks) - 1:
                    end_page = chapter_breaks[i + 1][0]
                else:
                    end_page = len(self.doc)
                
                # Extract text for this chapter
                chapter_text = ""
                for p in range(page_num, end_page):
                    chapter_text += self.extract_text_from_page(p) + "\n"
                
                chapters.append({
                    'title': title.strip(),
                    'slug': self.create_slug(title),
                    'content': self.clean_text(chapter_text),
                    'page_start': page_num + 1,
                    'page_end': end_page,
                    'chapter_number': i + 1
                })
        
        return chapters
    
    def create_mdx_frontmatter(self, chapter: Dict) -> Dict:
        """Create frontmatter for MDX file"""
        return {
            'title': chapter['title'],
            'slug': chapter['slug'],
            'chapter': chapter.get('chapter_number', 1),
            'pageStart': chapter['page_start'],
            'pageEnd': chapter['page_end'],
            'description': f"Chapter {chapter.get('chapter_number', 1)}: {chapter['title']}",
            'type': 'chapter'
        }
    
    def save_mdx_file(self, chapter: Dict, chapter_dir: Path):
        """Save chapter as MDX file"""
        # Create frontmatter
        metadata = self.create_mdx_frontmatter(chapter)
        
        # Create the post with frontmatter
        post = frontmatter.Post(chapter['content'], **metadata)
        
        # Save to file
        mdx_file = chapter_dir / 'overview.mdx'
        with open(mdx_file, 'w', encoding='utf-8') as f:
            f.write(frontmatter.dumps(post))
        
        print(f"✅ Saved: {mdx_file}")
    
    def create_chapter_metadata(self, chapter: Dict, chapter_dir: Path):
        """Create additional metadata files for the chapter"""
        # Create activities.json if it doesn't exist
        activities_file = chapter_dir / 'activities.json'
        if not activities_file.exists():
            activities = {
                "activities": [
                    {
                        "id": f"{chapter['slug']}-reading",
                        "type": "reading",
                        "title": f"Read: {chapter['title']}",
                        "description": f"Read and understand the concepts in {chapter['title']}",
                        "estimatedTime": 15,
                        "required": True
                    }
                ]
            }
            
            with open(activities_file, 'w', encoding='utf-8') as f:
                json.dump(activities, f, indent=2)
            print(f"✅ Created: {activities_file}")
        
        # Create quiz.json if it doesn't exist
        quiz_file = chapter_dir / 'quiz.json'
        if not quiz_file.exists():
            quiz = {
                "title": f"{chapter['title']} - Knowledge Check",
                "description": f"Test your understanding of {chapter['title']}",
                "questions": [
                    {
                        "id": f"q1-{chapter['slug']}",
                        "type": "multiple-choice",
                        "question": f"What is the main concept discussed in {chapter['title']}?",
                        "options": [
                            "Option A",
                            "Option B", 
                            "Option C",
                            "Option D"
                        ],
                        "correct": 0,
                        "explanation": "This question needs to be customized based on the chapter content."
                    }
                ]
            }
            
            with open(quiz_file, 'w', encoding='utf-8') as f:
                json.dump(quiz, f, indent=2)
            print(f"✅ Created: {quiz_file}")
    
    def convert(self):
        """Main conversion process"""
        print(f"🚀 Starting PDF to MDX conversion...")
        print(f"📁 Output directory: {self.output_dir}")
        
        # Open PDF
        self.open_pdf()
        
        # Extract chapters
        chapters = self.extract_chapters()
        print(f"📚 Found {len(chapters)} chapters")
        
        # Create output directory structure
        principles_dir = self.output_dir / 'principles'
        principles_dir.mkdir(parents=True, exist_ok=True)
        
        # Save each chapter
        for chapter in chapters:
            # Create chapter directory
            chapter_dir = principles_dir / chapter['slug']
            chapter_dir.mkdir(exist_ok=True)
            
            # Save MDX file
            self.save_mdx_file(chapter, chapter_dir)
            
            # Create metadata files
            self.create_chapter_metadata(chapter, chapter_dir)
        
        # Close PDF
        if self.doc:
            self.doc.close()
        
        print(f"✅ Conversion complete! Generated {len(chapters)} chapters.")
        return chapters

def main():
    """Main function"""
    pdf_path = "/Users/joshshepherd/Desktop/GitHub/rethink-book/docs/Rethink 12 Principles ebook.pdf"
    output_dir = "/Users/joshshepherd/Desktop/GitHub/rethink-book/content"
    
    if not os.path.exists(pdf_path):
        print(f"❌ PDF file not found: {pdf_path}")
        return
    
    converter = PDFToMDXConverter(pdf_path, output_dir)
    chapters = converter.convert()
    
    # Print summary
    print("\n📊 Conversion Summary:")
    print("-" * 50)
    for i, chapter in enumerate(chapters, 1):
        print(f"{i:2d}. {chapter['title']}")
        print(f"    📁 {chapter['slug']}")
        print(f"    📄 Pages {chapter['page_start']}-{chapter['page_end']}")
        print()

if __name__ == "__main__":
    main()
