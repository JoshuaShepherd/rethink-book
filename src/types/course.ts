export interface CourseWeek {
  id: string;
  weekNumber: number;
  title: string;
  theme: string;
  description: string;
  videoLessons: VideoLesson[];
  interactiveTools: InteractiveTool[];
  reflectionPrompts: ReflectionPrompt[];
  practiceAssignments: PracticeAssignment[];
  peerActivities: PeerActivity[];
  isUnlocked: boolean;
  completionPercentage: number;
}

export interface VideoLesson {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  videoUrl?: string;
  thumbnailUrl?: string;
  completed: boolean;
}

export interface InteractiveTool {
  id: string;
  type:
    | 'drag-drop'
    | 'quiz'
    | 'scenario'
    | 'calendar'
    | 'decision-tree'
    | 'assessment';
  title: string;
  description: string;
  component: string; // Component name to render
  data?: any; // Tool-specific data
  completed: boolean;
}

export interface ReflectionPrompt {
  id: string;
  question: string;
  guidance?: string;
  userResponse?: string;
  completed: boolean;
}

export interface PracticeAssignment {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  deliverable: string;
  timeEstimate: number; // in minutes
  completed: boolean;
  userSubmission?: string;
}

export interface PeerActivity {
  id: string;
  title: string;
  description: string;
  type: 'discussion' | 'sharing' | 'feedback';
  prompt: string;
  completed: boolean;
}

export interface CourseProgress {
  currentWeek: number;
  completedWeeks: number[];
  totalVideoTime: number;
  watchedVideoTime: number;
  completedActivities: string[];
  completedAssignments: string[];
  peerInteractions: number;
  startDate: Date;
  lastActiveDate: Date;
  badges: CourseBadge[];
  weekId: string;
  videoLessonsCompleted: string[];
  interactiveToolsCompleted: string[];
  reflectionPromptsCompleted: string[];
  practiceAssignmentsCompleted: string[];
  peerActivitiesCompleted: string[];
  weekCompleted: boolean;
}

export interface CourseBadge {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
  earnedDate: Date;
  criteria: string;
}

export interface CovoAssessmentResponse {
  question: string;
  answer: string;
  score?: number;
}

export interface CovoBlueprint {
  vocation: string;
  mission: string;
  rhythms: string[];
  strategy: string;
  timeline: string;
  resources: string[];
  metrics: string[];
}

export type APESTGift =
  | 'Apostle'
  | 'Prophet'
  | 'Evangelist'
  | 'Shepherd'
  | 'Teacher';

export interface APESTResult {
  primaryGift: APESTGift;
  secondaryGift?: APESTGift;
  scores: Record<APESTGift, number>;
}

export interface MarketplaceVocation {
  id: string;
  title: string;
  description: string;
  covoOpportunities: string[];
  challenges: string[];
  successStories: string[];
}
