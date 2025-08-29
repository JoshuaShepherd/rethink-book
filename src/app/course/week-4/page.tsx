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
  Trophy,
  Compass,
} from 'lucide-react';
import Link from 'next/link';

export default function Week4Page() {
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
                <span className="text-muted-foreground">Week 4:</span>
                <span className="font-medium ml-1">Covo as Strategy</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">Final Week</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <Badge variant="secondary" className="mb-4">
              Week 4: Final Week
            </Badge>

            <h1 className="text-3xl lg:text-4xl font-bold">Covo as Strategy</h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Develop your personalized covocational church planting strategy
              through interactive planning tools and comprehensive assessments.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Compass className="h-4 w-4" />
                <span>Strategic planning</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span>Personal roadmap</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                <span>Course completion</span>
              </div>
            </div>
          </div>

          {/* Week 4 Preview */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Strategic Elements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    'APEST Assessment & Application',
                    'Vocation Pathway Selection',
                    'Time Management Planning',
                    'Nonprofit Decision Framework',
                    'Personal Ministry Plan',
                    'Next Steps Roadmap',
                  ].map((element, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary text-sm font-medium">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-sm">{element}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Completion Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Trophy className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Course Certificate</h4>
                      <p className="text-sm text-muted-foreground">
                        Official completion certificate
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Compass className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Personal Plan</h4>
                      <p className="text-sm text-muted-foreground">
                        Customized strategy document
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Community Access</h4>
                      <p className="text-sm text-muted-foreground">
                        Ongoing peer support network
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Prerequisites */}
          <Card className="mt-8 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-900 dark:text-orange-100">
                <Lock className="h-5 w-5" />
                Complete All Previous Weeks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-800 dark:text-orange-200 mb-4">
                This final week integrates all previous learning into your
                personalized strategy. Complete all previous weeks first.
              </p>

              <div className="flex items-center gap-4">
                <Link href="/course/week-3">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Go to Week 3
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-8 border-t">
            <Link href="/course/week-3">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Week 3
              </Button>
            </Link>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Available after Week 3 completion</span>
            </div>

            <Link href="/course">
              <Button variant="outline" className="flex items-center gap-2">
                Course Overview
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
