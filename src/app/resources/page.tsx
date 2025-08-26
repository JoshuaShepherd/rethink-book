'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Download,
  FileText,
  Video,
  Headphones,
  Calendar,
  ArrowRight,
  Search,
  Filter,
  Tag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const featuredResources = [
  {
    id: 1,
    title: 'The Complete Guide to Missional Communities',
    type: 'ebook',
    description:
      'A comprehensive 47-page guide covering theory, practice, and case studies for starting and sustaining missional communities.',
    downloadCount: '2,400+',
    category: 'Church Planting',
    featured: true,
    image: '/resources/missional-communities-guide.jpg',
  },
  {
    id: 2,
    title: 'Post-Christendom Ministry Assessment Tool',
    type: 'tool',
    description:
      'Interactive assessment to help leaders understand their ministry context and identify post-Christendom challenges.',
    downloadCount: '1,800+',
    category: 'Assessment',
    featured: true,
    image: '/resources/assessment-tool.jpg',
  },
];

const blogPosts = [
  {
    id: 1,
    title: 'Why Church Planting Models from the 1990s Are Failing Today',
    excerpt:
      'The attractional church model worked in Christendom contexts, but post-Christendom requires fundamentally different approaches to multiplication.',
    date: '2024-01-15',
    readTime: '8 min',
    category: 'Church Planting',
    author: 'Brad Brisco',
    featured: true,
    slug: 'church-planting-models-failing',
  },
  {
    id: 2,
    title: 'Incarnational Mission: Beyond Programs to Presence',
    excerpt:
      'True incarnational mission requires embedding our lives in local contexts, not just running outreach programs from church buildings.',
    date: '2024-01-08',
    readTime: '12 min',
    category: 'Incarnational Mission',
    author: 'Brad Brisco',
    slug: 'incarnational-mission-presence',
  },
  {
    id: 3,
    title: "The Missio Dei: Understanding God's Mission vs. Our Mission",
    excerpt:
      'The fundamental shift from viewing mission as something we do to participating in what God is already doing in the world.',
    date: '2024-01-01',
    readTime: '10 min',
    category: 'Theology',
    author: 'Brad Brisco',
    slug: 'missio-dei-gods-mission',
  },
];

const resourceCategories = [
  { name: 'All Resources', count: 24 },
  { name: 'Church Planting', count: 8 },
  { name: 'Incarnational Mission', count: 6 },
  { name: 'Leadership', count: 5 },
  { name: 'Theology', count: 3 },
  { name: 'Assessment Tools', count: 2 },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4 glass-card">
              Free Resources & Insights
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Resources & Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Practical tools, theological insights, and case studies to help
              you rethink church multiplication and incarnational mission in
              your context.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search resources..."
                  className="pl-10 glass-card"
                />
              </div>
              <Button className="glass-card">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16 bg-white/50 dark:bg-gray-950/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Featured Resources
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
              Our most popular downloads and tools for missional leaders
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="glass-card h-full group hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden rounded-t-xl">
                    <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-white" />
                    </div>
                    <Badge className="absolute top-4 left-4 bg-white/90 text-gray-800">
                      {resource.type.toUpperCase()}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {resource.category}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {resource.downloadCount} downloads
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-blue-600 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                      {resource.description}
                    </p>
                    <Button className="w-full glass-card group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Download className="w-4 h-4 mr-2" />
                      Download Free
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Latest Insights
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
              Fresh perspectives on missional theology and church multiplication
              practice
            </p>
          </motion.div>

          <div className="grid gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-card group hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-4 gap-6">
                      <div className="md:col-span-1">
                        <div className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 md:mb-0">
                          <FileText className="w-12 h-12 text-white" />
                        </div>
                      </div>
                      <div className="md:col-span-3">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                          <span className="text-sm text-gray-500">
                            {post.readTime} read
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            By {post.author}
                          </span>
                          <Link href={`/blog/${post.slug}`}>
                            <Button
                              variant="outline"
                              className="glass-card group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600"
                            >
                              Read More
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/blog">
              <Button size="lg" variant="outline" className="glass-card">
                View All Blog Posts
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-16 bg-white/50 dark:bg-gray-950/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Browse by Category
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
              Explore resources organized by key topics and ministry areas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {resourceCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-card group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Tag className="w-8 h-8 text-blue-500 mx-auto mb-2 group-hover:text-blue-600" />
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1 text-sm">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {category.count} resources
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12 rounded-2xl text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6">
              Stay Updated with New Resources
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Get the latest blog posts, free resources, and exclusive content
              delivered directly to your inbox every month.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                type="email"
                className="glass-card flex-1"
              />
              <Button size="lg" className="glass-card">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No spam. Unsubscribe anytime. 2,400+ leaders already subscribed.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
