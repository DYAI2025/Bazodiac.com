import React from 'react';
import { Agent } from '../types';
import { Badge } from './ui/Badge';
import { Check, Sparkles } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
  onSelect: (agent: Agent) => void;
}

// Simple internal component for flag SVGs to keep the main component clean
const FlagIcon: React.FC<{ lang: string }> = ({ lang }) => {
  const getFlagData = (code: string) => {
    switch (code) {
      case 'en': return { name: 'English', path: <g><path fill="#fff" d="M0 0h640v480H0z"/><path fill="#00247d" d="M0 0h640v480H0z"/><path stroke="#fff" strokeWidth="60" d="M0 0l640 480M640 0L0 480"/><path stroke="#cf142b" strokeWidth="40" d="M0 0l640 480M640 0L0 480"/><path stroke="#fff" strokeWidth="100" d="M320 0v480M0 240h640"/><path stroke="#cf142b" strokeWidth="60" d="M320 0v480M0 240h640"/></g> };
      case 'de': return { name: 'German', path: <g><path fill="#ffce00" d="M0 320h640v160H0z"/><path fill="#000" d="M0 0h640v160H0z"/><path fill="#d00" d="M0 160h640v160H0z"/></g> };
      case 'fr': return { name: 'French', path: <g><path fill="#fff" d="M0 0h640v480H0z"/><path fill="#002395" d="M0 0h213.3v480H0z"/><path fill="#ed2939" d="M426.7 0H640v480H426.7z"/></g> };
      case 'es': return { name: 'Spanish', path: <g><path fill="#AA151B" d="M0 0h640v480H0z"/><path fill="#F1BF00" d="M0 120h640v240H0z"/></g> };
      case 'it': return { name: 'Italian', path: <g><path fill="#fff" d="M0 0h640v480H0z"/><path fill="#009246" d="M0 0h213.3v480H0z"/><path fill="#ce2b37" d="M426.7 0H640v480H426.7z"/></g> };
      case 'pt': return { name: 'Portuguese', path: <g><path fill="#ff0000" d="M256 0h384v480H256z"/><path fill="#006600" d="M0 0h256v480H0z"/><circle cx="256" cy="240" r="80" fill="#ffff00" /><path fill="#fff" d="M256 195c-30 0-50 15-50 50v35c0 40 20 60 50 60s50-20 50-60v-35c0-35-20-50-50-50z"/><path fill="#ff0000" d="M256 210v115" stroke="#ff0000" strokeWidth="30"/><path fill="none" stroke="#fff" strokeWidth="10" d="M256 210v115M230 250h52"/></g> };
      default: return { name: code, path: null };
    }
  };

  const { name, path } = getFlagData(lang);

  return (
    <div
      className="relative group/flag flex-shrink-0"
      title={name}
    >
      <svg
        viewBox="0 0 640 480"
        className="w-4 h-3 rounded-[1px] shadow-sm transition-all duration-300"
        // The filter creates the bronze tint: grayscale -> sepia -> slight hue rotate for gold tone -> low contrast
        style={{
          filter: 'grayscale(100%) sepia(100%) hue-rotate(20deg) brightness(0.9) contrast(0.8)'
        }}
      >
        {path}
      </svg>
      {/* Fallback border to define shape if contrast is too low */}
      <div className="absolute inset-0 rounded-[1px] ring-1 ring-inset ring-black/10 dark:ring-white/20 pointer-events-none mix-blend-multiply dark:mix-blend-overlay"></div>
    </div>
  );
};

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onSelect }) => {
  return (
    <div className="group relative flex flex-col h-full bg-gradient-to-br from-white/70 via-white/60 to-lavender-50/30 dark:from-navy-900/50 dark:via-navy-900/40 dark:to-navy-950/30 backdrop-blur-xl border-hairline border-lavender-300/40 dark:border-lavender-500/15 rounded-3xl p-8 sm:p-10 transition-all duration-700 hover:shadow-luxury-xl hover:shadow-pastel-glow dark:hover:shadow-gold-glow hover:-translate-y-2 hover:border-lavender-400/60 dark:hover:border-gold-500/30 hover:scale-[1.02] overflow-visible">

      {/* Eyebrow Label */}
      <div className="relative z-10 mb-6 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-luxury font-semibold text-lavender-600/90 dark:text-lavender-400/90 transition-colors duration-300">
          {agent.eyebrow}
        </span>
        <div className="w-2 h-2 rounded-full bg-gradient-to-br from-lavender-400 to-gold-400 dark:from-lavender-500 dark:to-gold-500 opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 shadow-pastel-glow" />
      </div>

      {/* Header */}
      <div className="relative z-10 mb-5">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <h3 className="text-4xl font-serif text-mauve-700 dark:text-lavender-100 font-light tracking-tight group-hover:gradient-text-luxury transition-all duration-500">
            {agent.name}
          </h3>

          {/* Language Flags (Bronze Tinted) - Moved next to name */}
          {agent.languages && (
            <div className="flex items-center gap-1.5 pt-1.5 opacity-80 hover:opacity-100 transition-opacity overflow-visible">
              {agent.languages.map((lang) => (
                <FlagIcon key={lang} lang={lang} />
              ))}
            </div>
          )}
        </div>

        <p className="text-[11px] font-medium text-mauve-500 dark:text-mauve-400 mt-3 uppercase tracking-luxury">
          {agent.subtitle}
        </p>
      </div>

      {/* Description */}
      <p className="relative z-10 text-mauve-600 dark:text-lavender-200/90 leading-loose mb-8 font-light text-base border-l border-hairline border-lavender-300/50 dark:border-lavender-500/20 pl-5">
        {agent.blurb}
      </p>

      {/* Chips */}
      <div className="relative z-10 flex flex-wrap gap-2 gap-y-3 mb-8">
        {agent.chips.map((chip) => (
          <Badge key={chip}>{chip}</Badge>
        ))}
      </div>

      {/* Capabilities List */}
      <div className="relative z-10 mt-auto space-y-4 mb-10 bg-gradient-to-br from-white/50 via-lavender-50/30 to-champagne-50/20 dark:from-navy-900/30 dark:via-navy-950/20 dark:to-black/30 p-6 rounded-2xl border-hairline border-lavender-300/30 dark:border-lavender-500/10 backdrop-blur-md group-hover:shadow-luxury transition-all duration-500">
        <p className="text-[10px] font-semibold text-mauve-500 dark:text-mauve-400 uppercase tracking-luxury mb-2">
          Capabilities
        </p>
        {agent.capabilities.map((cap, idx) => (
          <div key={idx} className="flex items-start gap-4 text-sm text-mauve-600 dark:text-lavender-200/90">
            <Check className="w-4 h-4 text-lavender-600 dark:text-lavender-400 mt-0.5 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
            <span className="font-light leading-relaxed">{cap}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={() => onSelect(agent)}
        className="
          relative z-10 w-full overflow-hidden group/btn
          flex items-center justify-center gap-3 py-4 px-6 rounded-2xl
          bg-gradient-to-br from-lavender-500 via-mauve-500 to-rose-400
          dark:from-lavender-600/90 dark:via-mauve-600/90 dark:to-rose-500/90
          text-white dark:text-lavender-50
          font-light text-base tracking-wide
          transition-all duration-500 active:scale-95
          shadow-luxury-lg hover:shadow-luxury-xl hover:shadow-pastel-glow
          border-hairline border-white/20 dark:border-white/10
          hover:scale-[1.02]
        "
        aria-label={`Open chat with ${agent.name}`}
      >
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out" />
        <Sparkles className="w-5 h-5 transition-transform group-hover/btn:rotate-12 group-hover/btn:scale-110 duration-300 opacity-90" />
        <span className="relative z-10">Initialize Protocol</span>
      </button>

      {/* Luxury Gradient Glow Effect */}
      <div
        className="
          absolute inset-0 rounded-3xl z-0 pointer-events-none
          bg-gradient-to-br
          from-lavender-300/20 via-champagne-200/15 to-rose-200/20
          dark:from-lavender-500/8 dark:via-gold-500/6 dark:to-rose-500/8
          bg-[length:200%_200%]
          opacity-0 group-hover:opacity-100
          transition-opacity duration-1200 ease-in-out
          animate-gradient-shift
          blur-3xl
        "
      />
      
      {/* Shimmer Effect */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
      </div>
    </div>
  );
};