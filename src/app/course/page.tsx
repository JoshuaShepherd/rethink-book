'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CourseNav } from '@/components/course/course-nav';
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
  Trophy,
  Target,
  ArrowRight,
  Calendar,
  Globe,
} from 'lucide-react';
import { CourseWeek, CourseProgress } from '@/types/course';

// Mock data for the 4-week course
const mockCourseWeeks: CourseWeek[] = [
  {
    id: 'week-1',
    weekNumber: 1,
    title: 'A New Way to Lead and Live',
    theme: 'Introduction to Covocational Mindset',
    description:
      "Discover how mission and vocation belong together, exploring real-life examples of covocational church planting through stories like Michael's coffee shop ministry.",
    videoLessons: [
      {
        id: 'v1-1',
        title: 'Story of Michael (coffee shop planter)',
        description: 'Real-world example of covocational ministry',
        duration: 12,
        completed: false,
      },
      {
        id: 'v1-2',
        title: 'Difference between Bivo and Covo',
        description: 'Understanding the key distinctions',
        duration: 8,
        completed: false,
      },
      {
        id: 'v1-3',
        title: 'Why mission + vocation belong together',
        description: 'Theological foundation for integration',
        duration: 15,
        completed: false,
      },
    ],
    interactiveTools: [
      {
        id: 'it1-1',
        type: 'drag-drop',
        title: 'Bivo vs Covo Matching',
        description: 'Match real-life examples to "Bivo" vs "Covo"',
        component: 'DragDropActivity',
        completed: false,
      },
    ],
    reflectionPrompts: [
      {
        id: 'rp1-1',
        question:
          'Where has God already placed me vocationally, and how might that be part of His mission?',
        guidance:
          'Think about your current work environment, relationships, and spheres of influence.',
        completed: false,
      },
    ],
    practiceAssignments: [
      {
        id: 'pa1-1',
        title: 'Coworker Interview',
        description:
          'Interview a coworker or neighbor about their spiritual openness at work',
        instructions: [
          'Choose someone you have a relationship with',
          'Ask open-ended questions about their work experience',
          'Listen for spiritual openings',
          'Journal your insights',
        ],
        deliverable: 'Written reflection on insights gained',
        timeEstimate: 60,
        completed: false,
      },
    ],
    peerActivities: [
      {
        id: 'peer1-1',
        title: 'Aha Moment Sharing',
        description: 'Share one "aha" moment about seeing work as mission',
        type: 'sharing',
        prompt:
          'What was your biggest realization from this week about integrating work and mission?',
        completed: false,
      },
    ],
    isUnlocked: true,
    completionPercentage: 0,
  },
  {
    id: 'week-2',
    weekNumber: 2,
    title: 'The Benefits of Going Covo',
    theme: '8 Advantages of Covocational Planting',
    description:
      'Explore the eight key benefits including missional presence, credibility, financial sustainability, and holistic faith integration through interactive case studies.',
    videoLessons: [
      {
        id: 'v2-1',
        title: 'Missional Presence',
        description: 'Being present in marketplace contexts',
        duration: 10,
        completed: false,
      },
      {
        id: 'v2-2',
        title: 'Credibility In & Out of Church',
        description: 'Building authentic relationships',
        duration: 9,
        completed: false,
      },
      {
        id: 'v2-3',
        title: 'Financial Sustainability',
        description: 'Economic advantages of covocational ministry',
        duration: 11,
        completed: false,
      },
      {
        id: 'v2-4',
        title: 'Empowering the Whole Church',
        description: 'Mobilizing all believers for ministry',
        duration: 13,
        completed: false,
      },
      {
        id: 'v2-5',
        title: 'Prophetic Voice',
        description: 'Speaking truth in workplace contexts',
        duration: 8,
        completed: false,
      },
      {
        id: 'v2-6',
        title: 'Professional Development',
        description: 'Growing in your primary vocation',
        duration: 7,
        completed: false,
      },
      {
        id: 'v2-7',
        title: 'Community Stability',
        description: 'Long-term presence and impact',
        duration: 9,
        completed: false,
      },
      {
        id: 'v2-8',
        title: 'Holistic Faith Integration',
        description: 'Whole-life discipleship',
        duration: 12,
        completed: false,
      },
    ],
    interactiveTools: [
      {
        id: 'it2-1',
        type: 'scenario',
        title: 'Choose Your Response',
        description:
          'Navigate scenarios on financial stress and prophetic courage',
        component: 'CaseStudyScenario',
        completed: false,
      },
    ],
    reflectionPrompts: [
      {
        id: 'rp2-1',
        question:
          'For each benefit, where do I see this in my current life—or where do I need to grow?',
        guidance: 'Create a digital journal entry for each of the 8 benefits.',
        completed: false,
      },
    ],
    practiceAssignments: [
      {
        id: 'pa2-1',
        title: 'Benefit Map Creation',
        description:
          'Create a one-page "benefit map" connecting your vocation to potential missional impact',
        instructions: [
          'Map your current vocation',
          'Identify potential missional connections',
          'Highlight areas for growth',
          'Share with cohort',
        ],
        deliverable: 'Visual benefit map',
        timeEstimate: 90,
        completed: false,
      },
    ],
    peerActivities: [
      {
        id: 'peer2-1',
        title: 'Benefit Map Feedback',
        description: 'Share and provide feedback on benefit maps',
        type: 'feedback',
        prompt:
          'Share your benefit map and provide constructive feedback to others.',
        completed: false,
      },
    ],
    isUnlocked: false,
    completionPercentage: 0,
  },
  {
    id: 'week-3',
    weekNumber: 3,
    title: 'Overcoming the Challenges',
    theme: 'Time, Margin, and Team Development',
    description:
      'Learn the five anchors for managing life and discover your APEST gifts through interactive time management tools and assessments.',
    videoLessons: [
      {
        id: 'v3-1',
        title: 'Five Anchors for Managing Life',
        description: 'Calendar, Priorities, Distractions, Margin, Team',
        duration: 18,
        completed: false,
      },
      {
        id: 'v3-2',
        title: 'Introduction to APEST Gifts',
        description: 'Apostle, Prophet, Evangelist, Shepherd, Teacher',
        duration: 14,
        completed: false,
      },
    ],
    interactiveTools: [
      {
        id: 'it3-1',
        type: 'calendar',
        title: 'Time Management Puzzle',
        description:
          'Drag commitments into weekly calendar until "margin" is visible',
        component: 'TimeManagementPuzzle',
        completed: false,
      },
      {
        id: 'it3-2',
        type: 'assessment',
        title: 'APEST Quiz',
        description: 'Identify your dominant gifts and compare with peers',
        component: 'APESTAssessment',
        completed: false,
      },
    ],
    reflectionPrompts: [
      {
        id: 'rp3-1',
        question:
          "What's one distraction I need to eliminate to gain more margin?",
        guidance: 'Be specific and actionable in your response.',
        completed: false,
      },
    ],
    practiceAssignments: [
      {
        id: 'pa3-1',
        title: 'Covo Rhythm Plan',
        description:
          'Build a comprehensive rhythm plan including work, family, rest, and ministry',
        instructions: [
          'Outline weekly schedule',
          'Include work commitments',
          'Plan family time',
          'Schedule rest and ministry',
          'Share with cohort for accountability',
        ],
        deliverable: 'Weekly rhythm plan',
        timeEstimate: 120,
        completed: false,
      },
    ],
    peerActivities: [
      {
        id: 'peer3-1',
        title: 'Rhythm Plan Accountability',
        description: 'Share rhythm plans for mutual accountability',
        type: 'discussion',
        prompt:
          'Present your rhythm plan and commit to accountability with your cohort.',
        completed: false,
      },
    ],
    isUnlocked: false,
    completionPercentage: 0,
  },
  {
    id: 'week-4',
    weekNumber: 4,
    title: 'Covo as Strategy, Not Model',
    theme: 'Marketplace Callings, Nonprofit First, & Discernment',
    description:
      'Explore 12 marketplace vocations, entrepreneurial strategies, and complete your personalized Covo Church Planting Blueprint.',
    videoLessons: [
      {
        id: 'v4-1',
        title: '12 Marketplace Vocations for Covo Leaders',
        description: 'Comprehensive overview of vocational possibilities',
        duration: 22,
        completed: false,
      },
      {
        id: 'v4-2',
        title: 'Entrepreneurial Start-ups & Nonprofit-first Strategies',
        description: 'Alternative approaches to church planting',
        duration: 16,
        completed: false,
      },
      {
        id: 'v4-3',
        title: 'Rethinking Metrics: Impact over Attendance',
        description: 'New ways to measure success',
        duration: 13,
        completed: false,
      },
    ],
    interactiveTools: [
      {
        id: 'it4-1',
        type: 'scenario',
        title: 'Pick Your Path',
        description:
          'Choose a vocation and receive tailored case study scenario',
        component: 'VocationPathway',
        completed: false,
      },
      {
        id: 'it4-2',
        type: 'decision-tree',
        title: 'Nonprofit Decision Tree',
        description: 'Should I consider starting with a nonprofit?',
        component: 'NonprofitDecisionTree',
        completed: false,
      },
    ],
    reflectionPrompts: [
      {
        id: 'rp4-1',
        question: 'How aligned are my vocation, family, and mission?',
        guidance:
          'Assess the integration and identify areas for better alignment.',
        completed: false,
      },
    ],
    practiceAssignments: [
      {
        id: 'pa4-1',
        title: 'Covo Church Planting Blueprint',
        description:
          'Create personalized plan combining vocation, mission, rhythms, and strategy',
        instructions: [
          'Complete the Covo Questionnaire',
          'Define your vocation context',
          'Outline your mission approach',
          'Integrate your rhythms',
          'Develop strategic timeline',
          'Share with mentor/peer group',
        ],
        deliverable: 'Complete Covo Blueprint',
        timeEstimate: 180,
        completed: false,
      },
    ],
    peerActivities: [
      {
        id: 'peer4-1',
        title: 'Blueprint Feedback Session',
        description: 'Share blueprints for mentor and peer feedback',
        type: 'feedback',
        prompt:
          'Present your Covo Blueprint and receive constructive feedback.',
        completed: false,
      },
    ],
    isUnlocked: false,
    completionPercentage: 0,
  },
];

const mockProgress: CourseProgress = {
  currentWeek: 1,
  completedWeeks: [],
  totalVideoTime: 0,
  watchedVideoTime: 0,
  completedActivities: [],
  completedAssignments: [],
  peerInteractions: 0,
  startDate: new Date(),
  lastActiveDate: new Date(),
  badges: [],
  // Legacy fields for compatibility
  weekId: 'week-1',
  videoLessonsCompleted: [],
  interactiveToolsCompleted: [],
  reflectionPromptsCompleted: [],
  practiceAssignmentsCompleted: [],
  peerActivitiesCompleted: [],
  weekCompleted: false,
};

export default function CoursePage() {
  const [progress, setProgress] = useState<CourseProgress>(mockProgress);

  const totalVideoMinutes = mockCourseWeeks.reduce(
    (total, week) =>
      total +
      week.videoLessons.reduce(
        (weekTotal, lesson) => weekTotal + lesson.duration,
        0
      ),
    0
  );

  const totalActivities = mockCourseWeeks.reduce(
    (total, week) =>
      total +
      week.interactiveTools.length +
      week.reflectionPrompts.length +
      week.practiceAssignments.length +
      week.peerActivities.length,
    0
  );

  const currentWeek = mockCourseWeeks.find(
    w => w.weekNumber === progress.currentWeek
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Badge variant="secondary" className="mb-4">
                4-Week Digital Learning Experience
              </Badge>

              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Exploring{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Covocational
                </span>{' '}
                Church Planting
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A comprehensive learning journey combining video lessons,
                interactive tools, peer dialogue, and practice-based assignments
                to discover how mission and vocation belong together.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                {progress.currentWeek === 1 &&
                progress.completedWeeks.length === 0 ? (
                  <Button size="lg" className="px-8">
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Start Your Journey
                  </Button>
                ) : (
                  <Button size="lg" className="px-8">
                    <Target className="w-5 h-5 mr-2" />
                    Continue Learning
                  </Button>
                )}

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{Math.ceil(totalVideoMinutes / 60)}h content</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    <span>{totalActivities} activities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Peer interaction</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Course Overview */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Learning Objectives */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  What You'll Achieve
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">
                          New Theological Imagination
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Fresh perspective on integrating work and mission
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Clear Understanding</h4>
                        <p className="text-sm text-muted-foreground">
                          Grasp of Covo benefits and challenges
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Personal Rhythm Plan</h4>
                        <p className="text-sm text-muted-foreground">
                          Manage time, family, and ministry effectively
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">
                          Contextualized Blueprint
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Personalized planting strategy rooted in your vocation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Structure */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Course Structure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <PlayCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h4 className="font-medium">Video Lessons</h4>
                      <p className="text-sm text-muted-foreground">
                        Short, focused content
                      </p>
                    </div>

                    <div className="text-center p-4 bg-secondary/5 rounded-lg">
                      <Target className="h-8 w-8 text-secondary mx-auto mb-2" />
                      <h4 className="font-medium">Interactive Tools</h4>
                      <p className="text-sm text-muted-foreground">
                        Hands-on activities
                      </p>
                    </div>

                    <div className="text-center p-4 bg-green-500/5 rounded-lg">
                      <BookOpen className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <h4 className="font-medium">Practice Assignments</h4>
                      <p className="text-sm text-muted-foreground">
                        Real-world application
                      </p>
                    </div>

                    <div className="text-center p-4 bg-orange-500/5 rounded-lg">
                      <Users className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                      <h4 className="font-medium">Peer Activities</h4>
                      <p className="text-sm text-muted-foreground">
                        Community dialogue
                      </p>
                    </div>
                  </div>

                  <div className="text-center">
                    <h4 className="font-medium mb-2">
                      Learning Design Principles
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Built on adult learning theory (andragogy) and Kolb's
                      learning cycle: Experience → Reflection →
                      Conceptualization → Practice
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CourseNav
                weeks={mockCourseWeeks}
                currentWeek={progress.currentWeek}
                progress={progress}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
