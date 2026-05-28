import { SVGProps } from "react";

// 🪷 Lotus
export function LotusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="petalDark_lotus" x1="64" y1="18" x2="64" y2="100">
          <stop offset="0%" stopColor="#ff5f9f" />
          <stop offset="100%" stopColor="#f43f86" />
        </linearGradient>
        <linearGradient id="petalMid_lotus" x1="64" y1="32" x2="64" y2="104">
          <stop offset="0%" stopColor="#ff8fbc" />
          <stop offset="100%" stopColor="#f85f9e" />
        </linearGradient>
        <linearGradient id="petalLight_lotus" x1="64" y1="42" x2="64" y2="106">
          <stop offset="0%" stopColor="#ffd0e2" />
          <stop offset="100%" stopColor="#ff9fc6" />
        </linearGradient>
        <linearGradient id="leafGreen_lotus" x1="64" y1="86" x2="64" y2="122">
          <stop offset="0%" stopColor="#7ac943" />
          <stop offset="100%" stopColor="#4f9f2f" />
        </linearGradient>
      </defs>
      <path d="M64 101C34 94 19 70 16 38C39 37 59 57 64 101Z" fill="url(#petalDark_lotus)" />
      <path d="M64 101C94 94 109 70 112 38C89 37 69 57 64 101Z" fill="url(#petalDark_lotus)" />
      <path d="M64 101C42 84 36 52 47 24C68 29 78 67 64 101Z" fill="url(#petalDark_lotus)" />
      <path d="M64 101C86 84 92 52 81 24C60 29 50 67 64 101Z" fill="url(#petalDark_lotus)" />
      <path d="M64 101C43 73 47 35 64 12C81 35 85 73 64 101Z" fill="url(#petalMid_lotus)" />
      <path d="M64 103C42 95 27 76 27 54C45 58 62 75 64 103Z" fill="url(#petalLight_lotus)" />
      <path d="M64 103C86 95 101 76 101 54C83 58 66 75 64 103Z" fill="url(#petalLight_lotus)" />
      <path d="M64 104C49 84 51 54 64 36C77 54 79 84 64 104Z" fill="url(#petalMid_lotus)" />
      <path d="M64 101C44 117 22 110 11 95C29 82 52 86 64 101Z" fill="url(#leafGreen_lotus)" />
      <path d="M64 101C84 117 106 110 117 95C99 82 76 86 64 101Z" fill="url(#leafGreen_lotus)" />
      <path d="M64 99C73 106 75 116 64 124C53 116 55 106 64 99Z" fill="url(#leafGreen_lotus)" />
    </svg>
  );
}

// 🌸 Cherry Blossom
export function CherryBlossomIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="sakuraGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbcfe8" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="sakuraCenter" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#be185d" />
        </linearGradient>
        <filter id="sakuraGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#ec4899" floodOpacity="0.3" />
        </filter>
      </defs>
      <g filter="url(#sakuraGlow)">
        {[0, 72, 144, 216, 288].map(angle => (
          <g key={angle} transform={`rotate(${angle} 64 64)`}>
            <path d="M64 64 C50 30 50 10 64 10 C78 10 78 30 64 64Z" fill="url(#sakuraGrad)" />
            <path d="M64 10 L64 25" stroke="#fbcfe8" strokeWidth="2" strokeLinecap="round" />
            <path d="M61 10 C63 12 65 12 67 10" stroke="#ec4899" strokeWidth="2" fill="none" />
          </g>
        ))}
        <circle cx="64" cy="64" r="10" fill="url(#sakuraCenter)" />
        <circle cx="64" cy="64" r="5" fill="#fbcfe8" />
      </g>
    </svg>
  );
}

// 🌺 Hibiscus
export function HibiscusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <radialGradient id="hibiscusGrad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="60%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </radialGradient>
        <linearGradient id="stamenGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 6px 8px rgba(220, 38, 38, 0.4))">
        {[0, 72, 144, 216, 288].map(angle => (
          <g key={angle} transform={`rotate(${angle} 64 64)`}>
            <path d="M64 64 C40 30 20 10 50 5 C80 0 88 30 64 64Z" fill="url(#hibiscusGrad)" />
            <path d="M64 64 C55 40 50 20 64 5 C78 20 73 40 64 64Z" fill="#b91c1c" opacity="0.3" />
          </g>
        ))}
        <path d="M64 64 C64 40 70 20 85 15" stroke="url(#stamenGrad)" strokeWidth="6" strokeLinecap="round" fill="none" />
        <circle cx="85" cy="15" r="4" fill="#fde047" />
        <circle cx="80" cy="12" r="3" fill="#fde047" />
        <circle cx="90" cy="18" r="3" fill="#fde047" />
      </g>
    </svg>
  );
}

// ☀️ Sun
export function SunIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <radialGradient id="sunGrad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="70%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ea580c" />
        </radialGradient>
        <filter id="sunGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#f59e0b" floodOpacity="0.8" />
        </filter>
      </defs>
      <g filter="url(#sunGlow)">
        <circle cx="64" cy="64" r="28" fill="url(#sunGrad)" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
          <path key={angle} transform={`rotate(${angle} 64 64)`} d="M64 12 L64 24" stroke="url(#sunGrad)" strokeWidth="8" strokeLinecap="round" />
        ))}
      </g>
    </svg>
  );
}

// 🌅 Sunrise
export function SunriseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="sunriseSun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id="sunriseSea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.2))">
        <path d="M64 20 L64 35 M30 35 L40 45 M98 35 L88 45 M15 64 L30 64 M113 64 L98 64" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
        <path d="M34 84 C34 67 47 54 64 54 C81 54 94 67 94 84 Z" fill="url(#sunriseSun)" />
        <rect x="10" y="84" width="108" height="24" rx="4" fill="url(#sunriseSea)" />
        <path d="M10 84 L118 84" stroke="#0ea5e9" strokeWidth="4" />
      </g>
    </svg>
  );
}

// 🌙 Moon
export function MoonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="moonGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <filter id="moonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="8" floodColor="#f8fafc" floodOpacity="0.4" />
        </filter>
      </defs>
      <path d="M88 108C52 108 24 80 24 44C24 31 28 19 35 9C37 49 65 77 105 79C96 97 93 108 88 108Z" fill="url(#moonGrad)" filter="url(#moonGlow)" />
      <circle cx="50" cy="50" r="6" fill="#64748b" opacity="0.2" />
      <circle cx="70" cy="80" r="9" fill="#64748b" opacity="0.2" />
      <circle cx="45" cy="75" r="4" fill="#64748b" opacity="0.2" />
    </svg>
  );
}

// ⭐ Star
export function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <radialGradient id="starGrad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#eab308" />
        </radialGradient>
      </defs>
      <path d="M64 10 L77 50 L118 50 L85 74 L97 114 L64 90 L31 114 L43 74 L10 50 L51 50 Z" fill="url(#starGrad)" filter="drop-shadow(0px 6px 10px rgba(234, 179, 8, 0.4))" />
    </svg>
  );
}

// 🌟 Glowing Star
export function GlowingStarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <radialGradient id="glowStarGrad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#d97706" />
        </radialGradient>
        <filter id="ultraGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="15" floodColor="#fef08a" floodOpacity="0.9" />
        </filter>
      </defs>
      <g filter="url(#ultraGlow)">
        <path d="M64 5 L74 45 L114 55 L74 65 L64 105 L54 65 L14 55 L54 45 Z" fill="url(#glowStarGrad)" />
        <path d="M64 25 L69 49 L93 55 L69 61 L64 85 L59 61 L35 55 L59 49 Z" fill="#fff" opacity="0.8" />
      </g>
    </svg>
  );
}

// ✨ Sparkles
export function SparkleEmojiIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <radialGradient id="sparkleGrad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>
      </defs>
      <g filter="drop-shadow(0px 4px 8px rgba(245, 158, 11, 0.5))">
        <path d="M64 10 L73 45 L108 54 L73 63 L64 98 L55 63 L20 54 L55 45 Z" fill="url(#sparkleGrad)" />
        <path d="M100 15 L104 30 L119 34 L104 38 L100 53 L96 38 L81 34 L96 30 Z" fill="url(#sparkleGrad)" />
        <path d="M30 75 L34 90 L49 94 L34 98 L30 113 L26 98 L11 94 L26 90 Z" fill="url(#sparkleGrad)" />
      </g>
    </svg>
  );
}

// 🔥 Fire
export function FireIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <radialGradient id="fireOuter" cx="0.5" cy="0.8" r="0.8">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="60%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#facc15" />
        </radialGradient>
        <radialGradient id="fireInner" cx="0.5" cy="0.8" r="0.5">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>
      </defs>
      <g filter="drop-shadow(0px -4px 15px rgba(249, 115, 22, 0.6))">
        <path d="M64 10 C80 40 100 60 100 85 C100 105 84 120 64 120 C44 120 28 105 28 85 C28 60 48 40 64 10 Z" fill="url(#fireOuter)" />
        <path d="M64 50 C72 65 82 75 82 92 C82 102 74 110 64 110 C54 110 46 102 46 92 C46 75 56 65 64 50 Z" fill="url(#fireInner)" />
        <path d="M64 70 C68 80 72 85 72 95 C72 100 68 104 64 104 C60 104 56 100 56 95 C56 85 60 80 64 70 Z" fill="#ffffff" opacity="0.8" />
      </g>
    </svg>
  );
}

// 🕊️ Dove
export function DoveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="doveBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(255, 255, 255, 0.2))">
        <path d="M50 50 C70 10 110 10 110 10 C90 30 70 50 60 60 Z" fill="#94a3b8" />
        <path d="M30 40 C40 20 60 30 70 50 C80 60 90 90 70 100 C50 110 10 70 30 40 Z" fill="url(#doveBody)" />
        <path d="M55 55 C65 20 100 20 100 20 C80 40 65 65 50 70 Z" fill="#f8fafc" />
        <path d="M25 35 L15 32 L22 40 Z" fill="#f59e0b" />
        <path d="M15 32 L5 50" stroke="#65a30d" strokeWidth="3" strokeLinecap="round" />
        <circle cx="10" cy="40" r="3" fill="#84cc16" />
      </g>
    </svg>
  );
}

// 🌲 Evergreen Tree
export function EvergreenIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="pineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#166534" />
        </linearGradient>
        <linearGradient id="trunkGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 10px 15px rgba(22, 101, 52, 0.4))">
        <rect x="56" y="90" width="16" height="30" rx="4" fill="url(#trunkGrad)" />
        <path d="M64 10 L100 60 H80 L110 95 H18 L48 60 H28 Z" fill="url(#pineGrad)" />
        <path d="M64 10 L100 60 H80 L110 95" stroke="#86efac" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
      </g>
    </svg>
  );
}

// 🌿 Herb
export function LeafEmojiIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="herbGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a3e635" />
          <stop offset="100%" stopColor="#4d7c0f" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 5px 8px rgba(77, 124, 15, 0.3))">
        <path d="M100 20 C60 10 30 40 20 90 C50 100 90 70 100 20 Z" fill="url(#herbGrad)" />
        <path d="M20 90 C45 75 70 50 95 25" stroke="#bef264" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M40 82 C50 95 65 105 80 110" stroke="url(#herbGrad)" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

// 🌱 Seedling
export function SeedlingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="seedlingGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#84cc16" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="soilGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 10px rgba(21, 128, 61, 0.3))">
        <path d="M20 110 Q64 100 108 110 Q64 125 20 110 Z" fill="url(#soilGrad)" />
        <path d="M64 105 Q64 60 70 30" stroke="url(#seedlingGrad)" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M70 30 C100 20 110 50 80 60 Z" fill="url(#seedlingGrad)" />
        <path d="M66 50 C40 40 30 70 50 80 Z" fill="url(#seedlingGrad)" />
      </g>
    </svg>
  );
}

// 🍃 Fluttering Leaf
export function FlutteringLeafIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="flutterGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(4px 4px 6px rgba(22, 163, 74, 0.3))">
        <path d="M90 30 C70 10 30 10 20 60 C40 40 80 60 100 90 C110 70 110 50 90 30 Z" fill="url(#flutterGrad)" />
        <path d="M10 30 Q30 20 50 30 M20 50 Q40 40 60 50 M15 70 Q35 60 55 70" stroke="#86efac" strokeWidth="4" strokeLinecap="round" opacity="0.6" fill="none" />
      </g>
    </svg>
  );
}

// 💧 Drop
export function WaterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="waterGrad" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <filter id="waterGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#0284c7" floodOpacity="0.5" />
        </filter>
      </defs>
      <g filter="url(#waterGlow)">
        <path d="M64 15 C85 45 105 70 105 90 C105 112 86 120 64 120 C42 120 23 112 23 90 C23 70 43 45 64 15 Z" fill="url(#waterGrad)" />
        <path d="M40 90 C40 75 50 55 60 40" stroke="#bae6fd" strokeWidth="8" strokeLinecap="round" opacity="0.8" fill="none" />
        <circle cx="85" cy="95" r="5" fill="#bae6fd" opacity="0.6" />
      </g>
    </svg>
  );
}

// 🚿 Shower
export function ShowerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        <linearGradient id="dropGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 10px rgba(0, 0, 0, 0.2))">
        <path d="M10 20 H50 C65 20 80 35 80 50 V70" stroke="url(#metalGrad)" strokeWidth="12" strokeLinecap="round" fill="none" />
        <ellipse cx="80" cy="70" rx="30" ry="10" fill="url(#metalGrad)" />
        {[55, 65, 75, 85, 95].map((x, i) => (
          <path key={i} d={`M${x} 85 L${x} 115`} stroke="url(#dropGrad)" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 6" />
        ))}
      </g>
    </svg>
  );
}

// 🌊 Wave
export function WaveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="50%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 6px 12px rgba(3, 105, 161, 0.4))">
        <path d="M10 90 Q30 50 64 60 T110 30 C120 40 120 60 110 80 C80 110 40 120 10 110 Z" fill="url(#waveGrad)" />
        <path d="M10 90 Q30 50 64 60 T110 30 C100 20 80 40 64 50 T10 80 Z" fill="#f0f9ff" opacity="0.9" />
        <path d="M30 105 Q50 85 80 95" stroke="#e0f2fe" strokeWidth="6" strokeLinecap="round" opacity="0.6" fill="none" />
      </g>
    </svg>
  );
}
