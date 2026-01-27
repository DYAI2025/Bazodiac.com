import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, className = '' }) => {
  return (
    <span 
      className={`
        group/badge relative 
        inline-flex items-center justify-center
        px-5 py-2
        rounded-full
        
        /* Typography */
        text-[10px] uppercase tracking-luxury font-medium leading-none
        
        /* Base Appearance - Refined Pastel */
        bg-gradient-to-br from-lavender-100/60 via-champagne-100/50 to-rose-50/40
        text-mauve-600
        border-hairline border-lavender-300/40
        dark:from-lavender-900/20 dark:via-mauve-900/15 dark:to-navy-900/20
        dark:text-lavender-300
        dark:border-lavender-500/20
        backdrop-blur-md
        
        /* Hover Appearance - Luxury Glow */
        hover:border-lavender-400/60
        hover:from-lavender-200/70 hover:via-champagne-200/60 hover:to-gold-100/50
        hover:text-mauve-700
        hover:shadow-pastel-glow
        dark:hover:from-lavender-800/30 dark:hover:via-gold-900/20 dark:hover:to-mauve-800/25
        dark:hover:text-lavender-200
        dark:hover:border-gold-400/30
        dark:hover:shadow-gold-glow
        hover:-translate-y-0.5 hover:scale-105
        
        /* Transitions */
        transition-all duration-400 ease-out
        cursor-default select-none overflow-hidden
        
        ${className}
      `}
    >
      {/* Metallic Shimmer Effect on Hover */}
      <div className="absolute inset-0 -translate-x-full group-hover/badge:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/30 dark:via-gold-400/20 to-transparent pointer-events-none" />
      
      <span className="relative z-10 flex items-center gap-2">
         {/* Refined dot accent with gradient */}
        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-lavender-400 to-gold-400 dark:from-lavender-500 dark:to-gold-500 opacity-70 group-hover/badge:opacity-100 group-hover/badge:scale-125 transition-all duration-300" />
        {children}
      </span>
    </span>
  );
};