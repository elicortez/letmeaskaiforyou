# Contributing to Ask AI For You

First off, thank you for considering contributing to Ask AI For You! It's people like you that make this such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to [elicortez@example.com](mailto:elicortez@example.com).

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the [issue list](https://github.com/elicortez/letmeaskaiforyou/issues) as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps which reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots and animated GIFs if possible**
* **Include your environment details** (OS, Node version, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as [GitHub issues](https://github.com/elicortez/letmeaskaiforyou/issues). When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and expected behavior**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Follow the [TypeScript](#typescript) and [CSS](#css) styleguides
* End all files with a newline
* Avoid platform-dependent code
* Use meaningful commit messages

## Development Setup

### 1. Fork and clone the repository

```bash
git clone https://github.com/your-username/letmeaskaiforyou.git
cd letmeaskaiforyou
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a feature branch

```bash
git checkout -b feature/your-feature-name
```

### 4. Make your changes

Edit files and implement your feature or fix.

### 5. Test your changes

```bash
# Run the dev server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Run type checking
npm run type-check
```

### 6. Commit your changes

```bash
git add .
git commit -m "feat: add your feature description"
```

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `style:` for formatting
- `refactor:` for code refactoring
- `test:` for tests
- `chore:` for maintenance

### 7. Push to your fork and submit a pull request

```bash
git push origin feature/your-feature-name
```

Then open a Pull Request on GitHub.

## Styleguides

### TypeScript

* Use `const` by default, `let` if you need to reassign
* Use meaningful variable names
* Use TypeScript interfaces for component props
* Add JSDoc comments for complex functions
* No `any` types unless absolutely necessary

Example:
```typescript
interface ButtonProps {
  /** Button label text */
  label: string;
  /** Click handler function */
  onClick: () => void;
  /** Is button disabled */
  disabled?: boolean;
}

/**
 * Renders a styled button component
 * @param props - Button properties
 * @returns Button element
 */
export const Button: React.FC<ButtonProps> = ({ label, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};
```

### CSS/Tailwind

* Use Tailwind CSS utilities instead of custom CSS when possible
* Keep custom CSS in `src/styles/globals.css`
* Use meaningful class names if creating custom classes
* Mobile-first responsive design approach
* Use Tailwind's color palette consistently

Example:
```tsx
<div className="flex items-center justify-between p-4 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
  <h2 className="text-lg font-semibold text-slate-900">Title</h2>
  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
    Action
  </button>
</div>
```

### React Components

* Use functional components with hooks
* Keep components focused and single-responsibility
* Extract reusable logic into custom hooks or utility functions
* Use `React.FC` for type-safe component definitions
* Memoize expensive computations with `useMemo`
* Use `useCallback` for stable function references

Example:
```typescript
interface CardProps {
  title: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
};
```

## Adding a New AI Provider

To add support for a new AI provider:

### 1. Update `src/utils/ai.ts`

```typescript
export const AI_PROVIDERS: Record<string, AIProvider> = {
  // ... existing providers
  
  newprovider: {
    id: 'newprovider',
    name: 'New Provider',
    icon: '🆕',
    color: 'from-purple-400 to-purple-600',
    headerBg: 'bg-gradient-to-r from-purple-600 to-purple-700',
    bubbleColor: 'bg-purple-400',
    generateUrl: (query: string) => {
      return `https://newprovider.com/search?q=${encodeURIComponent(query)}`;
    },
  },
};
```

### 2. (Optional) Add custom logo to `src/components/AILogos.tsx`

```typescript
export const NewProviderLogo = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* SVG code here */}
  </svg>
);
```

### 3. Test thoroughly

Make sure the new provider:
- Generates valid URLs
- Works with the animation system
- Displays correctly in the preview
- Responsive on mobile

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── HomeContent.tsx
│   ├── PreviewAnimation.tsx
│   ├── EmbeddedPreview.tsx
│   ├── SearchParamsHandler.tsx
│   └── AILogos.tsx
└── utils/                 # Utility functions
    └── ai.ts              # AI provider configuration
```

## Git Workflow

1. Always create a new branch for your work
2. Keep commits focused and atomic
3. Write descriptive commit messages
4. Push to your fork before submitting a PR
5. Keep your fork up to date with the main repository

## Testing

We don't have automated tests yet, but you should manually test:

1. **All three AI providers**
   - Link generation
   - URL encoding
   - Animation playback
   - Preview rendering

2. **Responsive design**
   - Desktop (1920px+)
   - Tablet (768px-1024px)
   - Mobile (320px-480px)

3. **Browser compatibility**
   - Chrome/Chromium
   - Firefox
   - Safari
   - Edge

4. **Animation performance**
   - Smooth typing animation
   - No jank on slower devices
   - Correct timing

## Documentation

* Keep README.md up to date with new features
* Add JSDoc comments to functions
* Update this CONTRIBUTING.md if contribution process changes
* Add comments to complex logic
* Keep code self-documenting with clear names

## Additional Notes

### Issue and Pull Request Labels

* `bug` - Something isn't working
* `enhancement` - New feature or request
* `documentation` - Improvements or additions to documentation
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed
* `question` - Further information is requested

### Issue Discussions

We use GitHub Discussions for:
* Questions about how to use the project
* Sharing ideas for improvements
* General feedback and suggestions

## Recognition

Contributors will be recognized in:
- The [CONTRIBUTORS.md](CONTRIBUTORS.md) file
- GitHub's contributor graph
- Release notes for their contributions

## Questions?

Feel free to:
- Open an [issue](https://github.com/elicortez/letmeaskaiforyou/issues)
- Start a [discussion](https://github.com/elicortez/letmeaskaiforyou/discussions)
- Email [elicortez@example.com](mailto:elicortez@example.com)

---

Thank you for contributing to Ask AI For You! 🎉
