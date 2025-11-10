'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { AI_PROVIDERS } from '@/utils/ai';
import type { AIProvider } from '@/utils/ai';

const AnimatePageContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';
  const providerId = searchParams?.get('ai') || 'chatgpt';
  const isInIframe = searchParams?.get('iframe') === 'true';
  
  const [provider, setProvider] = useState<AIProvider | null>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [currentStep, setCurrentStep] = useState<'typing' | 'clicking' | 'redirecting'>('typing');
  const [showRedirect, setShowRedirect] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(2);

  // Set provider
  useEffect(() => {
    const foundProvider = Object.values(AI_PROVIDERS).find(
      (p) => p.id === providerId
    ) || AI_PROVIDERS.chatgpt;
    setProvider(foundProvider);
  }, [providerId]);

  // Typing animation with step progression
  useEffect(() => {
    if (!query || !provider) return;

    // Step 0: Wait for cursor to move to input (2 seconds for animation)
    const cursorMoveTimer = setTimeout(() => {
      let index = 0;
      const typingSpeed = 200;

      const typingInterval = setInterval(() => {
        if (index <= query.length) {
          setDisplayedText(query.substring(0, index));
          index++;
        } else {
          clearInterval(typingInterval);
          // Move to clicking step (cursor moves to button)
          setTimeout(() => {
            setCurrentStep('clicking');
            // Wait 2 seconds for mouse to move to button
            setTimeout(() => {
              // Wait another 1 second, then redirect
              setTimeout(() => {
                setCurrentStep('redirecting');
                setShowRedirect(true);
                setRedirectCountdown(2);
              }, 1000);
            }, 2000);
          }, 500);
        }
      }, typingSpeed);

      return () => clearInterval(typingInterval);
    }, 2000); // Wait for cursor to reach input field

    return () => clearTimeout(cursorMoveTimer);
  }, [query, provider]);

  // Redirect countdown
  useEffect(() => {
    if (!showRedirect || isInIframe) return;

    if (redirectCountdown === 0) {
      const url = provider?.generateUrl(query);
      if (url) window.location.href = url;
      return;
    }

    const timer = setTimeout(() => {
      setRedirectCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [showRedirect, redirectCountdown, provider, query, isInIframe]);

  if (!provider) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Step Indicator at Top */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b-2 border-gray-300 py-4 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 flex items-center justify-around gap-8">
          <div className={`flex items-center gap-3 px-4 py-2 rounded-lg ${currentStep === 'typing' ? 'bg-blue-100 text-blue-600 font-bold animate-strong-pulse' : 'text-gray-500'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${currentStep === 'typing' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>1</div>
            <span className="text-lg">Type your prompt</span>
          </div>
          <div className={`flex items-center gap-3 px-4 py-2 rounded-lg ${currentStep === 'clicking' || currentStep === 'redirecting' ? 'bg-green-100 text-green-600 font-bold animate-strong-pulse' : 'text-gray-500'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${currentStep === 'clicking' || currentStep === 'redirecting' ? 'bg-green-600 text-white' : 'bg-gray-300'}`}>2</div>
            <span className="text-lg">{provider ? `Go to ${provider.name}` : 'Go to AI'}</span>
          </div>
        </div>
      </div>

      {/* Mouse Cursor Animation */}
      {currentStep === 'typing' && (
        <div className="mouse-cursor animate-mouse-to-input" />
      )}
      {currentStep === 'clicking' && (
        <div className="mouse-cursor animate-mouse-to-button" />
      )}

      {/* Top Redirect Banner */}
      {showRedirect && (
        <div className="fixed top-0 left-0 right-0 bg-white border-b-2 border-gray-300 py-4 shadow-sm">
          <div className="max-w-2xl mx-auto px-4 flex items-center justify-around gap-8">
            <div className={`flex items-center gap-3 px-4 py-2 rounded-lg ${currentStep === 'typing' ? 'bg-blue-100 text-blue-600 font-bold animate-strong-pulse' : 'text-gray-500'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${currentStep === 'typing' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>1</div>
              <span className="text-lg">Type your prompt</span>
            </div>
            <div className={`flex items-center gap-3 px-4 py-2 rounded-lg ${currentStep === 'clicking' || currentStep === 'redirecting' ? 'bg-green-100 text-green-600 font-bold animate-strong-pulse' : 'text-gray-500'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${currentStep === 'clicking' || currentStep === 'redirecting' ? 'bg-green-600 text-white' : 'bg-gray-300'}`}>2</div>
              <span className="text-lg">{provider ? `Go to ${provider.name}` : 'Go to AI'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Dramatic Message Box During Redirect */}
      {showRedirect && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md text-center animate-slide-up">
            <div className="mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={provider.logo} alt={provider.name} className="w-24 h-24 object-contain mx-auto" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">See, it&apos;s not that hard!</h2>
            <p className="text-lg text-gray-600 mb-8">Just type your question and let the AI do the magic ✨</p>
            <p className="text-sm text-gray-500">Redirecting in {redirectCountdown}s...</p>
          </div>
        </div>
      )}

      <div className={`w-full max-w-2xl ${showRedirect ? 'mt-32' : 'mt-24'}`}>
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={provider.logo} alt={provider.name} className="w-24 h-24 object-contain" />
              <div>
                <p className="text-gray-600 text-lg">Ready to help</p>
              </div>
            </div>

            {/* Search Input Simulation with Moving Cursor */}
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-white border-2 border-gray-300 shadow-md">
              <div className="flex-1">
                <div className="text-2xl font-bold text-gray-900 leading-tight">
                  <span>{displayedText}</span>
                  {currentStep === 'typing' && (
                    <span className="animate-pulse text-blue-500">|</span>
                  )}
                </div>
              </div>
            </div>

            {/* Search Button */}
            <button
              disabled={currentStep === 'typing'}
              className={`w-full mt-6 py-4 px-6 rounded-lg font-bold text-lg transition-all text-center ${
                currentStep === 'typing'
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-400/50'
              }`}
            >
              {provider ? `Go to ${provider.name}` : 'Go to AI'}
            </button>

            {/* Checkmark Animation */}
            {currentStep === 'clicking' && (
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
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600 mt-8">
          <p>Let me Ask AI for you</p>
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
