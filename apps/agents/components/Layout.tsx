import React from 'react';
import { Search, Moon, Sun } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, isDarkMode, toggleTheme }) => {
  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-700 ease-in-out noise-texture ${
      isDarkMode 
        ? 'dark bg-gradient-to-br from-navy-900 via-navy-950 to-black text-slate-200' 
        : 'bg-gradient-to-br from-ivory-50 via-ivory to-champagne-50 text-stone-900'
    }`}>
      
      {/* Luxury Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 select-none">
        {/* Subtle gradient orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-lavender-200/20 via-transparent to-transparent blur-3xl opacity-40 dark:opacity-20 animate-float" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-champagne-300/20 via-transparent to-transparent blur-3xl opacity-40 dark:opacity-20 animate-float" style={{ animationDelay: '1s' }} />
        
        {/* Refined Watermark Text */}
        <h1 className="absolute -top-20 -left-20 text-[20vw] leading-none font-serif text-lavender-200/20 dark:text-lavender-500/5 opacity-50 dark:opacity-30 mix-blend-overlay font-light">
          ASTRO
        </h1>
        <h1 className="absolute top-[40%] -right-20 text-[20vw] leading-none font-serif text-champagne-300/20 dark:text-gold-500/5 opacity-50 dark:opacity-30 mix-blend-overlay font-light">
          AGENTS
        </h1>
      </div>

      {/* Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-12 pb-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="text-[10px] font-semibold tracking-luxury text-lavender-600 dark:text-lavender-400 mb-3 uppercase">
              System V.7.0
            </div>
            <h1 className="text-5xl font-serif font-light tracking-tight text-mauve-700 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-lavender-200 dark:via-champagne-300 dark:to-gold-400">
              Choose your agent
            </h1>
            <p className="mt-3 text-mauve-500 dark:text-mauve-300 max-w-md font-light text-base leading-relaxed">
              Select an intelligence interface to begin your consultation.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-5 w-full md:w-auto">
            <div className="relative flex-1 md:w-72 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-mauve-400 group-focus-within:text-lavender-600 dark:group-focus-within:text-lavender-400 transition-colors duration-300" />
              <input 
                type="text" 
                placeholder="Search agents..." 
                className="w-full pl-11 pr-5 py-3 rounded-full bg-white/60 dark:bg-navy-900/40 border-hairline border-lavender-300/50 dark:border-lavender-500/20 text-sm focus:outline-none focus:ring-1 focus:ring-lavender-400/30 dark:focus:ring-lavender-500/30 focus:border-lavender-400/50 dark:focus:border-lavender-500/30 transition-all duration-300 text-mauve-700 dark:text-lavender-100 backdrop-blur-md placeholder:text-mauve-400 dark:placeholder:text-mauve-400 shadow-luxury hover:shadow-luxury-lg"
              />
            </div>
            
            <button 
              onClick={toggleTheme}
              className="p-3 rounded-full bg-white/60 dark:bg-navy-900/40 border-hairline border-lavender-300/50 dark:border-lavender-500/20 hover:bg-lavender-50 dark:hover:bg-navy-900/60 text-mauve-600 dark:text-lavender-300 transition-all duration-300 backdrop-blur-md shadow-luxury hover:shadow-pastel-glow"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button className="hidden sm:flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-br from-lavender-500 to-mauve-500 dark:from-lavender-600/20 dark:to-mauve-600/20 dark:border-hairline dark:border-lavender-400/30 text-white dark:text-lavender-100 text-sm font-medium hover:shadow-pastel-glow dark:hover:shadow-gold-glow transition-all duration-300 shadow-luxury">
              <span className="font-light tracking-wide">Upgrade</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-hairline border-lavender-200/40 dark:border-lavender-500/10 bg-white/40 dark:bg-navy-950/40 backdrop-blur-xl mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <p className="text-[10px] font-semibold tracking-luxury text-mauve-500 dark:text-mauve-400 uppercase">
              Transparency Protocol
            </p>
            <p className="text-xs leading-loose text-mauve-500 dark:text-mauve-400 font-light">
              The astrological and calculating agents provided herein are for entertainment and reflective purposes only. 
              They do not predict the future with absolute certainty nor do they offer professional financial, legal, or medical advice. 
              User discretion is advised when interpreting quantum synthesis outputs.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};