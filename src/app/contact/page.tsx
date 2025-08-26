'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Mail,
  Phone,
  MapPin,
  Users,
  Clock,
  Award,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  User,
  Building,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const speakingTopics = [
  {
    title: 'Rethinking Church Multiplication in Post-Christendom',
    duration: '45-60 min',
    audience: 'Senior Leaders, Church Planters',
    description:
      'A comprehensive overview of how post-Christendom contexts require fundamentally different approaches to church multiplication and mission strategy.',
  },
  {
    title: 'The Twelve Principles: A Framework for Missional Transformation',
    duration: '90 min - Full Day',
    audience: 'Leadership Teams, Conferences',
    description:
      'Deep dive into the 12 principles from ReThink, with practical application and implementation strategies for your ministry context.',
  },
  {
    title: 'Incarnational Mission: Beyond Programs to Presence',
    duration: '60-90 min',
    audience: 'Pastors, Missional Leaders',
    description:
      'Moving from attractional ministry models to incarnational presence that embeds the gospel deeply in local communities.',
  },
  {
    title: 'Developing Multiplying Disciples in Your Context',
    duration: '2-3 hours',
    audience: 'Discipleship Leaders',
    description:
      'Practical workshop on creating reproducible discipleship systems that naturally lead to multiplication of leaders and communities.',
  },
];

const consultingServices = [
  {
    title: 'Strategic Missional Planning',
    duration: '3-6 months',
    description:
      'Work with your leadership team to develop a comprehensive missional strategy aligned with your context and calling.',
    includes: [
      'Contextual analysis',
      'Strategic planning sessions',
      'Implementation roadmap',
      'Ongoing coaching',
    ],
  },
  {
    title: 'Church Multiplication Assessment',
    duration: '1-2 months',
    description:
      'Comprehensive evaluation of your multiplication readiness with specific recommendations for next steps.',
    includes: [
      'Leadership assessment',
      'Systems evaluation',
      'Cultural analysis',
      'Action plan development',
    ],
  },
  {
    title: 'Leadership Team Coaching',
    duration: '6-12 months',
    description:
      'Ongoing coaching for senior leadership teams transitioning to missional approaches and multiplication mindsets.',
    includes: [
      'Monthly coaching calls',
      'Leadership development',
      'Conflict resolution',
      'Change management',
    ],
  },
];

export default function ContactPage() {
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
              Speaking & Consulting
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Work with Brad
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Bring transformational missional insights to your team,
              organization, or event. Explore keynotes, workshops, and strategic
              consulting opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="glass-card">
                <Calendar className="w-3 h-3 mr-1" />
                50+ Events/Year
              </Badge>
              <Badge variant="outline" className="glass-card">
                <Users className="w-3 h-3 mr-1" />
                20,000+ Leaders Trained
              </Badge>
              <Badge variant="outline" className="glass-card">
                <Award className="w-3 h-3 mr-1" />
                20+ Years Experience
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Speaking Topics */}
      <section className="py-16 bg-white/50 dark:bg-gray-950/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Popular Speaking Topics
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Keynotes and workshops designed to challenge thinking and inspire
              action
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {speakingTopics.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-card h-full">
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {topic.duration}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {topic.audience}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-blue-600 dark:text-blue-400">
                      {topic.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {topic.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consulting Services */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Strategic Consulting
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Long-term partnerships to help your organization embrace missional
              transformation
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {consultingServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="glass-card h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {service.duration}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-purple-600 dark:text-purple-400">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {service.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                        Includes:
                      </h4>
                      {service.includes.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                        >
                          <CheckCircle2 className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white/50 dark:bg-gray-950/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Let's Start the Conversation
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ready to explore how Brad can serve your organization? Fill out
              the form below and we'll get back to you within 24 hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-card">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name *
                      </label>
                      <Input
                        placeholder="Enter your first name"
                        className="glass-card"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <Input
                        placeholder="Enter your last name"
                        className="glass-card"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="glass-card"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        placeholder="Enter your phone"
                        className="glass-card"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Organization
                    </label>
                    <Input
                      placeholder="Church, ministry, or organization name"
                      className="glass-card"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      How can Brad serve you? *
                    </label>
                    <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 glass-card">
                      <option value="">Select a service</option>
                      <option value="keynote">Keynote Speaking</option>
                      <option value="workshop">Workshop/Training</option>
                      <option value="consulting">Strategic Consulting</option>
                      <option value="coaching">Leadership Coaching</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Event/Project Details *
                    </label>
                    <Textarea
                      placeholder="Tell us about your event, timeline, audience, and specific needs..."
                      className="glass-card min-h-32"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Event Date (if applicable)
                      </label>
                      <Input type="date" className="glass-card" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Budget Range
                      </label>
                      <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 glass-card">
                        <option value="">Select budget range</option>
                        <option value="under-5k">Under $5,000</option>
                        <option value="5k-10k">$5,000 - $10,000</option>
                        <option value="10k-25k">$10,000 - $25,000</option>
                        <option value="25k-plus">$25,000+</option>
                        <option value="discuss">Prefer to discuss</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-center pt-4">
                    <Button size="lg" className="glass-card">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass-card text-center">
                <CardContent className="p-8">
                  <Mail className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    Email
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    speaking@bradbrisco.com
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="glass-card text-center">
                <CardContent className="p-8">
                  <Clock className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    Response Time
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    24-48 hours
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass-card text-center">
                <CardContent className="p-8">
                  <Globe className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    Travel
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Worldwide availability
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
