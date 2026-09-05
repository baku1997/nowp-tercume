import { useState } from 'react';
import { ArrowRight, Copy, Loader2, Check, Languages, ArrowLeftRight, ChevronDown, X } from 'lucide-react';
import { translateText } from './services/geminiService';

const LANGUAGES: Record<string, string> = {
  en: 'İngiliscə (English)',
  az: 'Azərbaycanca',
  ru: 'Rusca (Русский)',
  tr: 'Türkcə (Türkçe)'
};

export default function App() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('az');

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    if (!navigator.onLine) {
      setError('İnternet bağlantısı yoxdur. Zəhmət olmasa bağlantınızı yoxlayın və yenidən cəhd edin.');
      return;
    }

    setIsTranslating(true);
    setError('');
    
    try {
      const result = await translateText(sourceText, LANGUAGES[sourceLang], LANGUAGES[targetLang]);
      setTranslatedText(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bilinməyən xəta baş verdi');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
    setError('');
  };

  const handleCopy = async () => {
    if (!translatedText) return;
    try {
      await navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="https://drive.google.com/thumbnail?id=1U-S4yVhSLP0CJjk4wix-u52CyhZeQnOh&sz=w400" 
              alt="NOWP Group Logo" 
              className="h-8 w-auto object-contain rounded-md"
              referrerPolicy="no-referrer"
            />
            <h1 className="text-xl font-semibold tracking-tight text-slate-800">NOWP Group tərcümə sistemi</h1>
          </div>
          <div className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full flex items-center gap-2">
            {sourceLang.toUpperCase()} → {targetLang.toUpperCase()}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-3">
            Professional Tərcümə
          </h2>
          <p className="text-lg text-slate-600">
            Mətnlərinizi daxil edin və süni intellektin köməyi ilə ən yüksək səviyyədə, təbii tərcümə əldə edin.
          </p>
        </div>

        {/* Mobile Swap Button */}
        <div className="flex lg:hidden justify-center mb-4">
          <button
            onClick={handleSwap}
            className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm"
          >
            <ArrowLeftRight size={18} />
            <span className="text-sm font-medium">Dilləri dəyiş</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 relative">
          
          {/* Source Text Area */}
          <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all">
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <div className="relative">
                <select
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                  className="appearance-none bg-transparent text-sm font-semibold text-slate-700 uppercase tracking-wider focus:outline-none cursor-pointer pr-6 py-1"
                >
                  {Object.entries(LANGUAGES).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
              {sourceText && (
                <button
                  onClick={() => { setSourceText(''); setTranslatedText(''); setError(''); }}
                  className="text-slate-400 hover:text-red-600 transition-colors p-1 rounded-md hover:bg-red-50"
                  title="Mətni sil"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Tərcümə etmək istədiyiniz mətni bura yazın..."
              className="flex-1 w-full p-4 min-h-[300px] lg:min-h-[400px] resize-none focus:outline-none text-slate-800 text-lg leading-relaxed placeholder:text-slate-400"
              spellCheck="false"
            />
            <div className="p-4 bg-white border-t border-slate-100 flex justify-end">
              <button
                onClick={handleTranslate}
                disabled={!sourceText.trim() || isTranslating}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {isTranslating ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Tərcümə edilir...
                  </>
                ) : (
                  <>
                    Tərcümə et
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Translation Indicator / Swap Button */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 items-center justify-center">
            <button
              onClick={handleSwap}
              className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              title="Dilləri dəyiş"
            >
              <ArrowLeftRight size={20} />
            </button>
          </div>

          {/* Target Text Area */}
          <div className="flex flex-col bg-slate-50 rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 bg-slate-100/50 flex justify-between items-center">
              <div className="relative">
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="appearance-none bg-transparent text-sm font-semibold text-slate-700 uppercase tracking-wider focus:outline-none cursor-pointer pr-6 py-1"
                >
                  {Object.entries(LANGUAGES).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
              {translatedText && (
                <button
                  onClick={handleCopy}
                  className="text-slate-500 hover:text-indigo-600 transition-colors p-1 rounded-md hover:bg-indigo-50 flex items-center gap-1.5 text-sm font-medium"
                  title="Kopyala"
                >
                  {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                  {copied ? <span className="text-emerald-600">Kopyalandı</span> : <span>Kopyala</span>}
                </button>
              )}
            </div>
            <div className="flex-1 w-full p-4 min-h-[300px] lg:min-h-[400px] relative">
              {error ? (
                <div className="text-red-600 bg-red-50 p-4 rounded-xl border border-red-100">
                  {error}
                </div>
              ) : translatedText ? (
                <div className="text-slate-900 text-lg leading-relaxed whitespace-pre-wrap">
                  {translatedText}
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-lg">
                  Tərcümə burada görünəcək
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
