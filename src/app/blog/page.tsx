'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Tag,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

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
    slug: 'church-planting-models-failing',
    featured: true,
    views: 2400,
    comments: 18,
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
    views: 1800,
    comments: 12,
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
    views: 2100,
    comments: 24,
  },
  {
    id: 4,
    title: 'Post-Christendom Leadership: Adaptive vs. Technical Challenges',
    excerpt:
      'Understanding the difference between technical problems with known solutions and adaptive challenges requiring new learning.',
    date: '2023-12-20',
    readTime: '9 min',
    category: 'Leadership',
    author: 'Brad Brisco',
    slug: 'post-christendom-leadership',
    views: 1600,
    comments: 15,
  },
  {
    id: 5,
    title: 'Rethinking Church Metrics: Beyond Attendance and Giving',
    excerpt:
      'Moving from institutional metrics focused on gathering to missional metrics focused on sending and impact.',
    date: '2023-12-12',
    readTime: '11 min',
    category: 'Church Health',
    author: 'Brad Brisco',
    slug: 'rethinking-church-metrics',
    views: 1950,
    comments: 21,
  },
  {
    id: 6,
    title: 'Multiplying Disciples, Not Just Converts',
    excerpt:
      'The critical distinction between making converts and making disciples who can make other disciples in reproducible patterns.',
    date: '2023-12-05',
    readTime: '7 min',
    category: 'Discipleship',
    author: 'Brad Brisco',
    slug: 'multiplying-disciples-not-converts',
    views: 2200,
    comments: 19,
  },
];

const categories = [
  { name: 'All', count: 24 },
  { name: 'Church Planting', count: 8 },
  { name: 'Incarnational Mission', count: 6 },
  { name: 'Leadership', count: 5 },
  { name: 'Theology', count: 3 },
  { name: 'Discipleship', count: 2 },
];

export default function BlogPage() {
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
              Missional Insights & Perspectives
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              The ReThink Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Fresh perspectives on church multiplication, incarnational
              mission, and leading in post-Christendom contexts from Brad Brisco
              and guest contributors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search articles..."
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

      {/* Categories */}
      <section className="py-8 bg-white/50 dark:bg-gray-950/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Button
                  variant={index === 0 ? 'default' : 'outline'}
                  size="sm"
                  className={`glass-card ${index === 0 ? 'bg-blue-600 text-white' : ''}`}
                >
                  {category.name} ({category.count})
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Featured Article
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Our most impactful recent post
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-card overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="grid md:grid-cols-2">
                <div className="relative overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <TrendingUp className="w-16 h-16 text-white" />
                  </div>
                  <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                    FEATURED
                  </Badge>
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <Badge variant="outline" className="text-xs">
                      {blogPosts[0].category}
                    </Badge>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(blogPosts[0].date).toLocaleDateString()}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {blogPosts[0].readTime}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 group-hover:text-blue-600 transition-colors">
                    {blogPosts[0].title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {blogPosts[0].views.toLocaleString()} views
                      </span>
                      <span className="flex items-center">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        {blogPosts[0].comments} comments
                      </span>
                    </div>
                    <Link href={`/blog/${blogPosts[0].slug}`}>
                      <Button className="glass-card group-hover:bg-blue-600 group-hover:text-white">
                        Read Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* All Articles */}
      <section className="py-16 bg-white/50 dark:bg-gray-950/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              All Articles
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Explore our complete library of missional insights
            </p>
          </motion.div>

          <div className="grid gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-card group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-4 gap-6">
                      <div className="md:col-span-1">
                        <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-blue-200/50 dark:border-blue-800/50">
                          <Tag className="w-8 h-8 text-blue-500" />
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
                          <span className="text-sm text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              {post.views.toLocaleString()} views
                            </span>
                            <span className="flex items-center">
                              <MessageCircle className="w-3 h-3 mr-1" />
                              {post.comments} comments
                            </span>
                          </div>
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

          {/* Load More */}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="glass-card">
              Load More Articles
            </Button>
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
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Never Miss a New Article
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Get new blog posts delivered to your inbox as soon as they're
              published.
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
              Join 2,400+ ministry leaders getting weekly insights.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
