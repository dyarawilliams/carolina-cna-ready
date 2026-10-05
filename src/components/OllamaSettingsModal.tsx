import React, { useState } from 'react';
import { X, Terminal, CheckCircle2, AlertCircle, RefreshCw, Cpu, Globe } from 'lucide-react';

interface OllamaSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isOllamaConnected: boolean;
  activeModelName: string;
  ollamaUrl: string;
  onUpdateSettings: (settings: { preferOllama: boolean; ollamaUrl: string; modelName: string }) => void;
  onCheckOllamaConnection: (url: string) => Promise<boolean>;
}

export const OllamaSettingsModal: React.FC<OllamaSettingsModalProps> = ({
  isOpen,
  onClose,
  isOllamaConnected,
  activeModelName,
  ollamaUrl,
  onUpdateSettings,
  onCheckOllamaConnection,
}) => {
  const [url, setUrl] = useState(ollamaUrl);
  const [model, setModel] = useState(activeModelName);
  const [isChecking, setIsChecking] = useState(false);
  const [preferOllama, setPreferOllama] = useState(isOllamaConnected);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setIsChecking(true);
    setTestResult(null);
    try {
      const isConnected = await onCheckOllamaConnection(url);
      if (isConnected) {
        setTestResult({
          success: true,
          message: 'Connected successfully to local Ollama server!',
        });
        setPreferOllama(true);
      } else {
        setTestResult({
          success: false,
          message:
            'Could not reach Ollama at this URL. Make sure "ollama serve" or "ollama run gemma3" is running on your machine.',
        });
      }
    } catch (e) {
      setTestResult({
        success: false,
        message: 'Connection failed. Local server may have CORS restrictions or is not running.',
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleSave = () => {
    onUpdateSettings({
      preferOllama,
      ollamaUrl: url,
      modelName: model,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wide">
              <Terminal className="w-4 h-4 text-teal-700" />
              <span>Open-Weight AI Model Settings</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              Configure Gemma & Ollama Engine
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Carolina CNA Ready is built to support local open-weight inference (Gemma 3, Gemma 4 31B IT) for candidate privacy and offline usage, with built-in server-side fallback.
            </p>
          </div>

          {/* Mode Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Inference Engine</label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setPreferOllama(true)}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  preferOllama
                    ? 'border-teal-700 bg-teal-50/70 ring-1 ring-teal-700'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                  <Cpu className="w-3.5 h-3.5 text-teal-700" />
                  Local Ollama (Gemma)
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Private, 100% on your device
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPreferOllama(false)}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  !preferOllama
                    ? 'border-teal-700 bg-teal-50/70 ring-1 ring-teal-700'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                  <Globe className="w-3.5 h-3.5 text-teal-700" />
                  Gemma AI Engine
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Server-side zero-setup fallback
                </div>
              </button>
            </div>
          </div>

          {/* Ollama URL & Model inputs */}
          <div className="space-y-3 pt-1">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ollama Endpoint URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="http://localhost:11434"
                  className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white text-slate-900"
                />
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={isChecking}
                  className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                >
                  {isChecking && <RefreshCw className="w-3 h-3 animate-spin" />}
                  Test
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Model Name Tag
              </label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="gemma3 or gemma4:31b-it or gemma:7b"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white text-slate-900"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Examples: <code className="text-slate-600">gemma3</code>, <code className="text-slate-600">gemma4:31b-it</code>, <code className="text-slate-600">gemma:7b</code>, <code className="text-slate-600">mistral</code>
              </span>
            </div>

            {testResult && (
              <div
                className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                  testResult.success
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : 'bg-amber-50 text-amber-900 border border-amber-200'
                }`}
              >
                {testResult.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                )}
                <span>{testResult.message}</span>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Active: {preferOllama ? 'Local Ollama' : 'Gemma AI Server'}
            </span>
            <button
              onClick={handleSave}
              className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors cursor-pointer"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
