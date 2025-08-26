#!/usr/bin/env python3
"""
Final MDX Formatter - Clean and Professional

This script provides the final pass to ensure all MDX files are properly formatted
with correct blockquotes, headers, emphasis, and clean structure.
"""

import os
import re
from pathlib import Path
import frontmatter

class FinalMDXFormatter:
    def __init__(self, principles_dir: str):
        self.principles_dir = Path(principles_dir)
        
    def format_content(self, content: str) -> str:
        """Final formatting pass for clean MDX"""
        
        # First, let's clean up the content line by line
        lines = content.split('\n')
        formatted_lines = []
        i = 0
        
        while i < len(lines):
            line = lines[i].strip()
            
            if not line:
                # Preserve single empty lines, remove multiple
                if formatted_lines and formatted_lines[-1] != '':
                    formatted_lines.append('')
                i += 1
                continue
            
            # Handle headers (already formatted)
            if line.startswith('#'):
                formatted_lines.append(line)
                i += 1
                continue
                
            # Handle quotes - opening quote after header
            if self.is_opening_quote(line):
                formatted_lines.append(f"> {line}")
                i += 1
                continue
                
            # Handle section headers
            if self.is_section_header(line):
                if formatted_lines and formatted_lines[-1] != '':
                    formatted_lines.append('')
                formatted_lines.append(f"## {self.clean_header(line)}")
                i += 1
                continue
                
            # Handle scripture quotations
            if self.is_long_quote_start(line):
                quote_lines, consumed = self.format_long_quote(i, lines)
                if formatted_lines and formatted_lines[-1] != '':
                    formatted_lines.append('')
                formatted_lines.extend(quote_lines)
                i += consumed
                continue
            
            # Handle regular text with formatting
            formatted_line = self.format_text(line)
            formatted_lines.append(formatted_line)
            i += 1
        
        # Join and final cleanup
        result = '\n'.join(formatted_lines)
        
        # Clean up excessive line breaks
        result = re.sub(r'\n\s*\n\s*\n+', '\n\n', result)
        
        # Fix bold formatting issues
        result = re.sub(r'\*{3,4}([^*]+)\*{3,4}', r'**\1**', result)
        
        return result.strip()
    
    def is_opening_quote(self, line: str) -> bool:
        """Check for opening attribution quote"""
        return (line.startswith('"') and line.endswith('"') and 
                '—' in line and len(line) > 30)
    
    def is_section_header(self, line: str) -> bool:
        """Check for section headers"""
        return (line.isupper() and 
                5 <= len(line) <= 50 and
                not line.startswith('"') and
                not line.startswith('#') and
                not line.startswith('PRINCIPLE') and
                line.count(' ') <= 6 and
                '.' not in line and
                ',' not in line)
    
    def clean_header(self, header: str) -> str:
        """Clean up header text"""
        # Fix spaced headers like "T H E   I N C A R N A T I O N"
        if re.match(r'^[A-Z](\s+[A-Z])+', header):
            return re.sub(r'\s+', ' ', header)
        return header
    
    def is_long_quote_start(self, line: str) -> bool:
        """Check for start of long quotation"""
        return (line.startswith('"') and not line.endswith('"') and len(line) > 30)
    
    def format_long_quote(self, start_idx: int, lines: list) -> tuple:
        """Format a long quotation as blockquote"""
        quote_lines = []
        i = start_idx
        in_quote = True
        
        while i < len(lines) and in_quote:
            line = lines[i].strip()
            if line:
                quote_lines.append(f"> {line}")
                # Check if quote ends
                if (line.endswith('"') or 
                    line.endswith('").') or 
                    '(emphasis added)' in line.lower() or
                    line.startswith('(') and line.endswith(')')):
                    in_quote = False
            i += 1
        
        return quote_lines, i - start_idx
    
    def format_text(self, text: str) -> str:
        """Format regular text with proper emphasis"""
        
        # Fix book title formatting
        text = re.sub(r'\b([A-Z][a-z]+(?:\s+[A-Za-z]+)*),\s+([A-Z][a-z]+\s+[A-Z][a-z]+)', 
                      r'*\1*, \2', text)
        
        # Bold important theological terms (but not if already formatted)
        theological_terms = [
            'missiological', 'missional', 'incarnational', 'ecclesiological',
            'Christendom', 'post-Christendom', 'multiplication', 'APEST'
        ]
        
        for term in theological_terms:
            if term.lower() in text.lower() and f'**{term}**' not in text:
                pattern = r'\b' + re.escape(term) + r'\b'
                text = re.sub(pattern, f'**{term}**', text, count=1, flags=re.IGNORECASE)
        
        # Italicize Hebrew/Greek terms
        foreign_terms = ['shelach', 'eskénosen', 'missio Dei']
        for term in foreign_terms:
            if term in text and f'*{term}*' not in text:
                text = text.replace(term, f'*{term}*')
        
        return text
    
    def process_file(self, file_path: Path):
        """Process a single MDX file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                post = frontmatter.load(f)
            
            print(f"🎯 Final formatting: {file_path.parent.name}")
            
            # Apply final formatting
            post.content = self.format_content(post.content)
            
            # Save the file
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(frontmatter.dumps(post))
            
            print(f"✅ Completed: {file_path.parent.name}")
            
        except Exception as e:
            print(f"❌ Error processing {file_path}: {e}")
    
    def process_all_files(self):
        """Process all MDX files"""
        print("🚀 Final MDX formatting pass...")
        
        for principle_dir in sorted(self.principles_dir.iterdir()):
            if principle_dir.is_dir():
                mdx_file = principle_dir / 'overview.mdx'
                if mdx_file.exists():
                    self.process_file(mdx_file)
        
        print("✅ Final MDX formatting complete!")

def main():
    principles_dir = "/Users/joshshepherd/Desktop/GitHub/rethink-book/content/principles"
    formatter = FinalMDXFormatter(principles_dir)
    formatter.process_all_files()

if __name__ == "__main__":
    main()
