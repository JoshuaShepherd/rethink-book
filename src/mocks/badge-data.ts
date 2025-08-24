import { EnhancedBadge, UserBadge, Streak } from '@/types/content';

export const mockBadges: EnhancedBadge[] = [
  {
    id: 'badge_incarnation',
    name: 'Moved into the Neighborhood',
    description:
      'Completed the Incarnational Mission principle and quiz. You understand presence-based mission.',
    icon: '🏠',
    category: 'COMPLETION',
    rarity: 'COMMON',
    requirement: 'Complete Incarnational Mission quiz with 80%+',
  },
  {
    id: 'badge_vocation',
    name: 'Everyday Missionary',
    description:
      'Mastered whole-life mission thinking. Every role is a calling.',
    icon: '💼',
    category: 'MASTERY',
    rarity: 'UNCOMMON',
    requirement: 'Complete Vocation principle with reflection activities',
  },
  {
    id: 'badge_multiplication',
    name: 'Seed Planter',
    description: 'Understanding multiplication and movement dynamics.',
    icon: '🌱',
    category: 'MASTERY',
    rarity: 'UNCOMMON',
    requirement: 'Complete Multiplication principle and field experiment',
  },
  {
    id: 'badge_streak_7',
    name: 'Week Warrior',
    description:
      'Maintained a 7-day learning streak. Consistency builds character.',
    icon: '🔥',
    category: 'STREAK',
    rarity: 'COMMON',
    requirement: 'Complete activities for 7 consecutive days',
  },
  {
    id: 'badge_streak_30',
    name: 'Month Master',
    description:
      "Sustained learning for 30 days straight. You're building deep habits.",
    icon: '⚡',
    category: 'STREAK',
    rarity: 'RARE',
    requirement: 'Complete activities for 30 consecutive days',
  },
  {
    id: 'badge_reflection_master',
    name: 'Deep Thinker',
    description: 'Completed 10 meaningful reflections with rich insights.',
    icon: '🤔',
    category: 'ENGAGEMENT',
    rarity: 'UNCOMMON',
    requirement: 'Complete 10 reflection activities with 100+ words each',
  },
  {
    id: 'badge_field_explorer',
    name: 'Practice Pioneer',
    description: 'Completed 5 field experiments. Theory becomes practice.',
    icon: '🚀',
    category: 'ENGAGEMENT',
    rarity: 'RARE',
    requirement: 'Complete 5 field experiment activities',
  },
  {
    id: 'badge_quiz_perfectionist',
    name: 'Quiz Champion',
    description:
      'Scored 100% on 3 different principle quizzes. Excellence in understanding.',
    icon: '🏆',
    category: 'MASTERY',
    rarity: 'LEGENDARY',
    requirement: 'Score 100% on 3 different quizzes',
  },
];

// Mock user badges (initially earned)
export const mockUserBadges: UserBadge[] = [
  // User starts with no badges - they earn them through actions
];

// Mock user streak data
export const mockStreak: Streak = {
  daily: 3,
  weekly: 1,
  longestDaily: 5,
  longestWeekly: 2,
  lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
};

// Helper function to check badge requirements
export function checkBadgeEligibility(
  badgeId: string,
  userProgress: any
): boolean {
  switch (badgeId) {
    case 'badge_incarnation':
      // Earned by passing incarnational mission quiz
      return userProgress.quizScores?.['quiz-incarnational-mission'] >= 80;

    case 'badge_vocation':
      // Earned by completing vocation principle
      return userProgress.completedPrinciples?.includes('vocation');

    case 'badge_multiplication':
      // Earned by completing multiplication principle with field experiment
      return (
        userProgress.completedPrinciples?.includes('multiplication') &&
        userProgress.completedFieldExperiments?.includes(
          'multiplication-field-1'
        )
      );

    case 'badge_streak_7':
      return userProgress.streak?.daily >= 7;

    case 'badge_streak_30':
      return userProgress.streak?.daily >= 30;

    case 'badge_reflection_master':
      return userProgress.completedReflections?.length >= 10;

    case 'badge_field_explorer':
      return userProgress.completedFieldExperiments?.length >= 5;

    case 'badge_quiz_perfectionist':
      const perfectScores = Object.values(userProgress.quizScores || {}).filter(
        (score: any) => score === 100
      );
      return perfectScores.length >= 3;

    default:
      return false;
  }
}

// Badge rarity colors and effects
export const badgeRarityStyles = {
  COMMON: {
    bgColor: 'bg-gray-100 dark:bg-gray-800',
    textColor: 'text-gray-700 dark:text-gray-300',
    borderColor: 'border-gray-300 dark:border-gray-600',
    glow: '',
  },
  UNCOMMON: {
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    textColor: 'text-green-700 dark:text-green-300',
    borderColor: 'border-green-300 dark:border-green-600',
    glow: 'shadow-glow-emerald',
  },
  RARE: {
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-700 dark:text-blue-300',
    borderColor: 'border-blue-300 dark:border-blue-600',
    glow: 'shadow-glow',
  },
  LEGENDARY: {
    bgColor:
      'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30',
    textColor: 'text-amber-700 dark:text-amber-300',
    borderColor: 'border-amber-300 dark:border-amber-600',
    glow: 'shadow-glow-gold',
  },
};

export default mockBadges;
