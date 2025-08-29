'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  Save,
  Clock,
  MessageSquare,
  Lightbulb,
  Eye,
  EyeOff,
  Download,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReflectionJournalProps {
  title: string;
  prompt: string;
  guidance: string[];
  suggestedTime: string;
  wordLimit?: number;
  onSave: (reflection: string) => void;
  isCompleted: boolean;
  className?: string;
}

export const ReflectionJournal: React.FC<ReflectionJournalProps> = ({
  title,
  prompt,
  guidance,
  suggestedTime,
  wordLimit = 500,
  onSave,
  isCompleted,
  className,
}) => {
  const [reflection, setReflection] = useState('');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [showGuidance, setShowGuidance] = useState(true);

  // Load saved reflection from localStorage on mount
  useEffect(() => {
    const savedReflection = localStorage.getItem(`reflection-${title}`);
    if (savedReflection) {
      setReflection(savedReflection);
      setIsStarted(true);
    }
  }, [title]);

  // Auto-save functionality
  useEffect(() => {
    if (reflection && isStarted) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem(`reflection-${title}`, reflection);
        setLastSaved(new Date());
      }, 2000); // Auto-save after 2 seconds of inactivity

      return () => clearTimeout(timeoutId);
    }
  }, [reflection, title, isStarted]);

  // Time tracking
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isStarted && !isCompleted) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isStarted, isCompleted]);

  const handleReflectionChange = (value: string) => {
    if (!isStarted) {
      setIsStarted(true);
    }
    setReflection(value);
  };

  const handleSave = async () => {
    if (!reflection.trim()) return;

    setIsSaving(true);

    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    localStorage.setItem(`reflection-${title}`, reflection);
    setLastSaved(new Date());
    onSave(reflection);
    setIsSaving(false);
  };

  const handleExport = () => {
    const content = `# ${title}\n\n## Prompt\n${prompt}\n\n## My Reflection\n${reflection}\n\n---\nReflected on: ${new Date().toLocaleString()}`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-reflection.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const wordCount = reflection.trim().split(/\s+/).filter(Boolean).length;
  const isOverLimit = wordLimit && wordCount > wordLimit;

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          {isCompleted ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <MessageSquare className="h-5 w-5 text-primary" />
          )}
          <h1 className="text-2xl lg:text-3xl font-bold">{title}</h1>
        </div>

        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{suggestedTime}</span>
          </div>

          {isStarted && (
            <div className="flex items-center gap-1">
              <span>Time spent: {formatTime(timeSpent)}</span>
            </div>
          )}

          {isCompleted && (
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              <span>Completed</span>
            </div>
          )}
        </div>
      </div>

      {/* Reflection Prompt */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Reflection Prompt</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-lg font-medium leading-relaxed text-primary">
                {prompt}
              </p>
            </div>

            {/* Guidance */}
            <div className="space-y-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowGuidance(!showGuidance)}
                className="flex items-center gap-2"
              >
                <Lightbulb className="h-4 w-4" />
                <span>Guidance for Reflection</span>
                {showGuidance ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>

              {showGuidance && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  {guidance.map((guide, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-secondary text-xs">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {guide}
                      </p>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Journal Writing Area */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Your Reflection</CardTitle>
            <div className="flex items-center gap-2">
              {lastSaved && (
                <span className="text-xs text-muted-foreground">
                  Last saved: {lastSaved.toLocaleTimeString()}
                </span>
              )}

              <Badge
                variant={isOverLimit ? 'destructive' : 'secondary'}
                className="text-xs"
              >
                {wordCount} / {wordLimit} words
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              value={reflection}
              onChange={e => handleReflectionChange(e.target.value)}
              placeholder="Begin writing your reflection here... Take your time to think deeply about the prompt."
              className={cn(
                'min-h-[300px] resize-none text-base leading-relaxed',
                isOverLimit && 'border-red-500 focus:ring-red-500'
              )}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {reflection && (
                  <>
                    <span>Draft auto-saved</span>
                    {isOverLimit && (
                      <span className="text-red-600">
                        • Exceeds word limit by {wordCount - wordLimit} words
                      </span>
                    )}
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                {reflection && (
                  <Button variant="outline" size="sm" onClick={handleExport}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                )}

                <Button
                  onClick={handleSave}
                  disabled={!reflection.trim() || isSaving || isCompleted}
                  size="lg"
                  className="px-6"
                >
                  {isSaving ? (
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
                        <Save className="h-4 w-4" />
                      </motion.div>
                      Saving...
                    </>
                  ) : isCompleted ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Reflection
                    </>
                  )}
                </Button>
              </div>
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
            Reflection Completed!
          </h3>
          <p className="text-sm text-green-700 dark:text-green-300">
            Great work taking time to reflect deeply. Your insights will guide
            your learning journey.
          </p>
        </motion.div>
      )}

      {/* Writing Tips */}
      {isStarted && !isCompleted && wordCount < 50 && (
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Writing Tip
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Take your time to explore your thoughts deeply. Consider
                  specific examples from your own experience and how they
                  connect to the concepts you're learning.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReflectionJournal;
