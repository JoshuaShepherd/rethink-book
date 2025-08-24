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
import { cn } from '@/lib/utils';
import {
  ChevronRight,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { analytics } from '@/lib/analytics';
import { SimulationPayload } from '@/types/content';
import { toast } from 'react-hot-toast';

interface SimulationChoiceProps {
  activityId: string;
  payload: SimulationPayload;
  onChoiceSelect: (choiceId: string, delta: number) => void;
  className?: string;
}

interface SelectedChoice {
  id: string;
  label: string;
  rationale: string;
  delta: number;
}

export const SimulationChoice = ({
  activityId,
  payload,
  onChoiceSelect,
  className,
}: SimulationChoiceProps) => {
  const [selectedChoice, setSelectedChoice] = useState<SelectedChoice | null>(
    null
  );
  const [showFeedback, setShowFeedback] = useState(false);

  const handleChoiceSelect = (choice: SimulationPayload['choices'][0]) => {
    setSelectedChoice(choice);
    setShowFeedback(true);

    // Track analytics
    analytics.trackSimulationChoice(activityId, choice.id, choice.delta);

    // Notify parent component
    onChoiceSelect(choice.id, choice.delta);

    // Show encouraging toast
    if (choice.delta > 0) {
      toast.success("Great choice! You're thinking incarnationally.");
    } else if (choice.delta === 0) {
      toast("Good start! There's wisdom to learn here.");
    } else {
      toast('Learning moment! This helps us grow in wisdom.');
    }
  };

  const handleTryAgain = () => {
    setSelectedChoice(null);
    setShowFeedback(false);
  };

  const getDeltaIcon = (delta: number) => {
    if (delta > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (delta < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <AlertCircle className="h-4 w-4 text-yellow-600" />;
  };

  const getDeltaLabel = (delta: number) => {
    if (delta > 0) return 'Strengthens incarnational practice';
    if (delta < 0) return 'Misses incarnational opportunity';
    return 'Mixed results - learning opportunity';
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Scenario */}
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">
          Simulation
        </h3>
        <p className="leading-relaxed text-foreground/90">{payload.scenario}</p>
      </div>

      {/* Choices */}
      {!showFeedback ? (
        <div className="grid gap-4">
          <h4 className="font-medium text-foreground">What would you do?</h4>

          <div className="grid gap-3">
            {payload.choices.map(choice => (
              <Card
                key={choice.id}
                className="cursor-pointer transition-all hover:ring-2 hover:ring-primary/20"
                onClick={() => handleChoiceSelect(choice)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base leading-relaxed">
                      {choice.label}
                    </CardTitle>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        /* Feedback Panel */
        <div className="space-y-4">
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 text-base">
                    Your Choice
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {selectedChoice?.label}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {selectedChoice && getDeltaIcon(selectedChoice.delta)}
                  <span className="font-medium">
                    {selectedChoice && getDeltaLabel(selectedChoice.delta)}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Rationale */}
                <div>
                  <h5 className="mb-2 font-medium text-foreground">
                    Why this matters:
                  </h5>
                  <p className="text-sm leading-relaxed text-foreground/90">
                    {selectedChoice?.rationale}
                  </p>
                </div>

                {/* Formation insight */}
                <div className="rounded-lg bg-primary/5 p-4">
                  <h5 className="mb-2 font-medium text-primary">
                    What this forms in you:
                  </h5>
                  <p className="text-sm leading-relaxed text-foreground/90">
                    {selectedChoice &&
                      selectedChoice.delta > 0 &&
                      "This choice deepens your incarnational instincts. You're learning to prioritize presence and relationship over programs and productivity."}
                    {selectedChoice &&
                      selectedChoice.delta === 0 &&
                      'This choice shows good intentions, but incarnational mission requires deeper commitment to consistency and relationship-building over time.'}
                    {selectedChoice &&
                      selectedChoice.delta < 0 &&
                      'This choice reveals how easy it is to default to our preferences rather than truly receiving from others. Incarnational mission starts with listening, not leading.'}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    onClick={handleTryAgain}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Try Again
                  </Button>

                  <Button
                    onClick={() => {
                      // Could advance to next activity or lesson here
                      toast.success(
                        'Simulation complete! Ready for the next step.'
                      );
                    }}
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    Continue
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Instructions */}
      <div className="text-sm text-muted-foreground">
        <p>
          💡 <strong>Remember:</strong> There's no penalty for trying different
          choices. This is about learning and formation, not getting the "right"
          answer.
        </p>
      </div>
    </div>
  );
};
