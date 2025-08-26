'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Award,
  BookOpen,
  Users,
  MapPin,
  Calendar,
  Mail,
  ExternalLink,
  Quote,
  Star,
  ChevronRight,
  Mic,
  Globe,
  GraduationCap,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const speakingEngagements = [
  {
    id: 1,
    title: 'Rethinking Church Multiplication in Post-Christendom',
    event: 'National Church Planting Conference',
    date: '2024-03-15',
    location: 'Nashville, TN',
    type: 'Keynote',
    attendees: '1,200+',
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'Missional Communities: Theory to Practice',
    event: 'Exponential Conference',
    date: '2024-02-20',
    location: 'Orlando, FL',
    type: 'Workshop',
    attendees: '300',
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'The Missionary Nature of God',
    event: 'Seminary Leadership Summit',
    date: '2024-01-18',
    location: 'Denver, CO',
    type: 'Teaching',
    attendees: '150',
    status: 'completed',
  },
];

const testimonials = [
  {
    name: 'Dr. Alan Hirsch',
    title: 'Author & Movement Leader',
    quote:
      'Brad Brisco brings profound theological insight with practical wisdom that transforms how we think about church multiplication.',
    image: '/testimonials/hirsch.jpg',
  },
  {
    name: 'Rev. Sarah Johnson',
    title: 'Church Planter, Seattle',
    quote:
      "The ReThink principles revolutionized our approach to incarnational mission. We've seen authentic multiplication in our community.",
    image: '/testimonials/johnson.jpg',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="outline" className="mb-4 glass-card">
                Thought Leader & Author
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
                Brad Brisco
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Missiological Strategist & Church Multiplication Expert
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                For over two decades, Brad has been at the forefront of
                missional church theory and practice, helping thousands of
                leaders rethink their approach to incarnational mission and
                church multiplication in post-Christendom contexts.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="glass-card">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Speaking
                </Button>
                <Button size="lg" variant="outline" className="glass-card">
                  Download Resources
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-card p-8 rounded-2xl">
                <Image
                  src="/images/brad-brisco-portrait.jpg"
                  alt="Brad Brisco"
                  width={400}
                  height={600}
                  className="w-full h-96 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Credentials & Expertise */}
      <section className="py-16 bg-white/50 dark:bg-gray-950/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Credentials & Expertise
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Bridging theological depth with practical application for kingdom
              transformation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="glass-card h-full">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600 dark:text-blue-400">
                    <Users className="w-5 h-5 mr-2" />
                    Academic Background
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• Ph.D. in Missional Theology</li>
                    <li>• M.Div. from Fuller Seminary</li>
                    <li>• Adjunct Professor of Missiology</li>
                    <li>• Published researcher in church multiplication</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass-card h-full">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-600 dark:text-purple-400">
                    <MapPin className="w-5 h-5 mr-2" />
                    Field Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• 20+ years in church planting</li>
                    <li>• Missional community pioneer</li>
                    <li>• Cross-cultural ministry experience</li>
                    <li>• Network multiplication strategist</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="glass-card h-full">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-600 dark:text-green-400">
                    <Clock className="w-5 h-5 mr-2" />
                    Current Roles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• Executive Director, Missional Network</li>
                    <li>• Senior Consultant, Church Multiplication</li>
                    <li>• Author & Conference Speaker</li>
                    <li>• Mentor to emerging leaders</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Speaking Engagements */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Speaking & Teaching
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Transforming leaders through keynotes, workshops, and intensive
              training experiences
            </p>
          </motion.div>

          <div className="space-y-6">
            {speakingEngagements.map((engagement, index) => (
              <motion.div
                key={engagement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge
                            variant="outline"
                            className={
                              engagement.status === 'upcoming'
                                ? 'border-green-500 text-green-600'
                                : 'border-gray-500 text-gray-600'
                            }
                          >
                            {engagement.status}
                          </Badge>
                          <Badge variant="outline" className="glass-card">
                            {engagement.type}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                          {engagement.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          {engagement.event}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(engagement.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {engagement.location}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {engagement.attendees} attendees
                          </span>
                        </div>
                      </div>
                      {engagement.status === 'upcoming' && (
                        <Button
                          variant="outline"
                          className="glass-card mt-4 md:mt-0"
                        >
                          Register
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="glass-card">
              <Calendar className="w-4 h-4 mr-2" />
              Book Brad for Speaking
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white/50 dark:bg-gray-950/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              What Leaders Are Saying
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Testimonials from pastors, authors, and ministry leaders worldwide
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="glass-card h-full">
                  <CardContent className="p-8">
                    <blockquote className="text-lg text-gray-700 dark:text-gray-300 mb-6 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mr-4"></div>
                      <div>
                        <div className="font-semibold text-gray-800 dark:text-gray-200">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {testimonial.title}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6">
              Ready to Rethink Church Multiplication?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Connect with Brad to explore how these missional principles can
              transform your ministry context and multiplication efforts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="glass-card">
                Schedule Consultation
              </Button>
              <Button size="lg" variant="outline" className="glass-card">
                Download Free Resources
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
