#!/usr/bin/env python3
"""
Final organizer and title extractor for the converted MDX files

This script reads the generated MDX files and extracts better titles,
ensuring proper organization and metadata.
"""

import os
import re
import json
from pathlib import Path
import frontmatter

def extract_full_principle_title(content: str, principle_num: int) -> str:
    """Extract the full principle title from content"""
    lines = content.split('\n')
    
    # Look for the principle title pattern
    title_lines = []
    found_principle = False
    
    for i, line in enumerate(lines[:30]):  # Search in first 30 lines
        line = line.strip()
        
        if f'PRINCIPLE {principle_num}:' in line.upper():
            found_principle = True
            # Collect this line and subsequent lines until we find the main title
            title_lines.append(line)
            
            # Look ahead for continuation lines
            for j in range(i + 1, min(i + 10, len(lines))):
                next_line = lines[j].strip()
                if (next_line and 
                    not next_line.startswith('"') and  # Skip quotes
                    not next_line.startswith('—') and  # Skip attributions
                    len(next_line) > 5 and
                    next_line.isupper() and
                    not any(char in next_line for char in ['(', ')', '.', ',', ';'])):
                    title_lines.append(next_line)
                elif next_line and next_line.startswith('"'):
                    # Stop at quotes (usually the beginning of description)
                    break
                elif len(title_lines) > 1:
                    # Stop if we have multiple lines and hit a different pattern
                    break
            break
    
    if title_lines:
        # Join the title lines
        full_title = ' '.join(title_lines)
        # Clean up the title
        full_title = re.sub(r'\s+', ' ', full_title).strip()
        return full_title
    
    return f"PRINCIPLE {principle_num}"

def update_principle_files():
    """Update all principle files with better titles and metadata"""
    principles_dir = Path("/Users/joshshepherd/Desktop/GitHub/rethink-book/content/principles")
    
    print("🔧 Updating principle files with better titles...")
    
    # Process each principle directory
    for i in range(1, 13):  # Principles 1-12
        principle_dir = principles_dir / f"principle-{i}"
        mdx_file = principle_dir / "overview.mdx"
        
        if not mdx_file.exists():
            print(f"⚠️  Missing: {mdx_file}")
            continue
        
        # Read the current file
        with open(mdx_file, 'r', encoding='utf-8') as f:
            post = frontmatter.load(f)
        
        # Extract better title from content
        better_title = extract_full_principle_title(post.content, i)
        
        # Update metadata
        post.metadata['title'] = better_title
        post.metadata['description'] = f"Principle {i}: {better_title.replace(f'PRINCIPLE {i}:', '').strip()}"
        
        # Save updated file
        with open(mdx_file, 'w', encoding='utf-8') as f:
            f.write(frontmatter.dumps(post))
        
        print(f"✅ Updated Principle {i}: {better_title}")
        
        # Update activities.json with better title
        activities_file = principle_dir / "activities.json"
        if activities_file.exists():
            with open(activities_file, 'r', encoding='utf-8') as f:
                activities = json.load(f)
            
            # Update activity titles
            for activity in activities.get("activities", []):
                if "reading" in activity.get("type", ""):
                    activity["title"] = f"Read: {better_title}"
                    activity["description"] = f"Read and understand {better_title}"
                elif "reflection" in activity.get("type", ""):
                    activity["title"] = f"Reflect on Principle {i}"
                    activity["description"] = f"Consider how this principle applies to your ministry context"
            
            with open(activities_file, 'w', encoding='utf-8') as f:
                json.dump(activities, f, indent=2)
        
        # Update quiz.json
        quiz_file = principle_dir / "quiz.json"
        if quiz_file.exists():
            with open(quiz_file, 'r', encoding='utf-8') as f:
                quiz = json.load(f)
            
            quiz["title"] = f"{better_title} - Knowledge Check"
            quiz["description"] = f"Test your understanding of {better_title}"
            
            with open(quiz_file, 'w', encoding='utf-8') as f:
                json.dump(quiz, f, indent=2)

def create_table_of_contents():
    """Create a table of contents file"""
    principles_dir = Path("/Users/joshshepherd/Desktop/GitHub/rethink-book/content/principles")
    
    toc_data = {
        "title": "Rethink: The 12 Principles",
        "description": "A comprehensive guide to rethinking church through 12 missional principles",
        "chapters": []
    }
    
    # Add introduction
    intro_dir = principles_dir / "introduction"
    if intro_dir.exists():
        toc_data["chapters"].append({
            "slug": "introduction",
            "title": "Introduction",
            "description": "Setting the foundation for rethinking church"
        })
    
    # Add principles
    for i in range(1, 13):
        principle_dir = principles_dir / f"principle-{i}"
        mdx_file = principle_dir / "overview.mdx"
        
        if mdx_file.exists():
            with open(mdx_file, 'r', encoding='utf-8') as f:
                post = frontmatter.load(f)
            
            toc_data["chapters"].append({
                "slug": f"principle-{i}",
                "title": post.metadata.get("title", f"Principle {i}"),
                "description": post.metadata.get("description", f"Principle {i}"),
                "principleNumber": i
            })
    
    # Save table of contents
    toc_file = Path("/Users/joshshepherd/Desktop/GitHub/rethink-book/content/table-of-contents.json")
    with open(toc_file, 'w', encoding='utf-8') as f:
        json.dump(toc_data, f, indent=2)
    
    print(f"✅ Created table of contents: {toc_file}")
    return toc_data

def main():
    """Main function"""
    print("🚀 Final organization of converted PDF content...")
    
    # Update principle files
    update_principle_files()
    
    # Create table of contents
    toc_data = create_table_of_contents()
    
    print("\n📊 Final Summary:")
    print("-" * 50)
    for chapter in toc_data["chapters"]:
        if "principleNumber" in chapter:
            print(f"Principle {chapter['principleNumber']:2d}: {chapter['title']}")
        else:
            print(f"               {chapter['title']}")
    
    print(f"\n✅ Organization complete! {len(toc_data['chapters'])} chapters ready.")

if __name__ == "__main__":
    main()
