'use client';

import { useState } from 'react';
import { AI_PROVIDERS, shortenUrl, copyToClipboard } from '@/utils/ai';
import { PreviewAnimation } from '@/components/PreviewAnimation';
import { EmbeddedPreview } from '@/components/EmbeddedPreview';
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
  const [shortUrl, setShortUrl] = useState('');
  const [isCopying, setIsCopying] = useState(false);
  const [fullUrl, setFullUrl] = useState('');
  const [copiedMessage, setCopiedMessage] = useState('');
  const [showEmbedded, setShowEmbedded] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setShowPreview(true);
    setAnimationComplete(false);
    setShortUrl('');
    setFullUrl('');
  };

  const handleAnimationComplete = async () => {
    setAnimationComplete(true);

    const fullUrlGenerated = selectedProvider.generateUrl(query);
    setFullUrl(fullUrlGenerated);

    // Shorten the URL
    const shortened = await shortenUrl(fullUrlGenerated);
    setShortUrl(shortened);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Ask AI For You
          </h1>
          <p className="text-slate-400 text-lg">
            Generate links to ask ChatGPT, Copilot, or Gemini anything
          </p>
        </div>

        {/* AI Provider Selection */}
        {!showPreview && (
          <div className="grid grid-cols-3 gap-3 mb-8">
            {Object.values(AI_PROVIDERS).map((provider) => (
              <button
                key={provider.id}
                onClick={() => setSelectedProvider(provider)}
                className={`py-4 px-4 rounded-lg font-semibold transition-all transform hover:scale-105 flex flex-col items-center gap-2 ${
                  selectedProvider.id === provider.id
                    ? `bg-gradient-to-r ${provider.color} text-white shadow-lg`
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                <span className="text-3xl">{provider.icon}</span>
                <span className="text-sm">{provider.name.split(' ')[0]}</span>
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
                className="w-full px-6 py-4 rounded-lg bg-slate-700 bg-opacity-50 backdrop-blur border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg"
              />
            </div>

            <button
              onClick={handleSearch}
              disabled={!query.trim()}
              className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
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
            {/* Full URL */}
            <div className="p-4 rounded-lg bg-slate-700 bg-opacity-50 backdrop-blur border border-slate-600">
              <div className="text-sm text-slate-400 mb-2">Full URL:</div>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm bg-slate-800 p-3 rounded overflow-x-auto text-blue-300 font-mono">
                  {fullUrl}
                </code>
                <button
                  onClick={() => handleCopy(fullUrl, 'full')}
                  disabled={isCopying}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-sm font-semibold whitespace-nowrap transition-all"
                >
                  {copiedMessage === 'Full URL copied!' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Short URL */}
            {shortUrl && (
              <div className="p-4 rounded-lg bg-slate-700 bg-opacity-50 backdrop-blur border border-slate-600">
                <div className="text-sm text-slate-400 mb-2">Short URL:</div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-sm bg-slate-800 p-3 rounded overflow-x-auto text-green-300 font-mono">
                    {shortUrl}
                  </code>
                  <button
                    onClick={() => handleCopy(shortUrl, 'short')}
                    disabled={isCopying}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded text-sm font-semibold whitespace-nowrap transition-all"
                  >
                    {copiedMessage === 'Short URL copied!' ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            )}

            {/* Share URL */}
            <div className="p-4 rounded-lg bg-slate-700 bg-opacity-50 backdrop-blur border border-slate-600">
              <div className="text-sm text-slate-400 mb-2">Shareable Link (with animation):</div>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm bg-slate-800 p-3 rounded overflow-x-auto text-purple-300 font-mono break-all">
                  {`${typeof window !== 'undefined' ? window.location.origin : ''}/? q=${encodeURIComponent(query)}&ai=${selectedProvider.id}`}
                </code>
                <button
                  onClick={() => {
                    const shareUrl = `?q=${encodeURIComponent(query)}&ai=${selectedProvider.id}`;
                    handleCopy(`${typeof window !== 'undefined' ? window.location.origin : ''}${shareUrl}`, 'full');
                  }}
                  disabled={isCopying}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded text-sm font-semibold whitespace-nowrap transition-all"
                >
                  {copiedMessage === 'Full URL copied!' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-2">Share this link to show the animation to others!</p>
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
                className="flex-1 py-3 px-6 rounded-lg bg-slate-700 hover:bg-slate-600 font-semibold transition-all"
              >
                New Search
              </button>

              <button
                onClick={() => setShowEmbedded(!showEmbedded)}
                className={`flex-1 py-3 px-6 rounded-lg bg-gradient-to-r ${selectedProvider.color} hover:shadow-lg font-semibold transition-all`}
              >
                {showEmbedded ? 'Hide' : 'Show'} Preview
              </button>

              <a
                href={fullUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 py-3 px-6 rounded-lg bg-gradient-to-r ${selectedProvider.color} hover:shadow-lg font-semibold text-center transition-all`}
              >
                Go to {selectedProvider.name.split(' ')[0]}
              </a>
            </div>

            {/* Embedded Preview */}
            <EmbeddedPreview
              url={fullUrl}
              provider={selectedProvider}
              isVisible={showEmbedded}
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 right-4 text-slate-500 text-sm">
        <a
          href="https://github.com/elicortez/letmeaskaiforyou"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-slate-300 transition-colors"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
};
