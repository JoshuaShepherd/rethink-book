#!/bin/bash

# ReThink Book - Enhanced MDX Deployment Script
# This script deploys the enhanced MDX version of the ReThink Book

echo "🚀 Starting Enhanced MDX Deployment..."
echo ""

# Step 1: Install dependencies
echo "📦 Installing Enhanced Dependencies..."
npm install next-mdx-remote @mdx-js/react @mdx-js/loader

# Step 2: Migrate content
echo "📚 Migrating Content to Enhanced MDX..."
node scripts/migrate-mdx-content.js

# Step 3: Build content index
echo "🔍 Building Content Index..."
npm run build:content

# Step 4: Run type checking
echo "🔍 Type Checking..."
npx tsc --noEmit

# Step 5: Build for production
echo "🏗️ Building for Production..."
npm run build

# Step 6: Test the build
echo "🧪 Testing Build..."
npm run start &
SERVER_PID=$!
sleep 5

# Check if server is running
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Server is running successfully"
    kill $SERVER_PID
else
    echo "❌ Server failed to start"
    kill $SERVER_PID
    exit 1
fi

echo ""
echo "🎉 Enhanced MDX Deployment Complete!"
echo ""
echo "📋 Summary of Enhancements:"
echo "   • True MDX support with React components"
echo "   • Educational component library (ChapterIntro, PracticeBox, etc.)"
echo "   • Enhanced content structure with frontmatter"
echo "   • Interactive reading experience at /book"
echo "   • 36 chapters migrated and enhanced"
echo "   • Optimized build configuration"
echo ""
echo "🔗 New Routes:"
echo "   • /book - Enhanced book index"
echo "   • /book/[slug] - Individual chapters with MDX components"
echo ""
echo "🚀 Ready for GitHub deployment!"

# Optional: Auto-commit the changes
read -p "Would you like to commit these changes? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    git add .
    git commit -m "feat: Complete enhanced MDX integration

- Add true MDX support with next-mdx-remote
- Create comprehensive educational component library
- Migrate all 36 chapters to enhanced MDX format
- Add interactive book reading experience at /book routes
- Optimize build configuration for MDX
- Enhance content with frontmatter, key points, and structure"
    echo "✅ Changes committed!"
fi
