'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'react-hot-toast';
import { track } from '@/lib/analytics';
import { Quiz, QuizQuestion, QuizAnswer, QuizAttempt } from '@/types/content';
import {
  Clock,
  CheckCircle,
  XCircle,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

interface MasteryCheckProps {
  quiz: Quiz;
  onComplete: (attempt: QuizAttempt) => void;
}

interface QuestionState {
  selectedChoices: string[];
  showHint: boolean;
  showExplanation: boolean;
  isAnswered: boolean;
  isCorrect: boolean;
  usedHint: boolean;
}

export function MasteryCheck({ quiz, onComplete }: MasteryCheckProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionStates, setQuestionStates] = useState<
    Record<string, QuestionState>
  >({});
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(
    quiz.timeLimit ? quiz.timeLimit * 60 : null
  );

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const currentState = questionStates[currentQuestion.id] || {
    selectedChoices: [],
    showHint: false,
    showExplanation: false,
    isAnswered: false,
    isCorrect: false,
    usedHint: false,
  };

  const handleSubmitQuiz = useCallback(() => {
    const endTime = new Date();
    const timeSpent = startTime
      ? Math.floor((endTime.getTime() - startTime.getTime()) / 1000)
      : 0;

    const answers: QuizAnswer[] = quiz.questions.map(question => {
      const state = questionStates[question.id] || {
        selectedChoices: [],
        isCorrect: false,
        usedHint: false,
      };

      return {
        questionId: question.id,
        selectedChoices: state.selectedChoices,
        isCorrect: state.isCorrect,
        usedHint: state.usedHint,
      };
    });

    const correctAnswers = answers.filter(answer => answer.isCorrect).length;
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    const passed = score >= quiz.passThreshold;

    const attempt: QuizAttempt = {
      id: `attempt-${Date.now()}`,
      quizId: quiz.id,
      userId: 'current-user',
      answers,
      score,
      passed,
      completedAt: endTime,
      timeSpent,
    };

    onComplete(attempt);
  }, [quiz, questionStates, startTime, onComplete]);

  const handleTimeUp = useCallback(() => {
    toast.error('Time is up! Submitting your current answers.');
    handleSubmitQuiz();
  }, [handleSubmitQuiz]);

  // Timer effect
  useEffect(() => {
    if (!hasStarted || !timeRemaining) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev && prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, timeRemaining, handleTimeUp]);

  // Start screen
  if (!hasStarted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{quiz.title}</CardTitle>
          {quiz.description && (
            <p className="text-text-secondary mt-2">{quiz.description}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <Button
            onClick={() => {
              setHasStarted(true);
              setStartTime(new Date());
            }}
            size="lg"
            className="w-full"
          >
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Simple quiz interface for now
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quiz in Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Quiz functionality will be implemented here.</p>
          <Button onClick={() => handleSubmitQuiz()}>Complete Quiz</Button>
        </CardContent>
      </Card>
    </div>
  );
}
