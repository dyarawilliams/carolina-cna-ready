import React from 'react';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Sparkles,
  BookOpen,
  Calendar,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { CandidateProfile } from '../types/journey';
import { SC_OFFICIAL_SKILLS, SC_PRACTICE_QUESTIONS } from '../data/scCredentiaKnowledge';
import { SC_JOURNEY_STAGES } from '../data/journeyStages';

interface ConfidenceCenterProps {
  profile: CandidateProfile;
  onNavigateToTab: (tab: string) => void;
  onAskCoach: (query: string) => void;
}

export const ConfidenceCenter: React.FC<ConfidenceCenterProps> = ({
  profile,
  onNavigateToTab,
  onAskCoach,
}) => {
  // Calculate Pillar 1: Process Clarity (how far along the 8 stages)
  const currentStageIndex = SC_JOURNEY_STAGES.findIndex((s) => s.id === profile.currentStageId);
  const processScore = Math.min(100, Math.round(((currentStageIndex + 1) / SC_JOURNEY_STAGES.length) * 100));

  // Pillar 2: Clinical Knowledge (Practice questions answered correctly)
  const totalQuestions = SC_PRACTICE_QUESTIONS.length;
  const correctQuestions = Object.values(profile.practiceQuestionScores).filter(Boolean).length;
  const knowledgeScore = totalQuestions > 0 ? Math.round((correctQuestions / totalQuestions) * 100) : 0;

  // Pillar 3: Skills Readiness (Skills marked rehearsed out of 12 priority skills)
  const skillsRehearsed = profile.rehearsedSkillIds.length;
  const skillsScore = Math.min(100, Math.round((skillsRehearsed / 8) * 100));

  // Pillar 4: Test Day Protocol (Checklist completed)
  const testDayScore = Math.min(100, Math.round((profile.completedChecklistIds.length / 7) * 100));

  // Aggregate Composite Readiness
  const aggregateScore = Math.round(
    processScore * 0.3 + knowledgeScore * 0.25 + skillsScore * 0.25 + testDayScore * 0.2
  );

  // Determine top opportunity
  let topOpportunity = {
    title: 'Review Key Skills & Critical Steps',
    description: 'Candidates most often stumble on measurement skills or Hand Hygiene timing. Practice walking through the bolded critical steps.',
    actionTab: 'skills',
    actionText: 'Practice Skills',
  };

  if (knowledgeScore < 60) {
    topOpportunity = {
      title: 'Practice Clinical Scenarios',
      description: 'Strengthen your understanding of infection control and resident rights with the 10 original NNAAP practice scenarios.',
      actionTab: 'practice',
      actionText: 'Take Practice Scenarios',
    };
  } else if (testDayScore < 50) {
    topOpportunity = {
      title: 'Finalize Your Test-Day Checklist',
      description: 'Ensure you have two matching unexpired IDs and the proper analog watch with a sweep second hand to avoid entry rejection.',
      actionTab: 'checklist',
      actionText: 'Open Checklist',
    };
  }

  return (
    <div className="space-y-8">
      {/* Confidence Header & Aggregate Score */}
      <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-300">
              <Sparkles className="w-4 h-4" />
              <span>Readiness & Certification Confidence Estimate</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              South Carolina CNA Confidence Center
            </h2>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Certification success comes from eliminating surprises. We estimate your readiness across 4 key pillars: process clarity, clinical knowledge, hands-on skills, and test-day protocols.
            </p>
            <div className="text-[11px] text-slate-400">
              * Educational estimate based on candidate progress; not an official Credentia passing score.
            </div>
          </div>

          {/* Big Score Box */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 text-center min-w-[240px] shrink-0">
            <div className="text-xs uppercase font-bold tracking-wider text-teal-300">
              CNA Confidence Score
            </div>
            <div className="text-5xl font-extrabold text-white mt-2 tabular-nums">
              {aggregateScore}%
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 mt-4 overflow-hidden">
              <div
                className="bg-teal-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${aggregateScore}%` }}
              />
            </div>
            <div className="text-xs text-slate-300 mt-2 font-medium">
              {aggregateScore >= 80 ? 'High Test-Day Readiness' : aggregateScore >= 50 ? 'Building Strong Momentum' : 'Beginning Certification Prep'}
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillar Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Process Clarity',
            score: processScore,
            desc: `Stage: ${SC_JOURNEY_STAGES[currentStageIndex]?.title}`,
            tab: 'journey',
          },
          {
            label: 'Clinical Knowledge',
            score: knowledgeScore,
            desc: `${correctQuestions} of ${totalQuestions} scenarios correct`,
            tab: 'practice',
          },
          {
            label: 'Skills Rehearsal',
            score: skillsScore,
            desc: `${skillsRehearsed} skills practiced`,
            tab: 'skills',
          },
          {
            label: 'Test-Day Protocol',
            score: testDayScore,
            desc: `${profile.completedChecklistIds.length} checklist items verified`,
            tab: 'checklist',
          },
        ].map((pillar, i) => (
          <div
            key={i}
            onClick={() => onNavigateToTab(pillar.tab)}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-teal-600 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                {pillar.label}
              </span>
              <span className="text-sm font-extrabold text-slate-800 tabular-nums">
                {pillar.score}%
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden mb-2">
              <div
                className="bg-teal-700 h-full rounded-full transition-all duration-300"
                style={{ width: `${pillar.score}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-500">{pillar.desc}</div>
          </div>
        ))}
      </div>

      {/* Top Opportunity Banner */}
      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900 uppercase tracking-wide">
            <Sparkles className="w-4 h-4 text-teal-700" />
            <span>Recommended Priority Focus</span>
          </div>
          <h3 className="text-lg font-bold text-teal-950">
            {topOpportunity.title}
          </h3>
          <p className="text-xs text-teal-900 max-w-2xl leading-relaxed">
            {topOpportunity.description}
          </p>
        </div>

        <button
          onClick={() => onNavigateToTab(topOpportunity.actionTab)}
          className="px-5 py-2.5 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-xs cursor-pointer shrink-0"
        >
          {topOpportunity.actionText}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Registry Finish Line Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-700">
              <Award className="w-4 h-4" />
              <span>The Finish Line: South Carolina Nurse Aide Registry</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              What Happens After You Pass Both Exams?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Once you pass both the Written/Oral Examination and Skills Evaluation within your 2-year testing window, Credentia transmits your official passing record directly to the South Carolina Department of Health and Human Services (SCDHHS).
            </p>
          </div>

          <a
            href="https://credentia.com/test-takers/sc/"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-colors shadow-xs shrink-0 cursor-pointer"
          >
            Check South Carolina Registry Portal
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Milestone Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>1. Exam Results in CNA365</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Official score reports publish in your Credentia CNA365 account typically within a few hours to 24–48 hours of testing.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-700" />
              <span>2. Official SC Registry Listing</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Credentia states that candidates can expect their name to be officially placed on the South Carolina Nurse Aide Registry approximately <strong>10 business days</strong> after successfully completing both components.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-700" />
              <span>3. 24-Month Active Renewal</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              To keep certification active, you must complete at least 1 day (8 consecutive hours) of paid nursing assistant duties under RN/LPN supervision every 24 months.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
