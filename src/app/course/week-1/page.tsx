'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  PlayCircle,
  Clock,
  Users,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  Target,
  Lightbulb,
} from 'lucide-react';
import Link from 'next/link';
import { VideoPlayer } from '@/components/course/video-player';
import { DragDropActivity } from '@/components/course/interactive/drag-drop-activity';
import { ReflectionJournal } from '@/components/course/reflection-journal';
import { PracticeAssignment } from '@/components/course/practice-assignment';
import { PeerDiscussion } from '@/components/course/peer-discussion';

interface WeekContent {
  currentStep: number;
  totalSteps: number;
  completedItems: string[];
}

export default function Week1Page() {
  const [content, setContent] = useState<WeekContent>({
    currentStep: 1,
    totalSteps: 7,
    completedItems: [],
  });

  const handleMarkComplete = (itemId: string) => {
    setContent(prev => ({
      ...prev,
      completedItems: [...prev.completedItems, itemId],
    }));
  };

  const handleNext = () => {
    setContent(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, prev.totalSteps),
    }));
  };

  const handlePrevious = () => {
    setContent(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1),
    }));
  };

  const progressPercentage =
    (content.completedItems.length / content.totalSteps) * 100;

  const renderCurrentStep = () => {
    switch (content.currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <Badge variant="secondary" className="mb-4">
                Week 1 Introduction
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold">
                A New Way to Lead and Live
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Introduction to the Covocational Mindset - discovering how
                mission and vocation belong together
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  This Week You'll Discover
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div>
                      <h4 className="font-medium">Real-Life Stories</h4>
                      <p className="text-sm text-muted-foreground">
                        Like Michael's coffee shop ministry approach
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div>
                      <h4 className="font-medium">Key Distinctions</h4>
                      <p className="text-sm text-muted-foreground">
                        Understanding Bivo vs Covo approaches
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div>
                      <h4 className="font-medium">Theological Foundation</h4>
                      <p className="text-sm text-muted-foreground">
                        Why mission + vocation belong together
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div>
                      <h4 className="font-medium">Personal Application</h4>
                      <p className="text-sm text-muted-foreground">
                        Discovering God's mission in your vocation
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-medium text-primary mb-2">
                    Learning Approach
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    This week follows a structured learning cycle: Experience →
                    Reflection → Application → Community. Each element builds on
                    the previous to create lasting transformation.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <div></div>
              <Button onClick={handleNext} className="flex items-center gap-2">
                Start Video Lessons
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <VideoPlayer
            title="Story of Michael (coffee shop planter)"
            description="Real-world example of covocational ministry"
            videoId="michael-story" // Placeholder - would be actual Mux asset ID
            duration={12}
            keyPoints={[
              'How Michael integrated his coffee shop with church planting',
              'Natural evangelism through business relationships',
              'Building community through vocational presence',
            ]}
            onComplete={() => handleMarkComplete('video-michael')}
            isCompleted={content.completedItems.includes('video-michael')}
          />
        );

      case 3:
        return (
          <VideoPlayer
            title="Difference between Bivo and Covo"
            description="Understanding the key distinctions"
            videoId="bivo-vs-covo"
            duration={8}
            keyPoints={[
              'Bivocational: Two separate vocations',
              'Covocational: Integrated mission and vocation',
              'Why the distinction matters for church planting',
            ]}
            onComplete={() => handleMarkComplete('video-distinction')}
            isCompleted={content.completedItems.includes('video-distinction')}
          />
        );

      case 4:
        return (
          <VideoPlayer
            title="Why mission + vocation belong together"
            description="Theological foundation for integration"
            videoId="mission-vocation"
            duration={15}
            keyPoints={[
              'Biblical foundation for whole-life discipleship',
              "God's call to be salt and light in every sphere",
              'The priesthood of all believers in practice',
            ]}
            onComplete={() => handleMarkComplete('video-theology')}
            isCompleted={content.completedItems.includes('video-theology')}
          />
        );

      case 5:
        return (
          <DragDropActivity
            title="Bivo vs Covo Matching"
            instructions="Match the real-life examples to either 'Bivocational' or 'Covocational' based on what you've learned."
            items={[
              {
                id: 'item-1',
                content:
                  'Pastor who works part-time at a school to supplement income',
                type: 'scenario',
              },
              {
                id: 'item-2',
                content:
                  'Teacher who uses classroom as mission field for discipleship',
                type: 'scenario',
              },
              {
                id: 'item-3',
                content:
                  'Software developer who plants church completely separate from work',
                type: 'scenario',
              },
              {
                id: 'item-4',
                content:
                  'Nurse who sees healthcare as her primary calling and ministry',
                type: 'scenario',
              },
            ]}
            categories={[
              {
                id: 'bivo',
                title: 'Bivocational',
                description: 'Two separate vocations/roles',
                acceptedTypes: ['scenario'],
              },
              {
                id: 'covo',
                title: 'Covocational',
                description: 'Integrated mission and vocation',
                acceptedTypes: ['scenario'],
              },
            ]}
            correctMatches={{
              'item-1': 'bivo',
              'item-2': 'covo',
              'item-3': 'bivo',
              'item-4': 'covo',
            }}
            onComplete={() => handleMarkComplete('activity-matching')}
            isCompleted={content.completedItems.includes('activity-matching')}
          />
        );

      case 6:
        return (
          <ReflectionJournal
            title="Personal Vocational Reflection"
            prompt="Where has God already placed me vocationally, and how might that be part of His mission?"
            guidance={[
              'Think about your current work environment and the relationships you have',
              'Consider the spheres of influence you already occupy',
              'Reflect on the needs you see in your workplace or industry',
              'Imagine how God might use your unique skills and position for His purposes',
            ]}
            suggestedTime="15-20 minutes"
            wordLimit={500}
            onSave={() => handleMarkComplete('reflection-vocation')}
            isCompleted={content.completedItems.includes('reflection-vocation')}
          />
        );

      case 7:
        return (
          <div className="space-y-6">
            <PracticeAssignment
              title="Coworker Interview"
              description="Interview a coworker or neighbor about their spiritual openness at work. Journal your insights."
              instructions={[
                'Choose someone you have a relationship with',
                'Ask open-ended questions about their work experience',
                'Listen for spiritual openings or deeper longings',
                'Take notes on insights gained',
                'Journal your reflections afterward',
              ]}
              estimatedTime="60 minutes"
              deliverable="Written reflection on insights gained"
              onSubmit={() => handleMarkComplete('assignment-interview')}
              isCompleted={content.completedItems.includes(
                'assignment-interview'
              )}
            />

            <PeerDiscussion
              title="Aha Moment Sharing"
              description="Share one 'aha' moment about seeing work as mission"
              prompt="What was your biggest realization from this week about integrating work and mission?"
              forumType="share"
              estimatedTime="30 minutes"
              onParticipate={() => handleMarkComplete('peer-sharing')}
              isCompleted={content.completedItems.includes('peer-sharing')}
            />
          </div>
        );

      default:
        return <div>Loading...</div>;
    }
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1:
        return 'Introduction';
      case 2:
        return "Michael's Story";
      case 3:
        return 'Bivo vs Covo';
      case 4:
        return 'Theological Foundation';
      case 5:
        return 'Interactive Matching';
      case 6:
        return 'Personal Reflection';
      case 7:
        return 'Practice & Community';
      default:
        return `Step ${step}`;
    }
  };

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
                <span className="text-muted-foreground">Week 1:</span>
                <span className="font-medium ml-1">
                  A New Way to Lead and Live
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                {getStepTitle(content.currentStep)} ({content.currentStep} of{' '}
                {content.totalSteps})
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
          {renderCurrentStep()}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-8 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={content.currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>
                {content.completedItems.length} of {content.totalSteps}{' '}
                completed
              </span>
            </div>

            {content.currentStep < content.totalSteps ? (
              <Button onClick={handleNext} className="flex items-center gap-2">
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Link href="/course/week-2">
                <Button className="flex items-center gap-2">
                  Continue to Week 2
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Progress Summary Sidebar - Optional for larger screens */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 hidden xl:block">
        <Card className="w-64">
          <CardHeader>
            <CardTitle className="text-base">Week 1 Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              <div className="text-xs text-muted-foreground">
                <div className="flex items-center gap-2 mb-2">
                  <PlayCircle className="h-3 w-3" />
                  <span>3 video lessons</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-3 w-3" />
                  <span>1 interactive activity</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-3 w-3" />
                  <span>1 reflection</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-3 w-3" />
                  <span>1 practice assignment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3" />
                  <span>1 peer discussion</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
