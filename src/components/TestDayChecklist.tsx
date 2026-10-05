import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  ShieldAlert,
  Laptop,
  Building2,
  ExternalLink,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { CandidateProfile } from '../types/journey';

interface TestDayChecklistProps {
  profile: CandidateProfile;
  onUpdateProfile: (profile: CandidateProfile) => void;
}

export const TestDayChecklist: React.FC<TestDayChecklistProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'test_center' | 'online'>(
    profile.examModality === 'online_proctored' ? 'online' : 'test_center'
  );

  const testCenterItems = [
    {
      id: 'tc-id1',
      title: 'Primary Government-Issued Photo ID',
      desc: 'Must be valid, unexpired, and feature your legal signature (Driver License, State ID, US Passport, Military ID). Name must match CNA365 letter-for-letter.',
    },
    {
      id: 'tc-id2',
      title: 'Secondary Matching ID',
      desc: 'Must feature your matching legal name (Social Security card, signed credit/debit card, school ID).',
    },
    {
      id: 'tc-pencils',
      title: 'Three Sharpened No. 2 Pencils & Clean Eraser',
      desc: 'For the paper written examination bubble answer sheet (mechanical pencils usually not permitted).',
    },
    {
      id: 'tc-watch',
      title: 'Analog Watch with Sweep Second Hand',
      desc: 'Required for radial pulse and respiration measurement skills. Smart watches and digital fitness trackers are strictly prohibited.',
    },
    {
      id: 'tc-attire',
      title: 'Clinical Scrubs / Non-Skid Closed-Toe Shoes',
      desc: 'Mandatory for the Skills Evaluation. No sandals, clogs without straps, or high heels.',
    },
    {
      id: 'tc-arrive',
      title: 'Arrive Exactly 30 Minutes Early',
      desc: 'Testing centers lock doors promptly at scheduled start time. Late arrivals are forfeited with zero fee refund.',
    },
    {
      id: 'tc-ssn',
      title: 'Know Your Full Social Security Number',
      desc: 'Needed to confirm candidate roster verification with Credentia on site.',
    },
    {
      id: 'tc-phone-off',
      title: 'Power Off Cell Phone & Electronics',
      desc: 'Phones must be powered completely off (not on vibrate) and left in designated lockers/bags.',
    },
  ];

  const onlineItems = [
    {
      id: 'ol-device',
      title: 'Desktop, Laptop, or Chromebook (Single Monitor)',
      desc: 'Dual monitors, TVs, or external projection displays are strictly forbidden.',
    },
    {
      id: 'ol-webcam',
      title: 'Working Webcam and Microphone',
      desc: 'Continuous video and audio feed streamed to live Credentia proctor.',
    },
    {
      id: 'ol-mobile-scan',
      title: 'Secondary Mobile Device for 360° Room Scan',
      desc: 'You will scan your entire room, workspace, floor, and under desk prior to launching the exam.',
    },
    {
      id: 'ol-system-test',
      title: 'Complete Credentia Online System Check',
      desc: 'Run the browser diagnostic test 24 to 48 hours prior to test day to confirm camera and bandwidth speed.',
    },
    {
      id: 'ol-private-room',
      title: 'Private Room with Closed Door',
      desc: 'No other people, children, or pets may enter. Any entrance voids the test immediately.',
    },
    {
      id: 'ol-clear-desk',
      title: 'Completely Clear Desk Surface',
      desc: 'No scratch paper, books, sticky notes, pens, or cups with writing. Clear water glass only.',
    },
    {
      id: 'ol-ids',
      title: 'Two Valid Forms of Matching ID Ready',
      desc: 'Hold physical IDs up to the webcam for proctor verification before test release.',
    },
  ];

  const currentItems = activeTab === 'test_center' ? testCenterItems : onlineItems;

  const completedCount = currentItems.filter((item) =>
    profile.completedChecklistIds.includes(item.id)
  ).length;

  const percentComplete = Math.round((completedCount / currentItems.length) * 100);

  const toggleCheck = (id: string) => {
    const isChecked = profile.completedChecklistIds.includes(id);
    const updated = isChecked
      ? profile.completedChecklistIds.filter((item) => item !== id)
      : [...profile.completedChecklistIds, id];

    onUpdateProfile({
      ...profile,
      completedChecklistIds: updated,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-700">
              <FileCheck className="w-4 h-4" />
              <span>Official South Carolina Test-Day Protocol</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1">
              Test-Day Readiness Checklist
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Don't lose your testing fee due to a missing ID or wrong watch. Use this verified checklist tailored to South Carolina testing rules.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shrink-0 min-w-[180px]">
            <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-1">
              <span>Readiness:</span>
              <span className="font-bold text-teal-800 tabular-nums">
                {percentComplete}%
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-teal-700 h-full rounded-full transition-all duration-300"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-500 mt-1.5 tabular-nums">
              {completedCount} of {currentItems.length} items verified
            </div>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('test_center')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'test_center'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Building2 className="w-4 h-4" />
            In-Person Test Center Checklist
          </button>
          <button
            onClick={() => setActiveTab('online')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'online'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Laptop className="w-4 h-4" />
            Online At-Home Written Exam Checklist
          </button>
        </div>
      </div>

      {/* Checklist items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentItems.map((item) => {
          const isChecked = profile.completedChecklistIds.includes(item.id);
          return (
            <label
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all cursor-pointer ${
                isChecked
                  ? 'border-emerald-300 bg-emerald-50/50 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {}}
                className="mt-1 rounded text-teal-700 focus:ring-teal-600 cursor-pointer"
              />
              <div className="space-y-1">
                <div
                  className={`text-sm font-semibold ${
                    isChecked ? 'text-emerald-950 line-through' : 'text-slate-900'
                  }`}
                >
                  {item.title}
                </div>
                <div className="text-xs text-slate-500 leading-relaxed">
                  {item.desc}
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {/* Warning Box */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-950 leading-relaxed">
          <strong>South Carolina Candidate Warning:</strong> Testing center evaluators have zero discretion under state law. If your legal first or last name on your ID differs from your Credentia CNA365 profile by even one letter, or if your ID is expired, you will not be admitted to test.
        </div>
      </div>
    </div>
  );
};
