'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CheckCircle2,
  PlayCircle,
  Clock,
  Users,
  BookOpen,
  Award,
  ChevronRight,
  Lock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CourseWeek, CourseProgress } from '@/types/course';
import Link from 'next/link';

interface CourseNavProps {
  weeks: CourseWeek[];
  currentWeek?: number;
  progress: CourseProgress;
  className?: string;
}

export const CourseNav = ({
  weeks,
  currentWeek,
  progress,
  className,
}: CourseNavProps) => {
  const [selectedWeek, setSelectedWeek] = useState<number>(currentWeek || 1);

  const getWeekStatus = (week: CourseWeek) => {
    if (progress.completedWeeks.includes(week.weekNumber)) {
      return 'completed';
    } else if (week.weekNumber === progress.currentWeek) {
      return 'current';
    } else if (week.isUnlocked) {
      return 'available';
    } else {
      return 'locked';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'current':
        return <PlayCircle className="h-5 w-5 text-primary" />;
      case 'available':
        return <BookOpen className="h-5 w-5 text-muted-foreground" />;
      case 'locked':
        return <Lock className="h-5 w-5 text-muted-foreground" />;
      default:
        return <BookOpen className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20';
      case 'current':
        return 'border-primary bg-primary/5 ring-1 ring-primary/20';
      case 'available':
        return 'border-border bg-background hover:bg-muted/50';
      case 'locked':
        return 'border-muted bg-muted/20 opacity-60';
      default:
        return 'border-border bg-background';
    }
  };

  return (
    <div className={cn('course-nav space-y-6', className)}>
      {/* Course Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Completion</span>
              <span>
                {Math.round(
                  (progress.completedWeeks.length / weeks.length) * 100
                )}
                %
              </span>
            </div>
            <Progress
              value={(progress.completedWeeks.length / weeks.length) * 100}
              className="h-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <PlayCircle className="h-4 w-4 text-blue-500" />
              <span>{Math.floor(progress.watchedVideoTime / 60)}h watched</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>{progress.completedActivities.length} activities</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-purple-500" />
              <span>{progress.completedAssignments.length} assignments</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-orange-500" />
              <span>{progress.peerInteractions} interactions</span>
            </div>
          </div>

          {progress.badges.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Recent Badges</h4>
              <div className="flex flex-wrap gap-1">
                {progress.badges.slice(0, 3).map(badge => (
                  <Badge key={badge.id} variant="secondary" className="text-xs">
                    {badge.title}
                  </Badge>
                ))}
                {progress.badges.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{progress.badges.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Week Navigation */}
      <Card>
        <CardHeader>
          <CardTitle>Course Weeks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {weeks.map(week => {
            const status = getWeekStatus(week);
            const isClickable = status !== 'locked';

            return (
              <motion.div
                key={week.id}
                whileHover={isClickable ? { scale: 1.02 } : {}}
                whileTap={isClickable ? { scale: 0.98 } : {}}
              >
                <Link
                  href={isClickable ? `/course/week-${week.weekNumber}` : '#'}
                  className={cn(
                    'block p-4 rounded-lg border transition-all duration-200',
                    getStatusColor(status),
                    !isClickable && 'cursor-not-allowed'
                  )}
                  onClick={e => {
                    if (!isClickable) {
                      e.preventDefault();
                    }
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getStatusIcon(status)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-sm">
                              Week {week.weekNumber}: {week.title}
                            </h3>
                            {status === 'completed' && (
                              <Badge variant="secondary" className="text-xs">
                                Complete
                              </Badge>
                            )}
                            {status === 'current' && (
                              <Badge variant="default" className="text-xs">
                                Current
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {week.theme}
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {week.description}
                          </p>
                        </div>

                        {isClickable && (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>

                      {status !== 'locked' && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <PlayCircle className="h-3 w-3" />
                            <span>{week.videoLessons.length} videos</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>
                              {week.interactiveTools.length} activities
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <BookOpen className="h-3 w-3" />
                            <span>
                              {week.practiceAssignments.length} assignments
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Users className="h-3 w-3" />
                            <span>
                              {week.peerActivities.length} discussions
                            </span>
                          </div>
                        </div>
                      )}

                      {status !== 'locked' && week.completionPercentage > 0 && (
                        <div className="mt-3 space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>
                              {Math.round(week.completionPercentage)}%
                            </span>
                          </div>
                          <Progress
                            value={week.completionPercentage}
                            className="h-1"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseNav;
