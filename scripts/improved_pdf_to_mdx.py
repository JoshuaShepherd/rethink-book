#!/usr/bin/env python3
"""
Improved PDF to MDX Converter with better chapter consolidation

This script creates a more organized structure by consolidating related sections
and filtering out false positive chapter detections.
"""

import fitz  # PyMuPDF
import os
import re
import json
from pathlib import Path
from typing import List, Dict, Tuple
import frontmatter

class ImprovedPDFToMDXConverter:
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
    
    def get_main_chapters(self) -> List[Tuple[int, str]]:
        """Get the main chapter breaks (Introduction + 12 Principles)"""
        main_chapters = []
        
        for page_num in range(len(self.doc)):
            text = self.extract_text_from_page(page_num)
            lines = text.split('\n')
            
            for line in lines:
                line = line.strip()
                # Look for main chapter patterns only
                if self.is_main_chapter_title(line):
                    main_chapters.append((page_num, line))
                    print(f"📖 Found main chapter on page {page_num + 1}: {line}")
                    break
        
        return main_chapters
    
    def is_main_chapter_title(self, line: str) -> bool:
        """Determine if a line is a main chapter title"""
        line = line.strip()
        
        # Main chapter patterns - more restrictive
        main_patterns = [
            r'^INTRODUCTION$',
            r'^PRINCIPLE\s+\d+:',
            r'^PRINCIPLE\s+\d+$',
        ]
        
        for pattern in main_patterns:
            if re.match(pattern, line, re.IGNORECASE):
                return True
                
        return False
    
    def clean_text(self, text: str) -> str:
        """Clean and format text for MDX"""
        # Remove page numbers and headers/footers
        lines = text.split('\n')
        cleaned_lines = []
        
        for line in lines:
            line = line.strip()
            
            # Skip likely page numbers, headers, footers
            if (re.match(r'^\d+$', line) or  # Just a number
                line.upper() in ['RETHINK', 'THE 12 PRINCIPLES'] or  # Headers
                len(line) < 3):  # Very short lines
                continue
                
            cleaned_lines.append(line)
        
        text = '\n'.join(cleaned_lines)
        
        # Remove excessive whitespace
        text = re.sub(r'\n\s*\n\s*\n+', '\n\n', text)
        text = re.sub(r' +', ' ', text)
        
        # Fix common PDF extraction issues
        text = re.sub(r'([a-z])([A-Z])', r'\1 \2', text)  # Add space between words
        text = re.sub(r'(\.)([A-Z])', r'. \2', text)  # Add space after periods
        
        return text.strip()
    
    def create_slug(self, title: str) -> str:
        """Create a URL-friendly slug from title"""
        # Extract principle number if present
        principle_match = re.match(r'PRINCIPLE\s+(\d+)', title, re.IGNORECASE)
        if principle_match:
            num = principle_match.group(1)
            return f"principle-{num}"
        
        # Handle introduction
        if 'INTRODUCTION' in title.upper():
            return 'introduction'
            
        # Fallback to generic slug
        slug = re.sub(r'[^\w\s-]', '', title.lower())
        slug = re.sub(r'[-\s]+', '-', slug)
        return slug.strip('-')
    
    def extract_consolidated_chapters(self) -> List[Dict]:
        """Extract and consolidate chapters"""
        main_chapters = self.get_main_chapters()
        chapters = []
        
        if not main_chapters:
            print("❌ No main chapters found")
            return []
        
        # Create consolidated chapters
        for i, (page_num, title) in enumerate(main_chapters):
            # Determine end page for this chapter
            if i < len(main_chapters) - 1:
                end_page = main_chapters[i + 1][0]
            else:
                end_page = len(self.doc) - 10  # Exclude bibliography/references
            
            # Extract text for this chapter
            chapter_text = ""
            for p in range(page_num, min(end_page, len(self.doc))):
                chapter_text += self.extract_text_from_page(p) + "\n"
            
            # Clean and format the title
            clean_title = self.extract_chapter_title(title, chapter_text)
            
            chapters.append({
                'title': clean_title,
                'slug': self.create_slug(title),
                'content': self.clean_text(chapter_text),
                'page_start': page_num + 1,
                'page_end': min(end_page, len(self.doc)),
                'chapter_number': i + 1,
                'principle_number': self.extract_principle_number(title)
            })
        
        return chapters
    
    def extract_chapter_title(self, detected_title: str, chapter_text: str) -> str:
        """Extract a better chapter title from the content"""
        # For principles, try to find the full title
        if 'PRINCIPLE' in detected_title.upper():
            lines = chapter_text.split('\n')[:20]  # Look in first 20 lines
            for line in lines:
                line = line.strip()
                if (line.upper().startswith('PRINCIPLE') and 
                    len(line) > len(detected_title) and
                    ':' in line):
                    return line
        
        return detected_title
    
    def extract_principle_number(self, title: str) -> int:
        """Extract principle number from title"""
        match = re.search(r'PRINCIPLE\s+(\d+)', title, re.IGNORECASE)
        if match:
            return int(match.group(1))
        return 0
    
    def create_mdx_frontmatter(self, chapter: Dict) -> Dict:
        """Create frontmatter for MDX file"""
        frontmatter_data = {
            'title': chapter['title'],
            'slug': chapter['slug'],
            'chapter': chapter['chapter_number'],
            'pageStart': chapter['page_start'],
            'pageEnd': chapter['page_end'],
            'description': f"{chapter['title']}",
            'type': 'principle' if chapter['principle_number'] > 0 else 'chapter'
        }
        
        if chapter['principle_number'] > 0:
            frontmatter_data['principleNumber'] = chapter['principle_number']
            
        return frontmatter_data
    
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
        # Create activities.json
        activities_file = chapter_dir / 'activities.json'
        activities = {
            "activities": [
                {
                    "id": f"{chapter['slug']}-reading",
                    "type": "reading",
                    "title": f"Read: {chapter['title']}",
                    "description": f"Read and understand the concepts in {chapter['title']}",
                    "estimatedTime": 20 if chapter['principle_number'] > 0 else 15,
                    "required": True
                }
            ]
        }
        
        # Add reflection activity for principles
        if chapter['principle_number'] > 0:
            activities["activities"].append({
                "id": f"{chapter['slug']}-reflection",
                "type": "reflection",
                "title": f"Reflect on Principle {chapter['principle_number']}",
                "description": f"Consider how {chapter['title']} applies to your ministry context",
                "estimatedTime": 15,
                "required": True
            })
        
        with open(activities_file, 'w', encoding='utf-8') as f:
            json.dump(activities, f, indent=2)
        print(f"✅ Created: {activities_file}")
        
        # Create quiz.json
        quiz_file = chapter_dir / 'quiz.json'
        quiz = {
            "title": f"{chapter['title']} - Knowledge Check",
            "description": f"Test your understanding of {chapter['title']}",
            "questions": [
                {
                    "id": f"q1-{chapter['slug']}",
                    "type": "multiple-choice",
                    "question": f"What is the main focus of {chapter['title']}?",
                    "options": [
                        "Personal spiritual growth",
                        "Missional church principles", 
                        "Traditional church practices",
                        "Administrative procedures"
                    ],
                    "correct": 1,
                    "explanation": "This principle focuses on rethinking church practices from a missional perspective."
                }
            ]
        }
        
        with open(quiz_file, 'w', encoding='utf-8') as f:
            json.dump(quiz, f, indent=2)
        print(f"✅ Created: {quiz_file}")
    
    def convert(self):
        """Main conversion process"""
        print(f"🚀 Starting improved PDF to MDX conversion...")
        print(f"📁 Output directory: {self.output_dir}")
        
        # Open PDF
        self.open_pdf()
        
        # Extract consolidated chapters
        chapters = self.extract_consolidated_chapters()
        print(f"📚 Found {len(chapters)} main chapters")
        
        if not chapters:
            return []
        
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
    output_dir = "/Users/joshshepherd/Desktop/GitHub/rethink-book/content-improved"
    
    if not os.path.exists(pdf_path):
        print(f"❌ PDF file not found: {pdf_path}")
        return
    
    converter = ImprovedPDFToMDXConverter(pdf_path, output_dir)
    chapters = converter.convert()
    
    # Print summary
    print("\n📊 Improved Conversion Summary:")
    print("-" * 60)
    for i, chapter in enumerate(chapters, 1):
        print(f"{i:2d}. {chapter['title']}")
        print(f"    📁 {chapter['slug']}")
        print(f"    📄 Pages {chapter['page_start']}-{chapter['page_end']}")
        if chapter['principle_number'] > 0:
            print(f"    🎯 Principle #{chapter['principle_number']}")
        print()

if __name__ == "__main__":
    main()
