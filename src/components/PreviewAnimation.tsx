'use client';

import React, { useState, useEffect } from 'react';
import { AIProvider } from '@/utils/ai';

interface PreviewAnimationProps {
  query: string;
  provider: AIProvider;
  isActive: boolean;
  onAnimationComplete: () => void;
}

export const PreviewAnimation: React.FC<PreviewAnimationProps> = ({
  query,
  provider,
  isActive,
  onAnimationComplete,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  // Simulate typing animation
  useEffect(() => {
    if (!isActive) {
      setDisplayedText('');
      return;
    }

    let index = 0;
    const typingSpeed = 120; // milliseconds per character - slower for more realistic feel

    const typingInterval = setInterval(() => {
      if (index <= query.length) {
        setDisplayedText(query.substring(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
        // Simulate a small delay before completion
        setTimeout(onAnimationComplete, 500);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [isActive, query, onAnimationComplete]);

  // Cursor blink animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 750);

    return () => clearInterval(blinkInterval);
  }, []);

  if (!isActive) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto animate-slide-in">
      <div className="mb-6 p-4 rounded-lg bg-slate-700 bg-opacity-50 backdrop-blur border border-slate-600">
        {/* Browser URL bar simulation */}
        <div className="mb-4 p-3 rounded bg-slate-800 text-sm text-slate-400 font-mono">
          {provider.id === 'chatgpt'
            ? `chatgpt.com/?prompt=${encodeURIComponent(query.substring(0, displayedText.length))}`
            : provider.id === 'copilot'
            ? `bing.com/chat?q=${encodeURIComponent(query.substring(0, displayedText.length))}`
            : `gemini.google.com/?prompt=${encodeURIComponent(query.substring(0, displayedText.length))}`}
        </div>

        {/* Search input simulation */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-600 bg-opacity-30">
            <span className="text-2xl">{provider.icon}</span>
            <div className="flex-1">
              <div className="text-sm text-slate-400 mb-2">Searching {provider.name}...</div>
              <div className="typing-container">
                <span className="text-lg font-semibold text-white">
                  {displayedText}
                </span>
                {cursorVisible && (
                  <span className="animate-pulse border-r-2 border-blue-400 ml-1">
                    &nbsp;
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Simulated search results preview */}
          {displayedText.length > query.length * 0.5 && (
            <div className="animate-fade-in space-y-3 mt-4">
              <div className="p-3 rounded bg-slate-600 bg-opacity-20 border-l-2 border-blue-400">
                <div className="text-sm text-slate-300 truncate">
                  First result for: &quot;{query}&quot;
                </div>
              </div>
              <div className="p-3 rounded bg-slate-600 bg-opacity-20">
                <div className="text-sm text-slate-300 truncate">
                  Second result...
                </div>
              </div>
              <div className="p-3 rounded bg-slate-600 bg-opacity-20">
                <div className="text-sm text-slate-300 truncate">
                  Third result...
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
