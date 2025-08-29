# 🧹 React/Next.js App Health & Cleanup Assistant

## Overview

After periods of creative flow and rapid development, your React/Next.js application may benefit from comprehensive cleanup and optimization. This prompt helps identify and resolve common issues that don't alter your content but significantly improve code quality, performance, and maintainability.

## What This Cleanup Covers

### 🔍 **Error Detection & Resolution**

- **Build Errors**: Fix TypeScript errors, missing imports, and compilation issues
- **Runtime Errors**: Resolve client/server component conflicts and hydration issues
- **ESLint Warnings**: Clean up linting issues and enforce best practices
- **Console Errors**: Eliminate browser console warnings and errors

### 🚀 **Performance Optimization**

- **Import Optimization**: Remove unused imports and consolidate import statements
- **Bundle Analysis**: Identify and fix unnecessary re-renders and large bundles
- **Image Optimization**: Ensure proper Next.js Image component usage
- **Code Splitting**: Implement proper dynamic imports where beneficial

### 🏗️ **Code Quality & Structure**

- **Type Safety**: Strengthen TypeScript implementations and fix any types
- **Component Structure**: Organize components logically and remove duplicates
- **File Organization**: Ensure consistent file naming and directory structure
- **Dead Code Removal**: Identify and remove unused files, components, and functions

### 🎨 **Styling & UI Consistency**

- **Tailwind Optimization**: Clean up unused classes and consolidate styles
- **Component Consistency**: Ensure consistent use of shadcn/ui components
- **Responsive Design**: Verify proper responsive implementation across breakpoints
- **Accessibility**: Check for basic a11y compliance and improvements

### ⚙️ **Configuration & Dependencies**

- **Package.json Cleanup**: Remove unused dependencies and update outdated packages
- **Next.js Configuration**: Optimize next.config.js settings
- **Environment Variables**: Ensure proper env var usage and security
- **Git Hygiene**: Clean up .gitignore and remove unnecessary tracked files

### 🔒 **Security & Best Practices**

- **Dependency Audit**: Check for security vulnerabilities
- **API Route Security**: Ensure proper error handling and validation
- **Client-Side Security**: Remove sensitive data from client bundles
- **SEO Optimization**: Improve meta tags, structured data, and performance metrics

## Usage Instructions

**Copy this prompt and use it anytime you need cleanup:**

---

## 🎯 **THE CLEANUP PROMPT**

```
Please perform a comprehensive health check and cleanup of my React/Next.js application with Tailwind CSS and shadcn/ui components.

**Focus Areas:**
1. Fix all build errors and TypeScript issues
2. Resolve runtime errors and component conflicts
3. Clean up unused imports, files, and dependencies
4. Optimize performance and bundle size
5. Ensure consistent styling and component usage
6. Improve code organization and structure
7. Check for security vulnerabilities
8. Enhance accessibility and SEO

**Important Constraints:**
- DO NOT alter or delete any user-facing content
- DO NOT modify database schemas or data
- DO NOT change core functionality or features
- DO NOT alter design/styling without explicit approval
- PRESERVE all existing routes and API endpoints

**Deliverables:**
1. Summary of all issues found and fixed
2. Before/after comparison of key metrics
3. Recommendations for ongoing maintenance
4. Any issues that require manual review

Please start with a scan of the entire codebase and provide a prioritized list of issues to fix.
```

---

## When to Use This Prompt

### 🚨 **Critical Times**

- Before major deployments
- After periods of rapid development
- When build times become slow
- Before code reviews or audits
- When performance issues arise

### 🔄 **Regular Maintenance**

- Weekly during active development
- Monthly for stable applications
- After major dependency updates
- When onboarding new team members

## Expected Outcomes

### ✅ **Immediate Benefits**

- Faster build times
- Cleaner console output
- Improved developer experience
- Better code maintainability
- Enhanced performance metrics

### 📈 **Long-term Benefits**

- Reduced technical debt
- Easier feature development
- Better team collaboration
- Improved application stability
- Enhanced user experience

## Pro Tips

1. **Run this cleanup in a separate branch** to review changes before merging
2. **Document any manual fixes** that may be needed in the future
3. **Set up automated tools** (ESLint, Prettier, TypeScript strict mode) to prevent issues
4. **Regular maintenance** is more effective than large cleanup sessions
5. **Test thoroughly** after cleanup to ensure no functionality was broken

## Safety First

This cleanup process is designed to be **non-destructive** to your application's functionality and content. However, always:

- Create a backup or commit your work before starting
- Review all changes before deploying
- Test critical user paths after cleanup
- Keep an eye on performance metrics post-cleanup

---

**Ready to clean up your codebase? Copy the cleanup prompt above and let's get started! 🚀**
