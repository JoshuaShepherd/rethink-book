#!/usr/bin/env python3
"""
MDX Formatter and Cleaner

This script cleans up and properly formats all MDX files in the principles directory,
ensuring proper MDX formatting with headers, blockquotes, emphasis, and other
markdown elements.
"""

import os
import re
from pathlib import Path
import frontmatter

class MDXFormatter:
    def __init__(self, principles_dir: str):
        self.principles_dir = Path(principles_dir)
        
    def clean_and_format_content(self, content: str) -> str:
        """Clean and format content for proper MDX"""
        lines = content.split('\n')
        formatted_lines = []
        i = 0
        
        while i < len(lines):
            line = lines[i].strip()
            
            # Skip empty lines but preserve paragraph breaks
            if not line:
                formatted_lines.append('')
                i += 1
                continue
            
            # Format principle titles as main headers
            if self.is_principle_title(line, i, lines):
                title_lines = self.collect_title_lines(i, lines)
                formatted_title = self.format_principle_title(title_lines)
                formatted_lines.append(formatted_title)
                i += len(title_lines)
                formatted_lines.append('')  # Add spacing after title
                continue
            
            # Format quotes as blockquotes
            if self.is_quote_line(line):
                quote = self.format_quote(line)
                formatted_lines.append(quote)
                formatted_lines.append('')  # Add spacing after quote
                i += 1
                continue
                
            # Format section headers (all caps, short lines)
            if self.is_section_header(line):
                header = self.format_section_header(line)
                formatted_lines.append(header)
                formatted_lines.append('')  # Add spacing after header
                i += 1
                continue
                
            # Format scripture references and citations
            if self.is_scripture_block(line, i, lines):
                scripture_lines = self.collect_scripture_block(i, lines)
                formatted_scripture = self.format_scripture_block(scripture_lines)
                formatted_lines.extend(formatted_scripture)
                formatted_lines.append('')  # Add spacing after scripture
                i += len(scripture_lines)
                continue
            
            # Format emphasized text (italics for book titles, emphasis)
            line = self.format_emphasis(line)
            
            # Add the line as a regular paragraph
            formatted_lines.append(line)
            i += 1
        
        # Join lines and clean up excessive spacing
        formatted_content = '\n'.join(formatted_lines)
        formatted_content = re.sub(r'\n\s*\n\s*\n+', '\n\n', formatted_content)  # Max 2 newlines
        return formatted_content.strip()
    
    def is_principle_title(self, line: str, index: int, lines: list) -> bool:
        """Check if this line starts a principle title"""
        return (line.upper().startswith('PRINCIPLE') and 
                ':' in line and 
                len(line) > 10)
    
    def collect_title_lines(self, start_index: int, lines: list) -> list:
        """Collect all lines that are part of the principle title"""
        title_lines = []
        i = start_index
        
        # Get the first line (PRINCIPLE X:)
        if i < len(lines):
            title_lines.append(lines[i].strip())
            i += 1
        
        # Collect following lines that are part of the title (all caps, no quotes)
        while i < len(lines):
            line = lines[i].strip()
            if (line and 
                line.isupper() and 
                not line.startswith('"') and 
                not line.startswith('—') and
                len(line) < 50 and  # Reasonable title length
                not any(char in line for char in ['.', ',', ';', '(', ')'])):
                title_lines.append(line)
                i += 1
            else:
                break
                
        return title_lines
    
    def format_principle_title(self, title_lines: list) -> str:
        """Format principle title as main header"""
        if not title_lines:
            return ""
        
        # Join title lines with spaces
        full_title = ' '.join(title_lines)
        return f"# {full_title}"
    
    def is_quote_line(self, line: str) -> bool:
        """Check if line is a quote"""
        return (line.startswith('"') and line.endswith('"')) or line.startswith('—')
    
    def format_quote(self, line: str) -> str:
        """Format quote as blockquote"""
        return f"> {line}"
    
    def is_section_header(self, line: str) -> bool:
        """Check if line is a section header"""
        return (line.isupper() and 
                5 < len(line) < 50 and 
                not line.startswith('"') and
                not line.startswith('—') and
                not line.startswith('PRINCIPLE') and
                line.count(' ') <= 5)
    
    def format_section_header(self, line: str) -> str:
        """Format section header"""
        # Convert spaced out headers like "T H E  I N C A R N A T I O N" 
        if re.match(r'^[A-Z](\s[A-Z])+', line):
            clean_header = re.sub(r'\s+', ' ', line)
            return f"## {clean_header}"
        else:
            return f"## {line}"
    
    def is_scripture_block(self, line: str, index: int, lines: list) -> bool:
        """Check if this starts a scripture quotation block"""
        return (line.startswith('"') and 
                not line.endswith('"') and  # Multi-line quote
                len(line) > 50)  # Substantial quote
    
    def collect_scripture_block(self, start_index: int, lines: list) -> list:
        """Collect scripture quotation block"""
        block_lines = []
        i = start_index
        in_quote = True
        
        while i < len(lines) and in_quote:
            line = lines[i].strip()
            if line:
                block_lines.append(line)
                # Check if quote ends
                if line.endswith('"') or line.startswith('(') or line.startswith('—'):
                    in_quote = False
            i += 1
            
        return block_lines
    
    def format_scripture_block(self, block_lines: list) -> list:
        """Format scripture as blockquote"""
        formatted = []
        for line in block_lines:
            if line.startswith('(') or line.startswith('—'):  # Attribution
                formatted.append(f"> *{line}*")
            else:
                formatted.append(f"> {line}")
        return formatted
    
    def format_emphasis(self, line: str) -> str:
        """Add emphasis formatting for book titles and key terms"""
        # Italicize book titles (words before author names or that look like titles)
        line = re.sub(r'\b([A-Z][a-z]+(?:\s+[A-Z][a-z]*)*(?:\s+[A-Z][a-z]*)*)\s*,\s*([A-Z][a-z]+\s+[A-Z][a-z]+)', 
                      r'*\1*, \2', line)
        
        # Italicize words in quotes that are being defined or emphasized
        line = re.sub(r'"([^"]+)"', r'"\1"', line)  # Keep quotes as is for now
        
        # Bold important theological terms when they first appear
        theological_terms = [
            'missio Dei', 'incarnational', 'Christendom', 'post-Christendom',
            'multiplication', 'discipleship', 'missional', 'ecclesiology'
        ]
        
        for term in theological_terms:
            # Only bold the first occurrence
            pattern = rf'\b{re.escape(term)}\b'
            if re.search(pattern, line, re.IGNORECASE):
                line = re.sub(pattern, f'**{term}**', line, count=1, flags=re.IGNORECASE)
        
        return line
    
    def format_mdx_file(self, mdx_path: Path):
        """Format a single MDX file"""
        try:
            # Read the file
            with open(mdx_path, 'r', encoding='utf-8') as f:
                post = frontmatter.load(f)
            
            print(f"📝 Formatting: {mdx_path.name}")
            
            # Clean and format the content
            formatted_content = self.clean_and_format_content(post.content)
            post.content = formatted_content
            
            # Write back to file
            with open(mdx_path, 'w', encoding='utf-8') as f:
                f.write(frontmatter.dumps(post))
            
            print(f"✅ Completed: {mdx_path.name}")
            
        except Exception as e:
            print(f"❌ Error formatting {mdx_path}: {e}")
    
    def format_all_files(self):
        """Format all MDX files in the principles directory"""
        print("🚀 Starting MDX formatting for all principle files...")
        
        # Get all directories in principles
        for principle_dir in sorted(self.principles_dir.iterdir()):
            if principle_dir.is_dir():
                mdx_file = principle_dir / 'overview.mdx'
                if mdx_file.exists():
                    self.format_mdx_file(mdx_file)
                else:
                    print(f"⚠️  No overview.mdx found in {principle_dir.name}")
        
        print("✅ MDX formatting complete!")

def main():
    """Main function"""
    principles_dir = "/Users/joshshepherd/Desktop/GitHub/rethink-book/content/principles"
    
    formatter = MDXFormatter(principles_dir)
    formatter.format_all_files()

if __name__ == "__main__":
    main()
