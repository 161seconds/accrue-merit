import { SVGProps } from "react";

// 🙏 Pray / Folded Hands
export function PrayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="skinGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
        <linearGradient id="sleeveGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(234, 179, 8, 0.4))">
        {/* Sleeves */}
        <path d="M10 110 L45 75 L60 90 L20 120 Z" fill="url(#sleeveGrad)" />
        <path d="M118 110 L83 75 L68 90 L108 120 Z" fill="url(#sleeveGrad)" />
        {/* Hands */}
        <path d="M64 15 C55 15 45 35 45 75 C45 90 55 95 64 95 Z" fill="url(#skinGrad)" />
        <path d="M64 15 C73 15 83 35 83 75 C83 90 73 95 64 95 Z" fill="url(#skinGrad)" />
        {/* Center Line */}
        <path d="M64 20 V90" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
        {/* Fingers */}
        <path d="M58 20 C54 30 50 45 50 65" stroke="#ca8a04" strokeWidth="2" fill="none" />
        <path d="M70 20 C74 30 78 45 78 65" stroke="#ca8a04" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

// 🤲 Open Hands
export function OpenHandsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="openSkin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(234, 179, 8, 0.4))">
        {/* Left Hand */}
        <path d="M60 40 C60 20 45 10 35 15 C25 20 20 40 30 65 C40 90 60 100 64 100 V60 Z" fill="url(#openSkin)" />
        <path d="M45 25 Q35 45 40 70" stroke="#ca8a04" strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* Right Hand */}
        <path d="M68 40 C68 20 83 10 93 15 C103 20 108 40 98 65 C88 90 68 100 64 100 V60 Z" fill="url(#openSkin)" />
        <path d="M83 25 Q93 45 88 70" stroke="#ca8a04" strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

// 🧎 Kneeling
export function KneelingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="kneelSkin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
        <linearGradient id="kneelCloth" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(0, 0, 0, 0.2))">
        {/* Head */}
        <circle cx="64" cy="25" r="15" fill="url(#kneelSkin)" />
        {/* Body */}
        <path d="M64 45 C75 55 75 80 64 90 C50 80 50 55 64 45 Z" fill="url(#kneelCloth)" />
        {/* Kneeling Legs */}
        <path d="M64 85 C80 90 85 110 70 115 H40" stroke="url(#kneelCloth)" strokeWidth="16" strokeLinecap="round" fill="none" />
        <circle cx="40" cy="115" r="8" fill="url(#kneelCloth)" />
        {/* Hands */}
        <path d="M64 55 Q90 65 80 80" stroke="url(#kneelSkin)" strokeWidth="8" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

// 🧘 Meditation
export function MeditationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="mediSkin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
        <linearGradient id="mediPants" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 10px 15px rgba(234, 88, 12, 0.4))">
        {/* Head */}
        <circle cx="64" cy="25" r="16" fill="url(#mediSkin)" />
        {/* Body */}
        <path d="M50 45 Q64 40 78 45 L85 70 H43 Z" fill="url(#mediSkin)" />
        {/* Legs (Lotus pose) */}
        <path d="M43 70 C20 70 20 100 40 105 L64 95 L88 105 C108 100 108 70 85 70 Z" fill="url(#mediPants)" />
        {/* Arms */}
        <path d="M45 45 Q20 65 35 90" stroke="url(#mediSkin)" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M83 45 Q108 65 93 90" stroke="url(#mediSkin)" strokeWidth="10" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

// 🧘‍♂️ Man Meditating
export function ManMeditatingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="manSkin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
        <linearGradient id="manPants" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 10px 15px rgba(4, 120, 87, 0.4))">
        <circle cx="64" cy="25" r="16" fill="url(#manSkin)" />
        {/* Hair */}
        <path d="M48 25 C48 10 80 10 80 25 C80 15 48 15 48 25 Z" fill="#334155" />
        {/* Body */}
        <path d="M45 45 Q64 35 83 45 L90 70 H38 Z" fill="url(#manSkin)" />
        {/* Legs */}
        <path d="M38 70 C15 70 15 100 40 105 L64 95 L88 105 C113 100 113 70 90 70 Z" fill="url(#manPants)" />
        {/* Arms */}
        <path d="M42 45 Q15 65 30 90" stroke="url(#manSkin)" strokeWidth="12" strokeLinecap="round" fill="none" />
        <path d="M86 45 Q113 65 98 90" stroke="url(#manSkin)" strokeWidth="12" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

// ❤️ Red Heart
export function HeartEmojiIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <radialGradient id="redHeart" cx="0.3" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="40%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#b91c1c" />
        </radialGradient>
      </defs>
      <path d="M64 110 C64 110 15 75 15 40 C15 20 35 10 50 20 C58 25 64 35 64 35 C64 35 70 25 78 20 C93 10 113 20 113 40 C113 75 64 110 64 110 Z" fill="url(#redHeart)" filter="drop-shadow(0px 8px 12px rgba(220, 38, 38, 0.5))" />
    </svg>
  );
}

// 💛 Yellow Heart
export function YellowHeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <radialGradient id="yellowHeart" cx="0.3" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#a16207" />
        </radialGradient>
      </defs>
      <path d="M64 110 C64 110 15 75 15 40 C15 20 35 10 50 20 C58 25 64 35 64 35 C64 35 70 25 78 20 C93 10 113 20 113 40 C113 75 64 110 64 110 Z" fill="url(#yellowHeart)" filter="drop-shadow(0px 8px 12px rgba(234, 179, 8, 0.5))" />
    </svg>
  );
}

// 🧡 Orange Heart
export function OrangeHeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <radialGradient id="orangeHeart" cx="0.3" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#fdba74" />
          <stop offset="40%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#c2410c" />
        </radialGradient>
      </defs>
      <path d="M64 110 C64 110 15 75 15 40 C15 20 35 10 50 20 C58 25 64 35 64 35 C64 35 70 25 78 20 C93 10 113 20 113 40 C113 75 64 110 64 110 Z" fill="url(#orangeHeart)" filter="drop-shadow(0px 8px 12px rgba(249, 115, 22, 0.5))" />
    </svg>
  );
}

// 🚶 Walking
export function WalkingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="walkSkin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
        <linearGradient id="walkClothes" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(15, 118, 110, 0.4))">
        {/* Head */}
        <circle cx="64" cy="20" r="14" fill="url(#walkSkin)" />
        {/* Body */}
        <path d="M64 40 L70 70 L55 75 Z" fill="url(#walkClothes)" />
        {/* Legs */}
        <path d="M60 70 L40 100 M65 72 L85 105" stroke="url(#walkClothes)" strokeWidth="10" strokeLinecap="round" fill="none" />
        {/* Arms */}
        <path d="M64 45 L40 65 M68 45 L90 60" stroke="url(#walkSkin)" strokeWidth="8" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

// 💬 Chat
export function ChatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="chatGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(2, 132, 199, 0.4))">
        <path d="M20 30 C20 15 108 15 108 30 V75 C108 90 85 90 70 90 L30 115 V90 C20 90 20 85 20 75 Z" fill="url(#chatGrad)" />
        <circle cx="45" cy="55" r="6" fill="#f8fafc" />
        <circle cx="65" cy="55" r="6" fill="#f8fafc" />
        <circle cx="85" cy="55" r="6" fill="#f8fafc" />
      </g>
    </svg>
  );
}

// 🗣️ Speaking Head
export function SpeakingHeadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="speakSkin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(51, 65, 85, 0.4))">
        {/* Head Profile */}
        <path d="M40 20 C20 20 20 60 40 80 V110 H70 V85 C80 80 85 70 85 60 C85 50 75 40 75 30 C75 20 60 20 40 20 Z" fill="url(#speakSkin)" />
        {/* Sound waves */}
        <path d="M95 40 Q110 50 95 60" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M105 30 Q125 50 105 70" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

// 😌 Relieved Face
export function RelievedFaceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <radialGradient id="faceGrad" cx="0.4" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="80%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </radialGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(202, 138, 4, 0.4))">
        <circle cx="64" cy="64" r="50" fill="url(#faceGrad)" />
        {/* Eyes closed */}
        <path d="M40 55 Q48 65 56 55 M72 55 Q80 65 88 55" stroke="#78350f" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* Smile */}
        <path d="M50 80 Q64 95 78 80" stroke="#78350f" strokeWidth="4" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

// 😊 Smile
export function SmileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <radialGradient id="smileGrad" cx="0.4" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="80%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </radialGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(202, 138, 4, 0.4))">
        <circle cx="64" cy="64" r="50" fill="url(#smileGrad)" />
        {/* Happy Eyes */}
        <path d="M40 55 Q48 45 56 55 M72 55 Q80 45 88 55" stroke="#78350f" strokeWidth="5" strokeLinecap="round" fill="none" />
        {/* Smile */}
        <path d="M45 75 Q64 95 83 75" stroke="#78350f" strokeWidth="5" strokeLinecap="round" fill="none" />
        {/* Blush */}
        <ellipse cx="35" cy="65" rx="8" ry="4" fill="#fca5a5" opacity="0.8" />
        <ellipse cx="93" cy="65" rx="8" ry="4" fill="#fca5a5" opacity="0.8" />
      </g>
    </svg>
  );
}

// 🤝 Handshake
export function HandshakeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="handLeft" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
        <linearGradient id="handRight" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(217, 119, 6, 0.4))">
        {/* Left Arm */}
        <path d="M10 80 L40 60 L60 80 L30 100 Z" fill="#3b82f6" />
        {/* Right Arm */}
        <path d="M118 80 L88 60 L68 80 L98 100 Z" fill="#22c55e" />
        {/* Left Hand */}
        <path d="M35 55 L65 40 L80 55 L50 70 Z" fill="url(#handLeft)" />
        {/* Right Hand */}
        <path d="M93 55 L63 40 L48 55 L78 70 Z" fill="url(#handRight)" />
        {/* Grip detail */}
        <path d="M64 45 V65" stroke="#b45309" strokeWidth="4" />
      </g>
    </svg>
  );
}

// 🩸 Blood Drop
export function BloodDropIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="bloodGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(153, 27, 27, 0.5))">
        <path d="M64 20 C85 50 105 75 105 95 C105 117 86 125 64 125 C42 125 23 117 23 95 C23 75 43 50 64 20 Z" fill="url(#bloodGrad)" />
        <path d="M40 95 C40 80 50 60 60 45" stroke="#fca5a5" strokeWidth="8" strokeLinecap="round" opacity="0.8" fill="none" />
      </g>
    </svg>
  );
}

// 📵 No Mobile
export function NoMobileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="phoneGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 6px 10px rgba(0, 0, 0, 0.3))">
        {/* Phone */}
        <rect x="35" y="20" width="58" height="88" rx="10" fill="url(#phoneGrad)" />
        <rect x="42" y="30" width="44" height="68" rx="4" fill="#0f172a" />
        {/* Red No Symbol */}
        <circle cx="64" cy="64" r="45" stroke="#ef4444" strokeWidth="12" fill="none" />
        <path d="M32 32 L96 96" stroke="#ef4444" strokeWidth="12" />
      </g>
    </svg>
  );
}

// 🤐 Zipper Face
export function ZipperFaceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <radialGradient id="zipFaceGrad" cx="0.4" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="80%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </radialGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(202, 138, 4, 0.4))">
        <circle cx="64" cy="64" r="50" fill="url(#zipFaceGrad)" />
        {/* Eyes */}
        <circle cx="45" cy="50" r="6" fill="#78350f" />
        <circle cx="83" cy="50" r="6" fill="#78350f" />
        {/* Zipper Mouth */}
        <path d="M40 85 H88 M45 80 V90 M55 80 V90 M65 80 V90 M75 80 V90 M85 80 V90" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
        <rect x="88" y="80" width="10" height="10" rx="2" fill="#64748b" />
      </g>
    </svg>
  );
}

// 👴 Old Man
export function OldManIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <radialGradient id="oldSkin" cx="0.4" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="80%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </radialGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(202, 138, 4, 0.4))">
        <circle cx="64" cy="64" r="45" fill="url(#oldSkin)" />
        {/* Hair */}
        <path d="M20 64 C20 40 40 10 64 10 C88 10 108 40 108 64" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round" fill="none" />
        {/* Eyes & Glasses */}
        <circle cx="45" cy="55" r="5" fill="#78350f" />
        <circle cx="83" cy="55" r="5" fill="#78350f" />
        <circle cx="45" cy="55" r="12" stroke="#94a3b8" strokeWidth="3" fill="none" />
        <circle cx="83" cy="55" r="12" stroke="#94a3b8" strokeWidth="3" fill="none" />
        <path d="M57 55 H71" stroke="#94a3b8" strokeWidth="3" />
        {/* Mustache */}
        <path d="M40 85 Q64 75 88 85 Q64 95 40 85 Z" fill="#e2e8f0" />
      </g>
    </svg>
  );
}

// 🚭 No Smoking
export function NoSmokingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <g filter="drop-shadow(0px 6px 10px rgba(0, 0, 0, 0.3))">
        {/* Cigarette */}
        <rect x="30" y="55" width="50" height="15" rx="2" fill="#f8fafc" />
        <rect x="80" y="55" width="20" height="15" rx="2" fill="#d97706" />
        <path d="M100 62 H105" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
        {/* Smoke */}
        <path d="M105 50 Q115 35 100 25 T110 10" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* Red No Symbol */}
        <circle cx="64" cy="64" r="45" stroke="#ef4444" strokeWidth="12" fill="none" />
        <path d="M32 32 L96 96" stroke="#ef4444" strokeWidth="12" />
      </g>
    </svg>
  );
}

// 💤 Zzz
export function ZzzIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="zzzGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 6px 10px rgba(2, 132, 199, 0.4))">
        {/* Big Z */}
        <path d="M40 20 H90 L40 70 H90" stroke="url(#zzzGrad)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Medium Z */}
        <path d="M80 80 H110 L80 105 H110" stroke="url(#zzzGrad)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Small Z */}
        <path d="M20 90 H40 L20 110 H40" stroke="url(#zzzGrad)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
}

// ♻️ Recycle
export function RecycleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="recycleGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(22, 163, 74, 0.4))">
        {/* Triangle Path 1 */}
        <path d="M64 15 L95 70 H33 Z" stroke="url(#recycleGrad)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Arrows */}
        <path d="M64 5 L80 15 L64 25" fill="url(#recycleGrad)" />
        <path d="M30 75 L30 55 L15 65" fill="url(#recycleGrad)" />
        <path d="M98 75 L113 65 L113 85" fill="url(#recycleGrad)" />
      </g>
    </svg>
  );
}
