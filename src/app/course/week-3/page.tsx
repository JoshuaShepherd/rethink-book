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
  Shield,
} from 'lucide-react';
import Link from 'next/link';

export default function Week3Page() {
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
                <span className="text-muted-foreground">Week 3:</span>
                <span className="font-medium ml-1">
                  Overcoming the Challenges
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">Coming Soon</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <Badge variant="secondary" className="mb-4">
              Week 3: Coming Soon
            </Badge>

            <h1 className="text-3xl lg:text-4xl font-bold">
              Overcoming the Challenges
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn practical strategies to navigate the common challenges of
              covocational ministry through interactive problem-solving
              activities.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Challenge mitigation</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span>Problem-solving tools</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Peer support strategies</span>
              </div>
            </div>
          </div>

          {/* Prerequisites */}
          <Card className="mt-12 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-900 dark:text-orange-100">
                <Lock className="h-5 w-5" />
                Complete Previous Weeks First
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-800 dark:text-orange-200 mb-4">
                This week addresses challenges introduced in Weeks 1 and 2.
                Please complete the previous weeks to access this content.
              </p>

              <div className="flex items-center gap-4">
                <Link href="/course/week-2">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Go to Week 2
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-8 border-t">
            <Link href="/course/week-2">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Week 2
              </Button>
            </Link>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Available after Week 2 completion</span>
            </div>

            <Link href="/course/week-4">
              <Button
                variant="outline"
                disabled
                className="flex items-center gap-2"
              >
                Week 4
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
