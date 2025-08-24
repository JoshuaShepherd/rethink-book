'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  CheckCircle,
  Circle,
  Trophy,
  Target,
  BookOpen,
  MessageSquare,
  Users,
  FlaskConical,
  Clock,
} from 'lucide-react';
import { analytics } from '@/lib/analytics';
import { Lesson, Activity } from '@/types/content';
import { toast } from 'react-hot-toast';

interface ProgressSummaryProps {
  principleTitle: string;
  lessons: Lesson[];
  activities: Activity[];
  currentLessonId?: string;
  completedLessons: string[];
  completedActivities: string[];
  onMarkComplete: (lessonId: string) => void;
  className?: string;
}

const ActivityIcon = ({ type }: { type: Activity['type'] }) => {
  switch (type) {
    case 'REFLECTION':
      return <MessageSquare className="h-3 w-3" />;
    case 'SIMULATION':
      return <Users className="h-3 w-3" />;
    case 'FIELD_EXPERIMENT':
      return <FlaskConical className="h-3 w-3" />;
    default:
      return <Circle className="h-3 w-3" />;
  }
};

export const ProgressSummary = ({
  principleTitle,
  lessons,
  activities,
  currentLessonId,
  completedLessons,
  completedActivities,
  onMarkComplete,
  className,
}: ProgressSummaryProps) => {
  const totalItems = lessons.length + activities.length;
  const completedItems = completedLessons.length + completedActivities.length;
  const progressPercentage =
    totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  const currentLesson = lessons.find(l => l.id === currentLessonId);
  const isCurrentLessonCompleted =
    currentLessonId && completedLessons.includes(currentLessonId);

  const handleMarkComplete = () => {
    if (!currentLessonId || isCurrentLessonCompleted) return;

    onMarkComplete(currentLessonId);
    analytics.trackLessonComplete(
      principleTitle.toLowerCase().replace(/\s+/g, '-'),
      currentLessonId
    );

    toast.success(`Lesson "${currentLesson?.title}" marked complete! 🎉`, {
      duration: 4000,
    });
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Progress Ring/Circle */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <svg
                className="h-16 w-16 transform -rotate-90"
                viewBox="0 0 36 36"
              >
                {/* Background circle */}
                <path
                  className="stroke-muted"
                  strokeDasharray="100, 100"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Progress circle */}
                <path
                  className="stroke-primary transition-all duration-500"
                  strokeDasharray={`${progressPercentage}, 100`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
            </div>

            <div className="flex-1">
              <CardTitle className="text-base leading-tight">
                Module Progress
              </CardTitle>
              <CardDescription>
                {completedItems} of {totalItems} completed
              </CardDescription>
            </div>

            {progressPercentage === 100 && (
              <Trophy className="h-6 w-6 text-yellow-500" />
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Current Lesson Actions */}
      {currentLesson && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="h-4 w-4" />
              Current Lesson
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground leading-snug">
                  {currentLesson.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Lesson {lessons.findIndex(l => l.id === currentLessonId) + 1}{' '}
                  of {lessons.length}
                </p>
              </div>

              {!isCurrentLessonCompleted ? (
                <Button
                  onClick={handleMarkComplete}
                  className="w-full flex items-center gap-2"
                  size="sm"
                >
                  <CheckCircle className="h-4 w-4" />
                  Mark Lesson Complete
                </Button>
              ) : (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-950/20 px-3 py-2 rounded-lg">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Lesson Complete</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Details */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="h-4 w-4" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Lessons */}
            <div>
              <h5 className="text-sm font-medium text-foreground mb-2">
                Lessons ({completedLessons.length}/{lessons.length})
              </h5>
              <div className="space-y-1">
                {lessons.map((lesson, index) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isCurrent = lesson.id === currentLessonId;

                  return (
                    <div
                      key={lesson.id}
                      className={cn(
                        'flex items-center gap-2 text-sm p-2 rounded-lg transition-colors',
                        isCurrent && 'bg-primary/10',
                        isCompleted && !isCurrent && 'text-muted-foreground'
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="flex-1 truncate">
                        {index + 1}. {lesson.title}
                      </span>
                      {isCurrent && <Clock className="h-3 w-3 text-primary" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Activities */}
            <div>
              <h5 className="text-sm font-medium text-foreground mb-2">
                Activities ({completedActivities.length}/{activities.length})
              </h5>
              <div className="space-y-1">
                {activities.map(activity => {
                  const isCompleted = completedActivities.includes(activity.id);

                  return (
                    <div
                      key={activity.id}
                      className={cn(
                        'flex items-center gap-2 text-sm p-2 rounded-lg',
                        isCompleted && 'text-muted-foreground'
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground" />
                      )}
                      <ActivityIcon type={activity.type} />
                      <span className="flex-1 truncate">
                        {activity.type === 'REFLECTION' && 'Reflection'}
                        {activity.type === 'SIMULATION' && 'Simulation'}
                        {activity.type === 'FIELD_EXPERIMENT' &&
                          'Field Experiment'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Completion Celebration */}
      {progressPercentage === 100 && (
        <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <Trophy className="mx-auto h-12 w-12 text-yellow-500" />
              <div>
                <h4 className="font-semibold text-foreground">
                  Module Complete! 🎉
                </h4>
                <p className="text-sm text-muted-foreground">
                  You've completed all lessons and activities for this
                  principle.
                </p>
              </div>
              <Button variant="outline" size="sm">
                Continue to Next Module
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
