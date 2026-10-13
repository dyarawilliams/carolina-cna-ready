import React, { useState } from 'react';
import {
  Sparkles,
  Terminal,
  Camera,
  Menu,
  X,
  Compass,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';

interface TopNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAssessment: () => void;
  openOllamaModal: () => void;
  openHacktoberfestModal: () => void;
  openScreenshotStudio: () => void;
  isOllamaConnected: boolean;
  activeModelName: string;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  activeTab,
  setActiveTab,
  openAssessment,
  openOllamaModal,
  openHacktoberfestModal,
  openScreenshotStudio,
  isOllamaConnected,
  activeModelName,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'journey', label: 'CNA Journey' },
    { id: 'coach', label: 'AI Coach' },
    { id: 'skills', label: 'Skills Rehearsal' },
    { id: 'practice', label: 'Practice Scenarios' },
    { id: 'checklist', label: 'Test-Day Checklist' },
    { id: 'confidence', label: 'Registry & Confidence' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 w-full max-w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4 w-full min-w-0">
        {/* Zone 1: Wordmark Logo */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink">
          <button
            onClick={() => handleNavClick('journey')}
            className="text-left group cursor-pointer focus:outline-none min-w-0"
          >
            <span className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors truncate block">
              Carolina CNA Ready
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-teal-700 truncate hidden xs:block">
              South Carolina Nurse Aide Navigator
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Displayed on ultra-wide viewports to prevent collision) */}
        <nav className="hidden 2xl:flex items-center gap-5 text-sm font-medium text-slate-600 shrink-0">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`py-1 transition-colors cursor-pointer relative whitespace-nowrap ${
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

        {/* Zone 3: Actions & Mobile Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Model Status Badge (compact on small screens, full on large) */}
          <button
            onClick={openOllamaModal}
            className="hidden sm:flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200/80 cursor-pointer"
            title="Configure Open-Weight AI Model (Ollama / Gemma)"
          >
            <Terminal className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span className="hidden md:inline">Model:</span>
            <span className="font-semibold text-slate-900 max-w-[70px] sm:max-w-[90px] truncate">
              {isOllamaConnected ? 'Gemma' : 'Gemma AI'}
            </span>
            {isOllamaConnected && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            )}
          </button>

          {/* Screenshots Studio Button */}
          <button
            onClick={openScreenshotStudio}
            className="hidden md:flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            title="Download Real Screenshots for Demos and Submissions"
          >
            <Camera className="w-3.5 h-3.5 text-teal-700 shrink-0" />
            <span className="hidden lg:inline">Screenshots</span>
          </button>

          {/* Story / Hacktoberfest Button */}
          <button
            onClick={openHacktoberfestModal}
            className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            title="Hacktoberfest Weekend Challenge: Build for a Friend"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>Story</span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={openAssessment}
            className="px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm transition-colors cursor-pointer whitespace-nowrap"
          >
            <span className="hidden sm:inline">Find My Starting Point</span>
            <span className="sm:hidden">Start Here</span>
          </button>

          {/* Mobile/Tablet Menu Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="2xl:hidden p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Collapsible Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="2xl:hidden bg-white border-t border-slate-200 px-4 py-4 shadow-xl space-y-4 animate-in slide-in-from-top-2 duration-150 w-full max-w-full">
          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
              Navigation
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg font-medium transition-colors cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-teal-50 text-teal-900 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2">
              Tools & Project Info
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => {
                  openHacktoberfestModal();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>The Story: Build for a Friend</span>
              </button>

              <button
                onClick={() => {
                  openScreenshotStudio();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg border border-teal-200 cursor-pointer"
              >
                <Camera className="w-4 h-4 text-teal-700" />
                <span>Screenshot Studio & Assets</span>
              </button>

              <button
                onClick={() => {
                  openOllamaModal();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 cursor-pointer sm:col-span-2"
              >
                <Terminal className="w-4 h-4 text-slate-600" />
                <span>AI Model Settings (Local Gemma / Ollama)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick-touch horizontal tab scroller on mobile/tablet for fast swipe navigation */}
      <div className="2xl:hidden w-full max-w-full flex items-center gap-1.5 overflow-x-auto px-3 sm:px-4 py-2 border-t border-slate-100 scrollbar-none bg-slate-50/70">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap cursor-pointer transition-colors shrink-0 ${
                isActive
                  ? 'bg-teal-700 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
