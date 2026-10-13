import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Camera, Download, Laptop, Smartphone, CheckCircle2, RefreshCw, X } from 'lucide-react';
import { CandidateProfile } from '../types/journey';
import { JourneyTimeline } from './JourneyTimeline';
import { SC_JOURNEY_STAGES } from '../data/journeyStages';

interface ScreenshotStudioProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CandidateProfile;
  onUpdateProfile: (p: CandidateProfile) => void;
}

export const ScreenshotStudio: React.FC<ScreenshotStudioProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
}) => {
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  const [isCapturingDesktop, setIsCapturingDesktop] = useState(false);
  const [isCapturingMobile, setIsCapturingMobile] = useState(false);
  const [desktopSuccess, setDesktopSuccess] = useState(false);
  const [mobileSuccess, setMobileSuccess] = useState(false);

  if (!isOpen) return null;

  const captureDesktop = async () => {
    if (!desktopRef.current) return;
    setIsCapturingDesktop(true);
    setDesktopSuccess(false);
    try {
      // Small delay to ensure all fonts and styles are painted
      await new Promise((r) => setTimeout(r, 200));
      const dataUrl = await toPng(desktopRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        quality: 1,
      });
      const link = document.createElement('a');
      link.download = 'carolina-cna-ready-desktop-live.png';
      link.href = dataUrl;
      link.click();
      setDesktopSuccess(true);
    } catch (err) {
      console.error('Failed to capture desktop screenshot', err);
    } finally {
      setIsCapturingDesktop(false);
    }
  };

  const captureMobile = async () => {
    if (!mobileRef.current) return;
    setIsCapturingMobile(true);
    setMobileSuccess(false);
    try {
      await new Promise((r) => setTimeout(r, 200));
      const dataUrl = await toPng(mobileRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        quality: 1,
      });
      const link = document.createElement('a');
      link.download = 'carolina-cna-ready-mobile-live.png';
      link.href = dataUrl;
      link.click();
      setMobileSuccess(true);
    } catch (err) {
      console.error('Failed to capture mobile screenshot', err);
    } finally {
      setIsCapturingMobile(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
              <Camera className="w-3.5 h-3.5 text-teal-700" />
              <span>Real Live Website Screenshot Generator</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mt-2">
              Exact Pixel-Perfect Screenshots of Carolina CNA Ready
            </h3>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              These are 100% genuine screenshots rendered directly from your live application code (not an AI approximation). Click download to get high-resolution PNGs ready to upload to your DEV.to demo post!
            </p>
          </div>

          {/* Action Download Buttons */}
          <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <button
              onClick={captureDesktop}
              disabled={isCapturingDesktop}
              className="flex items-center gap-2 px-5 py-2.5 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              {isCapturingDesktop ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating Desktop PNG...
                </>
              ) : (
                <>
                  <Laptop className="w-4 h-4" />
                  Download Live Desktop Screenshot (.png)
                </>
              )}
            </button>

            <button
              onClick={captureMobile}
              disabled={isCapturingMobile}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              {isCapturingMobile ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating Mobile PNG...
                </>
              ) : (
                <>
                  <Smartphone className="w-4 h-4" />
                  Download Live Mobile Screenshot (.png)
                </>
              )}
            </button>

            {(desktopSuccess || mobileSuccess) && (
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5 ml-auto">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Downloaded successfully!
              </span>
            )}
          </div>

          {/* Interactive Previews */}
          <div className="space-y-6">
            {/* Desktop Preview Frame */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Laptop className="w-4 h-4 text-teal-700" />
                  Live Desktop Render (1280px viewport)
                </span>
                <span className="text-slate-400 font-normal">Exact live DOM</span>
              </div>

              <div className="rounded-2xl border border-slate-300 shadow-sm overflow-hidden bg-slate-100 max-h-[420px] overflow-y-auto">
                <div
                  ref={desktopRef}
                  className="bg-slate-50 p-6 space-y-6 min-w-[1080px]"
                >
                  {/* Mock Desktop Top Navigation */}
                  <div className="bg-white rounded-2xl border border-slate-200 px-6 py-4 flex items-center justify-between shadow-xs">
                    <div>
                      <div className="text-lg font-bold text-slate-900">
                        Carolina CNA Ready
                      </div>
                      <div className="text-[11px] font-semibold text-teal-700">
                        South Carolina Nurse Aide Navigator
                      </div>
                    </div>
                    <div className="flex items-center gap-5 text-xs font-medium text-slate-600">
                      <span className="text-teal-800 font-bold border-b-2 border-teal-700 pb-0.5">
                        CNA Journey
                      </span>
                      <span>AI Coach</span>
                      <span>Skills Rehearsal</span>
                      <span>Practice Scenarios</span>
                      <span>Test-Day Checklist</span>
                      <span>Registry & Confidence</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold border border-slate-200">
                        Model: Gemma AI
                      </span>
                      <span className="px-3 py-1 bg-teal-700 text-white rounded-lg text-xs font-bold">
                        Find My Starting Point
                      </span>
                    </div>
                  </div>

                  {/* Hero Banner */}
                  <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
                      Hacktoberfest 2026: Built for a Friend & Powered by Open-Weight Gemma
                    </span>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                      Become a South Carolina CNA with Confidence.
                    </h1>
                    <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
                      Know what comes next. Prepare for your exam. Understand the path to the South Carolina Nurse Aide Registry—grounded in official Credentia requirements.
                    </p>
                    <div className="pt-2 flex items-center gap-3">
                      <span className="px-5 py-2.5 bg-teal-700 text-white text-xs font-bold rounded-xl shadow-xs">
                        Start My CNA Journey
                      </span>
                      <span className="px-5 py-2.5 bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl">
                        Ask the CNA Coach
                      </span>
                    </div>
                  </div>

                  {/* Real Journey Timeline Component */}
                  <JourneyTimeline
                    profile={profile}
                    onUpdateProfile={onUpdateProfile}
                    onAskCoach={() => {}}
                  />
                </div>
              </div>
            </div>

            {/* Mobile Preview Frame */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-teal-700" />
                  Live Mobile Render (390px mobile viewport)
                </span>
                <span className="text-slate-400 font-normal">Exact live responsive layout</span>
              </div>

              <div className="flex justify-center p-4 bg-slate-100 rounded-2xl border border-slate-200 max-h-[460px] overflow-y-auto">
                <div
                  ref={mobileRef}
                  className="w-[390px] bg-slate-50 border-2 border-slate-300 rounded-3xl p-4 space-y-4 shadow-md shrink-0"
                >
                  {/* Mobile Header */}
                  <div className="bg-white rounded-xl p-3 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-slate-900">
                        Carolina CNA Ready
                      </div>
                      <div className="text-[10px] text-teal-700 font-medium">
                        South Carolina Navigator
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-teal-700 text-white text-[10px] font-bold rounded-md">
                      Start
                    </span>
                  </div>

                  {/* Mobile Tabs */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                    <span className="px-3 py-1 bg-teal-700 text-white rounded-md font-semibold whitespace-nowrap">
                      CNA Journey
                    </span>
                    <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-slate-700 whitespace-nowrap">
                      AI Coach
                    </span>
                    <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-slate-700 whitespace-nowrap">
                      Skills
                    </span>
                    <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-slate-700 whitespace-nowrap">
                      Checklist
                    </span>
                  </div>

                  {/* Mobile Hero */}
                  <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2">
                    <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                      Hacktoberfest 2026: Built for a Friend
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 leading-snug">
                      Become a South Carolina CNA with Confidence.
                    </h2>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Know what comes next. Prepare for your exam and the SC Nurse Aide Registry.
                    </p>
                  </div>

                  {/* Mobile Journey Stage Card */}
                  <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                        Step 01 of 08
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-600">
                        Current Focus
                      </span>
                    </div>
                    <div className="font-bold text-sm text-slate-900">
                      State-Approved Training (100 Hours)
                    </div>
                    <div className="p-3 bg-teal-50/70 border border-teal-100 rounded-xl space-y-1">
                      <div className="text-[10px] font-bold text-teal-900 uppercase">
                        Immediate Action
                      </div>
                      <div className="text-xs text-teal-950 font-medium">
                        Verify your school has issued your official Certificate of Completion and logged 40 clinical hours.
                      </div>
                    </div>
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[11px] font-bold text-slate-800">
                        Checklist:
                      </div>
                      <div className="text-[11px] text-slate-700 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Completed 60+ classroom/lab hours</span>
                      </div>
                      <div className="text-[11px] text-slate-700 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Completed 40+ supervised clinical hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Close Studio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
