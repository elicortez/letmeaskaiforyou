# Architecture Documentation

This document provides a comprehensive overview of the Ask AI For You application architecture, data flow, and component interactions.

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Component Architecture](#component-architecture)
3. [Data Flow](#data-flow)
4. [State Management](#state-management)
5. [Technology Stack](#technology-stack)
6. [File Structure](#file-structure)

## System Architecture

### High-Level System Diagram

```mermaid
graph TB
    subgraph Client["Client Browser"]
        direction TB
        HTML["HTML/CSS/JS"]
        React["React Components"]
        TS["TypeScript Types"]
    end
    
    subgraph NextJS["Next.js Framework"]
        direction TB
        AppRouter["App Router"]
        Suspense["React Suspense"]
        Tailwind["Tailwind CSS"]
    end
    
    subgraph Services["External Services"]
        direction TB
        ChatGPT["ChatGPT"]
        Copilot["Bing Chat"]
        Gemini["Google Gemini"]
    end
    
    subgraph Deployment["Deployment"]
        direction TB
        Vercel["Vercel Hosting"]
        CDN["Edge CDN"]
    end
    
    Client --> NextJS
    NextJS --> Services
    Client --> Deployment
    Vercel --> CDN
```

### Application Layers

```mermaid
graph TB
    subgraph Presentation["Presentation Layer"]
        UI["UI Components"]
        Pages["Page Components"]
        Layouts["Layout Components"]
    end
    
    subgraph Logic["Business Logic Layer"]
        Hooks["React Hooks"]
        Utils["Utility Functions"]
        Config["Configuration"]
    end
    
    subgraph Data["Data & Services Layer"]
        State["Component State"]
        URLGen["URL Generation"]
        API["External APIs"]
    end
    
    subgraph Infrastructure["Infrastructure Layer"]
        NextJS["Next.js Runtime"]
        FS["File System"]
        Network["Network Layer"]
    end
    
    Presentation --> Logic
    Logic --> Data
    Data --> Infrastructure
```

## Component Architecture

### Component Hierarchy

```mermaid
graph TD
    Root["<root>"]
    Root --> Layout["layout.tsx<br/>Root Layout"]
    Layout --> Suspense["Suspense Boundary"]
    
    Suspense --> PageWrapper["Home<br/>Page Wrapper"]
    PageWrapper --> SearchHandler["SearchParamsHandler<br/>URL Parser"]
    
    SearchHandler --> HomeContent["HomeContent<br/>Main Component"]
    
    HomeContent --> Header["Header Section"]
    HomeContent --> Selection["AI Provider Selection"]
    HomeContent --> Input["Input Section"]
    HomeContent --> Preview["Conditional Preview"]
    HomeContent --> Results["Results Section"]
    
    Preview --> Animation["PreviewAnimation<br/>Typing Effect"]
    Results --> URLs["URL Display"]
    Results --> Embedded["EmbeddedPreview<br/>Mock Interface"]
    Results --> Actions["Action Buttons"]
    
    Embedded --> Logos["AILogos<br/>SVG Logos"]
```

### Component Dependencies

```mermaid
graph LR
    HomeContent["HomeContent"]
    
    HomeContent -->|imports| AI["ai.ts<br/>Utilities"]
    HomeContent -->|imports| PreviewAnim["PreviewAnimation"]
    HomeContent -->|imports| Embedded["EmbeddedPreview"]
    
    PreviewAnim -->|uses| AI
    Embedded -->|uses| Logos["AILogos"]
    Embedded -->|uses| AI
    
    AI -->|defines| AIProviders["AIProvider<br/>Interface"]
    AI -->|exports| shortenUrl["shortenUrl()"]
    AI -->|exports| copyClipboard["copyToClipboard()"]
    
    SearchHandler["SearchParamsHandler"]
    SearchHandler -->|imports| AI
    SearchHandler -->|provides| HomeContent
```

## Data Flow

### URL Generation Flow

```mermaid
sequenceDiagram
    participant User
    participant UI as HomeContent
    participant Generator as ai.ts
    participant Services as External APIs
    
    User->>UI: Select AI & Enter Question
    User->>UI: Click Generate Link
    
    activate UI
    UI->>Generator: Call generateUrl(query)
    activate Generator
    Generator->>Generator: URL encode query
    Generator->>Services: Select AI provider URL format
    Generator-->>UI: Return formatted URL
    deactivate Generator
    
    UI->>UI: Update state with URL
    UI->>UI: Show animation
    deactivate UI
    
    UI-->>User: Display URL & Preview
```

### Animation Sequence

```mermaid
sequenceDiagram
    participant User
    participant Page as animate/page.tsx
    participant DOM as Browser DOM
    
    User->>Page: Page loads with query params
    Page->>Page: Detect isInIframe parameter
    
    activate Page
    Page->>DOM: Show step indicator (2 steps)
    Page->>DOM: Render input field with text
    Page->>DOM: Render "Go to [AI]" button
    deactivate Page
    
    Page->>Page: Wait 0ms before animation
    
    activate Page
    Note over Page: Step 1: Cursor moves to input (2 seconds)
    Page->>DOM: Show custom cursor
    Page->>DOM: Apply mouse-move-to-input animation
    Page->>DOM: Update step indicator (blue)
    deactivate Page
    
    Page->>Page: Typing starts
    
    activate Page
    Note over Page: Step 1: Type prompt (200ms per char)
    loop For each character
        Page->>DOM: Update displayedText
        Page->>DOM: Re-render typed text
    end
    deactivate Page
    
    Page->>Page: Typing complete
    
    activate Page
    Note over Page: Step 2: Cursor moves to button (2 seconds)
    Page->>Page: setCurrentStep('clicking')
    Page->>DOM: Move cursor animation to button
    Page->>DOM: Update step indicator (green)
    deactivate Page
    
    Page->>Page: Wait 1 second
    
    activate Page
    Note over Page: Optional redirect (if not in iframe)
    alt isInIframe = true
        Page->>Page: Do NOT redirect
    else isInIframe = false
        Page->>Page: Show countdown (2 seconds)
        Page->>DOM: Update redirect message
        Page->>Page: Redirect after countdown
    end
    deactivate Page
```

### State Management Flow

```mermaid
graph LR
    User["User Input"] -->|Click Provider| State1["selectedProvider"]
    User -->|Type Query| State2["query"]
    User -->|Click Generate| State3["showPreview"]
    
    State3 -->|Triggers| Animation["Animation<br/>Component"]
    Animation -->|Completes| State4["animationComplete"]
    
    State1 & State2 -->|Used by| URLGen["URL Generation"]
    URLGen -->|Produces| State5["fullUrl"]
    
    State4 -->|Enables| State7["showEmbedded"]
    State5 -->|Display in| Results["Results Section"]
    State7 -->|Controls| Preview["EmbeddedPreview"]
```

## State Management

### HomeContent State Variables

```typescript
// UI State
const [selectedProvider, setSelectedProvider] = useState<AIProvider>();
const [query, setQuery] = useState<string>();
const [showPreview, setShowPreview] = useState<boolean>();
const [animationComplete, setAnimationComplete] = useState<boolean>();
const [showEmbedded, setShowEmbedded] = useState<boolean>();

// Data State
const [fullUrl, setFullUrl] = useState<string>();

// UI Feedback State
const [isCopying, setIsCopying] = useState<boolean>();
const [copiedMessage, setCopiedMessage] = useState<string>();
```

### State Transitions

```mermaid
stateDiagram-v2
    [*] --> Initial: Page loads
    
    Initial --> AiSelected: User selects AI provider
    AiSelected --> QueryEntered: User enters question
    QueryEntered --> GenerateLinkClicked: User clicks Generate
    
    GenerateLinkClicked --> Animating: showPreview = true
    Animating --> AnimationComplete: typing finishes
    
    AnimationComplete --> URLsGenerated: URLs generated
    URLsGenerated --> CanShowPreview: Ready to preview
    
    CanShowPreview --> ShowingPreview: User clicks Show Preview
    CanShowPreview --> CopiedURL: User clicks Copy
    CanShowPreview --> OpenedAI: User clicks Go to AI
    
    ShowingPreview --> CanShowPreview
    CopiedURL --> CanShowPreview
    OpenedAI --> [*]
    
    QueryEntered --> NewSearch: User clicks New Search
    NewSearch --> Initial
```

## Technology Stack

### Frontend Framework

```mermaid
graph TB
    subgraph NextJS["Next.js 14+"]
        direction TB
        AppRouter["App Router<br/>File-based routing"]
        Suspense["React Suspense<br/>Streaming"]
        Middleware["Middleware<br/>Request handling"]
    end
    
    subgraph React["React 18+"]
        direction TB
        Hooks["React Hooks<br/>useState, useEffect, etc"]
        Components["Function Components<br/>Reusable UI"]
    end
    
    subgraph Styling["Styling"]
        direction TB
        Tailwind["Tailwind CSS<br/>Utility-first CSS"]
        PostCSS["PostCSS<br/>CSS processing"]
        Autoprefixer["Autoprefixer<br/>Browser prefixes"]
    end
    
    subgraph TypeScript["TypeScript"]
        direction TB
        Types["Type Definitions"]
        Interfaces["Interfaces & Types"]
        Generics["Generic Types"]
    end
    
    NextJS --> React
    React --> Styling
    React --> TypeScript
    Styling --> TypeScript
```

### Build & Deployment

```mermaid
graph LR
    Source["Source Code<br/>TypeScript/React"]
    Build["Build Process<br/>Next.js Build"]
    Output["Build Output<br/>.next folder"]
    Deploy["Deployment<br/>Vercel"]
    CDN["Global CDN<br/>Edge Locations"]
    Users["End Users<br/>Browser"]
    
    Source -->|npm run build| Build
    Build -->|Compiles to| Output
    Output -->|Deploy to| Deploy
    Deploy -->|Edge Caching| CDN
    CDN -->|Serve to| Users
    Users -->|Request| CDN
```

## File Structure

### Directory Tree

```
letmeaskaiforyou/
│
├── src/                           # Source code directory
│   ├── app/                       # Next.js App Router
│   │   ├── layout.tsx            # Root layout component
│   │   ├── page.tsx              # Home page
│   │   └── globals.css           # Global styles
│   │
│   ├── components/               # Reusable React components
│   │   ├── HomeContent.tsx       # Main content component with state
│   │   ├── PreviewAnimation.tsx  # Typing animation component
│   │   ├── EmbeddedPreview.tsx   # Mock AI interface preview
│   │   ├── SearchParamsHandler.tsx # URL query parameter handler
│   │   └── AILogos.tsx           # SVG logo components
│   │
│   ├── utils/                    # Utility functions
│   │   └── ai.ts                 # AI provider config & utilities
│   │
│   └── styles/                   # Stylesheets
│       └── globals.css           # Global styles (duplicated intentionally)
│
├── public/                        # Static assets
│
├── Configuration Files
│   ├── package.json              # Dependencies & scripts
│   ├── tsconfig.json             # TypeScript configuration
│   ├── tailwind.config.ts        # Tailwind CSS configuration
│   ├── postcss.config.js         # PostCSS configuration
│   ├── next.config.js            # Next.js configuration
│   ├── .eslintrc.json            # ESLint configuration
│   ├── .gitignore                # Git ignore rules
│   └── vercel.json               # Vercel deployment config
│
├── Documentation
│   ├── README.md                 # Main documentation
│   ├── CONTRIBUTING.md           # Contribution guidelines
│   ├── TROUBLESHOOTING.md        # Troubleshooting guide
│   ├── ARCHITECTURE.md           # This file
│   └── LICENSE                   # MIT License
│
└── Build Output (not in git)
    └── .next/                    # Next.js build artifacts
```

### Source Code Organization

```mermaid
graph TD
    App["app/"]
    Components["components/"]
    Utils["utils/"]
    Styles["styles/"]
    
    App -->|Layout| Layout["layout.tsx"]
    App -->|Pages| Page["page.tsx"]
    App -->|Styles| CSS1["globals.css"]
    
    Components -->|Main UI| HomeContent["HomeContent.tsx"]
    Components -->|Animation| Animation["PreviewAnimation.tsx"]
    Components -->|Preview| Preview["EmbeddedPreview.tsx"]
    Components -->|Handlers| Handler["SearchParamsHandler.tsx"]
    Components -->|Logos| Logos["AILogos.tsx"]
    
    Utils -->|Config & Helpers| AI["ai.ts"]
    
    Styles -->|Tailwind| CSS2["globals.css"]
    
    HomeContent -->|Imports| AI
    Animation -->|Imports| AI
    Preview -->|Imports| Logos
    Handler -->|Imports| AI
```

## Data Models

### AIProvider Interface

```typescript
interface AIProvider {
  // Unique identifier
  id: 'chatgpt' | 'copilot' | 'gemini';
  
  // Display name
  name: string;
  
  // Unicode icon/emoji (legacy, kept for compatibility)
  icon: string;
  
  // Path to logo PNG file
  logo: string;
  
  // Tailwind gradient class for buttons
  color: string;
  
  // Header background gradient
  headerBg: string;
  
  // Chat bubble color for preview
  bubbleColor: string;
  
  // Function to generate URL with query
  generateUrl: (query: string) => string;
}
```

### Component Props

```typescript
// PreviewAnimation
interface PreviewAnimationProps {
  query: string;
  provider: AIProvider;
  isActive: boolean;
  onAnimationComplete: () => void;
}

// EmbeddedPreview
interface EmbeddedPreviewProps {
  url: string;
  provider: AIProvider;
  isVisible: boolean;
}

// SearchParamsHandler
interface SearchParamsContextProps {
  children: (props: {
    queryParam: string | null;
    selectedProvider: AIProvider;
    setSelectedProvider: (provider: AIProvider) => void;
    autoStart: boolean;
  }) => React.ReactNode;
}
```

## Performance Considerations

### Optimization Strategies

```mermaid
graph TB
    subgraph Rendering["Rendering"]
        Suspense["Suspense Boundaries<br/>Stream HTML"]
        Memoization["React Memoization<br/>Prevent re-renders"]
        LazyLoad["Code Splitting<br/>Lazy components"]
    end
    
    subgraph Network["Network"]
        Compression["Gzip Compression<br/>Reduce payload"]
        Caching["HTTP Caching<br/>Browser cache"]
        CDN["Edge Caching<br/>Global CDN"]
    end
    
    subgraph Bundle["Bundle"]
        TreeShake["Tree Shaking<br/>Remove dead code"]
        Minify["Minification<br/>Smaller JS"]
        NextOpt["Next.js Optimization<br/>Auto optimizations"]
    end
    
    style Suspense fill:#e1f5ff
    style Memoization fill:#e1f5ff
    style LazyLoad fill:#e1f5ff
    style Compression fill:#fff3e0
    style Caching fill:#fff3e0
    style CDN fill:#fff3e0
    style TreeShake fill:#f3e5f5
    style Minify fill:#f3e5f5
    style NextOpt fill:#f3e5f5
```

## Security Considerations

```mermaid
graph TB
    subgraph Input["Input Validation"]
        URLEncoding["URL Encoding<br/>Prevent injection"]
        SanitizeInput["Input Sanitization<br/>Clean user input"]
    end
    
    subgraph Output["Output Security"]
        XSSPrevention["XSS Prevention<br/>React escaping"]
        CSP["Content Security Policy<br/>Prevent external scripts"]
    end
    
    subgraph Network["Network Security"]
        HTTPS["HTTPS Only<br/>Encrypted transport"]
        CORS["CORS Headers<br/>API protection"]
        Headers["Security Headers<br/>Clickjacking prevention"]
    end
    
    subgraph Privacy["Privacy"]
        NoStorage["No Data Storage<br/>Stateless"]
        NoTracking["No Tracking<br/>User privacy"]
        OpenSource["Open Source<br/>Auditable code"]
    end
    
    style Input fill:#c8e6c9
    style Output fill:#c8e6c9
    style Network fill:#bbdefb
    style Privacy fill:#fff9c4
```

---

For more information, see:
- [README.md](README.md) - User guide and features
- [CONTRIBUTING.md](CONTRIBUTING.md) - Development guidelines
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues

Last updated: November 10, 2025
