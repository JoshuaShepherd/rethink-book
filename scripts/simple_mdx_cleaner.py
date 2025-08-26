#!/usr/bin/env python3
"""
Simple MDX Cleaner - Fix Critical Issues

This script focuses on fixing the most critical formatting issues:
- Duplicate headers
- Malformed headers  
- Quotes that should be blockquotes
- Excessive asterisks in bold formatting
"""

import os
import re
from pathlib import Path
import frontmatter

def clean_mdx_content(content: str) -> str:
    """Clean up MDX content focusing on critical issues"""
    
    # Fix malformed headers
    content = re.sub(r'^#+\s*#+\s*#+\s*#\s*', '# ', content, flags=re.MULTILINE)
    content = re.sub(r'^#+\s*#+\s*', '# ', content, flags=re.MULTILINE)
    
    # Fix excessive asterisks in bold text
    content = re.sub(r'\*{3,8}([^*]+)\*{3,8}', r'**\1**', content)
    
    lines = content.split('\n')
    cleaned_lines = []
    
    for line in lines:
        line = line.strip()
        
        # Skip empty lines initially, add them back for spacing
        if not line:
            if cleaned_lines and cleaned_lines[-1] != '':
                cleaned_lines.append('')
            continue
        
        # Fix headers
        if line.startswith('## ## ##'):
            line = line.replace('## ## ## ', '').replace('## ## ', '').replace('## ', '')
            if line.startswith('# '):
                cleaned_lines.append(line)
            else:
                cleaned_lines.append(f'# {line}')
        elif line.startswith('##') and ('PRINCIPLE' in line or line.isupper()):
            # Section headers
            header_text = line.replace('##', '').strip()
            if header_text.startswith('T H E') or header_text.startswith('I N C A R N'):
                # Clean up spaced headers
                header_text = re.sub(r'\s+', ' ', header_text)
            cleaned_lines.append(f'## {header_text}')
        elif line.startswith('#'):
            cleaned_lines.append(line)
        else:
            # Regular content
            cleaned_lines.append(line)
    
    # Rejoin content
    result = '\n'.join(cleaned_lines)
    
    # Clean up excessive spacing
    result = re.sub(r'\n\s*\n\s*\n+', '\n\n', result)
    
    return result.strip()

def process_file(file_path: Path):
    """Process a single MDX file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            post = frontmatter.load(f)
        
        print(f"🧹 Cleaning: {file_path.parent.name}")
        
        # Clean the content
        post.content = clean_mdx_content(post.content)
        
        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(frontmatter.dumps(post))
        
        print(f"✅ Cleaned: {file_path.parent.name}")
        
    except Exception as e:
        print(f"❌ Error cleaning {file_path}: {e}")

def main():
    """Main function"""
    principles_dir = Path("/Users/joshshepherd/Desktop/GitHub/rethink-book/content/principles")
    
    print("🧹 Simple MDX cleanup...")
    
    for principle_dir in sorted(principles_dir.iterdir()):
        if principle_dir.is_dir():
            mdx_file = principle_dir / 'overview.mdx'
            if mdx_file.exists():
                process_file(mdx_file)
    
    print("✅ Simple MDX cleanup complete!")

if __name__ == "__main__":
    main()
