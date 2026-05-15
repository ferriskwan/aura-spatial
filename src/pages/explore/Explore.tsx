import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Home, 
  Ruler, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  MapPin,
  ClipboardList
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { DiscussionEmbed } from 'disqus-react';
import { useNavigate } from 'react-router-dom';

const THEMES = [
  { 
    id: 'japandi', 
    name: 'Japandi', 
    desc: 'Functional minimalism meets warm natural textures.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 'industrial', 
    name: 'Modern Industrial', 
    desc: 'Raw materials, exposed elements, and bold contrasts.',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 'bohemian', 
    name: 'Eclectic Bohemian', 
    desc: 'Vibrant colors, layered patterns, and global accents.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 'minimalist', 
    name: 'Zen Minimalist', 
    desc: 'Simplified living with clean lines and open spaces.',
    image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=400' 
  },
];

type Step = 'theme' | 'specs' | 'transform' | 'success';

export default function Explore() {
  const [step, setStep] = useState<Step>('theme');
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNextStep = () => {
    if (step === 'theme') setStep('specs');
    else if (step === 'specs') {
      setStep('transform');
      setTimeout(() => {
        setStep('success');
      }, 3500);
    }
  };

  const handleBack = () => {
    if (step === 'specs') setStep('theme');
  };

  const currentTheme = THEMES.find(t => t.id === selectedTheme);

  return (
    <div className="mx-auto max-w-4xl py-12">
      {/* Progress Stepper */}
      <div className="mb-12 flex items-center justify-between px-4 sm:px-0">
        {[
          { id: 'theme', label: 'Choose Theme', icon: Sparkles },
          { id: 'specs', label: 'Define Scope', icon: Ruler },
          { id: 'transform', label: 'Synthesize RFQ', icon: ClipboardList }
        ].map((s, i) => (
          <div key={s.id} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500",
                step === s.id || (step === 'transform' && s.id === 'specs') || step === 'success'
                ? "border-indigo-600 bg-indigo-600 text-white" 
                : "border-neutral-200 bg-white text-neutral-400"
              )}>
                <s.icon size={18} />
              </div>
              <span className={cn(
                "hidden text-[10px] font-bold uppercase tracking-widest sm:block",
                step === s.id ? "text-indigo-600" : "text-neutral-400"
              )}>
                {s.label}
              </span>
            </div>
            {i < 2 && (
              <div className={cn(
                "mx-4 h-[2px] flex-1 transition-colors duration-500",
                (step === 'specs' && i === 0) || step === 'transform' || step === 'success' ? "bg-indigo-600" : "bg-neutral-200"
              )} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 'theme' && (
          <motion.div
            key="theme"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold font-display">The Spark</h1>
              <p className="text-neutral-500 max-w-xl mx-auto">
                Begin your journey by selecting a visual direction. This theme will anchor your entire project and guide your future Request-for-Quote.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {THEMES.map((theme) => (
                <div
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={cn(
                    "group relative cursor-pointer overflow-hidden rounded-[32px] border-4 transition-all duration-300",
                    selectedTheme === theme.id 
                    ? "border-indigo-600 shadow-2xl scale-[1.02]" 
                    : "border-transparent hover:border-indigo-200"
                  )}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src={theme.image} 
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      alt={theme.name} 
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 text-white">
                    <h3 className="text-xl font-bold font-display">{theme.name}</h3>
                    <p className="mt-1 text-xs text-white/70 line-clamp-1">{theme.desc}</p>
                    {selectedTheme === theme.id && (
                      <motion.div 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        className="absolute bottom-6 right-6 flex h-8 w-8 items-center justify-center rounded-full bg-white text-indigo-600"
                      >
                        <CheckCircle2 size={18} />
                      </motion.div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-8">
              <button
                disabled={!selectedTheme}
                onClick={handleNextStep}
                className={cn(
                  "flex items-center gap-2 rounded-full px-12 py-4 text-sm font-bold transition-all",
                  selectedTheme 
                  ? "bg-indigo-600 text-white shadow-xl hover:bg-indigo-700 hover:scale-105 active:scale-95" 
                  : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                )}
              >
                Next: Furnish Info <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 'specs' && (
          <motion.div
            key="specs"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                <ArrowLeft size={16} /> Change Theme
              </button>
              <div className="flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1 text-[10px] font-bold text-indigo-600 uppercase">
                Selected: {currentTheme?.name}
              </div>
            </div>

            <div className="rounded-[40px] border border-neutral-200 bg-white p-8 md:p-12 shadow-sm">
              <div className="mb-10 text-center space-y-2">
                <h2 className="text-3xl font-bold font-display">Property Specifications</h2>
                <p className="text-sm text-neutral-500">Provide the technical details for your "Book-of-Work" drafting.</p>
              </div>

              <form className="space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400">
                      <Home size={14} /> Property Type
                    </label>
                    <select className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-4 text-sm focus:border-indigo-600 focus:bg-white focus:outline-none transition-all">
                      <option>HDB (3-Room or smaller)</option>
                      <option selected>HDB (4-Room / 5-Room)</option>
                      <option>Executive Condominium</option>
                      <option>Landed property</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400">
                      <MapPin size={14} /> Location
                    </label>
                    <input 
                      placeholder="e.g. Sengkang West Way"
                      className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-4 text-sm focus:border-indigo-600 focus:bg-white focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400">
                      <Ruler size={14} /> Living Area (sqm)
                    </label>
                    <input 
                      type="number" 
                      defaultValue="92"
                      className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-4 text-sm focus:border-indigo-600 focus:bg-white focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400">
                      <DollarSign size={14} /> Renovation Budget
                    </label>
                    <input 
                      type="number" 
                      defaultValue="50000"
                      className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-4 text-sm focus:border-indigo-600 focus:bg-white focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400">
                    <ClipboardList size={14} /> Specific Requirements / Scope
                  </label>
                  <textarea 
                    placeholder="Describe specific tasks: hacker flooring, masonry works, customized kitchen carpentry..."
                    className="min-h-[160px] w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-4 text-sm focus:border-indigo-600 focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full rounded-2xl bg-indigo-600 py-5 text-sm font-bold text-white shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-700 hover:scale-[1.01] active:scale-95"
                >
                  Generate Professional RFQ
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {step === 'transform' && (
          <motion.div
            key="transform"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center space-y-8 py-20"
          >
            <div className="relative">
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="h-32 w-32 rounded-full border-4 border-indigo-50 border-t-indigo-600"
              />
              <Sparkles className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600" size={40} />
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold font-display">System Task: Synthesis</h2>
              <p className="text-neutral-500 max-w-xs mx-auto">
                Transforming house specs & "{currentTheme?.name}" theme into a professional Request-for-Quote document...
              </p>
            </div>
            <div className="flex gap-2">
              {[0,1,2,3].map(i => (
                <motion.div 
                  key={i}
                  animate={{ 
                    opacity: [0.3, 1, 0.3],
                    y: [0, -4, 0]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1, 
                    delay: i * 0.15 
                  }}
                  className="h-2 w-2 rounded-full bg-indigo-500"
                />
              ))}
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center space-y-8 py-20"
          >
            <div className="h-24 w-24 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
              <CheckCircle2 size={48} />
            </div>
            <div className="space-y-3">
              <h2 className="text-4xl font-bold font-display">RFQ Published!</h2>
              <p className="text-neutral-500 max-w-md mx-auto">
                Your professional request has been sent to our designer marketplace. IDs will now evaluation your scope and submit competitive bids.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => window.location.href = '/status/'}
                className="flex items-center gap-2 rounded-full bg-neutral-900 px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-neutral-800 hover:scale-105 active:scale-95"
              >
                Track Bidding & Selection <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <DiscussionEmbed
          shortname='pendulum-3'
          config={
              {
                  url: 'http://localhost:5173/',
                  identifier: '123',
                  title: 'New Title',
                  language: 'en_US' 
              }
          }
      />
    </div>
  );
}