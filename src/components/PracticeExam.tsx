import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ShieldCheck,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { SC_PRACTICE_QUESTIONS } from '../data/scCredentiaKnowledge';
import { CandidateProfile } from '../types/journey';

interface PracticeExamProps {
  profile: CandidateProfile;
  onUpdateProfile: (profile: CandidateProfile) => void;
}

export const PracticeExam: React.FC<PracticeExamProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showRationales, setShowRationales] = useState<Record<string, boolean>>({});

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = Object.values(profile.practiceQuestionScores).filter(Boolean).length;

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (selectedAnswers[questionId]) return; // already answered

    const question = SC_PRACTICE_QUESTIONS.find((q) => q.id === questionId);
    if (!question) return;

    const isCorrect = optionId === question.correctOptionId;

    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    setShowRationales((prev) => ({ ...prev, [questionId]: true }));

    const updatedScores = {
      ...profile.practiceQuestionScores,
      [questionId]: isCorrect,
    };

    onUpdateProfile({
      ...profile,
      practiceQuestionScores: updatedScores,
    });
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowRationales({});
    onUpdateProfile({
      ...profile,
      practiceQuestionScores: {},
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-700">
              <ShieldCheck className="w-4 h-4" />
              <span>Original Educational Scenarios (Credentia SC Grounded)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1">
              NNAAP Written Examination Prep (10 Scenarios)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              These original practice scenarios test core clinical judgment, infection control, resident rights, and scope of practice without reproducing copyrighted materials.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 shrink-0">
            <div>
              <div className="text-xs text-slate-500 font-medium">Your Score</div>
              <div className="text-xl font-bold text-slate-900 tabular-nums">
                {correctCount} / {SC_PRACTICE_QUESTIONS.length}
              </div>
            </div>
            {answeredCount > 0 && (
              <button
                onClick={handleReset}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/50 transition-colors"
                title="Reset answers"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Question Cards */}
      <div className="space-y-6">
        {SC_PRACTICE_QUESTIONS.map((q, idx) => {
          const selectedOption = selectedAnswers[q.id];
          const hasAnswered = !!selectedOption;
          const isCorrect = selectedOption === q.correctOptionId;

          return (
            <div
              key={q.id}
              className={`bg-white rounded-2xl border p-6 transition-all shadow-xs ${
                hasAnswered
                  ? isCorrect
                    ? 'border-emerald-200 ring-1 ring-emerald-100'
                    : 'border-rose-200 ring-1 ring-rose-100'
                  : 'border-slate-200'
              }`}
            >
              {/* Question domain & counter */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span className="font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                  Scenario {idx + 1} of {SC_PRACTICE_QUESTIONS.length}
                </span>
                <span className="font-medium text-slate-500">
                  Domain: {q.domain}
                </span>
              </div>

              {/* Scenario */}
              <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-4 leading-relaxed">
                {q.scenario}
              </h3>

              {/* Options */}
              <div className="space-y-2.5">
                {q.options.map((opt) => {
                  const isThisSelected = selectedOption === opt.id;
                  const isThisCorrect = opt.id === q.correctOptionId;

                  let optionStyle = 'border-slate-200 hover:border-slate-300 bg-slate-50/50';

                  if (hasAnswered) {
                    if (isThisCorrect) {
                      optionStyle = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-medium';
                    } else if (isThisSelected) {
                      optionStyle = 'border-rose-400 bg-rose-50 text-rose-950';
                    } else {
                      optionStyle = 'border-slate-200 opacity-60 bg-white';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(q.id, opt.id)}
                      disabled={hasAnswered}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition-colors cursor-pointer ${optionStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 uppercase bg-white">
                        {opt.id}
                      </span>
                      <span className="flex-1 leading-relaxed">{opt.text}</span>
                      {hasAnswered && isThisCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      )}
                      {hasAnswered && isThisSelected && !isThisCorrect && (
                        <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Rationale */}
              {showRationales[q.id] && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-teal-700" />
                    Clinical Rationale:
                  </div>
                  <p className="text-slate-700 leading-relaxed pl-5">
                    {q.rationale}
                  </p>
                  <div className="text-[11px] text-slate-400 pl-5 pt-1">
                    Citation: {q.officialSourceCitation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
