'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Clock,
  PlayCircle,
  Target,
  Users,
} from 'lucide-react';
import Link from 'next/link';

interface WeekContent {
  currentStep: number;
  totalSteps: number;
  completedItems: string[];
}

export default function Week2Page() {
  const [content, setContent] = useState<WeekContent>({
    currentStep: 1,
    totalSteps: 12, // 8 videos + 1 case study + 1 reflection + 1 assignment + 1 peer activity
    completedItems: [],
  });

  const handleMarkComplete = (itemId: string) => {
    setContent(prev => ({
      ...prev,
      completedItems: [...prev.completedItems, itemId],
    }));
  };

  const progressPercentage =
    (content.completedItems.length / content.totalSteps) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/course"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Course</span>
              </Link>

              <div className="text-sm">
                <span className="text-muted-foreground">Week 2:</span>
                <span className="font-medium ml-1">
                  The Benefits of Going Covo
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Step {content.currentStep} of {content.totalSteps}
              </div>
              <div className="w-32">
                <Progress
                  value={(content.currentStep / content.totalSteps) * 100}
                  className="h-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Week 2 Introduction */}
          <div className="text-center space-y-6">
            <Badge variant="secondary" className="mb-4">
              Week 2: Coming Soon
            </Badge>

            <h1 className="text-3xl lg:text-4xl font-bold">
              The Benefits of Going Covo
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the eight key advantages of covocational church planting
              through interactive case studies and practical applications.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <PlayCircle className="h-4 w-4" />
                <span>8 video modules</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span>Interactive case studies</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Peer feedback sessions</span>
              </div>
            </div>
          </div>

          {/* Week 2 Preview */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  8 Benefits You'll Explore
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    'Missional Presence',
                    'Credibility In & Out of Church',
                    'Financial Sustainability',
                    'Empowering the Whole Church',
                    'Prophetic Voice',
                    'Professional Development',
                    'Community Stability',
                    'Holistic Faith Integration',
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary text-sm font-medium">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Interactive Elements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <PlayCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Video Modules</h4>
                      <p className="text-sm text-muted-foreground">
                        Short, focused lessons on each benefit
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Case Studies</h4>
                      <p className="text-sm text-muted-foreground">
                        "Choose Your Response" scenarios
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Benefit Mapping</h4>
                      <p className="text-sm text-muted-foreground">
                        Connect your vocation to missional impact
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Prerequisites Check */}
          <Card className="mt-8 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-900 dark:text-orange-100">
                <Lock className="h-5 w-5" />
                Complete Week 1 First
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-800 dark:text-orange-200 mb-4">
                This week builds on the foundational concepts from Week 1.
                Please complete the previous week to unlock this content.
              </p>

              <div className="flex items-center gap-4">
                <Link href="/course/week-1">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Go to Week 1
                  </Button>
                </Link>

                <div className="text-sm text-orange-700 dark:text-orange-300">
                  Week 1 completion: 0%
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-8 border-t">
            <Link href="/course/week-1">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Week 1
              </Button>
            </Link>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Available after Week 1 completion</span>
            </div>

            <Link href="/course/week-3">
              <Button
                variant="outline"
                disabled
                className="flex items-center gap-2"
              >
                Week 3
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
