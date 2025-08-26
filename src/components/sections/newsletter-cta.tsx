'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Send,
  CheckCircle2,
  BookOpen,
  Calendar,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const benefits = [
  {
    icon: BookOpen,
    title: 'Exclusive Content',
    description:
      'Access to new articles, insights, and resources before they go public',
  },
  {
    icon: Calendar,
    title: 'Event Updates',
    description:
      'First notification of speaking engagements and training opportunities',
  },
  {
    icon: Users,
    title: 'Community Access',
    description:
      'Connect with like-minded leaders in the missional transformation space',
  },
];

export function NewsletterCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Badge
            variant="outline"
            className="mb-6 text-white border-white/30 bg-white/10"
          >
            <Mail className="w-3 h-3 mr-1" />
            Stay Connected
          </Badge>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join the Missional Leaders Network
          </h2>

          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Get exclusive insights, resources, and updates delivered to your
            inbox. Join thousands of leaders who are rethinking ministry for a
            post-Christendom world.
          </p>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                  <CardContent className="p-6 text-center">
                    <benefit.icon className="w-12 h-12 mx-auto mb-4 text-white" />
                    <h3 className="text-lg font-semibold mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-lg mx-auto"
          >
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:ring-white focus:border-white"
                  />
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-white/90 font-semibold"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Subscribe
                  </Button>
                </div>

                <div className="flex items-center justify-center mt-4 text-white/80 text-sm">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  No spam. Unsubscribe anytime. 100% free.
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 text-white/80"
          >
            <p className="text-sm">
              Join 5,000+ ministry leaders already receiving these insights
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
