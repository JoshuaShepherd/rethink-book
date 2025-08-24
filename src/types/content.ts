import { z } from 'zod';

// Core data types for content system
export interface Principle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  estMinutes: number;
  badgeId?: string;
}

export interface Lesson {
  id: string;
  principleId: string;
  title: string;
  order: number;
  muxAssetId?: string;
  mdxPath: string;
  keyTakeaways?: string[];
}

export type ActivityType = 'REFLECTION' | 'SIMULATION' | 'FIELD_EXPERIMENT';

export interface Activity {
  id: string;
  lessonId: string;
  type: ActivityType;
  payload: ReflectionPayload | SimulationPayload | FieldExperimentPayload;
  order: number;
}

export interface ReflectionPayload {
  prompt: string;
  minWords?: number;
}

export interface SimulationPayload {
  scenario: string;
  choices: Array<{
    id: string;
    label: string;
    rationale: string;
    delta: number;
  }>;
}

export interface FieldExperimentPayload {
  title: string;
  instructions: string;
  suggestedDuration: string;
  checklist?: string[];
}

// Zod schemas for validation
export const ReflectionPayloadSchema = z.object({
  prompt: z.string(),
  minWords: z.number().optional(),
});

export const SimulationChoiceSchema = z.object({
  id: z.string(),
  label: z.string(),
  rationale: z.string(),
  delta: z.number(),
});

export const SimulationPayloadSchema = z.object({
  scenario: z.string(),
  choices: z.array(SimulationChoiceSchema),
});

export const FieldExperimentPayloadSchema = z.object({
  title: z.string(),
  instructions: z.string(),
  suggestedDuration: z.string(),
  checklist: z.array(z.string()).optional(),
});

export const ActivitySchema = z.object({
  id: z.string(),
  lessonId: z.string(),
  type: z.enum(['REFLECTION', 'SIMULATION', 'FIELD_EXPERIMENT']),
  payload: z.union([
    ReflectionPayloadSchema,
    SimulationPayloadSchema,
    FieldExperimentPayloadSchema,
  ]),
  order: z.number(),
});

export const LessonSchema = z.object({
  id: z.string(),
  principleId: z.string(),
  title: z.string(),
  order: z.number(),
  muxAssetId: z.string().optional(),
  mdxPath: z.string(),
  keyTakeaways: z.array(z.string()).optional(),
});

export const PrincipleSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  estMinutes: z.number(),
  badgeId: z.string().optional(),
});

// Progress tracking types
export interface UserProgress {
  principleId: string;
  lessonId?: string;
  completedLessons: string[];
  completedActivities: string[];
  reflections: Record<string, string>;
  simulationChoices: Record<string, string>;
  fieldExperiments: Record<string, boolean>;
}

// Badge system
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned?: boolean;
  earnedAt?: Date;
}

export const BadgeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  earned: z.boolean().optional(),
  earnedAt: z.date().optional(),
});

// Enhanced Quiz & Assessment Types
export const QuizQuestionTypeSchema = z.enum(['SINGLE_SELECT', 'MULTI_SELECT']);

export const QuizChoiceSchema = z.object({
  id: z.string(),
  label: z.string(),
  isCorrect: z.boolean(),
});

export const QuizQuestionSchema = z.object({
  id: z.string(),
  type: QuizQuestionTypeSchema,
  question: z.string(),
  choices: z.array(QuizChoiceSchema),
  hint: z.string().optional(),
  explanation: z.string(),
  points: z.number().default(1),
});

export const QuizSchema = z.object({
  id: z.string(),
  principleId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  questions: z.array(QuizQuestionSchema),
  passThreshold: z.number().min(0).max(100).default(80), // percentage
  timeLimit: z.number().optional(), // minutes
});

export type QuizQuestionType = z.infer<typeof QuizQuestionTypeSchema>;
export type QuizChoice = z.infer<typeof QuizChoiceSchema>;
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;
export type Quiz = z.infer<typeof QuizSchema>;

// Enhanced Badge System
export const BadgeTypeSchema = z.enum([
  'COMPLETION',
  'MASTERY',
  'ENGAGEMENT',
  'STREAK',
]);
export const BadgeRaritySchema = z.enum([
  'COMMON',
  'UNCOMMON',
  'RARE',
  'LEGENDARY',
]);

export const EnhancedBadgeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(), // lucide icon name
  category: BadgeTypeSchema,
  rarity: BadgeRaritySchema,
  requirement: z.string(),
});

export const UserBadgeSchema = z.object({
  badgeId: z.string(),
  earnedAt: z.date(),
  principleId: z.string().optional(),
  quizId: z.string().optional(),
});

export type BadgeType = z.infer<typeof BadgeTypeSchema>;
export type BadgeRarity = z.infer<typeof BadgeRaritySchema>;
export type EnhancedBadge = z.infer<typeof EnhancedBadgeSchema>;
export type UserBadge = z.infer<typeof UserBadgeSchema>;

// Streak System
export const StreakSchema = z.object({
  daily: z.number().min(0).default(0),
  weekly: z.number().min(0).default(0),
  longestDaily: z.number().min(0).default(0),
  longestWeekly: z.number().min(0).default(0),
  lastActivity: z.date().optional(),
});

export type Streak = z.infer<typeof StreakSchema>;

// Quiz Attempt & Results
export const QuizAnswerSchema = z.object({
  questionId: z.string(),
  selectedChoices: z.array(z.string()),
  isCorrect: z.boolean(),
  usedHint: z.boolean().default(false),
});

export const QuizAttemptSchema = z.object({
  id: z.string(),
  quizId: z.string(),
  userId: z.string(),
  answers: z.array(QuizAnswerSchema),
  score: z.number().min(0).max(100), // percentage
  passed: z.boolean(),
  completedAt: z.date(),
  timeSpent: z.number().optional(), // seconds
});

export type QuizAnswer = z.infer<typeof QuizAnswerSchema>;
export type QuizAttempt = z.infer<typeof QuizAttemptSchema>;

// Admin CMS Types
export const PrincipleStatusSchema = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']);
export const PrincipleVersionSchema = z.object({
  id: z.string(),
  version: z.number(),
  title: z.string(),
  summary: z.string(),
  content: z.string(),
  createdAt: z.date(),
  createdBy: z.string(),
  publishedAt: z.date().optional(),
});

export const AdminPrincipleSchema = PrincipleSchema.extend({
  status: PrincipleStatusSchema.default('DRAFT'),
  version: z.number().default(1),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  publishedAt: z.date().optional(),
  authorId: z.string().optional(),
  versions: z.array(PrincipleVersionSchema).default([]),
  // Additional fields for admin UI
  description: z.string().optional(),
  createdBy: z.string().optional(),
  estimatedDuration: z.number().optional(),
  lessonCount: z.number().default(0),
  activityCount: z.number().default(0),
  quizCount: z.number().default(0),
  tags: z.array(z.string()).default([]),
});

export const ValidationResultSchema = z.object({
  isValid: z.boolean(),
  errors: z.array(
    z.object({
      field: z.string(),
      message: z.string(),
      severity: z.enum(['error', 'warning', 'info']),
    })
  ),
  warnings: z.array(
    z.object({
      field: z.string(),
      message: z.string(),
    })
  ),
});

export const AutoSaveStatusSchema = z.enum([
  'SAVING',
  'SAVED',
  'ERROR',
  'IDLE',
]);

export type PrincipleStatus = z.infer<typeof PrincipleStatusSchema>;
export type PrincipleVersion = z.infer<typeof PrincipleVersionSchema>;
export type AdminPrinciple = z.infer<typeof AdminPrincipleSchema>;
export type ValidationResult = z.infer<typeof ValidationResultSchema>;
export type AutoSaveStatus = z.infer<typeof AutoSaveStatusSchema>;

// Admin Builder State
export interface BuilderState {
  principle: AdminPrinciple;
  lessons: Lesson[];
  activities: Activity[];
  quiz: Quiz | null;
  autoSaveStatus: AutoSaveStatus;
  lastSaved: Date | null;
  validationResult: ValidationResult | null;
}
