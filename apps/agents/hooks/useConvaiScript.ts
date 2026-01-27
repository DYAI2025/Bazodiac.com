import { useEffect, useState } from 'react';
import { CONVAI_SCRIPT_URL } from '../constants';

declare global {
  interface Window {
    // ElevenLabs Convai widget types
    elevenlabs?: any;
  }
}

export const useConvaiScript = () => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector(`script[src="${CONVAI_SCRIPT_URL}"]`);

    if (existingScript) {
      setLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = CONVAI_SCRIPT_URL;
    script.async = true;
    script.type = 'text/javascript';

    script.onload = () => {
      // Wait a bit for the widget to be fully initialized
      setTimeout(() => {
        if (window.elevenlabs || document.querySelector('elevenlabs-convai')) {
          setLoaded(true);
        } else {
          setError('ElevenLabs widget not properly initialized');
        }
      }, 1000);
    };

    script.onerror = () => {
      setError('Failed to load ElevenLabs widget script');
    };

    document.body.appendChild(script);

    return () => {
      // Intentionally not removing script on unmount to persist across navigation/re-renders
      // as per requirement to load only once.
    };
  }, []);

  return { loaded, error };
};
