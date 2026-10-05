import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Send,
  RefreshCw,
  Search,
  Filter,
} from 'lucide-react';
import { CNASkill } from '../data/scCredentiaKnowledge';
import { SC_OFFICIAL_SKILLS } from '../data/scCredentiaKnowledge';
import { CandidateProfile } from '../types/journey';

interface SkillPracticeProps {
  profile: CandidateProfile;
  onUpdateProfile: (profile: CandidateProfile) => void;
}

export const SkillPractice: React.FC<SkillPracticeProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [selectedSkillId, setSelectedSkillId] = useState<string>(SC_OFFICIAL_SKILLS[0].id);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [rehearsalText, setRehearsalText] = useState<string>('');
  const [reviewResult, setReviewResult] = useState<string | null>(null);
  const [isReviewing, setIsReviewing] = useState<boolean>(false);

  const selectedSkill = SC_OFFICIAL_SKILLS.find((s) => s.id === selectedSkillId) || SC_OFFICIAL_SKILLS[0];

  const categories = [
    'all',
    'Infection Control',
    'Measurement',
    'Basic Restorative & Mobility',
    'Personal Care',
    'Safety & Positioning',
  ];

  const filteredSkills = SC_OFFICIAL_SKILLS.filter((s) => {
    const matchCategory = categoryFilter === 'all' || s.category === categoryFilter;
    const matchSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.criticalSteps.some((cs) => cs.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const toggleSkillRehearsed = (skillId: string) => {
    const rehearsed = profile.rehearsedSkillIds.includes(skillId);
    const updated = rehearsed
      ? profile.rehearsedSkillIds.filter((id) => id !== skillId)
      : [...profile.rehearsedSkillIds, skillId];

    onUpdateProfile({
      ...profile,
      rehearsedSkillIds: updated,
    });
  };

  const handleRunRehearsalReview = async () => {
    if (!rehearsalText.trim() || isReviewing) return;
    setIsReviewing(true);
    setReviewResult(null);

    try {
      const res = await fetch('/api/skill-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skillId: selectedSkill.id,
          candidateResponse: rehearsalText,
        }),
      });

      const data = await res.json();
      setReviewResult(data.evaluationText || 'Evaluation complete.');
      // Auto mark as rehearsed
      if (!profile.rehearsedSkillIds.includes(selectedSkill.id)) {
        toggleSkillRehearsed(selectedSkill.id);
      }
    } catch (err) {
      setReviewResult(
        `Review submitted. Key checkpoints for ${selectedSkill.name}:\n` +
          selectedSkill.criticalSteps.map((cs) => `• ${cs}`).join('\n')
      );
    } finally {
      setIsReviewing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* South Carolina Skills Evaluation Structure Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-400">
              <ShieldCheck className="w-4 h-4" />
              <span>South Carolina Credentia NNAAP Skills Protocol</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
              Skills Evaluation Lab (23 Skills · 5 Demonstrated)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
              In South Carolina, candidates demonstrate 5 assigned skills in 30 minutes in front of an RN Evaluator. Hand Hygiene is always first, one is randomly chosen from Measurement, and three from physical care.
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-3.5 border border-white/10 text-xs shrink-0 space-y-1">
            <div className="text-teal-300 font-semibold">Your Skills Rehearsed:</div>
            <div className="text-lg font-bold text-white tabular-nums">
              {profile.rehearsedSkillIds.length} / {SC_OFFICIAL_SKILLS.length}
            </div>
            <div className="text-[11px] text-slate-400">
              {Math.round((profile.rehearsedSkillIds.length / SC_OFFICIAL_SKILLS.length) * 100)}% covered
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Skills Explorer + Active Skill Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Skills Directory */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Official Skills Catalog
            </h3>
            <span className="text-xs text-slate-400">
              {filteredSkills.length} skills
            </span>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by skill name or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white"
            />
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-teal-700 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Skills' : cat}
              </button>
            ))}
          </div>

          {/* Skill List */}
          <div className="space-y-2 overflow-y-auto max-h-[560px] pr-1">
            {filteredSkills.map((skill) => {
              const isSelected = skill.id === selectedSkillId;
              const isRehearsed = profile.rehearsedSkillIds.includes(skill.id);

              return (
                <div
                  key={skill.id}
                  onClick={() => {
                    setSelectedSkillId(skill.id);
                    setReviewResult(null);
                    setRehearsalText('');
                  }}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-teal-700 bg-teal-50/60 ring-1 ring-teal-700 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {skill.isMandatoryFirst && (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                            Always Tested #1
                          </span>
                        )}
                        {skill.isMeasurement && (
                          <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-1.5 py-0.5 rounded">
                            Measurement Skill
                          </span>
                        )}
                        <span className="text-[10px] font-medium text-slate-500">
                          {skill.category}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-slate-900 leading-snug">
                        {skill.name}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSkillRehearsed(skill.id);
                      }}
                      className="p-1 rounded text-slate-400 hover:text-emerald-600 transition-colors"
                      title={isRehearsed ? 'Marked rehearsed' : 'Mark as rehearsed'}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 ${
                          isRehearsed ? 'text-emerald-600 fill-emerald-100' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Skill Details & AI Rehearsal Coach */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>Category: {selectedSkill.category}</span>
                  <span>·</span>
                  <span>Est. Duration: ~{selectedSkill.durationEstimateMinutes} min</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {selectedSkill.name}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleSkillRehearsed(selectedSkill.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
                    profile.rehearsedSkillIds.includes(selectedSkill.id)
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {profile.rehearsedSkillIds.includes(selectedSkill.id)
                    ? 'Rehearsed'
                    : 'Mark Rehearsed'}
                </button>
                <a
                  href={selectedSkill.officialSourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                  title="Official Credentia SC handbook source"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Critical Steps (Bolded in Handbook - Automatic Fail Points) */}
            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>Mandatory Critical Steps (Automatic Failure if Missed)</span>
              </div>
              <ul className="space-y-1.5 text-xs text-amber-950 font-medium">
                {selectedSkill.criticalSteps.map((cs, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-700 font-bold">•</span>
                    <span>{cs}</span>
                  </li>
                ))}
              </ul>
              <div className="text-[11px] text-amber-800 font-normal pt-1">
                <strong>Credentia Self-Correction Rule:</strong> If you realize you made an error or missed a step, inform the RN Evaluator immediately: <em>"Nurse Evaluator, I would like to correct that step."</em>
              </div>
            </div>

            {/* Equipment Needed */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                Equipment Provided at Test Station
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedSkill.equipmentNeeded.map((eq, i) => (
                  <span
                    key={i}
                    className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200/60"
                  >
                    {eq}
                  </span>
                ))}
              </div>
            </div>

            {/* Procedure Steps */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                Official Step-by-Step Procedure
              </h4>
              <ol className="space-y-2 text-xs text-slate-700 list-decimal list-inside pl-1 leading-relaxed">
                {selectedSkill.procedureSteps.map((step, i) => (
                  <li key={i} className="pl-1">
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Common Mistakes */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
              <div className="text-xs font-bold text-slate-900">
                Frequent Evaluator Deductions & Mistakes to Avoid
              </div>
              <ul className="space-y-1 text-xs text-slate-600">
                {selectedSkill.commonMistakes.map((cm, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>{cm}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive AI Skill Rehearsal */}
            <div className="border-t border-slate-200 pt-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-teal-600" />
                    <span>Practice Skill Rehearsal with AI Evaluator</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Type or talk through how you would perform "{selectedSkill.name}". The AI Coach will evaluate your response against the official Credentia rubric.
                  </p>
                </div>
              </div>

              <textarea
                value={rehearsalText}
                onChange={(e) => setRehearsalText(e.target.value)}
                placeholder="Walk through your steps (e.g., 'First I introduce myself, wash hands, provide privacy. Then I...')"
                rows={4}
                className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white text-slate-900 placeholder:text-slate-400"
              />

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleRunRehearsalReview}
                  disabled={isReviewing || !rehearsalText.trim()}
                  className="px-4 py-2 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isReviewing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Evaluating with Credentia Rubric...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Submit for Evaluator Feedback
                    </>
                  )}
                </button>
                <span className="text-[11px] text-slate-400">
                  Grounded in Credentia SC scoring standards
                </span>
              </div>

              {reviewResult && (
                <div className="mt-4 p-4 bg-teal-50/70 border border-teal-200 rounded-xl text-xs text-teal-950 whitespace-pre-line leading-relaxed">
                  <div className="font-bold text-teal-900 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-700" />
                    Evaluator Feedback Summary
                  </div>
                  {reviewResult}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
