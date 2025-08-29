'use client';

import { useState, useEffect, useCallback } from 'react';
import { notFound } from 'next/navigation';
import { use } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Menu, X, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

// Components
import { LessonNav } from '@/components/module/lesson-nav';
import { VideoPlayer } from '@/components/module/video-player';
import {
  MDXContent,
  MarkdownContent,
  TableOfContents,
} from '@/components/mdx/mdx-content';
import { Callout, Scripture, Quote } from '@/components/mdx/components';
import { ReadingProgress } from '@/components/mdx/reading-progress';
import { ReflectionPrompt } from '@/components/module/reflection-prompt';
import { SimulationChoice } from '@/components/module/simulation-choice';
import { FieldExperimentCard } from '@/components/module/field-experiment-card';
import { ProgressSummary } from '@/components/module/progress-summary';

// Content loading - fallback to mocks if no MDX content
import {
  getPrincipleBySlug,
  getLessonsByPrincipleId,
  getActivitiesByLessonId,
} from '@/lib/mocks/content';
import { hasContentForSlug, getContentForSlug } from '@/lib/principle-content';
import { analytics } from '@/lib/analytics';
import { Activity, Lesson } from '@/types/content';

interface ModulePlayerPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ModulePlayerPage({ params }: ModulePlayerPageProps) {
  const { slug } = use(params);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [currentActivityId, setCurrentActivityId] = useState<string | null>(
    null
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const principle = getPrincipleBySlug(slug);
  const hasContent = hasContentForSlug(slug);
  const mdxContent = getContentForSlug(slug);

  if (!principle) {
    notFound();
  }

  const finalPrinciple = principle;

  const lessons = getLessonsByPrincipleId(finalPrinciple.id);
  const allActivities = lessons.flatMap(lesson =>
    getActivitiesByLessonId(lesson.id)
  );

  // Initialize without auto-selecting first lesson
  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleLessonSelect = useCallback(
    (lessonId: string) => {
      setCurrentLessonId(lessonId);
      setCurrentActivityId(null);
      analytics.trackLessonView(slug, lessonId);
    },
    [slug]
  );

  const handleActivitySelect = useCallback(
    (activityId: string, lessonId: string) => {
      setCurrentLessonId(lessonId);
      setCurrentActivityId(activityId);
    },
    []
  );

  const handleNext = useCallback(() => {
    if (currentActivityId) {
      // Move to next activity or lesson
      const currentLesson = lessons.find(l => l.id === currentLessonId);
      if (currentLesson) {
        const activities = getActivitiesByLessonId(currentLesson.id);
        const currentIndex = activities.findIndex(
          a => a.id === currentActivityId
        );
        if (currentIndex < activities.length - 1) {
          setCurrentActivityId(activities[currentIndex + 1].id);
        } else {
          // Move to next lesson
          const lessonIndex = lessons.findIndex(l => l.id === currentLessonId);
          if (lessonIndex < lessons.length - 1) {
            handleLessonSelect(lessons[lessonIndex + 1].id);
          }
        }
      }
    } else {
      // Move to next lesson
      const lessonIndex = lessons.findIndex(l => l.id === currentLessonId);
      if (lessonIndex < lessons.length - 1) {
        handleLessonSelect(lessons[lessonIndex + 1].id);
      }
    }
  }, [currentActivityId, currentLessonId, lessons, handleLessonSelect]);

  const handlePrevious = useCallback(() => {
    if (currentActivityId) {
      const currentLesson = lessons.find(l => l.id === currentLessonId);
      if (currentLesson) {
        const activities = getActivitiesByLessonId(currentLesson.id);
        const currentIndex = activities.findIndex(
          a => a.id === currentActivityId
        );
        if (currentIndex > 0) {
          setCurrentActivityId(activities[currentIndex - 1].id);
        } else {
          setCurrentActivityId(null); // Back to lesson
        }
      }
    } else {
      // Move to previous lesson
      const lessonIndex = lessons.findIndex(l => l.id === currentLessonId);
      if (lessonIndex > 0) {
        handleLessonSelect(lessons[lessonIndex - 1].id);
      }
    }
  }, [currentActivityId, currentLessonId, lessons, handleLessonSelect]);

  const handleMarkComplete = useCallback(() => {
    if (currentLessonId && !completedLessons.includes(currentLessonId)) {
      setCompletedLessons(prev => [...prev, currentLessonId]);
      toast.success('Lesson marked complete!');
    }
  }, [currentLessonId, completedLessons]);

  const focusReflection = useCallback(() => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.focus();
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLInputElement
      ) {
        return; // Don't trigger shortcuts when typing
      }

      switch (e.code) {
        case 'KeyJ':
          e.preventDefault();
          handleNext();
          break;
        case 'KeyK':
          e.preventDefault();
          handlePrevious();
          break;
        case 'KeyM':
          e.preventDefault();
          handleMarkComplete();
          break;
        case 'KeyR':
          e.preventDefault();
          focusReflection();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleNext, handlePrevious, handleMarkComplete, focusReflection]);

  const currentLesson = lessons.find(l => l.id === currentLessonId);
  const currentActivity = currentActivityId
    ? allActivities.find(a => a.id === currentActivityId)
    : null;

  const currentProgressIndex = lessons.findIndex(l => l.id === currentLessonId);
  const totalProgress = lessons.length;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Reading Progress Bar */}
      <ReadingProgress />

      {/* Header Bar - Sticky */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/principles"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Principles</span>
              </Link>

              <div className="hidden sm:block h-6 border-l" />

              <h1 className="font-semibold text-foreground truncate">
                {finalPrinciple.title}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {/* Progress Ring */}
              <div className="hidden sm:flex items-center gap-3">
                <div className="text-sm text-muted-foreground">
                  {currentProgressIndex + 1} of {totalProgress}
                </div>
                <div className="relative h-8 w-8">
                  <svg
                    className="h-full w-full transform -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <path
                      className="stroke-muted"
                      strokeDasharray="100, 100"
                      strokeWidth="4"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="stroke-primary"
                      strokeDasharray={`${((currentProgressIndex + 1) / totalProgress) * 100}, 100`}
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={
                    currentLessonId === lessons[0]?.id && !currentActivityId
                  }
                  aria-label="Previous (K)"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNext}
                  disabled={
                    currentLessonId === lessons[lessons.length - 1]?.id &&
                    !currentActivityId
                  }
                  aria-label="Next (J)"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile menu */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="sm:hidden"
                aria-label="Toggle navigation"
              >
                {isSidebarOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-6 pb-6">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Rail - Lesson Navigation */}
          <aside
            className={cn(
              'lg:col-span-3',
              'lg:block',
              isSidebarOpen ? 'block' : 'hidden'
            )}
          >
            <div className="sticky top-24">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">
                    Lessons & Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <LessonNav
                    lessons={lessons}
                    activities={allActivities}
                    currentLessonId={currentLessonId || undefined}
                    currentActivityId={currentActivityId || undefined}
                    completedLessons={completedLessons}
                    completedActivities={completedActivities}
                    onLessonSelect={handleLessonSelect}
                    onActivitySelect={handleActivitySelect}
                  />
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Center Content */}
          <main className="lg:col-span-6 space-y-6">
            {/* Current Content */}
            {currentActivity ? (
              /* Activity Content */
              <div>
                {currentActivity.type === 'REFLECTION' && (
                  <ReflectionPrompt
                    activityId={currentActivity.id}
                    payload={currentActivity.payload as any}
                    onSave={(reflection, audio) => {
                      console.log('Saving reflection:', reflection, audio);
                      setCompletedActivities(prev => [
                        ...prev,
                        currentActivity.id,
                      ]);
                    }}
                  />
                )}
                {currentActivity.type === 'SIMULATION' && (
                  <SimulationChoice
                    activityId={currentActivity.id}
                    payload={currentActivity.payload as any}
                    onChoiceSelect={(choiceId, delta) => {
                      console.log('Choice selected:', choiceId, delta);
                      setCompletedActivities(prev => [
                        ...prev,
                        currentActivity.id,
                      ]);
                    }}
                  />
                )}
                {currentActivity.type === 'FIELD_EXPERIMENT' && (
                  <FieldExperimentCard
                    activityId={currentActivity.id}
                    payload={currentActivity.payload as any}
                    onSubmit={(reflection, intention, photo) => {
                      console.log(
                        'Field experiment submitted:',
                        reflection,
                        intention,
                        photo
                      );
                      setCompletedActivities(prev => [
                        ...prev,
                        currentActivity.id,
                      ]);
                    }}
                  />
                )}
              </div>
            ) : currentLesson ? (
              /* Lesson Content */
              <div className="space-y-6">
                {/* Video */}
                {currentLesson.muxAssetId && (
                  <VideoPlayer
                    muxAssetId={currentLesson.muxAssetId}
                    title={currentLesson.title}
                  />
                )}

                {/* MDX Content */}
                <Card>
                  <CardContent className="pt-6">
                    {hasContent && mdxContent ? (
                      <div className="space-y-8">
                        {/* Table of Contents */}
                        <TableOfContents
                          content={mdxContent}
                          className="mb-8"
                        />

                        {/* Enhanced MDX Content */}
                        <MarkdownContent
                          content={mdxContent}
                          className="ebook-content"
                        />
                      </div>
                    ) : (
                      <div className="prose prose-lg max-w-none dark:prose-invert">
                        {/* In a real implementation, this would render the actual MDX */}
                        <h1>{currentLesson.title}</h1>
                        <p>
                          This would render the MDX content from{' '}
                          {currentLesson.mdxPath}
                        </p>
                        <p>
                          For now, showing placeholder content as the MDX system
                          needs additional setup for dynamic imports.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ) : (
              /* Principle Overview Content */
              <Card>
                <CardContent className="pt-6">
                  {hasContent && mdxContent ? (
                    <div className="space-y-8">
                      {/* Table of Contents for Principle Overview */}
                      <TableOfContents content={mdxContent} className="mb-8" />

                      {/* Enhanced Principle Content */}
                      <MarkdownContent
                        content={mdxContent}
                        className="ebook-content"
                      />
                    </div>
                  ) : (
                    <div className="prose prose-lg max-w-none dark:prose-invert">
                      <h1>{finalPrinciple.title}</h1>
                      <p className="text-lg text-muted-foreground mb-6">
                        {finalPrinciple.summary}
                      </p>
                      <p>
                        Select a lesson from the sidebar to begin your learning
                        journey, or explore the interactive activities and
                        quizzes available for this principle.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </main>

          {/* Right Rail - Progress & Notes */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              {/* Progress Summary */}
              <ProgressSummary
                principleTitle={finalPrinciple.title}
                lessons={lessons}
                activities={allActivities}
                currentLessonId={currentLessonId || undefined}
                completedLessons={completedLessons}
                completedActivities={completedActivities}
                onMarkComplete={handleMarkComplete}
              />

              {/* Key Takeaways */}
              {currentLesson?.keyTakeaways && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Key Takeaways</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {currentLesson.keyTakeaways.map((takeaway, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm"
                        >
                          <span className="text-primary">•</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Quiz Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">
                      🏆
                    </div>
                    Mastery Check
                  </CardTitle>
                  <CardDescription>
                    Test your understanding and earn badges
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-text-secondary">
                    Complete all lessons to unlock the quiz and earn your badge!
                  </div>

                  <Link href={`/principles/${slug}/quiz`}>
                    <Button
                      className="w-full"
                      variant="premium"
                      disabled={completedLessons.length < lessons.length}
                    >
                      <div className="flex items-center gap-2">
                        <span>🎯</span>
                        <span>Take Quiz</span>
                      </div>
                    </Button>
                  </Link>

                  {completedLessons.length < lessons.length && (
                    <div className="text-xs text-text-muted">
                      Progress: {completedLessons.length}/{lessons.length}{' '}
                      lessons completed
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Notes Scratchpad */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Notes</CardTitle>
                  <CardDescription>
                    Private notes for this lesson
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <textarea
                    placeholder="Capture your thoughts, questions, and insights here..."
                    className="w-full min-h-[100px] text-sm border-none bg-transparent resize-none focus:outline-none"
                  />
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>

      {/* Keyboard shortcuts help */}
      <div className="fixed bottom-4 right-4 z-40">
        <Card className="opacity-50 hover:opacity-100 transition-opacity">
          <CardContent className="p-3 text-xs text-muted-foreground">
            <div className="space-y-1">
              <div>
                <kbd>J</kbd> Next • <kbd>K</kbd> Previous
              </div>
              <div>
                <kbd>M</kbd> Mark Complete • <kbd>R</kbd> Focus Reflection
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
