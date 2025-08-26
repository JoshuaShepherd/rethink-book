#!/usr/bin/env python3
"""
Comprehensive MDX Formatter - Final Clean Version

This script performs a complete formatting pass to ensure all MDX files
are properly formatted with correct headers, blockquotes, and clean text.
"""

import os
import re
from pathlib import Path
import frontmatter

def format_mdx_content(content: str) -> str:
    """Comprehensive content formatting"""
    
    # Step 1: Clean up and normalize the text
    lines = content.split('\n')
    cleaned_lines = []
    
    for line in lines:
        line = line.strip()
        if line:
            cleaned_lines.append(line)
        elif cleaned_lines and cleaned_lines[-1] != '':
            cleaned_lines.append('')  # Preserve paragraph breaks
    
    # Step 2: Process line by line for proper formatting
    formatted_lines = []
    i = 0
    
    while i < len(cleaned_lines):
        line = cleaned_lines[i]
        
        if not line:
            formatted_lines.append('')
            i += 1
            continue
        
        # Handle principle headers
        if line.startswith('# PRINCIPLE') or re.match(r'^#{2,4}\s+#\s+PRINCIPLE', line):
            clean_header = re.sub(r'^#+\s*#+\s*', '# ', line)
            formatted_lines.append(clean_header)
            i += 1
            continue
        
        # Handle opening quotes (right after headers)
        if (line.startswith('"') and line.endswith('"') and '—' in line and 
            len(line) > 30):
            formatted_lines.append(f"> {line}")
            i += 1
            continue
        
        # Handle section headers (all caps, standalone)
        if (line.isupper() and 5 <= len(line) <= 50 and
            not line.startswith('"') and not line.startswith('#') and
            '.' not in line and ',' not in line):
            
            # Clean spaced headers like "T H E   I N C A R N A T I O N"
            if re.match(r'^[A-Z](\s+[A-Z])+', line):
                clean_header = re.sub(r'\s+', ' ', line)
                formatted_lines.append(f"## {clean_header}")
            else:
                formatted_lines.append(f"## {line}")
            i += 1
            continue
        
        # Handle long scripture quotations
        if (line.startswith('"') and not line.endswith('"') and len(line) > 30):
            # Process multi-line quote
            quote_lines = []
            while i < len(cleaned_lines):
                quote_line = cleaned_lines[i]
                if quote_line:
                    quote_lines.append(f"> {quote_line}")
                    # Check for end of quote
                    if (quote_line.endswith('"') or '(emphasis added)' in quote_line.lower() or
                        (quote_line.startswith('(') and quote_line.endswith(')'))):
                        break
                i += 1
            formatted_lines.extend(quote_lines)
            i += 1
            continue
        
        # Format regular text
        formatted_line = format_text_line(line)
        formatted_lines.append(formatted_line)
        i += 1
    
    # Step 3: Join and final cleanup
    result = '\n'.join(formatted_lines)
    
    # Clean up excessive spacing
    result = re.sub(r'\n\s*\n\s*\n+', '\n\n', result)
    
    # Fix formatting issues
    result = re.sub(r'\*{3,6}([^*]+)\*{3,6}', r'**\1**', result)  # Fix excessive asterisks
    
    return result.strip()

def format_text_line(line: str) -> str:
    """Format a single line of text with proper emphasis"""
    
    # Bold important theological terms (first occurrence)
    theological_terms = [
        'missiological', 'missional', 'incarnational', 'ecclesiological',
        'Christendom', 'post-Christendom', 'multiplication', 'APEST',
        'trinitarian'
    ]
    
    for term in theological_terms:
        if term.lower() in line.lower() and f'**{term}**' not in line.lower():
            pattern = r'\b' + re.escape(term) + r'\b'
            line = re.sub(pattern, f'**{term}**', line, count=1, flags=re.IGNORECASE)
    
    # Italicize foreign terms
    foreign_terms = ['shelach', 'eskénosen', 'missio Dei']
    for term in foreign_terms:
        if term in line and f'*{term}*' not in line:
            line = line.replace(term, f'*{term}*')
    
    # Format book titles (simple pattern)
    line = re.sub(r'\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*),\s*([A-Z][a-z]+\s+[A-Z][a-z]+)', 
                  r'*\1*, \2', line)
    
    return line

def process_mdx_file(file_path: Path):
    """Process a single MDX file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            post = frontmatter.load(f)
        
        print(f"🔧 Processing: {file_path.parent.name}")
        
        # Format the content
        post.content = format_mdx_content(post.content)
        
        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(frontmatter.dumps(post))
        
        print(f"✅ Completed: {file_path.parent.name}")
        
    except Exception as e:
        print(f"❌ Error processing {file_path}: {e}")

def main():
    """Main function"""
    principles_dir = Path("/Users/joshshepherd/Desktop/GitHub/rethink-book/content/principles")
    
    print("🚀 Comprehensive MDX formatting...")
    
    for principle_dir in sorted(principles_dir.iterdir()):
        if principle_dir.is_dir():
            mdx_file = principle_dir / 'overview.mdx'
            if mdx_file.exists():
                process_mdx_file(mdx_file)
    
    print("✅ Comprehensive MDX formatting complete!")

if __name__ == "__main__":
    main()
