import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Calendar,
  Award,
  Terminal,
  ExternalLink,
  MessageSquare,
  HelpCircle,
  FileCheck,
  Heart,
} from 'lucide-react';
import { TopNavbar } from './components/TopNavbar';
import { JourneyTimeline } from './components/JourneyTimeline';
import { CoachChat } from './components/CoachChat';
import { SkillPractice } from './components/SkillPractice';
import { PracticeExam } from './components/PracticeExam';
import { TestDayChecklist } from './components/TestDayChecklist';
import { ConfidenceCenter } from './components/ConfidenceCenter';
import { StartingPointModal } from './components/StartingPointModal';
import { HacktoberfestModal } from './components/HacktoberfestModal';
import { OllamaSettingsModal } from './components/OllamaSettingsModal';
import { CandidateProfile, CoachMessage, JourneyStageId } from './types/journey';

const STORAGE_KEY = 'carolina_cna_ready_profile_v1';

const INITIAL_PROFILE: CandidateProfile = {
  name: 'Candidate',
  currentStageId: 'training',
  completedTraining: false,
  trainingHours: 100,
  clinicalHours: 40,
  hasCNA365Account: false,
  applicationApproved: false,
  examScheduled: false,
  examModality: 'test_center',
  writtenPassed: false,
  skillsPassed: false,
  completedChecklistIds: ['tc-id1', 'tc-watch'],
  rehearsedSkillIds: ['hand-hygiene'],
  practiceQuestionScores: {},
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('journey');
  const [profile, setProfile] = useState<CandidateProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load profile from localStorage', e);
    }
    return INITIAL_PROFILE;
  });

  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [isOllamaModalOpen, setIsOllamaModalOpen] = useState(false);
  const [isHackModalOpen, setIsHackModalOpen] = useState(false);

  // Ollama configuration
  const [preferOllama, setPreferOllama] = useState(false);
  const [ollamaUrl, setOllamaUrl] = useState('http://localhost:11434');
  const [modelName, setModelName] = useState('gemma3');
  const [isOllamaConnected, setIsOllamaConnected] = useState(false);

  // Coach chat messages
  const [messages, setMessages] = useState<CoachMessage[]>([
    {
      id: 'welcome-1',
      sender: 'coach',
      text: `Hello! I'm your South Carolina CNA Certification Coach.\n\nWhether you're finishing your 100-hour program, setting up your Credentia CNA365 portal, or rehearsing for the 5 hands-on skills, I'm here to tell you exactly what you need to do next to get listed on the South Carolina Nurse Aide Registry.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sourceTitle: 'Credentia South Carolina Candidate Handbook',
      sourceUrl: 'https://kb-sc.credentia.com/en',
      nextStepRecommendation: 'Click "Find My Starting Point" or ask any question below.',
      modelUsed: 'Credentia SC Grounded Engine',
    },
  ]);
  const [isCoachLoading, setIsCoachLoading] = useState(false);

  // Save profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  }, [profile]);

  // Check Ollama status on startup
  useEffect(() => {
    checkOllama(ollamaUrl);
  }, [ollamaUrl]);

  const checkOllama = async (url: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/check-ollama', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ollamaUrl: url }),
      });
      const data = await res.json();
      setIsOllamaConnected(data.available);
      return data.available;
    } catch (e) {
      setIsOllamaConnected(false);
      return false;
    }
  };

  const handleSendMessage = async (text: string) => {
    const userMsg: CoachMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsCoachLoading(true);

    try {
      const response = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: text,
          candidateStage: profile.currentStageId,
          preferOllama,
          ollamaUrl,
          modelName,
        }),
      });

      const data = await response.json();

      const coachMsg: CoachMessage = {
        id: `coach-${Date.now()}`,
        sender: 'coach',
        text: data.text || 'I could not retrieve an answer at this moment.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceTitle: data.sourceTitle,
        sourceUrl: data.sourceUrl,
        nextStepRecommendation: data.nextStepRecommendation,
        modelUsed: data.modelUsed,
      };

      setMessages((prev) => [...prev, coachMsg]);
    } catch (error) {
      const fallbackMsg: CoachMessage = {
        id: `coach-${Date.now()}`,
        sender: 'coach',
        text: 'I had trouble connecting. For official South Carolina nurse aide guidelines, verify your eligibility and application at https://kb-sc.credentia.com/en.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceTitle: 'Credentia SC Knowledge Base',
        sourceUrl: 'https://kb-sc.credentia.com/en',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsCoachLoading(false);
    }
  };

  const handleAskCoachFromStep = (query: string) => {
    setActiveTab('coach');
    handleSendMessage(query);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Navbar Contract */}
      <TopNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAssessment={() => setIsAssessmentOpen(true)}
        openOllamaModal={() => setIsOllamaModalOpen(true)}
        openHacktoberfestModal={() => setIsHackModalOpen(true)}
        isOllamaConnected={isOllamaConnected}
        activeModelName={modelName}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section shown on the primary view */}
        {activeTab === 'journey' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs relative overflow-hidden">
            <div className="max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>Hacktoberfest 2026: Built for a Friend & Powered by Open-Weight Gemma</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Become a South Carolina CNA with Confidence.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Know what comes next. Prepare for your exam. Understand the path to the South Carolina Nurse Aide Registry—grounded in official Credentia requirements.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setIsAssessmentOpen(true)}
                  className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  Start My CNA Journey
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveTab('coach')}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-teal-700" />
                  Ask the CNA Coach
                </button>
              </div>

              {/* Milestone pipeline tracker */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-600" />
                  <span>100-Hr SC Training</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-600" />
                  <span>Credentia CNA365</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-600" />
                  <span>NNAAP Exam & Skills</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>SC Nurse Aide Registry</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 1: Journey Timeline Roadmap */}
        {activeTab === 'journey' && (
          <JourneyTimeline
            profile={profile}
            onUpdateProfile={setProfile}
            onAskCoach={handleAskCoachFromStep}
          />
        )}

        {/* Tab 2: AI CNA Coach */}
        {activeTab === 'coach' && (
          <CoachChat
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isCoachLoading}
            profile={profile}
            isOllamaConnected={isOllamaConnected}
            activeModelName={modelName}
          />
        )}

        {/* Tab 3: Skills Rehearsal Lab (23 official skills) */}
        {activeTab === 'skills' && (
          <SkillPractice
            profile={profile}
            onUpdateProfile={setProfile}
          />
        )}

        {/* Tab 4: Practice Scenarios */}
        {activeTab === 'practice' && (
          <PracticeExam
            profile={profile}
            onUpdateProfile={setProfile}
          />
        )}

        {/* Tab 5: Test-Day Checklist */}
        {activeTab === 'checklist' && (
          <TestDayChecklist
            profile={profile}
            onUpdateProfile={setProfile}
          />
        )}

        {/* Tab 6: Registry & Confidence Center */}
        {activeTab === 'confidence' && (
          <ConfidenceCenter
            profile={profile}
            onNavigateToTab={setActiveTab}
            onAskCoach={handleAskCoachFromStep}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-slate-500">
            <div className="space-y-1">
              <div className="font-semibold text-slate-800">
                Carolina CNA Ready
              </div>
              <p>
                An open-source certification navigator grounded in the Credentia South Carolina Candidate Handbook & SCDHHS regulations.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <a
                href="https://kb-sc.credentia.com/en"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-900 inline-flex items-center gap-1"
              >
                Official Credentia SC Handbook <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={() => setIsHackModalOpen(true)}
                className="hover:text-slate-900 cursor-pointer"
              >
                About & Hacktoberfest Story
              </button>
              <button
                onClick={() => setIsOllamaModalOpen(true)}
                className="hover:text-slate-900 cursor-pointer"
              >
                AI Model Settings
              </button>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-100">
            Disclaimer: Carolina CNA Ready is an educational tool created to empower nurse aide students. It is not affiliated with, endorsed by, or operated by Credentia or the South Carolina Department of Health and Human Services (SCDHHS). Always verify official exam dates, fees, and registry policies directly at kb-sc.credentia.com.
          </div>
        </div>
      </footer>

      {/* Modals */}
      <StartingPointModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        profile={profile}
        onSaveProfile={setProfile}
        onNavigateToStage={(stageId) => {
          setActiveTab('journey');
        }}
      />

      <HacktoberfestModal
        isOpen={isHackModalOpen}
        onClose={() => setIsHackModalOpen(false)}
      />

      <OllamaSettingsModal
        isOpen={isOllamaModalOpen}
        onClose={() => setIsOllamaModalOpen(false)}
        isOllamaConnected={isOllamaConnected}
        activeModelName={modelName}
        ollamaUrl={ollamaUrl}
        onUpdateSettings={({ preferOllama, ollamaUrl, modelName }) => {
          setPreferOllama(preferOllama);
          setOllamaUrl(ollamaUrl);
          setModelName(modelName);
        }}
        onCheckOllamaConnection={checkOllama}
      />
    </div>
  );
}
