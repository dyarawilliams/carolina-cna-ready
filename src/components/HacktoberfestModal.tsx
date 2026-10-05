import React from 'react';
import { X, Heart, Sparkles, Terminal, ShieldCheck, Cpu, Code2, ExternalLink } from 'lucide-react';

interface HacktoberfestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HacktoberfestModal: React.FC<HacktoberfestModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Hacktoberfest Weekend Challenge 2026: Build for a Friend</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              The Story Behind Carolina CNA Ready
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              From CNA Student to South Carolina Registry — One Confident Step at a Time.
            </p>
          </div>

          {/* Dedication Story */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-700 leading-relaxed">
            <p className="font-semibold text-slate-900 text-sm">
              Dedicated to My Best Friend:
            </p>
            <p>
              My best friend just completed her rigorous 100-hour training and clinicals in South Carolina to earn her Certified Nursing Assistant credential. Watching her navigate the process revealed a frustrating reality: <em>the official requirements exist, but they are scattered across candidate handbooks, portals, testing site policies, and state DHHS guidelines.</em>
            </p>
            <p>
              I didn't want to build another generic 10-question quiz site. I wanted to build the intelligent certification navigator and confidence coach I wish she'd had—grounded strictly in South Carolina Credentia standards so no future nurse aide feels lost in the bureaucracy.
            </p>
          </div>

          {/* Why Open Innovation & Open Weights Matter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-teal-700" />
              Why Open Innovation Matters for Healthcare Candidates
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Candidate Privacy First
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Candidates often discuss personal academic standing, disability accommodations, or retake anxieties. With local open-weight models (Gemma + Ollama), inference runs directly on their machine—not monetized by closed AI APIs.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-teal-700" />
                  Model-Swapping Flexibility
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Engineered with an open AI adapter: connect your local Ollama runtime (<code className="bg-slate-100 px-1 py-0.5 rounded">gemma3</code>, <code className="bg-slate-100 px-1 py-0.5 rounded">gemma4:31b-it</code>) or use the built-in server-side engine seamlessly.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">
                  Zero SSN or Account Exposure
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Never asks candidates for their Social Security Number or Credentia passwords. All progress is safely stored in local browser state (<code className="bg-slate-100 px-1 py-0.5 rounded">localStorage</code>).
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">
                  Strictly RAG-Grounded
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Prevents hallucinated certification rules by grounding responses directly in official Credentia South Carolina candidate handbook articles and SCDHHS statutes.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Ollama Run Guide */}
          <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between text-slate-400 font-sans text-[11px]">
              <span>Run Local Gemma via Ollama (Optional for local devs):</span>
              <span className="text-emerald-400">Open-Weights</span>
            </div>
            <div className="bg-black/40 p-2.5 rounded-lg select-all">
              ollama run gemma3
            </div>
            <div className="text-slate-400 font-sans text-[11px]">
              Then click "Model: Gemma AI" in the top bar to connect to your local Ollama port (11434).
            </div>
          </div>

          {/* DEV.to Cover Image Section */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-700" />
                DEV.to Submission Cover Banner
              </h4>
              <span className="text-[11px] text-slate-500">16:9 Banner · @dyarawilliams</span>
            </div>
            
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-950 relative group">
              <img
                src="/src/assets/images/devto_cover_image_1791177992255.jpg"
                alt="DEV.to Hacktoberfest Cover for Carolina CNA Ready by dyarawilliams"
                className="w-full aspect-[16/9] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <a
                  href="/src/assets/images/devto_cover_image_1791177992255.jpg"
                  download="carolina_cna_ready_devto_cover.jpg"
                  className="px-4 py-2 bg-white/95 text-slate-900 font-semibold text-xs rounded-lg shadow-md hover:bg-white transition-colors"
                >
                  Download Full-Res Cover Image
                </a>
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              Generated for your DEV.to challenge post with DEV logo and username <code className="text-teal-700 font-semibold">@dyarawilliams</code>.
            </p>
          </div>

          {/* Demo Screenshots Section */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-teal-700" />
                Demo Screenshots for Your Post
              </h4>
              <span className="text-[11px] text-slate-500">Web & Mobile Assets</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Desktop Screenshot */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                  <span>Desktop Web Dashboard</span>
                  <a
                    href="/src/assets/images/screenshot_desktop_ui_1791178629755.jpg"
                    download="carolina_cna_ready_desktop.jpg"
                    className="text-teal-700 hover:underline text-[11px]"
                  >
                    Download (16:9)
                  </a>
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <img
                    src="/src/assets/images/screenshot_desktop_ui_1791178629755.jpg"
                    alt="Carolina CNA Ready Desktop UI Screenshot"
                    className="w-full aspect-[16/9] object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Mobile Screenshot */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                  <span>Mobile Smartphone View</span>
                  <a
                    href="/src/assets/images/screenshot_mobile_ui_1791178638091.jpg"
                    download="carolina_cna_ready_mobile.jpg"
                    className="text-teal-700 hover:underline text-[11px]"
                  >
                    Download (9:16)
                  </a>
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <img
                    src="/src/assets/images/screenshot_mobile_ui_1791178638091.jpg"
                    alt="Carolina CNA Ready Mobile UI Screenshot"
                    className="w-full aspect-[16/9] object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors cursor-pointer"
            >
              Close & Start Exploring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
