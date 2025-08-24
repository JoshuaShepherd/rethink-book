import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  ChevronDown,
  ChevronRight,
  PlayCircle,
  CheckCircle,
  MessageSquare,
  FlaskConical,
  Users,
  Loader2,
} from 'lucide-react';
import { Lesson, Activity } from '@/types/content';

interface LessonNavProps {
  lessons: Lesson[];
  activities: Activity[];
  currentLessonId?: string;
  currentActivityId?: string;
  completedLessons: string[];
  completedActivities: string[];
  onLessonSelect: (lessonId: string) => void;
  onActivitySelect: (activityId: string, lessonId: string) => void;
  isLoading?: boolean;
  className?: string;
}

const ActivityIcon = ({ type }: { type: Activity['type'] }) => {
  switch (type) {
    case 'REFLECTION':
      return <MessageSquare className="h-4 w-4" />;
    case 'SIMULATION':
      return <Users className="h-4 w-4" />;
    case 'FIELD_EXPERIMENT':
      return <FlaskConical className="h-4 w-4" />;
    default:
      return <MessageSquare className="h-4 w-4" />;
  }
};

const ActivityTypeLabel = ({ type }: { type: Activity['type'] }) => {
  switch (type) {
    case 'REFLECTION':
      return 'Reflection';
    case 'SIMULATION':
      return 'Simulation';
    case 'FIELD_EXPERIMENT':
      return 'Field Experiment';
    default:
      return 'Activity';
  }
};

export const LessonNav = ({
  lessons,
  activities,
  currentLessonId,
  currentActivityId,
  completedLessons,
  completedActivities,
  onLessonSelect,
  onActivitySelect,
  isLoading = false,
  className,
}: LessonNavProps) => {
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(
    new Set(currentLessonId ? [currentLessonId] : [])
  );

  const toggleLessonExpansion = (lessonId: string) => {
    const newExpanded = new Set(expandedLessons);
    if (newExpanded.has(lessonId)) {
      newExpanded.delete(lessonId);
    } else {
      newExpanded.add(lessonId);
    }
    setExpandedLessons(newExpanded);
  };

  const getLessonActivities = (lessonId: string) => {
    return activities
      .filter(activity => activity.lessonId === lessonId)
      .sort((a, b) => a.order - b.order);
  };

  if (isLoading) {
    return (
      <div className={cn('space-y-4', className)}>
        {/* Loading skeletons */}
        {[1, 2, 3].map(i => (
          <div key={i} className="space-y-2">
            <div className="flex items-center gap-3">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              <div className="h-4 flex-1 animate-pulse rounded bg-muted" />
            </div>
            <div className="ml-7 space-y-1">
              <div className="h-3 w-3/4 animate-pulse rounded bg-muted/50" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-muted/50" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <nav
      className={cn('space-y-2', className)}
      role="navigation"
      aria-label="Lesson navigation"
    >
      {lessons.map((lesson, lessonIndex) => {
        const isCurrentLesson = lesson.id === currentLessonId;
        const isCompleted = completedLessons.includes(lesson.id);
        const isExpanded = expandedLessons.has(lesson.id);
        const lessonActivities = getLessonActivities(lesson.id);

        return (
          <Collapsible
            key={lesson.id}
            open={isExpanded}
            onOpenChange={() => toggleLessonExpansion(lesson.id)}
          >
            <div className="space-y-1">
              {/* Lesson item */}
              <div
                className={cn(
                  'group flex items-center gap-3 rounded-lg p-3 transition-all hover:bg-muted/50',
                  isCurrentLesson && 'bg-primary/10 ring-1 ring-primary/20'
                )}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 hover:bg-transparent"
                    aria-expanded={isExpanded}
                    aria-label={`${isExpanded ? 'Collapse' : 'Expand'} lesson ${lessonIndex + 1}`}
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </CollapsibleTrigger>

                <button
                  onClick={() => onLessonSelect(lesson.id)}
                  className={cn(
                    'flex flex-1 items-center gap-3 text-left transition-colors',
                    isCurrentLesson
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                  )}
                  aria-current={isCurrentLesson ? 'page' : undefined}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                      {lessonIndex + 1}
                    </span>
                    {lesson.muxAssetId && (
                      <PlayCircle className="h-3 w-3 text-muted-foreground" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium">{lesson.title}</p>
                    {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {lesson.keyTakeaways.length} key takeaway
                        {lesson.keyTakeaways.length === 1 ? '' : 's'}
                      </p>
                    )}
                  </div>

                  {isCompleted && (
                    <CheckCircle
                      className="h-4 w-4 text-green-500"
                      aria-label="Lesson completed"
                    />
                  )}
                </button>
              </div>

              {/* Activities */}
              <CollapsibleContent className="space-y-1">
                <div className="ml-6 border-l border-gray-300 dark:border-gray-700 pl-4 space-y-1">
                  {lessonActivities.map((activity, activityIndex) => {
                    const isCurrentActivity = activity.id === currentActivityId;
                    const isActivityCompleted = completedActivities.includes(
                      activity.id
                    );

                    return (
                      <button
                        key={activity.id}
                        onClick={() => onActivitySelect(activity.id, lesson.id)}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-lg p-2 text-left text-sm transition-all hover:bg-muted/50',
                          isCurrentActivity &&
                            'bg-primary/10 ring-1 ring-primary/20'
                        )}
                        aria-current={isCurrentActivity ? 'page' : undefined}
                      >
                        <ActivityIcon type={activity.type} />

                        <div className="flex-1 min-w-0">
                          <p
                            className={cn(
                              'truncate',
                              isCurrentActivity
                                ? 'text-primary font-medium'
                                : 'text-foreground'
                            )}
                          >
                            <ActivityTypeLabel type={activity.type} />{' '}
                            {activityIndex + 1}
                          </p>
                          {activity.type === 'REFLECTION' && (
                            <p className="text-xs text-muted-foreground truncate">
                              {(activity.payload as any).prompt?.substring(
                                0,
                                50
                              )}
                              ...
                            </p>
                          )}
                        </div>

                        {isActivityCompleted && (
                          <CheckCircle
                            className="h-3 w-3 text-green-500"
                            aria-label="Activity completed"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        );
      })}
    </nav>
  );
};
