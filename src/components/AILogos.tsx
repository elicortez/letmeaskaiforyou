export const ChatGPTLogo = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <g>
      <path
        d="M100 20C55.82 20 20 55.82 20 100C20 144.18 55.82 180 100 180C144.18 180 180 144.18 180 100C180 55.82 144.18 20 100 20Z"
        fill="white"
        stroke="black"
        strokeWidth="3"
      />
      <path
        d="M100 50C75.15 50 55 70.15 55 95C55 119.85 75.15 140 100 140C124.85 140 145 119.85 145 95C145 70.15 124.85 50 100 50Z"
        fill="black"
      />
      <path
        d="M85 85L100 70L115 85L100 100Z"
        fill="white"
      />
      <path
        d="M85 115L100 130L115 115L100 100Z"
        fill="white"
      />
      <path
        d="M70 100L85 85L100 100L85 115Z"
        fill="white"
      />
      <path
        d="M130 100L115 85L100 100L115 115Z"
        fill="white"
      />
    </g>
  </svg>
);

export const GeminiLogo = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="geminiGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B6B" />
        <stop offset="50%" stopColor="#4ECDC4" />
        <stop offset="100%" stopColor="#FFD93D" />
      </linearGradient>
      <linearGradient id="geminiGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#6C5CE7" />
        <stop offset="50%" stopColor="#4ECDC4" />
        <stop offset="100%" stopColor="#FF6B6B" />
      </linearGradient>
    </defs>
    <path
      d="M100 30C80.67 30 65 45.67 65 65C65 75 70 83.5 77 88.5L100 110L123 88.5C130 83.5 135 75 135 65C135 45.67 119.33 30 100 30Z"
      fill="url(#geminiGradient1)"
    />
    <path
      d="M100 110L123 131.5C130 136.5 135 145 135 155C135 174.33 119.33 190 100 190C80.67 190 65 174.33 65 155C65 145 70 136.5 77 131.5L100 110Z"
      fill="url(#geminiGradient2)"
    />
    <path
      d="M65 100C45.67 100 30 114.33 30 133.5C30 152.67 45.67 168 65 168C75 168 83.5 163 88.5 156L110 133.5L88.5 111C83.5 103.5 75 100 65 100Z"
      fill="url(#geminiGradient1)"
      opacity="0.8"
    />
    <path
      d="M190 100C190 80.67 174.33 65 155 65C145 65 136.5 70 131.5 77L109 99.5L131.5 122C136.5 129 145 133.5 155 133.5C174.33 133.5 190 118.33 190 99.5Z"
      fill="url(#geminiGradient2)"
      opacity="0.8"
    />
  </svg>
);

export const CopilotLogo = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="copilotGradient1" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FF6B35" />
        <stop offset="50%" stopColor="#FFD93D" />
        <stop offset="100%" stopColor="#6BCB77" />
      </linearGradient>
      <linearGradient id="copilotGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4D96FF" />
        <stop offset="50%" stopColor="#00D4FF" />
        <stop offset="100%" stopColor="#FF006E" />
      </linearGradient>
    </defs>
    <path
      d="M40 100C40 65 65 40 100 40C135 40 160 65 160 100C160 135 135 160 100 160C65 160 40 135 40 100Z"
      fill="url(#copilotGradient1)"
      opacity="0.7"
    />
    <path
      d="M60 80C60 70 68 60 80 60C92 60 100 68 100 80C100 92 92 100 80 100C68 100 60 92 60 80Z"
      fill="white"
    />
    <path
      d="M100 80C100 70 108 60 120 60C132 60 140 68 140 80C140 92 132 100 120 100C108 100 100 92 100 80Z"
      fill="url(#copilotGradient2)"
    />
    <path
      d="M70 130C70 118 78 108 90 108C102 108 110 116 110 128"
      stroke="white"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M110 130C110 118 118 108 130 108C142 108 150 116 150 128"
      stroke="url(#copilotGradient2)"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);
