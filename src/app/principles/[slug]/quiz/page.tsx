'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MasteryCheck } from '@/components/quiz/mastery-check';
import { BadgeEarnedModal } from '@/components/gamification/badge-earned-modal';
import { StreakPill } from '@/components/gamification/streak-pill';
import { toast } from 'react-hot-toast';
import { track } from '@/lib/analytics';
import {
  Quiz,
  QuizAttempt,
  EnhancedBadge,
  UserBadge,
  Streak,
} from '@/types/content';
import { mockQuizzes } from '@/mocks/quiz-data';
import { mockBadges, mockUserBadges, mockStreak } from '@/mocks/badge-data';
import { ArrowLeft, Trophy, Clock, Target } from 'lucide-react';

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState<EnhancedBadge | null>(null);
  const [userBadges, setUserBadges] = useState<UserBadge[]>(mockUserBadges);
  const [streak, setStreak] = useState<Streak>(mockStreak);
  const [lastAttempt, setLastAttempt] = useState<QuizAttempt | null>(null);

  useEffect(() => {
    // Load quiz data based on principle slug
    const loadQuiz = () => {
      const foundQuiz = mockQuizzes.find(
        q => q.principleId === slug || q.principleId.includes(slug)
      );

      if (foundQuiz) {
        setQuiz(foundQuiz);
        track('quiz_view', {
          quiz_id: foundQuiz.id,
          principle_slug: slug,
        });
      }
      setIsLoading(false);
    };

    loadQuiz();
  }, [slug]);

  const handleQuizComplete = (attempt: QuizAttempt) => {
    setLastAttempt(attempt);

    track('quiz_complete', {
      quiz_id: attempt.quizId,
      score: attempt.score,
      passed: attempt.passed,
      time_spent: attempt.timeSpent,
    });

    if (attempt.passed) {
      // Check for badge earned
      const badge = mockBadges.find(b => b.id === 'badge_incarnation');
      if (badge && !userBadges.some(ub => ub.badgeId === badge.id)) {
        const newUserBadge: UserBadge = {
          badgeId: badge.id,
          earnedAt: new Date(),
          quizId: attempt.quizId,
        };

        setUserBadges(prev => [...prev, newUserBadge]);
        setEarnedBadge(badge);
        setShowBadgeModal(true);

        track('badge_earned', {
          badge_id: badge.id,
          quiz_id: attempt.quizId,
          principle_slug: slug,
        });
      }

      // Update streak
      const newStreak = { ...streak, daily: streak.daily + 1 };
      setStreak(newStreak);

      track('streak_increment', {
        daily_streak: newStreak.daily,
        weekly_streak: newStreak.weekly,
      });

      toast.success('Quiz passed! Well done on your progress.');
    } else {
      toast.error(
        `Score: ${attempt.score}%. Need ${quiz?.passThreshold}% to pass. Review and try again!`
      );
    }
  };

  const handleRetakeQuiz = () => {
    setLastAttempt(null);
    track('quiz_retake', {
      quiz_id: quiz?.id,
      principle_slug: slug,
    });
  };

  const handleReviewLessons = () => {
    router.push(`/principles/${slug}`);
    track('quiz_review_lessons', {
      quiz_id: quiz?.id,
      principle_slug: slug,
    });
  };

  const handleNextModule = () => {
    // Navigate to next module (mock implementation)
    router.push('/principles');
    track('quiz_next_module', {
      current_quiz: quiz?.id,
      principle_slug: slug,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Loading skeleton */}
        <div className="container mx-auto px-6 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-surface rounded w-1/3"></div>
            <div className="h-64 bg-surface rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-surface rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Quiz Not Found</CardTitle>
            <CardDescription className="text-center">
              The quiz for this principle is not available yet.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => router.push(`/principles/${slug}`)}
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Lessons
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-gray-300 dark:border-gray-700 bg-surface/50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(`/principles/${slug}`)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Lessons
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-text-primary">
                  {quiz.title}
                </h1>
                {quiz.description && (
                  <p className="text-text-secondary mt-1">{quiz.description}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <StreakPill streak={streak} />

              {/* Quiz Stats */}
              <div className="hidden md:flex space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-text-secondary">
                    Pass: {quiz.passThreshold}%
                  </span>
                </div>
                {quiz.timeLimit && (
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span className="text-text-secondary">
                      {quiz.timeLimit} min
                    </span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-accent-gold" />
                  <span className="text-text-secondary">
                    {quiz.questions.length} questions
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Quiz Content */}
          <div className="lg:col-span-3">
            {!lastAttempt ? (
              <MasteryCheck quiz={quiz} onComplete={handleQuizComplete} />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy
                      className={`w-5 h-5 ${
                        lastAttempt.passed
                          ? 'text-secondary'
                          : 'text-text-muted'
                      }`}
                    />
                    <span>
                      {lastAttempt.passed ? 'Quiz Passed!' : 'Quiz Complete'}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Your score: {lastAttempt.score}% (
                    {lastAttempt.passed ? 'Passed' : 'Needs Review'})
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Progress value={lastAttempt.score} className="w-full" />

                  <div className="flex flex-col sm:flex-row gap-4">
                    {!lastAttempt.passed && (
                      <Button onClick={handleRetakeQuiz} className="flex-1">
                        Try Again
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={handleReviewLessons}
                      className="flex-1"
                    >
                      Review Lessons
                    </Button>
                    {lastAttempt.passed && (
                      <Button
                        variant="premium"
                        onClick={handleNextModule}
                        className="flex-1"
                      >
                        Next Module
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Rail */}
          <div className="space-y-6">
            {/* Earned Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Earned Badges</CardTitle>
                <CardDescription>Your progress achievements</CardDescription>
              </CardHeader>
              <CardContent>
                {userBadges.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {userBadges.map(userBadge => {
                      const badge = mockBadges.find(
                        b => b.id === userBadge.badgeId
                      );
                      if (!badge) return null;

                      return (
                        <button
                          key={userBadge.badgeId}
                          onClick={() => {
                            setEarnedBadge(badge);
                            setShowBadgeModal(true);
                          }}
                          className="p-3 rounded-lg bg-surface/50 hover:bg-surface transition-colors text-center"
                        >
                          <div className="text-2xl mb-1">{badge.icon}</div>
                          <div className="text-xs font-medium text-text-primary">
                            {badge.name}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-text-muted text-sm">
                    Complete your first quiz to earn badges!
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Progress Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-text-secondary">Daily Streak</span>
                    <span className="font-medium text-text-primary">
                      {streak.daily} days
                    </span>
                  </div>
                  <Progress value={(streak.daily / 7) * 100} />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-text-secondary">Weekly Streak</span>
                    <span className="font-medium text-text-primary">
                      {streak.weekly} weeks
                    </span>
                  </div>
                  <Progress value={(streak.weekly / 4) * 100} />
                </div>

                <div className="pt-4 border-t border-gray-300 dark:border-gray-700">
                  <div className="text-sm text-text-secondary mb-2">
                    Achievements
                  </div>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="text-xs">
                      🏠 {userBadges.length} badges earned
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      🔥 {streak.longestDaily} day best streak
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Badge Earned Modal */}
      {showBadgeModal && earnedBadge && (
        <BadgeEarnedModal
          badge={earnedBadge}
          isOpen={showBadgeModal}
          onClose={() => setShowBadgeModal(false)}
          onKeepLearning={handleNextModule}
        />
      )}
    </div>
  );
}
