import React, { useEffect, useRef, useState } from 'react';
import { Agent } from '../types';
import { X } from 'lucide-react';
import { CONVAI_SCRIPT_URL } from '../constants';

interface AgentModalProps {
  agent: Agent;
  onClose: () => void;
  isOpen: boolean;
}

export const AgentModal: React.FC<AgentModalProps> = ({ agent, onClose, isOpen }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 150);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Trap focus inside modal
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  // Insert the ElevenLabs widget as a custom element
  useEffect(() => {
    if (!isOpen || !widgetContainerRef.current) return;

    const container = widgetContainerRef.current;

    // Clear any existing widget
    container.innerHTML = '';

    // Create the elevenlabs-convai custom element
    const widget = document.createElement('elevenlabs-convai');
    widget.setAttribute('agent-id', agent.elevenlabsAgentId);
    container.appendChild(widget);

    // Load the script if not already loaded
    const existingScript = document.querySelector(`script[src="${CONVAI_SCRIPT_URL}"]`);
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = CONVAI_SCRIPT_URL;
      script.async = true;
      script.type = 'text/javascript';
      document.body.appendChild(script);
    }

    return () => {
      // Cleanup widget on unmount
      container.innerHTML = '';
    };
  }, [isOpen, agent.elevenlabsAgentId]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-mauve-900/30 dark:bg-black/70 backdrop-blur-lg transition-opacity duration-300 ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className={`relative w-full max-w-lg bg-gradient-to-br from-white/95 via-lavender-50/90 to-champagne-50/85 dark:from-navy-900/95 dark:via-navy-950/90 dark:to-black/85 rounded-t-3xl sm:rounded-3xl shadow-luxury-xl border-hairline border-lavender-300/40 dark:border-lavender-500/20 overflow-visible flex flex-col max-h-[90vh] sm:max-h-[85vh] focus:outline-none backdrop-blur-2xl ${isClosing ? 'animate-slide-down-fade' : 'animate-slide-up-fade'}`}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-hairline border-lavender-300/40 dark:border-lavender-500/20 bg-white/50 dark:bg-navy-900/50 backdrop-blur-xl">
          <div>
            <h2 id="modal-title" className="text-xl font-serif font-light text-mauve-700 dark:text-lavender-100">
              {agent.name}
            </h2>
            <p className="text-[11px] text-mauve-500 dark:text-mauve-400 uppercase tracking-luxury mt-1">
              {agent.subtitle}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2.5 rounded-full hover:bg-lavender-100/60 dark:hover:bg-navy-900/60 text-mauve-500 dark:text-lavender-400 transition-all duration-300 border-hairline border-transparent hover:border-lavender-300/50 dark:hover:border-lavender-500/30"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Widget Container */}
        <div className="flex-1 p-8 bg-gradient-to-br from-ivory-50/80 to-lavender-50/60 dark:from-navy-950/80 dark:to-black/60 flex flex-col items-center justify-center min-h-[400px] overflow-visible backdrop-blur-xl">
          {/* ElevenLabs Widget will be inserted here */}
          <div
            ref={widgetContainerRef}
            className="w-full h-full min-h-[300px] flex items-center justify-center overflow-visible"
          />

          <div className="mt-8 text-center px-8">
            <p className="text-xs text-mauve-500 dark:text-mauve-400 max-w-xs mx-auto leading-loose font-light">
              Interacting with {agent.name} via Quantum Voice Protocol.
              <br/>
              Microphone access may be required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};