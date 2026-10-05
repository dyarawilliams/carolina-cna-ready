export type JourneyStageId = 
  | 'training'
  | 'eligibility'
  | 'application'
  | 'scheduling'
  | 'written_exam'
  | 'skills_exam'
  | 'results'
  | 'registry';

export type StageStatus = 'completed' | 'in_progress' | 'upcoming' | 'action_needed';

export interface JourneyStage {
  id: JourneyStageId;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  actionRequired: string;
  actionLinkText?: string;
  actionUrl?: string;
  officialSource: {
    title: string;
    url: string;
    lastVerified: string;
  };
  whyThisMatters: string;
  checklistItems: string[];
}

export interface CandidateProfile {
  name: string;
  currentStageId: JourneyStageId;
  completedTraining: boolean;
  trainingHours: number;
  clinicalHours: number;
  hasCNA365Account: boolean;
  applicationApproved: boolean;
  examScheduled: boolean;
  examModality: 'test_center' | 'online_proctored' | 'undecided';
  scheduledDate?: string;
  writtenPassed: boolean;
  skillsPassed: boolean;
  completedChecklistIds: string[];
  rehearsedSkillIds: string[];
  practiceQuestionScores: Record<string, boolean>; // qId -> isCorrect
}

export interface CoachMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  timestamp: string;
  sourceTitle?: string;
  sourceUrl?: string;
  nextStepRecommendation?: string;
  modelUsed?: string;
}
