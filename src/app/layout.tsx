import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Let me Ask AI for you',
  description: 'Generate links to ask ChatGPT, Copilot, or Gemini anything',
  icons: {
    icon: '🤖',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
