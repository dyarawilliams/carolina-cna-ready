import React from 'react';
import { Sparkles, Terminal, CheckCircle2 } from 'lucide-react';

interface TopNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAssessment: () => void;
  openOllamaModal: () => void;
  openHacktoberfestModal: () => void;
  isOllamaConnected: boolean;
  activeModelName: string;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  activeTab,
  setActiveTab,
  openAssessment,
  openOllamaModal,
  openHacktoberfestModal,
  isOllamaConnected,
  activeModelName,
}) => {
  const navItems = [
    { id: 'journey', label: 'CNA Journey' },
    { id: 'coach', label: 'AI Coach' },
    { id: 'skills', label: 'Skills Rehearsal' },
    { id: 'practice', label: 'Practice Scenarios' },
    { id: 'checklist', label: 'Test-Day Checklist' },
    { id: 'confidence', label: 'Registry & Confidence' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('journey')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
              Carolina CNA Ready
            </span>
            <span className="block text-[11px] font-medium text-teal-700">
              South Carolina Nurse Aide Navigator
            </span>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`py-1 text-sm font-medium transition-colors cursor-pointer relative whitespace-nowrap ${
                  isActive
                    ? 'text-teal-800 font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={openOllamaModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200/80 cursor-pointer"
            title="Configure Open-Weight AI Model (Ollama / Gemma)"
          >
            <Terminal className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Model:</span>
            <span className="font-semibold text-slate-900 max-w-[90px] truncate">
              {isOllamaConnected ? 'Local Gemma' : 'Gemma AI'}
            </span>
            {isOllamaConnected && (
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            )}
          </button>

          <button
            onClick={openHacktoberfestModal}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span className="hidden md:inline">Build for a Friend</span>
            <span className="md:hidden">Story</span>
          </button>

          <button
            onClick={openAssessment}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm transition-colors cursor-pointer whitespace-nowrap"
          >
            Find My Starting Point
          </button>
        </div>
      </div>

      {/* Mobile navigation row */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 border-t border-slate-100 scrollbar-none bg-slate-50/50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === item.id
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
