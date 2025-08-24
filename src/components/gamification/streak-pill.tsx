'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Streak } from '@/types/content';
import { Flame, Calendar, Trophy } from 'lucide-react';

interface StreakPillProps {
  streak: Streak;
  className?: string;
}

export function StreakPill({ streak, className }: StreakPillProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Badge
        variant="secondary"
        className={`flex items-center space-x-1 cursor-help ${className}`}
      >
        <Flame className="w-3 h-3 text-orange-500" />
        <span>{streak.daily}</span>
      </Badge>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-surface-elevated border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-50 min-w-[200px]">
          <div className="text-xs text-text-primary font-medium mb-2">
            Your Learning Streak
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Flame className="w-3 h-3 text-orange-500" />
                <span className="text-text-secondary">Daily streak:</span>
              </div>
              <span className="font-medium text-text-primary">
                {streak.daily} days
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-blue-500" />
                <span className="text-text-secondary">Weekly streak:</span>
              </div>
              <span className="font-medium text-text-primary">
                {streak.weekly} weeks
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Trophy className="w-3 h-3 text-yellow-500" />
                <span className="text-text-secondary">Best daily:</span>
              </div>
              <span className="font-medium text-text-primary">
                {streak.longestDaily} days
              </span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-300 dark:border-gray-700">
            <div className="text-xs text-text-muted">
              Complete activities daily to maintain your streak
            </div>
          </div>

          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
            <div className="border-4 border-transparent border-t-surface-elevated"></div>
          </div>
        </div>
      )}
    </div>
  );
}
