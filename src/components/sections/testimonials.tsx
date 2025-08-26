'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const testimonials = [
  {
    content:
      "Brad's insights on missional transformation have revolutionized how we approach church planting. His 12 principles framework provided the clarity and direction we desperately needed.",
    author: 'Dr. Sarah Williams',
    title: 'Director of Church Planting',
    organization: 'Global Mission Network',
    rating: 5,
  },
  {
    content:
      'Having Brad speak at our leadership retreat was transformational. His deep understanding of post-Christendom contexts challenged our assumptions and renewed our vision.',
    author: 'Pastor Michael Chen',
    title: 'Senior Pastor',
    organization: 'Grace Community Church',
    rating: 5,
  },
  {
    content:
      "Brad's consulting work with our denomination helped us develop a multiplication strategy that's already producing fruit. His strategic insights are invaluable.",
    author: 'Rev. Amanda Rodriguez',
    title: 'Regional Director',
    organization: 'Alliance of Churches',
    rating: 5,
  },
];

const stats = [
  {
    number: '50+',
    label: 'Speaking Events Annually',
    icon: Users,
  },
  {
    number: '20,000+',
    label: 'Leaders Equipped',
    icon: Users,
  },
  {
    number: '15+',
    label: 'Years Experience',
    icon: Star,
  },
];

export function TestimonialSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-blue-950/20 dark:via-gray-900 dark:to-purple-950/20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 glass-card">
            <Star className="w-3 h-3 mr-1" />
            What Leaders Are Saying
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Trusted by Ministry Leaders Worldwide
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Brad's expertise in missional transformation has impacted thousands
            of leaders and organizations across denominational lines.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="glass-card h-full">
                <CardContent className="p-8">
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative mb-6">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-500/20" />
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed italic pl-6">
                      "{testimonial.content}"
                    </p>
                  </div>

                  {/* Author */}
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-200">
                      {testimonial.author}
                    </h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      {testimonial.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {testimonial.organization}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
