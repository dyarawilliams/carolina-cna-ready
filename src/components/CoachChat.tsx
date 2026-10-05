import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Terminal,
  HelpCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { CoachMessage, CandidateProfile } from '../types/journey';

interface CoachChatProps {
  messages: CoachMessage[];
  onSendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
  profile: CandidateProfile;
  isOllamaConnected: boolean;
  activeModelName: string;
}

export const CoachChat: React.FC<CoachChatProps> = ({
  messages,
  onSendMessage,
  isLoading,
  profile,
  isOllamaConnected,
  activeModelName,
}) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'Am I eligible to take the exam?',
    'What documents and items do I bring to the test center?',
    'Can I take the exam online in South Carolina?',
    'What are the 5 skills tested in the Skills Evaluation?',
    'What happens if I fail one part of the exam?',
    'How long until my name is listed on the SC Nurse Aide Registry?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const text = input;
    setInput('');
    onSendMessage(text);
  };

  const handleSuggestedClick = (q: string) => {
    if (isLoading) return;
    onSendMessage(q);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[760px] overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-slate-900">
                South Carolina CNA Coach
              </h3>
              <span className="text-[11px] font-medium text-teal-800 bg-teal-50 border border-teal-200/80 px-2 py-0.5 rounded-md">
                Grounded in Credentia SC
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Personalized guidance for your current stage:{' '}
              <span className="font-semibold text-slate-700 capitalize">
                {profile.currentStageId.replace('_', ' ')}
              </span>
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
          <Terminal className="w-3.5 h-3.5 text-slate-600" />
          <span>Engine:</span>
          <span className="font-semibold text-slate-800">
            {isOllamaConnected ? `Ollama (${activeModelName})` : 'Gemma AI Engine'}
          </span>
        </div>
      </div>

      {/* Messages stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/30">
        {messages.length === 0 ? (
          <div className="py-10 text-center max-w-lg mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              Welcome to your South Carolina CNA Coach
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ask anything about eligibility, the 100-hour requirement, Credentia CNA365 registration, the 70-question written exam, the 23 skills, test day rules, or registry listing.
            </p>
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-500 mb-2.5">
                Suggested questions:
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestedClick(q)}
                    className="text-xs font-medium text-slate-700 bg-white hover:bg-teal-50 hover:text-teal-900 hover:border-teal-300 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors text-left cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'coach' && (
                <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-4 sm:p-5 shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-teal-700 text-white'
                    : 'bg-white border border-slate-200 text-slate-800'
                }`}
              >
                {/* Message body */}
                <div className="text-sm leading-relaxed whitespace-pre-line">
                  {msg.text}
                </div>

                {/* Next Step Box (Coach only) */}
                {msg.sender === 'coach' && msg.nextStepRecommendation && (
                  <div className="mt-4 p-3 bg-teal-50 border border-teal-100 rounded-xl">
                    <div className="text-[11px] font-bold text-teal-900 uppercase tracking-wide flex items-center gap-1.5">
                      <ArrowRight className="w-3 h-3 text-teal-700" />
                      Your Recommended Next Step
                    </div>
                    <div className="text-xs text-teal-950 font-medium mt-1">
                      {msg.nextStepRecommendation}
                    </div>
                  </div>
                )}

                {/* Source citation (Coach only) */}
                {msg.sender === 'coach' && msg.sourceTitle && (
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                      <span>Official Source:</span>
                      {msg.sourceUrl ? (
                        <a
                          href={msg.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-teal-700 hover:underline inline-flex items-center gap-0.5"
                        >
                          {msg.sourceTitle}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="font-medium text-slate-700">{msg.sourceTitle}</span>
                      )}
                    </div>
                    {msg.modelUsed && (
                      <span className="text-[10px] text-slate-400">
                        {msg.modelUsed}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center shrink-0 mt-1">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center gap-2 text-xs text-slate-500">
              <RefreshCw className="w-4 h-4 animate-spin text-teal-600" />
              <span>Checking official South Carolina Credentia knowledge base...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested chips above input when in conversation */}
      {messages.length > 0 && (
        <div className="px-4 py-2 border-t border-slate-100 bg-white flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-semibold text-slate-400 shrink-0">Ask:</span>
          {suggestedQuestions.slice(0, 3).map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestedClick(q)}
              className="text-xs text-slate-600 hover:text-teal-900 bg-slate-50 hover:bg-teal-50 border border-slate-200 px-2.5 py-1 rounded-md shrink-0 transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Chat input form */}
      <form
        onSubmit={handleSubmit}
        className="p-3 sm:p-4 border-t border-slate-200 bg-white flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about South Carolina CNA certification..."
          className="flex-1 px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer shrink-0"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
};
