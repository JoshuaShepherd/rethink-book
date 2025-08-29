'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  Clock,
  BookOpen,
  FileText,
  Upload,
  CheckSquare,
  Target,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PracticeAssignmentProps {
  title: string;
  description: string;
  instructions: string[];
  estimatedTime: string;
  deliverable: string;
  onSubmit: (submission: { text: string; reflection: string }) => void;
  isCompleted: boolean;
  className?: string;
}

export const PracticeAssignment: React.FC<PracticeAssignmentProps> = ({
  title,
  description,
  instructions,
  estimatedTime,
  deliverable,
  onSubmit,
  isCompleted,
  className,
}) => {
  const [submission, setSubmission] = useState('');
  const [reflection, setReflection] = useState('');
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStepToggle = (stepIndex: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepIndex)) {
      newCompleted.delete(stepIndex);
    } else {
      newCompleted.add(stepIndex);
    }
    setCompletedSteps(newCompleted);
  };

  const handleSubmit = async () => {
    if (!submission.trim() || !reflection.trim()) return;

    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    onSubmit({
      text: submission,
      reflection: reflection,
    });

    setIsSubmitting(false);
  };

  const allStepsCompleted = completedSteps.size === instructions.length;
  const canSubmit = allStepsCompleted && submission.trim() && reflection.trim();

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          {isCompleted ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <Target className="h-5 w-5 text-primary" />
          )}
          <h1 className="text-2xl lg:text-3xl font-bold">{title}</h1>
        </div>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>

        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{estimatedTime}</span>
          </div>

          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>{deliverable}</span>
          </div>

          {isCompleted && (
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              <span>Submitted</span>
            </div>
          )}
        </div>
      </div>

      {/* Instructions Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckSquare className="h-5 w-5 text-primary" />
            Assignment Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {instructions.map((instruction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <Checkbox
                  id={`step-${index}`}
                  checked={completedSteps.has(index)}
                  onCheckedChange={() => handleStepToggle(index)}
                  className="mt-1"
                  disabled={isCompleted}
                />

                <div className="flex-1">
                  <label
                    htmlFor={`step-${index}`}
                    className={cn(
                      'text-sm leading-relaxed cursor-pointer',
                      completedSteps.has(index)
                        ? 'line-through text-muted-foreground'
                        : 'text-foreground'
                    )}
                  >
                    <span className="font-medium mr-2">Step {index + 1}:</span>
                    {instruction}
                  </label>
                </div>
              </motion.div>
            ))}

            {allStepsCompleted && !isCompleted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800"
              >
                <p className="text-sm text-green-800 dark:text-green-200 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Great! All steps completed. Now document your work below.
                </p>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Submission Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="h-5 w-5 text-primary" />
            Submit Your Work
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Main Submission */}
            <div className="space-y-3">
              <label htmlFor="submission" className="text-sm font-medium">
                {deliverable}
              </label>
              <Textarea
                id="submission"
                value={submission}
                onChange={e => setSubmission(e.target.value)}
                placeholder="Describe what you did, what you discovered, and any key insights..."
                className="min-h-[150px]"
                disabled={isCompleted}
              />
              <p className="text-xs text-muted-foreground">
                Be specific about your experience and what you learned.
              </p>
            </div>

            {/* Reflection */}
            <div className="space-y-3">
              <label htmlFor="reflection" className="text-sm font-medium">
                Personal Reflection
              </label>
              <Textarea
                id="reflection"
                value={reflection}
                onChange={e => setReflection(e.target.value)}
                placeholder="How did this assignment impact your understanding? What would you do differently next time?"
                className="min-h-[120px]"
                disabled={isCompleted}
              />
              <p className="text-xs text-muted-foreground">
                Reflect on your learning and growth from this experience.
              </p>
            </div>

            {/* Progress Indicators */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <Badge
                  variant={allStepsCompleted ? 'secondary' : 'outline'}
                  className="text-xs"
                >
                  {completedSteps.size}/{instructions.length} steps completed
                </Badge>

                {submission && (
                  <Badge variant="outline" className="text-xs">
                    {submission.trim().split(/\s+/).length} words written
                  </Badge>
                )}
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!canSubmit || isSubmitting || isCompleted}
                size="lg"
                className="px-6"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="mr-2"
                    >
                      <Upload className="h-4 w-4" />
                    </motion.div>
                    Submitting...
                  </>
                ) : isCompleted ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Submitted
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Submit Assignment
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Completion Status */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-6 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg"
        >
          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
          <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">
            Assignment Completed!
          </h3>
          <p className="text-sm text-green-700 dark:text-green-300">
            Excellent work completing this practical assignment. Your experience
            and insights will be valuable for your ongoing learning.
          </p>
        </motion.div>
      )}

      {/* Guidance for incomplete assignments */}
      {!isCompleted && !allStepsCompleted && (
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Target className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Getting Started
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Work through each step in the checklist above. This assignment
                  is designed to give you practical experience applying what
                  you've learned. Take your time and be thorough in your
                  approach.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PracticeAssignment;
