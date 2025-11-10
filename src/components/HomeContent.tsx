'use client';

import { useState } from 'react';
import { AI_PROVIDERS, copyToClipboard } from '@/utils/ai';
import { PreviewAnimation } from '@/components/PreviewAnimation';
import type { AIProvider } from '@/utils/ai';

interface HomeContentProps {
  initialQuery?: string | null;
  initialProvider?: AIProvider;
  autoStart?: boolean;
}

export const HomeContent: React.FC<HomeContentProps> = ({
  initialQuery = null,
  initialProvider = AI_PROVIDERS.chatgpt,
  autoStart = false,
}) => {
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>(initialProvider || AI_PROVIDERS.chatgpt);
  const [query, setQuery] = useState(initialQuery || '');
  const [showPreview, setShowPreview] = useState(autoStart && !!initialQuery);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [fullUrl, setFullUrl] = useState('');
  const [copiedMessage, setCopiedMessage] = useState('');
  const [showEmbedded, setShowEmbedded] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setShowPreview(true);
    setAnimationComplete(false);
    setFullUrl('');
  };

  const handleAnimationComplete = async () => {
    setAnimationComplete(true);

    const fullUrlGenerated = selectedProvider.generateUrl(query);
    setFullUrl(fullUrlGenerated);
  };

  const handleCopy = async (text: string, type: 'full' | 'short') => {
    setIsCopying(true);
    const success = await copyToClipboard(text);

    if (success) {
      setCopiedMessage(type === 'full' ? 'Full URL copied!' : 'Short URL copied!');
      setTimeout(() => setCopiedMessage(''), 2000);
    }

    setIsCopying(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 mb-12">
          <h1 className="text-5xl font-bold text-gray-900">
            Ask AI For You
          </h1>
          <p className="text-gray-600 text-lg">
            Generate links to ask ChatGPT, Copilot, or Gemini anything
          </p>
        </div>

        {/* AI Provider Selection */}
        {!showPreview && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {Object.values(AI_PROVIDERS).map((provider) => (
              <button
                key={provider.id}
                onClick={() => setSelectedProvider(provider)}
                className={`py-6 px-4 rounded-lg transition-all transform hover:scale-110 flex items-center justify-center ${
                  selectedProvider.id === provider.id
                    ? `bg-gradient-to-r ${provider.color} shadow-lg ring-4 ring-offset-2 ring-blue-400`
                    : 'bg-gray-100 hover:bg-gray-200 border-2 border-gray-300'
                }`}
              >
                <img src={provider.logo} alt={provider.name} className="w-14 h-14 object-contain" />
              </button>
            ))}
          </div>
        )}

        {/* Search Input */}
        {!showPreview && (
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="w-full px-6 py-4 rounded-lg bg-white border-2 border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all"
              />
            </div>

            <button
              onClick={handleSearch}
              disabled={!query.trim()}
              className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-blue-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
            >
              Generate Link
            </button>
          </div>
        )}

        {/* Preview Animation */}
        {showPreview && (
          <PreviewAnimation
            query={query}
            provider={selectedProvider}
            isActive={!animationComplete}
            onAnimationComplete={handleAnimationComplete}
          />
        )}

        {/* Result Section */}
        {showPreview && animationComplete && (
          <div className="space-y-4 animate-slide-in">
            {/* Share URL - Now First */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border-3 border-purple-400 shadow-lg">
              <div className="text-sm font-semibold text-purple-900 mb-3">Shareable Link (with animation):</div>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm bg-gray-900 p-4 rounded-lg border-2 border-purple-400 overflow-x-auto text-white font-mono break-all text-base">
                  {`${typeof window !== 'undefined' ? window.location.origin : ''}/animate?q=${encodeURIComponent(query)}&ai=${selectedProvider.id}`}
                </code>
                <button
                  onClick={() => {
                    const shareUrl = `/animate?q=${encodeURIComponent(query)}&ai=${selectedProvider.id}`;
                    handleCopy(`${typeof window !== 'undefined' ? window.location.origin : ''}${shareUrl}`, 'full');
                  }}
                  disabled={isCopying}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded text-sm font-semibold whitespace-nowrap transition-all"
                >
                  {copiedMessage === 'Full URL copied!' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <p className="text-xs text-purple-800 mt-3 font-medium">📤 Share this link to show the animation to others!</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => {
                  setShowPreview(false);
                  setQuery('');
                  setAnimationComplete(false);
                  setShowEmbedded(false);
                }}
                className="flex-1 py-3 px-6 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold transition-all border-3 border-gray-500 shadow-md"
              >
                ← New Search
              </button>

              <button
                onClick={() => setShowEmbedded(!showEmbedded)}
                className={`flex-1 py-3 px-6 rounded-lg bg-gradient-to-r ${selectedProvider.color} hover:shadow-lg flex items-center justify-center gap-2 text-black font-bold text-lg transition-all border-2 border-black shadow-md`}
              >
                <img src={selectedProvider.logo} alt={selectedProvider.name} className="w-6 h-6 object-contain" />
                {showEmbedded ? 'Hide' : 'Show'}
              </button>

              <a
                href={fullUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 py-3 px-6 rounded-lg bg-gradient-to-r ${selectedProvider.color} hover:shadow-lg flex items-center justify-center gap-2 text-black font-bold text-lg text-center transition-all border-2 border-black shadow-md`}
              >
                <img src={selectedProvider.logo} alt={selectedProvider.name} className="w-6 h-6 object-contain" />
                Open
              </a>
            </div>

            {/* Embedded Preview - Full Animation */}
            {showEmbedded && (
              <div className="mt-8 p-8 rounded-xl bg-gray-50 border-2 border-gray-300 shadow-lg animate-slide-in">
                {/* Browser URL bar */}
                <div className="mb-6 p-4 rounded-lg bg-gray-200 text-sm text-gray-700 font-mono border border-gray-400 overflow-x-auto">
                  <span className="text-gray-500">📍 </span>
                  {selectedProvider.id === 'chatgpt'
                    ? `chatgpt.com/?prompt=${encodeURIComponent(query)}`
                    : selectedProvider.id === 'copilot'
                    ? `bing.com/chat?q=${encodeURIComponent(query)}`
                    : `gemini.google.com/?prompt=${encodeURIComponent(query)}`}
                </div>

                {/* Main Search/Input Area */}
                <div className="space-y-6">
                  {/* Provider Header */}
                  <div className="flex items-center gap-4">
                    <img src={selectedProvider.logo} alt={selectedProvider.name} className="w-20 h-20 object-contain" />
                    <div>
                      <p className="text-gray-600 text-lg">Ready to help</p>
                    </div>
                  </div>

                  {/* Search Input Simulation with Typing Animation */}
                  <div className="flex items-center gap-4 p-6 rounded-2xl bg-white border-2 border-gray-300 shadow-md">
                    <div className="flex-1">
                      <div className="text-2xl font-bold text-gray-900 leading-tight">
                        <span>{query}</span>
                        <span className="animate-pulse text-blue-500">|</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 1 Label */}
                  <div className="text-center mt-4 text-lg font-semibold text-blue-600 animate-pulse">
                    ✏️ Step 1: Type your question...
                  </div>

                  {/* Search Button */}
                  <button className="w-full mt-6 py-4 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg hover:shadow-lg">
                    Search
                  </button>

                  {/* Step 2 Label */}
                  <div className="text-center mt-4 text-lg font-semibold text-green-600 animate-pulse">
                    🖱️ Step 2: Click the search button...
                  </div>

                  {/* Checkmark Animation */}
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

                  {/* Step 3 Label */}
                  <div className="text-center mt-4 text-lg font-semibold text-purple-600 animate-pulse">
                    🚀 Step 3: Redirect!
                  </div>
                </div>

                {/* Message */}
                <div className="mt-8 text-center p-6 rounded-xl bg-blue-50 border-2 border-blue-300 shadow-lg">
                  <p className="text-blue-700">
                    This is what will happen when someone clicks your link!
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 right-4 text-gray-500 text-sm">
        <a
          href="https://github.com/elicortez/letmeaskaiforyou"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-700 transition-colors"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
};
