/**
 * Generate URLs for different AI assistants
 */

export interface AIProvider {
  id: 'chatgpt' | 'copilot' | 'gemini';
  name: string;
  icon: string;
  color: string;
  headerBg: string;
  bubbleColor: string;
  generateUrl: (query: string) => string;
}

export const AI_PROVIDERS: Record<string, AIProvider> = {
  chatgpt: {
    id: 'chatgpt',
    name: 'ChatGPT',
    icon: '🤖',
    color: 'from-slate-700 to-slate-900',
    headerBg: 'bg-gradient-to-r from-slate-900 to-slate-800',
    bubbleColor: 'bg-slate-500',
    generateUrl: (query: string) => {
      const encodedQuery = encodeURIComponent(query);
      return `https://chatgpt.com/?prompt=${encodedQuery}`;
    },
  },
  copilot: {
    id: 'copilot',
    name: 'Microsoft Copilot',
    icon: '✨',
    color: 'from-blue-500 to-cyan-500',
    headerBg: 'bg-gradient-to-r from-blue-600 to-cyan-600',
    bubbleColor: 'bg-blue-400',
    generateUrl: (query: string) => {
      return `https://www.bing.com/chat?q=${encodeURIComponent(query)}`;
    },
  },
  gemini: {
    id: 'gemini',
    name: 'Google Gemini',
    icon: '🎨',
    color: 'from-purple-400 to-pink-600',
    headerBg: 'bg-gradient-to-r from-purple-600 to-pink-600',
    bubbleColor: 'bg-purple-400',
    generateUrl: (query: string) => {
      return `https://gemini.google.com/?prompt=${encodeURIComponent(query)}`;
    },
  },
};

/**
 * Shorten a URL using TinyURL API
 */
export async function shortenUrl(longUrl: string): Promise<string> {
  try {
    const response = await fetch(
      `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`
    );
    const shortUrl = await response.text();
    return shortUrl || longUrl;
  } catch (error) {
    console.error('Error shortening URL:', error);
    return longUrl;
  }
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
}

/**
 * Format query for display in animation
 */
export function formatQueryForDisplay(query: string): string {
  return query.trim();
}
