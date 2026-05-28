import { SVGProps } from "react";

// 🐟 Wooden Fish (Mõ)
export function WoodenFishIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="woodBody" x1="26" y1="30" x2="94" y2="106">
          <stop offset="0%" stopColor="#D99A4E" />
          <stop offset="55%" stopColor="#A9652E" />
          <stop offset="100%" stopColor="#6F3B1F" />
        </linearGradient>
        <linearGradient id="woodLight" x1="42" y1="24" x2="84" y2="94">
          <stop offset="0%" stopColor="#F0B86A" />
          <stop offset="100%" stopColor="#B86C32" />
        </linearGradient>
        <linearGradient id="malletWood" x1="82" y1="18" x2="116" y2="54">
          <stop offset="0%" stopColor="#E5B066" />
          <stop offset="100%" stopColor="#8A4D28" />
        </linearGradient>
        <filter id="softShadow_wf" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.18" />
        </filter>
      </defs>
      <path d="M86 42L116 12" stroke="url(#malletWood)" strokeWidth="9" strokeLinecap="round" />
      <circle cx="80" cy="48" r="14" fill="url(#malletWood)" filter="url(#softShadow_wf)" />
      <circle cx="75" cy="43" r="5" fill="#F2C17A" opacity="0.7" />
      <path d="M18 72C18 43 40 26 63 28C88 30 106 49 106 74C106 98 86 113 62 113C36 113 18 96 18 72Z" fill="url(#woodBody)" filter="url(#softShadow_wf)" />
      <path d="M38 58C43 38 59 31 74 38C89 45 94 61 90 77C79 66 55 61 38 58Z" fill="url(#woodLight)" opacity="0.9" />
      <path d="M30 78C45 88 78 89 96 77" stroke="#3B1E12" strokeWidth="7" strokeLinecap="round" />
      <path d="M33 76C48 82 77 83 93 75" stroke="#8C4A28" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <circle cx="34" cy="74" r="9" fill="#3B1E12" />
      <circle cx="92" cy="74" r="9" fill="#3B1E12" />
      <path d="M50 56C55 47 70 47 76 56" stroke="#5A2E1B" strokeWidth="4" strokeLinecap="round" />
      <path d="M63 56V68" stroke="#5A2E1B" strokeWidth="4" strokeLinecap="round" />
      <path d="M47 91C56 97 73 98 84 91" stroke="#5A2E1B" strokeWidth="3.5" strokeLinecap="round" opacity="0.7" />
      <path d="M42 43C50 39 62 39 70 44" stroke="#F3C17A" strokeWidth="3" strokeLinecap="round" opacity="0.45" />
      <path d="M30 63C40 57 52 58 62 63" stroke="#F3C17A" strokeWidth="3" strokeLinecap="round" opacity="0.35" />
      <path d="M70 101C80 101 88 97 94 90" stroke="#F3C17A" strokeWidth="3" strokeLinecap="round" opacity="0.35" />
      <path d="M27 91C42 107 75 111 96 91C89 106 75 115 61 115C43 115 30 105 27 91Z" fill="#5B2E1A" opacity="0.28" />
    </svg>
  );
}

// 🪵 Wood Log
export function WoodLogIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="logBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <linearGradient id="logEnd" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(120, 53, 15, 0.4))">
        {/* Main Body */}
        <path d="M40 20 L100 50 C110 55 110 75 100 80 L40 110 C30 115 15 105 15 90 L15 40 C15 25 30 15 40 20 Z" fill="url(#logBody)" />
        {/* End Face */}
        <ellipse cx="35" cy="65" rx="15" ry="40" fill="url(#logEnd)" transform="rotate(-25 35 65)" />
        {/* Rings */}
        <ellipse cx="35" cy="65" rx="10" ry="28" stroke="#92400e" strokeWidth="2" fill="none" transform="rotate(-25 35 65)" />
        <ellipse cx="35" cy="65" rx="5" ry="14" stroke="#92400e" strokeWidth="2" fill="none" transform="rotate(-25 35 65)" />
        {/* Bark Texture */}
        <path d="M50 30 C70 45 90 55 105 60" stroke="#451a03" strokeWidth="4" strokeLinecap="round" />
        <path d="M45 50 C65 65 85 75 95 85" stroke="#451a03" strokeWidth="4" strokeLinecap="round" />
        <path d="M35 85 C50 95 70 100 85 105" stroke="#451a03" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// 🥁 Drum
export function DrumIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="drumBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
        <linearGradient id="drumTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(153, 27, 27, 0.4))">
        {/* Drum Body */}
        <path d="M20 40 V80 C20 95 64 105 64 105 C64 105 108 95 108 80 V40" fill="url(#drumBody)" />
        {/* Zigzag Ropes */}
        <path d="M20 45 L35 75 L50 45 L65 75 L80 45 L95 75 L108 45" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* Drum Top */}
        <ellipse cx="64" cy="40" rx="44" ry="16" fill="url(#drumTop)" stroke="#eab308" strokeWidth="4" />
        {/* Sticks */}
        <path d="M30 10 L45 35" stroke="#d97706" strokeWidth="5" strokeLinecap="round" />
        <circle cx="30" cy="10" r="5" fill="#ef4444" />
        <path d="M98 10 L83 35" stroke="#d97706" strokeWidth="5" strokeLinecap="round" />
        <circle cx="98" cy="10" r="5" fill="#ef4444" />
      </g>
    </svg>
  );
}

// 📚 Books
export function BooksIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="book1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="book2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="book3" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 6px 10px rgba(0,0,0,0.3))">
        {/* Bottom Book */}
        <path d="M10 90 L110 90 L118 105 L18 105 Z" fill="url(#book3)" />
        <path d="M10 90 L18 105 V115 L10 100 Z" fill="#064e3b" />
        <rect x="18" y="105" width="100" height="10" fill="#f8fafc" />
        
        {/* Middle Book */}
        <path d="M15 70 L105 60 L115 75 L25 85 Z" fill="url(#book2)" />
        <path d="M15 70 L25 85 V95 L15 80 Z" fill="#1e3a8a" />
        <path d="M25 85 L115 75 V85 L25 95 Z" fill="#f8fafc" />
        
        {/* Top Book */}
        <path d="M20 40 L100 35 L110 50 L30 55 Z" fill="url(#book1)" />
        <path d="M20 40 L30 50 V60 L20 50 Z" fill="#7f1d1d" />
        <path d="M30 55 L110 50 V60 L30 65 Z" fill="#f8fafc" />
      </g>
    </svg>
  );
}

// 📖 Book
export function BookEmojiIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="openBookGradL" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="openBookGradR" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(2, 132, 199, 0.3))">
        {/* Cover */}
        <path d="M10 30 C10 20 30 20 64 25 C98 20 118 20 118 30 V105 C118 100 98 100 64 105 C30 100 10 100 10 105 Z" fill="#0c4a6e" />
        {/* Pages Left */}
        <path d="M15 35 C15 25 35 25 64 30 V110 C35 105 15 105 15 110 Z" fill="url(#openBookGradL)" />
        {/* Pages Right */}
        <path d="M113 35 C113 25 93 25 64 30 V110 C93 105 113 105 113 110 Z" fill="url(#openBookGradR)" />
        {/* Page Lines */}
        <path d="M25 50 C35 48 45 48 55 50" stroke="#bae6fd" strokeWidth="4" strokeLinecap="round" />
        <path d="M25 65 C35 63 45 63 55 65" stroke="#bae6fd" strokeWidth="4" strokeLinecap="round" />
        <path d="M25 80 C35 78 45 78 55 80" stroke="#bae6fd" strokeWidth="4" strokeLinecap="round" />
        <path d="M103 50 C93 48 83 48 73 50" stroke="#bae6fd" strokeWidth="4" strokeLinecap="round" />
        <path d="M103 65 C93 63 83 63 73 65" stroke="#bae6fd" strokeWidth="4" strokeLinecap="round" />
        <path d="M103 80 C93 78 83 78 73 80" stroke="#bae6fd" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// 🕯️ Candle
export function CandleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="candleWax" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="50%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <radialGradient id="candleFlame" cx="0.5" cy="0.8" r="0.8">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ef4444" />
        </radialGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(0, 0, 0, 0.2))">
        {/* Wax Body */}
        <rect x="44" y="60" width="40" height="50" rx="4" fill="url(#candleWax)" />
        {/* Melted Wax Drops */}
        <path d="M44 60 C44 55 84 55 84 60 Q84 75 75 75 Q70 60 65 70 Q60 60 55 75 Q44 75 44 60 Z" fill="#f8fafc" />
        <path d="M48 65 L48 85 A3 3 0 0 0 54 85 L54 65 Z" fill="#f8fafc" />
        <path d="M80 65 L80 95 A3 3 0 0 1 74 95 L74 65 Z" fill="#f8fafc" />
        {/* Wick */}
        <path d="M64 60 V50" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
        {/* Flame */}
        <path d="M64 15 C74 35 74 45 64 50 C54 45 54 35 64 15 Z" fill="url(#candleFlame)" filter="drop-shadow(0px 0px 10px rgba(245, 158, 11, 0.8))" />
      </g>
    </svg>
  );
}

// 📿 Beads
export function BeadsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <radialGradient id="beadGrad" cx="0.3" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="70%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#78350f" />
        </radialGradient>
        <radialGradient id="masterBead" cx="0.3" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#fecaca" />
          <stop offset="70%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </radialGradient>
      </defs>
      <g filter="drop-shadow(0px 5px 8px rgba(120, 53, 15, 0.4))">
        {/* Thread */}
        <path d="M64 25 C90 25 105 45 105 70 C105 95 90 105 64 105 C38 105 23 95 23 70 C23 45 38 25 64 25 Z" stroke="#d97706" strokeWidth="4" fill="none" />
        
        {/* Beads circle */}
        {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map(angle => {
          const rad = (angle * Math.PI) / 180;
          const cx = 64 + 41 * Math.sin(rad);
          const cy = 65 - 40 * Math.cos(rad);
          return <circle key={angle} cx={cx} cy={cy} r="6" fill="url(#beadGrad)" />;
        })}
        {/* Master Bead */}
        <circle cx="64" cy="105" r="9" fill="url(#masterBead)" />
        {/* Tassel */}
        <path d="M64 114 L60 125 M64 114 L64 126 M64 114 L68 125" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// 🧹 Broom
export function BroomIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="broomStick" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <linearGradient id="broomBristles" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(2px 6px 8px rgba(0, 0, 0, 0.25))">
        <path d="M100 15 L45 70" stroke="url(#broomStick)" strokeWidth="8" strokeLinecap="round" />
        <path d="M35 60 L60 85 L35 115 C20 105 15 90 15 80 L35 60 Z" fill="url(#broomBristles)" />
        <path d="M40 65 L20 85 M45 70 L25 95 M50 75 L30 105" stroke="#b45309" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      </g>
    </svg>
  );
}

// 🧼 Soap
export function SoapIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="soapGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#be185d" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(190, 24, 93, 0.4))">
        <rect x="24" y="40" width="80" height="48" rx="20" fill="url(#soapGrad)" transform="rotate(-15 64 64)" />
        <path d="M34 50 Q64 35 94 45" stroke="#fbcfe8" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" transform="rotate(-15 64 64)" />
        {/* Bubbles */}
        <circle cx="20" cy="30" r="10" fill="#bae6fd" opacity="0.6" />
        <circle cx="15" cy="25" r="3" fill="#ffffff" />
        <circle cx="95" cy="95" r="15" fill="#bae6fd" opacity="0.6" />
        <circle cx="90" cy="90" r="4" fill="#ffffff" />
        <circle cx="105" cy="35" r="6" fill="#bae6fd" opacity="0.6" />
      </g>
    </svg>
  );
}

// 🍚 Rice
export function RiceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="riceGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <linearGradient id="bowlGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(30, 58, 138, 0.4))">
        {/* Rice mountain */}
        <path d="M25 65 C30 40 50 15 64 15 C80 15 100 40 105 65 Z" fill="url(#riceGrad)" />
        {/* Rice grains details */}
        <path d="M60 25 Q65 30 70 25 M45 40 Q55 45 60 35 M75 45 Q80 55 90 50 M35 55 Q45 60 50 50 M80 60 Q70 65 65 55" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" opacity="0.3" fill="none" />
        {/* Bowl */}
        <path d="M15 65 Q64 80 115 65 C115 90 95 110 64 110 C35 110 15 90 15 65 Z" fill="url(#bowlGrad)" />
        <path d="M44 110 L84 110 L80 120 L48 120 Z" fill="#1e3a8a" />
        {/* Chopsticks */}
        <path d="M100 20 L20 70 M105 30 L30 75" stroke="#b45309" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// 🥣 Bowl
export function BowlIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="bowlOuter" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#be185d" />
        </linearGradient>
        <linearGradient id="soupGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(190, 24, 93, 0.4))">
        {/* Soup surface */}
        <ellipse cx="64" cy="55" rx="48" ry="15" fill="url(#soupGrad)" />
        <circle cx="50" cy="55" r="5" fill="#fde047" opacity="0.8" />
        <circle cx="80" cy="52" r="3" fill="#fde047" opacity="0.8" />
        {/* Bowl */}
        <path d="M16 55 C16 90 35 110 64 110 C95 110 112 90 112 55 Q64 70 16 55 Z" fill="url(#bowlOuter)" />
        <path d="M44 110 L84 110 L80 120 L48 120 Z" fill="#831843" />
        <path d="M30 65 Q64 80 98 65" stroke="#fbcfe8" strokeWidth="3" strokeLinecap="round" opacity="0.5" fill="none" />
        {/* Steam */}
        <path d="M45 40 Q40 25 50 10 M65 35 Q60 20 70 5 M85 40 Q80 25 90 10" stroke="#f8fafc" strokeWidth="4" strokeLinecap="round" opacity="0.6" fill="none" />
      </g>
    </svg>
  );
}

// 🥗 Salad
export function SaladIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="glassBowl" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#7dd3fc" />
        </linearGradient>
        <linearGradient id="lettuceGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(125, 211, 252, 0.4))">
        {/* Veggies */}
        <path d="M20 50 Q40 20 70 30 T110 50 Z" fill="url(#lettuceGrad)" />
        <circle cx="45" cy="40" r="10" fill="#ef4444" /> {/* Tomato */}
        <circle cx="85" cy="45" r="10" fill="#ef4444" />
        <rect x="55" y="25" width="15" height="15" fill="#fde047" transform="rotate(20 62 32)" /> {/* Cheese/Crouton */}
        <rect x="75" y="30" width="12" height="12" fill="#fde047" transform="rotate(-15 81 36)" />
        
        {/* Glass Bowl */}
        <path d="M12 55 C12 90 35 110 64 110 C95 110 116 90 116 55 Q64 75 12 55 Z" fill="url(#glassBowl)" opacity="0.8" />
        <path d="M44 110 L84 110 L80 120 L48 120 Z" fill="#38bdf8" opacity="0.9" />
        <path d="M20 65 Q40 85 60 90" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

// 🍵 Tea
export function TeaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="teaCup" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <linearGradient id="matchaGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a3e635" />
          <stop offset="100%" stopColor="#4d7c0f" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(0, 0, 0, 0.15))">
        {/* Plate */}
        <ellipse cx="64" cy="105" rx="45" ry="12" fill="url(#teaCup)" />
        <ellipse cx="64" cy="105" rx="35" ry="8" stroke="#94a3b8" strokeWidth="2" fill="none" opacity="0.5" />
        {/* Cup */}
        <path d="M25 45 C25 90 35 100 64 100 C93 100 103 90 103 45 Z" fill="url(#teaCup)" />
        {/* Tea Handle */}
        <path d="M100 55 C120 55 125 75 100 85" stroke="url(#teaCup)" strokeWidth="10" strokeLinecap="round" fill="none" />
        {/* Tea Liquid */}
        <ellipse cx="64" cy="45" rx="38" ry="10" fill="url(#matchaGrad)" />
        {/* Leaf decoration */}
        <path d="M60 80 Q64 65 68 80 T60 80 Z" fill="#4d7c0f" opacity="0.6" />
        {/* Steam */}
        <path d="M50 30 Q45 15 55 5 M75 35 Q70 20 80 10" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" opacity="0.4" fill="none" />
      </g>
    </svg>
  );
}

// 🍎 Apple
export function AppleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <radialGradient id="appleGrad" cx="0.4" cy="0.4" r="0.7">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="70%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </radialGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(220, 38, 38, 0.4))">
        {/* Apple Body */}
        <path d="M64 30 C40 10 10 30 15 65 C20 100 45 115 64 110 C85 115 110 100 113 65 C118 30 88 10 64 30 Z" fill="url(#appleGrad)" />
        {/* Stem */}
        <path d="M64 30 Q65 15 75 10" stroke="#78350f" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* Leaf */}
        <path d="M72 15 Q90 10 95 25 Q75 30 72 15 Z" fill="#22c55e" />
        {/* Highlight */}
        <path d="M30 50 Q30 35 45 30" stroke="#fca5a5" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.6" />
      </g>
    </svg>
  );
}

// 🍲 Pot of Food
export function PotOfFoodIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="potGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#9a3412" />
        </linearGradient>
        <linearGradient id="soupBase" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(154, 52, 18, 0.4))">
        {/* Handles */}
        <path d="M15 65 C0 65 0 85 15 85 M113 65 C128 65 128 85 113 85" stroke="url(#potGrad)" strokeWidth="12" strokeLinecap="round" fill="none" />
        {/* Pot Base */}
        <path d="M15 60 V90 C15 110 35 115 64 115 C95 115 113 110 113 90 V60 Z" fill="url(#potGrad)" />
        {/* Soup */}
        <ellipse cx="64" cy="60" rx="49" ry="15" fill="url(#soupBase)" />
        {/* Ingredients */}
        <circle cx="50" cy="62" r="8" fill="#ef4444" /> {/* Tomato/Meat */}
        <path d="M70 55 Q80 50 85 60 T75 65 Z" fill="#22c55e" /> {/* Veggie */}
        <circle cx="85" cy="58" r="4" fill="#f8fafc" /> {/* Mushroom/Egg */}
        <circle cx="40" cy="55" r="4" fill="#f8fafc" />
        {/* Steam */}
        <path d="M45 40 Q40 25 50 10 M65 35 Q60 20 70 5 M85 40 Q80 25 90 10" stroke="#f8fafc" strokeWidth="5" strokeLinecap="round" opacity="0.7" fill="none" />
      </g>
    </svg>
  );
}

// ⛩️ Shrine
export function ShrineIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="shrineRed" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
        <linearGradient id="shrineBlack" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(153, 27, 27, 0.4))">
        {/* Pillars */}
        <rect x="25" y="45" width="12" height="70" rx="2" fill="url(#shrineRed)" />
        <rect x="91" y="45" width="12" height="70" rx="2" fill="url(#shrineRed)" />
        {/* Crossbars */}
        <rect x="15" y="45" width="98" height="12" rx="2" fill="url(#shrineRed)" />
        <rect x="20" y="65" width="88" height="10" rx="2" fill="url(#shrineRed)" />
        {/* Center Plaque */}
        <rect x="56" y="45" width="16" height="25" rx="1" fill="url(#shrineBlack)" />
        <path d="M60 50 V65 M68 50 V65 M58 55 H70" stroke="#facc15" strokeWidth="2" />
        {/* Roof */}
        <path d="M10 35 Q64 25 118 35 L120 40 H8 L10 35 Z" fill="url(#shrineBlack)" />
        <path d="M10 25 Q64 15 118 25 L120 35 H8 L10 25 Z" fill="url(#shrineBlack)" opacity="0.8" />
        {/* Base */}
        <rect x="15" y="115" width="32" height="6" rx="2" fill="#94a3b8" />
        <rect x="81" y="115" width="32" height="6" rx="2" fill="#94a3b8" />
      </g>
    </svg>
  );
}

// 🪦 Headstone
export function HeadstoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="stoneGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(71, 85, 105, 0.5))">
        {/* Tombstone */}
        <path d="M30 110 V50 C30 20 98 20 98 50 V110 Z" fill="url(#stoneGrad)" />
        {/* Cross engraving */}
        <path d="M64 45 V75 M50 55 H78" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
        {/* Text lines */}
        <path d="M45 90 H83 M55 100 H73" stroke="#334155" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
        {/* Base */}
        <rect x="15" y="110" width="98" height="10" rx="3" fill="#64748b" />
        {/* Grass tufts */}
        <path d="M20 110 Q25 100 30 110 M98 110 Q103 100 108 110" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

// 🔔 Bell
export function BellEmojiIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="bellGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(161, 98, 7, 0.4))">
        {/* Top Handle */}
        <path d="M55 20 C55 10 73 10 73 20" stroke="url(#bellGrad)" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* Bell Body */}
        <path d="M64 20 C85 20 85 45 85 65 C85 85 105 95 105 100 H23 C23 95 43 85 43 65 C43 45 43 20 64 20 Z" fill="url(#bellGrad)" />
        {/* Clapper */}
        <circle cx="64" cy="110" r="10" fill="#ca8a04" />
        {/* Highlight */}
        <path d="M40 70 C40 50 45 35 55 28" stroke="#fef08a" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.6" />
      </g>
    </svg>
  );
}

// 🛕 Temple
export function TempleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="templeRoof" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="templeWall" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#d6d3d1" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(180, 83, 9, 0.3))">
        {/* Tier 3 (Top) */}
        <path d="M64 10 L80 30 H48 Z" fill="url(#templeRoof)" />
        <rect x="54" y="30" width="20" height="15" fill="url(#templeWall)" />
        {/* Tier 2 */}
        <path d="M64 45 L95 65 H33 Z" fill="url(#templeRoof)" />
        <rect x="44" y="65" width="40" height="20" fill="url(#templeWall)" />
        {/* Tier 1 (Base) */}
        <path d="M64 85 L115 105 H13 Z" fill="url(#templeRoof)" />
        <rect x="25" y="105" width="78" height="20" fill="url(#templeWall)" />
        {/* Door */}
        <path d="M55 125 V110 C55 105 73 105 73 110 V125 Z" fill="#78350f" />
        {/* Details */}
        <circle cx="64" cy="8" r="4" fill="#fcd34d" />
        <path d="M44 85 V125 M84 85 V125" stroke="#a8a29e" strokeWidth="4" />
      </g>
    </svg>
  );
}

// 🪙 Coin
export function CoinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <radialGradient id="coinGrad" cx="0.4" cy="0.4" r="0.7">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="60%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#a16207" />
        </radialGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(161, 98, 7, 0.4))">
        <circle cx="64" cy="64" r="48" fill="url(#coinGrad)" />
        <circle cx="64" cy="64" r="38" stroke="#ca8a04" strokeWidth="4" fill="none" />
        {/* Inner Symbol (Square hole like ancient coin or symbol) */}
        <rect x="50" y="50" width="28" height="28" fill="#a16207" />
        <path d="M50 50 L38 38 M78 50 L90 38 M50 78 L38 90 M78 78 L90 90" stroke="#ca8a04" strokeWidth="4" />
      </g>
    </svg>
  );
}

// 🔋 Battery
export function BatteryIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="battBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="battCharge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(30, 41, 59, 0.4))">
        {/* Tip */}
        <rect x="100" y="48" width="10" height="32" rx="4" fill="#94a3b8" />
        {/* Body */}
        <rect x="18" y="34" width="82" height="60" rx="8" fill="url(#battBody)" />
        {/* Charge Bars */}
        <rect x="26" y="44" width="18" height="40" rx="4" fill="url(#battCharge)" />
        <rect x="50" y="44" width="18" height="40" rx="4" fill="url(#battCharge)" />
        <rect x="74" y="44" width="18" height="40" rx="4" fill="url(#battCharge)" />
        {/* Lightning bolt indicator */}
        <path d="M56 64 L66 48 H58 L60 38 L48 56 H58 L56 64 Z" fill="#fef08a" transform="translate(6, 12)" />
      </g>
    </svg>
  );
}

// 🧸 Teddy Bear
export function TeddyBearIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <radialGradient id="bearBody" cx="0.4" cy="0.4" r="0.7">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </radialGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(146, 64, 14, 0.4))">
        {/* Ears */}
        <circle cx="35" cy="35" r="16" fill="url(#bearBody)" />
        <circle cx="35" cy="35" r="8" fill="#fef3c7" opacity="0.6" />
        <circle cx="93" cy="35" r="16" fill="url(#bearBody)" />
        <circle cx="93" cy="35" r="8" fill="#fef3c7" opacity="0.6" />
        {/* Arms and Legs */}
        <circle cx="30" cy="75" r="18" fill="url(#bearBody)" />
        <circle cx="98" cy="75" r="18" fill="url(#bearBody)" />
        <ellipse cx="40" cy="105" rx="16" ry="12" fill="url(#bearBody)" />
        <ellipse cx="88" cy="105" rx="16" ry="12" fill="url(#bearBody)" />
        {/* Body & Head */}
        <ellipse cx="64" cy="80" rx="35" ry="32" fill="url(#bearBody)" />
        <circle cx="64" cy="50" r="32" fill="url(#bearBody)" />
        {/* Snout */}
        <ellipse cx="64" cy="58" rx="16" ry="12" fill="#fef3c7" />
        <circle cx="64" cy="52" r="4" fill="#451a03" />
        <path d="M64 56 V62 M56 64 C60 68 68 68 72 64" stroke="#451a03" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Eyes */}
        <circle cx="50" cy="42" r="4" fill="#451a03" />
        <circle cx="78" cy="42" r="4" fill="#451a03" />
        <circle cx="52" cy="40" r="1" fill="#fff" />
        <circle cx="80" cy="40" r="1" fill="#fff" />
        {/* Bow tie */}
        <path d="M64 70 L50 60 V80 Z M64 70 L78 60 V80 Z" fill="#ef4444" />
        <circle cx="64" cy="70" r="4" fill="#dc2626" />
      </g>
    </svg>
  );
}

// 📓 Notebook
export function NotebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="noteCover" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(30, 58, 138, 0.4))">
        {/* Cover */}
        <rect x="30" y="15" width="75" height="98" rx="4" fill="url(#noteCover)" />
        {/* Pages edge */}
        <rect x="100" y="18" width="8" height="92" fill="#f8fafc" />
        {/* Binding */}
        <rect x="25" y="15" width="12" height="98" rx="2" fill="#1e293b" />
        {/* Rings */}
        {[25, 40, 55, 70, 85, 100].map(y => (
          <ellipse key={y} cx="28" cy={y} rx="8" ry="4" fill="none" stroke="#cbd5e1" strokeWidth="3" />
        ))}
        {/* Label */}
        <rect x="50" y="40" width="35" height="20" rx="2" fill="#f8fafc" />
        <path d="M55 46 H80 M55 54 H70" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// 🎧 Headphones
export function HeadphonesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="hpBand" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="50%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(15, 23, 42, 0.4))">
        {/* Band */}
        <path d="M20 70 V50 C20 20 108 20 108 50 V70" stroke="url(#hpBand)" strokeWidth="14" strokeLinecap="round" fill="none" />
        {/* Earpads inner */}
        <rect x="12" y="60" width="16" height="40" rx="8" fill="#1e293b" />
        <rect x="100" y="60" width="16" height="40" rx="8" fill="#1e293b" />
        {/* Earpads outer */}
        <rect x="4" y="55" width="12" height="50" rx="6" fill="#94a3b8" />
        <rect x="112" y="55" width="12" height="50" rx="6" fill="#94a3b8" />
        {/* Detail circles */}
        <circle cx="10" cy="80" r="4" fill="#cbd5e1" />
        <circle cx="118" cy="80" r="4" fill="#cbd5e1" />
      </g>
    </svg>
  );
}

// 🔗 Link
export function LinkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="linkGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 6px 10px rgba(71, 85, 105, 0.4))">
        <path d="M40 75 L30 85 C15 100 30 115 45 100 L55 90 C70 75 55 60 45 70" stroke="url(#linkGrad)" strokeWidth="14" strokeLinecap="round" fill="none" />
        <path d="M88 53 L98 43 C113 28 98 13 83 28 L73 38 C58 53 73 68 83 58" stroke="url(#linkGrad)" strokeWidth="14" strokeLinecap="round" fill="none" />
        <path d="M45 83 L83 45" stroke="#cbd5e1" strokeWidth="10" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// ⛓️ Chains
export function ChainsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" {...props}>
      <defs>
        <linearGradient id="chainGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0px 8px 12px rgba(71, 85, 105, 0.5))">
        {/* Link 1 */}
        <rect x="20" y="10" width="30" height="50" rx="15" stroke="url(#chainGrad)" strokeWidth="10" fill="none" transform="rotate(20 35 35)" />
        {/* Link 2 */}
        <rect x="50" y="45" width="30" height="50" rx="15" stroke="url(#chainGrad)" strokeWidth="10" fill="none" transform="rotate(-15 65 70)" />
        {/* Link 3 */}
        <rect x="75" y="80" width="30" height="50" rx="15" stroke="url(#chainGrad)" strokeWidth="10" fill="none" transform="rotate(30 90 105)" />
      </g>
    </svg>
  );
}
