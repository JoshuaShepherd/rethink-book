'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  X,
  Target,
  ArrowRight,
  RefreshCw,
  Lightbulb,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DragDropItem {
  id: string;
  content: string;
  type: string;
}

interface DragDropCategory {
  id: string;
  title: string;
  description: string;
  acceptedTypes: string[];
}

interface DragDropActivityProps {
  title: string;
  instructions: string;
  items: DragDropItem[];
  categories: DragDropCategory[];
  correctMatches: Record<string, string>;
  onComplete: () => void;
  isCompleted: boolean;
  className?: string;
}

export const DragDropActivity: React.FC<DragDropActivityProps> = ({
  title,
  instructions,
  items,
  categories,
  correctMatches,
  onComplete,
  isCompleted,
  className,
}) => {
  const [draggedItem, setDraggedItem] = useState<DragDropItem | null>(null);
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<
    Record<string, 'correct' | 'incorrect' | null>
  >({});
  const [showResults, setShowResults] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleDragStart = (item: DragDropItem) => {
    setDraggedItem(item);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDrop = (categoryId: string) => {
    if (!draggedItem) return;

    setAssignments(prev => ({
      ...prev,
      [draggedItem.id]: categoryId,
    }));

    setDraggedItem(null);
  };

  const handleRemoveFromCategory = (itemId: string) => {
    setAssignments(prev => {
      const newAssignments = { ...prev };
      delete newAssignments[itemId];
      return newAssignments;
    });
  };

  const checkAnswers = () => {
    const newFeedback: Record<string, 'correct' | 'incorrect' | null> = {};

    items.forEach(item => {
      const userAnswer = assignments[item.id];
      const correctAnswer = correctMatches[item.id];

      if (userAnswer === correctAnswer) {
        newFeedback[item.id] = 'correct';
      } else if (userAnswer) {
        newFeedback[item.id] = 'incorrect';
      } else {
        newFeedback[item.id] = null;
      }
    });

    setFeedback(newFeedback);
    setShowResults(true);
    setAttempts(prev => prev + 1);

    // Check if all answers are correct
    const allCorrect = items.every(
      item => assignments[item.id] === correctMatches[item.id]
    );

    if (allCorrect && !isCompleted) {
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  };

  const resetActivity = () => {
    setAssignments({});
    setFeedback({});
    setShowResults(false);
  };

  const getUnassignedItems = () => {
    return items.filter(item => !assignments[item.id]);
  };

  const getItemsInCategory = (categoryId: string) => {
    return items.filter(item => assignments[item.id] === categoryId);
  };

  const allItemsAssigned = items.every(item => assignments[item.id]);
  const allCorrect = items.every(
    item => assignments[item.id] === correctMatches[item.id]
  );

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
          {instructions}
        </p>

        {attempts > 0 && (
          <div className="text-sm text-muted-foreground">
            Attempts: {attempts}
          </div>
        )}
      </div>

      {/* Activity Area */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Items Pool */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Drag Items to Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <AnimatePresence>
                {getUnassignedItems().map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    drag
                    dragSnapToOrigin
                    onDragStart={() => handleDragStart(item)}
                    onDragEnd={handleDragEnd}
                    whileDrag={{ scale: 1.05, rotate: 5 }}
                    className={cn(
                      'p-4 bg-background border-2 border-dashed border-muted rounded-lg cursor-grab active:cursor-grabbing',
                      'hover:border-primary hover:bg-primary/5',
                      'transition-all duration-200',
                      showResults &&
                        feedback[item.id] === 'correct' &&
                        'border-green-500 bg-green-50 dark:bg-green-950/20',
                      showResults &&
                        feedback[item.id] === 'incorrect' &&
                        'border-red-500 bg-red-50 dark:bg-red-950/20'
                    )}
                  >
                    <p className="text-sm font-medium leading-relaxed">
                      {item.content}
                    </p>

                    {showResults && feedback[item.id] && (
                      <div className="mt-2 flex items-center gap-2">
                        {feedback[item.id] === 'correct' ? (
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200"
                          >
                            Correct
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200"
                          >
                            Try Again
                          </Badge>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {getUnassignedItems().length === 0 && !showResults && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>All items have been assigned!</p>
                  <p className="text-sm mt-1">
                    Click "Check Answers" to see how you did.
                  </p>
                </div>
              )}

              {showResults && allCorrect && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-3"
                >
                  <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
                  <div>
                    <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                      Perfect! 🎉
                    </h3>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      You've correctly identified all the examples.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="space-y-4">
          {categories.map(category => (
            <Card
              key={category.id}
              className={cn(
                'transition-all duration-200',
                draggedItem && 'ring-2 ring-primary/50'
              )}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{category.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </CardHeader>
              <CardContent>
                <div
                  className={cn(
                    'min-h-[120px] p-4 border-2 border-dashed rounded-lg transition-all duration-200',
                    'border-muted bg-muted/20',
                    draggedItem && 'border-primary bg-primary/5'
                  )}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => {
                    e.preventDefault();
                    handleDrop(category.id);
                  }}
                >
                  <div className="space-y-2">
                    {getItemsInCategory(category.id).map(item => (
                      <div
                        key={item.id}
                        className={cn(
                          'p-3 bg-background border rounded-lg relative group',
                          showResults &&
                            feedback[item.id] === 'correct' &&
                            'border-green-500 bg-green-50 dark:bg-green-950/20',
                          showResults &&
                            feedback[item.id] === 'incorrect' &&
                            'border-red-500 bg-red-50 dark:bg-red-950/20'
                        )}
                      >
                        <p className="text-sm font-medium pr-8">
                          {item.content}
                        </p>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFromCategory(item.id)}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
                          disabled={showResults}
                        >
                          <X className="h-3 w-3" />
                        </Button>

                        {showResults && feedback[item.id] && (
                          <div className="mt-2">
                            {feedback[item.id] === 'correct' ? (
                              <Badge
                                variant="secondary"
                                className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200"
                              >
                                ✓ Correct
                              </Badge>
                            ) : (
                              <Badge
                                variant="secondary"
                                className="bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200"
                              >
                                ✗ Incorrect
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    ))}

                    {getItemsInCategory(category.id).length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p className="text-sm">Drop items here</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        {!showResults ? (
          <Button
            onClick={checkAnswers}
            disabled={!allItemsAssigned}
            size="lg"
            className="px-8"
          >
            Check Answers
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={resetActivity}
              size="lg"
              className="px-6"
              disabled={isCompleted}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>

            {allCorrect && (
              <Button size="lg" className="px-8" disabled>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Complete!
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Feedback and Tips */}
      {showResults && !allCorrect && attempts === 1 && (
        <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-orange-900 dark:text-orange-100 mb-2">
                  Hint
                </h4>
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  Remember: Bivocational means having two separate vocations,
                  while Covocational means integrating your vocation with your
                  mission. Look for examples where work and ministry are woven
                  together.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completion Status */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-6 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg"
        >
          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
          <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">
            Activity Completed!
          </h3>
          <p className="text-sm text-green-700 dark:text-green-300">
            Excellent work understanding the difference between Bivo and Covo
            approaches!
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default DragDropActivity;
