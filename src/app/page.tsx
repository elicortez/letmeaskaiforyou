'use client';

import { Suspense } from 'react';
import { SearchParamsHandler } from '@/components/SearchParamsHandler';
import { HomeContent } from '@/components/HomeContent';

function HomePageContent() {
  return (
    <SearchParamsHandler>
      {({ queryParam, selectedProvider, autoStart }) => (
        <HomeContent
          initialQuery={queryParam}
          initialProvider={selectedProvider}
          autoStart={autoStart}
        />
      )}
    </SearchParamsHandler>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      }
    >
      <HomePageContent />
    </Suspense>
  );
}
