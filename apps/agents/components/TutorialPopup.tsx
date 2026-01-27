import React, { useEffect, useRef, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { HelpCircle, X } from 'lucide-react';

interface TutorialPopupProps {
  storageKey?: string;
  forceOpen?: boolean;
}

// Safe localStorage helpers (SSR-safe)
function safeReadSeen(key: string): boolean {
  try {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(key) === 'true';
  } catch {
    return false;
  }
}

function safeWriteSeen(key: string): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, 'true');
    }
  } catch {
    // Ignore localStorage errors
  }
}

// Get all focusable elements within a container
function getFocusableElements(root: HTMLElement): HTMLElement[] {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'textarea:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');
  return Array.from(root.querySelectorAll<HTMLElement>(selector));
}

export const TutorialPopup: React.FC<TutorialPopupProps> = ({
  storageKey = 'celestia:tutorial_seen:v1',
  forceOpen = false,
}) => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastActiveElRef = useRef<HTMLElement | null>(null);
  const prevBodyOverflowRef = useRef<string>('');

  const titleId = useMemo(() => 'tutorial-popup-title', []);
  const descId = useMemo(() => 'tutorial-popup-desc', []);

  // Mount check for SSR safety
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if tutorial should show on mount
  useEffect(() => {
    if (!mounted) return;

    if (forceOpen) {
      setOpen(true);
      return;
    }

    const seen = safeReadSeen(storageKey);
    if (!seen) setOpen(true);
  }, [mounted, forceOpen, storageKey]);

  // Handle focus trap, escape key, and scroll lock
  useEffect(() => {
    if (!mounted || !open) return;

    // Save current focus
    lastActiveElRef.current = document.activeElement as HTMLElement | null;

    // Lock scroll
    prevBodyOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Move focus into dialog
    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
        return;
      }

      if (e.key === 'Tab') {
        const root = dialogRef.current;
        if (!root) return;

        const focusables = getFocusableElements(root);
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (e.shiftKey) {
          if (!active || active === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (!active || active === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);

      // Restore scroll
      document.body.style.overflow = prevBodyOverflowRef.current;

      // Restore focus
      lastActiveElRef.current?.focus?.();
      lastActiveElRef.current = null;
    };
  }, [mounted, open]);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setIsClosing(true);
    setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
      safeWriteSeen(storageKey);
    }, 150);
  }

  if (!mounted) return null;

  return (
    <>
      {/* Launcher button - always visible */}
      <button
        type="button"
        onClick={handleOpen}
        aria-label="Open quick start tutorial"
        className="
          fixed z-40 right-4 bottom-4
          h-11 w-11 rounded-full
          border border-stone-200 dark:border-slate-700
          bg-white/80 dark:bg-navy-800/60
          text-stone-600 dark:text-slate-300
          shadow-lg backdrop-blur-sm
          inline-flex items-center justify-center
          hover:bg-stone-50 dark:hover:bg-navy-800
          hover:border-gold-400/50 dark:hover:border-gold-400/40
          hover:shadow-xl hover:shadow-gold-500/10
          active:scale-95
          transition-all duration-300
          focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2
        "
      >
        <HelpCircle className="w-5 h-5" />
      </button>

      {/* Modal overlay */}
      {open
        ? createPortal(
            <div
              className={`fixed inset-0 z-50 ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
              aria-hidden={false}
              onMouseDown={(e) => {
                if (e.target === e.currentTarget) handleClose();
              }}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

              {/* Dialog container */}
              <div
                className="absolute inset-0 flex items-end sm:items-center justify-center p-0 sm:p-4"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descId}
              >
                <div
                  ref={dialogRef}
                  className={`
                    w-full max-w-lg
                    rounded-t-2xl sm:rounded-2xl
                    border border-stone-200/80 dark:border-slate-700
                    bg-white dark:bg-slate-900
                    shadow-2xl
                    max-h-[90vh] overflow-y-auto
                    ${isClosing ? 'animate-slide-down-fade' : 'animate-slide-up-fade'}
                  `}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 p-5 border-b border-stone-100 dark:border-slate-800">
                    <div>
                      <h2
                        id={titleId}
                        className="text-xl font-serif font-semibold text-stone-900 dark:text-slate-100"
                      >
                        Quick Start
                      </h2>
                      <p
                        id={descId}
                        className="mt-1 text-sm text-stone-500 dark:text-slate-400"
                      >
                        A short guide to get the best answers from your agent.
                      </p>
                    </div>

                    <button
                      ref={closeBtnRef}
                      type="button"
                      onClick={handleClose}
                      className="
                        h-9 w-9 shrink-0 rounded-full
                        border border-stone-200 dark:border-slate-700
                        bg-white dark:bg-slate-800
                        text-stone-500 dark:text-slate-400
                        inline-flex items-center justify-center
                        hover:bg-stone-50 dark:hover:bg-slate-700
                        transition-colors
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400
                      "
                      aria-label="Close tutorial"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-4">
                    {/* Step 1 */}
                    <div className="rounded-xl border border-stone-100 dark:border-slate-800 bg-stone-50/50 dark:bg-black/20 p-4">
                      <h3 className="font-medium text-stone-900 dark:text-slate-100">
                        1) Ask directly
                      </h3>
                      <p className="mt-1 text-sm text-stone-600 dark:text-slate-400">
                        When you talk to an agent, simply ask about the things you're interested in.
                        The agent will respond and guide you through follow-up questions.
                      </p>
                    </div>

                    {/* Step 2 */}
                    <div className="rounded-xl border border-stone-100 dark:border-slate-800 bg-stone-50/50 dark:bg-black/20 p-4">
                      <h3 className="font-medium text-stone-900 dark:text-slate-100">
                        2) Have these birth details ready
                      </h3>
                      <p className="mt-1 text-sm text-stone-600 dark:text-slate-400">
                        For an accurate calculation, please share:
                      </p>
                      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-stone-600 dark:text-slate-400">
                        <li>Date of birth (DD/MM/YYYY)</li>
                        <li>Place of birth (City, Country)</li>
                        <li>
                          <span className="font-semibold text-stone-800 dark:text-slate-200">
                            Exact time of birth
                          </span>{' '}
                          (HH:MM) — this is the most important detail
                        </li>
                      </ul>
                      <p className="mt-3 text-sm text-stone-500 dark:text-slate-500">
                        If you don't know the birth time, the calculation can still be done, but it will be less precise.
                      </p>
                    </div>

                    {/* Step 3 */}
                    <div className="rounded-xl border border-stone-100 dark:border-slate-800 bg-stone-50/50 dark:bg-black/20 p-4">
                      <h3 className="font-medium text-stone-900 dark:text-slate-100">
                        3) Example prompts
                      </h3>
                      <ul className="mt-3 space-y-2 text-sm">
                        <li className="rounded-lg border border-stone-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 p-3 text-stone-700 dark:text-slate-300">
                          "Here are my birth details. Please calculate my chart and explain what it means."
                        </li>
                        <li className="rounded-lg border border-stone-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 p-3 text-stone-700 dark:text-slate-300">
                          "I'm mostly interested in relationships and career—what should I focus on?"
                        </li>
                        <li className="rounded-lg border border-stone-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 p-3 text-stone-700 dark:text-slate-300">
                          "Ask me the minimum questions you need to make the reading accurate."
                        </li>
                        <li className="rounded-lg border border-stone-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 p-3 text-stone-700 dark:text-slate-300">
                          "Summarize the key points first, then give details."
                        </li>
                      </ul>
                    </div>

                    {/* Privacy note */}
                    <p className="text-xs text-stone-400 dark:text-slate-500">
                      Privacy note: Only share what you're comfortable with.
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="p-5 pt-0 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="
                        h-10 rounded-xl px-4
                        border border-stone-200 dark:border-slate-700
                        bg-white dark:bg-slate-800
                        text-stone-700 dark:text-slate-300
                        font-medium text-sm
                        hover:bg-stone-50 dark:hover:bg-slate-700
                        transition-colors
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400
                      "
                    >
                      Got it
                    </button>

                    <button
                      type="button"
                      onClick={handleClose}
                      className="
                        h-10 rounded-xl px-4
                        bg-stone-900 dark:bg-ivory-100
                        text-stone-50 dark:text-navy-950
                        font-medium text-sm
                        hover:bg-stone-800 dark:hover:bg-white
                        shadow-lg shadow-stone-900/10 dark:shadow-none
                        transition-all
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400
                      "
                    >
                      Start chatting
                    </button>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
};

export default TutorialPopup;
