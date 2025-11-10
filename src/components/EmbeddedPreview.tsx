'use client';

import React from 'react';
import type { AIProvider } from '@/utils/ai';

interface EmbeddedPreviewProps {
  url: string;
  provider: AIProvider;
  isVisible: boolean;
}

export const EmbeddedPreview: React.FC<EmbeddedPreviewProps> = ({
  url,
  provider,
  isVisible,
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="w-full mt-8 animate-slide-in">
      <div className="rounded-lg overflow-hidden bg-white border-2 border-gray-300 shadow-lg">
        <div className="px-4 py-3 bg-gray-100 border-b-2 border-gray-300">
          <p className="text-sm text-gray-700">
            <span className="mr-2">{provider.icon}</span>
            <span className="font-semibold">{provider.name} - What you&apos;ll see</span>
          </p>
        </div>

        <div className="relative w-full bg-white" style={{ height: '500px' }}>
          <div className="flex flex-col h-full">
            {/* Mock Header */}
            <div className={`${provider.headerBg} text-white border-b border-slate-200 p-4`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black text-sm font-bold">
                  {provider.icon}
                </div>
                <div>
                  <h2 className="font-semibold">{provider.name}</h2>
                  <p className="text-xs opacity-80">Ready to help</p>
                </div>
              </div>
            </div>

            {/* Mock Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-white">
              {/* Your Question */}
              <div className="flex justify-end">
                <div className={`${provider.bubbleColor} text-white rounded-lg p-3 max-w-xs`}>
                  <p className="text-sm break-words">{decodeURIComponent(url.split('prompt=')[1] || url.split('q=')[1] || 'Your question')}</p>
                </div>
              </div>

              {/* AI Response */}
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-900 rounded-lg p-3 max-w-xs">
                  <p className="text-sm text-gray-700">Thinking...</p>
                  <div className="mt-2 flex gap-1">
                    <div className={`w-2 h-2 ${provider.bubbleColor.replace('bg-', 'bg-')} rounded-full animate-bounce`}></div>
                    <div className={`w-2 h-2 ${provider.bubbleColor.replace('bg-', 'bg-')} rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
                    <div className={`w-2 h-2 ${provider.bubbleColor.replace('bg-', 'bg-')} rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t-2 border-gray-300 bg-white p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Message..."
                  className="flex-1 border-2 border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  disabled
                />
                <button className={`px-4 py-2 ${provider.color.replace('from-', 'from-').replace('to-', 'to-')} bg-gradient-to-r text-white rounded-lg text-sm font-medium opacity-60 cursor-not-allowed`}>
                  ↑
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* URL Display */}
      <div className="mt-4 p-4 rounded-lg bg-gray-50 border-2 border-gray-300">
        <p className="text-xs text-gray-600 mb-2">Generated URL will open:</p>
        <p className="text-sm text-gray-700 break-all">
          <code className="text-blue-600">{url}</code>
        </p>
      </div>

      {/* Action Button */}
      <div className="mt-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full block px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg hover:shadow-green-500/50 text-white rounded-lg font-semibold text-center transition-all"
        >
          Open {provider.name} with Your Question →
        </a>
      </div>
    </div>
  );
};
