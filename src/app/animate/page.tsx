'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { AI_PROVIDERS } from '@/utils/ai';
import type { AIProvider } from '@/utils/ai';

const AnimatePageContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';
  const providerId = searchParams?.get('ai') || 'chatgpt';
  
  const [provider, setProvider] = useState<AIProvider | null>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showRedirect, setShowRedirect] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(3);

  // Set provider
  useEffect(() => {
    const foundProvider = Object.values(AI_PROVIDERS).find(
      (p) => p.id === providerId
    ) || AI_PROVIDERS.chatgpt;
    setProvider(foundProvider);
  }, [providerId]);

  // Typing animation
  useEffect(() => {
    if (!query || !provider) return;

    let index = 0;
    const typingSpeed = 120;

    const typingInterval = setInterval(() => {
      if (index <= query.length) {
        setDisplayedText(query.substring(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setAnimationComplete(true);
          setTimeout(() => {
            setShowRedirect(true);
          }, 800);
        }, 300);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [query, provider]);

  // Cursor blink
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 750);
    return () => clearInterval(blinkInterval);
  }, []);

  // Redirect countdown
  useEffect(() => {
    if (!showRedirect) return;

    if (redirectCountdown === 0) {
      const url = provider?.generateUrl(query);
      if (url) window.location.href = url;
      return;
    }

    const timer = setTimeout(() => {
      setRedirectCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [showRedirect, redirectCountdown, provider, query]);

  if (!provider) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Main Animation Container */}
        <div className="mb-6 p-6 rounded-xl bg-gray-50 border-2 border-gray-300 shadow-lg">
          {/* Browser URL bar */}
          <div className="mb-6 p-4 rounded-lg bg-gray-200 text-sm text-gray-700 font-mono border border-gray-400 overflow-x-auto">
            <span className="text-gray-500">📍 </span>
            {provider.id === 'chatgpt'
              ? `chatgpt.com/?prompt=${encodeURIComponent(displayedText)}`
              : provider.id === 'copilot'
              ? `bing.com/chat?q=${encodeURIComponent(displayedText)}`
              : `gemini.google.com/?prompt=${encodeURIComponent(displayedText)}`}
          </div>

          {/* Main Search/Input Area */}
          <div className="space-y-6">
            {/* Provider Header */}
            <div className="flex items-center gap-4">
              <span className="text-5xl">{provider.icon}</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{provider.name}</h1>
                <p className="text-gray-600 mt-1">Ready to help</p>
              </div>
            </div>

            {/* Search Input Simulation */}
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-white border-2 border-gray-300 shadow-md">
              <div className="flex-1">
                <div className="typing-container">
                  <span className="text-2xl font-bold text-gray-900">
                    {displayedText}
                  </span>
                  {!animationComplete && cursorVisible && (
                    <span className="animate-pulse border-r-2 border-blue-500 ml-1">
                      &nbsp;
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Results appearing */}
            {displayedText.length > query.length * 0.4 && (
              <div className="animate-fade-in space-y-3">
                <div className="p-4 rounded-lg bg-white border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-sm font-semibold text-gray-900">
                    {query}
                  </div>
                  <div className="text-xs text-gray-600 mt-2">relevance.result.com</div>
                </div>

                <div className="p-4 rounded-lg bg-white border-l-4 border-gray-400 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-sm font-semibold text-gray-900">
                    More information about {query.split(' ')[0]}...
                  </div>
                  <div className="text-xs text-gray-600 mt-2">information.example.com</div>
                </div>

                <div className="p-4 rounded-lg bg-white border-l-4 border-gray-400 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-sm font-semibold text-gray-900">
                    Related searches
                  </div>
                  <div className="text-xs text-gray-600 mt-2">suggestions.example.com</div>
                </div>
              </div>
            )}
          </div>

          {/* Checkmark Animation */}
          {animationComplete && (
            <div className="mt-8 flex items-center justify-center">
              <div className="animate-bounce">
                <svg
                  className="w-12 h-12 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Redirect Message */}
        {showRedirect && (
          <div className="text-center animate-slide-in">
            <div className="mb-4 p-6 rounded-xl bg-blue-50 border-2 border-blue-300 shadow-lg">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">
                Ready! 🚀
              </h2>
              <p className="text-blue-700 mb-4">
                Redirecting to {provider.name}...
              </p>
              <div className="flex justify-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce"></div>
                <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <p className="text-blue-600 text-sm mt-4">
                Redirecting in {redirectCountdown}s...
              </p>
            </div>

            {/* Manual Redirect Button */}
            <button
              onClick={() => {
                const url = provider.generateUrl(query);
                window.location.href = url;
              }}
              className={`w-full py-4 px-6 rounded-xl bg-gradient-to-r ${provider.color} text-white font-bold text-lg hover:shadow-lg transition-all transform hover:scale-105`}
            >
              Click here if not redirected
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-gray-600 mt-8">
          <p>Ask AI For You</p>
        </div>
      </div>
    </div>
  );
};

export default function AnimatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><div className="text-gray-600">Loading...</div></div>}>
      <AnimatePageContent />
    </Suspense>
  );
}
