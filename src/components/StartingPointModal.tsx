import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, CheckCircle2, MapPin, Award } from 'lucide-react';
import { CandidateProfile, JourneyStageId } from '../types/journey';

interface StartingPointModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CandidateProfile;
  onSaveProfile: (profile: CandidateProfile) => void;
  onNavigateToStage: (stageId: JourneyStageId) => void;
}

export const StartingPointModal: React.FC<StartingPointModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  onNavigateToStage,
}) => {
  const [step, setStep] = useState(1);
  const [currentStageChoice, setCurrentStageChoice] = useState<string>(profile.currentStageId || 'training');
  const [completedTraining, setCompletedTraining] = useState<boolean>(profile.completedTraining);
  const [clinicalHours, setClinicalHours] = useState<number>(profile.clinicalHours || 40);
  const [hasCNA365Account, setHasCNA365Account] = useState<boolean>(profile.hasCNA365Account);
  const [examScheduled, setExamScheduled] = useState<boolean>(profile.examScheduled);
  const [examModality, setExamModality] = useState<'test_center' | 'online_proctored' | 'undecided'>(profile.examModality || 'test_center');

  if (!isOpen) return null;

  const totalSteps = 4;

  const handleFinish = () => {
    let deducedStage: JourneyStageId = 'training';

    if (currentStageChoice === 'passed') {
      deducedStage = 'registry';
    } else if (currentStageChoice === 'retest_skills') {
      deducedStage = 'skills_exam';
    } else if (currentStageChoice === 'retest_written') {
      deducedStage = 'written_exam';
    } else if (examScheduled) {
      deducedStage = 'written_exam';
    } else if (hasCNA365Account && completedTraining) {
      deducedStage = 'scheduling';
    } else if (completedTraining) {
      deducedStage = 'application';
    } else {
      deducedStage = 'training';
    }

    const updated: CandidateProfile = {
      ...profile,
      currentStageId: deducedStage,
      completedTraining,
      clinicalHours,
      hasCNA365Account,
      examScheduled,
      examModality,
    };

    onSaveProfile(updated);
    onNavigateToStage(deducedStage);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-2">
            <span>Find Your Starting Point in South Carolina</span>
            <span>Step {step} of {totalSteps}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-teal-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Overall Situation */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">
              Where are you right now in your CNA journey?
            </h3>
            <p className="text-sm text-slate-600">
              Select the situation that best describes where you are today in South Carolina:
            </p>

            <div className="space-y-2.5 pt-2">
              {[
                {
                  id: 'researching',
                  label: "I'm researching or currently enrolled in a CNA program",
                  desc: 'Looking into state-approved programs or completing coursework',
                },
                {
                  id: 'completed_training',
                  label: "I completed my CNA program, but haven't applied yet",
                  desc: 'Finished school or clinicals, need to create Credentia CNA365 profile',
                },
                {
                  id: 'applied',
                  label: "I've submitted my application on Credentia CNA365",
                  desc: 'Waiting for state approval or ready to schedule exam dates',
                },
                {
                  id: 'scheduled',
                  label: 'My exam is scheduled and approaching',
                  desc: 'Preparing for Written/Oral exam or in-person Skills Evaluation',
                },
                {
                  id: 'retest_skills',
                  label: 'I passed the Written Exam, need to pass Skills',
                  desc: 'Focusing on the 5 demonstrated skills and critical safety steps',
                },
                {
                  id: 'passed',
                  label: 'I passed both parts and am awaiting the SC Registry',
                  desc: 'Tracking my official SCDHHS nurse aide registry listing',
                },
              ].map((opt) => (
                <label
                  key={opt.id}
                  onClick={() => {
                    setCurrentStageChoice(opt.id);
                    if (opt.id === 'completed_training' || opt.id === 'applied' || opt.id === 'scheduled' || opt.id === 'retest_skills' || opt.id === 'passed') {
                      setCompletedTraining(true);
                    }
                    if (opt.id === 'applied' || opt.id === 'scheduled' || opt.id === 'retest_skills' || opt.id === 'passed') {
                      setHasCNA365Account(true);
                    }
                    if (opt.id === 'scheduled') {
                      setExamScheduled(true);
                    }
                  }}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    currentStageChoice === opt.id
                      ? 'border-teal-600 bg-teal-50/50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="stageChoice"
                    checked={currentStageChoice === opt.id}
                    onChange={() => {}}
                    className="mt-1 text-teal-600 focus:ring-teal-500"
                  />
                  <div>
                    <div className="font-semibold text-sm text-slate-900">{opt.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{opt.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Training & Clinical Requirements */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">
              South Carolina Training & Clinical Hours
            </h3>
            <p className="text-sm text-slate-600">
              South Carolina DHHS requires an approved 100-hour program including at least 40 clinical hours.
            </p>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Did your program include at least 40 hours of hands-on clinical training?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setCompletedTraining(true);
                      setClinicalHours(40);
                    }}
                    className={`py-2.5 px-4 text-sm font-semibold rounded-lg border transition-all cursor-pointer ${
                      clinicalHours >= 40
                        ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    Yes (40+ clinical hours)
                  </button>
                  <button
                    type="button"
                    onClick={() => setClinicalHours(0)}
                    className={`py-2.5 px-4 text-sm font-semibold rounded-lg border transition-all cursor-pointer ${
                      clinicalHours < 40
                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    Not yet / Enrolled
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-500 pt-1">
                <strong>Official Rule:</strong> South Carolina NATCEP programs must be verified by SCDHHS. Candidates have 24 months from program completion to pass both NNAAP exams.
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Credentia CNA365 Account & Scheduling */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">
              Credentia CNA365 & Scheduling
            </h3>
            <p className="text-sm text-slate-600">
              Credentia manages South Carolina testing and registry submission via CNA365.
            </p>

            <div className="space-y-3">
              <label
                onClick={() => setHasCNA365Account(!hasCNA365Account)}
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  hasCNA365Account
                    ? 'border-teal-600 bg-teal-50/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={hasCNA365Account}
                  onChange={() => {}}
                  className="mt-1 rounded text-teal-600 focus:ring-teal-500"
                />
                <div>
                  <div className="font-semibold text-sm text-slate-900">
                    I have created my Credentia CNA365 account
                  </div>
                  <div className="text-xs text-slate-500">
                    At credentia.com/test-takers/sc with legal name matching my ID
                  </div>
                </div>
              </label>

              <label
                onClick={() => setExamScheduled(!examScheduled)}
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  examScheduled
                    ? 'border-teal-600 bg-teal-50/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={examScheduled}
                  onChange={() => {}}
                  className="mt-1 rounded text-teal-600 focus:ring-teal-500"
                />
                <div>
                  <div className="font-semibold text-sm text-slate-900">
                    I have already scheduled my test date(s)
                  </div>
                  <div className="text-xs text-slate-500">
                    Confirmed testing date on the Credentia schedule
                  </div>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Step 4: Exam Modality Preference */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">
              Exam Modality & Personalized Next Step
            </h3>
            <p className="text-sm text-slate-600">
              How do you plan to take the Written/Oral Exam? (The Skills Evaluation is always in-person at an approved SC test site).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => setExamModality('test_center')}
                className={`p-4 text-left rounded-xl border cursor-pointer transition-all ${
                  examModality === 'test_center'
                    ? 'border-teal-700 bg-teal-50/50 ring-1 ring-teal-700'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-bold text-sm text-slate-900">In-Person Test Center</div>
                <div className="text-xs text-slate-600 mt-1">
                  Take both written and skills on-site with pencils, ID checks, and direct proctors.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setExamModality('online_proctored')}
                className={`p-4 text-left rounded-xl border cursor-pointer transition-all ${
                  examModality === 'online_proctored'
                    ? 'border-teal-700 bg-teal-50/50 ring-1 ring-teal-700'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-bold text-sm text-slate-900">Online Proctored Written</div>
                <div className="text-xs text-slate-600 mt-1">
                  Take the written exam at home with webcam & room scan; skills completed in person.
                </div>
              </button>
            </div>

            <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
              <span className="font-semibold text-slate-800">What happens next:</span> We will generate your customized 8-step South Carolina journey roadmap, highlight your urgent actions, and load your Credentia official sources.
            </div>
          </div>
        )}

        {/* Modal footer controls */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors shadow-xs cursor-pointer ml-auto"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors shadow-sm cursor-pointer ml-auto"
            >
              Build My CNA Journey
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
