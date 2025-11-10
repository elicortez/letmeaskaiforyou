# Ask AI For You

A modern web application that generates shareable links to ask AI assistants (ChatGPT, Microsoft Copilot, Google Gemini) anything with pre-filled prompts.

## Features

- 🤖 **Multi-AI Support**: ChatGPT, Microsoft Copilot, and Google Gemini
- ✨ **Auto-URL Generation**: Automatic URL generation for ChatGPT with copy-paste support for others
- 🎬 **Realistic Animations**: Smooth typing animations simulating real search queries
- 🔗 **URL Shortening**: Automatically shorten generated URLs using TinyURL
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⚡ **Built with Latest Tech**: Next.js 14, TypeScript, Tailwind CSS
- 🚀 **Vercel Ready**: Optimized for deployment on Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/letmeaskaiforyou.git
cd letmeaskaiforyou
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app in action.

## Usage

1. **Select an AI Provider**: Choose from ChatGPT, Microsoft Copilot, or Google Gemini
2. **Enter Your Question**: Type what you want to ask
3. **Generate Link**: Click "Generate Link" to see the animation
4. **Copy or Share**: 
   - For ChatGPT: The link opens automatically
   - For Copilot/Gemini: Copy the URL and paste it manually

## How It Works

### ChatGPT
- Automatically generates URLs in the format: `https://chatgpt.com/?prompt=your+question`
- Clicking "Go to ChatGPT" opens the link directly with your pre-filled prompt

### Microsoft Copilot & Google Gemini
- Generates URLs but requires manual copy-paste due to browser restrictions
- You'll see a note explaining this limitation
- Easy one-click copy buttons for quick sharing

## URL Shortening

Generated URLs are automatically shortened using TinyURL for easier sharing:
- Full URL: `https://chatgpt.com/?prompt=how+to+make+pizza`
- Short URL: `https://tinyurl.com/abc123`

## Animations

The app features smooth animations that simulate real AI interactions:
- **Typing Effect**: Realistic character-by-character typing
- **Cursor Blinking**: Authentic cursor animation
- **Result Preview**: Simulated search results appearing as text is typed
- **Slide-In Effects**: Smooth transitions for UI elements

## Deployment on Vercel

The app is fully optimized for Vercel deployment:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will automatically detect Next.js and configure settings
5. Deploy!

## Environment Variables

Currently, no environment variables are required. If you want to use a custom URL shortening service, add:

```
.env.local
NEXT_PUBLIC_TINYURL_API=your_api_endpoint
```

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Limitations

- **Copilot & Gemini**: These services don't support automatic redirects with pre-filled queries for security reasons, so manual copy-paste is required
- **ChatGPT**: Direct linking works seamlessly

## Future Enhancements

- [ ] Custom URL shortening service
- [ ] Analytics dashboard to track link usage
- [ ] Additional AI providers (Claude, Perplexity, etc.)
- [ ] History of generated links
- [ ] Share directly to social media
- [ ] Dark/Light theme toggle
- [ ] API endpoint for programmatic link generation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Disclaimer

This tool is for educational purposes. Please respect the terms of service of each AI platform.

---

Made with ❤️ by [elicortez](https://github.com/elicortez)
