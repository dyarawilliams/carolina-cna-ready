import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  HelpCircle,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  FileText,
  Calendar,
  Award,
} from 'lucide-react';
import { CandidateProfile, JourneyStageId, JourneyStage } from '../types/journey';
import { SC_JOURNEY_STAGES } from '../data/journeyStages';

interface JourneyTimelineProps {
  profile: CandidateProfile;
  onUpdateProfile: (profile: CandidateProfile) => void;
  onAskCoach: (query: string) => void;
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({
  profile,
  onUpdateProfile,
  onAskCoach,
}) => {
  const [selectedStageId, setSelectedStageId] = useState<JourneyStageId>(profile.currentStageId || 'training');

  const selectedStage = SC_JOURNEY_STAGES.find((s) => s.id === selectedStageId) || SC_JOURNEY_STAGES[0];
  const currentStageIndex = SC_JOURNEY_STAGES.findIndex((s) => s.id === profile.currentStageId);

  const toggleChecklistItem = (itemText: string) => {
    const exists = profile.completedChecklistIds.includes(itemText);
    const updatedIds = exists
      ? profile.completedChecklistIds.filter((id) => id !== itemText)
      : [...profile.completedChecklistIds, itemText];

    onUpdateProfile({
      ...profile,
      completedChecklistIds: updatedIds,
    });
  };

  const getStageStatus = (stage: JourneyStage, index: number) => {
    if (index < currentStageIndex) return 'completed';
    if (index === currentStageIndex) return 'action_needed';
    return 'upcoming';
  };

  return (
    <div className="space-y-8">
      {/* Personalized Status Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-300">
              <ShieldCheck className="w-4 h-4" />
              <span>South Carolina Department of Health & Human Services (SCDHHS) Pathway</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Your Personalized CNA Journey
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Step <span className="font-semibold text-white">{currentStageIndex + 1} of {SC_JOURNEY_STAGES.length}:</span>{' '}
              {SC_JOURNEY_STAGES[currentStageIndex]?.title}. We turn fragmented Credentia documentation into an actionable, confidence-building roadmap.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-4 border border-white/15 shrink-0 min-w-[200px]">
            <div className="text-xs text-teal-200 font-medium">Current Priority</div>
            <div className="text-base font-bold text-white mt-0.5">
              {SC_JOURNEY_STAGES[currentStageIndex]?.title}
            </div>
            <button
              onClick={() => setSelectedStageId(profile.currentStageId)}
              className="mt-3 text-xs font-semibold text-teal-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              Focus on this step <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Visual Roadmap Stages (Segmented Flow) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-4">
          Certification Sequence (Training → Registry)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {SC_JOURNEY_STAGES.map((stage, idx) => {
            const status = getStageStatus(stage, idx);
            const isSelected = stage.id === selectedStageId;
            const isCurrent = stage.id === profile.currentStageId;

            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                  isSelected
                    ? 'border-teal-700 bg-teal-50/60 ring-2 ring-teal-700/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1.5">
                  <span className="text-[11px] font-bold text-slate-400">
                    0{stage.order}
                  </span>
                  {status === 'completed' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  )}
                  {status === 'action_needed' && (
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-600 animate-pulse" />
                  )}
                </div>

                <div className="font-semibold text-xs text-slate-900 leading-tight">
                  {stage.title}
                </div>

                <div className="text-[10px] text-slate-500 mt-1 capitalize">
                  {isCurrent ? 'Current Focus' : status.replace('_', ' ')}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail Card for Selected Stage */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Stage Header */}
        <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                Step 0{selectedStage.order} of 08
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {selectedStage.subtitle}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 pt-1">
              {selectedStage.title}
            </h3>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed pt-1">
              {selectedStage.description}
            </p>
          </div>

          <div className="flex flex-wrap md:flex-nowrap items-center gap-2.5 shrink-0">
            {profile.currentStageId !== selectedStage.id && (
              <button
                onClick={() =>
                  onUpdateProfile({ ...profile, currentStageId: selectedStage.id })
                }
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Mark as My Current Step
              </button>
            )}
            <button
              onClick={() => onAskCoach(`What do I need to do for ${selectedStage.title} in South Carolina?`)}
              className="px-3.5 py-2 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              Ask AI Coach About This Step
            </button>
          </div>
        </div>

        {/* Content Breakdown */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Action Required */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-5 bg-teal-50/50 border border-teal-100 rounded-xl space-y-3">
              <div className="text-xs font-bold text-teal-900 uppercase tracking-wide">
                Immediate Action Required
              </div>
              <p className="text-sm font-medium text-teal-950 leading-relaxed">
                {selectedStage.actionRequired}
              </p>
              {selectedStage.actionUrl && (
                <div className="pt-1">
                  <a
                    href={selectedStage.actionUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 hover:text-teal-950 underline underline-offset-4"
                  >
                    {selectedStage.actionLinkText || 'Visit Official Credentia Service'}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Checklist */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center justify-between">
                <span>Checklist for this Step</span>
                <span className="text-xs font-normal text-slate-500">
                  Click to mark complete
                </span>
              </h4>

              <div className="space-y-2">
                {selectedStage.checklistItems.map((item, i) => {
                  const isChecked = profile.completedChecklistIds.includes(item);
                  return (
                    <label
                      key={i}
                      onClick={() => toggleChecklistItem(item)}
                      className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'border-emerald-200 bg-emerald-50/40 text-slate-800'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 rounded text-teal-700 focus:ring-teal-600"
                      />
                      <span className={`text-xs font-medium leading-relaxed ${isChecked ? 'line-through text-slate-500' : ''}`}>
                        {item}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar: Why This Matters & Official Source */}
          <div className="space-y-6">
            {/* Why this matters card */}
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <AlertCircle className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Why Credentia Enforces This</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedStage.whyThisMatters}
              </p>
            </div>

            {/* Official Source Card */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-3">
              <div className="text-xs font-bold text-slate-900">
                Official Credentia South Carolina Source
              </div>
              <div>
                <a
                  href={selectedStage.officialSource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1"
                >
                  {selectedStage.officialSource.title}
                  <ExternalLink className="w-3 h-3" />
                </a>
                <div className="text-[11px] text-slate-400 mt-1">
                  Verified: {selectedStage.officialSource.lastVerified}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal border-t border-slate-100 pt-2">
                Grounding notice: Requirements adhere to South Carolina DHHS Nurse Aide Competency Evaluation standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
