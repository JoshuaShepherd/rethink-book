'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  Clock,
  CheckSquare,
  Square,
  Heart,
  Send,
  Camera,
  Sparkles,
  Target,
} from 'lucide-react';
import { analytics } from '@/lib/analytics';
import { FieldExperimentPayload } from '@/types/content';
import { toast } from 'react-hot-toast';

interface FieldExperimentCardProps {
  activityId: string;
  payload: FieldExperimentPayload;
  onSubmit: (reflection: string, intention: boolean, photo?: File) => void;
  className?: string;
}

export const FieldExperimentCard = ({
  activityId,
  payload,
  onSubmit,
  className,
}: FieldExperimentCardProps) => {
  const [hasCommitted, setHasCommitted] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [reflection, setReflection] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommit = () => {
    setHasCommitted(true);
    toast.success(
      "Great! You've committed to this practice. Now go live it out.",
      {
        icon: '🎯',
        duration: 4000,
      }
    );
  };

  const handleChecklistToggle = (index: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedItems(newChecked);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setPhoto(file);
      toast.success('Photo added! This will help you remember the experience.');
    }
  };

  const handleSubmit = async () => {
    if (reflection.trim().length < 10) {
      toast.error(
        'Please share a bit more about your experience (at least 10 characters).'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(reflection, hasCommitted, photo || undefined);

      // Analytics
      analytics.trackFieldExperimentSubmit(activityId);

      // Celebration toast
      toast.success(
        "🎉 Field experiment submitted! You're living incarnationally.",
        {
          duration: 5000,
        }
      );

      // Reset form
      setReflection('');
      setPhoto(null);
      setCheckedItems(new Set());
    } catch (error) {
      console.error('Error submitting field experiment:', error);
      toast.error('Failed to submit reflection. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const allItemsChecked = payload.checklist
    ? payload.checklist.length === checkedItems.size
    : true;

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">
          Field Experiment
        </h3>
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Target className="h-5 w-5" />
                  {payload.title}
                </CardTitle>
                <CardDescription className="mt-2 flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  Suggested time: {payload.suggestedDuration}
                </CardDescription>
              </div>
              <Sparkles className="h-6 w-6 text-primary/60" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed text-foreground/90">
              {payload.instructions}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Commitment */}
      {!hasCommitted ? (
        <Card className="border-dashed border-2">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Heart className="mx-auto h-8 w-8 text-muted-foreground" />
              <div>
                <h4 className="font-medium text-foreground mb-2">
                  Ready to try this?
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Incarnational mission happens through intentional practice,
                  not just good intentions.
                </p>
                <Button
                  onClick={handleCommit}
                  className="flex items-center gap-2"
                >
                  <Heart className="h-4 w-4" />
                  I'll try this
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Checklist */}
          {payload.checklist && payload.checklist.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Practice Guide</CardTitle>
                <CardDescription>
                  Check off each step as you complete it
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {payload.checklist.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <button
                        onClick={() => handleChecklistToggle(index)}
                        className={cn(
                          'mt-0.5 flex-shrink-0 transition-colors',
                          checkedItems.has(index)
                            ? 'text-green-600'
                            : 'text-muted-foreground hover:text-foreground'
                        )}
                        aria-label={`${checkedItems.has(index) ? 'Uncheck' : 'Check'} step ${index + 1}`}
                      >
                        {checkedItems.has(index) ? (
                          <CheckSquare className="h-5 w-5" />
                        ) : (
                          <Square className="h-5 w-5" />
                        )}
                      </button>
                      <span
                        className={cn(
                          'text-sm leading-relaxed',
                          checkedItems.has(index)
                            ? 'line-through text-muted-foreground'
                            : 'text-foreground'
                        )}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {allItemsChecked && (
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="text-sm text-green-800 dark:text-green-200 flex items-center gap-2">
                      <CheckSquare className="h-4 w-4" />
                      Great work! Now share your experience below.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Reflection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Share Your Experience</CardTitle>
              <CardDescription>
                What did you notice? How did it feel? What did you learn?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="experiment-reflection" className="sr-only">
                  Your reflection on the field experiment
                </label>
                <Textarea
                  id="experiment-reflection"
                  placeholder="Describe what happened during your field experiment..."
                  value={reflection}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setReflection(e.target.value)
                  }
                  className="min-h-[120px]"
                />
              </div>

              {/* Optional photo upload */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Optional: Add a photo
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document.getElementById('photo-upload')?.click()
                    }
                    className="flex items-center gap-2"
                  >
                    <Camera className="h-4 w-4" />
                    {photo ? 'Change Photo' : 'Add Photo'}
                  </Button>
                  {photo && (
                    <span className="text-sm text-muted-foreground">
                      {photo.name}
                    </span>
                  )}
                </div>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end pt-2">
                <Button
                  onClick={handleSubmit}
                  disabled={reflection.trim().length < 10 || isSubmitting}
                  className="flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? 'Submitting...' : 'Submit Reflection'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Encouragement */}
      <div className="text-sm text-muted-foreground p-4 bg-muted/30 rounded-lg">
        <p className="mb-2">
          <strong>Remember:</strong> Field experiments are about faithful
          presence, not perfect performance.
        </p>
        <p>
          The goal isn't to "do it right" but to practice incarnational rhythms
          that form you over time.
        </p>
      </div>
    </div>
  );
};
