#!/usr/bin/env python3
"""
Final Aggressive MDX Cleaner

This script aggressively fixes all MDX formatting issues with a clean slate approach.
"""

import os
import re
from pathlib import Path
import frontmatter

def clean_mdx_content_aggressive(content: str) -> str:
    """Aggressively clean MDX content"""
    
    # Split into lines and clean
    lines = content.split('\n')
    clean_lines = []
    
    # Remove empty lines and normalize
    for line in lines:
        line = line.strip()
        if line:
            clean_lines.append(line)
    
    # Process content
    result_lines = []
    i = 0
    
    while i < len(clean_lines):
        line = clean_lines[i]
        
        # Skip malformed frontmatter lines that somehow got into content
        if (line.startswith('title:') or line.startswith('type:') or 
            line.startswith('---') or line.startswith('chapter:')):
            i += 1
            continue
        
        # Fix principle headers
        if 'PRINCIPLE' in line.upper() and ':' in line:
            # Extract clean header
            header_match = re.search(r'PRINCIPLE\s+\d+:\s*[^"]*', line, re.IGNORECASE)
            if header_match:
                clean_header = header_match.group().strip()
                result_lines.append(f"# {clean_header}")
                result_lines.append("")
            i += 1
            continue
        
        # Handle opening quotes (make blockquotes)
        if (line.startswith('"') and line.endswith('"') and 
            ('—' in line or '–' in line) and len(line) > 30):
            result_lines.append(f"> {line}")
            result_lines.append("")
            i += 1
            continue
        
        # Handle section headers (all caps, standalone)
        if (line.isupper() and 5 <= len(line) <= 50 and 
            not line.startswith('"') and not line.startswith('#') and
            '.' not in line and ',' not in line and
            not 'PRINCIPLE' in line):
            
            # Clean spaced headers
            if re.match(r'^[A-Z](\s+[A-Z])+', line):
                clean_header = re.sub(r'\s+', ' ', line)
                result_lines.append(f"## {clean_header}")
            else:
                result_lines.append(f"## {line}")
            result_lines.append("")
            i += 1
            continue
        
        # Handle long quotes
        if (line.startswith('"') and not line.endswith('"') and len(line) > 30):
            # Process as blockquote until we find the end
            result_lines.append(f"> {line}")
            i += 1
            while i < len(clean_lines):
                quote_line = clean_lines[i]
                result_lines.append(f"> {quote_line}")
                if (quote_line.endswith('"') or 
                    '(emphasis added)' in quote_line.lower() or
                    (quote_line.startswith('(') and quote_line.endswith(')'))):
                    break
                i += 1
            result_lines.append("")
            i += 1
            continue
        
        # Clean regular text
        line = fix_emphasis(line)
        result_lines.append(line)
        i += 1
    
    # Join and final cleanup
    result = '\n'.join(result_lines)
    result = re.sub(r'\n\s*\n\s*\n+', '\n\n', result)
    
    return result.strip()

def fix_emphasis(line: str) -> str:
    """Fix emphasis formatting in a line"""
    
    # Fix excessive asterisks
    line = re.sub(r'\*{3,}([^*]+)\*{3,}', r'**\1**', line)
    line = re.sub(r'\*\*\*\*([^*]+)\*\*\*\*', r'**\1**', line)
    
    # Bold theological terms (first occurrence only)
    theological_terms = [
        'missiological', 'missional', 'incarnational', 'ecclesiological',
        'Christendom', 'post-Christendom', 'multiplication', 'APEST',
        'trinitarian'
    ]
    
    for term in theological_terms:
        # Only bold if not already formatted
        if term.lower() in line.lower() and f'**{term}**' not in line.lower():
            pattern = r'\b' + re.escape(term) + r'\b'
            line = re.sub(pattern, f'**{term}**', line, count=1, flags=re.IGNORECASE)
    
    # Italicize foreign terms
    foreign_terms = ['shelach', 'eskénosen', 'missio Dei']
    for term in foreign_terms:
        if term in line and f'*{term}*' not in line:
            line = line.replace(term, f'*{term}*')
    
    return line

def process_mdx_file(file_path: Path):
    """Process a single MDX file with aggressive cleaning"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            post = frontmatter.load(f)
        
        print(f"🧹 Aggressive clean: {file_path.parent.name}")
        
        # Clean content aggressively
        post.content = clean_mdx_content_aggressive(post.content)
        
        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(frontmatter.dumps(post))
        
        print(f"✅ Cleaned: {file_path.parent.name}")
        
    except Exception as e:
        print(f"❌ Error: {file_path}: {e}")

def main():
    """Main function"""
    principles_dir = Path("/Users/joshshepherd/Desktop/GitHub/rethink-book/content/principles")
    
    print("🧹 Aggressive MDX cleanup - final pass...")
    
    for principle_dir in sorted(principles_dir.iterdir()):
        if principle_dir.is_dir():
            mdx_file = principle_dir / 'overview.mdx'
            if mdx_file.exists():
                process_mdx_file(mdx_file)
    
    print("✅ Aggressive cleanup complete!")

if __name__ == "__main__":
    main()
