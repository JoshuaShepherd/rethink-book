#!/usr/bin/env python3
"""
Second Pass MDX Cleaner - Fix All Remaining Issues

This script performs a comprehensive second pass to fix all remaining
formatting issues across all MDX files.
"""

import os
import re
from pathlib import Path
import frontmatter

class SecondPassMDXCleaner:
    def __init__(self, principles_dir: str):
        self.principles_dir = Path(principles_dir)
        
    def clean_content(self, content: str) -> str:
        """Comprehensive content cleaning"""
        
        # Step 1: Split content and remove duplicates
        lines = content.split('\n')
        clean_lines = []
        seen_content = set()
        
        for line in lines:
            line = line.strip()
            
            # Skip empty lines for now, we'll add them back properly
            if not line:
                continue
                
            # Skip duplicate content (check normalized version)
            normalized = re.sub(r'[^a-zA-Z0-9\s]', '', line.lower()).strip()
            if normalized and len(normalized) > 10 and normalized in seen_content:
                continue
                
            if normalized and len(normalized) > 10:
                seen_content.add(normalized)
                
            clean_lines.append(line)
        
        # Step 2: Process lines for proper formatting
        formatted_lines = []
        i = 0
        
        while i < len(clean_lines):
            line = clean_lines[i]
            
            if not line:
                i += 1
                continue
            
            # Fix malformed headers
            if self.is_principle_header(line):
                header = self.clean_principle_header(line)
                formatted_lines.append(header)
                formatted_lines.append('')  # Add space after header
                i += 1
                continue
                
            # Handle opening quotes (make blockquotes)
            if self.is_opening_quote(line):
                formatted_lines.append(f"> {line}")
                formatted_lines.append('')
                i += 1
                continue
                
            # Handle section headers
            if self.is_section_header(line):
                header = self.clean_section_header(line)
                if formatted_lines and formatted_lines[-1] != '':
                    formatted_lines.append('')
                formatted_lines.append(header)
                formatted_lines.append('')
                i += 1
                continue
                
            # Handle long quotes (scripture passages)
            if self.is_long_quote_start(line):
                quote_block, consumed = self.process_long_quote(i, clean_lines)
                if formatted_lines and formatted_lines[-1] != '':
                    formatted_lines.append('')
                formatted_lines.extend(quote_block)
                formatted_lines.append('')
                i += consumed
                continue
            
            # Clean regular text
            cleaned_line = self.clean_text_line(line)
            formatted_lines.append(cleaned_line)
            i += 1
        
        # Step 3: Join with proper spacing
        result = self.add_proper_spacing(formatted_lines)
        
        # Step 4: Final cleanup
        result = self.final_cleanup(result)
        
        return result.strip()
    
    def is_principle_header(self, line: str) -> bool:
        """Check if line is a principle header (potentially malformed)"""
        return ('PRINCIPLE' in line.upper() and 
                (':' in line or line.upper().startswith('PRINCIPLE')))
    
    def clean_principle_header(self, line: str) -> str:
        """Clean and format principle header"""
        # Remove any existing markdown formatting
        line = re.sub(r'^#+\s*', '', line)
        line = re.sub(r'\*+([^*]+)\*+', r'\1', line)
        
        # Ensure it starts with #
        if not line.startswith('#'):
            line = f"# {line}"
        
        return line
    
    def is_opening_quote(self, line: str) -> bool:
        """Check for opening attribution quote"""
        return (line.startswith('"') and line.endswith('"') and 
                ('—' in line or '–' in line) and len(line) > 30)
    
    def is_section_header(self, line: str) -> bool:
        """Check for section headers"""
        return (line.isupper() and 
                5 <= len(line) <= 60 and
                not line.startswith('"') and
                not line.startswith('#') and
                not 'PRINCIPLE' in line and
                line.count('.') <= 1 and
                line.count(',') <= 1)
    
    def clean_section_header(self, line: str) -> str:
        """Clean section header"""
        # Fix spaced headers like "T H E   I N C A R N A T I O N"
        if re.match(r'^[A-Z](\s+[A-Z])+', line):
            line = re.sub(r'\s+', ' ', line)
        
        # Remove existing header markers
        line = re.sub(r'^#+\s*', '', line)
        
        return f"## {line}"
    
    def is_long_quote_start(self, line: str) -> bool:
        """Check for start of long quotation"""
        return (line.startswith('"') and not line.endswith('"') and len(line) > 30)
    
    def process_long_quote(self, start_idx: int, lines: list) -> tuple:
        """Process long quotation as blockquote"""
        quote_lines = []
        i = start_idx
        
        while i < len(lines):
            line = lines[i].strip()
            if line:
                quote_lines.append(f"> {line}")
                # Check for end conditions
                if (line.endswith('"') or 
                    line.endswith('").') or
                    '(emphasis added)' in line.lower() or
                    (line.startswith('(') and line.endswith(')'))):
                    break
            i += 1
        
        return quote_lines, i - start_idx + 1
    
    def clean_text_line(self, line: str) -> str:
        """Clean a regular text line"""
        
        # Fix excessive bold formatting
        line = re.sub(r'\*{3,}([^*]+)\*{3,}', r'**\1**', line)
        
        # Ensure proper spacing around emphasis
        line = re.sub(r'\*\*([^*]+)\*\*', r'**\1**', line)
        line = re.sub(r'\*([^*]+)\*', r'*\1*', line)
        
        # Fix quotes that should be blockquotes but aren't
        if (line.startswith('"') and len(line) > 50 and 
            not line.endswith('"')):
            return f"> {line}"
        
        return line
    
    def add_proper_spacing(self, lines: list) -> str:
        """Add proper paragraph spacing"""
        result_lines = []
        
        for i, line in enumerate(lines):
            result_lines.append(line)
            
            # Add spacing after headers, quotes, and paragraphs
            if line and i < len(lines) - 1:
                next_line = lines[i + 1] if i + 1 < len(lines) else ''
                
                # Add space after headers
                if (line.startswith('#') or line.startswith('>')) and next_line and not next_line.startswith('>'):
                    result_lines.append('')
                # Add space between paragraphs
                elif (not line.startswith('#') and not line.startswith('>') and 
                      next_line and not next_line.startswith('#') and not next_line.startswith('>')):
                    # Only add space for substantial paragraphs
                    if len(line) > 100 and len(next_line) > 100:
                        result_lines.append('')
        
        return '\n'.join(result_lines)
    
    def final_cleanup(self, content: str) -> str:
        """Final cleanup pass"""
        
        # Remove excessive line breaks
        content = re.sub(r'\n\s*\n\s*\n+', '\n\n', content)
        
        # Fix common issues
        content = re.sub(r'> \s*>', '>', content)  # Fix double quote markers
        content = re.sub(r'##\s*##\s*', '## ', content)  # Fix double header markers
        
        # Ensure proper spacing around headers
        content = re.sub(r'(^|\n)(#{1,6}\s+[^\n]+)(\n)([^\n#>])', r'\1\2\3\3\4', content)
        
        return content
    
    def process_file(self, file_path: Path):
        """Process a single MDX file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                post = frontmatter.load(f)
            
            print(f"🔍 Second pass: {file_path.parent.name}")
            
            # Clean the content
            original_length = len(post.content)
            post.content = self.clean_content(post.content)
            cleaned_length = len(post.content)
            
            # Save the file
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(frontmatter.dumps(post))
            
            reduction = original_length - cleaned_length
            print(f"✅ Cleaned: {file_path.parent.name} (reduced by {reduction} chars)")
            
        except Exception as e:
            print(f"❌ Error processing {file_path}: {e}")
    
    def process_all_files(self):
        """Process all MDX files"""
        print("🔍 Second pass MDX cleanup - fixing all remaining issues...")
        
        for principle_dir in sorted(self.principles_dir.iterdir()):
            if principle_dir.is_dir():
                mdx_file = principle_dir / 'overview.mdx'
                if mdx_file.exists():
                    self.process_file(mdx_file)
        
        print("✅ Second pass cleanup complete!")

def main():
    principles_dir = "/Users/joshshepherd/Desktop/GitHub/rethink-book/content/principles"
    cleaner = SecondPassMDXCleaner(principles_dir)
    cleaner.process_all_files()

if __name__ == "__main__":
    main()
