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
      <div className="mb-6 p-4 rounded-lg bg-gray-100 border-2 border-gray-300">
        {/* Browser URL bar simulation */}
        <div className="mb-4 p-3 rounded bg-gray-200 text-sm text-gray-700 font-mono border border-gray-400">
          {provider.id === 'chatgpt'
            ? `chatgpt.com/?prompt=${encodeURIComponent(query.substring(0, displayedText.length))}`
            : provider.id === 'copilot'
            ? `bing.com/chat?q=${encodeURIComponent(query.substring(0, displayedText.length))}`
            : `gemini.google.com/?prompt=${encodeURIComponent(query.substring(0, displayedText.length))}`}
        </div>

        {/* Search input simulation */}
        <div className="flex items-center gap-3 p-4 rounded-lg bg-white border-2 border-gray-300">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={provider.logo} alt={provider.name} className="w-12 h-12 object-contain" />
          <div className="flex-1">
            <div className="text-sm text-gray-600 mb-2">Searching {provider.name}...</div>
            <div className="typing-container">
              <span className="text-lg font-semibold text-gray-900">
                {displayedText}
              </span>
              {cursorVisible && (
                <span className="animate-pulse border-r-2 border-blue-500 ml-1">
                  &nbsp;
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
