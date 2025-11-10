'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AI_PROVIDERS } from '@/utils/ai';
import type { AIProvider } from '@/utils/ai';

interface SearchParamsContextProps {
  children: (props: {
    queryParam: string | null;
    selectedProvider: AIProvider;
    setSelectedProvider: (provider: AIProvider) => void;
    autoStart: boolean;
  }) => React.ReactNode;
}

export const SearchParamsHandler: React.FC<SearchParamsContextProps> = ({ children }) => {
  const searchParams = useSearchParams();
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>(AI_PROVIDERS.chatgpt);
  const [autoStart, setAutoStart] = useState(false);

  useEffect(() => {
    const queryParam = searchParams.get('q');
    const providerParam = searchParams.get('ai');

    if (queryParam) {
      const provider = providerParam && AI_PROVIDERS[providerParam as keyof typeof AI_PROVIDERS]
        ? AI_PROVIDERS[providerParam as keyof typeof AI_PROVIDERS]
        : AI_PROVIDERS.chatgpt;

      setSelectedProvider(provider);
      setAutoStart(true);
    }
  }, [searchParams]);

  const queryParam = searchParams.get('q');

  return (
    <>
      {children({
        queryParam,
        selectedProvider,
        setSelectedProvider,
        autoStart,
      })}
    </>
  );
};
