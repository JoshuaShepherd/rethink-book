#!/usr/bin/env python3
"""
Enhanced MDX Formatter - Second Pass

This script does a more thorough job of formatting MDX content with proper
blockquotes, scripture formatting, emphasis, and other markdown elements.
"""

import os
import re
from pathlib import Path
import frontmatter

class EnhancedMDXFormatter:
    def __init__(self, principles_dir: str):
        self.principles_dir = Path(principles_dir)
        
    def format_content(self, content: str) -> str:
        """Enhanced content formatting with proper MDX elements"""
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
                
            # Handle principle titles (already have # header)
            if line.startswith('# PRINCIPLE'):
                formatted_lines.append(line)
                formatted_lines.append('')
                i += 1
                continue
            
            # Handle opening quotes (usually right after title)
            if self.is_opening_quote(line):
                formatted_lines.append(f"> {line}")
                formatted_lines.append('')
                i += 1
                continue
            
            # Handle section headers
            if self.is_section_header(line):
                # Format section header
                if re.match(r'^[A-Z](\s+[A-Z])+', line):
                    # Spaced out headers like "T H E   I N C A R N A T I O N"
                    clean_header = re.sub(r'\s+', ' ', line)
                    formatted_lines.append(f"## {clean_header}")
                else:
                    formatted_lines.append(f"## {line}")
                formatted_lines.append('')
                i += 1
                continue
            
            # Handle long scripture quotations
            if self.is_scripture_quote_start(line):
                scripture_block, lines_consumed = self.process_scripture_block(i, lines)
                formatted_lines.extend(scripture_block)
                formatted_lines.append('')
                i += lines_consumed
                continue
                
            # Handle single line quotes
            if self.is_single_quote(line):
                formatted_lines.append(f"> {line}")
                formatted_lines.append('')
                i += 1
                continue
            
            # Handle list items that look like scripture or poem
            if self.is_scripture_list_item(line):
                formatted_lines.append(f"> {line}")
                i += 1
                continue
            
            # Format regular paragraphs with emphasis
            formatted_line = self.add_emphasis(line)
            formatted_lines.append(formatted_line)
            i += 1
        
        # Join and clean up
        result = '\n'.join(formatted_lines)
        result = re.sub(r'\n\s*\n\s*\n+', '\n\n', result)
        return result.strip()
    
    def is_opening_quote(self, line: str) -> bool:
        """Check if this is an opening quote (attribution quote after title)"""
        return (line.startswith('"') and line.endswith('"') and 
                '—' in line and len(line) > 30)
    
    def is_section_header(self, line: str) -> bool:
        """Check if line is a section header"""
        return (line.isupper() and 
                5 < len(line) < 60 and 
                not line.startswith('"') and
                not line.startswith('—') and
                not line.startswith('PRINCIPLE') and
                line.count(' ') <= 8 and
                not any(char in line for char in ['.', ',', ';', '(', ')']))
    
    def is_scripture_quote_start(self, line: str) -> bool:
        """Check if this starts a multi-line scripture quotation"""
        return (line.startswith('"') and 
                not line.endswith('"') and
                len(line) > 40)
    
    def process_scripture_block(self, start_index: int, lines: list) -> tuple:
        """Process a multi-line scripture block"""
        block_lines = []
        i = start_index
        
        while i < len(lines):
            line = lines[i].strip()
            if not line:
                i += 1
                continue
                
            # Add as blockquote
            block_lines.append(f"> {line}")
            
            # Check if this ends the quote
            if (line.endswith('"') or 
                line.startswith('(') or 
                line.endswith(').') or
                'emphasis added' in line.lower()):
                break
                
            i += 1
        
        return block_lines, i - start_index + 1
    
    def is_single_quote(self, line: str) -> bool:
        """Check if this is a single line quote"""
        return ((line.startswith('"') and line.endswith('"')) or
                (line.startswith('—') and len(line) > 10))
    
    def is_scripture_list_item(self, line: str) -> bool:
        """Check if this is a scripture list item (like Isaiah 61 breakdown)"""
        return (line.startswith('He has sent me') or
                line.startswith('She has sent me') or
                (line.startswith('"') and 'sent me' in line))
    
    def add_emphasis(self, line: str) -> str:
        """Add emphasis formatting to text"""
        
        # Italicize book titles (Title, Author pattern)
        line = re.sub(r'\b([A-Z][a-z]+(?:\s+[A-Z][a-z]*){1,4})\s*,\s*([A-Z][a-z]+\s+[A-Z][a-z]+)', 
                      r'*\1*, \2', line)
        
        # Bold key theological terms on first mention
        theological_terms = [
            r'\bmissio Dei\b', r'\bincarnational\b', r'\bmissional\b', 
            r'\bChristendom\b', r'\bpost-Christendom\b', r'\bmultiplication\b',
            r'\becclesiological\b', r'\becclesiologies\b', r'\bmissiological\b',
            r'\bAPEST\b', r'\btrinitarian\b'
        ]
        
        for term_pattern in theological_terms:
            # Only bold first occurrence in this line
            if re.search(term_pattern, line, re.IGNORECASE):
                line = re.sub(term_pattern, lambda m: f"**{m.group()}**", 
                             line, count=1, flags=re.IGNORECASE)
        
        # Italicize foreign language terms
        foreign_terms = [
            r'\bshelach\b', r'\beskénosen\b', r'\bmissio Dei\b'
        ]
        
        for term_pattern in foreign_terms:
            line = re.sub(term_pattern, lambda m: f"*{m.group()}*", 
                         line, flags=re.IGNORECASE)
        
        # Format scripture references
        line = re.sub(r'\(([1-3]?\s*[A-Z][a-z]+\s+\d+:\d+(?:-\d+)?)\)', 
                      r'(\1)', line)
        
        return line
    
    def format_file(self, file_path: Path):
        """Format a single MDX file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                post = frontmatter.load(f)
            
            print(f"🔧 Enhancing: {file_path.parent.name}/{file_path.name}")
            
            # Format the content
            post.content = self.format_content(post.content)
            
            # Write back
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(frontmatter.dumps(post))
                
            print(f"✅ Enhanced: {file_path.parent.name}/{file_path.name}")
            
        except Exception as e:
            print(f"❌ Error enhancing {file_path}: {e}")
    
    def format_all_files(self):
        """Format all MDX files"""
        print("🚀 Starting enhanced MDX formatting...")
        
        for principle_dir in sorted(self.principles_dir.iterdir()):
            if principle_dir.is_dir():
                mdx_file = principle_dir / 'overview.mdx'
                if mdx_file.exists():
                    self.format_file(mdx_file)
        
        print("✅ Enhanced MDX formatting complete!")

def main():
    principles_dir = "/Users/joshshepherd/Desktop/GitHub/rethink-book/content/principles"
    formatter = EnhancedMDXFormatter(principles_dir)
    formatter.format_all_files()

if __name__ == "__main__":
    main()
