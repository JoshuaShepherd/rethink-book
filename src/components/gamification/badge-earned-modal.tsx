'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EnhancedBadge } from '@/types/content';
import { badgeRarityStyles } from '@/mocks/badge-data';
import { track } from '@/lib/analytics';
import { X, Share2, Copy, ArrowRight, Sparkles, Trophy } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface BadgeEarnedModalProps {
  badge: EnhancedBadge;
  isOpen: boolean;
  onClose: () => void;
  onKeepLearning: () => void;
}

export function BadgeEarnedModal({
  badge,
  isOpen,
  onClose,
  onKeepLearning,
}: BadgeEarnedModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      // Auto-hide confetti after animation
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // Disable body scroll when modal is open
      document.body.style.overflow = 'hidden';

      // Focus management for accessibility
      const modalElement = document.getElementById('badge-modal');
      modalElement?.focus();

      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied! Share your achievement.');
      track('badge_share', {
        badge_id: badge.id,
        method: 'copy_link',
      });
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `I earned the "${badge.name}" badge!`,
      text: `${badge.description} - ${badge.requirement}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        track('badge_share', {
          badge_id: badge.id,
          method: 'native_share',
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to copy
      handleCopyLink();
    }
  };

  const handleKeepLearning = () => {
    track('badge_modal_continue', {
      badge_id: badge.id,
    });
    onKeepLearning();
    onClose();
  };

  const rarityStyle = badgeRarityStyles[badge.rarity];

  if (!isOpen) return null;

  // Encouragement messages aligned to Brad's tone
  const encouragementMessages = {
    badge_incarnation:
      'You moved into the neighborhood—nice. Presence creates possibility.',
    badge_vocation:
      "You're seeing work as mission field. Every interaction matters.",
    badge_multiplication:
      'Planting seeds of multiplication. Small beginnings, kingdom impact.',
    badge_streak_7: 'Seven days of steady learning. Rhythm builds resilience.',
    badge_streak_30:
      "A month of faithful practice. You're developing kingdom muscle.",
    badge_reflection_master:
      'Deep thinking leads to deeper living. Keep wrestling with truth.',
    badge_field_explorer:
      'Theory becomes practice. The street is where mission lives.',
    badge_quiz_perfectionist:
      "Excellence in understanding. Now live what you've learned.",
  };

  const encouragement =
    encouragementMessages[badge.id as keyof typeof encouragementMessages] ||
    'Well done! Your learning journey is creating real transformation.';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="badge-title"
      onClick={onClose}
    >
      {/* Confetti Effect */}
      {showConfetti && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, #fbbf24 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, #10b981 0%, transparent 50%)
            `,
            animation: showConfetti ? 'confetti-fall 3s ease-out' : 'none',
          }}
        />
      )}

      <Card
        id="badge-modal"
        className={`max-w-md w-full mx-auto transform transition-all ${rarityStyle.glow}`}
        onClick={e => e.stopPropagation()}
        tabIndex={-1}
      >
        <div
          className={`relative ${rarityStyle.bgColor} ${rarityStyle.borderColor} border-2 rounded-t-lg`}
        >
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 z-10"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </Button>

          {/* Badge Display */}
          <div className="text-center py-8 px-6">
            <div className="relative inline-block">
              {/* Badge Icon with glow effect */}
              <div
                className={`text-6xl mb-4 inline-block p-4 rounded-full ${rarityStyle.bgColor} ${showConfetti ? 'animate-bounce' : ''}`}
              >
                {badge.icon}
              </div>

              {/* Sparkles for rare badges */}
              {(badge.rarity === 'RARE' || badge.rarity === 'LEGENDARY') && (
                <Sparkles
                  className={`absolute -top-2 -right-2 w-6 h-6 ${rarityStyle.textColor} ${showConfetti ? 'animate-spin' : ''}`}
                />
              )}
            </div>

            <div className="space-y-3">
              <Badge
                variant="outline"
                className={`${rarityStyle.borderColor} ${rarityStyle.textColor} font-semibold`}
              >
                <Trophy className="w-3 h-3 mr-1" />
                {badge.rarity.toLowerCase()} badge
              </Badge>

              <h2
                id="badge-title"
                className={`text-2xl font-bold ${rarityStyle.textColor}`}
              >
                {badge.name}
              </h2>

              <p className={`text-sm ${rarityStyle.textColor}/80`}>
                {badge.description}
              </p>
            </div>
          </div>
        </div>

        <CardContent className="p-6 space-y-6">
          {/* Encouragement */}
          <div className="bg-surface/50 rounded-lg p-4 border border-gray-300 dark:border-gray-700">
            <div className="text-sm font-medium text-text-primary mb-2">
              Brad's Take:
            </div>
            <div className="text-sm text-text-secondary italic">
              "{encouragement}"
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" onClick={handleShare} className="flex-1">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>

            <Button
              variant="outline"
              onClick={handleCopyLink}
              className="flex-1"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
          </div>

          <Button
            onClick={handleKeepLearning}
            className="w-full"
            variant="premium"
          >
            Keep Learning
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>

      {/* Custom confetti animation styles */}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            opacity: 1;
            transform: translateY(-100vh) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(100vh) rotate(720deg);
          }
        }
      `}</style>
    </div>
  );
}
